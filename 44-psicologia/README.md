# 44 · Dra. Elena Ríos — Psicóloga

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/44-psicologia/

**Ideal para:** psicólogos, terapeutas, coaches, nutricionistas, consultas médicas.

- **Inspirada en:** [Apple (texto con scroll) + Vaul/animations.dev](https://vaul.emilkowal.ski/) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** Salvia y verde profundo, Spectral ligera + Karla; foto en arco, ritmo pausado.
- **Técnica estrella:** Motion: respiración guiada 4-4-6, texto que se ilumina palabra a palabra (estilo Apple), reserva en 3 pasos en drawer con transición según dirección y altura animada
- **Librerías (empaquetadas con esbuild, sin CDN):** Motion 14
- **Tipografías:** Spectral + Karla (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Respiración con ease-in-out (es un ritmo, no un gesto: sin muelle) y anillo de progreso de 1 minuto.
- Sticky de 220vh: cada palabra pasa de 16% a 100% de opacidad según el progreso.
- Pasos de la reserva: salen/entran 32 px en la dirección del avance con blur de 3 px; el contenedor anima su altura medida con muelle.
- Acordeón con altura medida, aviso de crisis responsable en las preguntas, toasts.

Código fuente legible en [`src/t4/44-psicologia/`](../src/t4/44-psicologia/) (se compila con `node tools/build4.mjs 44-psicologia`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | 29.1 KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | 29.1 KB |
| Carpeta completa gzip | 1378.6 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 95 / 100 / 100 |
| FCP / LCP / TBT / CLS | 1.5 s / 1.5 s / 50 ms / 0 |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

- `img/laguna-*.webp` — “A peaceful wetland scene with several whistling ducks (Dendrocygna javanica) swimming and standing in shallow water. Green vegetation surrounds the water, while the reflections and open space create a calm, natural atmosphere. Location: Sanketham Viewpoint, Kozhikode, Kerala.”, Bigul Malayi · [WordPress Photo Directory](https://wordpress.org/photos/photo/1336aa05c4/) · CC0
- `img/hojas-*.webp` — “A red and green anthurium flower captured from the side at Malabar Botanical Garden, Kozhikode. The soft sunlight highlights its smooth petals and the tall spadix, with tall bamboo and green leaves forming a calm, natural backdrop.”, Bigul Malayi · [WordPress Photo Directory](https://wordpress.org/photos/photo/6066928997/) · CC0
- `img/valle-*.webp` — “Panoramic view of lush green hills and dense forest, with a small settlement in the distance. Rolling terrain, distant mountains, and a clear blue sky create a calm, natural landscape in Alajuela.”, Michelle Obando Calderón · [WordPress Photo Directory](https://wordpress.org/photos/photo/96469e9a2c/) · CC0
- `img/lago-*.webp` — “A quiet lake surrounded by a dense green forest under a partly cloudy blue sky. A wooden boat is anchored in the foreground, casting a silhouette on the calm water, which reflects the sky and trees. The serene scene conveys a peaceful, natural atmosphere.”, David Klhufek · [WordPress Photo Directory](https://wordpress.org/photos/photo/116677950b/) · CC0
- `img/plantas-*.webp` — “Peace Lilly and Dieffenbachia plant in pot”, Makarand Mane · [WordPress Photo Directory](https://wordpress.org/photos/photo/2926621677/) · CC0

## Archivos

- `fonts`
- `img`
- `index.html`
- `js`
- `style.css`
