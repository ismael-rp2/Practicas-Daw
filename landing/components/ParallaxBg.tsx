'use client';

// ─────────────────────────────────────────────────────────────────────────────
// ParallaxBg — imagen de fondo con efecto parallax ligero basado en scroll.
//
// Cómo funciona:
//   1. El contenedor del componente se expande un 10 % por cada lado (inset: -10%)
//      para dar margen al movimiento sin mostrar bordes.
//   2. En cada evento de scroll se calcula la posición de la sección respecto
//      al viewport y se aplica un translateY de ±30 px al contenedor.
//   3. El padre debe tener position: relative + overflow: hidden.
//
// Matemática del parallax:
//   progress = (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)
//   Rango:  0 (sección en el borde inferior del viewport)
//         → 1 (sección en el borde superior)
//   offset = (progress - 0.5) * PARALLAX_RANGE  → [-range/2, +range/2] en px
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const PARALLAX_RANGE = 60; // px totales de recorrido del parallax

export default function ParallaxBg({
  src,
  alt     = '',
  quality = 90,
}: {
  src     : string;
  alt     ?: string;
  quality ?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // El elemento padre es la sección que contiene el fondo
    const section = container.parentElement;
    if (!section) return;

    function update(): void {
      const rect    = section!.getBoundingClientRect();
      const viewH   = window.innerHeight;

      // Progreso normalizado: 0 cuando entra por abajo, 1 cuando sale por arriba
      const progress = (viewH - rect.top) / (viewH + rect.height);

      // Mapear a offset: centro del recorrido en 0 px
      const offset   = (progress - 0.5) * PARALLAX_RANGE;

      container!.style.transform = `translateY(${offset}px)`;
    }

    // Calcular posición inicial sin esperar al primer scroll
    update();

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position  : 'absolute',
        inset     : '-10%',           // espacio extra para el movimiento parallax
        zIndex    : 0,
        willChange: 'transform',      // avisa al navegador para compositing separado
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={quality}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </div>
  );
}
