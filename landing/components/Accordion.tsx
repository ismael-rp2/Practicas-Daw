'use client';

import { useState, type ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Accordion — FAQ colapsable. Cada ítem muestra/oculta su contenido al clic.
// Sólo un ítem abierto a la vez (comportamiento exclusivo).
// ─────────────────────────────────────────────────────────────────────────────

export interface AccordionItem {
  question: string;
  answer  : ReactNode;
}

/**
 * Accordion de preguntas frecuentes.
 * @param items - Array de {question, answer} a renderizar.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map(({ question, answer }, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              background  : 'var(--bg-card)',
              border      : `1px solid ${isOpen ? 'rgba(59,130,246,0.4)' : 'var(--border-subtle)'}`,
              borderRadius: '10px',
              overflow    : 'hidden',
              transition  : 'border-color 0.2s',
            }}
          >
            {/* Cabecera del ítem */}
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width          : '100%',
                display        : 'flex',
                alignItems     : 'center',
                justifyContent : 'space-between',
                gap            : '1rem',
                padding        : 'clamp(1rem, 2.5vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem)',
                background     : 'transparent',
                border         : 'none',
                cursor         : 'pointer',
                textAlign      : 'left',
                color          : '#fff',
                fontFamily     : 'var(--sans)',
                fontSize       : 'clamp(0.92rem, 1.8vw, 1rem)',
                fontWeight     : 600,
                lineHeight     : 1.4,
              }}
            >
              <span>{question}</span>
              {/* Icono +/− */}
              <span
                aria-hidden="true"
                style={{
                  flexShrink  : 0,
                  width       : 22,
                  height      : 22,
                  borderRadius: '50%',
                  border      : '1px solid var(--border-subtle)',
                  display     : 'flex',
                  alignItems  : 'center',
                  justifyContent: 'center',
                  fontSize    : '1rem',
                  lineHeight  : 1,
                  color       : 'var(--accent-blue)',
                  transition  : 'transform 0.25s',
                  transform   : isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                +
              </span>
            </button>

            {/* Panel de respuesta — colapsa por height */}
            <div
              style={{
                maxHeight  : isOpen ? '600px' : '0',
                overflow   : 'hidden',
                transition : 'max-height 0.35s ease',
              }}
            >
              <div style={{
                padding   : '0 clamp(1rem, 2.5vw, 1.5rem) clamp(1rem, 2.5vw, 1.25rem)',
                fontSize  : 'clamp(0.88rem, 1.6vw, 0.97rem)',
                lineHeight: 1.7,
                color     : 'var(--text-secondary)',
              }}>
                {answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
