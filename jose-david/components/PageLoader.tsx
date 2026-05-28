'use client';

import { useEffect, useState } from 'react';

/**
 * PageLoader — Full-screen curtain que sube para revelar la web.
 * Toda la animación es CSS keyframes pura (sin state transitions).
 * React solo desmonta el nodo cuando la animación termina.
 */
export default function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Total animación = 1.1s espera + 0.9s salida = 2.0s
    const t = setTimeout(() => setDone(true), 2100);
    return () => clearTimeout(t);
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
