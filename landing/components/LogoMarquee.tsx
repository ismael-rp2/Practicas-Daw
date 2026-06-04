'use client';

// ─────────────────────────────────────────────────────────────────────────────
// LogoMarquee — carrusel infinito con arrastre y momentum
//   · rAF-driven: JS mueve el translateX; la animación CSS queda desactivada.
//   · Pointer Events (mouse + touch): drag para pausar/desplazar.
//   · Momentum: al soltar con velocidad, la cinta decelera suavemente.
//   · Seamless loop: wrap() mantiene x en (-unit, 0] sin saltos.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from 'react';

export default function LogoMarquee({
  logos,
  direction = 'left',
  duration  = 80,
}: {
  logos    : string[];
  direction?: 'left' | 'right';
  duration ?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  // ── Número de copias ─────────────────────────────────────────────────────
  // 6 copias garantizan que el track siempre supera el ancho de cualquier
  // viewport, incluso con listas muy cortas (ej. 4-5 logos en móvil).
  // La animación solo recorre 1 copia (unit) antes de hacer wrap, por lo
  // que el seam nunca es visible independientemente del número de copias.
  const NUM_COPIES = 6;
  const loop = Array.from({ length: NUM_COPIES }, () => logos).flat();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // ── Medidas ─────────────────────────────────────────────────────────────
    const unit    = track.scrollWidth / NUM_COPIES;  // ancho de UNA copia (px)
    const dirSign = direction === 'right' ? 1 : -1;
    const pxPerMs = unit / (duration * 1000); // velocidad base px/ms

    // ── Estado de animación (sin re-renders) ────────────────────────────────
    let x         = 0;
    let dragging  = false;
    let dragStartClientX = 0;
    let dragStartX       = 0;
    let velX      = 0;          // px/ms — velocidad en el momento de soltar
    let prevClientX = 0;
    let prevTime    = 0;
    let coasting  = false;
    let rafId     = 0;

    /**
     * Mantiene x en el rango (-unit, 0] para un loop sin saltos.
     * Funciona para cualquier valor: tras drag largo o momentum alto.
     */
    function wrap(v: number): number {
      // Módulo cuidadoso con negativos en JS
      v = ((v % unit) + unit) % unit; // → [0, unit)
      return v === 0 ? 0 : v - unit;  // → (-unit, 0]
    }

    // ── Loop principal ───────────────────────────────────────────────────────
    function tick(now: number) {
      const dt = prevTime ? now - prevTime : 16; // fallback 1 frame
      prevTime = now;

      if (!dragging) {
        if (coasting) {
          // Deceleración exponencial, independiente del frame rate
          x     = wrap(x + velX * dt);
          velX *= Math.pow(0.97, dt / 16);
          if (Math.abs(velX) < 0.015) { velX = 0; coasting = false; }
        } else {
          // Auto-scroll normal
          x = wrap(x + dirSign * pxPerMs * dt);
        }
      }

      if (track) {
        track.style.transform = `translateX(${x}px)`;
      }
      rafId = requestAnimationFrame(tick);
      }

    rafId = requestAnimationFrame(tick);

    // ── Pointer events (mouse + touch) ───────────────────────────────────────
    function onPointerDown(e: PointerEvent) {
      dragging       = true;
      coasting       = false;
      dragStartClientX = e.clientX;
      dragStartX     = x;
      velX           = 0;
      prevClientX    = e.clientX;
      prevTime       = performance.now();
      track.setPointerCapture(e.pointerId);
      track.style.cursor = 'grabbing';
      e.preventDefault(); // evita selección de texto accidental
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;

      const dx = e.clientX - dragStartClientX;
      x = wrap(dragStartX + dx);

      // Estima velocidad con ventana deslizante
      const now = performance.now();
      const dt  = now - prevTime;
      if (dt > 0) velX = (e.clientX - prevClientX) / dt;
      prevClientX = e.clientX;
      prevTime    = now;
    }

    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      track.style.cursor = 'grab';

      // Lanza momentum si hay velocidad suficiente
      if (Math.abs(velX) > 0.05) coasting = true;

      prevTime = 0; // evita dt gigante en el siguiente tick de auto-scroll
    }

    track.addEventListener('pointerdown',   onPointerDown);
    track.addEventListener('pointermove',   onPointerMove);
    track.addEventListener('pointerup',     onPointerUp);
    track.addEventListener('pointercancel', onPointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener('pointerdown',   onPointerDown);
      track.removeEventListener('pointermove',   onPointerMove);
      track.removeEventListener('pointerup',     onPointerUp);
      track.removeEventListener('pointercancel', onPointerUp);
    };
  }, [direction, duration, logos]);

  return (
    <div className="marquee" data-dir={direction}>
      <div
        ref={trackRef}
        className="marquee__track"
        aria-hidden="true"
        style={{
          animation  : 'none',      // JS controla el transform; CSS animation desactivada
          willChange : 'transform',
          cursor     : 'grab',
          touchAction: 'none',      // evita que el navegador interfiera con el drag táctil
        }}
      >
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            style={{
              fontFamily   : 'var(--sans)',
              fontSize     : 'clamp(0.95rem, 1.6vw, 1.25rem)',
              fontWeight   : 700,
              letterSpacing: '-0.01em',
              color        : 'rgba(255,255,255,0.55)',
              whiteSpace   : 'nowrap',
              transition   : 'color 0.2s',
              pointerEvents: 'none', // los spans no interceptan el drag del track
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
