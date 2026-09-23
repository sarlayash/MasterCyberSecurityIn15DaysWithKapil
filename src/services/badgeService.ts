import { LearnerProfile, EarnedBadgeInfo } from '../types';
import { calculateCyberReadiness, READINESS_LEVELS } from './scoringEngine';

export const ALL_BADGE_DEFINITIONS: Omit<EarnedBadgeInfo, 'isUnlocked' | 'unlockedAt'>[] = [
  // --- Cyber Readiness Level Badges (Levels 1 to 10) ---
  {
    id: 'badge-lvl-1',
    levelNumber: 1,
    title: 'Digital Awareness Defender',
    category: 'level',
    icon: '🛡️',
    description: 'Mastered digital hygiene, strong credentials, and foundational security awareness.',
    criteriaMet: 'Attain Cyber Readiness Level 1 (Digital Awareness)',
    badgeRank: 'BRONZE'
  },
  {
    id: 'badge-lvl-2',
    levelNumber: 2,
    title: 'Security Foundations Specialist',
    category: 'level',
    icon: '🔑',
    description: 'Understands the CIA Triad, threat vs vulnerability trade-offs, and defense-in-depth.',
    criteriaMet: 'Attain Cyber Readiness Level 2 (Security Foundations)',
    badgeRank: 'BRONZE'
  },
  {
    id: 'badge-lvl-3',
    levelNumber: 3,
    title: 'Threat Intelligence Analyst',
    category: 'level',
    icon: '🔎',
    description: 'Deconstructs malware taxonomy, ransomware mechanics, and the Cyber Kill Chain.',
    criteriaMet: 'Attain Cyber Readiness Level 3 (Threat Analyst)',
    badgeRank: 'SILVER'
  },
  {
    id: 'badge-lvl-4',
    levelNumber: 4,
    title: 'Network Defense Practitioner',
    category: 'level',
    icon: '🌐',
    description: 'Analyzes TCP 3-way handshakes, OSI packet flows, and Wireshark traces.',
    criteriaMet: 'Attain Cyber Readiness Level 4 (Network Defender)',
    badgeRank: 'SILVER'
  },
  {
    id: 'badge-lvl-5',
    levelNumber: 5,
    title: 'Perimeter & Systems Guardian',
    category: 'level',
    icon: '🧱',
    description: 'Deploys stateful firewall filtering, DMZ segmentation, and Linux hardening.',
    criteriaMet: 'Attain Cyber Readiness Level 5 (Security Practitioner)',
    badgeRank: 'GOLD'
  },
  {
    id: 'badge-lvl-6',
    levelNumber: 6,
    title: 'Incident Response Investigator',
    category: 'level',
    icon: '🚨',
    description: 'Executes NIST SP 800-61 containment, evidence preservation, and host triage.',
    criteriaMet: 'Attain Cyber Readiness Level 6 (Incident Responder)',
    badgeRank: 'GOLD'
  },
  {
    id: 'badge-lvl-7',
    levelNumber: 7,
    title: 'Cyber Defense Champion',
    category: 'level',
    icon: '⚡',
    description: 'Integrates network telemetry, endpoint event IDs, and defense playbooks.',
    criteriaMet: 'Attain Cyber Readiness Level 7 (Cyber Defender)',
    badgeRank: 'PLATINUM'
  },
  {
    id: 'badge-lvl-8',
    levelNumber: 8,
    title: 'SOC Tier-1 Operator',
    category: 'level',
    icon: '💻',
    description: 'Triage SIEM alert queues, mitigates brute-force attacks, and files structured reports.',
    criteriaMet: 'Attain Cyber Readiness Level 8 (SOC Ready)',
    badgeRank: 'PLATINUM'
  },
  {
    id: 'badge-lvl-9',
    levelNumber: 9,
    title: 'Enterprise Interview Master',
    category: 'level',
    icon: '💼',
    description: 'Demonstrates professional clarity in technical, situational, and behavioral rubrics.',
    criteriaMet: 'Attain Cyber Readiness Level 9 (Interview Ready)',
    badgeRank: 'TITANIUM'
  },
  {
    id: 'badge-lvl-10',
    levelNumber: 10,
    title: 'Zero-To-Infinity Grandmaster',
    category: 'level',
    icon: '🏆',
    description: 'Demonstrated complete holistic mastery across all 15 cybersecurity domains and labs.',
    criteriaMet: 'Attain Cyber Readiness Level 10 (Zero-To-Infinity Mastery)',
    badgeRank: 'TITANIUM'
  },

  // --- Assessment Passing Badges (Meeting >= 70% Criteria) ---
  {
    id: 'badge-corp-assessment-70',
    title: 'Corporate Assessment Benchmark Master',
    category: 'assessment',
    icon: '🎯',
    description: 'Achieved 70%+ passing benchmark on the 100-MCQ Corporate Cybersecurity Assessment.',
    criteriaMet: 'Score >= 70% in 100-MCQ Corporate Mock Assessment',
    badgeRank: 'GOLD'
  },
  {
    id: 'badge-day-assessment-master',
    title: 'Curriculum Milestone Master',
    category: 'assessment',
    icon: '⭐',
    description: 'Passed multiple daily mock assessments demonstrating consistent domain mastery.',
    criteriaMet: 'Score >= 70% in 3+ Day Mock Assessments',
    badgeRank: 'SILVER'
  },
  {
    id: 'badge-perfect-assessment',
    title: 'Flawless Security Evaluator',
    category: 'assessment',
    icon: '💎',
    description: 'Demonstrated elite accuracy by scoring 90%+ in a standardized assessment.',
    criteriaMet: 'Score >= 90% in any Mock Assessment',
    badgeRank: 'TITANIUM'
  },

  // --- Virtual Cyber Lab & Hands-on Milestones ---
  {
    id: 'badge-simulator-ace',
    title: 'Virtual Cyber Lab Pioneer',
    category: 'milestone',
    icon: '🧪',
    description: 'Executed hands-on operations across 5+ specialized interactive simulators.',
    criteriaMet: 'Complete runs in 5 or more Virtual Cyber Labs',
    badgeRank: 'SILVER'
  },
  {
    id: 'badge-streak-fire',
    title: 'Resilient Defense Streak',
    category: 'milestone',
    icon: '🔥',
    description: 'Maintained continuous dedicated cybersecurity learning discipline.',
    criteriaMet: 'Maintain an active daily learning streak',
    badgeRank: 'BRONZE'
  }
];

