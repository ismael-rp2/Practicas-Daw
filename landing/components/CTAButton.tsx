'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CTAButton — jerarquía estricta de CTAs (§2.4)
//   primary   → botón blanco sólido (CTA principal)
//   secondary → botón outline blanco (contextual)
//   ghost     → link de texto subrayado al hover (terciario)
// ─────────────────────────────────────────────────────────────────────────────
export type CTAVariant = 'primary' | 'secondary' | 'ghost';

const base: CSSProperties = {
  display       : 'inline-flex',
  alignItems    : 'center',
  // gap se gestiona en el inner span para aislar la microinteracción
  fontFamily    : 'var(--sans)',
  fontSize      : '0.82rem',
  fontWeight    : 600,
  letterSpacing : '0.06em',
  textTransform : 'uppercase',
  lineHeight    : 1,
  cursor        : 'pointer',
  transition    : 'background 0.2s, color 0.2s, border-color 0.2s, opacity 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
  whiteSpace    : 'nowrap',
};

const variants: Record<CTAVariant, CSSProperties> = {
  primary: {
    ...base,
    padding     : '0.95rem 2.1rem',
    background  : '#ffffff',
    color       : '#0A0A0A',
    border      : '1px solid #ffffff',
    borderRadius: '999px',
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
    padding      : '0.25rem 0',
    background   : 'transparent',
    color        : 'var(--accent-blue-soft)',
    border       : 'none',
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
  /** Ref al span interior para animar el texto sin afectar el layout del botón */
  const innerRef = useRef<HTMLSpanElement>(null);

  const content = (
    <span
      ref={innerRef}
      style={{
        display    : 'inline-flex',
        alignItems : 'center',
        gap        : '0.55rem',
        transition : 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange : 'transform',
      }}
    >
      {children}
      {arrow && <span aria-hidden="true" style={{ fontSize: '1em', lineHeight: 1 }}>→</span>}
    </span>
  );

  const hover = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    const el = e.currentTarget as HTMLElement;
    if (variant === 'primary') {
      el.style.transform = on ? 'scale(1.07)' : 'scale(1)';
      el.style.boxShadow = on ? '0 8px 32px rgba(255,255,255,0.18), 0 2px 12px rgba(0,0,0,0.35)' : 'none';
    }
    if (variant === 'secondary') { el.style.background = on ? '#ffffff' : 'transparent'; el.style.color = on ? '#0A0A0A' : '#ffffff'; }
    if (variant === 'ghost')     el.style.textDecoration = on ? 'underline' : 'none';
    // Microinteracción: deslizamiento del contenido interno (secundario y ghost)
    if (variant !== 'primary' && innerRef.current) {
      innerRef.current.style.transform = on
        ? 'translateY(-2px) scale(1.02)'
        : 'translateY(0) scale(1)';
    }
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
