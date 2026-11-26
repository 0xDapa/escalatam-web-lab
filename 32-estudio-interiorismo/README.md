# 32 · Ocre Estudio — Interiorismo · Montevideo

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/32-estudio-interiorismo/

**Ideal para:** interioristas, arquitectos, reformas, tiendas de muebles, home staging.

- **Inspirada en:** [Elite Design Studio (Awwwards SOTD)](https://www.elite-designstudio.com/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Wordmark gigante en serif fina con fotos flotando, índice de proyectos
- **Técnica estrella:** Parallax por capas, manifiesto palabra a palabra, vista previa que sigue al cursor y paleta de materiales en vivo
- **Tipografías:** Cormorant + Jost (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- "OCRE" a todo el ancho con cinco fotos que flotan a distinta velocidad (`data-s`).
- Índice de proyectos con vista previa que sigue al cursor (miniaturas en línea en móvil) y filtro con View Transitions.
- "Arma tu paleta": suelo, muro y acento recolorean una habitación dibujada en CSS; formulario en frase con estimador por m² → WhatsApp.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.0 KB / 1.6 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 436.8 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 96 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.1 s / 1.1 s / 50 ms / 0 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/p1-*.webp` — “House Interior”, Dahl House Design · [StockSnap](https://stocksnap.io/photo/house-interior-HTE9LOGFC1) · CC0
- `img/p2-*.webp` — “Industrial Concrete”, Altered Reality · [StockSnap](https://stocksnap.io/photo/industrial-concrete-MGQ4FGU9ZB) · CC0
- `img/p3-*.webp` — “Kitchen Interior”, Matt Bango · [StockSnap](https://stocksnap.io/photo/kitchen-interior-3ZX53UFU8B) · CC0
- `img/p4-*.webp` — “Interior Dining”, Kristin Hardwick · [StockSnap](https://stocksnap.io/photo/interior-dining-VMJ6JJFFWR) · CC0
- `img/p5-*.webp` — “Interior Design”, Breather · [StockSnap](https://stocksnap.io/photo/interior-design-478BZDEA2Y) · CC0
- `img/p6-*.webp` — “Spiral Staircase”, Ian Prince · [StockSnap](https://stocksnap.io/photo/spiral-staircase-YB5JNCV2KQ) · CC0
- `img/p7-*.webp` — “Farmhouse Kitchen”, Matt Bango · [StockSnap](https://stocksnap.io/photo/farmhouse-kitchen-QSX4WH8BDB) · CC0
- `img/p8-*.webp` — “Office Desk”, Bench Accounting · [StockSnap](https://stocksnap.io/photo/office-desk-N7FUTW0RY5) · CC0
- `img/p9-*.webp` — “Minimal Furniture”, Eric Haidara · [StockSnap](https://stocksnap.io/photo/minimal-furniture-41AH9JPWSN) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
