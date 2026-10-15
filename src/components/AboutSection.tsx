'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { ArrowUpRight, Award, Briefcase, Download, MapPin, Users, Zap } from 'lucide-react';

const STATS = [
  { value: '1+', label: 'Years Experience', Icon: Briefcase },
  { value: '20+', label: 'Projects Delivered', Icon: Zap },
  { value: '10+', label: 'Happy Clients', Icon: Users },
  { value: '4+', label: 'Awards', Icon: Award },
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

const TILT_SPRING = { stiffness: 160, damping: 18, mass: 0.6 };

/**
 * Portrait that reacts to the cursor: the card tilts in 3D, a light glare tracks the pointer,
 * and the photo, name plate and accent frame drift by different amounts for a parallax depth effect.
 */
function PortraitCard() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // Pointer position within the card, normalised to -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, TILT_SPRING);
  const sy = useSpring(py, TILT_SPRING);

  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-11, 11]);
  const photoX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const photoY = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const plateX = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const plateY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const frameX = useTransform(sx, [-0.5, 0.5], [6, 26]);
  const frameY = useTransform(sy, [-0.5, 0.5], [6, 26]);
  const glareX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), rgba(44,221,156,0.06) 35%, transparent 65%)`;
  const edgeGlow = useMotionTemplate`radial-gradient(320px circle at ${glareX}% ${glareY}%, rgba(44,221,156,0.7), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    setHovered(false);
    px.set(0);
    py.set(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[400px] [perspective:1100px]"
      onPointerEnter={(e) => e.pointerType === 'mouse' && !reduceMotion && setHovered(true)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* Offset accent frame — drifts behind the card */}
      <motion.div
        aria-hidden="true"
        style={{ x: frameX, y: frameY }}
        animate={{ borderColor: hovered ? 'rgba(44,221,156,0.45)' : 'rgba(44,221,156,0.25)' }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-[28px] border"
      />

      <motion.div
        style={{ rotateX, rotateY }}
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative aspect-[4/5] rounded-[28px] will-change-transform"
      >
        {/* Mint edge light that follows the cursor around the border */}
        <motion.div
          aria-hidden="true"
          style={{ background: edgeGlow }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-px rounded-[29px]"
        />

        <div
          className={`absolute inset-0 rounded-[28px] overflow-hidden border border-white/10 bg-[#0a1418] transition-shadow duration-500 ${
            hovered
              ? 'shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(44,221,156,0.35)]'
              : 'shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]'
          }`}
        >
          {/* Photo — oversized so the parallax drift never reveals an edge */}
          <motion.div
            style={{ x: photoX, y: photoY }}
            animate={{ scale: hovered ? 1.12 : 1.06 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={PORTFOLIO_DATA.profileImage}
              alt={PORTFOLIO_DATA.name}
              fill
              priority
              sizes="(max-width: 1024px) 400px, 420px"
              className="object-cover object-top"
            />
          </motion.div>

          {/* Readability gradient for the name plate */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#03080a] via-[#03080a]/20 to-transparent" />

          {/* Cursor-tracking glare */}
          <motion.div
            aria-hidden="true"
            style={{ background: glare }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 mix-blend-screen pointer-events-none"
          />

          {/* Availability badge */}
          <motion.div
            style={{ x: plateX, y: plateY }}
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#2cdd9c] opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2cdd9c]" />
            </span>
            <span className="text-[11px] font-medium text-slate-200">Available for work</span>
          </motion.div>

          {/* Name plate */}
          <motion.div style={{ x: plateX, y: plateY }} className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              {PORTFOLIO_DATA.name}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
              <span>Full Stack Developer</span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2cdd9c]" />
                Jamshedpur, India
              </span>
            </div>
            <motion.span
              aria-hidden="true"
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-4 block h-px origin-left bg-gradient-to-r from-[#2cdd9c] to-transparent"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function AboutSection() {
  const handleResumeDownload = () => {
    sounds.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2cdd9c', '#38bdf8', '#a855f7'],
      });
    } catch {
      // fallback
    }
  };

  const handleConnectClick = () => {
    sounds.playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative py-6 sm:py-14 overflow-hidden bg-[#060b11]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[520px] h-[520px] bg-emerald-500/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-cyan-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.header variants={fadeUp} className="mb-12 sm:mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#2cdd9c]" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#2cdd9c]">
              About Me
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
            Crafting digital <span className="text-[#2cdd9c]">excellence.</span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <motion.div variants={fadeUp} custom={1} className="lg:col-span-5">
            <PortraitCard />
          </motion.div>

          {/* Bio, stats, actions */}
          <div className="lg:col-span-7">
            <motion.h3
              variants={fadeUp}
              custom={2}
              className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug"
            >
              Full Stack Developer building fast, reliable products for the web.
            </motion.h3>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-5 space-y-4 text-[15px] sm:text-base leading-7 text-slate-400"
            >
              <p>
                I&apos;m <strong className="text-white font-semibold">{PORTFOLIO_DATA.name}</strong>, a
                full stack developer and freelance software engineer based in Jamshedpur. I turn ideas into
                production-ready applications, from the database through to the interface.
              </p>
              <p>
                My core stack is <span className="text-slate-200 font-medium">MERN</span> and{' '}
                <span className="text-[#2cdd9c] font-medium">Next.js</span>. Whether it&apos;s bespoke
                enterprise software or a high-traffic consumer app, I focus on clean architecture,
                performance and human-centred design.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} custom={4} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map(({ value, label, Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 transition-colors duration-300 hover:border-[#2cdd9c]/30 hover:bg-[#2cdd9c]/[0.03]"
                >
                  <Icon className="w-4 h-4 text-[#2cdd9c]" aria-hidden="true" />
                  <p className="mt-3 font-display text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-none">
                    {value}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeUp} custom={5} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={PORTFOLIO_DATA.resumeUrl}
                download="Mohammad_Kamil_Akhtar_Resume.pdf"
                onClick={handleResumeDownload}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#2cdd9c] hover:bg-[#4fe8b2] text-slate-950 font-display font-semibold text-[15px] shadow-[0_0_24px_-4px_rgba(44,221,156,0.5)] hover:shadow-[0_0_32px_rgba(44,221,156,0.55)] active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060b11] focus-visible:ring-[#2cdd9c]"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <button
                onClick={handleConnectClick}
                className="group inline-flex items-center gap-1.5 h-12 px-6 rounded-full border border-white/10 hover:border-[#2cdd9c]/50 bg-white/[0.02] text-white font-display font-semibold text-[15px] active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60"
              >
                Let&apos;s Connect
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
