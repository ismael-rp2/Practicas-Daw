'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import Card from '@/components/Card';
import SectionEyebrow from '@/components/SectionEyebrow';
import Reveal from '@/components/Reveal';
import Accordion, { type AccordionItem } from '@/components/Accordion';
import TimelineHorizontal, { type TimelineStep } from '@/components/TimelineHorizontal';
import TimelineVertical from '@/components/TimelineVertical';
import AnimatedCounter from '@/components/AnimatedCounter';
import ModulosSendero  from '@/components/ModulosSendero';
import ModulosScrollSpy from '@/components/ModulosScrollSpy';
import TypewriterText  from '@/components/TypewriterText';
import Image from 'next/image';
import HeroCanvas from '@/components/HeroCanvas';
import { useState, useEffect, type ReactNode } from 'react';

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
    icon : '🧠',
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
const HERO_TESTIMONIALS = [
  { ini: 'LM', name: 'Laura M.',  role: 'Profesora de Matemáticas · IES Valle del Ebro', text: 'Antes tardaba 4 horas en preparar una unidad. Ahora 45 minutos, y con mejor resultado.' },
  { ini: 'TV', name: 'Tomás V.', role: 'Jefe de Departamento · Bachillerato',             text: 'El módulo de comunicación me cambió la relación con las familias. Los correos ya no me quitan el domingo.' },
  { ini: 'BF', name: 'Bea F.',   role: 'Maestra de Infantil · Colegio concertado',        text: 'Pensé que no era para mí porque "no soy de tecnología". El diagnóstico me demostró lo contrario.' },
  { ini: 'MG', name: 'María G.', role: 'Profesora de Lengua · IES Cervantes',             text: 'Las rúbricas las tengo listas en 10 minutos. Era impensable hace un año.' },
];

