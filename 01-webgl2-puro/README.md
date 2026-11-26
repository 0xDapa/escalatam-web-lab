# 01-webgl2-puro — Brasa Norte (Restaurante / asador)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/01-webgl2-puro/ · **Tecnología:** WebGL2 puro (sin librería)

> Negocio **ficticio**. Textos, cifras (48h, 4,9★, +320, 12) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
Fragment + vertex shader escritos a mano: 9 000 partículas sobre una esfera de Fibonacci, desplazadas con ruido y chispas que suben. Blending aditivo, sin texturas.

## Identidad
- Fuente display: **Anton** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#120d0a`, tinta `#f4ece2`, acento `#ff5a1f`, acento 2 `#ffc46b`, cifras `#f4ece2`.
- Librería: ninguna — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 588 ms | 124 ms |
| LCP | 588 ms | 1404 ms |
| FPS hero | 60.0 | 60.0 |
| FPS durante scroll | 55.0 | 61.3 |

- `app.js`: 5.8 KB minificado · **2.8 KB gzip** (núcleo + librería + hero).
- Página completa: 75.6 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 97, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 0.8 s · TBT 190 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/01-webgl2-puro/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `01-webgl2-puro`).
2. `python3 src/build.py 01-webgl2-puro` y revisar con `python3 tools/shoot.py 01-webgl2-puro`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
