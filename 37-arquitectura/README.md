# 37 · Estudio Vértice — Estudio de arquitectura

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/37-arquitectura/

**Ideal para:** arquitectos, constructoras, interioristas, inmobiliarias boutique.

- **Inspirada en:** [Apple (scroll-scrub) + Bruno Simon](https://www.apple.com/macbook-pro/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Plano azul de arquitecto que se convierte en casa al atardecer y de noche; captions de cristal.
- **Técnica estrella:** Three.js scroll-scrub 520vh: casa procedural del plano (aristas) a volumen, sol de tarde y ventanas encendidas · índice de proyectos con preview que sigue al cursor
- **Librerías (empaquetadas con esbuild, sin CDN):** Three.js 0.187
- **Tipografías:** Sora + Martian Mono (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Casa generada por código: primero las aristas (EdgesGeometry) con intro temporal, luego las piezas suben con el scroll.
- Keyframes de cámara, color de cielo/niebla y luz en función del progreso del sticky; sombras reales.
- Póster del mismo render como LCP; Three.js solo tras intención.
- Índice de proyectos con imagen flotante, galería con clip-path y formulario a WhatsApp.

Código fuente legible en [`src/t4/37-arquitectura/`](../src/t4/37-arquitectura/) (se compila con `node tools/build4.mjs 37-arquitectura`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 2.5 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 138.1 KB |
| Carpeta completa gzip | 2455.5 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 0.8 s / 0.8 s / 60 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- `img/pasarela-*.webp` — “A modern architectural scene featuring the Ciudad de las artes y de las ciencias in Valencia, Spain. The image shows sleek, futuristic structures with a bright blue sky above. A directional sign in the foreground points to various attractions within the complex. T”, luis1gonzalez · [WordPress Photo Directory](https://wordpress.org/photos/photo/938675c12a/) · CC0
- `img/museo-*.webp` — “A modern architectural building featuring large glass panels reflecting the surrounding environment.”, Faisal Ahammad · [WordPress Photo Directory](https://wordpress.org/photos/photo/578684274e/) · CC0
- `img/cubierta-*.webp` — “The image showcases a modern architectural interior featuring a geometric glass ceiling with a triangular pattern. Below the ceiling, a spiral structure made of white material rises vertically, flanked by surrounding walls that include large windows.”, Rolly Bueno · [WordPress Photo Directory](https://wordpress.org/photos/photo/7681eafbfd/) · CC0
- `img/marquesina-*.webp` — “Modern architectural canopy at The Shoppes at Marina Bay Sands, Singapore, with reflections of city lights and towering skyscrapers in the background.”, Makarand Mane · [WordPress Photo Directory](https://wordpress.org/photos/photo/8667cc800a/) · CC0
- `img/auditorio-*.webp` — “A modern architectural structure featuring a large, angular glass façade with a white triangular pattern, topped with a distinctive, curved golden roof”, arun1010 · [WordPress Photo Directory](https://wordpress.org/photos/photo/53663ef42e/) · CC0
- `img/torre-*.webp` — “A large building featuring numerous windows, showcasing a modern architectural design.”, Manjil Aryal · [WordPress Photo Directory](https://wordpress.org/photos/photo/91469c75fb/) · CC0
- `img/lamas-*.webp` — “Modern architectural roof with sharp, repeating geometric shape against a soft blue sky.”, gelovasuncion · [WordPress Photo Directory](https://wordpress.org/photos/photo/5186a910d8/) · CC0
- `img/reflejo-*.webp` — “A calm urban scene featuring a narrow canal bordered by modern architectural buildings. On the left, a white cylindrical structure with glass facades reflects in the water, while the right side showcases a large, angular building with a blue glass exterior. An elevated pedestrian bridge spans the canal in the background.”, Nick Krastev · [WordPress Photo Directory](https://wordpress.org/photos/photo/82063e02aa/) · CC0
- `img/ciudad-artes-*.webp` — “The image shows the exterior of the Museu de les Ciències, a modern architectural building with intricate white lattice structures. There is a large, reflective pool in front, and the name of the museum is spelled out in large letters above the water. Valencia, España.”, luis1gonzalez · [WordPress Photo Directory](https://wordpress.org/photos/photo/678675c12d/) · CC0
- `img/fachada-*.webp` — “The image showcases a close-up of a modern architectural facade featuring diagonal, perforated metal panels in shades of green. The panels create a dynamic, textured pattern with alternating colors and small circular perforations.”, jordipicart · [WordPress Photo Directory](https://wordpress.org/photos/photo/62167af68a/) · CC0

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
