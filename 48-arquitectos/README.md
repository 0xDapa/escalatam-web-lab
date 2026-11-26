# 48 · Pliegue Arquitectos — Estudio de arquitectura (Bogotá)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/48-arquitectos/ · versión en inglés: https://0xdapa.github.io/escalatam-web-lab/48-arquitectos/?lang=en

**Ideal para:** estudios de arquitectura, interioristas, constructoras boutique.

- **Referencia replicada:** [OH Architecture + MERSI](https://www.oharchitecture.com.au/) · [www.mersi-architecture.com](https://www.mersi-architecture.com/). Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** Tira de proyectos horizontal fijada al scroll (MERSI); al abrir un proyecto la foto “vuela” a pantalla completa con la View Transitions API nativa; foto del hero que se abre desde una franja (OH).
- **Librerías (empaquetadas con esbuild, sin CDN):** GSAP 3.15 (ScrollTrigger, SplitText) + Lenis + View Transitions API
- **Tipografías:** Schibsted Grotesk (una sola familia) (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

- Calculadora de honorarios (tipo, m², alcance) con rango en COP y plazo → WhatsApp
- Ficha de proyecto con “Quiero algo así” por WhatsApp
- Proceso en 4 fases con plazos y % de honorarios
- Contacto directo por WhatsApp
- Schema.org `ProfessionalService` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 55.4 KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | 55.4 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 92 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.7 s / 3.3 s / 0 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/48-arquitectos/`](../src/t5/48-arquitectos/) (`node tools/build5.mjs 48-arquitectos`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

- `img/fachada-*.webp` — “Modern house in the city iloilo Philippines”, Alpha Jun Ibieza · [WordPress Photo Directory](https://wordpress.org/photos/photo/3746561c63/) · CC0
- `img/casa-madera-*.webp` — “Modern two-story dark gray house with large windows, surrounded by a green lawn and trees under a clear blue sky.”, Outsource Image · [WordPress Photo Directory](https://wordpress.org/photos/photo/6366ab10fd/) · CC0
- `img/escalera-*.webp` — “High-angle view looking down a modern, minimalist spiral staircase. Features smooth white concrete walls, white steps, and a continuous stainless steel handrail creating intricate geometric layers.”, Elena Zheng · [WordPress Photo Directory](https://wordpress.org/photos/photo/69469d277e/) · CC0
- `img/caracol-*.webp` — “A spiraling staircase viewed from above, showcasing ornate metal railings and descending steps that form a geometric pattern.”, Estelle Henrion · [WordPress Photo Directory](https://wordpress.org/photos/photo/5866733762/) · CC0
- `img/interior-*.webp` — “An interior wall on the right covered in greenery. In front of the wall are two couches. Facing the couches are four chairs that look like scoops. A curving staircase is above, and a glass wall on the far end of the room.”, Rashed Hossain · [WordPress Photo Directory](https://wordpress.org/photos/photo/67569a12ba/) · CC0
- `img/unifamiliar-*.webp` — “A modern single-story house with a red roof and brick exterior is shown amidst a well-maintained garden.”, shirishpoudel07 · [WordPress Photo Directory](https://wordpress.org/photos/photo/8916973003/) · CC0

## Archivos

- `DESIGN.md`
- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
