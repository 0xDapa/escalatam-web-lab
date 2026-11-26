# 36 · Lucía Ferrer — Fotógrafa (bodas, retrato, paisaje)

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/36-fotografa/

**Ideal para:** fotógrafos, videógrafos, estudios creativos, portfolios.

- **Inspirada en:** [Lusion + Active Theory](https://lusion.co/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Negro cálido, Geist + Garamond itálica, header en mix-blend difference, mucho aire.
- **Técnica estrella:** Three.js: galería curva dentro de un cilindro (scroll + arrastre con inercia), doblez y separación RGB según velocidad · lightbox FLIP con Motion
- **Librerías (empaquetadas con esbuild, sin CDN):** Three.js 0.187 + Motion 14
- **Tipografías:** Geist + Geist Mono + EB Garamond italic (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Vertex shader coloca cada foto sobre un cilindro y la dobla con la velocidad; fragment hace object-fit:cover, separa RGB y apaga/desatura las laterales.
- Sticky de 340vh: el scroll gira el arco; además se puede arrastrar con proyección de inercia y snap a foto.
- Rótulo de la foto central con crossfade + blur de 3 px (Emil).
- Galería masonry con revelado clip-path, lightbox con FLIP desde la miniatura (muelle bounce 0) y reserva con segmentado de píldora.

Código fuente legible en [`src/t4/36-fotografa/`](../src/t4/36-fotografa/) (se compila con `node tools/build4.mjs 36-fotografa`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 28.8 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 159.4 KB |
| Carpeta completa gzip | 3119.2 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 90 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.4 s / 3.6 s / 50 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- `img/retrato-*.webp` — “Fashion model looking at the camera”, Nicole De Khors · [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=71795324) · CC0
- `img/moda-*.webp` — “Feminine Beauty By English British Fashion Model 2”, SelfiePhotographyAgency · [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=161697007) · CC0
- `img/cumbre-*.webp` — “A majestic mountain landscape features snow-capped peaks under a clear blue sky. Below, a thick blanket of clouds covers the valley, creating a dramatic contrast with the rugged terrain.”, appealdahal · [WordPress Photo Directory](https://wordpress.org/photos/photo/85169684d4/) · CC0
- `img/pinos-*.webp` — “A breathtaking mountain landscape with layered blue hills fading into the distance, a winding road through a peaceful hillside town, colorful houses, tall pine trees in the foreground, soft sunlight over the valley, slight haze, cinematic depth, ultra-realistic, 4K, serene wide-angle view”, digantparmar · [WordPress Photo Directory](https://wordpress.org/photos/photo/40669d7369/) · CC0
- `img/valle-*.webp` — “A wide landscape view looking down into a valley where green patches of farmland and a rural village rest beside a winding river. Massive, heavily textured tan cliffs and mountains rise sharply around the valley floor.”, ashimkarki · [WordPress Photo Directory](https://wordpress.org/photos/photo/1676a98ee0/) · CC0
- `img/elefante-*.webp` — “A dramatic, high-contrast, black-and-white close-up portrait of an African elephant.”, Mutebi Ivan Junior · [WordPress Photo Directory](https://wordpress.org/photos/photo/8369d61965/) · CC0
- `img/garza-*.webp` — “A crisp, high-contrast, black-and-white silhouette portrait of a Great Egret standing on a horizontal bar.”, Mutebi Ivan Junior · [WordPress Photo Directory](https://wordpress.org/photos/photo/49569d60fa/) · CC0
- `img/boda-*.webp` — “A newly wed couple walking with love and care”, Bijay Yadav · [WordPress Photo Directory](https://wordpress.org/photos/photo/78651d381c/) · CC0
- `img/mirador-*.webp` — “A panoramic view of a hilly landscape with green valleys and a city nestled in between. In the distance, majestic snow-capped mountains are visible under a clear blue sky.”, Riwaz Acharya · [WordPress Photo Directory](https://wordpress.org/photos/photo/60867ffd74/) · CC0

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
