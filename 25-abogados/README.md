# 25 · Ferrer Ruiz Abogados — Despacho de abogados · Bogotá

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/25-abogados/

**Ideal para:** abogados, notarías, asesorías fiscales, consultoras, gestorías.

- **Inspirada en:** [PXR Legal (Awwwards SOTD)](https://pxr.law/) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** Legal contemporáneo: sans ultraligera, píldora de palabra rotativa, fondo arena + naranja
- **Técnica estrella:** Píldora rotativa en el titular, menú de esquina a pantalla completa, tarjetas apiladas sticky (sin fotos)
- **Tipografías:** Manrope (200–800) (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

- Titular "Donde [tu empresa / familia / patrimonio…] encuentra estrategia legal" con la palabra dentro de una píldora que rota.
- Menú de esquina que despliega un overlay naranja; sello giratorio en SVG `textPath`; acordeón con `grid-template-rows`.
- Método en tarjetas apiladas con `position: sticky`, socios con iniciales, publicaciones y formulario con chips → WhatsApp. 100 % CSS/SVG, sin fotos.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 1.6 KB / 0.9 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | 31.8 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 96 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.1 s / 1.1 s / 0 ms / 0 |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

- Sin fotos: todo lo visual está hecho con CSS/SVG.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
