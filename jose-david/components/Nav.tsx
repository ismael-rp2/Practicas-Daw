'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { Home, User, BookOpen, Mic, Mail } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';

export interface NavItem {
  Icon : ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  href : string;
}

const lenis = () => (typeof window !== 'undefined' ? (window as any).lenis : null);
const EASE  = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function scrollToSection(href: string) {
  const l = lenis();
  if (!l) return;
  if (href === '#inicio') l.scrollTo(0, { duration: 1.4, easing: EASE });
  else l.scrollTo(href, { duration: 1.2, easing: EASE, offset: -40 });
}

const SECTIONS: NavItem[] = [
  { Icon: Home,     label: 'Inicio',            href: '#inicio'   },
  { Icon: User,     label: 'Sobre mí',           href: '#about'    },
  { Icon: BookOpen, label: 'Cursos y Formaciones',href: '#cursos'   },
  { Icon: Mic,      label: 'Podcasts',           href: '#podcasts' },
  { Icon: Mail,     label: 'Contacto',           href: '#contact'  },
];

function LocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

export default function Nav({ navConfig }: { navConfig?: NavItem[] }) {
  const sections = navConfig ?? SECTIONS;
  const [active, setActive] = useState('#inicio');
  const router   = useRouter();
  const pathname = usePathname();
  const isHome   = pathname === '/';

  useEffect(() => {
    if (!isHome) return;
    const els = sections
      .filter(({ href }) => href.startsWith('#'))
      .map(({ href }) => document.querySelector(href) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }); },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome, sections]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    if (!href.startsWith('#')) { router.push(href); return; }
    if (isHome) { setActive(href); scrollToSection(href); }
    else router.push(`/${href}`);
  }

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (isHome) { setActive('#inicio'); scrollToSection('#inicio'); }
    else router.push('/');
  }

  return (
    <>
      <aside className="nav-sidebar" aria-label="Navegación principal">
        <a href={isHome ? '#inicio' : '/'} className="nav-sidebar-logo" aria-label="Ir al inicio" onClick={handleLogoClick}>
          <Logo style={{ height: 20, width: 'auto', display: 'block', color: 'var(--accent)' }} />
        </a>

        <nav className="nav-sidebar-icons" aria-label="Secciones">
          {sections.map(({ Icon, label, href }) => (
            <a
              key={href}
              href={href}
              className={`nav-icon-link${active === href ? ' active' : ''}`}
              aria-label={label}
              title={label}
              onClick={(e) => handleClick(e, href)}
            >
              <Icon size={15} strokeWidth={1.5} />
            </a>
          ))}
        </nav>

        <span className="nav-sidebar-year" aria-hidden="true">2026</span>
      </aside>

      <div className="nav-right-rail" aria-hidden="true" />

      <footer className="nav-footer-bar" aria-label="Barra de contacto">
        <span className="nav-footer-location">
          España&nbsp;·&nbsp;<LocalTime />
        </span>
        <a href="#contact" className="nav-footer-cta" onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}>
          Contactar&nbsp;→
        </a>
      </footer>
    </>
  );
}
