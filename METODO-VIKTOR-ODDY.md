# El método de Viktor Oddy — qué aprendimos y cómo lo aplicamos

> Investigación hecha el 25 nov 2026 sobre la cuenta [@viktoroddy](https://x.com/viktoroddy) en X, sus hilos y su galería [MotionSites](https://motionsites.ai).
> **Importante:** sus prompts, imágenes, vídeos y HTML son de su propiedad. En este repositorio **no se publica nada suyo**: solo describimos el método y lo reconstruimos con código, textos y arte propios.
> No pudimos ver sus vídeos tutoriales completos; todo sale de sus posts y de los prompts gratuitos publicados.

---

## 1. Quién es y qué vende

- Diseñador / *vibe coder* que publica a diario webs animadas “que no parecen hechas por IA”.
- Galería **MotionSites**: ~833 diseños (≈357 gratis) cada uno con vista previa, **prompt completo** y, en los gratuitos, HTML listo ([post](https://x.com/viktoroddy/status/2123749772880437546)).
- **MotionSites MCP**: conecta la galería a Claude / Claude Code; dices “quiero este diseño” y el agente trae el prompt y lo construye en tu proyecto ([post](https://x.com/viktoroddy/status/2125553641956462678), [pasos](https://x.com/viktoroddy/status/2125554480729231489), [anuncio](https://x.com/viktoroddy/status/2123457763175268599)).
- **MotionSites Studio** (SaaS): describes tu negocio → web completa; remezcla de cualquier web; genera vídeos de hero; edición por chat. Él mismo reporta 7 000+ registros, 2 900+ webs y 5 700 $ MRR en 3 semanas, sin equipo ([hilo](https://x.com/viktoroddy/status/2124767753215279293), [1/](https://x.com/viktoroddy/status/2124767968810938685), [2/](https://x.com/viktoroddy/status/2124768305559089170), [3/](https://x.com/viktoroddy/status/2124768469434642455), [4/](https://x.com/viktoroddy/status/2124768649374503231)).
- Opera “0 empleados, 1 portátil”: Claude escribe, prueba y responde soporte ([post](https://x.com/viktoroddy/status/2125158254284263605)).

## 2. Los 7 pilares del método

### 2.1 Primero lo visual, después el código
Genera la **imagen hero con IA (Higgsfield)** y, cuando hay movimiento cinematográfico, un **clip de vídeo con Kling**. Mucho de lo que parece “3D en tiempo real” es en realidad un **vídeo que avanza fotograma a fotograma con el scroll** (*scroll-scrubbing*): “You don't scroll this website. The camera does… The camera move is a Kling 4.0 clip, scrubbed frame by frame as you scroll” ([post](https://x.com/viktoroddy/status/2125397657606889963)).

### 2.2 El prompt superdetallado (“recrea esta página exactamente”)
Cada diseño trae un prompt de **3 400 a 6 000 palabras** (medido en 3 prompts gratuitos). Estructura típica del prompt *Freight Globe* (el que replicamos en la demo Three.js):

1. Resumen: negocio ficticio, sensación, 3 secciones, “HTML + CSS + JS vanilla, sin framework, sin build”.
2. **Medios** con URL exacta, resolución y cómo se usa cada uno (incluye fps, keyframes y qué pasa en cada segundo del vídeo).
3. **Fuentes** (familia, pesos, archivo WOFF2, uso).
4. Head, colores (hex) y **unidades** (todo se mide a 1440×900 y se escala).
5–8. Cada sección con posiciones en px, tamaños de letra, interlineados y comportamiento al hacer scroll.
9. **Secuencia de carga y reveal glitch** (tiempos en ms).
10. Móviles, horizontal corto y tablets.
11. *Reduced motion* y “modo grabación”.
12. **Checklist de aceptación** a 1440×900.

Lo importante no es el código sino **la precisión de la descripción**: la IA sólo tiene que “transcribir”.

### 2.3 Un solo archivo HTML, sin framework
HTML + CSS + JS vanilla en un único archivo; a veces Three.js. Sin React, sin build. Resultado: carga rapidísima, se puede pegar en cualquier hosting.

### 2.4 Lenguaje visual repetible
- Titular **enorme, condensado y en mayúsculas** (Anton y similares) que entra con **glitch** (desplazamiento RGB + recorte).
- **Navegación vertical en monoespaciada**, etiquetas mono pequeñas.
- **Un solo color de acento** sobre fondo blanco o negro.
- Un **objeto protagonista** en el hero (globo, cristal, producto) que gira o reacciona al cursor.
- Transiciones de sección muy “de película”: **horizonte / brillo de planeta** que sube, **secciones fijadas** (sticky) con **contadores**, **scroll horizontal** de servicios con letras gigantes detrás.

### 2.5 La IA escribe el código
Usa los modelos punteros del momento (Claude, Gemini, GPT) y los compara en público. Su post con más interacción es literalmente “GPT + Three.js” ([post](https://x.com/viktoroddy/status/2123932620212072581), ~92 k impresiones, 1 450 guardados). Otro: “Gemini… a full animated site comes back in seconds” ([post](https://x.com/viktoroddy/status/2123749364963426674)).

### 2.6 Vender por industria, con el dolor del cliente
Cada diseño se presenta para un nicho concreto con un gancho de negocio: “restaurants pay $10K for a site like this… Restaurant websites have been a PDF menu for 15 years” ([post](https://x.com/viktoroddy/status/2124306534670983524)), “your agency deserves a site people actually scroll to the end of” ([post](https://x.com/viktoroddy/status/2123623507699642418)), tienda infantil como carrusel que se lanza con el dedo ([post](https://x.com/viktoroddy/status/2125025159438577940)), web que “sabe al producto” ([post](https://x.com/viktoroddy/status/2123243125623967965)).

### 2.7 Distribución: regalar el prompt
Patrón de cada post: vídeo del resultado → “Free prompt below 👇” → enlace a MotionSites → upsell a la suscripción / Studio ([ejemplo](https://x.com/viktoroddy/status/2125397927325847945), [listado de 15 recursos](https://x.com/viktoroddy/status/2123023905657172208), [3 webs para guardar](https://x.com/viktoroddy/status/2124906320424014310)).

## 3. Cómo lo adaptamos en Escalatam

| Pilar de Viktor | Nuestra versión |
|---|---|
| Imagen/vídeo IA como protagonista | Objeto **procedural** (shader, SVG, CSS) → 0 KB de medios, 0 derechos, carga instantánea. Para clientes que lo pidan, se puede añadir vídeo IA (ver `PROMPTS.md`, prompt 4). |
| Prompt superdetallado | Plantilla en español en `PROMPTS.md` + los datos estructurados de `src/variants.py`. |
| Un archivo HTML sin framework | Una carpeta por variante: `index.html` + `core.css` + `app.js` (empaquetado con esbuild, librería incluida). |
| Three.js | 12 alternativas más ligeras: WebGL2 puro, OGL, TWGL, regl, PicoGL, shader único, Zdog, Canvas 2D, CSS 3D, SVG, Lenis + anime.js, Motion. |
| Vender por industria | Cada variante = un nicho real de nuestros leads (restaurante, clínica dental, inmobiliaria, gimnasio, abogados, joyería, café, viajes, moda, academia, pastelería, spa). |
| Regalar el prompt | `PROMPTS.md` para que David genere una demo por lead en su agente cloud. |

## 4. Lo que NO copiamos (y por qué)

- Sus **prompts y HTML** (son su producto de pago o con licencia propia).
- Sus **imágenes y vídeos** (alojados en su CDN; generados por él).
- Sus **nombres de diseños** como marca de nuestras demos.
- Cualquier logo o marca de terceros: todos los negocios de las demos son **ficticios**.

## 5. Ideas pendientes de probar

1. **Scroll-scrubbing de vídeo IA** para un restaurante (clip de 4 s generado con Kling/Grok Imagine, 24 fps, keyframe cada 4 frames, `video.currentTime` ligado al scroll).
2. **Carrusel “lanzable”** (física simple) para tiendas de ropa — base: variante 09.
3. **Web “que sabe al producto”**: paleta y partículas generadas desde la foto del producto del cliente.
