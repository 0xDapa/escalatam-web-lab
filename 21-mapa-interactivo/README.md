# 21 · Raíz Inmobiliaria — Inmobiliaria de barrio · Montevideo

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/21-mapa-interactivo/

- **Lenguaje de diseño:** Cartografía ilustrada (mapa como interfaz)
- **Técnica:** Mapa SVG procedural con zoom/pan/pellizco y rutas animadas, sin librería de mapas
- **Tipografías:** Syne + IBM Plex Mono + Inter Tight (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- Ciudad dibujada por código (manzanas, parques, avenida, ómnibus, rambla) en SVG; sin tiles ni API de mapas.
- Pines HTML proyectados sobre el mapa; arrastrar, rueda y pellizco para hacer zoom; vuelo animado al elegir una casa.
- Rutas a pie hasta rambla, colegio y ómnibus dibujadas con `stroke-dashoffset`, con minutos estimados.
- Filtros (venta/alquiler/dormitorios/mascotas) sincronizados entre lista y mapa.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 10.3 KB / 4.8 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 115.3 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 97 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.2 s / 1.2 s / 190 ms / 0 |
| FPS hero móvil / escritorio* | 60.0 / 60.0 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
