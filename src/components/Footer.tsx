'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, type Variants } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Download,
  Mail,
  MapPin,
  Phone,
  Terminal,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const SOCIALS = [
  { label: 'LinkedIn', href: PORTFOLIO_DATA.social.LinkedIn, Icon: LinkedInIcon },
  { label: 'GitHub', href: PORTFOLIO_DATA.social.GitHub, Icon: GitHubIcon },
  { label: 'WhatsApp', href: PORTFOLIO_DATA.social.WhatsApp, Icon: WhatsAppIcon },
  { label: 'Email', href: `mailto:${PORTFOLIO_DATA.email}`, Icon: Mail },
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

function scrollToId(id: string) {
  sounds.playClick();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{children}</h4>
  );
}

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Live IST clock
  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.email);
      sounds.playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.email}`;
    }
  };

  // Re-uses the page's global Ctrl/Cmd+K shortcut that toggles the dev terminal
  const openTerminal = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  };

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#04080b] border-t border-white/[0.06]">
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-emerald-500/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* CTA panel */}
        <motion.div
          variants={fadeUp}
          className="relative mt-16 sm:mt-20 rounded-3xl p-px overflow-hidden"
        >
          {/* Rotating gradient border */}
          <span
            aria-hidden="true"
            className="absolute inset-[-150%] animate-[spin_10s_linear_infinite] motion-reduce:animate-none bg-[conic-gradient(from_0deg,transparent_0%,rgba(44,221,156,0.6)_10%,transparent_25%,transparent_50%,rgba(56,189,248,0.45)_60%,transparent_75%)]"
          />
          <div className="relative rounded-[23px] bg-[#071014] px-6 py-10 sm:px-12 sm:py-14 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(44,221,156,0.12),transparent_60%)] pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25 text-[11px] font-medium text-[#2cdd9c]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#2cdd9c] opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2cdd9c]" />
                  </span>
                  {PORTFOLIO_DATA.status}
                </span>
                <h2 className="mt-5 font-display text-[28px] sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.25]">
                  Have a project in mind?
                  <span className="block text-[#2cdd9c]">Let&apos;s build it.</span>
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-slate-400">
                  Tell me what you&apos;re building, and let&apos;s make it fast, reliable and a pleasure to use.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-[300px]">
                <button
                  onClick={() => scrollToId('contact')}
                  className="btn-sweep group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#2cdd9c] hover:bg-[#4fe8b2] text-slate-950 font-display font-semibold text-[15px] shadow-[0_0_24px_-4px_rgba(44,221,156,0.5)] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Start a conversation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-white/10 hover:border-[#2cdd9c]/50 bg-white/[0.02] text-slate-200 font-mono text-[13px] active:scale-95 transition-all duration-300 cursor-pointer"
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'done' : 'copy'}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#2cdd9c]" />
                          Email copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#2cdd9c]" />
                          {PORTFOLIO_DATA.email}
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Link columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 pt-16 pb-12">
          {/* Brand */}
          <motion.div variants={fadeUp} custom={1} className="col-span-2 lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('home');
              }}
              className="group inline-flex items-center gap-3"
            >
              <span className="relative w-11 h-11 rounded-xl p-px overflow-hidden">
                <span
                  aria-hidden="true"
                  className="absolute inset-[-50%] animate-[spin_6s_linear_infinite] motion-reduce:animate-none bg-[conic-gradient(from_0deg,#2cdd9c,#38bdf8,transparent_40%,transparent_60%,#2cdd9c)] opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative flex w-full h-full items-center justify-center rounded-[11px] bg-[#0b1418] font-display font-extrabold text-sm text-white group-hover:text-[#2cdd9c] transition-colors">
                  KA
                </span>
              </span>
              <span className="leading-none">
                <span className="block font-display font-bold text-base text-white">Kamil Akhtar</span>
                <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  Full Stack Developer
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">{PORTFOLIO_DATA.tagline}</p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-[#2cdd9c] hover:border-[#2cdd9c]/40 hover:bg-[#2cdd9c]/[0.06] hover:shadow-[0_0_18px_-4px_rgba(44,221,156,0.5)] transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav variants={fadeUp} custom={2} aria-label="Footer" className="col-span-2 sm:col-span-1 lg:col-span-2">
            <ColumnTitle>Navigate</ColumnTitle>
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.id);
                    }}
                    className="group inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <span className="w-0 h-px bg-[#2cdd9c] transition-all duration-300 group-hover:w-3 group-hover:mr-1.5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div variants={fadeUp} custom={3} className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ColumnTitle>Contact</ColumnTitle>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${PORTFOLIO_DATA.email}`}
                  className="group flex items-start gap-2.5 text-slate-400 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#2cdd9c]" />
                  {PORTFOLIO_DATA.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PORTFOLIO_DATA.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#2cdd9c]" />
                  {PORTFOLIO_DATA.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#2cdd9c]" />
                {PORTFOLIO_DATA.location}
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 shrink-0 text-[#2cdd9c]" />
                <span suppressHydrationWarning>{time || '--:-- --'} IST · local time</span>
              </li>
            </ul>
          </motion.div>

          {/* Quick actions */}
          <motion.div variants={fadeUp} custom={4} className="col-span-2 sm:col-span-1 lg:col-span-3">
            <ColumnTitle>Quick Actions</ColumnTitle>
            <div className="mt-4 space-y-2.5">
              <a
                href={PORTFOLIO_DATA.resumeUrl}
                download="Mohammad_Kamil_Akhtar_Resume.pdf"
                onClick={() => sounds.playSuccess()}
                className="group flex items-center justify-between gap-3 p-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#2cdd9c]/30 hover:bg-[#2cdd9c]/[0.04] transition-colors duration-300"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#2cdd9c]/10 flex items-center justify-center">
                    <Download className="w-4 h-4 text-[#2cdd9c]" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">Download résumé</span>
                    <span className="block text-xs text-slate-500">PDF format</span>
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 transition-all group-hover:text-[#2cdd9c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                onClick={openTerminal}
                className="group w-full flex items-center justify-between gap-3 p-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#2cdd9c]/30 hover:bg-[#2cdd9c]/[0.04] transition-colors duration-300 cursor-pointer text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#2cdd9c]/10 flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-[#2cdd9c]" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">Dev terminal</span>
                    <span className="block text-xs text-slate-500">Explore my portfolio via CLI</span>
                  </span>
                </span>
                <kbd className="hidden sm:inline-block shrink-0 px-2 py-1 rounded-md border border-white/10 bg-white/[0.04] font-mono text-[10px] text-slate-400">
                  Ctrl K
                </kbd>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Oversized wordmark */}
      <div className="relative z-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden select-none" aria-hidden="true">
        <motion.p
          initial={{ y: '60%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="font-display font-black uppercase leading-[0.8] tracking-[-0.04em] text-center whitespace-nowrap text-[clamp(2.5rem,12.5vw,9rem)] bg-gradient-to-b from-white/[0.09] to-white/0 bg-clip-text text-transparent"
        >
          Kamil Akhtar
        </motion.p>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.
            <span className="hidden md:inline"> · Designed &amp; built with Next.js, Tailwind CSS &amp; Framer Motion.</span>
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            Back to top
            <span className="relative w-11 h-11 flex items-center justify-center">
              {/* Ring shows how far down the page the reader is */}
              <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
                <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <motion.circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#2cdd9c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: progress }}
                />
              </svg>
              <ArrowUp className="w-4 h-4 text-[#2cdd9c] transition-transform duration-300 group-hover:-translate-y-1" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