export function getLearnerBadges(learner: LearnerProfile): EarnedBadgeInfo[] {
  const readiness = calculateCyberReadiness(learner);
  const currentLvlNumber = readiness.currentLevel.levelNumber;
  const assessments = learner.assessmentScores || [];

  // Check assessment criteria (>= 70%)
  const hasPassedCorporateExam = assessments.some(a => a.totalQuestions >= 50 && a.percentage >= 70);
  const passedAssessmentsCount = assessments.filter(a => a.percentage >= 70).length;
  const hasEliteAssessment = assessments.some(a => a.percentage >= 90);
  const labCount = Object.keys(learner.simulatorStats || {}).length;
  const hasStreak = learner.streakDays >= 1;

  return ALL_BADGE_DEFINITIONS.map(badge => {
    let isUnlocked = false;

    if (badge.levelNumber !== undefined) {
      isUnlocked = currentLvlNumber >= badge.levelNumber;
    } else if (badge.id === 'badge-corp-assessment-70') {
      isUnlocked = hasPassedCorporateExam;
    } else if (badge.id === 'badge-day-assessment-master') {
      isUnlocked = passedAssessmentsCount >= 3;
    } else if (badge.id === 'badge-perfect-assessment') {
      isUnlocked = hasEliteAssessment;
    } else if (badge.id === 'badge-simulator-ace') {
      isUnlocked = labCount >= 5;
    } else if (badge.id === 'badge-streak-fire') {
      isUnlocked = hasStreak;
    }

    return {
      ...badge,
      isUnlocked,
      unlockedAt: isUnlocked ? (learner.lastActiveDate || new Date().toISOString().split('T')[0]) : undefined
    };
  });
}

