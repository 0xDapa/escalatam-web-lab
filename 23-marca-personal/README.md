# 23 · Valeria Montes — Coach de carrera · CDMX

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/23-marca-personal/

**Ideal para:** coaches, mentores, consultores, creadores de cursos, psicólogos, formadores.

- **Inspirada en:** [aliabdaal.com](https://aliabdaal.com/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Creador/educador cálido: serif redondeada, botones con sombra sólida, stickers
- **Técnica estrella:** Selector "¿cómo te ayudo?" con View Transitions + subrayado SVG que se dibuja
- **Tipografías:** Young Serif + Figtree (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Tres tarjetas de intención ("cambiar de trabajo", "rendir sin quemarme", "lanzar mi proyecto") cambian un panel de recomendación con `document.startViewTransition`.
- Subrayado a mano en SVG (`pathLength` + `stroke-dashoffset`) que se dibuja al entrar en pantalla.
- Boletín como imán de leads, recursos filtrables, programas con precio, muro de testimonios en columnas y agenda que abre WhatsApp con el programa elegido.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.7 KB / 1.8 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 203.6 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 97 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.2 s / 1.4 s / 0 ms / 0.001 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/retrato-*.webp` — “Woman Portrait”, Matt Moloney · [StockSnap](https://stocksnap.io/photo/woman-portrait-XKNXHW017D) · CC0
- `img/trabajo-*.webp` — “Woman Laptop”, Burst · [StockSnap](https://stocksnap.io/photo/woman-laptop-C7ARZC9TPU) · CC0
- `img/libreta-*.webp` — “Notebook Desk”, Artsy Crafty · [StockSnap](https://stocksnap.io/photo/notebook-desk-GRGCZJ7CNE) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
