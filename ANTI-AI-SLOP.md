# Anti AI slop — cómo crear webs de todo tipo que no se sientan generadas

Investigación para Escalatam, 26 de noviembre de 2026 (hora de Caracas, UTC−4). Fuentes: posts públicos de X leídos con la API, artículos y skills abiertas. Todas las URLs de X de la sección 4 salieron de esos resultados; no hay enlaces inventados.

Este documento no sustituye al [`SOP.md`](SOP.md), al [`VALOR-DE-VENTA.md`](VALOR-DE-VENTA.md) ni al [`METODO-EMIL-KOWALSKI.md`](METODO-EMIL-KOWALSKI.md). Complementa el flujo: primero se elige una dirección visual y se evitan los defaults del modelo; después se construye con el SOP y se vende con las funciones de valor.

## La idea central

El problema no es que la IA «no sepa diseñar». El problema, que Anthropic llama *distributional convergence*, es que sin dirección el modelo elige lo más probable: Inter, degradado morado sobre blanco, hero centrado con dos botones, tres tarjetas con icono y poco movimiento. Lo dijo Anthropic en [Improving frontend design through Skills](https://claude.com/resources/articles/improving-frontend-design-through-skills) (12 de noviembre de 2025) y lo repiten diseñadores y vibecoders en X.

Una lista de cosas prohibidas no basta. Si prohíbes Inter y el degradado morado, el modelo salta al siguiente default: fondo crema con acento terracota, una palabra en itálica dentro del titular, fade-and-slide en cada sección, o el trío Space Grotesk + Instrument Serif en itálica + Inter. Lo que sí funciona es **tomar decisiones antes de generar código** y dárselas al agente con referencias reales, no con adjetivos como «moderno, premium, limpio».

En 2026, «que no se vea hecha con IA» ya es un brief de diseño. Eso es una oportunidad para Escalatam: cualquiera puede sacar una web en Lovable o v0; casi nadie puede hacer que no se sienta igual que las demás.

---

## 1. Checklist: señales de AI slop y cómo evitar cada una

Usa esto al planear y otra vez al revisar capturas (escritorio 1440 y móvil 390). Si respondes «sí» a tres o más, la web todavía no está lista para un cliente.

| Señal | Por qué delata IA | Qué hacer en su lugar |
|---|---|---|
| Inter, Roboto, Open Sans, Geist o Arial en títulos y cuerpo | Son las caras «seguras» del entrenamiento | Una cara de display con carácter + una sans neutra para el cuerpo. Máximo dos familias. |
| Trío Space Grotesk + Instrument Serif itálica + Inter | Nuevo default de 2026, igual de reconocible | Elige otra pareja; no uses Instrument Serif solo para una palabra en itálica. |
| Degradado morado→azul, «VibeCode purple» `#8B5CF6`, índigo en botones y glow detrás del mockup | El tell #1 desde 2025 | Fondo, tinta y **un** acento (con hex), y 2–3 sitios donde ese acento puede aparecer. Sin degradado de botón por defecto. |
| Fondo crema `#F4F1EA` + acento terracota `#D97757` | Default nuevo: es el acento de Claude, y Anthropic ya lo marca como tell | Tinta el fondo un poco al cálido o al frío, pero no copies esa paleta salvo que el cliente la pida. |
| Fondo casi negro + un acento verde ácido o vermellón, o layout de periódico con filetes y radio 0 | También son clusters del modelo 2026 | Válidos si el brief lo pide. Si no lo pide, no gastes la libertad ahí. |
| Hero centrado: pill/eyebrow + H1 + subtítulo + dos botones + captura inclinada | El esqueleto más repetido de landing SaaS | Alinea a la izquierda o parte en dos. Un solo CTA dominante. Abre con lo más característico del negocio (un plato, un caso, una reserva, una foto real). |
| Tres (o cuatro) tarjetas iguales con icono Lucide en un cuadrado redondeado | «Feature soup»: velocidad, seguridad, lanzamiento | Prueba, números, fotos o un despiece del producto. Si hay tres columnas, que no se vean como el mismo componente clonado. |
| Tarjetas dentro de tarjetas, `rounded-xl border shadow-sm` en todo | El kit shadcn sin tocar | Separa con espacio, un cambio de 3–5 % de luminosidad o una línea fina. La tarjeta solo cuando el bloque es una unidad (un plato, una habitación, un plan). |
| Glassmorphism, blobs, malla, aurora, rejilla de puntos, spotlight | Decoración que no dice nada del negocio | Una textura elegida (grano, papel, trazo, foto) o ninguna. |
| Iconos emoji, sparkles ✨, cohete, escudo, rayo | Sustituyen a fotos e información | Fotos del local, del trabajo o ilustraciones propias. Iconos de una sola librería, y pocos. |
| Copy genérica: «Supercharge your workflow», «Transforma tu negocio», «La plataforma all-in-one», «Simple, transparent pricing» | Podría vender cualquier cosa | Una frase que solo ese cliente podría decir. CTA con la acción real: «Reservar mesa», «Pedir por WhatsApp», «Pedir presupuesto». |
| Cifras inventadas, «+10k usuarios», testimonials falsos, logos de clientes que no existen, contadores en vivo falsos | Es el atajo más rápido a perder confianza | Solo prueba real: reseñas de Google, WhatsApp, fotos, precios, horarios. Si falta un dato, se marca como placeholder o se omite. |
| Rayas em (—) en cada frase, «No es X — es Y», «delve / tapestry / unlock / seamless» | Tic verbal de los modelos | Punto, coma o un guion con espacios. Frases cortas. Tono del cliente, no de un comunicado. |
| Eyebrow en versalitas, labels `01 / 02 / 03`, «A · B · C», una sola palabra del titular en otro color o itálica, `→` en todos los botones | Chrome de plantilla, da igual el nicho | El titular lidera. Numera solo si hay una secuencia real (pasos, timeline). |
| Fade-up o slide-up en cada sección al hacer scroll; `hover:scale-105` en todas las tarjetas | Anthropic lo señala como look generado | Un momento orquestado al cargar o al entrar en una sección clave. El resto del movimiento responde a una acción (abrir, confirmar, arrastrar). |
| El mismo padding y la misma densidad en hero, servicios y cierre | Nadie decidió el ritmo | Aperto donde las cosas van juntas, holgado entre secciones. Escala de 4/8 px. |
| Texto gris `gray-400/500` sobre color, o blanco puro / negro puro sin profundidad | Contraste flojo o look de plantilla | Cuerpo casi negro sobre claro, o slate-200+ sobre oscuro. Contraste AA (4.5:1 cuerpo). |
| Logo solo tipográfico, sin favicon, URL `*.vercel.app` o `*.lovable.app` en producción | Se ve como un prototipo, no como un negocio | Favicon, dominio del cliente, Open Graph, meta description. |
| Menú móvil que oculta los links y se olvida del botón | Fallo típico del agente | Hamburguesa que abre, targets ≥ 44 px, sin scroll horizontal a 375/390 px. |
| shadcn / Tailwind sin personalizar (azul de focus, radios y sombras por defecto) | Se reconoce al instante | Tokens propios en `DESIGN.md`. Si usas shadcn, cámbialo: tipo, radio, color, iconos. |
| Tipografía mono para labels decorativos, o `text-balance` y saltos manuales en todos los titulares | Otra moda del modelo | Mono solo para código o IDs. `text-wrap: pretty` en cuerpo. Titulares de 5–9 palabras, 1–2 líneas. |
| Fotos de stock genéricas, caras de Unsplash, personas generadas, gráficos inventados | El cliente no se reconoce | Fotos del negocio. Si aún no hay, usa color, tipo y un objeto (plato, producto, plano) hasta que lleguen las reales. |

Regla de oro (Filip Wojda en [regards.design](https://www.regards.design/blog/make-website-look-less-vibe-coded)): Inter, un degradado o una tarjeta están bien **si alguien los eligió**. El problema es que lleguen todos juntos, porque nadie tomó una decisión.

---

## 2. Flujo de trabajo y prompts reutilizables

Este flujo sirve en Cursor, Claude, v0, Lovable o Bolt. En v0/Lovable la dirección se decide en el **primer** prompt; después cuesta mucho sacarla del default.

### Paso a paso (antes de escribir CSS)

1. **Inventario del cliente (8–12 hechos solo suyos).** Nombre, barrio o ciudad, horarios, WhatsApp, un número real (años, mesas, casos, habitaciones), materiales, una frase que él usaría, una foto o un objeto característico, un competidor local que no hay que copiar.
2. **Dirección desde webs reales, no desde adjetivos.** 10 minutos en [Godly](https://godly.website), [Mobbin](https://mobbin.com), [Awwwards](https://www.awwwards.com), [Codrops](https://tympanus.net/codrops/), [regards](https://www.regards.design) o capturas propias. Quédate 3–5 secciones (hero, servicios, cierre) y anota *qué* tomas de cada una: «la retícula de este, los titulares apilados de aquel». En X, @IrvinZhan apunta agentes a referencias curadas vía MCP ([Subframe Inspiration](https://www.subframe.com/inspiration)); @builtbysimon recomienda Dribbble/Behance + una hoja de sistema; @cujojp insiste en arrancar con un design system y guardrails.
3. **Cinco decisiones, una línea cada una**, más el movimiento en números. Guárdalas en `DESIGN.md` (o en las rules de Cursor / `CLAUDE.md`) para que sobrevivan al siguiente prompt:
   - Tipo: qué cara lleva los titulares y a qué tamaño; qué cara lleva el cuerpo.
   - Color: fondo, tinta, un acento y dónde puede usarse.
   - Layout: cómo se sientan las secciones (por ejemplo: «alineado a la izquierda, retícula visible, sin tarjetas»).
   - Densidad: cuánto cabe en una pantalla.
   - Tono: cómo suenan las palabras.
   - Movimiento: qué se mueve, cuántos ms, qué curva. Si no lo escribes, aparece el fade-and-slide.
4. **Copia real antes del markup.** Nada de lorem, nada de testimonials inventados. Si falta un dato, se pregunta o se deja marcado.
5. **Construir siguiendo los tokens.** Nada de valores sueltos fuera de la escala.
6. **Comparar capturas con las referencias.** No preguntes «¿se ve bien?». Pregunta qué es distinto: el titular es más pequeño, el acento aparece en seis sitios, todas las secciones tienen el mismo padding. Corrige una diferencia a la vez.
7. **Pasar el checklist de la sección 1** y, si hace falta, un auditor: [Impeccable](https://github.com/pbakaus/impeccable) (`critique`, `polish`), [Hallmark](https://github.com/Nutlope/hallmark) (`audit`, `study`), [frontend-design de Anthropic](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [Taste Skill](https://github.com/Leonxlnx/taste-skill) o [unslop-ui](https://github.com/claudiusararu/unslop-ui-skill). Hay colecciones de `DESIGN.md` inspirados en sitios reales en [awesome-design-md](https://github.com/VoltAgent/awesome-design-md): úsalos como punto de partida y cámbialos; no copies una marca ajena para un cliente.
8. **Probar a 390 px, teclado, contraste, `prefers-reduced-motion`, Lighthouse.** El SOP de este repo sigue aplicando.

### Prompt base (pegar al inicio de cualquier página)

```
Antes de diseñar o escribir código:

1. Lista los defaults genéricos que normalmente elegirías aquí (Inter/Geist, degradado morado-azul, fondo crema + terracota, hero centrado con dos botones, tres tarjetas con icono, fade-up en cada sección, copy tipo "transforma tu negocio"). Evítalos todos, salvo que yo los pida con nombre.
2. Elige UNA dirección visual que encaje con este negocio real y su público. Nombra paleta con hex, 1 o 2 tipografías (con pesos y tamaños), radio, escala de espacio (múltiplos de 4/8) y UN elemento memorable.
3. Explica las decisiones en 4–6 líneas. Luego escribe la copia real. Después el código.
4. No inventes estadísticas, logos, testimonios ni "usuarios activos". Si te falta un dato, márcalo o pregúntame.
5. Un solo CTA principal por pantalla, con la acción real. Respeta prefers-reduced-motion. Revisa a 390, 768 y 1440 px.

Referencias (toma la idea, no copies la marca): [url o descripción de 3 capturas]
Hechos del cliente: [inventario]
La página: [qué es y para quién]
```

En Cursor o Claude Code, guarda este bloque en rules / `CLAUDE.md` y deja el inventario y las referencias en `DESIGN.md`.

### Prompt de dirección (`DESIGN.md` mínimo)

```
Escribe DESIGN.md para este proyecto, sin código todavía.
Negocio: {nicho} en {ciudad}. Público: {quién reserva o compra}.
Referencias: {3 sitios o capturas y qué tomar de cada una}.
Incluye: paleta nombrada (hex), dos tipografías y escala, layout (alineación, retícula, uso de tarjetas), densidad, tono de voz (palabras prohibidas), movimiento (qué, ms, curva), y 8 cosas que esta web no hará porque serían slop.
```

### Prompt de revisión (después de generar)

```
Abre la página a 1440 y 390. Compárala con estas referencias: {urls}.
No me digas si "se ve bien". Lista las 5 diferencias más grandes (tipo, color, jerarquía, ritmo, copy).
Corrige solo esas cinco, una por una, sin introducir Inter, degradados púrpura, eyebrow pills ni fade-up en cada sección.
Luego pasa este checklist: {pega la tabla corta de la sección 1}.
```

### Plantillas por tipo de sitio

**Landing (servicio o campaña)**  
Historia, no plantilla SaaS. Orden: promesa concreta → prueba (caso, cifra real, foto) → cómo funciona → oferta → un CTA. Evita tira de logos falsos y pricing de tres columnas «Most Popular» si no hay planes. El memorable puede ser un recorte tipográfico, una foto a sangrado o un número enorme del resultado.

**E-commerce / catálogo local**  
La mercancía es el diseño. Fotos grandes, precio claro con `tabular-nums`, filtros simples, ficha con envío/retiro/WhatsApp. No conviertas cada producto en una glass card. CTA: «Añadir» o «Pedir por WhatsApp», nunca «Get Started». Fondo y tipo deben dejar respirar la foto.

**Portfolio (fotógrafa, arquitecto, tatuador, marca personal)**  
La obra manda: tipografía discreta, márgenes generosos, una familia o dos, almost no iconos. Index con ritmo irregular (no una grilla de 3×N idéntica). Proyecto = caso, no tarjeta con emoji. Evita el hero «Hola, soy X, creative director» centrado con tres pills de skills.

**Restaurante / café / bar**  
Apetito: fotos propias, carta que se pueda actualizar, horarios, mapa, reserva o WhatsApp con mensaje preescrito. Dirección posible: editorial (serif de carta, papel, una tinta de vino o de brasa) o cruda (condensada, foto a sangre). Nada de iconos de tenedor en círculos ni «una experiencia culinaria única».

**Clínica / dental / estética / psicología**  
Confianza: mucho contraste, tipo legible (≥ 16 px cuerpo), reserva en pocos pasos, equipo con nombre y foto real, direcciones y seguros. Paleta serena, no el morado «wellness» de plantilla ni stock de bata blanca. Un acento contenido. Movimiento mínimo: el formulario y el calendario sí pueden sentirse nativos (ver método Emil).

**SaaS / producto**  
Aquí el default es más fuerte. Rompe el orden canónico. Muestra el producto de verdad (UI real, no un mockup inclinado sobre un glow). Una idea de layout (manual técnico, halftone, retícula de diseño, no tres features con rayo/escudo/cohete). Copy específica de lo que hace el producto. @shadcn lo resume así: el agente puede «compilar» y aun así romper el design system; hay que verificar tokens, no solo que el botón se vea.

**Marca personal / creador**  
Una voz, no un kit de «personal brand». Foto o retrato con criterio, una frase que suene a esa persona, trabajos o prensa reales, un camino de contacto. Evita degradados, orbes y «Empowering teams to unlock their potential». El memorable puede ser un color inesperado o una familia display rara, usada con disciplina.

**Eventos / bodas / lanzamiento**  
Fecha, lugar, itinerario, RSVP o entrada. Tipografía con ocasión (una display expresiva + una de lectura). Una imagen o un objeto (sello, listón, recinto) repetido con tino. No confetti de iconos ni countdown genérico si no aporta. El scroll puede contar la historia del día, como una página de producto de Apple: un momento, no veinte fades.

### Vocabulario de movimiento para el agente

Emil Kowalski insiste en que, para sacar buen motion de una IA, hay que pedirlo con palabras precisas ([animations.dev/vocabulary](https://animations.dev/vocabulary)). En vez de «hazlo más smooth», usa: *stagger*, *direction-aware*, *crossfade*, *layout animation*, *rubber-banding*, *origin-aware*, *choreograph*, *interruptible*. Skills útiles (MIT): [emilkowalski/skills](https://github.com/emilkowalski/skills) (`/animate`, `/review-animations`, `/find-animation-opportunities`, `/choreograph`, `/apple-design`, `/animation-performance`, `/animation-vocabulary`).

---

## 3. Reglas de tipografía, color, layout y movimiento

### Tipografía

- Máximo dos familias, con contraste claro (display con voz + cuerpo neutro). Una sola familia también vale, usando peso y tamaño para la jerarquía.
- No elijas la cara por costumbre. Ejemplos de dirección, no recetas obligatorias: editorial (Archivo + Newsreader); carta de restaurante (una serif de texto + una condensed para el nombre); clínica (una grotesk muy legible, sin display caprichosa); portfolio (una serif grande y márgenes anchos).
- Escala matemática (×1.25 en producto, ×1.333 en editorial). Cuerpo ≥ 16 px. Medida 60–80 caracteres. Alto de línea un poco mayor en serif que en sans.
- Peso para jerarquía, no una tercera familia. En titulares, tracking ligeramente negativo; en cuerpo, no.
- `text-wrap: pretty` en el cuerpo (Emil: evita huérfanas la mayor parte del tiempo; corrige a mano los titulares donde la huérfana sea intencional).
- Evita: una palabra del H1 en itálica o en el acento; versalitas de kicker; `text-balance` en todo; titulares de 4 líneas; mono decorativa.
- `tabular-nums` en precios, horarios y cifras.

### Color

- Como máximo tres matices activos: un dominante (~60 %), un neutro (~30 %), un acento (~10 %). El resto son tintas y sombras de esos, no hues nuevos.
- Éxito / aviso / error van aparte, y no uses el azul/rojo crudo de Tailwind como marca.
- El acento aparece en pocos sitios (un CTA, links, una línea). Si está en seis bloques, ya no es acento.
- Evita blanco `#fff` y negro `#000` puros como únicos fondos; un tinte cálido o frío da profundidad.
- Contraste: cuerpo ≥ 4.5:1 (o APCA Lc ≥ 75). Texto sobre foto lleva velo.

### Layout

- Alineación decidida (casi siempre izquierda para texto largo). El centro se gana, no se presupone.
- Ritmo de espacio en múltiplos de 4/8. Proximidad: dentro del componente < entre componentes < entre secciones.
- Cambia el peso visual del hero, el contenido y el cierre. Si al entrecerrar los ojos todo es el mismo rectángulo, es monótono, no «consistente».
- Bordeless por defecto. Borde o sombra solo si el espacio y el cambio de fondo no bastan.
- Un radio y un sistema de elevación, no un `rounded-2xl` universal.
- Nav móvil completa. Footer corto y útil (dirección, WhatsApp, horarios), no cuatro columnas de links inventados.

### Movimiento

Reglas que ya usamos en la tanda 4 (detalle en [`METODO-EMIL-KOWALSKI.md`](METODO-EMIL-KOWALSKI.md)), reforzadas por posts recientes de @emilkowalski:

- UI habitual: 150–300 ms. Un botón o un menú chico puede ir ~100–200 ms; un panel a pantalla completa necesita más, porque se siente más pesado. La duración escala con el **tamaño** y con la **distancia**.
- Feedback de pulsar: `scale(.97)` en 100–160 ms.
- Entradas con ease-out (arranque rápido). Evita ease-in al aparecer. No nazcas de `scale(0)`.
- Overlay y diálogo deben durar lo mismo. Un spring brusco en el dialog y un fade distinto en el overlay se siente roto; a veces un ease-out es más amable que un muelle.
- Escalonar listas (stagger 30–80 ms en producto, 100–150 ms en marketing).
- No animes sombras; mantén `blur()` pequeño; no intercambies custom properties a cada frame (skill `/animation-performance`).
- Acciones de teclado que se usan cien veces al día: mejor sin animación.
- Un gesto bueno vale más que decorar el scroll: fricción al arrastrar un toast (como en Sonner), popover con `transform-origin` en el disparador, animaciones interrumpibles.
- Respeta `prefers-reduced-motion`: fundido, no silencio total.

---

## 4. Hilos y posts de X (URLs reales)

Selección de ~25 piezas con idea útil, no listas virales recicladas de «10 skills». Métricas al momento de la lectura (26 nov 2026).

| # | Autor | URL | Idea clave |
|---|---|---|---|
| 1 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2061426518333571576](https://x.com/emilkowalski/status/2061426518333571576) | Para sacar buen motion de una IA hay que pedirlo con vocabulario preciso (*stagger*, *direction-aware*, *crossfade*, *layout animation*). Publicó un glosario en animations.dev/vocabulary. (~5.3k likes, 7.6k bookmarks) |
| 2 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2075188252877672732](https://x.com/emilkowalski/status/2075188252877672732) | Skill `/apple-design`: 17 principios de motion y UI destilados de charlas WWDC ( Designing Fluid Interfaces, typography). (~13k likes, 22.5k bookmarks) |
| 3 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2079180760741728302](https://x.com/emilkowalski/status/2079180760741728302) | Cómo elegir de quién aprender en medio del slop: prueba de trabajo. Si quieres tipografía, lee a quien diseñó Inter, no el hilo más viral. «Learn from the builders. Be allergic to the talkers.» |
| 4 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2077404975555031509](https://x.com/emilkowalski/status/2077404975555031509) | `/find-animation-opportunities`: busca dónde el motion sí aporta y, igual de importante, **qué no hay que animar**. |
| 5 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2077745381299961872](https://x.com/emilkowalski/status/2077745381299961872) | Prompts para esa skill: acotar a un flujo («checkout, se usa pocas veces por sesión»); usarla como escudo («¿esto debería animarse?») justo después de que el agente genere una pantalla en cero. |
| 6 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2043666802404696483](https://x.com/emilkowalski/status/2043666802404696483) | La duración debe crecer con el tamaño del elemento. Un dropdown puede ir en ~200 ms; un menú a pantalla completa en 150 ms se siente abrupto. Compara 150 vs 300 ms. |
| 7 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2108531407786242389](https://x.com/emilkowalski/status/2108531407786242389) | Lo más grande se mueve más lento (pesa más). Lo que viaja más lejos, tarda más. |
| 8 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2103124466352210045](https://x.com/emilkowalski/status/2103124466352210045) | Pon `text-wrap: pretty` por defecto en la app; corrige a mano los titulares donde la huérfana sí hace falta. |
| 9 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2104634532154524054](https://x.com/emilkowalski/status/2104634532154524054) | Si animas muchos elementos, no olvides el stagger. La diferencia se ve al instante. |
| 10 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2109277388437868623](https://x.com/emilkowalski/status/2109277388437868623) | Skill `/animation-performance`: blur pequeño, no animar sombras, no estar cambiando CSS variables a cada rato. Los agentes se saltan esto. |
| 11 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2102798004281635184](https://x.com/emilkowalski/status/2102798004281635184) | Detalle de Linear: igualar la duración del overlay y del diálogo, y cambiar un spring por ease-out para que no entre tan seco. |
| 12 | [@emilkowalski](https://x.com/emilkowalski) | [https://x.com/emilkowalski/status/2033543717890465985](https://x.com/emilkowalski/status/2033543717890465985) | Convirtió sus artículos en una skill de design engineering para Claude Code o Codex (animación, componentes, notas de Sonner). |
| 13 | [@VaibhavSisinty](https://x.com/VaibhavSisinty) | [https://x.com/VaibhavSisinty/status/2089634658329952437](https://x.com/VaibhavSisinty/status/2089634658329952437) | El problema de la UI generada: «todo se ve igual. Purple gradients. Inter font everywhere. Glassmorphism for no reason. The same card layout on every landing page.» El hilo sigue con skills; el post que arranca el diagnóstico es este. (~243 likes, 729 bookmarks) |
| 14 | [@VaibhavSisinty](https://x.com/VaibhavSisinty) | [https://x.com/VaibhavSisinty/status/2089634670732550617](https://x.com/VaibhavSisinty/status/2089634670732550617) | `frontend-design` de Anthropic obliga a responder propósito, tono, constraints y qué hace distinta a esta página, y prohíbe Inter/Roboto por defecto. |
| 15 | [@kirtandopamine](https://x.com/kirtandopamine) | [https://x.com/kirtandopamine/status/2116230634565943670](https://x.com/kirtandopamine/status/2116230634565943670) | Pregunta abierta que desató el mejor hilo práctico: «how to make something look not like it was vibe coded??» (~611 likes, 305 respuestas, 475 bookmarks). |
| 16 | [@cujojp](https://x.com/cujojp) | [https://x.com/cujojp/status/2116332220759855160](https://x.com/cujojp/status/2116332220759855160) | Respuesta al hilo: empieza por un design system. Mete tu voz en marca y tema, construye encima y pon guardrails para que el estilo no se escape. |
| 17 | [@builtbysimon](https://x.com/builtbysimon) | [https://x.com/builtbysimon/status/2116238127622730097](https://x.com/builtbysimon/status/2116238127622730097) | Adjunta referencias de Dribbble/Behance y nombra empresas con buen diseño. Claude imita muy bien una estética. Luego condensa una guía de una página (popovers, sliders, UI) y obliga a usarla en todas las pantallas. |
| 18 | [@IrvinZhan](https://x.com/IrvinZhan) | [https://x.com/IrvinZhan/status/2116272253147185624](https://x.com/IrvinZhan/status/2116272253147185624) | Apunta el agente a un set curado de referencias vía MCP (Subframe Inspiration) y pídele que busque ahí. (~119 likes, 480 bookmarks en la respuesta) |
| 19 | [@Frozune](https://x.com/Frozune) | [https://x.com/Frozune/status/2111791781809655955](https://x.com/Frozune/status/2111791781809655955) | Añade a `AGENTS.md`/`DESIGN.md`: nada de UI estilo terminal; sentence-case y sans; mono solo para código; no labels en versalitas ni eyebrows ni metadata decorativa. |
| 20 | [@shubhranshu2009](https://x.com/shubhranshu2009) | [https://x.com/shubhranshu2009/status/2086476033197506822](https://x.com/shubhranshu2009/status/2086476033197506822) | Lista operativa de tells: URL de Lovable, degradado morado, Inter, sparkles Lucide, glass, shadcn sin tocar, logo solo texto, sin favicon, copy «Transform your workflow», caras de stock, testimonials y counters falsos, FAQ de relleno, em dashes, keys en el frontend, móvil roto, `*.vercel.app` en producción. |
| 21 | [@kenzofomo](https://x.com/kenzofomo) | [https://x.com/kenzofomo/status/2073182956747661722](https://x.com/kenzofomo/status/2073182956747661722) | «Taste is becoming the real moat. Anyone can generate UI now. Very few can make it not look like AI made it.» |
| 22 | [@shadcn](https://x.com/shadcn) | [https://x.com/shadcn/status/2099534239272177747](https://x.com/shadcn/status/2099534239272177747) | El agente escribe código que compila y pinta, y aun así rompe el design system (por ejemplo, añade `p-4` a un Button que ya tenía `size`). Hay que verificar el sistema, no solo que «se vea». |
| 23 | [@shadcn](https://x.com/shadcn) | [https://x.com/shadcn/status/1896247127401283934](https://x.com/shadcn/status/1896247127401283934) | Los design systems son guías, no dogmas: deben poder ajustarse. Complementa el post anterior: hay que poder doblarlo un poco, no fosilizarlo ni dejar que el agente lo ignore. |
| 24 | [@pbakaus](https://x.com/pbakaus) | [https://x.com/pbakaus/status/2066906020740534581](https://x.com/pbakaus/status/2066906020740534581) | Lint de diseño en Codex, Claude Code y Cursor con Impeccable: corta slop y la deriva del sistema de forma automática. Comandos útiles: `bolder`, `quieter`, `clarify`, `polish` (este último normaliza contra tu sistema). |
| 25 | [@raunofreiberg](https://x.com/raunofreiberg) | [https://x.com/raunofreiberg/status/2074832501520887808](https://x.com/raunofreiberg/status/2074832501520887808) | En Vercel el trabajo «aburrido» (tamaño, alineación, borrar redundancias) es el que sostiene el sistema. El craft no es solo el hero 3D. |
| 26 | [@viktoroddy](https://x.com/viktoroddy) | [https://x.com/viktoroddy/status/2026271916227711304](https://x.com/viktoroddy/status/2026271916227711304) | «Design system first — AI second.» No pulses generate con un prompt vago: pega el sistema de tokens y los patrones (nav, botones, type) arriba del todo. |
| 27 | [@viktoroddy](https://x.com/viktoroddy) | [https://x.com/viktoroddy/status/2094009989220430084](https://x.com/viktoroddy/status/2094009989220430084) | Biblioteca de prompts pensados para webs que no se vean slop, filtrable por tono (dark, luxe, technical, brutalist). Pegar en Claude, Cursor o v0. Útil como referencia de *dirección*, no como atajo para saltarse el `DESIGN.md`. |
| 28 | [@AlexLathery](https://x.com/AlexLathery) | [https://x.com/AlexLathery/status/1996600632476668407](https://x.com/AlexLathery/status/1996600632476668407) | Dueño de agencia con cientos de webs locales: usa IA todos los días, pero no vibecodea el sitio entero del cliente. El problema no es sacar HTML; es quién mantiene, quién cuida SEO, accesibilidad, velocidad y conversión. Un sitio es un activo, no un one-shot. |
| 29 | [@heyanjey](https://x.com/heyanjey) | [https://x.com/heyanjey/status/2084344380513829077](https://x.com/heyanjey/status/2084344380513829077) | El cliente local no compra el stack (Lovable, Claude, React). Compra tres cosas: que se vea de confianza, que cargue rápido y que traiga clientes. La preview en vivo es el pitch; el retainer es el negocio. |
| 30 | [@nutlope](https://x.com/nutlope) | [https://x.com/nutlope/status/2051694883727987096](https://x.com/nutlope/status/2051694883727987096) | Anunció Hallmark: una skill para landing pages con «good design taste by default» en Claude Code, Codex u otros agentes. |
| 31 | [@showpiecedotso](https://x.com/showpiecedotso) | [https://x.com/showpiecedotso/status/2117661683393130915](https://x.com/showpiecedotso/status/2117661683393130915) | En el hilo de vibe coding: usa números y contenido reales. Un «10k+ users» en un producto que acaba de nacer es la delación más rápida. |
| 32 | [@this_is_Suraj](https://x.com/this_is_Suraj) | [https://x.com/this_is_Suraj/status/2119517961417609667](https://x.com/this_is_Suraj/status/2119517961417609667) | «Make it not look AI-generated» ya es una estética, una guía editorial y un estándar de código. Justo el posicionamiento que puede usar Escalatam. |

Notas al margen, también leídas pero no imprescindibles en la tabla: @emilkowalski cambió de handle (`emilkowalski_` → `emilkowalski`); el curso y las skills viven en [emilkowal.ski](https://emilkowal.ski) y [github.com/emilkowalski/skills](https://github.com/emilkowalski/skills). Hay un género entero de hilos «10 skills that kill AI slop» (muy virales, poco originales): mejor ir a las skills de origen (Anthropic, Bakaus, Nutlope, Emil) que a las compilaciones.

### Artículos y repos citados

- [How to make a website look less vibe coded](https://www.regards.design/blog/make-website-look-less-vibe-coded) — Filip Wojda, 21 oct 2026. El diagnóstico y el flujo de 4 pasos más claros que encontramos.
- [Improving frontend design through Skills](https://claude.com/resources/articles/improving-frontend-design-through-skills) — Anthropic, 12 nov 2025. *Distributional convergence*.
- [How to Make AI Websites Not Look AI](https://www.askglitch.com/guides/how-to-make-ai-websites-not-look-ai) — prompt corto + mapa de tools.
- Skills: [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [impeccable](https://github.com/pbakaus/impeccable), [hallmark](https://github.com/Nutlope/hallmark), [taste-skill](https://github.com/Leonxlnx/taste-skill), [unslop-ui-skill](https://github.com/claudiusararu/unslop-ui-skill), [emilkowalski/skills](https://github.com/emilkowalski/skills), [awesome-design-md](https://github.com/VoltAgent/awesome-design-md).

---

## 5. Oportunidades de negocio (lo que vimos en X y cómo usarlo)

Hay mucho humo («US$20k en dos semanas», webs a US$100 en tres horas). Abajo va lo que sí encaja con Escalatam, separado de lo que no conviene copiar.

### Lo que sí es una oportunidad

1. **El gusto es el foso.** Cuando cualquiera genera una landing en diez minutos, el cliente que paga un ticket de verdad compra que *no se vea como las demás*. Eso hay que decirlo en el pitch, con la demo al lado de una web típica de Lovable/v0, no con la frase «usamos IA».
2. **Vender la prueba, no la promesa.** Varios builders locales coinciden: se arma una preview con los datos reales del negocio (Maps, reseñas, fotos, WhatsApp) y se enseña el sitio ya funcionando. La conversación deja de ser «imagínese su web» y pasa a «esto ya es su negocio, ¿lo publicamos?». Encaja con el método de demos de este lab.
3. **El cliente no compra el stack.** Confianza, velocidad y clientes nuevos. Eso conecta con [`VALOR-DE-VENTA.md`](VALOR-DE-VENTA.md): WhatsApp con mensaje escrito, reservas, cotizador, SEO local, Google Business, reseñas, bilingüe, mantenimiento. El anti-slop es la capa de diseño; esas funciones son lo que justifica el precio.
4. **El retainer es el negocio, la web es la puerta.** @AlexLathery (cientos de sitios locales) lo dice sin romanticismo: alguien tiene que mantener, actualizar SEO, no romper el móvil, no perder conversiones. En un mercado que empuja webs de US$100–150, Escalatam no debería competir ahí. Debe competir en Signature + mensualidad (revisión, contenido, ficha de Google, pequeño backlog).
5. **Todavía hay negocios sin web o con una web de hace cinco años.** Un scrape compartido en X (25 nov 2026, @r_sanju4) hablaba de 6.868 fichas sin web en una muestra de 30.500. Es un dato de un solo autor, no un censo, pero el patrón es conocido en LatAm y España: Google Maps lleno, sitio inexistente o hecho en Wix rígido. El lead magnet sigue siendo una demo en su nicho, no un PDF.
6. **«Que no se vea IA» ya es un requisito de compra.** Aparece como brief para diseñadores y como crítica pública cuando una institución publica un sitio claramente vibe-coded. Si la demo del cliente se siente artesanal (fotos suyas, typo propia, un solo gesto de motion bien hecho), se defiende mejor el precio frente a agencias que entregan el default morado.
7. **Nichos donde el slop duele más, y por tanto se paga mejor el craft:** clínicas y psicología (confianza), abogados, hoteles y alta cocina, inmobiliaria, fotógrafos, arquitectura, bodas. Ahí una web «de plantilla IA» resta credibilidad. En oficios de Maps (techos, plomería) el diferencial sigue siendo WhatsApp + reseñas + velocidad, con un diseño sobrio y nada de glassmorphism.
8. **Skills y `DESIGN.md` como sistema interno, no como producto.** Sirven para que David (y los bots) no reinventen el gusto en cada lead. No hace falta vender «una skill»; hace falta que cada demo nueva nazca de decisiones, no del default.

### Lo que no hay que copiar

- Competir por precio en el mercado de «te hago la web con IA en una tarde». Ese mercado se satura solo y entrena al cliente a pagar poco.
- Inventar reseñas, cifras o captura de «live visitors» para cerrar. Además de ser slop, quema la marca.
- Pitch centrado en la herramienta («lo hicimos con Claude / Lovable»). El cliente no lo pregunta; si lo pregunta, la respuesta es el resultado y el mantenimiento, no el modelo.
- Autopitch masivo a negocios locales con sitios genéricos. Si la preview se ve igual que las otras 40 del mes, el cierre cae y además ensucia el nombre.
- Tratar a Viktor Oddy (o a cualquier cuenta de prompts) como atajo para saltarse dirección y referencias. Su consejo más útil, de hecho, es el contrario: sistema de tokens primero, generar después.

### Cómo traducirlo a un pitch corto

> Hoy cualquiera te arma una web con inteligencia artificial en una tarde, y se nota: misma letra, mismo morado, mismas tres tarjetas. Nosotros partimos de tu negocio real —tus fotos, tu WhatsApp, tu barrio— y te entregamos un sitio que se siente tuyo, que carga rápido en el celular y que está pensado para que te escriban o te reserven. La demo que te mando ya usa tus datos. Si te encaja, la publicamos y te dejamos un mantenimiento mensual para no dejarla morir.

Precios, paquetes y funciones: seguir [`VALOR-DE-VENTA.md`](VALOR-DE-VENTA.md). Este documento solo añade el argumento de *taste* y el proceso para que la demo no se caiga del lado del slop.

---

## Cierre para el lab

Antes de abrir una demo nueva (o de adaptar una de las 44 a un lead real):

1. Escribe las cinco decisiones en `DESIGN.md`.
2. Junta 3 referencias reales y di qué tomas de cada una.
3. Genera con el prompt base y los hechos del cliente.
4. Compara capturas, pasa el checklist, mide rendimiento como indica el SOP.
5. Sustituye cualquier cifra, foto o testimonio de ejemplo por material del cliente (paso 10 del SOP) **antes** de enseñarla.

Si una página podría ser de cualquier otro negocio, todavía es slop, por más 3D o Motion que tenga.
