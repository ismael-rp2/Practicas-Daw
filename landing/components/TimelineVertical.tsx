'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface TimelineStep {
  number: string;
  title : string;
  desc  : string;
}

// Geometría de la tarjeta (desktop)
const LINE_Y     = 72;
const NODE_D     = 50;
const PAD_TOP    = LINE_Y + NODE_D / 2 + 18;   // 109 px
const PAD_BOTTOM = 28;
const PAD_INLINE = 18;

export default function TimelineVertical({
  steps,
  label,
}: {
  steps : TimelineStep[];
  label?: string;
}) {
  const n            = steps.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Calcula índice activo desde la posición de scroll ──────────────────
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrollableH = el.offsetHeight - window.innerHeight;
      if (scrollableH <= 0) return;
      const scrolled  = -el.getBoundingClientRect().top;
      const progress  = Math.max(0, Math.min(1, scrolled / scrollableH));
      setActiveIndex(Math.round(progress * (n - 1)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [n]);

  // ── Clic en nodo → scroll suave al índice correspondiente ──────────────
  const scrollToIndex = useCallback((i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top       = window.scrollY + el.getBoundingClientRect().top;
    const scrollableH = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i / (n - 1)) * scrollableH, behavior: 'smooth' });
  }, [n]);

  // La línea avanza hasta el centro de la tarjeta activa
  const litPct = `${((activeIndex * 2 + 1) / (n * 2)) * 100}%`;

  return (
    <>
      <style>{`
        /* Mobile ≤ 768 px: tarjetas apiladas, nodo sale por arriba */
        @media (max-width: 768px) {
          .tvl-wrap { flex-direction: column !important; gap: 1rem !important; }
          .tvl-hline { display: none !important; }
          .tvl-card  { padding-top: 76px !important; }
          .tvl-node  {
            top: ${NODE_D / -2 + 8}px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>

      {/*
        Contenedor alto: n × 85 vh.
        El interior queda sticky → el índice activo avanza 1 a 1
        con ~85 vh de scroll (igual que la sección 04).
      */}
      <div
        ref={containerRef}
        style={{ position: 'relative', height: `${n * 85}vh`, marginTop: '1.25rem' }}
      >
        <div style={{
          position  : 'sticky',
          top       : '4.5rem',
          display   : 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: '1.25rem',
          paddingBottom: '1.5rem',
        }}>

          {/* ══ Fila de tarjetas ════════════════════════════════════ */}
          <div
            className="tvl-wrap"
            style={{ position: 'relative', display: 'flex', gap: 'clamp(0.6rem, 1.2vw, 1rem)' }}
          >

            {/* ── Línea de fondo ──────────────────────────────────── */}
            <div
              className="tvl-hline"
              style={{
                position    : 'absolute',
                top         : LINE_Y,
                left        : 0,
                right       : 0,
                height      : 2,
                background  : '#1a1726',
                borderRadius: 2,
                zIndex      : 0,
              }}
            >
              {/* Halo neón */}
              <div style={{
                position  : 'absolute',
                inset     : '-4px 0',
                width     : litPct,
                background: 'linear-gradient(to right, #7c3aed, #c084fc)',
                filter    : 'blur(6px)',
                opacity   : 0.5,
                transition: 'width 0.55s cubic-bezier(0.4,0,0.2,1)',
              }} />
              {/* Core */}
              <div style={{
                position    : 'absolute',
                top         : 0, left: 0, bottom: 0,
                width       : litPct,
                background  : 'linear-gradient(to right, #7c3aed, #c084fc)',
                borderRadius: 2,
                transition  : 'width 0.55s cubic-bezier(0.4,0,0.2,1)',
              }} />
            </div>

            {/* ── Tarjetas ────────────────────────────────────────── */}
            {steps.map((step, i) => {
              const lit = i <= activeIndex;

              return (
                <div
                  key={step.number}
                  className="tvl-card"
                  style={{
                    flex         : 1,
                    position     : 'relative',
                    background   : lit ? 'var(--bg-card)' : 'rgba(255,255,255,0.025)',
                    border       : `1px solid ${lit ? 'rgba(147,51,234,0.42)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius : '16px',
                    paddingTop   : PAD_TOP,
                    paddingBottom: PAD_BOTTOM,
                    paddingInline: PAD_INLINE,
                    boxShadow    : i === activeIndex ? '0 8px 32px rgba(147,51,234,0.25)' : 'none',
                    transition   : 'background .5s ease, border-color .5s ease, box-shadow .5s ease',
                    zIndex       : 1,
                    minWidth     : 0,
                  }}
                >
                  {/* Nodo — clicable */}
                  <div
                    className="tvl-node"
                    onClick={() => scrollToIndex(i)}
                    role="button"
                    aria-label={`Ir al paso ${step.number}`}
                    style={{
                      position      : 'absolute',
                      top           : LINE_Y - NODE_D / 2,
                      left          : '50%',
                      transform     : 'translateX(-50%)',
                      width         : NODE_D,
                      height        : NODE_D,
                      borderRadius  : '50%',
                      background    : lit
                        ? 'linear-gradient(135deg,#7c3aed,#9333ea)'
                        : '#11101c',
                      border        : `2px solid ${lit ? '#d8b4fe' : '#2e2c42'}`,
                      display       : 'flex',
                      alignItems    : 'center',
                      justifyContent: 'center',
                      cursor        : 'pointer',
                      boxShadow     : i === activeIndex
                        ? '0 0 0 6px rgba(147,51,234,0.2), 0 0 30px rgba(147,51,234,0.65)'
                        : lit
                          ? '0 0 12px rgba(147,51,234,0.35)'
                          : 'none',
                      transition    : 'all .5s ease',
                      zIndex        : 2,
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

                  {/* Contenido */}
                  <p style={{
                    fontFamily  : 'var(--sans)',
                    fontSize    : 'clamp(0.88rem, 1.5vw, 1rem)',
                    fontWeight  : 700,
                    color       : i === activeIndex ? '#fff' : lit ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.38)',
                    marginBottom: '0.45rem',
                    transition  : 'color .5s ease',
                  }}>
                    {step.title}
                  </p>
                  <p style={{
                    fontSize  : 'clamp(0.78rem, 1.2vw, 0.87rem)',
                    lineHeight: 1.65,
                    color     : lit ? 'var(--text-secondary)' : 'rgba(255,255,255,0.18)',
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
              marginTop    : '1.5rem',
            }}>
              {label}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
