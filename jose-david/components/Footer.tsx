'use client';

const NAV = [
  { label: 'inicio',             href: '#inicio'   },
  { label: 'sobre mí',           href: '#about'    },
  { label: 'cursos',             href: '#cursos'   },
  { label: 'podcasts',           href: '#podcasts' },
  { label: 'contacto',           href: '#contact'  },
];

export default function Footer() {
  return (
    <footer
      aria-label="Pie de página"
      className="relative z-10 flex flex-col justify-between"
      style={{
        marginLeft: 'var(--nav-sw, 60px)',
        minHeight: '70vh',
        paddingTop: '5rem',
        paddingBottom: 'calc(var(--nav-bh, 44px) + 5.5rem)',
        paddingLeft: '8vw',
        paddingRight: '9vw',
        background: 'rgba(5, 5, 5, 0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(129, 140, 248, 0.10)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.4), transparent)' }}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 w-full">
        <p className="text-xl font-bold text-white tracking-tight leading-none">
          José David<span className="font-normal" style={{ color: 'var(--accent, #818cf8)' }}>&nbsp;&lt;educación &amp; IA&gt;</span>
        </p>
        <nav className="flex flex-wrap items-center gap-x-10 gap-y-4" aria-label="Navegación del footer">
          {NAV.map(({ label, href }) => (
            <a key={href} href={href} className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200">
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
        <span className="text-xs text-white/60 tracking-wide">
          © 2026 José David Pérez Ibáñez — Todos los derechos reservados
        </span>
        <div className="flex items-center gap-x-8">
          <a href="#" className="text-xs text-white/60 hover:text-white transition-colors duration-200">Política de privacidad</a>
          <a href="#" className="text-xs text-white/60 hover:text-white transition-colors duration-200">Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}
