import React, { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle, Clock, AlertTriangle, ArrowRight, Activity, Bell } from 'lucide-react';
import { SYNTHETIC_SOC_ALERTS, SocAlert } from '../../data/simulatorScenarios';
import { storageService } from '../../services/storageService';

export const SocDashboardSim: React.FC = () => {
  const [alerts, setAlerts] = useState<SocAlert[]>(SYNTHETIC_SOC_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<SocAlert>(alerts[0]);
  const [triageSeverities, setTriageSeverities] = useState<Record<string, 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>>({});
  const [selectedActions, setSelectedActions] = useState<Record<string, string>>({});
  const [triageSubmitted, setTriageSubmitted] = useState<Record<string, boolean>>({});

  const handleAssignSeverity = (sev: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL') => {
    setTriageSeverities({ ...triageSeverities, [selectedAlert.id]: sev });
  };

  const handleSelectAction = (act: string) => {
    setSelectedActions({ ...selectedActions, [selectedAlert.id]: act });
  };

  const handleSubmitTriage = () => {
    setTriageSubmitted({ ...triageSubmitted, [selectedAlert.id]: true });
    storageService.recordSimulatorRun('soc', 95);
  };

  const currentSev = triageSeverities[selectedAlert.id];
  const currentAct = selectedActions[selectedAlert.id];
  const isTriaged = triageSubmitted[selectedAlert.id];
  const isSeverityCorrect = currentSev === selectedAlert.correctSeverity;

  const actionOptions = [
    "Isolate host from network via EDR & rotate credentials",
    "Block external IP on perimeter edge firewall",
    "Verify with Change Management schedule & mark False Positive",
    "Force MFA re-authentication & revoke cloud session tokens",
    "Send warning email to employee asking if they clicked link"
  ];

  return (
    <div className="space-y-6">
      
      {/* Objective Banner */}
      <div className="p-4 rounded-xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block">
            LAB OBJECTIVE: TIER-1 SOC ALERTS TRIAGE CONSOLE
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Investigate real-time incoming SIEM telemetry. Classify severity (<span className="text-emerald-400">LOW</span>, <span className="text-amber-400">MEDIUM</span>, <span className="text-orange-400">HIGH</span>, <span className="text-red-400">CRITICAL</span>) and assign playbook action.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>SIEM SENSORS ONLINE (5 QUEUED)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Live Alerts Queue */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pending Alerts Queue
            </span>
            <span className="text-xs font-mono text-cyan-400">
              {Object.keys(triageSubmitted).length} / {alerts.length} Triaged
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {alerts.map((al) => {
              const active = al.id === selectedAlert.id;
              const completed = triageSubmitted[al.id];

              return (
                <div
                  key={al.id}
                  onClick={() => setSelectedAlert(al)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-950/60'
                      : 'bg-[#081124] border-slate-800 hover:border-cyan-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-amber-400">
                      {al.id}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {al.timestamp}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-white mb-1">
                    {al.eventType}
                  </p>

                  <p className="text-[11px] text-slate-400 truncate">
                    Src: {al.sourceIp} → Dst: {al.destIp}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {completed ? 'Status: TRIAGED' : 'Status: PENDING REVIEW'}
                    </span>
                    {completed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Triage & Investigation Workspace */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#081124] border border-cyan-900/50 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block mb-0.5">
                ALERT ID: {selectedAlert.id} • {selectedAlert.timestamp}
              </span>
              <h3 className="text-base font-bold text-white">
                {selectedAlert.eventType}
              </h3>
            </div>
            <div className="text-right text-xs font-mono text-slate-400">
              <p>Target: {selectedAlert.destIp}</p>
              <p>Origin: {selectedAlert.sourceIp}</p>
            </div>
          </div>

          {/* Alert Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Event Telemetry Summary
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {selectedAlert.summary}
            </p>
          </div>

          {/* Raw Log Inspection */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              Raw Log Extract (SIEM Ingestion Stream)
            </h4>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap">
              {selectedAlert.rawLog}
            </pre>
          </div>

          {/* Step 1: Assign Severity */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Assign Severity Rating
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const).map((sev) => {
                const selected = currentSev === sev;
                let colorClass = "bg-slate-900 text-slate-400 border-slate-800";
                if (selected) {
                  if (sev === 'LOW') colorClass = "bg-emerald-950 text-emerald-300 border-emerald-500 font-bold";
                  if (sev === 'MEDIUM') colorClass = "bg-amber-950 text-amber-300 border-amber-500 font-bold";
                  if (sev === 'HIGH') colorClass = "bg-orange-950 text-orange-300 border-orange-500 font-bold";
                  if (sev === 'CRITICAL') colorClass = "bg-red-950 text-red-300 border-red-500 font-bold";
                }

                return (
                  <button
                    key={sev}
                    onClick={() => handleAssignSeverity(sev)}
                    className={`py-2 rounded-xl text-xs font-mono border transition-all ${colorClass}`}
                  >
                    {sev}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Containment Action */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              2. Recommend Playbook Containment Action
            </h4>
            <div className="space-y-1.5">
              {actionOptions.map((act, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectAction(act)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                    currentAct === act
                      ? 'bg-cyan-950/80 border-cyan-400 text-white font-semibold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {act}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Decision */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handleSubmitTriage}
              disabled={!currentSev || !currentAct}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Submit Analyst Triage
            </button>
          </div>

          {/* Post-submission evaluation feedback */}
          {isTriaged && (
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 animate-in fade-in ${
              isSeverityCorrect ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {isSeverityCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                <span>
                  {isSeverityCorrect ? `Accurate Triage! (${selectedAlert.correctSeverity} Severity)` : `Notice: Recommended severity is ${selectedAlert.correctSeverity}`}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                <strong>Standard Operating Procedure:</strong> {selectedAlert.suggestedAction}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                {selectedAlert.explanation}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
