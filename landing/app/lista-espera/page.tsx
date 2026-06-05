'use client';

import { useState, useEffect, useRef, useCallback, type FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Compass, Users, RefreshCw } from 'lucide-react';
import CTAButton from '@/components/CTAButton';
import LogoMarquee from '@/components/LogoMarquee';
import Reveal from '@/components/Reveal';
import AnimatedCounter from '@/components/AnimatedCounter';
import HeroCanvas from '@/components/HeroCanvas';
import StaggerWords from '@/components/StaggerWords';

// ─────────────────────────────────────────────────────────────────────────────
// Declaraciones globales para fbq y gtag (inyectados por píxel externo).
// ─────────────────────────────────────────────────────────────────────────────
declare function fbq(event: string, name: string): void;
declare function gtag(command: string, event: string, params?: Record<string, unknown>): void;

// Instituciones simuladas para el marquee de social proof
const INSTITUCIONES = [
  'Universidad de Sevilla',
  'IES Macarena',
  'Edelvives Editorial',
  'INTEF — Ministerio',
  'Colegio Salesiano',
];

// Beneficios del programa (3 puntos)
const BENEFICIOS = [
  {
    titulo: 'Método probado',
    desc: 'Un sistema paso a paso para integrar IA en tu aula sin perder la esencia docente.',
  },
  {
    titulo: 'Comunidad activa',
    desc: 'Accede a un grupo de profes que comparten recursos, dudas y victorias cada semana.',
  },
  {
    titulo: 'Actualizaciones incluidas',
    desc: 'El curso crece contigo: nuevos módulos cada trimestre sin coste adicional.',
  },
];

const BENEFICIOS_ICONS = [Compass, Users, RefreshCw];

// Testimonios — 6 entradas para 2 páginas de rotación (3 + 3)
const TESTIMONIOS = [
  {
    quote: 'En tres semanas tenía mis primeras unidades didácticas con IA. Imprescindible.',
    name : 'María G.',
    role : 'Profesora de Secundaria',
  },
  {
    quote: 'Pasé de tener miedo a la IA a usarla en cada reunión de equipo.',
    name : 'Carlos P.',
    role : 'Jefe de Estudios, IES Ramón y Cajal',
  },
  {
    quote: 'El formato asíncrono me permitió compaginarlo con las oposiciones. 10/10.',
    name : 'Ana R.',
    role : 'Maestra de Primaria',
  },
  {
    quote: 'El módulo de comunicación me cambió la relación con las familias. Los correos ya no me quitan el domingo.',
    name : 'Tomás V.',
    role : 'Jefe de Departamento, Bachillerato',
  },
  {
    quote: 'Las rúbricas las tengo listas en 10 minutos. Era impensable hace un año.',
    name : 'María G.',
    role : 'Profesora de Lengua, IES Cervantes',
  },
  {
    quote: 'Llegué a junio sin agotarme por primera vez en años. El sistema funciona de verdad.',
    name : 'Elena V.',
    role : 'Maestra de Primaria',
  },
];

/** Duración del cross-fade en ms — se usa en CSS y en el setTimeout */
const FADE_MS   = 180;
/** Intervalo de rotación automática en ms */
const ROTATE_MS = 6000;

/**
 * Sección de testimonios con rotación automática y puntos interactivos.
 * Al hacer clic en un punto se reinicia el temporizador automático.
 */
