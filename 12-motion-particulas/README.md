# 12-motion-particulas — Respira Spa (Spa y bienestar)

**Demo:** https://0xdapa.github.io/escalatam-web-lab/12-motion-particulas/ · **Tecnología:** Motion (mini) + partículas Canvas 2D vanilla

> Negocio **ficticio**. Textos, cifras (90min, 12, 4,8★, 2x1) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
Partículas en Canvas 2D (campo de flujo con ruido, 1 400 partículas (900 en móvil), estelas suaves, reaccionan al cursor). Motion (versión mini) controla el scroll del horizonte con scroll(), los reveals con inView() y animate().

## Identidad
- Fuente display: **Big Shoulders Display 800** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `#eef1ea`, tinta `#1f2a22`, acento `#4f7a5a`, acento 2 `#d9a46c`, cifras `#1f2a22`.
- Librería: motion 14.14.0 (mini animate + scroll + inView) — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | 60 ms | 44 ms |
| LCP | 156 ms | 100 ms |
| FPS hero | 22.3 | 36.3 |
| FPS durante scroll | 50.7 | 55.3 |

- `app.js`: 21.7 KB minificado · **8.6 KB gzip** (núcleo + librería + hero).
- Página completa: 77.0 KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento 99, accesibilidad 92, buenas prácticas 100, SEO 100 · LCP 1.1 s · TBT 140 ms · CLS 0.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/12-motion-particulas/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `12-motion-particulas`).
2. `python3 src/build.py 12-motion-particulas` y revisar con `python3 tools/shoot.py 12-motion-particulas`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
