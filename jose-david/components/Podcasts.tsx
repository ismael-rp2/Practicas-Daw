'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const PODCASTS = [
  {
    id: 1, num: '01',
    name   : 'Tribu de Profes',
    sector : 'Educación · Comunidad',
    summary: 'El pódcast donde docentes comprometidos comparten experiencias, recursos y estrategias para transformar la educación desde dentro del aula.',
    href   : 'https://open.spotify.com/show/1uzkIrSrMjSHxwkC1odyLG?si=66430aedc1b444d3&nd=1&dlsi=c9023e8e81e248c5',
    color  : '#3b82f6',
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
    color  : '#60a5fa',
  },
] as const;

/* ─── CSS inyectado una sola vez ────────────────────────────────────────────── */
const CSS_ANIM = `
  @keyframes podWaveBar {
    0%,100% { opacity:1; transform:scaleY(1);   }
    50%     { opacity:.4; transform:scaleY(.45); }
  }
  @keyframes podCardReveal {
    0%   {
      opacity: 0;
      transform: translateY(52px) scale(0.95);
      filter: blur(6px);
    }
    60%  {
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }
  .pod-card-hidden {
    opacity: 0;
    transform: translateY(52px) scale(0.95);
    filter: blur(6px);
    will-change: transform, opacity, filter;
  }
  .pod-card-visible {
    animation: podCardReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

/* ─── Icono de onda de audio ────────────────────────────────────────────────── */
const BARS = [
  { x:0,  y:7,  h:4,  delay:'0s'   },
  { x:5,  y:4,  h:10, delay:'.12s' },
  { x:10, y:1,  h:16, delay:'.24s' },
  { x:15, y:3,  h:12, delay:'.18s' },
  { x:20, y:6,  h:6,  delay:'.06s' },
  { x:25, y:8,  h:2,  delay:'.30s' },
];

function WaveIcon({ color }: { color: string }) {
  return (
    <svg width="30" height="18" viewBox="0 0 30 18" fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}>
      {BARS.map((b, i) => (
        <rect
          key={i}
          x={b.x} y={b.y} width="3" height={b.h} rx="1.5"
          fill={color}
          style={{
            transformBox   : 'fill-box',
            transformOrigin: 'center',
            animation      : `podWaveBar 1.6s ease-in-out infinite ${b.delay}`,
          }}
        />
      ))}
    </svg>
  );
}

/* ─── Componente principal ──────────────────────────────────────────────────── */
export default function Podcasts() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLAnchorElement | null)[]>([]);

  /* Inyectar keyframes una sola vez */
  useEffect(() => {
    const ID = 'pod-anim-styles';
    if (!document.getElementById(ID)) {
      const s = document.createElement('style');
      s.id = ID;
      s.textContent = CSS_ANIM;
      document.head.appendChild(s);
    }
  }, []);

  /* Animación de cabecera + tarjetas — IntersectionObserver (funciona en móvil y desktop) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let headerDone = false;
    let cardsDone  = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        /* ── Cabecera ── */
        if (!headerDone) {
          headerDone = true;
          const overline = section.querySelector<HTMLElement>('.pod3-overline');
          const inner    = section.querySelector<HTMLElement>('.pod3-title .reveal-inner');
          const tagline  = section.querySelector<HTMLElement>('.pod3-tagline');
          const sub      = section.querySelector<HTMLElement>('.pod3-sub');
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          if (overline) tl.fromTo(overline, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 });
          if (inner)    tl.fromTo(inner,    { y: '110%' },          { y: '0%',          duration: 0.9  }, '-=0.25');
          if (tagline)  tl.fromTo(tagline,  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5  }, '-=0.4');
          if (sub)      tl.fromTo(sub,      { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5  }, '-=0.45');
        }

        /* ── Tarjetas: stagger via CSS animation-delay ── */
        if (!cardsDone) {
          cardsDone = true;
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            card.style.animationDelay = `${i * 0.15}s`;
            card.classList.remove('pod-card-hidden');
            card.classList.add('pod-card-visible');
          });
          io.disconnect();
        }
      },
      { threshold: 0.1 }   // dispara al 10 % de visibilidad — funciona bien en móvil
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  /* ── JSX ────────────────────────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="podcasts"
      style={{
        position  : 'relative',
        overflow  : 'hidden',
        borderTop : '1px solid var(--border)',
        background: `
          radial-gradient(ellipse 70% 55% at  5%  10%, rgba(59,130,246,.07) 0%, transparent 65%),
          radial-gradient(ellipse 55% 45% at 95%  85%, rgba(37,99,235,.06) 0%, transparent 60%),
          radial-gradient(ellipse 45% 55% at 55% 100%, rgba(96,165,250,.04) 0%, transparent 55%),
          #050505
        `,
      }}
    >

      {/* ── Cabecera ─────────────────────────────────────────────────────── */}
      <div style={{
        padding       : 'clamp(4rem, 6vw, 6rem) calc(4vw + var(--nav-sw, 60px)) clamp(2.5rem,4vw,3.5rem)',
        borderBottom  : '1px solid rgba(255,255,255,0.07)',
        display       : 'flex',
        alignItems    : 'flex-end',
        justifyContent: 'space-between',
        gap           : '3rem',
        flexWrap      : 'wrap',
      }}>
        <div>
          <p className="pod3-overline" style={{
            fontSize     : '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color        : 'var(--muted)',
            marginBottom : '1.4rem',
          }}>
            06 — Podcasts
          </p>

          <h2 className="pod3-title" style={{
            fontFamily: 'var(--serif)',
            fontSize  : 'clamp(2.6rem, 5.5vw, 5rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            color     : 'var(--fg)',
            margin    : 0,
          }}>
            <span className="reveal-wrap">
              <span className="reveal-inner">
                Mi voz{' '}
                <em style={{ fontStyle:'italic', color:'var(--accent)' }}>digital</em>
              </span>
            </span>
          </h2>

          <p className="pod3-tagline" style={{
            fontFamily: 'var(--serif)',
            fontSize  : 'clamp(1.05rem, 2vw, 1.4rem)',
            fontWeight: 300,
            color     : 'rgba(255,255,255,.45)',
            marginTop : '0.6rem',
          }}>
            para docentes innovadores.
          </p>
        </div>

        <p className="pod3-sub" style={{
          fontSize  : '0.9rem',
          color     : 'var(--muted)',
          maxWidth  : '40ch',
          lineHeight: 1.8,
        }}>
          Seis proyectos de audio para aprender, reflexionar y crecer como docente.
          Escúchalos donde quieras, cuando quieras.
        </p>
      </div>

      {/* ── Grid de tarjetas ─────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{
          gap    : 'clamp(1.25rem, 2vw, 1.8rem)',
          padding: 'clamp(2.5rem, 4vw, 4rem) calc(4vw + var(--nav-sw, 60px)) clamp(4rem, 6vw, 7rem)',
        }}
      >
        {PODCASTS.map((pod, i) => (
          <a
            key={pod.id}
            ref={el => { cardRefs.current[i] = el; }}
            href={pod.href || undefined}
            target={pod.href ? '_blank' : undefined}
            rel={pod.href ? 'noopener noreferrer' : undefined}
            aria-label={pod.href ? `Escuchar ${pod.name}` : `${pod.name} — próximamente`}
            /* Clase inicial: oculta hasta que ScrollTrigger dispare */
            className="pod-card-hidden"
            style={{
              display             : 'flex',
              flexDirection       : 'column',
              padding             : 'clamp(1.6rem, 2.5vw, 2.2rem) clamp(1.6rem, 2.5vw, 2.4rem)',
              borderRadius        : '18px',
              background          : 'rgba(255,255,255,0.03)',
              backdropFilter      : 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              /* Borde completo sutil + borde superior de color */
              border              : `1px solid rgba(255,255,255,0.07)`,
              borderTop           : `2px solid ${pod.color}`,
              textDecoration      : 'none',
              color               : 'inherit',
              cursor              : pod.href ? 'pointer' : 'default',
              minHeight           : '270px',
              position            : 'relative',
              overflow            : 'hidden',
              /* Glow sutil del color de la tarjeta */
              boxShadow           : `0 4px 24px rgba(0,0,0,.45), 0 0 40px ${pod.color}0d`,
              transition          : 'transform .3s ease, box-shadow .3s ease, background .3s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.transform  = 'translateY(-7px) scale(1.015)';
              el.style.boxShadow  = `0 22px 55px rgba(0,0,0,.6), 0 0 60px ${pod.color}28`;
              el.style.background = 'rgba(255,255,255,.065)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.transform  = 'translateY(0) scale(1)';
              el.style.boxShadow  = `0 4px 24px rgba(0,0,0,.45), 0 0 40px ${pod.color}0d`;
              el.style.background = 'rgba(255,255,255,.03)';
            }}
          >
            {/* Glow de fondo del color en la esquina superior */}
            <div aria-hidden="true" style={{
              position  : 'absolute',
              top       : 0, left: 0,
              width     : '60%', height: '45%',
              background: `radial-gradient(ellipse at 30% 0%, ${pod.color}18 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* ── Cabecera de tarjeta: onda + núm + acción ── */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.8rem', position:'relative' }}>
              <WaveIcon color={pod.color} />

              <div style={{ display:'flex', alignItems:'center', gap:'0.7rem' }}>
                <span style={{
                  fontSize          : '.58rem',
                  letterSpacing     : '.18em',
                  color             : `${pod.color}55`,
                  fontVariantNumeric: 'tabular-nums',
                  fontFamily        : 'var(--sans)',
                }}>
                  {pod.num}
                </span>

                {pod.href ? (
                  <span style={{
                    width:'28px', height:'28px', borderRadius:'50%',
                    border:`1px solid ${pod.color}44`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:pod.color, fontSize:'.8rem', flexShrink:0,
                    transition:'background .2s ease, border-color .2s ease',
                  }} aria-hidden="true">↗</span>
                ) : (
                  <span style={{
                    fontSize:'.5rem', letterSpacing:'.15em', textTransform:'uppercase',
                    color:pod.color, border:`1px solid ${pod.color}66`, padding:'.22em .65em',
                    borderRadius:'4px', opacity:.55,
                  }}>Próximo</span>
                )}
              </div>
            </div>

            {/* ── Nombre ── */}
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize  : 'clamp(1.15rem, 2vw, 1.6rem)',
              fontWeight: 400,
              color     : '#fff',
              margin    : '0 0 .5rem',
              lineHeight: 1.2,
              position  : 'relative',
            }}>
              {pod.name}
            </h3>

            {/* ── Sector ── */}
            <p style={{
              fontSize     : '.6rem',
              letterSpacing: '.13em',
              textTransform: 'uppercase',
              color        : pod.color,
              margin       : '0 0 1.25rem',
              opacity      : .9,
              position     : 'relative',
            }}>
              {pod.sector}
            </p>

            {/* ── Resumen ── */}
            <p style={{
              fontSize  : '.83rem',
              color     : 'rgba(255,255,255,.45)',
              lineHeight: 1.8,
              margin    : 0,
              flexGrow  : 1,
              position  : 'relative',
            }}>
              {pod.summary}
            </p>

            {/* ── Línea inferior degradada ── */}
            <div style={{
              marginTop : '1.6rem',
              height    : '1px',
              background: `linear-gradient(90deg, ${pod.color}70 0%, ${pod.color}22 55%, transparent 100%)`,
              position  : 'relative',
            }} aria-hidden="true" />
          </a>
        ))}
      </div>

    </section>
  );
}
