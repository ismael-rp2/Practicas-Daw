'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';
import dynamic from 'next/dynamic';

const WaveformScene = dynamic(() => import('./WaveformScene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const PODCASTS = [
  {
    id     : 1,
    num    : '01',
    name   : 'Tribu de Profes',
    sector : 'Educación · Comunidad',
    summary: 'El pódcast donde docentes comprometidos comparten experiencias, recursos y estrategias para transformar la educación desde dentro del aula.',
    href   : 'https://open.spotify.com/show/1uzkIrSrMjSHxwkC1odyLG?si=66430aedc1b444d3&nd=1&dlsi=c9023e8e81e248c5',
    color  : '#818cf8',
  },
  {
    id     : 2,
    num    : '02',
    name   : '¡Vamos a clase!',
    sector : 'Educación · Diario · 5-10 min',
    summary: 'Un pódcast diario de 5 a 10 minutos con un recurso, herramienta o aprendizaje concreto que puedes aplicar en clase hoy mismo.',
    href   : '',
    color  : '#34d399',
  },
  {
    id     : 3,
    num    : '03',
    name   : 'Google Edu Podcast',
    sector : 'Tecnología Educativa · Google',
    summary: 'Exploramos cómo las herramientas de Google pueden transformar la enseñanza y el aprendizaje, con casos reales y docentes innovadores.',
    href   : 'https://www.spreaker.com/podcast/google-edu-podcast--3612948',
    color  : '#60a5fa',
  },
  {
    id     : 4,
    num    : '04',
    name   : 'LEOcuentos',
    sector : 'Cuentos · Infantil · Lectura',
    summary: 'Cuentos narrados para fomentar el amor por la lectura en los más pequeños. Una experiencia auditiva para imaginar y aprender.',
    href   : 'https://leocuentos.es/blog',
    color  : '#f59e0b',
  },
  {
    id     : 5,
    num    : '05',
    name   : 'Intercepta2',
    sector : 'Educación · Tecnología',
    summary: 'Conversaciones sobre tecnología e innovación educativa desde una perspectiva crítica y transformadora.',
    href   : 'https://www.spreaker.com/podcast/intercepta2--5149407',
    color  : '#f472b6',
  },
  {
    id     : 6,
    num    : '06',
    name   : 'Innovación Educativa',
    sector : 'Innovación · Pedagogía',
    summary: 'Ideas, proyectos y experiencias de innovación educativa para renovar la práctica docente y mejorar el aprendizaje en el aula.',
    href   : 'https://www.spreaker.com/podcast/innovacion-educativa--3691253',
    color  : '#a78bfa',
  },
] as const;

export default function Podcasts() {
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const rowRefs     = useRef<(HTMLAnchorElement | null)[]>([]);
  const waveProgress = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const scrollViewport = document.querySelector<HTMLElement>('.scroll-viewport');

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.timeline({
        scrollTrigger: { trigger: titleRef.current, scroller: scrollViewport, start: 'top 80%', once: true },
      })
        .from('.pod-overline', { opacity: 0, y: 14, duration: 0.55, ease: 'power2.out' })
        .from('.pod-title .reveal-inner', { y: '110%', duration: 0.9, ease: 'power3.out' }, '-=0.25')
        .from('.pod-sub', { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.4');

      // Row entrance — slide in from left, staggered as each row enters viewport
      rowRefs.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { x: -80, opacity: 0 },
          {
            x: 0, opacity: row.classList.contains('p-row--soon') ? 0.45 : 1,
            duration: 0.75, ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              scroller: scrollViewport,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

      // Waveform dissolution progress
      ScrollTrigger.create({
        trigger: sectionRef.current,
        scroller: scrollViewport,
        start: 'top 60%',
        end: 'bottom 10%',
        onUpdate: (self) => { waveProgress.current = self.progress; },
      });

    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  // Hover: name slide + meta slide (mirrors Work behavior)
  const handleEnter = (i: number) => {
    const row = rowRefs.current[i];
    if (!row) return;
    const name = row.querySelector<HTMLElement>('.p-name');
    const meta = row.querySelector<HTMLElement>('.p-row-meta');
    if (name) gsap.to(name, { x: -10, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    if (meta) gsap.to(meta, { x:  10, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
  };

  const handleLeave = (i: number) => {
    const row = rowRefs.current[i];
    if (!row) return;
    const name = row.querySelector<HTMLElement>('.p-name');
    const meta = row.querySelector<HTMLElement>('.p-row-meta');
    if (name) gsap.to(name, { x: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    if (meta) gsap.to(meta, { x: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  };

  return (
    <section className="portfolio" id="podcasts" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <WaveformScene progressRef={waveProgress} />

      {/* Header */}
      <div className="portfolio-header" ref={titleRef}>
        <div>
          <p className="portfolio-overline pod-overline">04 — Podcasts</p>
          <h2 className="portfolio-title pod-title">
            <span className="reveal-wrap">
              <span className="reveal-inner">Mi voz <em>digital</em></span>
            </span>
          </h2>
        </div>
        <p className="portfolio-sub pod-sub">
          Cuatro proyectos de audio para aprender, reflexionar y crecer como docente.
          Escúchalos donde quieras, cuando quieras.
        </p>
      </div>

      {/* List */}
      <div className="portfolio-list">
        {PODCASTS.map((pod, i) => (
          <a
            key={pod.id}
            href={pod.href || undefined}
            className={`p-row${!pod.href ? ' p-row--soon' : ''}`}
            ref={(el) => { rowRefs.current[i] = el; }}
            target={pod.href ? '_blank' : undefined}
            rel={pod.href ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            aria-label={pod.href ? `Escuchar ${pod.name}` : `${pod.name} — próximamente`}
          >
            {/* Indicator dot + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 8, height: 8,
                  borderRadius: '50%',
                  background: pod.color,
                  boxShadow: `0 0 8px ${pod.color}`,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span className="p-name" style={{ color: 'var(--text)' }}>{pod.name}</span>
            </div>

            {/* Meta */}
            <div className="p-row-meta">
              <span className="p-sector" style={{ color: pod.color }}>{pod.sector}</span>
              <span className="p-summary">{pod.summary}</span>
            </div>

            {/* Number */}
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.18)', userSelect: 'none', flexShrink: 0 }} aria-hidden="true">
              {pod.num}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
