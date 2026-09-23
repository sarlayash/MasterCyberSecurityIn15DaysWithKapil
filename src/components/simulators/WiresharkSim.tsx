import React, { useState } from 'react';
import { Search, Filter, ShieldAlert, CheckCircle, Eye, ExternalLink, X } from 'lucide-react';
import { SYNTHETIC_PACKETS, PacketItem } from '../../data/simulatorScenarios';
import { storageService } from '../../services/storageService';

export const WiresharkSim: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedPacket, setSelectedPacket] = useState<PacketItem>(SYNTHETIC_PACKETS[7]); // Default select POST packet
  const [tcpStreamOpen, setTcpStreamOpen] = useState(false);
  const [answerExtracted, setAnswerExtracted] = useState('');
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const filteredPackets = SYNTHETIC_PACKETS.filter(pkt => {
    if (!activeFilter) return true;
    const q = activeFilter.toLowerCase().trim();
    if (q === 'http') return pkt.protocol === 'HTTP';
    if (q === 'dns') return pkt.protocol === 'DNS';
    if (q === 'arp') return pkt.protocol === 'ARP';
    if (q === 'tcp') return pkt.protocol === 'TCP';
    if (q.includes('port == 80') || q.includes('80')) return pkt.protocol === 'HTTP' || pkt.details.transport?.dstPort === 80;
    if (q.includes('4444')) return pkt.details.transport?.srcPort === 4444 || pkt.details.transport?.dstPort === 4444;
    return (
      pkt.source.includes(q) ||
      pkt.destination.includes(q) ||
      pkt.protocol.toLowerCase().includes(q) ||
      pkt.info.toLowerCase().includes(q)
    );
  });

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveFilter(filterQuery);
  };

  const handleQuickFilter = (filt: string) => {
    setFilterQuery(filt);
    setActiveFilter(filt);
  };

  const handleVerifyCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (answerExtracted.toLowerCase().includes('winter2026') || answerExtracted.toLowerCase().includes('admin@corp.internal')) {
      setQuizFeedback("CORRECT! You uncovered the unencrypted password 'Winter2026!Secured' submitted to auth server 198.51.100.50 via cleartext HTTP POST.");
      storageService.recordSimulatorRun('wireshark', 100);
    } else {
      setQuizFeedback("Incorrect. Hint: Look at Packet #8 (POST /login.php) payload or click 'Follow TCP Stream'.");
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Objective Banner */}
      <div className="p-4 rounded-xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block">
            LAB OBJECTIVE: WIRESHARK PACKET TRAFFIC TRIAGE
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Use the display filter bar (try <code className="text-amber-400 font-mono">http</code> or <code className="text-amber-400 font-mono">dns</code>) to locate leaked cleartext credentials and inspect suspicious payloads.
          </p>
        </div>

        <button
          onClick={() => setTcpStreamOpen(true)}
          className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Follow TCP Stream</span>
        </button>
      </div>

      {/* Display Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2 p-2.5 rounded-xl bg-[#091122] border border-cyan-900/60 shadow-lg">
        <form onSubmit={handleApplyFilter} className="flex-1 flex items-center gap-2 w-full">
          <Filter className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Apply a display filter (e.g. http, dns, arp, tcp.port == 80)..."
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Apply
          </button>
          {activeFilter && (
            <button
              type="button"
              onClick={() => { setActiveFilter(''); setFilterQuery(''); }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
            >
              Clear
            </button>
          )}
        </form>

        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800 text-[11px] font-mono">
          <span className="text-slate-500">Quick:</span>
          {['http', 'dns', 'arp', 'tcp.port == 80'].map(f => (
            <button
              key={f}
              onClick={() => handleQuickFilter(f)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-400 text-slate-300 border border-slate-700"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Pane 1: Packet List Table */}
      <div className="rounded-2xl border border-cyan-900/60 bg-[#060b17] shadow-xl overflow-hidden">
        <div className="px-4 py-2 bg-[#091222] border-b border-cyan-950 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Packet List ({filteredPackets.length} Packets)</span>
          <span className="text-slate-500">Synthetic Capture: sarlayash_breach_sample.pcap</span>
        </div>

        <div className="overflow-x-auto max-h-60 overflow-y-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead className="sticky top-0 bg-[#091222] border-b border-slate-800 text-slate-400">
              <tr>
                <th className="py-2 px-3">No.</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Source</th>
                <th className="py-2 px-3">Destination</th>
                <th className="py-2 px-3">Protocol</th>
                <th className="py-2 px-3">Length</th>
                <th className="py-2 px-3">Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {filteredPackets.map((pkt) => {
                const isSelected = selectedPacket.no === pkt.no;

                let protoColor = "text-slate-300";
                if (pkt.protocol === 'HTTP') protoColor = "text-emerald-400 font-bold";
                if (pkt.protocol === 'DNS') protoColor = "text-sky-400 font-bold";
                if (pkt.protocol === 'ARP') protoColor = "text-amber-400";
                if (pkt.protocol === 'TCP' && pkt.details.transport?.dstPort === 4444) protoColor = "text-red-400 font-bold";

                return (
                  <tr
                    key={pkt.no}
                    onClick={() => setSelectedPacket(pkt)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-cyan-950/80 text-white' : 'hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <td className="py-1.5 px-3 text-slate-400">{pkt.no}</td>
                    <td className="py-1.5 px-3 text-slate-400">{pkt.time}</td>
                    <td className="py-1.5 px-3">{pkt.source}</td>
                    <td className="py-1.5 px-3">{pkt.destination}</td>
                    <td className={`py-1.5 px-3 ${protoColor}`}>{pkt.protocol}</td>
                    <td className="py-1.5 px-3 text-slate-400">{pkt.length}</td>
                    <td className="py-1.5 px-3 truncate max-w-xs">{pkt.info}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pane 2 & 3: Packet Details Tree & Hex Dump */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Pane 2: Packet Details Tree */}
        <div className="p-4 rounded-2xl bg-[#070e1f] border border-cyan-900/60 font-mono text-xs text-slate-300 space-y-2.5 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-cyan-400 font-bold font-sans">
            <span>Frame Details (Packet #{selectedPacket.no})</span>
            <span className="text-[10px] text-slate-400 font-mono">{selectedPacket.protocol}</span>
          </div>

          <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80">
            <span className="text-slate-400 block mb-1">▶ {selectedPacket.details.frame}</span>
            <span className="text-slate-400 block">
              ▶ Ethernet II, Src: {selectedPacket.details.ethernet.srcMac}, Dst: {selectedPacket.details.ethernet.dstMac}
            </span>
          </div>

          {selectedPacket.details.ip && (
            <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80">
              <span className="text-cyan-300 block mb-1">
                ▼ Internet Protocol Version 4, Src: {selectedPacket.details.ip.srcIp}, Dst: {selectedPacket.details.ip.dstIp}
              </span>
              <div className="pl-4 text-[11px] text-slate-400 space-y-0.5">
                <p>Time to Live (TTL): {selectedPacket.details.ip.ttl}</p>
                <p>Protocol: {selectedPacket.details.ip.proto}</p>
              </div>
            </div>
          )}

          {selectedPacket.details.transport && (
            <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80">
              <span className="text-amber-300 block mb-1">
                ▼ Transmission Control Protocol, Src Port: {selectedPacket.details.transport.srcPort}, Dst Port: {selectedPacket.details.transport.dstPort}
              </span>
              <div className="pl-4 text-[11px] text-slate-400 space-y-0.5">
                {selectedPacket.details.transport.flags && <p>Flags: {selectedPacket.details.transport.flags}</p>}
                {selectedPacket.details.transport.seq !== undefined && <p>Sequence Number: {selectedPacket.details.transport.seq}</p>}
              </div>
            </div>
          )}

          {selectedPacket.details.application && (
            <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold block mb-1">
                ▼ {selectedPacket.details.application.summary}
              </span>
              {selectedPacket.details.application.payload && (
                <div className="pl-2 pt-1 text-[11px] text-emerald-200 bg-slate-950 p-2 rounded border border-emerald-900 font-mono break-all">
                  {selectedPacket.details.application.payload}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pane 3: Hex Dump View */}
        <div className="p-4 rounded-2xl bg-[#060a12] border border-cyan-900/60 font-mono text-xs max-h-72 overflow-y-auto">
          <div className="pb-2 border-b border-slate-800 text-slate-400 font-bold font-sans mb-2">
            Raw Hexadecimal / ASCII Byte Dump
          </div>
          <pre className="text-[11px] text-cyan-300 leading-relaxed overflow-x-auto">
            {selectedPacket.hexDump}
          </pre>
        </div>

      </div>

      {/* Investigation Question Widget */}
      <form onSubmit={handleVerifyCredential} className="p-4 rounded-2xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-white block">
            Investigation Task: Enter the cleartext password leaked in the HTTP traffic:
          </span>
          {quizFeedback && (
            <p className={`mt-1 font-mono ${quizFeedback.startsWith('CORRECT') ? 'text-emerald-400' : 'text-amber-400'}`}>
              {quizFeedback}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            required
            value={answerExtracted}
            onChange={(e) => setAnswerExtracted(e.target.value)}
            placeholder="Type password found..."
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0"
          >
            Verify Findings
          </button>
        </div>
      </form>

      {/* Follow TCP Stream Modal */}
      {tcpStreamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#070e1f] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-cyan-400 font-sans text-sm">
                Follow TCP Stream #1 (Client 192.168.1.105:54122 ↔ Server 198.51.100.50:80)
              </span>
              <button onClick={() => setTcpStreamOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 p-4 rounded-xl bg-black border border-slate-800 max-h-80 overflow-y-auto space-y-3">
              <div className="text-blue-400">
                <p>POST /login.php HTTP/1.1</p>
                <p>Host: sarlayash-auth.internal</p>
                <p>User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)</p>
                <p>Content-Type: application/x-www-form-urlencoded</p>
                <p>Content-Length: 73</p>
                <br />
                <p className="bg-red-950/60 p-2 rounded border border-red-500/50 text-red-200 font-bold">
                  username=admin%40corp.internal&amp;password=Winter2026%21Secured&amp;submit=Login
                </p>
              </div>

              <div className="text-emerald-400 pt-2 border-t border-slate-800">
                <p>HTTP/1.1 200 OK</p>
                <p>Content-Type: text/html</p>
                <p>Content-Length: 74</p>
                <br />
                <p>&lt;html&gt;&lt;body&gt;&lt;h3&gt;Login Authenticated. Welcome Admin!&lt;/h3&gt;&lt;p&gt;Session: 9f8a12e4&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Entire conversation reconstructed from TCP sequence bytes.</span>
              <button
                onClick={() => setTcpStreamOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Close Stream
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
