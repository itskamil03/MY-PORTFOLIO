import React from 'react';

export interface LogoProps {
  className?: string;
  size?: number;
}

export function NextjsLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="currentColor">
      <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
        <circle cx="90" cy="90" fill="black" r="90"/>
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" fill="currentColor" r="90" className="text-slate-900 dark:text-white"/>
        <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="url(#next_paint0)"/>
        <rect fill="url(#next_paint1)" height="72" width="12" x="115" y="54"/>
      </g>
      <defs>
        <linearGradient id="next_paint0" x1="109" x2="144.5" y1="116.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="next_paint1" x1="121" x2="120.799" y1="54" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ReactLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

export function TypeScriptLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path fill="#3178C6" d="M1.5 1.5h125v125H1.5z"/>
      <path fill="#FFF" d="M117.8 77.2c-.3-1.6-1.1-2.9-2.2-3.8-1.2-.9-2.7-1.7-4.6-2.3-1.9-.6-4.1-1.3-6.6-1.9-2.6-.6-5.3-1.4-8.1-2.3-2.9-.9-5.4-2.1-7.7-3.8-2.3-1.6-4.2-3.8-5.5-6.5-1.4-2.7-2-6.1-2-10.1 0-4.6 1.1-8.5 3.3-11.8 2.2-3.3 5.3-5.8 9.3-7.5 4-1.7 8.7-2.6 14.1-2.6 5 0 9.5.8 13.4 2.3 3.9 1.6 7.1 3.8 9.4 6.7 2.3 2.9 3.7 6.3 4.1 10.2l-14.7 2.5c-.4-3.1-1.6-5.4-3.6-6.9-2-1.5-4.9-2.2-8.6-2.2-3.4 0-6 .7-7.8 2.1-1.8 1.4-2.7 3.3-2.7 5.7 0 1.9.6 3.4 1.8 4.5 1.2 1.1 2.8 1.9 4.7 2.6 2 .7 4.3 1.3 6.9 2 2.6.7 5.3 1.5 8.1 2.4 2.8.9 5.3 2.2 7.5 3.8 2.2 1.6 4 3.8 5.3 6.4 1.3 2.7 2 6 2 10 0 4.8-1.1 8.8-3.4 12.1-2.3 3.3-5.5 5.9-9.7 7.7-4.2 1.8-9.2 2.7-15.1 2.7-6.2 0-11.5-1.1-16-3.3-4.5-2.2-7.9-5.2-10.2-9-2.3-3.8-3.5-8.2-3.6-13.3l14.7-2.1c.3 3.9 1.8 6.9 4.4 8.9 2.6 2 6.2 3 10.7 3 3.9 0 6.9-.8 9-2.3 2.1-1.6 3.1-3.7 3.1-6.5 0-1.6-.5-2.9-1.5-3.9zM59.9 39.8H42.7v63.1H27.8V39.8H10.6V27.4h49.3v12.4z"/>
    </svg>
  );
}

export function JavaScriptLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 630 630" className={className}>
      <rect width="630" height="630" fill="#F7DF1E" rx="80"/>
      <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41.0-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-33.4 21.57c-10.15-18.2-21.1-25.37-50.8-25.37-23.26 0-37.6 11.4-37.6 26.2 0 17.8 13.96 25.4 39.75 36.4l14.8 6.35c48.64 20.72 75.8 43.1 75.8 91.8 0 52.4-41.4 82.5-98.1 82.5-54.98 0-90.5-26.2-106.1-58.8zm-209.9 5.5c8.9 15.2 16.9 28.3 35.5 28.3 18.2 0 29.6-7.2 29.6-35.1v-200.5h44.4v202.1c0 51.6-30.03 74.4-72.3 74.4-39.76 0-63-20.7-74.8-46.1z" fill="#000"/>
    </svg>
  );
}

export function TailwindLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#38BDF8">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
    </svg>
  );
}

