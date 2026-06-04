# Documentación — `/cursos/profelibre` (Dev B)

---

## Explicación

Página de ventas *evergreen* del curso **ProfeLibre**, un programa formativo para docentes sobre integración de IA en la práctica docente. Es la página más compleja del proyecto: 9 secciones, componentes de scroll interactivo personalizados, carruseles infinitos, animaciones CSS avanzadas y lógica condicional de carrito.

Ruta del archivo: `landing/app/cursos/profelibre/page.tsx`  
Directiva: `'use client'` (necesaria por hooks de estado, IntersectionObserver y animaciones interactivas).

---

## Estructura

| # | Sección | Fondo | Descripción |
|---|---------|-------|-------------|
| 01 | Hero | `--bg-primary` | Titular principal, subtítulo, CTA principal y foto del curso con marco de gradiente |
| 02 | La promesa | `--bg-deep` | Texto de promesa central + animación TypewriterText |
| 03 | Para quién es | `--bg-primary` | Tabla comparativa bento: "ProfeLibre" (card elevada con sombra morada) vs "Sin un sistema claro" (card apagada) |
| 04 | Qué incluye | `--bg-deep` | 9 módulos + BONUS en layout sticky-scroll: ruta de neón a la izquierda (SVG interactivo), tarjetas apiladas a la derecha |
| 05 | Cómo funciona | `--bg-primary` | Timeline horizontal con línea de neón, 5 tarjetas en fila, animación de progreso al hacer scroll |
| 06 | Resultados | `--bg-deep` | Bento grid jerárquico: tarjeta "10 h" destacada (2 cols, fondo morado), resto de métricas en cards estándar |
| 07 | Validación | `--bg-primary` | Hero testimonial rotatorio (4 citas, rota cada 5 s) + Wall of Love con 2 carruseles infinitos full-width |
| 08 | FAQ | `--bg-deep` | Acordeón con 8 preguntas frecuentes |
| 09 | Última llamada | `--bg-primary` | CTA final con aura de neón animada, latido del botón, doble anillo ping y flechas magnéticas en hover |

---

## Elementos

### Componentes React
| Componente | Uso en la página |
|------------|-----------------|
| `<Header />` | Navegación global superior |
| `<Footer />` | Pie de página global |
| `<HeroCanvas />` | Canvas WebGL de partículas animadas (hero) |
| `<Reveal />` | Animación de entrada en cada bloque |
| `<CTAButton />` | Botones primario/secundario en hero y secciones |
| `<SectionEyebrow />` | Etiqueta superior de cada sección |
| `<AnimatedCounter />` | Contadores numéricos animados (sección 06 y 07) |
| `<TypewriterText />` | Texto con efecto máquina de escribir (sección 02) |
| `<ModulosScrollSpy />` | Sección 04: layout sticky + ruta SVG neón + tarjetas apiladas con scroll-spy |
| `<TimelineVertical />` | Sección 05: timeline horizontal en fila con línea de neón animada al scroll |
| `<Accordion />` | Sección 08: acordeón de FAQs |
| `<Image />` (next/image) | Foto del hero (`/public/Copia de Captura_C2183_1.1.14.jpg`) |

### Datos estáticos (en el propio archivo)
- `MODULOS` — 9 objetos `{ icon, title, body }` con icono (emoji o img SVG), título y descripción de cada módulo.
- `TIMELINE` — 5 objetos `{ number, title, desc }` para el timeline de la sección 05.
- `RESULTADOS` — 6 objetos `{ value, prefix, suffix, desc }` para los contadores de la sección 06.
- `FAQS` — 8 objetos `{ question, answer }` para el acordeón.
- `HERO_TESTIMONIALS` — 4 objetos `{ ini, name, role, text }` para el carrusel del hero testimonial.

### Assets visuales
- `/public/Copia de Captura_C2183_1.1.14.jpg` — Foto principal del hero.
- Iconos SVG: `/public/iconos/icono-cerebro.svg` (reemplazado por emoji `🧠`), `/public/iconos/tick-azul.svg`.

