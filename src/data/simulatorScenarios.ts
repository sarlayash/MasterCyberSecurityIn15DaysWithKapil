export interface PacketItem {
  no: number;
  time: string;
  source: string;
  destination: string;
  protocol: 'TCP' | 'HTTP' | 'DNS' | 'ARP' | 'ICMP' | 'TLS';
  length: number;
  info: string;
  details: {
    frame: string;
    ethernet: { srcMac: string; dstMac: string; type: string };
    ip?: { srcIp: string; dstIp: string; ttl: number; proto: string };
    transport?: { srcPort: number; dstPort: number; flags?: string; seq?: number };
    application?: { summary: string; payload?: string; headers?: Record<string, string> };
  };
  hexDump: string;
}

export interface SocAlert {
  id: string;
  timestamp: string;
  sourceIp: string;
  destIp: string;
  eventType: string;
  summary: string;
  rawLog: string;
  correctSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  suggestedAction: string;
  explanation: string;
}

export interface PhishingEmail {
  id: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  replyTo: string;
  receivedDate: string;
  authHeaders: {
    spf: 'PASS' | 'FAIL' | 'SOFTFAIL' | 'NONE';
    dkim: 'PASS' | 'FAIL' | 'NONE';
    dmarc: 'PASS' | 'FAIL' | 'NONE';
  };
  bodyHtml: string;
  links: { text: string; displayUrl: string; actualUrl: string }[];
  attachments?: { filename: string; filetype: string; size: string; sandboxVerdict: string }[];
  correctVerdict: 'SAFE' | 'SUSPICIOUS' | 'MALICIOUS';
  indicators: string[];
  explanation: string;
}

