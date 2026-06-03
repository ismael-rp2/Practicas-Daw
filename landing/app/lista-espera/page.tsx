'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import LogoMarquee from '@/components/LogoMarquee';
import Reveal from '@/components/Reveal';
import AnimatedCounter from '@/components/AnimatedCounter';
import HeroCanvas from '@/components/HeroCanvas';
import StaggerWords from '@/components/StaggerWords';

// ─────────────────────────────────────────────────────────────────────────────
// Declaraciones globales para fbq y gtag (inyectados por píxel externo).
// ─────────────────────────────────────────────────────────────────────────────
declare function fbq(event: string, name: string): void;
declare function gtag(command: string, event: string, params?: Record<string, unknown>): void;

// Instituciones simuladas para el marquee de social proof
const INSTITUCIONES = [
  'Universidad de Sevilla',
  'IES Macarena',
  'Edelvives Editorial',
  'INTEF — Ministerio',
  'Colegio Salesiano',
];

// Beneficios del programa (3 puntos)
const BENEFICIOS = [
  {
    emoji: '🧭',
    titulo: 'Método probado',
    desc: 'Un sistema paso a paso para integrar IA en tu aula sin perder la esencia docente.',
  },
  {
    emoji: '🤝',
    titulo: 'Comunidad activa',
    desc: 'Accede a un grupo de profes que comparten recursos, dudas y victorias cada semana.',
  },
  {
    emoji: '🔄',
    titulo: 'Actualizaciones incluidas',
    desc: 'El curso crece contigo: nuevos módulos cada trimestre sin coste adicional.',
  },
];

// Testimonios de placeholder (3 tarjetas)
const TESTIMONIOS = [
  {
    nombre: 'María G.',
    rol: 'Profesora de Secundaria',
    texto: '"En tres semanas tenía mis primeras unidades didácticas con IA. Imprescindible."',
  },
  {
    nombre: 'Carlos P.',
    rol: 'Jefe de Estudios, IES Ramón y Cajal',
    texto: '"Pasé de tener miedo a la IA a usarla en cada reunión de equipo."',
  },
  {
    nombre: 'Ana R.',
    rol: 'Maestra de Primaria',
    texto: '"El formato asíncrono me permitió compaginarlo con las oposiciones. 10/10."',
  },
];

/**
 * Landing de lista de espera — Curso Profe Libre 26-27.
 * No usa Header ni Footer globales (landing aislada de conversión).
 */
