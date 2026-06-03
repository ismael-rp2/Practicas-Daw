# Handoff Dev A → Dev B · Sistema de diseño compartido

> 🔄 **Actualizado a la paleta de marca v1.2** (violeta → magenta → naranja).
> Ya **NO hay azul**: los eyebrows y links van en **lavanda `#B59FE5`** y los
> "color moments" usan el **gradiente de marca de 3 paradas**. Si tenías la
> versión anterior con azul cobalto, sustituye los tokens por los de abajo.

Todo lo necesario para que la **landing** use el mismo sistema visual que la web.
Copia los bloques tal cual. Orden recomendado:

1. Instala dependencias.
2. Configura el alias `@/*` en `tsconfig.json`.
3. Pega el `globals.css`.
4. Crea los 3 componentes (`CTAButton`, `Header`, `Footer`).
5. Úsalos según los ejemplos del final.

> **Regla del documento maestro:** estos tokens y componentes deben ser **idénticos** en web y landing. No cambies colores, fuentes ni la API del `<CTAButton/>`.

---

## 1) Dependencias

```bash
npm install next react react-dom lucide-react
```

- `lucide-react` solo lo usa el `<Header/>` (iconos `Menu` / `X`).
- Las fuentes (Geist / Geist Mono) se cargan por `@import` en el CSS — no hay paquete npm.

---

## 2) Alias de importación (`tsconfig.json`)

Las importaciones usan `@/...`. Necesitas este alias (apunta a la raíz del proyecto):

```jsonc
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Si prefieres no usar alias, cambia los imports `@/components/...` por rutas relativas (`../components/...`).

---

## 3) `app/globals.css` (tokens + helpers) — PEGAR COMPLETO

```css
/* ══════════════════════════════════════════════════════════════════════════
   Tipografía — Geist (headers/body) + Geist Mono (eyebrows)
══════════════════════════════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap');

@import "tailwindcss";

@theme {
  --font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}

/* ══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS (§2.3 del documento maestro)
   Base editorial negra + gradiente de marca. "Color moments" en secciones 03 y 06.
══════════════════════════════════════════════════════════════════════════ */
:root {
  /* ──── Base oscura (lienzo de toda la web) ──── */
  --bg-primary    : #0A0A0A;   /* fondo principal */
  --bg-deep       : #000000;   /* manifiesto, secciones de mayor peso */
  --bg-card       : #141414;   /* tarjetas y bloques secundarios */
  --text-primary  : #FFFFFF;
  --text-secondary: #A1A1AA;
  --border-subtle : rgba(255, 255, 255, 0.08);

  /* ──── Marca: gradiente intenso violeta → magenta → naranja (3 paradas) ──── */
  --brand-violet : #5E2DD6;    /* morado eléctrico, izquierda */
  --brand-magenta: #D63595;    /* rosa-magenta intenso, centro */
  --brand-orange : #E85A2C;    /* naranja vibrante, derecha */

  --brand-gradient: linear-gradient(135deg,
       var(--brand-violet) 0%,
       var(--brand-magenta) 50%,
       var(--brand-orange) 100%);

  /* Variantes para hover, links y bordes sobre fondo oscuro */
  --brand-violet-deep : #4A1FB0;   /* hover, estados activos */
  --brand-magenta-soft: #E879C0;   /* links secundarios */
  --link-color        : #B59FE5;   /* lavanda claro legible sobre negro */
  --link-hover        : var(--brand-magenta);

  /* ──── Aplicaciones específicas ──── */
  --eyebrow-color     : #B59FE5;   /* lavanda claro para "01 — INICIO" */
  --bg-newsletter     : var(--brand-gradient);  /* sección 06 EDU + IA */
  --text-on-brand     : #FFFFFF;   /* texto BLANCO sobre gradiente intenso */
  --button-on-brand-bg  : #0A0A0A;
  --button-on-brand-text: #FFFFFF;

  --sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --mono: 'Geist Mono', ui-monospace, monospace;

  --header-h: 64px;

  /* Aliases legacy → marca nueva (compatibilidad con componentes ya escritos) */
  --accent-blue     : var(--eyebrow-color);
  --accent-blue-soft: var(--link-color);
  --grad-moment     : var(--brand-gradient);
}

