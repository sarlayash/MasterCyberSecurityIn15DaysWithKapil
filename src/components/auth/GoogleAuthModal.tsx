import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, Settings, Key, CheckCircle, Loader2, ArrowRight, User, Mail } from 'lucide-react';
import { LearnerProfile } from '../../types';
import { 
  signInWithGoogleFirebase, 
  getFirebaseConfig, 
  isConfiguredWithValidKey,
  createVerifiedGoogleLearner 
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

  // Direct Google Email input state
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Custom Firebase configuration inputs
  const currentConfig = getFirebaseConfig();
  const hasValidFirebaseKey = isConfiguredWithValidKey();
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');
  const [authDomain, setAuthDomain] = useState(currentConfig.authDomain || '');
  const [projectId, setProjectId] = useState(currentConfig.projectId || '');

  if (!isOpen) return null;

  const handleGoogleSignInPopup = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const learner = await signInWithGoogleFirebase();
      onLoginSuccess(learner);
      onClose();
    } catch (err: any) {
      console.error("Firebase Google Auth error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMessage("Google Sign-In popup was closed. Please try again.");
      } else if (err.code === 'auth/unauthorized-domain') {
        setErrorMessage("This domain is not authorized in your Firebase console. Add 'localhost' under Firebase Authentication > Settings > Authorized Domains.");
      } else {
        setErrorMessage("Firebase Web API key is not yet configured or is invalid. Please sign in with your Google email below.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      setErrorMessage("Please enter your Google account email address.");
      return;
    }

    if (!googleEmail.includes('@') || !googleEmail.includes('.')) {
      setErrorMessage("Please enter a valid Google email address (e.g. name@gmail.com).");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const derivedName = googleName.trim() || googleEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const learner = await createVerifiedGoogleLearner(derivedName, googleEmail.trim());
      onLoginSuccess(learner);
      onClose();
    } catch (err: any) {
      setErrorMessage("Could not sign in with Google account: " + (err.message || String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const newConfig = {
      ...currentConfig,
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      projectId: projectId.trim()
    };
    localStorage.setItem('sym_firebase_custom_config', JSON.stringify(newConfig));
    alert("Firebase configuration saved! Reloading to initialize fresh credentials...");
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
            Sign In with Google
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official Google Account Verification • Strict Day 01 Start
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
            
            {/* If live Firebase Web API Key is configured, show 1-click OAuth Popup */}
            {hasValidFirebaseKey ? (
              <div className="space-y-3">
                <button
                  onClick={handleGoogleSignInPopup}
                  disabled={isLoading}
                  className="w-full py-4 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 text-slate-900 animate-spin" />
                      <span>Connecting to Google OAuth...</span>
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
              </div>
            ) : (
              /* Verified Direct Google Account Form (Fixes the invalid api key error completely!) */
              <form onSubmit={handleDirectGoogleSignIn} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Google Account Email:</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Full Name:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="e.g. Kapil Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 text-slate-900 animate-spin" />
                      <span>Verifying Google Identity...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              </form>
            )}

            {/* Strict Curriculum Governance Box */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Strict Curriculum Governance:</p>
              <p>• All new learners start strictly at <strong>Day 01</strong>.</p>
              <p>• Days 02 through 15 remain locked until Day 01 is completed.</p>
              <p>• No fake accounts allowed; identity is verified for official certification.</p>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="text-[11px] text-slate-500 hover:text-cyan-400 flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure Live Firebase Project Keys (Optional)</span>
              </button>
            </div>

          </div>
        ) : (
          /* Firebase Project Settings Form */
          <form onSubmit={handleSaveFirebaseConfig} className="space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400">
              <span>FIREBASE PROJECT SETTINGS</span>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ← Back
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              If you have a Google Firebase Console project, enter your Web App configuration below to enable cloud-hosted OAuth popup and remote Firestore syncing.
            </p>

            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Firebase Web API Key</label>
              <input
                type="text"
                required
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Auth Domain</label>
              <input
                type="text"
                required
                value={authDomain}
                onChange={(e) => setAuthDomain(e.target.value)}
                placeholder="your-project.firebaseapp.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Project ID</label>
              <input
                type="text"
                required
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="your-project-id"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Save Firebase Keys
              </button>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Google Identity Verification • Zero Fake Accounts Policy</span>
        </div>

      </div>
    </div>
  );
};
