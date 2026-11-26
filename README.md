# Escalatam Web Lab — 52 demos ligeras de webs premium

**Galería en vivo:** https://0xdapa.github.io/escalatam-web-lab/

**Tanda 1 (01–12):** la misma web “estilo Viktor Oddy” (titular condensado con glitch, nav mono, un solo color de acento, objeto 3D en el hero,
transición de horizonte con brillo, cifras fijadas que cuentan y servicios en scroll horizontal) reconstruida con **12 tecnologías
más ligeras que Three.js**, cada una aplicada a un nicho real de nuestros leads.

**Tanda 2 (13–22):** 10 webs completas con 10 lenguajes de diseño y técnicas distintas (ver [Tanda 2](#tanda-2--10-webs-10-lenguajes-de-diseño)).

> ⚠️ **Todo es demostración.** Los 44 negocios son **ficticios**, las **cifras y textos son de ejemplo** y no hay fotos: las imágenes
> son gradientes CSS y objetos generados por código. Antes de enseñar una demo a un cliente hay que poner sus datos reales
> (ver `SOP.md`, paso 10). No se usa ningún logo ni marca de terceros. No se publica ningún asset ni prompt de Viktor Oddy.

Demo anterior (Three.js r170, ~150 KB gz de JS): https://0xdapa.github.io/escalatam-demo-3d/

## Documentación

| Archivo | Qué contiene |
|---|---|
| [`SOP.md`](SOP.md) | Procedimiento completo paso a paso: investigación del lead, tokens, prompt superdetallado, assets, construcción, presupuesto de rendimiento, pruebas, publicación y checklist por lead |
| [`METODO-VIKTOR-ODDY.md`](METODO-VIKTOR-ODDY.md) | Todo lo aprendido del método de Viktor Oddy, con enlaces a sus posts |
| [`PROMPTS.md`](PROMPTS.md) | 6 prompts para pegar en el agente cloud y sacar una demo por lead |
| [`VALOR-DE-VENTA.md`](VALOR-DE-VENTA.md) | **Qué vender y cuánto cobrar:** 18 funciones que suben el ticket (WhatsApp, reservas, cotizador, configurador, carrito→WhatsApp, antes/después, reseñas, SEO local, GBP, multilingüe, QR, CMS-light, IA…), matriz por nicho, qué demo enseña cada una, paquetes sugeridos LatAm/España/EE. UU., mensualidades, guion de pitch y snippets ligeros |
| [`LIBRERIAS.md`](LIBRERIAS.md) | 15 webs premiadas rápidas analizadas (librerías detectadas, peso, LCP) y comparativa medida de Three.js, OGL, GSAP (+plugins), Lenis, Motion, anime.js, Barba, Swup, Taxi, View Transitions, Lottie/dotLottie, Rive, Spline, Theatre, PixiJS, Swiper… con licencias y cuándo usar cada una |
| [`REFERENCIAS.md`](REFERENCIAS.md) | Webs reales analizadas para las tandas 3 y 4 |
| [`METODO-EMIL-KOWALSKI.md`](METODO-EMIL-KOWALSKI.md) | Principios de animación Emil Kowalski + Apple con snippets propios (tanda 4) |
| [`ANTI-AI-SLOP.md`](ANTI-AI-SLOP.md) | Cómo evitar que una demo se sienta generada: checklist de tells, flujo con DESIGN.md, prompts por tipo de sitio, reglas de tipo/color/layout/motion y hilos reales de X (Emil, Anthropic, shadcn, agencias locales) |
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

<!-- TANDA3:START -->
## Tanda 3 — 12 webs inspiradas en webs reales premiadas

Investigamos ~40 webs reales de negocios de personas (Awwwards SOTD/HM y líderes de nicho) y analizamos a fondo su diseño
(ver [`REFERENCIAS.md`](REFERENCIAS.md)). Cada demo **adapta el lenguaje de diseño de una referencia distinta** a un nicho
vendible, con código propio, marca ficticia, textos en español, fotos CC0 locales y CTA a WhatsApp. Sin librerías.

| # | Demo en vivo | Nicho | Ideal para | Inspirada en | Técnica | JS gzip | Página gzip | Lighthouse móvil (Perf / A11y / BP / SEO) |
|---|---|---|---|---|---|---|---|---|
| 23 | [Valeria Montes](https://0xdapa.github.io/escalatam-web-lab/23-marca-personal/) | Coach de carrera · CDMX | coaches, mentores, consultores, creadores de cursos, psicólogos, formadores | [aliabdaal.com](https://aliabdaal.com/) | Selector "¿cómo te ayudo?" con View Transitions + subrayado SVG que se dibuja | 1.8 KB | 203.6 KB | 100 / 97 / 100 / 100 |
| 24 | [Alba Clínica Dental](https://0xdapa.github.io/escalatam-web-lab/24-dental-premium/) | Odontología estética · Madrid | clínicas dentales, estética, cirugía plástica, dermatología, clínicas premium | [Aventura Dental Arts (Awwwards SOTD)](https://aventuradentalarts.com/) | Revelado con clip-path + texto palabra a palabra ligado al scroll + slider antes/después | 1.9 KB | 232.9 KB | 100 / 96 / 100 / 100 |
| 25 | [Ferrer Ruiz Abogados](https://0xdapa.github.io/escalatam-web-lab/25-abogados/) | Despacho de abogados · Bogotá | abogados, notarías, asesorías fiscales, consultoras, gestorías | [PXR Legal (Awwwards SOTD)](https://pxr.law/) | Píldora rotativa en el titular, menú de esquina a pantalla completa, tarjetas apiladas sticky (sin fotos) | 0.9 KB | 31.8 KB | 100 / 96 / 100 / 100 |
| 26 | [Almendro Residences](https://0xdapa.github.io/escalatam-web-lab/26-inmobiliaria-lujo/) | Promoción residencial de lujo · Altea | inmobiliarias, promotoras, residencias, villas vacacionales, arquitectos | [ERA Residence (Awwwards SOTD)](https://www.era-residence.com/) | Arco que crece con el scroll, anillo de texto circular, modo día/noche y tabla filtrable con View Transitions | 1.9 KB | 575.4 KB | 98 / 97 / 100 / 100 |
| 27 | [Hotel Pasaje](https://0xdapa.github.io/escalatam-web-lab/27-hotel-boutique/) | Hotel boutique · CDMX | hoteles boutique, hostales, casas rurales, apartamentos turísticos, bares de hotel | [The Drake Hotel (Awwwards SOTD)](https://thedrake.ca/) | Slideshow con miniaturas, barra de reserva sticky, pestañas de habitaciones y agenda con ticker | 1.2 KB | 486.1 KB | 94 / 100 / 100 / 100 |
| 28 | [Marea](https://0xdapa.github.io/escalatam-web-lab/28-alta-cocina/) | Restaurante de autor · Valparaíso | restaurantes de autor, menús degustación, bodegas, chefs privados | [Central Restaurante (Lima)](https://centralrestaurante.com.pe/) | Descenso por profundidades: el fondo interpola crema → mar → abismo con el scroll + medidor sticky | 1.7 KB | 636.9 KB | 100 / 95 / 100 / 100 |
| 29 | [Brote](https://0xdapa.github.io/escalatam-web-lab/29-cafe-brunch/) | Café de brunch · Valencia | cafeterías, panaderías, heladerías, brunch, tiendas de barrio | [Amici (Awwwards SOTD)](https://restaurant-amici.com/) | Polaroids arrastrables, pizarra del día, carrusel automático y tarjeta de sellos interactiva | 1.9 KB | 696.7 KB | 100 / 97 / 100 / 100 |
| 30 | [Lacada Nail Studio](https://0xdapa.github.io/escalatam-web-lab/30-nail-studio/) | Estudio de uñas · Lima | uñas, peluquerías, barberías, pestañas y cejas, maquillaje, spa | [Les Nanas Studio Floral (Awwwards HM)](https://lesnanas-studiofloral.com/) | Probador de uñas en SVG: color, acabado, forma y precio en vivo que viaja a la reserva | 1.8 KB | 187.7 KB | 100 / 100 / 100 / 100 |
| 31 | [Kinesia](https://0xdapa.github.io/escalatam-web-lab/31-fisioterapia/) | Kinesiología y fisioterapia · Santiago | fisioterapeutas, quiroprácticos, osteópatas, clínicas de salud, centros médicos | [Parsley Health](https://www.parsleyhealth.com/) | Mapa corporal SVG clicable + nivel de dolor que da consejo + próxima hora libre | 1.7 KB | 439.9 KB | 100 / 97 / 100 / 100 |
| 32 | [Ocre Estudio](https://0xdapa.github.io/escalatam-web-lab/32-estudio-interiorismo/) | Interiorismo · Montevideo | interioristas, arquitectos, reformas, tiendas de muebles, home staging | [Elite Design Studio (Awwwards SOTD)](https://www.elite-designstudio.com/) | Parallax por capas, manifiesto palabra a palabra, vista previa que sigue al cursor y paleta de materiales en vivo | 1.6 KB | 436.8 KB | 100 / 96 / 100 / 100 |
| 33 | [Velo](https://0xdapa.github.io/escalatam-web-lab/33-bodas-eventos/) | Wedding planner · Cartagena | wedding planners, fotógrafos de boda, fincas para eventos, catering, floristerías | [Alessandra Zanghi (Awwwards SOTD)](https://alessandrazanghi.studio/) | Calendario de disponibilidad + estimador de presupuesto + galería B/N→color | 1.8 KB | 421.2 KB | 100 / 100 / 100 / 100 |
| 34 | [Savia Nutrición](https://0xdapa.github.io/escalatam-web-lab/34-nutricion/) | Nutricionistas · Buenos Aires | nutricionistas, dietistas, entrenadores personales, psicólogos, terapeutas | [Function Health](https://www.functionhealth.com/) | Test de 3 preguntas con recomendación + plato en donut SVG animado + toggle de precios | 2.5 KB | 598.7 KB | 94 / 97 / 100 / 100 |

Lighthouse: preset móvil (CPU ×4, 4G simulada) contra localhost en Chrome headless con GPU por software. Fotos: StockSnap (CC0), créditos en el README de cada carpeta.
<!-- TANDA3:END -->

<!-- TANDA4:START -->
## Tanda 4 — 10 webs con Three.js y Motion (Emil Kowalski + Apple)

Investigamos los artículos y skills (MIT) de **Emil Kowalski** (Sonner, Vaul, animations.dev), las páginas de producto de **Apple**
(scroll-scrub, sticky de 500+ vh, texto que se ilumina) y webs WebGL premiadas (Lusion, Active Theory, Igloo, Bruno Simon).
Cada demo aplica esos principios con código propio a un nicho vendible. Método completo con snippets: [`METODO-EMIL-KOWALSKI.md`](METODO-EMIL-KOWALSKI.md).

- **7 con Three.js** (35, 36, 37, 39, 41, 42, 43) · **9 con Motion** (35, 36, 38, 39, 40, 41, 42, 43, 44) · **5 con scroll-scrub tipo Apple** (36, 37, 39, 43, 44).
- Three.js se **carga por intención** (primer scroll/puntero/tecla o 7 s) y un póster renderizado del mismo modelo hace de LCP → Lighthouse móvil ≥ 90 con WebGL.

| # | Demo en vivo | Nicho | Tecnología | Inspirada en | JS inicial gzip | JS total gzip | Lighthouse móvil (Perf / A11y / BP / SEO) |
|---|---|---|---|---|---|---|---|
| 35 | [Flora Viva](https://0xdapa.github.io/escalatam-web-lab/35-floristeria/) | Floristería | Three.js 0.187 + Motion 14 | [Igloo Inc + Sonner/Vaul](https://www.igloo.inc/) | 29.0 KB | 166.6 KB | 95 / 100 / 100 / 100 |
| 36 | [Lucía Ferrer](https://0xdapa.github.io/escalatam-web-lab/36-fotografa/) | Fotógrafa (bodas, retrato, paisaje) | Three.js 0.187 + Motion 14 · scroll-scrub | [Lusion + Active Theory](https://lusion.co/) | 28.8 KB | 159.4 KB | 90 / 100 / 100 / 100 |
| 37 | [Estudio Vértice](https://0xdapa.github.io/escalatam-web-lab/37-arquitectura/) | Estudio de arquitectura | Three.js 0.187 · scroll-scrub | [Apple (scroll-scrub) + Bruno Simon](https://www.apple.com/macbook-pro/) | 2.5 KB | 138.1 KB | 98 / 100 / 100 / 100 |
| 38 | [Aura Medicina Estética](https://0xdapa.github.io/escalatam-web-lab/38-clinica-estetica/) | Clínica estética | Motion 14 | [animations.dev + Vaul + Sonner (Emil Kowalski)](https://animations.dev/) | 30.3 KB | 30.3 KB | 100 / 100 / 100 / 100 |
| 39 | [Obsidiana Detailing](https://0xdapa.github.io/escalatam-web-lab/39-detailing/) | Detailing automotriz | Three.js 0.187 + Motion 14 · scroll-scrub | [Apple (scroll-scrub) + estudios de detailing](https://www.apple.com/airpods-pro/) | 28.2 KB | 160.9 KB | 97 / 100 / 100 / 100 |
| 40 | [Kai Torres](https://0xdapa.github.io/escalatam-web-lab/40-entrenador/) | Entrenador personal | Motion 14 | [Apple Watch + Emil Kowalski](https://www.apple.com/apple-watch-ultra-3/) | 28.8 KB | 28.8 KB | 97 / 100 / 100 / 100 |
| 41 | [Tinta Negra](https://0xdapa.github.io/escalatam-web-lab/41-tatuajes/) | Estudio de tatuajes | Three.js 0.187 + Motion 14 | [Active Theory + Lusion (shaders)](https://activetheory.net/) | 28.1 KB | 158.2 KB | 99 / 100 / 100 / 100 |
| 42 | [NOVA](https://0xdapa.github.io/escalatam-web-lab/42-dj-artista/) | DJ / artista musical | Three.js 0.187 + Motion 14 | [Igloo Inc + Active Theory](https://www.igloo.inc/) | 28.2 KB | 159.5 KB | 99 / 100 / 100 / 100 |
| 43 | [Cumbre T1](https://0xdapa.github.io/escalatam-web-lab/43-lanzamiento-producto/) | Lanzamiento de producto (DTC) | Three.js 0.187 + Motion 14 · scroll-scrub | [Apple AirPods Pro / MacBook Pro](https://www.apple.com/airpods-pro/) | 28.8 KB | 164.6 KB | 99 / 100 / 100 / 100 |
| 44 | [Dra. Elena Ríos](https://0xdapa.github.io/escalatam-web-lab/44-psicologia/) | Psicóloga | Motion 14 · scroll-scrub | [Apple (texto con scroll) + Vaul/animations.dev](https://vaul.emilkowal.ski/) | 29.1 KB | 29.1 KB | 100 / 95 / 100 / 100 |

Lighthouse: preset móvil (CPU ×4, 4G simulada) contra localhost en Chrome headless con GPU por software. Collage local (no se publica, `shots/` está en .gitignore): `python3 tools/collage4.py` → `shots/collage-tanda4.png`.
<!-- TANDA4:END -->

<!-- TANDA5:START -->
## Tanda 5 — 8 webs que replican referencias premiadas con nuestro enfoque

Tomamos las mejores webs de la investigación t5 (Crav Burgers, Odyssée, ERA Residence, OH Architecture, MERSI, Son Daven, Lando Norris, Mana, Scout Motors)
y replicamos su **técnica y sensación** con código, marca y copy propios, en nichos con demanda y con lo que vende Escalatam: **reserva/pedido por WhatsApp,
calculadoras, configuradores, schema LocalBusiness y ES/EN**. Reglas visuales de [`ANTI-AI-SLOP.md`](ANTI-AI-SLOP.md); cada demo tiene su `DESIGN.md`.

- Stack: **GSAP 3.15 (ScrollTrigger, SplitText, Flip) + Lenis** en todas; **OGL** (49) y **Three.js** (51) cargados por intención; **View Transitions API** (48).
- Cada demo: JSON-LD (`Restaurant`, `MedicalClinic`, `RealEstateAgent`, `ProfessionalService`, `Hotel`, `Store`, `AutoDealer`), conmutador ES/EN, WhatsApp prellenado por servicio, menú móvil, un solo momento orquestado (nada de fade-up en cada sección).

| # | Demo en vivo | Nicho | Replica | Tecnología | Función clave | JS inicial gzip | Lighthouse móvil (Perf / A11y / BP / SEO) |
|---|---|---|---|---|---|---|---|
| 45 | [Brava Smash Club](https://0xdapa.github.io/escalatam-web-lab/45-smash-burger/) | Hamburguesería smash (Guadalajara) | [Crav Burgers](https://cravburgers.shop/) | GSAP 3.15 (ScrollTrigger, SplitText) + Lenis | Carrito → pedido por WhatsApp (recoger o domicilio +$45, cantidades, guardado en localStorage) | 56.6 KB | 92 / 100 / 100 / 100 |
| 46 | [Lúa Clínica](https://0xdapa.github.io/escalatam-web-lab/46-clinica-botanica/) | Clínica de medicina estética (Madrid) | [Odyssée Clinic](https://odysseeclinic.com.au/) | GSAP 3.15 (ScrollTrigger, SplitText) + Lenis | Reserva: tratamiento, 14 días (domingo cerrado), horas libres y confirmación por WhatsApp | 55.4 KB | 91 / 100 / 100 / 100 |
| 47 | [Mirador del Faro](https://0xdapa.github.io/escalatam-web-lab/47-residencial-costa/) | Promoción inmobiliaria (Jávea) | [ERA Residence](https://www.era-residence.com/) | GSAP 3.15 (ScrollTrigger, SplitText, Flip) + Lenis | Filtro de viviendas por dormitorios/ático/disponibles con “Pedir plano” por WhatsApp | 63.9 KB | 94 / 97 / 100 / 100 |
| 48 | [Pliegue Arquitectos](https://0xdapa.github.io/escalatam-web-lab/48-arquitectos/) | Estudio de arquitectura (Bogotá) | [OH Architecture + MERSI](https://www.oharchitecture.com.au/) · [www.mersi-architecture.com](https://www.mersi-architecture.com/) | GSAP 3.15 (ScrollTrigger, SplitText) + Lenis + View Transitions API | Calculadora de honorarios (tipo, m², alcance) con rango en COP y plazo → WhatsApp | 55.4 KB | 92 / 100 / 100 / 100 |
| 49 | [Bruma Lodge](https://0xdapa.github.io/escalatam-web-lab/49-hotel-montana/) | Lodge / hotel boutique (Minca, Colombia) | [Son Daven](https://sondaven.com/en) | GSAP 3.15 (ScrollTrigger, SplitText, Flip) + Lenis + OGL | Barra de reserva: llegada, salida, huéspedes, cabaña → total con noches y huésped extra → WhatsApp | 64.4 KB | 100 / 100 / 100 / 100 |
| 50 | [Martina Vega](https://0xdapa.github.io/escalatam-web-lab/50-marca-personal/) | Marca personal · entrenadora de tenis (Barcelona) | [Lando Norris](https://landonorris.com/) | GSAP 3.15 (ScrollTrigger, SplitText) + Lenis | Reserva de clase: tipo (privada, semiprivada, clínica, bono), día, hora libre → WhatsApp con nivel | 55.2 KB | 94 / 100 / 100 / 100 |
| 51 | [Selva Mate](https://0xdapa.github.io/escalatam-web-lab/51-mate-bebida/) | Marca de bebida / e-commerce (CDMX) | [Mana Yerba Mate](https://manayerbamate.com/) | GSAP 3.15 (ScrollTrigger) + Lenis + Three.js 0.187 | Configurador de caja 6/12/24 mezclando sabores (deben sumar el tamaño) con precio por lata | 55.6 KB | 98 / 100 / 100 / 100 |
| 52 | [Andes 4x4](https://0xdapa.github.io/escalatam-web-lab/52-autos-configurador/) | Concesionario / preparador 4x4 (Santiago de Chile) | [Scout Motors](https://www.scoutmotors.com/) | GSAP 3.15 (ScrollTrigger, SplitText) + Lenis | Configurador con precio al instante en CLP | 55.3 KB | 98 / 100 / 100 / 100 |

Lighthouse: preset móvil (CPU ×4, 4G simulada) contra localhost en Chrome headless. Collage local (no se publica): `python3 tools/collage5.py` → `shots/collage-tanda5.png`.
<!-- TANDA5:END -->

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