// 1. Synthetic Wireshark Packets (Cleartext breach, port scan, DNS exfil)
export const SYNTHETIC_PACKETS: PacketItem[] = [
  {
    no: 1,
    time: "0.000000",
    source: "192.168.1.105",
    destination: "192.168.1.1",
    protocol: "ARP",
    length: 42,
    info: "Who has 192.168.1.1? Tell 192.168.1.105",
    details: {
      frame: "Frame 1: 42 bytes on wire (336 bits), 42 bytes captured",
      ethernet: { srcMac: "00:1A:2B:3C:4D:5E", dstMac: "FF:FF:FF:FF:FF:FF", type: "ARP (0x0806)" },
      application: { summary: "Address Resolution Protocol (request)" }
    },
    hexDump: "0000   ff ff ff ff ff ff 00 1a 2b 3c 4d 5e 08 06 00 01  ........+<M^....\n0010   08 00 06 04 00 01 00 1a 2b 3c 4d 5e c0 a8 01 69  ........+<M^...i\n0020   00 00 00 00 00 00 c0 a8 01 01                    .........."
  },
  {
    no: 2,
    time: "0.000124",
    source: "192.168.1.1",
    destination: "192.168.1.105",
    protocol: "ARP",
    length: 42,
    info: "192.168.1.1 is at 00:50:56:FE:ED:01",
    details: {
      frame: "Frame 2: 42 bytes on wire, 42 bytes captured",
      ethernet: { srcMac: "00:50:56:FE:ED:01", dstMac: "00:1A:2B:3C:4D:5E", type: "ARP (0x0806)" },
      application: { summary: "Address Resolution Protocol (reply)" }
    },
    hexDump: "0000   00 1a 2b 3c 4d 5e 00 50 56 fe ed 01 08 06 00 01  ..+<M^.PV.......\n0010   08 00 06 04 00 02 00 50 56 fe ed 01 c0 a8 01 01  .......PV.......\n0020   00 1a 2b 3c 4d 5e c0 a8 01 69                    ..+<M^...i"
  },
  {
    no: 3,
    time: "0.015230",
    source: "192.168.1.105",
    destination: "8.8.8.8",
    protocol: "DNS",
    length: 74,
    info: "Standard query 0x1a4b A sarlayash-auth.internal",
    details: {
      frame: "Frame 3: 74 bytes on wire, 74 bytes captured",
      ethernet: { srcMac: "00:1A:2B:3C:4D:5E", dstMac: "00:50:56:FE:ED:01", type: "IPv4 (0x0800)" },
      ip: { srcIp: "192.168.1.105", dstIp: "8.8.8.8", ttl: 64, proto: "UDP (17)" },
      transport: { srcPort: 54120, dstPort: 53 },
      application: { summary: "Domain Name System (query)", payload: "Queries: sarlayash-auth.internal: type A, class IN" }
    },
    hexDump: "0000   00 50 56 fe ed 01 00 1a 2b 3c 4d 5e 08 00 45 00  .PV.....+<M^..E.\n0010   00 3c 1a 4b 00 00 40 11 b8 e4 c0 a8 01 69 08 08  .<.K..@......i..\n0020   08 08 d3 68 00 35 00 28 d4 12 1a 4b 01 00 00 01  ...h.5.(...K....\n0030   00 00 00 00 00 00 0e 73 61 72 6c 61 79 61 73 68  .......sarlayash"
  },
  {
    no: 4,
    time: "0.018902",
    source: "8.8.8.8",
    destination: "192.168.1.105",
    protocol: "DNS",
    length: 90,
    info: "Standard query response 0x1a4b A 198.51.100.50",
    details: {
      frame: "Frame 4: 90 bytes on wire, 90 bytes captured",
      ethernet: { srcMac: "00:50:56:FE:ED:01", dstMac: "00:1A:2B:3C:4D:5E", type: "IPv4 (0x0800)" },
      ip: { srcIp: "8.8.8.8", dstIp: "192.168.1.105", ttl: 56, proto: "UDP (17)" },
      transport: { srcPort: 53, dstPort: 54120 },
      application: { summary: "Domain Name System (response)", payload: "Answers: sarlayash-auth.internal: type A, class IN, addr 198.51.100.50" }
    },
    hexDump: "0000   00 1a 2b 3c 4d 5e 00 50 56 fe ed 01 08 00 45 00  ..+<M^.PV.....E.\n0010   00 4c 1a 4c 00 00 38 11 c0 d4 08 08 08 08 c0 a8  .L.L..8.........\n0020   01 69 00 35 d3 68 00 38 e5 23 1a 4b 81 80 00 01  .i.5.h.8.#.K...."
  },
  {
    no: 5,
    time: "0.021004",
    source: "192.168.1.105",
    destination: "198.51.100.50",
    protocol: "TCP",
    length: 66,
    info: "54122 -> 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460",
    details: {
      frame: "Frame 5: 66 bytes on wire, 66 bytes captured",
      ethernet: { srcMac: "00:1A:2B:3C:4D:5E", dstMac: "00:50:56:FE:ED:01", type: "IPv4 (0x0800)" },
      ip: { srcIp: "192.168.1.105", dstIp: "198.51.100.50", ttl: 64, proto: "TCP (6)" },
      transport: { srcPort: 54122, dstPort: 80, flags: "[SYN]", seq: 0 },
      application: { summary: "Transmission Control Protocol (Connection Establishment)" }
    },
    hexDump: "0000   00 50 56 fe ed 01 00 1a 2b 3c 4d 5e 08 00 45 00  .PV.....+<M^..E.\n0010   00 34 2c 11 40 00 40 06 a5 f2 c0 a8 01 69 c6 33  .4,.@.@......i.3\n0020   64 32 d3 6a 00 50 a1 40 21 00 00 00 00 00 80 02  d2.j.P.@!......."
  },
  {
    no: 6,
    time: "0.024501",
    source: "198.51.100.50",
    destination: "192.168.1.105",
    protocol: "TCP",
    length: 66,
    info: "80 -> 54122 [SYN, ACK] Seq=0 Ack=1 Win=29200 Len=0",
    details: {
      frame: "Frame 6: 66 bytes on wire, 66 bytes captured",
      ethernet: { srcMac: "00:50:56:FE:ED:01", dstMac: "00:1A:2B:3C:4D:5E", type: "IPv4 (0x0800)" },
      ip: { srcIp: "198.51.100.50", dstIp: "192.168.1.105", ttl: 52, proto: "TCP (6)" },
      transport: { srcPort: 80, dstPort: 54122, flags: "[SYN, ACK]", seq: 0 },
      application: { summary: "Transmission Control Protocol (Server Response Handshake)" }
    },
    hexDump: "0000   00 1a 2b 3c 4d 5e 00 50 56 fe ed 01 08 00 45 00  ..+<M^.PV.....E.\n0010   00 34 00 00 40 00 34 06 d2 03 c6 33 64 32 c0 a8  .4..@.4....3d2..\n0020   01 69 00 50 d3 6a 3f 8a 12 01 a1 40 21 01 80 12  .i.P.j?....@!..."
  },
  {
    no: 7,
    time: "0.025110",
    source: "192.168.1.105",
    destination: "198.51.100.50",
    protocol: "TCP",
    length: 54,
    info: "54122 -> 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0",
    details: {
      frame: "Frame 7: 54 bytes on wire (Handshake Complete)",
      ethernet: { srcMac: "00:1A:2B:3C:4D:5E", dstMac: "00:50:56:FE:ED:01", type: "IPv4 (0x0800)" },
      ip: { srcIp: "192.168.1.105", dstIp: "198.51.100.50", ttl: 64, proto: "TCP (6)" },
      transport: { srcPort: 54122, dstPort: 80, flags: "[ACK]", seq: 1 },
      application: { summary: "Transmission Control Protocol (3-Way Handshake Established)" }
    },
    hexDump: "0000   00 50 56 fe ed 01 00 1a 2b 3c 4d 5e 08 00 45 00  .PV.....+<M^..E.\n0010   00 28 2c 12 40 00 40 06 a5 fd c0 a8 01 69 c6 33  .(,.@.@......i.3\n0020   64 32 d3 6a 00 50 a1 40 21 01 3f 8a 12 02 50 10  d2.j.P.@!.?...P."
  },
  {
    no: 8,
    time: "0.031200",
    source: "192.168.1.105",
    destination: "198.51.100.50",
    protocol: "HTTP",
    length: 312,
    info: "POST /login.php HTTP/1.1 (application/x-www-form-urlencoded)",
    details: {
      frame: "Frame 8: 312 bytes on wire (Suspicious unencrypted login over port 80)",
      ethernet: { srcMac: "00:1A:2B:3C:4D:5E", dstMac: "00:50:56:FE:ED:01", type: "IPv4 (0x0800)" },
      ip: { srcIp: "192.168.1.105", dstIp: "198.51.100.50", ttl: 64, proto: "TCP (6)" },
      transport: { srcPort: 54122, dstPort: 80, flags: "[PSH, ACK]" },
      application: {
        summary: "Hypertext Transfer Protocol",
        payload: "username=admin%40corp.internal&password=Winter2026%21Secured&submit=Login",
        headers: {
          "Host": "sarlayash-auth.internal",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": "73"
        }
      }
    },
    hexDump: "0000   00 50 56 fe ed 01 00 1a 2b 3c 4d 5e 08 00 45 00  .PV.....+<M^..E.\n0010   01 2a 2c 13 40 00 40 06 a4 f9 c0 a8 01 69 c6 33  .*,.@.@......i.3\n0020   64 32 d3 6a 00 50 a1 40 21 01 3f 8a 12 02 50 18  d2.j.P.@!.?...P.\n0030   70 53 54 20 2f 6c 6f 67 69 6e 2e 70 68 70 20 48  PST /login.php H\n0040   54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 73  TTP/1.1..Host: s\n0050   75 73 65 72 6e 61 6d 65 3d 61 64 6d 69 6e 25 34  username=admin%4\n0060   30 63 6f 72 70 2e 69 6e 74 65 72 6e 61 6c 26 70  0corp.internal&p\n0070   61 73 73 77 6f 72 64 3d 57 69 6e 74 65 72 32 30  assword=Winter20\n0080   32 36 25 32 31 53 65 63 75 72 65 64              26%21Secured"
  },
  {
    no: 9,
    time: "0.045100",
    source: "198.51.100.50",
    destination: "192.168.1.105",
    protocol: "HTTP",
    length: 220,
    info: "HTTP/1.1 200 OK (text/html)",
    details: {
      frame: "Frame 9: 220 bytes on wire (HTTP 200 OK)",
      ethernet: { srcMac: "00:50:56:FE:ED:01", dstMac: "00:1A:2B:3C:4D:5E", type: "IPv4 (0x0800)" },
      ip: { srcIp: "198.51.100.50", dstIp: "192.168.1.105", ttl: 52, proto: "TCP (6)" },
      transport: { srcPort: 80, dstPort: 54122, flags: "[PSH, ACK]" },
      application: {
        summary: "Hypertext Transfer Protocol",
        payload: "<html><body><h3>Login Authenticated. Welcome Admin!</h3><p>Session: 9f8a12e4</p></body></html>"
      }
    },
    hexDump: "0000   00 1a 2b 3c 4d 5e 00 50 56 fe ed 01 08 00 45 00  ..+<M^.PV.....E.\n0010   00 de 00 00 40 00 34 06 d1 59 c6 33 64 32 c0 a8  ....@.4..Y.3d2..\n0020   01 69 00 50 d3 6a 3f 8a 12 02 a1 40 22 2d 50 18  .i.P.j?....@\"-P."
  },
  {
    no: 10,
    time: "1.204512",
    source: "203.0.113.88",
    destination: "192.168.1.105",
    protocol: "TCP",
    length: 60,
    info: "4444 -> 49182 [SYN, ACK] Seq=0 Ack=1 Win=1024 Len=0",
    details: {
      frame: "Frame 10: 60 bytes on wire (Backdoor reverse shell confirmation)",
      ethernet: { srcMac: "00:50:56:FE:ED:01", dstMac: "00:1A:2B:3C:4D:5E", type: "IPv4 (0x0800)" },
      ip: { srcIp: "203.0.113.88", dstIp: "192.168.1.105", ttl: 48, proto: "TCP (6)" },
      transport: { srcPort: 4444, dstPort: 49182, flags: "[SYN, ACK]" },
      application: { summary: "Potential Metasploit/Netcat Reverse Shell Listener" }
    },
    hexDump: "0000   00 1a 2b 3c 4d 5e 00 50 56 fe ed 01 08 00 45 00  ..+<M^.PV.....E.\n0010   00 28 88 12 40 00 30 06 4c 11 cb 00 71 58 c0 a8  .(..@.0.L...qX..\n0020   01 69 11 5c c0 1e 00 00 00 00 a1 40 21 01 50 12  .i.\\.......@!.P."
  }
];

