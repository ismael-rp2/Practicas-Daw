# Documentación — `/blog` y `/blog/[slug]` (Dev B)

---

## Explicación

Sistema de blog basado en **archivos Markdown locales**. Sin CMS externo ni base de datos: los posts son archivos `.md` con frontmatter YAML almacenados en el sistema de archivos del proyecto. Toda la lógica de lectura está en `landing/lib/blog.ts`.

- **`/blog`** → Índice con grid de artículos. Server Component.
- **`/blog/[slug]`** → Artículo individual. Server Component asíncrono con generación estática.

Rutas de archivo:
- `landing/app/blog/page.tsx`
- `landing/app/blog/[slug]/page.tsx`
- `landing/lib/blog.ts` ← **Capa de datos. Revisar aquí si hay problemas con posts.**

---

## Estructura

### `/blog` — Índice

| Bloque | Descripción |
|--------|-------------|
| Hero | Título "Ideas que llegan al lunes siguiente", subtítulo, fondo con HeroCanvas |
| Filtros UI | Chips de categoría (`Todos`, `IA`, `Pedagogía`, `Casos`, `Opinión`) — **decorativos, sin lógica activa** |
| Grid de artículos | Grid responsive de tarjetas `<Card />` con `auto-fill` y `minmax(300px, 1fr)`. Si no hay posts, muestra mensaje vacío |

### `/blog/[slug]` — Artículo individual

| Bloque | Descripción |
|--------|-------------|
| Cabecera del post | Categoría, fecha formateada, tiempo de lectura, título, extracto, imagen de portada (placeholder) |
| Cuerpo del artículo | HTML generado desde Markdown via `dangerouslySetInnerHTML` |
| Artículos sugeridos | 3 artículos hardcodeados (array `SUGERIDOS`), filtrando el slug actual |
| CTA boletín | Sección de cierre invitando a suscribirse al boletín EDU + IA |

---

## Elementos

### Componentes React — `/blog`
| Componente | Uso |
|------------|-----|
| `<Header />` / `<Footer />` | Navegación global |
| `<HeroCanvas />` | Canvas de partículas en el hero |
| `<Reveal />` | Animación de entrada en tarjetas del grid |
| `<SectionEyebrow />` | Etiqueta "Blog" en el hero |
| `<Card />` | Tarjeta de cada post: props `meta` (categoría · fecha), `title`, `body` (excerpt), `linkText`, `href` |

### Componentes React — `/blog/[slug]`
| Componente | Uso |
|------------|-----|
| `<Header />` / `<Footer />` | Navegación global |
| `<Reveal />` | Animación de entrada en cabecera |
| `<Card />` | Artículos sugeridos al pie |
| `<CTAButton />` | Botón "SUSCRIBIRME AL BOLETÍN →" en la sección de cierre |

### Capa de datos — `landing/lib/blog.ts`
Funciones exportadas que el Dev A debe conocer:

| Función | Descripción |
|---------|-------------|
| `getAllPosts()` | Lee todos los `.md` de `landing/posts/`, parsea frontmatter, devuelve array ordenado por fecha desc |
| `getPostBySlug(slug)` | Lee el archivo `posts/${slug}.md`, convierte Markdown a HTML con `remark`, lanza error si no existe |
| `getAllSlugs()` | Devuelve array de strings con los slugs disponibles (para `generateStaticParams`) |

---

## Usos / Lógica

### Formato de los archivos de posts
Los posts deben estar en `landing/posts/` como archivos `.md` con frontmatter YAML:
```markdown
---
title: "Título del artículo"
date: "2026-06-01"
excerpt: "Resumen de 1-2 frases."
category: "IA"
readingTime: 5          # opcional — si no está, se calcula automáticamente
coverImage: "imagen.jpg" # opcional — actualmente placeholder visual
---

Contenido en Markdown...
```
- `category` debe coincidir con uno de los valores en `CATEGORIAS` del índice si se activa el filtrado.
- `readingTime` es opcional: si no se incluye en el frontmatter, se estima automáticamente.

### Estimación automática del tiempo de lectura
```typescript
function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
```
Elimina las etiquetas HTML del contenido procesado, cuenta las palabras y divide entre 200 (palabras/minuto). Mínimo 1 minuto.

### Generación estática — `generateStaticParams`
```typescript
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
```
Genera las rutas estáticas en tiempo de build para todos los `.md` disponibles en `posts/`. Si se añade un post nuevo, es necesario hacer un nuevo build para que aparezca.

### Parámetros como Promise (Next.js 15+)
```typescript
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
```
En Next.js 15+, `params` es una `Promise` que debe resolverse con `await`. **No eliminar el `await`** al migrar o actualizar el proyecto.

### Manejo del 404
```typescript
try {
  post = await getPostBySlug(slug);
} catch {
  notFound();
}
```
Si `getPostBySlug` lanza error (archivo no encontrado), se llama a `notFound()` de Next.js que renderiza la página 404 del proyecto.

### Estilos tipográficos del cuerpo del artículo
El HTML generado por `remark` no tiene clases. Los estilos se inyectan con un `<style>` tag que apunta al selector `[data-blog-body]`:
```css
[data-blog-body] h2 { font-size: clamp(1.4rem, 3vw, 1.9rem); ... }
[data-blog-body] p  { font-size: clamp(0.98rem, 1.8vw, 1.08rem); ... }
```
> **Importante:** El contenedor del cuerpo del artículo debe tener el atributo `data-blog-body` para que estos estilos se apliquen. Verificar que el `div` con `dangerouslySetInnerHTML` lo tiene.

### Filtros de categoría — Pendiente de implementar
Los chips de categoría en el índice son **decorativos**. Siempre se muestra "Todos" activo (índice 0 con fondo semitransparente). Para activar el filtrado real, conectar a `useSearchParams` y filtrar el array `posts` en el cliente. Esto requeriría convertir el componente a `'use client'` o crear un sub-componente cliente.

### Artículos sugeridos — Hardcodeados
```typescript
const SUGERIDOS = [
  { meta: 'IA · 1 jun 2026', title: '...', href: '/blog/hello-world' },
  ...
];
```
Los sugeridos son un array estático, no dinámico. Filtran el slug actual para no mostrar el artículo que ya se está leyendo. Para hacerlo dinámico, implementar lógica de "posts relacionados" en `lib/blog.ts` basada en categoría.

### Función `formatDate` (duplicada)
La función `formatDate` está **duplicada** en ambos archivos (`/blog/page.tsx` y `/blog/[slug]/page.tsx`). Si se necesita modificar el formato de fecha, cambiarla en los dos sitios. Considerar moverla a `lib/blog.ts` o a una utilidad compartida.