export function HtmlLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#E34F26">
      <path d="M2.5 2h19l-1.7 19.3L12 24l-7.8-2.7L2.5 2zm15.7 6.4H7.9l.3 3.6h9.7l-.6 6.7-5.3 1.5-5.3-1.5-.3-3.6h2.5l.2 1.8 2.9.8 2.9-.8.3-3.6H6.1L5.3 4.8h13.3l-.4 3.6z"/>
    </svg>
  );
}

export function CssLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#1572B6">
      <path d="M2.5 2h19l-1.7 19.3L12 24l-7.8-2.7L2.5 2zm15.7 6.4H7.9l.3 3.6h9.7l-.6 6.7-5.3 1.5-5.3-1.5-.3-3.6h2.5l.2 1.8 2.9.8 2.9-.8.3-3.6H6.1L5.3 4.8h13.3l-.4 3.6z"/>
    </svg>
  );
}

export function BootstrapLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#7952B3">
      <path d="M20.5 3h-17A2.5 2.5 0 0 0 1 5.5v13A2.5 2.5 0 0 0 3.5 21h17a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 20.5 3zm-9.3 13.5H7.4V7.5h3.8c1.7 0 2.8.9 2.8 2.2 0 .9-.5 1.6-1.3 1.9 1.1.3 1.7 1.1 1.7 2.2 0 1.5-1.3 2.7-3.2 2.7zm-.2-5.7H9.2V9.1h1.7c.9 0 1.5.4 1.5 1.1 0 .7-.6 1.1-1.4 1.1zm.4 4.1H9.2v-2.6h1.9c1 0 1.6.4 1.6 1.3 0 .9-.6 1.3-1.6 1.3z"/>
    </svg>
  );
}

export function NodejsLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <path fill="#539E43" d="M16 2.5L3 10v12l13 7.5 13-7.5V10L16 2.5zm0 2.3l10.8 6.2L16 17.3 5.2 11 16 4.8zM4.8 12.3l10.2 5.9v11.6L4.8 23.9V12.3zm12.2 17.5V18.2l10.2-5.9v11.6L17 29.8z"/>
    </svg>
  );
}

export function ExpressLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor"/>
      <text x="5" y="16" fontSize="10" fontWeight="bold" fill="currentColor" stroke="none" fontFamily="sans-serif">ex</text>
    </svg>
  );
}

export function RestApiLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7"/>
      <rect x="2" y="14" width="20" height="8" rx="2" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7"/>
      <line x1="6" y1="6" x2="6.01" y2="6" stroke="#0284c7" strokeWidth="3"/>
      <line x1="6" y1="18" x2="6.01" y2="18" stroke="#0284c7" strokeWidth="3"/>
      <path d="M16 6h2"/>
      <path d="M16 18h2"/>
    </svg>
  );
}

export function JwtLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#D63AFF">
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-8-4v6l8 4 8-4v-6l-8 4zm0 6l-8-4v4l8 4 8-4v-4l-8 4z"/>
    </svg>
  );
}

export function JavaLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#E76F00">
      <path d="M9.1 19.3c0 .8 1.4 1.5 3.1 1.5s3.1-.7 3.1-1.5c0-.8-1.4-1.5-3.1-1.5s-3.1.7-3.1 1.5zm6.5-6.8c-.8.8-1.9 1.4-3.4 1.4-1.4 0-2.6-.6-3.4-1.4-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1c1.1 1.1 2.7 1.8 4.5 1.8s3.4-.7 4.5-1.8c.3-.3.3-.8 0-1.1-.3-.3-.8-.3-1.1 0zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.8 8.8c-.8.8-1.9 1.4-3.4 1.4-1.4 0-2.6-.6-3.4-1.4-.3-.3-.8-.3-1.1 0s-.3.8 0 1.1c1.1 1.1 2.7 1.8 4.5 1.8s3.4-.7 4.5-1.8c.3-.3.3-.8 0-1.1-.3-.3-.8-.3-1.1 0z"/>
    </svg>
  );
}

