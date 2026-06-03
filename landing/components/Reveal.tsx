'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Reveal — componente de animación on-scroll de alto rendimiento.
//
// · Usa CSS animations (no transitions inline) para mayor control.
// · variant  → qué keyframe se aplica al entrar en viewport.
// · delay    → retraso fijo en segundos.
// · staggerIndex → multiplica 0.12 s por el índice (listas, grids).
// · duration → sobreescribe la duración del keyframe por instancia.
// · Respeta prefers-reduced-motion automáticamente vía globals.css.
// ─────────────────────────────────────────────────────────────────────────────

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';

export type RevealVariant = 'fade' | 'slide-up' | 'scale-in';

export default function Reveal({
  children,
  delay        = 0,
  staggerIndex,
  variant      = 'slide-up',
  duration,
  as: Tag      = 'div',
  style,
  className,
}: {
  children     : ReactNode;
  /** Retraso fijo adicional en segundos */
  delay       ?: number;
  /** Índice dentro de una lista — calcula delay = index × 0.12 s */
  staggerIndex?: number;
  /** Keyframe a aplicar cuando el elemento entra en viewport */
  variant     ?: RevealVariant;
  /** Sobreescribe la duración de la animación (segundos) */
  duration    ?: number;
  as          ?: 'div' | 'section' | 'span' | 'li' | 'article';
  style       ?: CSSProperties;
  /** Clases CSS adicionales que se concatenan a las de animación */
  className   ?: string;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Retraso total = delay fijo + stagger automático por índice
  const stagger    = staggerIndex !== undefined ? staggerIndex * 0.12 : 0;
  const totalDelay = delay + stagger;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect(); // dispara una sola vez y limpia
        }
      },
      {
        // Trigger cuando el 10 % del elemento asoma en pantalla.
        // rootMargin negativo hace que el trigger sea antes del borde visible.
        threshold : 0.1,
        rootMargin: '0px 0px -5% 0px',
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Comp = Tag as 'div';

  return (
    <Comp
      ref={ref}
      className={`reveal reveal-${variant}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--reveal-delay'   : `${totalDelay}s`,
        ...(duration != null ? { '--reveal-duration': `${duration}s` } : {}),
        ...style,
      } as CSSProperties}
    >
      {children}
    </Comp>
  );
}
