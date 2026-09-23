import { InterviewItem } from '../types';

export const INTERVIEW_DATA: InterviewItem[] = [
  // --- HR / Career / Introduction ---
  {
    id: "int-hr-01",
    category: "HR",
    difficulty: "BEGINNER",
    question: "Tell me about yourself and why you chose a career in cybersecurity.",
    modelAnswer: "I have always been driven by problem-solving and defending digital trust. Over the past several months, through the intensive 15-day Cyber Security Zero-to-Infinity program powered by SarlaYash Mission with Kapil, I have built both hands-on technical proficiency—in packet analysis, Linux log triage, and firewall architecture—and a corporate-ready defensive mindset. I understand that security isn't just about blocking tools; it's about enabling business safely, protecting critical user data, and staying one step ahead of evolving threat actors.",
    keyPoints: [
      "Structure: Past interest -> Concrete training & hands-on projects -> Future value to the company",
      "Highlight hands-on technical competencies (Wireshark, Linux, SIEM triage, Incident Response)",
      "Emphasize business enablement: security supports business growth without needless roadblocks"
    ],
    avoidSaying: "Avoid saying 'I just love hacking' or 'I wanted a high-paying job'. Keep the focus on defense, integrity, and business protection.",
    followUpQuestion: "What specific projects or lab simulations have you completed recently?"
  },
  {
    id: "int-hr-02",
    category: "HR",
    difficulty: "INTERMEDIATE",
    question: "How do you stay updated with rapidly evolving zero-day threats and vulnerabilities?",
    modelAnswer: "I maintain a disciplined daily threat intelligence habit. Every morning, I review CISA's Known Exploited Vulnerabilities (KEV) catalog, NIST NVD bulletins, and curate RSS feeds from BleepingComputer, The Hacker News, and Krebs on Security. I also follow active security researchers on GitHub and Mastodon/Twitter, and regularly practice hands-on triage in simulated labs to analyze recent CVEs and emerging TTPs.",
    keyPoints: [
      "Cite authoritative sources: CISA KEV, NIST NVD, MITRE ATT&CK",
      "Mention threat feeds, community forums, and practical lab reproduction",
      "Show a proactive, continuous learning attitude"
    ],
    avoidSaying: "Avoid giving generic answers like 'I just Google stuff' or admitting you only check news when an incident happens.",
    followUpQuestion: "Can you name one major cybersecurity breach or vulnerability from the past year and what defenders learned from it?"
  },

  // --- SOC Analyst Questions ---
  {
    id: "int-soc-01",
    category: "SOC",
    difficulty: "BEGINNER",
    question: "What is the difference between a True Positive, False Positive, True Negative, and False Negative in SOC alert triage?",
    modelAnswer: "In a SOC: A True Positive is an alert that correctly identifies actual malicious activity. A False Positive is an alert triggered on benign activity (e.g. an admin running a backup script flagged as data exfiltration). A True Negative is normal activity correctly ignored by the SIEM. A False Negative is the most dangerous scenario: actual malicious activity that bypassed detection mechanisms entirely.",
    keyPoints: [
      "True Positive = Actual Attack & Alerted",
      "False Positive = Benign Activity & Alerted",
      "False Negative = Actual Attack & Undetected (highest risk)",
      "Explain how tuning correlation rules minimizes alert fatigue from False Positives"
    ],
    avoidSaying: "Don't confuse False Positives with False Negatives; interviewers will immediately test your clarity on this.",
    followUpQuestion: "How do you minimize False Positives without increasing the risk of False Negatives?"
  },
  {
    id: "int-soc-02",
    category: "SOC",
    difficulty: "INTERMEDIATE",
    question: "Walk me through your step-by-step triage workflow when a high-priority SIEM alert fires for 'Potential Mimikatz Credential Dumping' on an executive laptop.",
    modelAnswer: "First, I immediately verify the source and alert metadata: hostname, username, process ID, parent process (e.g. was PowerShell spawned by Word?), and command-line arguments. Second, because Mimikatz indicates immediate credential compromise danger, I initiate short-term containment by isolating the endpoint from the network via EDR while keeping it powered on to preserve volatile RAM. Third, I check threat intel and correlate with authentication logs for suspicious lateral logins using that user's credentials. Fourth, I force an immediate session revocation and password reset, document all IOCs, and escalate to Tier-2/Incident Response.",
    keyPoints: [
      "Validate telemetry (PID, parent process tree, command args)",
      "Containment before eradication: network isolation via EDR",
      "Never reboot or power off the machine (preserves volatile RAM)",
      "Correlate with Active Directory/auth logs for lateral movement"
    ],
    avoidSaying: "Never say 'I would walk over to the desk and tell the user to shut down their laptop'. Containment must be rapid, remote, and evidence-preserving.",
    followUpQuestion: "What specific Windows Event IDs would you look for in the Domain Controller logs to see if dumped credentials were used?"
  },

  // --- Scenario-Based: 'What would you do if...?' ---
  {
    id: "int-scen-01",
    category: "Scenario",
    difficulty: "ADVANCED",
    question: "What would you do if the company's CEO calls you directly demanding that you bypass firewall security rules so they can test an unapproved personal device on the corporate network?",
    modelAnswer: "I would maintain absolute professional calm and empathy while upholding policy integrity. I would politely explain the security risk: connecting an unapproved device introduces an unmonitored entry point that could jeopardize corporate and board-level confidentiality. Instead of simply saying 'no', I would offer an authorized alternative: enrolling the device into our Mobile Device Management (MDM) / Zero Trust compliance portal, or placing the device on an isolated Guest VLAN with internet-only access that prevents any reachability into internal corporate assets. If they still insist on bypassing controls, I would immediately follow our defined exception procedure and escalate to the CISO for formal risk sign-off.",
    keyPoints: [
      "Never compromise corporate security policy, regardless of executive authority",
      "Provide constructive, secure alternatives (e.g., Guest VLAN, MDM enrollment)",
      "Adhere strictly to corporate Exception Governance and CISO escalation"
    ],
    avoidSaying: "Don't say 'I would just do what the CEO says because they sign my paycheck', or 'I would hang up on the CEO'. Balance diplomacy with firm security principles.",
    followUpQuestion: "What is an acceptable security exception process in an enterprise?"
  },
  {
    id: "int-scen-02",
    category: "Scenario",
    difficulty: "INTERMEDIATE",
    question: "What would you do if you notice outbound beaconing every 60 seconds to a known Russian APT IP address from a production database server?",
    modelAnswer: "This indicates an active command-and-control foothold on critical infrastructure. Step 1: Immediately deploy a high-priority perimeter firewall drop rule on egress to that IP to sever communication without alerting the attacker. Step 2: Notify the incident response lead and CISO immediately. Step 3: Take a forensic snapshot of the server's volatile memory (RAM) and network state before taking it offline. Step 4: Isolate the server onto a quarantined VLAN. Step 5: Failover database operations to a clean, verified hot standby replica so business continuity is preserved while forensics analyzes the breach timeline.",
    keyPoints: [
      "Sever C2 channel immediately via firewall egress block",
      "Preserve memory and volatile forensic evidence",
      "Initiate failover to ensure high availability for business operations",
      "Root cause investigation: determine how the attacker gained database access initially"
    ],
    avoidSaying: "Avoid rebooting the database or deleting files manually before capturing memory dumps.",
    followUpQuestion: "How would you determine what data, if any, was exfiltrated during prior beacon cycles?"
  },

  // --- Network Security & Firewalls ---
  {
    id: "int-net-01",
    category: "Network",
    difficulty: "BEGINNER",
    question: "Explain the TCP 3-Way Handshake and what happens during a SYN Flood attack.",
    modelAnswer: "The TCP 3-way handshake establishes a reliable stream: 1) Client sends a SYN (synchronize) packet with an initial sequence number; 2) Server replies with SYN-ACK; 3) Client returns an ACK. In a SYN Flood, an attacker floods the server with thousands of spoofed SYN packets but never returns the ACK. The server allocates a memory buffer for each half-open connection in its backlog queue, rapidly exhausting memory and denying service to legitimate clients. Defenders mitigate this using SYN Cookies, rate limiting, and stateful firewall inspection.",
    keyPoints: [
      "SYN -> SYN-ACK -> ACK sequence and sequence numbers",
      "Half-open connection table exhaustion in server kernel",
      "Defense: SYN Cookies, micro-blocks, TCP intercept on firewalls"
    ],
    avoidSaying: "Don't confuse TCP with UDP (UDP does not have handshakes or SYN flags).",
    followUpQuestion: "What are SYN Cookies and how do they prevent backlog exhaustion?"
  },
  {
    id: "int-fw-01",
    category: "Firewall",
    difficulty: "INTERMEDIATE",
    question: "What is Rule Shadowing in firewall management, and why is it dangerous?",
    modelAnswer: "Rule Shadowing occurs when an earlier rule in a firewall policy matches all the traffic criteria of a subsequent rule, preventing the subsequent rule from ever being evaluated. For example, if Rule 3 allows ALL traffic to subnet 10.0.0.0/24 on port 443, and Rule 8 attempts to block a specific malicious IP 198.51.100.5 to that subnet on port 443, Rule 8 is shadowed and will never trigger. This creates a dangerous false sense of security where administrators believe they have blocked an attacker when the traffic is actually passing through.",
    keyPoints: [
      "Top-down sequential evaluation of firewall rule bases",
      "Broader rules placed above specific rules cause shadowing",
      "Dangerous because security teams assume a block rule is active when it's never reached",
      "Remediation: Rule base hygiene, automated firewall audits, specific rules on top"
    ],
    avoidSaying: "Don't confuse shadowing with rule redundancy (redundancy duplicates action; shadowing negates action).",
    followUpQuestion: "What automated tools can detect shadowed or redundant firewall rules?"
  },

  // --- Linux Security ---
  {
    id: "int-linux-01",
    category: "Linux",
    difficulty: "INTERMEDIATE",
    question: "What is the security risk associated with SUID binaries in Linux, and how do you find them?",
    modelAnswer: "SUID (Set User ID) allows a program to execute with the permissions of the file owner rather than the user running it. If a binary is owned by root and has the SUID bit set (`-rwsr-xr-x`), and that binary allows shell escapes, command execution, or arbitrary file reads (like vulnerable versions of vim, find, or nmap), an unprivileged attacker can exploit it to spawn a root shell. You can audit for SUID binaries across the filesystem using the command: `find / -perm -u=s -type f 2>/dev/null`.",
    keyPoints: [
      "SUID elevates execution permissions to file owner (typically root)",
      "Privilege escalation risk via GTFOBins or binary vulnerabilities",
      "Command syntax: `find / -perm -u=s -type f 2>/dev/null`",
      "Remediation: mount partitions with `nosuid` and strip unnecessary SUID bits"
    ],
    avoidSaying: "Don't confuse SUID with SGID or standard execute (x) permissions.",
    followUpQuestion: "What is the `nosuid` mount option in `/etc/fstab` and where should it be applied?"
  },

  // --- Incident Response & Digital Forensics ---
  {
    id: "int-ir-01",
    category: "Incident Response",
    difficulty: "ADVANCED",
    question: "Explain the Order of Volatility in digital forensics and why it is critical during an active investigation.",
    modelAnswer: "The Order of Volatility, codified in RFC 3227, establishes that digital evidence must be acquired starting with the most perishable and volatile data before moving to more permanent storage. The sequence is: 1) CPU registers and cache; 2) Routing tables, ARP cache, process table, and kernel statistics; 3) System memory (RAM); 4) Temporary file systems; 5) Non-volatile disk storage; 6) Remote logging and network topology data; 7) Archival backups. Adhering to this order ensures critical volatile evidence—such as encryption keys in RAM, active malicious network sockets, or unwritten malware payloads—is not permanently lost.",
    keyPoints: [
      "RFC 3227 Order of Volatility adherence",
      "Volatile memory (RAM) is lost on reboot or power-down",
      "Never reboot or run unapproved scripts on suspect systems before acquisition",
      "Cryptographic hashing (SHA-256) of evidence images immediately upon capture"
    ],
    avoidSaying: "Never say you would examine the hard drive first before memory, as disk interactions modify timestamps and destroy RAM.",
    followUpQuestion: "What command-line or open-source tools do you use to capture a forensically sound memory dump on Windows and Linux?"
  }
];
