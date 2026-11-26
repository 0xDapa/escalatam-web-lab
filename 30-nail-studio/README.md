# 30 · Lacada Nail Studio — Estudio de uñas · Lima

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/30-nail-studio/

**Ideal para:** uñas, peluquerías, barberías, pestañas y cejas, maquillaje, spa.

- **Inspirada en:** [Les Nanas Studio Floral (Awwwards HM)](https://lesnanas-studiofloral.com/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Degradado rosa→naranja, wordmark gigante, texto circular y titulares en contorno
- **Técnica estrella:** Probador de uñas en SVG: color, acabado, forma y precio en vivo que viaja a la reserva
- **Tipografías:** Shrikhand + Plus Jakarta Sans (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Mano en SVG generada por código: 12 colores, acabado (brillo, mate, cromo, francesa) y forma (almendra, cuadrada, corta) con precio en S/ en vivo.
- El diseño elegido se arrastra al formulario y al mensaje de WhatsApp.
- Hero con degradado, insignia giratoria y marquesina; servicios, galería mixta (fotos + nail art en CSS) y reseñas.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.5 KB / 1.8 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 187.7 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.1 s / 1.1 s / 0 ms / 0.001 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/manicura-*.webp` — “People Hands”, Freestocks.org · [StockSnap](https://stocksnap.io/photo/people-hands-XX356Q6EI4) · CC0
- `img/detalle-*.webp` — “People Hands”, Freestocks.org · [StockSnap](https://stocksnap.io/photo/people-hands-5M4DNCN8ZW) · CC0
- `img/flatlay-*.webp` — “Background Fashion”, Sarah Pflug · [StockSnap](https://stocksnap.io/photo/background-fashion-S6RLOBPAOZ) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
