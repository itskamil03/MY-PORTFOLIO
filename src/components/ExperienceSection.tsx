'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, type Variants } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Calendar, Check, MapPin, Trophy } from 'lucide-react';

type Job = (typeof PORTFOLIO_DATA.experience)[number];

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
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, when: 'beforeChildren', staggerChildren: 0.07 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 22 } },
};

function initials(org: string) {
  const words = org
    .replace(/(pvt\.?|ltd\.?|private|limited)/gi, '')
    .split(/\s+/)
    .filter(Boolean);
  // Single-word brands like "KodNest" use their capitals ("KN")
  if (words.length === 1) {
    const caps = words[0].match(/[A-Z]/g)?.join('') ?? '';
    return (caps.length >= 2 ? caps : words[0]).slice(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

function TimelineItem({ job }: { job: Job }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isCurrent = /present/i.test(job.time);

  // Feed the pointer position to CSS so the spotlight follows the cursor
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} className="relative grid grid-cols-[32px_1fr] lg:grid-cols-[180px_40px_1fr] gap-x-3 sm:gap-x-5 lg:gap-x-6">
      {/* Meta column (desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="hidden lg:block pt-6 text-right"
      >
        <div className="lg:sticky lg:top-28">
          <p className="font-display text-[15px] font-semibold text-white">{job.time}</p>
          {job.place && (
            <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3 h-3" />
              {job.place}
            </p>
          )}
          <div className="mt-3">
            <span className="inline-flex px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-slate-300">
              {job.type}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Timeline node */}
      <div className="relative flex justify-center pt-6">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
          className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border bg-[#060b11] ${
            isCurrent ? 'border-[#2cdd9c] shadow-[0_0_20px_rgba(44,221,156,0.5)]' : 'border-[#2cdd9c]/40'
          }`}
        >
          {isCurrent && (
            <span className="animate-radar absolute inset-0 rounded-full border border-[#2cdd9c]" />
          )}
          <span className={`w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-[#2cdd9c]' : 'bg-[#2cdd9c]/60'}`} />
        </motion.span>
      </div>

      {/* Card */}
      <motion.article
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        whileHover={{ y: -4 }}
        onMouseMove={onMove}
        className="group relative min-w-0 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-8 overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[#2cdd9c]/25 hover:shadow-[0_30px_60px_-30px_rgba(44,221,156,0.3)]"
      >
        {/* Cursor spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(44,221,156,0.07),transparent_70%)]"
        />
        {/* Top accent line that draws in */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-[#2cdd9c] via-[#2cdd9c]/40 to-transparent"
        />

        <div className="relative">
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <span className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#2cdd9c]/20 to-[#2cdd9c]/5 border border-[#2cdd9c]/25 flex items-center justify-center font-display font-bold text-[15px] text-[#2cdd9c] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                {initials(job.org)}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">{job.role}</h3>
                <p className="mt-0.5 text-sm font-medium text-[#2cdd9c]">{job.org}</p>
                {'subtitle' in job && job.subtitle && (
                  <p className="mt-0.5 text-xs text-slate-400">{job.subtitle}</p>
                )}
              </div>
            </div>
            {isCurrent && (
              <span className="shrink-0 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2cdd9c]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2cdd9c] animate-pulse" />
                Current
              </span>
            )}
          </motion.div>

          {/* Meta (mobile / tablet) */}
          <motion.div
            variants={itemVariants}
            className="lg:hidden mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400"
          >
            {isCurrent && (
              <span className="sm:hidden inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#2cdd9c]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2cdd9c] animate-pulse" />
                Current
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#2cdd9c]" />
              {job.time}
            </span>
            {job.place && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2cdd9c]" />
                {job.place}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full border border-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-slate-300">
              {job.type}
            </span>
          </motion.div>

          {/* Responsibilities */}
          <motion.p
            variants={itemVariants}
            className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Key Responsibilities &amp; Impact
          </motion.p>
          <ul className="mt-3 space-y-3">
            {job.points.map((pt) => (
              <motion.li
                key={pt}
                variants={itemVariants}
                className="flex items-start gap-3 text-sm leading-6 text-slate-300"
              >
                <span className="mt-[3px] shrink-0 w-[18px] h-[18px] rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-[#2cdd9c]" strokeWidth={3} />
                </span>
                <span>{pt}</span>
              </motion.li>
            ))}
          </ul>

          {/* Highlights */}
          {job.highlights && job.highlights.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job.highlights.map((hl) => (
                <motion.div
                  key={hl}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-3.5 rounded-2xl border border-[#2cdd9c]/15 bg-gradient-to-br from-[#2cdd9c]/[0.07] to-transparent"
                >
                  <span className="shrink-0 w-8 h-8 rounded-xl bg-[#2cdd9c]/15 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-[#2cdd9c]" />
                  </span>
                  <span className="text-[13px] leading-5 text-slate-200">{hl}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Stack */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
            <motion.span variants={itemVariants} className="mr-1 font-mono text-[11px] text-slate-500">
              Stack
            </motion.span>
            {job.technologies.map((t) => (
              <motion.span
                key={t}
                variants={chipVariants}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-slate-300 transition-colors hover:border-[#2cdd9c]/40 hover:text-[#2cdd9c]"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="relative py-16 sm:py-24 overflow-hidden bg-[#091016] border-y border-white/[0.04]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[480px] h-[480px] bg-emerald-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#2cdd9c]" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#2cdd9c]">
              Career Timeline
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
            Work <span className="text-[#2cdd9c]">experience.</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-7 text-slate-400">
            Professional software engineering roles, full-stack product delivery and core architectural
            responsibilities.
          </p>
        </motion.header>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Rail: faint track plus a mint line that draws as you scroll.
              x = node column centre (mobile: 16px; desktop: 180px meta + 24px gap + 20px). */}
          <div className="absolute top-0 bottom-0 left-[15.5px] lg:left-[223.5px] w-px bg-white/[0.07]" aria-hidden="true">
            <motion.div
              style={{ scaleY: lineProgress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#2cdd9c] via-[#2cdd9c]/70 to-[#38bdf8]/40 shadow-[0_0_12px_rgba(44,221,156,0.6)]"
            />
          </div>

          <div className="space-y-10 sm:space-y-14">
            {PORTFOLIO_DATA.experience.map((job) => (
              <TimelineItem key={`${job.org}-${job.role}`} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
