import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
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

// Safe persistence configuration (resilient against Incognito partitioned storage)
try {
  setPersistence(auth, browserLocalPersistence).catch(() => {
    setPersistence(auth, inMemoryPersistence).catch(() => {});
  });
} catch (e) {
  // Non-fatal
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const db = getFirestore(app);

/**
 * Instantly constructs or merges verified LearnerProfile from Google OAuth user data.
 * Zero blocking: Returns immediately (0ms) so the learner never waits on Firestore!
 * Launches non-blocking background Firestore sync with a 2-second timeout guard.
 */
export const getOrCreateLearnerInFirestore = (
  user: User, 
  existingProfile?: LearnerProfile | null
): LearnerProfile => {
  let profile: LearnerProfile;

  if (existingProfile && existingProfile.id === user.uid) {
    profile = {
      ...existingProfile,
      name: user.displayName || existingProfile.name,
      email: user.email || existingProfile.email,
      avatarUrl: user.photoURL || existingProfile.avatarUrl,
      lastLoginTimestamp: new Date().toISOString()
    };
  } else {
    // Brand new learner strictly starting from Day 1 with all subsequent days locked!
    profile = {
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
  }

  // Non-blocking background sync to Cloud Firestore
  // Uses Promise.race with a 2.5s timeout so it NEVER stalls or impacts the user experience
  (async () => {
    try {
      const learnerRef = doc(db, 'learners', user.uid);
      await Promise.race([
        setDoc(learnerRef, profile, { merge: true }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2500))
      ]);
    } catch (err) {
      // Non-fatal: if Firestore is offline or unprovisioned, progress remains safe locally
      console.warn("Background Firestore sync skipped:", err);
    }
  })();

  return profile;
};

// Sync updated learner to Firestore (non-blocking with timeout)
export const syncLearnerToFirestore = async (learner: LearnerProfile): Promise<void> => {
  if (!learner.id || learner.id === 'learner-initial') return;
  try {
    const learnerRef = doc(db, 'learners', learner.id);
    await Promise.race([
      setDoc(learnerRef, learner, { merge: true }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2500))
    ]);
  } catch (err) {
    console.warn("Firestore sync warning:", err);
  }
};

// Official Google Sign-In via Firebase Popup (100% Genuine Google Accounts)
// Fast resolution with 35-second safety timeout and zero Firestore blocking
export const signInWithGoogleFirebase = async (
  existingProfile?: LearnerProfile | null
): Promise<LearnerProfile> => {
  if (!isConfiguredWithValidKey()) {
    const error: any = new Error("Firebase Web API key is not yet configured for project 'mastercybersecurityin15days'. Please link your Firebase Web App credentials.");
    error.code = 'auth/missing-api-key';
    throw error;
  }

  // 35s timeout to catch blocked popups or Incognito delays cleanly
  const popupPromise = signInWithPopup(auth, googleProvider);
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      const err: any = new Error("Google authentication window timed out. If using Incognito mode, please check if your browser blocked the pop-up window or third-party cookies.");
      err.code = 'auth/timeout';
      reject(err);
    }, 35000);
  });

  const result = await Promise.race([popupPromise, timeoutPromise]);
  return getOrCreateLearnerInFirestore(result.user, existingProfile);
};

// Official Sign Out via Firebase
export const signOutFirebase = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn("Sign out notice:", e);
  }
};
