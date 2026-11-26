# 26 · Almendro Residences — Promoción residencial de lujo · Altea

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/26-inmobiliaria-lujo/

**Ideal para:** inmobiliarias, promotoras, residencias, villas vacacionales, arquitectos.

- **Inspirada en:** [ERA Residence (Awwwards SOTD)](https://www.era-residence.com/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Didone mayúscula + script sobre ciruela, crema y cielo; máscaras de arco
- **Técnica estrella:** Arco que crece con el scroll, anillo de texto circular, modo día/noche y tabla filtrable con View Transitions
- **Tipografías:** Bodoni Moda + Pinyon Script + Red Hat Display (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Foto en máscara de arco que se agranda con el scroll (variables `--k/--w`), cúpula con texto circular giratorio.
- "Tres razones" en pestañas con autoplay, conmutador día/noche, tabla de unidades filtrable con miniatura en arco que sigue al cursor.
- Mapa SVG, galería en arcos y formulario de visita → WhatsApp.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.9 KB / 1.9 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 575.4 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 98 / 97 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.1 s / 2.3 s / 0 ms / 0 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/villa-*.webp` — “Pool Backyard”, Vita Vilcina · [StockSnap](https://stocksnap.io/photo/pool-backyard-8512A55AD8) · CC0
- `img/terraza-*.webp` — “Furniture Patio”, World Travel Adventures · [StockSnap](https://stocksnap.io/photo/furniture-patio-U9WC0VGYWB) · CC0
- `img/porche-*.webp` — “Furniture Patio”, World Travel Adventures · [StockSnap](https://stocksnap.io/photo/furniture-patio-KOIAWLY3SU) · CC0
- `img/jardin-*.webp` — “House Home”, Joshua Ness · [StockSnap](https://stocksnap.io/photo/house-home-CLD6T4J9VZ) · CC0
- `img/suite-*.webp` — “Modern Room”, World Travel Adventures · [StockSnap](https://stocksnap.io/photo/modern-room-ORRHZ1VULX) · CC0
- `img/salon-*.webp` — “Room Interior”, Travel Adventures · [StockSnap](https://stocksnap.io/photo/room-interior-WKMVXACB6C) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
