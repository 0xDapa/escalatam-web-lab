# 18 · Doble Smash — Hamburguesería · Santiago de Chile

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/18-secuencia-canvas/

- **Lenguaje de diseño:** Producto explotado con secuencia de fotogramas (estilo Apple)
- **Técnica:** Secuencia de 60 fotogramas WebP pintados en Canvas según el scroll (scrubbing)
- **Tipografías:** Bowlby One + Inter (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- 60 fotogramas WebP (≈1.4 MB en total) renderizados por código: la hamburguesa se despieza capa a capa al hacer scroll.
- Carga progresiva: primero 1 de cada 8 fotogramas, luego el resto; un `<img>` póster asegura un LCP rápido.
- Etiquetas de cada capa que siguen al fotograma, contador de progreso y carrito de demostración.
- Técnica clásica de las landings de producto; aquí sin librerías (≈1.4 KB de JS gz).

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 2.4 KB / 1.4 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 1473.1 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 0.9 s / 0.9 s / 0 ms / 0 |
| FPS hero móvil / escritorio* | 60.3 / 60.0 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `frames`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
