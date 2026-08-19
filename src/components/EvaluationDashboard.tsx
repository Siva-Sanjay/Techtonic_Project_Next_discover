import React from 'react';
import { EvaluationResponse } from '../types';
import { AlertTriangle, CheckCircle, Target, Zap, Clock, Users, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface EvaluationDashboardProps {
  result: EvaluationResponse;
  onReset: () => void;
}

// Simple Circular Progress Component
const CircularProgress = ({ value, label, colorClass }: { value: number, label: string, colorClass: string }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center mb-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r={radius} className="stroke-slate-800" strokeWidth="8" fill="none" />
          <circle 
            cx="48" 
            cy="48" 
            r={radius} 
            className={`transition-all duration-1000 ease-out ${colorClass}`}
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute flex items-center justify-center">
          <span className="text-xl font-bold text-white">{value}%</span>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">{label}</span>
    </div>
  );
};

export default function EvaluationDashboard({ result, onReset }: EvaluationDashboardProps) {
  if (result.status === 'NO_FIT') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white">Opportunity Brief</h2>
            <p className="text-sm text-slate-400 mt-1">Status: <span className="font-semibold text-emerald-400">Analysis Complete</span></p>
          </div>
          <button onClick={onReset} className="text-slate-400 hover:text-white font-medium px-4 py-2 text-sm">NEW TREND</button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/50 border border-white/10 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Portfolio Fit: None</h3>
          <p className="text-slate-400 max-w-md">No HUL brand has sufficient authentic connection to this trend. Recommend monitoring only.</p>
        </div>
      </motion.div>
    );
  }

  const { topMatch } = result;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Opportunity Brief</h2>
          <p className="text-sm text-slate-400 mt-1">Status: <span className="font-semibold text-emerald-400">Analysis Complete</span></p>
        </div>
        <button onClick={onReset} className="text-slate-400 hover:text-white font-medium px-4 py-2 text-sm transition-colors">
          NEW TREND
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-auto">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Match Hero */}
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-500/30 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">Top Match</span>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{topMatch?.brand || 'Unknown'}</h3>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-black text-indigo-400 leading-none">{topMatch?.fitScore || 0}</span>
                <span className="text-sm text-slate-400 font-bold uppercase tracking-wider pb-1">Fit Score</span>
              </div>
            </div>

            <div className="flex justify-around bg-slate-950/50 rounded-xl p-6 border border-white/5">
              <CircularProgress value={topMatch?.positioningAlignment || 0} label="Positioning" colorClass="stroke-indigo-500" />
              <CircularProgress value={topMatch?.toneAlignment || 0} label="Tone Match" colorClass="stroke-emerald-500" />
              <CircularProgress value={topMatch?.audienceOverlap || 0} label="Audience" colorClass="stroke-amber-500" />
            </div>
          </div>

          {/* Rationale & Participation Mode */}
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" /> 
              Recommended Participation Mode
            </h4>
            <p className="text-lg font-medium text-white mb-6">{result.recommendedParticipationMode || 'N/A'}</p>
            
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Rationale</h4>
            <p className="text-slate-300 leading-relaxed text-sm">{result.rationale}</p>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Trend Context */}
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" /> 
              Trend Context
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Topic</span>
                <p className="text-sm text-slate-300">{result.trend}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Market Potential</span>
                <p className="text-sm text-slate-300">{result.marketPotential || 'N/A'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Urgency Window</span>
                <div className="flex items-center gap-2 text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded inline-flex border border-amber-400/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{result.urgencyWindow || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk & Conflicts */}
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> 
              Risk Flags & Conflicts
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Portfolio Conflict</span>
                {result.portfolioConflictFlag ? (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-3 py-2 rounded text-xs font-medium leading-relaxed">
                    Yes — Multiple brands score within 15 points. ({result.secondMatch?.brand} scores {result.secondMatch?.fitScore}). Cross-brand coordination required.
                  </div>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-2 rounded text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5" /> Clear Single Brand Win
                  </div>
                )}
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Risk Flags</span>
                {result.riskFlags && result.riskFlags.toLowerCase() !== 'none identified' ? (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-3 py-2 rounded text-xs font-medium leading-relaxed">
                    {result.riskFlags}
                  </div>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-2 rounded text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5" /> None Identified
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <footer className="bg-slate-950 border-t border-white/10 p-4 md:px-6 flex flex-col md:flex-row items-center justify-between rounded-xl shadow-lg shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-slate-800 rounded text-xs font-medium text-slate-400">STAGE 1 / 4</div>
          <div className="flex items-center gap-2 text-indigo-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Portfolio Scanned</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-right">
            CURRENT STATUS<br/>
            <span className="text-white">PENDING HUMAN REVIEW</span>
          </span>
          <button onClick={() => alert('Decision confirmed. Escalate to CREATE stage.')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors text-sm whitespace-nowrap shadow-lg shadow-indigo-600/20">
            CONFIRM SELECTION
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
