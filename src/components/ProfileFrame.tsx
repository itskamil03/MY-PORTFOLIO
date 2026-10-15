'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Cpu, Database, Layers, CheckCircle2 } from 'lucide-react';

const CHIPS = [
  { label: 'Next.js 15 & React', Icon: Cpu, style: { top: -16, left: -24 }, delay: '0s' },
  { label: 'REST & Auth', Icon: Layers, style: { top: '58%', right: -32 }, delay: '.8s' },
  { label: 'Node & MongoDB', Icon: Database, style: { bottom: -20, left: -16 }, delay: '1.6s' },
];

interface ProfileFrameProps {
  src?: string;
  name?: string;
  role?: string;
}

export function ProfileFrame({
  src = '/assets/profile.jpg',
  name = 'Mohammad Kamil Akhtar',
  role = 'Full Stack Engineer @ Venturing Digitally',
}: ProfileFrameProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgOk, setImgOk] = useState(true);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -12, y: px * 14 });
  };

  return (
    <div 
      className="kx-frame-wrap" 
      onMouseMove={onMove} 
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="kx-glow" />
      <div
        className="kx-tilt"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="kx-border">
          <div className="kx-spin" />
          <div className="kx-inner">
            <div className="kx-photo">
              {imgOk ? (
                <Image
                  src={src}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 440px"
                  className="object-cover object-top"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="kx-initials">KA</div>
              )}
              <div className="kx-ov1" />
              <div className="kx-ov2" />
              <div className="kx-ring" />
              <span className="kx-corner" style={{ top: 12, left: 12, borderTopWidth: 1, borderLeftWidth: 1 }} />
              <span className="kx-corner" style={{ top: 12, right: 12, borderTopWidth: 1, borderRightWidth: 1 }} />
              <span className="kx-corner" style={{ bottom: 96, left: 12, borderBottomWidth: 1, borderLeftWidth: 1 }} />
              <span className="kx-corner" style={{ bottom: 96, right: 12, borderBottomWidth: 1, borderRightWidth: 1 }} />
              <span className="kx-scan" />

              <div className="kx-plate">
                <div>
                  <div className="kx-plate-name">
                    {name} <CheckCircle2 size={16} color="#34d399" />
                  </div>
                  <div className="kx-plate-role kx-mono">{role}</div>
                </div>
                <span className="kx-dot" />
              </div>
            </div>
          </div>
        </div>

        {CHIPS.map(({ label, Icon, style, delay }) => (
          <div 
            key={label} 
            className="kx-chip kx-mono" 
            style={{ 
              ...style, 
              animationDelay: delay 
            } as React.CSSProperties}
          >
            <Icon size={14} color="#6ee7b7" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProfileFrame;
