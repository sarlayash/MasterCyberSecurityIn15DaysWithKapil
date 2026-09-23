import { HistoricalCyberAttack } from '../types';

export const HISTORICAL_CYBER_ATTACKS: HistoricalCyberAttack[] = [
  // ==========================================
  // INDIA CYBER ATTACKS (LAST 10 YEARS)
  // ==========================================
  {
    id: 'attack-india-aiims-2022',
    name: 'AIIMS Delhi Ransomware Strike',
    year: 2022,
    region: 'India',
    target: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
    sector: 'Healthcare',
    threatActor: 'Suspected State-Sponsored Ransomware Syndicate',
    attackVector: 'Unsegmented network traversal, unpatched external servers, compromised remote credentials',
    financialOrOperationalImpact: 'Over 40 million patient records compromised; OPD and emergency services reverted to manual paper registers for nearly two weeks; massive national security concern.',
    rootCauseVulnerability: 'Flat, unsegmented internal network architecture, lack of endpoint EDR visibility, and outdated server patches allowed lateral movement across hospital clusters.',
    avoidanceBlueprint: [
      'Implement strict Network Microsegmentation isolating OPD clinical records from core database clusters and administrative networks.',
      'Deploy modern Endpoint Detection and Response (EDR) agents to detect behavioral encryption attempts in real time.',
      'Maintain immutable, air-gapped offline backups with regular disaster recovery restoration drills.',
      'Enforce mandatory Multi-Factor Authentication (MFA) across all remote access gateways and medical portal logins.'
    ],
    technicalRemediation: 'Network Microsegmentation (VLAN/firewall boundary), Immutable Air-Gapped Backups, Centralized EDR & SIEM log forwarding.'
  },
  {
    id: 'attack-india-cosmos-2018',
    name: 'Cosmos Bank Pune Cyber ATM Heist',
    year: 2018,
    region: 'India',
    target: 'Cosmos Co-operative Bank, Pune',
    sector: 'Banking',
    threatActor: 'Lazarus Group / Advanced Cyber Crime Cartel',
    attackVector: 'Malware proxy injected into the central ATM Switch / Core Banking System (CBS) interface',
    financialOrOperationalImpact: '₹94 Crore ($13.5M USD) siphoned across 28 countries within two hours via thousands of synchronized unauthorized ATM withdrawals, followed by fraudulent SWIFT transactions.',
    rootCauseVulnerability: 'Adversaries bypassed the core banking server by deploying a rogue ATM switch proxy server that automatically returned "Approved" responses for counterfeit clone cards.',
    avoidanceBlueprint: [
      'Enforce Hardware Security Module (HSM) cryptographic signature validation on all ATM switch authorization request packets.',
      'Deploy real-time transaction velocity anomaly detection engines to flag simultaneous global cash-out bursts.',
      'Implement strict Network Segmentation between internal server networks and the SWIFT/ATM processing environment.',
      'Regular third-party red teaming and continuous vulnerability audits on payment middleware.'
    ],
    technicalRemediation: 'HSM Cryptographic Message Verification, Payment Switch Anomaly Throttling, Isolated SWIFT Enclaves.'
  },
  {
    id: 'attack-india-kudankulam-2019',
    name: 'Kudankulam Nuclear Plant Dtrack Intrusion',
    year: 2019,
    region: 'India',
    target: 'Nuclear Power Corporation of India Limited (NPCIL), Kudankulam',
    sector: 'Critical Infrastructure',
    threatActor: 'Lazarus Group (APT38)',
    attackVector: 'Dtrack spyware payload delivered via spear-phishing and infected USB drive into administrative IT network',
    financialOrOperationalImpact: 'Administrative IT network compromised; sensitive internal network topology and documentation harvested; prompted nationwide review of critical nuclear infrastructure security.',
    rootCauseVulnerability: 'Failure to strictly enforce USB port lockdown policies and employee susceptibility to targeted spear-phishing emails.',
    avoidanceBlueprint: [
      'Maintain an uncompromising physical and logical air gap between administrative IT networks and Operational Technology (OT) / SCADA reactor control systems.',
      'Enforce strict endpoint port lockdown with hardware USB blocking policies and data diodes.',
      'Implement application whitelisting allowing only cryptographically signed binaries to execute on critical endpoints.',
      'Rigorous continuous spear-phishing simulation and employee threat awareness training.'
    ],
    technicalRemediation: 'Air-Gap Architecture, Data Diodes, USB Whitelisting & Endpoint Application Control.'
  },
  {
    id: 'attack-india-air-india-2021',
    name: 'Air India SITA Passenger Data Breach',
    year: 2021,
    region: 'India',
    target: 'Air India (via SITA PSS Supply Chain)',
    sector: 'Aviation',
    threatActor: 'APT41 (Winnti Group)',
    attackVector: 'Third-party supply chain compromise of SITA Passenger Service System (PSS)',
    financialOrOperationalImpact: '4.5 million passenger records leaked spanning 10 years, including full names, dates of birth, passport details, ticket info, and frequent flyer data.',
    rootCauseVulnerability: 'Over-reliance on third-party SaaS vendors without continuous egress monitoring; adversary dwell time inside SITA network exceeded 20 days.',
    avoidanceBlueprint: [
      'Implement Zero Trust Third-Party Vendor Risk Management with continuous security posture verification.',
      'Enforce database-level column encryption for sensitive Personally Identifiable Information (PII) and passport data.',
      'Deploy egress network traffic monitoring to flag abnormal bulk data exfiltration over encrypted tunnels.',
      'Enforce shortest data retention policies: purge historical customer data older than regulatory limits.'
    ],
    technicalRemediation: 'Field-Level Data Encryption, Third-Party Zero Trust Access, SIEM Egress Traffic Baselines.'
  },
  {
    id: 'attack-india-union-bank-2016',
    name: 'Union Bank of India SWIFT Incident',
    year: 2016,
    region: 'India',
    target: 'Union Bank of India, Mumbai',
    sector: 'Banking',
    threatActor: 'Lazarus Group Syndicate',
    attackVector: 'Spear-phishing email with malicious macro-enabled attachment opened by bank official',
    financialOrOperationalImpact: '$171 Million USD in fraudulent SWIFT transfers initiated; rapid intervention by bank and RBI security teams successfully recovered almost all funds.',
    rootCauseVulnerability: 'Lack of endpoint isolation on computers handling sensitive SWIFT transaction messaging; macro execution permitted in email client.',
    avoidanceBlueprint: [
      'Dedicate isolated Privileged Access Workstations (PAWs) exclusively for SWIFT transactions with no web browsing or email access.',
      'Disable Microsoft Office macro execution from untrusted and internet-received files by default across enterprise GPOs.',
      'Enforce dual-custody / dual-authorization protocols where high-value transfers require independent cryptographic tokens.',
      'Implement real-time SWIFT transaction monitoring with automated out-of-band approvals for cross-border wires.'
    ],
    technicalRemediation: 'Privileged Access Workstations (PAWs), Macro GPO Hardening, Dual-Custody SWIFT Cryptographic Tokens.'
  },
  {
    id: 'attack-india-mumbai-grid-2020',
    name: 'Maharashtra Power Grid Cyber Infiltration',
    year: 2020,
    region: 'India',
    target: 'State Load Despatch Centre (SLDC), Maharashtra',
    sector: 'Critical Infrastructure',
    threatActor: 'RedEcho (Suspected State-Sponsored Chinese APT)',
    attackVector: 'ShadowPad modular malware implant deployed via unpatched internet-facing servers',
    financialOrOperationalImpact: 'Adversary established persistent backdoors across 14 state load dispatch and electricity distribution nodes; triggered heightened national grid alert.',
    rootCauseVulnerability: 'Internet-connected dispatch centers running unpatched legacy firmware without intrusion detection systems on SCADA boundaries.',
    avoidanceBlueprint: [
      'Completely isolate State Load Despatch SCADA servers from public internet routing using unidirectional security gateways.',
      'Deploy Network Intrusion Detection Systems (NIDS) with signature rules for advanced modular malware like ShadowPad.',
      'Conduct regular vulnerability assessments and mandate timely patch lifecycles for all operational substation hardware.',
      'Establish a 24/7 dedicated Power Sector Computer Emergency Response Team (CERT-Thermal/Hydro/Grid).'
    ],
    technicalRemediation: 'Unidirectional Gateways (Data Diodes), SCADA Intrusion Detection, Automated Patch Management.'
  },
  {
    id: 'attack-india-cowin-scraping-2023',
    name: 'CoWIN / Citizen Data Scraping Incident',
    year: 2023,
    region: 'India',
    target: 'Public Health & Citizen Vaccine Telemetry',
    sector: 'Government',
    threatActor: 'Opportunistic Threat Actors & Telegram Scraping Bots',
    attackVector: 'Abuse of unthrottled internal partner API endpoints and compromised partner dashboard credentials',
    financialOrOperationalImpact: 'Citizen Aadhaar, passport, and phone number records exposed via Telegram search bots; created widespread public concern regarding API data exposure.',
    rootCauseVulnerability: 'Missing rate-limiting, absence of API gateway anomaly detection, and lack of dynamic token masking on partner verification endpoints.',
    avoidanceBlueprint: [
      'Enforce strict API Gateway rate limiting, throttling, and IP reputation filtering to prevent automated bulk scraping.',
      'Implement dynamic data masking: never expose full Aadhaar or passport numbers in API responses—mask all but last 4 digits.',
      'Enforce Mutual TLS (mTLS) and short-lived OAuth 2.0 access tokens for third-party institutional partner integrations.',
      'Deploy API security monitoring (e.g., OWASP API Security Top 10 defenses) to detect scraping anomalies.'
    ],
    technicalRemediation: 'API Gateway Throttling, Dynamic PII Masking, Mutual TLS (mTLS), OWASP API Defense.'
  },

  // ==========================================
  // GLOBAL CYBER ATTACKS (LAST 10 YEARS)
  // ==========================================
  {
    id: 'attack-global-solarwinds-2020',
    name: 'SolarWinds Orion Supply Chain Breach',
    year: 2020,
    region: 'Global',
    target: 'SolarWinds Orion, US Federal Agencies (Treasury, Homeland Security), Fortune 500 Enterprises',
    sector: 'Tech',
    threatActor: 'APT29 / Cozy Bear (Russian SVR)',
    attackVector: 'Supply chain injection: SUNBURST backdoor inserted into official SolarWinds build pipeline and distributed via digitally signed updates',
    financialOrOperationalImpact: 'Over 18,000 global customers downloaded the compromised update; top-tier US federal departments and corporate giants monitored for 9+ months.',
    rootCauseVulnerability: 'Inadequate build environment isolation; attackers compromised SolarWinds internal network and modified source code prior to compilation.',
    avoidanceBlueprint: [
      'Implement Hermetic & Reproducible Build Pipelines where source code is compiled in isolated, ephemeral sandboxes.',
      'Employ multi-party cryptographically validated code reviews and pipeline integrity hashing.',
      'Enforce strict egress firewall rules: network monitoring servers should NEVER be permitted to establish outbound internet connections.',
      'Monitor DNS resolution telemetry for high-entropy DGA subdomains (used by SUNBURST for C2 beaconing).'
    ],
    technicalRemediation: 'Reproducible Build Environments, Zero-Egress Server Policies, DNS Beaconing Anomaly Detection.'
  },
  {
    id: 'attack-global-colonial-2021',
    name: 'Colonial Pipeline Ransomware Shutdown',
    year: 2021,
    region: 'Global',
    target: 'Colonial Pipeline, United States',
    sector: 'Critical Infrastructure',
    threatActor: 'DarkSide Ransomware Cartel',
    attackVector: 'Credential stuffing attack exploiting a single leaked legacy VPN account password lacking Multi-Factor Authentication',
    financialOrOperationalImpact: '5,500 miles of fuel pipeline halted for 6 days; widespread panic buying and gas shortages across the US East Coast; $4.4M ransom paid (partially recovered).',
    rootCauseVulnerability: 'Inactive, legacy corporate VPN account had not been decommissioned and did NOT have MFA enabled.',
    avoidanceBlueprint: [
      'Universal Multi-Factor Authentication (MFA) enforcement across 100% of remote access gateways with zero legacy exceptions.',
      'Automated Identity Governance: immediately revoke and decommission inactive accounts and stale VPN profiles.',
      'Robust Network Segmentation: complete logical and physical isolation between corporate IT billing networks and OT pipeline operation networks.',
      'Continuous dark web credential monitoring to alert on leaked corporate credentials before adversaries exploit them.'
    ],
    technicalRemediation: 'Universal FIDO2/MFA, Stale Account Offboarding Automation, IT/OT Air-Gapped Segmentation.'
  },
  {
    id: 'attack-global-wannacry-2017',
    name: 'WannaCry Global Ransomware Epidemic',
    year: 2017,
    region: 'Global',
    target: 'UK National Health Service (NHS), FedEx, Telefónica, 200,000+ computers across 150 countries',
    sector: 'Healthcare',
    threatActor: 'Lazarus Group (North Korea)',
    attackVector: 'Worm-like autonomous propagation exploiting EternalBlue SMBv1 remote code execution (CVE-2017-0144) on TCP port 445',
    financialOrOperationalImpact: 'Hospital ambulances diverted, surgeries canceled across the UK; estimated global economic damages exceeding $4 Billion USD.',
    rootCauseVulnerability: 'Widespread failure to install Microsoft security patch MS17-010 (released 2 months prior) and allowing legacy SMBv1 internet-exposed.',
    avoidanceBlueprint: [
      'Establish a rigorous Vulnerability & Patch Management Lifecycle: critical security patches must be tested and deployed within 14 days.',
      'Disable and deprecate obsolete legacy protocols (SMBv1) across all active directory group policies.',
      'Block dangerous inbound and outbound perimeter ports (TCP 445, 139, 135) at enterprise firewalls and ISP boundaries.',
      'Enforce endpoint isolation and automated kill-switch discovery mechanisms.'
    ],
    technicalRemediation: 'Rapid MS17-010 Patch Deployment, Deprecate SMBv1 Protocol, Perimeter Port 445 Blocking.'
  },
  {
    id: 'attack-global-notpetya-2017',
    name: 'NotPetya Destructive Cyberattack',
    year: 2017,
    region: 'Global',
    target: 'Maersk, Merck, FedEx TNT, Ukrainian Infrastructure & Global Supply Chains',
    sector: 'Enterprise',
    threatActor: 'Sandworm (Russian GRU)',
    attackVector: 'Supply chain compromise of Ukrainian M.E.Doc accounting software, followed by EternalBlue and PsExec/Mimikatz automated worm propagation',
    financialOrOperationalImpact: 'Over $10 Billion USD in total global damages (the single most destructive cyber incident in history); crippled global shipping logistics for weeks.',
    rootCauseVulnerability: 'Flat enterprise Active Directory domains with shared local admin passwords; malware disguised as ransomware was actually an irreversible data wiper.',
    avoidanceBlueprint: [
      'Eliminate Shared Local Administrator Passwords using Microsoft LAPS (Local Administrator Password Solution).',
      'Segment enterprise Active Directory domains into tiered administrative models (Tier 0, Tier 1, Tier 2) preventing lateral domain escalation.',
      'Maintain immutable, off-site, offline backups that cannot be encrypted by domain-wide ransomware.',
      'Strict verification and cryptographic hashing checks on automated accounting and ERP software updates.'
    ],
    technicalRemediation: 'Microsoft LAPS Implementation, Active Directory Tiering, Immutable Storage, PsExec Restriction.'
  },
  {
    id: 'attack-global-equifax-2017',
    name: 'Equifax 147-Million Consumer Data Breach',
    year: 2017,
    region: 'Global',
    target: 'Equifax Consumer Credit Reporting Agency',
    sector: 'Banking',
    threatActor: 'Chinese PLA Unit 54847',
    attackVector: 'Unpatched Apache Struts web framework vulnerability (CVE-2017-5638) on dispute portal, followed by lateral pivoting',
    financialOrOperationalImpact: '147 million consumers\' Social Security numbers, dates of birth, and home addresses stolen; Equifax paid over $700 Million in regulatory settlements.',
    rootCauseVulnerability: 'Failure to apply critical open-source software patch available for 2 months, coupled with an expired internal TLS inspection certificate that blinded security monitoring for 76 days.',
    avoidanceBlueprint: [
      'Implement automated Software Composition Analysis (SCA) to discover and inventory open-source libraries and frameworks.',
      'Maintain an active Certificate Management Lifecycle with automated alerting before SSL/TLS inspection certificates expire.',
      'Enforce the Principle of Least Privilege on web application service accounts: web servers should NEVER have access to unrestricted database queries.',
      'Deploy Web Application Firewalls (WAF) capable of virtual patching against known remote code execution vectors.'
    ],
    technicalRemediation: 'Automated SCA Scanning, Certificate Lifecycle Automation, Database Query Scoping, WAF Virtual Patching.'
  },
  {
    id: 'attack-global-uber-2022',
    name: 'Uber Social Engineering & MFA Fatigue Breach',
    year: 2022,
    region: 'Global',
    target: 'Uber Technologies Inc.',
    sector: 'Tech',
    threatActor: 'Lapsus$ Group (TeaMp0isoN member)',
    attackVector: 'MFA Fatigue attack (push notification bombing) against external contractor, followed by social engineering via WhatsApp posing as Uber IT support',
    financialOrOperationalImpact: 'Adversary breached Uber internal network, compromised Google Workspace, Slack channels, AWS cloud console, and internal vulnerability reports.',
    rootCauseVulnerability: 'Reliance on push-notification MFA (susceptible to fatigue) and discovery of hardcoded admin credentials in PowerShell scripts on a network share.',
    avoidanceBlueprint: [
      'Transition from push-notification MFA to FIDO2 / WebAuthn Hardware Security Keys (YubiKey) which are mathematically immune to fatigue and phishing.',
      'Implement Number Matching in mobile authenticator apps: user must enter a 2-digit number displayed on screen.',
      'Deploy automated Secrets Scanning (e.g. GitGuardian) to continuously detect and revoke hardcoded API keys and credentials in scripts.',
      'Restrict access to internal network shares using Zero Trust Least Privilege.'
    ],
    technicalRemediation: 'FIDO2 WebAuthn Hardware Keys, MFA Number Matching, Automated Secrets Scanning, Zero Trust Network Shares.'
  },
  {
    id: 'attack-global-moveit-2023',
    name: 'MOVEit Transfer Zero-Day Data Extortion',
    year: 2023,
    region: 'Global',
    target: 'Thousands of global organizations (BBC, British Airways, Siemens, US Government)',
    sector: 'Enterprise',
    threatActor: 'Cl0p Ransomware Syndicate',
    attackVector: 'Pre-authentication SQL Injection zero-day vulnerability (CVE-2023-34362) in MOVEit Transfer managed file transfer web application',
    financialOrOperationalImpact: 'Over 2,700 organizations affected and 90 million individuals impacted; massive corporate data exfiltration without encrypting victim files (pure extortion).',
    rootCauseVulnerability: 'Unsanitized database queries in enterprise file transfer software exposed directly to public internet without WAF filtering.',
    avoidanceBlueprint: [
      'Isolate managed file transfer appliances behind a reverse proxy or VPN with IP access control lists (never expose directly to raw internet).',
      'Deploy advanced Web Application Firewalls (WAF) with behavioral heuristic anomaly detection.',
      'Enforce zero-trust continuous monitoring on file server directory modifications to detect uploaded webshells (like LEMURLOOT).',
      'Mandate automated data purge lifecycles so files are automatically deleted after successful transit.'
    ],
    technicalRemediation: 'WAF Deep Inspection, Restrict File Transfer Access to VPN/ZTA, Automatic Data Purge Policies.'
  },
  {
    id: 'attack-global-change-healthcare-2024',
    name: 'Change Healthcare ALPHV Ransomware Attack',
    year: 2024,
    region: 'Global',
    target: 'Change Healthcare (UnitedHealth Group)',
    sector: 'Healthcare',
    threatActor: 'ALPHV / BlackCat Ransomware Syndicate',
    attackVector: 'Compromised administrative credentials used to access internal Citrix portal without Multi-Factor Authentication',
    financialOrOperationalImpact: 'Paralyzed medical claims, pharmacy prescription billing, and healthcare payments nationwide across the US for over a month; $22M ransom paid; over $1 Billion in operational damages.',
    rootCauseVulnerability: 'Remote access Citrix portal server lacked Multi-Factor Authentication (MFA); single set of stolen credentials granted full enterprise network entry.',
    avoidanceBlueprint: [
      'Zero-Exception MFA Policy: every single portal, gateway, and remote access point MUST enforce phishing-resistant MFA.',
      'Deploy Privileged Access Management (PAM) with session recording and just-in-time credential checkout for administrative access.',
      'Maintain independent, resilient offline backup clusters that cannot be disabled by administrative compromise.',
      'Implement business continuity fallback systems allowing critical healthcare payments to route through secondary clearinghouses.'
    ],
    technicalRemediation: 'Zero-Exception MFA Policy, Privileged Access Management (PAM), Secondary Clearinghouse Redundancy.'
  },
  {
    id: 'attack-global-crowdstrike-2024',
    name: 'CrowdStrike Falcon Sensor Global Blue Screen Outage',
    year: 2024,
    region: 'Global',
    target: '8.5 Million Windows Systems Worldwide (Airlines, Banks, Healthcare, Broadcast Media)',
    sector: 'Tech',
    threatActor: 'Internal Software Quality & Validation Defect (Non-malicious systemic outage)',
    attackVector: 'Rapid Channel File 291 content update contained an undetected logic flaw that caused kernel driver `csagent.sys` to execute an out-of-bounds memory read (Page Fault in Nonpaged Area), triggering endless BSOD boot loops',
    financialOrOperationalImpact: 'Over 5,000 flights canceled globally; hospital surgeries delayed; banking systems frozen; estimated direct economic impact exceeded $5 Billion USD.',
    rootCauseVulnerability: 'Absence of staged canary deployment rings for kernel-mode content configuration updates; automated validator passed malformed input.',
    avoidanceBlueprint: [
      'Enforce Staged Canary Deployment Rings: updates must be rolled out to 1% canary nodes, monitored for stability, before broader enterprise fleet deployment.',
      'Strict Kernel-Mode Input Validation: parser code within Ring 0 drivers must enforce rigorous defensive boundary checks against out-of-bounds memory access.',
      'Provide customer-controlled update release cadences with option to defer non-critical content changes.',
      'Maintain automated BitLocker key escrow and out-of-band recovery tools for rapid remote remediation of unbootable endpoints.'
    ],
    technicalRemediation: 'Canary Deployment Rings, Kernel Memory Boundary Validation, Customer-Controlled Update Cadence.'
  }
];