/* Reglas de uso del gradiente (§2.3):
   ✅ Fondo completo SOLO en momentos clave: hero (con velo negro), Sobre Joseda,
      sección 06 Newsletter, landing /boletin, /lista-espera.
   ✅ Hover de CTA primario, bordes/separadores destacados (2-3px), acento
      tipográfico puntual con background-clip: text.
   ✅ Eyebrows y links: lavanda #B59FE5, NO el gradiente entero.
   ❌ NO el gradiente como fondo de toda una página. Máx. 3 momentos en la home.
   ❌ NO mezclar con otros acentos (azul, verde, amarillo). El gradiente es el único.
   Texto sobre gradiente: BLANCO #FFFFFF. Botón sobre gradiente: negro #0A0A0A + texto blanco. */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  overflow-x: clip;
  background: var(--bg-primary);
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--sans);
  font-weight: 400;
  line-height: 1.5;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--brand-magenta); color: #ffffff; }

a { color: inherit; text-decoration: none; }

/* Foco accesible visible en todos los interactivos (§2.7) */
:where(a, button, input, textarea, select):focus-visible {
  outline: 2px solid var(--link-color);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ── Eyebrow de sección: "01 — INICIO" (§2.2) ── */
.eyebrow {
  font-family   : var(--mono);
  font-size     : 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color         : var(--eyebrow-color);
}

/* ── Contenedor de ancho máximo ── */
.container {
  width      : 100%;
  max-width  : 1280px;
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 5vw, 4rem);
}

/* ── Sección base: mobile-first con svh, nunca 100vh (§2.6) ── */
.section {
  position: relative;
  padding-block: clamp(4rem, 12vh, 8rem);
}

/* ══════════════════════════════════════════════════════════════════════════
   LOGO MARQUEE (§6 guía técnica)
══════════════════════════════════════════════════════════════════════════ */
@keyframes marquee-left  { from { transform: translateX(0);     } to { transform: translateX(-50%); } }
@keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0);     } }

.marquee {
  display      : flex;
  overflow     : hidden;
  user-select  : none;
  width        : 100%;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.marquee__track {
  display    : flex;
  flex-shrink: 0;
  gap        : clamp(24px, 4vw, 56px);
  padding-right: clamp(24px, 4vw, 56px);
  align-items: center;
  min-width  : max-content;
  animation  : marquee-left linear infinite;
  animation-duration: var(--marquee-duration, 60s);
  will-change : transform;
}
.marquee[data-dir="right"] .marquee__track { animation-name: marquee-right; }
@media (hover: hover) {
  .marquee:hover .marquee__track { animation-play-state: paused; }
}

/* ══════════════════════════════════════════════════════════════════════════
   ANIMACIÓN reveal on-scroll (sutil)
══════════════════════════════════════════════════════════════════════════ */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ══════════════════════════════════════════════════════════════════════════
   REDUCED MOTION (§2.7)
══════════════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration  : 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration : 0.01ms !important;
  }
  .marquee__track { animation: none !important; }
}
```

### Clases helper que aportan los componentes
- `.eyebrow` → mono, 0.75rem, uppercase, color `--eyebrow-color` (lavanda `#B59FE5`, para "01 — INICIO").
- `.container` → ancho máx 1280px, centrado, padding lateral fluido.
- `.section` → `padding-block` fluido para secciones.

### Convención de estilos
La web usa **estilos inline** (`style={{ ... }}`) con las variables CSS, no clases utilitarias de Tailwind en los componentes. Mantén el mismo enfoque para que coincida.

---

## 4) Componentes compartidos

### Rutas de importación
```tsx
import CTAButton from '@/components/CTAButton';
import Header    from '@/components/Header';
import Footer    from '@/components/Footer';
```
`<Header/>` y `<Footer/>` **no reciben props**: `<Header />`, `<Footer />`.

---

### `components/CTAButton.tsx`

