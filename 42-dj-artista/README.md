# 42 · NOVA — DJ / artista musical

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/42-dj-artista/

**Ideal para:** DJs, bandas, productores, sellos y salas de conciertos.

- **Inspirada en:** [Igloo Inc + Active Theory](https://www.igloo.inc/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Negro violeta con lima ácido, Unbounded + Sometype Mono, título gigante con degradado.
- **Técnica estrella:** Three.js: esfera de 14k partículas que late con un loop de 124 BPM sintetizado en WebAudio (AnalyserNode) · fechas de gira con fondo compartido animado (Motion)
- **Librerías (empaquetadas con esbuild, sin CDN):** Three.js 0.187 + Motion 14
- **Tipografías:** Unbounded + Sometype Mono (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Esfera de Fibonacci desplazada en el vertex shader por ruido 3D + 8 bandas de energía; sin audio usa un pulso simulado a 124 BPM.
- Adelanto: bombo, hi-hat y bajo generados en el navegador (cero archivos, cero licencias).
- Hover de la gira: un único fondo que se desliza con muelle al renglón activo (también con foco de teclado).
- Presave con toast y Deshacer, cuenta atrás, booking a WhatsApp.

Código fuente legible en [`src/t4/42-dj-artista/`](../src/t4/42-dj-artista/) (se compila con `node tools/build4.mjs 42-dj-artista`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 28.2 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 159.5 KB |
| Carpeta completa gzip | 314.5 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 99 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 0.8 s / 1.8 s / 90 ms / 0.001 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- `img/cabina-*.webp` — “DJ’s hands mixing a live session with digital plates and a laptop with a beer bottle on the table with purplish blue lighting.”, Nilo Velez · [WordPress Photo Directory](https://wordpress.org/photos/photo/235663a264/) · CC0

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
