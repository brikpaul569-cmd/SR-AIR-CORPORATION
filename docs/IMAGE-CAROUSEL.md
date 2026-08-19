# ImageCarousel — Documentación Técnica

## Stack

- **Librería**: `embla-carousel-react` v8.6.0 (scroll-snap nativo del browser, sin transform hacks)
- **Iconos**: `lucide-react` (ChevronLeft, ChevronRight, X)
- **i18n**: `react-i18next` para labels de accesibilidad
- **CSS**: Vanilla CSS, BEM estricto, mobile-first, variables CSS en `:root`

---

## Arquitectura del Componente

```
Services.jsx (estado: selectedService)
  └─ .services__carousel-overlay (fixed, full-screen, z-index: 1000)
       └─ ImageCarousel (recibe slides[] + onClose)
            ├─ .ic__close          ← botón X (lucide-react)
            ├─ .ic__viewport       ← ref de embla (overflow: hidden)
            │    └─ .ic__track     ← display: flex, gap
            │         └─ .ic__slide × N  ← flex: 0 0 100%
            │              └─ img / video
            ├─ .ic__arrow--prev    ← ChevronLeft
            ├─ .ic__arrow--next    ← ChevronRight
            └─ .ic__dots           ← tablist con dots clickeables
```

---

## Hooks y Estado

### `useEmblaCarousel` (de embla-carousel-react)

```jsx
const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: slides.length > 1,       // loop solo si hay >1 slide
  align: 'center',               // slide centrada en viewport
  containScroll: 'trimSnaps',    // evita scroll past最后一个snap
  dragFree: false,               // snap por slide, no libre
})
```

Devuelve:
- `emblaRef` → se asigna al `ref` del viewport (`.ic__viewport`)
- `emblaApi` → objeto con todos los métodos de control

### Estado local

| Estado | Tipo | Propósito |
|--------|------|-----------|
| `selectedIndex` | `number` | Slide actualmente visible |
| `scrollSnaps` | `number[]` | Array de snaps (un snap = un slide) |
| `canPrev` | `boolean` | Si se puede ir al slide anterior (false en el primero sin loop) |
| `canNext` | `boolean` | Si se puede ir al siguiente (false en el último sin loop) |

---

## API de embla v8 (IMPORTANTE)

> **v8 cambió los nombres de los métodos.** Los docs online muestran la v7.

| Método v7 (desactualizado) | Método v8 (correcto) |
|---------------------------|---------------------|
| `canGoToPrev()` | `canScrollPrev()` |
| `canGoToNext()` | `canScrollNext()` |
| `goToPrev()` | `scrollPrev()` |
| `goToNext()` | `scrollNext()` |
| `scrollTo()` | `scrollTo()` (sin cambio) |
| `selectedScrollSnap()` | `selectedScrollSnap()` (sin cambio) |
| `scrollSnapList()` | `scrollSnapList()` (sin cambio) |

### Eventos

```jsx
emblaApi.on('select', onSelect)     // se dispara al cambiar de slide
emblaApi.on('reInit', onReInit)     // se dispara al re-inicializar
```

---

## Flujo de Interacción

### 1. Apertura del Carousel

```
Usuario hace click en .services__card
  → Services.jsx: setSelectedService(index)
  → React re-render: {selected && ...} renderiza el overlay + ImageCarousel
  → ImageCarousel monta → useEmblaCarousel inicializa → useEffect设置event listeners
```

### 2. Navegación

```
Click arrow-left → scrollPrev() → embla hace scroll snap al slide anterior
Click arrow-right → scrollNext() → embla hace scroll snap al siguiente
Click dot[i] → scrollTo(i) → embla salta directo al slide i
Teclado ← → → scrollPrev / scrollNext
Teclado Escape → onClose() → setSelectedService(null) → overlay se desmonta
```

### 3. Cierre

```
Click X button o Escape
  → onClose() → setSelectedService(null) en Services.jsx
  → React re-render: {selected && ...} no renderiza nada
  → useEffect cleanup: document.body.style.overflow = '' (restore scroll)
```

---

## CSS — Mobile-First con CSS Custom Properties

### Variables (`:root`)

