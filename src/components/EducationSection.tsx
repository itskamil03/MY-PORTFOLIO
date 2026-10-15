'use client';

import React, { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform, type Variants } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { BookOpen, Calendar, CheckCircle2, GraduationCap, School, Sparkles } from 'lucide-react';

type Edu = (typeof PORTFOLIO_DATA.education)[number];

const COURSEWORK = [
  'Data Structures',
  'Algorithms',
  'DBMS',
  'Object-Oriented Programming',
  'Computer Networks',
  'Software Engineering',
  'Web Engineering',
];

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.12, when: 'beforeChildren', staggerChildren: 0.07 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 22 } },
};

const RING_RADIUS = 34;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** Circular gauge that fills to the score and counts the number up when it scrolls into view */
function ScoreRing({ value, max, label, suffix = '' }: { value: number; max: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const progress = useMotionValue(0);
  const decimals = Number.isInteger(value) ? 0 : 1;
  const display = useTransform(progress, (v) => `${v.toFixed(decimals)}${suffix}`);
  const dashOffset = useTransform(progress, (v) => RING_LENGTH * (1 - v / max));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(progress, value, { duration: 1.6, ease: EASE, delay: 0.3 });
    return () => controls.stop();
  }, [inView, progress, value]);

  return (
    <div ref={ref} className="relative w-[84px] h-[84px] shrink-0">
      <svg viewBox="0 0 84 84" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id={`ring-${label}-${max}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2cdd9c" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <circle cx="42" cy="42" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <motion.circle
          cx="42"
          cy="42"
          r={RING_RADIUS}
          fill="none"
          stroke={`url(#ring-${label}-${max})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={RING_LENGTH}
          style={{ strokeDashoffset: dashOffset }}
          className="drop-shadow-[0_0_6px_rgba(44,221,156,0.5)]"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span className="font-display text-lg font-bold text-white leading-none">{display}</motion.span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-slate-500">{label}</span>
      </div>
    </div>
  );
}

function EducationCard({ edu, index }: { edu: Edu; index: number }) {
  const Icon = index === 0 ? GraduationCap : School;

  // Feed the pointer position to CSS so the spotlight follows the cursor
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      variants={cardVariants}
      custom={index}
      whileHover={{ y: -6 }}
      onMouseMove={onMove}
      className="group relative flex flex-col rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8 overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[#2cdd9c]/25 hover:shadow-[0_30px_60px_-30px_rgba(44,221,156,0.3)]"
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(380px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(44,221,156,0.07),transparent_70%)]"
      />
      {/* Oversized watermark icon */}
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-6 w-40 h-40 text-white/[0.025] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110"
      />

      <div className="relative flex flex-1 flex-col">
        {/* Top row */}
        <motion.div variants={itemVariants} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2cdd9c]/20 to-[#2cdd9c]/5 border border-[#2cdd9c]/25 flex items-center justify-center text-[#2cdd9c] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
              <Icon className="w-5 h-5" />
            </span>
            {'level' in edu && edu.level && (
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {edu.level}
              </span>
            )}
          </div>
          {edu.badge && (
            <span className="px-2.5 py-1 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25 font-mono text-[10px] font-semibold text-[#2cdd9c]">
              {edu.badge}
            </span>
          )}
        </motion.div>

        {/* Degree + score */}
        <div className="mt-6 flex items-start justify-between gap-5">
          <motion.div variants={itemVariants} className="min-w-0">
            <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug transition-colors duration-300 group-hover:text-[#2cdd9c]">
              {edu.deg}
            </h3>
            <p className="mt-2 text-sm font-medium text-slate-300">{edu.org}</p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-[#2cdd9c]" />
              {edu.time}
            </p>
          </motion.div>
          {'score' in edu && edu.score && (
            <motion.div variants={itemVariants}>
              <ScoreRing {...edu.score} />
            </motion.div>
          )}
        </div>

        {/* Note */}
        <motion.div
          variants={itemVariants}
          className="mt-auto pt-6"
        >
          <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-[#2cdd9c]" />
            <p className="text-[13px] leading-6 text-slate-300">{edu.note}</p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="relative py-16 sm:py-24 overflow-hidden bg-[#060b11]">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/3 w-[480px] h-[480px] bg-emerald-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.header variants={fadeUp} className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#2cdd9c]" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#2cdd9c]">
              Academic Foundation
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
            Education &amp; <span className="text-[#2cdd9c]">credentials.</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-7 text-slate-400">
            Formal degrees, academic performance and the engineering foundation behind my work.
          </p>
        </motion.header>

        {/* Education cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.education.map((edu, i) => (
            <EducationCard key={edu.deg} edu={edu} index={i} />
          ))}
        </div>

        {/* Coursework */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="mt-6 rounded-3xl border border-white/[0.07] bg-gradient-to-r from-[#2cdd9c]/[0.05] via-white/[0.02] to-transparent p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-2xl bg-[#2cdd9c]/10 border border-[#2cdd9c]/20 flex items-center justify-center text-[#2cdd9c]">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-white tracking-tight">
                  Core Engineering Coursework
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">The fundamentals behind every build</p>
              </div>
            </div>
            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25 font-mono text-[11px] font-semibold text-[#2cdd9c]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Graduated B.Tech (2026)
            </span>
          </div>

          <motion.ul
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {COURSEWORK.map((course) => (
              <motion.li
                key={course}
                variants={chipVariants}
                whileHover={{ y: -2 }}
                className="px-3.5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-[13px] text-slate-300 transition-colors duration-300 hover:border-[#2cdd9c]/40 hover:text-[#2cdd9c]"
              >
                {course}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
