'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger, Draggable);

const WIN_PERFIL = (
  <p>
    Me llamo <span className="syn-accent">José David</span>. Soy{' '}
    <span className="syn-green">Maestro de Primaria</span>,{' '}
    Licenciado en <span className="syn-blue">Psicopedagogía</span> e{' '}
    <span className="syn-green">Ingeniero de Telecomunicación</span>.
    Trabajo desde hace más de{' '}
    <span className="syn-accent">10 años</span> en las aulas y acompañando a centros educativos
    en su transformación digital.
  </p>
);

const WIN_HITOS = (
  <p>
    Premio a la{' '}
    <span className="syn-accent">Innovación Educativa</span>,{' '}
    más de <span className="syn-green">100.000 suscriptores</span> en YouTube
    (Botón de Plata), ayudando a{' '}
    <span className="syn-blue">+17 millones</span> de personas.{' '}
    Soy <span className="syn-accent">Google Certified Innovator</span>,{' '}
    Trainer e Innovator Coach.
  </p>
);

const WIN_REDES = (
  <ol className="os-lines">
    <li>
      <span className="os-ln">1</span>
      <a href="https://www.linkedin.com/in/josedavidperezib/" className="os-link" target="_blank" rel="noopener noreferrer">
        LinkedIn ↗
      </a>
    </li>
    <li>
      <span className="os-ln">2</span>
      <a href="https://www.youtube.com/@JoseDavidPerezIbanez" className="os-link" target="_blank" rel="noopener noreferrer">
        YouTube ↗
      </a>
    </li>
    <li>
      <span className="os-ln">3</span>
      <a href="https://www.instagram.com/josedavidperezib" className="os-link" target="_blank" rel="noopener noreferrer">
        Instagram ↗
      </a>
    </li>
    <li>
      <span className="os-ln">4</span>
      <a href="#podcasts" className="os-link">
        Podcast ↓
      </a>
    </li>
  </ol>
);

const WINDOWS: Array<{
  id      : string;
  title   : string;
  content : React.ReactNode;
  isImage?: boolean;
}> = [
  { id: 'mi-perfil',    title: 'mi-perfil.md',    content: WIN_PERFIL  },
  { id: 'hitos',        title: 'hitos.md',         content: WIN_HITOS   },
  { id: 'foto-jd',      title: 'jose-david.jpg',   content: null, isImage: true },
  { id: 'redes',        title: 'redes-contacto',   content: WIN_REDES   },
];

const NAV = 'var(--nav-sw, 60px)';
const INIT_POS = [
  { top: '20px',  left: `calc(${NAV} + 2%)` },
  { top: '60px',  left: `calc(${NAV} + 42%)` },
  { top: '300px', left: `calc(${NAV} + 58%)` },
  { top: '290px', left: `calc(${NAV} + 4%)` },
];

const TITLE_WORDS = [
  { text: 'Tu',      accent: false },
  { text: 'guía',    accent: false },
  { text: 'en',      accent: false },
  { text: 'educación & IA.', accent: true },
];

const BTN_LABEL = 'conoce mi historia →';

function WaveButton() {
  return (
    <div className="about-os-cta-wrap">
      <a href="#cursos" className="about-os-cta" aria-label="Ver cursos y formaciones">
        {BTN_LABEL.split('').map((ch, i) => (
          <span key={i} className="wave-char" aria-hidden="true" style={{ animationDelay: `${i * 0.045}s` }}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </a>
    </div>
  );
}

export default function AboutJD() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const winRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const zCount     = useRef(10);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const scrollViewport = document.querySelector<HTMLElement>('.scroll-viewport');

    const ctx = gsap.context(() => {
      gsap.from('.about-word-inner', {
        y: '115%', duration: 0.8, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, scroller: scrollViewport, start: 'top 82%', once: true },
      });

      const windowEls = winRefs.current.filter((el): el is HTMLDivElement => el !== null);

      gsap.fromTo(
        windowEls,
        { scale: 0.6, opacity: 0, transformOrigin: 'center center' },
        {
          scale: 1, opacity: 1, transformOrigin: 'center center',
          duration: 1.1, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, scroller: scrollViewport, start: 'top 70%', once: true },
          onComplete() {
            gsap.set(windowEls, { clearProps: 'transform,transformOrigin,scale,opacity' });
          },
        }
      );
    }, sectionRef);

    const draggables = winRefs.current
      .filter((el): el is HTMLDivElement => el !== null)
      .flatMap((el) =>
        Draggable.create(el, {
          type: 'top,left',
          edgeResistance: 0.65,
          allowNativeTouchScrolling: true,
          onPress() {
            zCount.current += 1;
            (this.target as HTMLElement).style.zIndex = String(zCount.current);
          },
          onDragStart() { (this.target as HTMLElement).style.cursor = 'grabbing'; },
          onDragEnd()   { (this.target as HTMLElement).style.cursor = ''; },
        })
      );

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
      draggables.forEach((d) => d.kill());
    };
  }, []);

  return (
    <section className="about-os" id="about" ref={sectionRef}>
      <div className="about-os-header">
        <p className="about-os-overline">02 — Sobre mí</p>
        <h2 className="about-os-title" ref={titleRef} aria-label="Tu guía en educación & IA.">
          {TITLE_WORDS.map(({ text, accent }, i) => (
            <span key={i} className="about-word-wrap" aria-hidden="true">
              {accent
                ? <em className="about-word-inner">{text}</em>
                : <span className="about-word-inner">{text}</span>}
            </span>
          ))}
        </h2>
      </div>

      <div className="about-os-stage">
        {WINDOWS.map(({ id, title, content, isImage }, i) => (
          <div
            key={id}
            ref={(el) => { winRefs.current[i] = el; }}
            className={`os-window os-window--${id}`}
            style={{ top: INIT_POS[i].top, left: INIT_POS[i].left, zIndex: 10 + i }}
          >
            <div className="os-glass" aria-hidden="true" />
            <div className="os-titlebar">
              <span className="os-wintitle">{title}</span>
              <div className="os-dots" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="1.5" y1="6" x2="10.5" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="os-body">
              {isImage ? (
                <div className="os-photo-wrap">
                  <Image
                    src="/fondo-josedavid.png"
                    alt="José David Pérez Ibáñez"
                    fill
                    sizes="(max-width: 768px) 70vw, 280px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority={false}
                  />
                </div>
              ) : (
                content
              )}
            </div>
          </div>
        ))}
      </div>

      <WaveButton />
    </section>
  );
}
