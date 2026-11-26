# 11-lenis-anime — Dulce Capa (Pastelería artesanal)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/11-lenis-anime/ · **Tecnología:** Lenis (scroll suave) + anime.js v4 + CSS 3D

> Negocio **ficticio**. Textos, cifras (28, 60min, +3500, 4,9★) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
Hero 100 % DOM: una tarta de 5 capas hecha con discos CSS 3D, animada con anime.js (stagger, rebote, decoración que cae). Lenis aporta el scroll suave; los contadores de cifras también usan anime.js (el glitch del titular es CSS del núcleo).

## Identidad
- Fuente display: **Sofia Sans Extra Condensed 900** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#fff1f3`, tinta `#3a1020`, acento `#ff4f8b`, acento 2 `#ffb547`, cifras `#3a1020`.
- Librería: lenis 1.3.28 + animejs 4.5.0 — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 312 ms | 72 ms |
| LCP | 344 ms | 72 ms |
| FPS hero | 59.3 | 60.0 |
| FPS durante scroll | 61.3 | 60.0 |

- `app.js`: 58.2 KB minificado · **20.7 KB gzip** (núcleo + librería + hero).
- Página completa: 91.3 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 99, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 1.2 s · TBT 140 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/11-lenis-anime/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `11-lenis-anime`).
2. `python3 src/build.py 11-lenis-anime` y revisar con `python3 tools/shoot.py 11-lenis-anime`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
