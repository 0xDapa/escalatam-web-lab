# 09-css3d — Lino & Sal (Tienda de moda sostenible)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/09-css3d/ · **Tecnología:** Solo CSS 3D transforms (+ 1 KB de JS)

> Negocio **ficticio**. Textos, cifras (100%, 30, 4, 2,1k) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
Sin canvas ni WebGL: un carrusel 3D de 8 tarjetas con transform-style: preserve-3d, rotateY + translateZ; las “telas” son gradientes CSS. JS de 1 KB solo para arrastrar con inercia. La GPU compone todo.

## Identidad
- Fuente display: **League Gothic** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#f1ede6`, tinta `#1d1c1a`, acento `#2d5bff`, acento 2 `#ff7a59`, cifras `#1d1c1a`.
- Librería: ninguna — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 444 ms | 136 ms |
| LCP | 476 ms | 156 ms |
| FPS hero | 60.0 | 60.0 |
| FPS durante scroll | 59.7 | 60.3 |

- `app.js`: 3.0 KB minificado · **1.3 KB gzip** (núcleo + librería + hero).
- Página completa: 66.7 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 90, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 0.8 s · TBT 420 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/09-css3d/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `09-css3d`).
2. `python3 src/build.py 09-css3d` y revisar con `python3 tools/shoot.py 09-css3d`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
