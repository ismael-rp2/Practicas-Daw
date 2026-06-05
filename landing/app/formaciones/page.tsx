import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import Card from '@/components/Card';
import SectionEyebrow from '@/components/SectionEyebrow';
import LogoMarquee from '@/components/LogoMarquee';
import Reveal from '@/components/Reveal';
import HeroCanvas from '@/components/HeroCanvas';
import FormatsSection from '@/components/FormatsSection';
import GlowCTAButton from '@/components/GlowCTAButton';
import { Target, FlaskConical, ClipboardList, RefreshCw } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// DATOS — formatos disponibles (§5.7)
// ─────────────────────────────────────────────────────────────────────────────
const FORMATOS = [
  {
    icon    : '⚡',
    title   : 'Sesión inspiracional',
    body    : '60-90 minutos para encender la conversación sobre IA en educación. Ideal para claustros de inicio de curso, jornadas de convivencia o actos de apertura.',
    meta    : '60 – 90 min',
  },
  {
    icon    : '🛠️',
    title   : 'Taller práctico de claustro',
    body    : 'Formación hands-on de 3 a 6 horas. El equipo docente sale con un flujo de trabajo real instalado en su día a día, no solo con diapositivas bonitas.',
    meta    : '3 – 6 h',
  },
  {
    icon    : '🗓️',
    title   : 'Programa de implantación',
    body    : 'De 4 a 12 semanas. Diagnóstico inicial, formación por etapas, seguimiento de equipos y entrega de un plan de IA adaptado al proyecto educativo del centro.',
    meta    : '4 – 12 semanas',
  },
  {
    icon    : '🤝',
    title   : 'Acompañamiento anual',
    body    : 'Colaboración continua con el equipo directivo y los departamentos. Sesiones mensuales + canal de consulta + actualización ante cada cambio relevante del ecosistema IA.',
    meta    : '12 meses',
  },
];

// DATOS — instituciones/logos para el marquee
const INSTITUCIONES = [
  'Universidad de Sevilla',
  'INTEF — Ministerio de Educación',
  'Edelvives Editorial',
  'GEG Spain',
  'IES Macarena',
  'Fundación Telefónica Educa',
  'Colegio Salesiano',
  'TEDx',
];

// DATOS — 4 puntos de valor diferencial
const BENEFICIOS = [
  {
    icon : <Target className="w-6 h-6 text-purple-400" />,
    title: 'Contenido 100 % adaptado',
    body : 'al proyecto educativo de tu centro o red.',
  },
  {
    icon : <FlaskConical className="w-6 h-6 text-purple-400" />,
    title: 'Metodología práctica',
    body : 'los docentes trabajan, no solo escuchan.',
  },
  {
    icon : <ClipboardList className="w-6 h-6 text-purple-400" />,
    title: 'Entregables concretos',
    body : 'guías, plantillas y banco de prompts listos para usar.',
  },
  {
    icon : <RefreshCw className="w-6 h-6 text-purple-400" />,
    title: 'Seguimiento post-formación',
    body : 'para que los cambios lleguen al aula de verdad.',
  },
];

// DATOS — casos reales placeholder
const CASOS = [
  {
    meta    : 'Red de centros concertados · Andalucía · 2025',
    title   : 'De 12 centros al mismo nivel en IA',
    body    : 'Programa de implantación de 8 semanas para homogeneizar el uso de IA entre los equipos docentes de una red de 12 colegios. Resultado: +70 % de docentes con flujo de trabajo IA activo a final del curso.',
  },
  {
    meta    : 'IES público · Sevilla · 2025',
    title   : 'Taller de claustro que arrancó un cambio metodológico',
    body    : 'Sesión intensiva de 5 horas para un claustro de 60 profesores. El centro incorporó la IA como eje de su plan de mejora anual y solicitó acompañamiento para el curso siguiente.',
  },
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
 * Página de formaciones B2B para centros y organismos educativos (§5.7).
 * CTA principal → /contacto (gestión directa, sin e-commerce).
 */
export default function FormacionesPage() {
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
              <SectionEyebrow text="Formaciones" />
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
                Formaciones a medida para centros, redes y organismos.
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
                Llevo la IA aplicada con criterio al corazón de tu equipo docente. No charlas de tendencias: formación con los pies en el aula, resultados medibles y un plan que el centro puede sostener solo al terminar.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <CTAButton href="/contacto" variant="primary">
                PEDIR PROPUESTA →
              </CTAButton>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            QUÉ TE LLEVAS — split layout asimétrico sin tarjetas
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

              {/* Columna izquierda — título sticky */}
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <Reveal variant="slide-up">
                  <SectionEyebrow number="01" text="Qué te llevas" />
                  <h2 style={h2Style}>
                    Formación que no se queda en el cajón.
                  </h2>
                </Reveal>
              </div>

              {/* Columna derecha — lista minimalista */}
              <div className="lg:col-span-7 flex flex-col">
                {BENEFICIOS.map(({ icon, title, body }, i) => (
                  <Reveal key={title} variant="slide-up" staggerIndex={i}>
                    <div className="flex items-start gap-6 py-8 border-b border-white/10 first:pt-0 last:border-b-0">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        {icon}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg text-zinc-300 leading-relaxed">
                          <span className="text-white font-bold">{title}: </span>
                          {body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FORMATOS DISPONIBLES
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="02" text="Formatos disponibles" />
              <h2 style={h2Style}>Elige el formato que encaja con tu realidad.</h2>
            </Reveal>

            <FormatsSection />

            <Reveal delay={0.1} style={{ marginTop: 'clamp(2rem, 5vw, 3rem)', display: 'flex', justifyContent: 'flex-start' }}>
              <CTAButton href="/contacto" variant="secondary" arrow={false}>
                Hablamos de tu proyecto →
              </CTAButton>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SOCIAL PROOF — LOGO MARQUEE
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-deep)',
          paddingBlock: 'clamp(3rem, 7vw, 5rem)',
          borderTop   : '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{ ...sectionWrap, marginBottom: '2rem' }}>
            <Reveal>
              <SectionEyebrow number="03" text="Instituciones con las que he trabajado" />
            </Reveal>
          </div>
          <LogoMarquee logos={INSTITUCIONES} duration={80} />
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CASOS REALES
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="04" text="Casos reales" />
              <h2 style={h2Style}>Resultados que hablan por sí solos.</h2>
            </Reveal>

            <div style={{
              display            : 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap                : 'clamp(1.25rem, 3vw, 2rem)',
              marginTop          : 'clamp(2rem, 5vw, 3.5rem)',
            }}>
              {CASOS.map(({ meta, title, body }, i) => (
                <Reveal key={title} delay={i * 0.1}>
                  <Card meta={meta} title={title} body={body} />
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
                Agenda abierta para el curso 26-27
              </p>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.75rem, 4.5vw, 3.25rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                maxWidth     : '28ch',
                marginInline : 'auto',
              }}>
                Cuéntame qué necesita tu centro. Juntos diseñamos la propuesta.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <GlowCTAButton
                href="/contacto"
                subtitle="Te respondo personalmente en menos de 48 horas · Sin intermediarios"
              >
                PEDIR PROPUESTA
              </GlowCTAButton>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