```tsx
'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CTAButton — jerarquía estricta de CTAs (§2.4)
//   primary   → botón blanco sólido (CTA principal: Suscríbete a EDU + IA)
//   secondary → botón outline blanco (contextual: Hablemos, Ver formaciones…)
//   ghost     → link de texto subrayado al hover (terciario)
// ─────────────────────────────────────────────────────────────────────────────
export type CTAVariant = 'primary' | 'secondary' | 'ghost';

const base: CSSProperties = {
  display       : 'inline-flex',
  alignItems    : 'center',
  gap           : '0.55rem',
  fontFamily    : 'var(--sans)',
  fontSize      : '0.82rem',
  fontWeight    : 600,
  letterSpacing : '0.06em',
  textTransform : 'uppercase',
  lineHeight    : 1,
  cursor        : 'pointer',
  transition    : 'background 0.2s, color 0.2s, border-color 0.2s, opacity 0.2s',
  whiteSpace    : 'nowrap',
};

const variants: Record<CTAVariant, CSSProperties> = {
  primary: {
    ...base,
    padding     : '0.95rem 1.9rem',
    background  : '#ffffff',
    color       : '#0A0A0A',
    border      : '1px solid #ffffff',
  },
  secondary: {
    ...base,
    padding     : '0.95rem 1.9rem',
    background  : 'transparent',
    color       : '#ffffff',
    border      : '1px solid rgba(255,255,255,0.45)',
  },
  ghost: {
    ...base,
    padding     : '0.25rem 0',
    background  : 'transparent',
    color       : 'var(--accent-blue-soft)',
    border      : 'none',
    textTransform: 'none',
    letterSpacing: '0.01em',
  },
};

export default function CTAButton({
  variant = 'primary',
  href,
  children,
  arrow = true,
  onClick,
  type,
  style,
}: {
  variant?: CTAVariant;
  href?: string;
  children: ReactNode;
  arrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  style?: CSSProperties;
}) {
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden="true" style={{ fontSize: '1em', lineHeight: 1 }}>→</span>}
    </>
  );

  const hover = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    const el = e.currentTarget as HTMLElement;
    if (variant === 'primary')   el.style.opacity = on ? '0.85' : '1';
    if (variant === 'secondary') { el.style.background = on ? '#ffffff' : 'transparent'; el.style.color = on ? '#0A0A0A' : '#ffffff'; }
    if (variant === 'ghost')     el.style.textDecoration = on ? 'underline' : 'none';
  };

  const css = { ...variants[variant], ...style };

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external) {
      return (
        <a href={href} style={css} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} style={css} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} onClick={onClick} style={css}
      onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
      {content}
    </button>
  );
}
```

#### Props del `<CTAButton/>`
| Prop       | Tipo                                  | Default     | Notas |
|------------|---------------------------------------|-------------|-------|
| `variant`  | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Jerarquía visual. |
| `href`     | `string`                              | —           | Interno (`/contacto`) → `<Link>`; externo (`http`/`mailto:`) → `<a>`; sin `href` → `<button>`. |
| `children` | `ReactNode`                           | **req.**    | Texto del botón. |
| `arrow`    | `boolean`                             | `true`      | Muestra la flecha "→" al final. |
| `onClick`  | `() => void`                          | —           | Solo en modo botón (sin `href`). |
| `type`     | `'button' \| 'submit'`                | `'button'`  | Solo en modo botón. |
| `style`    | `CSSProperties`                       | —           | Sobrescribe/extiende estilos (ej. padding más pequeño). |

**Variantes:** `primary` = botón blanco sólido · `secondary` = outline blanco (invierte a blanco al hover) · `ghost` = link lavanda subrayado al hover.

---

### `components/Header.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import CTAButton from './CTAButton';

// Menú principal (§3 sitemap)
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

  // Cierra el menú al navegar
  useEffect(() => { setOpen(false); }, [pathname]);

  // Bloquea scroll de fondo con el menú abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
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
        transition    : 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo (Logo-joseda-white.png en /public/images) */}
        <Link href="/" aria-label="Joseda — inicio" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Image src="/images/logo-joseda-white.png" alt="Joseda" width={150} height={35} priority
            style={{ height: 34, width: 'auto' }} />
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

        {/* Botón hamburguesa (≤768px) */}
        <button type="button" className="nav-burger" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open} onClick={() => setOpen((v) => !v)}
          style={{ display: 'flex', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.4rem' }}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Overlay menú móvil */}
      {open && (
        <div
          style={{
            position      : 'fixed',
            inset         : 'var(--header-h) 0 0 0',
            zIndex        : 999,
            background    : 'rgba(10,10,10,0.98)',
            backdropFilter: 'blur(8px)',
            display       : 'flex',
            flexDirection : 'column',
            padding       : '2rem clamp(1.25rem, 5vw, 4rem) 3rem',
            gap           : '0.25rem',
            overflowY     : 'auto',
          }}
        >
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href}
              style={{ padding: '0.95rem 0', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em',
                color: '#fff', borderBottom: '1px solid var(--border-subtle)' }}>
              {label}
            </Link>
          ))}
          <div style={{ marginTop: '1.75rem' }}>
            <CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-burger  { display: none !important; }
        }
      `}</style>
    </header>
  );
}
```

