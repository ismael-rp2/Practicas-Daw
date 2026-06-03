'use client';

import CTAButton from '@/components/CTAButton';
import Link from 'next/link';
import HeroCanvas from '@/components/HeroCanvas';
import type { CSSProperties } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Redes sociales mostradas en la sección de cierre (§3 sitemap — canales JD)
// ─────────────────────────────────────────────────────────────────────────────
const REDES = [
  {
    label: 'LinkedIn',
    href : 'https://www.linkedin.com',
    desc : 'Reflexiones sobre educación e IA',
    icon : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href : 'https://www.youtube.com',
    desc : 'Vídeos y formaciones gratuitas',
    icon : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href : 'https://www.instagram.com',
    desc : 'El día a día de un profe libre',
    icon : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.8.72 1.47 1.38 2.13.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38c.66-.66 1.07-1.33 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Estilos compartidos para las tarjetas de red social
// ─────────────────────────────────────────────────────────────────────────────
const cardStyle: CSSProperties = {
  display       : 'flex',
  alignItems    : 'flex-start',
  gap           : '1rem',
  background    : 'var(--bg-card)',
  border        : '1px solid var(--border-subtle)',
  borderRadius  : '14px',
  padding       : 'clamp(1.1rem, 3vw, 1.5rem)',
  textDecoration: 'none',
  color         : 'inherit',
  transition    : 'border-color 0.2s',
};

/**
 * Página de confirmación de lista de espera.
 * Sin Header ni Footer globales — mantiene al usuario enfocado post-conversión.
 */
export default function GraciasPage() {
  return (
    <>
      {/* ── MINI HEADER ─────────────────────────────────────────────────── */}
      <header style={{
        height        : 'var(--header-h)',
        display       : 'flex',
        alignItems    : 'center',
        paddingInline : 'clamp(1.25rem, 5vw, 4rem)',
        borderBottom  : '1px solid var(--border-subtle)',
        background    : 'var(--bg-deep)',
      }}>
        <Link href="/" aria-label="Joseda — inicio" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.25rem' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
            joseda
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent-blue)' }}>
            .education
          </span>
        </Link>
      </header>

      <main style={{
        position      : 'relative',
        overflow      : 'hidden',
        minHeight     : 'calc(100svh - var(--header-h))',
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        background    : 'var(--bg-primary)',
        paddingBlock  : 'clamp(4rem, 10svh, 7rem)',
        paddingInline : 'clamp(1.25rem, 5vw, 4rem)',
      }}>
        <HeroCanvas />
        <div style={{
          position : 'relative',
          zIndex   : 1,
          width    : '100%',
          maxWidth : '640px',
          display  : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap      : 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center',
        }}>

          {/* ── CHECKMARK VISUAL ──────────────────────────────────────── */}
          <div style={{
            width       : 'clamp(72px, 14vw, 96px)',
            height      : 'clamp(72px, 14vw, 96px)',
            borderRadius: '50%',
            background  : 'rgba(59,130,246,0.12)',
            border      : '1px solid rgba(59,130,246,0.35)',
            display     : 'flex',
            alignItems  : 'center',
            justifyContent: 'center',
            flexShrink  : 0,
          }}>
            <svg
              width="40" height="40" viewBox="0 0 24 24"
              fill="none" stroke="var(--accent-blue)"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              aria-label="Confirmado"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* ── EYEBROW ───────────────────────────────────────────────── */}
          <p style={{
            fontFamily   : 'var(--mono)',
            fontSize     : '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color        : 'var(--accent-blue)',
            marginBottom : '-1rem',
          }}>
            ✓ Lista de espera confirmada
          </p>

          {/* ── H1 ────────────────────────────────────────────────────── */}
          <h1 style={{
            fontFamily   : 'var(--sans)',
            fontSize     : 'clamp(2rem, 6vw, 3.25rem)',
            fontWeight   : 800,
            letterSpacing: '-0.03em',
            lineHeight   : 1.08,
            color        : '#fff',
          }}>
            ¡Ya estás dentro de la lista!
          </h1>

          {/* ── SUBTÍTULO ─────────────────────────────────────────────── */}
          <p style={{
            fontSize  : 'clamp(1rem, 2.2vw, 1.15rem)',
            lineHeight: 1.7,
            color     : 'var(--text-secondary)',
            maxWidth  : '54ch',
          }}>
            Te avisaremos <strong style={{ color: '#fff' }}>24 horas antes</strong> de la apertura oficial y recibirás las instrucciones para acceder al precio <em style={{ color: 'var(--accent-blue-soft)', fontStyle: 'normal', fontWeight: 600 }}>early bird</em> y los bonus.
          </p>

          {/* ── SEPARADOR ─────────────────────────────────────────────── */}
          <hr style={{ width: '100%', border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '0.5rem 0' }} />

          {/* ── SECCIÓN REDES SOCIALES ────────────────────────────────── */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <p style={{
              fontFamily   : 'var(--sans)',
              fontSize     : 'clamp(0.95rem, 2vw, 1.05rem)',
              fontWeight   : 500,
              color        : 'rgba(255,255,255,0.75)',
              textAlign    : 'center',
            }}>
              Mientras esperas al 22 de junio, sigamos la conversación:
            </p>

            {/* Grid de tarjetas de redes */}
            <div style={{
              display              : 'grid',
              gridTemplateColumns  : 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap                  : 'clamp(0.75rem, 2vw, 1rem)',
            }}>
              {REDES.map(({ label, href, desc, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={cardStyle}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.45)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'; }}
                >
                  {/* Icono con fondo sutil */}
                  <div style={{
                    flexShrink    : 0,
                    width         : 44,
                    height        : 44,
                    borderRadius  : '10px',
                    background    : 'rgba(255,255,255,0.06)',
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'center',
                    color         : 'rgba(255,255,255,0.75)',
                  }}>
                    {icon}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                      {label}
                    </span>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {desc}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── SEPARADOR ─────────────────────────────────────────────── */}
          <hr style={{ width: '100%', border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '0.5rem 0' }} />

          {/* ── BOTÓN VOLVER ──────────────────────────────────────────── */}
          <CTAButton href="/" variant="ghost" arrow={false}>
            ← Volver al inicio
          </CTAButton>

        </div>
      </main>
    </>
  );
}
