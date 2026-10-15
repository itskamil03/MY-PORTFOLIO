'use client';

import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { sounds } from '@/lib/sound';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export interface NavbarProps {
  onOpenTerminal?: () => void;
  isSoundEnabled?: boolean;
  onToggleSound?: () => void;
  resumeHref?: string;
  /** Delay the entrance animation until the intro splash has lifted */
  ready?: boolean;
}

// Entrance choreography: bar drops in, then brand → links → actions stagger
const barVariants: Variants = {
  hidden: { opacity: 0, y: -28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE, when: 'beforeChildren', staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Navbar({ isSoundEnabled = true, onToggleSound, ready = true }: NavbarProps) {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [timeString, setTimeString] = useState('');

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Glass intensifies once the page has scrolled
  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 20));

  // Live IST clock
  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const update = () => setTimeString(format.format(new Date()));
    update();
    const interval = setInterval(update, 15000);
    return () => clearInterval(interval);
  }, []);

  // Track the section currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    [...LINKS.map((l) => l.id), 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  // Close the mobile menu with Escape or when resizing up to desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const go = (id: string) => {
    sounds.playClick();
    setActive(id);
    setOpen(false);
    scrollToId(id);
  };

  return (
    <MotionConfig reducedMotion="user">
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
        <motion.div
          variants={barVariants}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className={`relative max-w-7xl mx-auto h-[76px] sm:h-[84px] rounded-2xl pointer-events-auto border overflow-hidden transition-[background-color,border-color,box-shadow] duration-500 ${
            scrolled
              ? 'bg-[#050c0d]/45 border-white/10 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl'
              : 'bg-[#071012]/25 border-white/[0.06] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md'
          }`}
        >
          {/* Animated hairline highlight along the top edge */}
          <span
            aria-hidden="true"
            className="nav-sheen pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(44,221,156,0.7),rgba(56,189,248,0.6),transparent)] bg-[length:200%_100%]"
          />

          <div className="h-full grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4 px-3 sm:px-4">
            {/* Left: brand */}
            <motion.a
              variants={itemVariants}
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                go('home');
              }}
              className="group flex items-center gap-3 min-w-0 justify-self-start rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60"
              aria-label="Kamil Akhtar — back to top"
            >
              <span className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl p-px overflow-hidden">
                {/* Rotating gradient ring */}
                <span
                  aria-hidden="true"
                  className="absolute inset-[-50%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#2cdd9c,#38bdf8,transparent_40%,transparent_60%,#2cdd9c)] opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative flex w-full h-full items-center justify-center rounded-[11px] bg-[#0b1418] font-display font-extrabold text-[13px] tracking-tight text-white group-hover:text-[#2cdd9c] transition-colors duration-300">
                  KA
                </span>
              </span>
              <span className="flex flex-col min-w-0 leading-none">
                <span className="font-display font-bold text-[15px] sm:text-base tracking-tight text-white truncate">
                  Kamil Akhtar
                </span>
                <span className="mt-1 hidden sm:block font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate-400 group-hover:text-slate-300 transition-colors truncate">
                  Full Stack Developer
                </span>
              </span>
            </motion.a>

            {/* Center: navigation */}
            <nav aria-label="Primary" className="hidden lg:block">
              <motion.ul
                variants={listVariants}
                className="flex items-center gap-0.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]"
              >
                {LINKS.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <motion.li key={link.id} variants={itemVariants}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          go(link.id);
                        }}
                        aria-current={isActive ? 'page' : undefined}
                        className={`relative block px-3 xl:px-3.5 py-1.5 font-display text-[13px] xl:text-[13.5px] font-medium tracking-tight rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60 ${
                          isActive ? 'text-[#2cdd9c]' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-pill"
                            className="absolute inset-0 rounded-full bg-[#2cdd9c]/[0.1] border border-[#2cdd9c]/25 shadow-[0_0_18px_-4px_rgba(44,221,156,0.45)]"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative">{link.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            {/* Right: status, sound toggle, CTA */}
            <motion.div variants={listVariants} className="flex items-center gap-2 sm:gap-3 justify-self-end">
              <motion.div
                variants={itemVariants}
                className="hidden 2xl:flex items-center gap-2 h-9 px-3 rounded-full border border-white/[0.06] bg-white/[0.02] font-mono text-[10px] tracking-wider text-slate-400"
                title="Local time in Jamshedpur, India"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#2cdd9c] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2cdd9c]" />
                </span>
                <span className="text-slate-200 font-semibold">Available</span>
                <span className="w-px h-3 bg-white/10" />
                <span suppressHydrationWarning>{timeString || '--:-- --'} IST</span>
              </motion.div>

              {onToggleSound && (
                <motion.button
                  variants={itemVariants}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    sounds.playClick();
                    onToggleSound();
                  }}
                  className="hidden sm:flex w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-[#2cdd9c]/40 hover:bg-[#2cdd9c]/[0.06] items-center justify-center text-slate-300 hover:text-[#2cdd9c] transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60"
                  title={isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
                  aria-label={isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
                  aria-pressed={isSoundEnabled}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isSoundEnabled ? 'on' : 'off'}
                      initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
                      transition={{ duration: 0.18 }}
                      className="flex"
                    >
                      {isSoundEnabled ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-slate-500" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              )}

              <motion.a
                variants={itemVariants}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go('contact');
                }}
                className="btn-sweep group hidden sm:inline-flex items-center gap-1 h-9 pl-4 pr-3 rounded-full bg-[#2cdd9c] hover:bg-[#4fe8b2] text-slate-950 font-display font-semibold text-[13px] tracking-tight shadow-[0_0_20px_-2px_rgba(44,221,156,0.45)] hover:shadow-[0_0_30px_rgba(44,221,156,0.6)] active:scale-95 transition-[background-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050c0d] focus-visible:ring-[#2cdd9c]"
              >
                Let&apos;s Talk
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

              <motion.button
                variants={itemVariants}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  sounds.playClick();
                  setOpen((prev) => !prev);
                }}
                className="lg:hidden w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-200 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-nav"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? 'close' : 'menu'}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.18 }}
                    className="flex"
                  >
                    {open ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll progress */}
          <motion.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#2cdd9c] via-[#2dd4bf] to-[#38bdf8]"
          />
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="lg:hidden mt-2 max-w-7xl mx-auto origin-top rounded-2xl bg-[#050c0d]/95 border border-white/10 p-3 shadow-2xl backdrop-blur-2xl pointer-events-auto"
            >
              <motion.ul
                className="flex flex-col gap-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
              >
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.id}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } } }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(link.id);
                      }}
                      aria-current={active === link.id ? 'page' : undefined}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-display font-medium text-sm transition-colors ${
                        active === link.id
                          ? 'bg-[#2cdd9c]/10 text-[#2cdd9c]'
                          : 'text-slate-200 hover:bg-white/[0.05]'
                      }`}
                    >
                      {link.label}
                      <span className="font-mono text-[11px] text-slate-500">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    go('contact');
                  }}
                  className="flex items-center justify-center gap-1.5 h-11 rounded-full bg-[#2cdd9c] text-slate-950 font-display font-semibold text-sm"
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                {onToggleSound && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onToggleSound();
                    }}
                    className="sm:hidden w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-200 cursor-pointer"
                    aria-label={isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
                    aria-pressed={isSoundEnabled}
                  >
                    {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
                  </button>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] tracking-wider text-slate-400">
                <span className="flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-[#2cdd9c]" />
                  Available for work
                </span>
                <span>Jamshedpur · {timeString} IST</span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
