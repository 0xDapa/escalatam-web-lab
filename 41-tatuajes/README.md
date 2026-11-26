# 41 · Tinta Negra — Estudio de tatuajes

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/41-tatuajes/

**Ideal para:** tatuadores, barberías de autor, estudios de piercing, ilustradores.

- **Inspirada en:** [Active Theory + Lusion (shaders)](https://activetheory.net/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Papel hueso con negro tinta y rojo sangre, fraktur UnifrakturMaguntia + Space Grotesk.
- **Técnica estrella:** Three.js: shader de tinta en agua (FBM + domain warping) que sigue al cursor · lista de estilos con vista previa flotante · revelados clip-path
- **Librerías (empaquetadas con esbuild, sin CDN):** Three.js 0.187 + Motion 14
- **Tipografías:** UnifrakturMaguntia + Space Grotesk (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Shader a pantalla completa con FBM de 5 octavas y doble warping; una estela de 10 puntos del cursor empuja y siembra tinta.
- Pausa fuera de pantalla, 30 fps y DPR 1 en móvil; carga por intención (4 s).
- Vista previa del estilo que sigue al cursor con lerp y aparece desde scale(.92).
- Flash del mes con “Apartar” + toast Deshacer; cotizador por zona y tamaño a WhatsApp.

Código fuente legible en [`src/t4/41-tatuajes/`](../src/t4/41-tatuajes/) (se compila con `node tools/build4.mjs 41-tatuajes`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 28.1 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 158.2 KB |
| Carpeta completa gzip | 1537.3 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 99 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 0.8 s / 1.8 s / 80 ms / 0.013 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- `img/artista-*.webp` — “Soozan Team tattoo artist doing tattoo”, Mohsen-Fooladnezhad · [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=183313270) · CC0
- `img/maestro-*.webp` — “Tattoo tony”, Undermyskintat2 · [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=174312817) · CC0
- `img/brazo-*.webp` — “Tattooed arm (Unsplash)”, Matheus Ferrero matheusferrero · [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=61761192) · CC0
- `img/flash-aguila-*.webp` — “Tattoo Design with a Naval Theme”, Creator:Clark & Sellers · [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=118771112) · CC0
- `img/flash-barco-*.webp` — “Tattoo Design with a Ship”, Creator:Clark & Sellers · [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=60285845) · CC0
- `img/flash-mariposa-*.webp` — “Tattoo Design for a Butterfly”, Creator:Clark & Sellers · [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=60285844) · CC0

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
