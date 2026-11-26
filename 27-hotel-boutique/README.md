# 27 · Hotel Pasaje — Hotel boutique · CDMX

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/27-hotel-boutique/

**Ideal para:** hoteles boutique, hostales, casas rurales, apartamentos turísticos, bares de hotel.

- **Inspirada en:** [The Drake Hotel (Awwwards SOTD)](https://thedrake.ca/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Retícula suiza de filetes finos, palabras en caja, script sobre burdeos y lavanda
- **Técnica estrella:** Slideshow con miniaturas, barra de reserva sticky, pestañas de habitaciones y agenda con ticker
- **Tipografías:** Schibsted Grotesk + IBM Plex Mono + Yellowtail (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Rejilla de filetes de 1 px, logotipo y titulares en caja, hero con slideshow y miniaturas.
- Barra de reserva fija (fechas por defecto mañana/pasado) que abre WhatsApp; habitaciones en pestañas sobre burdeos con script "Roma Norte".
- Agenda lavanda con ticker, restaurante, reseñas y newsletter.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 2.3 KB / 1.2 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 486.1 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 94 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.2 s / 2.3 s / 230 ms / 0 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/lobby-*.webp` — “Hotel Room”, Travel Adventures · [StockSnap](https://stocksnap.io/photo/hotel-room-DGBAEIS339) · CC0
- `img/habitacion-*.webp` — “Hotel Bed”, Travel Adventures · [StockSnap](https://stocksnap.io/photo/hotel-bed-XVTMPEYKEE) · CC0
- `img/suite-*.webp` — “Modern Room”, World Travel Adventures · [StockSnap](https://stocksnap.io/photo/modern-room-ORRHZ1VULX) · CC0
- `img/cama-*.webp` — “Hotel Bed”, World Travel Adventures · [StockSnap](https://stocksnap.io/photo/hotel-bed-OJLOIYVJ9B) · CC0
- `img/desayuno-*.webp` — “Breakfast Grapes”, Mario Anthony Silvestri · [StockSnap](https://stocksnap.io/photo/breakfast-grapes-96Q6US67F3) · CC0
- `img/bar-*.webp` — “Drink Beverage”, Alice Donovan Rouse · [StockSnap](https://stocksnap.io/photo/drink-beverage-F367SFVXKM) · CC0
- `img/patio-*.webp` — “Woman Vacation”, Oleksandr Pidvalnyi · [StockSnap](https://stocksnap.io/photo/woman-vacation-OLTZXDAPWT) · CC0
- `img/detalle-*.webp` — “Bed Breakfast”, WDnet Studio · [StockSnap](https://stocksnap.io/photo/bed-breakfast-9E448HXUQL) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
