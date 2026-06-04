'use client';

import { useEffect, useRef, useState } from 'react';

export interface TimelineStep {
  number: string;
  title : string;
  desc  : string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tarjeta de cada paso
// ─────────────────────────────────────────────────────────────────────────────
function StepCard({
  step, lit, align,
}: {
  step : TimelineStep;
  lit  : boolean;
  align: 'left' | 'right';
}) {
  return (
    <div style={{
      background   : lit ? 'var(--bg-card)' : 'rgba(255,255,255,0.025)',
      border       : `1px solid ${lit ? 'rgba(147,51,234,0.38)' : 'rgba(255,255,255,0.06)'}`,
      borderRadius : '14px',
      padding      : 'clamp(1.1rem, 2.2vw, 1.5rem)',
      textAlign    : align,
      boxShadow    : lit ? '0 4px 28px rgba(147,51,234,0.18)' : 'none',
      transition   : 'background .5s ease, border-color .5s ease, box-shadow .5s ease',
    }}>
      <p style={{
        fontFamily  : 'var(--sans)',
        fontSize    : 'clamp(0.95rem, 1.8vw, 1.1rem)',
        fontWeight  : 700,
        color       : lit ? '#fff' : 'rgba(255,255,255,0.45)',
        marginBottom: '0.4rem',
        transition  : 'color .5s ease',
      }}>
        {step.title}
      </p>
      <p style={{
        fontSize  : 'clamp(0.83rem, 1.4vw, 0.92rem)',
        lineHeight: 1.65,
        color     : lit ? 'var(--text-secondary)' : 'rgba(255,255,255,0.22)',
        transition: 'color .5s ease',
      }}>
        {step.desc}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────────────────────
export default function TimelineVertical({
  steps,
  label,
}: {
  steps : TimelineStep[];
  label?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress,   setProgress]   = useState(0);

  // Calcula qué fracción de la línea está iluminada en función del scroll
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const entered  = window.innerHeight - rect.top;          // px que han entrado
      const total    = el.offsetHeight + window.innerHeight * 0.5; // recorrido completo
      setProgress(Math.max(0, Math.min(1, entered / total)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const n      = steps.length;
  const isLit  = (i: number) => progress >= (i + 0.6) / n;   // umbral por paso
  const litPct = `${progress * 100}%`;

  return (
    <>
      <style>{`
        /* Mobile: línea a la izquierda, todo el texto a la derecha */
        @media (max-width: 680px) {
          .tvl-row     { flex-direction: row !important; }
          .tvl-left    { display: none !important; }
          .tvl-center  { flex-shrink: 0; }
          .tvl-right   { flex: 1 !important; opacity: 1 !important;
                         padding-left: clamp(1rem, 4vw, 1.5rem) !important;
                         pointer-events: auto !important; }
          .tvl-right-hidden { display: block !important; opacity: 1 !important;
                              pointer-events: auto !important; }
          .tvl-line    { left: 1.75rem !important; transform: none !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ position: 'relative', paddingBlock: 'clamp(1rem, 2vw, 1.5rem)' }}
      >
        {/* ── Línea central ── */}
        <div
          className="tvl-line"
          style={{
            position : 'absolute',
            left     : '50%',
            top      : 0,
            bottom   : 0,
            width    : 2,
            transform: 'translateX(-50%)',
            background: '#1e1b2e',
            zIndex   : 0,
          }}
        >
          {/* Porción iluminada */}
          <div style={{
            position  : 'absolute',
            top       : 0,
            left      : 0,
            right     : 0,
            height    : litPct,
            background: 'linear-gradient(to bottom, #7c3aed, #c084fc)',
            boxShadow : '0 0 10px rgba(147,51,234,0.55)',
            transition: 'height .25s ease',
          }} />
        </div>

        {/* ── Pasos ── */}
        <div style={{
          display      : 'flex',
          flexDirection: 'column',
          gap          : 'clamp(2.5rem, 5vw, 4rem)',
        }}>
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;   // 01, 03, 05… → izquierda
            const lit    = isLit(i);

            return (
              <div
                key={step.number}
                className="tvl-row"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {/* ── Lado izquierdo ── */}
                <div
                  className="tvl-left"
                  style={{
                    flex        : 1,
                    paddingRight: isLeft ? 'clamp(1.25rem, 3vw, 2.5rem)' : 0,
                    opacity     : isLeft ? 1 : 0,
                    pointerEvents: isLeft ? 'auto' : 'none',
                  }}
                >
                  {isLeft && <StepCard step={step} lit={lit} align="right" />}
                </div>

                {/* ── Nodo central ── */}
                <div
                  className="tvl-center"
                  style={{
                    flexShrink: 0,
                    width     : 'clamp(3rem, 5vw, 4rem)',
                    display   : 'flex',
                    justifyContent: 'center',
                    position  : 'relative',
                    zIndex    : 1,
                  }}
                >
                  <div style={{
                    width       : lit ? 46 : 38,
                    height      : lit ? 46 : 38,
                    borderRadius: '50%',
                    background  : lit ? '#9333ea' : '#1e1b2e',
                    border      : `2px solid ${lit ? '#e9d5ff' : '#3b3b52'}`,
                    display     : 'flex',
                    alignItems  : 'center',
                    justifyContent: 'center',
                    boxShadow   : lit ? '0 0 22px rgba(147,51,234,0.55)' : 'none',
                    transition  : 'all .5s ease',
                  }}>
                    <span style={{
                      fontFamily  : 'var(--mono)',
                      fontSize    : '0.78rem',
                      fontWeight  : 700,
                      color       : lit ? '#fff' : '#3b3b52',
                      letterSpacing: '0.04em',
                      transition  : 'color .5s ease',
                    }}>
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* ── Lado derecho ── */}
                <div
                  className={`tvl-right${isLeft ? ' tvl-right-hidden' : ''}`}
                  style={{
                    flex        : 1,
                    paddingLeft : !isLeft ? 'clamp(1.25rem, 3vw, 2.5rem)' : 0,
                    opacity     : !isLeft ? 1 : 0,
                    pointerEvents: !isLeft ? 'auto' : 'none',
                    // En mobile se sobreescribe vía CSS para los isLeft ocultos
                    display     : isLeft ? 'none' : 'block',
                  }}
                >
                  {!isLeft && <StepCard step={step} lit={lit} align="left" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Etiqueta final ── */}
        {label && (
          <p style={{
            textAlign   : 'center',
            fontFamily  : 'var(--mono)',
            fontSize    : '0.7rem',
            letterSpacing: '0.1em',
            color       : 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            marginTop   : 'clamp(2rem, 4vw, 3rem)',
          }}>
            {label}
          </p>
        )}
      </div>
    </>
  );
}
