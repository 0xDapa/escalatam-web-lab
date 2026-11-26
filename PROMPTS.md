# Prompts reutilizables — una demo premium por lead

> Copia, rellena lo que está entre `{{ }}` y pega en tu agente cloud (o en Claude / Grok / GPT).
> Todos parten de este laboratorio: https://0xdapa.github.io/escalatam-web-lab/ · repo: https://github.com/0xDapa/escalatam-web-lab

---

## Prompt 1 — Ficha del lead (investigación, 5 min)

```
Investiga este negocio y devuélveme una ficha en español:
- Nombre: {{NOMBRE}}
- Ciudad / país: {{CIUDAD}}
- Web actual: {{URL o "no tiene"}}
- Instagram / Google Maps: {{ENLACES}}

Necesito: 1) estado de su web (código HTTP, si es móvil-friendly, si tiene reserva/pedido online),
2) su dolor principal en 1 frase, 3) idioma en que hablarles, 4) 4 datos reales para usar como cifras
(años, reseñas, valoración, horario), 5) 3 fotos públicas suyas que podría usar (URL), 6) colores de su marca (hex)
7) qué variante del Escalatam Web Lab encaja mejor y por qué (01–12).
No inventes datos: si algo no aparece, escribe "desconocido".
```

## Prompt 2 — Recreación superdetallada (plantilla maestra)

```
Construye una landing page de UN SOLO NEGOCIO en HTML + CSS + JavaScript vanilla, sin framework y sin build,
en una carpeta con: index.html, core.css, app.js y fonts/. Nada de CDNs: si usas una librería, inclúyela minificada en app.js.

NEGOCIO
- Nombre: {{NOMBRE}} · Nicho: {{NICHO}} · Ciudad: {{CIUDAD}} · Idioma: {{ES/EN}}
- Dolor que resolvemos: {{DOLOR}} → el botón principal del hero es "{{CTA PRINCIPAL}}".

ESTILO (copia exactamente)
- Fondo hero {{#hex}}, tinta {{#hex}}, acento único {{#hex}}, acento 2 (solo para glitch) {{#hex}}.
- Sección cifras: fondo {{#hex}} / texto {{#hex}}. Sección servicios: fondo {{#hex}} / texto {{#hex}}.
- Fuente display condensada en MAYÚSCULAS: {{Anton | Bebas Neue | Oswald 700 | Teko 600 | Antonio 700 | ...}} (Google Fonts, self-hosted woff2 latin).
- Texto: Archivo 400/700. Etiquetas y nav: JetBrains Mono 400, mayúsculas, letter-spacing .09em.

ESTRUCTURA (en este orden)
1. HERO 100svh. Arriba: logo (icono SVG simple + nombre), nav vertical mono (Inicio, Nosotros, Servicios, Contacto),
   etiqueta "Demo conceptual" a la derecha. Izquierda: overline en acento "{{SERVICIO · CIUDAD}}", titular de 3–4 líneas
   cortas "{{LÍNEA 1}} / {{LÍNEA 2}} / {{LÍNEA 3}}" a clamp(54px,7.9vw,124px), interlineado .95; párrafo de 2 frases; 2 botones píldora.
   Derecha (desde el 34 % del ancho hasta el borde): OBJETO 3D = {{OBJETO}} hecho con {{TECNOLOGÍA}}, que gira solo y se arrastra con inercia.
   Canvas con DPR máx 1.75, render solo cuando es visible (IntersectionObserver + visibilitychange).
2. TRANSICIÓN HORIZONTE: sección de 170vh con escena sticky de 100vh. Al hacer scroll (p de 0 a 1) un círculo del color de la
   siguiente sección crece desde abajo (clip-path: circle(p*135vmax at 50% 108%)) con un anillo brillante del color de acento
   en su borde; a mitad aparece centrada la frase "{{FRASE PUENTE}}" + línea mono pequeña "{{3 DATOS SEPARADOS POR ·}}".
3. CIFRAS: 2 columnas. Izquierda fija (sticky top 10vh): imagen {{FOTO o gradiente}} 440×250 y titular de 3–4 líneas.
   Derecha: 2 párrafos + 4 cifras grandes en acento que cuentan desde 0 (easeOutExpo 1,6 s, formato es-ES) al entrar en pantalla,
   cada una con su línea separadora que se dibuja de izquierda a derecha:
   {{CIFRA 1 + texto}}, {{CIFRA 2 + texto}}, {{CIFRA 3 + texto}}, {{CIFRA 4 + texto}}.
4. SERVICIOS: escena sticky de 100vh; la altura de la sección = 100vh + ancho extra de la tira. Al hacer scroll la tira se mueve
   en horizontal (translate3d) y detrás una palabra gigante "{{PALABRA}}" en contorno se desplaza más lento.
   Tira: titular de 3 líneas (la última en acento) + 4 tarjetas (icono SVG de trazo, nº 01–04, título, frase); cada tarjeta pasa de
   opacidad .4 a 1 cuando entra en el 85 % izquierdo de la pantalla. Barra de progreso fina arriba.
5. CTA a pantalla completa en color de acento con titular enorme "{{PREGUNTA}}" y 2 botones.
6. Footer mono: "© {{NOMBRE}}" · "Demo conceptual por Escalatam".

ANIMACIÓN DEL TITULAR (glitch, solo CSS)
- Cada línea es <span class="ln" data-t="TEXTO">. Entra con clip-path de inset(0 100% 0 0) a visible en .95 s
  cubic-bezier(.2,.75,.1,1), 110 ms de retardo por línea. ::before (acento) y ::after (acento 2) con content:attr(data-t) parpadean
  0,75 s con steps(1), desplazados ±0,05em y recortados en franjas. Estado final: clip-path: inset(-60% -20% -60% -5%)
  (para no cortar tildes).

MÓVIL (< 760 px)
- Hero en columna: texto arriba, objeto 3D debajo (alto = 100vw). Sin nav vertical. Cifras en 1 columna sin sticky.
  Tarjetas de 72vw. Nada debe desbordar en horizontal a 390 px.

RENDIMIENTO Y ACCESIBILIDAD
- JS total ≤ 35 KB gzip. LCP < 2,5 s en móvil. Sin errores de consola.
- prefers-reduced-motion: un solo frame estático y textos visibles sin animación.
- <main>, lang="{{es}}", contraste AA en textos de párrafo.

PROHIBIDO
- Copiar textos, imágenes o código de otras webs. Usar logos de terceros. Inventar cifras sin marcarlas como "de ejemplo".
```

