'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { Home, BookOpen, GraduationCap, Mail, FileText, Mic } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';

export interface NavItem {
  Icon : ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  href : string;
}

const SECTIONS: NavItem[] = [
  { Icon: Home,          label: 'Inicio',      href: '/'            },
  { Icon: BookOpen,      label: 'Cursos',      href: '/cursos'      },
  { Icon: GraduationCap, label: 'Formaciones', href: '/formaciones' },
  { Icon: Mail,          label: 'Contacto',    href: '/contacto'    },
  { Icon: FileText,      label: 'Blog',        href: '/blog'        },
  { Icon: Mic,           label: 'Podcasts',    href: '/podcasts'    },
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
  const router   = useRouter();
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    router.push(href);
  }

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    router.push('/');
  }

  return (
    <>
      <aside className="nav-sidebar" aria-label="Navegación principal">
        <a href="/" className="nav-sidebar-logo" aria-label="Ir al inicio" onClick={handleLogoClick}>
          <Logo style={{ height: 20, width: 'auto', display: 'block', color: 'var(--accent)' }} />
        </a>

        <nav className="nav-sidebar-icons" aria-label="Secciones">
          {sections.map(({ Icon, label, href }) => (
            <a
              key={href}
              href={href}
              className={`nav-icon-link${pathname === href ? ' active' : ''}`}
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
        {/* Desktop footer info */}
        <span className="nav-footer-location nav-footer-desktop">
          España&nbsp;·&nbsp;<LocalTime />
        </span>
        <a href="/contacto" className="nav-footer-cta nav-footer-desktop" onClick={(e) => { e.preventDefault(); router.push('/contacto'); }}>
          Contactar&nbsp;→
        </a>

        {/* Mobile bottom nav */}
        <nav className="nav-mobile-bar" aria-label="Navegación móvil">
          {sections.map(({ Icon, label, href }) => (
            <a
              key={href}
              href={href}
              className={`nav-mobile-link${pathname === href ? ' active' : ''}`}
              aria-label={label}
              onClick={(e) => handleClick(e, href)}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="nav-mobile-label">{label}</span>
            </a>
          ))}
        </nav>
      </footer>
    </>
  );
}
