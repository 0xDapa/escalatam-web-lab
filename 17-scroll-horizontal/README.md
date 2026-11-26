# 17 · Hotel Salitre — Hotel boutique · Cabo de Gata

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/17-scroll-horizontal/

- **Lenguaje de diseño:** Relato horizontal con capas de paralaje (ilustración)
- **Técnica:** Sección sticky con pista horizontal + paralaje por capas SVG, 1 KB de JS
- **Tipografías:** Cormorant + DM Sans (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- El scroll vertical mueve una pista horizontal de 5 capítulos (amanecer → noche) dentro de una sección `position: sticky`.
- Cada escena son capas SVG generadas por código que se desplazan a distinta velocidad (`--d`).
- Navegación de capítulos con progreso, habitaciones en tarjetas de arco y formulario que calcula noches.
- En móvil la pista sigue funcionando con el mismo gesto vertical.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 1.7 KB / 1.0 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 118.8 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 96 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.2 s / 1.2 s / 0 ms / 0.001 |
| FPS hero móvil / escritorio* | 60.0 / 60.0 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
