import React from 'react';
import { 
  Shield, 
  Terminal, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Lock, 
  Flame, 
  Sparkles,
  Users,
  Compass,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { MODULES_DATA } from '../../data/modulesData';

interface LandingPageProps {
  onOpenGoogleAuth: () => void;
  onExploreAsGuest: () => void;
  onOpenAdminAuth: () => void;
  onSelectModule?: (moduleId: number) => void;
  onLaunchSimulator?: (simId: string) => void;
  onOpenTour?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenGoogleAuth,
  onExploreAsGuest,
  onOpenAdminAuth,
  onSelectModule,
  onLaunchSimulator,
  onOpenTour
}) => {
  const labHighlights = [
    { id: 'cmd', name: 'Command Prompt Simulator', icon: '🖥', desc: 'ipconfig, ping, tracert, nslookup, netstat, arp, whoami' },
    { id: 'linux', name: 'Linux Terminal Simulator', icon: '🐧', desc: 'POSIX permissions, processes, /var/log/auth.log audits' },
    { id: 'firewall', name: 'Firewall Configuration', icon: '🔥', desc: 'ALLOW / DENY / LOG rules, traffic injection testing' },
    { id: 'wireshark', name: 'Wireshark Packet Analysis', icon: '📡', desc: 'Three-pane pcap inspector, display filters, stream follow' },
    { id: 'soc', name: 'SOC Monitoring Dashboard', icon: '🛡', desc: 'SIEM alert feed, triage LOW to CRITICAL, SOP execution' },
    { id: 'incident', name: 'Incident Response Lab', icon: '🚨', desc: '7-step lifecycle scenario branching and decision tree' },
    { id: 'forensics', name: 'Digital Forensics Lab', icon: '🔍', desc: 'Windows EVTX logs, timestamps, breach timeline reconstruct' },
    { id: 'phishing', name: 'Phishing Email Analyzer', icon: '🎣', desc: 'Raw header inspection, SPF/DKIM, $18.5M inheritance case' },
    { id: 'network', name: 'Network Diagnostics', icon: '🌐', desc: 'Interactive topology with animated packet flows' }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      
      {/* 1. HERO SECTION WITH USER'S POSTER IMAGE */}
      <section className="relative pt-6 pb-20 lg:pt-10 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b border-cyan-950/50">
        
        {/* Cyber grid background & ambient lights */}
        <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top Pill Alert */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-950/40">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>POWERED BY SARLAYASH MISSION • BE A DIGITALLY SAFE INDIA</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <div className="inline-block">
                  <span className="text-amber-400 font-bold tracking-widest text-xs uppercase px-2.5 py-1 rounded bg-amber-950/50 border border-amber-500/30">
                    Legacy of Values. Future of Learning.
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                  CYBER SECURITY <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400 bg-clip-text text-transparent">
                    ZERO-TO-INFINITY
                  </span>
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
                  <span className="text-xl sm:text-2xl font-bold text-slate-200">
                    WITH KAPIL
                  </span>
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono">
                    15-DAY WORKSHOP
                  </span>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                From Awareness to Action. From Zero to Real-World Ready.
                A corporate-grade cybersecurity academy, virtual cyber lab, and assessment readiness ecosystem.
                <span className="block mt-2 font-semibold text-amber-300">
                  Because Cybersecurity is a Life Skill.
                </span>
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onOpenGoogleAuth}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#030712"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                    />
                    <path
                      fill="#030712"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.36 24 12 24z"
                    />
                    <path
                      fill="#030712"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                    />
                    <path
                      fill="#030712"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>CONTINUE WITH GOOGLE</span>
                </button>

                <button
                  onClick={onExploreAsGuest}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Explore Command Center</span>
                </button>

                {onOpenTour && (
                  <button
                    onClick={onOpenTour}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 hover:text-white border border-cyan-500/40 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/50"
                  >
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Portal Tour 🚀</span>
                  </button>
                )}
              </div>

              {/* 6 Key Pillars from Poster */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-4 border-t border-slate-800/80">
                {[
                  { label: "LEARN", icon: "📚" },
                  { label: "PRACTICE", icon: "💻" },
                  { label: "QUESTION", icon: "❓" },
                  { label: "VERIFY", icon: "🔍" },
                  { label: "PROTECT", icon: "🛡" },
                  { label: "SHARE", icon: "🤝" }
                ].map((p) => (
                  <div key={p.label} className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 text-center">
                    <span className="text-base">{p.icon}</span>
                    <p className="text-[10px] font-bold text-slate-300 mt-1 tracking-wider">{p.label}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: User's Uploaded Poster Featured Prominently */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative group w-full max-w-md sm:max-w-lg">
                
                {/* Glowing backdrop halo */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-amber-500 to-blue-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500" />

                {/* Poster Frame */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400/40 bg-[#070e1f] shadow-2xl shadow-cyan-950/80">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/hero-poster.jpg`}
                    alt="Cyber Security Zero-To-Infinity with Kapil - SarlaYash Mission"
                    className="w-full h-auto object-cover object-center transform transition duration-500 group-hover:scale-[1.01]"
                  />
                  
                  {/* Glassmorphic interactive overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400 block font-semibold">
                        OFFICIAL SARLAYASH WORKSHOP
                      </span>
                      <span className="text-xs font-bold text-white">
                        Digital Suraksha • Digital Bharat
                      </span>
                    </div>
                    <button
                      onClick={onOpenGoogleAuth}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors"
                    >
                      Join Now
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY CYBERSECURITY? SECTION */}
      <section id="why-cyber" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050a17] border-b border-cyan-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2 font-mono">
              THE IMPERATIVE FOR INDIA & THE WORLD
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Cybersecurity is a Vital Life Skill
            </h3>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              In an era of hyper-connected commerce, critical infrastructure, and cloud integration, cyber defense is no longer just an IT specialty—it is an essential national shield and career superpower.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-[#091326] border border-cyan-900/50 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Real-World Threat Defense</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Understand adversary TTPs, ransomware extortions, and social engineering bait before your organization or personal identity is compromised.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#091326] border border-cyan-900/50 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5">
                <Terminal className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">100% Practical & Hands-On</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Zero assumptions and zero textbook boredom. Work inside simulated terminals, Wireshark packet inspectors, and SIEM monitoring consoles directly in your browser.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#091326] border border-cyan-900/50 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Corporate Placement Readiness</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Prepare for high-demand SOC Analyst, Network Defender, and Security Engineer interviews with 100-MCQ mock benchmarks and scenario practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 15-DAY JOURNEY ROADMAP */}
      <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-cyan-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
                CURRICULUM ARCHITECTURE
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                15-Day Zero-to-Infinity Journey
              </h3>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mt-4 md:mt-0">
              Methodically paced from basic awareness to complex incident response. <span className="text-amber-400 font-semibold block mt-1">Strict sequential progression: All learners begin at Day 01; subsequent days unlock one-by-one upon assignment completion.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {MODULES_DATA.map((module) => (
              <div
                key={module.id}
                onClick={() => onSelectModule ? onSelectModule(module.id) : onOpenGoogleAuth()}
                className="p-4 rounded-xl bg-[#081124] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between hover:bg-slate-900/90"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      {module.dayNumber}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-medium">
                      {module.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {module.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {module.shortDesc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-cyan-400">
                  <span>{module.estimatedMinutes} mins</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VIRTUAL CYBER LAB (9 SIMULATORS PREVIEW) */}
      <section id="simulators" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050a17] border-b border-cyan-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
              VIRTUAL CYBER LAB
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              9 In-Browser Interactive Simulators
            </h3>
            <p className="mt-3 text-slate-400 text-sm">
              No software installation, no virtual machines, and no danger. Controlled, safe, and realistic sandboxes running directly in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labHighlights.map((lab) => (
              <div
                key={lab.id}
                onClick={() => onLaunchSimulator ? onLaunchSimulator(lab.id) : onOpenGoogleAuth()}
                className="p-5 rounded-2xl bg-[#091326] border border-cyan-900/40 hover:border-cyan-400/50 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-800/40">
                    {lab.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {lab.name}
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-mono">Ready to Launch</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  {lab.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:text-cyan-300">
                  <span>Enter Lab Simulator</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MOCK ASSESSMENT & INTERVIEW HUB HIGHLIGHTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-cyan-950/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Mock Assessment Card */}
          <div className="p-8 rounded-2xl bg-[#091226] border border-cyan-900/60 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Corporate Mock Assessment Engine
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Standardized 100-MCQ testing platform with strict corporate quality: 30 Easy, 40 Medium, 30 Hard questions. Countdown timer, question navigation grid, and instant topic-wise analysis.
            </p>
            <div className="space-y-2 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>150+ Randomized Defensible Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>No Trick Wording • Clear Defensible Explanations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Topic-wise & Difficulty-wise Performance Reporting</span>
              </div>
            </div>
            <button
              onClick={onOpenGoogleAuth}
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors"
            >
              Start Practice Assessment
            </button>
          </div>

          {/* Interview Hub Card */}
          <div className="p-8 rounded-2xl bg-[#091226] border border-cyan-900/60 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Cyber Security Interview Hub
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Corporate interview prep tailored for SOC Analysts and Security Engineers. Covering HR, Technical, Network, Linux, Incident Response, and 'What would you do if...?' scenarios.
            </p>
            <div className="space-y-2 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Model Answers & Key Talking Points</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Red Flags to Avoid Saying in Corporate Interviews</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Beginner, Intermediate & Advanced Filters</span>
              </div>
            </div>
            <button
              onClick={onOpenGoogleAuth}
              className="px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs tracking-wider uppercase transition-colors"
            >
              Explore Interview Hub
            </button>
          </div>

        </div>
      </section>

      {/* 6. SARLAYASH MISSION & FACILITATOR KAPIL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050a17] border-b border-cyan-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#091326] via-[#0b162c] to-[#091326] border border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  <span>SARLAYASH MISSION</span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">
                  "Legacy of Values. Future of Learning."
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  SarlaYash Mission is committed to building a digitally secure India. Through accessible, values-driven, and intensely practical cybersecurity education, we empower learners to protect their personal privacy, defend corporate infrastructure, and build high-impact careers in technology.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-cyan-300">
                  <span>• Digital Suraksha</span>
                  <span>• Digital Bharat</span>
                  <span>• Ethical Stewardship</span>
                  <span>• Zero Assumptions</span>
                </div>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
                <p className="text-amber-400 font-bold text-lg">With Kapil</p>
                <p className="text-xs text-slate-400 font-medium">Program Facilitator & Cyber Defender</p>
                <p className="text-[11px] text-slate-500 mt-2">
                  "Learn. Defend. Empower. A safer digital tomorrow begins with your commitment today."
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-[#030611] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-400">
              CYBER SECURITY ZERO-TO-INFINITY WITH KAPIL
            </p>
            <p className="text-[11px] mt-0.5">
              Powered by SarlaYash Mission • “Legacy of Values. Future of Learning.”
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenGoogleAuth}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Learner Portal
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdminAuth}
              className="text-slate-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
