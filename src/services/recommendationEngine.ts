import { LearnerProfile } from '../types';
import { MODULES_DATA } from '../data/modulesData';

export interface RecommendationPlan {
  triggerReason: string;
  nextModule: { id: number; title: string; dayNumber: string };
  revisionTopic: { title: string; dayNumber: string; notesSnippet: string };
  practiceLab: { id: string; name: string; icon: string; reason: string };
  mockTestRecommendation: string;
  interviewQuestion: string;
  actionItems: string[];
}

export function generateLearningRecommendations(learner: LearnerProfile): RecommendationPlan {
  // Determine next sequentially uncompleted module starting strictly from Day 1
  let nextModId = 1;
  for (let i = 1; i <= 15; i++) {
    if (!learner.completedModules.includes(i)) {
      nextModId = i;
      break;
    }
  }
  const nextMod = MODULES_DATA.find(m => m.id === nextModId) || MODULES_DATA[0];

  // Identify weak area from assessments or module progress
  const latestAssessment = learner.assessmentScores[0];
  let weakArea = "Network Security";
  let lowScore = 58;

  if (latestAssessment?.categoryScores) {
    let minCat = "Network Security";
    let minPct = 100;
    for (const [cat, data] of Object.entries(latestAssessment.categoryScores)) {
      const pct = Math.round((data.correct / data.total) * 100);
      if (pct < minPct) {
        minPct = pct;
        minCat = cat;
      }
    }
    weakArea = minCat;
    lowScore = minPct;
  }

  // Find module related to weak area
  const matchedModule = MODULES_DATA.find(m => 
    m.title.toLowerCase().includes(weakArea.toLowerCase()) || 
    m.topics.some(t => t.toLowerCase().includes(weakArea.toLowerCase()))
  ) || MODULES_DATA[4]; // Default Day 05 Network Security

  return {
    triggerReason: `Performance Analysis: You scored ${lowScore}% in ${weakArea}.`,
    nextModule: {
      id: nextMod.id,
      title: nextMod.title,
      dayNumber: nextMod.dayNumber
    },
    revisionTopic: {
      title: matchedModule.title,
      dayNumber: matchedModule.dayNumber,
      notesSnippet: matchedModule.notes.quickRevision[0] || "Review stateful packet inspection and perimeter defense."
    },
    practiceLab: {
      id: "firewall",
      name: "Firewall Configuration Simulator",
      icon: "🔥",
      reason: "Reinforce stateful rule logic, priority hierarchy, and traffic inspection hands-on."
    },
    mockTestRecommendation: `Attempt 10 targeted practice questions in '${weakArea}' within the Mock Assessment engine.`,
    interviewQuestion: "Explain the difference between Stateless and Stateful firewalls and how rule shadowing occurs.",
    actionItems: [
      `Review ${matchedModule.dayNumber} structured notes (Quick Revision & Key Terms)`,
      "Launch Firewall Simulator to complete priority traffic testing",
      `Practice 10 targeted questions in '${weakArea}'`,
      `Submit or improve the ${matchedModule.dayNumber} practical assignment`
    ]
  };
}
