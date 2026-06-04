# Documentación — `/formaciones` (Dev B)

---

## Explicación

Página de servicios B2B para **centros educativos, redes de colegios y organismos institucionales**. Ofrece formación in-company sobre IA aplicada a la docencia. No hay e-commerce: el CTA siempre apunta a `/contacto` para gestión directa.

Ruta del archivo: `landing/app/formaciones/page.tsx`  
Directiva: **Server Component** (sin `'use client'` — no requiere estado ni hooks del cliente).

---

## Estructura

| # | Sección | Fondo | Descripción |
|---|---------|-------|-------------|
| Hero | Hero | `--bg-primary` | Título de propuesta de valor, subtítulo y CTA "PEDIR PROPUESTA →" |
| 01 | Qué te llevas | `--bg-deep` | Grid 2×2 con los 4 beneficios diferenciales de la formación (emoji en pastilla azul) |
| 02 | Formatos disponibles | `--bg-primary` | Grid de 4 tarjetas con los formatos de formación y su duración |
| 03 | Instituciones | `--bg-deep` | Logo marquee con 8 instituciones con las que ha trabajado el autor |
| 04 | Casos reales | `--bg-primary` | 2 tarjetas de casos de éxito con resultados concretos |
| Cierre | CTA final | `--bg-deep` | Título de llamada a la acción + CTA + nota de respuesta en 48 h |

---

## Elementos

### Componentes React
| Componente | Uso en la página |
|------------|-----------------|
| `<Header />` | Navegación global superior |
| `<Footer />` | Pie de página global |
| `<HeroCanvas />` | Canvas WebGL de partículas animadas (hero) |
| `<Reveal />` | Animación de entrada en cada bloque. En la sección 01 usa las props `variant="slide-up"` y `staggerIndex` |
| `<CTAButton />` | Botón primario "PEDIR PROPUESTA →" (hero y cierre) + botón secundario "Hablamos de tu proyecto →" |
| `<SectionEyebrow />` | Etiqueta superior de cada sección |
| `<Card />` | Tarjetas de formatos (sección 02) y casos reales (sección 04). Acepta props `icon`, `title`, `body`, `meta` |
| `<LogoMarquee />` | Carrusel de logos de instituciones (sección 03) |

### Datos estáticos (en el propio archivo)
- `FORMATOS` — 4 objetos `{ icon, title, body, meta }` con los formatos disponibles y su duración.
- `INSTITUCIONES` — Array de 8 strings con los nombres de instituciones para el marquee.
- `BENEFICIOS` — 4 objetos `{ emoji, text }` para la sección "Qué te llevas".
- `CASOS` — 2 objetos `{ meta, title, body }` para los casos reales.

### Estilos compartidos (constantes locales)
```typescript
const sectionWrap: React.CSSProperties = { width:'100%', maxWidth:1280, marginInline:'auto', paddingInline:'clamp(1.25rem,5vw,4rem)' };
const divider:     React.CSSProperties = { height:1, background:'var(--border-subtle)', marginBottom:'clamp(3rem,7vw,5rem)' };
const h2Style:     React.CSSProperties = { fontFamily:'var(--sans)', fontSize:'clamp(1.75rem,4vw,3rem)', fontWeight:800, ... };
```
Este patrón se repite en todas las páginas B2B del proyecto.

---

## Usos / Lógica

### Reveal con stagger y variant (sección 01 — "Qué te llevas")
La sección de beneficios usa propiedades avanzadas de `<Reveal>`:
```tsx
<Reveal as="li" variant="slide-up" staggerIndex={i} className="card-hover">
```
- `variant="slide-up"` — Animación de entrada desde abajo.
- `staggerIndex={i}` — Retraso escalonado (0, 0.12, 0.24, 0.36 s) para que las 4 tarjetas entren una a una.
- `className="card-hover"` — Clase CSS global que aplica efecto hover (verificar en `globals.css` o el CSS del componente Reveal).
- `as="li"` — El componente renderiza un `<li>` en lugar del `<div>` por defecto.

### LogoMarquee (sección 03)
```tsx
<LogoMarquee logos={INSTITUCIONES} duration={80} />
```
- `logos` — Array de strings (nombres de instituciones, no imágenes reales).
- `duration={80}` — Duración del ciclo de animación en segundos. A mayor valor, más lento.
- La dirección por defecto es izquierda. Ver `LogoMarquee.tsx` para las props disponibles.

### Sin lógica de estado
Al ser Server Component, no hay hooks. Toda la interactividad corre en los componentes hijo (ej. `Reveal`, `LogoMarquee`).

### Modelo de negocio: sin precios en la página
La página no menciona precios ni tiene carrito. El flujo es: CTA → `/contacto` → propuesta personalizada. Dev A deberá implementar la página `/contacto` si no existe.