---

### `components/Footer.tsx`

> ℹ️ **Versión actual (v1.2):** layout **centrado** con el logo real
> (`/images/logo-joseda-white.png`), tagline "Educación + IA con criterio
> docente.", redes (LinkedIn · YouTube · Instagram; TikTok y Spotify
> pendientes de URL), nav y copyright "© Joseda · SERENDIPIUM IA S.L.".
> Lo consumes como `<Footer />` (sin props). El bloque de abajo es una
> revisión anterior de referencia; la fuente de verdad es el repo.

```tsx
import Link from 'next/link';
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
  { label: 'Inicio',      href: '/' },
  { label: 'Sobre Joseda', href: '/sobre-joseda' },
  { label: 'Cursos',      href: '/cursos' },
  { label: 'Formaciones', href: '/formaciones' },
  { label: 'Ponencias',   href: '/ponencias' },
  { label: 'Podcasts',    href: '/podcasts' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Contacto',    href: '/contacto' },
];

const SOCIAL = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com' },
  { label: 'YouTube',   href: 'https://www.youtube.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'Spotify',   href: 'https://www.spotify.com' },
];

const LEGAL = [
  { label: 'Aviso legal',          href: '/legal/aviso-legal' },
  { label: 'Política de privacidad', href: '/legal/privacidad' },
  { label: 'Cookies',              href: '/legal/cookies' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ paddingBlock: 'clamp(3rem, 7vh, 5rem)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

        {/* Marca + redes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ maxWidth: '32ch' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.25rem' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>joseda</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--accent-blue)' }}>.education</span>
            </Link>
            <p style={{ marginTop: '0.85rem', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Educación + Inteligencia Artificial, con criterio docente.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {SOCIAL.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42,
                  borderRadius: '50%', border: '1px solid var(--border-subtle)', color: 'rgba(255,255,255,0.75)' }}>
                {ICONS[label]}
              </a>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <nav aria-label="Pie" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 1.75rem' }}>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.62)' }}>{label}</Link>
          ))}
        </nav>

        {/* Legal + copyright */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 1.5rem', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '1.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {LEGAL.map(({ label, href }) => (
              <Link key={href} href={href} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>{label}</Link>
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
```

---

## 5) Ejemplos de uso

```tsx
// Botón principal (interno)
<CTAButton variant="primary" href="/boletin">Suscríbete a EDU + IA</CTAButton>

// Secundario sin flecha
<CTAButton variant="secondary" href="/contacto" arrow={false}>Hablemos</CTAButton>

// Ghost (link lavanda)
<CTAButton variant="ghost" href="/blog">Ver todas las novedades</CTAButton>

// Externo (abre <a>)
<CTAButton variant="primary" href="https://wa.me/34600000000">Escríbeme</CTAButton>

// Modo botón (submit de formulario)
<CTAButton variant="primary" type="submit" onClick={handleSubmit}>Enviar</CTAButton>
```

