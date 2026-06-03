'use client';

import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// ModulosSendero
//
// Secuencia al entrar en viewport (solo una vez, al hacer scroll):
//   1. sectionVisible  → el SVG existe con dashOffset=PATH_LEN (sin transición aún)
//   2. Doble rAF       → pathDrawing=true: dashOffset→0  (el hilo se dibuja)
//   3. DRAW_DUR+0.3s   → cometsLive=true: los cometas animados se activan
//
// Al mismo tiempo que el hilo avanza, cada tarjeta aparece con un
// delay calculado para coincidir con la llegada del hilo a su nodo.
// ─────────────────────────────────────────────────────────────────────────────

export type Modulo = { icon: ReactNode; title: string; body: string };

const PLACEMENTS: [col: number, row: number][] = [
  [1, 1], [2, 1], [3, 1],
  [3, 2], [2, 2], [1, 2],
  [1, 3], [2, 3], [3, 3],
];

const PATH = [
  'M 192,39  L 600,39  L 1008,39',
  'C 1155,39  1155,169 1008,169',
  'L 600,169  L 192,169',
  'C 45,169   45,299   192,299',
  'L 600,299  L 1008,299',
].join(' ');

const PATH_LEN  = 2904;          // longitud total del path (viewBox units)
const DRAW_DUR  = 2.6;           // segundos para dibujar el hilo completo

// Fracción del camino [0–1] cuando el hilo llega a cada nodo
const NODE_FRACTIONS = [0, 0.140, 0.281, 0.359, 0.500, 0.641, 0.719, 0.860, 1.000];
const CARD_DELAYS    = NODE_FRACTIONS.map(f => +(f * DRAW_DUR).toFixed(2));

const DOTS: [number, number][] = [
  [192, 39], [600, 39], [1008, 39],
  [1008, 169], [600, 169], [192, 169],
  [192, 299], [600, 299], [1008, 299],
];

