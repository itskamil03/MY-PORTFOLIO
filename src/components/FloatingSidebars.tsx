'use client';

import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';
import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './SocialIcons';

const SOCIALS = [
  { label: 'GitHub', href: PORTFOLIO_DATA.social.GitHub, Icon: GitHubIcon },
  { label: 'LinkedIn', href: PORTFOLIO_DATA.social.LinkedIn, Icon: LinkedInIcon },
  { label: 'WhatsApp', href: PORTFOLIO_DATA.social.WhatsApp, Icon: WhatsAppIcon },
  { label: 'Email', href: `mailto:${PORTFOLIO_DATA.email}`, Icon: Mail },
];

// Same order as the sections appear on the page
const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const railVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

interface FloatingSidebarsProps {
  /** Delay the entrance until the intro splash has lifted */
  ready?: boolean;
}

export function FloatingSidebars({ ready = true }: FloatingSidebarsProps) {
  const [activeSection, setActiveSection] = useState('home');

  // Track the section currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sounds.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <>
      {/* Left: social rail */}
      <aside
        aria-label="Social links"
        className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:block select-none"
      >
        <motion.div
          variants={railVariants}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className="flex flex-col items-center gap-4"
        >
          <motion.span
            variants={fromLeft}
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500 [writing-mode:vertical-rl] rotate-180"
          >
            Connect
          </motion.span>
          <motion.span variants={fromLeft} className="w-px h-10 bg-gradient-to-b from-transparent to-[#2cdd9c]/50" />

          <motion.ul
            variants={fromLeft}
            className="flex flex-col items-center gap-1 p-1.5 rounded-full border border-white/[0.07] bg-[#071012]/40 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label} className="relative">
                <motion.a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={label}
                  className="peer flex w-10 h-10 items-center justify-center rounded-full text-slate-400 hover:text-[#2cdd9c] hover:bg-[#2cdd9c]/10 hover:shadow-[0_0_16px_-2px_rgba(44,221,156,0.45)] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </motion.a>
                {/* Tooltip */}
                <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 -translate-x-1 opacity-0 peer-hover:opacity-100 peer-hover:translate-x-0 peer-focus-visible:opacity-100 peer-focus-visible:translate-x-0 transition-all duration-300 whitespace-nowrap px-2.5 py-1 rounded-md border border-white/10 bg-[#0b1418]/95 text-[11px] font-medium text-slate-200 shadow-lg">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.span variants={fromLeft} className="w-px h-16 bg-gradient-to-b from-[#2cdd9c]/50 to-transparent" />
        </motion.div>
      </aside>

      {/* Right: section indicator */}
      <aside
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:block select-none"
      >
        <motion.ul
          variants={railVariants}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className="flex flex-col items-end gap-3"
        >
          {SECTIONS.map((sec, i) => {
            const isActive = activeSection === sec.id;
            const isPast = i < activeIndex;
            return (
              <motion.li key={sec.id} variants={fromRight}>
                <button
                  onClick={() => scrollTo(sec.id)}
                  aria-label={`Go to ${sec.label}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group flex items-center gap-3 cursor-pointer focus-visible:outline-none"
                >
                  {/* Label slides in on hover, stays visible for the active section */}
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 translate-x-0 text-[#2cdd9c]'
                        : 'opacity-0 translate-x-2 text-slate-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100'
                    }`}
                  >
                    {sec.label}
                  </span>
                  <span
                    className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                      isActive ? 'text-[#2cdd9c]' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative flex w-2 h-7 items-center justify-center">
                    {isActive ? (
                      <motion.span
                        layoutId="section-indicator"
                        className="absolute inset-0 rounded-full bg-[#2cdd9c] shadow-[0_0_12px_rgba(44,221,156,0.8)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          isPast ? 'bg-[#2cdd9c]/40' : 'bg-slate-700'
                        } group-hover:bg-slate-300`}
                      />
                    )}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </aside>
    </>
  );
}
