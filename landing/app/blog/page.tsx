import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import SectionEyebrow from '@/components/SectionEyebrow';
import Reveal from '@/components/Reveal';
import HeroCanvas from '@/components/HeroCanvas';
import { getAllPosts } from '@/lib/blog';

// ─────────────────────────────────────────────────────────────────────────────
// Categorías disponibles para los filtros de UI (simulados, sin lógica de
// filtrado activa — se puede conectar a useSearchParams en una iteración futura)
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIAS = ['Todos', 'IA', 'Pedagogía', 'Casos', 'Opinión'];

/**
 * Página principal del blog (§5.9).
 * Server Component: lee los posts del sistema de archivos en tiempo de build/request.
 */
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />

      <main>

        {/* ════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', paddingBlock: 'clamp(5rem, 12svh, 9rem)' }}>
          <HeroCanvas />
          <div style={{
            position     : 'relative',
            zIndex       : 1,
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            <Reveal>
              <SectionEyebrow text="Blog" />
            </Reveal>
            <Reveal delay={0.07}>
              <h1 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2.8rem, 7vw, 5.5rem)',
                fontWeight   : 900,
                letterSpacing: '-0.04em',
                lineHeight   : 1.0,
                color        : '#fff',
                marginTop    : '1rem',
                marginBottom : 'clamp(1rem, 2.5vw, 1.5rem)',
              }}>
                Ideas que llegan<br />al lunes siguiente.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{
                fontSize  : 'clamp(1rem, 2vw, 1.15rem)',
                lineHeight: 1.7,
                color     : 'var(--text-secondary)',
                maxWidth  : '52ch',
              }}>
                Reflexiones prácticas sobre educación, inteligencia artificial y lo que ocurre cuando las dos se encuentran en un aula real.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FILTROS UI (decorativos — conectar a useSearchParams si se activa)
        ════════════════════════════════════════════════════════════════ */}
        <div style={{
          background   : 'var(--bg-deep)',
          borderTop    : '1px solid var(--border-subtle)',
          borderBottom : '1px solid var(--border-subtle)',
          paddingBlock : '1rem',
        }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
            display      : 'flex',
            gap          : '0.5rem',
            flexWrap     : 'wrap',
          }}>
            {CATEGORIAS.map((cat, i) => (
              <span
                key={cat}
                style={{
                  fontFamily   : 'var(--mono)',
                  fontSize     : '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding      : '0.4rem 0.9rem',
                  borderRadius : '999px',
                  border       : '1px solid var(--border-subtle)',
                  color        : i === 0 ? '#fff' : 'var(--text-secondary)',
                  background   : i === 0 ? 'rgba(255,255,255,0.08)' : 'transparent',
                  cursor       : 'pointer',
                  userSelect   : 'none',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            GRID DE ARTÍCULOS
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={{
            width        : '100%',
            maxWidth     : 1280,
            marginInline : 'auto',
            paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
          }}>
            {posts.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--mono)', fontSize: '0.9rem' }}>
                No hay artículos publicados todavía.
              </p>
            ) : (
              <div style={{
                display            : 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap                : 'clamp(1.25rem, 3vw, 2rem)',
              }}>
                {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={i * 0.07}>
                    <Card
                      meta={`${post.category} · ${formatDate(post.date)}`}
                      title={post.title}
                      body={post.excerpt}
                      linkText="Leer artículo"
                      href={`/blog/${post.slug}`}
                    />
                  </Reveal>
                ))}
              </div>
            )}
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
