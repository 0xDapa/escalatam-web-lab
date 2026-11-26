# 51 · Selva Mate — Marca de bebida / e-commerce (CDMX)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/51-mate-bebida/ · versión en inglés: https://0xdapa.github.io/escalatam-web-lab/51-mate-bebida/?lang=en

**Ideal para:** marcas de bebidas, cafés de especialidad, cerveza artesanal, snacks, D2C.

- **Referencia replicada:** [Mana Yerba Mate](https://manayerbamate.com/). Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** Lata 3D en Three.js con etiqueta pintada en un canvas (sin modelos descargados) que sustituye a un póster SVG al primer gesto; el sabor cambia la lata, la etiqueta y el color de toda la página.
- **Librerías (empaquetadas con esbuild, sin CDN):** GSAP 3.15 (ScrollTrigger) + Lenis + Three.js 0.187
- **Tipografías:** Shrikhand + Rethink Sans (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

- Configurador de caja 6/12/24 mezclando sabores (deben sumar el tamaño) con precio por lata
- Pedido con varias cajas → WhatsApp con colonia; envío gratis desde 2 cajas
- Etiqueta nutrimental real como elemento de diseño (valores de ejemplo avisados)
- Selector de sabor que re-tematiza la página
- Schema.org `Store` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 55.6 KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | 187.2 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 98 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.8 s / 1.8 s / 110 ms / 0.003 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/51-mate-bebida/`](../src/t5/51-mate-bebida/) (`node tools/build5.mjs 51-mate-bebida`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

- Sin fotos: la lata es un render Three.js en el navegador y el póster es SVG.

## Archivos

- `DESIGN.md`
- `fonts`
- `index.html`
- `js`
- `style.css`
