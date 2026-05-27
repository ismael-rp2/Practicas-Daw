'use client';

import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

const CURSOS = [
  {
    id   : 1,
    num  : '01',
    title: 'ProfeLibre',
    sub  : 'El método definitivo para crear cursos online exitosos y construir tu negocio como docente creador. Monetiza tu conocimiento y recupera tu libertad profesional.',
    tags : ['cursos online', 'negocio educativo', 'creador de contenido', 'monetización'],
    href : 'https://jose-david.com',
    gradient: 'linear-gradient(135deg, #1a0a4a 0%, #3b2080 55%, #6d4fff 100%)',
  },
  {
    id   : 2,
    num  : '02',
    title: 'Evaluación con IA',
    sub  : 'Diseña evaluaciones competenciales con inteligencia artificial. Ahorra horas de trabajo y ofrece un feedback de calidad a cada alumno en minutos.',
    tags : ['evaluación', 'inteligencia artificial', 'competencias', 'feedback'],
    href : 'https://jose-david.com',
    gradient: 'linear-gradient(135deg, #0a1a3a 0%, #1a3a6a 55%, #60a5fa 100%)',
  },
  {
    id   : 3,
    num  : '03',
    title: 'ChatGPT para Docentes',
    sub  : 'Domina ChatGPT y aplícalo en tu aula desde el primer día. Planificaciones, actividades, rúbricas y recursos pedagógicos generados en minutos.',
    tags : ['ChatGPT', 'IA generativa', 'planificación', 'recursos'],
    href : 'https://jose-david.com',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #1a5a38 55%, #34d399 100%)',
  },
  {
    id   : 4,
    num  : '04',
    title: 'Situaciones de Aprendizaje con ChatGPT',
    sub  : 'Crea situaciones de aprendizaje completas y contextualizadas con IA. Metodología activa y tecnología al servicio del aula real.',
    tags : ['situaciones de aprendizaje', 'ChatGPT', 'ABP', 'metodología'],
    href : 'https://jose-david.com',
    gradient: 'linear-gradient(135deg, #0a2a2a 0%, #1a4a4a 55%, #2dd4bf 100%)',
  },
  {
    id   : 5,
    num  : '05',
    title: 'Netflix de Docentes',
    sub  : 'Acceso ilimitado a una videoteca de formación docente en constante crecimiento. Aprende a tu ritmo con contenidos prácticos, actuales y aplicables.',
    tags : ['formación continua', 'videoteca', 'suscripción', 'on-demand'],
    href : 'https://jose-david.com',
    gradient: 'linear-gradient(135deg, #2a0a0a 0%, #5a1a1a 55%, #f87171 100%)',
  },
  {
    id   : 6,
    num  : '06',
    title: 'Libera Completo',
    sub  : 'El programa completo para liberarte de las tareas que roban tu tiempo como docente. Automatiza, delega y recupera tu energía y pasión por enseñar.',
    tags : ['productividad', 'automatización', 'bienestar docente', 'gestión'],
    href : 'https://jose-david.com',
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #5a3a1a 55%, #f59e0b 100%)',
  },
  {
    id   : 7,
    num  : '07',
    title: 'LibroForum',
    sub  : 'Lecturas clave sobre educación comentadas y debatidas en comunidad. Convierte la lectura en aprendizaje accionable que puedes aplicar en tu aula.',
    tags : ['lectura', 'comunidad', 'reflexión', 'educación'],
    href : 'https://jose-david.com',
    gradient: 'linear-gradient(135deg, #1a1a0a 0%, #3a3a1a 55%, #facc15 100%)',
  },
] as const;

const LAYER_COUNT   = 5;
const MAX_FAN_ANGLE = -5;

