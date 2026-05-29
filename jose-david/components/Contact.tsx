'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

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

          {/* Columna derecha — vídeo de ponencia en bucle (YouTube) */}
          <div className="ct-canvas">
            {/*
              Escalamos el iframe un 40 % más grande que el contenedor y lo
              centramos con translate(-50 %,-50 %). El overflow:hidden del
              padre recorta la cabecera, los controles y el logo de YouTube,
              dejando visible solo el vídeo.
              pointer-events:none evita que se abra YouTube al hacer clic.
            */}
            <iframe
              src="https://www.youtube.com/embed/mEg924NU8VM?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&controls=0&playlist=mEg924NU8VM&showinfo=0&iv_load_policy=3&disablekb=1"
              allow="autoplay; encrypted-media"
              aria-hidden="true"
              style={{
                position      : 'absolute',
                top           : '50%',
                left          : '50%',
                /*
                  El vídeo es un Short (9:16). Para que YouTube NO añada
                  barras negras, el iframe debe tener exactamente esa
                  proporción. Con width:100% el browser calcula el alto
                  como width*(16/9), garantizando 9:16. Al ser más alto
                  que el contenedor, overflow:hidden recorta arriba/abajo
                  y el vídeo llena todo el cuadro sin barras.
                */
                width         : '100%',
                aspectRatio   : '9/16',
                transform     : 'translate(-50%, -50%)',
                border        : 'none',
                pointerEvents : 'none',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
