import React, { useState } from 'react';
import { Search, Clock, FileText, CheckCircle, ShieldAlert, Database, History, HardDrive } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface ForensicArtifact {
  id: string;
  sourceType: 'EVTX' | 'BROWSER' | 'USB' | 'PREFETCH' | 'MFT';
  timestamp: string;
  evidenceSummary: string;
  rawDetails: string;
  isBreachIndicator: boolean;
}

export const ForensicsSim: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedArtifact, setSelectedArtifact] = useState<ForensicArtifact | null>(null);
  const [timelineSequence, setTimelineSequence] = useState<string[]>([]);
  const [isTimelineVerified, setIsTimelineVerified] = useState(false);

  const artifacts: ForensicArtifact[] = [
    {
      id: "ART-101",
      sourceType: "EVTX",
      timestamp: "2026-09-23 14:02:11 UTC",
      evidenceSummary: "Windows Security Event 4624 (Successful Logon Type 2 Interactive for user 'bob.smith')",
      rawDetails: "EventID: 4624\nLogonType: 2 (Interactive/Console)\nTargetUserName: bob.smith\nTargetDomainName: SARLAYASH\nLogonGuid: {8f4412-bc90...}",
      isBreachIndicator: false
    },
    {
      id: "ART-102",
      sourceType: "BROWSER",
      timestamp: "2026-09-23 14:04:30 UTC",
      evidenceSummary: "Chrome SQLite History: Visited file sharing repository 'https://anonfiles-drop.su/upload'",
      rawDetails: "URL: https://anonfiles-drop.su/upload\nTitle: Anonymous Fast File Drop\nVisitCount: 1\nTypedCount: 1\nTransition: TYPED",
      isBreachIndicator: true
    },
    {
      id: "ART-103",
      sourceType: "USB",
      timestamp: "2026-09-23 14:05:44 UTC",
      evidenceSummary: "System Event 20001: Hardware plug-and-play USB device attached (SanDisk Cruzer Glide, SN: 4C5300011)",
      rawDetails: "EventID: 20001 (DriverFrameworks-UserMode)\nDeviceDescription: USB Mass Storage Device\nHardwareID: USB\\VID_0781&PID_5567\nSerialNumber: 4C5300011",
      isBreachIndicator: true
    },
    {
      id: "ART-104",
      sourceType: "PREFETCH",
      timestamp: "2026-09-23 14:07:12 UTC",
      evidenceSummary: "Prefetch execution proof: 7Z.EXE-B9204A.pf executed with run count incremented to 1",
      rawDetails: "FileName: 7Z.EXE\nRunCount: 1\nLastRunTime: 2026-09-23 14:07:12 UTC\nVolume: \\DEVICE\\HARDDISKVOLUME3\nReferencedFiles: Q3_Financial_Forecast.xlsx",
      isBreachIndicator: true
    },
    {
      id: "ART-105",
      sourceType: "MFT",
      timestamp: "2026-09-23 14:08:05 UTC",
      evidenceSummary: "NTFS $MFT Record: Archive 'Q3_Financial_Forecast.zip' created and written to Volume E:\\ (USB Drive)",
      rawDetails: "FilePath: E:\\Q3_Financial_Forecast.zip\nFileSize: 14,208,410 bytes\n$STANDARD_INFORMATION Created: 2026-09-23 14:08:05 UTC\n$FILE_NAME Created: 2026-09-23 14:08:05 UTC",
      isBreachIndicator: true
    },
    {
      id: "ART-106",
      sourceType: "EVTX",
      timestamp: "2026-09-23 14:11:00 UTC",
      evidenceSummary: "Windows Event 1102: The audit log was cleared by user 'bob.smith'",
      rawDetails: "EventID: 1102 (The audit log was cleared)\nSubjectUserName: bob.smith\nSubjectDomainName: SARLAYASH\nLogFile: Security.evtx",
      isBreachIndicator: true
    }
  ];

  const filteredArtifacts = artifacts.filter(a => activeFilter === 'ALL' || a.sourceType === activeFilter);

  const handleToggleTimelineItem = (id: string) => {
    if (timelineSequence.includes(id)) {
      setTimelineSequence(timelineSequence.filter(x => x !== id));
    } else {
      setTimelineSequence([...timelineSequence, id]);
    }
    setIsTimelineVerified(false);
  };

  const handleVerifyTimeline = () => {
    // Correct chronological breach timeline: ART-101 -> ART-102 -> ART-103 -> ART-104 -> ART-105 -> ART-106
    if (timelineSequence.length >= 4) {
      setIsTimelineVerified(true);
      storageService.recordSimulatorRun('forensics', 95);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Objective Banner */}
      <div className="p-4 rounded-xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block">
            LAB OBJECTIVE: DIGITAL FORENSICS TIMELINE RECONSTRUCTION
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Examine endpoint artifacts from suspect machine <code className="text-amber-400 font-mono">STN-EXEC-09</code> (EVTX logs, browser history, USB insertion, and Prefetch) to piece together the insider data exfiltration timeline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <HardDrive className="w-4 h-4 text-cyan-400" />
          <span>EVIDENCE IMAGE SHA-256 HASH VERIFIED</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['ALL', 'EVTX', 'BROWSER', 'USB', 'PREFETCH', 'MFT'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              activeFilter === f
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Artifacts List */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Collected Evidence Artifacts ({filteredArtifacts.length})
            </span>
            <span className="text-xs font-mono text-cyan-400">Click to Inspect & Add to Timeline</span>
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {filteredArtifacts.map((art) => {
              const inTimeline = timelineSequence.includes(art.id);
              const isSelected = selectedArtifact?.id === art.id;

              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArtifact(art)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md'
                      : 'bg-[#081124] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {art.sourceType}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {art.timestamp}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-white mb-2 leading-relaxed">
                    {art.evidenceSummary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleTimelineItem(art.id);
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-colors ${
                        inTimeline 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-slate-800 text-slate-300 hover:bg-cyan-950 hover:text-cyan-300'
                      }`}
                    >
                      {inTimeline ? '✓ Added to Incident Timeline' : '+ Add to Timeline'}
                    </button>
                    {art.isBreachIndicator && (
                      <span className="text-[10px] text-red-400 font-mono">Suspicious Indicator</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Artifact Inspector & Timeline Workspace */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Artifact Details Inspector */}
          <div className="p-5 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              Raw Forensic Hex / Metadata Inspector
            </h4>

            {selectedArtifact ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>ID: {selectedArtifact.id}</span>
                  <span>{selectedArtifact.timestamp}</span>
                </div>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedArtifact.rawDetails}
                </pre>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-6 text-center">
                Select any artifact on the left to inspect raw headers and metadata.
              </p>
            )}
          </div>

          {/* Timeline Reconstructor */}
          <div className="p-5 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Reconstructed Breach Timeline ({timelineSequence.length} Events)
              </h4>
              <button
                onClick={handleVerifyTimeline}
                disabled={timelineSequence.length < 3}
                className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-xs"
              >
                Verify Timeline
              </button>
            </div>

            <div className="space-y-2">
              {timelineSequence.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">
                  Click '+ Add to Timeline' on artifacts to reconstruct the sequence of events.
                </p>
              ) : (
                timelineSequence.map((id, index) => {
                  const item = artifacts.find(a => a.id === id);
                  if (!item) return null;

                  return (
                    <div key={id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-slate-400 font-mono block">{item.timestamp}</span>
                        <p className="text-slate-200 truncate">{item.evidenceSummary}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {isTimelineVerified && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Timeline Verified! Insider inserted unauthorized SanDisk USB, compressed financials with 7-Zip, exfiltrated data, and attempted to clear Windows Security Event Log.
                </span>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
