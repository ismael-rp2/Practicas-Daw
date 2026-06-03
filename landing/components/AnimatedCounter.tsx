'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedCounter — contador animado que dispara al entrar en viewport.
// Renderiza como <span> para uso inline dentro de párrafos y headings.
// Sin dependencias externas: solo IntersectionObserver + requestAnimationFrame.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Easing easeOut cúbico: deceleración natural al acercarse al valor final.
 * f(0)=0, f(1)=1, máxima velocidad al inicio.
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Contador animado de 0 → value activado por scroll (IntersectionObserver).
 *
 * @param value    - Número objetivo al que animar.
 * @param prefix   - Texto fijo antes del número (ej. "+", "~").
 * @param suffix   - Texto fijo después del número (ej. " h", " %", " docentes").
 * @param duration - Duración de la animación en ms (default 2000).
 * @param style    - Estilos inline opcionales para el <span> raíz.
 */
export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  style,
}: {
  value   : number;
  prefix? : string;
  suffix? : string;
  duration?: number;
  style?  : CSSProperties;
}) {
  const spanRef   = useRef<HTMLSpanElement>(null);
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);

  // ── Disparo por scroll ───────────────────────────────────────────────────
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Animación con rAF ────────────────────────────────────────────────────
  useEffect(() => {
    if (!started || value === 0) {
      // valor 0: no hay nada que animar, muestra directo
      if (value === 0) setCount(0);
      return;
    }

    let raf: number;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const t       = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutCubic(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  // Formatea con locale español → puntos como separador de miles (1700 → "1.700")
  const formatted = count.toLocaleString('es-ES');

  return (
    <span
      ref={spanRef}
      style={style}
      // aria-label con el valor final para lectores de pantalla
      aria-label={`${prefix}${value.toLocaleString('es-ES')}${suffix}`}
      aria-live="off"
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
