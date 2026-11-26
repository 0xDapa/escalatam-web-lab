# 52 · Andes 4x4 — Concesionario / preparador 4x4 (Santiago de Chile)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/52-autos-configurador/ · versión en inglés: https://0xdapa.github.io/escalatam-web-lab/52-autos-configurador/?lang=en

**Ideal para:** concesionarios, preparadores 4x4, talleres, venta de motos, náutica.

- **Referencia replicada:** [Scout Motors](https://www.scoutmotors.com/). Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** Configurador SVG propio: color, neumáticos (la rueda crece y sigue apoyada en el suelo), suspensión +2", carpa de techo, snorkel y winche cambian la silueta; el 4x4 entra rodando y la suspensión rebota al frenar.
- **Librerías (empaquetadas con esbuild, sin CDN):** GSAP 3.15 (ScrollTrigger, SplitText) + Lenis
- **Tipografías:** Saira Stencil One + Saira (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

- Configurador con precio al instante en CLP
- Simulador de crédito (pie, 24/36/48 cuotas, tasa de ejemplo) → “Pedir esta cotización” por WhatsApp con la configuración
- Prueba de manejo con fecha y ruta (ciudad o Farellones) → WhatsApp
- Galería de terreno real
- Schema.org `AutoDealer` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 55.3 KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | 55.3 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 98 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.9 s / 1.9 s / 80 ms / 0.001 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/52-autos-configurador/`](../src/t5/52-autos-configurador/) (`node tools/build5.mjs 52-autos-configurador`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

- `img/nieve-*.webp` — “A white SUV is parked on a dirt road with majestic, snow-capped mountains in the background under a clear blue sky, conveying adventure and serenity.”, Bijay Karki · [WordPress Photo Directory](https://wordpress.org/photos/photo/3616a11544/) · CC0
- `img/ruta-*.webp` — “Scenic mountain road with a jeep driving towards the ocean, capturing the essence of Vagamon’s adventurous trekking trails and off-road vehicle tourism, in Kerala, India”, Aravind Ajith · [WordPress Photo Directory](https://wordpress.org/photos/photo/5206533c86/) · CC0
- `img/overland-*.webp` — “Overlanding through the breathtaking Annapurna region of Nepal Dropping the white SUV right by the partially frozen waters of Gangapurna Lake, with the massive Gangapurna glacier looming tall in the background. Nothing beats the cold, crisp air of the Himalayas.”, Sakin Shrestha · [WordPress Photo Directory](https://wordpress.org/photos/photo/6236a10172/) · CC0
- `img/rueda-*.webp` — “Frozen spiderweb next to a very large truck tire on a lime green pickup truck”, developerjustin · [WordPress Photo Directory](https://wordpress.org/photos/photo/3406372462/) · CC0
- `img/lago-*.webp` — “A white SUV is parked on rocky ground beside a blue lake in Manang, Nepal. Tall mountains rise in the background, some topped with snow, contrasting with the deep blue sky.”, Sakin Shrestha · [WordPress Photo Directory](https://wordpress.org/photos/photo/524697112e/) · CC0

## Archivos

- `DESIGN.md`
- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
