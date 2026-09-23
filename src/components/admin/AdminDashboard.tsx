import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  RotateCcw, 
  Send, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Award, 
  BookOpen, 
  Terminal, 
  Flame,
  CheckCircle,
  AlertTriangle,
  X,
  Plus,
  RefreshCw,
  Mail,
  Calendar,
  Sparkles,
  Trash2
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { LearnerProfile, Announcement } from '../../types';
import { calculateCyberReadiness, READINESS_LEVELS } from '../../services/scoringEngine';
import { MODULES_DATA } from '../../data/modulesData';

interface AdminDashboardProps {
  onLogoutAdmin: () => void;
}

const SIMULATOR_TITLES: Record<string, string> = {
  cmd: 'Command Prompt Lab',
  linux: 'Linux Terminal Lab',
  firewall: 'Firewall Simulator',
  wireshark: 'Wireshark Packet Analysis',
  soc: 'SOC Monitoring SIEM',
  incident: 'Incident Response Lab',
  forensics: 'Digital Forensics Lab',
  phishing: 'Phishing Email Analyzer',
  network: 'Network Diagnostics'
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogoutAdmin }) => {
  const [learnersList, setLearnersList] = useState<LearnerProfile[]>(() => {
    return storageService.getAllRegisteredLearners();
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Active' | 'Day 01' | 'Certified'>('ALL');
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(() => {
    const list = storageService.getAllRegisteredLearners();
    return list.length > 0 ? list[0].id : null;
  });

  // Announcement state
  const [announcements, setAnnouncements] = useState<Announcement[]>(storageService.getAnnouncements());
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnPriority, setNewAnnPriority] = useState<'normal' | 'urgent'>('normal');

  const refreshLearners = () => {
    const list = storageService.getAllRegisteredLearners();
    setLearnersList(list);
    if (selectedLearnerId && !list.find(l => l.id === selectedLearnerId)) {
      setSelectedLearnerId(list.length > 0 ? list[0].id : null);
    }
  };

  // Determine real learner status
  const getLearnerStatus = (lrn: LearnerProfile): 'Active' | 'Day 01' | 'Certified' => {
    const isCertified = lrn.completedModules.length >= 15 && calculateCyberReadiness(lrn).overallPercentage >= 70;
    if (isCertified) return 'Certified';
    if (lrn.completedModules.length === 0) return 'Day 01';
    return 'Active';
  };

  const filteredLearners = learnersList.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        l.email.toLowerCase().includes(searchQuery.toLowerCase());
    const status = getLearnerStatus(l);
    const matchStatus = filterStatus === 'ALL' || status === filterStatus;
    return matchSearch && matchStatus;
  });

  const selectedLearner = learnersList.find(l => l.id === selectedLearnerId) || null;

  // Real Dynamic Metrics (Zero Fake Numbers)
  const totalLearners = learnersList.length;
  
  const now = Date.now();
  const activeLearners = learnersList.filter(l => {
    if (!l.lastActiveDate && !l.lastLoginTimestamp) return false;
    const time = new Date(l.lastActiveDate || l.lastLoginTimestamp).getTime();
    return (now - time) <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  const avgReadiness = totalLearners > 0
    ? Math.round(learnersList.reduce((acc, l) => acc + calculateCyberReadiness(l).overallPercentage, 0) / totalLearners)
    : 0;

  const avgLevelNumber = totalLearners > 0
    ? Math.round(learnersList.reduce((acc, l) => acc + calculateCyberReadiness(l).currentLevel.levelNumber, 0) / totalLearners)
    : 1;
  const avgLevelObj = READINESS_LEVELS.find(r => r.levelNumber === avgLevelNumber) || READINESS_LEVELS[0];

  const learnersWithAssessments = learnersList.filter(l => l.assessmentScores && l.assessmentScores.length > 0);
  const avgAssessment = learnersWithAssessments.length > 0
    ? Math.round(learnersWithAssessments.reduce((acc, l) => acc + l.assessmentScores[0].percentage, 0) / learnersWithAssessments.length)
    : null;

  // Dynamic strongest topic across real assessment submissions
  const topicAgg: Record<string, { total: number; correct: number }> = {};
  learnersList.forEach(l => {
    l.assessmentScores?.forEach(att => {
      if (att.categoryScores) {
        Object.entries(att.categoryScores).forEach(([cat, s]) => {
          if (!topicAgg[cat]) topicAgg[cat] = { total: 0, correct: 0 };
          topicAgg[cat].total += s.total;
          topicAgg[cat].correct += s.correct;
        });
      }
    });
  });

  let strongestTopicName = "—";
  let strongestTopicPct = 0;
  Object.entries(topicAgg).forEach(([cat, val]) => {
    if (val.total > 0) {
      const pct = Math.round((val.correct / val.total) * 100);
      if (pct > strongestTopicPct) {
        strongestTopicPct = pct;
        strongestTopicName = cat;
      }
    }
  });

  // Dynamic most used lab across real simulator runs
  const labRunAgg: Record<string, number> = {};
  learnersList.forEach(l => {
    if (l.simulatorStats) {
      Object.entries(l.simulatorStats).forEach(([simId, metric]) => {
        labRunAgg[simId] = (labRunAgg[simId] || 0) + (metric.runsCount || 0);
      });
    }
    if (l.completedLabs) {
      l.completedLabs.forEach(labId => {
        if (!labRunAgg[labId]) labRunAgg[labId] = 1;
      });
    }
  });

  let mostUsedLabName = "—";
  let mostUsedLabRuns = 0;
  Object.entries(labRunAgg).forEach(([simId, runs]) => {
    if (runs > mostUsedLabRuns) {
      mostUsedLabRuns = runs;
      mostUsedLabName = SIMULATOR_TITLES[simId] || simId;
    }
  });

  const handleBroadcastAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    storageService.addAnnouncement({
      title: newAnnTitle.trim(),
      content: newAnnContent.trim(),
      priority: newAnnPriority,
      author: "Kapil (Administrator)"
    });

    setAnnouncements(storageService.getAnnouncements());
    setNewAnnTitle('');
    setNewAnnContent('');
    alert("Announcement published and broadcasted to all active learners!");
  };

  const handleResetLearner = (learnerId: string) => {
    const target = learnersList.find(l => l.id === learnerId);
    if (!target) return;

    if (confirm(`Are you sure you want to reset all curriculum progress and lab attempts for learner "${target.name}"? They will restart from Day 01.`)) {
      storageService.resetSpecificLearner(learnerId);
      refreshLearners();
      alert(`Progress reset for ${target.name}. All days 02-15 are locked again.`);
    }
  };

  const handleDeleteLearner = (learnerId: string) => {
    const target = learnersList.find(l => l.id === learnerId);
    if (!target) return;

    if (confirm(`Are you sure you want to permanently remove learner record for "${target.name}" (${target.email})? This action cannot be undone.`)) {
      storageService.deleteSpecificLearner(learnerId);
      refreshLearners();
      alert(`Learner ${target.name} has been removed.`);
    }
  };

  const handleExportCSV = () => {
    if (learnersList.length === 0) {
      alert("No real learners enrolled yet. Real sign-ups will be exported here once learners log in.");
      return;
    }

    const headers = "ID,Name,Email,Readiness Level,Readiness %,Modules Completed,Assessment Score,Assignments Count,Labs Completed,Streak,First Login,Last Active\n";
    const rows = learnersList.map(l => {
      const r = calculateCyberReadiness(l);
      const latestTest = l.assessmentScores && l.assessmentScores.length > 0 ? `${l.assessmentScores[0].percentage}%` : "Not Attempted";
      const asgCount = Object.keys(l.assignmentSubmissions || {}).length;
      return `"${l.id}","${l.name}","${l.email}","${r.currentLevel.levelName}",${r.overallPercentage},${l.completedModules.length},"${latestTest}",${asgCount},${l.completedLabs.length},${l.streakDays},"${l.firstLoginTimestamp?.split('T')[0] || ''}","${l.lastActiveDate || ''}"`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SarlaYash_Real_Learners_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#030712] py-8 px-4 sm:px-6 lg:px-8 text-slate-100 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Navigation Bar */}
        <div className="p-6 rounded-2xl bg-[#091124] border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
              <span>ADMIN MISSION CONTROL</span>
              <span>•</span>
              <span className="text-cyan-400">SARLAYASH SUPERVISORY PORTAL</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              Learner Performance Intelligence Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live telemetry for verified Google sign-ups • Zero fake statistics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshLearners}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh Real Learner Telemetry"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Real Data CSV</span>
            </button>

            <button
              onClick={onLogoutAdmin}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Exit Admin Session
            </button>
          </div>
        </div>

        {/* 1. REAL DYNAMIC METRICS BANNER (Zero Fake Numbers) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          
          <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/40 shadow-lg">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">TOTAL LEARNERS</span>
            <div className="text-2xl font-black text-white mt-1">
              {totalLearners} {totalLearners === 1 ? 'Learner' : 'Learners'}
            </div>
            <span className="text-[10px] text-cyan-400 mt-0.5 block font-mono">
              {totalLearners > 0 ? 'Verified Sign-ups' : 'Awaiting Sign-ups'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/40 shadow-lg">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">ACTIVE LEARNERS</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {activeLearners} Active
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">
              Active in last 7 days
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/40 shadow-lg">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">AVG READINESS</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">
              {totalLearners > 0 ? `${avgReadiness}%` : '0%'}
            </div>
            <span className="text-[10px] text-amber-400 mt-0.5 block font-mono truncate">
              {totalLearners > 0 ? `Lvl ${avgLevelObj.levelNumber}: ${avgLevelObj.levelName}` : 'No learner data'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/40 shadow-lg">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">AVG ASSESSMENT</span>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {avgAssessment !== null ? `${avgAssessment}%` : '—'}
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">
              {learnersWithAssessments.length > 0 ? `${learnersWithAssessments.length} Test(s) Graded` : '0 Tests Attempted'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/40 shadow-lg">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">STRONGEST TOPIC</span>
            <div className="text-base font-bold text-white mt-1.5 truncate">
              {strongestTopicName}
            </div>
            <span className="text-[10px] text-emerald-400 mt-0.5 block font-mono">
              {strongestTopicPct > 0 ? `${strongestTopicPct}% Avg Accuracy` : 'Awaiting Test Data'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/40 shadow-lg">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">MOST USED LAB</span>
            <div className="text-base font-bold text-white mt-1.5 truncate">
              {mostUsedLabName}
            </div>
            <span className="text-[10px] text-cyan-400 mt-0.5 block font-mono">
              {mostUsedLabRuns > 0 ? `${mostUsedLabRuns} Total Real Runs` : '0 Simulator Runs'}
            </span>
          </div>

        </div>

        {/* 2. MAIN WORKSPACE: LEARNERS DIRECTORY & INDIVIDUAL PERFORMANCE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Real Learners Directory */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search real learners by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-1 text-xs font-mono w-full sm:w-auto">
                  {(['ALL', 'Active', 'Day 01', 'Certified'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-2.5 py-1.5 rounded-lg border text-[11px] transition-colors cursor-pointer ${
                        filterStatus === s 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold' 
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real Learners List */}
              {filteredLearners.length > 0 ? (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {filteredLearners.map((lrn) => {
                    const isSelected = selectedLearnerId === lrn.id;
                    const r = calculateCyberReadiness(lrn);
                    const status = getLearnerStatus(lrn);

                    return (
                      <div
                        key={lrn.id}
                        onClick={() => setSelectedLearnerId(lrn.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-950/40 border-amber-500/50 shadow-md shadow-amber-950/40'
                            : 'bg-[#091326] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-3">
                          <img
                            src={lrn.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(lrn.name)}`}
                            alt={lrn.name}
                            className="w-9 h-9 rounded-full bg-slate-800 border border-cyan-500/40 object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-bold text-white truncate">{lrn.name}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono ${
                                status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' :
                                status === 'Certified' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' :
                                'bg-amber-950 text-amber-400 border border-amber-800/40'
                              }`}>
                                {status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 font-mono truncate">{lrn.email}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-mono font-bold text-amber-400 block">
                            {r.overallPercentage}%
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {r.currentLevel.levelName}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Authentic Zero-State for Real Sign-ups */
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {searchQuery ? "No matching real learners found" : "No Real Learners Enrolled Yet"}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    {searchQuery
                      ? `No real learners matching "${searchQuery}". Clear your search query to see all registered learners.`
                      : "When learners sign in using their Google accounts, their genuine identity, real progress, and lab metrics will appear here live."}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero Fake Data Policy: 100% Genuine Sign-Ups Only</span>
                  </div>
                </div>
              )}
            </div>

            {/* Broadcast Announcements Panel */}
            <form onSubmit={handleBroadcastAnnouncement} className="p-5 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Broadcast Notice to Active Learners
                </h4>
              </div>

              <input
                type="text"
                required
                value={newAnnTitle}
                onChange={(e) => setNewAnnTitle(e.target.value)}
                placeholder="Announcement Title (e.g. Day 10 Firewall Lab Extended)..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />

              <textarea
                rows={2}
                required
                value={newAnnContent}
                onChange={(e) => setNewAnnContent(e.target.value)}
                placeholder="Message body displayed in learner command centers..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />

              <div className="flex items-center justify-between pt-1">
                <select
                  value={newAnnPriority}
                  onChange={(e) => setNewAnnPriority(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300"
                >
                  <option value="normal">Priority: Normal</option>
                  <option value="urgent">Priority: Urgent</option>
                </select>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>

          </div>

          {/* Right Column: Individual Real Learner Performance Card */}
          <div className="lg:col-span-5 space-y-4">
            {selectedLearner ? (
              (() => {
                const r = calculateCyberReadiness(selectedLearner);
                const asgCount = Object.keys(selectedLearner.assignmentSubmissions || {}).length;
                const latestTest = selectedLearner.assessmentScores && selectedLearner.assessmentScores.length > 0
                  ? selectedLearner.assessmentScores[0]
                  : null;

                return (
                  <div className="p-6 rounded-2xl bg-[#081124] border border-amber-500/30 shadow-2xl space-y-5 animate-in fade-in">
                    
                    {/* Performance Card Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedLearner.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedLearner.name)}`}
                          alt={selectedLearner.name}
                          className="w-12 h-12 rounded-2xl bg-slate-800 border border-amber-500/40 object-cover"
                        />
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 font-bold block mb-0.5">
                            VERIFIED REAL LEARNER
                          </span>
                          <h3 className="text-lg font-bold text-white">
                            {selectedLearner.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-mono">{selectedLearner.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleResetLearner(selectedLearner.id)}
                          className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 transition-colors cursor-pointer"
                          title="Reset Learner Progress to Day 01"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLearner(selectedLearner.id)}
                          className="p-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/60 transition-colors cursor-pointer"
                          title="Permanently Delete Learner Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Real Metrics Breakdown Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">OVERALL READINESS</span>
                        <span className="text-lg font-bold text-cyan-400">{r.overallPercentage}%</span>
                        <span className="text-[10px] text-amber-400 block mt-0.5">
                          Lvl {r.currentLevel.levelNumber}: {r.currentLevel.levelName}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">MODULE PROGRESS</span>
                        <span className="text-lg font-bold text-white">
                          {selectedLearner.completedModules.length} / 15 Days
                        </span>
                        <span className="text-[10px] text-emerald-400 block mt-0.5">
                          {Math.round((selectedLearner.completedModules.length / 15) * 100)}% Syllabus
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">MOCK ASSESSMENT</span>
                        <span className="text-lg font-bold text-amber-400">
                          {latestTest ? `${latestTest.percentage}%` : '—'}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {latestTest ? `${latestTest.score} / ${latestTest.totalQuestions} MCQs` : 'Not attempted yet'}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">ASSIGNMENTS &amp; LABS</span>
                        <span className="text-lg font-bold text-white">
                          {asgCount} Asg / {selectedLearner.completedLabs.length} Labs
                        </span>
                        <span className="text-[10px] text-cyan-400 block mt-0.5">
                          Streak: {selectedLearner.streakDays}d
                        </span>
                      </div>
                    </div>

                    {/* Earned Badges */}
                    <div>
                      <span className="text-xs font-bold text-slate-300 font-mono block mb-1.5">
                        EARNED BADGES ({selectedLearner.earnedBadges?.length || 0}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedLearner.earnedBadges && selectedLearner.earnedBadges.length > 0 ? (
                          selectedLearner.earnedBadges.map((b, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
                              🛡 {b}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-500 italic">No badges earned yet.</span>
                        )}
                      </div>
                    </div>

                    {/* Real Hands-on Simulator Telemetry */}
                    <div>
                      <span className="text-xs font-bold text-slate-300 font-mono block mb-1.5">
                        VIRTUAL LAB ACTIVITY:
                      </span>
                      {selectedLearner.simulatorStats && Object.keys(selectedLearner.simulatorStats).length > 0 ? (
                        <div className="space-y-1.5 max-h-36 overflow-y-auto">
                          {Object.entries(selectedLearner.simulatorStats).map(([simId, metric]) => (
                            <div key={simId} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                              <span className="text-slate-300 font-mono">{SIMULATOR_TITLES[simId] || simId}</span>
                              <span className="text-cyan-400 font-mono text-[11px]">
                                {metric.runsCount} run(s) • Best: {metric.score} Pts
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic p-2 rounded-lg bg-slate-900/40 border border-slate-800/80">
                          Learner has not executed any in-browser simulators yet.
                        </p>
                      )}
                    </div>

                    {/* Recommended Instructor Intervention */}
                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 font-bold block">
                        RECOMMENDED INSTRUCTOR INTERVENTION:
                      </span>
                      <p className="text-slate-200">
                        {selectedLearner.completedModules.length === 0
                          ? "Learner is at Day 01. Recommend starting Day 01 Fundamentals and submitting the practical assignment."
                          : selectedLearner.completedModules.length < 10
                          ? `Currently on Day ${selectedLearner.currentModuleId}. Encourage completing remaining core networking and terminal labs.`
                          : selectedLearner.completedModules.length < 15
                          ? "Advanced stages reached. Encourage taking the 100-MCQ corporate mock assessment."
                          : "Curriculum completed! Endorse for SarlaYash official certification."}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono text-right">
                      First Login: {selectedLearner.firstLoginTimestamp?.split('T')[0] || 'Today'} • Last Active: {selectedLearner.lastActiveDate || 'Today'}
                    </div>

                  </div>
                );
              })()
            ) : (
              <div className="p-12 rounded-2xl bg-[#081124] border border-slate-800 text-center space-y-2">
                <Users className="w-8 h-8 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-400">No Learner Selected</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Select a real learner from the directory to inspect their live performance scorecard.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
