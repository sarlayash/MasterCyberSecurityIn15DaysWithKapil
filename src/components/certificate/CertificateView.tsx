import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Printer, 
  ShieldCheck, 
  CheckCircle, 
  ExternalLink, 
  QrCode, 
  X, 
  Sparkles,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LearnerProfile, TrackType } from '../../types';
import { calculateCyberReadiness } from '../../services/scoringEngine';
import { LetterOfRecommendation } from './LetterOfRecommendation';
import { BadgesShowcase } from './BadgesShowcase';

interface CertificateViewProps {
  learner: LearnerProfile;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ learner }) => {
  const [credentialTab, setCredentialTab] = useState<'certificate' | 'lor' | 'badges'>('certificate');
  const [selectedTrack, setSelectedTrack] = useState<TrackType>(learner.activeTrack || 'cybersecurity');
  const [showQrModal, setShowQrModal] = useState(false);
  const readiness = calculateCyberReadiness(learner);

  const certId = selectedTrack === 'ethical-hacking'
    ? `SYM-CEH-2026-${learner.id.slice(-5).toUpperCase() || '78942'}`
    : `SYM-CSZ-2026-${learner.id.slice(-5).toUpperCase() || '78942'}`;

  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const completedModulesCount = selectedTrack === 'ethical-hacking'
    ? (learner.ethicalHackingCompletedModules || learner.completedModules.filter(id => id >= 101)).length
    : learner.completedModules.filter(id => id <= 15).length;

  useEffect(() => {
    // Fire confetti when viewing certificate
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030712] py-8 px-4 sm:px-6 lg:px-8 text-slate-100 pb-24">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Track Selector Bar (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 no-print">
          <button
            onClick={() => setSelectedTrack('cybersecurity')}
            className={`flex-1 w-full p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              selectedTrack === 'cybersecurity'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-cyan-900/50'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            <span>🛡️ Cyber Security Zero-To-Infinity (Blue Team)</span>
          </button>

          <button
            onClick={() => setSelectedTrack('ethical-hacking')}
            className={`flex-1 w-full p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              selectedTrack === 'ethical-hacking'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white border-rose-400 shadow-rose-900/50'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <span>⚔️</span>
            <span>Certified Ethical Hacker &amp; Pentest (Red Team)</span>
          </button>
        </div>

        {/* Credential Navigation Tabs (Hidden on Print) */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 no-print">
          <button
            onClick={() => setCredentialTab('certificate')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              credentialTab === 'certificate'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Certificate of Completion</span>
          </button>

          <button
            onClick={() => setCredentialTab('lor')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              credentialTab === 'lor'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Letter of Recommendation (LOR)</span>
          </button>

          <button
            onClick={() => setCredentialTab('badges')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              credentialTab === 'badges'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Earned Badges &amp; PNG Downloader</span>
          </button>
        </div>

        {/* TAB 1: CERTIFICATE OF COMPLETION */}
        {credentialTab === 'certificate' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Action Header Bar (Hidden on Print) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl no-print">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                  OFFICIAL WORKSHOP CREDENTIAL • {selectedTrack === 'ethical-hacking' ? 'RED TEAM TRACK' : 'BLUE TEAM TRACK'}
                </span>
                <h1 className="text-2xl font-black text-white">
                  {selectedTrack === 'ethical-hacking'
                    ? 'Certified Ethical Hacker & Penetration Tester'
                    : 'Certificate of Completion'}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified by SarlaYash Mission • Facilitated by Kapil
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  <span>Verify Authenticity</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

            {/* PRINTABLE HIGH-RESOLUTION CERTIFICATE CANVAS */}
            <div className={`printable-certificate relative p-8 sm:p-14 rounded-3xl border-4 shadow-2xl text-slate-100 overflow-hidden ${
              selectedTrack === 'ethical-hacking'
                ? 'bg-[#120710] border-rose-500/60'
                : 'bg-[#080f20] border-amber-500/50'
            }`}>
              
              {/* Subtle Guilloche / Watermark Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Inner Ornate Border */}
              <div className={`relative z-10 border p-6 sm:p-10 rounded-2xl text-center space-y-6 ${
                selectedTrack === 'ethical-hacking'
                  ? 'border-rose-400/40 bg-[#150a14]/85'
                  : 'border-amber-400/40 bg-[#091224]/85'
              }`}>
                
                {/* Certificate Header Branding */}
                <div className="space-y-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border text-xs font-bold font-mono tracking-widest uppercase ${
                    selectedTrack === 'ethical-hacking'
                      ? 'bg-rose-950/60 border-rose-500/30 text-rose-400'
                      : 'bg-amber-950/60 border-amber-500/30 text-amber-400'
                  }`}>
                    <span>SARLAYASH MISSION</span>
                  </div>
                  <p className="text-xs text-slate-400 tracking-wider">
                    “Legacy of Values. Future of Learning.”
                  </p>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mt-2">
                    {selectedTrack === 'ethical-hacking'
                      ? 'Certified Ethical Hacker'
                      : 'Certificate of Completion'}
                  </h2>
                  <p className={`text-xs sm:text-sm font-semibold uppercase tracking-widest font-mono ${
                    selectedTrack === 'ethical-hacking' ? 'text-rose-400' : 'text-cyan-400'
                  }`}>
                    {selectedTrack === 'ethical-hacking'
                      ? 'ETHICAL HACKING & PENETRATION TESTING 15-DAY RESIDENCY'
                      : 'CYBER SECURITY ZERO-TO-INFINITY 15-DAY WORKSHOP'}
                  </p>
                </div>

                {/* Recipient Notice */}
                <div className="py-4 space-y-2">
                  <p className="text-slate-400 font-serif italic text-base">
                    This is proudly presented to
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 bg-clip-text font-serif">
                    {learner.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed pt-2">
                    {selectedTrack === 'ethical-hacking'
                      ? 'For successfully fulfilling the rigorous 15-day Ethical Hacking curriculum, demonstrating red-team operational proficiency across passive/active reconnaissance, vulnerability assessment, network penetration, social engineering defense, Web Application OWASP exploitation, privilege escalation, and defensible penetration testing documentation.'
                      : 'For successfully fulfilling the rigorous 15-day curriculum, demonstrating competency across networking protocols, firewall architecture, Wireshark packet investigation, Linux security, SOC incident triage, and digital forensics.'}
                  </p>
                </div>

                {/* Performance Summary Pill Box */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto py-3 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">READINESS INDEX</span>
                    <span className="font-bold text-cyan-400">{readiness.overallPercentage}% Score</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">LEVEL ATTAINED</span>
                    <span className="font-bold text-amber-400">Level {readiness.currentLevel.levelNumber}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">MODULES MASTERED</span>
                    <span className={`font-bold ${selectedTrack === 'ethical-hacking' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {completedModulesCount} / 15 Days
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">PRACTICAL LABS</span>
                    <span className="font-bold text-indigo-400">{learner.completedLabs.length} Labs Done</span>
                  </div>
                </div>

                {/* Sign-off & Verification Footer */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                  
                  {/* Verification Credentials */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>OFFICIAL VERIFICATION CODE:</span>
                    </div>
                    <p className="font-mono text-xs text-slate-300 font-bold tracking-wider">
                      {certId}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Date Issued: {completionDate}
                    </p>
                  </div>

                  {/* Center Mission Seal */}
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-dashed border-amber-400/60 flex items-center justify-center p-2 text-center">
                    <span className="text-[8px] font-mono font-black text-amber-400 uppercase leading-none">
                      SARLAYASH<br />MISSION<br />★ SEAL ★
                    </span>
                  </div>

                  {/* Facilitator Signature */}
                  <div className="text-center sm:text-right space-y-1">
                    <div className="inline-block border-b border-amber-400/60 pb-1">
                      <span className="font-serif italic text-lg sm:text-xl text-amber-300 tracking-wide">
                        Kapil
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-200">Kapil</p>
                    <p className="text-[10px] text-slate-400">
                      {selectedTrack === 'ethical-hacking' ? 'Program Facilitator & Ethical Hacker' : 'Program Facilitator & Cyber Defender'}
                    </p>
                    <p className="text-[10px] text-amber-400 font-mono">SarlaYash Mission</p>
                  </div>

                </div>

                {/* Mandatory Specification Disclaimer */}
                <div className="pt-4 border-t border-slate-900 text-[10px] text-slate-500">
                  * This certificate verifies completion of the internal educational curriculum of SarlaYash Mission. It does not falsely represent or claim to be an accredited government or industry certification.
                </div>

              </div>
            </div>

            {/* QR Code Verification Modal */}
            {showQrModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in no-print">
                <div className="relative w-full max-w-sm bg-[#091224] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 text-center space-y-4">
                  <button
                    onClick={() => setShowQrModal(false)}
                    className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                    <QrCode className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">Live Credential Verification</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Scan or verify certificate authenticity against the SarlaYash verification registry.
                    </p>
                  </div>

                  {/* Simulated QR Code SVG Graphic */}
                  <div className="p-4 bg-white rounded-2xl w-44 h-44 mx-auto shadow-md flex items-center justify-center">
                    <div className="w-36 h-36 border-4 border-slate-950 p-2 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-8 h-8 bg-slate-950" />
                        <div className="w-8 h-8 bg-slate-950" />
                      </div>
                      <div className="text-[9px] font-mono font-black text-slate-950 text-center">
                        SARLAYASH<br />VERIFIED
                      </div>
                      <div className="flex justify-between">
                        <div className="w-8 h-8 bg-slate-950" />
                        <div className="w-5 h-5 bg-slate-950 self-end" />
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                    ID: {certId} • VALID
                  </div>

                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Active in SarlaYash Defense Registry</span>
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: LETTER OF RECOMMENDATION (LOR) */}
        {credentialTab === 'lor' && (
          <LetterOfRecommendation learner={learner} track={selectedTrack} />
        )}

        {/* TAB 3: EARNED BADGES & PNG DOWNLOADER */}
        {credentialTab === 'badges' && (
          <BadgesShowcase learner={learner} />
        )}

      </div>
    </div>
  );
};