```tsx
// Layout con header + footer compartidos
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

---

## 6) Componentes auxiliares (opcionales pero recomendados)

Estos no son obligatorios, pero mantienen la coherencia visual. Rutas:
```tsx
import SectionEyebrow from '@/components/SectionEyebrow';
import Card           from '@/components/Card';
import LogoMarquee    from '@/components/LogoMarquee';
import Reveal         from '@/components/Reveal';
```

### `components/SectionEyebrow.tsx`
Etiqueta de sección tipo "01 — INICIO" (mono, lavanda). Props: `number?: string`, `text: string`.

```tsx
// ─────────────────────────────────────────────────────────────────────────────
// SectionEyebrow — "01 — INICIO" (Geist Mono, lavanda de marca). §2.2 / §4
// `as` permite renderizarlo como heading (h2) cuando es el título de la sección.
// ─────────────────────────────────────────────────────────────────────────────
export default function SectionEyebrow({
  number,
  text,
  as: Tag = 'p',
}: {
  number?: string;
  text: string;
  as?: 'p' | 'h2';
}) {
  return (
    <Tag className="eyebrow" style={{ marginBottom: '1.25rem' }}>
      {number ? `${number} — ` : ''}{text}
    </Tag>
  );
}
```
Uso: `<SectionEyebrow number="02" text="Cómo te ayudo" />` · como heading: `<SectionEyebrow as="h2" text="Hitos" />`

---

### `components/Card.tsx`
Tarjeta flexible. Dos usos: **icono + título + cuerpo + link** (servicios) o **imagen 16:9 + meta + título + link** (novedades).
Props: `icon?`, `image?`, `imageAlt?`, `meta?`, `title` (req.), `body?`, `linkText?`, `href?`.

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Card — tarjeta reutilizable (§4). Soporta dos usos:
//   · "Cómo te ayudo": icon + title + body + link
//   · "Novedades":     image + meta + title + link
// ─────────────────────────────────────────────────────────────────────────────
export default function Card({
  icon,
  image,
  imageAlt,
  meta,
  title,
  body,
  linkText,
  href,
}: {
  icon?: ReactNode;
  image?: string;
  imageAlt?: string;
  meta?: string;
  title: string;
  body?: string;
  linkText?: string;
  href?: string;
}) {
  return (
    <article
      style={{
        display      : 'flex',
        flexDirection: 'column',
        background   : 'var(--bg-card)',
        border       : '1px solid var(--border-subtle)',
        borderRadius : '14px',
        overflow     : 'hidden',
        height       : '100%',
      }}
    >
      {image && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#1f1f1f' }}>
          <Image src={image} alt={imageAlt ?? title} fill quality={90} sizes="(max-width:768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem' }}>
        {icon && <div style={{ fontSize: '1.6rem', lineHeight: 1 }} aria-hidden="true">{icon}</div>}

        {meta && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--accent-blue)' }}>
            {meta}
          </span>
        )}

        <h3 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.25rem, 2.4vw, 1.5rem)', fontWeight: 700,
          letterSpacing: '-0.02em', lineHeight: 1.15, color: '#fff' }}>
          {title}
        </h3>

        {body && (
          <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {body}
          </p>
        )}

        {linkText && href && (
          <Link href={href} style={{ marginTop: '0.35rem', display: 'inline-flex', alignItems: 'center',
            gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-blue-soft)' }}>
            {linkText} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
```

---

### `components/LogoMarquee.tsx`
Carrusel infinito de logos/wordmarks (usa las clases `.marquee` del `globals.css`).
Props: `logos: string[]`, `direction?: 'left' | 'right'` (def. `'left'`), `duration?: number` (segundos, def. `60`).

```tsx
// ─────────────────────────────────────────────────────────────────────────────
// LogoMarquee — carrusel infinito de logos/wordmarks (§6 guía técnica)
//   · Mientras no haya SVG curados, se renderizan wordmarks de texto monocromos.
//   · 3 filas en home (dir. alternada). Pausa al hover (CSS, solo desktop).
// ─────────────────────────────────────────────────────────────────────────────
export default function LogoMarquee({
  logos,
  direction = 'left',
  duration = 60,
}: {
  logos: string[];
  direction?: 'left' | 'right';
  duration?: number;
}) {
  // Duplicamos la lista para un loop continuo sin saltos.
  const loop = [...logos, ...logos];

  return (
    <div className="marquee" data-dir={direction} style={{ ['--marquee-duration' as string]: `${duration}s` }}>
      <div className="marquee__track" aria-hidden="true">
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            style={{
              fontFamily   : 'var(--sans)',
              fontSize     : 'clamp(0.95rem, 1.6vw, 1.25rem)',
              fontWeight   : 700,
              letterSpacing: '-0.01em',
              color        : 'rgba(255,255,255,0.55)',
              whiteSpace   : 'nowrap',
              transition   : 'color 0.2s',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
```
Uso: `<LogoMarquee logos={['ESA', 'ONU', 'Edelvives', 'UNED']} direction="right" duration={55} />`

---

### `components/Reveal.tsx`
Wrapper de animación fade-up al entrar en viewport (IntersectionObserver).
Props: `children` (req.), `delay?: number` (segundos), `as?: 'div' | 'section' | 'span'`, `style?: CSSProperties`.

```tsx
'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Reveal — fade-up sutil al entrar en viewport (respeta reduced-motion vía CSS).
// ─────────────────────────────────────────────────────────────────────────────
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'span';
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Comp = Tag as 'div';
  return (
    <Comp
      ref={ref}
      style={{
        opacity   : shown ? 1 : 0,
        transform : shown ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}
```
Uso: `<Reveal delay={0.1}><h2>…</h2></Reveal>`

---

