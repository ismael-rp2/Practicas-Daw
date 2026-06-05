import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import Card from '@/components/Card';
import LogoMarquee from '@/components/LogoMarquee';
import SectionEyebrow from '@/components/SectionEyebrow';
import Reveal from '@/components/Reveal';
import HoverWord from '@/components/HoverWord';
import HeroCanvas from '@/components/HeroCanvas';
import StaggerWords from '@/components/StaggerWords';
import ParallaxBg from '@/components/ParallaxBg';
import ServicesSection from '@/components/ServicesSection';


// Wordmarks para el marquee de social proof
const INSTITUCIONES = [
  'Universidad de Sevilla',
  'INTEF — Ministerio de Educación',
  'Edelvives Editorial',
  'GEG Spain',
  'IES Macarena',
  'Fundación Telefónica Educa',
  'Colegio Salesiano',
  'TEDx',
];

/**
 * Home — página principal de joseda.education.
 * Presenta la propuesta de valor y distribuye tráfico al resto de secciones.
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main>

        {/* ════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          position    : 'relative',
          overflow    : 'hidden',
          background  : 'var(--bg-primary)',  /* fallback si el canvas no carga */
          minHeight   : '88svh',
          display     : 'flex',
          alignItems  : 'center',
          paddingBlock: 'clamp(5rem, 14svh, 10rem)',
        }}>
          {/* Canvas de red neuronal — posición absoluta detrás del contenido */}
          <HeroCanvas />

          <div style={{
            position     : 'relative',
            zIndex       : 1,
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            {/* Eyebrow — fade simple */}
            <Reveal variant="fade">
              <SectionEyebrow text="joseda.education" />
            </Reveal>

            {/* H1 — stagger por palabras: cada una entra con slideUp escalonado */}
            <StaggerWords
              text="Educación + Inteligencia Artificial."
              baseDelay={0.1}
              wordDelay={0.08}
              style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(3rem, 8vw, 6.5rem)',
                fontWeight   : 900,
                letterSpacing: '-0.04em',
                lineHeight   : 1.0,
                color        : '#fff',
                marginTop    : '1rem',
                marginBottom : 'clamp(1.5rem, 3.5vw, 2.5rem)',
                maxWidth     : '16ch',
              }}
            />

            {/* Subtítulo — slideUp sincronizado tras el titular */}
            <Reveal variant="slide-up" delay={0.38}>
              <p style={{
                fontSize    : 'clamp(1.05rem, 2.2vw, 1.3rem)',
                lineHeight  : 1.65,
                color       : 'var(--text-secondary)',
                maxWidth    : '52ch',
                marginBottom: 'clamp(2rem, 5vw, 3rem)',
              }}>
                Soy Joseda. Docente y formador especializado en integrar la IA en el aula con criterio pedagógico real. Sin hype, sin tecnicismos vacíos: herramientas que funcionan el lunes siguiente.
              </p>
            </Reveal>

            {/* CTAs — slideUp justo después del subtítulo */}
            <Reveal variant="slide-up" delay={0.52} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <CTAButton href="/boletin" variant="primary">
                Suscribirme a EDU + IA →
              </CTAButton>
              <CTAButton href="/cursos/profelibre" variant="secondary" arrow={false}>
                Ver ProfeLibre
              </CTAButton>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SOCIAL PROOF — MARQUEE
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-deep)',
          paddingBlock: 'clamp(2.5rem, 6vw, 4rem)',
          borderTop   : '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
            marginBottom : '1.75rem',
          }}>
            <Reveal variant="fade">
              <p style={{
                fontFamily   : 'var(--mono)',
                fontSize     : '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color        : 'rgba(255,255,255,0.3)',
              }}>
                Instituciones con las que he trabajado
              </p>
            </Reveal>
          </div>
          <LogoMarquee logos={INSTITUCIONES} duration={80} />
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CÓMO TE AYUDO — 3 tarjetas de servicios
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            <Reveal variant="slide-up">
              <SectionEyebrow number="01" text="Cómo te ayudo" />
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                marginTop    : '1.25rem',
                marginBottom : 'clamp(2.5rem, 6vw, 4rem)',
                maxWidth     : '28ch',
              }}>
                Elige tu punto de entrada.
              </h2>
            </Reveal>

            <ServicesSection />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            MANIFIESTO — imagen de fondo _DSC5498 + overlay oscuro
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          position  : 'relative',
          overflow  : 'hidden',
          paddingBlock: 'clamp(5rem, 14svh, 9rem)',
          textAlign : 'center',
        }}>
          {/* Imagen de fondo con parallax — el componente calcula el offset en scroll */}
          <ParallaxBg src="/_DSC5498.jpg" />

          {/* Overlay semitransparente para legibilidad del texto */}
          <div aria-hidden="true" style={{
            position  : 'absolute',
            inset     : 0,
            zIndex    : 1,
            background: 'rgba(0, 0, 0, 0.58)',
          }} />

          {/* Contenido — z-index por encima del overlay */}
          <div style={{
            position     : 'relative',
            zIndex       : 2,
            width        : '100%',
            maxWidth     : 900,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            {/* scaleIn lento: zoom sutil de 0.92→1 durante 0.9 s */}
            <Reveal variant="scale-in" duration={0.9} delay={0.1}>
              <p style={{
                fontFamily   : 'var(--mono)',
                fontSize     : '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color        : 'rgba(255,255,255,0.6)',
                marginBottom : '1.5rem',
              }}>
                El manifiesto
              </p>
              <blockquote style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.5rem, 4vw, 2.75rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.4,
                color        : '#fff',
                fontStyle    : 'normal',
              }}>
                <HoverWord
                  text='"La IA no va a reemplazar a los buenos docentes. Va a ampliar la distancia entre los que tienen un sistema y los que no."'
                  liftAmount={-10}
                />
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            ÚLTIMAS ENTRADAS DEL BLOG
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            <Reveal variant="slide-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <div>
                <SectionEyebrow number="02" text="Blog" />
                <h2 style={{
                  fontFamily   : 'var(--sans)',
                  fontSize     : 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight   : 800,
                  letterSpacing: '-0.03em',
                  lineHeight   : 1.1,
                  color        : '#fff',
                  marginTop    : '1.25rem',
                }}>
                  Ideas que llegan al lunes.
                </h2>
              </div>
              <CTAButton href="/blog" variant="ghost">
                Ver todos los artículos
              </CTAButton>
            </Reveal>

            {(() => {
              const posts = [
                { cat: 'IA', date: 'Jun 2026',  meta: 'IA · Jun 2026',        title: 'ChatGPT en el aula: lo que funciona y lo que es puro humo', body: 'Separamos las aplicaciones pedagógicas reales de los titulares vacíos.', href: '/blog/hello-world' },
                { cat: 'Pedagogía', date: 'May 2026', meta: 'Pedagogía · May 2026', title: 'Cómo evaluar con IA sin perder tu criterio docente',        body: 'Tres estrategias para que la IA te ayude a corregir sin sustituirte.',   href: '/blog/ia-evaluacion-docente' },
                { cat: 'Opinión', date: 'Abr 2026',   meta: 'Opinión · Abr 2026',   title: 'Profe libre: cómo llegar a junio sin agotarte',             body: 'El agotamiento docente no es inevitable. Es el resultado de no tener un sistema.', href: '/blog/profe-libre-sin-agotamiento' },
              ];
              const hero = posts[0];
              const side = posts.slice(1, 3);
              return (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mt-12">
                  {/* ── Artículo destacado ─────────────────────────────── */}
                  <Reveal variant="slide-up" className="lg:col-span-2">
                    <a href={hero.href}>
                      <article className="group cursor-pointer flex flex-col">
                        <p className="text-sm font-mono text-purple-400 mb-4 tracking-wide">{hero.meta}</p>
                        {/* Imagen de portada (gradiente simulado) */}
                        <div className="relative w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden border border-white/10 group-hover:border-purple-500/50 transition-colors duration-500 shadow-2xl shadow-purple-900/20">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-zinc-900 to-zinc-950" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <span style={{ fontSize: '6rem', lineHeight: 1 }}>🤖</span>
                          </div>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors leading-tight tracking-tight">
                          {hero.title}
                        </h3>
                        <p className="text-xl text-zinc-400 mb-8 leading-relaxed max-w-2xl line-clamp-3">{hero.body}</p>
                        <span className="inline-flex items-center justify-center px-6 py-3 mt-4 text-sm font-bold text-white bg-purple-600 rounded-xl hover:bg-purple-500 hover:scale-105 transition-all duration-300 w-fit">
                          Leer artículo principal
                        </span>
                      </article>
                    </a>
                  </Reveal>

                  {/* ── Feed secundario ────────────────────────────────── */}
                  <div className="lg:col-span-1 flex flex-col justify-start gap-2 border-t lg:border-t-0 lg:border-l border-white/5 pt-10 lg:pt-0 lg:pl-10">
                    {side.map((post, i) => (
                      <Reveal key={post.href} variant="slide-up" staggerIndex={i + 1}>
                        <a href={post.href}>
                          <article className="group cursor-pointer flex flex-col p-6 rounded-2xl hover:bg-white/[0.02] transition-colors duration-300">
                            <div className="flex items-center gap-2 text-xs font-mono mb-3">
                              <span className="text-purple-400">{post.cat}</span>
                              <span className="text-zinc-600">•</span>
                              <span className="text-zinc-500">{post.date}</span>
                            </div>
                            <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                              {post.title}
                            </h4>
                            <span className="mt-4 text-sm font-bold text-zinc-500 group-hover:text-purple-400 flex items-center gap-2 transition-colors">
                              Leer <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                          </article>
                        </a>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CIERRE — CTA boletín con imagen de fondo _DSC5564
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          position    : 'relative',
          overflow    : 'hidden',
          paddingBlock: 'clamp(5rem, 14svh, 9rem)',
          textAlign   : 'center',
        }}>
          {/* Imagen de fondo con parallax */}
          <ParallaxBg src="/_DSC5564.jpg" />

          {/* Overlay semitransparente para legibilidad */}
          <div aria-hidden="true" style={{
            position  : 'absolute',
            inset     : 0,
            zIndex    : 1,
            background: 'rgba(0, 0, 0, 0.58)',
          }} />

          {/* Contenido — z-index por encima del overlay */}
          <div style={{
            position     : 'relative',
            zIndex       : 2,
            width        : '100%',
            maxWidth     : 640,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            gap          : 'clamp(1.25rem, 3vw, 2rem)',
          }}>
            {/* scaleIn — resalta el bloque de conversión */}
            <Reveal variant="scale-in">
              <p style={{
                fontFamily   : 'var(--mono)',
                fontSize     : '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color        : 'rgba(255,255,255,0.5)',
              }}>
                Cada semana · Gratis · Sin spam
              </p>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.75rem, 4.5vw, 3rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                marginTop    : '0.75rem',
                maxWidth     : '26ch',
              }}>
                Únete a +2.500 docentes que ya están un paso por delante.
              </h2>
            </Reveal>
            <Reveal variant="scale-in" delay={0.12}>
              <CTAButton href="/boletin" variant="primary" style={{ fontSize: '0.9rem', padding: '1.1rem 2.4rem' }}>
                QUIERO RECIBIRLO →
              </CTAButton>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
