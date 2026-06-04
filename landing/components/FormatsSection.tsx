'use client';

import { Zap, Hammer, CalendarDays, HeartHandshake } from 'lucide-react';
import Reveal from '@/components/Reveal';

// ─────────────────────────────────────────────────────────────────────────────
// Data — orden: ligeros arriba (fila 1), pesados abajo (fila 2)
// ─────────────────────────────────────────────────────────────────────────────
const FORMATOS = [
  {
    Icon : Zap,
    meta : '60 – 90 min',
    title: 'Sesión inspiracional',
    body : '60-90 minutos para encender la conversación sobre IA en educación. Ideal para claustros de inicio de curso, jornadas de convivencia o actos de apertura.',
  },
  {
    Icon : Hammer,
    meta : '3 – 6 h',
    title: 'Taller práctico de claustro',
    body : 'Formación hands-on de 3 a 6 horas. El equipo docente sale con un flujo de trabajo real instalado en su día a día, no solo con diapositivas bonitas.',
  },
  {
    Icon : CalendarDays,
    meta : '4 – 12 semanas',
    title: 'Programa de implantación',
    body : 'De 4 a 12 semanas. Diagnóstico inicial, formación por etapas, seguimiento de equipos y entrega de un plan de IA adaptado al proyecto educativo del centro.',
  },
  {
    Icon : HeartHandshake,
    meta : '12 meses',
    title: 'Acompañamiento anual',
    body : 'Colaboración continua con el equipo directivo y los departamentos. Sesiones mensuales + canal de consulta + actualización ante cada cambio relevante del ecosistema IA.',
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function FormatsSection() {
  return (
    <div style={{
      display            : 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
      gap                : 'clamp(1.25rem, 3vw, 2rem)',
      marginTop          : 'clamp(2rem, 5vw, 3.5rem)',
      alignItems         : 'stretch',
    }}>
      {FORMATOS.map(({ Icon, meta, title, body }, i) => (
        <Reveal key={title} variant="slide-up" staggerIndex={i} style={{ height: '100%' }}>
          <article
            className="format-card"
            style={{
              display      : 'flex',
              flexDirection: 'column',
              gap          : '0.85rem',
              height       : '100%',
              background   : 'var(--bg-card)',
              border       : '1px solid rgba(147,51,234,0.45)',
              borderRadius : '16px',
              padding      : 'clamp(1.5rem, 3vw, 2.25rem)',
            }}
          >
            {/* Icon + meta row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              {/* Icon container */}
              <div style={{
                width         : 40,
                height        : 40,
                borderRadius  : 10,
                background    : 'rgba(255,255,255,0.05)',
                border        : '1px solid rgba(255,255,255,0.1)',
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'center',
                flexShrink    : 0,
              }}>
                <Icon size={18} color="var(--accent-blue)" strokeWidth={1.75} />
              </div>

              {/* Meta badge */}
              <span style={{
                fontFamily   : 'var(--mono)',
                fontSize     : '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color        : 'var(--accent-blue)',
                background   : 'rgba(147,51,234,0.1)',
                border       : '1px solid rgba(147,51,234,0.25)',
                borderRadius : '999px',
                padding      : '0.3rem 0.75rem',
                whiteSpace   : 'nowrap',
              }}>
                {meta}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily   : 'var(--sans)',
              fontSize     : 'clamp(1.15rem, 2vw, 1.35rem)',
              fontWeight   : 700,
              letterSpacing: '-0.02em',
              lineHeight   : 1.2,
              color        : '#fff',
            }}>
              {title}
            </h3>

            {/* Body */}
            <p style={{
              fontSize  : 'clamp(0.92rem, 1.6vw, 1rem)',
              lineHeight: 1.7,
              color     : 'var(--text-secondary)',
              flexGrow  : 1,
            }}>
              {body}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
