'use client';

import { useEffect, useRef, useState } from 'react';

export interface TimelineStep {
  number: string;
  title : string;
  desc  : string;
}

// Geometría de la tarjeta
const LINE_Y      = 72;   // px desde el top de cada tarjeta hasta el centro de la línea
const NODE_D      = 50;   // diámetro del nodo
const PAD_TOP     = LINE_Y + NODE_D / 2 + 18;  // espacio sobre el contenido (= 109 px)
const PAD_BOTTOM  = 28;
const PAD_INLINE  = 18;

export default function TimelineVertical({
  steps,
  label,
}: {
  steps : TimelineStep[];
  label?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect    = el.getBoundingClientRect();
      const entered = window.innerHeight - rect.top;
      const total   = el.offsetHeight + window.innerHeight * 0.5;
      setProgress(Math.max(0, Math.min(1, entered / total)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const n      = steps.length;
  const isLit  = (i: number) => progress >= (i + 0.7) / n;

  return (
    <>
      <style>{`
        /* ── Mobile ≤ 768 px: tarjetas apiladas ── */
        @media (max-width: 768px) {
          .tvl-wrap   { flex-direction: column !important; gap: 0.9rem !important; }
          .tvl-hline  { display: none !important; }
          .tvl-card   { padding-top: 76px !important; }
          .tvl-node   {
            top: ${NODE_D / -2 + 8}px !important;  /* sobresale arriba */
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>

      <div ref={sectionRef} style={{ marginTop: 'clamp(2rem, 5vw, 3.5rem)' }}>

        {/* ══ Fila de tarjetas ══════════════════════════════════════════ */}
        <div
          className="tvl-wrap"
          style={{
            position: 'relative',
            display : 'flex',
            gap     : 'clamp(0.6rem, 1.2vw, 1rem)',
          }}
        >

          {/* ── Línea horizontal de fondo (desktop) ───────────────────── */}
          <div
            className="tvl-hline"
            style={{
              position: 'absolute',
              top     : LINE_Y,
              left    : 0,
              right   : 0,
              height  : 2,
              background: '#1a1726',
              zIndex  : 0,
              borderRadius: 2,
            }}
          >
            {/* Halo de neón */}
            <div style={{
              position : 'absolute',
              inset    : '-3px 0',
              width    : `${progress * 100}%`,
              background: 'linear-gradient(to right, #7c3aed, #c084fc)',
              filter   : 'blur(5px)',
              opacity  : 0.55,
              transition: 'width 0.3s ease',
            }} />
            {/* Core iluminado */}
            <div style={{
              position  : 'absolute',
              top       : 0,
              left      : 0,
              bottom    : 0,
              width     : `${progress * 100}%`,
              background: 'linear-gradient(to right, #7c3aed, #c084fc)',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }} />
          </div>

          {/* ── Tarjetas ──────────────────────────────────────────────── */}
          {steps.map((step, i) => {
            const lit = isLit(i);

            return (
              <div
                key={step.number}
                className="tvl-card"
                style={{
                  flex          : 1,
                  position      : 'relative',
                  background    : lit ? 'var(--bg-card)' : 'rgba(255,255,255,0.025)',
                  border        : `1px solid ${lit ? 'rgba(147,51,234,0.42)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius  : '16px',
                  paddingTop    : PAD_TOP,
                  paddingBottom : PAD_BOTTOM,
                  paddingInline : PAD_INLINE,
                  boxShadow     : lit ? '0 8px 32px rgba(147,51,234,0.22)' : 'none',
                  transition    : 'background .5s ease, border-color .5s ease, box-shadow .5s ease',
                  zIndex        : 1,
                  minWidth      : 0,
                }}
              >
                {/* ── Nodo / número ──────────────────────────────────── */}
                <div
                  className="tvl-node"
                  style={{
                    position     : 'absolute',
                    top          : LINE_Y - NODE_D / 2,
                    left         : '50%',
                    transform    : 'translateX(-50%)',
                    width        : NODE_D,
                    height       : NODE_D,
                    borderRadius : '50%',
                    background   : lit ? 'linear-gradient(135deg,#7c3aed,#9333ea)' : '#11101c',
                    border       : `2px solid ${lit ? '#d8b4fe' : '#2e2c42'}`,
                    display      : 'flex',
                    alignItems   : 'center',
                    justifyContent: 'center',
                    boxShadow    : lit
                      ? '0 0 0 6px rgba(147,51,234,0.18), 0 0 28px rgba(147,51,234,0.6)'
                      : 'none',
                    transition   : 'all .5s ease',
                    zIndex       : 2,
                  }}
                >
                  <span style={{
                    fontFamily   : 'var(--mono)',
                    fontSize     : '0.82rem',
                    fontWeight   : 700,
                    color        : lit ? '#fff' : '#3b3b55',
                    letterSpacing: '0.04em',
                    transition   : 'color .5s ease',
                  }}>
                    {step.number}
                  </span>
                </div>

                {/* ── Contenido ──────────────────────────────────────── */}
                <p style={{
                  fontFamily  : 'var(--sans)',
                  fontSize    : 'clamp(0.88rem, 1.5vw, 1rem)',
                  fontWeight  : 700,
                  color       : lit ? '#fff' : 'rgba(255,255,255,0.42)',
                  marginBottom: '0.45rem',
                  transition  : 'color .5s ease',
                }}>
                  {step.title}
                </p>
                <p style={{
                  fontSize  : 'clamp(0.78rem, 1.2vw, 0.87rem)',
                  lineHeight: 1.65,
                  color     : lit ? 'var(--text-secondary)' : 'rgba(255,255,255,0.2)',
                  transition: 'color .5s ease',
                }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Etiqueta inferior */}
        {label && (
          <p style={{
            textAlign    : 'center',
            fontFamily   : 'var(--mono)',
            fontSize     : '0.68rem',
            letterSpacing: '0.1em',
            color        : 'rgba(255,255,255,0.28)',
            textTransform: 'uppercase',
            marginTop    : 'clamp(1.5rem, 3vw, 2rem)',
          }}>
            {label}
          </p>
        )}
      </div>
    </>
  );
}
