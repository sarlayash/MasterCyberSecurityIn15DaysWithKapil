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

// Firebase Configuration for project: mastercybersecurityin15days
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
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA-ig9Cd2O-4ZzkHHeUBusBpiiUIoKvrVo",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mastercybersecurityin15days.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mastercybersecurityin15days",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mastercybersecurityin15days.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "986713142625",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:986713142625:web:4d5affcd14d28e6bd9c120"
  };
};

export const isConfiguredWithValidKey = (): boolean => {
  const cfg = getFirebaseConfig();
  if (!cfg.apiKey) return false;
  return cfg.apiKey.startsWith('AIza') && cfg.apiKey.length > 25;
};

// Smart parser: extracts apiKey, appId, etc. from raw snippet or JSON
export const parseAndSaveFirebaseConfig = (rawInput: string): { success: boolean; error?: string } => {
  const text = rawInput.trim();
  if (!text) return { success: false, error: "Configuration cannot be empty." };

  let extractedConfig: Record<string, string> = {};

  // If user pasted JSON
  if (text.startsWith('{') && text.endsWith('}')) {
    try {
      extractedConfig = JSON.parse(text);
    } catch (e) {
      // ignore
    }
  }

  // If user pasted JavaScript code like `const firebaseConfig = { apiKey: "...", ... }`
  if (!extractedConfig.apiKey) {
    const apiKeyMatch = text.match(/apiKey\s*[:=]\s*["']([^"']+)["']/i);
    const authDomainMatch = text.match(/authDomain\s*[:=]\s*["']([^"']+)["']/i);
    const projectIdMatch = text.match(/projectId\s*[:=]\s*["']([^"']+)["']/i);
    const storageBucketMatch = text.match(/storageBucket\s*[:=]\s*["']([^"']+)["']/i);
    const messagingSenderIdMatch = text.match(/messagingSenderId\s*[:=]\s*["']([^"']+)["']/i);
    const appIdMatch = text.match(/appId\s*[:=]\s*["']([^"']+)["']/i);

    if (apiKeyMatch) extractedConfig.apiKey = apiKeyMatch[1];
    if (authDomainMatch) extractedConfig.authDomain = authDomainMatch[1];
    if (projectIdMatch) extractedConfig.projectId = projectIdMatch[1];
    if (storageBucketMatch) extractedConfig.storageBucket = storageBucketMatch[1];
    if (messagingSenderIdMatch) extractedConfig.messagingSenderId = messagingSenderIdMatch[1];
    if (appIdMatch) extractedConfig.appId = appIdMatch[1];
  }

  // If user pasted raw API key starting with AIza
  if (!extractedConfig.apiKey && text.startsWith('AIza') && text.length > 25 && !text.includes(' ') && !text.includes('{')) {
    extractedConfig.apiKey = text;
  }

  if (!extractedConfig.apiKey || !extractedConfig.apiKey.startsWith('AIza')) {
    return { 
      success: false, 
      error: "Could not detect a valid Firebase API Key starting with 'AIzaSy...'. Please copy your Web App config snippet from Firebase Console (Project Settings > General > Your apps)." 
    };
  }

  const finalConfig = {
    apiKey: extractedConfig.apiKey,
    authDomain: extractedConfig.authDomain || "mastercybersecurityin15days.firebaseapp.com",
    projectId: extractedConfig.projectId || "mastercybersecurityin15days",
    storageBucket: extractedConfig.storageBucket || "mastercybersecurityin15days.firebasestorage.app",
    messagingSenderId: extractedConfig.messagingSenderId || "",
    appId: extractedConfig.appId || ""
  };

  localStorage.setItem('sym_firebase_custom_config', JSON.stringify(finalConfig));
  return { success: true };
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

// Official Google Sign-In via Firebase Popup (100% Genuine Google Accounts)
export const signInWithGoogleFirebase = async (): Promise<LearnerProfile> => {
  if (!isConfiguredWithValidKey()) {
    const error: any = new Error("Firebase Web API key is not yet configured for project 'mastercybersecurityin15days'. Please link your Firebase Web App credentials.");
    error.code = 'auth/missing-api-key';
    throw error;
  }
  const result = await signInWithPopup(auth, googleProvider);
  return await getOrCreateLearnerInFirestore(result.user);
};

// Official Sign Out via Firebase
export const signOutFirebase = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn("Sign out notice:", e);
  }
};
