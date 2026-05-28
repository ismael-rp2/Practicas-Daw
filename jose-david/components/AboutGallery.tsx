'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

// ── Tipos ──────────────────────────────────────────────────────────────────────
interface Chapter {
  num    : string;
  label  : string;
  period : string;
  body   : string;
  src    : string;
}

// ── Datos ──────────────────────────────────────────────────────────────────────
const CHAPTERS: Chapter[] = [
  {
    num   : '01',
    label : 'Ingeniería & ESA',
    period: '2008 — 2014',
    body  : 'Comencé como Ingeniero de Telecomunicación trabajando con IA desde 2008, colaborando con la Agencia Espacial Europea y la ONU antes de encontrar mi vocación en la educación.',
    src   : '/FOTOS_JD_PONENCIA/_DSC5555.jpg',
  },
  {
    num   : '02',
    label : 'Premio Innovación Educativa',
    period: '2019',
    body  : 'Galardonado con el Premio Nacional de Innovación Educativa 2019 en la categoría de formación e implicación del profesorado.',
    src   : '/FOTOS_JD_PASADO/Premio-Nacional-Innovacion-Educativa-2019.webp',
  },
  {
    num   : '03',
    label : 'Google Certified Innovator',
    period: '2020 — hoy',
    body  : 'Certificado como Google Innovator, Trainer e Innovator Coach. Formé a más de 500 centros y 17.000 docentes en toda España.',
    src   : '/FOTOS_JD_FORMACI%C3%93N/Copia%20de%20Captura_C2183_1.1.14.jpg',
  },
  {
    num   : '04',
    label : 'YouTube · +160K',
    period: '2024',
    body  : 'Más de 160.000 suscriptores y 15 millones de personas impactadas a través de contenido sobre IA y educación en español.',
    src   : '/FOTOS_JD_PASADO/YOUTUBE_100K_JD.jpeg',
  },
];

// ── Bridge post-galería ────────────────────────────────────────────────────────
const KEYWORDS = [
  'Educación & IA', 'Google Innovator', 'Formación Docente', 'YouTube +160K',
  'Telecomunicaciones', 'ChatGPT', 'Innovación Educativa', 'ESA', 'ONU',
  'Cursos Online', 'Ponencias', 'ProfeLibre',
];

const STATS = [
  { prefix: '+', target: 17,  suffix: 'K', label: 'Docentes formados'   },
  { prefix: '+', target: 500, suffix: '',  label: 'Centros educativos'   },
  { prefix: '',  target: 15,  suffix: 'M', label: 'Personas impactadas'  },
] as const;

