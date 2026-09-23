export type UserRole = 'learner' | 'admin';
export type TrackType = 'cybersecurity' | 'ethical-hacking';

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  firstLoginTimestamp: string;
  lastLoginTimestamp: string;
  streakDays: number;
  lastActiveDate: string;
  currentModuleId: number;
  completedModules: number[];
  assessmentScores: AssessmentAttempt[];
  completedLabs: string[];
  assignmentSubmissions: Record<number, AssignmentSubmission>;
  earnedBadges: string[];
  personalNotes: Record<number, string>;
  bookmarkedModules: number[];
  simulatorStats: Record<string, SimulatorMetric>;
  xp: number;
  activeTrack?: TrackType;
  ethicalHackingCurrentModuleId?: number;
  ethicalHackingCompletedModules?: number[];
  ethicalHackingSubmissions?: Record<number, AssignmentSubmission>;
  ethicalHackingNotes?: Record<number, string>;
  ethicalHackingBookmarks?: number[];
}

export interface SimulatorMetric {
  runsCount: number;
  lastRunTimestamp: string;
  score: number;
}

export interface AssessmentAttempt {
  id: string;
  timestamp: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  difficultyStats: {
    easy: { total: number; correct: number };
    medium: { total: number; correct: number };
    hard: { total: number; correct: number };
  };
  categoryScores: Record<string, { total: number; correct: number }>;
  userAnswers: Record<string, number>;
}

export interface AssignmentSubmission {
  moduleId: number;
  submittedAt: string;
  status: 'submitted' | 'graded';
  score: number;
  maxScore: number;
  learnerResponse: string;
  feedback?: string;
}

export interface ModuleData {
  id: number;
  track?: TrackType;
  dayNumber: string; // e.g. "DAY 01"
  title: string;
  shortDesc: string;
  topics: string[];
  category: string;
  estimatedMinutes: number;
  notes: {
    quickRevision: string[];
    keyTerms: { term: string; definition: string }[];
    importantCommands?: { command: string; usage: string; purpose: string }[];
    interviewPoints: string[];
    commonMistakes: string[];
    topicBreakdowns?: TopicBreakdown[];
    caseStudy?: DayCaseStudy;
  };
  assignment: {
    title: string;
    type: string;
    objective: string;
    instructions: string[];
    expectedOutput: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    estimatedTime: string;
    evaluationCriteria: string[];
    maxScore: number;
    challengeSnippet?: string;
  };
}

export interface TopicBreakdown {
  topicName: string;
  studentAnalogy: string;
  industryUseCase: string;
}

export interface DayCaseStudy {
  title: string;
  incidentYear: string;
  targetEntity: string;
  summary: string;
  rootCause: string;
  defenseTakeaway: string;
}

export interface Question {
  id: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  scenario?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface InterviewItem {
  id: string;
  category: 'HR' | 'Technical' | 'Scenario' | 'SOC' | 'Network' | 'Firewall' | 'Linux' | 'Incident Response' | 'Fundamentals';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  question: string;
  modelAnswer: string;
  keyPoints: string[];
  avoidSaying: string;
  followUpQuestion?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
  criteria: string;
}

export interface EarnedBadgeInfo {
  id: string;
  title: string;
  levelNumber?: number;
  category: 'level' | 'assessment' | 'milestone';
  icon: string;
  description: string;
  unlockedAt?: string;
  criteriaMet: string;
  badgeRank: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'TITANIUM';
  isUnlocked: boolean;
}

export interface HistoricalCyberAttack {
  id: string;
  name: string;
  year: number;
  region: 'India' | 'Global';
  target: string;
  sector: 'Healthcare' | 'Critical Infrastructure' | 'Banking' | 'Aviation' | 'Government' | 'Enterprise' | 'Tech';
  threatActor: string;
  attackVector: string;
  financialOrOperationalImpact: string;
  rootCauseVulnerability: string;
  avoidanceBlueprint: string[];
  technicalRemediation: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'normal' | 'urgent';
  author: string;
}

export interface PerformanceDimensions {
  knowledge: number; // 0-100
  practicalSkills: number;
  problemSolving: number;
  securityAwareness: number;
  investigation: number;
  decisionMaking: number;
  consistency: number;
  interviewReadiness: number;
  overallIndex: number;
}

