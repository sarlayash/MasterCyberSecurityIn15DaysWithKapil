import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Shield, 
  Terminal, 
  BookOpen, 
  Award, 
  Briefcase, 
  CheckCircle, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Compass, 
  Cpu, 
  Key, 
  FileCheck,
  Eye,
  Zap,
  Globe
} from 'lucide-react';

export interface TourStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  keyHighlights: string[];
  instructorTip: string;
  targetTab?: string;
  badge: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    stepNumber: 1,
    title: 'Welcome to Cyber Security Zero-To-Infinity',
    subtitle: 'Powered by SarlaYash Mission • Mentored by Kapil',
    category: 'ORIENTATION',
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    badge: 'MISSION CONTROL',
    description: 'Welcome to an elite, industry-grounded cybersecurity training platform. Designed from Kapil’s master curriculum, this portal transitions learners from digital foundations to corporate-level SOC operations, network defense, and incident handling.',
    keyHighlights: [
      'Comprehensive 15-Day modular curriculum with structured notes and assignments',
      '9 hands-on virtual lab simulators running live inside your browser',
      'Continuous competency benchmarking via the 10-level Cyber Readiness Meter'
    ],
    instructorTip: 'Cybersecurity is not spectator sports—it is a hands-on discipline. Every concept you learn here is paired with real corporate telemetry.',
    targetTab: 'dashboard'
  },
  {
    id: 'auth-security',
    stepNumber: 2,
    title: 'Verified Google Accounts & Firestore Cloud Sync',
    subtitle: 'Zero Fake Accounts • Cryptographically Bound Identity',
    category: 'IDENTITY & SECURITY',
    icon: <Key className="w-8 h-8 text-amber-400" />,
    badge: 'FIREBASE AUTH',
    description: 'We do not permit unverified fake profiles. All learners authenticate securely via their genuine Google Account through Firebase Auth. Your learning streak, XP, simulator performance, and capstone quiz submissions are backed up in real time to Cloud Firestore.',
    keyHighlights: [
      'Single-click genuine Google Sign-In with popup OAuth authentication',
      'Cloud Firestore profile synchronization across all your desktop and mobile devices',
      'Tamper-resistant credential binding for official certificates'
    ],
    instructorTip: 'In corporate SOC environments, non-repudiation is key. Your verified Google identity ensures all lab submissions and certificates are fully defensible to hiring managers.'
  },
  {
    id: 'curriculum-locking',
    stepNumber: 3,
    title: 'Strict Day 1 Start & Sequential Day Progression',
    subtitle: 'No Random Skipping • Complete Previous Day to Unlock Next',
    category: 'PEDAGOGY',
    icon: <Lock className="w-8 h-8 text-cyan-400" />,
    badge: 'SEQUENTIAL LOCK',
    description: 'All learners must start from Day 01. To ensure rigorous conceptual retention, Days 02 through 15 remain strictly padlocked 🔒. A subsequent day is only unlocked after you complete and submit the preceding day’s practical assignment.',
    keyHighlights: [
      'Day 1 is unlocked for everyone immediately upon sign-in',
      'Days 2 to 15 unlock sequentially one-by-one as you finish each day’s assignment',
      'Clicking a locked day displays an instant prerequisite guide directing you to the required module'
    ],
    instructorTip: 'Skipping fundamentals leads to vulnerabilities in real incident triage. Follow the 15-day sequence methodically.',
    targetTab: 'curriculum'
  },
  {
    id: 'cyber-readiness',
    stepNumber: 4,
    title: 'Cyber Readiness Meter & 8-Dimension CPI',
    subtitle: 'Internal Competency Benchmark: Level 1 to Level 10',
    category: 'SCORING ENGINE',
    icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
    badge: 'LEVEL 1 TO 10',
    description: 'Track your growth with our proprietary Cyber Readiness scoring engine. As you read revision notes, finish lab commands, and solve scenario MCQs, you progress through 10 defined operational readiness tiers from Digital Awareness to Zero-To-Infinity Mastery.',
    keyHighlights: [
      '10 Readiness Levels: Digital Awareness ➔ Foundational ➔ Practical ➔ SOC ➔ Mastery',
      '8-Dimension Cyber Performance Index (CPI) analyzing Knowledge, Investigation, and Decision Making',
      'Dynamic Learning Intelligence providing automated personalized next-action recommendations'
    ],
    instructorTip: 'Review your 8-dimension CPI radar on the dashboard regularly to identify and strengthen your weak technical domains.',
    targetTab: 'dashboard'
  },
  {
    id: 'simulators-lab',
    stepNumber: 5,
    title: 'Virtual Cyber Lab: 9 Interactive Simulators',
    subtitle: 'Zero Setup • Realistic Operating System & Security Tool Telemetry',
    category: 'HANDS-ON LABS',
    icon: <Terminal className="w-8 h-8 text-blue-400" />,
    badge: '9 IN-BROWSER LABS',
    description: 'Practice real commands and investigations directly in your browser without spinning up complex local virtual machines. Our 9 simulators mirror authentic enterprise tools and network security workflows.',
    keyHighlights: [
      'Command Prompt & Linux Shell: Execute ipconfig, ping, netstat, grep, and chmod',
      'Firewall Rule Engine: Test stateful packet filtering and port drop/allow hierarchies',
      'Wireshark & SOC SIEM: Inspect raw PCAPs, detect port scans, and triage brute-force alerts',
      'Digital Forensics & Phishing Analyzer: Extract metadata, hashes, and decode suspicious headers'
    ],
    instructorTip: 'Try typing "help" in the terminal simulators or click "Quick Test Scenarios" to explore real attack footprints safely.',
    targetTab: 'simulators'
  },
  {
    id: 'mock-assessment',
    stepNumber: 6,
    title: '100-MCQ Corporate Mock Assessment Engine',
    subtitle: 'Timed Exam Simulation • 150+ Defensible Industry Scenarios',
    category: 'EVALUATION',
    icon: <CheckCircle className="w-8 h-8 text-indigo-400" />,
    badge: 'TIMED 90-MIN EXAM',
    description: 'Test your operational knowledge with realistic corporate scenario questions. The engine dynamically serves 100 questions balanced across 30 Easy, 40 Medium, and 30 Hard questions with instant question palette navigation.',
    keyHighlights: [
      '90-minute realistic countdown timer with question palette bookmarking',
      'Detailed category breakdown across Networking, Attacks, SOC, Linux, and Incident Response',
      'Instant post-test review with complete defensible explanations and reference points'
    ],
    instructorTip: 'Take the assessment after completing Day 10 to validate your core security foundations before tackling the advanced capstone.',
    targetTab: 'assessment'
  },
  {
    id: 'interview-hub',
    stepNumber: 7,
    title: 'Interview Preparation Hub & Model Answers',
    subtitle: 'Filterable Interview Rubrics Across HR, SOC, and Technical Rounds',
    category: 'CAREER ACCELERATOR',
    icon: <Briefcase className="w-8 h-8 text-amber-400" />,
    badge: 'HIRING READY',
    description: 'Crack cybersecurity interviews with Kapil’s curated question bank. Access categorized questions with expected key points, structured model answers, and tips on avoiding common junior candidate traps.',
    keyHighlights: [
      'Categorized by domain: SOC Analyst, Network Defense, Linux Administration, and HR',
      'Confidence toggle to track your mastery of tricky questions',
      'Kapil’s Pro-Tips on how to articulate complex concepts clearly to hiring managers'
    ],
    instructorTip: 'Interviewers look for thought process and methodology, not just memorized textbook answers. Study the structured answers closely.',
    targetTab: 'interview'
  },
  {
    id: 'certificate',
    stepNumber: 8,
    title: 'Official Certificate & Public QR Verification',
    subtitle: 'Verified SarlaYash Mission Credentials with Instructor Signature',
    category: 'CREDENTIALING',
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    badge: 'VERIFIED CREDENTIAL',
    description: 'Once you complete all 15 curriculum modules and achieve a 70%+ score on the corporate assessment, you unlock your official Certificate of Completion signed by Kapil, complete with an immutable verification ID and verifiable QR code.',
    keyHighlights: [
      'High-resolution verifiable certificate suitable for LinkedIn and resumes',
      'Public QR verification page allowing employers to confirm authentic credential issuance',
      'Includes total verified hours, final CPI score, and SarlaYash Mission seal'
    ],
    instructorTip: 'Your certificate is backed by your actual lab completion records. It represents genuine, verifiable skill.',
    targetTab: 'certificate'
  }
];

