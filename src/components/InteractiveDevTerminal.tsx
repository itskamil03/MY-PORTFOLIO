'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { sounds } from '@/lib/sound';
import { Terminal, X, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export function InteractiveDevTerminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">
            Welcome to Mohammad Kamil Akhtar&apos;s Interactive Dev Console v2.0
          </p>
          <p className="text-slate-400 text-xs">
            Type <span className="text-cyan-400 font-semibold">help</span> to view available commands or try <span className="text-cyan-400 font-semibold">projects</span> / <span className="text-cyan-400 font-semibold">contact</span>.
          </p>
        </div>
      ),
    },
  ]);

  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    sounds.playTerminalBeep();

    if (!cmd) return;

    setPastCommands((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    let output: React.ReactNode;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-semibold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-slate-300">
              {PORTFOLIO_DATA.terminalCommands.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold w-32">{c.cmd}</span>
                  <span className="text-slate-400 text-[11px]">- {c.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Core Technical Skills:</p>
            {PORTFOLIO_DATA.skillsData.map((cat, i) => (
              <div key={i} className="pl-2">
                <span className="text-cyan-300 font-semibold">{cat.category}: </span>
                <span className="text-slate-300">{cat.skills.map((s) => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Shipped Production Projects:</p>
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <div key={i} className="p-2 rounded bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold">{p.title}</span>
                  <span className="text-slate-500 text-[10px]">{p.type}</span>
                </div>
                <p className="text-slate-400 text-[11px]">{p.desc}</p>
                <p className="text-emerald-400 text-[10px]">Stack: {p.tech.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">{PORTFOLIO_DATA.name}</p>
            <p className="text-slate-400">Location: {PORTFOLIO_DATA.location}</p>
            <p className="text-slate-300 leading-relaxed">{PORTFOLIO_DATA.bio[0]}</p>
            <p className="text-cyan-400 font-mono">Status: {PORTFOLIO_DATA.status}</p>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Professional Experience:</p>
            {PORTFOLIO_DATA.experience.map((e, i) => (
              <div key={i} className="pl-2 border-l border-emerald-500/40">
                <p className="text-cyan-300 font-semibold">{e.role} @ {e.org}</p>
                <p className="text-slate-400 text-[11px]">{e.place ? `${e.time} • ${e.place}` : e.time}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-emerald-400 font-bold">Academic Background:</p>
            {PORTFOLIO_DATA.education.map((edu, i) => (
              <div key={i} className="pl-2 border-l border-cyan-500/40">
                <p className="text-cyan-300 font-semibold">{edu.deg}</p>
                <p className="text-slate-400 text-[11px]">{edu.org} ({edu.time}) - {edu.note}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-emerald-400 font-bold">Direct Communication Channels:</p>
            <p>📧 Email: <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-cyan-300 underline">{PORTFOLIO_DATA.email}</a></p>
            <p>📱 Phone: <span className="text-cyan-300">{PORTFOLIO_DATA.phone}</span></p>
            <p>💼 LinkedIn: <a href={PORTFOLIO_DATA.social.LinkedIn} target="_blank" rel="noreferrer" className="text-cyan-300 underline">mohammad-kamil-akhtar-9a844328a</a></p>
            <p>🐙 GitHub: <a href={PORTFOLIO_DATA.social.GitHub} target="_blank" rel="noreferrer" className="text-cyan-300 underline">itskamil03</a></p>
          </div>
        );
        break;

      case 'hire':
        output = (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-200 space-y-1">
            <p className="text-emerald-300 font-bold">Ready to hire Kamil?</p>
            <p>Send an email directly to <span className="text-cyan-300 font-mono font-bold">{PORTFOLIO_DATA.email}</span> or initiate a WhatsApp chat via <a href={PORTFOLIO_DATA.social.WhatsApp} target="_blank" rel="noreferrer" className="text-emerald-400 underline font-semibold">Direct WhatsApp</a>.</p>
          </div>
        );
        break;

      case 'download-resume':
        output = (
          <div className="text-xs font-mono text-emerald-400">
            Triggering download for {PORTFOLIO_DATA.resumeUrl}...
          </div>
        );
        if (typeof window !== 'undefined') {
          window.open(PORTFOLIO_DATA.resumeUrl, '_blank');
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        output = (
          <p className="text-amber-400 text-xs font-mono">
            Permission granted: User is authenticated as Guest Root. Feel free to explore Kamil&apos;s code!
          </p>
        );
        break;

      default:
        output = (
          <p className="text-red-400 text-xs font-mono">
            Command not recognized: &quot;{rawCmd}&quot;. Type <span className="text-cyan-400 underline">help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIdx = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInput(pastCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (pastCommands.length > 0 && cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= pastCommands.length) {
          setCmdIndex(-1);
          setInput('');
        } else {
          setCmdIndex(nextIdx);
          setInput(pastCommands[nextIdx]);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
      />

      <div className="relative w-full max-w-3xl h-[540px] max-h-[85vh] bg-[#0a1015] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm z-10">
        
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f171d] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="ml-2 flex items-center gap-2 text-xs text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>kamil@portfolio: ~ (zsh)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setHistory([]);
                sounds.playClick();
              }}
              className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-white/[0.05]"
              title="Clear terminal"
            >
              Clear
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Log Area */}
        <div 
          className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm font-mono"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="text-cyan-400 font-bold">guest@kamil-portfolio:~$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-4 text-slate-300">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt Row */}
        <div className="px-4 py-3 bg-[#0f171d]/90 border-t border-white/10 flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-xs sm:text-sm whitespace-nowrap">
            guest@kamil-portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' and press Enter..."
            className="flex-1 bg-transparent text-white text-xs sm:text-sm outline-none border-none font-mono focus:ring-0 placeholder:text-slate-600"
            autoFocus
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
