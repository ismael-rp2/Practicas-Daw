import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// ─────────────────────────────────────────────────────────────────────────────
// Directorio raíz donde viven los archivos Markdown del blog
// ─────────────────────────────────────────────────────────────────────────────
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

/** Forma del frontmatter que esperamos en cada .md */
export interface PostFrontmatter {
  title      : string;
  date       : string;
  category   : string;
  excerpt    : string;
  coverImage?: string;
  author?    : string;
  readingTime?: number;
}

/** Post completo incluyendo slug y HTML del cuerpo */
export interface Post extends PostFrontmatter {
  slug       : string;
  contentHtml: string;
}

/** Post resumido para listados (sin HTML del cuerpo) */
export type PostSummary = Omit<Post, 'contentHtml'>;

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Obtiene todos los slugs disponibles leyendo los nombres de archivo .md.
 */
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/**
 * Devuelve el resumen de todos los posts ordenados por fecha descendente.
 * Usado en la página de listado del blog.
 */
export function getAllPosts(): PostSummary[] {
  const slugs = getAllSlugs();

  return slugs
    .map((slug) => {
      const fullPath = path.join(POSTS_DIR, `${slug}.md`);
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'));
      const fm = data as PostFrontmatter;

      return { slug, ...fm };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Devuelve un post completo con el cuerpo convertido a HTML.
 * @param slug - Nombre del archivo sin extensión .md
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const fm = data as PostFrontmatter;

  // Convierte el Markdown a HTML con remark
  const processed = await remark().use(remarkHtml).process(content);
  const contentHtml = processed.toString();

  return { slug, ...fm, contentHtml };
}