## 7) Componentes compartidos del §4 (para tus páginas)

Estos los construye Dev A; tú los **importas y usas** en ProfeLibre, Formaciones, etc.
Rutas:
```tsx
import HeroBlock         from '@/components/HeroBlock';
import TestimonialCard   from '@/components/TestimonialCard';
import Accordion         from '@/components/Accordion';
import TimelineHorizontal from '@/components/TimelineHorizontal';
```

> ⏳ **`<EmbedForm>` (Brevo)** es el ÚNICO componente del §4 que **NO está hecho**.
> Lo **construye Dev B**, porque depende de tu cuenta de Brevo (listId, doble opt-in,
> tracking). Dev A no lo monta. Úsalo en el Boletín y en la Lista de espera.

---

### `<HeroBlock />`
Cabecera con fondo de imagen opcional (velo oscuro + insinuación del gradiente), eyebrow, título, subtítulo, body y CTAs.

| Prop | Tipo | Notas |
|------|------|-------|
| `bgImage` | `string?` | Ruta de la foto de fondo. Sin ella, fondo negro. |
| `bgAlt` | `string?` | Alt de la foto (vacío = decorativa). |
| `eyebrow` | `{ number?, text }?` | Etiqueta "01 — INICIO". |
| `title` | `ReactNode` | H1 (admite `<br/>`). **Obligatorio.** |
| `subtitle` | `ReactNode?` | H2. |
| `body` | `ReactNode?` | Párrafo. |
| `ctas` | `{ label, href, variant?, arrow? }[]` | Botones (usa `CTAButton`). |
| `align` | `'left' \| 'center'` | Por defecto `'left'`. |
| `minHeight` | `string?` | Por defecto `'95svh'`. |

```tsx
<HeroBlock
  bgImage="/images/ponencia-7.jpg"
  eyebrow={{ text: 'ProfeLibre' }}
  title={<>Conviértete en un<br/>profe libre.</>}
  subtitle="El sistema completo de IA aplicada al aula."
  ctas={[{ label: 'Apúntame a la lista', href: '/lista-espera' }]}
/>
```

### `<TestimonialCard />`
Tarjeta de testimonio con foto opcional (si no hay, avatar con iniciales).
Props: `photo?: string`, `quote: string` (obligatorio), `name: string` (obligatorio), `role?: string`.
```tsx
<TestimonialCard quote="Recuperé mis tardes." name="María L." role="Profesora · Secundaria" />
```

### `<Accordion />`
Lista plegable accesible (aria-expanded, chevron que gira). FAQ de ProfeLibre y Formaciones.
Props: `items: { title: string; content: ReactNode }[]`, `allowMultiple?: boolean` (por defecto `false`).
```tsx
<Accordion items={[
  { title: '¿Cuándo abre el carrito?', content: 'El lunes 22 de junio a las 19:00.' },
  { title: '¿Cuánto cuesta?', content: 'Early bird 297 €; después 347 €.' },
]} />
```

### `<TimelineHorizontal />`
Pasos con línea conectora. Desktop en fila horizontal; móvil en columna. ProfeLibre §05.
Props: `steps: { label?: string; title: string; text?: string }[]`.
```tsx
<TimelineHorizontal steps={[
  { label: 'Junio', title: 'Apertura', text: 'Acceso al curso y la comunidad.' },
  { label: 'Sept', title: 'Arranque de curso', text: 'Aplicas la IA desde el día 1.' },
  { label: 'Junio 27', title: 'Cierre', text: '12 meses de actualizaciones.' },
]} />
```

---

## Notas finales
- **Acento lavanda** `#B59FE5` (`--eyebrow-color` / `--link-color`) para eyebrows y links; **gradiente de marca** (`--brand-gradient`, 3 paradas violeta→magenta→naranja) solo para los "color moments" puntuales (no abusar, máx. 3 en la home).
- **Texto secundario** `#A1A1AA` sobre fondos oscuros.
- **Tarjetas:** fondo `--bg-card` (#141414), borde `--border-subtle`, radio ~14px.
- **Mobile-first:** usa `svh` (no `100vh`) en alturas de pantalla completa.
- El nav del Header/Footer apunta a rutas de la web (`/cursos`, `/blog`, etc.). Ajusta los `href` en tu landing si alguno no existe.

_Cualquier duda o si necesitas más componentes (Card, SectionEyebrow, LogoMarquee, Reveal), pídemelos y te los paso igual._
