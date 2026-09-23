import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, Settings, Key, Loader2, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { LearnerProfile } from '../../types';
import { 
  signInWithGoogleFirebase, 
  getFirebaseConfig, 
  isConfiguredWithValidKey,
  parseAndSaveFirebaseConfig
} from '../../services/firebase';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: LearnerProfile) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [configSnippet, setConfigSnippet] = useState('');

  const currentConfig = getFirebaseConfig();
  const hasValidFirebaseKey = isConfiguredWithValidKey();

  if (!isOpen) return null;

  const handleGoogleSignInPopup = async () => {
    if (!hasValidFirebaseKey) {
      setShowConfig(true);
      setErrorMessage("One-time setup: Please paste your Firebase Web App credentials below to activate genuine Google OAuth.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const learner = await signInWithGoogleFirebase();
      onLoginSuccess(learner);
      onClose();
    } catch (err: any) {
      console.error("Firebase Google Auth error:", err);
      if (err.code === 'auth/missing-api-key') {
        setShowConfig(true);
        setErrorMessage("Firebase Web API key is required. Paste your Web App config below to activate Google sign-in.");
      } else if (err.code === 'auth/popup-blocked') {
        setErrorMessage("Google Sign-In pop-up was blocked by your browser. Please look for the pop-up blocked icon in your browser address bar, click 'Always allow pop-ups', and try again.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setErrorMessage("Google Sign-In pop-up was closed before completing authentication. Please click below to try again.");
      } else if (err.code === 'auth/timeout') {
        setErrorMessage("Google Sign-In is taking longer than expected. If using Chrome Incognito mode, third-party cookies or pop-ups may be blocked. Please ensure pop-ups are allowed or click below to retry.");
      } else if (err.code === 'auth/cancelled-popup-request') {
        setErrorMessage("Previous sign-in request was superseded. Please click below to try again.");
      } else if (err.code === 'auth/unauthorized-domain') {
        setErrorMessage("Domain 'sarlayash.github.io' (or 'localhost') is not authorized. In Firebase Console, go to Authentication > Settings > Authorized Domains > Add domain.");
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMessage("Google provider is not enabled in Firebase Console. Go to Authentication > Sign-in method > Enable Google.");
      } else {
        setErrorMessage(err.message || "Google authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const result = parseAndSaveFirebaseConfig(configSnippet);
    if (!result.success) {
      setErrorMessage(result.error || "Failed to parse Firebase config.");
      return;
    }
    alert("Firebase project 'mastercybersecurityin15days' linked successfully! Reloading to activate Google OAuth...");
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0a1124] border border-cyan-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Decorative glow */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-3 shadow-lg">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Official Google Sign-In
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Genuine Google Account Verification • Strict Day 01 Start
          </p>
        </div>

        {/* Error / Status Alert */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {!showConfig ? (
          <div className="space-y-4">
            
            {/* Primary Google Sign-In Button */}
            <div className="space-y-3">
              <button
                onClick={handleGoogleSignInPopup}
                disabled={isLoading}
                className="w-full py-4 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 text-cyan-600 animate-spin" />
                    <span>Waiting for Google Account...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.36 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Continue with Google Account</span>
                  </>
                )}
              </button>

              {isLoading && (
                <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400">
                  <span className="text-[11px] text-cyan-300 animate-pulse">
                    Pop-up window opened. Pick account to continue.
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLoading(false)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    Cancel / Retry
                  </button>
                </div>
              )}
            </div>

            {/* Zero Fake Accounts Guarantee */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-900/50 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ZERO FAKE ACCOUNTS ENFORCEMENT</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                All learners authenticate through genuine Google accounts. Manual email registration has been disabled. Real name, verified email, and profile avatar are certified via Google OAuth.
              </p>
              <div className="pt-1 text-[10px] text-slate-500 font-mono">
                Project: <span className="text-amber-400">{currentConfig.projectId || 'mastercybersecurityin15days'}</span>
              </div>
            </div>

            {/* Admin/Setup Config Button */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="text-[11px] text-slate-500 hover:text-cyan-400 flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Firebase Project Settings & Web App Link</span>
              </button>
            </div>

          </div>
        ) : (
          /* Firebase Web App Link Setup Drawer */
          <form onSubmit={handleSaveFirebaseConfig} className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>LINK FIREBASE PROJECT</span>
              </span>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-xs"
              >
                ← Back
              </button>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 space-y-1 leading-relaxed">
              <p className="font-bold flex items-center gap-1 text-amber-400">
                <Sparkles className="w-3 h-3" />
                <span>One-Time Setup for mastercybersecurityin15days</span>
              </p>
              <p>
                In Firebase Console, go to <strong>Project Settings ⚙️</strong> &gt; <strong>General</strong> &gt; scroll to <strong>Your apps</strong> &gt; Web app. Copy the <code>firebaseConfig</code> or API key and paste below:
              </p>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                Paste Firebase Web Config or API Key (AIzaSy...):
              </label>
              <textarea
                rows={4}
                required
                value={configSnippet}
                onChange={(e) => setConfigSnippet(e.target.value)}
                placeholder={'Paste here:\nconst firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "mastercybersecurityin15days.firebaseapp.com",\n  projectId: "mastercybersecurityin15days",\n  ...\n};'}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-cyan-400 placeholder-slate-600"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Authorized Domains Checklist:</span>
              </p>
              <p>In Firebase Console &gt; <strong>Authentication</strong> &gt; <strong>Settings</strong> &gt; <strong>Authorized domains</strong>, ensure these are added:</p>
              <p className="font-mono text-cyan-300 text-[10px] pl-2">• sarlayash.github.io</p>
              <p className="font-mono text-cyan-300 text-[10px] pl-2">• localhost</p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Link Project & Activate Google Sign-In
              </button>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real Google Authentication • Zero Fake Accounts</span>
        </div>

      </div>
    </div>
  );
};
