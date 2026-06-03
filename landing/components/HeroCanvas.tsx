'use client';

// ─────────────────────────────────────────────────────────────────────────────
// HeroCanvas — red neuronal animada con Canvas HTML5
//
// Arquitectura:
//   · N partículas flotando con velocidad aleatoria suave.
//   · Cada frame se calculan todas las distancias entre pares de nodos O(n²);
//     si la distancia es < MAX_DIST se dibuja una línea translúcida cuya
//     opacidad es proporcional a la cercanía.
//   · El cursor actúa como nodo "fantasma" con radio de influencia propio.
//   · Toda la lógica vive en un useEffect que devuelve cleanup completo
//     (cancelAnimationFrame + removeEventListener) para evitar memory leaks.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';

// ── Tipos ────────────────────────────────────────────────────────────────────

interface Particle {
  x      : number;
  y      : number;
  vx     : number;   // velocidad en píxeles/frame, eje X
  vy     : number;   // velocidad en píxeles/frame, eje Y
  radius : number;   // radio visual del nodo
  color  : string;   // color CSS del nodo
}

// ── Constantes de diseño ─────────────────────────────────────────────────────

const NODE_COUNT     = 90;   // número de partículas
const MAX_DIST       = 150;  // px — distancia máxima para dibujar conexión entre nodos
const MOUSE_DIST     = 190;  // px — radio de influencia del cursor
const SPEED          = 0.35; // px/frame máximo por eje

/** Paleta cian + violeta — se asigna aleatoriamente a cada nodo */
const PALETTE: string[] = [
  '#00D4FF', // cian brillante
  '#22D3EE', // cian cielo
  '#06B6D4', // teal-cian
  '#00FFFF', // cian puro
  '#7C3AED', // violeta profundo
  '#8B5CF6', // violeta medio
  '#A78BFA', // lavanda
  '#C084FC', // púrpura claro
];

// ─────────────────────────────────────────────────────────────────────────────

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Estado mutable interno — sin setState para no disparar re-renders
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let rafId = 0;

    // Posición del ratón — fuera del canvas por defecto
    const mouse = { x: -9999, y: -9999 };

    // ── Inicialización ─────────────────────────────────────────────────────
    function init(): void {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;

      particles = Array.from({ length: NODE_COUNT }, (): Particle => ({
        x     : Math.random() * W,
        y     : Math.random() * H,
        vx    : (Math.random() - 0.5) * SPEED * 2,
        vy    : (Math.random() - 0.5) * SPEED * 2,
        radius: Math.random() * 2 + 1.5,           // 1.5 – 3.5 px
        color : PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }));
    }

    // ── Bucle de renderizado ───────────────────────────────────────────────
    function draw(): void {

      // 1 · Fondo: gradiente diagonal carbón → violeta muy oscuro
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   '#0A0A0A');   // negro carbón (--bg-primary)
      bg.addColorStop(0.5, '#0C0A18');   // transición sutil
      bg.addColorStop(1,   '#0F0A1F');   // violeta-negro profundo
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 2 · Actualizar posición de cada partícula y rebotar en los bordes
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      // 3 · Dibujar conexiones entre nodos cercanos ────────────────────────
      //
      //   Distancia euclidiana entre dos puntos (x₁,y₁) y (x₂,y₂):
      //     d = √( (x₂−x₁)² + (y₂−y₁)² )
      //
      //   Optimización: comparamos d² < MAX_DIST² antes de la raíz cuadrada
      //   para descartar pares lejanos sin coste de sqrt.
      //
      //   Opacidad lineal: α = (1 − d/MAX_DIST) × 0.55
      //   → d=0   ⟹ α=0.55 (máxima visibilidad)
      //   → d=MAX ⟹ α=0    (invisible)

      const maxDistSq = MAX_DIST * MAX_DIST;

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const pj  = particles[j];
          const dx  = pj.x - pi.x;
          const dy  = pj.y - pi.y;
          const dSq = dx * dx + dy * dy; // distancia al cuadrado

          if (dSq < maxDistSq) {
            const d       = Math.sqrt(dSq);
            const opacity = (1 - d / MAX_DIST) * 0.55;

            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(90, 200, 255, ${opacity})`;
            ctx.lineWidth   = 0.7;
            ctx.stroke();
          }
        }

        // 4 · Interacción con el cursor ────────────────────────────────────
        //
        //   Mismo cálculo de distancia, pero comparando cada nodo contra la
        //   posición del ratón. Las líneas son violeta/lavanda para distinguirlas
        //   visualmente de las conexiones nodo-nodo (cian).

        const mdx  = mouse.x - pi.x;
        const mdy  = mouse.y - pi.y;
        const mDSq = mdx * mdx + mdy * mdy;

        if (mDSq < MOUSE_DIST * MOUSE_DIST) {
          const mD      = Math.sqrt(mDSq);
          const opacity = (1 - mD / MOUSE_DIST) * 0.85;

          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`; // violeta #A78BFA
          ctx.lineWidth   = 1;
          ctx.stroke();
        }
      }

      // 5 · Dibujar nodos encima de las líneas (para que no queden tapados)
      for (const p of particles) {
        // Halo exterior translúcido — simula glow sin usar shadow (más rápido)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', ', 0.12)').replace('rgb', 'rgba')
          // fallback para hex: usamos globalAlpha temporalmente
        ;
        // Forma más limpia con globalAlpha para el halo
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.fillStyle   = p.color;
        ctx.fill();
        ctx.restore();

        // Núcleo del nodo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    // ── Handlers de eventos ───────────────────────────────────────────────

    function onMouseMove(e: MouseEvent): void {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave(): void {
      // Aleja el nodo fantasma para que no deje conexiones al salir
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onResize(): void {
      // Reinicializa al cambiar el tamaño para ajustar dimensiones y reposicionar nodos
      init();
    }

    // ── Arranque ──────────────────────────────────────────────────────────

    init();
    draw();

    window.addEventListener('resize',    onResize,    { passive: true });
    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave);

    // ── Limpieza al desmontar el componente ───────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize',    onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset   : 0,
        width   : '100%',
        height  : '100%',
        zIndex  : 0,
        display : 'block',
      }}
    />
  );
}
