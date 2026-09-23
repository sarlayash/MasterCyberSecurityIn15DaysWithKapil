import React from 'react';
import { 
  Printer, 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  FileText, 
  Sparkles,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { LearnerProfile } from '../../types';
import { calculateCyberReadiness } from '../../services/scoringEngine';

interface LetterOfRecommendationProps {
  learner: LearnerProfile;
}

export const LetterOfRecommendation: React.FC<LetterOfRecommendationProps> = ({ learner }) => {
  const readiness = calculateCyberReadiness(learner);
  const certId = `LOR-SYM-2026-${learner.id.slice(-6).toUpperCase() || '78942A'}`;
  
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const latestAssessment = learner.assessmentScores && learner.assessmentScores.length > 0
    ? learner.assessmentScores[0]
    : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Control Banner (Hidden during print) */}
      <div className="p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
            EXECUTIVE ENDORSEMENT • SARLAYASH MISSION
          </span>
          <h2 className="text-2xl font-black text-white">
            Official Letter of Recommendation (LOR)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Issued to verified learners who complete curriculum milestones and corporate assessment benchmarks.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save LOR as PDF</span>
        </button>
      </div>

      {/* FORMAL INSTITUTIONAL LETTERHEAD PAPER CANVAS */}
      <div className="printable-lor p-8 sm:p-14 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 font-serif leading-relaxed max-w-4xl mx-auto space-y-8">
        
        {/* Institutional Letterhead Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-700 font-sans font-black text-xl tracking-wider uppercase">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-600 inline-block" />
              <span>SARLAYASH MISSION</span>
            </div>
            <p className="text-xs text-slate-600 font-sans font-medium tracking-wide">
              Center for Cyber Defense & Values-Driven Digital Education
            </p>
            <p className="text-[11px] text-slate-500 font-sans italic">
              “Legacy of Values. Future of Learning.”
            </p>
          </div>

          <div className="text-right font-sans text-xs text-slate-600 space-y-0.5">
            <div className="font-bold text-slate-900">REF NO: {certId}</div>
            <div>DATE: {issueDate}</div>
            <div className="text-[10px] text-emerald-700 font-mono font-bold">STATUS: VERIFIED CREDENTIAL</div>
          </div>
        </div>

        {/* Salutation */}
        <div className="space-y-2">
          <h4 className="text-sm font-sans font-bold text-slate-900 uppercase tracking-wider">
            TO WHOM IT MAY CONCERN / ADMISSIONS &amp; HIRING COMMITTEES
          </h4>
          <p className="text-sm text-slate-700 italic">
            Subject: Official Letter of Recommendation for <strong>{learner.name}</strong>
          </p>
        </div>

        {/* Formal Endorsement Paragraphs */}
        <div className="space-y-4 text-justify text-sm text-slate-800 leading-relaxed">
          <p>
            It is my distinct privilege to write this formal Letter of Recommendation for <strong>{learner.name}</strong>, who has demonstrated exemplary analytical capability, technical discipline, and defensive mastery throughout the intensive <strong>Cyber Security Zero-To-Infinity 15-Day Workshop</strong> conducted under the aegis of SarlaYash Mission.
          </p>

          <p>
            The Cyber Security Zero-To-Infinity curriculum enforces a strict sequential progression model designed to replicate the operational pressures of enterprise Security Operations Centers (SOC) and Incident Response teams. Throughout the workshop, {learner.name} demonstrated outstanding competency across both theoretical principles and hands-on laboratory execution:
          </p>

          {/* Bulleted Competencies */}
          <ul className="list-disc pl-6 space-y-1.5 text-xs text-slate-800 font-sans">
            <li>
              <strong>Network Defense &amp; Protocol Analysis:</strong> Proficient in OSI model mapping, TCP/IP 3-way handshake validation, and packet inspection utilizing Wireshark display filters and PCAP forensic reconstruction.
            </li>
            <li>
              <strong>Perimeter &amp; Systems Security:</strong> Demonstrated practical acumen in stateful packet filtering, firewall rule-base optimization (avoiding rule shadowing), and Linux access control mechanisms (octal permissions, SUID security, and audit logging).
            </li>
            <li>
              <strong>SOC Alert Triage &amp; Incident Response:</strong> Executed Tier-1 SIEM alert triage, distinguished false positives from authentic threats (brute-force spraying, port scans), and formulated structured containment workflows adhering to NIST SP 800-61 guidelines.
            </li>
            <li>
              <strong>Application Security &amp; Cryptography:</strong> Solid foundation in OWASP Top 10 vulnerabilities (SQL Injection, XSS, CSRF), parameterized query defenses, AES/RSA cryptographic fundamentals, and Public Key Infrastructure (PKI).
            </li>
          </ul>

          <p>
            In standardized objective evaluations, {learner.name} attained a <strong>Cyber Readiness Index of {readiness.overallPercentage}%</strong>, earning the distinction of <strong>Level {readiness.currentLevel.levelNumber}: {readiness.currentLevel.levelName}</strong>. 
            {latestAssessment && (
              <span> Furthermore, in the comprehensive 100-MCQ Corporate Cyber Benchmark Assessment, {learner.name} recorded an impressive score of <strong>{latestAssessment.percentage}%</strong>, surpassing the competitive corporate threshold.</span>
            )}
          </p>

          <p>
            Beyond technical prowess, {learner.name} exhibited exceptional ethical integrity, rapid problem-solving, and a dedication to continuous professional growth. I endorse {learner.name} with complete confidence for cybersecurity analyst positions, SOC operational roles, network defense apprenticeships, or specialized graduate studies.
          </p>
        </div>

        {/* Quantified Telemetry Summary Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">CANDIDATE ID</span>
            <span className="font-bold font-mono text-slate-900">{learner.id.slice(0, 14)}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">CYBER READINESS</span>
            <span className="font-bold text-amber-700">{readiness.overallPercentage}% (Lvl {readiness.currentLevel.levelNumber})</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">CURRICULUM MODULES</span>
            <span className="font-bold text-emerald-700">{learner.completedModules.length} / 15 Completed</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">BENCHMARK SCORE</span>
            <span className="font-bold text-cyan-700">{latestAssessment ? `${latestAssessment.percentage}% Score` : 'Qualified'}</span>
          </div>
        </div>

        {/* Institutional Sign-Off Block */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="font-sans text-xs text-slate-600">Sincerely,</div>
            <div className="font-serif italic text-2xl text-amber-800 font-bold">
              Kapil
            </div>
            <div className="font-sans text-xs text-slate-900 font-bold">
              Kapil
            </div>
            <div className="font-sans text-[11px] text-slate-600 leading-tight">
              Enterprise Cyber Defense Mentor &amp; Workshop Facilitator<br />
              SarlaYash Mission Academy of Learning
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 text-center font-sans space-y-1 sm:w-56 shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-600 mx-auto" />
            <div className="text-[11px] font-bold text-amber-900 uppercase tracking-widest">
              OFFICIAL VERIFICATION
            </div>
            <div className="text-[9px] text-amber-700 font-mono">
              AUTH ID: {certId}
            </div>
            <div className="text-[8px] text-slate-500 pt-1">
              Digitally certified via SarlaYash Central Registry
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
