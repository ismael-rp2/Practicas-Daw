'use client';

import { useState, useRef, useEffect, type CSSProperties } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// TypewriterText — escribe el texto carácter a carácter cuando entra
// en el viewport. Pausa en signos de puntuación para mayor naturalidad.
//
// Velocidades:
//   char    — 25 ms entre caracteres normales
//   comma   — 200 ms tras  , ; :
//   period  — 440 ms tras  . ! ?
// ─────────────────────────────────────────────────────────────────────────────

const SPEED = { char: 25, comma: 200, period: 440 } as const;

interface Props {
  text     : string;
  style   ?: CSSProperties;
  className?: string;
  /** Fracción visible del elemento antes de disparar (default 0.35) */
  threshold?: number;
}

export default function TypewriterText({
  text,
  style,
  className,
  threshold = 0.35,
}: Props) {
  const [count, setCount]   = useState(0);   // chars mostrados
  const [active, setActive] = useState(false);
  const elRef = useRef<HTMLParagraphElement>(null);

  // Disparar solo cuando el usuario hace scroll hasta este elemento
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  // Loop de escritura
  useEffect(() => {
    if (!active || count >= text.length) return;

    // El delay depende del último carácter ya mostrado
    const lastChar = count > 0 ? text[count - 1] : '';
    let delay: number = SPEED.char;
    if ('.!?'.includes(lastChar))  delay = SPEED.period;
    else if (',;:'.includes(lastChar)) delay = SPEED.comma;

    const t = setTimeout(() => setCount(c => c + 1), delay);
    return () => clearTimeout(t);
  }, [active, count, text]);

  const done  = count >= text.length;
  const shown = text.slice(0, count);

  return (
    <p
      ref={elRef}
      aria-label={text}   /* texto completo siempre disponible para lectores */
      style={style}
      className={className}
    >
      <span aria-hidden="true">{shown}</span>

      {/* Cursor parpadeante — desaparece al terminar */}
      {!done && (
        <span
          aria-hidden="true"
          className="tw-cursor"
          style={{
            display      : 'inline-block',
            width        : '2px',
            height       : '1em',
            background   : 'var(--eyebrow-color)',
            marginLeft   : '2px',
            verticalAlign: 'text-bottom',
            borderRadius : '1px',
          }}
        />
      )}
    </p>
  );
}
