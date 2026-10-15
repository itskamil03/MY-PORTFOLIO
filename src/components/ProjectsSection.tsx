'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useMotionValue,
  type Variants,
} from 'framer-motion';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { sounds } from '@/lib/sound';
import { ArrowUpRight, Layers, Maximize2, Play, TrendingUp } from 'lucide-react';

const CATEGORIES = ['All', 'Full-Stack', 'Next.js', 'Enterprise Admin', 'E-Commerce'];

// Tech pills shown per card; the rest collapse into a "+N" pill so cards stay the same height
const MAX_TECH = 4;

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.08 },
  }),
};

interface ProjectShowcaseProps {
  project: Project;
  /** Mirrors the layout (media on the right, info card on the left) for a zig-zag rhythm */
  reverse?: boolean;
  onOpen: (project: Project) => void;
}

/**
 * Case-study row: a large media card on the left (screenshot, swapped for a muted website
 * recording on hover) with a frosted info card overlapping it on the right.
 */
function ProjectShowcase({ project, reverse = false, onOpen }: ProjectShowcaseProps) {
  const mediaRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const videoProgress = useMotionValue(0);
  const inView = useInView(mediaRef, { amount: 0.6 });

  const hasVideo = Boolean(project.video) && !videoFailed;
  const primaryLink = project.links.find((l) => l.primary) ?? project.links[0];

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  const play = () => videoRef.current?.play().catch(() => {});
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setPlaying(false);
    videoProgress.set(0);
  };

  // Touch screens can't hover, so preview plays while the card is on screen
  useEffect(() => {
    if (!isTouch || !hasVideo) return;
    if (inView) play();
    else stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch, inView, hasVideo]);

  const open = () => {
    sounds.playClick();
    onOpen(project);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
      className="relative w-full max-w-5xl mx-auto lg:grid lg:grid-cols-12 lg:items-center"
    >
      {/* Media card */}
      <motion.button
        ref={mediaRef}
        type="button"
        onClick={open}
        onMouseEnter={() => {
          setHovered(true);
          if (hasVideo) play();
        }}
        onMouseLeave={() => {
          setHovered(false);
          if (hasVideo) stop();
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        aria-label={`Open ${project.title} case study`}
        className={`group relative block w-full ${reverse ? 'lg:col-start-4 lg:col-end-13' : 'lg:col-start-1 lg:col-end-10'} lg:row-start-1 aspect-[16/10] lg:aspect-video rounded-3xl overflow-hidden border border-white/[0.08] bg-[#05090c] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] cursor-pointer transition-[border-color,box-shadow] duration-500 hover:border-[#2cdd9c]/30 hover:shadow-[0_30px_80px_-30px_rgba(44,221,156,0.35)]`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 780px"
            className={`object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] ${
              playing ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500">
            No preview available
          </div>
        )}

        {hasVideo && (
          <video
            ref={videoRef}
            src={project.video}
            poster={project.image}
            muted
            loop
            playsInline
            preload="none"
            onPlaying={() => setPlaying(true)}
            onError={() => setVideoFailed(true)}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) videoProgress.set(v.currentTime / v.duration);
            }}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
              playing ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Soft vignette so the pill and overlapping card read well */}
        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,8,10,0.55))] transition-opacity duration-500 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Centre pill - on desktop, centred in the part of the media not covered by the info card */}
        <span className={`absolute inset-0 flex items-center justify-center pointer-events-none ${reverse ? 'lg:pl-[22%]' : 'lg:pr-[22%]'}`}>
        <AnimatePresence>
          {!playing && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: hovered ? 1.05 : 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#05090c]/80 border border-white/10 backdrop-blur-md shadow-2xl whitespace-nowrap"
            >
              {hasVideo && hovered ? (
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#2cdd9c] border-t-transparent animate-spin" />
              ) : hasVideo ? (
                <Play className="w-3.5 h-3.5 fill-[#2cdd9c] text-[#2cdd9c]" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-[#2cdd9c]" />
              )}
              <span className="font-display text-xs font-bold tracking-[0.18em] uppercase text-white">
                {hasVideo ? (hovered ? 'Loading preview' : isTouch ? 'Preview' : 'Hover to preview') : 'View case study'}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
        </span>

        {/* Playback progress */}
        {hasVideo && (
          <motion.span
            aria-hidden="true"
            style={{ scaleX: videoProgress }}
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[#2cdd9c]"
          />
        )}
      </motion.button>

      {/* Info card - overlaps the media on desktop, tucks under it on mobile.
          A min-height plus clamped text keeps every project's card the same size. */}
      <div className={`relative z-10 -mt-10 mx-3 sm:mx-6 lg:m-0 lg:row-start-1 lg:py-6 ${reverse ? 'lg:col-start-1 lg:col-end-6' : 'lg:col-start-8 lg:col-end-13'}`}>
      <motion.div
        animate={{ x: hovered ? (reverse ? -16 : 16) : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className="w-full flex flex-col sm:min-h-[360px] lg:min-h-[392px] rounded-3xl border border-white/[0.08] bg-[#0b1118]/80 backdrop-blur-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] p-5 sm:p-6 lg:p-7"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#2cdd9c]">
            <Layers className="w-4 h-4" />
            Featured Case Study
          </span>
          {project.badge && (
            <span className="hidden sm:inline-flex shrink-0 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300">
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight leading-tight line-clamp-2">
          {project.title}
        </h3>
        <p className="mt-1 text-[13px] text-slate-500 truncate">{project.type}</p>

        <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">{project.desc}</p>

        {project.metrics && (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-300" title={project.metrics}>
            <TrendingUp className="w-3.5 h-3.5 shrink-0 text-[#2cdd9c]" />
            <span className="truncate">{project.metrics}</span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, MAX_TECH).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold uppercase tracking-wider text-slate-200"
            >
              {t}
            </span>
          ))}
          {project.tech.length > MAX_TECH && (
            <span
              className="px-2.5 py-1 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/20 text-[10px] font-bold text-[#2cdd9c]"
              title={project.tech.slice(MAX_TECH).join(', ')}
            >
              +{project.tech.length - MAX_TECH}
            </span>
          )}
        </div>

        {/* Actions pinned to the bottom so every card lines up */}
        <div className="mt-auto pt-5 flex flex-wrap items-center gap-2.5">
          {primaryLink && (
            <a
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="group/live inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-white hover:bg-[#2cdd9c] text-slate-950 font-display font-bold text-[13px] shadow-[0_10px_30px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_10px_30px_-8px_rgba(44,221,156,0.6)] active:scale-95 transition-all duration-300"
              title={`${primaryLink.label} for ${project.title}`}
            >
              <Play className="w-3 h-3 fill-current" />
              Live Experience
            </a>
          )}
          <button
            onClick={open}
            className="group/cs inline-flex items-center gap-1.5 h-10 px-4 rounded-xl border border-white/10 hover:border-[#2cdd9c]/50 text-slate-200 hover:text-white font-display font-semibold text-[13px] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Case Study
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5" />
          </button>
        </div>
      </motion.div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-16 sm:py-24 overflow-hidden bg-[#060b11]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -left-20 w-[480px] h-[480px] bg-emerald-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <motion.header variants={fadeUp} className="max-w-xl min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#2cdd9c]" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#2cdd9c]">
                Featured Case Studies
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
              Production web <span className="text-[#2cdd9c]">applications.</span>
            </h2>
            <p className="mt-4 text-[15px] sm:text-base leading-7 text-slate-400">
              Real-world client applications, multi-sector platforms, enterprise ERP suites and full-stack
              e-commerce stores, all running live in production.
            </p>
          </motion.header>

          {/* Category filter */}
          <motion.div variants={fadeUp} custom={1} className="shrink-0">
            <div
              role="tablist"
              aria-label="Filter projects"
              className="flex flex-wrap sm:inline-flex sm:flex-nowrap items-center gap-0.5 p-1 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/[0.07]"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedCategory(cat);
                    }}
                    className={`relative h-8 px-3 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60 ${
                      isActive ? 'text-[#2cdd9c]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="projects-filter-pill"
                        className="absolute inset-0 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{cat}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Case studies */}
        <motion.div variants={fadeUp} custom={2}>
          <LayoutGroup>
            <motion.div layout className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <ProjectShowcase key={project.id} project={project} reverse={i % 2 === 1} onOpen={setActiveProject} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </motion.div>
      </motion.div>

      {/* Case study modal */}
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  );
}
