# 28 · Marea — Restaurante de autor · Valparaíso

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/28-alta-cocina/

**Ideal para:** restaurantes de autor, menús degustación, bodegas, chefs privados.

- **Inspirada en:** [Central Restaurante (Lima)](https://centralrestaurante.com.pe/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Editorial gastronómico: serif ultraligera, titulares apilados centrados
- **Técnica estrella:** Descenso por profundidades: el fondo interpola crema → mar → abismo con el scroll + medidor sticky
- **Tipografías:** Newsreader (200–500) + Work Sans (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Menú contado como un descenso de 0 a 200 m: el color de fondo se interpola en 3 paradas según el scroll y un medidor de profundidad sticky lo acompaña.
- Hero partido con dos fotos, experiencias con precio, historia del chef.
- Reservas: 14 días en píldoras (domingo y lunes cerrado), selector de comensales, turnos → WhatsApp.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.4 KB / 1.7 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 636.9 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 95 / 95 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.1 s / 2.9 s / 0 ms / 0 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/vieiras-*.webp` — “Scallops Seafood”, Tim Sullivan · [StockSnap](https://stocksnap.io/photo/scallops-seafood-DBCBPQBRVV) · CC0
- `img/ostras-*.webp` — “Oysters Seafood”, Paula Borowska · [StockSnap](https://stocksnap.io/photo/oysters-seafood-8EA58C04C5) · CC0
- `img/ostra-mano-*.webp` — “Nature Oysters”, Charlotte Coneybeer · [StockSnap](https://stocksnap.io/photo/nature-oysters-S0NV9XZ4OZ) · CC0
- `img/pulpo-*.webp` — “Seafood Octopus”, Alex Knight · [StockSnap](https://stocksnap.io/photo/seafood-octopus-43523WB3KI) · CC0
- `img/pescado-*.webp` — “Gourmet Food”, Tim Sullivan · [StockSnap](https://stocksnap.io/photo/gourmet-food-AW3QDDIGZP) · CC0
- `img/almejas-*.webp` — “Seafood Clams”, Jakub%20Juszy%u0144ski · [StockSnap](https://stocksnap.io/photo/seafood-clams-IJOQFDYK3F) · CC0
- `img/sala-*.webp` — “Eat Food”, Timur Saglambilek · [StockSnap](https://stocksnap.io/photo/eat-food-EWWJV5R5RR) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
