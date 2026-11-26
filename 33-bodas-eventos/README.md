# 33 · Velo — Wedding planner · Cartagena

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/33-bodas-eventos/

**Ideal para:** wedding planners, fotógrafos de boda, fincas para eventos, catering, floristerías.

- **Inspirada en:** [Alessandra Zanghi (Awwwards SOTD)](https://alessandrazanghi.studio/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Monocromo art déco: display fina, botones negros cuadrados, fotos en B/N
- **Técnica estrella:** Calendario de disponibilidad + estimador de presupuesto + galería B/N→color
- **Tipografías:** Poiret One + Montserrat (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Calendario de 14 meses con disponibilidad simulada estable (libre / pocos cupos / reservado) y "Reservar esta fecha" → WhatsApp.
- Estimador por invitados y estilo en COP; galería que pasa de blanco y negro a color al pasar el cursor (o al entrar en pantalla en táctil).
- Hero que se colorea al cargar, testimonios rotativos, lista larga de guías y contacto.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.6 KB / 1.8 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 421.2 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.0 s / 1.7 s / 0 ms / 0.004 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/atardecer-*.webp` — “Wedding Bride”, Freestocks.org · [StockSnap](https://stocksnap.io/photo/wedding-bride-GI154PSYGF) · CC0
- `img/manos-*.webp` — “Wedding Couple”, Jeremy Wong · [StockSnap](https://stocksnap.io/photo/wedding-couple-YJHZWANTEG) · CC0
- `img/beso-*.webp` — “Bride Groom”, Kaci Baum · [StockSnap](https://stocksnap.io/photo/bride-groom-HXDO55F695) · CC0
- `img/salon-*.webp` — “Events Venue”, Sweet Ice Cream Photography · [StockSnap](https://stocksnap.io/photo/events-venue-5K1C2ZXZZP) · CC0
- `img/mesa-*.webp` — “Events Wedding”, Clem Onojeghuo · [StockSnap](https://stocksnap.io/photo/events-wedding-3S3LT750NH) · CC0
- `img/anillos-*.webp` — “Wedding Rings”, Rickopan · [StockSnap](https://stocksnap.io/photo/wedding-rings-KH7YRRTVTS) · CC0
- `img/ramo-*.webp` — “Bride Dress”, Pro Image Photography · [StockSnap](https://stocksnap.io/photo/bride-dress-DEM8X1LW8D) · CC0
- `img/votos-*.webp` — “Bride Groom”, Lukasz Kowalewski · [StockSnap](https://stocksnap.io/photo/bride-groom-XNBK7TFBAU) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
