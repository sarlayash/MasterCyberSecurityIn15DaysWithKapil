import { LearnerProfile, Announcement, AssignmentSubmission, TrackType, ModuleData, ModuleLockStatus } from '../types';
import { syncLearnerToFirestore } from './firebase';
import { MODULES_DATA } from '../data/modulesData';
import { ETHICAL_HACKING_MODULES_DATA } from '../data/ethicalHackingModulesData';

const STORAGE_KEY_LEARNER = 'sym_cyber_current_learner';
const STORAGE_KEY_ANNOUNCEMENTS = 'sym_cyber_announcements';
const STORAGE_KEY_REGISTERED_LEARNERS = 'sym_cyber_registered_learners';
const STORAGE_KEY_ACTIVE_TRACK = 'sym_cyber_active_track';

// Strict fresh learner starting at Day 1 with all other days locked
export const DEFAULT_LEARNER: LearnerProfile = {
  id: 'learner-initial',
  name: 'Cyber Defender',
  email: 'learner@sarlayash.org',
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=sarlayash',
  firstLoginTimestamp: new Date().toISOString(),
  lastLoginTimestamp: new Date().toISOString(),
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  activeTrack: 'cybersecurity',
  currentModuleId: 1, // Strictly Day 1
  completedModules: [], // Strictly Day 2-15 locked until Day 1 is completed!
  ethicalHackingCurrentModuleId: 101, // Strictly Day 1 of Ethical Hacking
  ethicalHackingCompletedModules: [],
  assessmentScores: [],
  completedLabs: [],
  assignmentSubmissions: {},
  earnedBadges: ['Security Starter'],
  personalNotes: {},
  bookmarkedModules: [],
  simulatorStats: {},
  xp: 100
};

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-01",
    title: "Welcome to Day 06: Command Line Security Lab is Live!",
    content: "Learners can now access the interactive in-browser Command Prompt and Linux terminal simulators. Practice ipconfig, netstat, and file auditing commands safely.",
    date: "2026-09-23",
    priority: "urgent",
    author: "Kapil (Lead Instructor)"
  },
  {
    id: "ann-02",
    title: "100-MCQ Corporate Mock Assessment Window Open",
    content: "The corporate mock assessment engine has been updated with 150+ new defensible scenario questions. Test your readiness before the Day 15 Capstone.",
    date: "2026-09-22",
    priority: "normal",
    author: "SarlaYash Academic Council"
  }
];

