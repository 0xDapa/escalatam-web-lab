# 13 · Sobremesa — Restaurante de temporada · Valencia

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/13-editorial-css/

- **Lenguaje de diseño:** Editorial de revista (serif display, columnas, filetes)
- **Técnica:** Solo CSS: scroll-driven animations + View Transitions entre páginas (0 KB de JS)
- **Tipografías:** Fraunces + Instrument Sans (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- Animaciones ligadas al scroll con `animation-timeline: view()` y `scroll(root)` — sin una línea de JavaScript.
- Segunda página `carta.html` con transición entre documentos (`@view-transition { navigation: auto }`).
- Ilustración del plato en SVG generado por código; titulares en Fraunces (variable, eje óptico).
- Navegadores sin soporte (Safari/Firefox antiguos) ven la página estática, completa y legible.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 0.0 KB / 0.0 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 185.5 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 99 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 0.9 s / 0.9 s / 100 ms / 0 |
| FPS hero móvil / escritorio* | 60.0 / 60.0 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `carta.html`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
