'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface ModuloItem {
  icon: ReactNode;
  title: string;
  body: string;
}

export default function ModulosScrollSpy({ modulos }: { modulos: ModuloItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveIndex(i);
          });
        },
        { threshold: 0.5 }
      );
      obs.observe(ref);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const n     = modulos.length;
  const SVG_H = 580;
  const PAD   = 14;
  const CX    = 28;
  const nodeY = (i: number) => PAD + (i / (n - 1)) * (SVG_H - PAD * 2);

  return (
    <>
      <style>{`
        @media (max-width: 640px) { .mss-left { display: none !important; } }
      `}</style>

      <div style={{
        display   : 'flex',
        gap       : 'clamp(2rem, 4vw, 4rem)',
        alignItems: 'flex-start',
        marginTop : 'clamp(2rem, 5vw, 3.5rem)',
      }}>

        {/* ── IZQUIERDA — ruta de neón sticky ──────────────────────── */}
        <div
          className="mss-left"
          style={{
            flexShrink: 0,
            width     : 'clamp(70px, 9vw, 120px)',
            position  : 'sticky',
            top       : '5.5rem',
            alignSelf : 'flex-start',
          }}
        >
          <svg
            viewBox={`0 0 90 ${SVG_H}`}
            style={{ width: '100%', overflow: 'visible' }}
            aria-hidden
          >
            <defs>
              <filter id="glow-node" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-line" x="-100%" y="-50%" width="300%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Track apagado (fondo) */}
            <line
              x1={CX} y1={nodeY(0)}
              x2={CX} y2={nodeY(n - 1)}
              stroke="#1e1b2e"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Track iluminado hasta el nodo activo */}
            {activeIndex > 0 && (
              <>
                <line
                  x1={CX} y1={nodeY(0)}
                  x2={CX} y2={nodeY(activeIndex)}
                  stroke="#9333ea"
                  strokeWidth="7"
                  strokeLinecap="round"
                  opacity="0.35"
                  filter="url(#glow-line)"
                />
                <line
                  x1={CX} y1={nodeY(0)}
                  x2={CX} y2={nodeY(activeIndex)}
                  stroke="#c084fc"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </>
            )}

            {modulos.map((_, i) => {
              const y        = nodeY(i);
              const isActive = i === activeIndex;
              const isPast   = i < activeIndex;
              const isBonus  = i === n - 1;

              return (
                <g key={i}>
                  {isActive && (
                    <circle
                      cx={CX} cy={y} r={16}
                      fill="#9333ea"
                      opacity="0.18"
                      filter="url(#glow-node)"
                    />
                  )}
                  <circle
                    cx={CX} cy={y}
                    r={isActive ? 9 : 5}
                    fill={isActive ? '#9333ea' : isPast ? '#5b21b6' : '#1e1b2e'}
                    stroke={isActive ? '#e9d5ff' : isPast ? '#7c3aed' : '#3b3b52'}
                    strokeWidth={isActive ? 2 : 1}
                    style={{ transition: 'r 0.4s ease, fill 0.4s ease' }}
                  />
                  <text
                    x={CX + 15}
                    y={y + 4}
                    fontSize="9"
                    fontFamily="monospace"
                    fill={isActive ? '#e9d5ff' : isPast ? '#7c3aed' : '#3b3b52'}
                    letterSpacing="0.08em"
                  >
                    {isBonus ? 'B+' : String(i + 1).padStart(2, '0')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── DERECHA — tarjetas apiladas ───────────────────────────── */}
        <div style={{
          flex         : 1,
          display      : 'flex',
          flexDirection: 'column',
          gap          : 'clamp(0.65rem, 1.2vw, 0.9rem)',
          minWidth     : 0,
        }}>
          {modulos.map((m, i) => {
            const isActive = i === activeIndex;
            const isBonus  = i === modulos.length - 1;

            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  background  : isBonus
                    ? 'linear-gradient(135deg, rgba(147,51,234,0.14) 0%, rgba(79,70,229,0.08) 100%)'
                    : isActive
                      ? 'var(--bg-card)'
                      : 'rgba(255,255,255,0.025)',
                  border      : `1px solid ${
                    isBonus
                      ? 'rgba(147,51,234,0.45)'
                      : isActive
                        ? 'rgba(147,51,234,0.38)'
                        : 'rgba(255,255,255,0.06)'
                  }`,
                  borderRadius: '14px',
                  padding     : 'clamp(1rem, 2.2vw, 1.4rem)',
                  transition  : 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
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
                    <p style={{
                      fontFamily  : 'var(--sans)',
                      fontSize    : 'clamp(0.9rem, 1.7vw, 1rem)',
                      fontWeight  : 700,
                      color       : isBonus
                        ? '#c084fc'
                        : isActive
                          ? '#fff'
                          : 'rgba(255,255,255,0.55)',
                      marginBottom: '0.3rem',
                      transition  : 'color 0.35s ease',
                    }}>
                      {m.title}
                    </p>
                    <p style={{
                      fontSize  : 'clamp(0.82rem, 1.4vw, 0.9rem)',
                      lineHeight: 1.65,
                      color     : isActive || isBonus
                        ? 'var(--text-secondary)'
                        : 'rgba(255,255,255,0.28)',
                      transition: 'color 0.35s ease',
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
    </>
  );
}
