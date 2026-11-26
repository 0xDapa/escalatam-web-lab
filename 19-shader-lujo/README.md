# 19 · Atelier Nube — Salón de peluquería de autor · Buenos Aires

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/19-shader-lujo/

- **Lenguaje de diseño:** Lujo editorial minimal (serif Didone, mucho aire)
- **Técnica:** Shader de seda en WebGL1 (un solo fragment shader, sin librería), media resolución y pausa fuera de pantalla
- **Tipografías:** Bodoni Moda + Hanken Grotesk (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- Seda líquida: fbm con warping de dominio + normales iluminadas, la luz sigue al puntero.
- Se renderiza a 0.5× de resolución y se pausa cuando no se ve (IntersectionObserver) para ahorrar batería.
- Hero editorial a cuatro esquinas, servicios con revelado al pasar, equipo en tarjetas de arco, reserva en sección oscura.
- Un solo `<canvas>`, ≈2 KB de JS gz.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.7 KB / 1.9 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 137.4 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.1 s / 1.1 s / 0 ms / 0 |
| FPS hero móvil / escritorio* | 22.7 / 23.0 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
