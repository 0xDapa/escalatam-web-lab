# 10-svg — Babel Lab (Academia de idiomas)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/10-svg/ · **Tecnología:** SVG + JS vanilla (proyección 3D manual)

> Negocio **ficticio**. Textos, cifras (6, 94%, 3, +1100) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
SVG nativo: meridianos y paralelos generados con JS y proyectados en 3D cada frame (paths con d actualizado), con las caras traseras atenuadas y etiquetas de saludos en 8 idiomas orbitando. Nítido a cualquier zoom.

## Identidad
- Fuente display: **Bebas Neue** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#fffdf7`, tinta `#17132e`, acento `#5b4bff`, acento 2 `#ff4fa3`, cifras `#17132e`.
- Librería: ninguna — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 72 ms | 44 ms |
| LCP | 156 ms | 112 ms |
| FPS hero | 38.0 | 60.3 |
| FPS durante scroll | 57.7 | 59.3 |

- `app.js`: 5.7 KB minificado · **2.5 KB gzip** (núcleo + librería + hero).
- Página completa: 70.2 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 100, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 1.1 s · TBT 50 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/10-svg/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `10-svg`).
2. `python3 src/build.py 10-svg` y revisar con `python3 tools/shoot.py 10-svg`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
