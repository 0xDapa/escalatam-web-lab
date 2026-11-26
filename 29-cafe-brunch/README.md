# 29 · Brote — Café de brunch · Valencia

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/29-cafe-brunch/

**Ideal para:** cafeterías, panaderías, heladerías, brunch, tiendas de barrio.

- **Inspirada en:** [Amici (Awwwards SOTD)](https://restaurant-amici.com/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Retro alegre: display gorda, vichy en CSS, polaroids y tarjeta de fidelidad
- **Técnica estrella:** Polaroids arrastrables, pizarra del día, carrusel automático y tarjeta de sellos interactiva
- **Tipografías:** Caprasimo + DM Sans (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Bordes de vichy hechos con gradientes CSS; polaroids que se arrastran (pointer events) en escritorio y rejilla en móvil.
- Pizarra "Hoy en la pizarra", banda oliva con carrusel de fotos, carta en pestañas.
- Reserva → WhatsApp y tarjeta de fidelidad de 8 sellos que se marcan al tocar; pie con forma de ticket.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.4 KB / 1.9 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 696.7 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 97 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.0 s / 1.0 s / 0 ms / 0 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/mesa-*.webp` — “Brunch Breakfast”, Candace McDaniel · [StockSnap](https://stocksnap.io/photo/brunch-breakfast-1FN4OKZCTQ) · CC0
- `img/huevos-*.webp` — “Breakfast Eggs”, Foodie Girl · [StockSnap](https://stocksnap.io/photo/breakfast-eggs-KZTN4JDEIX) · CC0
- `img/latte-*.webp` — “Coffee Latte”, Drew Coffman · [StockSnap](https://stocksnap.io/photo/coffee-latte-D322D377AD) · CC0
- `img/tortitas-*.webp` — “Strawberry Pancake”, Herson Rodriguez · [StockSnap](https://stocksnap.io/photo/strawberry-pancake-KBEYS7KRA3) · CC0
- `img/gofre-*.webp` — “Waffle Pancake”, Joseph Gonzalez · [StockSnap](https://stocksnap.io/photo/waffle-pancake-F0X48BFRXZ) · CC0
- `img/aguacate-*.webp` — “Avocado Fruit”, Brenda Godinez · [StockSnap](https://stocksnap.io/photo/avocado-fruit-995039RKO1) · CC0
- `img/local-*.webp` — “Cafe Restaurant”, donterase · [StockSnap](https://stocksnap.io/photo/cafe-restaurant-HOHJK6B7TD) · CC0
- `img/cafe-*.webp` — “Coffee Latte”, Sergey Zolkin · [StockSnap](https://stocksnap.io/photo/coffee-latte-MK3VLNK8NA) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
