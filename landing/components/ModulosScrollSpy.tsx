'use client';

import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react';

export interface ModuloItem {
  icon: ReactNode;
  title: string;
  body: string;
}

export default function ModulosScrollSpy({ modulos }: { modulos: ModuloItem[] }) {
  const n            = modulos.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Calcula el índice a partir del progreso de scroll en el contenedor ──
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect            = el.getBoundingClientRect();
      const scrollableH     = el.offsetHeight - window.innerHeight;
      if (scrollableH <= 0) return;
      const scrolled        = -rect.top;
      const progress        = Math.max(0, Math.min(1, scrolled / scrollableH));
      const idx             = Math.min(n - 1, Math.round(progress * (n - 1)));
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [n]);

  // ── Hacer scroll hasta el índice concreto (al pulsar un número) ─────────
  const scrollToIndex = useCallback((i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const containerTop  = window.scrollY + el.getBoundingClientRect().top;
    const scrollableH   = el.offsetHeight - window.innerHeight;
    const target        = containerTop + (i / (n - 1)) * scrollableH;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, [n]);

  // ── SVG ────────────────────────────────────────────────────────────────
  const SVG_H = 580;
  const PAD   = 18;
  const CX    = 20;
  const nodeY = (i: number) => PAD + (i / (n - 1)) * (SVG_H - PAD * 2);

  const litFrac    = activeIndex / (n - 1);
  const trackLen   = nodeY(n - 1) - nodeY(0);

  return (
    <>
      <style>{`
        @media (max-width: 640px) { .mss-left { display: none !important; } }

        .mss-lit {
          stroke-dasharray: ${trackLen};
          stroke-dashoffset: ${trackLen * (1 - litFrac)};
          transition: stroke-dashoffset 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mss-node {
          transition: r 0.5s cubic-bezier(0.4,0,0.2,1),
                      fill 0.5s ease,
                      stroke 0.5s ease;
        }
        .mss-label {
          transition: fill 0.5s ease, font-weight 0.5s ease;
        }
        .mss-node-btn {
          cursor: pointer;
        }
        .mss-node-btn:hover circle {
          stroke: #e9d5ff !important;
        }
        .mss-card {
          transition: background 0.5s ease,
                      border-color 0.5s ease,
                      box-shadow 0.5s ease;
        }
        .mss-card-title { transition: color 0.5s ease; }
        .mss-card-body  { transition: color 0.5s ease; }
      `}</style>

      {/*
        Contenedor alto: n * 85 vh de alto.
        El interior queda sticky → el índice activo avanza 1 a 1
        con cada ~85 vh de scroll = movimiento lento y preciso.
      */}
      <div
        ref={containerRef}
        style={{ position: 'relative', height: `${n * 85}vh`, marginTop: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        <div style={{
          position: 'sticky',
          top     : '4.5rem',
          height  : 'calc(100vh - 4.5rem)',
          overflow: 'hidden',
          display : 'flex',
          gap     : 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'flex-start',
          paddingBlock: '2rem',
        }}>

          {/* ── IZQUIERDA — ruta de neón ──────────────────────────── */}
          <div
            className="mss-left"
            style={{
              flexShrink: 0,
              width     : 'clamp(90px, 11vw, 150px)',
              height    : '100%',
              display   : 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              viewBox={`0 0 110 ${SVG_H}`}
              style={{ width: '100%', overflow: 'visible' }}
              aria-hidden={false}
            >
              <defs>
                <filter id="glow-node" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" /><feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-line" x="-100%" y="-10%" width="300%" height="120%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" /><feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Track apagado */}
              <line x1={CX} y1={nodeY(0)} x2={CX} y2={nodeY(n - 1)}
                stroke="#1e1b2e" strokeWidth="3" strokeLinecap="round" />

              {/* Halo iluminado */}
              <line x1={CX} y1={nodeY(0)} x2={CX} y2={nodeY(n - 1)}
                stroke="#9333ea" strokeWidth="7" strokeLinecap="round"
                opacity="0.3" filter="url(#glow-line)"
                className="mss-lit" />

              {/* Core iluminado */}
              <line x1={CX} y1={nodeY(0)} x2={CX} y2={nodeY(n - 1)}
                stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round"
                className="mss-lit" />

              {modulos.map((_, i) => {
                const y        = nodeY(i);
                const isActive = i === activeIndex;
                const isPast   = i < activeIndex;
                const isBonus  = i === n - 1;

                return (
                  <g
                    key={i}
                    className="mss-node-btn"
                    onClick={() => scrollToIndex(i)}
                    role="button"
                    aria-label={`Ir al módulo ${i + 1}`}
                  >
                    {/* Halo activo */}
                    {isActive && (
                      <circle cx={CX} cy={y} r={18}
                        fill="#9333ea" opacity="0.18"
                        filter="url(#glow-node)" />
                    )}
                    {/* Nodo */}
                    <circle
                      className="mss-node"
                      cx={CX} cy={y}
                      r={isActive ? 9 : 5}
                      fill={isActive ? '#9333ea' : isPast ? '#5b21b6' : '#1e1b2e'}
                      stroke={isActive ? '#e9d5ff' : isPast ? '#7c3aed' : '#3b3b52'}
                      strokeWidth={isActive ? 2 : 1}
                    />
                    {/* Número */}
                    <text
                      className="mss-label"
                      x={CX + 17} y={y + 5}
                      fontSize={isActive ? '15' : '13'}
                      fontWeight={isActive ? '700' : '400'}
                      fontFamily="monospace"
                      fill={isActive ? '#e9d5ff' : isPast ? '#7c3aed' : '#3b3b52'}
                      letterSpacing="0.06em"
                    >
                      {isBonus ? 'B+' : String(i + 1).padStart(2, '0')}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── DERECHA — tarjetas apiladas ───────────────────────── */}
          <div style={{
            flex         : 1,
            display      : 'flex',
            flexDirection: 'column',
            gap          : 'clamp(0.65rem, 1.2vw, 0.9rem)',
            minWidth     : 0,
            overflowY    : 'auto',
            height       : '100%',
            scrollbarWidth: 'none',
          }}>
            {modulos.map((m, i) => {
              const isActive = i === activeIndex;
              const isBonus  = i === n - 1;

              return (
                <div
                  key={i}
                  className="mss-card"
                  style={{
                    background  : isBonus
                      ? 'linear-gradient(135deg, rgba(147,51,234,0.14) 0%, rgba(79,70,229,0.08) 100%)'
                      : isActive
                        ? 'var(--bg-card)'
                        : 'rgba(255,255,255,0.025)',
                    border      : `1px solid ${
                      isBonus     ? 'rgba(147,51,234,0.45)' :
                      isActive    ? 'rgba(147,51,234,0.38)' :
                                    'rgba(255,255,255,0.06)'
                    }`,
                    borderRadius: '14px',
                    padding     : 'clamp(1rem, 2.2vw, 1.4rem)',
                    boxShadow   : isActive
                      ? '0 6px 30px rgba(147,51,234,0.18)'
                      : 'none',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0, marginTop: '0.1em' }}>
                      {m.icon}
                    </span>
                    <div>
                      <p className="mss-card-title" style={{
                        fontFamily  : 'var(--sans)',
                        fontSize    : 'clamp(0.9rem, 1.7vw, 1rem)',
                        fontWeight  : 700,
                        color       : isBonus ? '#c084fc' : isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                        marginBottom: '0.3rem',
                      }}>
                        {m.title}
                      </p>
                      <p className="mss-card-body" style={{
                        fontSize  : 'clamp(0.82rem, 1.4vw, 0.9rem)',
                        lineHeight: 1.65,
                        color     : isActive || isBonus ? 'var(--text-secondary)' : 'rgba(255,255,255,0.28)',
                      }}>
                        {m.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
