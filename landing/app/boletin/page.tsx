'use client';

import { useState, useRef, type FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import Card from '@/components/Card';
import SectionEyebrow from '@/components/SectionEyebrow';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import HeroCanvas from '@/components/HeroCanvas';
import AnimatedCounter from '@/components/AnimatedCounter';

// ─────────────────────────────────────────────────────────────────────────────
// Últimas ediciones del boletín — datos placeholder coherentes con el tema
// ─────────────────────────────────────────────────────────────────────────────
const EDICIONES = [
  {
    meta : 'Edición #47 · Junio 2026',
    title: 'ChatGPT en el aula: lo que funciona y lo que es puro humo',
    body : 'Separamos las aplicaciones pedagógicas reales de los titulares vacíos. Con un prompt listo para usar.',
    linkText: 'Leer edición',
    href : '#',
  },
  {
    meta : 'Edición #46 · Mayo 2026',
    title: 'Cómo evaluar con IA sin perder tu criterio docente',
    body : 'Tres estrategias para que la IA te ayude a corregir sin sustituirte. El matiz que marca la diferencia.',
    linkText: 'Leer edición',
    href : '#',
  },
  {
    meta : 'Edición #45 · Mayo 2026',
    title: 'El modelo que está cambiando la enseñanza de idiomas',
    body : 'Gemini + pronunciación en tiempo real. Cómo integrarlo en tu clase de lengua en 10 minutos.',
    linkText: 'Leer edición',
    href : '#',
  },
  {
    meta : 'Edición #44 · Abril 2026',
    title: 'Diseña una unidad didáctica con IA en menos de una hora',
    body : 'El flujo completo paso a paso: desde el objetivo curricular hasta la rúbrica de evaluación.',
    linkText: 'Leer edición',
    href : '#',
  },
];

// Los 4 compromisos editoriales del boletín
const COMPROMISOS = [
  { emoji: '💡', text: 'Una idea aplicable el lunes siguiente' },
  { emoji: '📰', text: 'Novedades reales filtradas sin hype' },
  { emoji: '🧩', text: 'Un prompt concreto listo para copiar' },
  { emoji: '🚫', text: 'Cero relleno, cero ruido, cero spam' },
];

/**
 * Landing del boletín EDU + IA (§5.3 documento maestro).
 * Única página del sitio con fondo invertido azul cobalto (--bg-invert).
 * Incluye formulario de suscripción, ediciones recientes y mini-bio del autor.
 */
export default function BoletinPage() {
  const [email, setEmail]   = useState('');
  const [estado, setEstado] = useState<'idle' | 'loading' | 'ok'>('idle');
  /** Ref al input de email para el scroll del CTA de cierre */
  const formRef = useRef<HTMLDivElement>(null);

  /**
   * Gestiona el envío del formulario Brevo.
   * Simula la llamada a la API con un setTimeout; en producción reemplazar
   * por un fetch al endpoint de Brevo con el email capturado.
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === 'loading') return;
    setEstado('loading');

    // Simulación de envío — reemplazar por fetch real en producción
    setTimeout(() => {
      console.log('[boletín] suscripción registrada para:', email);
      setEmail('');
      setEstado('ok');
    }, 900);
  }

  /** Hace scroll suave hasta el formulario de suscripción */
  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <>
      <Header />

      <main>
        {/* ════════════════════════════════════════════════════════════════
            HERO + FORMULARIO — fondo invertido azul cobalto (§5.3)
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          position    : 'relative',
          overflow    : 'hidden',
          background  : 'var(--bg-primary)',
          paddingBlock: 'clamp(5rem, 14svh, 10rem)',
        }}>
          <HeroCanvas />
          <div style={{
            position     : 'relative',
            zIndex       : 1,
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            textAlign    : 'center',
            gap          : 'clamp(1.5rem, 4vw, 2.5rem)',
          }}>
            <Reveal>
              <SectionEyebrow text="Boletín" />
            </Reveal>

            <Reveal delay={0.06}>
              <h1 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(3.5rem, 10vw, 7rem)',
                fontWeight   : 900,
                letterSpacing: '-0.04em',
                lineHeight   : 0.95,
                color        : '#fff',
              }}>
                EDU + IA
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.15rem, 2.8vw, 1.65rem)',
                fontWeight   : 500,
                letterSpacing: '-0.01em',
                lineHeight   : 1.35,
                color        : 'rgba(255,255,255,0.82)',
                maxWidth     : '48ch',
              }}>
                La newsletter semanal que pone orden al ruido de la IA en educación.
              </h2>
            </Reveal>

            {/* 4 compromisos editoriales */}
            <Reveal delay={0.14}>
              <ul style={{
                listStyle    : 'none',
                display      : 'flex',
                flexDirection: 'column',
                gap          : '0.55rem',
                textAlign    : 'left',
              }}>
                {COMPROMISOS.map(({ emoji, text }) => (
                  <li key={text} style={{
                    display   : 'flex',
                    alignItems: 'center',
                    gap       : '0.75rem',
                    fontSize  : 'clamp(0.95rem, 1.8vw, 1.05rem)',
                    color     : 'rgba(255,255,255,0.85)',
                  }}>
                    <span aria-hidden="true">{emoji}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Formulario Brevo */}
            <Reveal delay={0.18} style={{ width: '100%', maxWidth: 440 }}>
              <div ref={formRef}>
                {estado === 'ok' ? (
                  /* Mensaje de éxito inline */
                  <div style={{
                    background  : 'rgba(255,255,255,0.1)',
                    border      : '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '8px',
                    padding     : '1.25rem 1.5rem',
                    textAlign   : 'center',
                  }}>
                    <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: '#fff', fontSize: '1rem' }}>
                      ✓ ¡Ya estás suscrito!
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.35rem' }}>
                      Revisa tu bandeja de entrada para confirmar.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width       : '100%',
                        background  : 'rgba(255,255,255,0.12)',
                        border      : '1px solid rgba(255,255,255,0.25)',
                        borderRadius: '6px',
                        padding     : '0.9rem 1rem',
                        fontSize    : '0.95rem',
                        color       : '#fff',
                        fontFamily  : 'var(--sans)',
                        outline     : 'none',
                      }}
                    />
                    <CTAButton
                      type="submit"
                      variant="primary"
                      arrow={false}
                      style={{
                        justifyContent: 'center',
                        opacity       : estado === 'loading' ? 0.6 : 1,
                      }}
                    >
                      {estado === 'loading' ? 'Enviando…' : 'QUIERO RECIBIRLO →'}
                    </CTAButton>
                  </form>
                )}

                {/* Social proof */}
                <p style={{
                  marginTop    : '0.85rem',
                  fontFamily   : 'var(--mono)',
                  fontSize     : '0.72rem',
                  letterSpacing: '0.05em',
                  color        : 'rgba(255,255,255,0.5)',
                  textAlign    : 'center',
                }}>
                  Únete a{' '}
                  <AnimatedCounter value={2500} prefix="+" suffix=" docentes" />
                  {' '}que ya están un paso por delante.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            QUÉ HE PUBLICADO — grid de 4 ediciones recientes
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-primary)',
          paddingBlock: 'clamp(4rem, 10vw, 7rem)',
        }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            {/* Separador */}
            <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 'clamp(3rem, 7vw, 5rem)' }} />

            <Reveal>
              <SectionEyebrow number="01" text="Últimas ediciones" />
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                marginBottom : 'clamp(2.5rem, 6vw, 4rem)',
                maxWidth     : '28ch',
              }}>
                Qué he publicado en las últimas semanas.
              </h2>
            </Reveal>

            <div style={{
              display             : 'grid',
              gridTemplateColumns : 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap                 : 'clamp(1.25rem, 3vw, 2rem)',
            }}>
              {EDICIONES.map(({ meta, title, body, linkText, href }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <Card
                    meta={meta}
                    title={title}
                    body={body}
                    linkText={linkText}
                    href={href}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            QUIÉN ESCRIBE — mini-bio del autor
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-deep)',
          paddingBlock: 'clamp(4rem, 10vw, 7rem)',
        }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            {/* Separador */}
            <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 'clamp(3rem, 7vw, 5rem)' }} />

            <Reveal>
              <SectionEyebrow number="02" text="Quién escribe esto" />
            </Reveal>

            {/* Layout bio: imagen + texto */}
            <div style={{
              display        : 'flex',
              flexWrap       : 'wrap',
              gap            : 'clamp(2rem, 5vw, 4rem)',
              alignItems     : 'flex-start',
              marginTop      : 'clamp(1.5rem, 4vw, 2.5rem)',
            }}>
              {/* Foto de Joseda */}
              <div style={{
                flexShrink  : 0,
                width       : 'clamp(160px, 25vw, 260px)',
                aspectRatio : '1 / 1',
                borderRadius: '14px',
                overflow    : 'hidden',
                position    : 'relative',
                border      : '1px solid var(--border-subtle)',
              }}>
                <Image
                  src="/joseda-bio.jpg"
                  alt="Foto de Joseda, docente y formador en IA educativa"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 160px, 260px"
                />
              </div>

              {/* Texto bio */}
              <div style={{
                flex     : '1 1 280px',
                display  : 'flex',
                flexDirection: 'column',
                gap      : '1.25rem',
              }}>
                <h2 style={{
                  fontFamily   : 'var(--sans)',
                  fontSize     : 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  fontWeight   : 800,
                  letterSpacing: '-0.03em',
                  lineHeight   : 1.1,
                  color        : '#fff',
                }}>
                  Hola, soy Joseda.
                </h2>

                <p style={{
                  fontSize  : 'clamp(0.95rem, 1.8vw, 1.1rem)',
                  lineHeight: 1.7,
                  color     : 'var(--text-secondary)',
                  maxWidth  : '58ch',
                }}>
                  Docente, formador y obsesionado con hacer que la IA sea una herramienta útil de verdad — no un gadget de moda — para los profes de a pie. Llevo más de una década en las aulas y otros tantos años aprendiendo a convivir con el cambio tecnológico sin perder el norte pedagógico.
                </p>

                <p style={{
                  fontSize  : 'clamp(0.95rem, 1.8vw, 1.1rem)',
                  lineHeight: 1.7,
                  color     : 'var(--text-secondary)',
                  maxWidth  : '58ch',
                }}>
                  Cada semana escribo EDU + IA para destilarte lo que de verdad importa, con criterio y sin sensacionalismos.
                </p>

                <div>
                  <CTAButton href="/sobre-joseda" variant="ghost" arrow>
                    Conoce mi historia
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CIERRE — repetición del CTA con scroll al formulario
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-invert)',
          paddingBlock: 'clamp(5rem, 14svh, 9rem)',
          textAlign   : 'center',
        }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            gap          : 'clamp(1.5rem, 4vw, 2rem)',
          }}>
            <Reveal>
              <p style={{
                fontFamily   : 'var(--mono)',
                fontSize     : '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color        : 'rgba(255,255,255,0.55)',
              }}>
                Cada semana. Gratis. Sin spam.
              </p>

              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.75rem, 4.5vw, 3.25rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                maxWidth     : '26ch',
                marginBlock  : 'clamp(1rem, 3vw, 1.5rem)',
                marginInline : 'auto',
              }}>
                La IA no espera. Tu formación tampoco debería.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              {/* Scroll hacia el formulario del hero */}
              <CTAButton
                variant="primary"
                arrow={false}
                onClick={scrollToForm}
                style={{ fontSize: '0.9rem', padding: '1.1rem 2.4rem' }}
              >
                QUIERO RECIBIRLO →
              </CTAButton>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
