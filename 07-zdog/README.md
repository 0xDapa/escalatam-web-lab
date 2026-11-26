# 07-zdog — Tueste Lento (Cafetería de especialidad)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/07-zdog/ · **Tecnología:** Zdog (pseudo-3D plano, ≈ 9 KB gz)

> Negocio **ficticio**. Textos, cifras (6, +86, 450, 7,5h) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
Zdog dibuja formas vectoriales en Canvas 2D con proyección 3D: taza (Cylinder + Ellipse), plato, granos orbitando y vapor animado con Shape en zig-zag. Cero WebGL, funciona en cualquier móvil.

## Identidad
- Fuente display: **Fjalla One** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#efe6d8`, tinta `#2a1a12`, acento `#c0592b`, acento 2 `#2f8f6b`, cifras `#2a1a12`.
- Librería: zdog 1.1.3 — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 388 ms | 92 ms |
| LCP | 388 ms | 92 ms |
| FPS hero | 56.3 | 60.0 |
| FPS durante scroll | 60.0 | 60.3 |

- `app.js`: 32.8 KB minificado · **9.6 KB gzip** (núcleo + librería + hero).
- Página completa: 108.2 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 100, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 1.1 s · TBT 70 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/07-zdog/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `07-zdog`).
2. `python3 src/build.py 07-zdog` y revisar con `python3 tools/shoot.py 07-zdog`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
