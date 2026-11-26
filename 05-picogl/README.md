# 05-picogl — Ortega & Vidal (Despacho de abogados)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/05-picogl/ · **Tecnología:** PicoGL (WebGL2 mínimo)

> Negocio **ficticio**. Textos, cifras (22, +1300, 87%, 24h) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
PicoGL (capa WebGL2 mínima): icosaedro subdividido facetado (flat shading con normales por cara), especular tipo cristal y borde dorado; una sola draw call.

## Identidad
- Fuente display: **Antonio 700** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#f5f2ec`, tinta `#1b1b1f`, acento `#8a1c2b`, acento 2 `#c9a24a`, cifras `#1b1b1f`.
- Librería: picogl 0.17.9 — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 112 ms | 88 ms |
| LCP | 112 ms | 88 ms |
| FPS hero | 60.0 | 60.3 |
| FPS durante scroll | 60.0 | 60.0 |

- `app.js`: 70.6 KB minificado · **17.4 KB gzip** (núcleo + librería + hero).
- Página completa: 82.6 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 99, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 0.8 s · TBT 100 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/05-picogl/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `05-picogl`).
2. `python3 src/build.py 05-picogl` y revisar con `python3 tools/shoot.py 05-picogl`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
