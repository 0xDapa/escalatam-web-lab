# Anti AI slop — cómo crear webs de todo tipo que no se sientan generadas

Investigación para Escalatam, 26 de noviembre de 2026 (hora de Caracas, UTC−4). Segunda pasada: se leyeron hilos completos (incluidas más de 100 respuestas del hilo de @kirtandopamine), timelines de design engineers y dueños de agencia, prompts y skills que comparten, y tácticas de precio y outreach. Fuentes: posts públicos de X leídos con la API, artículos y skills abiertas. Todas las URLs de X del índice salieron de esos resultados; no hay enlaces inventados.

Este documento no sustituye al [`SOP.md`](SOP.md), al [`VALOR-DE-VENTA.md`](VALOR-DE-VENTA.md) ni al [`METODO-EMIL-KOWALSKI.md`](METODO-EMIL-KOWALSKI.md). Complementa el flujo: primero se elige una dirección visual y se evitan los defaults del modelo; después se construye con el SOP y se vende con las funciones de valor.

## La idea central

El problema no es que la IA «no sepa diseñar». El problema, que Anthropic llama *distributional convergence*, es que sin dirección el modelo elige lo más probable: Inter, degradado morado sobre blanco, hero centrado con dos botones, tres tarjetas con icono y poco movimiento. Lo dijo Anthropic en [Improving frontend design through Skills](https://claude.com/resources/articles/improving-frontend-design-through-skills) (12 de noviembre de 2025) y lo repiten diseñadores y vibecoders en X.

Una lista de cosas prohibidas no basta. Si prohíbes Inter y el degradado morado, el modelo salta al siguiente default: fondo crema con acento terracota, una palabra en itálica dentro del titular, fade-and-slide en cada sección, o el trío Space Grotesk + Instrument Serif en itálica + Inter. Lo que sí funciona es **tomar decisiones antes de generar código** y dárselas al agente con referencias reales y *anti-referencias*, no con adjetivos como «moderno, premium, limpio».

Tres matices de la segunda pasada que importan:

1. **El gusto cierra la reunión; no cierra solo la venta.** En clínicas y med spas, «bonito» no equivale a reservas. En locales, una web que carga en más de 3 s pierde al cliente. El moat de Escalatam es dirección de arte *más* conversión, SEO local y mantenimiento real.
2. **Inter no está prohibido si se afina.** El tell es Inter *sin* tracking ni pesos sobre tarjetas blancas. El autor del hilo más citado lo dijo: Inter puede verse bien si se ajustan peso y tracking.
3. **Lo que más se *nota* no es lo que más se *siente*.** El degradado morado es el chiste cultural; el espaciado fuera de la retícula de 4 px es lo que hace que una UI «se sienta» mal, y aparece con más frecuencia.

En 2026, «que no se vea hecha con IA» ya es un brief de diseño. Eso es una oportunidad: cualquiera puede sacar una web en Lovable o v0; casi nadie puede hacer que no se sienta igual que las demás, y menos aún que consiga llamadas.

---

## 1. Checklist: señales de AI slop y cómo evitar cada una

Usa esto al planear y otra vez al revisar capturas (escritorio 1440 y móvil 390). Si respondes «sí» a tres o más, la web todavía no está lista para un cliente.

| Señal | Por qué se siente generada | Cómo evitarla |
|---|---|---|
| Inter (u otra sans genérica) sin tracking ni pesos deliberados, sobre blanco | Es el default del modelo; el tell es *Inter desafinado*, no el nombre de la fuente | Elige una familia con carácter *o* afina Inter (peso, tracking, tamaño óptico). Declara los 2–3 pesos en el DESIGN.md |
| Degradado morado/azul, o el siguiente default crema + terracota | Ya es un chiste cultural; se arregla en 1–2 prompts y por eso delata prisa | Paleta cerrada *antes* de generar: 1 fondo, 1 tinta, 1 acento con un trabajo concreto |
| Hero centrado, dos CTAs, tres tarjetas con icono Lucide | Composición más probable de cualquier landing | Asimetría, un solo CTA, foto o producto a un lado, no tres iconos iguales |
| Space Grotesk + Instrument Serif itálica + Inter | El «siguiente default» después de Inter | Un par distinto y justificado para *este* negocio; no un trío de moda |
| Fade-up / slide en cada sección, misma duración | Movimiento decorativo, no funcional | 150–300 ms en UI; origen consciente (sale del trigger); si el delta es mayor que la duración, no animes |
| Sombras grandes en reposo, `p-[13px]`, colores crudos en el markup | Sistema incoherente: el linter de Emil señala exactamente esto | Tokens, retícula de 4 px o ninguna, bordes hairline, sin sombra en reposo |
| Titulares en peso 700–800, «Welcome back 👋», pills con emoji | Se lee como dashboard de plantilla, no como producto | Titulares 500–600; iconos vectoriales, no emoji; un acento, no cromo |
| Copy genérico: *Unlock your potential*, *seamless*, *empower*, *leverage*, *effortless* | Aunque el layout sea bueno, la frase delata plantilla | Reescribe el copy tú. Si una pantalla necesita taglines y helper text para entenderse, el layout está mal |
| Fotos de stock, Midjourney o Unsplash genérico | El modelo no tiene el negocio delante | Fotos reales del local, el equipo, el plato, la propiedad. Si no hay, encarga o ve a fotografiar |
| Números de precio con ancho variable | Se siente barato y «de hobby» | `tabular-nums` (o equivalente) en todo precio, métrica y horario |
| Misma densidad y el mismo radio en todas las secciones | No hay ritmo | Alterna densidad, already, full-bleed; un solo radio de sistema, no diez |
| Skills o prompts «anti-slop» sin dirección propia | El skill solo reduce el default; no elige por ti | DESIGN.md + 3–5 referencias *y* 2–3 anti-referencias (lo que no debe parecerse) |

Herramientas de revisión que aparecen en X y se pueden usar en el paso de QA (no sustituyen el ojo):

- Linter de design system de Emil Kowalski (colores crudos, `p-[13px]`, HTML crudo vs componente, segundo botón primario): [x.com/emilkowalski/status/2125538455144775715](https://x.com/emilkowalski/status/2125538455144775715)
- `npx @enmera/ai-design-check` (70 reglas, retícula 4 px, botones con degradado, «Welcome back, Alex! 👋»): [x.com/sinanyorulmazz/status/2116531845839851723](https://x.com/sinanyorulmazz/status/2116531845839851723) — el autor aclara que el degradado es lo que *notas*; el spacing fuera de 4 px es lo que *sientes* ([respuesta](https://x.com/sinanyorulmazz/status/2116585056223543675))
- Revisión adversaria en el navegador (Impeccable + recorrer flujos de verdad), mencionada en el hilo de @kirtandopamine

---

## 2. Flujo de trabajo y prompts reutilizables

### Los 8 pasos (actualizados)

1. **Elegir tipo y referencias.** 3–5 sitios reales (Godly, Awwwards, Mobbin, Codrops, regards.design, o el local que el cliente sí respeta) *y* 2–3 anti-referencias: «esto no, porque…».
2. **Escribir un DESIGN.md corto** *antes* de una sola línea de UI. Tipo, color, layout, densidad, tono y movimiento en números. Si hace falta, un handbook de marca mínimo (logo, tipo, acento, no-gos) en un paso separado, no mezclado con el frontend.
3. **Aprobar un mock o un frame estático** (Figma, captura de referencia o un HTML quieto). Recién entonces se genera código. Diseñar primero, codear después: es la respuesta que más se repite en el hilo de 305 replies.
4. **Prompt base + receta del nicho** (sección 4). Prohibido «moderno, premium, limpio» como única dirección.
5. **Datos reales desde el primer pase.** Horarios, precios, platos, direcciones, casos borde. El slop también vive en el Lorem y en los 4 dígitos redondos.
6. **Pasada de copy humana.** Corta taglines, helper text y labels secundarios. Si hacen falta para que la pantalla se entienda, el layout está mal.
7. **Motion y QA.** Origin-aware; 150–300 ms; no animar sombras; no animar si el cambio es más largo que la duración. Luego linter / checklist / capturas 1440 y 390.
8. **Una rareza bien terminada.** Un detalle raro (una ligadura, un recorte fotográfico, un número en serie, un mapa dibujado) acabado con cuidado vale más que diez microinteracciones.

### Prompt base (siempre, antes del tipo de sitio)

```
Antes de escribir CSS o JSX, confirma por escrito las decisiones ya tomadas en DESIGN.md.
No improvises una paleta, una fuente ni un layout. Si falta una decisión, pregunta.

Dirección de arte:
- Tipo: [familias, pesos, tracking, tamaño de H1 y de body]
- Color: [fondo, tinta, un acento y para qué se usa]
- Layout: [asimétrico / editorial / denso / full-bleed — describe la home en una frase]
- Densidad y radio: [valores]
- Motion: [duraciones en ms, easing, qué se anima y qué no; origin-aware]
- Referencias: [URLs]
- Anti-referencias: [URLs o descripciones de lo que no debe parecerse]

Prohibido como default: degradado morado/azul, hero centrado de dos CTAs, tres tarjetas con icono, fade-up en cada sección, copy con «seamless / empower / unlock your potential», iconos emoji, sombras grandes en reposo, pesos 700–800 en titulares, colores crudos o paddings impares fuera de tokens.

Usa fotos y datos reales del negocio. Revisa retícula de 4 px, tabular-nums en precios y métricas, bordes hairline.
```

### Cómo pedir el DESIGN.md

```
Redacta un DESIGN.md de una página para [negocio] en [ciudad].
Incluye: personalidad en 3 adjetivos precisos (no «moderno»), par tipográfico con justificación, paleta con roles, layout de la home, densidad, motion en números, 3 referencias y 2 anti-referencias, y lo que esta web no debe parecerse (plantilla de restaurante, clinic theme de WordPress, etc.).
No generes código.
```

### Prompt de revisión

```
Mira estas capturas (1440 y 390) como si fueras un director de arte que odia el AI slop.
Lista cada tell (tipo, color, layout, copy, motion, foto, spacing).
Propón un cambio concreto por tell. No reescribas el sitio entero.
Luego recorre el flujo de [reservar / pedir cita / ver una propiedad / comprar] y señala fricción.
```

Los prompts por tipo de la primera pasada (landing, e-commerce, portfolio, restaurante, clínica, SaaS, marca personal, eventos) siguen valiendo. Las recetas de la sección 4 los sustituyen cuando el nicho está claro: son más específicas y ya incorporan lo que se vio en X.

---

## 3. Tipo, color, layout y movimiento

**Tipo.** Dos familias bastan, a veces una. Declara pesos (mejor 400/500/600 que 400/700). Tracking en mayúsculas y en el H1. Un sitio «caro» suele llevar titulares en 500–600, no en 800. Inter está bien *solo* si se afina; si no, cámbiala en el primer pase: «Inter sobre tarjetas blancas es la mayor parte del look vibe-coded» ([@BuildWithCausal](https://x.com/BuildWithCausal/status/2116406001809109257)). Dogan Ural recomienda describir el *carácter* de la tipografía («bold condensed industrial») en vez de un nombre de fuente si el modelo va a elegir mal el archivo.

**Color.** Un acento con un trabajo (CTA, o estado, o dato), no un arcoíris. Fondos con temperatura (papel, noche, piedra, clínica fría) y no blanco por defecto. Evita el degradado púrpura/azul aunque «quede bien» en el primer render. Paleta *antes* que componentes.

**Layout.** Asimetría editorial o grid rígido, elige uno y cúmplelo. Hero a la izquierda + visual a la derecha es un patrón premium que aún no está tan quemado como el hero centrado. Corta cromo: taglines y labels secundarios. Si la pantalla los necesita, el layout está mal ([@sprucekhalifa](https://x.com/sprucekhalifa/status/2116456770394534277)). Retícula de 4 px o nada; bordes hairline; sin sombras en reposo.

**Motion.** Del [método Emil](METODO-EMIL-KOWALSKI.md) y de posts nuevos de 2026:

- UI: 150–300 ms; la duración escala con tamaño y distancia.
- Ease-out al entrar; origin-aware (la capa crece desde el botón o la tarjeta que la abrió), no desde el centro de la pantalla. Es el «pet peeve» más repetido de Emil en 2026: [origen consciente](https://x.com/emilkowalski/status/2123029498694410401).
- Stagger corto en listas; no en cada sección de marketing.
- No animar box-shadow. Blur pequeño, si acaso.
- Overlay y diálogo, misma duración.
- Si el cambio (delta) dura más que la animación, **no animes**: añade ruido visual. Lo explicó Rauno Freiberg: [skip si delta > duration](https://x.com/raunofreiberg/status/1889700377584431479).

**Copy.** Rauno también señala el typography/copy flojo: puntuación redundante y frases que dicen lo mismo dos veces («clean interfaces that feel effortless»). Recorta. Una rareza bien escrita (un dato local, un nombre propio, una hora) hace más que un eslogan.

---

## 4. Recetas de dirección de arte por nicho

Cada receta es un punto de partida, no una plantilla nueva. Cambia al menos un eje (tipo, paleta o layout) para *este* cliente. Si dos demos de Escalatam se parecen, una de las dos no tiene dirección.

### Restaurantes y hospitalidad

- **Tipo:** una serif de menú o display con carácter (no Instrument Serif por defecto) + una grotesque compacta para precios y horarios. Precios en `tabular-nums`.
- **Color:** sale de la comida, la vajilla o la pared real. Evita el rojo «pizza stock» y el crema + terracota de moda.
- **Layout:** foto o plato a sangre, menú como objeto tipográfico (no tres cards de «Ambiente / Menú / Reservas»). Horario, mapa y WhatsApp visibles sin scroll eterno. En móvil, reservar o llamar arriba.
- **Foto:** el plato de esta semana, la barra a las 21 h, la calle. Nada de stock de pasta.
- **Motion:** casi nada; un crossfade lento en el plato del día, no fade-up de secciones.
- **Conversión:** reserva o pedido en un toque. Carga < 3 s. La propuesta no habla de «web moderna»: habla de mesas vacías entre semana y de que el Google Business no muestra el menú.

### Clínicas, consultas y med spas

- **Tipo:** grotesk o humanista clara, alta legibilidad, peso 500 en titulares. Cero display juguetona. Mucho aire, cuerpos 16–18 px.
- **Color:** un acento clínico o de la marca real (no lila spa genérico). Fondos fríos o papel, no degradados «wellness».
- **Layout:** prueba social y especialidad arriba; equipo con nombre y número de colegiado; proceso en pasos reales, no iconos. La ficha de un tratamiento (ej. «Botox cerca de…») puede ser una landing propia para SEO local.
- **Foto:** el consultorio, el equipo, antes/después *con permiso*. Nunca modelos de banco de imágenes con bata.
- **Lo que cambia el negocio:** «bonito ≠ rentable». En med spas lo dijo [@MarcelineWorks](https://x.com/MarcelineWorks/status/2064835844826108127): la web tiene que conseguir reservas, no solo parecer lujo. [@jabel_webdesign](https://x.com/jabel_webdesign/status/2095134660434989543) vende clínica + quiz/funnel + páginas de oferta. Escalatam debe diseñar *y* el camino a la cita (WhatsApp, calendario, landing por servicio).

### Inmobiliaria y desarrollos

- **Tipo:** una serif editorial para el nombre del desarrollo o la zona; sans para fichas, m², precios. Tabular-nums en todas las cifras.
- **Color:** sale del lugar (luz de la costa, piedra, verde del terreno), no azul corporativo inmobiliario.
- **Layout:** vender *estilo de vida*, no un listado. Así cotizó [@floxbystudio](https://x.com/floxbystudio/status/2101117648494788662) un sitio de US$ 3.000: lifestyle, aéreas, mapa, planos. Hero de un espacio real; ficha de propiedad con plano, galería y CTA de visita; mapa que se puede usar.
- **Foto:** aéreas, interiores al atardecer, el barrio. Evita renders genéricos todos iguales; si hay render, que se entienda como render.
- **Conversión:** agendar visita, WhatsApp del asesor, ficha descargable. No tres iconos de «Confianza / Experiencia / Resultados».

### Marca personal y portfolios

- **Tipo:** una familia con voz (puede ser solo una). El nombre es el logo.
- **Color:** uno o dos, repetidos. Nada de paleta «creative agency purple».
- **Layout:** trabajo primero, bio después. Casos con contexto (problema, decisión, resultado), no un grid de thumbs con hover genérico. Un detalle raro bien hecho (una numeración, un índice, un cursor).
- **Copy:** primera persona concreta. Nada de «Ayudo a marcas a desbloquear su potencial».
- **Anti-patrón:** el portfolio que se parece a todos los de Awwwards de 2023 o a un theme de Framer.

### E-commerce y producto

- **Tipo:** grotesk o industrial condensada para producto técnico; serif editorial para marca de estilo de vida. Precios y variantes en tabular-nums.
- **Color y mundo visual:** *antes* de componer, un universo: un fondo no-neutro por defecto, 1–2 acentos de la marca, un material (papel, piedra, metal mate), un tono. Se repite en hero, PDP y packshots. Eso es lo que se pide en storyboards de producto de alta gama: restricción y repetición, no «white for the sake of white».
- **Layout PDP:** foto que enseña el objeto; macro de material (justifica el precio); uso en contexto; un bloque de confianza (envío, devolución) sin iconos de pastel. Un CTA, no dos equivalentes.
- **Foto:** el producto real, no un mock 3D genérico. Que el recorte, la luz y el fondo se repitan.
- **Prompt útil de dirección** (editorial, hero a la izquierda, producto a la derecha, serif oversized + sans geométrica): [@doganuraldesign](https://x.com/doganuraldesign/status/2086545458235679044). Úsalo como *vocabulario*, no como paleta fija (mantequilla / menta / blush también puede volverse default si lo copiamos en todas las demos).

### Eventos, bodas y RSVP

- **Tipo:** una display o una script usada con miseria (un nombre, no todo el párrafo) + una sans para fecha, hora, mapa y RSVP.
- **Color:** del lugar o de la papelería real (tinta, sobre, flor). Evita rosa palo + serif itálica de plantilla de boda.
- **Layout:** fecha y lugar irrefutables arriba; itinerario como tipografía, no como timeline con iconos; RSVP en un toque; mapa y stay tip. En un festival: lineup como objeto gráfico, no cards iguales.
- **Motion:** una sola firma (un velo, un revelado, un número que cuenta hacia la fecha). El resto, quieto.
- **Foto:** el espacio, los novios o el cartel real. Prohibido stock de «manos con anillos».

### Otras notas rápidas

- **SaaS / producto digital:** las reglas de @_def y de Emil aplican al milímetro: un acento, 4 px, tabular-nums, hairline, headings 500–600, linter de sistema. Dashboard: label → valor → cambio; un patrón de header de card; un dato destacado en la gráfica, no arcoíris.
- **Servicios locales (pintura, cristalería, talleres):** Alex Lathery avisa la tensión entre estética vintage y contenido que posiciona. Se puede tener carácter *y* páginas que ranqueen. @seaniobawnio documentó US$ 3.000 / 7 días para una cristalería en WordPress, con IA como activo, no como reemplazo: [post](https://x.com/seaniobawnio/status/2107153668315476189).
- **Piensa en dinero, no solo en «único».** @levelsio, al ver un rediseño: lo de la izquierda era más único y simple; lo de la derecha, «como cualquier otra web» — y pide A/B test de lo que *hace más dinero* ([post](https://x.com/levelsio/status/1834565295827980612)).

---

## 5. Índice de hilos y posts reales

Solo URLs que salieron de la API. El índice agrupa por tema; hay más de 60 entradas.

### Criterio, motion y sistemas

| URL | Cuenta | Idea |
|---|---|---|
| [2061426518333571576](https://x.com/emilkowalski/status/2061426518333571576) | @emilkowalski | Duración 150–300 ms en UI; escala con tamaño y distancia |
| [2075188252877672732](https://x.com/emilkowalski/status/2075188252877672732) | @emilkowalski | Vocabulario preciso de motion (stagger, origin-aware, crossfade) |
| [2079180760741728302](https://x.com/emilkowalski/status/2079180760741728302) | @emilkowalski | Ease-out al entrar; no decorar cada sección |
| [2077404975555031509](https://x.com/emilkowalski/status/2077404975555031509) | @emilkowalski | No animar sombras |
| [2077745381299961872](https://x.com/emilkowalski/status/2077745381299961872) | @emilkowalski | Overlay y diálogo, misma duración |
| [2043666802404696483](https://x.com/emilkowalski/status/2043666802404696483) | @emilkowalski | Stagger y dirección |
| [2108531407786242389](https://x.com/emilkowalski/status/2108531407786242389) | @emilkowalski | Detalle de craft en interfaces reales |
| [2103124466352210045](https://x.com/emilkowalski/status/2103124466352210045) | @emilkowalski | Timing y easing en componentes |
| [2104634532154524054](https://x.com/emilkowalski/status/2104634532154524054) | @emilkowalski | Menos motion, más intención |
| [2109277388437868623](https://x.com/emilkowalski/status/2109277388437868623) | @emilkowalski | Pulido de microinteracciones |
| [2102798004281635184](https://x.com/emilkowalski/status/2102798004281635184) | @emilkowalski | Qué no animar |
| [2033543717890465985](https://x.com/emilkowalski/status/2033543717890465985) | @emilkowalski | Base del método de motion |
| [2125538455144775715](https://x.com/emilkowalski/status/2125538455144775715) | @emilkowalski | Linter de design system (25 nov 2026): colores crudos, `p-[13px]`, HTML crudo vs componente, segundo botón primario |
| [2123029498694410401](https://x.com/emilkowalski/status/2123029498694410401) | @emilkowalski | Origin-aware: la animación escala desde el trigger |
| [1889700377584431479](https://x.com/raunofreiberg/status/1889700377584431479) | @raunofreiberg | Si el delta es mayor que la duración, no animes |
| [2112200648800243759](https://x.com/raunofreiberg/status/2112200648800243759) | @raunofreiberg | Crítica de typography y copy: puntuación de más, «effortless» redundante |
| [2074832501520887808](https://x.com/raunofreiberg/status/2074832501520887808) | @raunofreiberg | Oficio de interfaz; menos adorno |
| [2099534239272177747](https://x.com/shadcn/status/2099534239272177747) | @shadcn | El default de shadcn también se siente plantilla si no hay dirección |
| [1896247127401283934](https://x.com/shadcn/status/1896247127401283934) | @shadcn | Componentes ≠ identidad |
| [2115188253863071921](https://x.com/_def/status/2115188253863071921) | @_def | Uniforme vibe-coded vs look caro: un acento, 4 px, tabular-nums, hairline, headings 500–600, sin sombras en reposo. Constraints > chrome |

### Cómo no verse «vibe-coded»

| URL | Cuenta | Idea |
|---|---|---|
| [2116230634565943670](https://x.com/kirtandopamine/status/2116230634565943670) | @kirtandopamine | Hilo raíz: «how to make something look not like it was vibe coded??» (305 replies). Empezar por aquí |
| [2116332220759855160](https://x.com/cujojp/status/2116332220759855160) | @cujojp | Respuesta de peso en ese hilo: dirección y referencias |
| [2116238127622730097](https://x.com/builtbysimon/status/2116238127622730097) | @builtbysimon | Oficio por encima del prompt mágico |
| [2116272253147185624](https://x.com/IrvinZhan/status/2116272253147185624) | @IrvinZhan | Evitar el look de plantilla de agente |
| [2116560663254638739](https://x.com/vibepuddle/status/2116560663254638739) | @vibepuddle | Mata defaults; una familia y un acento; borra seamless / empower / leverage |
| [2116556635669696804](https://x.com/fwdwebdesign/status/2116556635669696804) | @fwdwebdesign | Criterio de agencia sobre el mismo hilo |
| [2116554284841959473](https://x.com/littledeath2005/status/2116554284841959473) | @littledeath2005 | Reescribe el copy; «Unlock your potential» = plantilla |
| [2116512715850350618](https://x.com/JonahNull1/status/2116512715850350618) | @JonahNull1 | Diseña primero; luego entrega el mock aprobado |
| [2116509928701493302](https://x.com/LifeByThunder/status/2116509928701493302) | @LifeByThunder | Capturas + instrucciones específicas, no adjetivos |
| [2116504885357068367](https://x.com/huansenFDE/status/2116504885357068367) | @huansenFDE | Cierra el design system *antes* de generar; si no, el modelo elige de nuevo cada vez |
| [2116476912059224080](https://x.com/Oliver_Clingain/status/2116476912059224080) | @Oliver_Clingain | Fuentes custom + fotos reales: lo que más rápido mata el look de template |
| [2116567593624502685](https://x.com/murwin/status/2116567593624502685) | @murwin | Referencias *y* anti-referencias |
| [2116456342663897272](https://x.com/leocanela279/status/2116456342663897272) | @leocanela279 | Repo / skill [how-tf-can-ai-have-taste](https://github.com/Leocanela279/how-tf-can-ai-have-taste) |
| [2116232611328610762](https://x.com/mredu000/status/2116232611328610762) | @mredu000 | Flujo: escarbar X → skills → Figma MCP |
| [2116472851985490271](https://x.com/c_kapsalis_tech/status/2116472851985490271) | @c_kapsalis_tech | Impeccable + revisión adversaria en el navegador |
| [2116456770394534277](https://x.com/sprucekhalifa/status/2116456770394534277) | @sprucekhalifa | Corta taglines, helper text y labels secundarios; si hacen falta, el layout está mal |
| [2116454906949255327](https://x.com/wytcab/status/2116454906949255327) | @wytcab | Handbook de marca completo *antes* del pase de frontend |
| [2116450158456061958](https://x.com/muzil7734/status/2116450158456061958) | @muzil7734 | Datos reales y casos borde; spacing y tipo consistentes; quita un adorno cada vez hasta que solo quede lo que se gana su sitio |
| [2116427032028680592](https://x.com/yasharyaaa/status/2116427032028680592) | @yasharyaaa | Elige un detalle raro y termínalo bien |
| [2116437144751477131](https://x.com/SamNato/status/2116437144751477131) | @SamNato | Nada de iconos emoji; iconos vectoriales; dale plantillas de muestra y que te entreviste |
| [2116406001809109257](https://x.com/BuildWithCausal/status/2116406001809109257) | @BuildWithCausal | Cambia la fuente primero: Inter sobre cards blancas es la mayor parte del look |
| [2116450208703992037](https://x.com/kirtandopamine/status/2116450208703992037) | @kirtandopamine | Matiz: Inter puede verse bien si se ajustan peso y tracking |
| [1981988770867249574](https://x.com/samirande_/status/1981988770867249574) | @samirande_ | El degradado morado + azul como tell masivo |
| [2088984167488851974](https://x.com/forgebitz/status/2088984167488851974) | @forgebitz | El slop se puede corregir en 1–2 prompts… si sabes qué pedir; por eso delata prisa no haberlo hecho |
| [2067992904602091846](https://x.com/jackprice/status/2067992904602091846) | @jackprice | «Best way to make vibe coded app NOT look vibe coded» (hilo; la búsqueda por conversation_id no devolvió replies en esta pasada) |
| [1834565295827980612](https://x.com/levelsio/status/1834565295827980612) | @levelsio | Lo único y simple gana a «como cualquier otra web»; A/B test de lo que hace dinero |
| [1829854183878799604](https://x.com/levelsio/status/1829854183878799604) | @levelsio | «Nice but now it looks like every other website» |
| [2103181685672272103](https://x.com/razvanbadea/status/2103181685672272103) | @razvanbadea | Cloudflare publicó una landing generada y el rechazo fue inmediato: el slop daña la marca incluso a empresas grandes |
| [2107560525798478317](https://x.com/razvanbadea/status/2107560525798478317) | @razvanbadea | El founder que «hace la web en 1–2 días» acaba en 50+ horas de rehacer slop: más caro que un diseñador a ~US$ 3.000 |

### Prompts, skills y dirección visual

| URL | Cuenta | Idea |
|---|---|---|
| [2089634658329952437](https://x.com/VaibhavSisinty/status/2089634658329952437) | @VaibhavSisinty | Skills y flujo para frontend con criterio |
| [2089634670732550617](https://x.com/VaibhavSisinty/status/2089634670732550617) | @VaibhavSisinty | Continuación del hilo de skills |
| [2066906020740534581](https://x.com/pbakaus/status/2066906020740534581) | @pbakaus | Skill Impeccable: taste como sistema, no como adjetivo |
| [2051694883727987096](https://x.com/nutlope/status/2051694883727987096) | @nutlope | Hallmark / referencias de calidad para agentes |
| [2111791781809655955](https://x.com/Frozune/status/2111791781809655955) | @Frozune | Recursos para salir del default |
| [2086476033197506822](https://x.com/shubhranshu2009/status/2086476033197506822) | @shubhranshu2009 | Prácticas concretas anti-slop |
| [2073182956747661722](https://x.com/kenzofomo/status/2073182956747661722) | @kenzofomo | Criterio visual en productos generados |
| [2026271916227711304](https://x.com/viktoroddy/status/2026271916227711304) | @viktoroddy | Dirección frente a defaults |
| [2094009989220430084](https://x.com/viktoroddy/status/2094009989220430084) | @viktoroddy | Más oficio, menos plantilla |
| [2084344380513829077](https://x.com/heyanjey/status/2084344380513829077) | @heyanjey | Cómo se nota el trabajo dirigido |
| [2117661683393130915](https://x.com/showpiecedotso/status/2117661683393130915) | @showpiecedotso | Show, don’t tell: demos que se ven hechas a propósito |
| [2119517961417609667](https://x.com/this_is_Suraj/status/2119517961417609667) | @this_is_Suraj | Ejemplos y contrastes de UI generada vs dirigida |
| [2033942704166736105](https://x.com/Aayush_Web/status/2033942704166736105) | @Aayush_Web | Decide la paleta *antes* de construir |
| [2086545458235679044](https://x.com/doganuraldesign/status/2086545458235679044) | @doganuraldesign | Prompt editorial: serif oversized, sans geométrica, hero a la izquierda, producto a la derecha, aire, paleta corta |
| [2086828099979669670](https://x.com/doganuraldesign/status/2086828099979669670) | @doganuraldesign | Hero cinematográfico oscuro, foto inmersiva, tipografía condensada (usar con tino: no en una clínica) |
| [2089367040393875713](https://x.com/doganuraldesign/status/2089367040393875713) | @doganuraldesign | Industrial editorial: grotesk condensada, marfil/taupe, acento espresso, grano de papel |
| [2091251072748687552](https://x.com/doganuraldesign/status/2091251072748687552) | @doganuraldesign | Describe el carácter tipográfico; no hace falta nombrar la fuente para que el modelo acierte el *look* |
| [2116531845839851723](https://x.com/sinanyorulmazz/status/2116531845839851723) | @sinanyorulmazz | `npx @enmera/ai-design-check`: 70 reglas, before/after, skill para agentes |
| [2116585056223543675](https://x.com/sinanyorulmazz/status/2116585056223543675) | @sinanyorulmazz | En un dashboard: 79 hallazgos de spacing vs 29 de degradado. El degradado se nota; el spacing se siente |

### Ventas, precios, SEO y outreach (agencias y locales)

| URL | Cuenta | Idea |
|---|---|---|
| [1996600632476668407](https://x.com/AlexLathery/status/1996600632476668407) | @AlexLathery | SEO + diseño juntos; el mantenimiento no es «cambiar un texto» |
| [1733905726806909255](https://x.com/AlexLathery/status/1733905726806909255) | @AlexLathery | Primer sitio de 5 cifras tras meses de trabajo gratis o a US$ 500 |
| [1625511514865033216](https://x.com/AlexLathery/status/1625511514865033216) | @AlexLathery | Retainers de SEO a US$ 750/mes que no hacen nada: no copies eso; úsalo para contrastar un mantenimiento *real* |
| [1803437935443980772](https://x.com/AlexLathery/status/1803437935443980772) | @AlexLathery | Baja el coste con proceso; no te limites a subir precios |
| [1986287348477534607](https://x.com/tricklowe/status/1986287348477534607) | @tricklowe | Logo a US$ 300 que escala a sitio de 5 páginas a US$ 2.500 |
| [1984337493073019096](https://x.com/tricklowe/status/1984337493073019096) | @tricklowe | Rebuild SEO: pack 3 a 60 días, #1 a 90, AI overview + lead a 120 |
| [2107153668315476189](https://x.com/seaniobawnio/status/2107153668315476189) | @seaniobawnio | Cristalería en WordPress a US$ 3.000 en 7 días; IA como activo |
| [2101117648494788662](https://x.com/floxbystudio/status/2101117648494788662) | @floxbystudio | Inmobiliaria a US$ 3.000: lifestyle, aéreas, mapa, planos |
| [2064835844826108127](https://x.com/MarcelineWorks/status/2064835844826108127) | @MarcelineWorks | Med spa: bonito no es rentable; la web tiene que reservar |
| [2095134660434989543](https://x.com/jabel_webdesign/status/2095134660434989543) | @jabel_webdesign | Clínica + quiz/funnel + páginas de oferta |
| [2102915921098461653](https://x.com/troyaitken_/status/2102915921098461653) | @troyaitken_ | Lead scoring antes de escribir: sin equipo/careers, sin precios ni proceso, copyright viejo, sin stack de marketing = merece contacto |
| [2084184127557743098](https://x.com/vibelancer/status/2084184127557743098) | @vibelancer | Locales ya pagan ~US$ 10k a agencias que tardan meses; hay quien entrega por ~US$ 1.5k con Lovable+Claude. No compitas solo en precio: compite en gusto + velocidad + cuidado |
| [1867123649297469723](https://x.com/javiiniguez/status/1867123649297469723) | @javiiniguez | España, Kit Digital: paquete de ~€ 2.000 con identidad + web + SEO básico + 12 meses de mantenimiento y hosting, botón de WhatsApp, WPO, entrega en 60 días |
| [2122479730129506436](https://x.com/styleforgeai/status/2122479730129506436) | @styleforgeai | Un sitio de US$ 5.000 se cobra una vez; un retainer de US$ 400/mes son US$ 4.800 al año. Diez clientes: US$ 48.000 recurrentes |
| [1628495876283924482](https://x.com/thejohnkakuk/status/1628495876283924482) | @thejohnkakuk | De US$ 50 en Upwork a una oferta de US$ 8.750: el salto es de valor empaquetado, no de «cobrar más por lo mismo» |

---

## 6. Oportunidades

### Lo que el mercado ya está pagando (y lo que no debemos copiar)

- **El rango serio para un sitio local bien hecho está en miles, no en US$ 100–150.** Ejemplos reales en X: cristalería a US$ 3.000 en 7 días; inmobiliaria a US$ 3.000; logo de US$ 300 que escala a web de US$ 2.500; primer proyecto de 5 cifras de Alex Lathery después de una temporada de tickets bajos. Hay quien cierra a US$ 8.750 cuando empaqueta más valor. La tentación de US$ 1.500 «porque Lovable es rápido» existe, y los locales *ya pagan* ~US$ 10k a agencias lentas. Escalatam debe situarse en **calidad de dirección + velocidad + cuidado**, no en la carrera a la baja.
- **El dinero recurrente supera al one-shot.** Un retainer de US$ 400/mes supera en un año a un sitio de US$ 5.000. Eso refuerza lo que ya está en `VALOR-DE-VENTA.md`: mantenimiento, SEO y mejora continua. Ojo: un retainer de SEO a US$ 750/mes que «no hace nada» envenena el mercado. Ofrece un cuidado comprobable (qué se publicó, qué posición cambió, qué lead entró).
- **España y Kit Digital.** @javiiniguez documenta un paquete de ~€ 2.000 (identidad + web + SEO básico + 12 meses de hosting y mantenimiento, WhatsApp, WPO, 60 días). Es un ancla real del mercado español y un canal. También es un suelo: si Escalatam entra por Kit Digital, el diferencial no puede ser «cumplir el expediente», tiene que ser que la web no se sienta como las otras mil del kit, y que el año de cuidado sea de verdad.
- **Upsell por ticket bajo.** El camino logo → sitio (US$ 300 → US$ 2.500) funciona. Una demo o un activo de marca puede abrir la puerta sin regalar el proyecto entero.
- **Diseño + SEO + conversión es la oferta escasa.** Alex Lathery lo insiste; Tricklowe muestra timelines de posicionamiento; en clínicas, el funnel y la landing por tratamiento importan más que el look spa. En med spas, pretty ≠ profitable. La demo gana la reunión; la reserva, el mapa y el «Botox cerca de [barrio]» ganan el retainer.
- **Velocidad de carga es parte del diseño.** En el mercado hispano se repite: más de 3 s y se pierde el cliente. «Limpio y rápido» no es un adjetivo de slop si se demuestra con una mejora de leads o ventas.

### Cómo encontrar y abordar al cliente (sin spam)

Lead scoring de @troyaitken_, útil antes de gastar una demo:

- No hay página de equipo ni de proceso.
- No hay precios, o el copyright es de hace años.
- No se ve stack de marketing (ni analytics serio, ni WhatsApp visible, ni reservas).
- El Google Business está vivo y la web no.

Ahí una preview con fotos *de su local* y copy *de su calle* es el pitch. No se vende «hacemos webs con IA». Se enseña la web que podrían tener el lunes, y se habla del dolor (mesas vacías, teléfono que no se ve en móvil, fichas de propiedades que no se pueden compartir, tratamientos que no posicionan).

La propuesta toca el dolor, no el stack. Ofrecer un poco más de lo prometido (un QR de menú, una landing de un servicio, la ficha descargable) cierra más que un descuento.

### Cómo debe construir Escalatam (para que las demos no se parezcan entre sí)

- DESIGN.md + mock antes de código, siempre.
- Fotos reales y una fuente con carácter (o Inter *afinada*) en el primer pase.
- Receta de nicho distinta por vertical; si dos restaurantes se parecen, falla la dirección.
- Copy humano; un detalle raro terminado.
- Linter + capturas + un flujo real (reservar, escribir, agendar) en el navegador.
- No publicitar el uso de IA. El cliente paga para no sentirlo.

### Lo que no hay que copiar

- Compilaciones virales de «10 skills that kill AI slop» como fuente primaria: reciclan lo mismo y acaban siendo otro default.
- El paquete vacío de SEO mensual.
- Prometer «como Awwwards» a un taller que lo que necesita es una llamada en un toque.
- Reutilizar la paleta editorial mantequilla/menta/blush o el trío Space Grotesk + Instrument Serif en todas las demos: es el siguiente slop.
- Inventar pruebas o reviews. Si no hay caso, se enseña la demo y se calla el testimonial.

### Pitch corto (español)

«No hacemos webs que se vean hechas con una plantilla ni con un chat. Primero cerramos la dirección (tipo, color, layout, cómo se reserva o se llama) y buscamos referencias de *su* oficio, no de un theme genérico. Luego construimos una preview con sus fotos y sus datos. El objetivo no es que se vea “moderna”: es que en el teléfono se entienda quiénes son, se pueda reservar o escribir en un toque, y que no se parezca a la de al lado.»

---

## Skills, artículos y repos citados (no son posts de X, son fuentes abiertas)

- [Improving frontend design through Skills](https://claude.com/resources/articles/improving-frontend-design-through-skills) (Anthropic, 12 nov 2025), y el skill [frontend-design](https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md)
- [Make your website look less vibe-coded](https://www.regards.design/blog/make-website-look-less-vibe-coded) (regards.design)
- [How to make AI websites not look AI](https://www.askglitch.com/guides/how-to-make-ai-websites-not-look-ai)
- Skills abiertas que la gente cita en X: [pbakaus/impeccable](https://github.com/pbakaus/impeccable), [Nutlope/hallmark](https://github.com/Nutlope/hallmark), [claudiusararu/unslop-ui-skill](https://github.com/claudiusararu/unslop-ui-skill), [emilkowalski/skills](https://github.com/emilkowalski/skills), [enmerasoftware/ai-design-check](https://github.com/enmerasoftware/ai-design-check), [Leocanela279/how-tf-can-ai-have-taste](https://github.com/Leocanela279/how-tf-can-ai-have-taste)
- Referencias visuales: Godly, Mobbin, Awwwards, Codrops, regards.design, Subframe Inspiration, sitepeel.dev

Documentos internos relacionados: [`SOP.md`](SOP.md), [`VALOR-DE-VENTA.md`](VALOR-DE-VENTA.md), [`METODO-EMIL-KOWALSKI.md`](METODO-EMIL-KOWALSKI.md).
