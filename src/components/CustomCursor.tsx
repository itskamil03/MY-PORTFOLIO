'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'hover' | 'text';

const INTERACTIVE = 'a, button, [role="button"], label, select, summary, [data-cursor="hover"]';
const TEXT_FIELD = 'input, textarea, [contenteditable="true"]';

/**
 * Dot + trailing ring cursor. Only enabled for fine pointers (mouse/trackpad)
 * and when the user hasn't asked for reduced motion; otherwise the native cursor stays.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // The ring lags slightly behind the dot for a smooth, weighted feel
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      if (target.closest(TEXT_FIELD)) setMode('text');
      else if (target.closest(INTERACTIVE)) setMode('hover');
      else setMode('default');
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  // Over text fields the native I-beam takes over
  const show = visible && mode !== 'text';
  const ringScale = pressed ? 0.8 : mode === 'hover' ? 1.6 : 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: show ? 1 : 0,
          scale: ringScale,
          borderColor: mode === 'hover' ? 'rgba(44,221,156,0.9)' : 'rgba(44,221,156,0.45)',
          backgroundColor: mode === 'hover' ? 'rgba(44,221,156,0.08)' : 'rgba(44,221,156,0)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      />
      <motion.div
        className="absolute left-0 top-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#2cdd9c] shadow-[0_0_10px_rgba(44,221,156,0.8)]"
        style={{ x, y }}
        animate={{ opacity: show ? 1 : 0, scale: mode === 'hover' ? 0 : pressed ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
