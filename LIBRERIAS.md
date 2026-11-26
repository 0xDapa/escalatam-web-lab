# Librerías de animación y webs de referencia (investigación nov 2026)

Qué usan de verdad las webs premiadas que son **fluidas y rápidas**, cuánto pesa cada librería y cuándo usarla en una demo de
Escalatam. Complementa [`REFERENCIAS.md`](REFERENCIAS.md) (diseño de las tandas 3–4) y [`VALOR-DE-VENTA.md`](VALOR-DE-VENTA.md).

**Cómo se midió**
- **Webs:** 46 URLs abiertas (40 cargaron bien; 5 eran fichas de Awwwards para sacar la URL real) en Chromium headless (1440×900, scroll de 1.500 px y 5 s de espera) desde el servidor del lab.
  Se capturaron todas las respuestas y se buscaron firmas de librería en el JS/HTML (`ScrollTrigger`, `Lenis`, `WebGLRenderer`,
  `@rive-app`, `/_next/`…). **Los pesos son bytes descomprimidos** (no transferidos) y el LCP es de laboratorio en escritorio:
  sirven para comparar entre sí, no son Core Web Vitals reales. Las firmas son heurísticas (p. ej. “motion” o “webflow” pueden
  dar falsos positivos); en la tabla solo se dejan las confirmadas por varias firmas o por fuente pública.
- **Librerías:** instaladas desde npm y empaquetadas con esbuild (`--minify`, ESM, producción) con un import típico; gzip -9 y brotli.
- Datos crudos en `research-refs/t5/` (**ignorado por git; nunca se publica código ni capturas de terceros**).

---

## 1. Las 15 webs de referencia (para enseñar y para inspirarse)

