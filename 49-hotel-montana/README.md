# 49 · Bruma Lodge — Lodge / hotel boutique (Minca, Colombia)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/49-hotel-montana/ · versión en inglés: https://0xdapa.github.io/escalatam-web-lab/49-hotel-montana/?lang=en

**Ideal para:** hoteles boutique, glampings, cabañas, eco-lodges.

- **Referencia replicada:** [Son Daven](https://sondaven.com/en). Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** Shader OGL de dither ordenado (Bayer 4×4) sobre la foto del hero: la imagen se revela desde puntos y el cursor abre un claro nítido; se carga por intención. Cabañas que se expanden con GSAP Flip.
- **Librerías (empaquetadas con esbuild, sin CDN):** GSAP 3.15 (ScrollTrigger, SplitText, Flip) + Lenis + OGL
- **Tipografías:** Gloock + Albert Sans (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

- Barra de reserva: llegada, salida, huéspedes, cabaña → total con noches y huésped extra → WhatsApp
- Tres cabañas con precio/noche, capacidad y “Elegir fechas”
- Un día en el lodge por horas (programa real del servicio)
- Cómo llegar + traslado 4x4 con precio
- Schema.org `Hotel` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 64.4 KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | 79.1 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 0.8 s / 0.8 s / 40 ms / 0.049 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/49-hotel-montana/`](../src/t5/49-hotel-montana/) (`node tools/build5.mjs 49-hotel-montana`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

- `img/montana-*.webp` — “Resort, Mountains, Lawns”, Ravi Gadhiya · [WordPress Photo Directory](https://wordpress.org/photos/photo/496636e79e/) · CC0
- `img/cabana-*.webp` — “Lesní zátiší Forest still life”, jirkavo · [WordPress Photo Directory](https://wordpress.org/photos/photo/3296491bb3/) · CC0
- `img/habitacion-*.webp` — “Hotel Room”, Umesh Gupta · [WordPress Photo Directory](https://wordpress.org/photos/photo/603624d41c/) · CC0
- `img/acogedora-*.webp` — “A cozy and inviting hotel room featuring two beds”, shirishpoudel07 · [WordPress Photo Directory](https://wordpress.org/photos/photo/83468c16af/) · CC0
- `img/valle-*.webp` — “View from kadkani resort pool area”, mujuonly · [WordPress Photo Directory](https://wordpress.org/photos/photo/90262b2c4a/) · CC0

## Archivos

- `DESIGN.md`
- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
