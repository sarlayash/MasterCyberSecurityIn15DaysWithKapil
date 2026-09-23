import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Lightbulb, Search, Filter } from 'lucide-react';
import { INTERVIEW_DATA } from '../../data/interviewData';
import { InterviewItem } from '../../types';

export const InterviewHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(INTERVIEW_DATA[0].id);

  const categories = [
    'ALL',
    'HR',
    'SOC',
    'Scenario',
    'Network',
    'Firewall',
    'Linux',
    'Incident Response'
  ];

  const filteredItems = INTERVIEW_DATA.filter((item) => {
    const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'ALL' || item.difficulty === selectedDifficulty;
    const matchSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.modelAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712] py-8 px-4 sm:px-6 lg:px-8 text-slate-100 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <span>PLACEMENT READINESS SYSTEM</span>
              <span>•</span>
              <span className="text-indigo-400">CORPORATE INTERVIEW BENCHMARKS</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              Cyber Security Interview Hub
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Master behavioral HR questions, technical deep-dives, and complex "What would you do if...?" workplace scenarios.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>{INTERVIEW_DATA.length} Verified Question Rubrics</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-lg space-y-3">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Difficulty Tabs */}
            <div className="flex items-center gap-1.5 text-xs font-mono w-full md:w-auto">
              <span className="text-slate-400 mr-1 text-[11px]">Level:</span>
              {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-3 py-1.5 rounded-xl border transition-all text-[11px] ${
                    selectedDifficulty === d
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === c
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

        </div>

        {/* Questions List Accordion */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded 
                    ? 'bg-[#091326] border-cyan-500/40 shadow-xl' 
                    : 'bg-[#081124] border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full text-left p-5 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50 font-bold">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
                        {item.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Content: Model Answer & Strategy */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 space-y-5 border-t border-slate-800/80 animate-in fade-in">
                    
                    {/* Model Answer */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-900/40">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2 font-mono">
                        <Lightbulb className="w-4 h-4" />
                        <span>Corporate Model Answer</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        "{item.modelAnswer}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Key Points to Hit */}
                      <div className="p-4 rounded-xl bg-[#070e1f] border border-emerald-950/60">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2 font-mono">
                          <CheckCircle className="w-4 h-4" />
                          <span>Key Talking Points to Emphasize</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {item.keyPoints.map((pt, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* What to Avoid Saying */}
                      <div className="p-4 rounded-xl bg-[#070e1f] border border-red-950/60">
                        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-2 font-mono">
                          <AlertCircle className="w-4 h-4" />
                          <span>Red Flags to Avoid Saying</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.avoidSaying}
                        </p>
                      </div>

                    </div>

                    {/* Follow-up question (if present) */}
                    {item.followUpQuestion && (
                      <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs">
                        <span className="text-indigo-400 font-mono font-bold block mb-0.5">
                          ANTICIPATE FOLLOW-UP INQUIRY:
                        </span>
                        <p className="text-slate-200 italic">
                          "{item.followUpQuestion}"
                        </p>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