export function MongoDbLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#47A248" d="M17.193 9.555c-1.264-5.201-4.404-7.418-4.802-8.67-.184-.577-.38-.885-.391-.885s-.207.308-.391.885c-.398 1.252-3.538 3.469-4.802 8.67-1.42 5.842.795 10.843 4.935 13.88.083.061.18.1.258.565h.001c.078-.465.174-.504.258-.565 4.14-3.037 6.354-8.038 4.934-13.88z"/>
      <path fill="#499D4A" d="M12.008.006c-.011 0-.207.308-.391.885-.398 1.252-3.538 3.469-4.802 8.67-1.42 5.842.795 10.843 4.935 13.88.083.061.18.1.258.565V.006z"/>
    </svg>
  );
}

export function MongooseLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#880000">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7 3.5v7.4l-7 3.5-7-3.5V8.3l7-3.5z"/>
      <circle cx="12" cy="12" r="3" fill="#e53e3e"/>
    </svg>
  );
}

export function MySqlLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#00758F">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.88 15.65c-.75.25-1.58.35-2.45.22-.88-.13-1.64-.52-2.22-1.12-.58-.6-.92-1.4-.98-2.32-.06-.92.16-1.88.63-2.78.47-.9 1.15-1.68 1.99-2.26.84-.58 1.77-.92 2.72-.98.95-.06 1.83.15 2.56.6.73.45 1.28 1.12 1.58 1.95l-1.92.74c-.19-.48-.52-.86-.95-1.11-.43-.25-.95-.36-1.5-.33-.55.03-1.09.23-1.58.58-.49.35-.89.81-1.17 1.34-.28.53-.41 1.09-.37 1.63.04.54.24.99.58 1.33.34.34.78.55 1.28.62.5.07.97 0 1.39-.14.42-.14.77-.37 1.03-.68l1.45 1.33c-.45.54-1.02.94-1.68 1.16z"/>
    </svg>
  );
}

export function GitLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#F05032">
      <path d="M21.62 10.45L13.55 2.38a2.38 2.38 0 0 0-3.37 0L8.1 4.46l3.4 3.4a2.02 2.02 0 0 1 2.54 2.54l3.27 3.27a2.02 2.02 0 1 1-1.42 1.41L12.8 12a2.02 2.02 0 0 1-2.18-.46l-3.23 3.23a2.02 2.02 0 1 1-1.42-1.41l3.2-3.2A2.02 2.02 0 0 1 9.4 8.7L6 5.3 2.38 8.92a2.38 2.38 0 0 0 0 3.37l8.07 8.07a2.38 2.38 0 0 0 3.37 0l7.8-7.8a2.38 2.38 0 0 0 0-3.37z"/>
    </svg>
  );
}

export function GitHubLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export function PostmanLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#FF6C37">
      <path d="M13.887 9.873c-.027-.35-.297-.62-.647-.648L8.72 8.9c-.35-.027-.648.243-.675.594l-.324 4.52c-.027.35.243.648.594.675l4.52.324c.35.027.648-.243.675-.594l.377-4.546zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.84 13.92l-4.52-.324c-1.348-.096-2.355-1.258-2.259-2.606l.324-4.52c.096-1.348 1.258-2.355 2.606-2.259l4.52.324c1.348.096 2.355 1.258 2.259 2.606l-.324 4.52c-.096 1.348-1.258 2.355-2.606 2.259z"/>
    </svg>
  );
}

export function VercelLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2L2 20h20L12 2z"/>
    </svg>
  );
}

export function VsCodeLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#007ACC">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.27a1 1 0 0 0-.005 1.503l3.65 3.23-3.65 3.23a1 1 0 0 0 .005 1.503l1.322 1.212a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.985V4.015a1.5 1.5 0 0 0-.85-1.428zM18 16.5l-6.5-4.5L18 7.5v9z"/>
    </svg>
  );
}

export function ScrumLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" stroke="#10B981" fill="#10B981" fillOpacity="0.15"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  );
}
