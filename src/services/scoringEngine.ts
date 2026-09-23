import { LearnerProfile, PerformanceDimensions } from '../types';

export interface ReadinessLevelInfo {
  levelNumber: number;
  levelName: string;
  minPercentage: number;
  badge: string;
  tagline: string;
}

export const READINESS_LEVELS: ReadinessLevelInfo[] = [
  { levelNumber: 1, levelName: "DIGITAL AWARENESS", minPercentage: 0, badge: "🛡", tagline: "Foundational cyber hygiene and security mindset." },
  { levelNumber: 2, levelName: "SECURITY FOUNDATIONS", minPercentage: 11, badge: "🔑", tagline: "Understanding CIA Triad and threat landscape." },
  { levelNumber: 3, levelName: "THREAT ANALYST", minPercentage: 21, badge: "🔎", tagline: "Deconstructing malware, phishing, and kill chains." },
  { levelNumber: 4, levelName: "NETWORK DEFENDER", minPercentage: 31, badge: "🌐", tagline: "Protocols, packet flows, and TCP handshakes." },
  { levelNumber: 5, levelName: "SECURITY PRACTITIONER", minPercentage: 41, badge: "🧱", tagline: "Network perimeter segmentation and ACL defense." },
  { levelNumber: 6, levelName: "INCIDENT RESPONDER", minPercentage: 51, badge: "🚨", tagline: "Executing triage and containment workflows." },
  { levelNumber: 7, levelName: "CYBER DEFENDER", minPercentage: 61, badge: "⚡", tagline: "Integrated defense across host and network telemetry." },
  { levelNumber: 8, levelName: "SOC READY", minPercentage: 71, badge: "🛡️", tagline: "Tier-1 SIEM alert triage and playbook actions." },
  { levelNumber: 9, levelName: "INTERVIEW READY", minPercentage: 81, badge: "💼", tagline: "Corporate technical & behavioral interview excellence." },
  { levelNumber: 10, levelName: "ZERO-TO-INFINITY", minPercentage: 91, badge: "🏆", tagline: "Mastery of end-to-end practical cyber defense." }
];

export function calculateCyberReadiness(learner: LearnerProfile): {
  overallPercentage: number;
  currentLevel: ReadinessLevelInfo;
  nextLevel: ReadinessLevelInfo | null;
  pointsToNext: number;
} {
  // Modules completed: weight 35%
  const moduleScore = (learner.completedModules.length / 15) * 100 * 0.35;

  // Assessments: weight 25%
  const latestAssessment = learner.assessmentScores[0];
  const assessmentScore = (latestAssessment ? latestAssessment.percentage : 60) * 0.25;

  // Simulator labs: weight 25%
  const labKeys = Object.keys(learner.simulatorStats);
  const labScore = Math.min(100, (labKeys.length / 9) * 100) * 0.25;

  // Assignments completed: weight 15%
  const assignmentsCount = Object.keys(learner.assignmentSubmissions).length;
  const assignmentScore = (assignmentsCount / 15) * 100 * 0.15;

  const rawPercent = Math.round(moduleScore + assessmentScore + labScore + assignmentScore);
  const overallPercentage = Math.min(100, Math.max(5, rawPercent));

  let currentLevel = READINESS_LEVELS[0];
  for (const lvl of READINESS_LEVELS) {
    if (overallPercentage >= lvl.minPercentage) {
      currentLevel = lvl;
    }
  }

  const nextLevel = READINESS_LEVELS.find(l => l.levelNumber === currentLevel.levelNumber + 1) || null;
  const pointsToNext = nextLevel ? nextLevel.minPercentage - overallPercentage : 0;

  return {
    overallPercentage,
    currentLevel,
    nextLevel,
    pointsToNext: Math.max(0, pointsToNext)
  };
}

export function calculateCyberPerformanceIndex(learner: LearnerProfile): PerformanceDimensions {
  // 1. Knowledge (Modules & Assessments)
  const assessment = learner.assessmentScores[0];
  const knowledge = Math.min(100, Math.round(((assessment?.percentage || 70) * 0.6) + ((learner.completedModules.length / 15) * 100 * 0.4)));

  // 2. Practical Skills (Simulators executed)
  const labCount = Object.keys(learner.simulatorStats).length;
  const practicalSkills = Math.min(100, Math.round((labCount / 9) * 100));

  // 3. Problem Solving (Assignments)
  const assignmentsSubmitted = Object.keys(learner.assignmentSubmissions).length;
  const problemSolving = Math.min(100, Math.round((assignmentsSubmitted / 15) * 90 + 10));

  // 4. Security Awareness (Phishing analyzer score)
  const phishScore = learner.simulatorStats['phishing']?.score || 85;
  const securityAwareness = phishScore;

  // 5. Investigation (Wireshark & Forensics simulator scores)
  const wsScore = learner.simulatorStats['wireshark']?.score || 75;
  const forensicsScore = learner.simulatorStats['forensics']?.score || 80;
  const investigation = Math.round((wsScore + forensicsScore) / 2);

  // 6. Decision Making (Firewall & SOC triage)
  const fwScore = learner.simulatorStats['firewall']?.score || 85;
  const socScore = learner.simulatorStats['soc']?.score || 80;
  const decisionMaking = Math.round((fwScore + socScore) / 2);

  // 7. Consistency (Daily streak)
  const consistency = Math.min(100, Math.round((learner.streakDays / 15) * 100));

  // 8. Interview Readiness
  const interviewReadiness = Math.min(100, Math.round((learner.completedModules.length >= 10 ? 88 : 50) + (learner.assessmentScores.length > 0 ? 10 : 0)));

  const overallIndex = Math.round(
    (knowledge + practicalSkills + problemSolving + securityAwareness + investigation + decisionMaking + consistency + interviewReadiness) / 8
  );

  return {
    knowledge,
    practicalSkills,
    problemSolving,
    securityAwareness,
    investigation,
    decisionMaking,
    consistency,
    interviewReadiness,
    overallIndex
  };
}
