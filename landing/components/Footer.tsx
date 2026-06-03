import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

// Iconos de marca en SVG inline (lucide-react no incluye logos de marca).
const svg = (path: ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{path}</svg>
);
const ICONS: Record<string, ReactNode> = {
  LinkedIn : svg(<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />),
  YouTube  : svg(<path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z" />),
  Instagram: svg(<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.8.72 1.47 1.38 2.13.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38c.66-.66 1.07-1.33 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />),
  Spotify  : svg(<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.31a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.59 11.66 1.34.35.22.46.68.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.8c4.37-1.32 9.79-.68 13.5 1.6.44.27.58.85.3 1.29zm.13-3.4C15.73 8.28 8.34 8.05 4.65 9.17a1.12 1.12 0 1 1-.65-2.15c4.24-1.29 12.4-1.04 16.5 1.39a1.12 1.12 0 1 1-1.15 1.93z" />),
};

const NAV = [
  { label: 'Inicio',       href: '/' },
  { label: 'Sobre Joseda', href: '/sobre-joseda' },
  { label: 'Cursos',       href: '/cursos' },
  { label: 'Formaciones',  href: '/formaciones' },
  { label: 'Ponencias',    href: '/ponencias' },
  { label: 'Podcasts',     href: '/podcasts' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contacto',     href: '/contacto' },
];

const SOCIAL = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com' },
  { label: 'YouTube',   href: 'https://www.youtube.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
];

const LEGAL = [
  { label: 'Aviso legal',            href: '/legal/aviso-legal' },
  { label: 'Política de privacidad', href: '/legal/privacidad' },
  { label: 'Cookies',                href: '/legal/cookies' },
];

export default function Footer() {
  return (
    <footer className="footer-fadein" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ paddingBlock: 'clamp(3rem, 7vh, 5rem)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

        {/* Marca + redes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ maxWidth: '32ch' }}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <Image src="/logos/Logo-joseda-white.png" alt="Joseda" width={150} height={35} />
            </Link>
            <p style={{ marginTop: '0.85rem', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Educación + Inteligencia Artificial, con criterio docente.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {SOCIAL.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="footer-social-btn">
                {ICONS[label]}
              </a>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <nav aria-label="Pie" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 1.75rem' }}>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} className="footer-nav-link">{label}</Link>
          ))}
        </nav>

        {/* Legal + copyright */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 1.5rem', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '1.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {LEGAL.map(({ label, href }) => (
              <Link key={href} href={href} className="footer-legal-link">{label}</Link>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} Joseda · SERENDIPIUM IA SLU
          </p>
        </div>
      </div>
    </footer>
  );
}
