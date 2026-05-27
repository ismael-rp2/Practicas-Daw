'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger, Draggable);

// Posiciones desktop y mobile
const INIT_POS_DESKTOP = [
  { top: '20px',  left: '2%'  },
  { top: '60px',  left: '42%' },
  { top: '300px', left: '55%' },
  { top: '290px', left: '4%'  },
];

const INIT_POS_MOBILE = [
  { top: '10px',  left: '2%' },
  { top: '220px', left: '4%' },
  { top: '440px', left: '2%' },
  { top: '700px', left: '4%' },
];

const WIN_PERFIL = (
  <p>
    Soy <span className="syn-accent">José David</span>. Trabajo con{' '}
    <span className="syn-green">IA desde 2008</span> como Ingeniero —
    también en la <span className="syn-blue">Agencia Espacial Europea</span>.
    Soy <span className="syn-green">Maestro de Primaria</span>,{' '}
    Psicopedagogo e Ingeniero de Telecomunicación, con Máster en{' '}
    <span className="syn-accent">Lenguajes y Sistemas Informáticos</span>{' '}
    y en Orientación Educativa.
    Llevo <span className="syn-green">+12 años</span> formando docentes
    y he trabajado también con la <span className="syn-blue">ONU</span>.
  </p>
);

const WIN_HITOS = (
  <p>
    Premio <span className="syn-accent">Innovación Educativa 2019</span>.{' '}
    <span className="syn-green">+160.000</span> suscriptores YouTube (IA)
    y <span className="syn-green">7.000</span> (EDU).
    Mis vídeos han ayudado a{' '}
    <span className="syn-blue">+17 millones</span> de personas.{' '}
    <span className="syn-accent">Google Certified Innovator</span>,
    Trainer e Innovator Coach.{' '}
    He formado a <span className="syn-green">+500 centros</span> y{' '}
    <span className="syn-blue">17.000 docentes</span>.
  </p>
);

const WIN_REDES = (
  <ol className="os-lines">
    <li>
      <span className="os-ln">1</span>
      <a href="https://jose-david.com" className="os-link" target="_blank" rel="noopener noreferrer">
        jose-david.com ↗
      </a>
    </li>
    <li>
      <span className="os-ln">2</span>
      <a href="https://www.linkedin.com/in/jose-david-perez-ibanez/" className="os-link" target="_blank" rel="noopener noreferrer">
        LinkedIn ↗
      </a>
    </li>
    <li>
      <span className="os-ln">3</span>
      <a href="https://www.youtube.com/@jose-david" className="os-link" target="_blank" rel="noopener noreferrer">
        YouTube ↗
      </a>
    </li>
    <li>
      <span className="os-ln">4</span>
      <a href="https://www.instagram.com/joseda.education" className="os-link" target="_blank" rel="noopener noreferrer">
        Instagram ↗
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
  const stageRef   = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const winRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const zCount     = useRef(10);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const scrollViewport = document.querySelector<HTMLElement>('.scroll-viewport');
    const isMobile = window.innerWidth < 640;
    const INIT_POS = isMobile ? INIT_POS_MOBILE : INIT_POS_DESKTOP;

    // Resetear posiciones siempre al cargar / recargar
    winRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { top: INIT_POS[i].top, left: INIT_POS[i].left, x: 0, y: 0, clearProps: 'transform' });
    });

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

    // En móvil no activar dragging (scroll táctil tiene prioridad)
    const draggables = isMobile ? [] : winRefs.current
      .filter((el): el is HTMLDivElement => el !== null)
      .flatMap((el) =>
        Draggable.create(el, {
          type       : 'top,left',
          bounds     : stageRef.current ?? undefined,
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

      <div className="about-os-stage" ref={stageRef}>
        {WINDOWS.map(({ id, title, content, isImage }, i) => (
          <div
            key={id}
            ref={(el) => { winRefs.current[i] = el; }}
            className={`os-window os-window--${id}`}
            style={{ top: INIT_POS_DESKTOP[i].top, left: INIT_POS_DESKTOP[i].left, zIndex: 10 + i }}
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
                    src="/jose-david.jpg"
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
