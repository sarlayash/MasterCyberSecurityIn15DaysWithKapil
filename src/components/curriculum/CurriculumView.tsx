import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  CheckCircle, 
  Bookmark, 
  Printer, 
  Search, 
  Edit3, 
  Send, 
  Clock, 
  Award, 
  Sparkles,
  Terminal,
  HelpCircle,
  FileText,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Lock,
  Unlock,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  X,
  RotateCcw,
  GraduationCap,
  Briefcase,
  Target
} from 'lucide-react';
import { MODULES_DATA } from '../../data/modulesData';
import { LearnerProfile, ModuleData, Question, AssessmentAttempt } from '../../types';
import { storageService } from '../../services/storageService';
import { getDayMockAssessment } from '../../data/questionBank';

interface CurriculumViewProps {
  learner: LearnerProfile;
  onUpdateLearner: (updated: LearnerProfile) => void;
  onLaunchLab?: (simId: string) => void;
  initialModuleId?: number;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  learner,
  onUpdateLearner,
  onLaunchLab,
  initialModuleId = 1
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(() => {
    if (storageService.isModuleUnlocked(initialModuleId, learner.completedModules)) {
      return initialModuleId;
    }
    const unlocked = MODULES_DATA.filter(m => storageService.isModuleUnlocked(m.id, learner.completedModules));
    return unlocked.length > 0 ? unlocked[unlocked.length - 1].id : 1;
  });
  const [activeTab, setActiveTab] = useState<'notes' | 'assessment' | 'assignment'>('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [personalNoteText, setPersonalNoteText] = useState(
    learner.personalNotes[selectedModuleId] || ''
  );
  const [assignmentResponse, setAssignmentResponse] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  // Day Mock Assessment State
  const [dayQuestions, setDayQuestions] = useState<Question[]>(() => getDayMockAssessment(selectedModuleId, 5));
  const [dayUserAnswers, setDayUserAnswers] = useState<Record<string, number>>({});
  const [dayAssessmentResult, setDayAssessmentResult] = useState<{ score: number; percentage: number; submitted: boolean } | null>(null);

  useEffect(() => {
    setDayQuestions(getDayMockAssessment(selectedModuleId, 5));
    setDayUserAnswers({});
    setDayAssessmentResult(null);
  }, [selectedModuleId]);


  // Locking and celebration modals state
  const [lockedModalData, setLockedModalData] = useState<{
    targetModule: ModuleData;
    requiredModule: ModuleData;
  } | null>(null);

  const [unlockedCelebrationModal, setUnlockedCelebrationModal] = useState<{
    completedModule: ModuleData;
    nextModule?: ModuleData;
  } | null>(null);

  const currentModule: ModuleData = MODULES_DATA.find(m => m.id === selectedModuleId) || MODULES_DATA[0];
  const isCompleted = learner.completedModules.includes(currentModule.id);
  const isBookmarked = learner.bookmarkedModules.includes(currentModule.id);
  const submission = learner.assignmentSubmissions[currentModule.id];

  const handleSelectModule = (id: number) => {
    const isUnlocked = storageService.isModuleUnlocked(id, learner.completedModules);
    if (!isUnlocked) {
      const target = MODULES_DATA.find(m => m.id === id);
      const required = MODULES_DATA.find(m => m.id === id - 1);
      if (target && required) {
        setLockedModalData({ targetModule: target, requiredModule: required });
      }
      return;
    }
    setSelectedModuleId(id);
    setPersonalNoteText(learner.personalNotes[id] || '');
    setAssignmentResponse(learner.assignmentSubmissions[id]?.learnerResponse || '');
    setSubmissionStatus(null);
  };

  const handleCompleteAndUnlockNext = (moduleId: number) => {
    const updated = storageService.updateModuleProgress(moduleId, true);
    if (updated) {
      onUpdateLearner(updated);
    }

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn("Confetti trigger:", e);
    }

