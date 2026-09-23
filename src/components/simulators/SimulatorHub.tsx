import React, { useState } from 'react';
import { 
  Terminal, 
  Flame, 
  ShieldAlert, 
  Search, 
  Compass, 
  Cpu, 
  Activity, 
  Globe, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { CmdPromptSim } from './CmdPromptSim';
import { LinuxTerminalSim } from './LinuxTerminalSim';
import { FirewallSim } from './FirewallSim';
import { WiresharkSim } from './WiresharkSim';
import { SocDashboardSim } from './SocDashboardSim';
import { IncidentResponseSim } from './IncidentResponseSim';
import { ForensicsSim } from './ForensicsSim';
import { PhishingAnalyzerSim } from './PhishingAnalyzerSim';
import { NetworkDiagnosticsSim } from './NetworkDiagnosticsSim';
import { LearnerProfile } from '../../types';

interface SimulatorHubProps {
  initialSimulatorId?: string;
  learner: LearnerProfile;
}

export const SimulatorHub: React.FC<SimulatorHubProps> = ({
  initialSimulatorId,
  learner
}) => {
  const [activeSim, setActiveSim] = useState<string | null>(initialSimulatorId || null);

  const simulatorList = [
    {
      id: 'cmd',
      name: 'Command Prompt Simulator',
      icon: '🖥',
      category: 'Host Diagnostics',
      dayRef: 'Day 06 Lab',
      desc: 'In-browser simulated Windows CMD prompt: ipconfig, ping, tracert, nslookup, netstat, arp, whoami, and system discovery.',
      component: <CmdPromptSim />
    },
    {
      id: 'linux',
      name: 'Linux Terminal Simulator',
      icon: '🐧',
      category: 'OS Security',
      dayRef: 'Day 07 Lab',
      desc: 'Simulated sandboxed Linux bash shell: POSIX file permissions, processes, /var/log/auth.log audits, and SUID vulnerability discovery.',
      component: <LinuxTerminalSim />
    },
    {
      id: 'firewall',
      name: 'Firewall Configuration Simulator',
      icon: '🔥',
      category: 'Perimeter Defense',
      dayRef: 'Day 10 Lab',
      desc: 'Interactive stateful rule builder: ALLOW, DENY, and LOG actions across priority sequences with synthetic packet traffic injection testing.',
      component: <FirewallSim />
    },
    {
      id: 'wireshark',
      name: 'Wireshark-Style Traffic Analysis',
      icon: '📡',
      category: 'Packet Analysis',
      dayRef: 'Day 09 Lab',
      desc: 'Three-pane packet capture inspector: display filters (http, dns, tcp.port), hex byte dump, and bidirectional TCP stream reconstruction.',
      component: <WiresharkSim />
    },
    {
      id: 'soc',
      name: 'SOC Monitoring Dashboard',
      icon: '🛡',
      category: 'Security Operations',
      dayRef: 'Day 11 Lab',
      desc: 'Real-time SIEM alert feed: failed logins, brute-force, Mimikatz EDR flags. Triage LOW to CRITICAL and execute containment playbooks.',
      component: <SocDashboardSim />
    },
    {
      id: 'incident',
      name: 'Incident Response Simulator',
      icon: '🚨',
      category: 'Incident Handling',
      dayRef: 'Day 12 Lab',
      desc: 'Interactive multi-phase scenario: 7 NIST/SANS stages (Identify, Contain, Investigate, Eradicate, Recover, Document, Prevent Recurrence).',
      component: <IncidentResponseSim />
    },
    {
      id: 'forensics',
      name: 'Digital Forensics Simulator',
      icon: '🔍',
      category: 'Forensics & Evidentiary',
      dayRef: 'Day 13 Lab',
      desc: 'Inspect Windows Security EVTX logs, browser SQLite databases, USB plug-and-play records, and Prefetch to reconstruct breach timelines.',
      component: <ForensicsSim />
    },
    {
      id: 'phishing',
      name: 'Phishing Email Analyzer',
      icon: '🎣',
      category: 'Threat Awareness',
      dayRef: 'Day 02 & Day 11 Lab',
      desc: 'Interactive email client with SPF/DKIM/DMARC headers, URL hover inspections, attachment sandboxing, including the $18.5M inheritance case.',
      component: <PhishingAnalyzerSim />
    },
    {
      id: 'network',
      name: 'Network Diagnostics Simulator',
      icon: '🌐',
      category: 'Network Architecture',
      dayRef: 'Day 04 & Day 05 Lab',
      desc: 'Visual topology map animating packet flows between client host, core switch, default gateway router, edge firewall, and cloud web servers.',
      component: <NetworkDiagnosticsSim />
    }
  ];

  const selectedSimData = simulatorList.find(s => s.id === activeSim);

  return (
    <div className="min-h-screen bg-[#030712] py-8 px-4 sm:px-6 lg:px-8 text-slate-100 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Hub Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <span>VIRTUAL CYBER LAB</span>
              <span>•</span>
              <span className="text-amber-400">9 IN-BROWSER SIMULATORS</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {selectedSimData ? selectedSimData.name : 'Cyber Simulator Hub'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              100% Client-Side In-Browser Execution. No external servers or local installations required.
            </p>
          </div>

          {activeSim && (
            <button
              onClick={() => setActiveSim(null)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors self-start sm:self-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lab Catalog</span>
            </button>
          )}
        </div>

        {/* Catalog Grid View when no simulator is active */}
        {!activeSim ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulatorList.map((sim) => {
              const isRun = learner.completedLabs.includes(sim.id);
              const stat = learner.simulatorStats[sim.id];

              return (
                <div
                  key={sim.id}
                  onClick={() => setActiveSim(sim.id)}
                  className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/40 hover:border-cyan-400/50 transition-all cursor-pointer group flex flex-col justify-between hover:-translate-y-1 shadow-xl hover:shadow-cyan-950/50"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl p-3 rounded-2xl bg-cyan-950/70 border border-cyan-800/40 group-hover:scale-105 transition-transform">
                        {sim.icon}
                      </span>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-amber-400 font-bold block">
                          {sim.dayRef}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800 mt-0.5 inline-block">
                          {sim.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {sim.name}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sim.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                      <span>Launch Simulator</span>
                      <span>→</span>
                    </span>

                    {isRun ? (
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Score: {stat?.score || 100}%</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">Unattempted</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Active Simulator Container */
          <div className="space-y-4">
            {selectedSimData?.component}
          </div>
        )}

      </div>
    </div>
  );
};
