import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Bookmark, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight,
  TrendingUp,
  FileText,
  ListFilter,
  Sparkles,
  X,
  ChevronRight,
  CheckSquare,
  Calendar,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { Question, AssessmentAttempt, LearnerProfile } from '../../types';
import { generate100MockAssessment, getDayMockAssessment, DAY_TOPIC_MAPPING } from '../../data/questionBank';
import { storageService } from '../../services/storageService';

interface MockAssessmentProps {
  learner: LearnerProfile;
  onUpdateLearner: (updated: LearnerProfile) => void;
}

export const MockAssessment: React.FC<MockAssessmentProps> = ({
  learner,
  onUpdateLearner
}) => {
  // Test selection modes: 100-MCQ benchmark or Day-by-Day Mock Assessment
  const [examMode, setExamMode] = useState<'100_BENCHMARK' | 'DAY_ASSESSMENT'>('100_BENCHMARK');
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(60 * 60);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(60 * 60);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<AssessmentAttempt | null>(null);
  const [filterMode, setFilterMode] = useState<'ALL' | 'ANSWERED' | 'UNANSWERED' | 'MARKED'>('ALL');
  const [reviewMode, setReviewMode] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Countdown timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isTestActive && !isSubmitted && timeRemainingSeconds > 0) {
      timer = setInterval(() => {
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestActive, isSubmitted, timeRemainingSeconds]);

  const handleStartTest = (mode: '100_BENCHMARK' | 'DAY_ASSESSMENT' = examMode, dayNum: number = selectedDay) => {
    let qList: Question[] = [];
    let allottedSeconds = 60 * 60; // 60 mins default for 100 MCQs

    if (mode === '100_BENCHMARK') {
      qList = generate100MockAssessment();
      allottedSeconds = 60 * 60;
    } else {
      qList = getDayMockAssessment(dayNum, 10); // 10 targeted questions for Day assessment
      allottedSeconds = 15 * 60; // 15 mins for day test
    }

    setExamMode(mode);
    setSelectedDay(dayNum);
    setQuestions(qList);
    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setTimeRemainingSeconds(allottedSeconds);
    setTotalTimeSeconds(allottedSeconds);
    setIsTestActive(true);
    setIsSubmitted(false);
    setAttemptResult(null);
    setReviewMode(false);
    setIsConfirmModalOpen(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleToggleReview = (questionId: string) => {
    setMarkedForReview(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmitTest = () => {
    if (isSubmitted || questions.length === 0) return;
    setIsSubmitted(true);
    setIsTestActive(false);
    setIsConfirmModalOpen(false);

    // Calculate score, difficulty stats, category scores
    let correctCount = 0;
    const diffStats = {
      easy: { total: 0, correct: 0 },
      medium: { total: 0, correct: 0 },
      hard: { total: 0, correct: 0 }
    };
    const catScores: Record<string, { total: number; correct: number }> = {};

    questions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount++;

      // Difficulty breakdown
      const diffKey = q.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';
      if (diffStats[diffKey]) {
        diffStats[diffKey].total++;
        if (isCorrect) diffStats[diffKey].correct++;
      }

      // Category breakdown
      if (!catScores[q.category]) {
        catScores[q.category] = { total: 0, correct: 0 };
      }
      catScores[q.category].total++;
      if (isCorrect) catScores[q.category].correct++;
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const attempt: AssessmentAttempt = {
      id: `att-${Date.now()}`,
      timestamp: new Date().toISOString(),
      totalQuestions: questions.length,
      score: correctCount,
      percentage,
      timeSpentSeconds: totalTimeSeconds - timeRemainingSeconds,
      difficultyStats: diffStats,
      categoryScores: catScores,
      userAnswers
    };

    setAttemptResult(attempt);
    storageService.recordAssessmentAttempt(attempt);

    // If day assessment passed (>= 70%), unlock next day automatically
    if (examMode === 'DAY_ASSESSMENT' && percentage >= 70) {
      storageService.updateModuleProgress(selectedDay, true);
    }

    const updated = storageService.getLearner();
    onUpdateLearner(updated);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn("Confetti error", e);
    }

    // Scroll smoothly to top so results scorecard is immediately displayed
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-[#030712] py-6 px-4 sm:px-6 lg:px-8 text-slate-100 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Sticky Floating Progress & Submit Bar (Always in view when test is active) */}
        {isTestActive && (
          <div className="sticky top-2 z-30 p-3 sm:p-4 rounded-2xl bg-[#09152b]/95 backdrop-blur-md border border-cyan-500/50 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{examMode === '100_BENCHMARK' ? '100-MCQ Corporate Benchmark' : `Day 0${selectedDay} Mock Assessment`}</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-slate-300">
                Q{currentIndex + 1} of {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Progress pill */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono flex items-center gap-1.5 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{answeredCount} / {questions.length} Ans</span>
                <span className="text-emerald-400 font-bold">({Math.round((answeredCount / questions.length) * 100)}%)</span>
              </div>

              {/* Timer pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 font-mono text-xs font-bold text-amber-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>

              {/* Prominent Submit Exam Button */}
              <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center gap-1.5 cursor-pointer transform hover:scale-105"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Submit Exam</span>
              </button>
            </div>
          </div>
        )}

        {/* Assessment Header (when not active) */}
        {!isTestActive && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
                <span>SARLAYASH BENCHMARK</span>
                <span>•</span>
                <span className="text-amber-400">CORPORATE ASSESSMENT HUB</span>
              </div>
              <h1 className="text-2xl font-black text-white">
                Cybersecurity Mock Assessment Center
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Standardized corporate evaluation: 100-MCQ comprehensive benchmark or day-by-day targeted assessments.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setExamMode('100_BENCHMARK')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  examMode === '100_BENCHMARK'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                100-MCQ Benchmark
              </button>

              <button
                onClick={() => setExamMode('DAY_ASSESSMENT')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  examMode === 'DAY_ASSESSMENT'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Day-by-Day Mock Tests
              </button>
            </div>
          </div>
        )}

        {/* 1. START SCREEN (when not active and not submitted) */}
        {!isTestActive && !isSubmitted && (
          <div className="space-y-6">
            
            {examMode === '100_BENCHMARK' ? (
              /* Mode 1: 100-Question Corporate Benchmark */
              <div className="p-8 sm:p-12 rounded-3xl bg-[#081124] border border-cyan-900/50 shadow-2xl text-center space-y-6 max-w-2xl mx-auto animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Ready for the 100-MCQ Corporate Assessment?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    This assessment simulates rigorous enterprise screening standards. Questions span 16 critical cybersecurity domains with no trick phrasing and one defensible best answer.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">TOTAL QUESTIONS</span>
                    <span className="text-xl font-bold text-cyan-400">100 MCQs</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">TIME ALLOTTED</span>
                    <span className="text-xl font-bold text-amber-400">60 Mins</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">BENCHMARK PASS</span>
                    <span className="text-xl font-bold text-emerald-400">70% Score</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleStartTest('100_BENCHMARK')}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Begin 100-Question Assessment
                  </button>
                </div>
              </div>
            ) : (
              /* Mode 2: Day-by-Day Mock Assessment Picker */
              <div className="p-6 sm:p-8 rounded-3xl bg-[#081124] border border-amber-500/30 shadow-2xl space-y-6 max-w-4xl mx-auto animate-in fade-in">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>CURRICULUM MOCK ASSESSMENTS</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Select a Day for Targeted Mock Assessment
                  </h2>
                  <p className="text-xs text-slate-400 max-w-lg mx-auto">
                    Test your mastery of any day from the 15-day workshop. Each test contains 10 domain-specific questions with instant grading and defensible explanations.
                  </p>
                </div>

                {/* Day Grid 1-15 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.from({ length: 15 }, (_, i) => i + 1).map(dayNum => {
                    const topicMeta = DAY_TOPIC_MAPPING[dayNum];
                    const isUnlocked = storageService.isModuleUnlocked(dayNum, learner.completedModules);
                    const isSelected = selectedDay === dayNum;

                    return (
                      <div
                        key={dayNum}
                        onClick={() => setSelectedDay(dayNum)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-950/50'
                            : isUnlocked
                            ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                            : 'bg-slate-950/40 border-slate-900 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1 text-[11px] font-mono">
                            <span className={isSelected ? 'text-amber-300 font-bold' : 'text-slate-400 font-bold'}>
                              DAY 0{dayNum}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                              10 MCQs • 15m
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">
                            {topicMeta?.title || `Day 0${dayNum}`}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                            Topics: {topicMeta?.categories.join(', ')}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px]">
                          <span className={isUnlocked ? 'text-emerald-400 font-mono' : 'text-slate-500 font-mono'}>
                            {isUnlocked ? '✓ Unlocked' : '🔒 Day Lock'}
                          </span>
                          <span className="text-amber-400 font-bold flex items-center gap-1">
                            <span>Select</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 text-center">
                  <button
                    onClick={() => handleStartTest('DAY_ASSESSMENT', selectedDay)}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Start Day 0{selectedDay} Mock Assessment (10 Questions)
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 2. ACTIVE TEST ENGINE (Question Navigator & Options) */}
        {isTestActive && currentQ && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8 Cols: Question Display */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    QUESTION {currentIndex + 1} OF {questions.length}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {currentQ.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                    currentQ.difficulty === 'EASY' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' :
                    currentQ.difficulty === 'MEDIUM' ? 'bg-amber-950 text-amber-400 border-amber-500/40' :
                    'bg-red-950 text-red-400 border-red-500/40'
                  }`}>
                    {currentQ.difficulty}
                  </span>

                  <button
                    onClick={() => handleToggleReview(currentQ.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      markedForReview[currentQ.id] 
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Mark for Review"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scenario Context (if provided) */}
              {currentQ.scenario && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                  <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                    WORKPLACE INCIDENT SCENARIO:
                  </span>
                  {currentQ.scenario}
                </div>
              )}

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQ.id] === oIdx;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(currentQ.id, oIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 text-white font-medium shadow-md shadow-cyan-950/60'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="mt-0.5 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* All Questions Answered Callout Banner */}
              {answeredCount === questions.length && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>All {questions.length} questions attempted! Ready to calculate final score?</span>
                  </div>
                  <button
                    onClick={() => setIsConfirmModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-emerald-500/20 shrink-0"
                  >
                    Submit Exam Now 🚀
                  </button>
                </div>
              )}

              {/* Navigation Footer (with prominent Submit on last question or when ready) */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setCurrentIndex(Math.max(0, currentIndex - 1));
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {/* On last question (or when all answered), prominent Submit Button */}
                  {currentIndex === questions.length - 1 ? (
                    <button
                      onClick={() => setIsConfirmModalOpen(true)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2 cursor-pointer transform hover:scale-105"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Submit {questions.length}-Question Assessment 🚀</span>
                    </button>
                  ) : (
                    <>
                      {answeredCount === questions.length && (
                        <button
                          onClick={() => setIsConfirmModalOpen(true)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Submit Now ({answeredCount}/{questions.length})</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1));
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Question Palette Sidebar */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                <span className="font-bold text-slate-300">QUESTION PALETTE</span>
                <span className="text-cyan-400">
                  {answeredCount} / {questions.length} Answered
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="grid grid-cols-4 gap-1 text-[10px] font-mono">
                {(['ALL', 'ANSWERED', 'UNANSWERED', 'MARKED'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterMode(f)}
                    className={`py-1 rounded text-center transition-colors cursor-pointer ${
                      filterMode === f ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Question Buttons Grid */}
              <div className={`grid ${questions.length > 20 ? 'grid-cols-10' : 'grid-cols-5'} gap-1.5 max-h-72 overflow-y-auto pr-1`}>
                {questions.map((q, idx) => {
                  const isAns = userAnswers[q.id] !== undefined;
                  const isMarked = markedForReview[q.id];
                  const isCur = idx === currentIndex;

                  if (filterMode === 'ANSWERED' && !isAns) return null;
                  if (filterMode === 'UNANSWERED' && isAns) return null;
                  if (filterMode === 'MARKED' && !isMarked) return null;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className={`h-7 rounded text-[11px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                        isCur
                          ? 'border-2 border-cyan-400 text-white bg-cyan-900'
                          : isMarked
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                          : isAns
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Answered
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Marked
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" /> Unanswered
                </span>
              </div>

              {/* Dedicated Submit Box in Sidebar */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-3 pt-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Test Progress:</span>
                  <span className="text-cyan-400 font-bold">{answeredCount} / {questions.length} ({Math.round((answeredCount / questions.length) * 100)}%)</span>
                </div>
                
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                  />
                </div>

                <button
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Assessment ({answeredCount}/{questions.length})</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* 3. SUBMISSION REPORT & ANALYSIS (Instant Feedback Scorecard) */}
        {isSubmitted && attemptResult && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Scorecard Hero Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#091326] via-[#0d1a33] to-[#091326] border border-cyan-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                  ASSESSMENT COMPLETED • {examMode === '100_BENCHMARK' ? 'SARLAYASH 100-MCQ BENCHMARK' : `DAY 0${selectedDay} MOCK ASSESSMENT`}
                </span>
                <h2 className="text-3xl font-extrabold text-white">
                  Score: {attemptResult.percentage}% ({attemptResult.score} / {attemptResult.totalQuestions})
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    attemptResult.percentage >= 70 ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400 border border-red-500/40'
                  }`}>
                    {attemptResult.percentage >= 70 ? '✓ BENCHMARK PASSED (READY)' : 'REVISION RECOMMENDED (<70%)'}
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    Time elapsed: {Math.floor(attemptResult.timeSpentSeconds / 60)}m {attemptResult.timeSpentSeconds % 60}s
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setReviewMode(!reviewMode)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {reviewMode ? 'Hide Explanations' : 'Review Questions & Explanations'}
                </button>

                <button
                  onClick={() => handleStartTest(examMode, selectedDay)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Test</span>
                </button>
              </div>
            </div>

            {/* Difficulty & Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Difficulty Breakdown */}
              <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Difficulty-Wise Accuracy
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-400 font-bold">Easy Questions ({attemptResult.difficultyStats.easy.total})</span>
                      <span className="font-mono text-slate-300">
                        {attemptResult.difficultyStats.easy.correct} / {attemptResult.difficultyStats.easy.total}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(attemptResult.difficultyStats.easy.correct / Math.max(1, attemptResult.difficultyStats.easy.total)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-amber-400 font-bold">Medium Questions ({attemptResult.difficultyStats.medium.total})</span>
                      <span className="font-mono text-slate-300">
                        {attemptResult.difficultyStats.medium.correct} / {attemptResult.difficultyStats.medium.total}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(attemptResult.difficultyStats.medium.correct / Math.max(1, attemptResult.difficultyStats.medium.total)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-red-400 font-bold">Hard Questions ({attemptResult.difficultyStats.hard.total})</span>
                      <span className="font-mono text-slate-300">
                        {attemptResult.difficultyStats.hard.correct} / {attemptResult.difficultyStats.hard.total}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${(attemptResult.difficultyStats.hard.correct / Math.max(1, attemptResult.difficultyStats.hard.total)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category-Wise Performance */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Domain Performance Breakdown
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-52 overflow-y-auto pr-1">
                  {Object.entries(attemptResult.categoryScores).map(([cat, score]) => {
                    const pct = Math.round((score.correct / Math.max(1, score.total)) * 100);

                    return (
                      <div key={cat} className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-slate-200 truncate">{cat}</span>
                          <span className="font-mono text-cyan-400 font-bold">{pct}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-cyan-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Review Mode (All Questions with Defensible Explanations) */}
            {reviewMode && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-white font-mono">
                  Full Question Review & Defensible Explanations
                </h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {questions.map((q, qIndex) => {
                    const userPick = userAnswers[q.id];
                    const isRight = userPick === q.correctAnswer;

                    return (
                      <div key={q.id} className="p-5 rounded-2xl bg-[#081124] border border-slate-800 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-400 font-mono">
                            Q{qIndex + 1}: {q.category} ({q.difficulty})
                          </span>
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            isRight ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                          }`}>
                            {isRight ? 'CORRECT' : 'INCORRECT'}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-slate-200">
                          {q.question}
                        </p>

                        <div className="space-y-1 font-mono text-[11px]">
                          <p className="text-slate-400">
                            Your answer: <span className={isRight ? 'text-emerald-300 font-bold' : 'text-red-300'}>
                              {userPick !== undefined ? q.options[userPick] : 'Not Attempted'}
                            </span>
                          </p>
                          <p className="text-emerald-400 font-bold">
                            Correct answer: {q.options[q.correctAnswer]}
                          </p>
                        </div>

                        <p className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs leading-relaxed font-sans">
                          <strong>Defensible Corporate Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Submit Confirmation Dialog Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#09152b] border border-cyan-500/50 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Submit Assessment for Scoring?</h3>
              </div>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Questions:</span>
                  <span className="text-white font-bold">{questions.length} MCQs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Questions Answered:</span>
                  <span className="text-emerald-400 font-bold">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Unanswered Questions:</span>
                  <span className={questions.length - answeredCount > 0 ? "text-amber-400 font-bold" : "text-slate-500 font-bold"}>
                    {questions.length - answeredCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Marked for Review:</span>
                  <span className="text-amber-400 font-bold">
                    {Object.values(markedForReview).filter(Boolean).length}
                  </span>
                </div>
              </div>

              {questions.length - answeredCount > 0 ? (
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] leading-relaxed flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>You have {questions.length - answeredCount} unanswered questions. Unanswered questions will receive 0 marks.</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] leading-relaxed flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span>All {questions.length} questions attempted! Your scorecard and readiness evaluation will be generated instantly.</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Review Questions
              </button>
              <button
                onClick={handleSubmitTest}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm &amp; Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