    const completedMod = MODULES_DATA.find(m => m.id === moduleId);
    const nextMod = MODULES_DATA.find(m => m.id === moduleId + 1);
    if (completedMod) {
      setUnlockedCelebrationModal({
        completedModule: completedMod,
        nextModule: nextMod
      });
    }
  };

  const handleToggleComplete = () => {
    if (!isCompleted) {
      handleCompleteAndUnlockNext(currentModule.id);
    } else {
      const updated = storageService.updateModuleProgress(currentModule.id, false);
      if (updated) {
        onUpdateLearner(updated);
      }
    }
  };

  const handleToggleBookmark = () => {
    const learnerCopy = { ...learner };
    if (isBookmarked) {
      learnerCopy.bookmarkedModules = learnerCopy.bookmarkedModules.filter(id => id !== currentModule.id);
    } else {
      learnerCopy.bookmarkedModules.push(currentModule.id);
    }
    storageService.saveLearner(learnerCopy);
    onUpdateLearner(learnerCopy);
  };

  const handleSavePersonalNote = () => {
    storageService.savePersonalNote(currentModule.id, personalNoteText);
    const updated = storageService.getLearner();
    if (updated) {
      onUpdateLearner(updated);
    }
    alert('Personal note saved for ' + currentModule.dayNumber);
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentResponse.trim()) return;

    storageService.submitAssignment(currentModule.id, assignmentResponse);
    setSubmissionStatus('Assignment submitted successfully! Graded: 95/100.');
    handleCompleteAndUnlockNext(currentModule.id);
  };

  const handleSubmitDayAssessment = () => {
    let correct = 0;
    dayQuestions.forEach(q => {
      if (dayUserAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const percentage = Math.round((correct / dayQuestions.length) * 100);
    const result = { score: correct, percentage, submitted: true };
    setDayAssessmentResult(result);

    const attempt: AssessmentAttempt = {
      id: `att-day-${currentModule.id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      totalQuestions: dayQuestions.length,
      score: correct,
      percentage,
      timeSpentSeconds: 300,
      difficultyStats: {
        easy: { total: 2, correct: Math.min(2, correct) },
        medium: { total: 2, correct: Math.min(2, Math.max(0, correct - 2)) },
        hard: { total: 1, correct: Math.min(1, Math.max(0, correct - 4)) }
      },
      categoryScores: {
        [currentModule.category]: { total: dayQuestions.length, correct }
      },
      userAnswers: dayUserAnswers
    };

    storageService.recordAssessmentAttempt(attempt);

    if (percentage >= 70) {
      handleCompleteAndUnlockNext(currentModule.id);
    } else {
      const updated = storageService.getLearner();
      if (updated) {
        onUpdateLearner(updated);
      }
    }
  };

  const handleRetakeDayAssessment = () => {
    setDayQuestions(getDayMockAssessment(currentModule.id, 5));
    setDayUserAnswers({});
    setDayAssessmentResult(null);
  };

  const handlePrintNotes = () => {
    window.print();
  };


  return (
    <div className="min-h-screen bg-[#030712] py-8 px-4 sm:px-6 lg:px-8 text-slate-100 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl no-print">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <span>CYBER SECURITY ZERO-TO-INFINITY</span>
              <span>•</span>
              <span className="text-amber-400">15-DAY SEQUENTIAL PROGRESSION</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {currentModule.dayNumber}: {currentModule.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleBookmark}
              className={`p-2.5 rounded-xl border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Bookmark Module"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrintNotes}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Print Notes"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleToggleComplete}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                isCompleted 
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/20'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Completed ✓' : `Mark Complete & Unlock Next Day`}</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Sidebar: 15-Day Modules Navigator */}
          <div className="lg:col-span-4 space-y-3 no-print">
            <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Course Modules (15 Days)
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  {learner.completedModules.length} / 15 Done
                </span>
              </div>

              {/* Search modules input */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search module topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Module Buttons List */}
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                {MODULES_DATA
                  .filter(m => 
                    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    m.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((m) => {
                    const active = m.id === currentModule.id;
                    const done = learner.completedModules.includes(m.id);
                    const isUnlocked = storageService.isModuleUnlocked(m.id, learner.completedModules);

                    return (
                      <button
                        key={m.id}
                        onClick={() => handleSelectModule(m.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                          !isUnlocked
                            ? 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60 hover:opacity-90 hover:border-slate-800 hover:bg-slate-900/40 cursor-pointer'
                            : active
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-950/50'
                            : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[10px] font-mono font-bold ${!isUnlocked ? 'text-slate-600' : 'text-amber-400'}`}>
                              {m.dayNumber}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded ${!isUnlocked ? 'bg-slate-950 text-slate-600' : 'bg-slate-800 text-slate-400'}`}>
                              {m.category}
                            </span>
                          </div>
                          <p className={`text-xs font-semibold truncate ${!isUnlocked ? 'text-slate-500 group-hover:text-slate-400' : ''}`}>
                            {m.title}
                          </p>
                        </div>

                        {done ? (
                          <div className="flex items-center gap-1 text-emerald-400 shrink-0">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        ) : !isUnlocked ? (
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800/80 text-amber-500/70 text-[10px] font-mono shrink-0">
                            <Lock className="w-3 h-3 text-amber-500/80" />
                            <span>LOCKED</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-cyan-400 font-bold shrink-0">
                            {active ? 'ACTIVE' : `${m.estimatedMinutes}m`}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Right Main Content Area: Notes & Assignments */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 no-print">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Notes & Revision</span>
              </button>

              <button
                onClick={() => setActiveTab('assessment')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'assessment'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Day {currentModule.id} Mock Assessment</span>
                {dayAssessmentResult?.submitted && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('assignment')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'assignment'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Practical Assignment</span>
                {submission && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>
            </div>


            {/* TAB 1: STRUCTURED NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-6">
                
                {/* Topics Covered Box */}
                <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-3">
                    SYLLABUS & TOPICS COVERED
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentModule.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1. QUICK REVISION */}
                <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      QUICK REVISION
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {currentModule.notes.quickRevision.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <span className="text-cyan-400 font-bold font-mono">0{i+1}.</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. KEY TERMS */}
                <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      KEY TERMS & DEFINITIONS
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentModule.notes.keyTerms.map((term, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                        <span className="text-xs font-bold text-amber-400 block mb-1">
                          {term.term}
                        </span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {term.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. TOPIC-BY-TOPIC MASTERY: STUDENT ANALOGIES & REAL INDUSTRY USE CASES */}
                {currentModule.notes.topicBreakdowns && currentModule.notes.topicBreakdowns.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-500/30 shadow-xl space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-amber-400" />
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                            CONCEPTUAL CLARITY & DUAL PERSPECTIVE
                          </span>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            TOPIC BREAKDOWN: STUDENT ANALOGY & INDUSTRY REALITY
                          </h3>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/50 self-start sm:self-auto">
                        {currentModule.notes.topicBreakdowns.length} TOPICS EXPLAINED
                      </span>
                    </div>

                    <div className="space-y-4">
                      {currentModule.notes.topicBreakdowns.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <h4 className="text-xs font-bold text-white tracking-wide">
                              {item.topicName}
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                            {/* Student Life Analogy */}
                            <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>Student Life Analogy</span>
                              </div>
                              <p className="text-[11px] text-slate-300 leading-relaxed">
                                {item.studentAnalogy}
                              </p>
                            </div>

                            {/* Real Industry Use Case */}
                            <div className="p-3.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
                                <Briefcase className="w-3.5 h-3.5" />
                                <span>Real Industry Use Case</span>
                              </div>
                              <p className="text-[11px] text-slate-300 leading-relaxed">
                                {item.industryUseCase}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. REAL-WORLD INCIDENT CASE STUDY */}
                {currentModule.notes.caseStudy && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1322] to-[#081830] border border-amber-500/30 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                          <Target className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
                            {currentModule.dayNumber} INCIDENT CASE STUDY
                          </span>
                          <h3 className="text-sm font-bold text-white">
                            {currentModule.notes.caseStudy.title} ({currentModule.notes.caseStudy.incidentYear})
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] text-slate-300 font-mono self-start sm:self-auto">
                        Entity: {currentModule.notes.caseStudy.targetEntity}
                      </span>
                    </div>

                    {/* Summary */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                        Incident Overview & Vector
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {currentModule.notes.caseStudy.summary}
                      </p>
                    </div>

                    {/* Root Cause & Avoidance Blueprint Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-red-400 text-[11px] font-bold uppercase tracking-wider">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Technical Root Cause</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {currentModule.notes.caseStudy.rootCause}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Avoidance Blueprint & Defense Takeaway</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {currentModule.notes.caseStudy.defenseTakeaway}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. IMPORTANT COMMANDS (if applicable) */}
                {currentModule.notes.importantCommands && currentModule.notes.importantCommands.length > 0 && (
                  <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        IMPORTANT COMMANDS
                      </h3>
                    </div>
                    <div className="space-y-2.5">
                      {currentModule.notes.importantCommands.map((cmd, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                          <div className="flex items-center justify-between text-cyan-300 mb-1">
                            <code>{cmd.command}</code>
                            <span className="text-[10px] text-slate-500 font-sans">{cmd.purpose}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans">{cmd.usage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. INTERVIEW POINTS & COMMON MISTAKES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Interview Points */}
                  <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        INTERVIEW POINTS
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {currentModule.notes.interviewPoints.map((pt, i) => (
                        <li key={i} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                          <span className="text-indigo-400">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Mistakes */}
                  <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        COMMON MISTAKES
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {currentModule.notes.commonMistakes.map((mis, i) => (
                        <li key={i} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                          <span className="text-red-400">•</span>
                          <span>{mis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* 5. PERSONAL NOTES EDITOR */}
                <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg no-print">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        MY PERSONAL NOTES (SAVED TO BROWSER)
                      </h3>
                    </div>
                    <button
                      onClick={handleSavePersonalNote}
                      className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                    >
                      Save Note
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={personalNoteText}
                    onChange={(e) => setPersonalNoteText(e.target.value)}
                    placeholder="Write key takeaways, questions, or command syntaxes to remember..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Notes Navigation to Practical Assignment & Next Day Unlock */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#09152e] to-[#0c1e3f] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg no-print">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Ready to Test Your Knowledge & Unlock Next Day?</span>
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Solve the {currentModule.dayNumber} Practical Assignment to verify your understanding and unlock {currentModule.id < 15 ? `Day 0${currentModule.id + 1}` : 'Capstone Exam'}.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('assignment')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0"
                  >
                    <span>Proceed to Assignment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: DAY MOCK ASSESSMENT */}
            {activeTab === 'assessment' && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg space-y-6 animate-in fade-in">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">
                      {currentModule.dayNumber} TARGETED BENCHMARK
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {currentModule.title} - Day Mock Assessment
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      5 focused corporate questions testing {currentModule.dayNumber} core competencies. 70% required to pass.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                      {Object.keys(dayUserAnswers).length} / {dayQuestions.length} Answered
                    </span>
                  </div>
                </div>

                {/* If submitted, show Scorecard & Review */}
                {dayAssessmentResult?.submitted ? (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#09152e] to-[#0c1e3f] border border-cyan-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                          ASSESSMENT RESULT FOR {currentModule.dayNumber}
                        </span>
                        <h4 className="text-2xl font-black text-white">
                          Score: {dayAssessmentResult.percentage}% ({dayAssessmentResult.score} / {dayQuestions.length})
                        </h4>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          dayAssessmentResult.percentage >= 70
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : 'bg-red-950 text-red-400 border border-red-500/40'
                        }`}>
                          {dayAssessmentResult.percentage >= 70
                            ? '✓ PASSED • READY FOR NEXT MODULE'
                            : 'REVISION RECOMMENDED (<70%)'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleRetakeDayAssessment}
                          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Retake Quiz</span>
                        </button>

                        <button
                          onClick={() => setActiveTab('assignment')}
                          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <span>Proceed to Assignment</span>
                        </button>
                      </div>
                    </div>

                    {/* Explanations List */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        Question Explanations & Defensible Answers
                      </h4>
                      {dayQuestions.map((q, idx) => {
                        const ans = dayUserAnswers[q.id];
                        const isRight = ans === q.correctAnswer;

                        return (
                          <div key={q.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-cyan-400 font-mono">
                                Q{idx + 1} ({q.difficulty})
                              </span>
                              <span className={`px-2 py-0.5 rounded font-bold ${
                                isRight ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                              }`}>
                                {isRight ? 'CORRECT' : 'INCORRECT'}
                              </span>
                            </div>
                            <p className="font-semibold text-slate-200 text-sm">{q.question}</p>
                            <p className="text-slate-400">
                              Your answer: <span className={isRight ? 'text-emerald-300 font-bold' : 'text-red-300'}>
                                {ans !== undefined ? q.options[ans] : 'Not attempted'}
                              </span>
                            </p>
                            <p className="text-emerald-400 font-bold">
                              Correct answer: {q.options[q.correctAnswer]}
                            </p>
                            <p className="p-3 rounded-lg bg-slate-950 text-slate-300 leading-relaxed font-sans">
                              <strong>Explanation:</strong> {q.explanation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Active Quiz Questions */
                  <div className="space-y-6">
                    {dayQuestions.map((q, qIdx) => (
                      <div key={q.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            QUESTION {qIdx + 1} OF {dayQuestions.length}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                            {q.difficulty}
                          </span>
                        </div>

                        {q.scenario && (
                          <div className="p-3 rounded-lg bg-slate-950 text-xs text-slate-300 border border-slate-800/80">
                            {q.scenario}
                          </div>
                        )}

                        <p className="text-sm font-bold text-white">
                          {q.question}
                        </p>

                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = dayUserAnswers[q.id] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => setDayUserAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-3 cursor-pointer ${
                                  isSelected
                                    ? 'bg-cyan-950/80 border-cyan-400 text-white font-medium shadow-md shadow-cyan-950/60'
                                    : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                                  isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800">
                      <span className="text-xs font-mono text-slate-400">
                        {Object.keys(dayUserAnswers).length} / {dayQuestions.length} Questions Answered
                      </span>

                      <button
                        onClick={handleSubmitDayAssessment}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Submit Day 0{currentModule.id} Assessment</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 3: PRACTICAL ASSIGNMENT */}
            {activeTab === 'assignment' && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg space-y-6">
                
                {/* Assignment Metadata Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">
                      ASSIGNMENT TYPE: {currentModule.assignment.type}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {currentModule.assignment.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 font-bold">
                      {currentModule.assignment.difficulty}
                    </span>
                    <span className="text-slate-400">
                      ⏱ {currentModule.assignment.estimatedTime}
                    </span>
                    <span className="text-cyan-400 font-bold">
                      {currentModule.assignment.maxScore} Pts
                    </span>
                  </div>
                </div>

                {/* Objective */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Objective
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {currentModule.assignment.objective}
                  </p>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Instructions
                  </h4>
                  <div className="space-y-1.5">
                    {currentModule.assignment.instructions.map((ins, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 font-mono font-bold">•</span>
                        <span>{ins}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenge Snippet / Code (if present) */}
                {currentModule.assignment.challengeSnippet && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                    <span className="text-[10px] text-slate-500 block mb-1 font-sans">
                      CHALLENGE TELEMETRY / SNIPPET:
                    </span>
                    <code>{currentModule.assignment.challengeSnippet}</code>
                  </div>
                )}

                {/* Evaluation Criteria */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Evaluation Criteria
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentModule.assignment.evaluationCriteria.map((crit, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submission Form */}
                <form onSubmit={handleSubmitAssignment} className="pt-4 border-t border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-white mb-2">
                      Your Practical Response & Findings:
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={assignmentResponse}
                      onChange={(e) => setAssignmentResponse(e.target.value)}
                      placeholder="Type your structured incident report, remediation plan, or findings here..."
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  {submissionStatus && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>{submissionStatus}</span>
                    </div>
                  )}

                  {!isCompleted && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-emerald-300 block">
                          Ready to unlock {currentModule.id < 15 ? `Day 0${currentModule.id + 1}` : 'Capstone & Certification'}?
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Submitting your practical findings marks {currentModule.dayNumber} complete and unlocks the next day.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCompleteAndUnlockNext(currentModule.id)}
                        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Instant Complete & Unlock</span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {submission ? `Status: ${submission.status.toUpperCase()} (${submission.score}/${submission.maxScore})` : 'Status: NOT SUBMITTED'}
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submission ? 'Resubmit Assignment' : 'Submit & Unlock Next Day'}</span>
                    </button>
                  </div>
                </form>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* MODAL 1: LOCKED DAY BARRIER MODAL */}
      {lockedModalData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-md w-full bg-[#081124] border border-amber-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setLockedModalData(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2 mb-6">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                Sequential Progression Enforced
              </span>
              <h3 className="text-xl font-black text-white">
                {lockedModalData.targetModule.dayNumber} is Locked
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In <span className="text-cyan-400 font-semibold">Cyber Security Zero-To-Infinity</span>, all learners build real cybersecurity competency step-by-step starting strictly from Day 01. Random day jumping is restricted.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                Unlock Requirement:
              </span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold shrink-0">
                  {lockedModalData.requiredModule.id < 10 ? `0${lockedModalData.requiredModule.id}` : lockedModalData.requiredModule.id}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {lockedModalData.requiredModule.title}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Must be completed first to unlock {lockedModalData.targetModule.dayNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  const reqId = lockedModalData.requiredModule.id;
                  setLockedModalData(null);
                  handleSelectModule(reqId);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Go to {lockedModalData.requiredModule.dayNumber} Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLockedModalData(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-medium transition-colors"
              >
                Stay on Current Day
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: UNLOCK CELEBRATION MODAL */}
      {unlockedCelebrationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-md w-full bg-[#081124] border border-emerald-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl relative text-center">
            <button
              onClick={() => setUnlockedCelebrationModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 mx-auto">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>

            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
              Day Completed • Progress Recorded
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {unlockedCelebrationModal.completedModule.dayNumber} Mastered!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Outstanding work! You earned <span className="text-cyan-400 font-bold font-mono">+150 XP</span>. Your Cyber Readiness Meter and Cyber Performance Index have been updated.
            </p>

            {unlockedCelebrationModal.nextModule ? (
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-left mb-6">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold mb-1">
                  🔓 NEXT DAY UNLOCKED:
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                    {unlockedCelebrationModal.nextModule.id < 10 ? `0${unlockedCelebrationModal.nextModule.id}` : unlockedCelebrationModal.nextModule.id}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {unlockedCelebrationModal.nextModule.dayNumber}: {unlockedCelebrationModal.nextModule.title}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {unlockedCelebrationModal.nextModule.category} • {unlockedCelebrationModal.nextModule.estimatedMinutes} mins
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-center mb-6">
                <span className="text-xs font-bold text-amber-300 block">
                  🎓 All 15 Days Completed!
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  You have unlocked the Capstone Assessment & Official SarlaYash Certificate.
                </p>
              </div>
            )}

            <div className="space-y-2">
              {unlockedCelebrationModal.nextModule && (
                <button
                  onClick={() => {
                    const nextId = unlockedCelebrationModal.nextModule!.id;
                    setUnlockedCelebrationModal(null);
                    handleSelectModule(nextId);
                    setActiveTab('notes');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to {unlockedCelebrationModal.nextModule.dayNumber}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setUnlockedCelebrationModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
              >
                Stay on Current Day
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
