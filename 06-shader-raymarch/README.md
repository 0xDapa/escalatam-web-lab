# 06-shader-raymarch — Nácar Joyas (Joyería / tienda de lujo)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/06-shader-raymarch/ · **Tecnología:** Fragment shader único (raymarching, 0 librerías)

> Negocio **ficticio**. Textos, cifras (36, 48h, 5 años, 4,9★) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
Un único fragment shader: 5 metaballs con smooth-min, raymarching de 64 pasos, reflejo de entorno procedural (estudio) y aberración de color en el borde. Resolución adaptativa (renderiza al 60 % y escala).

## Identidad
- Fuente display: **Saira Extra Condensed 800** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#0e0e10`, tinta `#f3efe9`, acento `#ff2e63`, acento 2 `#ffd1a6`, cifras `#f3efe9`.
- Librería: ninguna — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 200 ms | 44 ms |
| LCP | 200 ms | 136 ms |
| FPS hero | 25.7 | 40.3 |
| FPS durante scroll | 51.0 | 57.0 |

- `app.js`: 5.4 KB minificado · **2.5 KB gzip** (núcleo + librería + hero).
- Página completa: 75.4 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 98, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 0.8 s · TBT 170 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/06-shader-raymarch/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `06-shader-raymarch`).
2. `python3 src/build.py 06-shader-raymarch` y revisar con `python3 tools/shoot.py 06-shader-raymarch`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
