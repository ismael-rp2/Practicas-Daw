# Documentación — `/ponencias` (Dev B)

---

## Explicación

Página de contratación de **ponencias y keynotes** para congresos, jornadas y eventos educativos. Estructura paralela a `/formaciones` pero orientada a organizadores de eventos en lugar de centros educativos. Sin e-commerce: CTA siempre a `/contacto`.

Ruta del archivo: `landing/app/ponencias/page.tsx`  
Directiva: **Server Component** (sin `'use client'`).

---

## Estructura

| # | Sección | Fondo | Descripción |
|---|---------|-------|-------------|
| Hero | Hero | `--bg-primary` | Título, subtítulo y CTA "CONTRATAR PONENCIA →" |
| 01 | Formatos | `--bg-deep` | Grid de 4 cards con tipos de ponencia (keynote, central, mesa redonda, TED-style) |
| 02 | Temas tratados | `--bg-primary` | Grid de 6 tarjetas con temas de ponencia, número identificador y checkmark azul |
| 03 | Dónde he estado | `--bg-deep` | Logo marquee de eventos donde ha participado el ponente |
| 04 | Cómo funciona | `--bg-primary` | Grid de 4 pasos del proceso de contratación |
| Cierre | CTA final | `--bg-deep` | Título de cierre + CTA + nota de respuesta en 48 h |

---

## Elementos

### Componentes React
| Componente | Uso en la página |
|------------|-----------------|
| `<Header />` | Navegación global superior |
| `<Footer />` | Pie de página global |
| `<HeroCanvas />` | Canvas WebGL de partículas (hero) |
| `<Reveal />` | Animación de entrada en cada bloque |
| `<CTAButton />` | Botón primario "CONTRATAR PONENCIA →" (hero y cierre) |
| `<SectionEyebrow />` | Etiqueta superior de cada sección |
| `<LogoMarquee />` | Carrusel de eventos (sección 03) con `direction="right"` y `duration={45}` |

> **Nota:** Esta página NO usa el componente `<Card />`. Las tarjetas de formatos y temas están implementadas con `<div>` inline directamente en el JSX.

### Datos estáticos (en el propio archivo)
- `FORMATOS` — 4 objetos `{ emoji, label, desc }` con los tipos de ponencia.
- `TEMAS` — 6 objetos `{ num, title, desc }` con los temas disponibles.
- `EVENTOS` — Array de 8 strings con nombres de eventos para el marquee.

### Estilos compartidos (constantes locales)
Idéntico patrón al de `/formaciones`: `sectionWrap`, `divider`, `h2Style`.

---

## Usos / Lógica

### LogoMarquee con dirección inversa (sección 03)
```tsx
<LogoMarquee logos={EVENTOS} direction="right" duration={45} />
```
- `direction="right"` — El marquee se desplaza hacia la derecha (dirección contraria al de `/formaciones`).
- `duration={45}` — Más rápido que en formaciones (80 s) para dar más dinamismo.

### Tarjetas de formatos (sección 01) — Layout centrado
Las tarjetas de formato usan `alignItems: 'center'` y `textAlign: 'center'`, a diferencia de las tarjetas de temas (sección 02) que usan layout horizontal con número identificador a la izquierda.

### Tarjetas de temas (sección 02) — Layout con número y checkmark
```tsx
<span style={{ color: 'var(--accent-blue)' }}>✓</span>
{title}
```
Cada tarjeta muestra el número en monoespaciado azul a la izquierda, el checkmark `✓` en azul junto al título, y la descripción debajo.

### Proceso de contratación (sección 04) — Datos inline
Los 4 pasos están hardcodeados directamente en el JSX (no en una constante externa) como array de objetos `{ paso, titulo, texto }`. Si se necesitan modificar, ir directamente al bloque de la sección 04 en el archivo.

### Sin precios ni disponibilidad en tiempo real
La página indica "Agenda disponible para el segundo semestre de 2026" como texto estático. Si se necesita gestión dinámica de disponibilidad, habrá que implementar una integración con calendario o CMS.
