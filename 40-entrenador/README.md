# 40 · Kai Torres — Entrenador personal

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/40-entrenador/

**Ideal para:** entrenadores, boxes de crossfit, estudios de pilates, nutricionistas.

- **Inspirada en:** [Apple Watch + Emil Kowalski](https://www.apple.com/apple-watch-ultra-3/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Blanco hueso, azul cobalto y lima; Big Shoulders condensada enorme.
- **Técnica estrella:** Motion: anillos de actividad SVG con muelle e interrumpibles, carrusel de planes con proyección de inercia iOS + rubber-band, stepper direccional, toasts
- **Librerías (empaquetadas con esbuild, sin CDN):** Motion 14
- **Tipografías:** Big Shoulders Display + Rubik (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Anillos con pathLength=1 y strokeDashoffset animado con muelle (bounce 0); cambiar Hoy/Semana/Mes interrumpe y reanima.
- Carrusel: velocidad suavizada, distancia proyectada v·0.998/(1−0.998), snap al índice proyectado con la velocidad real como impulso, rubber-band con la fórmula de iOS en los bordes.
- Stepper: el número entra/sale en la dirección del cambio con 2 px de blur; al tope, sacudida con muelle.
- Elegir plan → toast con Deshacer que rellena la reserva.

Código fuente legible en [`src/t4/40-entrenador/`](../src/t4/40-entrenador/) (se compila con `node tools/build4.mjs 40-entrenador`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 28.8 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 28.8 KB |
| Carpeta completa gzip | 1295.8 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 97 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.4 s / 2.5 s / 50 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- `img/boxeo-*.webp` — “Two young boxers wearing protection equipment training in a boxing ring.”, Roberto Vazquez · [WordPress Photo Directory](https://wordpress.org/photos/photo/31767a9e15/) · CC0
- `img/rack-*.webp` — “A gym with a Smith machine, weights, and exercise equipment.”, Rashed Hossain · [WordPress Photo Directory](https://wordpress.org/photos/photo/3586a27d82/) · CC0
- `img/jaula-*.webp` — “A dual-pulley cable crossover machine in a sunlit gym with a barbell and weights on a green floor.”, Rashed Hossain · [WordPress Photo Directory](https://wordpress.org/photos/photo/7986a27d89/) · CC0

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
