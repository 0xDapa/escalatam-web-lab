# 15 · Aura Dermoestética — Clínica de estética · Madrid

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/15-liquid-glass/

- **Lenguaje de diseño:** Liquid glass suave (cristal refractivo, tonos piel)
- **Técnica:** backdrop-filter + filtro SVG de desplazamiento (lente refractiva) + esferas con gradientes CSS
- **Tipografías:** Manrope + Instrument Serif (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- Paneles de cristal con `backdrop-filter`; en Chromium se añade refracción real con un filtro SVG `feDisplacementMap`.
- Una lente de cristal sigue al cursor deformando el fondo; en móvil queda fija.
- Diagnóstico exprés con chips que cambian la rutina recomendada y widget de reserva con calendario.
- Degradación limpia: Safari/Firefox reciben cristal esmerilado sin refracción.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 4.1 KB / 2.0 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 79.9 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.1 s / 1.1 s / 0 ms / 0 |
| FPS hero móvil / escritorio* | 60.0 / 45.7 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
