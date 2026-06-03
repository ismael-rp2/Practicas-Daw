'use client';

// ─────────────────────────────────────────────────────────────────────────────
// StaggerWords — titular con efecto stagger palabra a palabra.
//
// Divide el texto por espacios y aplica la clase .word-stagger a cada span
// con un animation-delay incremental. El IntersectionObserver dispara el
// efecto cuando el heading asoma en pantalla.
// ─────────────────────────────────────────────────────────────────────────────

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';

export default function StaggerWords({
  text,
  as: Tag    = 'h1',
  style,
  baseDelay  = 0,
  wordDelay  = 0.08,
}: {
  /** Texto completo del titular */
  text      : string;
  as        ?: 'h1' | 'h2' | 'h3';
  style     ?: CSSProperties;
  /** Retraso antes de que empiece la primera palabra (segundos) */
  baseDelay ?: number;
  /** Intervalo entre palabras (segundos) */
  wordDelay ?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(' ');
  const Comp  = Tag as 'h1';

  return (
    <Comp ref={ref} style={style}>
      {words.map((word, i) => (
        // Fragment separa el span de texto del espacio entre palabras.
        // Poner el espacio FUERA del inline-block evita colapsos inesperados.
        <Fragment key={i}>
          <span
            className={`word-stagger${visible ? ' is-visible' : ''}`}
            style={{ '--word-delay': `${baseDelay + i * wordDelay}s` } as CSSProperties}
          >
            {word}
          </span>
          {/* Espacio natural entre palabras — invisible pero preserva layout */}
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Comp>
  );
}
