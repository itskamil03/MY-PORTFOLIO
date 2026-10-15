'use client';

import React, { useState, useEffect } from 'react';
import { WelcomeIntro } from '@/components/WelcomeIntro';
import { Navbar } from '@/components/Navbar';
import { FloatingSidebars } from '@/components/FloatingSidebars';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { InteractiveDevTerminal } from '@/components/InteractiveDevTerminal';
import { CustomCursor } from '@/components/CustomCursor';
import { sounds } from '@/lib/sound';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Global hotkey: Ctrl+K or Cmd+K to toggle Dev Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sounds.playClick();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    sounds.enabled = !sounds.enabled;
    setSoundEnabled(sounds.enabled);
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col relative selection:bg-emerald-500/30 selection:text-white">
      {/* Animated Greeting Intro Splash Screen */}
      <WelcomeIntro onComplete={() => setIntroFinished(true)} />

      {/* Navigation & Floating Sidebars */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        isSoundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        ready={introFinished}
      />
      <FloatingSidebars ready={introFinished} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Developer Terminal Modal */}
      <InteractiveDevTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <CustomCursor />
    </div>
  );
}
