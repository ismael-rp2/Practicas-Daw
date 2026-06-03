import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import Card from '@/components/Card';
import Reveal from '@/components/Reveal';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';

// ─────────────────────────────────────────────────────────────────────────────
// Genera las rutas estáticas para todos los slugs disponibles
// ─────────────────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Artículos relacionados hardcodeados (placeholder mientras no haya CMS)
const SUGERIDOS = [
  {
    meta    : 'IA · 1 jun 2026',
    title   : 'ChatGPT en el aula: lo que funciona y lo que es puro humo',
    body    : 'Separamos las aplicaciones pedagógicas reales de los titulares vacíos.',
    linkText: 'Leer artículo',
    href    : '/blog/hello-world',
  },
  {
    meta    : 'Pedagogía · 18 may 2026',
    title   : 'Cómo evaluar con IA sin perder tu criterio docente',
    body    : 'Tres estrategias para que la IA te ayude a corregir sin sustituirte.',
    linkText: 'Leer artículo',
    href    : '/blog/ia-evaluacion-docente',
  },
  {
    meta    : 'Opinión · 30 abr 2026',
    title   : 'Profe libre: cómo llegar a junio sin agotarte',
    body    : 'El agotamiento docente no es inevitable. Es el resultado de no tener un sistema.',
    linkText: 'Leer artículo',
    href    : '/blog/profe-libre-sin-agotamiento',
  },
];

