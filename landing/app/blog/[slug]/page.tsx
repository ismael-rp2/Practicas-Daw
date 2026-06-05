import Image from 'next/image';
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
 * Página de artículo individual del blog — estilo lectura premium dark mode.
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
    notFound();
  }

  const readingTime = post.readingTime ?? estimateReadingTime(post.contentHtml);

  return (
    <>
      <Header />

      <main className="bg-zinc-950 min-h-screen">

        {/* ════════════════════════════════════════════════════════════════
            HERO — metadatos + título + excerpt + portada
        ════════════════════════════════════════════════════════════════ */}
        <section className="bg-zinc-950 pt-16 pb-0">
          <article className="max-w-3xl mx-auto px-6 py-16">

            {/* Metadatos */}
            <Reveal>
              <div className="flex items-center gap-3 text-sm text-zinc-400 mb-6 font-mono flex-wrap">
                <span className="text-purple-400 uppercase tracking-widest text-xs">
                  {post.category}
                </span>
                <span className="text-zinc-600">•</span>
                <span>{formatDate(post.date)}</span>
                <span className="text-zinc-600">•</span>
                <span>{readingTime} min de lectura</span>
              </div>
            </Reveal>

            {/* Título */}
            <Reveal delay={0.07}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>
            </Reveal>

            {/* Excerpt */}
            <Reveal delay={0.11}>
              <p className="text-xl text-zinc-300 mb-10 leading-relaxed">
                {post.excerpt}
              </p>
            </Reveal>

            {/* Imagen de portada */}
            <Reveal delay={0.15}>
              <div className="relative w-full aspect-video mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  /* Placeholder cuando no hay imagen de portada */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-900">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 opacity-40" />
                    <span className="font-mono text-xs tracking-widest uppercase text-zinc-600">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>

            {/* ════════════════════════════════════════════════════════
                CUERPO DEL ARTÍCULO — Markdown → HTML con prose
            ════════════════════════════════════════════════════════ */}
            <div
              className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-8 prose-h2:text-3xl prose-h2:font-bold prose-h2:text-white prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h3:text-2xl prose-h3:text-purple-300 prose-h3:mt-10 prose-li:text-zinc-300 prose-li:marker:text-purple-500 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-purple-500/30 prose-pre:shadow-lg prose-pre:shadow-purple-900/20 prose-pre:rounded-xl prose-pre:text-purple-100 prose-strong:text-white prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-purple-500 prose-blockquote:text-zinc-400 prose-code:text-purple-300 prose-code:bg-zinc-900/60 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

          </article>
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
