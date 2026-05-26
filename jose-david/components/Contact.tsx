'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

// Animación de red neuronal con GSAP puro — sin Three.js
function NeuralAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx  = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar resolución
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Nodos de la red neuronal
    const NODES = [
      // Capa entrada
      { x: 0.15, y: 0.25 }, { x: 0.15, y: 0.50 }, { x: 0.15, y: 0.75 },
      // Capa oculta 1
      { x: 0.38, y: 0.18 }, { x: 0.38, y: 0.38 }, { x: 0.38, y: 0.58 }, { x: 0.38, y: 0.78 },
      // Capa oculta 2
      { x: 0.62, y: 0.25 }, { x: 0.62, y: 0.50 }, { x: 0.62, y: 0.75 },
      // Capa salida
      { x: 0.85, y: 0.38 }, { x: 0.85, y: 0.62 },
    ];

    // Conexiones entre capas
    const EDGES = [
      [0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[1,6],[2,4],[2,5],[2,6],
      [3,7],[3,8],[4,7],[4,8],[4,9],[5,8],[5,9],[6,8],[6,9],
      [7,10],[7,11],[8,10],[8,11],[9,10],[9,11],
    ];

    // Estado animado de cada nodo
    const nodeState = NODES.map(() => ({ alpha: 0.15 + Math.random() * 0.5, pulse: Math.random() }));

    // Animar pulsos con GSAP
    nodeState.forEach((n, i) => {
      const tween = gsap.to(n, {
        alpha: 0.7 + Math.random() * 0.3,
        pulse: 1,
        duration: 1.2 + Math.random() * 2.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
      animRef.current.push(tween);
    });

    // Edge state para activación
    const edgeState = EDGES.map(() => ({ alpha: 0.04 + Math.random() * 0.12 }));
    edgeState.forEach((e, i) => {
      const tween = gsap.to(e, {
        alpha: 0.25 + Math.random() * 0.2,
        duration: 0.8 + Math.random() * 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 3,
      });
      animRef.current.push(tween);
    });

    const ACCENT = '129,140,248'; // indigo-400

    // Render loop
    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      // Conexiones
      EDGES.forEach(([a, b], i) => {
        const na = NODES[a];
        const nb = NODES[b];
        const alpha = edgeState[i].alpha;
        ctx.beginPath();
        ctx.moveTo(na.x * W(), na.y * H());
        ctx.lineTo(nb.x * W(), nb.y * H());
        ctx.strokeStyle = `rgba(${ACCENT},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Nodos
      NODES.forEach((n, i) => {
        const { alpha } = nodeState[i];
        const x = n.x * W();
        const y = n.y * H();
        const r = 4.5;

        // Halo glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        gradient.addColorStop(0, `rgba(${ACCENT},${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${ACCENT},0)`);
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT},${alpha})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      animRef.current.forEach(t => t.kill());
      animRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}

// ── Componente Contact ────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    let io: IntersectionObserver | null = null;
    const el = sectionRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });
    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io?.disconnect();
        io = null;
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
      },
      { rootMargin: '-10% 0px 0px 0px' }
    );
    io.observe(el);

    return () => { io?.disconnect(); io = null; };
  }, []);

  const handleContact = () => {
    window.open('mailto:hola@jose-david.com', '_blank');
  };

  return (
    <section ref={sectionRef} className="ct-section" id="contact">
      <div className="ct-card">

        {/* Top bar */}
        <div className="ct-topbar">
          <span className="ct-topbar-label">contacto — josé david</span>
          <div className="ct-dots" aria-hidden="true">
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

        {/* Body */}
        <div className="ct-body">

          {/* Columna izquierda */}
          <div className="ct-left">
            <p className="ct-overline">05 — Contacto</p>
            <h2 className="ct-title">
              Hablemos de tu<br />
              próxima <em>formación.</em>
            </h2>
            <p className="ct-sub">
              Contrataciones, conferencias, formaciones para<br />
              centros educativos o dudas sobre mis cursos.<br />
              Estoy aquí para ayudarte.
            </p>

            <button
              className="ct-btn"
              type="button"
              onClick={handleContact}
              aria-label="Escribir a José David"
            >
              <span className="ct-btn-text">escríbeme&nbsp;→</span>
            </button>

            {/* Links rápidos */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/josedavidperezib/' },
                { label: 'YouTube',  href: 'https://www.youtube.com/@JoseDavidPerezIbanez' },
                { label: 'Instagram',href: 'https://www.instagram.com/josedavidperezib' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.78rem',
                    letterSpacing: '0.06em',
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    opacity: 0.75,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={e => (e.currentTarget.style.opacity = '0.75')}
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Columna derecha — red neuronal GSAP */}
          <div className="ct-canvas">
            <NeuralAnimation />
          </div>

        </div>
      </div>
    </section>
  );
}
