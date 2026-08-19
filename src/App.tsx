import React, { useState } from 'react';
import { Target, Search, CheckCircle, AlertTriangle } from 'lucide-react';
import { TrendPackage, EvaluationResponse } from './types';
import TrendForm from './components/TrendForm';
import EvaluationDashboard from './components/EvaluationDashboard';

export default function App() {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEvaluate = async (trendPackage: TrendPackage) => {
    setIsEvaluating(true);
    setEvaluationResult(null);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/evaluate-trend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trendPackage),
      });
      
      if (!response.ok) {
        throw new Error('Failed to evaluate trend. Check server logs.');
      }
      
      const result: EvaluationResponse = await response.json();
      setEvaluationResult(result);
    } catch (error) {
      console.error('Error evaluating trend:', error);
      setErrorMsg('Failed to run the DISCOVER evaluation. Please try again or check API configuration.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const resetWorkflow = () => {
    setEvaluationResult(null);
    setErrorMsg(null);
  };

  const handleTabClick = (tab: string) => {
    if (tab !== 'DISCOVER') {
      alert(`The ${tab} stage is locked until DISCOVER is complete and approved.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-slate-200 font-sans flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-4 cursor-pointer" onClick={resetWorkflow}>
          <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center font-bold text-white">
            N
          </div>
          <h1 className="text-lg font-medium tracking-tight"><span className="text-white">PROJECT NEXT</span> — <span className="text-indigo-400">DISCOVER</span></h1>
        </div>
        <div className="flex gap-8 items-center">
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <button onClick={() => handleTabClick('DISCOVER')} className="text-white border-b-2 border-indigo-500 pb-5 pt-5 mt-[-20px] mb-[-20px] cursor-pointer">DISCOVER</button>
            <button onClick={() => handleTabClick('CREATE')} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">CREATE</button>
            <button onClick={() => handleTabClick('ACTIVATE')} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">ACTIVATE</button>
          </nav>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs uppercase tracking-widest text-slate-400">AI Engine Active</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-400 w-5 h-5" />
              <p className="text-red-200 text-sm">{errorMsg}</p>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-300">
              <span className="sr-only">Close</span>
              &times;
            </button>
          </div>
        )}

        {!evaluationResult && !isEvaluating && (
          <TrendForm onSubmit={handleEvaluate} />
        )}
        
        {isEvaluating && (
          <div className="flex flex-col items-center justify-center flex-1 py-32 space-y-6">
            <div className="relative flex items-center justify-center w-24 h-24">
               <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
               <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
               <Search className="text-indigo-500 w-8 h-8 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-white">Evaluating Portfolio Fit</h2>
              <p className="text-slate-400">Scanning trend against Rexona, Dove, Lakmé, Lifebuoy, Surf Excel, and Knorr...</p>
            </div>
          </div>
        )}

        {evaluationResult && !isEvaluating && (
          <EvaluationDashboard result={evaluationResult} onReset={resetWorkflow} />
        )}
      </main>
    </div>
  );
}