---

## Usos / Lógica

### Flag `isCartOpen` — Control del estado de venta
```typescript
const isCartOpen = false;
```
- `false` → **Pre-lanzamiento**: los CTAs apuntan a `/lista-espera` y el label es `"APÚNTAME A LA LISTA DE ESPERA →"`.
- `true` → **Carrito abierto**: los CTAs apuntan a `/cursos/profelibre/compra` y el label es `"QUIERO ENTRAR AHORA →"`.

Para activar la venta, solo cambiar esta constante a `true`. Afecta a todos los botones CTA de la página.

### Hero testimonial rotatorio (sección 07)
```typescript
const [heroIdx, setHeroIdx] = useState(0);

useEffect(() => {
  const id = setInterval(() => setHeroIdx(i => (i + 1) % HERO_TESTIMONIALS.length), 5000);
  return () => clearInterval(id);
}, []);
```
- Rota automáticamente cada 5 s entre los 4 testimonios de `HERO_TESTIMONIALS`.
- La animación de entrada usa `key={heroIdx}` sobre el contenedor interno + `@keyframes hero-in` (fade + translateY) inyectado en un `<style>` tag.

### Carruseles infinitos del Wall of Love (sección 07)
- Implementados con CSS `@keyframes marquee-left` / `marquee-right` inyectados en `<style>`.
- Las animaciones se aplican via `style={{ animation: 'marquee-left 38s linear infinite' }}` **inline** (no via clases CSS) para garantizar compatibilidad con Next.js App Router.
- Cada fila duplica su array de tarjetas (`[...row, ...row]`) para que el loop sea sin corte.
- La máscara de bordes usa `WebkitMaskImage` + `maskImage` via inline styles.
- Hover pausa la animación con `onMouseEnter`/`onMouseLeave`.

### `ModulosScrollSpy` — Sección 04
- Contenedor exterior con `height: n * 85vh` (765vh para 9 módulos).
- Div interior con `position: sticky; top: 4.5rem` → se queda fijo mientras el usuario scrollea.
- El índice activo se calcula: `Math.round(progress * (n - 1))` donde `progress = scrolled / scrollableH`.
- Avanza de 1 en 1. Clic en un nodo del SVG llama a `scrollToIndex(i)` → `window.scrollTo({ behavior: 'smooth' })`.
- La ruta de neón usa `stroke-dashoffset` con `transition: 0.7s cubic-bezier` para animación suave.

### `TimelineVertical` — Sección 05
- Mismo patrón de contenedor alto sticky que `ModulosScrollSpy`.
- La línea de neón se anima con `width` del tramo iluminado proporcional al índice activo.
- Fórmula del ancho: `(activeIndex * 2 + 1) / (n * 2)` → avanza hasta el centro de la tarjeta activa.

### Sección 09 — Animaciones del botón CTA
Las animaciones se definen en un `<style>` tag específico de la sección:
```css
@keyframes aura-pulse  { 0%,100%{opacity:.38} 50%{opacity:.78} }
@keyframes btn-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
@keyframes ring-ping   { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.8);opacity:0} }
```
- **Aura**: `div` absoluto con `filter: blur(30px)` y gradiente `#7c3aed → #06b6d4`.
- **Latido**: el `<a>` tiene `animation: btn-breathe 3.5s ease-in-out infinite`. En hover, se pausa y escala a 1.07.
- **Ping**: dos anillos con `ring-ping` desfasados 0.9 s entre sí.
- **Flechas**: `.cta09-btn:hover .cta09-arrows { transform: translateX(7px) }`.

### Variables CSS del sistema de diseño
Todas las páginas utilizan estas variables definidas en el CSS global:
- `--bg-primary`, `--bg-deep`, `--bg-card`, `--bg-invert`
- `--text-secondary`, `--accent-blue`, `--border-subtle`
- `--sans` (tipografía principal), `--mono` (tipografía monoespaciada)
- `--brand-gradient`
