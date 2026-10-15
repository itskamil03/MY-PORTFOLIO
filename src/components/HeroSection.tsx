'use client';

import React, { useRef } from 'react';
import { motion, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';

interface HeroSectionProps {
  onOpenTerminal?: () => void;
}

// Deterministic star positions so server and client render the same markup
const STARS = Array.from({ length: 48 }, (_, i) => ({
  top: (i * 37) % 100,
  left: (i * 61 + 13) % 100,
  size: i % 7 === 0 ? 2 : 1,
  opacity: 0.25 + ((i * 13) % 50) / 100,
}));

// Floor geometry (SVG units): horizon at y=60, floor edge at y=400
const HORIZON = 60;
const FLOOR_DEPTH = 340;
const ROW_COUNT = 22;
const ROW_SPACING = 0.6; // distance between tile rows in "depth" units
const ROW_SECONDS = 1.4; // time for one row to advance to the next row's position

// Screen position of tile row `i` at loop phase `p` (0 → 1). Rows advance toward the
// viewer; when p wraps, every row lands exactly where its neighbour was, so the loop is seamless.
function rowAt(i: number, p: number) {
  const depth = 1 + (i + 1 - p) * ROW_SPACING;
  const y = HORIZON + FLOOR_DEPTH / depth;
  const nearness = (y - HORIZON) / FLOOR_DEPTH;
  return { y, opacity: 0.04 + nearness * 0.32 };
}

function PerspectiveGrid() {
  const rays = [-600, -380, -200, -60, 60, 170, 270, 360, 440, 500, 560, 640, 730, 830, 940, 1060, 1200, 1380, 1600];
  const rowRefs = useRef<(SVGLineElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useAnimationFrame((time) => {
    if (reduceMotion) return;
    const p = (time / 1000 / ROW_SECONDS) % 1;
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const { y, opacity } = rowAt(i, p);
      el.setAttribute('y1', String(y));
      el.setAttribute('y2', String(y));
      el.setAttribute('stroke-opacity', String(opacity));
    });
  });

  return (
    <div className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-0 top-[60px] h-24 bg-gradient-to-b from-[#2cdd9c]/[0.08] to-transparent blur-2xl" />
      <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="heroGridFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2cdd9c" stopOpacity="0" />
            <stop offset="35%" stopColor="#2cdd9c" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2cdd9c" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="heroGridMask" cx="50%" cy="70%" r="70%">
            <stop offset="40%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="heroGridMaskEl">
            <rect width="1000" height="400" fill="url(#heroGridMask)" />
          </mask>
        </defs>
        <g mask="url(#heroGridMaskEl)">
          {rays.map((x) => (
            <line key={`r${x}`} x1="500" y1="60" x2={x} y2="400" stroke="url(#heroGridFade)" strokeWidth="1" />
          ))}
          {Array.from({ length: ROW_COUNT }, (_, i) => {
            const { y, opacity } = rowAt(i, 0);
            return (
              <line
                key={`h${i}`}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                x1="-600"
                y1={y}
                x2="1600"
                y2={y}
                stroke="#2cdd9c"
                strokeOpacity={opacity}
                strokeWidth="1"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

const line = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function HeroSection(_props: HeroSectionProps) {
  const scrollTo = (id: string) => {
    sounds.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-28 sm:pt-32 pb-12 overflow-hidden select-none bg-[#04090b]"
    >
      {/* Background: teal-tinted depth + starfield */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_65%,rgba(0,120,100,0.28),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,90,80,0.18),transparent_70%)]" />
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, opacity: s.opacity }}
          />
        ))}
      </div>

      <PerspectiveGrid />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          className="font-display font-black uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,7vw,6.25rem)]"
        >
          <motion.span variants={line} custom={0} className="block text-white">
            Engineering
          </motion.span>
          <motion.span variants={line} custom={1} className="block text-[#2cdd9c]">
            Digital
          </motion.span>
          <motion.span variants={line} custom={2} className="block text-[#2cdd9c]">
            Excellence
          </motion.span>
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-8 sm:mt-10 max-w-2xl text-base sm:text-lg lg:text-xl font-light text-slate-300/90 leading-relaxed"
        >
          <span className="font-semibold text-white">{PORTFOLIO_DATA.name}</span> is an expert Full
          Stack Developer &amp; Freelance Software Engineer building high-performance, human-centered
          web applications.
        </motion.p>

        {/* Scroll cue */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={() => scrollTo('about')}
          className="mt-8 font-display text-[11px] sm:text-xs font-bold tracking-[0.35em] text-slate-300 hover:text-[#2cdd9c] transition-colors cursor-pointer"
        >
          SCROLL
        </motion.button>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="btn-sweep w-full sm:w-auto h-12 sm:h-[52px] px-8 rounded-full bg-[#2cdd9c] hover:bg-[#4fe8b2] text-slate-950 font-display font-semibold text-[15px] sm:text-base tracking-tight shadow-[0_0_30px_rgba(44,221,156,0.3)] hover:shadow-[0_0_44px_rgba(44,221,156,0.55)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04090b] focus-visible:ring-[#2cdd9c]"
          >
            Explore My Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto h-12 sm:h-[52px] px-8 rounded-full bg-black hover:bg-[#0b1416] border border-white/10 hover:border-[#2cdd9c]/50 text-white font-display font-semibold text-[15px] sm:text-base tracking-tight hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}
