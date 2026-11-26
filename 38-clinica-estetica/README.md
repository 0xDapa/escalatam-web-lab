# 38 · Aura Medicina Estética — Clínica estética

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/38-clinica-estetica/

**Ideal para:** clínicas estéticas, dermatología, spas médicos, odontología estética.

- **Inspirada en:** [animations.dev + Vaul + Sonner (Emil Kowalski)](https://animations.dev/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Marfil y malva, Mona Sans + Caslon Display, tarjetas suaves; todo el encanto está en el movimiento.
- **Técnica estrella:** Motion: tarjeta→modal con FLIP interrumpible, reserva en drawer Vaul, segmentado con píldora en muelle, número que rueda, popovers origin-aware, acordeón con altura medida
- **Librerías (empaquetadas con esbuild, sin CDN):** Motion 14
- **Tipografías:** Mona Sans + Libre Caslon Display (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Cada interacción sigue una regla de Emil: < 300 ms, ease-out (.23,1,.32,1), scale(.97) al presionar, nunca desde scale(0).
- Popovers que escalan desde su disparador; el segundo tooltip aparece sin retardo.
- Drawer con arrastre 1:1, descarte por velocidad, fondo que se escala hacia atrás.
- Toasts apilados con Deshacer y pausa al ocultar la pestaña.

Código fuente legible en [`src/t4/38-clinica-estetica/`](../src/t4/38-clinica-estetica/) (se compila con `node tools/build4.mjs 38-clinica-estetica`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 30.3 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 30.3 KB |
| Carpeta completa gzip | 101.6 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.4 s / 1.4 s / 0 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- Sin fotos de terceros: todo lo visual es código (Three.js/CSS/SVG) o renders propios del modelo 3D.

## Archivos

- `fonts`
- `index.html`
- `js`
- `style.css`
