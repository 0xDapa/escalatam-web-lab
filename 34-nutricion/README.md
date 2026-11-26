# 34 · Savia Nutrición — Nutricionistas · Buenos Aires

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/34-nutricion/

**Ideal para:** nutricionistas, dietistas, entrenadores personales, psicólogos, terapeutas.

- **Inspirada en:** [Function Health](https://www.functionhealth.com/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Salud preventiva: crema y terracota, serif ligera con itálica, etiquetas en mono
- **Técnica estrella:** Test de 3 preguntas con recomendación + plato en donut SVG animado + toggle de precios
- **Tipografías:** Source Serif 4 + Hanken Grotesk + Fragment Mono (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Titular en dos tiempos ("Comé mejor. No menos.") y cifras grandes con contador.
- Test de 3 preguntas que recomienda un plan y lo precarga en el formulario; plato en donut SVG que se reparte según la comida elegida.
- Planes con conmutador mensual/trimestral, recetas, testimonios, FAQ y turno → WhatsApp.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 4.9 KB / 2.5 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 598.7 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 94 / 97 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.0 s / 1.0 s / 270 ms / 0.002 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/bowl-*.webp` — “Salad Bowl”, FOCA Stock · [StockSnap](https://stocksnap.io/photo/salad-bowl-PLOA1CWIRK) · CC0
- `img/ensalada-*.webp` — “Salad Lettuce”, Jeffrey Betts · [StockSnap](https://stocksnap.io/photo/salad-lettuce-Z0133GNPXT) · CC0
- `img/huerta-*.webp` — “Fruit Vegetables”, Jamie Hamel-Smith · [StockSnap](https://stocksnap.io/photo/fruit-vegetables-F8B73CPSBK) · CC0
- `img/mano-*.webp` — “Healthy Food”, Lily Lvnatikk · [StockSnap](https://stocksnap.io/photo/healthy-food-28VMIPXPQ4) · CC0
- `img/desayuno-*.webp` — “Breakfast Bowl”, JESHOOTS.com · [StockSnap](https://stocksnap.io/photo/breakfast-bowl-V9AOG26R2W) · CC0
- `img/limon-*.webp` — “Healthy Food”, Healthy Living · [StockSnap](https://stocksnap.io/photo/healthy-food-7NGJXUAFPT) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