// Generate high-resolution 1080x1080 PNG cyber badge graphic via HTML5 Canvas
export function downloadBadgePNG(
  badge: EarnedBadgeInfo,
  learnerName: string,
  certId: string
): void {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Dark Futuristic Cyber Gradient Background
  const bgGrad = ctx.createRadialGradient(540, 540, 100, 540, 540, 750);
  bgGrad.addColorStop(0, '#0a1733');
  bgGrad.addColorStop(0.5, '#050c1e');
  bgGrad.addColorStop(1, '#020409');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1080);

  // 2. Subtle Cyber Grid & Circuit Lines
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < 1080; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1080);
    ctx.stroke();
  }
  for (let y = 0; y < 1080; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1080, y);
    ctx.stroke();
  }

  // Rank Palette Colors
  let primaryNeon = '#06b6d4'; // Cyan
  let secondaryNeon = '#38bdf8';
  if (badge.badgeRank === 'GOLD') {
    primaryNeon = '#f59e0b';
    secondaryNeon = '#fbbf24';
  } else if (badge.badgeRank === 'TITANIUM') {
    primaryNeon = '#a855f7';
    secondaryNeon = '#c084fc';
  } else if (badge.badgeRank === 'PLATINUM') {
    primaryNeon = '#10b981';
    secondaryNeon = '#34d399';
  }

  // 3. Central Hexagonal / Shield Outer Bezel
  ctx.save();
  ctx.translate(540, 500);

  // Outer Glow Rings
  ctx.shadowColor = primaryNeon;
  ctx.shadowBlur = 45;
  ctx.strokeStyle = primaryNeon;
  ctx.lineWidth = 4;
  drawHexagon(ctx, 390);
  ctx.stroke();

  ctx.shadowBlur = 15;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  drawHexagon(ctx, 365);
  ctx.stroke();

  // Shield Body Fill
  const shieldFill = ctx.createLinearGradient(0, -360, 0, 360);
  shieldFill.addColorStop(0, '#0c1b3d');
  shieldFill.addColorStop(0.7, '#071026');
  shieldFill.addColorStop(1, '#030814');
  ctx.fillStyle = shieldFill;
  drawHexagon(ctx, 350);
  ctx.fill();

  // Inner Metallic Ring
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
  ctx.lineWidth = 1.5;
  drawHexagon(ctx, 330);
  ctx.stroke();

  // 4. Central Large Badge Icon / Symbol
  ctx.shadowColor = primaryNeon;
  ctx.shadowBlur = 30;
  ctx.font = '110px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badge.icon, 0, -110);
  ctx.shadowBlur = 0;

  // 5. Rank Chip
  ctx.fillStyle = primaryNeon;
  ctx.font = 'bold 22px monospace';
  ctx.fillText(`★ ${badge.badgeRank} CREDENTIAL ★`, 0, -10);

  // 6. Badge Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Inter", "Segoe UI", sans-serif';
  const titleWords = badge.title.toUpperCase();
  ctx.fillText(titleWords, 0, 45);

  // Criteria Met text
  ctx.fillStyle = '#94a3b8';
  ctx.font = '17px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(badge.criteriaMet, 0, 95);

  // 7. Divider Bar
  ctx.strokeStyle = primaryNeon;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-180, 135);
  ctx.lineTo(180, 135);
  ctx.stroke();

  // 8. Recipient Name
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 30px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(learnerName, 0, 185);

  ctx.fillStyle = '#64748b';
  ctx.font = '15px monospace';
  ctx.fillText('VERIFIED CYBERSECURITY PRACTITIONER', 0, 220);

  ctx.restore();

  // 9. Top Mission Header Branding
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('SARLAYASH MISSION • CYBER DEFENSE ACADEMY', 540, 75);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('CYBER SECURITY ZERO-TO-INFINITY WITH KAPIL', 540, 105);

  // 10. Footer Security Seal & Credentials
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px monospace';
  ctx.fillText(`ISSUED: ${today}`, 120, 1010);
  ctx.fillText(`AUTH CODE: ${certId || 'SYM-BADGE-2026'}`, 120, 1035);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 18px "Inter", cursive, sans-serif';
  ctx.fillText('Kapil', 960, 1005);
  ctx.fillStyle = '#64748b';
  ctx.font = '14px monospace';
  ctx.fillText('Workshop Facilitator & Security Mentor', 960, 1030);

  // Trigger Download
  const link = document.createElement('a');
  link.download = `SarlaYash_Cyber_Badge_${badge.title.replace(/\s+/g, '_')}_${learnerName.replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Helper to draw a sleek geometric hexagon
function drawHexagon(ctx: CanvasRenderingContext2D, radius: number): void {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}
