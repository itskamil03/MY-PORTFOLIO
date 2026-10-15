'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { MapPin, Clock, Sparkles } from 'lucide-react';

export function LiveStatusBadge() {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST (Asia/Kolkata)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-emerald-500/10 text-xs">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="tracking-wide">Available for Work</span>
      </div>

      <div className="hidden sm:flex items-center gap-1 text-slate-400 font-mono text-[11px] px-1">
        <MapPin className="w-3 h-3 text-cyan-400" />
        <span>{PORTFOLIO_DATA.location}</span>
      </div>

      <div className="hidden md:flex items-center gap-1 text-slate-400 font-mono text-[11px] pl-1 border-l border-white/10">
        <Clock className="w-3 h-3 text-amber-400" />
        <span>{timeString || 'IST'}</span>
      </div>
    </div>
  );
}
