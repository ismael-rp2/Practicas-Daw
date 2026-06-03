'use client';

import type { CSSProperties } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// HoverWord — anima el texto LETRA A LETRA al pasar el cursor.
// Espacios se renderizan como   (non-breaking) para evitar colapso.
// Solo transform (GPU-accelerated, sin repaint de layout).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Divide `text` en caracteres individuales y anima cada uno con translateY
 * al recibir el hover.
 *
 * @param text       - Texto a animar carácter a carácter.
 * @param style      - Estilos del contenedor exterior.
 * @param liftAmount - Desplazamiento Y en px al hacer hover (default -8).
 */
export default function HoverWord({
  text,
  style,
  liftAmount = -8,
}: {
  text       : string;
  style?     : CSSProperties;
  liftAmount?: number;
}) {
  const chars = text.split('');

  return (
    <span style={{ display: 'inline', ...style }}>
      {chars.map((char, i) => {
        // Espacios: non-breaking space sin animación para no colapsar palabras
        if (char === ' ') {
          return (
            <span key={i} style={{ display: 'inline-block' }}>
              {' '}
            </span>
          );
        }

        return (
          <span
            key={i}
            style={{
              display   : 'inline-block',
              transition: 'transform 0.2s ease',
              willChange: 'transform',
              cursor    : 'default',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = `translateY(${liftAmount}px)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