export default function ProfeLibrePage() {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx(i => (i + 1) % HERO_TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

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
        <section style={{ background: 'var(--bg-deep)', paddingTop: 'clamp(4rem, 10vw, 7rem)', paddingBottom: '1.5rem' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="04" text="Qué incluye" />
              <h2 style={h2Style}>El sistema completo, módulo a módulo.</h2>
            </Reveal>

            <ModulosScrollSpy modulos={MODULOS} />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            05 — CÓMO FUNCIONA (timeline junio → junio)
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingTop: 'clamp(4rem, 10vw, 7rem)', paddingBottom: '1.5rem' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="05" text="Cómo funciona" />
              <h2 style={h2Style}>De junio a junio, paso a paso.</h2>
            </Reveal>
            <TimelineVertical steps={TIMELINE} label="JUNIO 2026 → JUNIO 2027" />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            06 — RESULTADOS (bento grid jerárquico)
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="06" text="Resultados" />
              <h2 style={h2Style}>Los números que importan.</h2>
            </Reveal>

            {/* ── Bento grid ── */}
            <style>{`
              .bento { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(0.75rem,1.5vw,1.1rem); margin-top:clamp(2rem,5vw,3.5rem); }
              .b-feat { grid-column: 1 / 3; }
              .b-last { grid-column: 3 / 5; }
              @media(max-width:700px){
                .bento { grid-template-columns:repeat(2,1fr) !important; }
                .b-feat,.b-last { grid-column: 1 / -1 !important; }
              }
            `}</style>

            <div className="bento">

              {/* ── 10 h — tarjeta principal ─────────────────────────── */}
              <div className="b-feat">
                <Reveal>
                  <div style={{
                    background   : 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #9333ea 100%)',
                    borderRadius : '18px',
                    padding      : 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    display      : 'flex',
                    flexDirection: 'column',
                    gap          : '0.6rem',
                    height       : '100%',
                    boxShadow    : '0 16px 48px rgba(124,58,237,0.4)',
                    position     : 'relative',
                    overflow     : 'hidden',
                  }}>
                    {/* Halo decorativo */}
                    <div style={{
                      position    : 'absolute', top: '-30%', right: '-10%',
                      width: '220px', height: '220px', borderRadius: '50%',
                      background  : 'rgba(255,255,255,0.07)', pointerEvents: 'none',
                    }} />
                    <span style={{
                      fontFamily   : 'var(--mono)', fontSize: '0.7rem',
                      letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)',
                      textTransform: 'uppercase',
                    }}>Beneficio principal</span>
                    <AnimatedCounter value={10} suffix=" h" style={{
                      fontFamily: 'var(--sans)', fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
                      fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, color: '#fff',
                    }} />
                    <span style={{
                      fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.5, fontWeight: 500, maxWidth: '24ch',
                    }}>
                      recuperadas por semana de media
                    </span>
                  </div>
                </Reveal>
              </div>

              {/* ── +1700 ─────────────────────────────────────────────── */}
              <Reveal delay={0.07} style={{ display: 'flex' }}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: '18px', padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1,
                }}>
                  <AnimatedCounter value={1700} prefix="+" style={{
                    fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
                    color: 'var(--accent-blue)',
                  }} />
                  <span style={{ fontSize: 'clamp(0.82rem, 1.4vw, 0.92rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    docentes encuestados antes de diseñar el programa
                  </span>
                </div>
              </Reveal>

              {/* ── 94 % ──────────────────────────────────────────────── */}
              <Reveal delay={0.14} style={{ display: 'flex' }}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: '18px', padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1,
                }}>
                  <AnimatedCounter value={94} suffix=" %" style={{
                    fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
                    color: 'var(--accent-blue)',
                  }} />
                  <span style={{ fontSize: 'clamp(0.82rem, 1.4vw, 0.92rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    lo recomendaría a un compañero de claustro
                  </span>
                </div>
              </Reveal>

              {/* ── 3 sem ─────────────────────────────────────────────── */}
              <Reveal delay={0.07} style={{ display: 'flex' }}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: '18px', padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1,
                }}>
                  <AnimatedCounter value={3} suffix=" sem" style={{
                    fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
                    color: 'var(--accent-blue)',
                  }} />
                  <span style={{ fontSize: 'clamp(0.82rem, 1.4vw, 0.92rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    para ver los primeros resultados tangibles
                  </span>
                </div>
              </Reveal>

              {/* ── 8 módulos ─────────────────────────────────────────── */}
              <Reveal delay={0.14} style={{ display: 'flex' }}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: '18px', padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1,
                }}>
                  <AnimatedCounter value={8} style={{
                    fontFamily: 'var(--sans)', fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
                    color: 'var(--accent-blue)',
                  }} />
                  <span style={{ fontSize: 'clamp(0.82rem, 1.4vw, 0.92rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    módulos + bonus 1:1 incluidos
                  </span>
                </div>
              </Reveal>

              {/* ── 0 € — tarjeta secundaria destacada ───────────────── */}
              <div className="b-last" style={{ display: 'flex' }}>
                <Reveal delay={0.21} style={{ display: 'flex', flex: 1 }}>
                  <div style={{
                    background   : 'var(--bg-card)',
                    border       : '1px solid rgba(147,51,234,0.35)',
                    borderRadius : '18px',
                    padding      : 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    display      : 'flex',
                    alignItems   : 'center',
                    gap          : 'clamp(1rem, 2.5vw, 2rem)',
                    flex         : 1,
                    boxShadow    : '0 4px 20px rgba(147,51,234,0.12)',
                  }}>
                    <AnimatedCounter value={0} suffix=" €" style={{
                      fontFamily: 'var(--sans)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
                      color: '#c084fc', flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: 'clamp(0.88rem, 1.6vw, 1rem)', color: 'rgba(255,255,255,0.75)',
                      lineHeight: 1.5,
                    }}>
                      en extras ni suscripciones obligatorias
                    </span>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            07 — VALIDACIÓN: hero testimonial + wall of love carrusel
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingTop: 'clamp(4rem, 10vw, 7rem)', overflow: 'hidden' }}>

          {/* Sólo los @keyframes necesitan <style> — todo lo demás va inline */}
          <style>{`
            @keyframes hero-in { 0%{opacity:0;transform:translateY(10px)} 100%{opacity:1;transform:translateY(0)} }
            .hero-in { animation: hero-in 0.55s ease forwards; }
          `}</style>

          {/* ── Cabecera centrada ──────────────────────────────────────── */}
          <div style={{ ...sectionWrap, textAlign: 'center' }}>
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
                marginTop    : '1.25rem',
                marginBottom : 'clamp(2rem, 5vw, 3.5rem)',
              }}>
                No lo digo yo solo.{' '}
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                  Lo dicen <AnimatedCounter value={1700} suffix="+" /> docentes encuestados.
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Hero testimonial — rota cada 5 s ─────────────────────── */}
          <Reveal style={{ ...sectionWrap, marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div style={{
              position    : 'relative',
              background  : 'var(--bg-card)',
              border      : '1px solid rgba(147,51,234,0.35)',
              borderRadius: '22px',
              padding     : 'clamp(2rem, 4vw, 3rem)',
              maxWidth    : '820px',
              margin      : '0 auto',
              boxShadow   : '0 12px 56px rgba(147,51,234,0.18)',
              overflow    : 'hidden',
              minHeight   : '200px',
            }}>
              {/* Comilla de agua */}
              <div style={{
                position: 'absolute', top: '0.5rem', right: '1.5rem',
                fontSize: '11rem', lineHeight: 1, color: 'rgba(255,255,255,0.05)',
                fontFamily: 'Georgia,serif', userSelect: 'none', pointerEvents: 'none',
              }}>&#8221;</div>

              {/* Contenido animado — key fuerza el re-mount y la animación */}
              <div key={heroIdx} className="hero-in">
                {/* Estrellas */}
                <div style={{ color: '#c084fc', fontSize: '1.15rem', letterSpacing: '0.2em', marginBottom: '1.25rem' }}>
                  ★★★★★
                </div>

                {/* Cita */}
                <p style={{
                  fontStyle   : 'italic',
                  fontSize    : 'clamp(1.05rem, 2.2vw, 1.35rem)',
                  lineHeight  : 1.75,
                  color       : 'rgba(255,255,255,0.92)',
                  marginBottom: '1.75rem',
                  position    : 'relative', zIndex: 1,
                  maxWidth    : '66ch',
                }}>
                  "{HERO_TESTIMONIALS[heroIdx].text}"
                </p>

                {/* Avatar + datos */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#4c1d95,#1a1726)',
                    border: '2px solid rgba(147,51,234,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.88rem' }}>{HERO_TESTIMONIALS[heroIdx].ini}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', lineHeight: 1.3 }}>{HERO_TESTIMONIALS[heroIdx].name}</p>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.06em', color: '#c084fc' }}>
                      {HERO_TESTIMONIALS[heroIdx].role}
                    </p>
                  </div>
                </div>
              </div>{/* fin hero-in */}
            </div>
          </Reveal>

          {/* ── Wall of Love — carruseles infinitos ───────────────────── */}
          {(() => {
            const row1 = [
              { ini:'TV', name:'Tomás V.',   role:'Jefe de Departamento',       text:'Los correos a familias ya no me quitan el domingo.' },
              { ini:'BF', name:'Bea F.',     role:'Maestra de Infantil',         text:'El diagnóstico me demostró que esto sí era para mí.' },
              { ini:'MG', name:'María G.',   role:'Profesora de Lengua',         text:'Las rúbricas las tengo en 10 minutos. Impensable antes.' },
              { ini:'JR', name:'Javier R.',  role:'Profesor de Ciencias',        text:'Mis alumnos notaron el cambio antes que yo mismo.' },
              { ini:'AP', name:'Ana P.',     role:'Tutora de 3º ESO',            text:'Los informes de tutoría ya no me roban las tardes.' },
              { ini:'CL', name:'Carmen L.',  role:'Jefa de Estudios',            text:'Por fin una formación que no caduca al trimestre.' },
            ];
            const row2 = [
              { ini:'CM', name:'Carlos M.',  role:'Director de IES',             text:'Propuse el sistema a todo el claustro y lo adoptaron.' },
              { ini:'SL', name:'Sara L.',    role:'Profesora de Historia',       text:'Creía que la IA no era para humanidades. Me equivoqué.' },
              { ini:'PR', name:'Pablo R.',   role:'Orientador escolar',          text:'Se adapta perfectamente a cualquier etapa educativa.' },
              { ini:'NF', name:'Nuria F.',   role:'Coordinadora TIC',            text:'El módulo de diagnóstico lo cambió todo.' },
              { ini:'DM', name:'Diego M.',   role:'Profesor de FP',              text:'La primera inversión formativa sin arrepentimientos.' },
              { ini:'EV', name:'Elena V.',   role:'Maestra de Primaria',         text:'Llegué a junio sin agotarme por primera vez en años.' },
            ];

            const SmallCard = ({ ini, name, role, text }: typeof row1[0]) => (
              <div style={{
                background  : 'var(--bg-card)',
                border      : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                padding     : '1.1rem 1.25rem',
                minWidth    : '340px',
                flexShrink  : 0,
              }}>
                <div style={{ color: '#c084fc', fontSize: '0.78rem', letterSpacing: '0.2em', marginBottom: '0.65rem' }}>★★★★★</div>
                <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.78)', marginBottom: '0.85rem' }}>
                  "{text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,#4c1d95,#1a1726)',
                    border: '1.5px solid rgba(147,51,234,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.65rem' }}>{ini}</span>
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.8rem', lineHeight: 1.2 }}>{name}</p>
                    <p style={{ color: '#a78bfa', fontSize: '0.66rem', fontFamily: 'var(--mono)' }}>{role}</p>
                  </div>
                </div>
              </div>
            );

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', paddingBottom: 'clamp(4rem, 10vw, 7rem)' }}>
                {/* Fila 1 → izquierda */}
                <div className="marquee" style={{ '--marquee-duration': '40s', width: '100%' } as React.CSSProperties}>
                  <div
                    className="marquee__track"
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'; }}
                  >
                    {[...row1, ...row1].map((t, i) => <SmallCard key={i} {...t} />)}
                  </div>
                </div>
                {/* Fila 2 → derecha */}
                <div className="marquee" data-dir="right" style={{ '--marquee-duration': '40s', width: '100%' } as React.CSSProperties}>
                  <div
                    className="marquee__track"
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'; }}
                  >
                    {[...row2, ...row2].map((t, i) => <SmallCard key={i} {...t} />)}
                  </div>
                </div>
              </div>
            );
          })()}

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
          position    : 'relative',
          overflow    : 'hidden',
        }}>

          {/* Keyframes exclusivos de esta sección */}
          <style>{`
            @keyframes aura-pulse  { 0%,100%{opacity:.38} 50%{opacity:.78} }
            @keyframes btn-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
            @keyframes ring-ping   { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.8);opacity:0} }

            .cta09-btn {
              position:relative; z-index:1; display:inline-flex; align-items:center; gap:.6rem;
              background:#fff; color:#0a0a0a;
              font-family:var(--mono); font-size:.88rem; font-weight:700; letter-spacing:.08em;
              text-transform:uppercase; text-decoration:none;
              padding:1.1rem 2.4rem; border-radius:999px;
              animation: btn-breathe 3.5s ease-in-out infinite;
              transition: transform .25s ease, box-shadow .25s ease;
              cursor:pointer; border:none;
            }
            .cta09-btn:hover {
              transform: scale(1.07) !important;
              animation-play-state: paused;
              box-shadow: 0 18px 52px rgba(0,0,0,0.45);
            }
            .cta09-arrows {
              display:inline-block;
              transition: transform .3s ease;
            }
            .cta09-btn:hover .cta09-arrows {
              transform: translateX(7px);
            }
          `}</style>

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
              {/* Botón con aura + ping + latido */}
              <div style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>

                {/* Aura desenfocada morado→cian */}
                <div style={{
                  position:'absolute', inset:'-12px',
                  background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
                  filter:'blur(30px)',
                  borderRadius:'999px',
                  zIndex:0,
                  animation:'aura-pulse 3s ease-in-out infinite',
                  pointerEvents:'none',
                }} />

                {/* Anillo ping — 1ª onda */}
                <div style={{
                  position:'absolute', inset:'-2px',
                  border:'2px solid rgba(124,58,237,.65)',
                  borderRadius:'999px',
                  animation:'ring-ping 2.4s ease-out infinite',
                  pointerEvents:'none',
                }} />

                {/* Anillo ping — 2ª onda (desfasada) */}
                <div style={{
                  position:'absolute', inset:'-2px',
                  border:'2px solid rgba(124,58,237,.45)',
                  borderRadius:'999px',
                  animation:'ring-ping 2.4s ease-out .9s infinite',
                  pointerEvents:'none',
                }} />

                {/* Botón principal */}
                <a href={CTA_HREF} className="cta09-btn">
                  {isCartOpen ? 'QUIERO ENTRAR AHORA' : 'APÚNTAME A LA LISTA DE ESPERA'}
                  {' '}<span className="cta09-arrows">→ →</span>
                </a>
              </div>

              {!isCartOpen && (
                <p style={{ marginTop:'1rem', fontFamily:'var(--mono)', fontSize:'.7rem', letterSpacing:'.06em', color:'rgba(255,255,255,.38)' }}>
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
