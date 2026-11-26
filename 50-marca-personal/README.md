# 50 · Martina Vega — Marca personal · entrenadora de tenis (Barcelona)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/50-marca-personal/ · versión en inglés: https://0xdapa.github.io/escalatam-web-lab/50-marca-personal/?lang=en

**Ideal para:** entrenadores, coaches, deportistas, profesores particulares, consultores.

- **Referencia replicada:** [Lando Norris](https://landonorris.com/). Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** El nombre gigante “respira” animando el eje de ancho de la fuente (50 → 150 %) y una firma SVG se escribe encima; con el scroll “Martina” se comprime y “Vega” se desplaza.
- **Librerías (empaquetadas con esbuild, sin CDN):** GSAP 3.15 (ScrollTrigger, SplitText) + Lenis
- **Tipografías:** Anybody (una sola familia variable, ancho 50–150 %) (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

- Reserva de clase: tipo (privada, semiprivada, clínica, bono), día, hora libre → WhatsApp con nivel
- Precios en EUR con tabular-nums
- Reseñas deslizables (arrastre con ratón, snap en táctil) marcadas de ejemplo
- Trayectoria con cifras marcadas de ejemplo (sin contadores animados)
- Schema.org `ProfessionalService` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 55.2 KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | 55.2 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 94 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.7 s / 2.9 s / 20 ms / 0.004 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/50-marca-personal/`](../src/t5/50-marca-personal/) (`node tools/build5.mjs 50-marca-personal`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

- `img/raquetas-*.webp` — “A close-up of several tennis rackets stacked on a textured surface, showing colors like orange, red, green, and black.”, Rashed Hossain · [WordPress Photo Directory](https://wordpress.org/photos/photo/59469807b8/) · CC0
- `img/bola-*.webp` — “Tenis Balls at the court.”, Heru Irawan · [WordPress Photo Directory](https://wordpress.org/photos/photo/494657ee66/) · CC0
- `img/pista-*.webp` — “The image shows a tennis court with a red playing surface, outlined by white lines that define the court’s boundaries. There is a black net in the center, stretching across the court. On one side, the surface transitions to a green area.”, Nilo Velez · [WordPress Photo Directory](https://wordpress.org/photos/photo/8786ad4a72/) · CC0

## Archivos

- `DESIGN.md`
- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