## Prompt 3 — Clonar una variante del laboratorio para un lead (el más rápido)

```
Clona el repo https://github.com/0xDapa/escalatam-web-lab. Lee SOP.md y src/variants.py.
Crea una variante nueva con id "{{NN-nicho-cliente}}" copiando la variante "{{ID BASE, ej. 01-webgl2-puro}}":
1) añade su entrada en src/variants.py con estos datos del lead: {{PEGA AQUÍ LA FICHA DEL PROMPT 1}}
   (textos en {{idioma}}, colores de su marca, fuente display {{fuente}}; cifras reales o marcadas "de ejemplo"),
2) copia src/variants/{{ID BASE}}/ a src/variants/{{nuevo id}}/ y ajusta colores/objeto si hace falta,
3) python3 src/build.py {{nuevo id}}, sirve con python3 -m http.server y saca capturas con python3 tools/shoot.py {{nuevo id}},
4) revisa las capturas (titular legible, sin desbordes, tildes completas) y corrige,
5) publica en GitHub Pages y dame la URL final + 2 capturas (escritorio y móvil).
```

## Prompt 4 — Hero con vídeo IA y scroll-scrubbing (cuando el cliente quiere "cine")

```
1) Genera un clip de 4 s, 24 fps, 1920×1080, sin texto ni logos: "{{DESCRIPCIÓN DE CÁMARA}}"
   (ej.: "travelling lento hacia una parrilla de leña con brasas naranjas, humo, luz cálida, fondo oscuro").
2) Recodifica con keyframe cada 4 frames: ffmpeg -i in.mp4 -an -c:v libx264 -g 4 -crf 23 -preset slow -movflags +faststart hero.mp4
   (y una versión 1280 px para móvil).
3) En la página: <video muted playsinline preload="auto"> sin autoplay. Una sección de 300vh con el vídeo sticky.
   En scroll: video.currentTime = p * duration (con requestAnimationFrame, nunca en el evento directamente).
   Poster = primer frame en WebP. En prefers-reduced-motion muestra solo el poster.
4) El titular y los textos se revelan en momentos concretos del scroll (p = .15, .45, .8).
```

## Prompt 5 — Imagen IA para la sección de cifras

```
Fotografía {{cenital | de detalle | ambiente}} de {{QUÉ}} para {{NICHO}} en {{CIUDAD}}, luz natural {{cálida/fría}},
paleta dominante {{#hex acento}} y {{#hex fondo}}, objetivo 35 mm, profundidad de campo baja, sin personas reconocibles,
sin texto, sin logos, formato 16:9, 1600 px.
```
(Marcar siempre en el README que la imagen es generada por IA.)

## Prompt 6 — Mensaje para el lead (borrador, SIEMPRE lo aprueba David antes de enviar)

```
Redacta 3 versiones distintas (cortas, 3–4 líneas, tono cercano, {{idioma}}) de un mensaje de WhatsApp para {{NOMBRE}}.
Idea: vimos su web/Instagram, creemos que tiene mucho margen de mejora ({{DOLOR}}), les hicimos esta demostración: {{URL DEMO}}.
Si les interesa, se la dejamos lista esta misma semana. Sin precios, sin emojis excesivos, sin sonar a plantilla.
```
