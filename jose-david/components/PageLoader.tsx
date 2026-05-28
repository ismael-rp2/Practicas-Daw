'use client';

import { useEffect, useState } from 'react';

/**
 * PageLoader — Full-screen curtain que sube para revelar la web.
 * Toda la animación es CSS keyframes pura (sin state transitions).
 * React solo desmonta el nodo cuando la animación termina.
 *
 * Comportamiento garantizado:
 *  1. Bloquea el scroll del contenedor durante la animación.
 *  2. Fuerza el scroll a 0 antes de revelar la página.
 *  3. Se muestra en CADA visita al home (estado local, sin persistencia).
 */
export default function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // ── 1. Forzar posición inicial ───────────────────────────────────────────
    const sv = document.querySelector<HTMLElement>('.scroll-viewport');
    if (sv) sv.scrollTop = 0;
    window.scrollTo(0, 0);

    // ── 2. Bloquear scroll mientras la animación se reproduce ────────────────
    const prevOverflow = sv ? sv.style.overflowY : '';
    if (sv) sv.style.overflowY = 'hidden';
    document.body.style.overflow = 'hidden';

    // ── 3. Desbloquear y desmontar al terminar ───────────────────────────────
    // Total animación = 1.1 s espera + 0.9 s salida = 2.0 s (+100 ms margen)
    const t = setTimeout(() => {
      if (sv) sv.style.overflowY = prevOverflow || '';
      document.body.style.overflow = '';
      // Segundo reset de scroll: por si Lenis lo movió durante la carga
      if (sv) sv.scrollTop = 0;
      setDone(true);
    }, 2100);

    return () => {
      clearTimeout(t);
      // Limpieza de seguridad si el componente se desmonta antes de tiempo
      if (sv) sv.style.overflowY = prevOverflow || '';
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

  return (
    <div className="pl-screen" aria-hidden="true">

      {/* Contenido central */}
      <div className="pl-content">
        <p className="pl-eyebrow">educación &amp; IA</p>

        <h1 className="pl-name">
          <span className="pl-name-line">José</span>
          <span className="pl-name-line pl-name-line--accent">David</span>
        </h1>

        <div className="pl-divider" />

        <p className="pl-descriptor">Google Innovator &nbsp;·&nbsp; +160K &nbsp;·&nbsp; IA &amp; Docentes</p>
      </div>

    </div>
  );
}
