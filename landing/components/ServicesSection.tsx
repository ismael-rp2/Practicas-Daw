'use client';

import Link from 'next/link';
import { useRef, useState, useCallback } from 'react';
import { Mail, Brain, Building2 } from 'lucide-react';
import Reveal from '@/components/Reveal';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    Icon    : Mail,
    title   : 'EDU + IA — Boletín semanal',
    body    : 'Una idea aplicable, un prompt concreto y cero hype. Cada semana en tu bandeja de entrada.',
    linkText: 'Suscribirme gratis',
    href    : '/boletin',
    featured: false,
  },
  {
    Icon    : Brain,
    title   : 'ProfeLibre — Curso online',
    body    : 'El sistema completo para integrar la IA en tu práctica docente y recuperar 10 horas a la semana.',
    linkText: 'Ver el programa',
    href    : '/cursos/profelibre',
    featured: true,
  },
  {
    Icon    : Building2,
    title   : 'Formaciones para centros',
    body    : 'Sesiones, talleres y programas de implantación a medida para claustros, redes y organismos.',
    linkText: 'Pedir propuesta',
    href    : '/formaciones',
    featured: false,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: -9999, y: -9999 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const onLeave = useCallback(() => setSpot({ x: -9999, y: -9999 }), []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ position: 'relative' }}
    >
      {/* ── Spotlight overlay ──────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position     : 'absolute',
          inset        : '-2rem',
          pointerEvents: 'none',
          zIndex       : 0,
          background   : `radial-gradient(650px circle at ${spot.x}px ${spot.y}px, rgba(147,51,234,0.09), transparent 65%)`,
        }}
      />

      {/* ── Cards grid ─────────────────────────────────────────────────── */}
      <div style={{
        position           : 'relative',
        zIndex             : 1,
        display            : 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap                : 'clamp(1.25rem, 3vw, 2rem)',
        alignItems         : 'stretch',
      }}>
        {SERVICES.map(({ Icon, title, body, linkText, href, featured }, i) => (
          <Reveal key={title} variant="slide-up" staggerIndex={i} style={{ height: '100%' }}>
            <article
              className={featured ? 'service-card service-card--featured' : 'service-card'}
              style={{
                display      : 'flex',
                flexDirection: 'column',
                gap          : '1rem',
                background   : 'var(--bg-card)',
                border       : '1px solid rgba(147,51,234,0.55)',
                borderRadius : '16px',
                padding      : featured
                  ? 'clamp(2rem, 3.5vw, 2.75rem)'
                  : 'clamp(1.5rem, 2.5vw, 2rem)',
                height       : '100%',
              }}
            >
              {/* Icon container */}
              <div style={{
                width         : 40,
                height        : 40,
                borderRadius  : 10,
                background    : 'rgba(255,255,255,0.05)',
                border        : '1px solid rgba(255,255,255,0.1)',
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'center',
                flexShrink    : 0,
              }}>
                <Icon size={18} color="var(--accent-blue)" strokeWidth={1.75} />
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.15rem, 2.2vw, 1.35rem)',
                fontWeight   : 700,
                letterSpacing: '-0.02em',
                lineHeight   : 1.2,
                color        : '#fff',
              }}>
                {title}
              </h3>

              {/* Body */}
              <p style={{
                fontSize  : '0.96rem',
                lineHeight: 1.65,
                color     : 'var(--text-secondary)',
                flexGrow  : 1,
              }}>
                {body}
              </p>

              {/* CTA */}
              {featured ? (
                <Link href={href} style={{
                  marginTop     : '0.5rem',
                  display       : 'inline-flex',
                  alignItems    : 'center',
                  justifyContent: 'center',
                  gap           : '0.45rem',
                  padding       : '0.85rem 1.75rem',
                  borderRadius  : '999px',
                  background    : '#fff',
                  color         : '#0a0a0a',
                  fontFamily    : 'var(--mono)',
                  fontSize      : '0.78rem',
                  fontWeight    : 700,
                  letterSpacing : '0.07em',
                  textTransform : 'uppercase',
                  textDecoration: 'none',
                  transition    : 'opacity 0.2s ease, transform 0.2s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                >
                  {linkText} →
                </Link>
              ) : (
                <Link href={href} style={{
                  marginTop     : '0.5rem',
                  display       : 'inline-flex',
                  alignItems    : 'center',
                  gap           : '0.4rem',
                  fontSize      : '0.9rem',
                  fontWeight    : 600,
                  color         : 'var(--accent-blue-soft)',
                  textDecoration: 'none',
                }}>
                  {linkText} <span aria-hidden>→</span>
                </Link>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
