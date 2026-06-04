'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import Card from '@/components/Card';
import SectionEyebrow from '@/components/SectionEyebrow';
import Reveal from '@/components/Reveal';
import Accordion, { type AccordionItem } from '@/components/Accordion';
import TimelineHorizontal, { type TimelineStep } from '@/components/TimelineHorizontal';
import AnimatedCounter from '@/components/AnimatedCounter';
import ModulosSendero  from '@/components/ModulosSendero';
import TypewriterText  from '@/components/TypewriterText';
import Image from 'next/image';
import HeroCanvas from '@/components/HeroCanvas';
import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// LÓGICA DE FECHAS — §5.6 documento maestro
// false  → pre-lanzamiento: CTAs apuntan a /lista-espera
// true   → carrito abierto: CTAs muestran precio y compra directa
// ─────────────────────────────────────────────────────────────────────────────
const isCartOpen = false;

const CTA_LABEL = isCartOpen ? 'QUIERO ENTRAR AHORA →' : 'APÚNTAME A LA LISTA DE ESPERA →';
const CTA_HREF  = isCartOpen ? '/cursos/profelibre/compra' : '/lista-espera';

// ─────────────────────────────────────────────────────────────────────────────
// DATOS — módulos del sistema (§5.6 sección 04)
// ─────────────────────────────────────────────────────────────────────────────
const MODULOS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon : <img src="/iconos/icono-cerebro.svg" alt="" aria-hidden width={32} height={32} style={{ display: 'block' }} />,
    title: 'Módulo 1 — Diagnóstico',
    body : 'Identifica exactamente dónde la IA puede darte tiempo real en tu contexto concreto.',
  },
  { icon: '⚙️', title: 'Módulo 2 — Sistema base', body: 'Configura tu entorno de trabajo con las herramientas justas. Sin suscripciones innecesarias.' },
  { icon: '✍️', title: 'Módulo 3 — Planificación', body: 'Genera unidades didácticas completas con IA en menos de 20 minutos.' },
  { icon: '📊', title: 'Módulo 4 — Evaluación', body: 'Rúbricas, corrección asistida y retroalimentación sin perder tu criterio.' },
  { icon: '🎙️', title: 'Módulo 5 — Comunicación', body: 'Emails a familias, informes de tutoría y circulares redactadas al instante.' },
  { icon: '🤖', title: 'Módulo 6 — Prompts avanzados', body: 'El banco de 50 prompts docentes que usan los profes más productivos.' },
  { icon: '🏫', title: 'Módulo 7 — Claustro y equipo', body: 'Cómo extender la metodología a tu departamento sin imponer nada.' },
  { icon: '🔄', title: 'Módulo 8 — Actualización continua', body: 'El sistema para no quedarte obsoleto cuando la IA vuelva a cambiar.' },
  { icon: '🎯', title: 'BONUS — Plan personalizado', body: 'Sesión de 30 min 1:1 para adaptar el sistema a tu etapa y asignatura.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATOS — pasos del proceso (§5.6 sección 05 — junio a junio)
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE: TimelineStep[] = [
  { number: '01', title: 'Acceso inmediato', desc: 'Entras al campus y empiezas con el diagnóstico el mismo día.' },
  { number: '02', title: 'Semanas 1-2', desc: 'Sistema base instalado. Primeras horas recuperadas.' },
  { number: '03', title: 'Mes 1-2', desc: 'Flujo de planificación y evaluación completamente automatizado.' },
  { number: '04', title: 'Trimestre 1', desc: 'Dominas los 8 módulos. El equipo empieza a notarlo.' },
  { number: '05', title: 'Junio siguiente', desc: 'Cierras el curso con 10 h/semana recuperadas. Sistemáticamente.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATOS — cifras de impacto (§5.6 sección 06)
// ─────────────────────────────────────────────────────────────────────────────
const RESULTADOS = [
  { value: 10,   prefix: '',  suffix: ' h',   desc: 'recuperadas por semana de media' },
  { value: 1700, prefix: '+', suffix: '',      desc: 'docentes encuestados antes de diseñar el programa' },
  { value: 94,   prefix: '',  suffix: ' %',    desc: 'lo recomendaría a un compañero de claustro' },
  { value: 3,    prefix: '',  suffix: ' sem',  desc: 'para ver los primeros resultados tangibles' },
  { value: 8,    prefix: '',  suffix: '',      desc: 'módulos + bonus 1:1 incluidos' },
  { value: 0,    prefix: '',  suffix: ' €',    desc: 'extras ni suscripciones obligatorias' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATOS — preguntas frecuentes (§5.6 sección 08)
// ─────────────────────────────────────────────────────────────────────────────
const FAQS: AccordionItem[] = [
  {
    question: '¿Necesito tener experiencia previa con inteligencia artificial?',
    answer  : 'No. El módulo 1 parte de cero y te acompaña sin asumir ningún conocimiento técnico previo. Si ya usas alguna herramienta de IA, el diagnóstico te sitúa directamente en el punto que te corresponde.',
  },
  {
    question: '¿Cuánto tiempo a la semana necesito dedicarle?',
    answer  : 'Entre 2 y 3 horas las primeras semanas para instalar el sistema. A partir del mes 2, el propio sistema te da más tiempo del que inviertes en él.',
  },
  {
    question: '¿El contenido caduca cuando salga una IA nueva?',
    answer  : 'No. El sistema está diseñado sobre principios pedagógicos, no sobre herramientas concretas. Cuando ChatGPT-5 o lo que venga cambie las reglas, el módulo 8 te enseña a adaptar tu flujo en menos de una tarde.',
  },
  {
    question: '¿Es compatible con cualquier etapa educativa?',
    answer  : 'Sí. Hay profes de infantil, primaria, secundaria, bachillerato y FP dentro del programa. El bonus 1:1 existe precisamente para adaptar el sistema a tu asignatura y contexto concreto.',
  },
  {
    question: '¿Puedo acceder a mi ritmo o hay fechas límite?',
    answer  : 'Acceso 100 % asíncrono y de por vida. No hay sesiones en directo obligatorias ni fechas de entrega. Tú marcas el ritmo según tu carga lectiva.',
  },
  {
    question: '¿Qué pasa si ya tengo ProfeLibre edición anterior?',
    answer  : 'Si eres alumno de una edición previa, escríbeme directamente a joseda@serendipium.com y te informo del upgrade con condiciones especiales.',
  },
  {
    question: '¿Hay garantía de devolución?',
    answer  : 'Sí. 15 días de garantía total sin preguntas. Si en las dos primeras semanas sientes que no es para ti, te devuelvo el importe íntegro.',
  },
  {
    question: '¿Cuándo abre el carrito de compra?',
    answer  : '22 de junio a las 19:00 h. Las plazas son limitadas y el precio early bird sólo está disponible las primeras 48 horas. Apúntate a la lista de espera para recibir el aviso con 24 h de antelación.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Estilos reutilizables
// ─────────────────────────────────────────────────────────────────────────────
const sectionWrap = {
  width        : '100%',
  maxWidth     : 1280,
  marginInline : 'auto',
  paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
} as const;

const divider = {
  height    : 1,
  background: 'var(--border-subtle)',
  marginBottom: 'clamp(3rem, 7vw, 5rem)',
} as const;

/**
 * Página de ventas evergreen — ProfeLibre (§5.6 documento maestro).
 * CTAs condicionados por isCartOpen: pre-lanzamiento → /lista-espera.
 */
export default function ProfeLibrePage() {
  return (
    <>
      <Header />

      <main>

        {/* ════════════════════════════════════════════════════════════════
            01 — HERO
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          position    : 'relative',
          overflow    : 'hidden',
          background  : 'var(--bg-primary)',
          paddingBlock: 'clamp(5rem, 14svh, 10rem)',
        }}>
          <HeroCanvas />
          <div style={{ ...sectionWrap, position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'nowrap', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Texto */}
            <div style={{ flex: '1 1 0', minWidth: 0 }}>
              <Reveal>
                <SectionEyebrow text="ProfeLibre — Curso 26-27" />
              </Reveal>
              <Reveal delay={0.06}>
                <h1 style={{
                  fontFamily   : 'var(--sans)',
                  fontSize     : 'clamp(2.6rem, 7vw, 5.5rem)',
                  fontWeight   : 900,
                  letterSpacing: '-0.04em',
                  lineHeight   : 1.0,
                  color        : '#fff',
                  marginTop    : '1rem',
                  marginBottom : 'clamp(1.25rem, 3vw, 2rem)',
                }}>
                  Sé el profe que usa la IA,<br />
                  <span style={{ color: 'var(--accent-blue)' }}>no el que le tiene miedo.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{
                  fontSize  : 'clamp(1rem, 2vw, 1.2rem)',
                  lineHeight: 1.7,
                  color     : 'var(--text-secondary)',
                  maxWidth  : '52ch',
                  marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)',
                }}>
                  El sistema completo para integrar la inteligencia artificial en tu práctica docente, recuperar 10 horas a la semana y entrar al curso 26-27 con ventaja real.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <CTAButton href={CTA_HREF} variant="primary" style={{ fontSize: '0.88rem' }}>
                  {CTA_LABEL}
                </CTAButton>
                {!isCartOpen && (
                  <p style={{ marginTop: '0.85rem', fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)' }}>
                    Apertura 22 jun · 19:00 h · Plazas limitadas
                  </p>
                )}
              </Reveal>
            </div>

            {/* Imagen principal */}
            <Reveal delay={0.18} style={{ flex: '0 0 auto', width: 'clamp(220px, 32vw, 420px)' }}>
              {/* Marco de gradiente de marca */}
              <div style={{
                padding     : '3px',
                borderRadius: '20px',
                background  : 'var(--brand-gradient)',
                boxShadow   : '0 24px 64px rgba(94,45,214,0.4), 0 8px 32px rgba(0,0,0,0.55)',
              }}>
                <div style={{
                  position    : 'relative',
                  aspectRatio : '3 / 4',
                  borderRadius: '18px',
                  overflow    : 'hidden',
                }}>
                  <Image
                    src="/Copia de Captura_C2183_1.1.14.jpg"
                    alt="Joseda, formador de docentes en inteligencia artificial"
                    fill
                    priority
                    style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                    sizes="(max-width: 768px) 100vw, 520px"
                  />
                  {/* Overlay oscurecedor */}
                  <div style={{
                    position  : 'absolute',
                    inset     : 0,
                    background: 'rgba(0,0,0,0.28)',
                  }} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            02 — LA PROMESA
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="02" text="La promesa" />
              <p style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.5rem, 4vw, 2.75rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.2,
                color        : '#fff',
                maxWidth     : '32ch',
                marginTop    : '1.25rem',
              }}>
                Recuperar 10 horas a la semana no es un truco.{' '}
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                  Es el resultado de tener un sistema, no de probar herramientas al azar.
                </span>
              </p>
            </Reveal>
            <TypewriterText
              text="El 78 % de los docentes que han probado herramientas de IA las han abandonado al mes. La razón no es la herramienta: es que nadie les explicó cómo encajarla en su flujo real. ProfeLibre es el puente entre la IA que existe y la clase que tienes delante."
              style={{
                marginTop : 'clamp(1.5rem, 3vw, 2.5rem)',
                fontSize  : 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.75,
                color     : 'var(--text-secondary)',
                maxWidth  : '62ch',
              }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            03 — PARA QUIÉN ES
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="03" text="Para quién es" />
              <h2 style={h2Style}>¿Es ProfeLibre para ti?</h2>
            </Reveal>

            {/* Tabla comparativa estilo imagen */}
            <Reveal delay={0.1}>
              <div style={{
                display        : 'flex',
                flexWrap       : 'wrap',
                justifyContent : 'center',
                alignItems     : 'stretch',
                gap            : 'clamp(1.5rem, 4vw, 2rem)',
                marginTop      : 'clamp(2.5rem, 6vw, 4rem)',
              }}>

                {/* Columna SÍ — tarjeta elevada */}
                <div style={{
                  flex        : '1 1 320px',
                  maxWidth    : '400px',
                  background  : 'var(--bg-card)',
                  border      : '1px solid rgba(94,45,214,0.55)',
                  borderRadius: '16px',
                  padding     : 'clamp(1.75rem, 3vw, 2.25rem)',
                  boxShadow   : '0 20px 60px rgba(94,45,214,0.28), 0 4px 24px rgba(0,0,0,0.55)',
                  position    : 'relative',
                  zIndex      : 1,
                }}>
                  <p style={{
                    fontFamily : 'var(--sans)',
                    fontSize   : 'clamp(1rem, 2vw, 1.2rem)',
                    fontWeight : 700,
                    color      : '#fff',
                    textAlign  : 'center',
                    marginBottom: '1rem',
                  }}>
                    ProfeLibre
                  </p>
                  <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: '1.25rem' }} />
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    {[
                      'Sistema listo en 3 semanas',
                      '10 h/semana recuperadas de media',
                      'Prompts docentes listos para usar',
                      'Sin suscripciones ni costes extra',
                      'Soporte y actualizaciones incluidas',
                      'Bonus sesión 1:1 personalizada',
                    ].map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '0.7rem', fontSize: 'clamp(0.87rem, 1.5vw, 0.96rem)', lineHeight: 1.5, color: 'rgba(255,255,255,0.9)', alignItems: 'flex-start' }}>
                        <span aria-hidden style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0, fontSize: '1.05rem' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Columna NO — tarjeta apagada */}
                <div style={{
                  flex        : '1 1 320px',
                  maxWidth    : '400px',
                  background  : 'rgba(255,255,255,0.03)',
                  border      : '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding     : 'clamp(1.75rem, 3vw, 2.25rem)',
                }}>
                  <p style={{
                    fontFamily  : 'var(--sans)',
                    fontSize    : 'clamp(1rem, 2vw, 1.2rem)',
                    fontWeight  : 500,
                    color       : 'var(--text-secondary)',
                    textAlign   : 'center',
                    marginBottom: '1rem',
                  }}>
                    Sin un sistema claro
                  </p>
                  <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: '1.25rem' }} />
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    {[
                      'Meses probando herramientas sin resultado',
                      'Burocracia que sigue robando tus tardes',
                      'Prompts que no encajan en tu contexto',
                      'Suscripciones acumuladas sin criterio',
                      'Empezar el 26-27 igual que el 25-26',
                      'Sin guía adaptada a tu etapa educativa',
                    ].map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '0.7rem', fontSize: 'clamp(0.87rem, 1.5vw, 0.96rem)', lineHeight: 1.5, color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                        <span aria-hidden style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0, fontSize: '1.05rem' }}>✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            04 — QUÉ INCLUYE (9 tarjetas)
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="04" text="Qué incluye" />
              <h2 style={h2Style}>El sistema completo, módulo a módulo.</h2>
            </Reveal>

            <ModulosSendero modulos={MODULOS} />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            05 — CÓMO FUNCIONA (timeline junio → junio)
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="05" text="Cómo funciona" />
              <h2 style={h2Style}>De junio a junio, paso a paso.</h2>
            </Reveal>
            <Reveal delay={0.1} style={{ marginTop: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <TimelineHorizontal steps={TIMELINE} label="JUNIO 2026 → JUNIO 2027" />
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            06 — RESULTADOS (grid de cifras)
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="06" text="Resultados" />
              <h2 style={h2Style}>Los números que importan.</h2>
            </Reveal>

            <div style={{
              display            : 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap                : 'clamp(1.25rem, 3vw, 2rem)',
              marginTop          : 'clamp(2rem, 5vw, 3.5rem)',
            }}>
              {RESULTADOS.map(({ value, prefix, suffix, desc }, i) => (
                <Reveal key={desc} delay={i * 0.07}>
                  <div style={{
                    background  : 'var(--bg-card)',
                    border      : '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding     : 'clamp(1.5rem, 3vw, 2rem)',
                    display     : 'flex',
                    flexDirection: 'column',
                    gap         : '0.5rem',
                  }}>
                    <AnimatedCounter
                      value={value}
                      prefix={prefix}
                      suffix={suffix}
                      style={{
                        fontFamily   : 'var(--sans)',
                        fontSize     : 'clamp(2rem, 5vw, 3rem)',
                        fontWeight   : 900,
                        letterSpacing: '-0.04em',
                        lineHeight   : 1,
                        color        : 'var(--accent-blue)',
                      }}
                    />
                    <span style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {desc}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            07 — VALIDACIÓN (autoridad + testimonios)
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="07" text="Validación" />
              <p style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.4rem, 3.5vw, 2.5rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.2,
                color        : '#fff',
                maxWidth     : '30ch',
                marginTop    : '1.25rem',
                marginBottom : 'clamp(2rem, 5vw, 3.5rem)',
              }}>
                No lo digo yo solo.{' '}
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                  Lo dicen{' '}
                  <AnimatedCounter value={1700} suffix="+" />
                  {' '}docentes encuestados.
                </span>
              </p>
            </Reveal>

            {/* Grid de testimonios placeholder */}
            <div style={{
              display            : 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap                : 'clamp(1.25rem, 3vw, 2rem)',
            }}>
              {[
                { nombre: 'Laura M.', rol: 'Profesora de Matemáticas, IES Valle del Ebro', texto: '"Antes tardaba 4 horas en preparar una unidad. Ahora 45 minutos, y con mejor resultado."' },
                { nombre: 'Tomás V.', rol: 'Jefe de Departamento, Bachillerato', texto: '"El módulo de comunicación me cambió la relación con las familias. Los correos ya no me quitan el domingo."' },
                { nombre: 'Bea F.', rol: 'Maestra de Infantil, colegio concertado', texto: '"Pensé que no era para mí porque \'no soy de tecnología\'. El diagnóstico me demostró lo contrario."' },
              ].map(({ nombre, rol, texto }) => (
                <Reveal key={nombre}>
                  <blockquote style={{
                    background  : 'var(--bg-card)',
                    border      : '1px solid var(--border-subtle)',
                    borderRadius: '14px',
                    padding     : 'clamp(1.5rem, 3vw, 2rem)',
                    display     : 'flex',
                    flexDirection: 'column',
                    gap         : '1rem',
                  }}>
                    <p style={{ fontSize: 'clamp(0.92rem, 1.7vw, 1.02rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
                      {texto}
                    </p>
                    <footer style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <strong style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{nombre}</strong>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.06em', color: 'var(--accent-blue)' }}>{rol}</span>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            08 — FAQ
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="08" text="FAQ" />
              <h2 style={{ ...h2Style, marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
                Preguntas frecuentes.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Accordion items={FAQS} />
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            09 — CIERRE — última llamada a la acción
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-primary)',
          paddingBlock: 'clamp(6rem, 16svh, 11rem)',
          textAlign   : 'center',
        }}>
          <div style={{
            ...sectionWrap,
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            gap          : 'clamp(1.5rem, 4vw, 2.5rem)',
          }}>
            <Reveal>
              <SectionEyebrow number="09" text="Última llamada" />
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2rem, 5.5vw, 4rem)',
                fontWeight   : 900,
                letterSpacing: '-0.04em',
                lineHeight   : 1.05,
                color        : '#fff',
                maxWidth     : '22ch',
                marginTop    : '1.25rem',
                marginInline : 'auto',
              }}>
                El curso 26-27 va a llegar de todas formas.{' '}
                <span style={{ color: 'var(--accent-blue)' }}>¿Con qué herramientas vas a afrontarlo?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <CTAButton href={CTA_HREF} variant="primary" style={{ fontSize: '0.9rem', padding: '1.1rem 2.6rem' }}>
                {CTA_LABEL}
              </CTAButton>
              {!isCartOpen && (
                <p style={{ marginTop: '0.85rem', fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)' }}>
                  Apertura 22 jun · 19:00 h · Precio early bird solo 48 h
                </p>
              )}
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Estilos de h2 compartidos para todas las secciones
// ─────────────────────────────────────────────────────────────────────────────
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
