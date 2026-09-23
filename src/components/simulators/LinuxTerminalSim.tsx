import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, CheckCircle } from 'lucide-react';
import { storageService } from '../../services/storageService';

export const LinuxTerminalSim: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "Linux sarlayash-sec 5.15.0-91-generic #101-Ubuntu SMP x86_64",
    "",
    "The programs included with the Ubuntu system are free software.",
    "Type 'help' to list simulated Linux administration and audit commands.",
    ""
  ]);
  const [inputVal, setInputVal] = useState('');
  const [tasksDone, setTasksDone] = useState<{ authLog: boolean; psAux: boolean; suidFind: boolean }>({
    authLog: false,
    psAux: false,
    suidFind: false
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, `analyst@sarlayash-sec:~$ ${cmd}`];
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      newHistory.push(
        "Supported Linux Security commands:",
        "  ls -la                  - List files, hidden items, and POSIX permissions",
        "  cat /var/log/auth.log   - Inspect SSH authentication logs",
        "  grep 'Failed' /var/log/auth.log - Filter failed login brute-force attempts",
        "  ps aux                  - List running processes across all users",
        "  find / -perm -4000      - Audit SUID root privilege escalation binaries",
        "  chmod <octal> <file>    - Modify file permissions (e.g. chmod 600 id_rsa)",
        "  whoami                  - Display current effective user",
        "  sudo -l                 - Check current user sudo privileges",
        "  ss -tulpn               - Inspect listening TCP/UDP sockets",
        "  cat /etc/passwd         - Inspect system user accounts"
      );
    } else if (lower.startsWith('ls')) {
      newHistory.push(
        "total 36",
        "drwxr-xr-x 4 analyst security 4096 Sep 23 08:00 .",
        "drwxr-xr-x 3 root    root     4096 Sep 10 12:00 ..",
        "-rw-r--r-- 1 analyst security  220 Sep 10 12:00 .bash_logout",
        "-rw-r--r-- 1 analyst security 3771 Sep 10 12:00 .bashrc",
        "drwx------ 2 analyst security 4096 Sep 22 14:10 .ssh",
        "-rw-r--r-- 1 analyst security  807 Sep 10 12:00 .profile",
        "-rw------- 1 analyst security 1675 Sep 22 14:12 id_rsa",
        "-rw-r--r-- 1 analyst security  420 Sep 23 07:45 incident_triage.sh"
      );
    } else if (lower.includes('/var/log/auth.log')) {
      newHistory.push(
        "Sep 23 02:14:01 sarlayash-sec sshd[4101]: Failed password for root from 198.51.100.23 port 39100 ssh2",
        "Sep 23 02:14:04 sarlayash-sec sshd[4103]: Failed password for root from 198.51.100.23 port 39102 ssh2",
        "Sep 23 02:14:08 sarlayash-sec sshd[4105]: Failed password for admin from 198.51.100.23 port 39106 ssh2",
        "Sep 23 02:14:12 sarlayash-sec sshd[4108]: Failed password for deployer from 198.51.100.23 port 39110 ssh2",
        "Sep 23 02:14:15 sarlayash-sec sshd[4112]: Accepted password for deployer from 198.51.100.23 port 39115 ssh2 <-- [COMPROMISED!]",
        "Sep 23 02:14:16 sarlayash-sec systemd: pam_unix(systemd-user:session): session opened for user deployer"
      );
      setTasksDone(prev => ({ ...prev, authLog: true }));
      storageService.recordSimulatorRun('linux', 90);
    } else if (lower.startsWith('ps')) {
      newHistory.push(
        "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND",
        "root         1  0.0  0.1 168344 11200 ?        Ss   Sep10   0:08 /sbin/init",
        "root       812  0.0  0.2  72300 14200 ?        Ss   Sep10   0:02 /usr/sbin/sshd -D",
        "analyst   1420  0.0  0.1  24100  4800 pts/0    Ss   08:00   0:00 -bash",
        "deployer  4820 98.4  2.8 450120 89200 ?        R    02:15  92:10 /tmp/.xmrig -o stratum+tcp://pool.mine:3333 <-- [CRYPTOMINER!]"
      );
      setTasksDone(prev => ({ ...prev, psAux: true }));
    } else if (lower.includes('perm -4000') || lower.includes('perm -u=s') || lower.includes('suid')) {
      newHistory.push(
        "/usr/bin/passwd",
        "/usr/bin/sudo",
        "/usr/bin/chfn",
        "/usr/bin/newgrp",
        "/usr/local/bin/backup_tool  <-- [CUSTOM VULNERABLE SUID BINARY OWNED BY ROOT!]"
      );
      setTasksDone(prev => ({ ...prev, suidFind: true }));
      storageService.recordSimulatorRun('linux', 100);
    } else if (lower === 'whoami') {
      newHistory.push("analyst");
    } else if (lower === 'sudo -l') {
      newHistory.push(
        "Matching Defaults entries for analyst on sarlayash-sec:",
        "    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin",
        "",
        "User analyst may run the following commands on sarlayash-sec:",
        "    (root) /usr/bin/journalctl -u sshd"
      );
    } else if (lower.startsWith('cat /etc/passwd')) {
      newHistory.push(
        "root:x:0:0:root:/root:/bin/bash",
        "daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin",
        "sshd:x:121:65534::/run/sshd:/usr/sbin/nologin",
        "deployer:x:1001:1001:Deployment User,,,:/home/deployer:/bin/bash",
        "analyst:x:1002:1002:Security Analyst,,,:/home/analyst:/bin/bash"
      );
    } else {
      newHistory.push(`bash: ${cmd}: command not found. Type 'help' for available commands.`);
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
            LAB OBJECTIVE: LINUX SECURITY LOG & PROCESS AUDIT
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Inspect <code className="text-amber-400 font-mono">cat /var/log/auth.log</code> to identify SSH brute-force breach, and find unauthorized processes via <code className="text-amber-400 font-mono">ps aux</code>.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className={tasksDone.authLog ? "text-emerald-400 font-bold" : "text-slate-500"}>
            [ {tasksDone.authLog ? '✓' : ' '} ] auth.log
          </span>
          <span className={tasksDone.psAux ? "text-emerald-400 font-bold" : "text-slate-500"}>
            [ {tasksDone.psAux ? '✓' : ' '} ] ps aux
          </span>
          <span className={tasksDone.suidFind ? "text-emerald-400 font-bold" : "text-slate-500"}>
            [ {tasksDone.suidFind ? '✓' : ' '} ] SUID audit
          </span>
        </div>
      </div>

      {/* Linux Terminal Box */}
      <div className="rounded-2xl border border-emerald-900/60 bg-[#060a0f] shadow-2xl overflow-hidden font-mono text-xs">
        
        <div className="px-4 py-2 bg-[#09121a] border-b border-emerald-950 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-sm">🐧</span>
            <span className="text-[11px] text-emerald-300 font-sans font-semibold">
              Bash - analyst@sarlayash-sec (POSIX Sandbox)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
        </div>

        <div className="p-4 min-h-[360px] max-h-[460px] overflow-y-auto space-y-1 text-slate-200">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        <form onSubmit={handleCommand} className="p-3 bg-[#04070a] border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">analyst@sarlayash-sec:~$</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type bash commands (e.g. cat /var/log/auth.log, ps aux, help)..."
            className="flex-1 bg-transparent text-slate-100 focus:outline-none text-xs"
          />
        </form>

      </div>
    </div>
  );
};
