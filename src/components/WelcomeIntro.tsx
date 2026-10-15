'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { sounds } from '@/lib/sound';

interface WelcomeIntroProps {
  onComplete?: () => void;
}

// Single-stroke cursive "hello" so it can be drawn like handwriting
const HELLO_PATH =
  'M8 98 C 22 94, 42 78, 52 56 C 62 34, 62 12, 50 12 C 38 12, 34 50, 32 112 ' +
  'C 36 92, 46 76, 58 76 C 70 76, 70 92, 68 102 C 66 112, 74 114, 84 108 ' +
  'C 96 101, 110 92, 112 82 C 114 70, 100 68, 94 80 C 88 92, 92 110, 108 110 C 120 110, 132 100, 140 90 ' +
  'C 152 74, 164 48, 164 30 C 164 14, 150 14, 148 34 C 146 54, 144 84, 148 100 C 151 112, 164 112, 174 102 ' +
  'C 186 86, 196 56, 196 32 C 196 14, 182 14, 180 34 C 178 54, 176 84, 180 100 C 183 112, 196 112, 206 102 ' +
  'C 212 94, 218 82, 230 78 C 246 74, 256 86, 252 100 C 248 114, 228 116, 222 104 C 216 92, 226 78, 240 78 C 252 78, 266 84, 286 74';

const EASE = [0.16, 1, 0.3, 1] as const;
const DRAW_SECONDS = 2.2;
const HOLD_MS = 700;
const EXIT_MS = 900;

export function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [visible, setVisible] = useState(true);
  const finished = useRef(false);
  // Keep the latest callback without restarting the timers when the parent re-renders
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sounds.playSuccess();
    } catch {
      // audio may be blocked before the first interaction
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(finish, DRAW_SECONDS * 1000 + HOLD_MS);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [finish]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
        onCompleteRef.current?.();
      }}
    >
      {visible && (
        <motion.div
          key="intro"
          role="presentation"
          onClick={finish}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-6%', transition: { duration: EXIT_MS / 1000, ease: EASE } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04090b] select-none cursor-pointer"
        >
          {/* Soft vignette glow behind the word */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(44,221,156,0.07),transparent_70%)]"
          />

          <p className="sr-only">Hello</p>
          <motion.svg
            viewBox="0 0 300 130"
            fill="none"
            aria-hidden="true"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.96 }}
            className="relative w-[min(78vw,440px)] h-auto drop-shadow-[0_0_18px_rgba(44,221,156,0.25)]"
          >
            <motion.path
              d={HELLO_PATH}
              stroke="#2cdd9c"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: DRAW_SECONDS, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
            />
          </motion.svg>

          {/* Footer mark */}
          <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              className="font-mono text-[10px] font-medium uppercase tracking-[0.5em] text-slate-500"
            >
              Portfolio MMXXVI
            </motion.span>
            <motion.span
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: DRAW_SECONDS, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
              className="block w-px h-12 origin-top bg-gradient-to-b from-[#2cdd9c] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
