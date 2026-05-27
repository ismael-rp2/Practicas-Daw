'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

// ── Stats con datos numéricos para la animación de contador ──────────────────
const STATS = [
  { num: 500,   prefix: '+', suffix: '',  locale: false, label: 'centros educativos' },
  { num: 17000, prefix: '',  suffix: '',  locale: true,  label: 'docentes formados'  },  // → "17.000"
  { num: 15,    prefix: '+', suffix: 'M', locale: false, label: 'personas alcanzadas' },
  { num: 160,   prefix: '',  suffix: 'K', locale: false, label: 'suscriptores YouTube' },
] as const;

/** Formatea el número igual que el valor final visible */
function fmt(n: number, locale: boolean, prefix: string, suffix: string) {
  const rounded = Math.round(n);
  const body    = locale ? rounded.toLocaleString('es-ES') : String(rounded);
  return prefix + body + suffix;
}

const METODOS = [
  'Aprendizaje y evaluación por competencias',
  'Aprendizaje cooperativo',
  'Aprendizaje Basado en Proyectos (ABP)',
  'Flipped Classroom',
  'Gamificación',
  'Evaluación',
];

const HERRAMIENTAS = [
  'Evaluación Competencial con IA',
  'ChatGPT para Docentes',
  'Situaciones de Aprendizaje con ChatGPT',
  'Herramientas IA para Docentes',
  'Educador Certificado de Google Niv. 1 y 2',
  'Google Classroom · Meet · Drive · Forms',
  'Edpuzzle · Canva · Genially',
  'Chromebooks e iPads en educación',
  'Y muchos más…',
];

export default function Formaciones() {
  const sectionRef    = useRef<HTMLElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const sv = document.querySelector<HTMLElement>('.scroll-viewport');

    const ctx = gsap.context(() => {

      // ── Animaciones de entrada ──────────────────────────────────────────────
      gsap.from('.form-overline', { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.form-header', scroller: sv, start: 'top 80%', once: true } });
      gsap.from('.form-title', { y: '105%', duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.form-header', scroller: sv, start: 'top 78%', once: true } });
      gsap.from('.form-cta-top', { opacity: 0, y: 12, duration: 0.55, ease: 'power2.out', delay: 0.15,
        scrollTrigger: { trigger: '.form-header', scroller: sv, start: 'top 76%', once: true } });

      // Stats: fade-in
      gsap.from('.form-stat', { opacity: 0, y: 24, stagger: 0.1, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: statsRef.current, scroller: sv, start: 'top 85%', once: true } });

      // ── Contador numérico — usa onEnter para que parta de 0 de verdad ───────
      // Inicializar valores a 0 antes de que el usuario haga scroll
      statValueRefs.current.forEach((el, i) => {
        if (el) el.textContent = fmt(0, STATS[i].locale, STATS[i].prefix, STATS[i].suffix);
      });

      ScrollTrigger.create({
        trigger : statsRef.current,
        scroller: sv,
        start   : 'top 82%',
        once    : true,
        onEnter () {
          STATS.forEach((stat, i) => {
            const el = statValueRefs.current[i];
            if (!el) return;
            const counter = { val: 0 };
            gsap.to(counter, {
              val     : stat.num,
              duration: 2.0,
              ease    : 'power2.out',
              delay   : i * 0.08,
              onUpdate  () { el.textContent = fmt(counter.val, stat.locale, stat.prefix, stat.suffix); },
              onComplete() { el.textContent = fmt(stat.num,   stat.locale, stat.prefix, stat.suffix); },
            });
          });
        },
      });

      gsap.from('.form-bio-text', { opacity: 0, y: 18, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.form-bio', scroller: sv, start: 'top 82%', once: true } });

      gsap.from('.form-topic-col', { opacity: 0, x: -30, stagger: 0.15, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.form-topics', scroller: sv, start: 'top 85%', once: true } });

      gsap.from('.form-cta-bottom', { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.form-cta-bottom', scroller: sv, start: 'top 90%', once: true } });

    }, sectionRef);

    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section className="form-section" ref={sectionRef}>

      {/* Header */}
      <div className="form-header">
        <p className="form-overline">03 — Formaciones</p>
        <div className="form-title-wrap">
          <h2 className="form-title">
            Me encanta <em>enseñar</em><br />y aprender.
          </h2>
        </div>
        <a href="mailto:hola@jose-david.com" className="form-cta-top" target="_blank" rel="noopener noreferrer">
          💻 Solicítame una formación →
        </a>
      </div>

      {/* Stats con contador animado */}
      <div className="form-stats" ref={statsRef}>
        {STATS.map((stat, i) => (
          <div key={stat.label} className="form-stat">
            <span
              className="form-stat-value"
              ref={el => { statValueRefs.current[i] = el; }}
            >
              {/* Valor inicial — será sobreescrito por GSAP */}
              {fmt(stat.num, stat.locale, stat.prefix, stat.suffix)}
            </span>
            <span className="form-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="form-bio">
        <p className="form-bio-text">
          Echando la vista atrás, me parece casi mágico haber formado en estos últimos años a más de{' '}
          <strong>500 centros educativos</strong> y más de <strong>17.000 docentes</strong> de forma directa.
          También he participado en numerosos congresos, jornadas y webinars educativos.
          Y mis vídeos… ¡han llegado a más de <strong>15 millones de docentes</strong> de todo el mundo!
        </p>
        <p className="form-bio-text">
          Me apasiona acompañar a los docentes, plantar en ellos la semilla de la innovación ⚙️ y aumentar su confianza y habilidades.
        </p>
        <p className="form-bio-text form-credentials">
          Soy <span className="form-accent">Innovador Certificado de Google</span>,{' '}
          <span className="form-accent">Capacitador Certificado de Google for Education</span>,
          ganador en los <span className="form-accent">Premios de Innovación Educativa 2019</span>{' '}
          (categoría de formación e implicación del profesorado), y presentador de los podcasts{' '}
          «Tribu de Profes», «Acción Educativa», «Google Edu Podcast», «Innovación Educativa» y «LEOcuentos».
        </p>
      </div>

      {/* Topics */}
      <div className="form-topics">
        <div className="form-topic-col">
          <h3 className="form-topic-title">Métodos y metodologías activas</h3>
          <ul className="form-topic-list">
            {METODOS.map((item) => (
              <li key={item} className="form-topic-item">
                <span className="form-topic-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="form-topic-col">
          <h3 className="form-topic-title">Herramientas digitales en el aula</h3>
          <ul className="form-topic-list">
            {HERRAMIENTAS.map((item) => (
              <li key={item} className="form-topic-item">
                <span className="form-topic-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom info & CTA */}
      <div className="form-footer-info">
        <p className="form-footer-meta">
          Formato: <em>presencial o videoconferencia</em> · Importe: <em>a consultar según características</em>
        </p>
        <a href="mailto:hola@jose-david.com" className="form-cta-bottom" target="_blank" rel="noopener noreferrer">
          Solicítame una formación aquí →
        </a>
      </div>

    </section>
  );
}