// 2. Synthetic SOC Alerts Feed
export const SYNTHETIC_SOC_ALERTS: SocAlert[] = [
  {
    id: "SOC-901",
    timestamp: "10:14:22 UTC",
    sourceIp: "198.51.100.23",
    destIp: "10.0.0.15 (SRV-SSH)",
    eventType: "Brute Force SSH Attack",
    summary: "Over 85 failed SSH attempts detected within 90 seconds from external IP 198.51.100.23 followed by a successful login for account 'deployer'.",
    rawLog: "sshd[4102]: Failed password for invalid user admin from 198.51.100.23 port 41200 ssh2\nsshd[4109]: Accepted password for deployer from 198.51.100.23 port 41288 ssh2",
    correctSeverity: "CRITICAL",
    suggestedAction: "Immediately revoke deployer SSH session, block 198.51.100.23 on edge firewall, rotate credentials, and isolate host.",
    explanation: "High-frequency failed logins culminating in a successful connection indicates a compromised account requiring immediate containment."
  },
  {
    id: "SOC-902",
    timestamp: "10:18:45 UTC",
    sourceIp: "192.168.1.105",
    destIp: "203.0.113.88",
    eventType: "Outbound C2 Beaconing",
    summary: "Workstation SEC-STATION-01 established persistent outbound TCP connection to suspicious external IP on non-standard port 4444.",
    rawLog: "EDR_EVENT: PID 4820 (powershell.exe) spawned by winword.exe initiated outbound TCP connection to 203.0.113.88:4444",
    correctSeverity: "HIGH",
    suggestedAction: "Isolate SEC-STATION-01 from network via EDR, terminate PID 4820, dump process memory, and inspect parent Word document.",
    explanation: "Word spawning PowerShell with outbound traffic on port 4444 is a classic weaponized macro reverse shell."
  },
  {
    id: "SOC-903",
    timestamp: "10:22:10 UTC",
    sourceIp: "10.0.0.8 (Scanner)",
    destIp: "10.0.0.0/24",
    eventType: "Internal Port Sweep",
    summary: "Routine Nessus vulnerability scan detected across internal subnet during scheduled maintenance window.",
    rawLog: "IDS_ALERT: TCP SYN scan detected originating from authorized scanner 10.0.0.8 (User: vulnerability_scanner_service)",
    correctSeverity: "LOW",
    suggestedAction: "Verify with Change Management schedule and tag alert as authorized internal scan (False Positive).",
    explanation: "Authorized internal vulnerability scans match expected security maintenance and require validation rather than host quarantine."
  },
  {
    id: "SOC-904",
    timestamp: "10:25:30 UTC",
    sourceIp: "192.168.1.84",
    destIp: "192.168.1.200 (DC-01)",
    eventType: "LSASS Memory Access (Mimikatz)",
    summary: "Unauthorized handle opened to LSASS process with PROCESS_VM_READ permissions on endpoint FIN-LAPTOP-12.",
    rawLog: "SYS_MON: EventID 10 - SourceImage: C:\\Temp\\mimi.exe TargetImage: C:\\Windows\\System32\\lsass.exe GrantedAccess: 0x1010",
    correctSeverity: "CRITICAL",
    suggestedAction: "Isolate FIN-LAPTOP-12 immediately, force domain-wide password reset for accounts logged into that endpoint, and audit Kerberos tickets.",
    explanation: "Direct memory reading of LSASS indicates active credential dumping to steal domain hashes."
  },
  {
    id: "SOC-905",
    timestamp: "10:30:15 UTC",
    sourceIp: "192.168.1.50",
    destIp: "mail.phish-domain.top",
    eventType: "Phishing Link Clicked",
    summary: "User 'anita.sharma' clicked a categorized suspicious link from an external email claiming account suspension.",
    rawLog: "PROXY_LOG: 192.168.1.50 GET https://login-microsoft-secure.verify-account.top/auth [Referer: Outlook Web Client]",
    correctSeverity: "HIGH",
    suggestedAction: "Revoke Anita's active OAuth tokens, force MFA re-authentication, check proxy logs for submitted POST credentials, block domain globally.",
    explanation: "Clicking a spear-phishing credential harvesting link puts corporate tenant credentials at immediate risk."
  }
];

