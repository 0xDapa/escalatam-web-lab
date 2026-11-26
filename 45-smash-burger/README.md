# 45 · Brava Smash Club — Hamburguesería smash (Guadalajara)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/45-smash-burger/ · versión en inglés: https://0xdapa.github.io/escalatam-web-lab/45-smash-burger/?lang=en

**Ideal para:** hamburgueserías, food trucks, dark kitchens, taquerías con pedido para recoger.

- **Referencia replicada:** [Crav Burgers](https://cravburgers.shop/). Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** Hamburguesa SVG que se apila con rebote; sección del método fijada con espátula, queso y vapor ligados al scroll (0→230 °C); cuerda de ingredientes con física Verlet que sigue al cursor.
- **Librerías (empaquetadas con esbuild, sin CDN):** GSAP 3.15 (ScrollTrigger, SplitText) + Lenis
- **Tipografías:** Bowlby One + Familjen Grotesk (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

- Carrito → pedido por WhatsApp (recoger o domicilio +$45, cantidades, guardado en localStorage)
- Menú con precios en MXN y botón añadir
- Reseñas marcadas de ejemplo + enlace para escribir reseña en Google
- Cómo llegar (Maps)
- Schema.org `Restaurant` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 56.6 KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | 56.6 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 92 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.9 s / 3.1 s / 90 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/45-smash-burger/`](../src/t5/45-smash-burger/) (`node tools/build5.mjs 45-smash-burger`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

- `img/smash-*.webp` — “A close-up image of a hamburger featuring a sesame seed bun.”, Ilkay Beydah Saglam · [WordPress Photo Directory](https://wordpress.org/photos/photo/8016804a92/) · CC0
- `img/clasica-*.webp` — “A tasty burger on a white plate, filled with melted cheese, vegetables, chicken, and a soft bun. The cheese is spilling out, making it look delicious and warm. Captured from a coffee stored in Kozhikode, Kerala.”, Bigul Malayi · [WordPress Photo Directory](https://wordpress.org/photos/photo/4516920ae1/) · CC0
- `img/doble-*.webp` — “Closeup shot of chicken burger and chips with red sauce.”, Ajith R N · [WordPress Photo Directory](https://wordpress.org/photos/photo/46164fa5c5/) · CC0
- `img/papas-*.webp` — “A burger with a wooden-handled knife holding it in place, served on a white plate beside a bowl of French fries and a side of coleslaw.”, Moses Cursor Ssebunya · [WordPress Photo Directory](https://wordpress.org/photos/photo/4776a0753a/) · CC0
- `img/mesa-*.webp` — “A hamburger with fries and dipping sauce on a blue plate, served on a wooden table with a glass of water in the background.”, Manjil Aryal · [WordPress Photo Directory](https://wordpress.org/photos/photo/858699139d/) · CC0
- `img/salsas-*.webp` — “A close-up of various sauces in squeeze bottles and an open container of mustard in front of a stack of hamburger buns.”, Moin Uddin Ahmed · [WordPress Photo Directory](https://wordpress.org/photos/photo/28267a22e0/) · CC0
- `img/neon-*.webp` — “Neon sign of a hamburger”, Nilo Velez · [WordPress Photo Directory](https://wordpress.org/photos/photo/12265a9562/) · CC0
- `img/plancha-*.webp` — “Multiple hamburgers on a grill”, mdburnette · [WordPress Photo Directory](https://wordpress.org/photos/photo/82862019dc/) · CC0

## Archivos

- `DESIGN.md`
- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
