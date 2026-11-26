# 31 · Kinesia — Kinesiología y fisioterapia · Santiago

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/31-fisioterapia/

**Ideal para:** fisioterapeutas, quiroprácticos, osteópatas, clínicas de salud, centros médicos.

- **Inspirada en:** [Parsley Health](https://www.parsleyhealth.com/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Salud cálida: crema + verde azulado, serif ligera, píldoras y franja de cobertura
- **Técnica estrella:** Mapa corporal SVG clicable + nivel de dolor que da consejo + próxima hora libre
- **Tipografías:** Literata + Albert Sans (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Cuerpo en SVG con zonas clicables (y botones accesibles) que muestran causas, tratamiento y sesiones estimadas.
- Slider de dolor 0–10 que cambia la recomendación; "próxima hora libre" calculada a partir de la hora actual.
- "Dos formas de empezar" en bloque oscuro, testimonio grande con estrellas, equipo, FAQ y agenda → WhatsApp con zona y nivel de dolor.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.1 KB / 1.7 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 439.9 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 97 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.1 s / 1.1 s / 0 ms / 0.004 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/estiramiento-*.webp` — “Stretching Exercises”, Direct Media · [StockSnap](https://stocksnap.io/photo/stretching-exercises-ZBLTKREN5L) · CC0
- `img/sesion-*.webp` — “Stretching Exercises”, Direct Media · [StockSnap](https://stocksnap.io/photo/stretching-exercises-BIOFWEIURU) · CC0
- `img/masaje-*.webp` — “Woman Massage”, Authentic Stock · [StockSnap](https://stocksnap.io/photo/woman-massage-XVEZDYZASS) · CC0
- `img/movilidad-*.webp` — “Stretched Woman”, Burst · [StockSnap](https://stocksnap.io/photo/stretched-woman-J60JOIXCY8) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