| # | Web | Nicho | Librerías (detectadas / publicadas) | Peso y velocidad (lab) | Qué la hace increíble | Úsala para |
|---|---|---|---|---|---|---|
| 1 | [cravburgers.shop](https://cravburgers.shop/) | Hamburguesería | Next.js 16 + **GSAP 3.15** (ScrollTrigger, SplitText, MorphSVG, MotionPath, Inertia) + **Lenis** en el ticker de GSAP | 63 req · 6,9 MB · JS 1,1 MB · LCP 0,85 s | Loader en el que la hamburguesa se apila sola, cursor de ingredientes con física de cuerda, tipografía gigante. Awwwards SOTD 13‑jun‑2026 | Restaurantes de comida rápida → nuestra 18 / 22 |
| 2 | [odysseeclinic.com.au](https://odysseeclinic.com.au/) | Clínica estética (Sídney) | Next 16 + Sanity + **GSAP 3.14** (ScrollTrigger, `SplitText.create`) + **Lenis 1.3** (0,6 s) + vídeo Mux HLS, **sin canvas** | 91 req · 34 MB (vídeo) · LCP 0,56 s | Lujo sin WebGL: mosaicos duotono en CSS, carrusel de una sola barra temporizada, `expo.out (.16,1,.3,1)`. SOTD 8‑oct‑2026 (7,38) | Clínicas → 38 / 24 / 15 |
| 3 | [era-residence.com](https://www.era-residence.com/) | Promoción residencial (Estepona) | Webflow + GSAP (ScrollTrigger, SplitText) + Lenis + Swiper | 68 req · 23 MB · LCP 0,83 s | Toggle día/noche, plano como hero, filtro de 25 unidades. SOTD (7,61) | Inmobiliaria → 26 |
| 4 | [oharchitecture.com.au](https://www.oharchitecture.com.au/) | Arquitectura | Webflow + **GSAP 3.12** (ScrollTrigger, SplitText) + Lenis + Barba | **23 req · 2,1 MB · JS 1 MB · LCP 0,54 s** | La más ligera de las premiadas: fotografía grande, transiciones de página Barba y texto partido. SOTD | Arquitectura / interiorismo “rápido” → 32 / 37 |
| 5 | [mersi-architecture.com](https://www.mersi-architecture.com/) | Interiorismo (París) | Webflow CMS + capa JS propia con Vite + GSAP (ScrollTrigger, SplitText, Flip) + Lenis + **Taxi.js** + Splide | 42 req · 5,2 MB · LCP 2,1 s | Scroll horizontal fijado, transiciones de página con Taxi, CMS que edita el cliente. SOTD (7,52), artículo en Codrops (27‑jul‑2026) | Estudios que quieren editar sus proyectos → 32 + Decap |
| 6 | [sondaven.com](https://sondaven.com/en) | Hotel‑resort de diseño | Webflow + **GSAP 3.13** (ScrollTrigger, SplitText, **Flip**) + Lenis + Barba + Swiper + WebGL | 271 req · 44 MB · LCP 0,73 s | Efecto dither/glitch en WebGL sobre la foto, transiciones Flip entre habitaciones. SOTD (7,62) | Hoteles → 27 / 17 |
| 7 | [gucciosteria.com](https://www.gucciosteria.com/) | Alta cocina | Nuxt + GSAP (ScrollTrigger, MorphSVG) + Swiper | 70 req · 15 MB · **JS 8 MB · LCP 3,3 s** | Dirección de arte de lujo y morph de SVG… pero es el **contraejemplo**: 8 MB de JS. SOTD (7,68) | Mostrar que el lujo no exige peso → 28 / 01 |
| 8 | [sobha-privy-collection.com](https://sobha-privy-collection.com/) | Inmobiliaria de lujo (Dubái) | Three.js + ScrollTrigger + Barba | 74 req · 20 MB (fotos) · **JS 0,57 MB** · LCP 0,88 s | Zoom‑on‑scroll en WebGL sobre las villas; mucho efecto con poco JS. SOTD sept‑2026 | Lujo inmobiliario → 26 / 37 |
| 9 | [landonorris.com](https://landonorris.com/) | Marca personal / deportista | Webflow + **Three.js** + GSAP (ScrollTrigger, SplitText) + Lenis + Taxi + **Rive** | 67 req · 8 MB · LCP 0,2 s | **Awwwards Site of the Year 2025** (OFF+BRAND). Casco 3D, firma en Rive, transiciones de página | Marca personal premium → 23 / 42 |
| 10 | [manayerbamate.com](https://manayerbamate.com/) | Bebida DTC | Shopify + Three.js r141 + GSAP 3.10 (MorphSVG) + Lenis + Lottie | 165 req · 14 MB · JS 9,2 MB · LCP 0,5 s | Lata 3D que gira con el scroll dentro de una tienda real | Lanzamiento de producto → 43 |
| 11 | [scoutmotors.com](https://www.scoutmotors.com/) | Automoción / e‑commerce | GSAP (ScrollTrigger) + Lenis + Swiper + View Transitions | 532 req · 37 MB · LCP 0,88 s | **E‑commerce of the Year 2025 (Awwwards)**: configurador y vídeo editorial | Configuradores, detailing → 39 / 43 |
| 12 | [shift.vml.dev](https://shift.vml.dev/) | Agencia (VML) | **Astro** + GSAP (ScrollTrigger, SplitText) + Lenis + WebGL | 71 req · 8,8 MB · **JS 0,45 MB · LCP 0,35 s** | Prueba de que Astro + GSAP da efectos de premio con muy poco JS. SOTD GSAP oct‑2026 | Patrón técnico para webs rápidas |
| 13 | [hear.ai](https://www.hear.ai/) | SaaS (centro de contacto IA) | Next + GSAP ScrollTrigger **sobre DOM real** + Lenis | 113 req · 7,9 MB | “Sin vídeo ni Lottie”: todo es DOM animado con ScrollTrigger. Awwwards HM + CSSDA SOTD | Explicar servicios paso a paso (abogados, clínicas) |
| 14 | [apple.com/airpods-pro](https://www.apple.com/airpods-pro/) | Producto | Código propio: vídeo/imagen ligados al scroll, sticky, WebGL puntual | 67 req · 7,4 MB · LCP 2,0 s | El canon del scroll‑scrub y del texto que se ilumina por palabra | 37, 39, 43, 44 |
| 15 | [igloo.inc](https://www.igloo.inc/) | Marca 3D | Three.js + GSAP ScrollTrigger | 102 req · 17 MB · LCP 0,22 s | Awwwards SOTY 2024; objeto 3D protagonista con materiales físicos y narrativa | 35 / 42 |

**También vale la pena abrir:** [messenger.abeto.co](https://messenger.abeto.co/) (Developer SOTY 2025, Three.js r180 puro),
[chasing-the-moment.byholm.co](https://chasing-the-moment.byholm.co/) (webfilm Three.js + GSAP + Lenis en 3,5 MB),
[dontboardme.com](https://www.dontboardme.com/) (servicio de mascotas, Nuxt + GSAP + Lenis + Lottie, 5,7 MB, LCP 0,69 s),
[terminal-industries.com](https://terminal-industries.com/) (B2B, GSAP con SplitText/MorphSVG; 967 peticiones: lo que no hay que hacer),
[showcase.noomoagency.com](https://showcase.noomoagency.com/) (Three.js en dos colores, SOTD ago‑2026),
[linear.app](https://linear.app/), [vercel.com](https://vercel.com/), [raycast.com](https://www.raycast.com/) y
[stripe.com](https://stripe.com/) (Motion/React + View Transitions: precisión de producto),
[lusion.co](https://lusion.co/), [activetheory.net](https://activetheory.net/), [bruno-simon.com](https://bruno-simon.com/)
(agencias/portfolios WebGL), [emcell.com](https://emcell.com/) (clínica de células madre con Three.js, 28 MB) y
[realevate.agency](https://realevate.agency/) (inversión inmobiliaria, GSAP + SplitText).

Pendiente de URL directa (visto en X, SOTD nov‑2026): **Kencho Group**, configurador de cocinas 3D guiado por voz,
referencia perfecta para el upsell “configurador + agente de voz”.

### Lo que enseñan las 40 webs medidas
1. **GSAP + ScrollTrigger es el estándar de los premios**: 25 de 40 webs medidas (63 %); 17 lo combinan con **Lenis** y 13 con **SplitText**. Lenis aparece en 19 de 40.
2. **Three.js aparece en ~la mitad (21 de 40, firma heurística) y sobre todo en las de “premio grande”** (SOTY 2024–2025, 25 de 31 SOTY históricos son 3D/WebGL según exhibita.design),
   pero en negocios locales premiados (clínica, arquitectura, inmobiliaria) domina **GSAP sin WebGL**.
3. **El LCP rápido no depende del peso total**: Odyssée pesa 34 MB y pinta en 0,56 s porque el vídeo llega después. La regla es
   la nuestra: **póster/imagen como LCP y lo pesado por intención**.
4. Las más ligeras (OH Architecture 2,1 MB, Shift 0,45 MB de JS, Sobha 0,57 MB de JS) prueban que se puede ganar SOTD sin
   8 MB de JS como Gucci Osteria. **Nuestras demos (0–150 KB gz de JS) están un orden de magnitud por debajo.**
5. Webflow/Next/Nuxt/Astro dan igual: el efecto lo dan **tipografía grande + SplitText + scroll suave + una interacción
   ligada al negocio** (día/noche, configurador, antes/después).

---

## 2. Comparativa de librerías (medido 26‑nov‑2026)

| Librería | Versión | Import típico | min | **gzip** | brotli | Licencia | Rendimiento | Cuándo usarla en Escalatam |
|---|---|---|---|---|---|---|---|---|
| **Three.js** | 0.187 | `import * as THREE` | 732 KB | **187 KB** | 152 KB | MIT | GPU; el coste es el JS y los shaders | Objeto 3D protagonista (35–43). **Siempre por intención + póster** |
| Three.js (escena típica: renderer + mesh + material físico + PMREM) | 0.187 | imports con nombre | 527 KB | **131 KB** | 108 KB | MIT | — | Lo que realmente pesa una escena de la tanda 4 |
| **OGL** | 1.0.11 | Renderer, Program, Mesh, Geometry… | 51 KB | **14 KB** | 12 KB | Unlicense | Muy rápido, sin extras | Shader/partículas con 1/10 del peso de Three (02) |
| **GSAP core** | 3.15.1 | `gsap` | 70 KB | **27 KB** | 25 KB | Estándar “no charge” de GSAP (Webflow), **no MIT** | Excelente, ticker propio | Timelines complejas, SVG, secuencias |
| GSAP + **ScrollTrigger** | 3.15.1 | + `gsap/ScrollTrigger` | 113 KB | **44 KB** | 40 KB | ídem | Pin/scrub muy robusto | Scroll‑scrub y pin cuando el CSS no basta |
| GSAP + ScrollTrigger + **SplitText** | 3.15.1 | + `gsap/SplitText` | 121 KB | **47 KB** | 43 KB | ídem | SplitText v3.13 reescrito (≈50 % más pequeño), accesible | Titulares por línea/palabra/letra |
| GSAP + **Flip** | 3.15.1 | + `gsap/Flip` | 94 KB | **36 KB** | 32 KB | ídem | FLIP entre layouts | Filtros de catálogo, galerías |
| GSAP **MorphSVG** (solo plugin) | 3.15.1 | `gsap/MorphSVGPlugin` | 20 KB | **9 KB** | 8 KB | ídem (antes de pago, ahora gratis) | — | Logos y formas que se transforman |
| **Lenis** | 1.3.28 | `lenis` | 18 KB | **5,3 KB** | 4,8 KB | MIT | Scroll suave nativo (no secuestra) | Casi todas las premiadas; con `autoRaf` o en el ticker de GSAP |
| Locomotive Scroll v5 | 5.1.1 | `locomotive-scroll` | 37 KB | 9,6 KB | 8,7 KB | MIT | v5 = Lenis + parallax por atributos | Si se quiere `data-scroll-speed` sin código |
| **Motion** (vanilla) | 14.14 | `animate` | 71 KB | **26 KB** | 24 KB | MIT | Híbrido WAAPI + JS, muelles | Micro‑interacciones Emil (38, 40, 44) |
| Motion animate + scroll + inView + stagger | 14.14 | 4 funciones | 78 KB | **29 KB** | 27 KB | MIT | — | Paquete completo de la tanda 4 |
| **Motion mini** | 14.14 | `motion/mini` | 8 KB | **3,2 KB** | 2,9 KB | MIT | Solo WAAPI (hilo del compositor) | Fundidos y transforms sin muelles (12) |
| anime.js v4 | 4.5.0 | `animate` | 32 KB | **12,5 KB** | 11 KB | MIT | Bueno, API moderna | Alternativa ligera a GSAP (11) |
| @barba/core | 2.10.3 | `barba` | 32 KB | 10 KB | 9 KB | MIT | — | Transiciones entre páginas (multi‑página) |
| Swup | 4.10 | `Swup` | 21 KB | 7,3 KB | 6,6 KB | MIT | — | Ídem, más simple, con plugins |
| Taxi.js | 2.0 | `Core` | 17 KB | 5,9 KB | 5,2 KB | BSD‑3 | — | Ídem (usado por MERSI y Lando Norris) |
| **View Transitions API** | nativa | `document.startViewTransition` / `@view-transition` | 0 | **0 KB** | 0 | — | Nativa (Chromium, Safari 18+) | **Primera opción** para cambios de estado y páginas (13, 23, 26) |
| SplitType | 0.3.4 | `SplitType` | 11 KB | 4,4 KB | 3,9 KB | ISC | — | Partir texto sin GSAP |
| Splitting | 1.1.0 | `Splitting` | 4,5 KB | 2,1 KB | 1,9 KB | MIT | Usa variables CSS | Partir texto y animar solo con CSS |
| Swiper (core) | 14.4 | `Swiper` | 66 KB | 20,5 KB | 18 KB | MIT | Táctil maduro | Carruseles de tienda; para 1 carrusel, mejor scroll‑snap CSS |
| lottie‑web (completo) | 5.13 | `lottie` | 302 KB | **77 KB** | 64 KB | MIT | CPU (SVG) | Evitar; si hay que usar Lottie, dotLottie |
| lottie‑web light | 5.13 | `lottie_light` | 168 KB | 48 KB | 42 KB | MIT | — | Solo si la animación no usa expresiones |
| dotLottie web | 0.83 | `DotLottie` | 58 KB | 12,7 KB **+ WASM 483 KB gz** | — | MIT | Render en WASM/canvas | Iconos animados de diseñador; cargar por intención |
| Rive (canvas) | 2.55 | `Rive` | 371 KB | 95 KB **+ WASM 969 KB gz** | — | MIT (runtime) | Muy fluido, máquinas de estado | Mascotas/iconos interactivos (Lando Norris). Existe `@rive-app/canvas-lite` más pequeño |
| Spline runtime | 2.0 | `Application` | 3,99 MB | **1.078 KB** | 847 KB | sin licencia declarada en npm (términos de Spline) | Pesado | Solo prototipos o con cliente que lo pida; nunca en el LCP |
| Theatre.js core | 0.7.2 | `getProject` | 105 KB | 34,5 KB | 30 KB | Apache‑2.0 (el editor `@theatre/studio` es AGPL) | — | Coreografías 3D editadas con timeline (Active Theory, Daoism) |
| PixiJS v8 | 8.23 | Application + Sprite | 532 KB | 154 KB | 127 KB | MIT | 2D GPU muy rápido | Juegos/efectos 2D masivos; casi nunca en una landing |

**GSAP es gratis desde el 30‑abr‑2025 (v3.13)**, incluidos **todos** los plugins antes “Club” (SplitText, MorphSVG, ScrollSmoother,
DrawSVG, Inertia, MotionPath…), desde el paquete público de npm. **No es MIT**: es la licencia estándar “no charge” de GSAP
(propiedad de Webflow), que permite uso comercial en webs de clientes pero **prohíbe usarlo en herramientas que compitan con
Webflow** (constructores visuales de animación/webs). Para demos y webs de clientes, sin problema.
Fuentes: [gsap.com/blog/3-13](https://gsap.com/blog/3-13/) · [webflow.com/updates/gsap-becomes-free](https://webflow.com/updates/gsap-becomes-free) · [gsap.com/community/standard-license](https://gsap.com/community/standard-license/).

### Árbol de decisión (de más ligero a más pesado)
1. **¿Se puede con CSS?** (scroll‑driven animations, `@view-transition`, `position: sticky`, `clip-path`, transiciones) → 0 KB. (13, 17, 25)
2. **Micro‑interacciones y muelles** → Motion (26 KB) o Motion mini (3 KB). (38, 40, 44)
3. **Scroll suave** → Lenis (5 KB). Con GSAP: `gsap.ticker.add(t => lenis.raf(t * 1000))` y `lagSmoothing(0)`.
4. **Timelines, pin y texto partido de premio** → GSAP + ScrollTrigger + SplitText (47 KB). El combo de Crav, Odyssée, ERA, OH.
5. **Shader o partículas** → WebGL puro (2–3 KB, 01/06/19) u OGL (14 KB).
6. **Objeto 3D con materiales físicos** → Three.js (131–187 KB) **solo por intención + póster LCP** (35–43).
7. **Animación de diseñador (After Effects / Rive)** → dotLottie o Rive, por intención; nunca lottie‑web completo.
8. **Spline / PixiJS** → solo si el cliente lo pide expresamente.

### Presupuesto recomendado por paquete
| Paquete (ver VALOR-DE-VENTA §3) | JS inicial gz | JS diferido gz | Librerías típicas |
|---|---|---|---|
| Esencial | ≤ 15 KB | — | CSS + vanilla, o Motion mini / Lenis |
| Negocio | ≤ 35 KB | ≤ 60 KB | Lenis + Motion, o GSAP core + ScrollTrigger diferido |
| Signature | ≤ 35 KB | ≤ 200 KB | + Three.js por intención, o GSAP completo + SplitText |