// ─────────────────────────────────────────────────────────────────────────────
export default function ModulosSendero({ modulos }: { modulos: Modulo[] }) {
  const [open,           setOpen]           = useState<number | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);  // IO dispara
  const [pathDrawing,    setPathDrawing]    = useState(false);  // dashOffset → 0
  const [cometsLive,     setCometsLive]     = useState(false);  // cometas activos

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── IntersectionObserver: solo activa cuando el usuario llega a la sección
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.10, rootMargin: '0px 0px -6% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Doble rAF: garantiza que el navegador ha pintado el estado inicial
  //    (dashOffset = PATH_LEN) antes de mover el valor a 0
  useEffect(() => {
    if (!sectionVisible) return;

    let raf1: number, raf2: number;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setPathDrawing(true);
        timerRef.current = setTimeout(
          () => setCometsLive(true),
          (DRAW_DUR + 0.35) * 1000,
        );
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sectionVisible]);

  const toggle = (i: number) => setOpen(p => (p === i ? null : i));

  // dashOffset: PATH_LEN hasta que pathDrawing=true → 0 (el navegador anima)
  const dashOffset = pathDrawing ? 0 : PATH_LEN;

  // La transición se activa en cuanto sectionVisible=true (un render antes de
  // que dashOffset cambie a 0), para que el browser tenga el valor de inicio
  const drawTrans = sectionVisible
    ? `stroke-dashoffset ${DRAW_DUR}s cubic-bezier(0.4,0,0.25,1)`
    : 'none';

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', marginTop: 'clamp(2rem, 5vw, 3.5rem)', overflow: 'visible' }}
    >

      {/* ── SVG hilo ─────────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 1200 338"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position     : 'absolute',
          inset        : 0,
          width        : '100%',
          height       : '100%',
          display      : 'block',
          background   : 'transparent',
          pointerEvents: 'none',
          zIndex       : 0,
          overflow     : 'visible',
        }}
      >
        <defs>
          {/* Gradiente con color-cycling SMIL */}
          <linearGradient id="sg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%">
              <animate attributeName="stop-color"
                values="#5E2DD6;#D63595;#E85A2C;#5E2DD6" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%">
              <animate attributeName="stop-color"
                values="#D63595;#E85A2C;#5E2DD6;#D63595" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%">
              <animate attributeName="stop-color"
                values="#E85A2C;#5E2DD6;#D63595;#E85A2C" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          <filter id="sg-aura" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="sg-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="sg-dot" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <style>{`
            @keyframes sg-flow { to { stroke-dashoffset: -${PATH_LEN}; } }
            .sg-c1 { animation: sg-flow 3.5s linear infinite; }
            .sg-c2 { animation: sg-flow 3.5s linear infinite; animation-delay: -1.75s; }
          `}</style>
        </defs>

        {/* Todas las capas comparten el mismo dashOffset/transition → dibujan juntas */}

        <path d={PATH} fill="none" stroke="url(#sg-grad)"
          strokeWidth="36" strokeOpacity="0.12" strokeLinecap="round"
          strokeDasharray={PATH_LEN} strokeDashoffset={dashOffset}
          filter="url(#sg-aura)"
          style={{ transition: drawTrans }} />

        <path d={PATH} fill="none" stroke="url(#sg-grad)"
          strokeWidth="20" strokeOpacity="0.22" strokeLinecap="round"
          strokeDasharray={PATH_LEN} strokeDashoffset={dashOffset}
          filter="url(#sg-glow)"
          style={{ transition: drawTrans }} />

        <path d={PATH} fill="none" stroke="url(#sg-grad)"
          strokeWidth="14" strokeLinecap="round" strokeOpacity="0.90"
          strokeDasharray={PATH_LEN} strokeDashoffset={dashOffset}
          style={{ transition: drawTrans }} />

        <path d={PATH} fill="none" stroke="rgba(255,255,255,0.22)"
          strokeWidth="4" strokeLinecap="round"
          strokeDasharray={PATH_LEN} strokeDashoffset={dashOffset}
          style={{ transition: drawTrans }} />

        {/* Cometas: solo cuando el hilo ya está dibujado */}
        {cometsLive && (
          <>
            <path d={PATH} fill="none" stroke="rgba(255,255,255,0.90)"
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`80 ${PATH_LEN - 80}`} className="sg-c1"
              filter="url(#sg-glow)" />
            <path d={PATH} fill="none" stroke="url(#sg-grad)"
              strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`110 ${PATH_LEN - 110}`} className="sg-c2"
              filter="url(#sg-glow)" />
          </>
        )}

        {/* Nodos: aparecen cuando el hilo llega a ellos */}
        {DOTS.map(([cx, cy], i) => (
          <g
            key={i}
            filter="url(#sg-dot)"
            style={{
              opacity   : pathDrawing ? 1 : 0,
              transition: sectionVisible
                ? `opacity 0.45s ease ${CARD_DELAYS[i] + 0.1}s`
                : 'none',
            }}
          >
            <circle cx={cx} cy={cy} r="10" fill="url(#sg-grad)" opacity="0.55" />
            <circle cx={cx} cy={cy} r="4"  fill="#ffffff"        opacity="0.95" />
          </g>
        ))}
      </svg>

      {/* ── Grid de tarjetas ─────────────────────────────────────────────── */}
      <div
        style={{
          position           : 'relative',
          zIndex             : 1,
          display            : 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap                : '52px 24px',
          alignItems         : 'start',
        }}
      >
        {modulos.map((mod, i) => {
          const [col, row] = PLACEMENTS[i];
          const isOpen  = open === i;
          const isBonus = i === 8;
          const delay   = CARD_DELAYS[i];

          return (
            <div
              key={String(mod.title)}
              style={{
                gridColumn : col,
                gridRow    : row,
                willChange : 'opacity, transform',
                // Entrada sincronizada con el hilo
                opacity    : pathDrawing ? 1 : 0,
                transform  : pathDrawing ? 'none' : 'scale(0.87) translateY(12px)',
                transition : sectionVisible
                  ? `opacity 0.6s ease ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`
                  : 'none',
              }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                style={{
                  display     : 'block',
                  width       : '100%',
                  boxSizing   : 'border-box',
                  textAlign   : 'left',
                  cursor      : 'pointer',
                  minHeight   : '76px',
                  padding     : '1.1rem 1.35rem',
                  borderRadius: '14px',
                  // Semi-transparente en reposo · oscuro al abrir
                  background  : isOpen ? 'rgba(8,2,22,0.97)' : 'rgba(20,20,20,0.62)',
                  border: `1px solid ${
                    isOpen  ? 'rgba(214,53,149,0.65)' :
                    isBonus ? 'rgba(94,45,214,0.45)'  :
                    'rgba(255,255,255,0.10)'
                  }`,
                  boxShadow: isOpen
                    ? 'inset 0 3px 18px rgba(0,0,0,0.80), 0 0 0 1px rgba(214,53,149,0.18), 0 8px 28px rgba(94,45,214,0.20)'
                    : '0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
                  transform  : isOpen ? 'translateY(1px) scale(0.995)' : 'none',
                  transition : 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                  outline    : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0, flex: 1 }}>
                    <span style={{ fontSize: '1.35rem', lineHeight: 1, flexShrink: 0 }}>{mod.icon}</span>
                    <span style={{
                      fontFamily: 'var(--sans)',
                      fontSize  : 'clamp(0.74rem, 1.15vw, 0.87rem)',
                      fontWeight: isBonus ? 800 : 700,
                      lineHeight: 1.3,
                      color     : isBonus ? 'var(--brand-magenta-soft)' : '#fff',
                    }}>
                      {mod.title}
                    </span>
                  </div>
                  <span aria-hidden="true" style={{
                    color     : 'var(--eyebrow-color)',
                    fontSize  : '0.72rem',
                    flexShrink: 0,
                    transform : isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                  }}>▾</span>
                </div>

                <div style={{
                  overflow  : 'hidden',
                  maxHeight : isOpen ? '160px' : '0',
                  opacity   : isOpen ? 1 : 0,
                  transition: 'max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
                }}>
                  <p style={{
                    marginTop : '0.7rem',
                    paddingTop: '0.7rem',
                    borderTop : '1px solid rgba(255,255,255,0.10)',
                    fontSize  : 'clamp(0.76rem, 1.1vw, 0.86rem)',
                    lineHeight: 1.65,
                    color     : 'var(--text-secondary)',
                  }}>
                    {mod.body}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
