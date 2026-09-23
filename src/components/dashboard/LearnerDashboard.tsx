import React from 'react';
import { 
  Shield, 
  Terminal, 
  Award, 
  BookOpen, 
  Briefcase, 
  Flame, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  ArrowRight,
  ChevronRight,
  Compass,
  FileCheck,
  Zap,
  Target,
  Clock
} from 'lucide-react';
import { LearnerProfile } from '../../types';
import { calculateCyberReadiness, calculateCyberPerformanceIndex, READINESS_LEVELS } from '../../services/scoringEngine';
import { generateLearningRecommendations } from '../../services/recommendationEngine';
import { storageService } from '../../services/storageService';

interface LearnerDashboardProps {
  learner: LearnerProfile;
  onNavigateTab: (tab: string, param?: any) => void;
  onOpenTour?: () => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  learner,
  onNavigateTab,
  onOpenTour
}) => {
  const readiness = calculateCyberReadiness(learner);
  const cpi = calculateCyberPerformanceIndex(learner);
  const recommendations = generateLearningRecommendations(learner);

  const csCompletedCount = learner.completedModules.filter(id => id <= 15).length;
  const ehCompletedCount = (learner.ethicalHackingCompletedModules || learner.completedModules.filter(id => id >= 101)).length;
  const isCertificateEligible = (csCompletedCount >= 15 || ehCompletedCount >= 15) && readiness.overallPercentage >= 70;

  const currentCsId = learner.currentModuleId || 1;
  const currentEhId = learner.ethicalHackingCurrentModuleId || 101;
  const csLockStatus = storageService.getModuleLockStatus(currentCsId, learner);
  const ehLockStatus = storageService.getModuleLockStatus(currentEhId, learner);

  return (
    <div className="min-h-screen bg-[#030712] py-8 px-4 sm:px-6 lg:px-8 text-slate-100 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. WELCOME HEADER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#091326] via-[#0d1a33] to-[#091326] border border-cyan-800/40 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>CYBER COMMAND CENTER • ACTIVE DEFENDER SESSION</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Welcome, {learner.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                CYBER SECURITY ZERO-TO-INFINITY • Powered by <span className="text-amber-400 font-semibold">SarlaYash Mission</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onOpenTour && (
                <button
                  onClick={onOpenTour}
                  className="p-3.5 rounded-2xl bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white transition-all flex flex-col items-center justify-center min-w-[90px] shadow-lg cursor-pointer group"
                  title="Launch Guided Portal Tour"
                >
                  <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-1 text-cyan-300">
                    Tour 🚀
                  </span>
                </button>
              )}

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-right">
                <span className="text-[11px] text-slate-400 block font-mono">LEARNING STREAK</span>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-xl font-black text-amber-400 font-mono">{learner.streakDays} Days</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 text-right">
                <span className="text-[11px] text-slate-400 block font-mono">TOTAL XP</span>
                <span className="text-xl font-black text-cyan-400 font-mono">{learner.xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CYBER READINESS METER (LEVEL 1 TO LEVEL 10) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#081124] border border-cyan-900/50 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  CYBER READINESS METER
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Internal competency benchmark from Level 1 (Digital Awareness) to Level 10 (Zero-To-Infinity).
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-slate-400">OVERALL READINESS</span>
              <div className="text-3xl font-black text-cyan-400 font-mono">
                {readiness.overallPercentage}%
              </div>
              <span className="text-xs font-bold text-amber-400 tracking-wider">
                LEVEL {readiness.currentLevel.levelNumber}: {readiness.currentLevel.levelName}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 p-0.5 mb-6 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 transition-all duration-1000 shadow-md shadow-cyan-500/50"
              style={{ width: `${readiness.overallPercentage}%` }}
            />
          </div>

          {/* 10 Level Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {READINESS_LEVELS.map((lvl) => {
              const isCurrent = lvl.levelNumber === readiness.currentLevel.levelNumber;
              const isPassed = readiness.overallPercentage >= lvl.minPercentage;

              return (
                <div
                  key={lvl.levelNumber}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                      : isPassed
                      ? 'bg-[#0a162e] border-cyan-900/60 text-slate-200'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600'
                  }`}
                >
                  <span className="text-lg block mb-1">{lvl.badge}</span>
                  <span className="text-[10px] font-mono font-bold block">
                    LVL {lvl.levelNumber}
                  </span>
                  <span className={`text-[10px] font-semibold line-clamp-1 ${isCurrent ? 'text-amber-300' : ''}`}>
                    {lvl.levelName.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>* Internal educational metric based on hands-on lab and assessment mastery.</span>
            {readiness.nextLevel && (
              <span className="text-cyan-400 font-mono">
                {readiness.pointsToNext}% more to reach Level {readiness.nextLevel.levelNumber}: {readiness.nextLevel.levelName}
              </span>
            )}
          </div>
        </div>

        {/* 2.5 DUAL TRACK ACADEMY PROGRESS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Track 1: Cyber Security Zero-To-Infinity */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#081329] to-[#070e1e] border border-cyan-500/40 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DEFENSIVE SECURITY TRACK</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {csCompletedCount} / 15 Done
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                Cyber Security Zero-To-Infinity
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Foundations, networking, firewalls, Wireshark, Linux hardening, SOC triage, and incident response.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>PROGRESS</span>
                <span className="text-cyan-400 font-bold">{Math.round((csCompletedCount / 15) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${Math.min(100, Math.round((csCompletedCount / 15) * 100))}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span>Current: <strong className="text-white">Day {currentCsId}</strong></span>
                {csLockStatus.isWaitingWindow && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] animate-pulse">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>⏳ In {csLockStatus.formattedRemainingTime}</span>
                  </span>
                )}
              </div>
              <button
                onClick={() => onNavigateTab('curriculum', currentCsId)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
              >
                <span>Continue Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Track 2: Ethical Hacking & Penetration Testing */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#190916] to-[#0f050d] border border-rose-500/40 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚔️</span>
                  <span>OFFENSIVE SECURITY TRACK</span>
                </span>
                <span className="text-xs font-mono font-bold text-rose-400">
                  {ehCompletedCount} / 15 Done
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                Ethical Hacking &amp; Penetration Testing
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Reconnaissance, Nmap, Metasploit, password attacks, OWASP Top 10, privilege escalation, and red team reporting.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>PROGRESS</span>
                <span className="text-rose-400 font-bold">{Math.round((ehCompletedCount / 15) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-500"
                  style={{ width: `${Math.min(100, Math.round((ehCompletedCount / 15) * 100))}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span>Current: <strong className="text-white">Day {currentEhId - 100}</strong></span>
                {ehLockStatus.isWaitingWindow && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] animate-pulse">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>⏳ In {ehLockStatus.formattedRemainingTime}</span>
                  </span>
                )}
              </div>
              <button
                onClick={() => onNavigateTab('curriculum', currentEhId)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/20"
              >
                <span>Enter Red Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 3. CORE METRIC KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="p-4 rounded-2xl bg-[#091326] border border-cyan-900/40">
            <span className="text-xs text-slate-400 block font-medium">Cyber Defense</span>
            <div className="text-xl font-bold text-white mt-1">{csCompletedCount} / 15</div>
            <span className="text-[11px] text-cyan-400 mt-1 block">Day {learner.currentModuleId} active</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#091326] border border-rose-900/40">
            <span className="text-xs text-slate-400 block font-medium">Ethical Hacking</span>
            <div className="text-xl font-bold text-rose-400 mt-1">{ehCompletedCount} / 15</div>
            <span className="text-[11px] text-rose-400 mt-1 block">Day {(learner.ethicalHackingCurrentModuleId || 101) - 100} active</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#091326] border border-cyan-900/40">
            <span className="text-xs text-slate-400 block font-medium">Mock Assessment</span>
            <div className="text-xl font-bold text-white mt-1">
              {learner.assessmentScores[0] ? `${learner.assessmentScores[0].percentage}%` : 'Pending'}
            </div>
            <span className="text-[11px] text-amber-400 mt-1 block">Corporate Engine</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#091326] border border-cyan-900/40">
            <span className="text-xs text-slate-400 block font-medium">Assignments</span>
            <div className="text-xl font-bold text-white mt-1">
              {Object.keys(learner.assignmentSubmissions).length} Done
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">Verified Work</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#091326] border border-cyan-900/40">
            <span className="text-xs text-slate-400 block font-medium">Labs Completed</span>
            <div className="text-xl font-bold text-white mt-1">
              {learner.completedLabs.length} / 9
            </div>
            <span className="text-[11px] text-cyan-400 mt-1 block">Virtual Cyber Lab</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#091326] border border-cyan-900/40">
            <span className="text-xs text-slate-400 block font-medium">Certificate Status</span>
            <div className={`text-base font-bold mt-1.5 ${isCertificateEligible ? 'text-green-400' : 'text-amber-400'}`}>
              {isCertificateEligible ? 'Ready to Claim' : 'In Progress'}
            </div>
            <span className="text-[11px] text-slate-400 block">SarlaYash Verified</span>
          </div>

        </div>

        {/* 4. LEARNING INTELLIGENCE RECOMMENDATIONS (Section 19) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0c1836] to-[#091224] border border-cyan-500/40 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Learning Intelligence Recommendations
              </h3>
              <p className="text-xs text-cyan-300 font-mono">
                {recommendations.triggerReason}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            
            {/* Action 1: Next Module */}
            <div 
              onClick={() => onNavigateTab('curriculum')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all group"
            >
              <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-1">
                1. NEXT MODULE
              </span>
              <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {recommendations.nextModule.dayNumber}: {recommendations.nextModule.title}
              </p>
              <div className="mt-3 flex items-center text-xs text-slate-400 group-hover:text-cyan-400">
                <span>Continue Module →</span>
              </div>
            </div>

            {/* Action 2: Practice Lab */}
            <div 
              onClick={() => onNavigateTab(`sim-${recommendations.practiceLab.id}`)}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all group"
            >
              <span className="text-[11px] font-mono text-amber-400 font-bold block mb-1">
                2. PRACTICE LAB
              </span>
              <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {recommendations.practiceLab.name}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {recommendations.practiceLab.reason}
              </p>
            </div>

            {/* Action 3: Mock Test */}
            <div 
              onClick={() => onNavigateTab('assessment')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all group"
            >
              <span className="text-[11px] font-mono text-emerald-400 font-bold block mb-1">
                3. TARGETED MOCK TEST
              </span>
              <p className="text-xs text-slate-300">
                {recommendations.mockTestRecommendation}
              </p>
              <div className="mt-3 flex items-center text-xs text-emerald-400">
                <span>Launch Test →</span>
              </div>
            </div>

            {/* Action 4: Interview Question */}
            <div 
              onClick={() => onNavigateTab('interview')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all group"
            >
              <span className="text-[11px] font-mono text-indigo-400 font-bold block mb-1">
                4. INTERVIEW QUESTION
              </span>
              <p className="text-xs text-slate-300 italic line-clamp-2">
                "{recommendations.interviewQuestion}"
              </p>
              <div className="mt-3 flex items-center text-xs text-indigo-400">
                <span>Practice Answer →</span>
              </div>
            </div>

          </div>
        </div>

        {/* 5. CORPORATE PERFORMANCE INTELLIGENCE (8 DIMENSIONS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#081124] border border-cyan-900/50 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Cyber Performance Index (CPI)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Internal learning metric across 8 essential cybersecurity dimensions.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">OVERALL INDEX</span>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {cpi.overallIndex} / 100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Knowledge", val: cpi.knowledge, desc: "MCQ & assessment theory" },
                { name: "Practical Skills", val: cpi.practicalSkills, desc: "Simulators & hands-on terminals" },
                { name: "Problem Solving", val: cpi.problemSolving, desc: "Module assignments submitted" },
                { name: "Security Awareness", val: cpi.securityAwareness, desc: "Phishing investigation accuracy" },
                { name: "Investigation", val: cpi.investigation, desc: "Wireshark & forensics analysis" },
                { name: "Decision Making", val: cpi.decisionMaking, desc: "Firewall rules & SOC triage" },
                { name: "Consistency", val: cpi.consistency, desc: "Daily streak & participation" },
                { name: "Interview Readiness", val: cpi.interviewReadiness, desc: "Corporate question mastery" }
              ].map((dim) => (
                <div key={dim.name} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex justify-between text-xs mb-1.5 font-semibold">
                    <span className="text-slate-300">{dim.name}</span>
                    <span className="text-cyan-400 font-mono">{dim.val}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                      style={{ width: `${dim.val}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">{dim.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Earned */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#081124] border border-cyan-900/50 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Earned Badges</h3>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  {learner.earnedBadges.length} Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Achievements are strictly tied to practical lab performance, not merely clicking through content.
              </p>

              <div className="space-y-2.5">
                {[
                  { name: "Security Starter", icon: "🛡", unlocked: learner.earnedBadges.includes("Security Starter") },
                  { name: "Threat Hunter", icon: "🔎", unlocked: learner.earnedBadges.includes("Threat Hunter") },
                  { name: "Command Line Explorer", icon: "🖥", unlocked: learner.earnedBadges.includes("Command Line Explorer") },
                  { name: "Firewall Architect", icon: "🔥", unlocked: learner.earnedBadges.includes("Firewall Architect") },
                  { name: "Packet Analyst", icon: "📡", unlocked: learner.earnedBadges.includes("Packet Analyst") },
                  { name: "Assessment Master", icon: "🎯", unlocked: learner.earnedBadges.includes("Assessment Master") }
                ].map((b) => (
                  <div
                    key={b.name}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                      b.unlocked 
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-white' 
                        : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                    }`}
                  >
                    <span className="text-xl">{b.icon}</span>
                    <div className="flex-1">
                      <span className="text-xs font-bold block">{b.name}</span>
                      <span className="text-[10px] text-slate-400">
                        {b.unlocked ? 'Unlocked & Verified' : 'Locked'}
                      </span>
                    </div>
                    {b.unlocked && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigateTab('certificate')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20"
              >
                View Official Certificate
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
