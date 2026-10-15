'use client';

import React from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Building2,
  Award
} from 'lucide-react';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Education
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Professional software engineering roles, production impact, and formal engineering background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Professional Engineering Experience (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Work Experience</h3>
            </div>

            <div className="relative border-l-2 border-emerald-500/30 ml-4 space-y-10 pl-6 sm:pl-8">
              {PORTFOLIO_DATA.experience.map((job, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => sounds.playHover()}
                >
                  {/* Timeline node icon */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-6 h-6 rounded-full bg-[#080b11] border-2 border-emerald-400 flex items-center justify-center group-hover:scale-125 group-hover:border-cyan-400 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:bg-cyan-400" />
                  </div>

                  {/* Card Container */}
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-[#111728] to-[#0d121f] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl">

                    {/* Header: Role & Type */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {job.role}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                        {job.type}
                      </span>
                    </div>

                    {/* Org, Place, Time */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4 pb-3 border-b border-white/[0.06]">
                      <span className="text-cyan-300 font-semibold">{job.org}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-500" /> {job.place}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-500" /> {job.time}</span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 mb-5">
                      {job.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                      {job.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Formal Education & Academic Foundation (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Education & Academics</h3>
            </div>

            <div className="space-y-6">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => sounds.playHover()}
                  className="p-6 rounded-2xl bg-gradient-to-b from-[#111728] to-[#0d121f] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
                      {edu.badge || 'Academic'}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {edu.time}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {edu.deg}
                  </h4>

                  <p className="text-xs font-mono text-slate-300 mb-3">
                    {edu.org}
                  </p>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{edu.note}</span>
                  </div>
                </div>
              ))}

              {/* Quick Summary Note Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-cyan-950/30 border border-emerald-500/30 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase font-mono tracking-wider">Ready for Deployment</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Available immediately for remote software engineering roles across India or on-site relocation. Equipped with full-stack development experience from Day 1.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
