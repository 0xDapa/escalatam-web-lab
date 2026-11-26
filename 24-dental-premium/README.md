# 24 · Alba Clínica Dental — Odontología estética · Madrid

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/24-dental-premium/

**Ideal para:** clínicas dentales, estética, cirugía plástica, dermatología, clínicas premium.

- **Inspirada en:** [Aventura Dental Arts (Awwwards SOTD)](https://aventuradentalarts.com/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Lujo clínico en blanco y negro: serif enorme con tracking negativo
- **Técnica estrella:** Revelado con clip-path + texto palabra a palabra ligado al scroll + slider antes/después
- **Tipografías:** Instrument Serif + Inter Tight (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Titular serif gigante sobre foto B/N que se revela con `clip-path`; manifiesto que se ilumina palabra a palabra al hacer scroll.
- Tratamientos en pestañas oscuras con panel sticky, slider antes/después (input range, marcado como simulación), contadores.
- Equipo en monogramas, FAQ con `<details>`, formulario de cita que abre WhatsApp y botón flotante.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.6 KB / 1.9 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 232.9 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 96 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.2 s / 1.7 s / 0 ms / 0 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- `img/hero-*.webp` — “Dentist Orthodontist”, Michal Jarmoluk · [StockSnap](https://stocksnap.io/photo/dentist-orthodontist-YXEEJ34DKF) · CC0
- `img/sillon-*.webp` — “Chair Dentist”, Daniel Frank · [StockSnap](https://stocksnap.io/photo/chair-dentist-3J10QN5PTS) · CC0
- `img/gabinete-*.webp` — “Chair Dentist”, Daniel Frank · [StockSnap](https://stocksnap.io/photo/chair-dentist-N79O15BH30) · CC0
- `img/sonrisa-*.webp` — “Smiling Woman”, Authentic Stock · [StockSnap](https://stocksnap.io/photo/smiling-woman-YANJF5SZTU) · CC0
- `img/paciente-*.webp` — “Smiling Woman”, Authentic Stock · [StockSnap](https://stocksnap.io/photo/smiling-woman-3WMJWQPS9L) · CC0

## Archivos

- `app.js`
- `fonts`
- `img`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