/**
 * Página de artículo individual del blog (§5.9).
 * Server Component: lee el .md según el slug de la URL y lo renderiza como HTML.
 * En Next.js 15+ los params son una Promise que debe resolverse con await.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    // Si el archivo .md no existe, redirige al 404
    notFound();
  }

  const readingTime = post.readingTime ?? estimateReadingTime(post.contentHtml);

  return (
    <>
      <Header />

      <main>

        {/* ════════════════════════════════════════════════════════════════
            CABECERA DEL POST
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10svh, 7rem)' }}>
          <div style={{
            width        : '100%',
            maxWidth     : 800,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 2rem)',
          }}>
            <Reveal>
              {/* Categoría + fecha + tiempo de lectura */}
              <div style={{
                display    : 'flex',
                flexWrap   : 'wrap',
                gap        : '0.75rem',
                marginBottom: '1.5rem',
                alignItems : 'center',
              }}>
                <span style={{
                  fontFamily   : 'var(--mono)',
                  fontSize     : '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color        : 'var(--accent-blue)',
                }}>
                  {post.category}
                </span>
                <span style={{ color: 'var(--border-subtle)', fontSize: '0.7rem' }}>·</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>
                  {formatDate(post.date)}
                </span>
                <span style={{ color: 'var(--border-subtle)', fontSize: '0.7rem' }}>·</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>
                  {readingTime} min de lectura
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <h1 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight   : 900,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                marginBottom : 'clamp(1.5rem, 3vw, 2rem)',
              }}>
                {post.title}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p style={{
                fontSize  : 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: 1.7,
                color     : 'var(--text-secondary)',
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
              }}>
                {post.excerpt}
              </p>
            </Reveal>

            {/* Imagen de portada (placeholder si no existe el archivo) */}
            <Reveal delay={0.15}>
              <div style={{
                width       : '100%',
                aspectRatio : '16 / 9',
                background  : 'var(--bg-card)',
                border      : '1px solid var(--border-subtle)',
                borderRadius: '14px',
                overflow    : 'hidden',
                display     : 'flex',
                alignItems  : 'center',
                justifyContent: 'center',
                marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
              }}>
                <span style={{
                  fontFamily   : 'var(--mono)',
                  fontSize     : '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color        : 'rgba(255,255,255,0.2)',
                }}>
                  {post.coverImage ?? 'Imagen del artículo'}
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CUERPO DEL ARTÍCULO — HTML generado desde Markdown
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBottom: 'clamp(4rem, 10vw, 7rem)' }}>
          <div
            style={{
              width        : '100%',
              maxWidth     : 800,
              marginInline : 'auto',
              paddingInline: 'clamp(1.25rem, 5vw, 2rem)',
            }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
          {/* Estilos tipográficos para el contenido generado por remark */}
          <style>{`
            [data-blog-body] h2,
            .prose h2 { font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 800; letter-spacing: -0.02em; color: #fff; margin-top: 2.5rem; margin-bottom: 1rem; }
            [data-blog-body] h3 { font-size: clamp(1.1rem, 2vw, 1.35rem); font-weight: 700; color: #fff; margin-top: 2rem; margin-bottom: 0.75rem; }
            [data-blog-body] p  { font-size: clamp(0.98rem, 1.8vw, 1.08rem); line-height: 1.8; color: var(--text-secondary); margin-bottom: 1.25rem; }
            [data-blog-body] strong { color: #fff; font-weight: 600; }
            [data-blog-body] ul, [data-blog-body] ol { padding-left: 1.5rem; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
            [data-blog-body] li { font-size: clamp(0.95rem, 1.7vw, 1.05rem); line-height: 1.7; color: var(--text-secondary); }
            [data-blog-body] code { font-family: var(--mono); font-size: 0.85em; background: rgba(255,255,255,0.07); padding: 0.15em 0.4em; border-radius: 4px; color: var(--accent-blue-soft); }
            [data-blog-body] pre  { background: #111; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.25rem 1.5rem; overflow-x: auto; margin-bottom: 1.5rem; }
            [data-blog-body] pre code { background: none; padding: 0; color: rgba(255,255,255,0.82); font-size: 0.88rem; }
            [data-blog-body] hr { border: none; border-top: 1px solid var(--border-subtle); margin-block: 2.5rem; }
            [data-blog-body] a  { color: var(--accent-blue-soft); text-decoration: underline; }
            [data-blog-body] blockquote { border-left: 3px solid var(--accent-blue); padding-left: 1.25rem; color: rgba(255,255,255,0.65); font-style: italic; margin-bottom: 1.5rem; }
          `}</style>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            ARTÍCULOS SUGERIDOS
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-deep)',
          borderTop   : '1px solid var(--border-subtle)',
          paddingBlock: 'clamp(4rem, 10vw, 7rem)',
        }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            <Reveal>
              <p style={{
                fontFamily   : 'var(--mono)',
                fontSize     : '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color        : 'var(--accent-blue)',
                marginBottom : '1.5rem',
              }}>
                Si te gustó esto…
              </p>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                color        : '#fff',
                marginBottom : 'clamp(2rem, 5vw, 3rem)',
              }}>
                Puede que esto también te interese.
              </h2>
            </Reveal>

            <div style={{
              display            : 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap                : 'clamp(1.25rem, 3vw, 2rem)',
            }}>
              {SUGERIDOS.filter((s) => s.href !== `/blog/${slug}`).slice(0, 3).map((art, i) => (
                <Reveal key={art.href} delay={i * 0.08}>
                  <Card
                    meta={art.meta}
                    title={art.title}
                    body={art.body}
                    linkText={art.linkText}
                    href={art.href}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CTA BOLETÍN
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-invert)',
          paddingBlock: 'clamp(4rem, 10svh, 7rem)',
          textAlign   : 'center',
        }}>
          <div style={{
            width        : '100%',
            maxWidth     : 640,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 2rem)',
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            gap          : 'clamp(1.25rem, 3vw, 2rem)',
          }}>
            <Reveal>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                EDU + IA · Boletín semanal
              </p>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.2,
                color        : '#fff',
                marginTop    : '0.5rem',
              }}>
                ¿Quieres una idea así cada semana en tu bandeja de entrada?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <CTAButton href="/boletin" variant="primary" style={{ fontSize: '0.9rem' }}>
                SUSCRIBIRME AL BOLETÍN →
              </CTAButton>
              <p style={{ marginTop: '0.75rem', fontFamily: 'var(--mono)', fontSize: '0.68rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.4)' }}>
                +2.500 docentes · Sin spam · Gratis
              </p>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

/** Formatea "2026-06-01" → "1 jun 2026" */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

/**
 * Estima el tiempo de lectura contando palabras del HTML (≈200 palabras/min).
 * Fallback cuando el frontmatter no incluye `readingTime`.
 */
function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
