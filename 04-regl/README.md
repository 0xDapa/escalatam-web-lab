# 04-regl — Pulso Fitness (Gimnasio / box)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/04-regl/ · **Tecnología:** regl (WebGL funcional, ≈ 26 KB gz)

> Negocio **ficticio**. Textos, cifras (42, 14, +850, 7) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
regl (WebGL declarativo): 14 000 puntos en un toroide que late a ritmo cardíaco (función ECG en el vertex shader), blending aditivo con dos colores neón.

## Identidad
- Fuente display: **Teko 600** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#0b0b0c`, tinta `#f2f2f2`, acento `#c6ff00`, acento 2 `#00e5ff`, cifras `#c6ff00`.
- Librería: regl 2.1.1 (build unchecked) — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 376 ms | 152 ms |
| LCP | 376 ms | 152 ms |
| FPS hero | 60.0 | 60.0 |
| FPS durante scroll | 55.0 | 60.0 |

- `app.js`: 94.0 KB minificado · **33.2 KB gzip** (núcleo + librería + hero).
- Página completa: 96.3 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 99, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 0.8 s · TBT 120 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/04-regl/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `04-regl`).
2. `python3 src/build.py 04-regl` y revisar con `python3 tools/shoot.py 04-regl`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
