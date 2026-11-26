# 46 · Lúa Clínica — Clínica de medicina estética (Madrid)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/46-clinica-botanica/ · versión en inglés: https://0xdapa.github.io/escalatam-web-lab/46-clinica-botanica/?lang=en

**Ideal para:** clínicas estéticas, dermatología, med spas, fisioterapia premium.

- **Referencia replicada:** [Odyssée Clinic](https://odysseeclinic.com.au/). Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** Fotos en duotono CSS (salvia + vino) con carrusel de barra única y revelado por clip-path; manifiesto cuyas palabras pasan de tenue a tinta con el scroll; vista previa que sigue al tratamiento bajo el cursor.
- **Librerías (empaquetadas con esbuild, sin CDN):** GSAP 3.15 (ScrollTrigger, SplitText) + Lenis
- **Tipografías:** Newsreader + Hanken Grotesk (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

- Reserva: tratamiento, 14 días (domingo cerrado), horas libres y confirmación por WhatsApp
- Lista de tratamientos con precio “desde” y WhatsApp por tratamiento
- Antes/después con deslizador (imagen de demostración avisada)
- Equipo médico con nº de colegiado de ejemplo
- Schema.org `MedicalClinic` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 55.4 KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | 55.4 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 91 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.9 s / 3.3 s / 80 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/46-clinica-botanica/`](../src/t5/46-clinica-botanica/) (`node tools/build5.mjs 46-clinica-botanica`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

- `img/sabila-*.webp` — “Top view of an aloe vera plant with thick, pointed green leaves arranged in a rosette pattern”, Jhilian Rosario Sejas Cavero · [WordPress Photo Directory](https://wordpress.org/photos/photo/9406a1d8e6/) · CC0
- `img/hoja-*.webp` — “A hand holding a green leafy stem against a clear blue sky background.”, Sharafat Siam · [WordPress Photo Directory](https://wordpress.org/photos/photo/769688b1ee/) · CC0
- `img/detalle-*.webp` — “Detail of an aloe vera flower against white background”, AlfieGrand · [WordPress Photo Directory](https://wordpress.org/photos/photo/26761fc2ea/) · CC0
- `img/mano-*.webp` — “Hand holding a small green leaf sprig in sunlight.”, appealdahal · [WordPress Photo Directory](https://wordpress.org/photos/photo/2886a23976/) · CC0
- `img/luz-*.webp` — “A woman with light, tousled hair is seated on a moving walkway, facing away from the camera. She wears a casual orange top and has a light-colored bag beside her.”, Nilo Velez · [WordPress Photo Directory](https://wordpress.org/photos/photo/15369a735e/) · CC0
- `img/cala-*.webp` — “A beautiful white calla lily with a yellow center surrounded by green leaves and small pink flowers in a tropical garden.”, lady1789 · [WordPress Photo Directory](https://wordpress.org/photos/photo/7156ae962c/) · CC0
- `img/penca-*.webp` — “Aloe vera 🌿 Nature’s simple healer — calm, fresh, and quietly powerful.”, Ngamket · [WordPress Photo Directory](https://wordpress.org/photos/photo/643693ce62/) · CC0

## Archivos

- `DESIGN.md`
- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
