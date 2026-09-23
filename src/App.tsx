import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';
import { AdminAuthModal } from './components/auth/AdminAuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { LearnerDashboard } from './components/dashboard/LearnerDashboard';
import { CurriculumView } from './components/curriculum/CurriculumView';
import { SimulatorHub } from './components/simulators/SimulatorHub';
import { MockAssessment } from './components/assessment/MockAssessment';
import { InterviewHub } from './components/interview/InterviewHub';
import { CertificateView } from './components/certificate/CertificateView';
import { CyberAttacksBulletinBoard } from './components/bulletin/CyberAttacksBulletinBoard';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { DemoTour } from './components/common/DemoTour';
import { LearnerProfile, Announcement } from './types';
import { storageService, DEFAULT_LEARNER } from './services/storageService';
import { Bell, X, AlertTriangle } from 'lucide-react';

export const App: React.FC = () => {
  const [learner, setLearner] = useState<LearnerProfile | null>(() => {
    return storageService.getLearner();
  });
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState<boolean>(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(() => {
    return !localStorage.getItem('sym_cyber_demo_tour_seen');
  });

  useEffect(() => {
    const anns = storageService.getAnnouncements();
    const urgent = anns.find(a => a.priority === 'urgent') || anns[0];
    if (urgent) {
      setActiveAnnouncement(urgent);
    }
  }, []);

  const handleGoogleLoginSuccess = (profile: LearnerProfile) => {
    storageService.saveLearner(profile);
    setLearner(profile);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setLearner(null);
    setIsAdmin(false);
    setCurrentTab('landing');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setCurrentTab('admin');
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    setCurrentTab(learner ? 'dashboard' : 'landing');
  };

  const handleNavigateTab = (tab: string, param?: any) => {
    if (tab === 'curriculum' && typeof param === 'number') {
      setSelectedModuleId(param);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Urgent Broadcast Banner (if active) */}
      {activeAnnouncement && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-between no-print z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 shrink-0" />
            <span className="font-bold uppercase tracking-wider font-mono">ANNOUNCEMENT:</span>
            <span>{activeAnnouncement.title} — {activeAnnouncement.content}</span>
          </div>
          <button
            onClick={() => setActiveAnnouncement(null)}
            className="text-slate-950 hover:opacity-75 p-0.5 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={handleNavigateTab}
        learner={learner}
        onOpenGoogleAuth={() => setIsGoogleAuthOpen(true)}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onLogout={handleLogout}
        isAdmin={isAdmin}
        onOpenTour={() => setIsTourOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onOpenGoogleAuth={() => setIsGoogleAuthOpen(true)}
            onExploreAsGuest={() => {
              if (learner) {
                setCurrentTab('dashboard');
              } else {
                setIsGoogleAuthOpen(true);
              }
            }}
            onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
            onSelectModule={(modId) => {
              if (learner) {
                setSelectedModuleId(modId);
                setCurrentTab('curriculum');
              } else {
                setIsGoogleAuthOpen(true);
              }
            }}
            onLaunchSimulator={(simId) => {
              if (learner) {
                setCurrentTab(`sim-${simId}`);
              } else {
                setIsGoogleAuthOpen(true);
              }
            }}
            onOpenTour={() => setIsTourOpen(true)}
          />
        )}

        {currentTab === 'dashboard' && learner && (
          <LearnerDashboard
            learner={learner}
            onNavigateTab={handleNavigateTab}
            onOpenTour={() => setIsTourOpen(true)}
          />
        )}

        {currentTab === 'curriculum' && learner && (
          <CurriculumView
            learner={learner}
            onUpdateLearner={setLearner}
            initialModuleId={selectedModuleId}
            onLaunchLab={(simId) => setCurrentTab(`sim-${simId}`)}
          />
        )}

        {(currentTab === 'simulators' || currentTab.startsWith('sim-')) && learner && (
          <SimulatorHub
            initialSimulatorId={currentTab.startsWith('sim-') ? currentTab.replace('sim-', '') : undefined}
            learner={learner}
          />
        )}

        {currentTab === 'assessment' && learner && (
          <MockAssessment
            learner={learner}
            onUpdateLearner={setLearner}
          />
        )}

        {currentTab === 'interview' && (
          <InterviewHub />
        )}

        {currentTab === 'certificate' && learner && (
          <CertificateView
            learner={learner}
          />
        )}

        {currentTab === 'bulletin' && (
          <CyberAttacksBulletinBoard />
        )}

        {currentTab === 'admin' && isAdmin && (

          <AdminDashboard
            onLogoutAdmin={handleLogoutAdmin}
          />
        )}
      </main>

      {/* Mobile-first bottom navigation bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onTabChange={handleNavigateTab}
        isLoggedIn={!!learner}
      />

      {/* Google Authentication Modal */}
      <GoogleAuthModal
        isOpen={isGoogleAuthOpen}
        onClose={() => setIsGoogleAuthOpen(false)}
        onLoginSuccess={handleGoogleLoginSuccess}
      />

      {/* Admin Login Modal (kapiladmin / admin123) */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onAdminLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Interactive Guided Demo Tour */}
      <DemoTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigateTab={handleNavigateTab}
      />

    </div>
  );
};

export default App;
