'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

// ── Datos ──────────────────────────────────────────────────────────────────────
const CURSOS = [
  {
    num  : '01',
    title: 'ProfeLibre',
    year : '2023',
    tags : ['negocio educativo', 'monetización', 'creador'],
    img  : '/FOTOS_JD_FORMACI%C3%93N/Copia%20de%20Captura_C2183_1.1.11.jpg',
    href : 'https://jose-david.com',
  },
  {
    num  : '02',
    title: 'Evaluación con IA',
    year : '2023',
    tags : ['evaluación', 'inteligencia artificial', 'feedback'],
    img  : '/FOTOS_JD_FORMACI%C3%93N/Copia%20de%20Captura_C2183_1.1.14.jpg',
    href : 'https://jose-david.com',
  },
  {
    num  : '03',
    title: 'ChatGPT para Docentes',
    year : '2023',
    tags : ['ChatGPT', 'IA generativa', 'planificación'],
    img  : '/FOTOS_JD_FORMACI%C3%93N/Copia%20de%20Captura_C2184_1.2.17.jpg',
    href : 'https://jose-david.com',
  },
  {
    num  : '04',
    title: 'Situaciones de Aprendizaje',
    year : '2024',
    tags : ['situaciones de aprendizaje', 'ABP', 'metodología'],
    img  : '/FOTOS_JD_FORMACI%C3%93N/Copia%20de%20Captura_C2184_1.2.24.jpg',
    href : 'https://jose-david.com',
  },
  {
    num  : '05',
    title: 'Netflix de Docentes',
    year : '2024',
    tags  : ['formación continua', 'on-demand', 'suscripción'],
    img  : '/FOTOS_JD_FORMACI%C3%93N/Copia%20de%20Captura_C2185_1.3.13.jpg',
    href : 'https://jose-david.com',
  },
  {
    num  : '06',
    title: 'Libera Completo',
    year : '2024',
    tags : ['productividad', 'automatización', 'bienestar'],
    img  : '/FOTOS_JD_FORMACI%C3%93N/Copia%20de%20Captura_C2185_1.3.20.jpg',
    href : 'https://jose-david.com',
  },
  {
    num  : '07',
    title: 'LibroForum',
    year : '2024',
    tags : ['lectura', 'comunidad', 'reflexión'],
    img  : '/FOTOS_JD_FORMACI%C3%93N/Copia%20de%20Captura_C2186_1.4.22.jpg',
    href : 'https://jose-david.com',
  },
] as const;

// ── Fila de curso ──────────────────────────────────────────────────────────────
interface RowProps {
  c      : typeof CURSOS[number];
  i      : number;
  onEnter: (i: number) => void;
  onLeave: (i: number) => void;
  onMove : (e: React.MouseEvent, i: number) => void;
  rowRef : (el: HTMLAnchorElement | null) => void;
}

function CursoRow({ c, i, onEnter, onLeave, onMove, rowRef }: RowProps) {
  return (
    <a
      href={c.href}
      className="cr-row"
      ref={rowRef}
      onMouseEnter={() => onEnter(i)}
      onMouseLeave={() => onLeave(i)}
      onMouseMove={(e) => onMove(e, i)}
      aria-label={`Ver formación ${c.title}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="cr-num" aria-hidden="true">{c.num}</span>

      <span className="cr-title">{c.title}</span>

      <span className="cr-tags" aria-label="Temas">
        {c.tags.map((tag, ti) => (
          <span key={ti} className="cr-tag">{tag}</span>
        ))}
      </span>

      <span className="cr-year" aria-hidden="true">{c.year}</span>

      <span className="cr-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

// ── Componente principal ───────────────────────────────────────────────────────
export default function Cursos() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cursorRef   = useRef<HTMLDivElement>(null);
  const rowRefs     = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeIdx   = useRef<number>(-1);
  const rafId       = useRef<number>(0);
  const targetPos   = useRef({ x: 0, y: 0 });
  const currentPos  = useRef({ x: 0, y: 0 });

  // ── Lerp cursor ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.12);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.12);
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // ── Eventos cursor ───────────────────────────────────────────────────────────
  const handleEnter = useCallback((i: number) => {
    activeIdx.current = i;
    const el = cursorRef.current;
    if (!el) return;
    el.style.backgroundImage = `url("${CURSOS[i].img}")`;
    gsap.killTweensOf(el);
    gsap.to(el, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' });

    // Subrayado de la fila
    const row = rowRefs.current[i];
    if (row) gsap.to(row, { '--cr-line': '100%', duration: 0.55, ease: 'power2.out' });
  }, []);

  const handleLeave = useCallback((i: number) => {
    activeIdx.current = -1;
    const el = cursorRef.current;
    if (el) {
      gsap.killTweensOf(el);
      gsap.to(el, { opacity: 0, scale: 0.82, duration: 0.35, ease: 'power2.in' });
    }
    const row = rowRefs.current[i];
    if (row) gsap.to(row, { '--cr-line': '0%', duration: 0.4, ease: 'power2.out' });
  }, []);

  const handleMove = useCallback((e: React.MouseEvent, _i: number) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Offset so image appears slightly right and up from cursor
    targetPos.current = {
      x: e.clientX - rect.left + 24,
      y: e.clientY - rect.top  - 140,
    };
  }, []);

  // ── Scroll animations ────────────────────────────────────────────────────────
  useIsomorphicLayoutEffect(() => {
    const sv = document.querySelector<HTMLElement>('.scroll-viewport');
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.timeline({
        scrollTrigger: {
          trigger: '.cr-header',
          scroller: sv,
          start: 'top 80%',
          once: true,
        },
      })
        .from('.cr-overline', { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' })
        .from('.cr-title-wrap .reveal-inner', { y: '110%', duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .from('.cr-subtitle', { opacity: 0, y: 8, duration: 0.5, ease: 'power2.out' }, '-=0.35');

      // Row stagger
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.from(row, {
          opacity: 0,
          y: 18,
          duration: 0.55,
          delay: i * 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            scroller: sv,
            start: 'top 90%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section className="cr-section" id="cursos" ref={sectionRef}>

      {/* ── Cabecera ── */}
      <header className="cr-header">
        <p className="cr-overline">03 — Cursos &amp; Formaciones</p>
        <h2 className="cr-title-wrap">
          <span className="reveal-wrap">
            <span className="reveal-inner">Lo que <em>enseño</em></span>
          </span>
        </h2>
        <p className="cr-subtitle">
          Práctica, directa y aplicable desde el primer día.
        </p>
      </header>

      {/* ── Lista editorial ── */}
      <div className="cr-list" role="list">
        {CURSOS.map((c, i) => (
          <CursoRow
            key={c.num}
            c={c}
            i={i}
            onEnter={handleEnter}
            onLeave={handleLeave}
            onMove={handleMove}
            rowRef={(el) => { rowRefs.current[i] = el; }}
          />
        ))}
      </div>

      {/* ── Imagen flotante que sigue el cursor (solo desktop) ── */}
      <div
        ref={cursorRef}
        className="cr-cursor-img"
        aria-hidden="true"
        style={{ opacity: 0, scale: 0.82 } as React.CSSProperties}
      />

    </section>
  );
}
