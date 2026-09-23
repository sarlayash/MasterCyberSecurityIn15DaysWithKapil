import React, { useState, useRef, useEffect } from 'react';
import { Terminal, RefreshCw, CheckCircle, HelpCircle } from 'lucide-react';
import { storageService } from '../../services/storageService';

export const CmdPromptSim: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows [Version 10.0.19045.3803]",
    "(c) Microsoft Corporation. All rights reserved.",
    "",
    "C:\\Users\\Analyst> echo Welcome to Cyber Command Prompt Lab. Type 'help' for available commands."
  ]);
  const [inputVal, setInputVal] = useState('');
  const [tasksDone, setTasksDone] = useState<{ netstat: boolean; whoami: boolean; ipconfig: boolean }>({
    netstat: false,
    whoami: false,
    ipconfig: false
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, `C:\\Users\\Analyst> ${cmd}`];
    const lower = cmd.toLowerCase();

    if (lower === 'cls' || lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      newHistory.push(
        "Supported diagnostic commands:",
        "  ipconfig       - Display IP and adapter settings (try: ipconfig /all)",
        "  ping <host>    - Test ICMP reachability to an IP or domain",
        "  tracert <host> - Trace packet route hops to destination",
        "  nslookup <dom> - Interrogate DNS servers for host IP",
        "  netstat -ano   - Show active sockets, listening ports, and PIDs",
        "  arp -a         - Display ARP IP-to-MAC hardware cache table",
        "  whoami         - Display logged-in user security context (try: whoami /priv)",
        "  hostname       - Print local machine netbios name",
        "  systeminfo     - Show OS configuration and hotfix patches",
        "  dir            - List files in current directory",
        "  cls            - Clear terminal screen"
      );
    } else if (lower.startsWith('ipconfig')) {
      newHistory.push(
        "Windows IP Configuration",
        "",
        "Ethernet adapter vEthernet (Corporate LAN):",
        "   Connection-specific DNS Suffix  . : corp.sarlayash.internal",
        "   Link-local IPv6 Address . . . . . : fe80::d912:4c55:8821:39a1%12",
        "   IPv4 Address. . . . . . . . . . . : 192.168.1.105",
        "   Subnet Mask . . . . . . . . . . . : 255.255.255.0",
        "   Default Gateway . . . . . . . . . : 192.168.1.1",
        "   DNS Servers . . . . . . . . . . . : 8.8.8.8, 1.1.1.1"
      );
      setTasksDone(prev => ({ ...prev, ipconfig: true }));
      storageService.recordSimulatorRun('cmd', 75);
    } else if (lower.startsWith('ping')) {
      const target = cmd.split(' ')[1] || '8.8.8.8';
      newHistory.push(
        `Pinging ${target} with 32 bytes of data:`,
        `Reply from ${target}: bytes=32 time=14ms TTL=56`,
        `Reply from ${target}: bytes=32 time=13ms TTL=56`,
        `Reply from ${target}: bytes=32 time=15ms TTL=56`,
        `Reply from ${target}: bytes=32 time=14ms TTL=56`,
        "",
        `Ping statistics for ${target}:`,
        "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),",
        "Approximate round trip times in milli-seconds:",
        "    Minimum = 13ms, Maximum = 15ms, Average = 14ms"
      );
    } else if (lower.startsWith('tracert')) {
      const target = cmd.split(' ')[1] || '8.8.8.8';
      newHistory.push(
        `Tracing route to ${target} over a maximum of 30 hops:`,
        "  1    <1 ms    <1 ms    <1 ms  192.168.1.1 [Default Gateway]",
        "  2     4 ms     3 ms     4 ms  10.240.0.1",
        "  3     8 ms     8 ms     7 ms  172.16.50.254",
        "  4    14 ms    13 ms    14 ms  8.8.8.8",
        "",
        "Trace complete."
      );
    } else if (lower.startsWith('nslookup')) {
      const target = cmd.split(' ')[1] || 'sarlayash.org';
      newHistory.push(
        "Server:  google-public-dns-a.google.com",
        "Address:  8.8.8.8",
        "",
        "Non-authoritative answer:",
        `Name:    ${target}`,
        "Address:  198.51.100.50"
      );
    } else if (lower.startsWith('netstat')) {
      newHistory.push(
        "Active Connections",
        "",
        "  Proto  Local Address          Foreign Address        State           PID",
        "  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       844",
        "  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4",
        "  TCP    192.168.1.105:54122    198.51.100.50:80       ESTABLISHED     3120",
        "  TCP    192.168.1.105:49182    203.0.113.88:4444      ESTABLISHED     4820   <-- [SUSPICIOUS BACKDOOR!]",
        "  TCP    [::]:3389              [::]:0                 LISTENING       1040"
      );
      setTasksDone(prev => ({ ...prev, netstat: true }));
      storageService.recordSimulatorRun('cmd', 95);
    } else if (lower.startsWith('arp')) {
      newHistory.push(
        "Interface: 192.168.1.105 --- 0xc",
        "  Internet Address      Physical Address      Type",
        "  192.168.1.1           00-50-56-fe-ed-01     dynamic",
        "  192.168.1.255         ff-ff-ff-ff-ff-ff     static",
        "  224.0.0.22           01-00-5e-00-00-16     static"
      );
    } else if (lower.startsWith('whoami')) {
      newHistory.push(
        "SARLAYASH-CORP\\analyst",
        "",
        "Privilege Information",
        "---------------------",
        "Privilege Name                Description                          State",
        "============================= ==================================== ========",
        "SeShutdownPrivilege           Shut down the system                 Enabled",
        "SeChangeNotifyPrivilege       Bypass traverse checking             Enabled",
        "SeUndockPrivilege             Remove computer from docking station Enabled"
      );
      setTasksDone(prev => ({ ...prev, whoami: true }));
    } else if (lower === 'hostname') {
      newHistory.push("SEC-STATION-01");
    } else if (lower === 'systeminfo') {
      newHistory.push(
        "Host Name:                 SEC-STATION-01",
        "OS Name:                   Microsoft Windows 10 Enterprise",
        "OS Version:                10.0.19045 N/A Build 19045",
        "System Manufacturer:       SarlaYash Defense Systems",
        "Hotfix(s):                 4 Hotfixes Installed.",
        "                           [01]: KB5034441",
        "                           [02]: KB5034122"
      );
    } else if (lower === 'dir') {
      newHistory.push(
        " Volume in drive C has no label.",
        " Volume Serial Number is 4C21-89B0",
        "",
        " Directory of C:\\Users\\Analyst",
        "",
        "2026-09-23  08:15 AM    <DIR>          .",
        "2026-09-23  08:15 AM    <DIR>          ..",
        "2026-09-22  04:12 PM             1,420 incident_notes.txt",
        "2026-09-23  07:30 AM             3,892 network_audit.log",
        "2026-09-23  08:02 AM    <DIR>          Downloads",
        "               2 File(s)          5,312 bytes"
      );
    } else {
      newHistory.push(`'${cmd}' is not recognized as an internal or external command, operable program or batch file. Type 'help' for commands.`);
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="space-y-4">
      {/* Objective Banner */}
      <div className="p-4 rounded-xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block">
            LAB OBJECTIVE: HOST NETWORK TRIAGE
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Use simulated Windows commands (<code className="text-amber-400 font-mono">netstat -ano</code>, <code className="text-amber-400 font-mono">whoami</code>, <code className="text-amber-400 font-mono">ipconfig</code>) to locate the rogue backdoor process.
          </p>
        </div>

        {/* Progress Checklist */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className={tasksDone.ipconfig ? "text-emerald-400 font-bold" : "text-slate-500"}>
            [ {tasksDone.ipconfig ? '✓' : ' '} ] ipconfig
          </span>
          <span className={tasksDone.whoami ? "text-emerald-400 font-bold" : "text-slate-500"}>
            [ {tasksDone.whoami ? '✓' : ' '} ] whoami
          </span>
          <span className={tasksDone.netstat ? "text-emerald-400 font-bold" : "text-slate-500"}>
            [ {tasksDone.netstat ? '✓' : ' '} ] netstat
          </span>
        </div>
      </div>

      {/* Simulated Terminal Window */}
      <div className="rounded-2xl border border-cyan-900/60 bg-black shadow-2xl overflow-hidden font-mono text-xs">
        
        {/* Terminal Header */}
        <div className="px-4 py-2 bg-[#0c1322] border-b border-slate-800 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] text-slate-300 font-sans font-semibold">
              Command Prompt - SEC-STATION-01 (Simulated Sandbox)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
        </div>

        {/* Terminal Screen */}
        <div className="p-4 min-h-[360px] max-h-[460px] overflow-y-auto space-y-1 text-slate-200">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Prompt Input */}
        <form onSubmit={handleCommand} className="p-3 bg-[#080d1a] border-t border-slate-800 flex items-center gap-2">
          <span className="text-cyan-400 font-bold">C:\Users\Analyst&gt;</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a safe command (e.g. netstat -ano, ipconfig, help)..."
            className="flex-1 bg-transparent text-slate-100 focus:outline-none text-xs"
          />
        </form>

      </div>
    </div>
  );
};
