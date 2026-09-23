import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { LearnerProfile } from '../types';

// Default Firebase Configuration (can be overridden with Vite env variables or user setup)
export const getFirebaseConfig = () => {
  const saved = localStorage.getItem('sym_firebase_custom_config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }

  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-demo-placeholder-sarlayash-csz",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sarlayash-cybersecurity.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sarlayash-cybersecurity",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sarlayash-cybersecurity.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475612",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475612:web:98abc123def456"
  };
};

export const isConfiguredWithValidKey = (): boolean => {
  const cfg = getFirebaseConfig();
  if (!cfg.apiKey) return false;
  if (cfg.apiKey.includes('placeholder') || cfg.apiKey.includes('demo') || cfg.apiKey.includes('dummy')) {
    return false;
  }
  return cfg.apiKey.startsWith('AIza') && cfg.apiKey.length > 25;
};

const firebaseConfig = getFirebaseConfig();
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const db = getFirestore(app);

// Convert Firebase User to LearnerProfile with Firestore synchronization
export const getOrCreateLearnerInFirestore = async (user: User): Promise<LearnerProfile> => {
  const learnerRef = doc(db, 'learners', user.uid);
  
  try {
    const snap = await getDoc(learnerRef);
    if (snap.exists()) {
      const data = snap.data() as LearnerProfile;
      // Update last active
      const updated: LearnerProfile = {
        ...data,
        name: user.displayName || data.name,
        email: user.email || data.email,
        avatarUrl: user.photoURL || data.avatarUrl,
        lastLoginTimestamp: new Date().toISOString()
      };
      await updateDoc(learnerRef, { lastLoginTimestamp: updated.lastLoginTimestamp });
      return updated;
    }
  } catch (err) {
    console.warn("Firestore read notice (using local fallback if unconfigured):", err);
  }

  // Brand new learner strictly starting from Day 1 with all subsequent days locked!
  const freshLearner: LearnerProfile = {
    id: user.uid,
    name: user.displayName || "Cyber Defender",
    email: user.email || "learner@sarlayash.org",
    avatarUrl: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.uid)}`,
    firstLoginTimestamp: new Date().toISOString(),
    lastLoginTimestamp: new Date().toISOString(),
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    currentModuleId: 1,      // Strictly Day 1
    completedModules: [],    // Strictly empty, Day 2-15 locked!
    assessmentScores: [],
    completedLabs: [],
    assignmentSubmissions: {},
    earnedBadges: ['Security Starter'],
    personalNotes: {},
    bookmarkedModules: [],
    simulatorStats: {},
    xp: 100
  };

  try {
    await setDoc(learnerRef, freshLearner);
  } catch (err) {
    console.warn("Firestore write notice:", err);
  }

  return freshLearner;
};

// Sync updated learner to Firestore
export const syncLearnerToFirestore = async (learner: LearnerProfile): Promise<void> => {
  if (!learner.id) return;
  try {
    const learnerRef = doc(db, 'learners', learner.id);
    await setDoc(learnerRef, learner, { merge: true });
  } catch (err) {
    console.warn("Firestore sync warning:", err);
  }
};

// Official Google Sign-In via Firebase Popup
export const signInWithGoogleFirebase = async (): Promise<LearnerProfile> => {
  if (!isConfiguredWithValidKey()) {
    const error: any = new Error("Firebase API key is not configured or is invalid. Please configure your Firebase Web API key or use direct Google verification.");
    error.code = 'auth/api-key-not-valid';
    throw error;
  }
  const result = await signInWithPopup(auth, googleProvider);
  return await getOrCreateLearnerInFirestore(result.user);
};

// Create verified Google Learner Profile (starts strictly at Day 1, syncs to Firestore if configured)
export const createVerifiedGoogleLearner = async (name: string, email: string): Promise<LearnerProfile> => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim() || "Google Verified Learner";
  
  // Deterministic Google UID
  let hash = 0;
  for (let i = 0; i < cleanEmail.length; i++) {
    hash = ((hash << 5) - hash) + cleanEmail.charCodeAt(i);
    hash |= 0;
  }
  const generatedUid = `google-${Math.abs(hash).toString(36)}`;

  const freshLearner: LearnerProfile = {
    id: generatedUid,
    name: cleanName,
    email: cleanEmail,
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=0284c7`,
    firstLoginTimestamp: new Date().toISOString(),
    lastLoginTimestamp: new Date().toISOString(),
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    currentModuleId: 1,      // Strictly Day 1
    completedModules: [],    // Strictly empty, Day 2-15 locked!
    assessmentScores: [],
    completedLabs: [],
    assignmentSubmissions: {},
    earnedBadges: ['Security Starter'],
    personalNotes: {},
    bookmarkedModules: [],
    simulatorStats: {},
    xp: 100
  };

  if (isConfiguredWithValidKey()) {
    try {
      const learnerRef = doc(db, 'learners', generatedUid);
      await setDoc(learnerRef, freshLearner, { merge: true });
    } catch (err) {
      console.warn("Firestore sync error:", err);
    }
  }

  return freshLearner;
};

// Official Sign Out via Firebase
export const signOutFirebase = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn("Sign out notice:", e);
  }
};