export const storageService = {
  getLearner(): LearnerProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_LEARNER);
      if (data) {
        const parsed = JSON.parse(data);
        // Strictly purge any mock / placeholder / unverified dummy bypass accounts
        if (
          !parsed ||
          parsed.id === 'learner-initial' ||
          parsed.id?.startsWith('google-') || 
          parsed.email === 'ka20154112@wipro.com' ||
          parsed.email === 'learner@sarlayash.org'
        ) {
          localStorage.removeItem(STORAGE_KEY_LEARNER);
          return null;
        }
        return parsed;
      }
    } catch (e) {
      console.error("Storage read error", e);
    }
    return null;
  },

  getAllRegisteredLearners(): LearnerProfile[] {
    try {
      // Purge any legacy dummy mock keys
      localStorage.removeItem('sym_cyber_admin_learners');

      const raw = localStorage.getItem(STORAGE_KEY_REGISTERED_LEARNERS);
      let list: LearnerProfile[] = [];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Strictly filter out any mock/seed learners and any unverified local bypass IDs
          list = parsed.filter(l => 
            l && 
            l.id && 
            !l.id.startsWith('learner-00') && 
            !l.id.startsWith('google-') && 
            l.email !== 'ka20154112@wipro.com' &&
            !l.email?.includes('placeholder')
          );
        }
      }

      // Check current active learner session - if it's a real learner who signed up, ensure they are in the list!
      const current = this.getLearner();
      if (
        current && 
        current.id && 
        current.id !== 'learner-initial' && 
        !current.id.startsWith('google-') &&
        current.email && 
        !current.email.includes('learner@sarlayash.org') &&
        current.email !== 'ka20154112@wipro.com'
      ) {
        const existingIdx = list.findIndex(l => l.id === current.id || l.email.toLowerCase() === current.email.toLowerCase());
        if (existingIdx >= 0) {
          list[existingIdx] = current;
        } else {
          list.push(current);
        }
        localStorage.setItem(STORAGE_KEY_REGISTERED_LEARNERS, JSON.stringify(list));
      }

      return list;
    } catch (e) {
      console.error("Storage read error for registered learners", e);
      return [];
    }
  },

  saveLearner(learner: LearnerProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY_LEARNER, JSON.stringify(learner));
      
      // If it's a real learner, record in the central registered learners list
      if (learner && learner.id && learner.id !== 'learner-initial' && learner.email && !learner.email.includes('learner@sarlayash.org')) {
        const all = this.getAllRegisteredLearners();
        const existingIdx = all.findIndex(l => l.id === learner.id || l.email.toLowerCase() === learner.email.toLowerCase());
        if (existingIdx >= 0) {
          all[existingIdx] = learner;
        } else {
          all.push(learner);
        }
        localStorage.setItem(STORAGE_KEY_REGISTERED_LEARNERS, JSON.stringify(all));
      }

      syncLearnerToFirestore(learner);
    } catch (e) {
      console.error("Storage write error", e);
    }
  },

  getActiveTrack(): TrackType {
    const learner = this.getLearner();
    if (learner && learner.activeTrack) {
      return learner.activeTrack;
    }
    const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_TRACK);
    if (saved === 'ethical-hacking' || saved === 'cybersecurity') {
      return saved as TrackType;
    }
    return 'cybersecurity';
  },

  setActiveTrack(track: TrackType): void {
    localStorage.setItem(STORAGE_KEY_ACTIVE_TRACK, track);
    const learner = this.getLearner();
    if (learner) {
      learner.activeTrack = track;
      this.saveLearner(learner);
    }
  },

  getModulesForTrack(track: TrackType): ModuleData[] {
    return track === 'ethical-hacking' ? ETHICAL_HACKING_MODULES_DATA : MODULES_DATA;
  },

  getModuleLockStatus(moduleId: number, learner?: LearnerProfile | null): ModuleLockStatus {
    // Day 1 for Cyber Security (1) and Day 1 for Ethical Hacking (101) are unlocked immediately
    if (moduleId === 1 || moduleId === 101) {
      return {
        isUnlocked: true,
        isWaitingWindow: false,
        previousDayCompleted: true
      };
    }

    const user = learner || this.getLearner();
    if (!user) {
      return {
        isUnlocked: false,
        isWaitingWindow: false,
        previousDayCompleted: false,
        reason: 'Please sign in to view this module.'
      };
    }

    const prevModuleId = moduleId - 1;
    const completedList = user.completedModules || [];
    const prevCompleted = completedList.includes(prevModuleId);

    if (!prevCompleted) {
      const prevDayLabel = prevModuleId > 100 
        ? `Day ${prevModuleId - 100 < 10 ? '0' : ''}${prevModuleId - 100}` 
        : `Day ${prevModuleId < 10 ? '0' : ''}${prevModuleId}`;
      return {
        isUnlocked: false,
        isWaitingWindow: false,
        previousDayCompleted: false,
        previousModuleId: prevModuleId,
        reason: `Complete ${prevDayLabel} first to unlock this day.`
      };
    }

    // Previous day is completed! Now verify the 24-hour window
    let completedAt = user.moduleCompletionTimestamps?.[prevModuleId];
    if (!completedAt) {
      if (user.assignmentSubmissions?.[prevModuleId]?.submittedAt) {
        completedAt = user.assignmentSubmissions[prevModuleId].submittedAt;
      } else if (user.ethicalHackingSubmissions?.[prevModuleId]?.submittedAt) {
        completedAt = user.ethicalHackingSubmissions[prevModuleId].submittedAt;
      }
    }

    // If still no completion timestamp recorded, default to first login timestamp
    if (!completedAt) {
      completedAt = user.firstLoginTimestamp || new Date().toISOString();
    }

    const completionTime = new Date(completedAt).getTime();
    const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24-hour window required
    const unlockTime = (isNaN(completionTime) ? Date.now() - COOLDOWN_MS : completionTime) + COOLDOWN_MS;
    const now = Date.now();
    const remainingMs = Math.max(0, unlockTime - now);

    if (remainingMs > 0) {
      const totalHours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
      const formattedRemainingTime = totalHours > 0 
        ? `${totalHours}h ${minutes}m` 
        : `${minutes}m ${seconds}s`;

      return {
        isUnlocked: false,
        isWaitingWindow: true,
        previousDayCompleted: true,
        completedAt,
        unlockTimestamp: unlockTime,
        remainingMs,
        formattedRemainingTime,
        previousModuleId: prevModuleId,
        reason: `24-hour window active. Available in ${formattedRemainingTime}.`
      };
    }

    return {
      isUnlocked: true,
      isWaitingWindow: false,
      previousDayCompleted: true,
      completedAt,
      previousModuleId: prevModuleId
    };
  },

  isModuleUnlocked(moduleId: number, completedModules: number[], learner?: LearnerProfile | null): boolean {
    if (moduleId === 1 || moduleId === 101) return true;
    const user = learner || this.getLearner();
    if (!user) {
      return completedModules.includes(moduleId - 1);
    }
    return this.getModuleLockStatus(moduleId, user).isUnlocked;
  },

  updateModuleProgress(moduleId: number, completed: boolean): LearnerProfile | null {
    const learner = this.getLearner();
    if (!learner) return null;
    if (completed) {
      learner.moduleCompletionTimestamps = learner.moduleCompletionTimestamps || {};
      if (!learner.moduleCompletionTimestamps[moduleId]) {
        learner.moduleCompletionTimestamps[moduleId] = new Date().toISOString();
      }

      if (!learner.completedModules.includes(moduleId)) {
        learner.completedModules.push(moduleId);
        learner.xp += 150;
      }
      if (moduleId >= 101) {
        learner.ethicalHackingCompletedModules = learner.ethicalHackingCompletedModules || [];
        if (!learner.ethicalHackingCompletedModules.includes(moduleId)) {
          learner.ethicalHackingCompletedModules.push(moduleId);
        }
        learner.ethicalHackingCurrentModuleId = Math.min(115, Math.max(learner.ethicalHackingCurrentModuleId || 101, moduleId + 1));
      } else {
        learner.currentModuleId = Math.min(15, Math.max(learner.currentModuleId, moduleId + 1));
      }
    } else {
      learner.completedModules = learner.completedModules.filter(m => m !== moduleId);
      if (learner.moduleCompletionTimestamps) {
        delete learner.moduleCompletionTimestamps[moduleId];
      }
      if (moduleId >= 101 && learner.ethicalHackingCompletedModules) {
        learner.ethicalHackingCompletedModules = learner.ethicalHackingCompletedModules.filter(m => m !== moduleId);
      }
    }
    this.saveLearner(learner);
    return learner;
  },

  savePersonalNote(moduleId: number, noteText: string): void {
    const learner = this.getLearner();
    if (!learner) return;
    learner.personalNotes[moduleId] = noteText;
    this.saveLearner(learner);
  },

  submitAssignment(moduleId: number, responseText: string): AssignmentSubmission | null {
    const learner = this.getLearner();
    if (!learner) return null;
    const nowIso = new Date().toISOString();
    learner.moduleCompletionTimestamps = learner.moduleCompletionTimestamps || {};
    learner.moduleCompletionTimestamps[moduleId] = nowIso;

    const submission: AssignmentSubmission = {
      moduleId,
      submittedAt: nowIso,
      status: 'submitted',
      score: 95, // Auto-assessed baseline for demo
      maxScore: 100,
      learnerResponse: responseText,
      feedback: 'Excellent analytical response. Defensible remediation proposed.'
    };
    learner.assignmentSubmissions[moduleId] = submission;
    learner.xp += 100;
    this.saveLearner(learner);
    return submission;
  },

  recordSimulatorRun(simKey: string, score: number): void {
    const learner = this.getLearner();
    if (!learner) return;
    const prev = learner.simulatorStats[simKey] || { runsCount: 0, lastRunTimestamp: '', score: 0 };
    learner.simulatorStats[simKey] = {
      runsCount: prev.runsCount + 1,
      lastRunTimestamp: new Date().toISOString(),
      score: Math.max(prev.score, score)
    };
    if (!learner.completedLabs.includes(simKey)) {
      learner.completedLabs.push(simKey);
      learner.xp += 120;
    }
    this.saveLearner(learner);
  },

  recordAssessmentAttempt(attempt: LearnerProfile['assessmentScores'][0]): void {
    const learner = this.getLearner();
    if (!learner) return;
    learner.assessmentScores.unshift(attempt);
    learner.xp += 250;
    if (attempt.percentage >= 80 && !learner.earnedBadges.includes("Assessment Master")) {
      learner.earnedBadges.push("Assessment Master");
    }
    this.saveLearner(learner);
  },

  getAnnouncements(): Announcement[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ANNOUNCEMENTS;
  },

  addAnnouncement(ann: Omit<Announcement, 'id' | 'date'>): Announcement {
    const current = this.getAnnouncements();
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newAnn, ...current];
    localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(updated));
    return newAnn;
  },

  resetLearnerProgress(): LearnerProfile {
    const fresh: LearnerProfile = {
      ...DEFAULT_LEARNER,
      completedModules: [],
      currentModuleId: 1,
      assessmentScores: [],
      completedLabs: [],
      assignmentSubmissions: {},
      earnedBadges: ['Security Starter'],
      xp: 100
    };
    this.saveLearner(fresh);
    return fresh;
  },

  resetSpecificLearner(learnerId: string): LearnerProfile | null {
    const all = this.getAllRegisteredLearners();
    const target = all.find(l => l.id === learnerId);
    if (!target) return null;

    const resetTarget: LearnerProfile = {
      ...target,
      currentModuleId: 1,
      completedModules: [],
      assessmentScores: [],
      completedLabs: [],
      assignmentSubmissions: {},
      earnedBadges: ['Security Starter'],
      personalNotes: {},
      simulatorStats: {},
      streakDays: 1,
      xp: 100,
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    const idx = all.findIndex(l => l.id === learnerId);
    if (idx >= 0) {
      all[idx] = resetTarget;
      localStorage.setItem(STORAGE_KEY_REGISTERED_LEARNERS, JSON.stringify(all));
    }

    const current = this.getLearner();
    if (current && current.id === learnerId) {
      localStorage.setItem(STORAGE_KEY_LEARNER, JSON.stringify(resetTarget));
    }

    return resetTarget;
  },

  deleteSpecificLearner(learnerId: string): void {
    try {
      const all = this.getAllRegisteredLearners().filter(l => l.id !== learnerId);
      localStorage.setItem(STORAGE_KEY_REGISTERED_LEARNERS, JSON.stringify(all));
      const current = this.getLearner();
      if (current && current.id === learnerId) {
        localStorage.removeItem(STORAGE_KEY_LEARNER);
      }
    } catch (e) {
      console.error("Storage delete learner error", e);
    }
  }
};
