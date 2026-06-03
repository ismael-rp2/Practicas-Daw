// ─────────────────────────────────────────────────────────────────────────────
// TimelineHorizontal — proceso visual paso a paso en eje horizontal (desktop)
// y vertical (mobile). Cada paso tiene número, título y descripción corta.
// ─────────────────────────────────────────────────────────────────────────────

export interface TimelineStep {
  number: string;
  title : string;
  desc  : string;
}

/**
 * Timeline horizontal/vertical de pasos de un proceso.
 * @param steps - Array de pasos {number, title, desc}.
 * @param label - Etiqueta de rango temporal opcional (ej. "JUNIO → JUNIO").
 */
export default function TimelineHorizontal({
  steps,
  label,
}: {
  steps: TimelineStep[];
  label?: string;
}) {
  return (
    <div>
      {/* Etiqueta de rango temporal */}
      {label && (
        <p style={{
          fontFamily   : 'var(--mono)',
          fontSize     : '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color        : 'var(--accent-blue)',
          marginBottom : 'clamp(1.5rem, 4vw, 2.5rem)',
        }}>
          {label}
        </p>
      )}

      {/* Grid de pasos */}
      <div style={{
        display            : 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
        gap                : 0,
        position           : 'relative',
      }}>
        {steps.map(({ number, title, desc }, i) => (
          <div
            key={number}
            style={{
              position     : 'relative',
              paddingTop   : 'clamp(1.5rem, 4vw, 2rem)',
              paddingRight : 'clamp(1rem, 2vw, 1.5rem)',
              paddingBottom: 'clamp(1.5rem, 4vw, 2rem)',
            }}
          >
            {/* Línea conectora horizontal (entre pasos, desktop) */}
            {i < steps.length - 1 && (
              <div style={{
                position  : 'absolute',
                top       : 'calc(clamp(1.5rem, 4vw, 2rem) + 14px)',
                right     : 0,
                width     : 'clamp(1rem, 2vw, 1.5rem)',
                height    : 1,
                background: 'var(--border-subtle)',
              }} />
            )}

            {/* Círculo numerado */}
            <div style={{
              width          : 28,
              height         : 28,
              borderRadius   : '50%',
              background     : 'rgba(59,130,246,0.15)',
              border         : '1px solid rgba(59,130,246,0.5)',
              display        : 'flex',
              alignItems     : 'center',
              justifyContent : 'center',
              fontFamily     : 'var(--mono)',
              fontSize       : '0.7rem',
              fontWeight     : 600,
              color          : 'var(--accent-blue)',
              marginBottom   : '0.85rem',
              flexShrink     : 0,
            }}>
              {number}
            </div>

            <h4 style={{
              fontFamily   : 'var(--sans)',
              fontSize     : 'clamp(0.9rem, 1.6vw, 1rem)',
              fontWeight   : 700,
              letterSpacing: '-0.01em',
              color        : '#fff',
              marginBottom : '0.4rem',
              lineHeight   : 1.2,
            }}>
              {title}
            </h4>

            <p style={{
              fontFamily: 'var(--sans)',
              fontSize  : 'clamp(0.78rem, 1.3vw, 0.85rem)',
              lineHeight: 1.6,
              color     : 'var(--text-secondary)',
            }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