function TestimoniosSection() {
  const [page, setPage]           = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef               = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalPages = Math.ceil(TESTIMONIOS.length / 3);

  /** Cambia a una página con cross-fade suave y reinicia el temporizador */
  const goToPage = useCallback((next: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setPage(next);
      setIsVisible(true);
    }, FADE_MS);

    // Reinicia el intervalo para que no salte justo después de un clic manual
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setPage(prev => {
          const nextAuto = (prev + 1) % totalPages;
          return nextAuto;
        });
        setIsVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
  }, [totalPages]);

  // Arranca el intervalo al montar
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setPage(prev => (prev + 1) % totalPages);
        setIsVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [totalPages]);

  const visibleTestimonials = TESTIMONIOS.slice(page * 3, page * 3 + 3);

  return (
    <section style={{ paddingBlock: 'clamp(4rem, 10vw, 7rem)', background: 'var(--bg-deep)' }}>
      <div style={{ width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>02 — Lo que dicen</p>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Profes que ya dieron el salto.
          </h2>
        </Reveal>

        {/* Grid animado — cross-fade rápido al rotar */}
        <div
          style={{
            display   : 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap       : '1.5rem',
            alignItems: 'stretch',
            opacity   : isVisible ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        >
          {visibleTestimonials.map(({ quote, name, role }) => (
            <blockquote
              key={name + role}
              className="flex flex-col h-full p-8 bg-zinc-900/50 border border-white/10 rounded-2xl"
            >
              <p className="text-zinc-300 italic flex-grow text-lg leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="font-bold text-white">{name}</p>
                <p className="text-sm text-purple-400">{role}</p>
              </div>
            </blockquote>
          ))}
        </div>

        {/* Puntos interactivos */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver testimonios ${i + 1}`}
              disabled={i === page}
              onClick={() => goToPage(i)}
              style={{
                width       : i === page ? '1.75rem' : '0.55rem',
                height      : '0.55rem',
                borderRadius: '999px',
                border      : 'none',
                cursor      : i === page ? 'default' : 'pointer',
                background  : i === page ? '#a78bfa' : 'rgba(255,255,255,0.25)',
                transition  : 'all 0.35s ease',
                padding     : 0,
                flexShrink  : 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Componente interno que maneja la lógica y usa useSearchParams
 */
function ContenidoListaEspera() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nombre, setNombre] = useState('');
  const [email, setEmail]   = useState('');
  const [estado, setEstado] = useState<'idle' | 'loading' | 'ok'>('idle');

  /**
   * Gestiona el envío del formulario Brevo.
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === 'loading') return;
    setEstado('loading');

    // ── Lectura de parámetros UTM para atribución ──────────────────────────
    const utmSource   = searchParams.get('utm_source')   ?? '(direct)';
    const utmMedium   = searchParams.get('utm_medium')   ?? '(none)';
    const utmCampaign = searchParams.get('utm_campaign') ?? '(none)';

    // ── Tracking de conversión (Meta Pixel) ────────────────────────────────
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead');
    }

    // ── Tracking de conversión (Google Ads / GA4) ──────────────────────────
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        event_category: 'lista_espera',
        utm_source    : utmSource,
        utm_medium    : utmMedium,
        utm_campaign  : utmCampaign,
      });
    }

    // ── Envío simulado (reemplazar con fetch a Brevo en producción) ─────────
    setTimeout(() => {
      setEstado('ok');
      router.push('/lista-espera/gracias');
    }, 900);
  }

  return (
    <>
      {/* ── MINI HEADER ─────────────────────────────────────────────────── */}
      <header style={{
        position    : 'sticky',
        top         : 0,
        zIndex      : 100,
        display     : 'flex',
        alignItems  : 'center',
        justifyContent: 'space-between',
        height      : 'var(--header-h)',
        paddingInline: 'clamp(1.25rem, 5vw, 3rem)',
        background  : 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
          JOSEDA
        </span>
        <Link href="/" aria-label="Cerrar y volver al inicio"
          style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)',
            border: '1px solid var(--border-subtle)', padding: '0.35rem 0.75rem', letterSpacing: '0.05em' }}>
          [ ✕ ]
        </Link>
      </header>

      <main>
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section style={{
          position     : 'relative',
          overflow     : 'hidden',
          minHeight    : '90svh',
          display      : 'flex',
          alignItems   : 'center',
          background   : 'var(--bg-primary)',
          paddingBlock : 'clamp(4rem, 10svh, 8rem)',
        }}>
          <HeroCanvas />

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
            <Reveal variant="fade">
              {/* Chip de urgencia — pulso continuo escala + glow */}
              <div
                className="chip-pulse"
                style={{
                  alignItems   : 'center',
                  gap          : '0.5rem',
                  fontFamily   : 'var(--mono)',
                  fontSize     : '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color        : 'var(--accent-blue)',
                  background   : 'rgba(59,130,246,0.12)',
                  border       : '1px solid rgba(59,130,246,0.3)',
                  padding      : '0.45rem 0.9rem',
                  marginBottom : '2rem',
                  borderRadius : '4px',
                }}
              >
                ▸▸▸ Apertura 22 de junio · 19:00 h
              </div>
            </Reveal>

            <StaggerWords
              text="Conviértete en un profe libre el curso 26‑27."
              baseDelay={0.08}
              wordDelay={0.07}
              style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2.4rem, 6.5vw, 5rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.05,
                color        : '#fff',
                maxWidth     : '18ch',
                marginBottom : 'clamp(1.25rem, 3vw, 2rem)',
              }}
            />

            <Reveal variant="slide-up" delay={0.42}>
              <p style={{
                fontSize  : 'clamp(1.05rem, 2vw, 1.3rem)',
                color     : 'var(--text-secondary)',
                maxWidth  : '52ch',
                lineHeight: 1.65,
                marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
              }}>
                El programa online con el que docentes de toda España aprenden a usar la IA sin perder su voz pedagógica — y recuperan horas de vida.
              </p>
            </Reveal>

            {/* Lista de beneficios rápidos */}
            <Reveal variant="slide-up" delay={0.54}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
                {(['Aprende a tu ritmo, 100 % online', 'Actualizaciones gratis de por vida'] as const).map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(255,255,255,0.82)' }}>
                    <span aria-hidden="true" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', color: 'rgba(255,255,255,0.82)' }}>
                  <span aria-hidden="true" style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>✓</span>
                  Comunidad de{' '}
                  <AnimatedCounter value={500} prefix="+" suffix=" docentes activos" />
                </li>
              </ul>
            </Reveal>

            {/* ── FORMULARIO BREVO ────────────────────────────────────────── */}
            <Reveal variant="slide-up" delay={0.64}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '440px' }}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  required
                  autoComplete="given-name"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
                <CTAButton
                  type="submit"
                  variant="primary"
                  arrow={false}
                  style={{ justifyContent: 'center', opacity: estado === 'loading' ? 0.6 : 1 }}
                >
                  {estado === 'loading' ? 'Apuntando…' : 'Apuntarme a la lista →'}
                </CTAButton>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>
                  Sin spam. Puedes darte de baja cuando quieras.
                </p>
              </form>
            </Reveal>
          </div>
        </section>

        {/* ── SOCIAL PROOF — MARQUEE ────────────────────────────────────── */}
        <section style={{ paddingBlock: 'clamp(2.5rem, 6vw, 4rem)', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
          <p style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>
            Docentes de instituciones como
          </p>
          <LogoMarquee logos={INSTITUCIONES} duration={40} />
        </section>

        {/* ── BENEFICIOS (3 columnas) ───────────────────────────────────── */}
        <section style={{ paddingBlock: 'clamp(4rem, 10vw, 7rem)', background: 'var(--bg-primary)' }}>
          <div style={{ width: '100%', maxWidth: 1280, marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>01 — Lo que consigues</p>
              <h2 style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 'clamp(2.5rem, 6vw, 4rem)', maxWidth: '28ch' }}>
                Todo lo que necesitas para dar el salto.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {BENEFICIOS.map(({ titulo, desc }, i) => {
                const Icon = BENEFICIOS_ICONS[i];
                return (
                  <Reveal key={titulo} delay={i * 0.1} style={{ height: '100%' }}>
                    <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-zinc-900/50 border border-white/10 h-full
                      hover:border-purple-500/40 hover:bg-zinc-900/80
                      hover:shadow-[0_8px_40px_rgba(147,51,234,0.35)]
                      hover:scale-[1.04]
                      transition-all duration-300 ease-out">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-purple-500/50 transition-colors">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{titulo}</h3>
                      <p className="text-zinc-400 leading-relaxed">{desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS (rotación automática cada 10 s) ───────────────── */}
        <TestimoniosSection />

        {/* ── CIERRE CTA ────────────────────────────────────────────────── */}
        <section style={{
          paddingBlock: 'clamp(5rem, 14svh, 10rem)',
          background  : 'var(--bg-primary)',
          textAlign   : 'center',
          position    : 'relative',
          overflow    : 'hidden',
        }}>

          {/* Keyframes del botón animado — igual que en /cursos/profelibre sección 09 */}
          <style>{`
            @keyframes le-aura-pulse  { 0%,100%{opacity:.38} 50%{opacity:.78} }
            @keyframes le-btn-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
            @keyframes le-ring-ping   { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.8);opacity:0} }

            .le-cta-btn {
              position:relative; z-index:1; display:inline-flex; align-items:center; gap:.6rem;
              background:#fff; color:#0a0a0a;
              font-family:var(--mono); font-size:.88rem; font-weight:700; letter-spacing:.08em;
              text-transform:uppercase; text-decoration:none;
              padding:1.1rem 2.4rem; border-radius:999px;
              animation: le-btn-breathe 3.5s ease-in-out infinite;
              transition: transform .25s ease, box-shadow .25s ease;
              cursor:pointer; border:none;
            }
            .le-cta-btn:hover {
              transform: scale(1.07) !important;
              animation-play-state: paused;
              box-shadow: 0 18px 52px rgba(0,0,0,0.45);
            }
            .le-cta-arrows {
              display:inline-block;
              transition: transform .3s ease;
            }
            .le-cta-btn:hover .le-cta-arrows { transform: translateX(7px); }
          `}</style>

          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            gap          : 'clamp(1.5rem, 4vw, 2.5rem)',
          }}>
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>▸▸▸ Apertura 22 de junio · 19:00 h</p>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                maxWidth     : '22ch',
                marginInline : 'auto',
              }}>
                Las plazas son limitadas. No te quedes fuera.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              {/* Botón con aura + ping + latido — scroll al formulario */}
              <div style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>

                {/* Aura desenfocada morado→cian */}
                <div style={{
                  position:'absolute', inset:'-12px',
                  background:'linear-gradient(135deg,#7c3aed,#06b6d4)',
                  filter:'blur(30px)',
                  borderRadius:'999px',
                  zIndex:0,
                  animation:'le-aura-pulse 3s ease-in-out infinite',
                  pointerEvents:'none',
                }} />

                {/* Anillo ping — 1ª onda */}
                <div style={{
                  position:'absolute', inset:'-2px',
                  border:'2px solid rgba(124,58,237,.65)',
                  borderRadius:'999px',
                  animation:'le-ring-ping 2.4s ease-out infinite',
                  pointerEvents:'none',
                }} />

                {/* Anillo ping — 2ª onda (desfasada) */}
                <div style={{
                  position:'absolute', inset:'-2px',
                  border:'2px solid rgba(124,58,237,.45)',
                  borderRadius:'999px',
                  animation:'le-ring-ping 2.4s ease-out .9s infinite',
                  pointerEvents:'none',
                }} />

                {/* Botón principal — hace scroll al formulario del hero */}
                <a
                  href="#"
                  className="le-cta-btn"
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  APÚNTAME A LA LISTA DE ESPERA
                  {' '}<span className="le-cta-arrows">→ →</span>
                </a>
              </div>

              <p style={{ marginTop:'1rem', fontFamily:'var(--mono)', fontSize:'.7rem', letterSpacing:'.06em', color:'rgba(255,255,255,.38)' }}>
                Apertura 22 jun · 19:00 h · Precio early bird solo 48 h
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── MINI FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{
        borderTop  : '1px solid var(--border-subtle)',
        paddingBlock: '1.5rem',
        paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
        display    : 'flex',
        justifyContent: 'center',
        background : 'var(--bg-deep)',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>
          © 2026 Joseda
        </p>
      </footer>
    </>
  );
}

/**
 * Landing de lista de espera — Curso Profe Libre 26-27.
 * Exportamos el componente envuelto en Suspense para Next.js.
 */
export default function ListaEsperaPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}></div>}>
      <ContenidoListaEspera />
    </Suspense>
  );
}

// ── Estilos compartidos para inputs del formulario ──────────────────────────
const inputStyle: React.CSSProperties = {
  width       : '100%',
  background  : 'rgba(255,255,255,0.05)',
  border      : '1px solid var(--border-subtle)',
  borderRadius: '6px',
  padding     : '0.9rem 1rem',
  fontSize    : '0.95rem',
  color       : '#fff',
  fontFamily  : 'var(--sans)',
  outline     : 'none',
  transition  : 'border-color 0.2s',
};