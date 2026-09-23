import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Flame, 
  Globe, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  Building, 
  ArrowRight,
  X,
  ExternalLink,
  BookOpen,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';
import { HISTORICAL_CYBER_ATTACKS } from '../../data/historicalAttacksData';
import { HistoricalCyberAttack } from '../../types';

export const CyberAttacksBulletinBoard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'ALL' | 'India' | 'Global'>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [activeModalAttack, setActiveModalAttack] = useState<HistoricalCyberAttack | null>(null);

  const filteredAttacks = HISTORICAL_CYBER_ATTACKS.filter(atk => {
    const matchRegion = selectedRegion === 'ALL' || atk.region === selectedRegion;
    const matchSector = selectedSector === 'ALL' || atk.sector === selectedSector;
    const q = searchQuery.toLowerCase();
    const matchSearch = atk.name.toLowerCase().includes(q) ||
                        atk.target.toLowerCase().includes(q) ||
                        atk.threatActor.toLowerCase().includes(q) ||
                        atk.attackVector.toLowerCase().includes(q) ||
                        atk.technicalRemediation.toLowerCase().includes(q);
    return matchRegion && matchSector && matchSearch;
  });

  const indiaCount = HISTORICAL_CYBER_ATTACKS.filter(a => a.region === 'India').length;
  const globalCount = HISTORICAL_CYBER_ATTACKS.filter(a => a.region === 'Global').length;

  return (
    <div className="min-h-screen bg-[#030712] py-8 px-4 sm:px-6 lg:px-8 text-slate-100 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Bulletin Board Hero Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d1629] via-[#101c36] to-[#0d1629] border border-red-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Flame className="w-4 h-4 text-red-400" />
              <span>WALL OF INCIDENTS • LAST 10 YEARS (2015 – 2025/2026)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Famous Cyber Attacks: Anatomy &amp; Avoidance
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore pivotal cyber warfare events, ransomware strikes, and supply chain breaches in India and abroad. Deconstruct the architectural flaws adversaries exploited and master the concrete blueprints of <strong>how each disaster could have been avoided</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center">
              <span className="text-[10px] text-amber-400 block uppercase font-bold">🇮🇳 INDIA ATTACKS</span>
              <span className="text-2xl font-black text-white mt-0.5 block">{indiaCount} Case Studies</span>
              <span className="text-[10px] text-slate-400">Critical Infrastructure</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-center">
              <span className="text-[10px] text-cyan-400 block uppercase font-bold">🌐 GLOBAL ATTACKS</span>
              <span className="text-2xl font-black text-white mt-0.5 block">{globalCount} Case Studies</span>
              <span className="text-[10px] text-slate-400">Supply Chain &amp; Cloud</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by target, threat actor, or vector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedRegion('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                selectedRegion === 'ALL' ? 'bg-red-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Regions ({HISTORICAL_CYBER_ATTACKS.length})
            </button>
            <button
              onClick={() => setSelectedRegion('India')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                selectedRegion === 'India' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇮🇳 India Focus ({indiaCount})
            </button>
            <button
              onClick={() => setSelectedRegion('Global')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                selectedRegion === 'Global' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🌐 Global Incidents ({globalCount})
            </button>
          </div>

          {/* Sector Dropdown */}
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-mono w-full sm:w-auto"
          >
            <option value="ALL">All Sectors</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Critical Infrastructure">Critical Infrastructure</option>
            <option value="Banking">Banking &amp; Finance</option>
            <option value="Tech">Technology &amp; Cloud</option>
            <option value="Enterprise">Enterprise &amp; Logistics</option>
            <option value="Government">Government &amp; Identity</option>
          </select>

        </div>

        {/* Attacks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAttacks.map((attack) => (
            <div
              key={attack.id}
              className="p-6 rounded-2xl bg-[#081124] border border-slate-800 hover:border-red-500/50 transition-all shadow-xl flex flex-col justify-between space-y-4 group"
            >
              <div>
                
                {/* Header Tags */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      attack.region === 'India' 
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-600/40' 
                        : 'bg-cyan-950/80 text-cyan-300 border border-cyan-600/40'
                    }`}>
                      {attack.region === 'India' ? '🇮🇳 India' : '🌐 Global'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                      {attack.year}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-800">
                      {attack.sector}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-red-400 font-bold shrink-0">
                    {attack.threatActor}
                  </span>
                </div>

                {/* Attack Title & Target */}
                <div className="pt-3 space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {attack.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-mono flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>Target: {attack.target}</span>
                  </p>
                </div>

                {/* Vector & Impact */}
                <div className="pt-3 space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-red-400 block uppercase font-bold">
                      ATTACK VECTOR &amp; ROOT CAUSE:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {attack.attackVector}
                    </p>
                    <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800">
                      <strong>Root Vulnerability:</strong> {attack.rootCauseVulnerability}
                    </p>
                  </div>

                  {/* Impact Snippet */}
                  <div className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    <strong className="text-slate-200">Impact:</strong> {attack.financialOrOperationalImpact}
                  </div>
                </div>

                {/* HOW IT COULD HAVE BEEN AVOIDED (Highlight Box) */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#071926] to-slate-900 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>HOW IT COULD HAVE BEEN AVOIDED:</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-200 leading-relaxed">
                    {attack.avoidanceBlueprint.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-mono font-bold">✔</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-cyan-300 truncate max-w-[280px]">
                  🛡 {attack.technicalRemediation}
                </span>

                <button
                  onClick={() => setActiveModalAttack(attack)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <span>Deconstruct Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Incident Deconstruction Modal */}
        {activeModalAttack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#09152b] border border-red-500/50 shadow-2xl space-y-6">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
                      INCIDENT DECONSTRUCTION
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {activeModalAttack.year} • {activeModalAttack.region} • {activeModalAttack.sector}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">
                    {activeModalAttack.name}
                  </h2>
                  <p className="text-xs font-mono text-amber-400">
                    Target: {activeModalAttack.target}
                  </p>
                </div>

                <button
                  onClick={() => setActiveModalAttack(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Threat Actor & Vector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">ATTRIBUTION</span>
                  <span className="font-bold text-red-400">{activeModalAttack.threatActor}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">PRIMARY ATTACK VECTOR</span>
                  <span className="font-bold text-amber-400">{activeModalAttack.attackVector}</span>
                </div>
              </div>

              {/* Root Cause Vulnerability */}
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 text-xs space-y-1">
                <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider block">
                  CRITICAL FLAW / ROOT CAUSE VULNERABILITY:
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {activeModalAttack.rootCauseVulnerability}
                </p>
              </div>

              {/* Full Prevention Blueprint (How it could have been avoided) */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-[#071f2b] to-slate-900 border border-emerald-500/50 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    DEFENSIVE BLUEPRINT: HOW IT COULD HAVE BEEN AVOIDED
                  </h4>
                </div>

                <div className="space-y-2 pt-1">
                  {activeModalAttack.avoidanceBlueprint.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture & Engineering Takeaway */}
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  CYBER DEFENDER KEY TAKEAWAY:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Recommended architectural controls: <strong>{activeModalAttack.technicalRemediation}</strong>.
                </p>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setActiveModalAttack(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Close Deconstruction
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
