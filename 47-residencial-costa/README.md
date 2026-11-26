# 47 · Mirador del Faro — Promoción inmobiliaria (Jávea)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/47-residencial-costa/ · versión en inglés: https://0xdapa.github.io/escalatam-web-lab/47-residencial-costa/?lang=en

**Ideal para:** promotoras, inmobiliarias de obra nueva, comercializadoras de lotes.

- **Referencia replicada:** [ERA Residence](https://www.era-residence.com/). Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** El plano de la vivienda se dibuja como hero (muros → puertas → rótulos con stroke-dashoffset); botón día/noche que cambia paleta y foto; filtro de 12 viviendas animado con GSAP Flip.
- **Librerías (empaquetadas con esbuild, sin CDN):** GSAP 3.15 (ScrollTrigger, SplitText, Flip) + Lenis
- **Tipografías:** Bodoni Moda + Archivo (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

- Filtro de viviendas por dormitorios/ático/disponibles con “Pedir plano” por WhatsApp
- Calculadora de hipoteca (sistema francés) → “Pedir mi estudio real”
- Visita al piso piloto por WhatsApp + cómo llegar
- Distancias y reseña marcadas de ejemplo
- Schema.org `RealEstateAgent` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 63.9 KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | 63.9 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 94 / 97 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.9 s / 2.9 s / 30 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/47-residencial-costa/`](../src/t5/47-residencial-costa/) (`node tools/build5.mjs 47-residencial-costa`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

- `img/piscina-*.webp` — “A curved turquoise swimming pool surrounded by tropical greenery, with a two-story villa in the background and tree branches overhead.”, Kamran Abdul Aziz · [WordPress Photo Directory](https://wordpress.org/photos/photo/8066adc5e4/) · CC0
- `img/blanca-*.webp` — “A modern, minimalist white house with rectangular windows and a chimney against a clear blue sky.”, Nilo Velez · [WordPress Photo Directory](https://wordpress.org/photos/photo/1967a9df80/) · CC0
- `img/puerta-*.webp` — “Very white house with a very blue door”, Nilo Velez · [WordPress Photo Directory](https://wordpress.org/photos/photo/48965c2634/) · CC0
- `img/atardecer-*.webp` — “Alfama neighborhood seen from above, with white houses and terracotta roofs, next to the ocean and the sunset. Lisbon, Portugal.”, Isabel Gutierrez · [WordPress Photo Directory](https://wordpress.org/photos/photo/35669e1d6f/) · CC0

## Archivos

- `DESIGN.md`
- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