export default function ListaEsperaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nombre, setNombre] = useState('');
  const [email, setEmail]   = useState('');
  const [estado, setEstado] = useState<'idle' | 'loading' | 'ok'>('idle');

  /**
   * Gestiona el envío del formulario Brevo.
   * 1. Lee parámetros UTM de la URL para atribución.
   * 2. Dispara eventos de conversión (Meta Pixel + Google Ads).
   * 3. Simula envío con setTimeout y redirige a /lista-espera/gracias.
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === 'loading') return;
    setEstado('loading');

    // ── Lectura de parámetros UTM para atribución ──────────────────────────
    const utmSource   = searchParams.get('utm_source')   ?? '(direct)';
    const utmMedium   = searchParams.get('utm_medium')   ?? '(none)';
    const utmCampaign = searchParams.get('utm_campaign') ?? '(none)';

    // ── Tracking de conversión (Meta Pixel) ────────────────────────────────
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead');
    }

    // ── Tracking de conversión (Google Ads / GA4) ──────────────────────────
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        event_category: 'lista_espera',
        utm_source    : utmSource,
        utm_medium    : utmMedium,
        utm_campaign  : utmCampaign,
      });
    }

    // ── Envío simulado (reemplazar con fetch a Brevo en producción) ─────────
    setTimeout(() => {
      setEstado('ok');
      router.push('/lista-espera/gracias');
    }, 900);
  }

  return (
    <>
      {/* ── MINI HEADER ─────────────────────────────────────────────────── */}
      <header style={{
        position    : 'sticky',
        top         : 0,
        zIndex      : 100,
        display     : 'flex',
        alignItems  : 'center',
        justifyContent: 'space-between',
        height      : 'var(--header-h)',
        paddingInline: 'clamp(1.25rem, 5vw, 3rem)',
        background  : 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
          JOSEDA
        </span>
        <Link href="/" aria-label="Cerrar y volver al inicio"
          style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)',
            border: '1px solid var(--border-subtle)', padding: '0.35rem 0.75rem', letterSpacing: '0.05em' }}>
          [ ✕ ]
        </Link>
      </header>

      <main>
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section style={{
          position     : 'relative',
          overflow     : 'hidden',
          minHeight    : '90svh',
          display      : 'flex',
          alignItems   : 'center',
          background   : 'var(--bg-primary)',
          paddingBlock : 'clamp(4rem, 10svh, 8rem)',
        }}>
          <HeroCanvas />

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
            <Reveal variant="fade">
              {/* Chip de urgencia — pulso continuo escala + glow */}
              <div
                className="chip-pulse"
                style={{
                  alignItems   : 'center',
                  gap          : '0.5rem',
                  fontFamily   : 'var(--mono)',
                  fontSize     : '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color        : 'var(--accent-blue)',
                  background   : 'rgba(59,130,246,0.12)',
                  border       : '1px solid rgba(59,130,246,0.3)',
                  padding      : '0.45rem 0.9rem',
                  marginBottom : '2rem',
                  borderRadius : '4px',
                }}
              >
                ▸▸▸ Apertura 22 de junio · 19:00 h
              </div>
            </Reveal>

            <StaggerWords
              text="Conviértete en un profe libre el curso 26‑27."
              baseDelay={0.08}
              wordDelay={0.07}
              style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2.4rem, 6.5vw, 5rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.05,
                color        : '#fff',
                maxWidth     : '18ch',
                marginBottom : 'clamp(1.25rem, 3vw, 2rem)',
              }}
            />

            <Reveal variant="slide-up" delay={0.42}>
              <p style={{
                fontSize  : 'clamp(1.05rem, 2vw, 1.3rem)',
                color     : 'var(--text-secondary)',
                maxWidth  : '52ch',
                lineHeight: 1.65,
                marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
              }}>
                El programa online con el que docentes de toda España aprenden a usar la IA sin perder su voz pedagógica — y recuperan horas de vida.
              </p>
            </Reveal>

            {/* Lista de beneficios rápidos */}
            <Reveal variant="slide-up" delay={0.54}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
                {(['Aprende a tu ritmo, 100 % online', 'Actualizaciones gratis de por vida'] as const).map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(255,255,255,0.82)' }}>
                    <span aria-hidden="true" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(255,255,255,0.82)' }}>
                  <span aria-hidden="true" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>✓</span>
                  Comunidad de{' '}
                  <AnimatedCounter value={500} prefix="+" suffix=" docentes activos" />
                </li>
              </ul>
            </Reveal>

            {/* ── FORMULARIO BREVO ────────────────────────────────────────── */}
            <Reveal variant="slide-up" delay={0.64}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '440px' }}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  required
                  autoComplete="given-name"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
                <CTAButton
                  type="submit"
                  variant="primary"
                  arrow={false}
                  style={{ justifyContent: 'center', opacity: estado === 'loading' ? 0.6 : 1 }}
                >
                  {estado === 'loading' ? 'Apuntando…' : 'Apuntarme a la lista →'}
                </CTAButton>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>
                  Sin spam. Puedes darte de baja cuando quieras.
                </p>
              </form>
            </Reveal>
          </div>
        </section>

        {/* ── SOCIAL PROOF — MARQUEE ────────────────────────────────────── */}
        <section style={{ paddingBlock: 'clamp(2.5rem, 6vw, 4rem)', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
          <p style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>
            Docentes de instituciones como
          </p>
          <LogoMarquee logos={INSTITUCIONES} duration={40} />
        </section>

        {/* ── BENEFICIOS (3 columnas) ───────────────────────────────────── */}
        <section style={{ paddingBlock: 'clamp(4rem, 10vw, 7rem)', background: 'var(--bg-primary)' }}>
          <div style={{ width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>01 — Lo que consigues</p>
              <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 'clamp(2.5rem, 6vw, 4rem)', maxWidth: '28ch' }}>
                Todo lo que necesitas para dar el salto.
              </h2>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(1.25rem, 3vw, 2rem)' }}>
              {BENEFICIOS.map(({ emoji, titulo, desc }, i) => (
                <Reveal key={titulo} delay={i * 0.1}>
                  <div style={{
                    background  : 'var(--bg-card)',
                    border      : '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding     : 'clamp(1.5rem, 3vw, 2rem)',
                    display     : 'flex',
                    flexDirection: 'column',
                    gap         : '0.85rem',
                  }}>
                    <span aria-hidden="true" style={{ fontSize: '1.8rem', lineHeight: 1 }}>{emoji}</span>
                    <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
                      {titulo}
                    </h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ───────────────────────────────────────────────── */}
        <section style={{ paddingBlock: 'clamp(4rem, 10vw, 7rem)', background: 'var(--bg-deep)' }}>
          <div style={{ width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>02 — Lo que dicen</p>
              <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
                Profes que ya dieron el salto.
              </h2>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1.25rem, 3vw, 2rem)' }}>
              {TESTIMONIOS.map(({ nombre, rol, texto }, i) => (
                <Reveal key={nombre} delay={i * 0.1}>
                  <blockquote style={{
                    background  : 'var(--bg-card)',
                    border      : '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding     : 'clamp(1.5rem, 3vw, 2rem)',
                    display     : 'flex',
                    flexDirection: 'column',
                    gap         : '1rem',
                  }}>
                    <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
                      {texto}
                    </p>
                    <footer style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <strong style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{nombre}</strong>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.06em', color: 'var(--accent-blue)' }}>{rol}</span>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CIERRE CTA ────────────────────────────────────────────────── */}
        <section style={{
          paddingBlock: 'clamp(5rem, 14svh, 10rem)',
          background  : 'var(--bg-primary)',
          textAlign   : 'center',
        }}>
          <div style={{ width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>▸▸▸ Apertura 22 de junio · 19:00 h</p>
              <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', maxWidth: '22ch', marginInline: 'auto' }}>
                Las plazas son limitadas. No te quedes fuera.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Scroll hasta el formulario del hero */}
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <CTAButton variant="primary" arrow={false} style={{ fontSize: '0.9rem', padding: '1.1rem 2.4rem' }}>
                  Apuntarme a la lista →
                </CTAButton>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── MINI FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{
        borderTop  : '1px solid var(--border-subtle)',
        paddingBlock: '1.5rem',
        paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
        display    : 'flex',
        justifyContent: 'center',
        background : 'var(--bg-deep)',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
          © 2026 Joseda
        </p>
      </footer>
    </>
  );
}

// ── Estilos compartidos para inputs del formulario ──────────────────────────
const inputStyle: React.CSSProperties = {
  width       : '100%',
  background  : 'rgba(255,255,255,0.05)',
  border      : '1px solid var(--border-subtle)',
  borderRadius: '6px',
  padding     : '0.9rem 1rem',
  fontSize    : '0.95rem',
  color       : '#fff',
  fontFamily  : 'var(--sans)',
  outline     : 'none',
  transition  : 'border-color 0.2s',
};
