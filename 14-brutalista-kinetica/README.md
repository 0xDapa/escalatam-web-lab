# 14 · Bar Trueno — Coctelería · Ciudad de México

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/14-brutalista-kinetica/

- **Lenguaje de diseño:** Neo-brutalismo con tipografía cinética
- **Técnica:** Fuente variable (ejes ancho+peso) movida por puntero y velocidad de scroll, JS vanilla
- **Tipografías:** Archivo (variable) + Space Mono (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- Cada letra de TRUENO cambia `font-stretch` y `font-weight` según la distancia al puntero (Archivo variable, wdth 62–125).
- Cintas marquesina cuya velocidad depende de la velocidad del scroll; manifiesto cuyas líneas ganan peso al pasar.
- Texto con efecto scramble, cuenta atrás del happy hour y formulario de reserva de demostración.
- Retícula de filetes de 1.5 px, un solo acento azul eléctrico + lima.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 3.9 KB / 2.1 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 127.8 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.2 s / 1.2 s / 0 ms / 0.009 |
| FPS hero móvil / escritorio* | 60.0 / 41.7 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
