import { ModuleData } from '../types';
import { ENRICHMENTS_MAP } from './curriculumEnrichmentData';

const RAW_MODULES: ModuleData[] = [
  {
    id: 1,
    dayNumber: "DAY 01",
    title: "Cybersecurity Fundamentals",
    shortDesc: "Master the foundational pillars of cyber defense: CIA Triad, threat vs risk, and attacker mindset.",
    category: "Foundations",
    estimatedMinutes: 60,
    topics: [
      "CIA Triad (Confidentiality, Integrity, Availability)",
      "Threats vs Vulnerabilities vs Risks",
      "Attack Surface Mapping",
      "The Defensive Security Mindset",
      "Real-World Phishing Analysis"
    ],
    notes: {
      quickRevision: [
        "Confidentiality ensures only authorized entities read data (encryption, ACLs).",
        "Integrity ensures data is unhampered and authentic (hashes, digital signatures).",
        "Availability guarantees systems and services are accessible when required (redundancy, DDoS defense).",
        "Risk = Threat × Vulnerability × Impact. Mitigate, Transfer, Accept, or Avoid.",
        "Attack surface includes all reachable entry points into an organization's network, applications, and people."
      ],
      keyTerms: [
        { term: "CIA Triad", definition: "The three core principles guiding information security architectures." },
        { term: "Attack Surface", definition: "The sum total of all exploitable vulnerabilities and exposed entry points across an organization." },
        { term: "Vulnerability", definition: "A weakness in design, implementation, or operation that can be exploited by a threat." },
        { term: "Threat Actor", definition: "An entity with malicious intent and capability to target digital systems." }
      ],
      importantCommands: [
        { command: "sha256sum file.txt", usage: "Verify file integrity with cryptographic hashing", purpose: "Integrity Verification" },
        { command: "whoami", usage: "Display current security context and user identifier", purpose: "Context Discovery" }
      ],
      interviewPoints: [
        "When asked about the CIA Triad, give a real workplace trade-off example (e.g., intense encryption impacting availability/performance).",
        "Differentiate clearly between Threat (external danger), Vulnerability (internal weakness), and Risk (probability × business impact).",
        "Explain defense-in-depth: layering physical, perimeter, network, host, and data controls."
      ],
      commonMistakes: [
        "Confusing vulnerability with exploit: a vulnerability is the flaw, an exploit is the method to abuse it.",
        "Assuming 100% security is attainable instead of calculating defensible risk tolerance.",
        "Ignoring the human factor: phishing remains the #1 initial access vector in over 80% of breaches."
      ]
    },
    assignment: {
      title: "CIA Triad Breach Classification & Risk Scoring",
      type: "Scenario",
      objective: "Analyze a corporate data breach scenario and correctly classify which CIA principles were breached and calculate the Risk Score.",
      difficulty: "EASY",
      estimatedTime: "20 mins",
      maxScore: 100,
      instructions: [
        "Scenario: A finance firm experienced an incident where an external contractor modified salary ledger spreadsheets on an unencrypted shared drive without authorization, and ransomware encrypted the backup drives.",
        "1. Identify which CIA Triad components were compromised.",
        "2. State the primary vulnerability that enabled lateral access.",
        "3. Propose two defensive controls following the Principle of Least Privilege."
      ],
      expectedOutput: "A structured incident triage report identifying Integrity & Availability violation, lacking file permission ACLs, and recommending RBAC + immutable offline backups.",
      evaluationCriteria: [
        "Correct identification of Integrity (modified ledger) and Availability (ransomware backup lock)",
        "Accurate identification of missing Access Control Lists (ACLs)",
        "Practical remediation steps (RBAC, MFA, Air-gapped backups)"
      ],
      challengeSnippet: "INCIDENT_REPORT_#001: 2026-09-12 04:15 UTC - Unauthorized ledger modifications detected on SMB share. Backup drive locked with .locked extension."
    }
  },
  {
    id: 2,
    dayNumber: "DAY 02",
    title: "Cyber Threat Landscape",
    shortDesc: "Deconstruct malware taxonomy, ransomware mechanics, insider threats, and the Cyber Kill Chain.",
    category: "Threat Intelligence",
    estimatedMinutes: 75,
    topics: [
      "Malware Types (Viruses, Worms, Trojans, Rootkits, Spyware)",
      "Phishing & Spear Phishing Techniques",
      "Social Engineering Tactics (Pretexting, Baiting, Vishing)",
      "Ransomware Anatomy & Extortion Models",
      "Credential Theft & Token Hijacking",
      "Insider Threats & Malicious vs Negligent Actors",
      "The Cyber Kill Chain & MITRE ATT&CK Framework"
    ],
    notes: {
      quickRevision: [
        "Malware categories: Trojans mask as benign; Worms self-replicate without host files; Rootkits hide at kernel level.",
        "Lockheed Martin Cyber Kill Chain: Recon -> Weaponization -> Delivery -> Exploitation -> Installation -> C2 -> Actions on Objectives.",
        "Ransomware double/triple extortion: data encryption + data exfiltration + DDoS/victim harassment.",
        "Social engineering exploits cognitive biases: Authority, Urgency, Scarcity, Fear, and Consensus.",
        "MITRE ATT&CK provides a globally accessible knowledge base of adversary tactics and techniques based on real-world observations."
      ],
      keyTerms: [
        { term: "Trojan Horse", definition: "Malicious software disguised as a legitimate tool to trick users into execution." },
        { term: "C2 (Command & Control)", definition: "Infrastructure operated by attackers to remotely manage compromised assets." },
        { term: "Spear Phishing", definition: "Highly tailored phishing targeted at a specific individual or department." },
        { term: "MITRE ATT&CK", definition: "Matrix cataloging adversary tactics, techniques, and common procedures (TTPs)." }
      ],
      importantCommands: [
        { command: "certutil -hashfile sample.exe MD5", usage: "Generate MD5 file hash on Windows for threat intel lookup", purpose: "Malware Triage" },
        { command: "strings malicious.exe | grep -i 'http'", usage: "Extract ASCII strings to inspect embedded C2 domains", purpose: "Static Analysis" }
      ],
      interviewPoints: [
        "Explain the difference between APT (Advanced Persistent Threat) and opportunistic malware campaigns.",
        "Walk through the MITRE ATT&CK matrix: explain Tactic (adversary goal) vs Technique (how they achieve it).",
        "Describe how you would isolate a ransomware infected workstation in under 2 minutes."
      ],
      commonMistakes: [
        "Believing antivirus alone stops modern malware (living-off-the-land binaries / LOLBins bypass signature detection).",
        "Overlooking insider threats: 34% of data compromises involve internal staff, often through negligence.",
        "Focusing only on the malware payload rather than tracing the initial delivery vector."
      ]
    },
    assignment: {
      title: "Cyber Kill Chain Stage Mapping & Triage",
      type: "Investigation",
      objective: "Map observed security telemetry to the Lockheed Martin Cyber Kill Chain and identify attacker C2 channels.",
      difficulty: "MEDIUM",
      estimatedTime: "25 mins",
      maxScore: 100,
      instructions: [
        "Analyze the provided synthetic alert log:",
        "1. Map each line of the log to its corresponding Kill Chain stage.",
        "2. Identify the IP address acting as the external C2 server.",
        "3. Provide the immediate endpoint isolation recommendation."
      ],
      expectedOutput: "Accurate Kill Chain progression table matching Reconnaissance to Action on Objectives with C2 domain isolation recommendation.",
      evaluationCriteria: [
        "Accurate classification of phishing email as 'Delivery'",
        "Identification of macro execution as 'Exploitation/Installation'",
        "Identification of outbound beaconing on port 8443 to rogue IP as 'C2'"
      ],
      challengeSnippet: "LOG_STREAM: [10:02:11] Inbound email subject 'Urgent Invoice' [10:05:22] Word spawned powershell.exe [10:05:45] Outbound HTTPS beacon to 198.51.100.42:8443"
    }
  },
  {
    id: 3,
    dayNumber: "DAY 03",
    title: "Identity & Authentication Security",
    shortDesc: "Implement robust access controls: MFA factors, RBAC vs ABAC, OAuth 2.0, and Zero Trust.",
    category: "Identity & Access",
    estimatedMinutes: 65,
    topics: [
      "Password Entropy, Hashing (bcrypt, argon2) & Salt",
      "Multi-Factor Authentication (Something you know, have, are)",
      "Authentication (AuthN) vs Authorization (AuthZ)",
      "Access Control Models: DAC, MAC, RBAC, ABAC",
      "Principle of Least Privilege (PoLP)",
      "OAuth 2.0, OpenID Connect & Token Security",
      "Zero Trust Architecture (Never Trust, Always Verify)"
    ],
    notes: {
      quickRevision: [
        "Authentication confirms identity ('Who are you?'); Authorization determines permissions ('What can you do?').",
        "MFA requires 2+ independent factors: Knowledge (password), Possession (token/app), Inherence (biometrics). SMS OTP is vulnerable to SIM swap.",
        "Role-Based Access Control (RBAC) grants permissions based on job roles, preventing privilege creep.",
        "Zero Trust core philosophy: assume breach, verify explicitly, enforce least privilege across all requests.",
        "Never store plaintext passwords; use salted cryptographic key-derivation functions (Argon2id, PBKDF2, bcrypt)."
      ],
      keyTerms: [
        { term: "Salt", definition: "A random unique string prepended to a password before hashing to neutralize rainbow table attacks." },
        { term: "RBAC", definition: "Role-Based Access Control: restricting system access to authorized users based on role." },
        { term: "Least Privilege", definition: "The security principle granting users only the minimum access needed for their duties." },
        { term: "Zero Trust", definition: "A strategic cybersecurity model requiring continuous authentication and authorization." }
      ],
      importantCommands: [
        { command: "net user username /domain", usage: "Inspect domain user group memberships and privileges", purpose: "Privilege Audit" },
        { command: "sudo -l", usage: "List allowed and forbidden commands for the current user in Linux", purpose: "Permission Verification" }
      ],
      interviewPoints: [
        "Explain how password salting defeats pre-computed rainbow table attacks.",
        "Contrast SAML vs OAuth 2.0 vs OIDC: SAML/OIDC for authentication, OAuth for delegated authorization.",
        "Discuss why SMS MFA is considered weak compared to FIDO2 / WebAuthn hardware security keys."
      ],
      commonMistakes: [
        "Assuming MFA makes accounts 100% impenetrable (adversary-in-the-middle / AiTM phishing can steal session cookies).",
        "Granting permanent admin privileges instead of Just-In-Time (JIT) privileged access.",
        "Confusing 2FA with two steps of the same factor (e.g. password + security question is 2-step, not 2-factor)."
      ]
    },
    assignment: {
      title: "RBAC Matrix Design & Least Privilege Audit",
      type: "Configuration",
      objective: "Design a secure Role-Based Access Control matrix for a 4-tier banking portal and audit over-privileged roles.",
      difficulty: "MEDIUM",
      estimatedTime: "25 mins",
      maxScore: 100,
      instructions: [
        "Given 4 roles: Junior Teller, Branch Manager, Database Admin, Security Auditor.",
        "Assign CRUD permissions across: Customer Accounts, Wire Transfers, System Logs, DB Backups.",
        "Identify and fix a violation where the Branch Manager had root access to database backups."
      ],
      expectedOutput: "A hardened RBAC table with strictly segregated duties and no single user capable of both initiating and approving high-value wires.",
      evaluationCriteria: [
        "Strict separation of duties between Teller and Branch Manager",
        "Security Auditor given Read-Only access to logs without modification rights",
        "Removal of DB backup write access from Branch Manager"
      ],
      challengeSnippet: "PERM_TABLE: Manager: [Approve_Wire, View_Accounts, Delete_DB_Backup, Mod_Logs] <-- Flag critical privilege creep!"
    }
  },
  {
    id: 4,
    dayNumber: "DAY 04",
    title: "Networking Fundamentals",
    shortDesc: "Understand the backbone of internet communications: TCP/IP, OSI layers, DNS, DHCP, and packet flows.",
    category: "Networking",
    estimatedMinutes: 70,
    topics: [
      "OSI 7-Layer Model vs TCP/IP 4-Layer Model",
      "IPv4 vs IPv6 Addressing, Subnetting & CIDR",
      "MAC Addresses & ARP Resolution",
      "TCP 3-Way Handshake (SYN, SYN-ACK, ACK) & Teardown",
      "UDP vs TCP: Reliability vs Speed",
      "Well-known Ports (22, 53, 80, 443, 3389, 8080)",
      "DNS Resolution Architecture & DHCP Operations",
      "HTTP vs HTTPS (TLS Handshake overview)"
    ],
    notes: {
      quickRevision: [
        "OSI Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application (Please Do Not Throw Sausage Pizza Away).",
        "TCP guarantees ordered, error-checked packet delivery; UDP provides connectionless, low-latency streaming.",
        "TCP 3-Way Handshake: Client sends SYN -> Server responds SYN-ACK -> Client replies ACK.",
        "DNS translates human domain names into IP addresses (Port 53 UDP/TCP).",
        "ARP maps IP addresses (Layer 3) to physical MAC addresses (Layer 2) on a local network segment."
      ],
      keyTerms: [
        { term: "Subnet Mask", definition: "A 32-bit number dividing an IP address into network and host addresses." },
        { term: "ARP", definition: "Address Resolution Protocol: resolves Layer 3 IP addresses to Layer 2 MAC addresses." },
        { term: "DNS", definition: "Domain Name System: the distributed directory service translating hostnames to IP addresses." },
        { term: "TLS", definition: "Transport Layer Security: cryptographic protocol providing secure communications over networks." }
      ],
      importantCommands: [
        { command: "ping -c 4 8.8.8.8", usage: "Send ICMP echo request packets to verify network reachability", purpose: "Connectivity Test" },
        { command: "nslookup -type=MX google.com", usage: "Query DNS server for mail exchanger records of a domain", purpose: "DNS Inspection" },
        { command: "arp -a", usage: "Display current IP-to-physical address translation table", purpose: "ARP Table Audit" }
      ],
      interviewPoints: [
        "Step through the exact sequence of events when a user types https://example.com into their browser.",
        "Explain why a SYN Flood attack exhausts server memory tables and how SYN Cookies mitigate it.",
        "Contrast TCP flags: SYN (Synchronize), ACK (Acknowledge), FIN (Finish), RST (Reset), PSH (Push), URG (Urgent)."
      ],
      commonMistakes: [
        "Confusing MAC address (local L2 hardware) with public IP address (routable L3).",
        "Believing UDP is completely unreliable; applications can implement custom sequence verification at L7.",
        "Thinking HTTPS encrypts the domain name in legacy SNI (Server Name Indication) without ECH (Encrypted Client Hello)."
      ]
    },
    assignment: {
      title: "TCP Handshake & Port Triage Challenge",
      type: "Command-line",
      objective: "Diagnose connection failures and identify unauthorized listening network ports from a packet trace summary.",
      difficulty: "EASY",
      estimatedTime: "20 mins",
      maxScore: 100,
      instructions: [
        "Review the connection handshake capture:",
        "1. Identify why the connection to 10.0.0.50:443 was rejected.",
        "2. Identify the unauthorized service listening on port 3389 (RDP) on an external IP.",
        "3. Write the exact netstat command to inspect listening ports on a host."
      ],
      expectedOutput: "Analysis indicating RST-ACK packet response indicating closed port, and flagging open RDP port 3389 exposing Windows desktop.",
      evaluationCriteria: [
        "Correct identification of RST-ACK flag as connection refused",
        "Identification of RDP (3389) as an exposed risk",
        "Accurate netstat syntax provided (`netstat -ano` or `netstat -tuln`)"
      ],
      challengeSnippet: "TRACE: [192.168.1.10:54120 -> 10.0.0.50:443 SYN] -> [10.0.0.50:443 -> 192.168.1.10:54120 RST, ACK]"
    }
  },
  {
    id: 5,
    dayNumber: "DAY 05",
    title: "Network Security",
    shortDesc: "Architect hardened perimeters: Statefull Firewalls, ACLs, NAT, Network Segmentation, IDS, and IPS.",
    category: "Network Defense",
    estimatedMinutes: 80,
    topics: [
      "Stateful vs Stateless Firewalls & Next-Gen Firewalls (NGFW)",
      "Access Control Lists (Standard vs Extended ACLs)",
      "Network Address Translation (NAT) & PAT",
      "VLANs & Zero-Trust Network Segmentation",
      "Intrusion Detection Systems (IDS) vs Intrusion Prevention Systems (IPS)",
      "Signature vs Anomaly-based Detection",
      "Demilitarized Zone (DMZ) Architecture & Bastion Hosts"
    ],
    notes: {
      quickRevision: [
        "Stateless firewalls inspect individual packets in isolation; Stateful firewalls track active connection states in a state table.",
        "Next-Generation Firewalls (NGFW) operate up to Layer 7, inspecting application-level traffic (e.g. blocking BitTorrent over port 80).",
        "IDS passively monitors traffic (SPAN/TAP port) and sends alerts; IPS sits inline and actively drops malicious packets.",
        "Network segmentation stops lateral movement: separate IoT, Guest, Employee, and Production Database VLANs.",
        "DMZ isolates publicly accessible services (web, mail) from the trusted internal corporate network."
      ],
      keyTerms: [
        { term: "DMZ", definition: "A physical or logical subnetwork that exposes an organization's external-facing services to an untrusted network." },
        { term: "IPS", definition: "Intrusion Prevention System: an inline device monitoring network traffic and taking action to prevent attacks." },
        { term: "Stateful Inspection", definition: "Firewall technology monitoring active connection state and context of network packets." },
        { term: "Lateral Movement", definition: "Techniques used by adversaries to extend their reach from an initial foothold through a network." }
      ],
      importantCommands: [
        { command: "iptables -L -n -v", usage: "Display current Linux firewall filter table rules with packet count statistics", purpose: "Firewall Audit" },
        { command: "iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT", usage: "Allow SSH access only from trusted subnet", purpose: "Access Control" }
      ],
      interviewPoints: [
        "Explain how an attacker moves laterally through a flat, unsegmented network and how microsegmentation stops them.",
        "Compare Signature-based IDS (fast, reliable for known attacks, blind to 0-days) with Anomaly-based IDS (detects novel attacks, high false-positive rate).",
        "Explain the Default-Deny rule principle: implicit deny at the end of every firewall rule list."
      ],
      commonMistakes: [
        "Placing databases in the same subnet as public-facing web servers.",
        "Assuming NAT is a security boundary (NAT is for address conservation, not access control).",
        "Creating firewall rules with 'ANY to ANY ALLOW' for troubleshooting and forgetting to remove them."
      ]
    },
    assignment: {
      title: "DMZ Firewall Rule Design Challenge",
      type: "Firewall",
      objective: "Construct a secure rule list allowing Internet traffic to a Web Server while isolating the backend Database.",
      difficulty: "MEDIUM",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Requirements:",
        "1. Allow Public Internet to DMZ Web Server (192.168.10.5) on Ports 80 & 443.",
        "2. Allow DMZ Web Server to communicate with Internal DB (192.168.20.10) on Port 5432 (PostgreSQL) only.",
        "3. Deny direct Internet access to Internal DB.",
        "4. Enforce Default Deny All remaining traffic."
      ],
      expectedOutput: "A prioritized 4-rule firewall table adhering to strict stateful traffic isolation principles.",
      evaluationCriteria: [
        "Rule 1 correctly opens 80/443 to DMZ only",
        "Rule 2 permits only 192.168.10.5 -> 192.168.20.10:5432",
        "Rule 3 explicitly drops Internet -> Database",
        "Rule 4 implements Implicit Deny All"
      ],
      challengeSnippet: "SRC: ANY | DST: 192.168.20.10 | PORT: 5432 | ACTION: ALLOW <-- CRITICAL FLAW! Direct internet DB exposure."
    }
  },
  {
    id: 6,
    dayNumber: "DAY 06",
    title: "Command Line Security Lab",
    shortDesc: "Master foundational CLI diagnostics: ipconfig, ping, tracert, nslookup, netstat, arp, and whoami.",
    category: "Hands-on Lab",
    estimatedMinutes: 90,
    topics: [
      "In-browser Simulated Command Prompt Environment",
      "Network Interface Configuration (ipconfig / ifconfig)",
      "ICMP Diagnostics & Troubleshooting (ping)",
      "Route Tracing & Hop Latency (tracert / traceroute)",
      "DNS Resolution & Record Interrogation (nslookup)",
      "Active Network Sockets & Port Auditing (netstat)",
      "Hardware Address Mapping (arp -a)",
      "User Security Context & Host Discovery (whoami, hostname, systeminfo)"
    ],
    notes: {
      quickRevision: [
        "ipconfig /all displays MAC address, DHCP lease, and configured DNS servers on Windows.",
        "ping tests end-to-end ICMP connectivity and packet round-trip time (RTT).",
        "tracert identifies intermediate router hops by incrementing IP TTL (Time To Live).",
        "netstat -ano reveals active TCP/UDP connections, listening ports, and associated Process IDs (PID).",
        "whoami /priv shows assigned security privileges (e.g. SeDebugPrivilege indicates elevation potential)."
      ],
      keyTerms: [
        { term: "TTL (Time to Live)", definition: "An 8-bit field in the IP header that prevents packets from circulating indefinitely." },
        { term: "PID (Process ID)", definition: "A unique numeric identifier for an active operating system process." },
        { term: "ICMP", definition: "Internet Control Message Protocol: used for network device diagnostics and error reporting." }
      ],
      importantCommands: [
        { command: "netstat -ano | findstr LISTENING", usage: "List all local ports waiting for incoming connections with process ID", purpose: "Port Inspection" },
        { command: "tracert -d 8.8.8.8", usage: "Trace route to target without resolving hostnames for faster execution", purpose: "Path Analysis" },
        { command: "whoami /groups", usage: "Display domain and local groups the current session belongs to", purpose: "Privilege Discovery" }
      ],
      interviewPoints: [
        "How do you investigate which application is secretly listening on port 4444 on a Windows host using CLI?",
        "Explain what TTL decrementing tells you during a traceroute execution.",
        "What does an ARP cache with identical MAC addresses for multiple distinct IP addresses signify? (ARP Poisoning / Spoofing)."
      ],
      commonMistakes: [
        "Confusing private IP addresses (192.168.x.x, 10.x.x.x) with publicly routable IP addresses.",
        "Not correlating suspicious netstat connections with Task Manager / Tasklist Process IDs.",
        "Running destructive commands without understanding security sandboxing."
      ]
    },
    assignment: {
      title: "Interactive Command Prompt Investigation",
      type: "Command-line challenge",
      objective: "Execute simulated commands in the interactive terminal to uncover a backdoor beaconing on port 4444.",
      difficulty: "MEDIUM",
      estimatedTime: "25 mins",
      maxScore: 100,
      instructions: [
        "1. Open the Command Prompt Simulator from the Virtual Cyber Lab.",
        "2. Run `netstat -ano` to identify an established outbound connection to an unknown external IP.",
        "3. Note down the Process ID (PID) tied to that connection.",
        "4. Run `whoami` and `hostname` to document the affected host context.",
        "5. Submit the findings in the assignment form."
      ],
      expectedOutput: "Identification of established connection to 203.0.113.88:4444 with PID 4820 under host SEC-STATION-01.",
      evaluationCriteria: [
        "Correct extraction of suspicious port and external IP",
        "Proper identification of the process ID",
        "Accurate host and user context reported"
      ],
      challengeSnippet: "TCP 192.168.1.105:49182  203.0.113.88:4444  ESTABLISHED  4820"
    }
  },
  {
    id: 7,
    dayNumber: "DAY 07",
    title: "Linux Security Fundamentals",
    shortDesc: "Master core Linux security: POSIX permissions, user/group management, processes, and authentication log audits.",
    category: "Operating Systems",
    estimatedMinutes: 85,
    topics: [
      "In-browser Simulated Linux Terminal Environment",
      "Linux Filesystem Hierarchy (/etc, /var/log, /home, /bin)",
      "POSIX File Permissions (rwx, octal notation 755, 600)",
      "SUID / SGID / Sticky Bit Security Implications",
      "User & Group Management (/etc/passwd, /etc/shadow)",
      "Process Inspection & Management (ps, top, kill)",
      "Linux Networking & Socket Diagnostics (ss, ip, netstat)",
      "Authentication Log Analysis (/var/log/auth.log, syslog)"
    ],
    notes: {
      quickRevision: [
        "Permission bits: Read (4), Write (2), Execute (1). 755 = rwxr-xr-x (Owner: all, Group: rx, Others: rx).",
        "SUID bit (chmod 4755) executes the binary with the file owner's privileges (e.g. root), a common privilege escalation vector.",
        "/etc/passwd contains user account info; /etc/shadow stores cryptographic password hashes accessible only by root.",
        "Brute force SSH attempts are logged in /var/log/auth.log (Debian/Ubuntu) or /var/log/secure (RHEL/CentOS).",
        "ps aux shows all running processes across all users with CPU/memory consumption."
      ],
      keyTerms: [
        { term: "SUID", definition: "Set User ID: special permission allowing users to run an executable with owner privileges." },
        { term: "auth.log", definition: "Linux security log recording authentication events, sudo invocations, and SSH sessions." },
        { term: "Octal Notation", definition: "A numeric representation (0-7) of read, write, and execute file permissions." },
        { term: "Cron", definition: "Time-based job scheduler in Unix-like operating systems." }
      ],
      importantCommands: [
        { command: "grep 'Failed password' /var/log/auth.log | wc -l", usage: "Count total failed SSH authentication attempts", purpose: "Brute Force Detection" },
        { command: "find / -perm -u=s -type f 2>/dev/null", usage: "Locate all binaries with SUID bit enabled across the filesystem", purpose: "Privilege Escalation Audit" },
        { command: "chmod 600 ~/.ssh/id_rsa", usage: "Secure private SSH key so only the owner can read or write it", purpose: "Credential Protection" }
      ],
      interviewPoints: [
        "Explain what a SUID misconfiguration is and how an attacker uses it to become root.",
        "How do you investigate a Linux server experiencing 100% CPU usage caused by an unauthorized cryptominer?",
        "Describe the contents of a line in /etc/shadow ($6$ indicates SHA-512 hash, followed by salt, hash, and expiration dates)."
      ],
      commonMistakes: [
        "Setting `chmod 777` on sensitive folders to solve permission errors instead of setting proper group ownership.",
        "Leaving private keys (`id_rsa`) with world-readable permissions (SSH will refuse to connect).",
        "Editing `/etc/passwd` or `/etc/shadow` directly without using `visudo` or `usermod`."
      ]
    },
    assignment: {
      title: "Linux Brute Force Log Investigation",
      type: "Investigation",
      objective: "Analyze a simulated /var/log/auth.log file to uncover an ongoing SSH brute-force attack and identify the compromised account.",
      difficulty: "MEDIUM",
      estimatedTime: "25 mins",
      maxScore: 100,
      instructions: [
        "1. In the Linux Terminal simulator, inspect `/var/log/auth.log`.",
        "2. Identify the attacking external IP address.",
        "3. Count how many failed attempts occurred before a successful login.",
        "4. Determine the exact username that was compromised."
      ],
      expectedOutput: "Report documenting attacking IP 198.51.100.23, 14 failed attempts, and compromised user account 'deployer'.",
      evaluationCriteria: [
        "Accurate identification of attacker IP",
        "Correct count of failed authentication attempts",
        "Identification of compromised user session and recommended account lockout"
      ],
      challengeSnippet: "auth.log: 'Failed password for invalid user root from 198.51.100.23 port 41200 ssh2' ... 'Accepted password for deployer from 198.51.100.23'"
    }
  },
  {
    id: 8,
    dayNumber: "DAY 08",
    title: "Web Security Fundamentals",
    shortDesc: "Understand common web vulnerabilities: OWASP Top 10, Cross-Site Scripting (XSS), SQL Injection, and CSRF.",
    category: "Application Security",
    estimatedMinutes: 80,
    topics: [
      "HTTP Request/Response Anatomy, Headers & Status Codes",
      "Stateless HTTP, Cookies, Session IDs & JWTs",
      "Same-Origin Policy (SOP) & Cross-Origin Resource Sharing (CORS)",
      "OWASP Top 10 Vulnerabilities Overview",
      "SQL Injection (SQLi) Mechanics & Parameterized Queries",
      "Cross-Site Scripting (XSS): Stored, Reflected, DOM-based",
      "Cross-Site Request Forgery (CSRF) & SameSite Cookie flags",
      "Content Security Policy (CSP) & HTTP Security Headers"
    ],
    notes: {
      quickRevision: [
        "SQL Injection occurs when untrusted user input is directly concatenated into a dynamic SQL query string.",
        "XSS allows attackers to execute malicious JavaScript in the victim's browser, stealing session cookies or redirecting users.",
        "CSRF tricks an authenticated user into executing unwanted actions on a trusted web application.",
        "Mitigate SQLi with Prepared Statements (Parameterized Queries) and ORMs.",
        "Mitigate XSS with Context-Aware Output Encoding, strict Content Security Policy (CSP), and HttpOnly cookie flags."
      ],
      keyTerms: [
        { term: "SQLi", definition: "SQL Injection: a code injection technique that exploits vulnerabilities in an application's database layer." },
        { term: "XSS", definition: "Cross-Site Scripting: security vulnerability enabling attackers to inject client-side scripts into web pages." },
        { term: "HttpOnly", definition: "A cookie attribute preventing client-side scripts (JavaScript) from accessing the cookie." },
        { term: "CSP", definition: "Content Security Policy: an HTTP header allowing site operators to restrict resources browsers can load." }
      ],
      importantCommands: [
        { command: "curl -I https://example.com", usage: "Fetch HTTP response headers to inspect security headers (CSP, HSTS, X-Frame-Options)", purpose: "Header Audit" },
        { command: "SELECT * FROM users WHERE user = 'admin' OR '1'='1';", usage: "Classic SQL injection payload demonstrating authentication bypass", purpose: "Vulnerability Demo" }
      ],
      interviewPoints: [
        "Explain how parameterized queries prevent SQL Injection at the database engine level.",
        "Differentiate between Stored XSS (persisted in DB), Reflected XSS (in URL/input), and DOM XSS (client JS manipulation).",
        "Explain how the `SameSite=Strict` cookie attribute protects against Cross-Site Request Forgery."
      ],
      commonMistakes: [
        "Relying on client-side JavaScript input validation (attackers bypass it via curl/Postman).",
        "Using blacklists to filter dangerous characters instead of using parameterized queries and whitelisting.",
        "Storing sensitive session tokens in `localStorage` where they are vulnerable to any XSS exploit."
      ]
    },
    assignment: {
      title: "SQLi & XSS Vulnerability Code Review",
      type: "Scenario analysis",
      objective: "Identify security vulnerabilities in a vulnerable backend authentication snippet and rewrite it securely.",
      difficulty: "HARD",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Review the vulnerable code snippet:",
        "1. Identify the SQL injection vulnerability and provide a payload that bypasses login.",
        "2. Identify the reflected XSS vulnerability in the error response.",
        "3. Rewrite the query using parameterized statements and apply HTML encoding to the error output."
      ],
      expectedOutput: "Secure parameterized query implementation and explanation of why concatenation is hazardous.",
      evaluationCriteria: [
        "Accurate identification of concatenated SQL string",
        "Demonstration of `' OR '1'='1` bypass",
        "Correct parameterized query rewrite (`SELECT * FROM users WHERE email = ?`)"
      ],
      challengeSnippet: "const query = \"SELECT * FROM users WHERE username = '\" + req.body.user + \"' AND password = '\" + req.body.pass + \"'\";"
    }
  },
  {
    id: 9,
    dayNumber: "DAY 09",
    title: "Wireshark Traffic Analysis LAB",
    shortDesc: "Hands-on packet inspection: analyze synthetic pcap streams, filter protocols, and identify suspicious traffic.",
    category: "Hands-on Lab",
    estimatedMinutes: 90,
    topics: [
      "Browser-based Packet-Analysis Simulator",
      "Synthetic PCAP Stream Inspection",
      "Three-Pane Interface (Packet List, Packet Tree, Hex Dump)",
      "Wireshark Display Filters (ip.addr, tcp.port, http, dns)",
      "Protocol Dissection (Ethernet, IP, TCP, UDP, DNS, HTTP)",
      "Following TCP Streams to Reconstruct Sessions",
      "Identifying Cleartext Credentials over Unencrypted Protocols",
      "Spotting Port Scans, DNS Exfiltration & Malicious Payloads"
    ],
    notes: {
      quickRevision: [
        "Wireshark captures and dissects network traffic at the packet level.",
        "Display filters refine visible packets without altering the raw capture: `http.request.method == \"POST\"`, `tcp.flags.syn == 1`.",
        "Following a TCP Stream reconstructs the bidirectional application-layer conversation exactly as seen by endpoints.",
        "Cleartext protocols (HTTP, Telnet, FTP) expose credentials, cookies, and data to anyone on the network path.",
        "A sudden burst of TCP SYN packets with no ACKs across sequential ports indicates an active SYN port scan."
      ],
      keyTerms: [
        { term: "PCAP", definition: "Packet Capture: an API and file format used to capture and store network packets." },
        { term: "Display Filter", definition: "An expression used in Wireshark to filter which packets are displayed in the UI." },
        { term: "TCP Stream", definition: "A complete bidirectional byte sequence exchanged between two network endpoints over TCP." },
        { term: "Promiscuous Mode", definition: "A network card configuration allowing a controller to pass all traffic received to the CPU." }
      ],
      importantCommands: [
        { command: "tcp.port == 80 && http.request", usage: "Filter for outbound HTTP web requests", purpose: "Display Filter" },
        { command: "dns.flags.response == 0", usage: "Filter for DNS queries being transmitted by endpoints", purpose: "DNS Analysis" },
        { command: "ip.src == 192.168.1.100 && tcp.flags.syn == 1 && tcp.flags.ack == 0", usage: "Detect potential port scan origin", purpose: "Scan Detection" }
      ],
      interviewPoints: [
        "How do you quickly detect unencrypted credentials in a Wireshark capture? (Filter for `http.request.method == \"POST\"` and follow TCP stream).",
        "Explain what a high volume of DNS TXT query responses to strange subdomains might indicate (DNS tunneling / exfiltration).",
        "Describe the difference between Capture Filters (BPF syntax applied before capture) and Display Filters (Wireshark syntax applied after)."
      ],
      commonMistakes: [
        "Confusing capture filters (`host 10.0.0.1`) with display filters (`ip.addr == 10.0.0.1`).",
        "Expecting Wireshark to decrypt modern TLS traffic without having the private server key or SSLKEYLOGFILE.",
        "Focusing only on packet count instead of examining anomalous payload bytes."
      ]
    },
    assignment: {
      title: "Synthetic Packet Capture Forensics",
      type: "Packet analysis",
      objective: "Use the Wireshark Simulator in the Virtual Cyber Lab to find leaked credentials and identify the attacker's exfiltration IP.",
      difficulty: "MEDIUM",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "1. Launch the Wireshark Traffic Analysis simulator.",
        "2. Apply the display filter `http` to isolate unencrypted web requests.",
        "3. Locate the POST request to `/login.php`.",
        "4. Follow the TCP stream to extract the plaintext username and password.",
        "5. Submit the extracted credentials and attacker destination IP."
      ],
      expectedOutput: "Extracted credentials user: 'admin@corp.internal', pass: 'Winter2026!Secured' sent to 198.51.100.50.",
      evaluationCriteria: [
        "Correct display filter usage",
        "Accurate credential extraction from HTTP payload",
        "Identification of target URL and server IP"
      ],
      challengeSnippet: "PACKET #42: POST /api/v1/auth HTTP/1.1 -> Host: auth.internal.net | Payload: { \"username\": \"admin\", \"password\": \"...\" }"
    }
  },
  {
    id: 10,
    dayNumber: "DAY 10",
    title: "Firewall Configuration Simulator",
    shortDesc: "Build and test stateful firewall rules: ALLOW, DENY, and LOG actions across priority layers.",
    category: "Hands-on Lab",
    estimatedMinutes: 85,
    topics: [
      "Interactive Firewall Simulator Workspace",
      "Rule Parameters (Source, Destination, Protocol, Port, Action)",
      "Action Types: ALLOW, DENY (Silent Drop vs Reject), LOG",
      "Rule Priority & Top-Down Evaluation Mechanics",
      "Traffic Generation Engine & Live Packet Evaluation",
      "Allowing Legitimate Corporate Services (DNS, Web, SSH)",
      "Blocking Malicious Subnets & Unauthorized Ports",
      "Rule Troubleshooting & Shadowing Conflict Resolution"
    ],
    notes: {
      quickRevision: [
        "Firewall rule sets are evaluated strictly top-to-bottom; the first rule that matches a packet determines its fate.",
        "Rule Shadowing occurs when an earlier broad rule prevents a subsequent specific rule from ever executing.",
        "DENY silently drops packets; REJECT sends an ICMP port unreachable / TCP RST message back to the sender.",
        "LOG rules record connection metadata for SIEM ingestion and security compliance auditing.",
        "Always place specific high-priority rules at the top and the broad Default Deny rule at the very bottom."
      ],
      keyTerms: [
        { term: "Rule Priority", definition: "The sequential order in which firewall rules are evaluated against incoming packets." },
        { term: "Rule Shadowing", definition: "A configuration error where a rule will never trigger because a preceding rule matches the traffic first." },
        { term: "State Table", definition: "Memory table maintained by stateful firewalls tracking established communication sessions." },
        { term: "Egress Filtering", definition: "Inspecting and restricting outbound traffic leaving an internal network to the Internet." }
      ],
      importantCommands: [
        { command: "ufw status numbered", usage: "Display current Ubuntu firewall rules with numbered evaluation priority", purpose: "Rule Review" },
        { command: "ufw insert 1 deny from 203.0.113.50", usage: "Prepend an urgent block rule to the highest priority slot", purpose: "Incident Containment" }
      ],
      interviewPoints: [
        "What is Rule Shadowing and how do you detect and fix it in an enterprise firewall?",
        "Why is egress filtering just as critical as ingress filtering? (Blocks malware C2 beaconing and unauthorized data exfiltration).",
        "Explain the difference between a Packet Filter, Stateful Inspection, and Application Layer Gateway (ALG)."
      ],
      commonMistakes: [
        "Placing a broad `ALLOW ALL` above specific block rules, rendering the block rules ineffective.",
        "Forgetting to allow outbound DNS (Port 53) and NTP (Port 123), causing server clock drift and resolution failures.",
        "Never pruning obsolete firewall rules, leading to security rule bloat and increased risk."
      ]
    },
    assignment: {
      title: "Interactive Perimeter Defense Hardening",
      type: "Firewall challenge",
      objective: "Configure a 5-rule set in the Firewall Simulator to block an active DDoS IP while keeping the web service operational.",
      difficulty: "HARD",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "1. Open the Firewall Configuration Simulator in the Virtual Cyber Lab.",
        "2. Add Rule 1: Priority 10 - Block Malicious IP `198.51.100.99` to ANY port.",
        "3. Add Rule 2: Priority 20 - Allow TCP Port 443 to Web Server `10.0.0.10`.",
        "4. Add Rule 3: Priority 30 - Allow TCP Port 22 (SSH) only from Management Subnet `192.168.1.0/24`.",
        "5. Test the rules using the simulated packet injection engine and submit verification."
      ],
      expectedOutput: "Zero unauthorized packets penetrating to the internal network while legitimate HTTPS and admin SSH pass seamlessly.",
      evaluationCriteria: [
        "Correct priority ordering avoiding shadowed rules",
        "Accurate protocol and port bindings",
        "Successful validation against the traffic generator test suite"
      ],
      challengeSnippet: "TEST PACKET: SRC: 198.51.100.99 -> DST: 10.0.0.10:443 [EXPECTED: DENIED | ACTUAL: ?]"
    }
  },
  {
    id: 11,
    dayNumber: "DAY 11",
    title: "SOC / Security Monitoring",
    shortDesc: "Step into the shoes of a Tier-1 SOC Analyst: triage synthetic SIEM telemetry and assign severity ratings.",
    category: "Hands-on Lab",
    estimatedMinutes: 90,
    topics: [
      "Security Operations Center (SOC) Architecture & Roles (Tier 1, 2, 3)",
      "SIEM (Security Information & Event Management) Platforms",
      "Synthetic Event Feed Triage (Failed Logins, Port Scans, Malware, C2)",
      "Alert Severity Classification: LOW, MEDIUM, HIGH, CRITICAL",
      "Correlating Disparate Events into a Cohesive Security Incident",
      "Investigating Suspicious External IPs & Domain Reputation",
      "Standard Operating Procedures (SOPs) & Playbook Execution",
      "Escalation Criteria & Incident Ticketing"
    ],
    notes: {
      quickRevision: [
        "Tier 1 Analysts monitor SIEM queues, triage alerts, and filter out false positives.",
        "Severity criteria: LOW (informational/policy violation), MEDIUM (suspicious activity without breach), HIGH (active exploitation attempt), CRITICAL (verified breach / active ransomware).",
        "Alert triage requires checking Who, What, When, Where, and Why before closing an alert.",
        "Never rely on a single alert: correlate firewall, endpoint EDR, and authentication logs.",
        "Prompt containment is critical: isolating an infected endpoint stops lateral spread within the golden hour."
      ],
      keyTerms: [
        { term: "SIEM", definition: "Security Information and Event Management: centralized log aggregation and security event correlation system." },
        { term: "False Positive", definition: "An alert that erroneously indicates malicious activity when the event was legitimate." },
        { term: "EDR", definition: "Endpoint Detection and Response: software monitoring endpoint behavior for suspicious activity." },
        { term: "Playbook", definition: "A predefined set of procedural steps used by SOC teams to respond to specific cyber incident types." }
      ],
      importantCommands: [
        { command: "curl -s https://api.threatintel.org/ip/203.0.113.19", usage: "Query threat intelligence database for IP reputation and geolocation", purpose: "Threat Intel Lookup" },
        { command: "log-query 'event.action == \"logon_failure\" | count by source.ip'", usage: "Aggregate failed login attempts by source IP in SIEM", purpose: "Brute Force Analysis" }
      ],
      interviewPoints: [
        "Walk me through your process when you receive a high-severity alert for 'Mimikatz Execution Detected on Workstation-4'.",
        "How do you differentiate between a false positive and a true positive?",
        "What are the key metrics used to measure SOC performance? (MTTD - Mean Time to Detect, MTTR - Mean Time to Respond)."
      ],
      commonMistakes: [
        "Closing an alert immediately just because the user claims 'it was me' without validating technical indicators.",
        "Alert fatigue: ignoring repeated low-severity alerts that are part of an adversary's slow-and-low recon.",
        "Failing to document triage rationale and IOCs in the ticketing system."
      ]
    },
    assignment: {
      title: "SOC SIEM Alert Triage & Response",
      type: "Investigation",
      objective: "Triage 5 realistic security alerts in the SOC Monitoring Simulator, assign correct severity levels, and recommend action.",
      difficulty: "MEDIUM",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "1. Open the SOC Monitoring Simulator in the Virtual Cyber Lab.",
        "2. Review the active alerts: Port Scan, Mimikatz EDR Alert, Multiple Failed Logins, Phishing Email Click, Outbound Beaconing.",
        "3. Assign each alert its appropriate severity: LOW, MEDIUM, HIGH, or CRITICAL.",
        "4. Choose the defensible containment action from the SOP playbook.",
        "5. Submit your triage findings."
      ],
      expectedOutput: "A completed triage report properly categorizing Mimikatz as CRITICAL (immediate host isolation) and failed logins as MEDIUM (investigate account lock).",
      evaluationCriteria: [
        "Correct severity grading for all 5 alerts",
        "Appropriate playbook action selection",
        "Clear technical justification for escalation"
      ],
      challengeSnippet: "ALERT #1094: [CRITICAL] LSASS Memory Dump attempted by powershell.exe on HR-LAPTOP-04 (User: rachel.green)"
    }
  },
  {
    id: 12,
    dayNumber: "DAY 12",
    title: "Incident Response Simulator",
    shortDesc: "Execute the 7-step incident response lifecycle: from identification and containment to eradication and post-mortem.",
    category: "Hands-on Lab",
    estimatedMinutes: 90,
    topics: [
      "Incident Response Frameworks: NIST SP 800-61 vs SANS 6-Step",
      "Interactive Multi-Step Incident Scenarios",
      "Step 1: Identification (Confirming True Positive & Scope)",
      "Step 2: Containment (Short-term network isolation vs Long-term)",
      "Step 3: Investigation (Root cause analysis & IOC harvesting)",
      "Step 4: Eradication (Removing malware artifacts & closing persistence)",
      "Step 5: Recovery (Restoring from clean verified backups & testing)",
      "Step 6: Documentation (Chain of custody & Incident report)",
      "Step 7: Prevent Recurrence (Lessons learned & control hardening)"
    ],
    notes: {
      quickRevision: [
        "NIST IR Lifecycle: Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity.",
        "Containment must occur before eradication: if you delete malware before containing, attackers may pivot or trigger dead-man switches.",
        "Evidence preservation is paramount: snapshot volatile RAM before powering down a machine.",
        "Eradication involves identifying and eliminating all attacker footholds: web shells, scheduled tasks, rogue user accounts.",
        "Lessons Learned post-mortem meetings must result in actionable policy or technical improvements, not finger-pointing."
      ],
      keyTerms: [
        { term: "IOC", definition: "Indicator of Compromise: forensic evidence of potential intrusion (IPs, hashes, domain names)." },
        { term: "Volatile Data", definition: "Data stored in RAM that is lost when power is disconnected." },
        { term: "Post-Mortem", definition: "A meeting held after an incident to evaluate performance and implement improvements." },
        { term: "Chain of Custody", definition: "The documented process demonstrating how digital evidence was gathered, handled, and preserved." }
      ],
      importantCommands: [
        { command: "netsh interface set interface 'Ethernet' admin=disable", usage: "Instantly disable network adapter to contain host", purpose: "Endpoint Containment" },
        { command: "schtasks /query /fo LIST /v", usage: "Audit all scheduled tasks for suspicious attacker persistence mechanisms", purpose: "Persistence Audit" }
      ],
      interviewPoints: [
        "You suspect a server is actively beaconing data to an APT C2 server. Do you pull the power plug immediately? Why or why not? (No, capture volatile RAM first).",
        "Explain the difference between Short-Term and Long-Term containment.",
        "What constitutes a 'Declaration of an Incident' vs a routine security ticket?"
      ],
      commonMistakes: [
        "Powering off the infected system immediately, destroying volatile memory containing decryption keys or C2 socket details.",
        "Re-imaging a machine before preserving forensic disk images.",
        "Restoring backups without verifying if the backups themselves were infected prior to the incident window."
      ]
    },
    assignment: {
      title: "Interactive Incident Response Decision Tree",
      type: "Incident",
      objective: "Navigate a simulated enterprise breach scenario: 'Multiple employee accounts showing anomalous failed and successful logins across geographic regions'.",
      difficulty: "HARD",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "1. Launch the Incident Response Simulator.",
        "2. Step 1 (Identify): Confirm password spraying attack against VPN gateway.",
        "3. Step 2 (Contain): Revoke active user sessions and enforce immediate MFA reset.",
        "4. Step 3 (Investigate): Identify compromised accounts and exfiltrated SharePoint files.",
        "5. Step 4-7: Execute eradication, recovery, and draft post-incident recommendations."
      ],
      expectedOutput: "Completed 7-stage incident resolution with zero data loss and hardened conditional access policies.",
      evaluationCriteria: [
        "Sound decision making preserving evidence",
        "Selection of appropriate containment vectors without unnecessary business disruption",
        "Comprehensive post-incident mitigation strategy"
      ],
      challengeSnippet: "DECISION POINT 2: Attacker is dumping payroll data. Option A: Unplug DC. Option B: Terminate VPN tunnel & lock accounts. Select defensible path."
    }
  },
  {
    id: 13,
    dayNumber: "DAY 13",
    title: "Digital Forensics Fundamentals",
    shortDesc: "Inspect digital evidence: Windows Event Logs, timestamps, browser history, and reconstruct breach timelines.",
    category: "Forensics",
    estimatedMinutes: 85,
    topics: [
      "In-browser Simulated Forensic Investigation",
      "Digital Evidence Types (Volatile RAM vs Non-Volatile Disk)",
      "Windows Event Logs (Security.evtx: 4624 Logon, 4625 Failed Logon, 7045 New Service)",
      "MACB Timestamps (Modified, Accessed, Created, Born)",
      "Timestomping & Antiforensics Detection",
      "Browser History & Cache Forensics (SQLite databases)",
      "Prefetch Files & Shimcache for Program Execution Proof",
      "Reconstructing a Unified Breach Timeline"
    ],
    notes: {
      quickRevision: [
        "Windows Event ID 4624 = Successful Logon; Event ID 4625 = Failed Logon. Logon Type 10 = Remote Desktop (RDP); Logon Type 3 = Network (SMB).",
        "Event ID 7045 indicates a new service was installed on the system (frequent malware persistence mechanism).",
        "Prefetch files (.pf) in C:\\Windows\\Prefetch prove whether an application was executed, when, and how many times.",
        "MACB timestamps: Modified (data written), Accessed (read), Created (MFT entry created), Born (file created).",
        "Order of Volatility (RFC 3227): CPU registers & cache -> Routing table/ARP/Process table -> Main memory (RAM) -> Temporary file systems -> Disk -> Remote logs."
      ],
      keyTerms: [
        { term: "Order of Volatility", definition: "The sequence in which digital evidence should be preserved based on how quickly it is destroyed." },
        { term: "Timestomping", definition: "An anti-forensic technique where attackers deliberately modify file timestamps to blend in with legitimate OS files." },
        { term: "Event ID 4624", definition: "Windows Security log generated whenever a user account successfully logs on to the machine." },
        { term: "Prefetch", definition: "A Windows memory management feature that caches executable data, serving as forensic proof of execution." }
      ],
      importantCommands: [
        { command: "wevtutil qe Security /q:\"*[System[(EventID=4625)]]\" /f:text /c:5", usage: "Query the last 5 failed login attempts from Windows Security log", purpose: "Event Log Query" },
        { command: "reg query HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", usage: "Inspect Windows Registry autorun keys for startup persistence", purpose: "Persistence Inspection" }
      ],
      interviewPoints: [
        "What is the difference between Windows Logon Type 2 (Interactive/Console), Type 3 (Network/SMB), and Type 10 (RemoteInteractive/RDP)?",
        "How can you prove a suspect executed an unauthorized tool even if they deleted the executable from disk? (Prefetch, Shimcache, Amcache, UserAssist).",
        "Explain RFC 3227 Order of Volatility."
      ],
      commonMistakes: [
        "Opening suspect files directly on the evidence machine (modifies the 'Accessed' timestamp).",
        "Working on the original forensic evidence rather than a forensically sound bit-stream image (dd / E01).",
        "Ignoring timezone offsets when correlating logs from different international servers."
      ]
    },
    assignment: {
      title: "Breach Timeline Reconstruction Challenge",
      type: "Investigation",
      objective: "Inspect synthetic evidence artifacts (Event logs, Browser DB, File metadata) to reconstruct the exact sequence of an insider data leak.",
      difficulty: "HARD",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "1. Launch the Digital Forensics Simulator in the Virtual Cyber Lab.",
        "2. Review the 6 evidence artifacts collected from laptop STN-EXEC-09.",
        "3. Determine the timestamp when the malicious USB drive was plugged in.",
        "4. Identify the file exfiltrated to the USB.",
        "5. Order the events into a clean chronological timeline."
      ],
      expectedOutput: "Chronological incident timeline detailing USB insertion, archive creation, copy action, and deletion of original logs.",
      evaluationCriteria: [
        "Accurate identification of USB serial number and plug-in timestamp",
        "Identification of exfiltrated archive 'Q3_Financial_Forecast.zip'",
        "Accurate sequential timeline matching RFC forensic reporting standards"
      ],
      challengeSnippet: "EVENT 4624: Logon Type 2 (bob.smith) at 14:02:11 | USB Event 20001: Device SanDisk_Cruzer inserted at 14:05:44"
    }
  },
  {
    id: 14,
    dayNumber: "DAY 14",
    title: "Cybersecurity Corporate Readiness",
    shortDesc: "Understand organizational governance: security policies, data protection (GDPR/DPDP), acceptable use, and culture.",
    category: "Governance & Compliance",
    estimatedMinutes: 65,
    topics: [
      "Information Security Policies: Acceptable Use (AUP), Password, Clean Desk",
      "Incident Reporting Procedures & Whistleblower Protections",
      "Data Protection Regulations: Digital Personal Data Protection (DPDP) Act & GDPR",
      "Third-Party Vendor Risk Management (TPRM)",
      "Security Awareness Programs & Continuous Phishing Simulation",
      "Corporate Security Culture: Moving from Blame to Vigilance",
      "Real-World Corporate Breach Case Studies (SolarWinds, Equifax, Uber)"
    ],
    notes: {
      quickRevision: [
        "Security is not just technology; it is People, Process, and Technology operating in balance.",
        "An Acceptable Use Policy (AUP) outlines what employees may and may not do using corporate hardware, networks, and email.",
        "Under data privacy laws (India's DPDP Act, GDPR), organizations must report data breaches within strict statutory deadlines (e.g. 72 hours under GDPR).",
        "Clean Desk and Clean Screen policies prevent shoulder surfing and unauthorized physical data visibility in office environments.",
        "A punitive security culture leads employees to conceal security mistakes, allowing malware to dwell undetected for months."
      ],
      keyTerms: [
        { term: "AUP", definition: "Acceptable Use Policy: corporate agreement restricting computer network usage." },
        { term: "DPDP Act", definition: "Digital Personal Data Protection Act: Indian regulation governing processing of digital personal data." },
        { term: "Dwell Time", definition: "The duration an adversary remains undetected inside a victim's network." },
        { term: "TPRM", definition: "Third-Party Risk Management: auditing security postures of external vendors and suppliers." }
      ],
      importantCommands: [
        { command: "gpresult /r", usage: "Audit applied Group Policy Objects (GPOs) enforcing corporate security policies on a workstation", purpose: "Policy Enforcement Audit" }
      ],
      interviewPoints: [
        "How would you handle an employee who repeatedly clicks on internal simulated phishing test emails?",
        "Explain how the SolarWinds supply-chain breach occurred and what lesson it taught enterprise security teams.",
        "How do you communicate a critical technical vulnerability to non-technical C-suite executives?"
      ],
      commonMistakes: [
        "Writing 200-page security policies that no employee reads or understands.",
        "Punishing employees who report real security mistakes, discouraging transparency.",
        "Treating compliance as a check-box exercise rather than actual risk reduction."
      ]
    },
    assignment: {
      title: "Corporate Incident Reporting & Policy Case Study",
      type: "Short-answer",
      objective: "Draft an executive briefing note for the CISO following an accidental data leak of employee PII to an external vendor.",
      difficulty: "MEDIUM",
      estimatedTime: "25 mins",
      maxScore: 100,
      instructions: [
        "Read the case scenario:",
        "An HR analyst accidentally sent a spreadsheet containing 1,200 employee PAN cards, names, and bank details to an external catering vendor.",
        "1. Identify the regulatory breach notification requirements.",
        "2. Formulate 3 immediate containment measures.",
        "3. Recommend two long-term DLP (Data Loss Prevention) policy controls."
      ],
      expectedOutput: "A professional 3-part executive briefing covering notification timeline, vendor NDA retrieval, and automated DLP endpoint policies.",
      evaluationCriteria: [
        "Understanding of statutory disclosure obligations",
        "Actionable containment steps",
        "Implementation of automated DLP controls restricting PII transfers"
      ],
      challengeSnippet: "EXECUTIVE_MEMO_DRAFT: Immediate response plan required for board review within 2 hours."
    }
  },
  {
    id: 15,
    dayNumber: "DAY 15",
    title: "FINAL CYBER DEFENDER CHALLENGE",
    shortDesc: "The Capstone Mission: Integrate all skills across MCQs, phishing, packet capture, firewall rules, and SOC triage.",
    category: "Capstone Challenge",
    estimatedMinutes: 120,
    topics: [
      "Comprehensive Multi-Disciplinary Capstone Mission",
      "Scenario: Coordinated APT Attack on National Critical Infrastructure",
      "Phase 1: Phishing Email Dissection & Header Forensics",
      "Phase 2: Wireshark Packet Inspection & Beacon Detection",
      "Phase 3: Emergency Firewall Rule Deployment",
      "Phase 4: CLI & Linux Terminal Host Forensics",
      "Phase 5: SOC SIEM Alert Triage & Root Cause Determination",
      "Phase 6: Incident Response Playbook Execution",
      "Generation of Final Executive Cyber Readiness Report"
    ],
    notes: {
      quickRevision: [
        "Congratulations on reaching Day 15: The Final Cyber Defender Challenge!",
        "Real-world cyber defense requires synthesizing every layer: threat awareness, network mechanics, host forensics, and policy execution.",
        "In this capstone, you will defend a fictional financial institution during an active APT attack.",
        "Methodical thinking, calm execution, and strict evidence preservation are the hallmarks of an elite cyber defender.",
        "Upon completing this challenge, your final Cyber Performance Index (CPI) and official Certificate of Completion will be generated!"
      ],
      keyTerms: [
        { term: "Capstone", definition: "A multi-faceted final project that serves as a culminating academic and practical experience." },
        { term: "Cyber Performance Index", definition: "A holistic metric measuring cyber readiness across 8 distinct competency dimensions." },
        { term: "APT", definition: "Advanced Persistent Threat: a stealthy threat actor, typically a state or state-sponsored group." }
      ],
      importantCommands: [
        { command: "run-capstone-verification", usage: "Synthesize all 6 mission phase scores into the final Cyber Readiness Report", purpose: "Capstone Evaluation" }
      ],
      interviewPoints: [
        "Be prepared to present your Day 15 Capstone Challenge experience in interviews as a comprehensive end-to-end practical project.",
        "Emphasize how you used real command line tools, packet inspectors, and SIEM consoles to mitigate attacks.",
        "Highlight your understanding of the entire attack lifecycle from phishing lure to data exfiltration."
      ],
      commonMistakes: [
        "Rushing into terminal commands without reading the overarching scenario briefing.",
        "Failing to document indicators of compromise along the way.",
        "Treating security tools in isolation instead of correlating signals across network and host layers."
      ]
    },
    assignment: {
      title: "The Ultimate Cyber Defender Capstone Assessment",
      type: "Incident response challenge",
      objective: "Complete the full 6-phase simulated attack defense, successfully thwarting the intrusion and restoring operations.",
      difficulty: "HARD",
      estimatedTime: "45 mins",
      maxScore: 100,
      instructions: [
        "1. Analyze the initial phishing lure targeting the CFO.",
        "2. Identify the malicious domain from the email headers.",
        "3. Inspect the PCAP trace to detect the secondary C2 beacon.",
        "4. Write and apply a firewall rule blocking the rogue IP.",
        "5. Investigate the compromised host via simulated CLI to terminate the persistent malware service.",
        "6. Finalize your incident log to generate the official Certificate of Completion."
      ],
      expectedOutput: "A 100% defended scenario with full containment verification, resulting in Level 10 'Zero-To-Infinity' status.",
      evaluationCriteria: [
        "Successful completion of all 6 mission phases",
        "Zero uncontained malware beacons",
        "High score across all 8 Cyber Performance Index dimensions"
      ],
      challengeSnippet: "MISSION STATUS: RED ALERT. Multiple alarms triggered across Finance VLAN. Facilitator Kapil standing by for mission report."
    }
  }
];

export const MODULES_DATA: ModuleData[] = RAW_MODULES.map(mod => {
  const enrichment = ENRICHMENTS_MAP[mod.id];
  return {
    ...mod,
    notes: {
      ...mod.notes,
      topicBreakdowns: enrichment?.topicBreakdowns || [],
      caseStudy: enrichment?.caseStudy
    }
  };
});
