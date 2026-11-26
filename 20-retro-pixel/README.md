# 20 · Barbería Píxel — Barbería · Bogotá

**Demo en vivo:** https://0xdapa.github.io/escalatam-web-lab/20-retro-pixel/

- **Lenguaje de diseño:** Retro escritorio 8-bit / Y2K
- **Técnica:** Ventanas arrastrables (Pointer Events) + simulador de corte en pixel art (Canvas 32×32) + modo CRT
- **Tipografías:** Press Start 2P + VT323 + Silkscreen (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

- Escritorio retro con ventanas biseladas que se pueden arrastrar, iconos, barra de tareas con reloj y ticker.
- Simulador: eliges corte, barba y color y se redibuja un avatar de 32×32 píxeles con el precio.
- Agenda de turnos con barra de progreso; interruptor CRT con scanlines.
- En móvil las ventanas se apilan como tarjetas.

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | 4.8 KB / 2.2 KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | 44.6 KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | 100 / 100 / 100 / 100 |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | 1.0 s / 1.2 s / 0 ms / 0 |
| FPS hero móvil / escritorio* | 57.7 / 60.3 |

\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

- `app.js`
- `fonts`
- `index.html`
- `style.css`

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
