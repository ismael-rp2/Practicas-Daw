import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import SectionEyebrow from '@/components/SectionEyebrow';
import LogoMarquee from '@/components/LogoMarquee';
import Reveal from '@/components/Reveal';
import HeroCanvas from '@/components/HeroCanvas';
import GlowCTAButton from '@/components/GlowCTAButton';

// ─────────────────────────────────────────────────────────────────────────────
// DATOS — formatos de ponencia (§5.8)
// ─────────────────────────────────────────────────────────────────────────────
const FORMATOS = [
  { emoji: '🎤', label: 'Keynote de apertura o cierre', desc: '45 – 60 min. El discurso que marca el tono de todo el evento.' },
  { emoji: '🎯', label: 'Ponencia central',              desc: '30 – 45 min. Profundidad y argumentación sobre un tema concreto.' },
  { emoji: '🪑', label: 'Mesa redonda',                  desc: 'Moderación o participación. Contraste de perspectivas con criterio.' },
  { emoji: '⚡', label: 'Charla TED-style',              desc: '15 – 20 min. Impacto máximo, foco único, recuerdo garantizado.' },
];

// DATOS — temas tratados (§5.8)
const TEMAS = [
  { num: '01', title: 'IA y docencia: cómo salir de la parálisis', desc: 'Por qué el 78 % de los profes que prueban IA la abandonan en un mes y cómo evitarlo.' },
  { num: '02', title: 'El profe aumentado: herramientas sin perder la voz', desc: 'La IA como copiloto pedagógico, no como sustituto. Dónde está el límite y cómo encontrarlo.' },
  { num: '03', title: 'Evaluar en la era de ChatGPT', desc: 'Nuevos marcos de evaluación que tienen sentido cuando el alumno tiene acceso a IA generativa.' },
  { num: '04', title: 'Liderazgo educativo e inteligencia artificial', desc: 'Para equipos directivos: cómo llevar la IA al claustro sin imposición y con resultados.' },
  { num: '05', title: 'Familias, hijos y pantallas: la conversación pendiente', desc: 'Conferencia para AMPA y comunidades educativas sobre IA, adolescentes y uso crítico.' },
  { num: '06', title: 'El futuro del aprendizaje ya empezó', desc: 'Visión de largo plazo: qué habilidades sobreviven a la IA y cómo prepara la escuela para ellas.' },
];

// DATOS — eventos donde ha participado (para marquee)
const EVENTOS = [
  'SIMO Educación',
  'GEG Spain Summit',
  'Congreso Internacional EDUTEC',
  'Jornadas Andaluzas de Tecnología Educativa',
  'TEDx Sevilla',
  'Forum Europeo de Educación',
  'Congreso CNTE',
  'BilbaoEdTech',
];

// ─────────────────────────────────────────────────────────────────────────────
const sectionWrap: React.CSSProperties = {
  width        : '100%',
  maxWidth     : 1280,
  marginInline : 'auto',
  paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
};

const divider: React.CSSProperties = {
  height      : 1,
  background  : 'var(--border-subtle)',
  marginBottom: 'clamp(3rem, 7vw, 5rem)',
};

const h2Style: React.CSSProperties = {
  fontFamily   : 'var(--sans)',
  fontSize     : 'clamp(1.75rem, 4vw, 3rem)',
  fontWeight   : 800,
  letterSpacing: '-0.03em',
  lineHeight   : 1.1,
  color        : '#fff',
  marginTop    : '1.25rem',
  maxWidth     : '28ch',
};

/**
 * Página de ponencias B2B para eventos y congresos educativos (§5.8).
 * CTA principal → /contacto (contratación directa sin e-commerce).
 */
