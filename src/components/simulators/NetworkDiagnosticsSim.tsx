import React, { useState } from 'react';
import { Globe, Laptop, Server, Shield, Wifi, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { storageService } from '../../services/storageService';

export const NetworkDiagnosticsSim: React.FC = () => {
  const [activeTest, setActiveTest] = useState<'ping' | 'dns' | 'handshake' | 'firewall_drop'>('ping');
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const runTest = (testType: 'ping' | 'dns' | 'handshake' | 'firewall_drop') => {
    setActiveTest(testType);
    setIsRunning(true);
    setAnimationStep(1);
    setLogMessages([`[0.00s] Initializing test: ${testType.toUpperCase()} from Host 192.168.1.105...`]);

    const steps = [
      { step: 2, delay: 600, msg: "[0.02s] Packet passed internal Layer-2 switch to Gateway Router (192.168.1.1)." },
      { step: 3, delay: 1200, msg: "[0.05s] Inspecting state table at Edge Firewall (PAT/NAT active)..." },
      { 
        step: 4, 
        delay: 1800, 
        msg: testType === 'firewall_drop' 
          ? "[0.08s] FIREWALL RULE #1 MATCH: Packet from untrusted IP dropped silently (BLOCKED)."
          : "[0.12s] Packet routed across WAN to target endpoint 198.51.100.50." 
      },
      { 
        step: 5, 
        delay: 2400, 
        msg: testType === 'firewall_drop'
          ? "[0.15s] Transmission terminated. Zero internal ingress achieved."
          : "[0.18s] Return packet received by client (RTT: 18ms). Verification SUCCESSFUL." 
      }
    ];

    steps.forEach(({ step, delay, msg }) => {
      setTimeout(() => {
        setAnimationStep(step);
        setLogMessages(prev => [...prev, msg]);
        if (step === 5) {
          setIsRunning(false);
          storageService.recordSimulatorRun('network', 100);
        }
      }, delay);
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Objective Banner */}
      <div className="p-4 rounded-xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block">
            LAB OBJECTIVE: INTERACTIVE NETWORK TOPOLOGY & PACKET FLOW
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Visualize animated packet routing across internal LAN, gateway router, edge firewall, and WAN cloud destinations.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => runTest('ping')}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTest === 'ping' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            ICMP Ping
          </button>
          <button
            onClick={() => runTest('dns')}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTest === 'dns' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            DNS Lookup
          </button>
          <button
            onClick={() => runTest('handshake')}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTest === 'handshake' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300'
            }`}
          >
            TCP Handshake
          </button>
          <button
            onClick={() => runTest('firewall_drop')}
            disabled={isRunning}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
              activeTest === 'firewall_drop' ? 'bg-red-500 text-white' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Test Block Rule
          </button>
        </div>
      </div>

      {/* Topology Diagram Canvas */}
      <div className="p-8 rounded-3xl bg-[#070e1f] border border-cyan-900/60 shadow-2xl relative overflow-hidden">
        
        {/* Topology Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-center text-center relative z-10">
          
          {/* Node 1: Client Host */}
          <div className={`p-4 rounded-2xl border transition-all ${
            animationStep === 1 ? 'bg-cyan-950 border-cyan-400 scale-105 shadow-xl shadow-cyan-500/30' : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2">
              <Laptop className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white block">Client Host</span>
            <span className="text-[10px] font-mono text-cyan-400">192.168.1.105</span>
          </div>

          {/* Node 2: Core Switch */}
          <div className={`p-4 rounded-2xl border transition-all ${
            animationStep === 2 ? 'bg-cyan-950 border-cyan-400 scale-105 shadow-xl shadow-cyan-500/30' : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-2">
              <Wifi className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white block">Layer-2 Switch</span>
            <span className="text-[10px] font-mono text-slate-400">VLAN 10</span>
          </div>

          {/* Node 3: Edge Router */}
          <div className={`p-4 rounded-2xl border transition-all ${
            animationStep === 3 ? 'bg-cyan-950 border-cyan-400 scale-105 shadow-xl shadow-cyan-500/30' : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Server className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white block">Default Gateway</span>
            <span className="text-[10px] font-mono text-amber-400">192.168.1.1</span>
          </div>

          {/* Node 4: Edge Firewall */}
          <div className={`p-4 rounded-2xl border transition-all ${
            animationStep === 4 
              ? activeTest === 'firewall_drop' 
                ? 'bg-red-950 border-red-500 scale-105 shadow-xl shadow-red-500/30' 
                : 'bg-cyan-950 border-cyan-400 scale-105 shadow-xl shadow-cyan-500/30'
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white block">Stateful Firewall</span>
            <span className="text-[10px] font-mono text-red-400">NAT &amp; ACLs</span>
          </div>

          {/* Node 5: Target Server */}
          <div className={`p-4 rounded-2xl border transition-all ${
            animationStep === 5 && activeTest !== 'firewall_drop' ? 'bg-emerald-950 border-emerald-400 scale-105 shadow-xl shadow-emerald-500/30' : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white block">Cloud Web Server</span>
            <span className="text-[10px] font-mono text-emerald-400">198.51.100.50</span>
          </div>

        </div>

      </div>

      {/* Packet Diagnostics Log Terminal */}
      <div className="p-4 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-400 font-sans pb-2 border-b border-slate-800">
          <span>Live Packet Telemetry Stream</span>
          <span className="text-cyan-400">{isRunning ? 'PACKET IN FLIGHT' : 'IDLE'}</span>
        </div>
        <div className="space-y-1 text-slate-300 min-h-24">
          {logMessages.map((msg, i) => (
            <div key={i} className={msg.includes('BLOCKED') ? 'text-red-400 font-bold' : msg.includes('SUCCESSFUL') ? 'text-emerald-400 font-bold' : ''}>
              {msg}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
