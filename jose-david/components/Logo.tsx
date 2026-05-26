import type { CSSProperties } from 'react';

interface LogoProps {
  style?: CSSProperties;
  className?: string;
}

export default function Logo({ style, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      aria-label="José David logo"
    >
      {/* Brain outline stylizado */}
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.9"/>
      {/* Conexiones neurales */}
      <path d="M10 16 Q13 11 16 13 Q19 11 22 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M10 16 Q13 21 16 19 Q19 21 22 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8"/>
      <line x1="16" y1="13" x2="16" y2="19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      {/* Nodos */}
      <circle cx="10" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="22" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="16" cy="13" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="19" r="1.5" fill="currentColor"/>
      {/* Brillo superior */}
      <circle cx="16" cy="13" r="2.5" stroke="var(--accent, #818cf8)" strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
}
