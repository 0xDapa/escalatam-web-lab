# 02-ogl — Clínica Dental Lumen (Clínica dental)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/02-ogl/ · **Tecnología:** OGL (≈ 8 KB gz usados)

> Negocio **ficticio**. Textos, cifras (15, +2400, 98%, 0€) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
OGL (micro-librería WebGL): esfera de 128×128 con vertex shader de ruido (respira), fresnel iridiscente “perla” y 3 satélites orbitando. Solo se importan Renderer, Camera, Program, Mesh, Sphere y Transform.

## Identidad
- Fuente display: **Big Shoulders Display 800** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#f2f6fa`, tinta `#0d1b2a`, acento `#0fa3a0`, acento 2 `#7fd6ff`, cifras `#0d1b2a`.
- Librería: ogl 1.0.11 — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 52 ms | 52 ms |
| LCP | 252 ms | 204 ms |
| FPS hero | 48.0 | 60.3 |
| FPS durante scroll | 58.3 | 60.0 |

- `app.js`: 52.0 KB minificado · **15.7 KB gzip** (núcleo + librería + hero).
- Página completa: 84.5 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 99, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 0.8 s · TBT 130 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/02-ogl/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `02-ogl`).
2. `python3 src/build.py 02-ogl` y revisar con `python3 tools/shoot.py 02-ogl`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
