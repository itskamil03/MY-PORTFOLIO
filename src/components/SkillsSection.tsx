'use client';

import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  NextjsLogo,
  ReactLogo,
  TypeScriptLogo,
  JavaScriptLogo,
  TailwindLogo,
  HtmlLogo,
  CssLogo,
  BootstrapLogo,
  NodejsLogo,
  ExpressLogo,
  RestApiLogo,
  JwtLogo,
  JavaLogo,
  MongoDbLogo,
  MongooseLogo,
  MySqlLogo,
  GitLogo,
  GitHubLogo,
  VsCodeLogo,
  PostmanLogo,
  VercelLogo,
  ScrumLogo,
  LogoProps,
} from './TechLogos';
import { Code2, Server, Database, Wrench, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
  proficiency: number;
  highlight?: boolean;
  logo: React.ComponentType<LogoProps>;
}

interface SkillCategory {
  id: string;
  title: string;
  tab: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    tab: 'Frontend',
    description: 'Modern, reactive UI development with Next.js, React, and typed CSS architectures.',
    icon: Code2,
    skills: [
      { name: 'Next.js 15 (App Router)', level: 'Production Specialized', proficiency: 94, highlight: true, logo: NextjsLogo },
      { name: 'React.js (Hooks & Context)', level: 'Advanced / Architecture', proficiency: 95, highlight: true, logo: ReactLogo },
      { name: 'TypeScript', level: 'Strict Typing & Interfaces', proficiency: 90, highlight: true, logo: TypeScriptLogo },
      { name: 'JavaScript (ES6+)', level: 'Core Async & DOM', proficiency: 94, logo: JavaScriptLogo },
      { name: 'Tailwind CSS', level: 'Design Systems & Utility', proficiency: 95, highlight: true, logo: TailwindLogo },
      { name: 'HTML5 Semantic', level: 'Accessible Markup & SEO', proficiency: 98, logo: HtmlLogo },
      { name: 'CSS3 & Flex/Grid', level: 'Responsive Layouts & Animations', proficiency: 92, logo: CssLogo },
      { name: 'Bootstrap', level: 'Component Frameworks', proficiency: 88, logo: BootstrapLogo },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Systems',
    tab: 'Backend',
    description: 'Scalable RESTful micro-services, authenticated business logic, and server routing.',
    icon: Server,
    skills: [
      { name: 'Node.js Runtime', level: 'Event-Driven Architecture', proficiency: 92, highlight: true, logo: NodejsLogo },
      { name: 'Express.js Framework', level: 'REST APIs & Middleware', proficiency: 94, highlight: true, logo: ExpressLogo },
      { name: 'RESTful API Architecture', level: 'API Design & Optimization', proficiency: 95, highlight: true, logo: RestApiLogo },
      { name: 'JWT Authentication', level: 'RBAC & Session Security', proficiency: 92, highlight: true, logo: JwtLogo },
      { name: 'Java (Core & OOP)', level: 'Algorithms & Data Structures', proficiency: 84, logo: JavaLogo },
    ],
  },
  {
    id: 'database',
    title: 'Databases & Cloud Storage',
    tab: 'Databases',
    description: 'NoSQL & Relational database modeling, indexes, and aggregation pipelines.',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 'Document Modeling & Sharding', proficiency: 94, highlight: true, logo: MongoDbLogo },
      { name: 'MongoDB Atlas', level: 'Cloud Clusters & Search', proficiency: 92, highlight: true, logo: MongoDbLogo },
      { name: 'Mongoose ODM', level: 'Schema Validation & Hooks', proficiency: 94, highlight: true, logo: MongooseLogo },
      { name: 'MySQL', level: 'Relational Schemas & Queries', proficiency: 82, logo: MySqlLogo },
    ],
  },
  {
    id: 'tools',
    title: 'DevOps & Workflow Tools',
    tab: 'DevOps & Tools',
    description: 'Version control, developer environments, CI/CD, and API testing suites.',
    icon: Wrench,
    skills: [
      { name: 'Git Version Control', level: 'Branching & Collaboration', proficiency: 94, highlight: true, logo: GitLogo },
      { name: 'GitHub', level: 'PRs, Actions & Code Reviews', proficiency: 92, highlight: true, logo: GitHubLogo },
      { name: 'VS Code', level: 'Primary Development IDE', proficiency: 96, logo: VsCodeLogo },
      { name: 'Postman', level: 'API Testing & Documentation', proficiency: 94, highlight: true, logo: PostmanLogo },
      { name: 'Vercel', level: 'Production Cloud Deployment', proficiency: 92, logo: VercelLogo },
      { name: 'Agile Scrum & SDLC', level: 'Sprint Planning & Standups', proficiency: 90, logo: ScrumLogo },
    ],
  },
];

