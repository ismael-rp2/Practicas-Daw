'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function PageLoader() {
  const [phase, setPhase] = useState<'visible' | 'out' | 'done'>('visible');

  useEffect(() => {
    // Empieza a salir tras 700 ms (deja que el hero cargue)
    const t1 = setTimeout(() => setPhase('out'), 700);
    // Se desmonta tras completar la animación (500 ms de transición)
    const t2 = setTimeout(() => setPhase('done'), 1250);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`page-loader${phase === 'out' ? ' page-loader--out' : ''}`}
      aria-hidden="true"
    >
      <div className="page-loader-inner">
        {/* Logo animado */}
        <div className="page-loader-logo">
          <Logo style={{ height: 36, width: 36, color: 'var(--accent)' }} />
        </div>

        {/* Nombre */}
        <p className="page-loader-name">José David</p>

        {/* Barra de progreso */}
        <div className="page-loader-track" role="progressbar" aria-label="Cargando">
          <div className="page-loader-fill" />
        </div>
      </div>
    </div>
  );
}
