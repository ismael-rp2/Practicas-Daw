'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const PODCASTS = [
  {
    id: 1, num: '01',
    name   : 'Tribu de Profes',
    sector : 'Educación · Comunidad',
    summary: 'El pódcast donde docentes comprometidos comparten experiencias, recursos y estrategias para transformar la educación desde dentro del aula.',
    href   : 'https://open.spotify.com/show/1uzkIrSrMjSHxwkC1odyLG?si=66430aedc1b444d3&nd=1&dlsi=c9023e8e81e248c5',
    color  : '#818cf8',
  },
  {
    id: 2, num: '02',
    name   : '¡Vamos a clase!',
    sector : 'Educación · Diario · 5-10 min',
    summary: 'Un pódcast diario de 5 a 10 minutos con un recurso, herramienta o aprendizaje concreto que puedes aplicar en clase hoy mismo.',
    href   : '',
    color  : '#34d399',
  },
  {
    id: 3, num: '03',
    name   : 'Google Edu Podcast',
    sector : 'Tecnología Educativa · Google',
    summary: 'Exploramos cómo las herramientas de Google pueden transformar la enseñanza y el aprendizaje, con casos reales y docentes innovadores.',
    href   : 'https://www.spreaker.com/podcast/google-edu-podcast--3612948',
    color  : '#60a5fa',
  },
  {
    id: 4, num: '04',
    name   : 'LEOcuentos',
    sector : 'Cuentos · Infantil · Lectura',
    summary: 'Cuentos narrados para fomentar el amor por la lectura en los más pequeños. Una experiencia auditiva para imaginar y aprender.',
    href   : 'https://leocuentos.es/blog',
    color  : '#f59e0b',
  },
  {
    id: 5, num: '05',
    name   : 'Intercepta2',
    sector : 'Educación · Tecnología',
    summary: 'Conversaciones sobre tecnología e innovación educativa desde una perspectiva crítica y transformadora.',
    href   : 'https://www.spreaker.com/podcast/intercepta2--5149407',
    color  : '#f472b6',
  },
  {
    id: 6, num: '06',
    name   : 'Innovación Educativa',
    sector : 'Innovación · Pedagogía',
    summary: 'Ideas, proyectos y experiencias de innovación educativa para renovar la práctica docente y mejorar el aprendizaje en el aula.',
    href   : 'https://www.spreaker.com/podcast/innovacion-educativa--3691253',
    color  : '#a78bfa',
  },
] as const;

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function Podcasts() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLAnchorElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const sv = document.querySelector<HTMLElement>('.scroll-viewport');

    const ctx = gsap.context(() => {

      /* BG image: fade out + subtle scale as section scrolls through */
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          opacity       : 0,
          scale         : 1.08,
          ease          : 'none',
          scrollTrigger : {
            trigger : sectionRef.current,
            scroller: sv,
            start   : 'top 60%',
            end     : 'bottom 15%',
            scrub   : 1.8,
          },
        });
      }

      /* Header reveal */
      gsap.timeline({
        scrollTrigger: {
          trigger : '.pod2-hdr',
          scroller: sv,
          start   : 'top 84%',
          once    : true,
        },
      })
        .from('.pod2-overline',  { opacity: 0, y: 14, duration: 0.5,  ease: 'power2.out' })
        .from('.pod2-headline .reveal-inner', { y: '110%', duration: 0.85, ease: 'power3.out' }, '-=0.2')
        .from('.pod2-tagline',   { opacity: 0, y: 8,  duration: 0.5,  ease: 'power2.out' }, '-=0.35')
        .from('.pod2-sub',       { opacity: 0, y: 8,  duration: 0.5,  ease: 'power2.out' }, '-=0.4');

      /* Cards entrance stagger */
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity : 0,
          y       : 28,
          duration: 0.65,
          ease    : 'power2.out',
          delay   : i * 0.08,
          scrollTrigger: {
            trigger : el,
            scroller: sv,
            start   : 'top 90%',
            once    : true,
          },
        });
      });

    }, sectionRef);

    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="podcasts"
      style={{ position: 'relative', overflow: 'hidden', background: '#060606', borderTop: '1px solid var(--border)' }}
    >

      {/* ── Background image (honda.webp) — animated by GSAP scrub ── */}
      <div
        ref={bgRef}
        style={{ position: 'absolute', inset: 0, transformOrigin: 'center center', willChange: 'transform, opacity' }}
      >
        <Image
          src="/honda.webp"
          alt=""
          fill
          aria-hidden="true"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority={false}
        />
        {/* Gradient overlay so text remains legible over the image */}
        <div style={{
          position  : 'absolute',
          inset     : 0,
          background: 'linear-gradient(180deg, rgba(6,6,6,0.62) 0%, rgba(6,6,6,0.48) 50%, rgba(6,6,6,0.72) 100%)',
        }} />
      </div>

      {/* ── Foreground content — sits above the image ── */}
      <div style={{ position: 'relative', zIndex: 10, paddingBottom: '6rem' }}>

        {/* ── Header ── */}
        <div
          className="pod2-hdr"
          style={{
            padding       : 'clamp(3.5rem, 5vw, 5.5rem) calc(4vw + var(--nav-sw, 60px)) 3rem',
            borderBottom  : '1px solid rgba(255,255,255,0.08)',
            display       : 'flex',
            alignItems    : 'flex-end',
            justifyContent: 'space-between',
            gap           : '2rem',
            flexWrap      : 'wrap',
          }}
        >
          <div>
            <p
              className="pod2-overline"
              style={{
                fontSize     : '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color        : 'var(--muted)',
                marginBottom : '1.2rem',
              }}
            >
              04 — Podcasts
            </p>

            <h2
              className="pod2-headline"
              style={{
                fontFamily: 'var(--serif)',
                fontSize  : 'clamp(2.4rem, 5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                color     : 'var(--fg)',
                margin    : 0,
              }}
            >
              <span className="reveal-wrap">
                <span className="reveal-inner">
                  Mi voz{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>digital</em>
                </span>
              </span>
            </h2>

            <p
              className="pod2-tagline"
              style={{
                fontFamily: 'var(--serif)',
                fontSize  : 'clamp(1rem, 2vw, 1.35rem)',
                fontWeight: 300,
                color     : 'rgba(255,255,255,0.55)',
                marginTop : '0.5rem',
              }}
            >
              para docentes innovadores.
            </p>
          </div>

          <p
            className="pod2-sub"
            style={{
              fontSize  : '0.88rem',
              color     : 'var(--muted)',
              maxWidth  : '38ch',
              lineHeight: 1.75,
            }}
          >
            Seis proyectos de audio para aprender, reflexionar y crecer como docente.
            Escúchalos donde quieras, cuando quieras.
          </p>
        </div>

        {/* ── Glassmorphism card grid ── */}
        <div
          style={{
            display             : 'grid',
            gridTemplateColumns : 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap                 : '1.2rem',
            padding             : '3rem calc(4vw + var(--nav-sw, 60px))',
          }}
        >
          {PODCASTS.map((pod, i) => (
            <a
              key={pod.id}
              href={pod.href || undefined}
              target={pod.href ? '_blank' : undefined}
              rel={pod.href ? 'noopener noreferrer' : undefined}
              ref={el => { cardRefs.current[i] = el; }}
              aria-label={pod.href ? `Escuchar ${pod.name}` : `${pod.name} — próximamente`}
              style={{
                display            : 'flex',
                flexDirection      : 'column',
                padding            : '1.8rem 2rem',
                borderRadius       : '12px',
                borderTop          : `2px solid ${pod.color}`,
                border             : '1px solid rgba(255,255,255,0.10)',
                borderTopWidth     : '2px',
                borderTopColor     : pod.color,
                background         : 'rgba(255,255,255,0.06)',
                backdropFilter     : 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                textDecoration     : 'none',
                color              : 'inherit',
                transition         : 'background 0.3s ease, transform 0.35s ease',
                cursor             : pod.href ? 'pointer' : 'default',
                minHeight          : '220px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.11)';
                e.currentTarget.style.transform   = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform   = 'translateY(0)';
              }}
            >
              {/* Number + badge/arrow */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.3rem' }}>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.22)', fontVariantNumeric: 'tabular-nums' }}>
                  {pod.num}
                </span>
                {pod.href ? (
                  <span style={{ color: pod.color, fontSize: '1rem', opacity: 0.8, lineHeight: 1 }} aria-hidden="true">↗</span>
                ) : (
                  <span style={{
                    fontSize     : '0.5rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color        : pod.color,
                    border       : `1px solid ${pod.color}`,
                    padding      : '0.22em 0.6em',
                    borderRadius : '2px',
                    opacity      : 0.6,
                  }}>Próximo</span>
                )}
              </div>

              {/* Name */}
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 400, color: 'var(--fg)', margin: '0 0 0.4rem', lineHeight: 1.2 }}>
                {pod.name}
              </h3>

              {/* Sector */}
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: pod.color, margin: '0 0 0.9rem', opacity: 0.85 }}>
                {pod.sector}
              </p>

              {/* Summary */}
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75, margin: 0, flexGrow: 1 }}>
                {pod.summary}
              </p>

              {/* Bottom accent line */}
              <div style={{ marginTop: '1.4rem', height: '1px', background: `linear-gradient(90deg, ${pod.color}60, transparent)` }} aria-hidden="true" />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
