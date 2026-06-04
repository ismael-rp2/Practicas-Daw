# Documentación — `/boletin` (Dev B)

---

## Explicación

Landing page del boletín semanal **EDU + IA**. Su objetivo es capturar suscriptores mediante un formulario de email integrado con Brevo, presentar las últimas ediciones publicadas y reforzar la autoridad del autor (Joseda). Es la única página del sitio que usa el fondo `--bg-invert` (azul cobalto oscuro) en la sección de cierre.

Ruta del archivo: `landing/app/boletin/page.tsx`  
Directiva: `'use client'` (necesaria por el estado del formulario y el scroll programático).

---

## Estructura

| # | Sección | Fondo | Descripción |
|---|---------|-------|-------------|
| Hero | HERO + Formulario | `--bg-primary` | Título "EDU + IA", subtítulo, 4 compromisos editoriales y formulario de suscripción centrado |
| 01 | Últimas ediciones | `--bg-primary` | Grid de 4 tarjetas con las ediciones más recientes del boletín |
| 02 | Quién escribe esto | `--bg-deep` | Foto del autor + bio en layout flex (imagen izquierda, texto derecha) |
| Cierre | CTA repetición | `--bg-invert` | Título de urgencia + botón que hace scroll hasta el formulario del hero |

---

## Elementos

### Componentes React
| Componente | Uso en la página |
|------------|-----------------|
| `<Header />` | Navegación global superior |
| `<Footer />` | Pie de página global |
| `<HeroCanvas />` | Canvas WebGL de partículas animadas en el fondo del hero |
| `<Reveal />` | Animación de entrada (fade + slide) para cada bloque |
| `<CTAButton />` | Botón primario (submit del form) y botón ghost ("Conoce mi historia") y botón de cierre |
| `<AnimatedCounter />` | Contador animado "+2.500 docentes" en el social proof del formulario |
| `<SectionEyebrow />` | Etiqueta superior de cada sección ("Boletín", "01 — Últimas ediciones", etc.) |
| `<Card />` | Tarjetas de las 4 ediciones recientes del boletín |
| `<Image />` (next/image) | Foto del autor (`/public/joseda-bio.jpg`) con `fill`, `objectFit: cover`, zoom 1.25× centrado en el rostro |

### Assets visuales
- **`/public/joseda-bio.jpg`** — Foto del autor. Convertida desde `IMG_0002.HEIC` con ffmpeg. Estilo: `transform: scale(1.25)`, `objectPosition: center 25%`.

### Datos estáticos (en el propio archivo)
- `EDICIONES` — Array de 4 objetos `{ meta, title, body, linkText, href }` con las últimas ediciones.
- `COMPROMISOS` — Array de 4 objetos `{ emoji, text }` con los compromisos editoriales.

---

## Usos / Lógica

### Estado del formulario
```typescript
const [email, setEmail]   = useState('');
const [estado, setEstado] = useState<'idle' | 'loading' | 'ok'>('idle');
```
- `'idle'` → formulario vacío listo.
- `'loading'` → botón deshabilitado visualmente (`opacity: 0.6`), texto "Enviando…".
- `'ok'` → el formulario desaparece y se muestra un mensaje de confirmación inline.

### Integración Brevo (PENDIENTE en producción)
La función `handleSubmit` actualmente **simula** el envío con un `setTimeout` de 900 ms:
```typescript
// TODO: reemplazar por fetch real al endpoint de Brevo
setTimeout(() => {
  console.log('[boletín] suscripción registrada para:', email);
  setEstado('ok');
}, 900);
```
Para integrar Brevo real, sustituir el `setTimeout` por un `fetch` al endpoint de la API de Brevo con el email capturado.

### Scroll programático al formulario
```typescript
const formRef = useRef<HTMLDivElement>(null);
function scrollToForm() {
  formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
```
El `formRef` se adjunta al `div` que envuelve el formulario en el hero. El botón de la sección de cierre llama a `scrollToForm()` en lugar de enlazar a un `href` interno.

### Foto del autor
- Archivo: `/public/joseda-bio.jpg`
- Usa `next/image` con la prop `fill` → requiere que el contenedor padre tenga `position: relative`.
- El contenedor padre usa `alignSelf: 'stretch'` para igualar la altura al bloque de texto.
- Zoom aplicado via CSS transform: `scale(1.25)`, `transformOrigin: 'center 25%'`.
