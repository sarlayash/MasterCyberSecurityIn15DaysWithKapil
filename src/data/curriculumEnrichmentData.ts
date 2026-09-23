import { TopicBreakdown, DayCaseStudy } from '../types';

export interface ModuleEnrichment {
  topicBreakdowns: TopicBreakdown[];
  caseStudy: DayCaseStudy;
}

export const ENRICHMENTS_MAP: Record<number, ModuleEnrichment> = {
  1: {
    caseStudy: {
      title: "Target Corp HVAC Vendor Breach",
      incidentYear: "2013-2014",
      targetEntity: "Target Corporation (US Retail Giant)",
      summary: "Attackers stole network credentials from an external third-party refrigeration & HVAC maintenance contractor (Fazio Mechanical Services). The contractor's credentials gave attackers direct access to Target's billing portal, from which they pivoted laterally across an unsegmented network into point-of-sale (POS) registers, exfiltrating 40 million debit/credit card numbers.",
      rootCause: "Flat internal network architecture without microsegmentation; lack of multi-factor authentication (MFA) on vendor remote portal; failure to isolate HVAC vendor credentials from PCI-DSS payment card cardholder data environments (CDE).",
      defenseTakeaway: "Enforce strict network microsegmentation between corporate facilities and sensitive card processing networks; mandate FIDO2 MFA for all external contractors; enforce zero-trust network access (ZTNA)."
    },
    topicBreakdowns: [
      {
        topicName: "CIA Triad (Confidentiality, Integrity, Availability)",
        studentAnalogy: "Think of your final semester exam: Confidentiality means nobody can see the question paper before the exam; Integrity means nobody secretly alters your submitted answers; Availability means the exam portal doesn't crash while you are submitting your paper.",
        industryUseCase: "In core banking, Confidentiality protects account balances via AES-256 encryption, Integrity prevents unauthorized modification of wire amounts via SHA-256 MAC hashes, and Availability ensures 99.999% ATM uptime through geo-redundant clusters."
      },
      {
        topicName: "Threats vs Vulnerabilities vs Risks",
        studentAnalogy: "Leaving your dorm room door unlocked is a Vulnerability; a campus thief wandering around is a Threat; the chance of your expensive laptop getting stolen while you are at the canteen is the Risk.",
        industryUseCase: "A missing security patch in an Apache web server is a Vulnerability; an active ransomware syndicate scanning the internet is a Threat; the estimated $2M business outage resulting from exploitation is the calculated Risk."
      },
      {
        topicName: "Attack Surface Mapping",
        studentAnalogy: "Every window, balcony, back door, and shared hostel Wi-Fi hotspot through which an outsider could enter your apartment represents your house's attack surface.",
        industryUseCase: "Enterprises use tools like Shodan, Censys, and external attack surface management (EASM) to discover exposed test servers, abandoned subdomains, open RDP ports, and shadow IT cloud buckets before adversaries discover them."
      },
      {
        topicName: "The Defensive Security Mindset",
        studentAnalogy: "Instead of assuming nobody will steal your bicycle because campus is friendly, you always double-lock it to an immovable steel pole, park under a CCTV camera, and engrave your student ID on the frame.",
        industryUseCase: "Defenders adopt 'Assume Breach' and Defense-in-Depth architectures. They assume an attacker has already bypassed the outer firewall, so they enforce endpoint EDR, microsegmentation, and database tokenization internally."
      },
      {
        topicName: "Real-World Phishing Analysis",
        studentAnalogy: "Receiving a WhatsApp message with a college logo claiming: 'Your scholarship has been cancelled! Click this bit.ly link immediately to verify your roll number and bank OTP'.",
        industryUseCase: "Corporate email gateways analyze SPF, DKIM, and DMARC DNS records, run sandboxed link inspection, and parse artificial urgency indicators ('Immediate Wire Transfer Required by CEO') to quarantine credential-harvesting lures."
      }
    ]
  },
  2: {
    caseStudy: {
      title: "WannaCry Ransomware Global Outbreak",
      incidentYear: "2017",
      targetEntity: "UK NHS, FedEx, Telefónica, and 200,000+ hosts across 150 nations",
      summary: "WannaCry weaponized the leaked NSA exploit 'EternalBlue' (CVE-2017-0144), exploiting a vulnerability in Microsoft's SMBv1 protocol. Once inside a single network endpoint, the worm scanned local subnets and the public internet on TCP port 445, self-propagating without human intervention and encrypting patient records and operational workstations within minutes.",
      rootCause: "Unpatched legacy Windows operating systems running deprecated SMBv1 protocol directly exposed to local network segments; lack of timely patch application following Microsoft's MS17-010 security bulletin released 2 months prior.",
      defenseTakeaway: "Maintain rigorous patch management cadences; globally disable legacy protocols like SMBv1; block perimeter SMB ports (TCP 139, 445); maintain immutable, air-gapped offline backups."
    },
    topicBreakdowns: [
      {
        topicName: "Malware Types (Viruses, Worms, Trojans, Rootkits, Spyware)",
        studentAnalogy: "A Trojan is downloading a 'Free Cracked Game' that secretly records your webcam; a Worm is a flu bug that infects everyone in the college hostel without anyone needing to touch each other; a Rootkit is a squatter who bribes the building warden to erase all records that they even live in the building.",
        industryUseCase: "Enterprise EDR platforms deploy kernel-level drivers to detect Rootkits modifying syscall tables, inspect process injection (e.g. Cobalt Strike beacons inside svchost.exe), and quarantine worms before they sweep internal subnets."
      },
      {
        topicName: "Phishing & Spear Phishing Techniques",
        studentAnalogy: "Phishing is a stranger shouting 'Free Pizza!' outside the hostel to grab whoever walks out; Spear Phishing is someone emailing you: 'Hi Rahul, here is the syllabus notes Prof. Sharma promised you during yesterday's 10 AM lab'.",
        industryUseCase: "Adversaries research executives on LinkedIn to send hyper-targeted Spear Phishing emails disguised as vendor invoices or legal subpenas, tricking finance departments into executing multi-million dollar wire diversions."
      },
      {
        topicName: "Social Engineering Tactics (Pretexting, Baiting, Vishing)",
        studentAnalogy: "Baiting is finding a sleek branded USB pen drive lying on the college library table labeled 'Confidential Placement Answers' and plugging it into your laptop out of sheer curiosity.",
        industryUseCase: "Penetration testers and criminals call helpdesks pretending to be remote employees locked out of their accounts (Vishing / Pretexting), exploiting human empathy and urgency to convince agents to reset MFA tokens."
      },
      {
        topicName: "Ransomware Anatomy & Extortion Models",
        studentAnalogy: "A kidnapper steals your thesis notebook right before submission, locks it in an unbreakable safe, demands ₹50,000 for the combination, and threatens to post your private drafts on the college notice board if you don't pay.",
        industryUseCase: "Modern ransomware gangs (e.g., LockBit, BlackCat) deploy double extortion: they exfiltrate sensitive customer databases to cloud storage before encrypting hypervisors and demanding millions in cryptocurrency."
      },
      {
        topicName: "Credential Theft & Token Hijacking",
        studentAnalogy: "Instead of trying to pick your door padlock, a roommate steals your cafeteria lunch card when you set it on the table and uses your balance all week without ever knowing your PIN.",
        industryUseCase: "Infostealers like RedLine steal session cookies (`estats_auth`, OAuth bearer tokens) directly from browser memory, allowing attackers to bypass MFA entirely since the session is already authenticated."
      },
      {
        topicName: "Insider Threats & Malicious vs Negligent Actors",
        studentAnalogy: "A negligent actor accidentally leaves the shared group project folder set to 'Publicly Editable' on Google Drive; a malicious actor is a disgruntled student who deletes the final presentation slides right before evaluation.",
        industryUseCase: "DLP (Data Loss Prevention) and UEBA (User and Entity Behavior Analytics) track abnormal mass downloads by employees during their 2-week resignation notice period to stop intellectual property theft."
      },
      {
        topicName: "The Cyber Kill Chain & MITRE ATT&CK Framework",
        studentAnalogy: "A thief's playbook: scouting the house (Recon), packing tools (Weaponization), climbing the wall (Delivery), picking the lock (Exploit), hiding inside the attic (Installation), phoning their getaway driver (C2), and grabbing the gold (Actions on Objectives).",
        industryUseCase: "SOC teams map alerts to MITRE ATT&CK matrix technique IDs (e.g., T1059.001 PowerShell execution, T1003.001 LSASS memory dump) to understand exact attacker objectives and craft automated containment playbooks."
      }
    ]
  },
  3: {
    caseStudy: {
      title: "Capital One AWS SSRF & IAM Cloud Breach",
      incidentYear: "2019",
      targetEntity: "Capital One Financial Corporation",
      summary: "A former cloud engineer exploited a Server-Side Request Forgery (SSRF) flaw in an open-source Web Application Firewall (ModSecurity) running on an Amazon EC2 instance. The SSRF allowed the attacker to query the AWS Instance Metadata Service (IMDSv1) at 169.254.169.254, stealing the IAM role temporary credentials assigned to the EC2 instance. The IAM role was excessively privileged (`s3:ListAllMyBuckets`, `s3:Sync`), enabling the attacker to dump 100+ million credit card applications and 140,000 Social Security numbers from S3 buckets.",
      rootCause: "Over-privileged IAM roles attached to web compute workloads; reliance on vulnerable IMDSv1 without session-token authentication (IMDSv2); misconfigured WAF acting as an unintended HTTP proxy.",
      defenseTakeaway: "Enforce strict Principle of Least Privilege on IAM roles; mandate AWS IMDSv2 token-backed metadata access; configure VPC service endpoints and S3 bucket policies preventing exfiltration."
    },
    topicBreakdowns: [
      {
        topicName: "Password Entropy, Hashing (bcrypt, argon2) & Salt",
        studentAnalogy: "Writing your secret diary password as 'cat' (weak entropy) versus an uncrackable pass-phrase. Salting is like mixing a spoonful of sand into a cake recipe so no two cakes look identical even if made with the same flour.",
        industryUseCase: "Modern identity services use Argon2id or bcrypt with cost factors > 12. Even if an attacker dumps the database table, pre-computed rainbow tables cannot crack the hashes because every password has a unique cryptographic salt."
      },
      {
        topicName: "Multi-Factor Authentication (Something you know, have, are)",
        studentAnalogy: "To enter the college physics laboratory: you enter your secret passcode (something you know), tap your physical RFID student ID card (something you have), and scan your thumbprint (something you are).",
        industryUseCase: "Enterprises migrate from vulnerable SMS OTPs (susceptible to SIM swapping and SS7 interception) to FIDO2 WebAuthn hardware keys (e.g. YubiKey) providing cryptographic proof against Adversary-in-the-Middle (AiTM) phishing."
      },
      {
        topicName: "Authentication (AuthN) vs Authorization (AuthZ)",
        studentAnalogy: "Authentication is showing your student ID card at the college gate so security knows you are an enrolled student; Authorization is checking whether your student ID allows you inside the confidential examination question printing room.",
        industryUseCase: "When you log into an HR portal, AuthN verifies your corporate username and password; AuthZ checks the JWT claims or Active Directory group permissions to determine whether you can view everyone's salary or only your own."
      },
      {
        topicName: "Access Control Models: DAC, MAC, RBAC, ABAC",
        studentAnalogy: "RBAC is giving every 'Class Representative' permission to upload lab manuals, but every 'Regular Student' only permission to read them.",
        industryUseCase: "AWS IAM policies implement Attribute-Based Access Control (ABAC), granting engineers SSH access to EC2 production servers only if the user's `Department` tag matches the server's `Environment=Prod` tag during business hours."
      },
      {
        topicName: "Principle of Least Privilege (PoLP)",
        studentAnalogy: "Giving your friend the keys only to your bike lock, rather than handing them your entire bunch of keys including your bedroom, locker, and family car keys.",
        industryUseCase: "Instead of granting microservices root database credentials, each microservice receives a temporary scoped token with access restricted to only its specific database table (`orders` service cannot read `passwords` table)."
      },
      {
        topicName: "OAuth 2.0, OpenID Connect & Token Security",
        studentAnalogy: "Giving the valet parking driver a special plastic valet key that can only start the car and drive it to the parking bay, without opening your glove compartment or trunk.",
        industryUseCase: "When using 'Sign in with Google' on a third-party app, OIDC authenticates identity via an ID Token (JWT), while OAuth 2.0 provides an Access Token scoped strictly to `profile` and `email` without ever revealing your actual Google password."
      },
      {
        topicName: "Zero Trust Architecture (Never Trust, Always Verify)",
        studentAnalogy: "Even after you walk inside the college gates, every department door, library floor, and lab computer asks you to scan your student ID and verify your credentials every single time you want to enter.",
        industryUseCase: "Corporate laptops on internal office Wi-Fi are treated with zero implicit trust. Every single request to an internal application must verify device health, user identity, contextual location, and enforce microsegmentation."
      }
    ]
  },
  4: {
    caseStudy: {
      title: "Mirai Botnet DDoS Attack on Dyn DNS",
      incidentYear: "2016",
      targetEntity: "Dyn Managed DNS (Took down Twitter, Netflix, GitHub, Spotify)",
      summary: "Mirai scanned the internet for Internet of Things (IoT) consumer devices (CCTV cameras, DVRs, home routers) running telnet/SSH with factory default credentials (e.g. `admin/admin`, `root/xc3511`). It compromised over 300,000 devices into an automated botnet army, unleashing a massive 1.2 Tbps multi-vector DDoS attack (TCP SYN floods, UDP fragmentation floods, and DNS watermark floods) against Dyn's authoritative nameservers, crippling internet reachability for millions.",
      rootCause: "Millions of consumer IoT devices shipped with hardcoded, unchangeable default passwords directly exposed to the public internet on Telnet port 23; lack of distributed anycast DDoS filtering resilient to multi-terabit floods.",
      defenseTakeaway: "Mandate unique randomized passwords on connected hardware by law (e.g., California SB-327); disable Telnet in favor of SSH; deploy BGP Anycast DNS networks and automated upstream scrubbing centers (Cloudflare, AWS Shield)."
    },
    topicBreakdowns: [
      {
        topicName: "OSI 7-Layer Model vs TCP/IP 4-Layer Model",
        studentAnalogy: "Ordering food online: Physical cable (roads), IP layer (street address of hostel), TCP layer (delivery agent verifying order bag), Application layer (the hot biryani meal you eat).",
        industryUseCase: "Network security engineers isolate issues methodically: checking Layer 1 link lights, Layer 3 IP routing via BGP/OSPF, Layer 4 firewall port rules, up to Layer 7 WAF inspection for SQLi payloads."
      },
      {
        topicName: "IPv4 vs IPv6 Addressing, Subnetting & CIDR",
        studentAnalogy: "IPv4 is like old 10-digit mobile numbers running out of combinations; IPv6 gives every single grain of sand on planet Earth its own unique 128-bit mobile number.",
        industryUseCase: "Cloud architects design AWS VPC CIDR blocks (`10.0.0.0/16`) split into public subnets (`10.0.1.0/24`) for load balancers and private subnets (`10.0.10.0/24`) without internet gateways for database safety."
      },
      {
        topicName: "MAC Addresses & ARP Resolution",
        studentAnalogy: "Your Roll Number is your permanent physical MAC address tattooed on your student ID; your current hostel room number is your changeable IP address.",
        industryUseCase: "Dynamic ARP Inspection (DAI) on enterprise Cisco switches validates ARP packets against a trusted DHCP snooping database to prevent ARP Poisoning and Man-in-the-Middle credential interception."
      },
      {
        topicName: "TCP 3-Way Handshake (SYN, SYN-ACK, ACK) & Teardown",
        studentAnalogy: "Saying hello in the hallway: 'Hey, can you hear me?' (SYN) -> 'Yes, I hear you! Can you hear me?' (SYN-ACK) -> 'Awesome, yes I hear you, let's talk!' (ACK).",
        industryUseCase: "SYN Flood DDoS attacks attempt to overwhelm state tables by sending millions of SYN packets from spoofed IPs without ever completing the ACK. Firewalls deploy SYN Cookies to defer memory allocation until the handshake completes."
      },
      {
        topicName: "UDP vs TCP: Reliability vs Speed",
        studentAnalogy: "TCP is a registered speed-post letter requiring your signed return receipt; UDP is a radio broadcast playing a cricket commentary match where if you miss a second of audio, they don't stop the game to replay it.",
        industryUseCase: "VoIP calls (Zoom/Teams), video streaming, and DNS use UDP for microsecond latency without retransmission overhead; database transactions and HTTPS web browsing use TCP to ensure zero data corruption."
      },
      {
        topicName: "Well-known Ports (22, 53, 80, 443, 3389, 8080)",
        studentAnalogy: "Standard doors in a college building: Door 80 is the open cafeteria window; Door 443 is the bank teller counter with bulletproof glass; Door 22 is the locked administrative server room.",
        industryUseCase: "Perimeter firewalls explicitly block incoming Port 22 (SSH) and Port 3389 (RDP) from the public internet, forcing corporate engineers to connect through a secure VPN or identity-aware proxy."
      },
      {
        topicName: "DNS Resolution Architecture & DHCP Operations",
        studentAnalogy: "DNS is your smartphone's contact book: you know your friend's name 'Vikram', but the phone must look up his actual numeric phone number to place the call.",
        industryUseCase: "Enterprises deploy DNS sinkholes (e.g. Cisco Umbrella) that intercept internal DNS queries. If a host asks to resolve a known malware C2 domain, the DNS server returns a harmless local IP and alerts the SOC."
      },
      {
        topicName: "HTTP vs HTTPS (TLS Handshake overview)",
        studentAnalogy: "HTTP is writing your secret message on an open postcard that any mailman can read; HTTPS is locking your message inside a titanium lockbox that only the recipient has the key to unlock.",
        industryUseCase: "HSTS (HTTP Strict Transport Security) headers force web browsers to strictly communicate over TLS 1.3, encrypting sensitive session cookies and preventing SSL-stripping attacks on coffee shop public Wi-Fi."
      }
    ]
  },
  5: {
    caseStudy: {
      title: "Colonial Pipeline Ransomware & OT Network Segregation",
      incidentYear: "2021",
      targetEntity: "Colonial Pipeline (US Eastern Seaboard Fuel Supply)",
      summary: "DarkSide ransomware actors gained initial access through a single leaked password to an inactive legacy Virtual Private Network (VPN) account lacking multi-factor authentication. Although the ransomware encrypted only the IT corporate billing and administrative network, management shut down the physical 5,500-mile pipeline supplying 45% of East Coast fuel for 6 days due to uncertainty over whether malware could cross into the Operational Technology (OT) and SCADA industrial network.",
      rootCause: "Stale unused VPN account without MFA; lack of provable, auditable network segmentation and kill-switch isolation between IT enterprise networks and OT industrial pipeline control systems.",
      defenseTakeaway: "Decommission orphaned legacy VPN endpoints; enforce mandatory hardware MFA; implement strict unidirectional security gateways (data diodes) and air-gapped firewalls between IT and OT environments."
    },
    topicBreakdowns: [
      {
        topicName: "Stateful vs Stateless Firewalls & Next-Gen Firewalls (NGFW)",
        studentAnalogy: "A stateless bouncer checks your ID card every single time you step outside to take a breath; a stateful bouncer remembers you were stamped inside and lets you return seamlessly.",
        industryUseCase: "NGFWs (Palo Alto, Fortinet) perform Deep Packet Inspection (DPI) up to Layer 7, detecting malware payloads hidden inside legitimate HTTPS tunnels and blocking shadow IT applications regardless of which port they use."
      },
      {
        topicName: "Access Control Lists (Standard vs Extended ACLs)",
        studentAnalogy: "A hostel rule: 'Boys cannot enter the girls' wing after 8 PM' (Standard rule based on identity) vs 'Only registered library club members carrying biology textbooks may enter room 302 on Tuesday' (Extended rule based on protocol/time).",
        industryUseCase: "Network switches enforce extended ACLs to prevent compromised workstation subnets from initiating outbound connections to database ports (TCP 1433/5432) while allowing ICMP ping diagnostics."
      },
      {
        topicName: "Network Address Translation (NAT) & PAT",
        studentAnalogy: "Everyone in your apartment complex shares a single main mailing address at the front desk; the receptionist looks at the room number written on incoming packages and places it in your specific mailbox.",
        industryUseCase: "Cloud NAT gateways allow thousands of private EC2 or Kubernetes nodes to download security updates from the internet without exposing their private internal IP addresses to incoming internet threats."
      },
      {
        topicName: "VLANs & Zero-Trust Network Segmentation",
        studentAnalogy: "Building soundproof physical walls between the college music rehearsal room, the silent study library, and the chemistry lab so noise and hazards in one room never affect the others.",
        industryUseCase: "Hospitals place MRI machines and insulin pumps on an isolated VLAN with no access to the general hospital guest Wi-Fi or medical billing workstations, stopping ransomware from jumping to life-critical hardware."
      },
      {
        topicName: "Intrusion Detection Systems (IDS) vs Intrusion Prevention Systems (IPS)",
        studentAnalogy: "An IDS is a smoke alarm that beeps loudly when it detects fire but does nothing to stop it; an IPS is an automatic overhead sprinkler system that immediately douses the flames in water.",
        industryUseCase: "Suricata or Zeek deployed as an inline IPS actively resets TCP connections and drops malicious packets matching known Log4j or SQL injection exploit signatures in real-time."
      },
      {
        topicName: "Signature vs Anomaly-based Detection",
        studentAnalogy: "Signature detection is matching a known criminal's mugshot from a police photo album; Anomaly detection is noticing that a regular quiet student is suddenly sprinting across the campus roof at 3:00 AM wearing a ski mask.",
        industryUseCase: "Signature-based detection catches known malware hashes instantaneously; Anomaly-based machine learning flags when an HR employee's laptop suddenly transmits 50 GB of encrypted data to a Belarusian IP address at midnight."
      },
      {
        topicName: "Demilitarized Zone (DMZ) Architecture & Bastion Hosts",
        studentAnalogy: "The college security visitor lobby: visitors can sit in the glass waiting room and speak to the front desk, but they cannot freely wander into the professors' private cabins or student dormitories.",
        industryUseCase: "Public-facing e-commerce web servers reside in a DMZ; if an attacker compromises the web server via an application bug, firewall rules prevent the server from opening direct connections to internal databases."
      }
    ]
  },
  6: {
    caseStudy: {
      title: "Equifax Apache Struts Unpatched Server Breach",
      incidentYear: "2017",
      targetEntity: "Equifax (Major Credit Reporting Agency)",
      summary: "Attackers exploited a known Remote Code Execution (RCE) vulnerability in the Apache Struts web framework (CVE-2017-5638) on an online credit dispute portal. A patch had been available for over two months, but Equifax's internal vulnerability scanning failed to identify the vulnerable server due to incomplete asset inventories. The attackers executed command-line shell utilities (`whoami`, `netstat`, internal DB queries) over 76 days, stealing sensitive financial and personal data of 147 million consumers.",
      rootCause: "Incomplete asset inventory and failure to track software bill of materials (SBOM); expired SSL inspection certificate on an internal network traffic monitor that allowed exfiltration to go undetected for 2.5 months.",
      defenseTakeaway: "Implement automated software composition analysis (SCA); maintain continuous vulnerability scanning tied to CMDB asset management; automate certificate lifecycle renewals for deep packet inspection."
    },
    topicBreakdowns: [
      {
        topicName: "In-browser Simulated Command Prompt Environment",
        studentAnalogy: "Using a flight simulator to practice landing an aircraft in a thunderstorm without risking crashing a real multi-million dollar plane.",
        industryUseCase: "Cyber defense training ranges provide safe, isolated sandboxes for junior analysts to practice executing live triage and containment commands without impacting production business servers."
      },
      {
        topicName: "Network Interface Configuration (ipconfig / ifconfig)",
        studentAnalogy: "Looking at your student ID badge to read your full assigned name, roll number, hostel wing, and assigned locker location.",
        industryUseCase: "During incident triage, running `ipconfig /all` or `ip addr` reveals multihomed network interfaces, rogue virtual network adapters installed by VPN backdoors, and rogue DNS servers."
      },
      {
        topicName: "ICMP Diagnostics & Troubleshooting (ping)",
        studentAnalogy: "Calling out: 'Hey, are you awake?' across the hallway and waiting to hear if your friend replies: 'Yes, I'm awake!'",
        industryUseCase: "Automated network health checks ping critical server gateways every 30 seconds to alert on connectivity loss; security teams also monitor for ICMP tunneling where data is exfiltrated inside ping payloads."
      },
      {
        topicName: "Route Tracing & Hop Latency (tracert / traceroute)",
        studentAnalogy: "Tracking your courier parcel through every single transit hub: from Chennai warehouse, to Bangalore hub, to Mumbai airport, to your local delivery station.",
        industryUseCase: "Traceroute helps defenders identify BGP route hijacking, where rogue autonomous systems reroute corporate traffic through hostile international jurisdictions before forwarding it to the real destination."
      },
      {
        topicName: "DNS Resolution & Record Interrogation (nslookup)",
        studentAnalogy: "Dialing telephone directory assistance (197) to ask for the exact landline phone number registered to a specific government office.",
        industryUseCase: "Security analysts interrogate MX, TXT, and SPF records of incoming suspicious email sender domains to verify whether phishing emails originated from legitimate mail servers."
      },
      {
        topicName: "Active Network Sockets & Port Auditing (netstat)",
        studentAnalogy: "Walking around your hostel building at night with a flashlight to see which room windows have bright lights on and people talking inside.",
        industryUseCase: "Running `netstat -ano` instantly exposes rogue reverse shells: identifying an unauthorized outbound connection from `cmd.exe` or `powershell.exe` to an unknown foreign IP address."
      },
      {
        topicName: "Hardware Address Mapping (arp -a)",
        studentAnalogy: "The attendance register that links every student's printed name to their permanent physical student registration roll number.",
        industryUseCase: "Inspecting `arp -a` reveals ARP spoofing attacks: if two different IP addresses (e.g. the default gateway and an unknown laptop) share the exact same physical MAC address, an attacker is intercepting traffic."
      },
      {
        topicName: "User Security Context & Host Discovery (whoami, hostname, systeminfo)",
        studentAnalogy: "Waking up after a blackout and checking your wallet to remember your name, which building you are in, and what keys are in your pocket.",
        industryUseCase: "When attackers compromise a server, their very first commands are `whoami /priv` and `systeminfo` to discover whether they have administrator privileges or need to perform privilege escalation."
      }
    ]
  },
  7: {
    caseStudy: {
      title: "Dirty COW (CVE-2016-5195) Linux Kernel Privilege Escalation",
      incidentYear: "2016",
      targetEntity: "Billions of Linux servers, Android devices, and cloud nodes",
      summary: "A race condition vulnerability was discovered in the way the Linux kernel's memory subsystem handled the copy-on-write (COW) breakage of private read-only memory mappings. An unprivileged local user could write to read-only memory mappings, allowing attackers to overwrite `/etc/passwd` or root-owned SUID executables, escalating from an unprivileged user to full `root` administrator in less than 5 seconds.",
      rootCause: "Race condition in kernel memory management subsystem (`mm/gup.c`) allowing a read-only memory page to be written to while marked for copy-on-write.",
      defenseTakeaway: "Apply kernel security updates rapidly; enforce Kernel Self-Protection Project (KSPP) mitigations; run workloads with AppArmor or SELinux profiles restricting file system write capabilities even if root is compromised."
    },
    topicBreakdowns: [
      {
        topicName: "In-browser Simulated Linux Terminal Environment",
        studentAnalogy: "A chemistry laboratory computer simulation where you can mix volatile acids and test dangerous reactions without risking blowing up the actual school lab.",
        industryUseCase: "Engineers test automated bash hardening scripts and investigate synthetic malware intrusions inside containerized Linux sandboxes before applying changes across production server fleets."
      },
      {
        topicName: "Linux Filesystem Hierarchy (/etc, /var/log, /home, /bin)",
        studentAnalogy: "The campus layout: `/bin` is the toolshed where all shovels and lawnmowers are stored; `/etc` is the administrative office where rulebooks live; `/var/log` is the security guard's visitor sign-in register.",
        industryUseCase: "Security baselines lock down permissions so that only the `root` superuser can write to `/etc` or `/bin`, while auditing tools monitor `/var/log` for file tampering and unauthorized deletions."
      },
      {
        topicName: "POSIX File Permissions (rwx, octal notation 755, 600)",
        studentAnalogy: "755 is like putting your study notes on the library notice board (you can edit, everyone can read); 600 is keeping your private diary inside your locked personal drawer where only you have access.",
        industryUseCase: "SSH will outright refuse to use a private authentication key (`~/.ssh/id_rsa`) if its permissions are looser than `600`, preventing other unprivileged local users from stealing private cryptographic credentials."
      },
      {
        topicName: "SUID / SGID / Sticky Bit Security Implications",
        studentAnalogy: "A high-school student being handed the master principal's stamp to stamp hall tickets: if the student abuses that stamp, they can grant anyone permission to skip all exams.",
        industryUseCase: "Attackers scan Linux hosts for misconfigured SUID binaries (`chmod u+s /bin/bash` or `find / -perm -u=s`). If a program owned by root has a SUID bit, any user executing it inherits full root capabilities."
      },
      {
        topicName: "User & Group Management (/etc/passwd, /etc/shadow)",
        studentAnalogy: "The college student directory: `/etc/passwd` is the public year-book listing student names and departments; `/etc/shadow` is the vault containing locked student biometric fingerprint templates.",
        industryUseCase: "Linux security policies restrict read access to `/etc/shadow` exclusively to root. If an unprivileged user can read `/etc/shadow`, they can extract password hashes and run offline hashcat cracking attacks."
      },
      {
        topicName: "Process Inspection & Management (ps, top, kill)",
        studentAnalogy: "Walking into a college study hall and checking what every student is doing at their desk; immediately tapping the shoulder of someone playing loud video games and telling them to leave.",
        industryUseCase: "SOC analysts use `ps aux` and `top` to identify cryptominers running under names like `kworker` consuming 100% CPU, and immediately terminate them using `kill -9 <PID>`."
      },
      {
        topicName: "Linux Networking & Socket Diagnostics (ss, ip, netstat)",
        studentAnalogy: "Checking which telephone intercoms in the building are currently off the hook and actively connected to outside phone lines.",
        industryUseCase: "Running `ss -tulnp` displays all listening TCP/UDP ports alongside the exact process name and PID bound to that socket, exposing unauthorized reverse shells and backdoors."
      },
      {
        topicName: "Authentication Log Analysis (/var/log/auth.log, syslog)",
        studentAnalogy: "The night guard's gate entry register that logs every person who tried to enter the building, who entered the correct gate code, and who got turned away.",
        industryUseCase: "SIEM agents ingest `/var/log/auth.log` to trigger automated IP blacklists via `fail2ban` when more than 5 failed SSH password attempts occur within 60 seconds from the same source IP."
      }
    ]
  },
  8: {
    caseStudy: {
      title: "British Airways Magecart Web Skimming Attack",
      incidentYear: "2018",
      targetEntity: "British Airways (UK National Carrier)",
      summary: "Magecart Group 20 threat actors breached British Airways' web infrastructure and injected 22 lines of malicious JavaScript into the `modernizr-2.6.2.min.js` script loaded on the official ticket booking checkout page. Whenever customers submitted credit card numbers, CVVs, and billing addresses, the malicious script secretly cloned the form input data and exfiltrated it to a fraudulent look-alike domain (`baways.com`), harvesting 380,000 passenger payment cards over 15 days.",
      rootCause: "Lack of subresource integrity (SRI) checks on third-party JavaScript files; lack of strict Content Security Policy (CSP) restricting outbound HTTP POST destinations from checkout forms.",
      defenseTakeaway: "Enforce Subresource Integrity (SRI) hashes on all loaded JavaScript; implement strict Content Security Policy (`connect-src`); monitor DOM alterations and form event listeners via client-side security tools."
    },
    topicBreakdowns: [
      {
        topicName: "HTTP Request/Response Anatomy, Headers & Status Codes",
        studentAnalogy: "Ordering food at a counter: Your request has your order details and dietary preferences (Headers & Body); the cashier responds with '200 OK' (here is your burger) or '404 Not Found' (sorry, we are out of fries).",
        industryUseCase: "Security APIs inspect HTTP headers for anomalies (e.g. unexpected `User-Agent` strings from automated attack scrapers) and return strict `403 Forbidden` status codes to block unauthorized access."
      },
      {
        topicName: "Stateless HTTP, Cookies, Session IDs & JWTs",
        studentAnalogy: "Getting an ink stamp on your hand at a college music concert: every time you walk back past the security guard, you just flash your hand stamp instead of showing your ID card and ticket all over again.",
        industryUseCase: "Secure web apps store session tokens in cookies marked with `HttpOnly` (stops JavaScript theft via XSS), `Secure` (ensures transmission strictly over HTTPS), and `SameSite=Strict` (prevents CSRF exploits)."
      },
      {
        topicName: "Same-Origin Policy (SOP) & Cross-Origin Resource Sharing (CORS)",
        studentAnalogy: "A strict hostel rule that students living in Hostel A cannot walk into Hostel B and open their refrigerators unless Hostel B has signed an explicit guest permission letter.",
        industryUseCase: "Browsers enforce SOP so that malicious scripts running on `evil.com` cannot read sensitive bank balance data from `mybank.com`. Misconfigured CORS headers (`Access-Control-Allow-Origin: *` with credentials) violate this protection."
      },
      {
        topicName: "OWASP Top 10 Vulnerabilities Overview",
        studentAnalogy: "The ten most common safety hazards listed by the college campus safety board (broken fire exits, loose electrical wires, slippery stairs, missing fire extinguishers).",
        industryUseCase: "Development teams use OWASP Top 10 as their primary benchmark for secure coding standards, automated SAST/DAST pipeline scanning, and compliance audits required for SOC 2 and ISO 27001 certifications."
      },
      {
        topicName: "SQL Injection (SQLi) Mechanics & Parameterized Queries",
        studentAnalogy: "Filling out a student registration form and writing your name as: 'Rahul; DROP TABLE Students; --' so that when the administrative clerk blindly pastes it into their database, it deletes all student records.",
        industryUseCase: "Modern web applications use Parameterized Queries (Prepared Statements) or ORMs. The database engine treats user input strictly as inert literal data values, making it impossible for input to alter query logic."
      },
      {
        topicName: "Cross-Site Scripting (XSS): Stored, Reflected, DOM-based",
        studentAnalogy: "Writing an invisible ink message on the public library blackboard that forces anyone who reads it to shout out their ATM pin aloud to the whole room.",
        industryUseCase: "Attackers inject malicious `<script>` tags into comment forums (Stored XSS). When users view the page, the script executes inside their browser session, stealing their session cookies and hijacking their accounts."
      },
      {
        topicName: "Cross-Site Request Forgery (CSRF) & SameSite Cookie flags",
        studentAnalogy: "A trickster secretly slipping an unauthorized withdrawal form into your hand while you are already standing at the bank teller counter, getting the teller to transfer your money before you notice.",
        industryUseCase: "Web frameworks generate unique, cryptographically random Anti-CSRF tokens embedded in HTML forms. The server rejects state-changing POST requests unless the submitted token matches the user's active session."
      },
      {
        topicName: "Content Security Policy (CSP) & HTTP Security Headers",
        studentAnalogy: "A college building security policy stating that only textbooks published by Oxford University Press and approved faculty may be brought inside the study hall.",
        industryUseCase: "Deploying a strict CSP header (`Content-Security-Policy: default-src 'self'`) instructs browsers to refuse to execute inline scripts or load external assets from untrusted domains, neutralizing XSS attacks."
      }
    ]
  },
  9: {
    caseStudy: {
      title: "Operation Aurora & Cleartext Session Interception",
      incidentYear: "2009-2010",
      targetEntity: "Google, Adobe, and 30+ major Silicon Valley technology firms",
      summary: "A series of advanced cyber attacks conducted by the Elderwood Gang (PLA Unit 61398) targeted high-tech corporations to access source code repositories and monitor dissident Gmail accounts. The attackers leveraged zero-day Internet Explorer vulnerabilities and monitored internal corporate communications traversing unencrypted internal backbones. This watershed breach led Google to pioneer BeyondCorp (the foundational blueprint of modern Zero Trust architecture).",
      rootCause: "Implicit trust of internal corporate network perimeters; cleartext protocols traversing inter-datacenter links without end-to-end encryption; vulnerable legacy web browsers without sandboxing.",
      defenseTakeaway: "Mandate end-to-end encryption (TLS/mTLS) across all internal service meshes; eliminate implicit network trust boundaries; deprecate legacy cleartext protocols across all infrastructure."
    },
    topicBreakdowns: [
      {
        topicName: "Browser-based Packet-Analysis Simulator",
        studentAnalogy: "An interactive digital microscope in biology class where you can zoom into single cells and watch bacteria move without needing a biological specimen.",
        industryUseCase: "Security training academies use cloud packet simulators so analysts can dissect real malicious PCAP traces without accidentally triggering local antivirus or exposing sensitive network captures."
      },
      {
        topicName: "Synthetic PCAP Stream Inspection",
        studentAnalogy: "Listening to a recorded telephone tape recording of a conversation between two suspects to transcribe exactly what they agreed to do.",
        industryUseCase: "Network Forensics teams capture full PCAP data around high-value servers during an incident to reconstruct exact attacker payloads, exfiltrated files, and malware beaconing intervals."
      },
      {
        topicName: "Three-Pane Interface (Packet List, Packet Tree, Hex Dump)",
        studentAnalogy: "A medical file: Top pane lists all patient visits; middle pane breaks down the doctor's diagnosis by body system; bottom pane shows the raw blood test laboratory values.",
        industryUseCase: "Wireshark's top pane shows chronological packet flows; the middle pane dissects protocol headers layer-by-layer (Ethernet -> IP -> TCP -> HTTP); the bottom pane shows the raw hexadecimal payload bytes."
      },
      {
        topicName: "Wireshark Display Filters (ip.addr, tcp.port, http, dns)",
        studentAnalogy: "Using search filters on an online shopping store: clicking 'Brand: Nike', 'Size: 10', 'Color: Black' to find one specific shoe among 100,000 items.",
        industryUseCase: "During triage of a 5 GB network capture, analysts apply targeted display filters (`http.request.method == 'POST' && ip.dst == 198.51.100.50`) to isolate suspicious outbound data exfiltration in seconds."
      },
      {
        topicName: "Protocol Dissection (Ethernet, IP, TCP, UDP, DNS, HTTP)",
        studentAnalogy: "Opening a Russian nesting doll: The outer doll is the mail van (Ethernet), inside is the addressed parcel box (IP), inside is the bubble wrap (TCP), and inside is the actual handwritten letter (HTTP).",
        industryUseCase: "Dissectors break down raw binary frames into human-readable protocol fields, enabling analysts to inspect TCP sequence numbers, HTTP cookies, and DNS query response codes for protocol anomalies."
      },
      {
        topicName: "Following TCP Streams to Reconstruct Sessions",
        studentAnalogy: "Taking scattered jigsaw puzzle pieces of a printed letter and putting them together in order so you can read the entire message from start to finish.",
        industryUseCase: "Right-clicking a packet in Wireshark and selecting 'Follow TCP Stream' reassembles all fragmented packets into a continuous conversational view, revealing cleartext passwords, SQL queries, or shell commands."
      },
      {
        topicName: "Identifying Cleartext Credentials over Unencrypted Protocols",
        studentAnalogy: "Shouting your ATM card PIN out loud across a crowded railway station ticket counter for everyone in line to hear.",
        industryUseCase: "Running legacy protocols like FTP, Telnet, or plain HTTP on corporate networks exposes user credentials to anyone with a packet sniffer. Wireshark easily highlights `USER` and `PASS` commands in bright red text."
      },
      {
        topicName: "Spotting Port Scans, DNS Exfiltration & Malicious Payloads",
        studentAnalogy: "Watching a burglar run down a hotel corridor, jiggling the doorknob of room 101, 102, 103, 104 in rapid succession within 5 seconds.",
        industryUseCase: "Analysts identify SYN port scans by filtering for bursts of SYN packets with no corresponding ACKs, and detect DNS data exfiltration by spotting high volumes of strange subdomains (`exfil.data.malicious.com`)."
      }
    ]
  },
  10: {
    caseStudy: {
      title: "SolarWinds Supply Chain Network Firewall Failure",
      incidentYear: "2020",
      targetEntity: "SolarWinds Orion, US Treasury, Homeland Security, Fortune 500",
      summary: "Russian APT29 (Cozy Bear) hackers compromised the software build pipeline of SolarWinds Orion network management platform, injecting a trojanized backdoor (SUNBURST) into a digitally signed update. Over 18,000 customers installed the malicious update. Once inside victim networks, the backdoor remained dormant for two weeks before beaconing out over HTTPS to command-and-control domains (`avsvmcloud.com`). Because internal servers were permitted unrestricted outbound internet egress, the backdoor communicated freely.",
      rootCause: "Lack of strict outbound egress filtering on network management servers; core infrastructure servers allowed to make direct outbound DNS and HTTPS connections to arbitrary internet addresses.",
      defenseTakeaway: "Enforce strict outbound egress filtering on all internal production servers; restrict build servers and network appliances to explicitly whitelisted domains; monitor internal DNS queries for newly registered domains."
    },
    topicBreakdowns: [
      {
        topicName: "Interactive Firewall Simulator Workspace",
        studentAnalogy: "Practicing programming an automated building security gate in a model Lego city before installing the real iron gates at the university entrance.",
        industryUseCase: "Security engineers validate complex multi-tiered firewall rule proposals in virtual network simulation sandboxes to confirm they won't accidentally block legitimate customer web traffic."
      },
      {
        topicName: "Rule Parameters (Source, Destination, Protocol, Port, Action)",
        studentAnalogy: "A strict hostel pass: 'Student Rahul (Source) can go to City Library (Destination) using City Bus (Protocol) between 9 AM - 5 PM (Port) - Approved (Action)'.",
        industryUseCase: "Firewall rules explicitly define 5-tuples (Source IP, Destination IP, Protocol, Source Port, Destination Port) alongside the Action (ALLOW/DENY) to enforce granular boundary protection."
      },
      {
        topicName: "Action Types: ALLOW, DENY (Silent Drop vs Reject), LOG",
        studentAnalogy: "ALLOW lets you in with a smile; DENY (Drop) is a bouncer who ignores you completely and pretends you don't exist; REJECT is a bouncer who says 'Access Denied, go away!'; LOG writes your name down in the guard book.",
        industryUseCase: "Perimeter firewalls prefer Silent Drop (DENY) for untrusted internet scanners so attackers waste time waiting for connection timeouts without discovering whether the host even exists."
      },
      {
        topicName: "Rule Priority & Top-Down Evaluation Mechanics",
        studentAnalogy: "A list of house rules: Rule 1 says 'Nobody enters wearing shoes'. If someone tries to walk in with shoes, Rule 1 stops them immediately—the guard doesn't bother reading Rules 2 through 10.",
        industryUseCase: "Firewall engines evaluate rules from Rule #1 downward. As soon as a packet matches a rule's criteria, that action is taken immediately, and evaluation terminates."
      },
      {
        topicName: "Traffic Generation Engine & Live Packet Evaluation",
        studentAnalogy: "A fire drill where safety inspectors pump artificial harmless fog into hallways to test whether the smoke sensors and alarms trigger properly.",
        industryUseCase: "Red teams use packet injection tools (Scapy, Tcpreplay) to fire synthetic exploit packets against newly configured firewalls to verify that blocking rules work as intended."
      },
      {
        topicName: "Allowing Legitimate Corporate Services (DNS, Web, SSH)",
        studentAnalogy: "Setting up a dedicated express line at the canteen specifically for students who just want to buy bottled water so they don't get stuck behind 50 people ordering hot lunches.",
        industryUseCase: "Standard corporate egress policies open outbound TCP 80/443 for web traffic and UDP 53 to designated internal enterprise DNS resolvers, while blocking all direct outbound SMTP (Port 25) to prevent spam."
      },
      {
        topicName: "Blocking Malicious Subnets & Unauthorized Ports",
        studentAnalogy: "Hanging a 'Do Not Admit' list of banned troublemakers right at the club entrance door so security stops them before they even step inside.",
        industryUseCase: "Automated threat intelligence feeds dynamically push IP blacklists of known bulletproof hosting providers, Tor exit nodes, and active botnet C2 servers into firewall drop rules."
      },
      {
        topicName: "Rule Troubleshooting & Shadowing Conflict Resolution",
        studentAnalogy: "If Rule #1 says 'Allow all students into the building' and Rule #5 says 'Block students without uniforms', Rule #5 will NEVER work because Rule #1 already let everyone through!",
        industryUseCase: "Firewall analyzers audit rulebases for 'Shadowed Rules'—rules that can never trigger because a broader rule preceding them has already matched and processed the traffic."
      }
    ]
  },
  11: {
    caseStudy: {
      title: "Target Corp FireEye Alert Fatigue Disaster",
      incidentYear: "2013",
      targetEntity: "Target Corporation Security Operations Center",
      summary: "During the catastrophic Target breach, Target's state-of-the-art FireEye malware detection software actually detected the attackers' malware installation in real-time and generated automated CRITICAL priority alerts in the SOC console. However, the outsourced SOC monitoring team in Bangalore received hundreds of daily alerts, suffered from acute alert fatigue, and dismissed the intrusion notifications as routine false alarms without escalating them to Minneapolis headquarters.",
      rootCause: "Overwhelming volume of un-tuned alerts causing severe analyst fatigue; lack of clear escalation playbooks for critical alerts; failure of human verification procedures.",
      defenseTakeaway: "Tune SIEM/EDR detection rules to minimize false positives; establish mandatory automated escalation paths for critical severity alerts; deploy SOAR (Security Orchestration, Automation, and Response) tools."
    },
    topicBreakdowns: [
      {
        topicName: "Security Operations Center (SOC) Architecture & Roles (Tier 1, 2, 3)",
        studentAnalogy: "A multi-specialty hospital emergency room: Tier 1 is the triage nurse who takes your temperature and checks symptoms; Tier 2 is the attending physician who prescribes medicine; Tier 3 is the senior surgeon who performs emergency surgery.",
        industryUseCase: "Tier 1 SOC analysts review incoming SIEM alerts and filter out false alarms; Tier 2 analysts investigate confirmed incidents and contain threats; Tier 3 threat hunters hunt for stealthy adversaries."
      },
      {
        topicName: "SIEM (Security Information & Event Management) Platforms",
        studentAnalogy: "The central control room of a massive shopping mall that displays feeds from 200 CCTV cameras, fire sensors, elevator alarms, and door locks on one giant video wall.",
        industryUseCase: "Platforms like Splunk, Microsoft Sentinel, and IBM QRadar ingest gigabytes of logs per second from firewalls, Active Directory, AWS CloudTrail, and endpoints to correlate multi-stage attacks."
      },
      {
        topicName: "Synthetic Event Feed Triage (Failed Logins, Port Scans, Malware, C2)",
        studentAnalogy: "Sorting through your email inbox every morning: immediately archiving junk newsletters, marking important exam updates as high priority, and flagging suspicious scam messages.",
        industryUseCase: "Analysts triage event queues, distinguishing between benign noise (an employee who forgot their password 3 times) and malicious activity (10,000 failed logins from 500 rotating foreign IPs)."
      },
      {
        topicName: "Alert Severity Classification: LOW, MEDIUM, HIGH, CRITICAL",
        studentAnalogy: "LOW is a missing textbook; MEDIUM is a water leak in the hallway; HIGH is a small fire in a trash bin; CRITICAL is an active structural roof collapse.",
        industryUseCase: "A single failed SSH login is LOW; an unpatched external server scan is MEDIUM; an attempted exploit is HIGH; verified ransomware execution or domain controller compromise is CRITICAL."
      },
      {
        topicName: "Correlating Disparate Events into a Cohesive Security Incident",
        studentAnalogy: "Connecting clues like Sherlock Holmes: A missing key card at 10:00 PM + a side door opening at 10:05 PM + an alarm in the computer lab at 10:08 PM = a break-in in progress.",
        industryUseCase: "SIEM correlation rules link an initial phishing email click + an abnormal PowerShell spawn + an outbound beacon to an unknown IP into a single unified high-priority Incident ticket."
      },
      {
        topicName: "Investigating Suspicious External IPs & Domain Reputation",
        studentAnalogy: "Searching an unknown phone number on Truecaller and reading community comments: 'Warning! Known bank fraud scammer!' before deciding whether to call back.",
        industryUseCase: "Analysts query threat intelligence databases (VirusTotal, AlienVault OTX, AbuseIPDB) to check if an external IP is associated with known malware command-and-control infrastructure."
      },
      {
        topicName: "Standard Operating Procedures (SOPs) & Playbook Execution",
        studentAnalogy: "The printed emergency evacuation diagram on the back of every hotel door telling guests exactly where to walk if the fire bell rings.",
        industryUseCase: "When a 'Ransomware Detected' alert fires, the analyst opens the Ransomware Playbook: 1. Isolate endpoint from network, 2. Kill malicious process, 3. Capture RAM, 4. Notify incident commander."
      },
      {
        topicName: "Escalation Criteria & Incident Ticketing",
        studentAnalogy: "Knowing when a resident advisor in a hostel can handle a dispute personally versus when they must immediately wake up the campus director and call the police.",
        industryUseCase: "SOPs define explicit escalation thresholds: if an alert involves executive accounts, domain controllers, or confirmed customer data exfiltration, it must be escalated to Tier 2/3 within 15 minutes."
      }
    ]
  },
  12: {
    caseStudy: {
      title: "Maersk Shipping NotPetya Ransomware Incident Response",
      incidentYear: "2017",
      targetEntity: "A.P. Møller - Maersk (World's Largest Container Shipping Line)",
      summary: "NotPetya malware, launched by Russian GRU Sandworm against Ukrainian accounting software M.E.Doc, traversed Maersk's flat corporate network in minutes via EternalBlue and PsExec. It wiped 45,000 workstations, 4,000 servers, and all 140 global domain controllers, halting 76 port terminals worldwide. Maersk's incident response team executed an emergency global containment: disconnecting their entire international WAN in under 30 minutes, saving operational ships at sea from losing onboard navigation and logistics.",
      rootCause: "Flat, unsegmented global corporate network with trusted Active Directory replication; lack of an isolated, offline domain controller backup (the entire global company was restored from a single surviving domain controller in Ghana that happened to be offline during a power outage).",
      defenseTakeaway: "Implement isolated Active Directory recovery forests; maintain offline air-gapped backups of core identity infrastructure; practice emergency network disconnection and black-swan recovery drills."
    },
    topicBreakdowns: [
      {
        topicName: "Incident Response Frameworks: NIST SP 800-61 vs SANS 6-Step",
        studentAnalogy: "Following the Red Cross First Aid manual step-by-step: Check breathing, stop bleeding, bandage wound, transport to hospital, and review what caused the accident.",
        industryUseCase: "NIST SP 800-61 outlines the 4 standard IR phases: 1. Preparation, 2. Detection & Analysis, 3. Containment, Eradication & Recovery, 4. Post-Incident Activity."
      },
      {
        topicName: "Interactive Multi-Step Incident Scenarios",
        studentAnalogy: "A flight simulator training pilots how to recover when an engine catches fire mid-flight, giving them instant feedback on their choices.",
        industryUseCase: "Security teams participate in tabletop exercises and interactive breach simulators where they must make rapid containment decisions under simulated pressure and time constraints."
      },
      {
        topicName: "Step 1: Identification (Confirming True Positive & Scope)",
        studentAnalogy: "Checking whether a strange smell in the hostel kitchen is just someone burning toast or an actual gas cylinder leak before pulling the building fire alarm.",
        industryUseCase: "IR teams determine whether an EDR alert is a harmless developer test script (False Positive) or an active adversary, and identify how many endpoints across the enterprise are impacted."
      },
      {
        topicName: "Step 2: Containment (Short-term network isolation vs Long-term)",
        studentAnalogy: "Immediately locking the door of a room where a snake was spotted so it cannot slither into the bedrooms (Short-term), then sealing all wall cracks (Long-term).",
        industryUseCase: "Short-term containment uses EDR to sever a machine's network connectivity while preserving memory; Long-term containment patches the exploited firewall flaw and resets compromised domain passwords."
      },
      {
        topicName: "Step 3: Investigation (Root cause analysis & IOC harvesting)",
        studentAnalogy: "Detective work after a campus burglary: dusting for fingerprints, checking broken window latches, and reviewing security camera timestamps.",
        industryUseCase: "Forensic investigators extract file hashes, C2 IP addresses, and scheduled tasks to reconstruct the attacker's full path from initial phishing email to database dumping."
      },
      {
        topicName: "Step 4: Eradication (Removing malware artifacts & closing persistence)",
        studentAnalogy: "Deep-cleaning an apartment after a pest infestation: throwing away contaminated food, spraying insect repellent, and sealing all small entrance holes.",
        industryUseCase: "Eradication deletes all attacker web shells, revokes rogue Active Directory accounts, invalidates forged Kerberos tickets, and re-images compromised operating system images."
      },
      {
        topicName: "Step 5: Recovery (Restoring from clean verified backups & testing)",
        studentAnalogy: "Restoring your lost phone data from your cloud backup after ensuring that the malware app that crashed your phone is not included in the restored files.",
        industryUseCase: "Restoring servers from verified, immutable backups taken prior to the attacker's dwell date, followed by enhanced telemetry monitoring to confirm the adversary has not returned."
      },
      {
        topicName: "Step 6: Documentation (Chain of custody & Incident report)",
        studentAnalogy: "Writing an official police FIR report documenting the date, time, witnesses, and exact items stolen, without making speculative assumptions.",
        industryUseCase: "Incident responders produce formal technical and executive post-mortem reports detailing the breach timeline, business impact, cost estimates, and regulatory disclosure notifications."
      },
      {
        topicName: "Step 7: Prevent Recurrence (Lessons learned & control hardening)",
        studentAnalogy: "Installing a digital keyless smart lock on your hostel door after someone stole your physical brass key so it can never happen again.",
        industryUseCase: "The post-incident review meeting identifies systemic gaps that permitted the breach, allocating budget to deploy missing controls like MFA, EDR, or network microsegmentation."
      }
    ]
  },
  13: {
    caseStudy: {
      title: "Sony Pictures Entertainment Wiper Cyber Attack",
      incidentYear: "2014",
      targetEntity: "Sony Pictures Entertainment (Hollywood Studio)",
      summary: "North Korean state-sponsored threat actors (Lazarus Group / Guardians of Peace) breached Sony Pictures using spear-phishing emails targeting system administrators. The attackers dwelled inside the corporate network for months, mapping network infrastructure and harvesting credentials. They ultimately detonated custom Destover master boot record (MBR) wiper malware, permanently destroying thousands of hard drives and leaking confidential executive emails, unreleased movies, and employee salary spreadsheets.",
      rootCause: "Unencrypted plaintext spreadsheets containing thousands of administrative passwords stored on open network shares; lack of endpoint detection monitoring for mass file deletion or MBR modifications.",
      defenseTakeaway: "Deploy enterprise password managers and Privileged Access Management (PAM); enforce EDR blocking unauthorized modifications to the Master Boot Record; encrypt sensitive files at rest."
    },
    topicBreakdowns: [
      {
        topicName: "In-browser Simulated Forensic Investigation",
        studentAnalogy: "A virtual reality crime scene investigation game where you inspect footprints, broken glasses, and bloodstains with a magnifying glass.",
        industryUseCase: "Forensic students and analysts practice examining forensic disk images and memory dumps inside sandboxed laboratory environments without corrupting evidence integrity."
      },
      {
        topicName: "Digital Evidence Types (Volatile RAM vs Non-Volatile Disk)",
        studentAnalogy: "Volatile evidence is someone speaking words aloud in a room (disappears as soon as the sound waves stop); Non-volatile evidence is a signed letter written with fountain pen on paper.",
        industryUseCase: "Investigators prioritize dumping volatile RAM first using tools like WinPmem or FTK Imager before powering down machines, preserving running processes, injected DLLs, and plaintext encryption keys."
      },
      {
        topicName: "Windows Event Logs (Security.evtx: 4624 Logon, 4625 Failed Logon, 7045 New Service)",
        studentAnalogy: "The electronic hotel keycard log that records the exact minute a guest tapped their room door, entered the wrong pin, or ordered room service.",
        industryUseCase: "Event ID 4624 (Logon Type 10 = RDP, Type 3 = Network) proves how an attacker moved laterally; Event ID 7045 alerts defenders when malware installs itself as a persistent Windows service."
      },
      {
        topicName: "MACB Timestamps (Modified, Accessed, Created, Born)",
        studentAnalogy: "A book in the library: Date printed in factory (Born), date bought by library (Created), date a chapter was highlighted (Modified), date the book was last taken off the shelf (Accessed).",
        industryUseCase: "Forensic examiners analyze the $MFT (Master File Table) on NTFS drives to build a microscopic timeline of file interactions, establishing when malware landed and when sensitive data was read."
      },
      {
        topicName: "Timestomping & Antiforensics Detection",
        studentAnalogy: "A student caught cheating who scratches out the date on their paper and writes 'October 2021' to pretend the document was written years ago.",
        industryUseCase: "Adversaries modify standard `$STANDARD_INFORMATION` timestamps to make malware blend in with legitimate OS files. Forensic tools spot timestomping by comparing them with `$FILE_NAME` MFT timestamps."
      },
      {
        topicName: "Browser History & Cache Forensics (SQLite databases)",
        studentAnalogy: "Checking the browser history on a shared computer to see who searched for 'how to hack the college grading portal'.",
        industryUseCase: "Browsers store history, downloads, and search terms in SQLite databases (`places.sqlite`, `History`). Investigators parse these databases to prove whether an employee intentionally visited phishing websites."
      },
      {
        topicName: "Prefetch Files & Shimcache for Program Execution Proof",
        studentAnalogy: "Empty wrappers of chocolates found in your trash can that prove you ate those chocolates even if you washed your hands and brushed your teeth.",
        industryUseCase: "Even if an attacker deletes `mimikatz.exe`, the Windows Prefetch directory (`C:\\Windows\\Prefetch`) retains a `.pf` file recording the binary name, execution count, and the last 8 execution timestamps."
      },
      {
        topicName: "Reconstructing a Unified Breach Timeline",
        studentAnalogy: "Aligning CCTV footage, gate entry logs, and WhatsApp messages onto a single chronological chart to prove where a suspect was at 9:15 PM.",
        industryUseCase: "Analysts use log timeline tools (Plaso, Log2timeline) to correlate syslog, Windows event logs, network PCAP timestamps, and cloud audit logs into a single millisecond-accurate incident timeline."
      }
    ]
  },
  14: {
    caseStudy: {
      title: "Uber MFA Fatigue Social Engineering Breach",
      incidentYear: "2022",
      targetEntity: "Uber Technologies Inc.",
      summary: "An 18-year-old threat actor (affiliated with Lapsus$) purchased stolen Uber contractor credentials on the dark web. When prompted by Duo MFA, the attacker sent dozens of MFA push notifications repeatedly in the middle of the night (MFA Fatigue), then contacted the contractor via WhatsApp posing as Uber IT Security telling them: 'Accept the prompt to stop the spam'. Once inside, the attacker scanned internal network shares and discovered hardcoded admin credentials in a PowerShell script, obtaining full admin access to AWS, Google Workspace, and HackerOne.",
      rootCause: "Vulnerability of simple push-notification MFA to psychological fatigue attacks; hardcoded privileged administrative credentials stored in plaintext scripts on internal network shares.",
      defenseTakeaway: "Upgrade MFA from simple tap-to-approve push notifications to FIDO2 WebAuthn or Number Matching; deploy automated secret scanners to prevent credentials in scripts or repositories."
    },
    topicBreakdowns: [
      {
        topicName: "Information Security Policies: Acceptable Use (AUP), Password, Clean Desk",
        studentAnalogy: "Campus hostel rules: No smoking, no loud music after 10 PM, lock your room door when you leave, and don't share your room key with strangers.",
        industryUseCase: "An AUP establishes legally binding requirements that corporate laptops are exclusively for business duties, prohibiting the installation of unapproved software, peer-to-peer torrents, or external USB drives."
      },
      {
        topicName: "Incident Reporting Procedures & Whistleblower Protections",
        studentAnalogy: "An anonymous student suggestion box where you can report exam cheating or harassment without fearing retaliation from the culprits.",
        industryUseCase: "Organizations maintain dedicated security hotlines and email aliases (`security@company.com`) ensuring employees can promptly report suspicious emails or accidental data leaks without fear of punishment."
      },
      {
        topicName: "Data Protection Regulations: Digital Personal Data Protection (DPDP) Act & GDPR",
        studentAnalogy: "The strict privacy law protecting student medical and disciplinary files: the college cannot publish your medical reports on social media without your signed consent.",
        industryUseCase: "Regulations impose multi-million dollar penalties (up to €20M / 4% global turnover under GDPR, and ₹250 crore under India's DPDP Act) for failing to safeguard customer personal data or report breaches in time."
      },
      {
        topicName: "Third-Party Vendor Risk Management (TPRM)",
        studentAnalogy: "Before hiring an outside catering company for the college festival, checking their hygiene certificates, pest control records, and police background checks.",
        industryUseCase: "Security teams issue SOC 2 and ISO questionnaires to evaluate cloud SaaS vendors, ensuring a security flaw in a third-party billing vendor won't compromise the primary enterprise."
      },
      {
        topicName: "Security Awareness Programs & Continuous Phishing Simulation",
        studentAnalogy: "Unannounced mock fire drills conducted in the college library so students know exactly which exit stairs to take without panicking during a real fire.",
        industryUseCase: "Companies conduct periodic simulated phishing campaigns. Employees who fall for the simulation receive immediate interactive training on spotting fake sender domains and urgent bait lures."
      },
      {
        topicName: "Corporate Security Culture: Moving from Blame to Vigilance",
        studentAnalogy: "A teacher who praises a student for admitting: 'Sir, I accidentally spilled water on the lab keyboard' so it can be dried quickly, instead of yelling at them and causing them to hide it until it shorts out.",
        industryUseCase: "Blameless security cultures encourage staff to report mistakes immediately (e.g. clicking a phishing link). Early notification allows the SOC to isolate the laptop within 5 minutes instead of dwelling for months."
      },
      {
        topicName: "Real-World Corporate Breach Case Studies (SolarWinds, Equifax, Uber)",
        studentAnalogy: "Studying famous historical engineering failures (like the Tacoma Narrows Bridge collapse) to ensure civil engineering students never repeat the same design mistakes.",
        industryUseCase: "CISOs use real-world case studies in board presentations to justify cybersecurity investments in Zero Trust, MFA hardware keys, and privileged access management (PAM)."
      }
    ]
  },
  15: {
    caseStudy: {
      title: "AIIMS Delhi Hospital Critical Infrastructure Cyber Attack",
      incidentYear: "2022",
      targetEntity: "All India Institute of Medical Sciences (AIIMS) New Delhi",
      summary: "A devastating ransomware attack crippled the server infrastructure of AIIMS Delhi, knocking out the primary e-Hospital digital management system for over two weeks. Outpatient registrations, inpatient admissions, laboratory sample tracking, and billing were forced onto manual paper registers, disrupting medical care for tens of thousands of patients and compromising the health records of 30+ million citizens and senior government leaders.",
      rootCause: "Unsegmented hospital network connecting public Wi-Fi, lab equipment, and patient databases; unpatched server software; lack of zero-trust access controls on administrative endpoints.",
      defenseTakeaway: "Designate healthcare IT as critical national infrastructure; implement zero-trust network segmentation between medical equipment and core patient databases; conduct recurring vulnerability assessments."
    },
    topicBreakdowns: [
      {
        topicName: "Comprehensive Multi-Disciplinary Capstone Mission",
        studentAnalogy: "The final semester engineering design project where you combine everything you learned over 4 years: mechanics, electronics, coding, and teamwork into one working autonomous robot.",
        industryUseCase: "The Capstone challenge tests end-to-end operational cyber competence: validating an analyst's readiness to detect an APT, isolate endpoints, deploy firewall blocks, and brief executives under pressure."
      },
      {
        topicName: "Scenario: Coordinated APT Attack on National Critical Infrastructure",
        studentAnalogy: "A city-wide blackout drill where emergency response teams, police, hospitals, and power plants coordinate together to keep the city running during a disaster.",
        industryUseCase: "National cybersecurity agencies (CERT-In, CISA) conduct cyber defense exercises simulating nation-state cyber warfare against electrical power grids, water treatment plants, and banking networks."
      },
      {
        topicName: "Phase 1: Phishing Email Dissection & Header Forensics",
        studentAnalogy: "Examining the postmark, return address, and wax seal on a suspicious envelope delivered to the college director's desk.",
        industryUseCase: "Extracting the originating IP, SPF/DKIM verification failures, and embedded malicious hyper-links from the raw RFC 822 email headers of an executive-targeted spear-phishing lure."
      },
      {
        topicName: "Phase 2: Wireshark Packet Inspection & Beacon Detection",
        studentAnalogy: "Tuning a radio scanner to catch secret walkie-talkie chatter coming from an unauthorized trespasser inside the college perimeter.",
        industryUseCase: "Detecting anomalous outbound HTTPS sessions on non-standard ports exhibiting fixed-interval beaconing patterns indicative of an active Cobalt Strike or Empire C2 channel."
      },
      {
        topicName: "Phase 3: Emergency Firewall Rule Deployment",
        studentAnalogy: "Lowering the emergency blast doors of a bank vault to block access while alarms are sounding.",
        industryUseCase: "Writing and prepending high-priority stateful firewall drop rules to immediately sever an active adversary's command-and-control connection while preserving legitimate traffic."
      },
      {
        topicName: "Phase 4: CLI & Linux Terminal Host Forensics",
        studentAnalogy: "Using a master key to inspect every locker in the sports pavilion to find the hidden stolen trophy.",
        industryUseCase: "Executing surgical CLI commands to terminate malicious background processes, remove persistence registry keys, and verify system integrity on compromised production servers."
      },
      {
        topicName: "Phase 5: SOC SIEM Alert Triage & Root Cause Determination",
        studentAnalogy: "Piecing together the full timeline of how a campus prank was planned, funded, and carried out from scattered clues.",
        industryUseCase: "Synthesizing correlated alerts across firewall, proxy, endpoint, and identity logs into a defensible root cause analysis report explaining how the attacker gained initial access."
      },
      {
        topicName: "Phase 6: Incident Response Playbook Execution",
        studentAnalogy: "Carrying out the planned steps to evacuate a stadium safely and restore order without creating panic.",
        industryUseCase: "Executing the SANS 6-step incident response playbook to achieve complete adversary eradication, system recovery from clean snapshots, and verified resumption of operations."
      },
      {
        topicName: "Generation of Final Executive Cyber Readiness Report",
        studentAnalogy: "Receiving your official degree transcript showing your GPA, honors, and verified competencies across every subject.",
        industryUseCase: "Delivering an executive-ready cybersecurity audit report quantifying technical findings, business risk mitigation, and continuous defense recommendations for the board of directors."
      }
    ]
  }
};
