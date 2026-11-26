# 08-canvas2d-globo — Rumbo Sur Viajes (Agencia de viajes)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/08-canvas2d-globo/ · **Tecnología:** Canvas 2D + proyección 3D manual (0 librerías)

> Negocio **ficticio**. Textos, cifras (64, +5200, 24/7, 12) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
Canvas 2D puro: ~6 000 puntos de tierra (datos Natural Earth, dominio público) proyectados ortográficamente a mano, back-face culling, arcos de vuelo animados (Bézier en 3D) y pines con etiqueta.

## Identidad
- Fuente display: **Barlow Condensed 800** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#f7f7f5`, tinta `#111418`, acento `#ff5d3b`, acento 2 `#2f63ff`, cifras `#0f1c2e`.
- Librería: ninguna — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 204 ms | 48 ms |
| LCP | 204 ms | 92 ms |
| FPS hero | 42.3 | 59.3 |
| FPS durante scroll | 56.0 | 60.3 |

- `app.js`: 36.7 KB minificado · **12.5 KB gzip** (núcleo + librería + hero).
- Página completa: 88.9 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 97, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 0.8 s · TBT 210 ms · CLS 0.011.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/08-canvas2d-globo/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `08-canvas2d-globo`).
2. `python3 src/build.py 08-canvas2d-globo` y revisar con `python3 tools/shoot.py 08-canvas2d-globo`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
