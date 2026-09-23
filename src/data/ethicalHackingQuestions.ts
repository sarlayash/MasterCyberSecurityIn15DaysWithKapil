import { Question } from '../types';

export const ETHICAL_HACKING_QUESTION_BANK: Question[] = [
  // --- DAY 01: Intro to Ethical Hacking & Legalities ---
  {
    id: "q-eh-01-1",
    category: "Ethical Hacking Fundamentals",
    difficulty: "EASY",
    question: "Under the Indian Information Technology Act 2000 (Amended 2008), which section deals directly with hacking, unauthorized access, and tampering with computer source documents?",
    options: ["Section 43 and Section 66", "Section 124A", "Section 377", "Section 144"],
    correctAnswer: 0,
    explanation: "Sections 43 and 66 of the Indian Information Technology Act penalize unauthorized access, data damage, and hacking with imprisonment up to three years and substantial monetary penalties."
  },
  {
    id: "q-eh-01-2",
    category: "Ethical Hacking Fundamentals",
    difficulty: "EASY",
    question: "What primary characteristic distinguishes an Ethical Hacker (White Hat) from a malicious hacker (Black Hat)?",
    options: [
      "Explicit written authorization, legal scope adherence, and non-disclosure agreements",
      "The specific operating system used (Linux vs Windows)",
      "Only using open-source tools instead of commercial tools",
      "Refusing to write technical reports after finding vulnerabilities"
    ],
    correctAnswer: 0,
    explanation: "Ethical hackers operate exclusively under explicit written authorization (Rules of Engagement), adhere strictly to defined scope, and disclose findings privately for remediation."
  },
  {
    id: "q-eh-01-3",
    category: "Ethical Hacking Fundamentals",
    difficulty: "MEDIUM",
    question: "A penetration tester is contracted to assess an enterprise network. During testing, they discover an unlisted IP address belonging to a third-party cloud vendor that appears vulnerable. What must the tester do?",
    options: [
      "Cease testing that IP immediately, as it is outside the authorized scope of work in the RoE",
      "Exploit the vulnerability immediately to prove it to the client",
      "Share the IP on a public Discord server to ask for assistance",
      "Run a denial of service attack to verify if the server stays online"
    ],
    correctAnswer: 0,
    explanation: "Penetration testers must strictly abide by the Rules of Engagement (RoE). Testing unauthorized third-party infrastructure without written consent is illegal, even if found during a client assessment."
  },
  {
    id: "q-eh-01-4",
    category: "Ethical Hacking Fundamentals",
    difficulty: "MEDIUM",
    question: "Which of the following documents grants an ethical hacker legal 'Safe Harbor' protection when conducting authorized testing?",
    options: ["A published Bug Bounty Policy or signed Rules of Engagement (RoE)", "A verbal phone conversation with a junior developer", "A screenshot of an open port on Twitter", "An expired SSL certificate"],
    correctAnswer: 0,
    explanation: "Safe Harbor clauses in formal penetration testing contracts and published bug bounty programs protect security researchers from legal prosecution when testing within established parameters."
  },
  {
    id: "q-eh-01-5",
    category: "Ethical Hacking Fundamentals",
    difficulty: "HARD",
    question: "Under Indian IT Act Section 66F, what constitutes 'Cyber Terrorism' and what is the maximum penalty?",
    options: [
      "Attacking critical infrastructure with intent to threaten national unity or integrity; up to Life Imprisonment",
      "Posting an insulting tweet; 6 months community service",
      "Sending an unsolicited marketing email; ₹500 fine",
      "Running a ping command on a university server; 1 month suspension"
    ],
    correctAnswer: 0,
    explanation: "Section 66F of the Indian IT Act criminalizes cyber terrorism—acts intended to threaten the unity, integrity, sovereignty, or security of India or strike terror in people—punishable by imprisonment for life."
  },

  // --- DAY 02: Footprinting & Reconnaissance (OSINT) ---
  {
    id: "q-eh-02-1",
    category: "Reconnaissance & OSINT",
    difficulty: "EASY",
    question: "Which of the following is considered a purely PASSIVE reconnaissance technique?",
    options: [
      "Searching Google cache and Certificate Transparency logs for target subdomains",
      "Running an aggressive Nmap `-A` scan on the primary domain",
      "Executing Nikto against the public web server",
      "Sending test HTTP POST requests to the login form"
    ],
    correctAnswer: 0,
    explanation: "Passive reconnaissance queries third-party indexes (search engines, public registries, certificate transparency logs) without sending a single packet directly to the target's servers."
  },
  {
    id: "q-eh-02-2",
    category: "Reconnaissance & OSINT",
    difficulty: "EASY",
    question: "Which advanced Google Dork operator restricts search results exclusively to Adobe Acrobat documents hosted on `target.com`?",
    options: ["site:target.com filetype:pdf", "search:target.com type=pdf", "inurl:target.com doc:pdf", "domain=target.com & ext=pdf"],
    correctAnswer: 0,
    explanation: "`site:target.com filetype:pdf` instructs Google's search index to filter results exclusively to PDF files hosted within the target.com domain."
  },
  {
    id: "q-eh-02-3",
    category: "Reconnaissance & OSINT",
    difficulty: "MEDIUM",
    question: "What security risk arises if a primary DNS nameserver allows unrestricted AXFR zone transfers to any querying IP address?",
    options: [
      "An attacker can instantly download the entire internal and external DNS database and hostnames",
      "The server will automatically reboot into rescue mode",
      "All domain passwords will be sent via plaintext email",
      "The domain registration will instantly expire"
    ],
    correctAnswer: 0,
    explanation: "An unrestricted AXFR zone transfer (`dig axfr @ns1.target.com target.com`) allows unauthorized users to copy the complete zone file, disclosing all internal subdomains, mail servers, and IP mappings."
  },
  {
    id: "q-eh-02-4",
    category: "Reconnaissance & OSINT",
    difficulty: "MEDIUM",
    question: "How does Shodan differ fundamentally from a standard search engine like Google?",
    options: [
      "Shodan scans IP addresses and indexes device service banners (ports, IoT, servers) rather than web page text",
      "Shodan only searches Wikipedia and social media",
      "Shodan can only be accessed via Tor onion routing",
      "Shodan cannot find web servers"
    ],
    correctAnswer: 0,
    explanation: "Shodan continually probes global IPv4 addresses across hundreds of TCP/UDP ports, indexing device service banners (OpenSSH, Apache, RDP, SCADA) rather than crawled website content."
  },
  {
    id: "q-eh-02-5",
    category: "Reconnaissance & OSINT",
    difficulty: "HARD",
    question: "During OSINT gathering, you inspect a target's DNS TXT records and find `v=spf1 include:_spf.google.com ip4:203.0.113.50 -all`. What does the `-all` mechanism enforce?",
    options: [
      "A Hard Fail: receiving servers should strictly reject any email claiming to come from this domain if not from the authorized IPs",
      "A Soft Fail: accept all emails but mark them as high priority",
      "An instruction to delete the domain's website",
      "Allow any IP on the internet to send emails freely"
    ],
    correctAnswer: 0,
    explanation: "The `-all` mechanism in an SPF record represents a Hard Fail, instructing receiving mail transfer agents to reject and drop any message claiming to be from the domain that fails SPF verification."
  },

  // --- DAY 03: Network Scanning & Host Discovery ---
  {
    id: "q-eh-03-1",
    category: "Network Scanning",
    difficulty: "EASY",
    question: "In an Nmap TCP SYN Stealth scan (`-sS`), what packet does Nmap send upon receiving a SYN-ACK from an open target port?",
    options: ["RST (Reset)", "ACK (Acknowledge)", "FIN (Finish)", "PSH (Push)"],
    correctAnswer: 0,
    explanation: "In a stealth scan, Nmap immediately sends an RST packet to tear down the half-open connection before the full 3-way handshake completes, preventing many application-level servers from logging a completed connection."
  },
  {
    id: "q-eh-03-2",
    category: "Network Scanning",
    difficulty: "EASY",
    question: "Which Nmap command option enables operating system fingerprinting detection?",
    options: ["-O", "-sT", "-sn", "-Pn"],
    correctAnswer: 0,
    explanation: "The `-O` flag enables OS detection in Nmap, which analyzes subtle TCP/IP implementation nuances (TTL values, window sizes, options) to deduce the operating system."
  },
  {
    id: "q-eh-03-3",
    category: "Network Scanning",
    difficulty: "MEDIUM",
    question: "When scanning UDP ports with `nmap -sU`, what response confirms that a UDP port is definitively CLOSED?",
    options: [
      "An ICMP Port Unreachable packet (Type 3, Code 3)",
      "A TCP RST packet",
      "A UDP ACK packet",
      "No response at all"
    ],
    correctAnswer: 0,
    explanation: "Because UDP is connectionless, open ports often remain silent, whereas a closed UDP port causes the host operating system to reply with an ICMP Port Unreachable (Type 3, Code 3) message."
  },
  {
    id: "q-eh-03-4",
    category: "Network Scanning",
    difficulty: "MEDIUM",
    question: "An Nmap scan reports a port state as `FILTERED`. What does this indicate?",
    options: [
      "A firewall, packet filter, or network rule is dropping probes so Nmap cannot determine if the port is open or closed",
      "The port is running an encrypted SSL tunnel",
      "The port is definitely open and awaiting authentication",
      "The server operating system has crashed"
    ],
    correctAnswer: 0,
    explanation: "`FILTERED` means Nmap cannot determine whether the port is open because packet filtering prevents its probes from reaching the port or blocks response packets."
  },
  {
    id: "q-eh-03-5",
    category: "Network Scanning",
    difficulty: "HARD",
    question: "What is the purpose of passing the `-Pn` flag to an Nmap scan?",
    options: [
      "Skip host discovery (ping sweep) and assume the target host is online, useful when ICMP ping is blocked by a firewall",
      "Scan only prime-numbered ports",
      "Permanently delete all previous scan logs",
      "Perform a denial of service attack on port 0"
    ],
    correctAnswer: 0,
    explanation: "By default, Nmap pings targets before port scanning. If a firewall blocks ICMP pings, Nmap assumes the host is offline. `-Pn` instructs Nmap to bypass host discovery and proceed directly to port scanning."
  },

  // --- DAY 04: Enumeration & Service Probing ---
  {
    id: "q-eh-04-1",
    category: "Enumeration",
    difficulty: "EASY",
    question: "Which tool is specifically designed to enumerate Windows and Samba services for user lists, shares, and password policies across SMB?",
    options: ["enum4linux", "wireshark", "sqlmap", "aircrack-ng"],
    correctAnswer: 0,
    explanation: "`enum4linux` is a dedicated Perl script that automates SMB/Samba enumeration, pulling RID cycles, user lists, share details, and OS policies from Windows and Linux Samba servers."
  },
  {
    id: "q-eh-04-2",
    category: "Enumeration",
    difficulty: "EASY",
    question: "What is an SMB 'Null Session'?",
    options: [
      "An unauthenticated SMB connection made with an empty username and empty password to query public IPC$ shares",
      "A network cable that is physically disconnected",
      "A corrupted Windows registry hive",
      "A failed login that automatically locks out the administrator"
    ],
    correctAnswer: 0,
    explanation: "An SMB Null Session allows an unauthenticated client to connect to `IPC$` with a blank username and password, allowing enumeration of user accounts and shares on older or misconfigured systems."
  },
  {
    id: "q-eh-04-3",
    category: "Enumeration",
    difficulty: "MEDIUM",
    question: "What default community string is most commonly tested when enumerating SNMPv1/v2c network devices?",
    options: ["public", "root", "administrator", "cisco123"],
    correctAnswer: 0,
    explanation: "`public` is the legacy default read-only SNMP community string shipped on thousands of routers, switches, and servers, allowing `snmpwalk` to extract system and network metrics."
  },
  {
    id: "q-eh-04-4",
    category: "Enumeration",
    difficulty: "MEDIUM",
    question: "Which SMTP command can an ethical hacker use to verify whether a specific username exists on a mail server without sending an actual email message?",
    options: ["VRFY", "HELO", "QUIT", "DATA"],
    correctAnswer: 0,
    explanation: "The SMTP `VRFY` (Verify) command asks the mail server to verify whether a given user mailbox exists. If enabled, the server responds with 250 (user exists) or 550 (no such user)."
  },
  {
    id: "q-eh-04-5",
    category: "Enumeration",
    difficulty: "HARD",
    question: "You inspect `/etc/exports` on an NFS server and observe `/shared 192.168.1.0/24(rw,no_root_squash)`. Why is `no_root_squash` dangerous?",
    options: [
      "It allows a remote root user who mounts the share to create SUID root binaries, enabling trivial local privilege escalation",
      "It completely crashes the NFS daemon upon file deletion",
      "It encrypts all files with an unrecoverable random key",
      "It disconnects all Windows clients from the network"
    ],
    correctAnswer: 0,
    explanation: "By default, NFS maps (squashes) remote root requests to the unprivileged `nobody` account. `no_root_squash` preserves remote root privileges (UID 0), allowing a remote root user to write SUID root binaries directly into the share."
  },

  // --- DAY 05: Vulnerability Assessment & CVE Analysis ---
  {
    id: "q-eh-05-1",
    category: "Vulnerability Management",
    difficulty: "EASY",
    question: "What does the acronym 'CVE' stand for in cybersecurity?",
    options: [
      "Common Vulnerabilities and Exposures",
      "Certified Vulnerability Expert",
      "Centralized Virus Engine",
      "Critical Vector Encryption"
    ],
    correctAnswer: 0,
    explanation: "CVE stands for Common Vulnerabilities and Exposures, a standardized dictionary of publicly known information security flaws maintained by the MITRE Corporation."
  },
  {
    id: "q-eh-05-2",
    category: "Vulnerability Management",
    difficulty: "EASY",
    question: "What is the severity rating of a vulnerability with a CVSS v3.1 Base Score of 9.8?",
    options: ["Critical", "Medium", "Low", "Informational"],
    correctAnswer: 0,
    explanation: "Under the CVSS v3.1 specification, any base score between 9.0 and 10.0 is classified as CRITICAL severity."
  },
  {
    id: "q-eh-05-3",
    category: "Vulnerability Management",
    difficulty: "MEDIUM",
    question: "In the CVSS v3.1 metric group, which metric reflects whether an attacker must authenticate before exploiting a vulnerability?",
    options: ["Privileges Required (PR)", "Attack Vector (AV)", "User Interaction (UI)", "Scope (S)"],
    correctAnswer: 0,
    explanation: "Privileges Required (PR) measures the level of privileges an attacker must possess before successfully exploiting the vulnerability (None, Low, or High)."
  },
  {
    id: "q-eh-05-4",
    category: "Vulnerability Management",
    difficulty: "MEDIUM",
    question: "What is a 'False Positive' in a vulnerability scanner report?",
    options: [
      "The scanner reports that a vulnerability exists when in reality the system is secure",
      "The scanner crashes and refuses to complete",
      "The scanner fails to detect an actively exploited zero-day flaw",
      "The scanner identifies a legitimate root user account"
    ],
    correctAnswer: 0,
    explanation: "A False Positive occurs when an automated scanner flags a vulnerability that does not actually exist or is not exploitable in the target's operating environment."
  },
  {
    id: "q-eh-05-5",
    category: "Vulnerability Management",
    difficulty: "HARD",
    question: "Which command-line utility in Kali Linux searches a locally synchronized offline copy of the Exploit Database for matching exploits?",
    options: ["searchsploit", "nmap", "findexploit", "cve-lookup"],
    correctAnswer: 0,
    explanation: "`searchsploit` is the official command-line search utility for Exploit-DB, allowing penetration testers to perform offline searches for public exploits matching specific software versions."
  },

  // --- DAY 06: System Hacking & Password Auditing ---
  {
    id: "q-eh-06-1",
    category: "Password Security",
    difficulty: "EASY",
    question: "Where are user password hashes stored on a modern Linux operating system?",
    options: ["/etc/shadow", "/etc/passwd", "/var/log/auth.log", "/etc/hosts"],
    correctAnswer: 0,
    explanation: "On modern Linux systems, encrypted password hashes are stored in `/etc/shadow` (readable only by root), whereas `/etc/passwd` is world-readable and contains user metadata."
  },
  {
    id: "q-eh-06-2",
    category: "Password Security",
    difficulty: "EASY",
    question: "What is the primary cryptographic purpose of adding a unique 'salt' to a password before hashing?",
    options: [
      "To ensure identical passwords generate completely different hashes, neutralizing precomputed rainbow tables",
      "To make passwords shorter so they take less database storage",
      "To allow administrators to easily decrypt passwords when forgotten",
      "To eliminate the need for users to remember their passwords"
    ],
    correctAnswer: 0,
    explanation: "A salt is a unique random string appended to each password before hashing. It ensures that two users with the same password have different hashes and renders precomputed rainbow tables useless."
  },
  {
    id: "q-eh-06-3",
    category: "Password Security",
    difficulty: "MEDIUM",
    question: "Which tool is universally recognized as the fastest GPU-accelerated hash recovery and rule-based cracking engine?",
    options: ["Hashcat", "Wireshark", "Burp Suite", "Nikto"],
    correctAnswer: 0,
    explanation: "Hashcat is the industry-leading, GPU-accelerated password recovery utility supporting hundreds of hash modes and advanced rule-based mutation engines."
  },
  {
    id: "q-eh-06-4",
    category: "Password Security",
    difficulty: "MEDIUM",
    question: "What is the Hashcat mode number used for cracking standard Windows NTLM hashes?",
    options: ["-m 1000", "-m 0", "-m 1800", "-m 3200"],
    correctAnswer: 0,
    explanation: "In Hashcat, mode `-m 1000` is the designated mode for Microsoft NTLM hashes; mode 0 is MD5, and mode 1800 is SHA-512crypt."
  },
  {
    id: "q-eh-06-5",
    category: "Password Security",
    difficulty: "HARD",
    question: "Why are modern password hashing algorithms like Argon2id and bcrypt intentionally designed to be computationally slow and memory-hard?",
    options: [
      "To make offline brute-force and GPU/ASIC cluster cracking economically and computationally infeasible",
      "Because older CPUs were unable to compute mathematical equations quickly",
      "To save energy on cloud database servers",
      "To prevent users from changing their passwords too often"
    ],
    correctAnswer: 0,
    explanation: "Slow, memory-hard algorithms require substantial RAM and CPU time per calculation. While verifying one password takes ~100ms (unnoticeable to humans), cracking billions of hashes on GPUs becomes computationally prohibitive."
  },

  // --- DAY 07: Malware Threats & Payload Generation ---
  {
    id: "q-eh-07-1",
    category: "Malware & Payloads",
    difficulty: "EASY",
    question: "Why do penetration testers almost exclusively use REVERSE shells instead of BIND shells in modern enterprise tests?",
    options: [
      "Reverse shells initiate outbound traffic from the victim to the attacker, bypassing restrictive inbound firewall rules",
      "Reverse shells require no listening port on either machine",
      "Bind shells are only compatible with 16-bit MS-DOS operating systems",
      "Reverse shells automatically encrypt all traffic using RSA-4096"
    ],
    correctAnswer: 0,
    explanation: "Enterprise firewalls block incoming connections from the internet to internal endpoints (preventing bind shells), but almost always allow outbound connections (allowing reverse shells)."
  },
  {
    id: "q-eh-07-2",
    category: "Malware & Payloads",
    difficulty: "EASY",
    question: "Which component of the Metasploit Framework is used from the command line to craft standalone weaponized shellcode and binary executables?",
    options: ["msfvenom", "msfupdate", "armitage", "searchsploit"],
    correctAnswer: 0,
    explanation: "`msfvenom` is Metasploit's standalone payload generator and encoder, capable of compiling shellcode into ELF, EXE, PHP, ASPX, and raw formats."
  },
  {
    id: "q-eh-07-3",
    category: "Malware & Payloads",
    difficulty: "MEDIUM",
    question: "What is the fundamental architectural difference between a STAGED and a STAGELESS payload?",
    options: [
      "A staged payload sends a tiny stub that downloads the main payload into memory; a stageless payload contains the entire binary in one package",
      "Staged payloads only execute on web servers; stageless payloads only execute on smartphones",
      "Stageless payloads cannot execute reverse shells",
      "Staged payloads require physical USB access to deploy"
    ],
    correctAnswer: 0,
    explanation: "Staged payloads (e.g. `windows/meterpreter/reverse_tcp`) use a small initial stager to overcome buffer size limits and pull down the complete payload, whereas stageless payloads (e.g. `windows/meterpreter_reverse_tcp`) package everything together."
  },
  {
    id: "q-eh-07-4",
    category: "Malware & Payloads",
    difficulty: "MEDIUM",
    question: "What is Meterpreter's 'reflective DLL injection' technique and why is it valuable for evasion?",
    options: [
      "It injects and executes payload DLLs directly in memory without ever writing a physical file to the victim's hard drive",
      "It mirrors user keystrokes to a webcam",
      "It deletes the Windows kernel upon execution",
      "It changes the physical color of the monitor"
    ],
    correctAnswer: 0,
    explanation: "Reflective DLL injection loads and executes libraries directly into a process's RAM memory without calling the Windows API `LoadLibrary` or writing to disk, evading file-based antivirus scanners."
  },
  {
    id: "q-eh-07-5",
    category: "Malware & Payloads",
    difficulty: "HARD",
    question: "Why should an ethical hacker NEVER upload custom client penetration testing payloads directly to public multi-engine scanners like VirusTotal during an active engagement?",
    options: [
      "VirusTotal shares submitted samples with security vendors worldwide, alerting the client's SOC and leaking confidential artifacts",
      "VirusTotal will automatically execute the payload on the tester's laptop",
      "VirusTotal charges a $1,000 fine per uploaded file",
      "VirusTotal cannot analyze binaries smaller than 10MB"
    ],
    correctAnswer: 0,
    explanation: "VirusTotal distributes uploaded binary samples to antivirus and EDR vendors globally. Submitting client-specific payloads alerts the client's defense teams, ruins Red Team stealth, and may violate client NDAs."
  },

  // --- DAY 08: Sniffing, MITM & Traffic Interception ---
  {
    id: "q-eh-08-1",
    category: "Network Sniffing & MITM",
    difficulty: "EASY",
    question: "What vulnerability in the Address Resolution Protocol (ARP) enables ARP Cache Poisoning?",
    options: [
      "ARP is stateless and has no authentication; hosts accept and update caches with unsolicited ARP replies",
      "ARP only supports 8-bit IP addresses",
      "ARP requires plaintext passwords to be broadcast across the LAN",
      "ARP packets can only be sent once per year"
    ],
    correctAnswer: 0,
    explanation: "ARP lacks any cryptographic verification or authentication. A host will unconditionally overwrite its ARP cache table upon receiving an unsolicited ARP reply, associating an IP with an attacker's MAC address."
  },
  {
    id: "q-eh-08-2",
    category: "Network Sniffing & MITM",
    difficulty: "EASY",
    question: "What Linux kernel command must an attacker run before launching an ARP spoofing attack to prevent disconnecting the victim's internet access?",
    options: [
      "sysctl -w net.ipv4.ip_forward=1",
      "rm -rf /etc/hosts",
      "service networking stop",
      "iptables -F INPUT"
    ],
    correctAnswer: 0,
    explanation: "Enabling IP packet forwarding (`net.ipv4.ip_forward=1`) instructs the Linux kernel to route intercepted packets between the victim and gateway so traffic continues flowing seamlessly."
  },
  {
    id: "q-eh-08-3",
    category: "Network Sniffing & MITM",
    difficulty: "MEDIUM",
    question: "Which Wireshark display filter isolates unencrypted HTTP POST requests to locate login credentials?",
    options: [
      "http.request.method == \"POST\"",
      "tcp.port == 443",
      "ip.addr == 127.0.0.1",
      "dns.qry.type == 1"
    ],
    correctAnswer: 0,
    explanation: "`http.request.method == \"POST\"` filters packets down to HTTP requests submitting form data, which frequently contain unencrypted usernames, passwords, and tokens."
  },
  {
    id: "q-eh-08-4",
    category: "Network Sniffing & MITM",
    difficulty: "MEDIUM",
    question: "How does Moxie Marlinspike's SSLstrip attack compromise encrypted web sessions?",
    options: [
      "It intercepts HTTP 302 redirects to HTTPS and rewrites links to HTTP, transparently downgrading connections to plaintext",
      "It cracks the server's private RSA-2048 key in 3 seconds",
      "It physically cuts the submarine fiber-optic cables",
      "It deletes the user's browser history"
    ],
    correctAnswer: 0,
    explanation: "SSLstrip sits between the client and server, intercepts HTTP 301/302 redirects instructing the browser to upgrade to HTTPS, and converts all secure links back to plaintext HTTP before delivery."
  },
  {
    id: "q-eh-08-5",
    category: "Network Sniffing & MITM",
    difficulty: "HARD",
    question: "What enterprise network switch security feature definitively mitigates ARP poisoning across a corporate VLAN?",
    options: [
      "Dynamic ARP Inspection (DAI) combined with DHCP Snooping",
      "Spanning Tree Protocol (STP)",
      "VLAN Trunking Protocol (VTP)",
      "Port Speed Auto-Negotiation"
    ],
    correctAnswer: 0,
    explanation: "Dynamic ARP Inspection (DAI) inspects all ARP requests and responses on untrusted ports, verifying each against the trusted DHCP Snooping binding database to drop invalid and spoofed ARP replies."
  },

  // --- DAY 09: Social Engineering & Phishing Simulations ---
  {
    id: "q-eh-09-1",
    category: "Social Engineering",
    difficulty: "EASY",
    question: "What type of social engineering attack specifically targets high-ranking corporate executives (like the CEO or CFO)?",
    options: ["Whaling", "Vishing", "Smishing", "Baiting"],
    correctAnswer: 0,
    explanation: "Whaling is a highly targeted form of spear-phishing specifically directed at high-profile individuals, such as C-level executives, politicians, and board members."
  },
  {
    id: "q-eh-09-2",
    category: "Social Engineering",
    difficulty: "EASY",
    question: "In the Social-Engineer Toolkit (SET), which module automates copying a target web page to capture submitted login credentials?",
    options: [
      "Credential Harvester Attack Method",
      "SMS Spoofing Generator",
      "Buffer Overflow Generator",
      "Metasploit Auto-PWN"
    ],
    correctAnswer: 0,
    explanation: "The Credential Harvester method in SET clones a specified login portal (e.g. Google, Microsoft, Okta), captures submitted usernames and passwords, and redirects the user to the real page."
  },
  {
    id: "q-eh-09-3",
    category: "Social Engineering",
    difficulty: "MEDIUM",
    question: "An attacker calls a corporate receptionist pretending to be the lead IT helpdesk technician experiencing an emergency server outage to get a password reset. Which psychological influence principle is being exploited?",
    options: ["Authority and Urgency", "Reciprocity and Liking", "Scarcity and Greed", "Social Proof only"],
    correctAnswer: 0,
    explanation: "Pretexting as an IT director during an outage combines Authority (posing as senior technical staff) with Urgency (an emergency outage) to pressure victims into bypassing standard verification."
  },
  {
    id: "q-eh-09-4",
    category: "Social Engineering",
    difficulty: "MEDIUM",
    question: "Why are modern physical security hardware keys (FIDO2 / WebAuthn like YubiKeys) immune to reverse-proxy phishing attacks (like Evilginx2)?",
    options: [
      "FIDO2 binds authentication cryptographically to the exact domain origin in the browser address bar, refusing to authenticate fake clone domains",
      "FIDO2 keys emit a loud alarm whenever a phishing site opens",
      "FIDO2 keys automatically delete all hacker servers",
      "FIDO2 keys do not use internet connections"
    ],
    correctAnswer: 0,
    explanation: "FIDO2/WebAuthn signs the authentication assertion using the browser-verified origin URL (Relying Party ID). If the user is on a phishing proxy (`login.microsofft.com`), the key refuses to send credentials for `login.microsoft.com`."
  },
  {
    id: "q-eh-09-5",
    category: "Social Engineering",
    difficulty: "HARD",
    question: "What is 'Tailgating' (Piggybacking) in physical security penetration testing?",
    options: [
      "An unauthorized person closely following an authorized employee through a secure RFID door or barrier without badging in",
      "Following an executive's car on the highway",
      "Installing a keylogger on a laptop behind a monitor",
      "Scanning Wi-Fi networks from a parked van"
    ],
    correctAnswer: 0,
    explanation: "Tailgating or piggybacking is a physical social engineering technique where an unauthorized person gains physical entry to a restricted facility by walking closely behind an authorized employee holding the door."
  },

  // --- DAY 10: Denial of Service (DoS/DDoS) & Botnets ---
  {
    id: "q-eh-10-1",
    category: "DoS & DDoS",
    difficulty: "EASY",
    question: "What is the primary operational difference between a DoS attack and a DDoS attack?",
    options: [
      "A DoS attack originates from a single source machine; a DDoS attack utilizes multiple distributed systems/botnets",
      "DoS attacks only affect Linux; DDoS attacks only affect Windows",
      "DoS attacks are completely legal in all countries",
      "DDoS attacks only target Wi-Fi routers"
    ],
    correctAnswer: 0,
    explanation: "Denial of Service (DoS) attacks use a single attacking computer and IP, whereas Distributed Denial of Service (DDoS) leverages hundreds or thousands of distributed botnet nodes globally."
  },
  {
    id: "q-eh-10-2",
    category: "DoS & DDoS",
    difficulty: "EASY",
    question: "How does the Slowloris attack exhaust a web server's resources using minimal attacker bandwidth?",
    options: [
      "By opening multiple HTTP connections and sending incomplete HTTP headers at slow, periodic intervals to hold sockets open",
      "By sending 100 Gigabits per second of raw UDP packets",
      "By corrupting the server's hard drive sectors",
      "By brute-forcing the administrator SSH password"
    ],
    correctAnswer: 0,
    explanation: "Slowloris sends partial HTTP headers (e.g., `X-a: b\\r\\n`) slowly and periodically, tying up server worker threads and connection pools until the web server can accept no new connections."
  },
  {
    id: "q-eh-10-3",
    category: "DoS & DDoS",
    difficulty: "MEDIUM",
    question: "How do SYN Cookies protect a Linux web server from TCP SYN Flood attacks?",
    options: [
      "The server encodes connection state information into the initial Sequence Number (SYN-ACK) without allocating kernel memory until the final ACK arrives",
      "The server blocks all incoming traffic from the internet",
      "The server deletes all cookies from the visitor's browser",
      "The server automatically reboots every 10 seconds"
    ],
    correctAnswer: 0,
    explanation: "SYN Cookies prevent SYN queue backlog exhaustion: instead of allocating server memory upon receiving a SYN, the server encodes connection parameters into the SYN-ACK sequence number and only creates the socket when the client replies with ACK."
  },
  {
    id: "q-eh-10-4",
    category: "DoS & DDoS",
    difficulty: "MEDIUM",
    question: "In an NTP or DNS Amplification DDoS attack, why must the attacker spoof the source IP address in the outgoing UDP requests?",
    options: [
      "So the amplification servers send the massive responses to the victim's IP address rather than the attacker's machine",
      "Because UDP packets cannot travel across the internet without spoofing",
      "To prevent the NTP server from generating an error code",
      "To increase the speed of the local CPU"
    ],
    correctAnswer: 0,
    explanation: "UDP does not verify source IPs (no handshake). The attacker spoofs the victim's IP as the source; the reflector servers send the disproportionately large response payloads directly to the victim."
  },
  {
    id: "q-eh-10-5",
    category: "DoS & DDoS",
    difficulty: "HARD",
    question: "How does Anycast routing help enterprise content delivery networks (CDNs) absorb multi-terabit DDoS attacks?",
    options: [
      "It advertises the same destination IP address via BGP across dozens of global data centers, dispersing attack traffic across worldwide scrubbing capacity",
      "It turns off all routers when an attack starts",
      "It sends all attack traffic to a single backup server in Iceland",
      "It requires all visitors to complete a physical captcha at an ATM"
    ],
    correctAnswer: 0,
    explanation: "Anycast assigns the same IP to multiple routing nodes globally. BGP routes incoming traffic to the nearest geographic point of presence (PoP), fragmenting a 1 Tbps attack into manageable 20 Gbps chunks absorbed by local scrubbing centers."
  },

  // --- DAY 11: Web Application Hacking & OWASP Top 10 ---
  {
    id: "q-eh-11-1",
    category: "Web Application Security",
    difficulty: "EASY",
    question: "What is currently ranked as the #1 most prevalent and dangerous web application security risk in the OWASP Top 10?",
    options: ["Broken Access Control (A01)", "Cryptographic Failures", "Security Misconfiguration", "Identification and Authentication Failures"],
    correctAnswer: 0,
    explanation: "Broken Access Control holds the #1 spot in the OWASP Top 10, encompassing IDOR, horizontal/vertical privilege escalation, and unauthorized access to API endpoints."
  },
  {
    id: "q-eh-11-2",
    category: "Web Application Security",
    difficulty: "EASY",
    question: "Which component of Burp Suite is used to manually edit, resend, and analyze individual HTTP requests and responses?",
    options: ["Repeater", "Decoder", "Comparer", "Sequencer"],
    correctAnswer: 0,
    explanation: "Burp Repeater is the core tool used by penetration testers to modify parameters, re-issue HTTP requests, and analyze the resulting server responses in real time."
  },
  {
    id: "q-eh-11-3",
    category: "Web Application Security",
    difficulty: "MEDIUM",
    question: "An authenticated user changes the URL parameter from `profile.php?user_id=102` to `profile.php?user_id=103` and successfully views another user's personal medical records. What vulnerability is this?",
    options: [
      "Insecure Direct Object Reference (IDOR) / Broken Object Level Authorization (BOLA)",
      "Cross-Site Request Forgery (CSRF)",
      "SQL Injection (SQLi)",
      "Server-Side Request Forgery (SSRF)"
    ],
    correctAnswer: 0,
    explanation: "IDOR occurs when an application provides direct access to objects based on user-supplied input without verifying on the backend that the logged-in user has permission to access that specific object ID."
  },
  {
    id: "q-eh-11-4",
    category: "Web Application Security",
    difficulty: "MEDIUM",
    question: "What is the critical difference between Stored XSS and Reflected XSS?",
    options: [
      "Stored XSS is permanently saved in the application database and executes for all viewers; Reflected XSS executes only when a victim clicks a crafted link",
      "Stored XSS only works on mobile phones; Reflected XSS works on laptops",
      "Stored XSS does not require JavaScript",
      "Reflected XSS can never steal session cookies"
    ],
    correctAnswer: 0,
    explanation: "Stored XSS embeds malicious code into persistent storage (e.g. comments, profiles) so every user visiting the page executes it. Reflected XSS reflects off the web server in immediate responses via malicious URLs."
  },
  {
    id: "q-eh-11-5",
    category: "Web Application Security",
    difficulty: "HARD",
    question: "An attacker abuses a web application's image import feature to query `http://169.254.169.254/latest/meta-data/iam/security-credentials/`. What attack is being executed?",
    options: [
      "Server-Side Request Forgery (SSRF) targeting cloud metadata services",
      "Cross-Site Scripting (XSS)",
      "DNS Cache Poisoning",
      "Local File Inclusion on `/etc/passwd`"
    ],
    correctAnswer: 0,
    explanation: "This is Server-Side Request Forgery (SSRF). The attacker forces the cloud backend server to query the link-local AWS instance metadata address (`169.254.169.254`), exfiltrating temporary IAM administrative role credentials."
  },

  // --- DAY 12: SQL Injection (SQLi) & Database Exploitation ---
  {
    id: "q-eh-12-1",
    category: "SQL Injection",
    difficulty: "EASY",
    question: "What is the single most effective, industry-standard defensive mechanism against all forms of SQL Injection?",
    options: [
      "Prepared Statements with Parameterized Queries",
      "Client-side JavaScript input length checks",
      "Converting all inputs to uppercase",
      "Filtering out the word 'SELECT' with regex"
    ],
    correctAnswer: 0,
    explanation: "Prepared Statements (Parameterized Queries) ensure the database engine treats user input strictly as data parameters, never as executable SQL code, completely eliminating SQL injection risks."
  },
  {
    id: "q-eh-12-2",
    category: "SQL Injection",
    difficulty: "EASY",
    question: "What condition must be met for a `UNION SELECT` SQL injection payload to execute successfully without database syntax errors?",
    options: [
      "The injected query must have the exact same number and compatible data types of columns as the original query",
      "The database must be running on a Linux server",
      "The user must be logged in as the root database administrator",
      "The query must contain no spaces"
    ],
    correctAnswer: 0,
    explanation: "In SQL, the `UNION` operator requires that both SELECT queries return the exact same number of columns with compatible data types."
  },
  {
    id: "q-eh-12-3",
    category: "SQL Injection",
    difficulty: "MEDIUM",
    question: "When testing for SQL injection, what is the purpose of appending `-- -` or `#` to the end of an injected payload?",
    options: [
      "To comment out and neutralize the remainder of the original developer's SQL query",
      "To reboot the SQL server",
      "To automatically decrypt database hashes",
      "To trigger an immediate web server reload"
    ],
    correctAnswer: 0,
    explanation: "In SQL syntax, `-- ` or `#` denotes a comment. Appending comment markers tells the database engine to ignore the rest of the developer's original query, preventing syntax errors from trailing quotes or parentheticals."
  },
  {
    id: "q-eh-12-4",
    category: "SQL Injection",
    difficulty: "MEDIUM",
    question: "Which automated penetration testing tool is the industry standard for discovering and exploiting SQL injection flaws and dumping databases?",
    options: ["Sqlmap", "Nmap", "Ettercap", "Aircrack-ng"],
    correctAnswer: 0,
    explanation: "`sqlmap` is the premier open-source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over database servers."
  },
  {
    id: "q-eh-12-5",
    category: "SQL Injection",
    difficulty: "HARD",
    question: "An application returns no database errors and does not display any query output on screen, but you notice that injecting `'; WAITFOR DELAY '0:0:5'--` causes the web server to take 5 seconds longer to respond. What type of vulnerability is this?",
    options: [
      "Time-Based Blind SQL Injection",
      "Stored Cross-Site Scripting",
      "In-Band Error-Based SQLi",
      "Denial of Service memory leak"
    ],
    correctAnswer: 0,
    explanation: "Time-Based Blind SQL Injection uses conditional time delay statements (`WAITFOR DELAY` in MSSQL, `pg_sleep()` in PostgreSQL, `sleep()` in MySQL) to infer database data based on server response latency."
  },

  // --- DAY 13: Wireless & Wi-Fi Security Auditing ---
  {
    id: "q-eh-13-1",
    category: "Wireless Security",
    difficulty: "EASY",
    question: "Why was the Wired Equivalent Privacy (WEP) wireless encryption standard deprecated and deemed insecure?",
    options: [
      "Its 24-bit Initialization Vector (IV) is too short and repeats frequently, allowing mathematical key recovery in minutes",
      "It only supports cables and not wireless airwaves",
      "It requires a physical smartcard for every connection",
      "It limits Wi-Fi speeds to 10 bytes per second"
    ],
    correctAnswer: 0,
    explanation: "WEP's short 24-bit IV pool results in rapid IV collisions (the Birthday Paradox). An attacker collecting ~20,000 to 50,000 IVs can mathematically recover the root encryption key using tools like `aircrack-ng` in minutes."
  },
  {
    id: "q-eh-13-2",
    category: "Wireless Security",
    difficulty: "EASY",
    question: "In the Aircrack-ng suite, which command-line utility is used to put a wireless network card into monitor mode?",
    options: ["airmon-ng", "airodump-ng", "aireplay-ng", "airbase-ng"],
    correctAnswer: 0,
    explanation: "`airmon-ng start <interface>` is the utility used to enable monitor mode on wireless network interfaces, creating virtual monitor interfaces like `wlan0mon`."
  },
  {
    id: "q-eh-13-3",
    category: "Wireless Security",
    difficulty: "MEDIUM",
    question: "Why does an ethical hacker transmit 802.11 Deauthentication frames using `aireplay-ng` during a WPA2 wireless assessment?",
    options: [
      "To disconnect a connected client so that when the client automatically reconnects, the tester captures the 4-way EAPOL handshake",
      "To permanently fry the access point's wireless antenna",
      "To change the router's admin password",
      "To force the router to switch to WEP encryption"
    ],
    correctAnswer: 0,
    explanation: "Deauthenticating an associated client forces the client device to automatically re-associate with the access point, generating the 4-way EAPOL handshake required for offline PSK dictionary cracking."
  },
  {
    id: "q-eh-13-4",
    category: "Wireless Security",
    difficulty: "MEDIUM",
    question: "What is an 'Evil Twin' Wi-Fi attack?",
    options: [
      "A rogue access point broadcasting the identical SSID and MAC address of a legitimate Wi-Fi network with stronger signal to trick clients into connecting",
      "Having two identical wireless routers in the same room",
      "A twin brother who knows your laptop password",
      "A dual-band router operating on both 2.4GHz and 5GHz"
    ],
    correctAnswer: 0,
    explanation: "An Evil Twin attack configures a rogue access point mimicking a legitimate wireless network's SSID. Client devices automatically roam to the rogue AP with the stronger signal, allowing the attacker to intercept all traffic."
  },
  {
    id: "q-eh-13-5",
    category: "Wireless Security",
    difficulty: "HARD",
    question: "How does WPA3's Simultaneous Authentication of Equals (SAE / Dragonfly handshake) defeat offline dictionary password cracking?",
    options: [
      "It requires interactive zero-knowledge proof exchange for every password guess, preventing attackers from testing guesses offline without the AP",
      "It bans all passwords containing fewer than 50 characters",
      "It changes the Wi-Fi password every 30 seconds automatically",
      "It replaces radio waves with optical infrared lasers"
    ],
    correctAnswer: 0,
    explanation: "SAE (Dragonfly handshake) provides forward secrecy and zero-knowledge mutual proof. An attacker capturing the handshake cannot test wordlists offline against captured packets; each guess requires an active online exchange."
  },

  // --- DAY 14: Evading IDS, Firewalls & Honeypots ---
  {
    id: "q-eh-14-1",
    category: "Defense Evasion",
    difficulty: "EASY",
    question: "How does an Intrusion Prevention System (IPS) differ fundamentally from an Intrusion Detection System (IDS)?",
    options: [
      "An IPS is deployed inline and can actively block or drop malicious packets in real time; an IDS is passive and only generates alerts",
      "An IDS can only inspect web traffic; an IPS inspects all protocols",
      "An IPS only works on Windows operating systems",
      "An IDS requires no network connection to function"
    ],
    correctAnswer: 0,
    explanation: "An IDS operates passively (monitoring a SPAN/mirror port) and generates alerts; an IPS sits directly inline in the packet flow and actively blocks, drops, or resets malicious connections."
  },
  {
    id: "q-eh-14-2",
    category: "Defense Evasion",
    difficulty: "EASY",
    question: "What is a 'Honeypot' in network security?",
    options: [
      "A decoy system designed to attract and trap unauthorized users, study attacker behavior, and trigger early warning alerts",
      "A high-speed database for storing passwords",
      "A software bug that causes CPU overheating",
      "An unencrypted Wi-Fi password"
    ],
    correctAnswer: 0,
    explanation: "A honeypot is a deliberately isolated, closely monitored deception system configured with vulnerabilities to lure attackers, detect intrusions early, and gather intelligence on adversary techniques."
  },
  {
    id: "q-eh-14-3",
    category: "Defense Evasion",
    difficulty: "MEDIUM",
    question: "What does the Nmap `-f` flag do to evade older signature-based Network Intrusion Detection Systems?",
    options: [
      "It fragments TCP probe headers across multiple tiny 8-byte IP packets so signatures cannot match in a single inspection buffer",
      "It forces Nmap to run at maximum fast speed",
      "It deletes firewall log entries on the destination server",
      "It spoofs the MAC address of the default gateway"
    ],
    correctAnswer: 0,
    explanation: "The `-f` flag causes Nmap to fragment the probe packet into tiny 8-byte chunks after the IP header, splitting TCP flags across fragments to evade simple signature matchers that lack stream reassembly."
  },
  {
    id: "q-eh-14-4",
    category: "Defense Evasion",
    difficulty: "MEDIUM",
    question: "What does the Nmap Decoy scanning flag (`-D RND:5,ME,RND:5`) accomplish?",
    options: [
      "It mixes real scan probes among packets originating from 10 forged, random decoy IP addresses, confounding firewall log analysis",
      "It hides all open ports from the scanner output",
      "It deletes the scanner's IP address from existence",
      "It encrypts the network cable"
    ],
    correctAnswer: 0,
    explanation: "Decoy scanning sends scan probes from both the tester's IP and multiple specified or randomized decoy IPs. The target's firewall and IDS log scans from all IPs simultaneously, making it difficult to isolate the true attacker."
  },
  {
    id: "q-eh-14-5",
    category: "Defense Evasion",
    difficulty: "HARD",
    question: "Why does the tool `proxychains` fail when executed with an Nmap SYN Stealth Scan (`nmap -sS`)?",
    options: [
      "Proxychains intercepts application-layer connect() system calls via dynamic linking and cannot tunnel raw raw-socket SYN packets",
      "Proxychains is only compatible with Python scripts",
      "Tor network rules strictly prohibit port scanning",
      "Nmap automatically blocks proxy servers"
    ],
    correctAnswer: 0,
    explanation: "Proxychains hooks socket library calls (`connect()`) dynamically. It cannot route raw Layer 3/4 raw socket packets used by SYN scans (`-sS`). Testers must use full TCP Connect scanning (`-sT -Pn`) with Proxychains."
  },

  // --- DAY 15: Penetration Testing Capstone & Reporting ---
  {
    id: "q-eh-15-1",
    category: "Red Team & Reporting",
    difficulty: "EASY",
    question: "What is 'Privilege Escalation' in a penetration testing engagement?",
    options: [
      "Transitioning from a low-privilege initial access account to administrative, root, or SYSTEM authority",
      "Asking the client for a higher consulting fee",
      "Upgrading RAM on the penetration testing laptop",
      "Promoting a junior tester to project manager"
    ],
    correctAnswer: 0,
    explanation: "Privilege Escalation is the phase where an attacker or pentester exploits misconfigurations, vulnerabilities, or credential access to elevate from unprivileged access (like `www-data`) to full root/administrator control."
  },
  {
    id: "q-eh-15-2",
    category: "Red Team & Reporting",
    difficulty: "EASY",
    question: "Which Linux command lists all executables on the system with the SUID (Set Owner User ID) bit enabled?",
    options: [
      "find / -perm -u=s -type f 2>/dev/null",
      "ls -la /root",
      "chmod 777 /etc/shadow",
      "grep -r \"password\" /var/log"
    ],
    correctAnswer: 0,
    explanation: "`find / -perm -u=s -type f 2>/dev/null` searches the entire filesystem for files with the SUID permission set for the user, silencing permission denied error messages."
  },
  {
    id: "q-eh-15-3",
    category: "Red Team & Reporting",
    difficulty: "MEDIUM",
    question: "What is the primary objective of the Executive Summary section in a professional penetration testing report?",
    options: [
      "To communicate business risks, financial exposure, compliance impacts, and strategic priorities in clear language for executive leadership",
      "To list all 10,000 lines of raw Nmap terminal output",
      "To name and blame individual software developers",
      "To teach the CEO how to write Python exploit code"
    ],
    correctAnswer: 0,
    explanation: "The Executive Summary is written for the Board, C-suite, and non-technical leadership. It summarizes overall security posture, maps technical risks to business impact, and outlines high-level strategic remediation."
  },
  {
    id: "q-eh-15-4",
    category: "Red Team & Reporting",
    difficulty: "MEDIUM",
    question: "What is the industry-standard standard framework known as PTES in penetration testing?",
    options: [
      "Penetration Testing Execution Standard",
      "Public Threat Encryption System",
      "Protocol Testing Evaluation Standard",
      "Primary Terminal Exploitation Software"
    ],
    correctAnswer: 0,
    explanation: "PTES stands for the Penetration Testing Execution Standard, an open standard defining the 7 phases of a complete commercial penetration test."
  },
  {
    id: "q-eh-15-5",
    category: "Red Team & Reporting",
    difficulty: "HARD",
    question: "During post-exploitation on a Windows Active Directory domain, what technique involves requesting service tickets for service accounts and cracking their password hashes offline?",
    options: ["Kerberoasting", "Pass-The-Hash", "Golden Ticket", "AS-REP Roasting"],
    correctAnswer: 0,
    explanation: "Kerberoasting exploits Active Directory Kerberos service ticket requests (TGS). Any valid domain user can request a Kerberos service ticket encrypted with the service account's NTLM hash, which can then be cracked offline with Hashcat."
  }
];

export function getEthicalHackingDayAssessment(dayNumber: number, count: number = 5): Question[] {
  // Day 1 maps to Day 101, Day 2 to Day 102, etc.
  const targetDay = dayNumber > 100 ? dayNumber - 100 : dayNumber;
  const prefix = `q-eh-${String(targetDay).padStart(2, '0')}-`;
  
  const daySpecific = ETHICAL_HACKING_QUESTION_BANK.filter(q => q.id.startsWith(prefix));
  
  if (daySpecific.length >= count) {
    const copy = [...daySpecific];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
  }

  // Fallback to random slice from full bank
  const copy = [...ETHICAL_HACKING_QUESTION_BANK];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}
