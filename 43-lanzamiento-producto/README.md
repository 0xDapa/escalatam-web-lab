# 43 · Cumbre T1 — Lanzamiento de producto (DTC)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/43-lanzamiento-producto/

**Ideal para:** marcas DTC, emprendimientos de producto físico, preventas.

- **Inspirada en:** [Apple AirPods Pro / MacBook Pro](https://www.apple.com/airpods-pro/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Página de producto Apple: Host Grotesk 96/100 con tracking negativo, local nav con blur, mucho blanco.
- **Técnica estrella:** Three.js scroll-scrub 560vh: termo de titanio con vista explosionada y rótulos · texto palabra a palabra · selector de acabados con píldora en muelle · compra a WhatsApp
- **Librerías (empaquetadas con esbuild, sin CDN):** Three.js 0.187 + Motion 14
- **Tipografías:** Host Grotesk (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Termo con LatheGeometry y MeshPhysical metálico con RoomEnvironment; keyframes de despiece ligados al progreso del sticky.
- Renders de cada acabado como imágenes (póster LCP y tarjetas), generados con el mismo modelo.
- Lighthouse 99 gracias a cargar Three.js solo tras intención.
- Carrusel de highlights, comparativa, opiniones y tarjeta de compra con cantidad → WhatsApp + toast.

Código fuente legible en [`src/t4/43-lanzamiento-producto/`](../src/t4/43-lanzamiento-producto/) (se compila con `node tools/build4.mjs 43-lanzamiento-producto`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 28.8 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 164.6 KB |
| Carpeta completa gzip | 273.7 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 99 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.4 s / 1.7 s / 0 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- Sin fotos de terceros: todo lo visual es código (Three.js/CSS/SVG) o renders propios del modelo 3D.

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
