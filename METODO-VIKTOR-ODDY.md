# El método de Viktor Oddy — qué aprendimos y cómo lo aplicamos

> Investigación hecha el 25 nov 2026 sobre la cuenta [@viktoroddy](https://x.com/viktoroddy) en X, sus hilos y su galería [MotionSites](https://motionsites.ai).
> **Importante:** sus prompts, imágenes, vídeos y HTML son de su propiedad. En este repositorio **no se publica nada suyo**: solo describimos el método y lo reconstruimos con código, textos y arte propios.
> **Actualización (25 nov 2026, segunda pasada):** analizamos ~190 posts propios (27 ago – 25 nov 2026), transcribimos 6 de sus vídeos tutoriales y leímos su skill open source. Ver la sección 6. Los datos crudos se quedan en local (no se publican).

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
| Webs “que no parecen IA” con estilos variados | **Tanda 2** (carpetas 13–22): 10 webs con 10 lenguajes de diseño distintos (editorial solo CSS, brutalismo cinético, liquid glass, bento, scroll horizontal, secuencia de fotogramas, shader de lujo, retro pixel, mapa interactivo, configurador). |
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

## 6. Investigación profunda (segunda pasada, 25 nov 2026)

Fuente: ~190 posts originales de [@viktoroddy](https://x.com/viktoroddy) (sin respuestas ni retuits) del 27 ago al 25 nov 2026 leídos con la API de X,
6 vídeos tutoriales transcritos y su repositorio open source. Las cifras de negocio son **lo que él afirma**, no están verificadas.

### 6.1 Qué funciona en sus posts (datos propios sobre esos ~190 posts)

| Formato / tema | Posts | Mediana de likes | Mediana de guardados |
|---|---|---|---|
| Con vídeo | 161 | 156 | 133 |
| Con imagen | 13 | 34 | 11 |
| Solo texto | 17 | 49 | 22 |
| Contienen “save”, “resources”, “tools”, “list” o “websites” (incluye las listas de recursos) | 40 | 305 | 372 |
| Mencionan GPT / ChatGPT | 41 | 340 | 249 |
| Mencionan Three.js / 3D / WebGL | 41 | 352 | 292 |
| Mencionan dinero ($) | 14 | 367 | 387 |
| Todos | ~190 | 132 | 100 |

Conclusiones: **el vídeo de la web en movimiento es el formato** (casi todo lo que publica); las **listas de recursos** son lo que más se
guarda; las comparativas de modelos, el 3D y los ganchos de dinero tiran de interacción. Posts más guardados: lista de recursos
([3 993 guardados](https://x.com/viktoroddy/status/2117585451502719144)), otra lista ([3 778](https://x.com/viktoroddy/status/2099152986102796467)),
el lanzamiento de su skill ([3 367](https://x.com/viktoroddy/status/2114684257109254434)), el vídeo del “workflow real”
([3 255](https://x.com/viktoroddy/status/2117959947204092218)). Más likes: [“ChatGPT: 0 / Claude: 1”](https://x.com/viktoroddy/status/2092997128838914237) (5 551),
[diseñar en Illustrator](https://x.com/viktoroddy/status/2096820545589572076) (5 482), [“el primer modelo que contrataría como diseñador”](https://x.com/viktoroddy/status/2122106585136959664) (3 641),
[tienda donde “recorres el perchero, no una cuadrícula”](https://x.com/viktoroddy/status/2121758020451594539) (2 630).

### 6.2 Su flujo de trabajo (de sus vídeos)

1. **Siempre empieza con una referencia** (Pinterest, una captura, una web): “always start with a reference” ([vídeo](https://x.com/viktoroddy/status/2102743819058122824)).
2. Le pasa la captura o el enlace a Claude y le pide **3 opciones de rediseño**; elige una (“option one”) y la construye ([vídeo, min 1:44–2:53](https://x.com/viktoroddy/status/2117959947204092218)).
3. Para heros cinematográficos: imagen con GPT Image → Claude escribe un prompt largo → quita el texto de la imagen → la anima con **Kling** → el vídeo de fondo va **ligado al scroll** ([vídeo](https://x.com/viktoroddy/status/2115773121705939382), [otro](https://x.com/viktoroddy/status/2099488750283923775)). Para assets coherentes usa el conector de **Higgsfield** dentro de Claude ([vídeo](https://x.com/viktoroddy/status/2102743819058122824)).
4. Con su **MCP** pide a Claude “una estructura de MotionSites” y mantiene sus propios colores ([vídeo](https://x.com/viktoroddy/status/2120117138816205106)).
5. Sus demos más técnicas se anuncian sin librerías: “Opus 5.5 + raw WebGL. No Three.js, no libraries, one prompt… Estimated API cost: $5.54” ([post](https://x.com/viktoroddy/status/2107058718882103388)).

### 6.3 Cómo vende (de sus vídeos y posts)

- **Prospección con demo hecha:** coge la web de un negocio, pide a la IA un rediseño, lo publica en Vercel arrastrando la carpeta y le escribe al dueño: “Hey, I built you this beautiful website. If you like it, I can customize it…” ([vídeo, min 6:37–8:21](https://x.com/viktoroddy/status/2117959947204092218)).
- **Precio:** “I'd price it around $3,000” con **2 revisiones**, y que la IA redacte la propuesta; dominio en Namecheap y Supabase si hace falta base de datos ([vídeo, min 5:35–9:23](https://x.com/viktoroddy/status/2122290276077338975)). Afirma que con Upwork + X se pueden hacer “10 to 20,000 within your first three months” ([vídeo, min 8:33](https://x.com/viktoroddy/status/2117959947204092218)). Gancho de nicho: “restaurants pay $10K for a site like this” ([post](https://x.com/viktoroddy/status/2124306534670983524)).
- **Distribución:** graba la pantalla interactuando (también en móvil), pide a Claude un copy por plataforma (X, LinkedIn, Threads, Instagram), **pone el enlace en una auto-respuesta y no en el post principal** para no perder alcance, y en esa respuesta ofrece: “DM me … and I'll send you three free ideas for yours” ([vídeo, min 4:08–6:32](https://x.com/viktoroddy/status/2117959947204092218)).
- **Embudo propio:** regala prompts → [100 000 registros](https://x.com/viktoroddy/status/2109241632445047047) (según él), [700 000 visitas/mes](https://x.com/viktoroddy/status/2113258732587241893), y vende Studio ([7 000+ registros, 5 700 $ MRR](https://x.com/viktoroddy/status/2124767753215279293)). Su galería se filtra por tono: “dark, luxe, technical, brutalist” ([post](https://x.com/viktoroddy/status/2094009989220430084)).

### 6.4 Sus reglas de gusto (resumen de su skill open source)

Su skill ([anuncio](https://x.com/viktoroddy/status/2114684257109254434), repositorio enlazado ahí; instrucciones con licencia MIT, ejemplos y medios © suyos — aquí solo lo resumimos con nuestras palabras):

- **Una sola idea por primera pantalla**; titular grande (≈72–96 px en escritorio) con interlineado muy cerrado y tracking negativo.
- **Un solo color de acento**; prohibidos los degradados morado/índigo y los “blobs” genéricos de IA.
- Entradas coreografiadas con pequeños desfases y curvas tipo *ease-out-expo*; grano sutil; **siempre una rama `prefers-reduced-motion`**.
- Un recetario de técnicas: vídeo ligado al scroll con caché de fotogramas, liquid glass, palabras que entran desenfocadas, tarjetas apiladas sticky, carrusel con profundidad, foco que sigue al cursor, fondos de shader.
- Proceso: **elegir UNA referencia, hacerla tuya, construir, mirar capturas una vez y arreglar las dos cosas más flojas.**

### 6.5 Qué aplicamos en la tanda 2

- 10 lenguajes de diseño distintos en vez de “otra web 3D más” (su galería también se organiza por tono).
- Restaurantes primero (su gancho de 10K) y un nicho distinto en cada demo.
- Técnicas de su recetario reconstruidas desde cero y sin librerías: secuencia de fotogramas ligada al scroll (18), liquid glass (15), foco de cursor en bento (16), fondo de shader (19), más otras que no vimos en su material: solo CSS con scroll-driven animations (13), tipografía variable cinética (14), mapa SVG procedural (21), configurador de producto (22).
- Para vender: grabar cada demo en vídeo (escritorio + móvil), enlace en la auto-respuesta, y la oferta de “3 ideas gratis” adaptada a español.
