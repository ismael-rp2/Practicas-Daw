'use client';

import { useMinimize } from '@/context/MinimizeContext';

export default function TopBar() {
  const { toggle, isMinimized } = useMinimize();

  const handleMaximize = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-center" aria-hidden="true">
        <span className="topbar-brand">José David</span>
        <span className="topbar-descriptor">&nbsp;&lt;educación &amp; IA&gt;</span>
      </div>

      <div className="topbar-controls">
        <button
          className="topbar-btn"
          onClick={toggle}
          aria-label={isMinimized ? 'Restaurar' : 'Minimizar'}
          title={isMinimized ? 'Restaurar' : 'Minimizar'}
        >
          {isMinimized ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <line x1="6"   y1="1.5" x2="6"   y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="1.5" y1="6"   x2="10.5" y2="6"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <line x1="1.5" y1="6" x2="10.5" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        <button className="topbar-btn" onClick={handleMaximize} aria-label="Pantalla completa" title="Pantalla completa">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>

        <button className="topbar-btn topbar-btn--close" onClick={() => window.close()} aria-label="Cerrar" title="Cerrar">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <line x1="2"  y1="2"  x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="2"  x2="2"  y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
