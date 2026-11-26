# 16 · Núcleo — Gimnasio de fuerza · Lima

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/16-bento-microinteracciones/

- **Lenguaje de diseño:** Bento grid oscuro tipo dashboard
- **Técnica:** Microinteracciones: spotlight de borde con variables CSS, Canvas 2D (ECG), SVG (anillos/gauges)
- **Tipografías:** Bricolage Grotesque + JetBrains Mono (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- Rejilla bento cuyo borde se ilumina siguiendo al cursor (`--x/--y` en CSS, un solo listener).
- Aforo en vivo (gauge SVG), electro en Canvas 2D, pestañas con indicador elástico, anillo de objetivo semanal.
- Selector mensual/anual con precio que se anima, heatmap de 90 días y testimonios rotativos.
- Cifras de ejemplo, todo generado por código.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 6.0 KB / 3.2 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 114.5 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.2 s / 1.7 s / 0 ms / 0 |
| FPS hero móvil / escritorio* | 60.0 / 56.3 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
