'use client';

import React, { useState, useEffect } from 'react';
import { sounds } from '@/lib/sound';
import { Sparkles, Terminal } from 'lucide-react';

const GREETINGS = [
  { text: 'Hello', lang: 'English' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'السلام عليكم', lang: 'Urdu / Arabic' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Welcome', lang: 'Portfolio' },
];

interface WelcomeIntroProps {
  onComplete?: () => void;
}

export function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';

    // Cycle through greetings
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev < GREETINGS.length - 1) {
          return prev + 1;
        }
        clearInterval(wordInterval);
        return prev;
      });
    }, 280);

    // Progress counter 0 to 100%
    const startTime = Date.now();
    const duration = 2000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(progressInterval);
        // Start exit animation after reaching 100%
        setTimeout(() => {
          setIsExiting(true);
          try {
            sounds.playSuccess();
          } catch {
            // fallback
          }
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }, 800);
        }, 400);
      }
    }, 25);

    // Listen for ESC key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const skipIntro = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 400);
  };

  if (isDone) return null;

  const current = GREETINGS[index];
  const isFinal = index === GREETINGS.length - 1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#04090b] text-white select-none transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-sky-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Top Bar: System Status & Skip Button */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#0a1015] rounded-[11px] flex items-center justify-center">
              <span className="font-mono font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                KA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300">Mohammad Kamil Akhtar</span>
          </div>
        </div>

        <button
          onClick={skipIntro}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <span>Skip</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-slate-500 group-hover:text-slate-300 border border-white/10">
            Esc
          </kbd>
        </button>
      </div>

      {/* Center: Animated Greeting Lockup */}
      <div className="flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-emerald-400 mb-6">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>System Initialized</span>
        </div>

        {/* Big Greeting Word */}
        <div className="relative min-h-[90px] sm:min-h-[120px] flex items-center justify-center">
          <h1 
            key={current.text}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white flex items-center gap-3 sm:gap-4 animate-in fade-in zoom-in-95 duration-300"
          >
            <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-emerald-400 shadow-[0_0_20px_#34d399] animate-pulse" />
            <span className={isFinal ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400' : 'text-white'}>
              {current.text}
            </span>
          </h1>
        </div>

        {/* Subtitle tag */}
        <p className="mt-4 text-xs sm:text-sm font-mono text-slate-400 tracking-widest uppercase">
          {isFinal ? 'Full Stack Developer &bull; Portfolio 2026' : current.lang}
        </p>
      </div>

      {/* Bottom: Progress Bar & Counter */}
      <div className="w-full max-w-xl mx-auto px-6 pb-12 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Loading modules...</span>
          </div>
          <span className="text-emerald-400 font-bold tabular-nums">{progress}%</span>
        </div>

        {/* Progress bar track */}
        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden border border-white/10 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(52,211,153,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default WelcomeIntro;
