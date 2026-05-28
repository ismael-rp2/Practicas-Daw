'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

// ── Componente Contact ────────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  /* Forzar reproducción continua: play en cualquier momento que el vídeo se pause */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted  = true;
    v.loop   = true;

    const tryPlay = () => v.play().catch(() => {});

    // Intentar inmediatamente y cuando los datos estén listos
    tryPlay();
    v.addEventListener('loadeddata', tryPlay);
    v.addEventListener('canplay',    tryPlay);
    // Si algo externo pausa el vídeo, reiniciarlo (excepto si ha terminado el bucle)
    const onPause = () => { if (!v.ended) tryPlay(); };
    v.addEventListener('pause', onPause);

    return () => {
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('canplay',    tryPlay);
      v.removeEventListener('pause',      onPause);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    let io: IntersectionObserver | null = null;
    const el  = sectionRef.current;
    const vid = videoRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });
    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io?.disconnect();
        io = null;
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
        // Arrancar vídeo cuando la sección sea visible
        if (vid) { vid.muted = true; vid.play().catch(() => {}); }
      },
      { rootMargin: '-5% 0px 0px 0px' }
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
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jose-david-perez-ibanez/' },
                { label: 'YouTube',  href: 'https://www.youtube.com/@jose-david' },
                { label: 'Instagram',href: 'https://www.instagram.com/joseda.education' },
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

          {/* Columna derecha — vídeo de ponencia en bucle */}
          <div className="ct-canvas">
            <video
              ref={videoRef}
              src="/V%C3%8DDEOS_JD_PONENCIA/C1180.MP4"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              style={{
                position  : 'absolute',
                inset     : 0,
                width     : '100%',
                height    : '100%',
                objectFit : 'cover',
                borderRadius: 'inherit',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
