# 03-twgl — Altamar Inmobiliaria (Inmobiliaria)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/03-twgl/ · **Tecnología:** TWGL (helpers WebGL2)

> Negocio **ficticio**. Textos, cifras (+180, 21, 3,2%, 96%) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
TWGL simplifica buffers/uniforms: una ciudad de 24×24 edificios instanciados (1 draw call, WebGL2 instancing) que suben con una ola senoidal, iluminación direccional y niebla hacia el fondo.

## Identidad
- Fuente display: **Oswald 700** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#eeeae4`, tinta `#14213d`, acento `#b47a26`, acento 2 `#3d6bff`, cifras `#14213d`.
- Librería: twgl.js 7.0.0 — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 268 ms | 120 ms |
| LCP | 268 ms | 120 ms |
| FPS hero | 35.3 | 60.0 |
| FPS durante scroll | 55.7 | 60.0 |

- `app.js`: 43.7 KB minificado · **15.4 KB gzip** (núcleo + librería + hero).
- Página completa: 82.2 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 99, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 1.2 s · TBT 100 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/03-twgl/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `03-twgl`).
2. `python3 src/build.py 03-twgl` y revisar con `python3 tools/shoot.py 03-twgl`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
