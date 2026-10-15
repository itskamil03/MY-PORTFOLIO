'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';
import { Activity, ArrowUpRight, Check, Layers, Server, ShieldCheck, Terminal, X } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function SectionTitle({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
      <Icon className="w-4 h-4 text-[#2cdd9c]" />
      {children}
    </h3>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sounds.playClick();
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const close = () => {
    sounds.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-[#020506]/80 backdrop-blur-md"
        onClick={close}
      />

      {/* Dialog */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative z-10 flex w-full max-w-4xl max-h-[92vh] flex-col overflow-y-auto rounded-3xl border border-white/[0.08] bg-[#0a1015] text-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
      >
        {/* Header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.06] bg-[#0a1015]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25 font-mono text-[11px] font-semibold text-[#2cdd9c]">
              {project.badge || project.category}
            </span>
            <span className="hidden sm:inline truncate font-mono text-xs text-slate-500">
              Case study · Architecture &amp; system specs
            </span>
          </div>
          <button
            onClick={close}
            className="shrink-0 w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Title */}
          <div>
            <h2 id="project-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1.5 font-mono text-sm text-[#2cdd9c]">{project.type}</p>
          </div>

          {/* Preview */}
          {project.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08]">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 896px) 100vw, 832px" className="object-cover object-top" />
            </div>
          )}

          {/* Overview */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <SectionTitle icon={Server}>System &amp; business overview</SectionTitle>
            <p className="text-sm leading-7 text-slate-300">{project.fullDesc}</p>
            {project.metrics && (
              <p className="mt-4 flex items-center gap-2 text-[13px] text-slate-200">
                <Activity className="w-4 h-4 shrink-0 text-[#2cdd9c]" />
                {project.metrics}
              </p>
            )}
          </div>

          {/* Architecture */}
          <div>
            <SectionTitle icon={Layers}>Architecture</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.architecture.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-[13px] leading-6 text-slate-300"
                >
                  <span className="mt-0.5 shrink-0 w-[18px] h-[18px] rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#2cdd9c]" strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <SectionTitle icon={ShieldCheck}>Core modules &amp; capabilities</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-[13px] leading-6 text-slate-300"
                >
                  <span className="mt-[9px] shrink-0 w-1.5 h-1.5 rounded-full bg-[#2cdd9c]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <SectionTitle icon={Terminal}>Tech stack</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-xs text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className={`group inline-flex items-center gap-1.5 h-11 px-5 rounded-xl text-[13px] font-semibold transition-all duration-300 active:scale-95 ${
                  link.primary
                    ? 'bg-[#2cdd9c] hover:bg-[#4fe8b2] text-slate-950 shadow-[0_10px_30px_-10px_rgba(44,221,156,0.6)]'
                    : 'border border-white/10 hover:border-[#2cdd9c]/50 text-slate-200'
                }`}
              >
                {link.label}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
