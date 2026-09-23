import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Award, 
  BookOpen, 
  Briefcase, 
  CheckCircle, 
  Flame, 
  LogOut, 
  User, 
  Lock, 
  ChevronDown,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { LearnerProfile } from '../../types';
import { calculateCyberReadiness } from '../../services/scoringEngine';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  learner: LearnerProfile | null;
  onOpenGoogleAuth: () => void;
  onOpenAdminAuth: () => void;
  onLogout: () => void;
  isAdmin: boolean;
  onOpenTour?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  learner,
  onOpenGoogleAuth,
  onOpenAdminAuth,
  onLogout,
  isAdmin,
  onOpenTour
}) => {
  const [labDropdownOpen, setLabDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const readiness = learner ? calculateCyberReadiness(learner) : null;

  const simulators = [
    { id: 'cmd', name: 'Command Prompt Lab', icon: '🖥' },
    { id: 'linux', name: 'Linux Terminal Lab', icon: '🐧' },
    { id: 'firewall', name: 'Firewall Simulator', icon: '🔥' },
    { id: 'wireshark', name: 'Wireshark Packet Analysis', icon: '📡' },
    { id: 'soc', name: 'SOC Monitoring SIEM', icon: '🛡' },
    { id: 'incident', name: 'Incident Response Lab', icon: '🚨' },
    { id: 'forensics', name: 'Digital Forensics Lab', icon: '🔍' },
    { id: 'phishing', name: 'Phishing Email Analyzer', icon: '🎣' },
    { id: 'network', name: 'Network Diagnostics', icon: '🌐' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070d1e]/90 backdrop-blur-md border-b border-cyan-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => onTabChange(learner ? 'dashboard' : 'landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform border border-amber-400/40">
              <Shield className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold tracking-wider text-base uppercase">
                  SarlaYash
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-mono">
                  ZERO-TO-INFINITY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                Legacy of Values. Future of Learning. • <span className="text-amber-300 font-semibold">With Kapil</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {!learner ? (
              <>
                <button
                  onClick={() => onTabChange('landing')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentTab === 'landing' ? 'text-cyan-400 bg-cyan-950/50' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Home
                </button>
                <a
                  href="#why-cyber"
                  className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Why Cybersecurity
                </a>
                <a
                  href="#journey"
                  className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  15-Day Journey
                </a>
                <a
                  href="#simulators"
                  className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Virtual Cyber Lab
                </a>
              </>
            ) : (
              <>
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentTab === 'dashboard' ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/50' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Command Center
                </button>

                <button
                  onClick={() => onTabChange('curriculum')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentTab === 'curriculum' ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/50' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  15-Day Modules
                </button>

                {/* Virtual Cyber Lab Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setLabDropdownOpen(!labDropdownOpen)}
                    onMouseEnter={() => setLabDropdownOpen(true)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      currentTab.startsWith('sim-') || currentTab === 'simulators' 
                        ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/50' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    Virtual Cyber Lab
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  </button>

                  {labDropdownOpen && (
                    <div 
                      onMouseLeave={() => setLabDropdownOpen(false)}
                      className="absolute left-0 mt-1 w-64 rounded-xl bg-[#091226] border border-cyan-800/50 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <button
                        onClick={() => { onTabChange('simulators'); setLabDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-cyan-300 hover:bg-cyan-950/60 flex items-center justify-between border-b border-cyan-900/40 mb-1"
                      >
                        <span>VIEW ALL 9 SIMULATORS</span>
                        <span>→</span>
                      </button>
                      <div className="space-y-0.5 max-h-80 overflow-y-auto">
                        {simulators.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => { onTabChange(`sim-${s.id}`); setLabDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-cyan-950/50 hover:text-white flex items-center gap-2.5 transition-colors"
                          >
                            <span className="text-base">{s.icon}</span>
                            <span>{s.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onTabChange('assessment')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentTab === 'assessment' ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/50' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  Mock Assessment
                </button>

                <button
                  onClick={() => onTabChange('interview')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentTab === 'interview' ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/50' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  Interview Hub
                </button>

                <button
                  onClick={() => onTabChange('bulletin')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentTab === 'bulletin' ? 'text-red-400 bg-red-950/60 border border-red-800/50' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Flame className="w-4 h-4 text-red-400" />
                  Threat Bulletin
                </button>

                <button
                  onClick={() => onTabChange('certificate')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    currentTab === 'certificate' ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/50' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Credentials &amp; LOR
                </button>

              </>
            )}
          </nav>

          {/* Right Action Bar (Readiness Pill, Admin Key, Google Auth) */}
          <div className="flex items-center gap-3">
            
            {/* Live Cyber Readiness Level Pill */}
            {learner && readiness && (
              <div 
                onClick={() => onTabChange('dashboard')}
                className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-medium cursor-pointer hover:border-cyan-400/60 transition-all shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-slate-300 font-mono text-[11px]">
                  LVL {readiness.currentLevel.levelNumber}:
                </span>
                <span className="text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
                  {readiness.currentLevel.levelName}
                </span>
                <span className="text-cyan-300 font-bold ml-0.5">
                  {readiness.overallPercentage}%
                </span>
              </div>
            )}

            {/* Streak Counter */}
            {learner && (
              <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-xs text-amber-400 font-semibold">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{learner.streakDays}d Streak</span>
              </div>
            )}

            {/* Guided Demo Tour Trigger */}
            <button
              onClick={onOpenTour}
              title="Launch Guided Demo Tour of Portal"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950 via-[#0a1836] to-cyan-950 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm group cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
              <span className="hidden sm:inline">Demo Tour</span>
              <span className="text-[10px] px-1 rounded bg-cyan-500/20 text-cyan-300 font-mono">🚀</span>
            </button>

            {/* Admin Switcher (Discrete Key Icon) */}
            <button
              onClick={onOpenAdminAuth}
              title="Secure Admin Access"
              className={`p-2 rounded-lg border transition-colors ${
                isAdmin 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* User Profile or Google Sign In */}
            {learner ? (
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => onTabChange('dashboard')}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 cursor-pointer hover:border-cyan-500/40 transition-colors"
                >
                  <img
                    src={learner.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={learner.name}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-400/50"
                  />
                  <span className="text-xs font-medium text-slate-200 hidden md:inline max-w-[120px] truncate">
                    {learner.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenGoogleAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
              >
                <User className="w-4 h-4" />
                <span>Google Sign-In</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cyan-900/40 bg-[#091226] px-4 pt-3 pb-6 space-y-2">
          {/* Mobile Demo Tour Button */}
          <button
            onClick={() => { onOpenTour && onOpenTour(); setMobileMenuOpen(false); }}
            className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-cyan-950 via-[#0b1b3d] to-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-between shadow-sm mb-2"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Interactive Demo Tour</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">🚀 LAUNCH</span>
          </button>

          {learner ? (
            <>
              <button
                onClick={() => { onTabChange('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-950/60"
              >
                📊 Command Center Dashboard
              </button>
              <button
                onClick={() => { onTabChange('curriculum'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-950/60"
              >
                📖 15-Day Modules & Notes
              </button>
              <button
                onClick={() => { onTabChange('simulators'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-950/60"
              >
                ⚡ Virtual Cyber Lab (9 Simulators)
              </button>
              <button
                onClick={() => { onTabChange('assessment'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-950/60"
              >
                🎯 100-MCQ Mock Assessment
              </button>
              <button
                onClick={() => { onTabChange('interview'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-950/60"
              >
                💼 Interview Preparation Hub
              </button>
              <button
                onClick={() => { onTabChange('bulletin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-red-950/60 flex items-center gap-2"
              >
                <span>🔥</span>
                <span>Threat Bulletin (10-Yr Attacks)</span>
              </button>
              <button
                onClick={() => { onTabChange('certificate'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-950/60"
              >
                📜 Credentials, LOR &amp; Badges
              </button>

            </>
          ) : (
            <>
              <button
                onClick={() => { onOpenGoogleAuth(); setMobileMenuOpen(false); }}
                className="w-full text-center py-3 rounded-lg bg-cyan-500 text-slate-950 font-bold text-sm"
              >
                Continue with Google
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
