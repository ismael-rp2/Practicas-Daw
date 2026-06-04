'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import CTAButton from './CTAButton';

const NAV = [
  { label: 'Inicio',      href: '/' },
  { label: 'Sobre',       href: '/sobre-joseda' },
  { label: 'Cursos',      href: '/cursos' },
  { label: 'Formaciones', href: '/formaciones' },
  { label: 'Ponencias',   href: '/ponencias' },
  { label: 'Podcasts',    href: '/podcasts' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Contacto',    href: '/contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className="header-anim"
      style={{
        position      : 'sticky',
        top           : 0,
        zIndex        : 1000,
        height        : 'var(--header-h)',
        display       : 'flex',
        alignItems    : 'center',
        paddingTop    : 'env(safe-area-inset-top)',
        background    : scrolled ? 'rgba(10,10,10,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
        borderBottom  : scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition    : 'background 0.3s, border-color 0.3s',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link href="/" aria-label="Joseda — inicio" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logos/Logo-joseda-white.png"
            alt="Joseda"
            height={32}
            width={160}
            priority
            style={{ height: '26px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navegación principal" className="nav-desktop"
          style={{ display: 'none', alignItems: 'center', gap: '1.4rem' }}>
          {NAV.map(({ label, href }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link key={href} href={href}
                style={{ fontSize: '0.85rem', fontWeight: active ? 600 : 400,
                  color: active ? '#fff' : 'rgba(255,255,255,0.62)', transition: 'color 0.2s' }}>
                {label}
              </Link>
            );
          })}
          <CTAButton variant="primary" href="/boletin" arrow={false} style={{ padding: '0.6rem 1.1rem', fontSize: '0.74rem' }}>
            EDU + IA
          </CTAButton>
        </nav>

        {/* Botón hamburguesa — solo móvil */}
        <button
          type="button"
          className="nav-burger"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          style={{
            display    : 'flex',
            alignItems : 'center',
            justifyContent: 'center',
            background : 'transparent',
            border     : '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            color      : '#fff',
            cursor     : 'pointer',
            padding    : '0.4rem 0.5rem',
            transition : 'border-color 0.2s, background 0.2s',
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Menú móvil — solo visible en pantallas ≤768px ── */}

      {/* Backdrop — cierra al tocar fuera */}
      <div
        className="nav-mobile-backdrop"
        onClick={() => setOpen(false)}
        style={{
          position  : 'fixed',
          inset     : 0,
          zIndex    : 997,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          opacity   : open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Panel deslizante desde la derecha */}
      <div
        className="nav-mobile-panel"
        style={{
          position  : 'fixed',
          top       : 0,
          right     : 0,
          bottom    : 0,
          width     : 'min(300px, 88vw)',
          zIndex    : 998,
          background: '#0f0f0f',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          display   : 'flex',
          flexDirection: 'column',
          transform : open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
          overflowY : 'auto',
        }}
      >
        {/* Cabecera del panel */}
        <div style={{
          display       : 'flex',
          alignItems    : 'center',
          justifyContent: 'space-between',
          padding       : '0 1.25rem',
          height        : 'var(--header-h)',
          borderBottom  : '1px solid rgba(255,255,255,0.08)',
          flexShrink    : 0,
        }}>
          <span style={{
            fontFamily   : 'var(--mono)',
            fontSize     : '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color        : 'rgba(255,255,255,0.35)',
          }}>
            Navegación
          </span>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            style={{
              display    : 'flex',
              alignItems : 'center',
              justifyContent: 'center',
              background : 'rgba(255,255,255,0.07)',
              border     : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color      : '#fff',
              cursor     : 'pointer',
              padding    : '0.35rem',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Links de navegación */}
        <nav
          aria-label="Menú móvil"
          style={{ display: 'flex', flexDirection: 'column', padding: '0.75rem', flex: 1, gap: '2px' }}
        >
          {NAV.map(({ label, href }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display      : 'flex',
                  alignItems   : 'center',
                  padding      : '0.85rem 1rem',
                  fontSize     : '0.98rem',
                  fontWeight   : active ? 600 : 500,
                  color        : active ? '#fff' : 'rgba(255,255,255,0.6)',
                  borderRadius : '10px',
                  background   : active ? 'rgba(147,51,234,0.14)' : 'transparent',
                  border       : active ? '1px solid rgba(147,51,234,0.3)' : '1px solid transparent',
                  textDecoration: 'none',
                  transition   : 'background 0.15s, color 0.15s',
                }}
              >
                {label}
                {active && (
                  <span style={{
                    marginLeft  : 'auto',
                    width       : 6,
                    height      : 6,
                    borderRadius: '50%',
                    background  : '#a78bfa',
                    flexShrink  : 0,
                  }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA inferior */}
        <div style={{
          padding    : '1rem 1.25rem calc(1.5rem + env(safe-area-inset-bottom))',
          borderTop  : '1px solid rgba(255,255,255,0.08)',
          flexShrink : 0,
        }}>
          <CTAButton
            variant="primary"
            href="/boletin"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
          >
            Suscríbete a EDU + IA
          </CTAButton>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .nav-desktop        { display: flex !important; }
          .nav-burger         { display: none !important; }
          .nav-mobile-panel   { display: none !important; }
          .nav-mobile-backdrop{ display: none !important; }
        }
      `}</style>
    </header>
  );
}
