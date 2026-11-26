# 35 · Flora Viva — Floristería

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/35-floristeria/

**Ideal para:** floristerías, viveros, tiendas de regalos con envío el mismo día.

- **Inspirada en:** [Igloo Inc + Sonner/Vaul](https://www.igloo.inc/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Crema y verde botella, serif Gloock enorme, tarjetas de producto con fotos grandes; flor 3D como protagonista.
- **Técnica estrella:** Three.js: flor procedural (46 pétalos en filotaxis, sheen) que se abre con el scroll y cambia de color en “Arma tu ramo” · Motion + drawer/toasts
- **Librerías (empaquetadas con esbuild, sin CDN):** Three.js 0.187 + Motion 14
- **Tipografías:** Gloock + Onest (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Flor 100% generada por código: pétalos con PlaneGeometry curvada por vértice, ángulo áureo y degradado base→punta inyectado con onBeforeCompile.
- El mismo <canvas> se muda del hero al configurador (un solo contexto WebGL); setPalette() hace un fundido de color de 500 ms.
- Three.js se carga por intención (primer scroll/puntero o 7 s); el póster es un render del mismo modelo (LCP).
- Cesta en drawer tipo Vaul, toasts tipo Sonner con “Deshacer”, botón de cesta con muelle al añadir.

Código fuente legible en [`src/t4/35-floristeria/`](../src/t4/35-floristeria/) (se compila con `node tools/build4.mjs 35-floristeria`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 29.0 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 166.6 KB |
| Carpeta completa gzip | 2535.8 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 95 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 0.8 s / 2.8 s / 70 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- `img/rojas-*.webp` — “Baby’s breath in a bed of roses, wrapped in cellophane as bouquets”, Topher · [WordPress Photo Directory](https://wordpress.org/photos/photo/80065ef22b/) · CC0
- `img/lilas-*.webp` — “Close-up of the top of a hand-tied, circular-style bridal bouquet with purple roses and baby’s breath.”, Aida Correa-Jackson · [WordPress Photo Directory](https://wordpress.org/photos/photo/80266903ae/) · CC0
- `img/ramo-*.webp` — “Hand holding a bouquet of red and pink roses with white baby’s breath, wrapped in white paper, against a softly blurred colorful indoor background”, Sadiksha Katuwal · [WordPress Photo Directory](https://wordpress.org/photos/photo/8996a53323/) · CC0
- `img/ramo-rojo-*.webp` — “A bouquet with vibrant red roses wrapped in elegant black and gold paper, accented by small white flowers, conveying a sense of romance and elegance.”, Manjil Aryal · [WordPress Photo Directory](https://wordpress.org/photos/photo/6706a07f3e/) · CC0
- `img/lirios-*.webp` — “Overhead view of vivid orange lilies with unopened buds, surrounded by green foliage and clusters of pink, white, and pale purple flowers in a florist’s display.”, Tawhid Sadman · [WordPress Photo Directory](https://wordpress.org/photos/photo/5546b00330/) · CC0
- `img/rosa-blanca-*.webp` — “Wet white rose & bud. A Monsoon day snap from Garden.”, Bigul Malayi · [WordPress Photo Directory](https://wordpress.org/photos/photo/30064b2d7a/) · CC0
- `img/naranjas-*.webp` — “Orange roses”, Topher · [WordPress Photo Directory](https://wordpress.org/photos/photo/9346366b43/) · CC0
- `img/camelia-*.webp` — “A close-up view of a beautiful pink rose in full bloom.”, Yam B Chhetri · [WordPress Photo Directory](https://wordpress.org/photos/photo/60169e7cac/) · CC0
- `img/ramo-rosa-*.webp` — “A bouquet of flowers, featuring various shades of pink, is placed on a textured black car seat. The bouquet includes large, vibrant pink gerbera daisies, soft pink roses, and delicate white flowers with fine, feathery textures.”, auksainis · [WordPress Photo Directory](https://wordpress.org/photos/photo/2956a21706/) · CC0

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
