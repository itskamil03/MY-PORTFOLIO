'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';
import { CheckCircle2, Code, Zap, Award } from 'lucide-react';

export function StatsOverview() {
  const icons = [Code, Zap, CheckCircle2, Award];

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {PORTFOLIO_DATA.stats.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                onMouseEnter={() => sounds.playHover()}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              >
                {/* Glow subtle hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                    {item.value}{item.suffix}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-emerald-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
