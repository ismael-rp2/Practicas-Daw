'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// GlowCTAButton — botón pill con aura pulsante + ping rings
// Requiere los keyframes aura-pulse / btn-breathe / ring-ping en globals.css
// ─────────────────────────────────────────────────────────────────────────────
export default function GlowCTAButton({
  href,
  onClick,
  children,
  subtitle,
}: {
  href?    : string;
  onClick? : () => void;
  children : ReactNode;
  subtitle?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Aura desenfocada morado → cian */}
        <div aria-hidden style={{
          position    : 'absolute',
          inset       : '-12px',
          background  : 'linear-gradient(135deg,#7c3aed,#06b6d4)',
          filter      : 'blur(30px)',
          borderRadius: '999px',
          zIndex      : 0,
          animation   : 'aura-pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Anillo ping — 1ª onda */}
        <div aria-hidden style={{
          position    : 'absolute',
          inset       : '-2px',
          border      : '2px solid rgba(124,58,237,.65)',
          borderRadius: '999px',
          animation   : 'ring-ping 2.4s ease-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Anillo ping — 2ª onda desfasada */}
        <div aria-hidden style={{
          position    : 'absolute',
          inset       : '-2px',
          border      : '2px solid rgba(124,58,237,.45)',
          borderRadius: '999px',
          animation   : 'ring-ping 2.4s ease-out .9s infinite',
          pointerEvents: 'none',
        }} />

        {/* Botón principal — Link si hay href, button si hay onClick */}
        {href ? (
          <Link href={href} className="glow-btn">
            {children}
            {' '}<span className="glow-btn__arrows" aria-hidden>→</span>
          </Link>
        ) : (
          <button type="button" onClick={onClick} className="glow-btn">
            {children}
            {' '}<span className="glow-btn__arrows" aria-hidden>→</span>
          </button>
        )}

      </div>

      {subtitle && (
        <p style={{
          fontFamily   : 'var(--mono)',
          fontSize     : '.7rem',
          letterSpacing: '.06em',
          color        : 'rgba(255,255,255,.35)',
          textAlign    : 'center',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
