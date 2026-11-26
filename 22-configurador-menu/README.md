# 22 · La Lumbre — Taquería al carbón · Guadalajara

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/22-configurador-menu/

- **Lenguaje de diseño:** Ilustración plana, cálida y juguetona
- **Técnica:** Configurador “arma tu taco” con SVG en vivo + carta filtrable con View Transitions + pedido por WhatsApp
- **Tipografías:** Lilita One + Familjen Grotesk (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- El taco se construye en SVG a medida que eliges tortilla, proteína, salsa y toppings (caídas con rebote vía Web Animations API).
- Precio, descripción y picante (0–5) se recalculan al instante; cantidad con stepper.
- Carta con pestañas y filtros (vegetariano, picante, sin gluten) animados con `document.startViewTransition`.
- El pedido se guarda en localStorage y genera el mensaje listo para WhatsApp (`wa.me/?text=`).

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 13.4 KB / 5.7 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 38.9 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.0 s / 1.0 s / 30 ms / 0 |
| FPS hero móvil / escritorio* | 60.0 / 60.3 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
