# 39 · Obsidiana Detailing — Detailing automotriz

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/39-detailing/

**Ideal para:** detailers, talleres de pintura, lavados premium, PPF y cerámicos.

- **Inspirada en:** [Apple (scroll-scrub) + estudios de detailing](https://www.apple.com/airpods-pro/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Negro obsidiana con naranja eléctrico, Michroma ancha + Barlow; nav con saturate(180%) blur(20px).
- **Técnica estrella:** Three.js scroll-scrub 560vh: panel de carrocería con clearcoat; la cinta de corrección avanza (planos de recorte), desaparecen los swirls y aparecen gotas del cerámico; medidor de brillo
- **Librerías (empaquetadas con esbuild, sin CDN):** Three.js 0.187 + Motion 14
- **Tipografías:** Michroma + Barlow (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Panel procedural con línea de hombro; dos mallas con la misma geometría y clippingPlanes opuestos = antes/después en vivo.
- Swirls y rayas: normal map generado en un canvas (2.200 arcos + rayas) solo en la capa clearcoat.
- Entorno de estudio con barras de luz HDR (PMREM de una escena propia); gotas = InstancedMesh.
- Comparador antes/después accesible (input range + clip-path) y calculadora con número que rueda.

Código fuente legible en [`src/t4/39-detailing/`](../src/t4/39-detailing/) (se compila con `node tools/build4.mjs 39-detailing`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 28.2 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 160.9 KB |
| Carpeta completa gzip | 1628.7 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 97 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 0.8 s / 2.2 s / 170 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- `img/rojo-*.webp` — “Close-up side view of a red sports car showcasing its rear wheel, sleek bodywork with a racing number 7, and aerodynamic detailing around the exhaust.”, Hardeep Asrani · [WordPress Photo Directory](https://wordpress.org/photos/photo/35567e0ad4/) · CC0
- `img/clasico-*.webp` — “A dark green classic sports car with a sleek design and chrome trim.”, manfred03 · [WordPress Photo Directory](https://wordpress.org/photos/photo/7256a692a6/) · CC0
- `img/gotas-*.webp` — “A close up of frozen water droplets and frost on the back of a black car.”, Jonathan Desrosiers · [WordPress Photo Directory](https://wordpress.org/photos/photo/840659ee78/) · CC0
- `img/interior-*.webp` — “Interior of a vintage red racing car, featuring a wooden steering wheel, multiple dashboard gauges, two black leather seats, and a minimalist gear shift.”, Hardeep Asrani · [WordPress Photo Directory](https://wordpress.org/photos/photo/93767e0abe/) · CC0
- `img/rueda-*.webp` — “A close ground level angle of a black modern car wheel parked on an open grassy village path.”, Faisal Ahammad · [WordPress Photo Directory](https://wordpress.org/photos/photo/1216ad26cf/) · CC0
- `img/luces-*.webp` — “Long exposure photograph of heavy night traffic on a multi-lane highway or main road in a city, showing bright, streaked light trails from car headlights and taillights with elevated infrastructure and city lights in the background.”, oonjira chantanupa · [WordPress Photo Directory](https://wordpress.org/photos/photo/545693d18c/) · CC0

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