const TOOLSET: { name: string; logo: React.ComponentType<LogoProps> }[] = [
  { name: 'Next.js 15', logo: NextjsLogo },
  { name: 'React.js', logo: ReactLogo },
  { name: 'TypeScript', logo: TypeScriptLogo },
  { name: 'JavaScript', logo: JavaScriptLogo },
  { name: 'Tailwind CSS', logo: TailwindLogo },
  { name: 'HTML5', logo: HtmlLogo },
  { name: 'CSS3', logo: CssLogo },
  { name: 'Bootstrap', logo: BootstrapLogo },
  { name: 'Node.js', logo: NodejsLogo },
  { name: 'Express.js', logo: ExpressLogo },
  { name: 'MongoDB', logo: MongoDbLogo },
  { name: 'Mongoose', logo: MongooseLogo },
  { name: 'MySQL', logo: MySqlLogo },
  { name: 'JWT Auth', logo: JwtLogo },
  { name: 'REST APIs', logo: RestApiLogo },
  { name: 'Java', logo: JavaLogo },
  { name: 'Git', logo: GitLogo },
  { name: 'GitHub', logo: GitHubLogo },
  { name: 'VS Code', logo: VsCodeLogo },
  { name: 'Postman', logo: PostmanLogo },
  { name: 'Vercel', logo: VercelLogo },
  { name: 'Agile Scrum', logo: ScrumLogo },
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

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

/** Proficiency bar that fills and counts up once it scrolls into view */
function ProficiencyBar({ value }: { value: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const progress = useMotionValue(0);
  const label = useTransform(progress, (v) => `${Math.round(v)}%`);
  const width = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(progress, value, { duration: 1.2, ease: EASE, delay: 0.15 });
    return () => controls.stop();
  }, [inView, progress, value]);

  return (
    <div ref={ref} className="pt-4 border-t border-white/[0.06]">
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
        <span>Proficiency</span>
        <motion.span className="font-semibold text-slate-200">{label}</motion.span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          style={{ width }}
          className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-[#00c389] to-[#2cdd9c] shadow-[0_0_10px_rgba(44,221,156,0.5)]"
        >
          <span className="skills-bar-shine absolute inset-0" />
        </motion.div>
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const Logo = skill.logo;

  // Feed the pointer position to CSS so the spotlight follows the cursor
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseMove={onMove}
      className="group relative flex flex-col justify-between p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[#2cdd9c]/30 hover:shadow-[0_20px_40px_-20px_rgba(44,221,156,0.25)]"
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(260px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(44,221,156,0.09),transparent_70%)]"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all duration-300 group-hover:border-[#2cdd9c]/30 group-hover:bg-[#2cdd9c]/[0.06] group-hover:scale-110 group-hover:-rotate-3">
            <Logo className="w-6 h-6" />
          </div>

          {skill.highlight ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2cdd9c]/10 text-[#2cdd9c] text-[10px] font-mono font-semibold border border-[#2cdd9c]/20">
              <Zap className="w-2.5 h-2.5" />
              Core Stack
            </span>
          ) : (
            <span className="text-[10px] font-mono text-slate-500">Production</span>
          )}
        </div>

        <h4 className="font-display font-semibold text-[15px] text-white tracking-tight transition-colors duration-300 group-hover:text-[#2cdd9c]">
          {skill.name}
        </h4>
        <p className="mt-1 mb-5 text-xs text-slate-400 leading-relaxed">{skill.level}</p>
      </div>

      <div className="relative">
        <ProficiencyBar value={skill.proficiency} />
      </div>
    </motion.div>
  );
}