function AgBridge() {
  const bridgeRef = useRef<HTMLElement>(null);
  const numRefs   = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = bridgeRef.current;
    if (!section) return;

    let done    = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let registeredLenis: any = null;
    let scrollHandler: (() => void) | null = null;

    const runAnimation = () => {
      if (done) return;
      done = true;

      // Fade-up de los bloques de estadística (uno tras otro)
      const stats = section.querySelectorAll<HTMLElement>('.agb-stat');
      stats.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, delay: i * 0.18, ease: 'power2.out' }
        );
      });

      // Count-up: cada número de 0 al valor final
      STATS.forEach(({ target }, i) => {
        const numEl = numRefs.current[i];
        if (!numEl) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v        : target,
          duration : 2.0,
          delay    : i * 0.18 + 0.15,
          ease     : 'power2.out',
          onUpdate  () { numEl.textContent = String(Math.floor(obj.v)); },
          onComplete() { numEl.textContent = String(target); },
        });
      });
    };

    // Devuelve true cuando la sección es suficientemente visible en pantalla
    const checkVisible = () => {
      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;
      return rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
    };

    // Registra el handler de scroll sobre Lenis.
    // eslint-disable-next-line @typescript-eslint/ban-types
    const attachToLenis = (lenis: { on: Function; off: Function }) => {
      registeredLenis = lenis;
      scrollHandler   = () => {
        if (checkVisible()) {
          lenis.off('scroll', scrollHandler!);
          runAnimation();
        }
      };
      lenis.on('scroll', scrollHandler);
      // Comprueba estado inicial por si ya se hizo scroll hasta aquí
      if (checkVisible()) {
        lenis.off('scroll', scrollHandler);
        runAnimation();
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingLenis = (window as any).lenis;
    if (existingLenis && typeof existingLenis.on === 'function') {
      // Lenis ya está listo (ej: Fast Refresh sin recarga de página)
      attachToLenis(existingLenis);
    } else {
      // Esperar al evento que SmoothScrollProvider dispara cuando Lenis está listo
      const onReady = (e: Event) => {
        window.removeEventListener('lenisReady', onReady);
        attachToLenis((e as CustomEvent).detail);
      };
      window.addEventListener('lenisReady', onReady);
      // Guardar referencia para poder limpiar si el componente se desmonta antes
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (section as any).__lenisReadyCleanup = () => window.removeEventListener('lenisReady', onReady);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cleanup = (section as any).__lenisReadyCleanup;
      if (cleanup) { cleanup(); delete (section as any).__lenisReadyCleanup; }
      if (registeredLenis && scrollHandler) {
        registeredLenis.off('scroll', scrollHandler);
      }
    };
  }, []);

  return (
    <section ref={bridgeRef} className="ag-bridge" aria-hidden="true">

      {/* Cita editorial */}
      <div className="ag-bridge-quote">
        <blockquote>
          "La tecnología no reemplaza al docente;<br />
          lo <em>libera</em> para lo que importa de verdad."
        </blockquote>
        <cite className="ag-bridge-cite">— José David</cite>
      </div>

      {/* Marquee de palabras clave */}
      <div className="ag-bridge-ticker">
        <div className="ag-bridge-ticker-track">
          {[...KEYWORDS, ...KEYWORDS].map((kw, i) => (
            <span key={i} className="ag-bridge-ticker-item">
              {kw}
              <span className="ag-bridge-ticker-sep" aria-hidden="true"> ✦ </span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats — centradas, responsive, con count-up */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0"
        style={{ padding: '3.5rem calc(4vw + var(--nav-sw, 60px))' }}
      >
        {STATS.map(({ prefix, suffix, label }, i) => (
          <div
            key={i}
            className={[
              'agb-stat flex flex-col items-center text-center gap-2',
              i < STATS.length - 1
                ? 'md:border-r md:border-white/10 md:pr-10'
                : '',
              i > 0 ? 'md:pl-10' : '',
              i > 0 ? 'border-t border-white/10 pt-8 md:border-t-0 md:pt-0' : '',
            ].join(' ')}
          >
            <span
              style={{
                fontFamily   : 'var(--serif)',
                fontSize     : 'clamp(2.4rem, 4.5vw, 4rem)',
                fontWeight   : 200,
                lineHeight   : 1,
                letterSpacing: '-0.03em',
                color        : 'var(--fg)',
              }}
            >
              {prefix}
              <span ref={el => { numRefs.current[i] = el; }}>0</span>
              <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>{suffix}</em>
            </span>
            <span
              style={{
                fontSize     : '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color        : 'var(--muted)',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

// ── Componente ─────────────────────────────────────────────────────────────────
export default function AboutGallery() {
  // ── Refs
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const periodRef  = useRef<HTMLParagraphElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const cellRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const prevChRef  = useRef<number>(-1);

  // ── Estado mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Transición de capítulo — DOM puro, sin re-renders ─────────────────────
  const activateChapter = useCallback((index: number) => {
    if (index === prevChRef.current) return;
    prevChRef.current = index;
    const ch   = CHAPTERS[index];
    const DI   = 0.22; // duration in
    const DO   = 0.34; // duration out
    const EIN  = 'power2.in';
    const EOUT = 'power3.out';

    // Contador numérico: roll hacia arriba
    const ctr = counterRef.current;
    if (ctr) {
      gsap.to(ctr, {
        y: -14, opacity: 0, duration: DI, ease: EIN,
        onComplete: () => {
          if (!counterRef.current) return;
          counterRef.current.textContent = ch.num;
          gsap.fromTo(counterRef.current,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: DO, ease: EOUT }
          );
        },
      });
    }

    // Textos del capítulo
    const texts: [{ current: HTMLParagraphElement | null }, string][] = [
      [labelRef,  ch.label],
      [periodRef, ch.period],
      [bodyRef,   ch.body],
    ];
    texts.forEach(([ref, text], i) => {
      const el = ref.current;
      if (!el) return;
      gsap.to(el, {
        opacity: 0, y: -5, duration: DI, delay: i * 0.04, ease: EIN,
        onComplete: () => {
          el.textContent = text;
          gsap.fromTo(el,
            { opacity: 0, y: 5 },
            { opacity: 1, y: 0, duration: DO, ease: EOUT }
          );
        },
      });
    });

    // Celdas de la cuadrícula
    cellRefs.current.forEach((cell, i) => {
      if (!cell) return;
      const active = i === index;
      gsap.to(cell, {
        opacity : active ? 1 : 0.22,
        scale   : active ? 1 : 0.965,
        duration: 0.65,
        ease    : 'power2.inOut',
      });
      const img = cell.querySelector<HTMLImageElement>('img');
      if (img) {
        gsap.to(img, {
          filter: active
            ? 'grayscale(0%) saturate(110%) brightness(1.04)'
            : 'grayscale(72%) saturate(55%) brightness(0.82)',
          duration: 0.65,
          ease: 'power2.inOut',
        });
      }
    });

    // Puntos de progreso
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        scaleX  : i === index ? 3.2 : 1,
        opacity : i === index ? 1 : 0.25,
        duration: 0.32,
        ease    : 'power2.out',
      });
    });
  }, []);

  // ── GSAP — solo desktop ────────────────────────────────────────────────────
  useIsomorphicLayoutEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const sv = document.querySelector<HTMLElement>('.scroll-viewport');

    // Estado inicial
    prevChRef.current = -1;
    activateChapter(0);

    const ctx = gsap.context(() => {
      // Fade-in de entrada
      gsap.from('.ag-sticky', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger : sectionRef.current,
          scroller: sv,
          start   : 'top 88%',
          end     : 'top 25%',
          scrub   : 1.8,
        },
      });

      // Pin principal — 4 capítulos × 100vh
      ScrollTrigger.create({
        trigger   : sectionRef.current,
        scroller  : sv,
        start     : 'top top',
        end       : '+=300%',
        pin       : true,
        pinSpacing: true,
        scrub     : 1.2,
        onUpdate(self) {
          const idx = Math.min(
            CHAPTERS.length - 1,
            Math.floor(self.progress * CHAPTERS.length + 0.001)
          );
          activateChapter(idx);
        },
      });
    }, sectionRef);

    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, [isMobile, activateChapter]);

  // ── Mobile: Carrusel horizontal ───────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <section className="ag-mobile" id="about">
          <header className="ag-mobile-header">
            <p className="ag-overline">02 — Sobre mí</p>
            <h2 className="ag-mobile-title">
              Mi <em>trayectoria</em>
            </h2>
            <p className="ag-mobile-hint" aria-hidden="true">desliza →</p>
          </header>

          <div className="ag-carousel" role="list" aria-label="Capítulos de carrera">
            {CHAPTERS.map((ch, i) => (
              <article key={i} className="ag-slide" role="listitem">
                <div className="ag-slide-img">
                  <Image
                    src={ch.src}
                    alt={ch.label}
                    fill
                    sizes="85vw"
                    style={{ objectFit: 'cover', objectPosition: i === 2 ? 'center 15%' : 'center center' }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="ag-slide-info">
                  <span className="ag-slide-num">{ch.num}</span>
                  <p className="ag-slide-label">{ch.label}</p>
                  <p className="ag-slide-period">{ch.period}</p>
                  <p className="ag-slide-body">{ch.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <AgBridge />
      </>
    );
  }

  // ── Desktop: Sticky Grid ──────────────────────────────────────────────────
  return (
    <>
    <section ref={sectionRef} className="ag-section" id="about">
      <div className="ag-sticky">

        {/* ── Panel izquierdo ── */}
        <aside className="ag-left">
          <p className="ag-overline">02 — Sobre mí</p>

          {/* Contador animado */}
          <div className="ag-counter-row" aria-hidden="true">
            <span className="ag-counter" ref={counterRef}>{CHAPTERS[0].num}</span>
            <span className="ag-counter-total">
              /{String(CHAPTERS.length).padStart(2, '0')}
            </span>
          </div>

          {/* Textos del capítulo */}
          <div className="ag-textblock">
            <p className="ag-ch-label"  ref={labelRef}>{CHAPTERS[0].label}</p>
            <p className="ag-ch-period" ref={periodRef}>{CHAPTERS[0].period}</p>
            <p className="ag-ch-body"   ref={bodyRef}>{CHAPTERS[0].body}</p>
          </div>

          {/* Indicador de progreso */}
          <div className="ag-dots" aria-hidden="true">
            {CHAPTERS.map((_, i) => (
              <span
                key={i}
                className="ag-dot"
                ref={el => { dotRefs.current[i] = el; }}
                style={{
                  opacity       : i === 0 ? 1 : 0.25,
                  transformOrigin: 'left center',
                }}
              />
            ))}
          </div>

          <a href="#cursos" className="ag-cta">Ver formaciones →</a>
        </aside>

        {/* ── Panel derecho — cuadrícula 2×2 ── */}
        <div className="ag-grid">
          {CHAPTERS.map((ch, i) => (
            <div
              key={i}
              className="ag-cell"
              ref={el => { cellRefs.current[i] = el; }}
              style={{ opacity: i === 0 ? 1 : 0.22 }}
            >
              <Image
                src={ch.src}
                alt={ch.label}
                fill
                sizes="(max-width: 1200px) 30vw, 25vw"
                style={{
                  objectFit    : 'cover',
                  objectPosition: i === 2 ? 'center 15%' : 'center center',
                  filter: i === 0
                    ? 'grayscale(0%) saturate(110%)'
                    : 'grayscale(72%) saturate(55%) brightness(0.82)',
                }}
                priority={i === 0}
              />
              {/* Degradado sutil en la parte inferior */}
              <div className="ag-cell-overlay" aria-hidden="true" />
              {/* Número del capítulo en esquina */}
              <span className="ag-cell-badge" aria-hidden="true">{ch.num}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
    <AgBridge />
    </>
  );
}
