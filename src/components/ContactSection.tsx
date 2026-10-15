'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { AlertCircle, Check, CheckCircle2, Copy, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon } from './SocialIcons';

const PROJECT_TYPES = [
  'Full-Stack Web App',
  'Next.js / React Frontend',
  'Node.js REST API',
  'Full-Time Role Offer',
  'Consulting / Freelance',
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

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-500 text-sm font-sans transition-[border-color,box-shadow] duration-300 focus:outline-none focus:border-[#2cdd9c]/60 focus:ring-4 focus:ring-[#2cdd9c]/10';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.email);
      setCopiedEmail(true);
      sounds.playSuccess();
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.email}`;
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    sounds.playClick();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch message');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Your inquiry has been received! Kamil will get in touch shortly.',
      });

      sounds.playSuccess();

      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#2cdd9c', '#38bdf8', '#ffffff'],
        });
      } catch {
        // fallback
      }

      setFormData({ name: '', email: '', projectType: PROJECT_TYPES[0], message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again or email directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      label: 'Email',
      value: PORTFOLIO_DATA.email,
      href: `mailto:${PORTFOLIO_DATA.email}`,
      Icon: Mail,
    },
    {
      label: 'Phone',
      value: PORTFOLIO_DATA.phone,
      href: `tel:${PORTFOLIO_DATA.phone.replace(/\s/g, '')}`,
      Icon: Phone,
    },
    {
      label: 'Location',
      value: PORTFOLIO_DATA.location,
      note: PORTFOLIO_DATA.statusNote,
      Icon: MapPin,
    },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24 overflow-hidden bg-[#091016] border-t border-white/[0.04]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-0 w-[480px] h-[480px] bg-emerald-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

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
              Get In Touch
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
            Let&apos;s build something <span className="text-[#2cdd9c]">impactful.</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-base leading-7 text-slate-400">
            Whether you have an engineering role, a product to build or just want to talk full-stack tech,
            I&apos;d love to hear from you.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Contact details */}
          <motion.div variants={fadeUp} custom={1} className="lg:col-span-5">
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-white tracking-tight">Contact details</h3>
              <p className="mt-1 text-sm text-slate-500">Reach out directly through any channel.</p>

              <ul className="mt-6 space-y-3">
                {contactItems.map(({ label, value, href, note, Icon }) => (
                  <li
                    key={label}
                    className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-300 hover:border-[#2cdd9c]/25"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="shrink-0 w-10 h-10 rounded-xl bg-[#2cdd9c]/10 border border-[#2cdd9c]/20 flex items-center justify-center text-[#2cdd9c] transition-transform duration-300 group-hover:scale-105">
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
                          {label}
                        </span>
                        {href ? (
                          <a
                            href={href}
                            className="block truncate text-sm font-medium text-white hover:text-[#2cdd9c] transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-white">{value}</p>
                        )}
                        {note && <span className="block mt-0.5 text-xs text-[#2cdd9c]/90">{note}</span>}
                      </div>
                    </div>
                    {label === 'Email' && (
                      <button
                        onClick={handleCopyEmail}
                        className="shrink-0 w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#2cdd9c]/40 transition-colors cursor-pointer"
                        aria-label="Copy email address"
                        title={copiedEmail ? 'Copied!' : 'Copy email'}
                      >
                        {copiedEmail ? <Check className="w-4 h-4 text-[#2cdd9c]" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={PORTFOLIO_DATA.social.WhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-[#2cdd9c]/10 border border-[#2cdd9c]/30 hover:bg-[#2cdd9c]/15 hover:border-[#2cdd9c]/50 text-[#2cdd9c] font-semibold text-[13px] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href={PORTFOLIO_DATA.social.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-white/10 hover:border-white/25 bg-white/[0.03] text-slate-200 font-semibold text-[13px] transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp} custom={2} className="lg:col-span-7">
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium text-slate-300">
                      Your name <span className="text-[#2cdd9c]">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium text-slate-300">
                      Your email <span className="text-[#2cdd9c]">*</span>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                </div>

                <fieldset className="space-y-2">
                  <legend className="text-xs font-medium text-slate-300">
                    What would you like to build or discuss?
                  </legend>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {PROJECT_TYPES.map((type) => {
                      const isActive = formData.projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => {
                            sounds.playHover();
                            setFormData({ ...formData, projectType: type });
                          }}
                          className={`relative h-9 px-3.5 rounded-full text-xs font-medium transition-colors duration-300 cursor-pointer ${
                            isActive
                              ? 'text-[#2cdd9c]'
                              : 'text-slate-400 hover:text-white border border-white/[0.08] bg-white/[0.02]'
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="contact-type-pill"
                              className="absolute inset-0 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/40"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            />
                          )}
                          <span className="relative">{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-slate-300">
                    Message <span className="text-[#2cdd9c]">*</span>
                  </span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project, team goals, timeline or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </label>

                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      role="status"
                      className={`p-4 rounded-xl text-sm flex items-center gap-2.5 border ${
                        status.type === 'success'
                          ? 'bg-[#2cdd9c]/10 border-[#2cdd9c]/30 text-[#2cdd9c]'
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                      )}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-sweep group w-full h-12 rounded-xl bg-[#2cdd9c] hover:bg-[#4fe8b2] text-slate-950 font-display font-semibold text-[15px] shadow-[0_10px_30px_-10px_rgba(44,221,156,0.6)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