export default function Cursos() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const textRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const layerRefs  = useRef<(HTMLDivElement | null)[][]>([]);

  const getLayers = useCallback((i: number): HTMLDivElement[] =>
    (layerRefs.current[i] ?? []).filter((l): l is HTMLDivElement => l !== null),
  []);

  useIsomorphicLayoutEffect(() => {
    const scrollViewport = document.querySelector<HTMLElement>('.scroll-viewport');
    const ctx = gsap.context(() => {
      arrowRefs.current.forEach(a => { if (a) gsap.set(a, { opacity: 0, x: -10 }); });

      layerRefs.current.forEach(layers => {
        if (!layers) return;
        layers.forEach((layer, idx) => {
          if (!layer) return;
          const isTop = idx === layers.filter(Boolean).length - 1;
          gsap.set(layer, { rotate: 0, scale: 1, opacity: isTop ? 1 : 0 });
        });
      });

      gsap.timeline({
        scrollTrigger: { trigger: '.cursos-header', scroller: scrollViewport, start: 'top 78%', once: true },
      })
        .from('.cursos-overline', { opacity: 0, y: 14, duration: 0.55, ease: 'power2.out' })
        .from('.cursos-title .reveal-inner', { y: '110%', duration: 0.85, ease: 'power3.out' }, '-=0.25')
        .from('.cursos-header-sub', { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.45');

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        gsap.timeline({
          scrollTrigger: { trigger: panel, scroller: scrollViewport, start: 'top 88%', once: true },
        })
          .fromTo(panel,
            { opacity: 0, scale: 0.95, y: 24 },
            { opacity: 1, scale: 1,    y: 0, duration: 0.80, ease: 'power2.out' }
          );
      });
    }, sectionRef);

    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  useEffect(() => {
    const panels = panelRefs.current.filter((p): p is HTMLDivElement => p !== null);
    if (panels.length === 0) return;
    const equalize = () => {
      panels.forEach(p => { p.style.height = ''; });
      requestAnimationFrame(() => {
        const maxH = Math.max(...panels.map(p => p.offsetHeight));
        panels.forEach(p => { p.style.height = `${maxH}px`; });
      });
    };
    equalize();
    window.addEventListener('resize', equalize);
    return () => window.removeEventListener('resize', equalize);
  }, []);

  const handleCardEnter = useCallback((i: number) => {
    const text  = textRefs.current[i];
    const wrap  = imgRefs.current[i];
    const arrow = arrowRefs.current[i];
    if (text)  gsap.to(text,  { x: -24, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
    if (arrow) gsap.to(arrow, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    if (wrap) {
      const layers = getLayers(i);
      layers.forEach((layer, idx) => {
        const isTop = idx === layers.length - 1;
        gsap.set(layer, { rotate: 0, scale: 1, opacity: isTop ? 1 : 0 });
      });
      gsap.to(wrap, { opacity: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    }
  }, [getLayers]);

  const handleCardLeave = useCallback((i: number) => {
    const text  = textRefs.current[i];
    const wrap  = imgRefs.current[i];
    const arrow = arrowRefs.current[i];
    if (text)  gsap.to(text,  { x: 0,    duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    if (arrow) gsap.to(arrow, { opacity: 0, x: -10, duration: 0.3, ease: 'power2.in',  overwrite: 'auto' });
    if (wrap) {
      const layers = getLayers(i);
      layers.forEach((layer, idx) => {
        const isTop = idx === layers.length - 1;
        gsap.to(layer, { rotate: 0, scale: 1, opacity: isTop ? 1 : 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      });
      gsap.to(wrap, { opacity: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    }
  }, [getLayers]);

  const handleImgEnter = useCallback((i: number) => {
    const layers  = getLayers(i);
    const total   = layers.length;
    const bgCount = total - 1;
    layers.forEach((layer, idx) => {
      const isTop  = idx === total - 1;
      const rotate = total > 1 ? (idx / (total - 1)) * MAX_FAN_ANGLE : 0;
      const opacity = isTop ? 1 : bgCount > 1 ? 0.15 + (idx / (bgCount - 1)) * 0.65 : 0.65;
      gsap.to(layer, { rotate, opacity, scale: 1, duration: 0.75, ease: 'expo.out', overwrite: 'auto' });
    });
  }, [getLayers]);

  const handleImgLeave = useCallback((i: number) => {
    const layers = getLayers(i);
    layers.forEach((layer, idx) => {
      const isTop = idx === layers.length - 1;
      gsap.to(layer, { rotate: 0, scale: 1, opacity: isTop ? 1 : 0, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
    });
  }, [getLayers]);

  return (
    <section className="work" id="cursos" ref={sectionRef}>
      <div className="work-header cursos-header">
        <p className="work-overline cursos-overline">03 — Cursos &amp; Formaciones</p>
        <h2 className="work-title cursos-title" ref={titleRef}>
          <span className="reveal-wrap">
            <span className="reveal-inner">Lo que <em>enseño</em></span>
          </span>
        </h2>
        <p className="work-header-sub cursos-header-sub">
          Cada formación está diseñada para docentes reales, con necesidades reales.
          Práctica, directa y aplicable desde el primer día.
        </p>
      </div>

      <div className="work-panels">
        {CURSOS.map((c, i) => (
          <div
            key={c.id}
            className="work-panel"
            ref={(el) => { panelRefs.current[i] = el; }}
            onMouseEnter={() => handleCardEnter(i)}
            onMouseLeave={() => handleCardLeave(i)}
            style={{ cursor: 'pointer' }}
            onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); }}
            aria-label={`Ver ${c.title}`}
          >
            <div className="panel-content" ref={(el) => { textRefs.current[i] = el; }}>
              <div className="panel-top-row">
                <span className="panel-num" aria-hidden="true">{c.num}</span>
              </div>
              <h3 className="panel-title">{c.title}</h3>
              <div className="panel-tags" aria-label="Temas">
                {c.tags.map((tag, ti) => (
                  <span key={ti} className="panel-tag">{tag}</span>
                ))}
              </div>
              <p className="panel-sub">{c.sub}</p>
            </div>

            {/* Columna visual: capas con gradiente */}
            <div
              className="panel-img-wrap"
              ref={(el) => { imgRefs.current[i] = el; }}
              onMouseEnter={() => handleImgEnter(i)}
              onMouseLeave={() => handleImgLeave(i)}
              aria-hidden="true"
            >
              <div className="panel-img-stack">
                {Array.from({ length: LAYER_COUNT }, (_, layerIdx) => layerIdx).map((layerIdx) => (
                  <div
                    key={layerIdx}
                    className={`panel-img-layer${layerIdx === LAYER_COUNT - 1 ? ' panel-img-layer--top' : ''}`}
                    ref={(el) => {
                      if (!layerRefs.current[i]) layerRefs.current[i] = Array(LAYER_COUNT).fill(null);
                      layerRefs.current[i][layerIdx] = el;
                    }}
                  >
                    <div style={{ width: '100%', height: '100%', background: c.gradient, borderRadius: 4 }} />
                  </div>
                ))}
              </div>
            </div>

            <span className="panel-arrow-ext" ref={(el) => { arrowRefs.current[i] = el; }} aria-hidden="true">↗</span>
          </div>
        ))}
      </div>
    </section>
  );
}