// 3. Phishing Analyzer Synthetic Emails (Including $18.5M inheritance scenario from PDF Section 11!)
export const SYNTHETIC_PHISHING_EMAILS: PhishingEmail[] = [
  {
    id: "phish-01",
    subject: "STRICTLY CONFIDENTIAL: Claim Your $18,500,000.00 USD Inheritance Transfer",
    senderName: "Barrister Anthony Williams (Esq.)",
    senderEmail: "anthony.williams.legal@mail-private-finance-online.com",
    replyTo: "claims.dept19827@gmail.com",
    receivedDate: "Today, 03:14 AM",
    authHeaders: {
      spf: "FAIL",
      dkim: "NONE",
      dmarc: "FAIL"
    },
    bodyHtml: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <p><strong>DEAR RESPECTED BENEFICIARY,</strong></p>
        <p>I am Barrister Anthony Williams, personal legal attorney to the late Engr. Marcus Bennett who passed away leaving an unclaimed estate portfolio valued at <strong>$18,500,000.00 USD (Eighteen Million, Five Hundred Thousand United States Dollars)</strong> deposited in an offshore escrow security vault.</p>
        <p>Due to banking statutory regulations, if this fund remains unclaimed within the next 48 hours, the government treasury will confiscate the total sum. You share the exact surname and origin, and with your full cooperation, I can legally present you as the next-of-kin.</p>
        <p>You will receive <strong>40% of the total funds</strong> for your partnership. Please reply IMMEDIATELY with:</p>
        <ul>
          <li>Full Legal Name</li>
          <li>Confidential Mobile Number</li>
          <li>Copy of Passport / National ID</li>
          <li>Direct Bank Account Details</li>
        </ul>
        <p><a href="http://claim-vault-portal.online-escrow-update.ru/verify" style="color: #0284c7; font-weight: bold;">Click Here to Access Secure Escrow Verification Chamber</a></p>
        <p>Yours in Confidentiality,<br><strong>Barrister Anthony Williams</strong><br>Senior Partner, Apex Legal Chambers</p>
      </div>
    `,
    links: [
      {
        text: "Click Here to Access Secure Escrow Verification Chamber",
        displayUrl: "http://claim-vault-portal.online-escrow-update.ru/verify",
        actualUrl: "http://claim-vault-portal.online-escrow-update.ru/verify?steal_creds=1"
      }
    ],
    attachments: [
      {
        filename: "Deed_of_Deposit_18.5M.pdf.exe",
        filetype: "Executable Binary (.exe disguised as .pdf)",
        size: "4.2 MB",
        sandboxVerdict: "MALICIOUS (Contains Trojan.GenericDropper payload)"
      }
    ],
    correctVerdict: "MALICIOUS",
    indicators: [
      "Financial bait: Unrealistic $18.5M inheritance lure",
      "SPF & DMARC verification FAIL",
      "Reply-To mismatch (sending domain is fake financial entity, reply goes to personal @gmail.com)",
      "Artificial urgency (claim within 48 hours or forfeit)",
      "Disguised double-extension attachment (.pdf.exe executable)",
      "Suspicious external link targeting Russian (.ru) top-level domain"
    ],
    explanation: "Classic 419 advance-fee fraud and credential theft combined with malware delivery via double-extension executable."
  },
  {
    id: "phish-02",
    subject: "URGENT: Microsoft 365 Password Expiration Notification (Action Required in 2 Hours)",
    senderName: "IT Security Helpdesk",
    senderEmail: "helpdesk@corporate-support-auth.com",
    replyTo: "no-reply@corporate-support-auth.com",
    receivedDate: "Today, 09:21 AM",
    authHeaders: {
      spf: "PASS",
      dkim: "PASS",
      dmarc: "NONE"
    },
    bodyHtml: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <p style="color: #dc2626; font-weight: bold;">SECURITY ALERT: Password Expiring Today</p>
        <p>Dear Employee,</p>
        <p>Your Microsoft 365 corporate single-sign-on password will expire in <strong>2 hours</strong>. Failure to update your password immediately will lock your access to corporate email, Teams, and VPN services.</p>
        <p>To retain your existing credentials or set a new compliant password, please click the secure portal link below:</p>
        <p style="margin: 20px 0;">
          <a href="https://login.microsoftonline.portal-update-auth365.xyz" style="background: #0284c7; color: white; padding: 10px 18px; border-radius: 4px; text-decoration: none; display: inline-block;">Keep Current Password</a>
        </p>
        <p style="font-size: 12px; color: #6b7280;">This is an automated system notification from the IT Global Security Team.</p>
      </div>
    `,
    links: [
      {
        text: "Keep Current Password",
        displayUrl: "https://login.microsoftonline.portal-update-auth365.xyz",
        actualUrl: "https://login.microsoftonline.portal-update-auth365.xyz/login?session=capture"
      }
    ],
    correctVerdict: "MALICIOUS",
    indicators: [
      "Domain spoofing / lookalike domain: `portal-update-auth365.xyz` attempting to mimic Microsoft Online",
      "Extreme psychological urgency ('Action Required in 2 Hours')",
      "Credential harvesting button: legitimate IT systems never offer a 'Keep Current Password' link when a password is expiring",
      "Sender domain `corporate-support-auth.com` is not the internal corporate domain"
    ],
    explanation: "Targeted spear-phishing credential harvesting page designed to steal corporate credentials and bypass MFA via reverse proxy."
  },
  {
    id: "phish-03",
    subject: "Scheduled Network Maintenance: Sunday 02:00 - 04:00 IST",
    senderName: "SarlaYash Mission IT Infrastructure",
    senderEmail: "infra@sarlayash.org",
    replyTo: "infra@sarlayash.org",
    receivedDate: "Yesterday, 04:30 PM",
    authHeaders: {
      spf: "PASS",
      dkim: "PASS",
      dmarc: "PASS"
    },
    bodyHtml: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <p>Dear Team,</p>
        <p>Please be advised that scheduled core switch firmware updates will be conducted this Sunday between 02:00 and 04:00 IST. Internal intranet lab environments may experience brief 5-minute interruptions during this maintenance window.</p>
        <p>No user action is required. If you encounter connectivity issues following the maintenance, please log a ticket on the internal Service Desk portal at <code>https://servicedesk.sarlayash.org</code>.</p>
        <p>Regards,<br><strong>SarlaYash Infrastructure Team</strong></p>
      </div>
    `,
    links: [
      {
        text: "https://servicedesk.sarlayash.org",
        displayUrl: "https://servicedesk.sarlayash.org",
        actualUrl: "https://servicedesk.sarlayash.org"
      }
    ],
    correctVerdict: "SAFE",
    indicators: [
      "Authentic organizational domain: `sarlayash.org`",
      "SPF, DKIM, and DMARC all return PASS",
      "No urgency, threats, or demands for credentials/passwords",
      "Legitimate internal link matches destination URL exactly",
      "Standard organizational communication style"
    ],
    explanation: "Authentic, verified internal communication meeting all cryptographic email security standards."
  }
];