export default function PonenciasPage() {
  return (
    <>
      <Header />

      <main>

        {/* ════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', paddingBlock: 'clamp(5rem, 14svh, 10rem)' }}>
          <HeroCanvas />
          <div style={{ ...sectionWrap, position: 'relative', zIndex: 1 }}>
            <Reveal>
              <SectionEyebrow text="Ponencias" />
            </Reveal>
            <Reveal delay={0.07}>
              <h1 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2.4rem, 6.5vw, 5rem)',
                fontWeight   : 900,
                letterSpacing: '-0.04em',
                lineHeight   : 1.05,
                color        : '#fff',
                marginTop    : '1rem',
                marginBottom : 'clamp(1.25rem, 3vw, 2rem)',
                maxWidth     : '20ch',
              }}>
                Llevo conversaciones sobre IA y educación a tu evento.
              </h1>
            </Reveal>
            <Reveal delay={0.13}>
              <p style={{
                fontSize    : 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight  : 1.7,
                color       : 'var(--text-secondary)',
                maxWidth    : '58ch',
                marginBottom: 'clamp(1.75rem, 4vw, 2.75rem)',
              }}>
                Inspirar, agitar, ordenar el ruido. Eso es lo que hago en el escenario. Sin hype, sin tecnicismos vacíos: una charla que el público recordará cuando llegue al aula el lunes siguiente.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <CTAButton href="/contacto" variant="primary">
                CONTRATAR PONENCIA →
              </CTAButton>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FORMATOS
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="01" text="Formatos" />
              <h2 style={h2Style}>Me adapto a tu programa y a tu audiencia.</h2>
            </Reveal>

            <div style={{
              display            : 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap                : 'clamp(1.25rem, 3vw, 1.75rem)',
              marginTop          : 'clamp(2rem, 5vw, 3.5rem)',
            }}>
              {FORMATOS.map(({ emoji, label, desc }, i) => (
                <Reveal key={label} delay={i * 0.07} style={{ height: '100%' }}>
                  <div className="formato-card" style={{
                    background    : 'var(--bg-card)',
                    border        : '1px solid var(--border-subtle)',
                    borderRadius  : '14px',
                    padding       : 'clamp(1.5rem, 3vw, 2rem)',
                    display       : 'flex',
                    flexDirection : 'column',
                    alignItems    : 'center',
                    textAlign     : 'center',
                    gap           : '0.75rem',
                    height        : '100%',
                  }}>
                    <span aria-hidden="true" style={{ fontSize: '1.8rem', lineHeight: 1 }}>{emoji}</span>
                    <h3 style={{
                      fontFamily   : 'var(--sans)',
                      fontSize     : 'clamp(1rem, 1.8vw, 1.15rem)',
                      fontWeight   : 700,
                      letterSpacing: '-0.02em',
                      color        : '#fff',
                      lineHeight   : 1.2,
                    }}>
                      {label}
                    </h3>
                    <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.93rem)', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                      {desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            TEMAS QUE HE TRATADO
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="02" text="Temas que he tratado" />
              <h2 style={h2Style}>Seis conversaciones que cambian el enfoque.</h2>
            </Reveal>

            <div style={{
              display            : 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap                : 'clamp(1rem, 2.5vw, 1.5rem)',
              marginTop          : 'clamp(2rem, 5vw, 3.5rem)',
            }}>
              {TEMAS.map(({ num, title, desc }, i) => (
                <Reveal key={num} delay={i * 0.06}>
                  <div style={{
                    display     : 'flex',
                    gap         : '1.1rem',
                    alignItems  : 'flex-start',
                    background  : 'var(--bg-card)',
                    border      : '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding     : 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  }}>
                    {/* Número */}
                    <span style={{
                      fontFamily   : 'var(--mono)',
                      fontSize     : '0.68rem',
                      fontWeight   : 600,
                      letterSpacing: '0.08em',
                      color        : 'var(--accent-blue)',
                      flexShrink   : 0,
                      paddingTop   : '0.15rem',
                    }}>
                      {num}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {/* Checkmark + título */}
                      <p style={{
                        fontFamily   : 'var(--sans)',
                        fontSize     : 'clamp(0.9rem, 1.7vw, 1rem)',
                        fontWeight   : 700,
                        letterSpacing: '-0.01em',
                        color        : '#fff',
                        lineHeight   : 1.3,
                        display      : 'flex',
                        alignItems   : 'flex-start',
                        gap          : '0.45rem',
                      }}>
                        <span aria-hidden="true" style={{ color: 'var(--accent-blue)', flexShrink: 0 }}>✓</span>
                        {title}
                      </p>
                      <p style={{ fontSize: 'clamp(0.82rem, 1.4vw, 0.9rem)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            DÓNDE HE ESTADO — logo marquee
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-deep)',
          paddingBlock: 'clamp(3rem, 7vw, 5rem)',
          borderTop   : '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{ ...sectionWrap, marginBottom: '2rem' }}>
            <Reveal>
              <SectionEyebrow number="03" text="Dónde he estado" />
            </Reveal>
          </div>
          <LogoMarquee logos={EVENTOS} direction="right" duration={45} />
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PROCESO DE CONTRATACIÓN
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="04" text="Cómo funciona" />
              <h2 style={h2Style}>Sin formularios kilométricos. Sin esperas.</h2>
            </Reveal>

            <div style={{
              display            : 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap                : 'clamp(1rem, 2.5vw, 1.5rem)',
              marginTop          : 'clamp(2rem, 5vw, 3.5rem)',
            }}>
              {[
                { paso: '01', titulo: 'Cuéntame tu evento',  texto: 'Escríbeme con el contexto: fecha, audiencia, duración esperada y lo que quieres transmitir.' },
                { paso: '02', titulo: 'Te propongo el tema', texto: 'En menos de 48 horas te sugiero el enfoque más potente para tu público específico.' },
                { paso: '03', titulo: 'Acordamos los detalles', texto: 'Cerramos formato, duración, materiales y logística. Sin idas y venidas innecesarias.' },
                { paso: '04', titulo: 'Me subo al escenario', texto: 'Llego preparado, puntual y con un discurso afinado para tu evento concreto.' },
              ].map(({ paso, titulo, texto }, i) => (
                <Reveal key={paso} delay={i * 0.07}>
                  <div style={{
                    background  : 'var(--bg-card)',
                    border      : '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding     : 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    display     : 'flex',
                    flexDirection: 'column',
                    gap         : '0.65rem',
                  }}>
                    <span style={{
                      fontFamily   : 'var(--mono)',
                      fontSize     : '0.7rem',
                      letterSpacing: '0.1em',
                      color        : 'var(--accent-blue)',
                    }}>
                      {paso}
                    </span>
                    <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(0.95rem, 1.7vw, 1.05rem)', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                      {titulo}
                    </h3>
                    <p style={{ fontSize: 'clamp(0.83rem, 1.4vw, 0.92rem)', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                      {texto}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CIERRE CTA
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-deep)',
          paddingBlock: 'clamp(5rem, 14svh, 9rem)',
          textAlign   : 'center',
        }}>
          <div style={{
            ...sectionWrap,
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            gap          : 'clamp(1.25rem, 3vw, 2rem)',
          }}>
            <div style={{ height: 1, width: '100%', background: 'var(--border-subtle)', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }} />
            <Reveal>
              <p style={{
                fontFamily   : 'var(--mono)',
                fontSize     : '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color        : 'rgba(255,255,255,0.45)',
                marginBottom : '0.5rem',
              }}>
                Agenda disponible para el segundo semestre de 2026
              </p>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.75rem, 4.5vw, 3.25rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                maxWidth     : '26ch',
                marginInline : 'auto',
              }}>
                Dale a tu evento la charla que tu audiencia merece.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <GlowCTAButton
                href="/contacto"
                subtitle="Te respondo personalmente en menos de 48 horas · Sin intermediarios"
              >
                CONTRATAR PONENCIA
              </GlowCTAButton>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