```css
:root {
  --ic-gap: 0.75rem;           /* gap entre slides */
  --ic-slide-height: 60vw;     /* altura del slide = 60% del viewport width */
  --ic-arrow-size: 44px;       /* tamaño de flechas (44px = tap target mínimo) */
  --ic-dot-size: 10px;         /* tamaño de dots */
  --ic-radius: 8px;            /* border-radius */
  --ic-gold: var(--color-gold, #ffc107);
  --ic-overlay: rgba(13, 13, 13, 0.85);
}
```

### Breakpoints

| Breakpoint | Slide Height | Arrow Size | Dot Size | Radius |
|-----------|-------------|-----------|---------|--------|
| Base (mobile) | `60vw` | 44px | 10px | 8px |
| `≥ 768px` | `40vw` | 48px | 12px | 10px |
| `≥ 1024px` | `35vw` | 48px | 12px | 12px |

### Estructura del layout

```
.ic (relative, max-width: 900px)
  ├─ .ic__close (absolute, top-right, z-index: 20)
  ├─ .ic__viewport (overflow: hidden)  ← embla ref aquí
  │    └─ .ic__track (display: flex, gap)
  │         └─ .ic__slide (flex: 0 0 100%, height: var(--ic-slide-height))
  │              └─ .ic__media (object-fit: cover, 100% × 100%)
  ├─ .ic__arrow--prev (absolute, left, top: 50%, translateY(-50%))
  ├─ .ic__arrow--next (absolute, right, top: 50%, translateY(-50%))
  └─ .ic__dots (flex, centered, gap: 0.5rem)
```

### Por qué `overflow: hidden` en el viewport

Embla funciona con CSS scroll-snap. El viewport tiene `overflow: hidden` y el track es un `flex` container que es más ancho que el viewport. El browser hace scroll interno y embla detecta los snaps para hacer snap a cada slide. Sin `overflow: hidden`, se verían todos los slides apilados horizontalmente.

### Touch-friendly

```css
.ic__arrow, .ic__close, .ic__dot {
  touch-action: manipulation;        /* evita delay de 300ms en mobile */
  -webkit-tap-highlight-color: transparent;  /* elimina flash azul al tocar */
}

@media (hover: hover) and (pointer: fine) {
  /* Solo en desktop: hover effects con transform */
  .ic__arrow:not(:disabled):hover { transform: translateY(-50%) scale(1.08); }
}
```

---

## Accesibilidad

| Elemento | Rol ARIA | Atributo |
|----------|----------|----------|
| `.ic` | `region` | `aria-roledescription="carousel"` |
| `.ic__slide` | `group` | `aria-roledescription="slide"`, `aria-label="Slide 1 of 3"` |
| `.ic__arrow` | `button` | `aria-label="Diapositiva anterior"` |
| `.ic__close` | `button` | `aria-label="Cerrar carrusel"` |
| `.ic__dots` | `tablist` | role container |
| `.ic__dot` | `tab` | `aria-selected`, `aria-label` |

---

## Integración con Services.jsx

```jsx
// Services.jsx — solo 3 cambios clave:

// 1. Import
import ImageCarousel from './ImageCarousel/ImageCarousel'

// 2. Datos de slides (en SERVICES_DATA)
images: [
  { type: 'image', src: `${BASE}references/fan-coils-en-deluxe-az.webp` },
  { type: 'image', src: `${BASE}references/gris.webp` },
]

// 3. Render (condicional)
{selected && (
  <div className="services__carousel-overlay">
    <ImageCarousel
      slides={selected.images}
      onClose={() => setSelectedService(null)}
    />
  </div>
)}
```

El body scroll lock (`overflow: hidden`) lo maneja el propio ImageCarousel internamente via `useEffect`. No necesita lógica externa en el padre.

---

## Archivos

| Archivo | Líneas | Rol |
|---------|--------|-----|
| `src/components/ImageCarousel/ImageCarousel.jsx` | 171 | Componente principal |
| `src/components/ImageCarousel/ImageCarousel.css` | 205 | Estilos mobile-first |
| `src/components/Services.jsx` | 120 | Padre que gestiona estado y renderiza overlay |
| `src/components/Services.css` | 244 | Grid de cards + estilos del overlay |
