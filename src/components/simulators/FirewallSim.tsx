import React, { useState } from 'react';
import { Flame, Plus, Trash2, ArrowRight, ShieldCheck, ShieldAlert, Play, CheckCircle } from 'lucide-react';
import { storageService } from '../../services/storageService';

export interface FirewallRule {
  id: string;
  priority: number;
  source: string;
  destination: string;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'ANY';
  port: string;
  action: 'ALLOW' | 'DENY' | 'LOG';
  comment: string;
}

export const FirewallSim: React.FC = () => {
  const [rules, setRules] = useState<FirewallRule[]>([
    {
      id: 'r-1',
      priority: 10,
      source: '198.51.100.99',
      destination: 'ANY',
      protocol: 'ANY',
      port: 'ANY',
      action: 'DENY',
      comment: 'Block verified attacker DDoS IP'
    },
    {
      id: 'r-2',
      priority: 20,
      source: 'ANY',
      destination: '10.0.0.10',
      protocol: 'TCP',
      port: '443',
      action: 'ALLOW',
      comment: 'Permit public HTTPS to web server'
    },
    {
      id: 'r-3',
      priority: 30,
      source: '192.168.1.0/24',
      destination: '10.0.0.10',
      protocol: 'TCP',
      port: '22',
      action: 'ALLOW',
      comment: 'Allow admin SSH from internal subnet'
    },
    {
      id: 'r-default',
      priority: 999,
      source: 'ANY',
      destination: 'ANY',
      protocol: 'ANY',
      port: 'ANY',
      action: 'DENY',
      comment: 'Implicit Default Deny All'
    }
  ]);

  // Form states for adding new rule
  const [sourceInput, setSourceInput] = useState('ANY');
  const [destInput, setDestInput] = useState('10.0.0.10');
  const [protoInput, setProtoInput] = useState<'TCP' | 'UDP' | 'ICMP' | 'ANY'>('TCP');
  const [portInput, setPortInput] = useState('80');
  const [actionInput, setActionInput] = useState<'ALLOW' | 'DENY' | 'LOG'>('ALLOW');
  const [priorityInput, setPriorityInput] = useState<number>(25);
  const [commentInput, setCommentInput] = useState('Allow HTTP');

  // Traffic Testing Simulation State
  const [testResult, setTestResult] = useState<any[] | null>(null);
  const [testingInProgress, setTestingInProgress] = useState(false);

  const testPackets = [
    {
      name: "Attacker DDoS Exploit",
      src: "198.51.100.99",
      dst: "10.0.0.10",
      proto: "TCP",
      port: "443",
      expected: "DENY"
    },
    {
      name: "Legitimate Customer HTTPS",
      src: "203.0.113.15",
      dst: "10.0.0.10",
      proto: "TCP",
      port: "443",
      expected: "ALLOW"
    },
    {
      name: "Internal Admin SSH",
      src: "192.168.1.50",
      dst: "10.0.0.10",
      proto: "TCP",
      port: "22",
      expected: "ALLOW"
    },
    {
      name: "Unauthorized External SSH Attempt",
      src: "203.0.113.15",
      dst: "10.0.0.10",
      proto: "TCP",
      port: "22",
      expected: "DENY"
    },
    {
      name: "Unauthorized Database Port Access",
      src: "203.0.113.15",
      dst: "10.0.0.20",
      proto: "TCP",
      port: "5432",
      expected: "DENY"
    }
  ];

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    const newRule: FirewallRule = {
      id: `r-${Date.now()}`,
      priority: Number(priorityInput),
      source: sourceInput.trim() || 'ANY',
      destination: destInput.trim() || 'ANY',
      protocol: protoInput,
      port: portInput.trim() || 'ANY',
      action: actionInput,
      comment: commentInput.trim() || 'Custom Rule'
    };

    const updated = [...rules, newRule].sort((a, b) => a.priority - b.priority);
    setRules(updated);
    setTestResult(null);
  };

  const handleDeleteRule = (id: string) => {
    if (id === 'r-default') return; // Cannot delete default deny
    setRules(rules.filter(r => r.id !== id));
    setTestResult(null);
  };

  const runTrafficSimulation = () => {
    setTestingInProgress(true);
    setTestResult(null);

    setTimeout(() => {
      const sorted = [...rules].sort((a, b) => a.priority - b.priority);

      const evaluations = testPackets.map(pkt => {
        let matchedRule = sorted[sorted.length - 1]; // fallback default

        for (const r of sorted) {
          const matchSrc = r.source === 'ANY' || r.source === pkt.src || (r.source.endsWith('/24') && pkt.src.startsWith(r.source.split('.')[0]));
          const matchDst = r.destination === 'ANY' || r.destination === pkt.dst;
          const matchProto = r.protocol === 'ANY' || r.protocol === pkt.proto;
          const matchPort = r.port === 'ANY' || r.port === pkt.port;

          if (matchSrc && matchDst && matchProto && matchPort) {
            matchedRule = r;
            break;
          }
        }

        const isSuccess = matchedRule.action === pkt.expected;
        return {
          ...pkt,
          matchedRule,
          verdict: matchedRule.action,
          isSuccess
        };
      });

      setTestResult(evaluations);
      setTestingInProgress(false);

      const allPassed = evaluations.every(e => e.isSuccess);
      if (allPassed) {
        storageService.recordSimulatorRun('firewall', 100);
      } else {
        storageService.recordSimulatorRun('firewall', 75);
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Objective Banner */}
      <div className="p-4 rounded-xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block">
            LAB OBJECTIVE: STATEFUL FIREWALL HARDENING
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Build a prioritized rule base. Block rogue DDoS IP <code className="text-amber-400 font-mono">198.51.100.99</code> while allowing legitimate HTTPS and internal SSH. Test your policy using the traffic injection suite.
          </p>
        </div>

        <button
          onClick={runTrafficSimulation}
          disabled={testingInProgress}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>{testingInProgress ? 'Injecting Packets...' : 'Test Policy with Traffic Engine'}</span>
        </button>
      </div>

      {/* Rules Table */}
      <div className="p-5 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Active Firewall Rule Table (Evaluated Top-Down)
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">{rules.length} Rules Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Source IP</th>
                <th className="py-2.5 px-3">Destination IP</th>
                <th className="py-2.5 px-3">Proto</th>
                <th className="py-2.5 px-3">Port</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rules.map((r) => (
                <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-2.5 px-3 text-cyan-400 font-bold">{r.priority}</td>
                  <td className="py-2.5 px-3 text-slate-200">{r.source}</td>
                  <td className="py-2.5 px-3 text-slate-200">{r.destination}</td>
                  <td className="py-2.5 px-3 text-slate-300">{r.protocol}</td>
                  <td className="py-2.5 px-3 text-slate-300">{r.port}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.action === 'ALLOW' 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                        : r.action === 'DENY' 
                        ? 'bg-red-950 text-red-400 border border-red-500/40' 
                        : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                    }`}>
                      {r.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 font-sans text-[11px]">{r.comment}</td>
                  <td className="py-2.5 px-3 text-right">
                    {r.id !== 'r-default' && (
                      <button
                        onClick={() => handleDeleteRule(r.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Rule Form */}
      <form onSubmit={handleAddRule} className="p-5 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-4">
        <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
          + Add New Rule to Policy
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Priority (Low=First)</label>
            <input
              type="number"
              required
              value={priorityInput}
              onChange={(e) => setPriorityInput(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Source IP</label>
            <input
              type="text"
              required
              value={sourceInput}
              onChange={(e) => setSourceInput(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Destination IP</label>
            <input
              type="text"
              required
              value={destInput}
              onChange={(e) => setDestInput(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Protocol</label>
            <select
              value={protoInput}
              onChange={(e) => setProtoInput(e.target.value as any)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            >
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
              <option value="ICMP">ICMP</option>
              <option value="ANY">ANY</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Port</label>
            <input
              type="text"
              required
              value={portInput}
              onChange={(e) => setPortInput(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Action</label>
            <select
              value={actionInput}
              onChange={(e) => setActionInput(e.target.value as any)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            >
              <option value="ALLOW">ALLOW</option>
              <option value="DENY">DENY</option>
              <option value="LOG">LOG</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Description</label>
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Insert Rule</span>
        </button>
      </form>

      {/* Traffic Test Simulation Results */}
      {testResult && (
        <div className="p-5 rounded-2xl bg-[#081124] border border-cyan-500/40 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Simulated Traffic Test Suite Results
            </h4>
            <span className={`text-xs font-bold font-mono ${
              testResult.every(t => t.isSuccess) ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {testResult.filter(t => t.isSuccess).length} / {testResult.length} Tests Passed
            </span>
          </div>

          <div className="space-y-2">
            {testResult.map((res, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono ${
                  res.isSuccess 
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                    : 'bg-red-950/30 border-red-500/40 text-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {res.isSuccess ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span className="font-bold text-white font-sans">{res.name}:</span>
                  <span className="text-slate-400">{res.src} → {res.dst}:{res.port} ({res.proto})</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>Verdict: <strong className="text-white">{res.verdict}</strong></span>
                  <span className="text-[10px] text-slate-400">Matched Rule #{res.matchedRule.priority}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    res.isSuccess ? 'bg-emerald-900/60 text-emerald-300' : 'bg-red-900/60 text-red-300'
                  }`}>
                    {res.isSuccess ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
