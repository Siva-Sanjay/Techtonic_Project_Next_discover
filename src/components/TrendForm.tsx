import React, { useState } from 'react';
import { TrendPackage } from '../types';
import { motion } from 'motion/react';

interface TrendFormProps {
  onSubmit: (trend: TrendPackage) => void;
}

export default function TrendForm({ onSubmit }: TrendFormProps) {
  const [formData, setFormData] = useState<TrendPackage>({
    topic: 'Unexpected viral moment — Indian grassroots football team draws a major club in a tournament, fanbase erupts online',
    platforms: 'Instagram, X, YouTube Shorts',
    velocity: 'rising fast (peaking within 72 hours)',
    sentiment: 'overwhelmingly positive, high excitement/pride',
    geography: 'India, national reach with strong Tier 2/3 city concentration',
    audience_demographics: '16-35, sport-engaged',
    lifecycle_stage: 'emerging, pre-peak',
    source_summary: 'Organic fan content, sports media pickup, several brands already reacting generically'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto flex flex-col h-full"
    >
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-500/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white uppercase">SENSE Output</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-tighter">ID: TR-{Math.floor(Math.random() * 9000) + 1000}</span>
        </div>
        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-2 leading-tight">
          NEW TREND / SIGNAL
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">Input a trend package from SENSE to generate an Opportunity Brief.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-slate-900/50 border border-white/5 overflow-hidden flex-1 flex flex-col">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Topic *</label>
            <textarea
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-600 resize-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Platforms</label>
            <input
              type="text"
              name="platforms"
              value={formData.platforms}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Velocity</label>
            <input
              type="text"
              name="velocity"
              value={formData.velocity}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sentiment</label>
            <input
              type="text"
              name="sentiment"
              value={formData.sentiment}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Geography</label>
            <input
              type="text"
              name="geography"
              value={formData.geography}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Audience Demographics</label>
            <input
              type="text"
              name="audience_demographics"
              value={formData.audience_demographics}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lifecycle Stage</label>
            <input
              type="text"
              name="lifecycle_stage"
              value={formData.lifecycle_stage}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Source Summary</label>
            <textarea
              name="source_summary"
              value={formData.source_summary}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-600 resize-none"
            />
          </div>
        </div>
        
        <div className="bg-slate-900 border-t border-white/10 p-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-500 transition-colors text-sm"
          >
            GENERATE BRIEF
          </button>
        </div>
      </form>
    </motion.div>
  );
}
