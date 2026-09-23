import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  Lock, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  Eye, 
  X,
  Calendar,
  Share2
} from 'lucide-react';
import { LearnerProfile, EarnedBadgeInfo } from '../../types';
import { getLearnerBadges, downloadBadgePNG } from '../../services/badgeService';
import { calculateCyberReadiness } from '../../services/scoringEngine';

interface BadgesShowcaseProps {
  learner: LearnerProfile;
}

export const BadgesShowcase: React.FC<BadgesShowcaseProps> = ({ learner }) => {
  const badges = getLearnerBadges(learner);
  const readiness = calculateCyberReadiness(learner);
  const certId = `SYM-CSZ-2026-${learner.id.slice(-5).toUpperCase() || '78942'}`;

  const [filter, setFilter] = useState<'ALL' | 'LEVEL' | 'ASSESSMENT' | 'UNLOCKED'>('ALL');
  const [previewBadge, setPreviewBadge] = useState<EarnedBadgeInfo | null>(null);

  const unlockedCount = badges.filter(b => b.isUnlocked).length;

  const filteredBadges = badges.filter(b => {
    if (filter === 'UNLOCKED') return b.isUnlocked;
    if (filter === 'LEVEL') return b.category === 'level';
    if (filter === 'ASSESSMENT') return b.category === 'assessment';
    return true;
  });

  const handleDownload = (badge: EarnedBadgeInfo) => {
    downloadBadgePNG(badge, learner.name, certId);
  };

  const getRankBadgeStyle = (rank: EarnedBadgeInfo['badgeRank'], isUnlocked: boolean) => {
    if (!isUnlocked) return 'border-slate-800 bg-slate-950/40 opacity-60';

    switch (rank) {
      case 'TITANIUM':
        return 'border-purple-500/50 bg-gradient-to-b from-purple-950/30 to-[#081124] shadow-lg shadow-purple-950/30';
      case 'PLATINUM':
        return 'border-emerald-500/50 bg-gradient-to-b from-emerald-950/30 to-[#081124] shadow-lg shadow-emerald-950/30';
      case 'GOLD':
        return 'border-amber-500/50 bg-gradient-to-b from-amber-950/30 to-[#081124] shadow-lg shadow-amber-950/30';
      case 'SILVER':
        return 'border-cyan-500/50 bg-gradient-to-b from-cyan-950/30 to-[#081124] shadow-lg shadow-cyan-950/30';
      default:
        return 'border-slate-700 bg-gradient-to-b from-slate-900 to-[#081124]';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Badges Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#09152b] via-[#0c1e3f] to-[#09152b] border border-cyan-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>SARLAYASH VERIFIED CREDENTIALS • HIGH-RES PNG EXPORT</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Official Cyber Readiness Badges & Honors
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Earn verifiable badges by advancing through Cyber Readiness Levels 1–10 and scoring $\ge 70\%$ in Corporate & Daily Mock Assessments. Download in high-resolution 1080×1080 PNG for LinkedIn, GitHub, or your portfolio.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs font-mono shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">UNLOCKED BADGES</span>
            <span className="text-xl font-bold text-amber-400">
              {unlockedCount} / {badges.length}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">CURRENT LEVEL</span>
            <span className="text-xl font-bold text-cyan-400">
              Lvl {readiness.currentLevel.levelNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
          {(['ALL', 'LEVEL', 'ASSESSMENT', 'UNLOCKED'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'ALL' ? 'All Badges' : tab === 'LEVEL' ? 'Level Badges (1-10)' : tab === 'ASSESSMENT' ? 'Assessment Badges (70%+)' : 'Unlocked Only'}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-400">
          Showing {filteredBadges.length} Badge{filteredBadges.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBadges.map((badge) => {
          return (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${getRankBadgeStyle(
                badge.badgeRank,
                badge.isUnlocked
              )}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{badge.icon}</span>
                    <div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        badge.badgeRank === 'TITANIUM' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                        badge.badgeRank === 'PLATINUM' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        badge.badgeRank === 'GOLD' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}>
                        {badge.badgeRank}
                      </span>
                      {badge.levelNumber && (
                        <span className="text-[10px] text-slate-400 font-mono ml-2">
                          LVL {badge.levelNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {badge.isUnlocked ? (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div className="pt-3 space-y-1.5">
                  <h3 className="text-base font-bold text-white leading-tight">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Criteria Box */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-0.5">CRITERIA TO UNLOCK:</span>
                  <span className={badge.isUnlocked ? 'text-emerald-400' : 'text-amber-400'}>
                    {badge.criteriaMet}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                {badge.isUnlocked ? (
                  <>
                    <button
                      onClick={() => setPreviewBadge(badge)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownload(badge)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PNG</span>
                    </button>
                  </>
                ) : (
                  <div className="w-full text-center py-1.5 text-xs text-slate-500 font-mono italic">
                    🔒 Locked • Fulfill criteria to earn
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Live Badge Preview Modal */}
      {previewBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#09152b] border border-cyan-500/50 shadow-2xl space-y-5 text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 font-bold">
                BADGE PREVIEW • 1080×1080 HD
              </span>
              <button
                onClick={() => setPreviewBadge(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Badge Render Simulation */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0a1733] to-[#030814] border-2 border-amber-500/40 shadow-inner space-y-4">
              <div className="w-24 h-24 rounded-full bg-slate-900/80 border-2 border-cyan-400/80 mx-auto flex items-center justify-center text-5xl shadow-lg shadow-cyan-500/30">
                {previewBadge.icon}
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">
                  ★ {previewBadge.badgeRank} CREDENTIAL ★
                </span>
                <h4 className="text-xl font-black text-white">
                  {previewBadge.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Awarded to: <strong className="text-amber-300">{learner.name}</strong>
                </p>
              </div>

              <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-slate-800">
                SARLAYASH MISSION • FACILITATED BY KAPIL • ID: {certId}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewBadge(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(previewBadge);
                  setPreviewBadge(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/25"
              >
                <Download className="w-4 h-4" />
                <span>Download as PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