function ToolChip({ name, logo: Logo }: { name: string; logo: React.ComponentType<LogoProps> }) {
  return (
    <div className="mr-3 shrink-0 flex items-center gap-2.5 h-12 pl-2 pr-4 rounded-full border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 hover:border-[#2cdd9c]/40 hover:bg-[#2cdd9c]/[0.05]">
      <span className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
        <Logo className="w-[18px] h-[18px]" />
      </span>
      <span className="text-[13px] font-medium text-slate-300 whitespace-nowrap">{name}</span>
    </div>
  );
}

/** Endless logo strip; the list is rendered twice so a -50% shift loops seamlessly */
function Marquee({ items, reverse = false }: { items: typeof TOOLSET; reverse?: boolean }) {
  return (
    <div className="skills-marquee-wrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className={`skills-marquee flex w-max ${reverse ? 'skills-marquee-reverse' : ''}`}>
        {[...items, ...items].map((item, i) => (
          <ToolChip key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = SKILL_CATEGORIES[activeTab];
  const CurrentIcon = current.icon;
  const half = Math.ceil(TOOLSET.length / 2);

  return (
    <section id="skills" className="relative py-16 sm:py-24 overflow-hidden bg-[#091016] border-y border-white/[0.04]">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12">
          <motion.header variants={fadeUp} className="max-w-xl min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#2cdd9c]" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#2cdd9c]">
                Technical Capabilities
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
              Skills &amp; <span className="text-[#2cdd9c]">technology stack.</span>
            </h2>
            <p className="mt-4 text-[15px] sm:text-base leading-7 text-slate-400">
              Every technology listed below is actively used in production applications, backed by real
              code and verified implementations.
            </p>
          </motion.header>

          {/* Category tabs */}
          <motion.div variants={fadeUp} custom={1} className="shrink-0">
            <div
              role="tablist"
              aria-label="Skill categories"
              className="grid grid-cols-2 sm:inline-flex sm:items-center gap-0.5 p-1 rounded-2xl sm:rounded-full bg-white/[0.03] border border-white/[0.07]"
            >
              {SKILL_CATEGORIES.map((category, idx) => {
                const Icon = category.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={category.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="skills-panel"
                    onClick={() => setActiveTab(idx)}
                    className={`relative flex items-center justify-center sm:justify-start gap-1.5 h-8 px-3 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2cdd9c]/60 ${
                      isActive ? 'text-[#2cdd9c]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skills-tab-pill"
                        className="absolute inset-0 rounded-full bg-[#2cdd9c]/10 border border-[#2cdd9c]/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon className="relative w-3 h-3" />
                    <span className="relative">{category.tab}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Active category panel */}
        <motion.div variants={fadeUp} custom={2} id="skills-panel" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial="hidden" animate="show" exit="exit" variants={gridVariants}>
              {/* Category summary */}
              <motion.div
                variants={cardVariants}
                className="mb-6 p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-gradient-to-r from-[#2cdd9c]/[0.06] via-white/[0.02] to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#2cdd9c]/10 border border-[#2cdd9c]/20 flex items-center justify-center text-[#2cdd9c]">
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white tracking-tight">{current.title}</h3>
                    <p className="text-sm text-slate-400 mt-0.5">{current.description}</p>
                  </div>
                </div>
                <span className="self-start sm:self-auto shrink-0 text-xs font-mono font-semibold text-slate-300 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.08]">
                  {current.skills.length} Technologies
                </span>
              </motion.div>

              {/* Skill cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {current.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Complete toolset */}
        <motion.div variants={fadeUp} custom={3} className="mt-14 sm:mt-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Complete Production Toolset
            </span>
            <span className="font-mono text-xs text-slate-500">{TOOLSET.length} Verified Technologies</span>
          </div>
          <div className="space-y-3">
            <Marquee items={TOOLSET.slice(0, half)} />
            <Marquee items={TOOLSET.slice(half)} reverse />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
