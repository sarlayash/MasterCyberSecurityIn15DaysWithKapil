import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ArrowRight, RotateCcw, ShieldCheck, Flame } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface StageChoice {
  text: string;
  isOptimal: boolean;
  score: number;
  rationale: string;
}

interface IncidentStage {
  stageNumber: number;
  stageName: string;
  brief: string;
  choices: StageChoice[];
}

export const IncidentResponseSim: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, StageChoice>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const stages: IncidentStage[] = [
    {
      stageNumber: 1,
      stageName: "IDENTIFY",
      brief: "Multiple employee accounts in Finance & Executive tiers are triggering anomalous failed login alerts from foreign IP addresses within minutes of each other.",
      choices: [
        {
          text: "Confirm active Distributed Password Spraying campaign targeting VPN gateway via auth logs.",
          isOptimal: true,
          score: 15,
          rationale: "Correct! Identifying the attack pattern (password spraying vs single brute-force) defines the scope accurately."
        },
        {
          text: "Assume employees forgot their passwords and email them a temporary default password.",
          isOptimal: false,
          score: 0,
          rationale: "Dangerous assumption. Fails to recognize a coordinated adversary reconnaissance attack."
        }
      ]
    },
    {
      stageNumber: 2,
      stageName: "CONTAIN",
      brief: "Two accounts (finance.lead and ap.specialist) show successful logins from an anomalous IP in Bucharest followed immediately by SharePoint downloads.",
      choices: [
        {
          text: "Revoke active OAuth session tokens, enforce an immediate password reset, and apply conditional access geoblock.",
          isOptimal: true,
          score: 15,
          rationale: "Optimal! Shuts down active attacker sessions without destroying endpoint forensic evidence."
        },
        {
          text: "Immediately pull the power cables from all office servers and shut down the company internet.",
          isOptimal: false,
          score: 5,
          rationale: "Excessive operational disruption and destroys volatile forensic memory across servers."
        }
      ]
    },
    {
      stageNumber: 3,
      stageName: "INVESTIGATE",
      brief: "You must determine how far the attacker moved laterally and what data was accessed.",
      choices: [
        {
          text: "Audit M365 Unified Audit Logs, correlate Azure AD Sign-in logs, and inspect endpoint EDR process trees for credential dumping.",
          isOptimal: true,
          score: 15,
          rationale: "Comprehensive! Cross-layer log correlation confirms exactly which files were accessed or synced."
        },
        {
          text: "Simply ask the two affected employees if they think their files were copied.",
          isOptimal: false,
          score: 0,
          rationale: "End users do not have visibility into cloud exfiltration or lateral API activity."
        }
      ]
    },
    {
      stageNumber: 4,
      stageName: "ERADICATE",
      brief: "Investigation reveals the attacker registered an unauthorized OAuth enterprise application to maintain persistent backdoor access.",
      choices: [
        {
          text: "Delete the rogue Azure AD Enterprise Application, purge unauthorized mail forwarding inbox rules, and wipe any unapproved MFA phone numbers.",
          isOptimal: true,
          score: 15,
          rationale: "Crucial! Attackers frequently leave dormant persistence via rogue OAuth apps and inbox forwarding rules."
        },
        {
          text: "Delete the user mailboxes entirely and create new ones.",
          isOptimal: false,
          score: 5,
          rationale: "Overkill that destroys historical evidence and business continuity."
        }
      ]
    },
    {
      stageNumber: 5,
      stageName: "RECOVER",
      brief: "Restoring verified safe operational status for the affected business units.",
      choices: [
        {
          text: "Re-enable user accounts with hardware FIDO2 / WebAuthn MFA enforcement and closely monitor telemetry for 72 hours.",
          isOptimal: true,
          score: 15,
          rationale: "Phishing-resistant MFA guarantees the compromised password credentials cannot be reused."
        },
        {
          text: "Restore everything to yesterday's state without changing user authentication factors.",
          isOptimal: false,
          score: 0,
          rationale: "Without changing authentication factors, the attacker can immediately log right back in."
        }
      ]
    },
    {
      stageNumber: 6,
      stageName: "DOCUMENT",
      brief: "Compiling the formal Incident Handling & Chain of Custody Report.",
      choices: [
        {
          text: "Draft complete timeline of events, list all affected data assets, preserve cryptographic hashes of evidence, and notify legal counsel.",
          isOptimal: true,
          score: 15,
          rationale: "Standard compliance requirement under privacy and corporate governance frameworks."
        },
        {
          text: "Keep only a verbal record to avoid any written audit trail.",
          isOptimal: false,
          score: 0,
          rationale: "Severe compliance and regulatory breach violation."
        }
      ]
    },
    {
      stageNumber: 7,
      stageName: "PREVENT RECURRENCE",
      brief: "Post-Incident review to ensure this vector is permanently defended across the organization.",
      choices: [
        {
          text: "Enforce company-wide FIDO2 MFA, disable legacy basic authentication protocols, and configure automated risk-based conditional access.",
          isOptimal: true,
          score: 10,
          rationale: "Completely eliminates password spraying as an exploitable threat vector across the enterprise."
        },
        {
          text: "Send a reminder email asking employees to pick longer passwords.",
          isOptimal: false,
          score: 2,
          rationale: "Passive reminders fail to prevent modern automated adversary-in-the-middle attacks."
        }
      ]
    }
  ];

  const handleSelectChoice = (choice: StageChoice) => {
    setSelectedChoices({ ...selectedChoices, [currentStageIndex]: choice });
  };

  const handleNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    } else {
      setIsCompleted(true);
      const totalScore = Object.values(selectedChoices).reduce((acc, c) => acc + c.score, 0);
      storageService.recordSimulatorRun('incident', totalScore);
    }
  };

  const handleReset = () => {
    setCurrentStageIndex(0);
    setSelectedChoices({});
    setIsCompleted(false);
  };

  const currentStage = stages[currentStageIndex];
  const currentSelection = selectedChoices[currentStageIndex];
  const totalScore = Object.values(selectedChoices).reduce((acc, c) => acc + c.score, 0);

  return (
    <div className="space-y-6">
      
      {/* Objective Banner */}
      <div className="p-4 rounded-xl bg-[#091326] border border-cyan-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold block">
            LAB OBJECTIVE: 7-STEP INCIDENT RESPONSE LIFECYCLE
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Scenario: Multiple employee accounts showing anomalous failed logins across regions. Make defensible triage decisions through all 7 lifecycle phases.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>CURRENT SCORE: {totalScore} / 100 PTS</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="grid grid-cols-7 gap-1.5 p-2 rounded-2xl bg-[#081124] border border-cyan-900/40">
        {stages.map((stg, i) => {
          const isDone = selectedChoices[i] !== undefined;
          const isCurrent = i === currentStageIndex;

          return (
            <div
              key={stg.stageNumber}
              className={`p-2 rounded-xl text-center border transition-all ${
                isCurrent 
                  ? 'bg-cyan-950 border-cyan-400 text-white shadow-md' 
                  : isDone 
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <span className="text-[10px] font-mono block font-bold">
                PHASE 0{stg.stageNumber}
              </span>
              <span className="text-[11px] font-bold truncate block">
                {stg.stageName}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Stage Decision Card */}
      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#081124] border border-cyan-900/60 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block">
                PHASE {currentStage.stageNumber} OF 7: {currentStage.stageName}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Active Tactical Decision Point
              </h3>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans">
            <strong>Incident Situation:</strong> {currentStage.brief}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Choose Defensible Incident Response Decision:
            </h4>

            {currentStage.choices.map((ch, idx) => {
              const selected = currentSelection?.text === ch.text;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectChoice(ch)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs leading-relaxed ${
                    selected
                      ? ch.isOptimal 
                        ? 'bg-emerald-950/60 border-emerald-500 text-white font-medium shadow-lg' 
                        : 'bg-amber-950/60 border-amber-500 text-white font-medium shadow-lg'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-mono font-bold text-cyan-400">
                      Option {idx === 0 ? 'A' : 'B'}:
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-100">{ch.text}</p>
                      {selected && (
                        <p className={`mt-2 pt-2 border-t text-[11px] font-mono ${
                          ch.isOptimal ? 'border-emerald-800 text-emerald-300' : 'border-amber-800 text-amber-300'
                        }`}>
                          <strong>Evaluation:</strong> {ch.rationale} (+{ch.score} Pts)
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleNextStage}
              disabled={!currentSelection}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <span>{currentStageIndex < stages.length - 1 ? 'Next Lifecycle Stage' : 'Complete Incident'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-[#081124] border border-cyan-500/50 shadow-2xl text-center space-y-5 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-bold text-white">
            Incident Successfully Resolved!
          </h3>

          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            You successfully navigated all 7 NIST incident response phases, contained the password spraying breach, eradicated the rogue OAuth persistence, and enforced phishing-resistant FIDO2 MFA.
          </p>

          <div className="inline-block p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
            <span className="text-xs text-slate-400 block">FINAL INCIDENT SCORE</span>
            <span className="text-3xl font-black text-amber-400">{totalScore} / 100</span>
          </div>

          <div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Incident Simulator</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
