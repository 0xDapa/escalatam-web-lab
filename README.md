# Escalatam Web Lab — 22 demos ligeras de webs premium

**Galería en vivo:** https://0xdapa.github.io/escalatam-web-lab/

**Tanda 1 (01–12):** la misma web “estilo Viktor Oddy” (titular condensado con glitch, nav mono, un solo color de acento, objeto 3D en el hero,
transición de horizonte con brillo, cifras fijadas que cuentan y servicios en scroll horizontal) reconstruida con **12 tecnologías
más ligeras que Three.js**, cada una aplicada a un nicho real de nuestros leads.

**Tanda 2 (13–22):** 10 webs completas con 10 lenguajes de diseño y técnicas distintas (ver [Tanda 2](#tanda-2--10-webs-10-lenguajes-de-diseño)).

> ⚠️ **Todo es demostración.** Los 22 negocios son **ficticios**, las **cifras y textos son de ejemplo** y no hay fotos: las imágenes
> son gradientes CSS y objetos generados por código. Antes de enseñar una demo a un cliente hay que poner sus datos reales
> (ver `SOP.md`, paso 10). No se usa ningún logo ni marca de terceros. No se publica ningún asset ni prompt de Viktor Oddy.

Demo anterior (Three.js r170, ~150 KB gz de JS): https://0xdapa.github.io/escalatam-demo-3d/

## Documentación

| Archivo | Qué contiene |
|---|---|
| [`SOP.md`](SOP.md) | Procedimiento completo paso a paso: investigación del lead, tokens, prompt superdetallado, assets, construcción, presupuesto de rendimiento, pruebas, publicación y checklist por lead |
| [`METODO-VIKTOR-ODDY.md`](METODO-VIKTOR-ODDY.md) | Todo lo aprendido del método de Viktor Oddy, con enlaces a sus posts |
| [`PROMPTS.md`](PROMPTS.md) | 6 prompts para pegar en el agente cloud y sacar una demo por lead |
| `<id>/README.md` | Notas de cada variante: técnica, cómo funciona el hero, tamaños y rendimiento |

## Las 12 variantes

| # | Demo en vivo | Nicho | Tecnología | JS gzip | Página gzip* | Lighthouse móvil | LCP móvil | TBT | FPS hero móvil / escritorio** |
|---|---|---|---|---|---|---|---|---|---|
| 01 | [Brasa Norte](https://0xdapa.github.io/escalatam-web-lab/01-webgl2-puro/) | Restaurante / asador | WebGL2 puro (sin librería) | 2.8 KB | 75.6 KB | 97 | 0.8 s | 190 ms | 60.0 / 60.0 |
| 02 | [Clínica Dental Lumen](https://0xdapa.github.io/escalatam-web-lab/02-ogl/) | Clínica dental | OGL (micro-librería WebGL) | 15.7 KB | 84.5 KB | 99 | 0.8 s | 130 ms | 60.3 / 48.0 |
| 03 | [Altamar Inmobiliaria](https://0xdapa.github.io/escalatam-web-lab/03-twgl/) | Inmobiliaria | TWGL (helpers WebGL2) | 15.4 KB | 82.2 KB | 99 | 1.2 s | 100 ms | 60.0 / 35.3 |
| 04 | [Pulso Fitness](https://0xdapa.github.io/escalatam-web-lab/04-regl/) | Gimnasio / box | regl (WebGL funcional) | 33.2 KB | 96.3 KB | 99 | 0.8 s | 120 ms | 60.0 / 60.0 |
| 05 | [Ortega & Vidal](https://0xdapa.github.io/escalatam-web-lab/05-picogl/) | Despacho de abogados | PicoGL (WebGL2 mínimo) | 17.4 KB | 82.6 KB | 99 | 0.8 s | 100 ms | 60.3 / 60.0 |
| 06 | [Nácar Joyas](https://0xdapa.github.io/escalatam-web-lab/06-shader-raymarch/) | Joyería / tienda de lujo | Fragment shader único (raymarching, 0 librerías) | 2.5 KB | 75.4 KB | 98 | 0.8 s | 170 ms | 40.3 / 25.7 |
| 07 | [Tueste Lento](https://0xdapa.github.io/escalatam-web-lab/07-zdog/) | Cafetería de especialidad | Zdog (pseudo-3D en Canvas 2D) | 9.6 KB | 108.2 KB | 100 | 1.1 s | 70 ms | 60.0 / 56.3 |
| 08 | [Rumbo Sur Viajes](https://0xdapa.github.io/escalatam-web-lab/08-canvas2d-globo/) | Agencia de viajes | Canvas 2D + proyección 3D manual (0 librerías) | 12.5 KB | 88.9 KB | 97 | 0.8 s | 210 ms | 59.3 / 42.3 |
| 09 | [Lino & Sal](https://0xdapa.github.io/escalatam-web-lab/09-css3d/) | Tienda de moda sostenible | Solo CSS 3D transforms (+ 1 KB de JS) | 1.3 KB | 66.7 KB | 90 | 0.8 s | 420 ms | 60.0 / 60.0 |
| 10 | [Babel Lab](https://0xdapa.github.io/escalatam-web-lab/10-svg/) | Academia de idiomas | SVG + JS vanilla (proyección 3D manual) | 2.5 KB | 70.2 KB | 100 | 1.1 s | 50 ms | 60.3 / 38.0 |
| 11 | [Dulce Capa](https://0xdapa.github.io/escalatam-web-lab/11-lenis-anime/) | Pastelería artesanal | Lenis (scroll suave) + anime.js v4 + CSS 3D | 20.7 KB | 91.3 KB | 99 | 1.2 s | 140 ms | 60.0 / 59.3 |
| 12 | [Respira Spa](https://0xdapa.github.io/escalatam-web-lab/12-motion-particulas/) | Spa y bienestar | Motion (mini) + partículas Canvas 2D vanilla | 8.6 KB | 77.0 KB | 99 | 1.1 s | 140 ms | 36.3 / 22.3 |

\* Página completa comprimida: HTML + CSS + JS (gzip -9) + 4 fuentes woff2 (≈ 65 KB, la mayor parte del peso).
\** FPS medidos con Chrome headless y **GPU por software (SwiftShader)** en un servidor sin tarjeta gráfica y compartido: es el peor caso.
En móviles y portátiles reales con GPU, las variantes WebGL y Canvas suelen ir a la tasa de refresco de la pantalla. Las variantes con
FPS bajos en esta tabla (06 raymarching, 08 globo Canvas 2D, 12 partículas) son las que más dependen de la GPU/rasterizado.
Lighthouse: preset móvil por defecto (CPU ×4 más lenta, red 4G simulada), servido desde localhost.

<!-- TANDA2:START -->
## Tanda 2 — 10 webs, 10 lenguajes de diseño

Después de la tanda 1 (la misma web con 12 motores 3D), la tanda 2 son **10 webs completas que no se parecen entre sí**:
cada una con una estética y una técnica distinta, priorizando restaurantes. **Cero librerías** (todo vanilla, nada que
vendorizar), fuentes OFL autoalojadas y todo lo visual generado por código. Negocios ficticios, cifras de ejemplo.

| # | Demo en vivo | Nicho | Lenguaje de diseño | Técnica | JS gzip | Página gzip | Lighthouse móvil (Perf / A11y / BP / SEO) | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|---|
| 13 | [Sobremesa](https://0xdapa.github.io/escalatam-web-lab/13-editorial-css/) | Restaurante de temporada · Valencia | Editorial de revista (serif display, columnas, filetes) | Solo CSS: scroll-driven animations + View Transitions entre páginas (0 KB de JS) | 0.0 KB | 185.5 KB | 99 / 100 / 100 / 100 | 0.9 s | 100 ms | 0 |
| 14 | [Bar Trueno](https://0xdapa.github.io/escalatam-web-lab/14-brutalista-kinetica/) | Coctelería · Ciudad de México | Neo-brutalismo con tipografía cinética | Fuente variable (ejes ancho+peso) movida por puntero y velocidad de scroll, JS vanilla | 2.1 KB | 127.8 KB | 100 / 100 / 100 / 100 | 1.2 s | 0 ms | 0.009 |
| 15 | [Aura Dermoestética](https://0xdapa.github.io/escalatam-web-lab/15-liquid-glass/) | Clínica de estética · Madrid | Liquid glass suave (cristal refractivo, tonos piel) | backdrop-filter + filtro SVG de desplazamiento (lente refractiva) + esferas con gradientes CSS | 2.0 KB | 79.9 KB | 100 / 100 / 100 / 100 | 1.1 s | 0 ms | 0 |
| 16 | [Núcleo](https://0xdapa.github.io/escalatam-web-lab/16-bento-microinteracciones/) | Gimnasio de fuerza · Lima | Bento grid oscuro tipo dashboard | Microinteracciones: spotlight de borde con variables CSS, Canvas 2D (ECG), SVG (anillos/gauges) | 3.2 KB | 114.5 KB | 100 / 100 / 100 / 100 | 1.7 s | 0 ms | 0 |
| 17 | [Hotel Salitre](https://0xdapa.github.io/escalatam-web-lab/17-scroll-horizontal/) | Hotel boutique · Cabo de Gata | Relato horizontal con capas de paralaje (ilustración) | Sección sticky con pista horizontal + paralaje por capas SVG, 1 KB de JS | 1.0 KB | 118.8 KB | 100 / 96 / 100 / 100 | 1.2 s | 0 ms | 0.001 |
| 18 | [Doble Smash](https://0xdapa.github.io/escalatam-web-lab/18-secuencia-canvas/) | Hamburguesería · Santiago de Chile | Producto explotado con secuencia de fotogramas (estilo Apple) | Secuencia de 60 fotogramas WebP pintados en Canvas según el scroll (scrubbing) | 1.4 KB | 1473.1 KB | 100 / 100 / 100 / 100 | 0.9 s | 0 ms | 0 |
| 19 | [Atelier Nube](https://0xdapa.github.io/escalatam-web-lab/19-shader-lujo/) | Salón de peluquería de autor · Buenos Aires | Lujo editorial minimal (serif Didone, mucho aire) | Shader de seda en WebGL1 (un solo fragment shader, sin librería), media resolución y pausa fuera de pantalla | 1.9 KB | 137.4 KB | 100 / 100 / 100 / 100 | 1.1 s | 0 ms | 0 |
| 20 | [Barbería Píxel](https://0xdapa.github.io/escalatam-web-lab/20-retro-pixel/) | Barbería · Bogotá | Retro escritorio 8-bit / Y2K | Ventanas arrastrables (Pointer Events) + simulador de corte en pixel art (Canvas 32×32) + modo CRT | 2.2 KB | 44.6 KB | 100 / 100 / 100 / 100 | 1.2 s | 0 ms | 0 |
| 21 | [Raíz Inmobiliaria](https://0xdapa.github.io/escalatam-web-lab/21-mapa-interactivo/) | Inmobiliaria de barrio · Montevideo | Cartografía ilustrada (mapa como interfaz) | Mapa SVG procedural con zoom/pan/pellizco y rutas animadas, sin librería de mapas | 4.8 KB | 115.3 KB | 97 / 100 / 100 / 100 | 1.2 s | 190 ms | 0 |
| 22 | [La Lumbre](https://0xdapa.github.io/escalatam-web-lab/22-configurador-menu/) | Taquería al carbón · Guadalajara | Ilustración plana, cálida y juguetona | Configurador “arma tu taco” con SVG en vivo + carta filtrable con View Transitions + pedido por WhatsApp | 5.7 KB | 38.9 KB | 100 / 100 / 100 / 100 | 1.0 s | 30 ms | 0 |

Página gzip = todo lo que hay en la carpeta (HTML, CSS, JS con gzip -9 + woff2 + imágenes). En 18 incluye los 60 fotogramas WebP.
Lighthouse: preset móvil (CPU ×4, 4G simulada) contra localhost. Cada carpeta tiene su README con cómo funciona.
<!-- TANDA2:END -->

## Elegir variante en 10 segundos

- **Lo más ligero posible** (gama baja, 1–3 KB de JS): `09-css3d`, `10-svg`, `01-webgl2-puro`, `06-shader-raymarch`.
- **Más “wow” visual**: `01-webgl2-puro` (brasas), `06-shader-raymarch` (metal líquido), `04-regl` (neón).
- **Serio / profesional**: `02-ogl` (clínica), `05-picogl` (abogados), `03-twgl` (inmobiliaria).
- **Simpático / ilustrado**: `07-zdog` (café), `11-lenis-anime` (pastelería).
- **Ubicación / viajes**: `08-canvas2d-globo`.
- **Calma / bienestar**: `12-motion-particulas`.

## Estructura del repositorio

```
index.html                ← galería (GitHub Pages sirve la raíz de main)
NN-variante/              ← cada demo, autocontenida: index.html, core.css, app.js, fonts/, README.md
src/core/                 ← núcleo compartido (CSS + JS vanilla ≈ 2 KB gz)
src/variants.py           ← textos, colores y fuentes de las 12 variantes
src/variants/NN-*/        ← el hero de cada variante (hero.js + hero.css/stage.html opcionales)
src/build.py              ← construye todo (esbuild empaqueta y minifica; librerías incluidas, sin CDN)
tools/                    ← shoot.py (capturas), perf.py (tamaños/FPS), lighthouse.sh, gallery.py, docs.py
pkg/package.json          ← versiones exactas de las librerías
thumbs/                   ← miniaturas de la galería
```

Cada carpeta `NN-*` funciona sola: se puede copiar a cualquier hosting (Netlify, Vercel, cPanel) tal cual.

## Reconstruir

```bash
cd pkg && npm install && cd .. && ln -s pkg/node_modules node_modules
python3 src/build.py && python3 -m http.server 8817   # http://localhost:8817/
python3 tools/shoot.py 01-webgl2-puro && python3 tools/perf.py && ./tools/lighthouse.sh
python3 tools/gallery.py && python3 tools/docs.py && python3 tools/docs2.py   # docs2 = README de 13–22 + bloque Tanda 2
```

## Créditos y licencias

- Librerías (MIT): OGL, TWGL, regl, PicoGL, Zdog, Lenis, Motion, anime.js. esbuild para empaquetar.
- Fuentes: Google Fonts (SIL Open Font License).
- Puntos de tierra del globo (variante 08): Natural Earth vía world-atlas (dominio público).
- Diseño, código y textos: Escalatam. Inspiración de estructura: el método público de Viktor Oddy (ver `METODO-VIKTOR-ODDY.md`).