interface DemoTourProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DemoTour: React.FC<DemoTourProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleFinish();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn("Tour confetti trigger:", e);
    }
    localStorage.setItem('sym_cyber_demo_tour_seen', 'true');
    onClose();
  };

  const handleJumpToFeature = () => {
    if (currentStep.targetTab) {
      onNavigateTab(currentStep.targetTab);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="max-w-2xl w-full bg-[#081124] border border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        
        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                {currentStep.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Step {currentStep.stepNumber} of {TOUR_STEPS.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Skip Demo Tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-400 transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step Hero & Title */}
          <div className="mt-6 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-950/50">
              {currentStep.icon}
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
                {currentStep.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {currentStep.title}
              </h2>
              <p className="text-xs text-cyan-300 font-mono mt-0.5">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          {/* Body Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
            {currentStep.description}
          </p>

          {/* Key Highlights Bullet points */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              PORTAL CAPABILITIES IN THIS SECTION:
            </span>
            {currentStep.keyHighlights.map((hl, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>

          {/* Instructor Tip from Kapil */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block mb-0.5">Kapil's Mentor Note:</span>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">
                "{currentStep.instructorTip}"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Controls */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial ${
                isFirstStep
                  ? 'border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentStep.targetTab && (
              <button
                onClick={handleJumpToFeature}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-800/60 text-cyan-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Explore Feature Now</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{isLastStep ? 'Complete Tour & Start Day 01 🚀' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
