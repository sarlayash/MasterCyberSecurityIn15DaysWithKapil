import React, { useState } from 'react';
import { Mail, ShieldCheck, ShieldAlert, AlertTriangle, ExternalLink, Paperclip, CheckCircle } from 'lucide-react';
import { SYNTHETIC_PHISHING_EMAILS, PhishingEmail } from '../../data/simulatorScenarios';
import { storageService } from '../../services/storageService';

export const PhishingAnalyzerSim: React.FC = () => {
  const [emails, setEmails] = useState<PhishingEmail[]>(SYNTHETIC_PHISHING_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<PhishingEmail>(emails[0]);
  const [verdicts, setVerdicts] = useState<Record<string, 'SAFE' | 'SUSPICIOUS' | 'MALICIOUS'>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [inspectedHeaders, setInspectedHeaders] = useState(false);

  const handleMakeVerdict = (verdict: 'SAFE' | 'SUSPICIOUS' | 'MALICIOUS') => {
    setVerdicts({ ...verdicts, [selectedEmail.id]: verdict });
    setShowExplanation({ ...showExplanation, [selectedEmail.id]: true });

    if (verdict === selectedEmail.correctVerdict) {
      storageService.recordSimulatorRun('phishing', 100);
    } else {
      storageService.recordSimulatorRun('phishing', 60);
    }
  };

  const currentVerdict = verdicts[selectedEmail.id];
  const isCorrect = currentVerdict === selectedEmail.correctVerdict;
  const isAnswered = showExplanation[selectedEmail.id];

  return (
    <div className="space-y-6">
      
      {/* Objective Banner */}
      <div className="p-4 rounded-xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block">
            LAB OBJECTIVE: EMAIL THREAT INVESTIGATION & PHISHING TRIAGE
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Inspect sender domains, SPF/DKIM/DMARC headers, embedded links, and attachments. Deliver your verdict: <span className="text-emerald-400">SAFE</span>, <span className="text-amber-400">SUSPICIOUS</span>, or <span className="text-red-400">MALICIOUS</span>.
          </p>
        </div>

        <button
          onClick={() => setInspectedHeaders(!inspectedHeaders)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
        >
          {inspectedHeaders ? 'Hide Full Raw Headers' : 'Inspect Raw Headers (SPF/DKIM)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Email Inbox List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Mailbox Triage Queue
            </span>
            <span className="text-xs font-mono text-cyan-400">
              {Object.keys(verdicts).length} / {emails.length} Graded
            </span>
          </div>

          <div className="space-y-2">
            {emails.map((m) => {
              const active = m.id === selectedEmail.id;
              const hasVerdict = verdicts[m.id];

              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedEmail(m)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md'
                      : 'bg-[#081124] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-slate-200 truncate">{m.senderName}</span>
                    <span className="font-mono text-[10px]">{m.receivedDate.split(',')[0]}</span>
                  </div>

                  <p className="text-xs font-bold text-white line-clamp-1 mb-1.5">
                    {m.subject}
                  </p>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 truncate max-w-[160px]">{m.senderEmail}</span>
                    {hasVerdict && (
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        verdicts[m.id] === 'MALICIOUS' ? 'bg-red-950 text-red-400' :
                        verdicts[m.id] === 'SUSPICIOUS' ? 'bg-amber-950 text-amber-400' :
                        'bg-emerald-950 text-emerald-400'
                      }`}>
                        {verdicts[m.id]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Email Client Viewer & Investigation Panel */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-5">
          
          {/* Email Header Card */}
          <div className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {selectedEmail.subject}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {selectedEmail.receivedDate}
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-300 font-mono">
              <p><strong>From:</strong> {selectedEmail.senderName} &lt;{selectedEmail.senderEmail}&gt;</p>
              <p><strong>Reply-To:</strong> {selectedEmail.replyTo}</p>
            </div>

            {/* SPF / DKIM / DMARC Header Badges */}
            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono">
              <span className={`px-2 py-0.5 rounded border ${
                selectedEmail.authHeaders.spf === 'PASS' 
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' 
                  : 'bg-red-950 text-red-400 border-red-500/40'
              }`}>
                SPF: {selectedEmail.authHeaders.spf}
              </span>

              <span className={`px-2 py-0.5 rounded border ${
                selectedEmail.authHeaders.dkim === 'PASS' 
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' 
                  : 'bg-red-950 text-red-400 border-red-500/40'
              }`}>
                DKIM: {selectedEmail.authHeaders.dkim}
              </span>

              <span className={`px-2 py-0.5 rounded border ${
                selectedEmail.authHeaders.dmarc === 'PASS' 
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' 
                  : 'bg-amber-950 text-amber-400 border-amber-500/40'
              }`}>
                DMARC: {selectedEmail.authHeaders.dmarc}
              </span>
            </div>

            {inspectedHeaders && (
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 overflow-x-auto whitespace-pre-wrap">
{`Authentication-Results: mx.sarlayash.org;
  spf=${selectedEmail.authHeaders.spf.toLowerCase()} (sender IP is not authorized);
  dkim=${selectedEmail.authHeaders.dkim.toLowerCase()};
  dmarc=${selectedEmail.authHeaders.dmarc.toLowerCase()};
Received-SPF: ${selectedEmail.authHeaders.spf} (domain of ${selectedEmail.senderEmail} designates prohibited IP)
X-Originating-IP: [185.220.101.44]`}
              </pre>
            )}
          </div>

          {/* Email Body */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
            <div dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }} />
          </div>

          {/* Attachment Sandbox Warning (if present) */}
          {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-amber-400" />
                <span>Attachment: <strong>{selectedEmail.attachments[0].filename}</strong> ({selectedEmail.attachments[0].size})</span>
              </div>
              <span className="text-[10px] font-mono text-red-400 font-bold">
                {selectedEmail.attachments[0].sandboxVerdict}
              </span>
            </div>
          )}

          {/* Link Inspector Warning */}
          {selectedEmail.links.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="text-cyan-400 font-bold block mb-1">🔗 HYPERLINK DESTINATION INSPECTION:</span>
              <p>Displayed Text: <span className="text-slate-200">{selectedEmail.links[0].displayUrl}</span></p>
              <p>Actual Target: <span className="text-red-400 font-bold">{selectedEmail.links[0].actualUrl}</span></p>
            </div>
          )}

          {/* Verdict Buttons (Section 11 requirement: SAFE, SUSPICIOUS, MALICIOUS) */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Determine Triage Verdict:
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleMakeVerdict('SAFE')}
                className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                  currentVerdict === 'SAFE'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30'
                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/60'
                }`}
              >
                SAFE
              </button>

              <button
                onClick={() => handleMakeVerdict('SUSPICIOUS')}
                className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                  currentVerdict === 'SUSPICIOUS'
                    ? 'bg-amber-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-600/30'
                    : 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/60'
                }`}
              >
                SUSPICIOUS
              </button>

              <button
                onClick={() => handleMakeVerdict('MALICIOUS')}
                className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                  currentVerdict === 'MALICIOUS'
                    ? 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-600/30'
                    : 'bg-red-950/40 text-red-300 border-red-800/60 hover:bg-red-900/60'
                }`}
              >
                MALICIOUS
              </button>
            </div>
          </div>

          {/* Explanation Breakdown */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in ${
              isCorrect ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-red-950/40 border-red-500/40 text-red-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-red-400" />}
                <span>
                  {isCorrect ? 'Verdict Correct!' : `Incorrect Verdict. Real Classification: ${selectedEmail.correctVerdict}`}
                </span>
              </div>

              <p className="text-[11px] leading-relaxed">
                {selectedEmail.explanation}
              </p>

              <div>
                <span className="font-bold text-[11px] block mt-1">Key Forensic Indicators:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  {selectedEmail.indicators.map((ind, i) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
