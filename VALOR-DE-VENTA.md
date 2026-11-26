# Valor de venta — qué hace que un cliente pague más (y convierta)

Guía comercial del Escalatam Web Lab (noviembre 2026). Una demo bonita abre la conversación; lo que **sube el ticket** son las
funciones que le ahorran tiempo al dueño o le traen clientes medibles: reservas, pedidos por WhatsApp, cotizadores, reseñas,
SEO local, analítica y mantenimiento. Este documento dice **qué vender, a quién, cuánto cobrar (rangos sugeridos) y cómo
implementarlo en ligero** sobre las 44 demos.

> Los precios son **rangos sugeridos**, no tarifas de mercado verificadas al céntimo. Se apoyan en las fuentes citadas al final
> (§7) y se ajustan por país, tamaño del negocio y urgencia. Nada de esto se envía a un lead sin la aprobación de David.

---

## 1. Las 18 funciones que más valor añaden

Orden aproximado por **impacto en la decisión de compra** de un negocio local (lo que el dueño entiende en 5 segundos).

| # | Función | Por qué paga más el cliente | Demos que ya la enseñan | Implementación ligera (sin framework) |
|---|---|---|---|---|
| 1 | **WhatsApp click-to-chat con mensaje precargado** | Es el canal real de venta en LatAm y España; cada botón lleva un mensaje distinto (servicio, fecha, precio) y el dueño sabe de dónde vino el lead | 22, 24, 27, 29, 35, 38–44 (todas las de tanda 3–4 tienen CTA `wa.me`) | `https://wa.me/<número sin + ni espacios>?text=<encodeURIComponent(msg)>`. El texto se precarga, no se envía solo. Snippet §5.1 |
| 2 | **Reservas / agenda online** | Quita llamadas y no-shows; “reserva a las 2 a.m.” es dinero que hoy pierden | 27 (barra de reserva sticky), 31 (próxima hora libre), 33 (calendario de disponibilidad), 38 y 44 (reserva en drawer de 3 pasos), 01/28 (CTA reservar) | Nivel 1: selector de día/hora propio → WhatsApp (como 31/44). Nivel 2: embed de **Cal.com** (open source, plan gratis) o Calendly cargado por intención. Restaurantes: enlace a su motor (OpenTable, CoverManager, TheFork, Resy). §5.2 |
| 3 | **Cotizador / calculadora de precio** | Filtra curiosos y entrega leads con presupuesto; el cliente ve un número antes de escribir | 33 (estimador de boda), 38 (“Calcula tu plan”), 39 (“Arma tu paquete”), 30 (precio en vivo), 41 (precio por tamaño/estilo), 36 (paquetes “desde”), 34 (toggle de precios) | Formulario de radios/range + `total = base + Σ extras` + resumen → WhatsApp o email. Ver 33/39. §5.3 |
| 4 | **Configurador de producto** | Convierte “mirar” en “armar el mío”; sube ticket medio con extras | 22 (arma tu taco), 30 (probador de uñas), 35 (arma tu ramo, Three.js), 43 (acabados del termo), 32 (paleta de materiales) | Estado `{opción: valor}` → SVG/CSS/Three.js reacciona → precio y mensaje WhatsApp. §5.4 |
| 5 | **Catálogo con carrito → WhatsApp** | Tienda sin pasarela ni comisiones: el pedido llega ordenado al WhatsApp del dueño | 22 (pedido de tacos), 35 (“Tu cesta”), 43 (“Llévatela”), 29 (pedido) | Array de productos (o Google Sheet en CSV) + carrito en `localStorage` + mensaje con líneas y total. §5.5 |
| 6 | **Slider antes / después** | Prueba visual del resultado: clave en dental, estética, detailing, reformas, peluquería | 24 (slider), 39 (cinta de corrección ligada al scroll + antes/después), 33 (B/N → color) | `<input type=range>` + `clip-path: inset(0 calc(100% - var(--p)) 0 0)` sobre la foto “después”. §5.6 |
| 7 | **Reseñas de Google visibles** | 97 % de los consumidores de EE. UU. leen reseñas de negocios locales (BrightLocal 2026) | Testimonios en 24–44 (marcados “de ejemplo”) | Reseñas reales copiadas con permiso + nota media + enlace “Escribir reseña” (`https://search.google.com/local/writereview?placeid=<PLACE_ID>`). Versión viva: Places API (coste por petición) o widget. §5.7 |
| 8 | **SEO local + schema.org** | Aparecer en “dentista cerca de mí”; datos estructurados para Google | **Ninguna demo lo trae todavía** (añadir al adaptar) | JSON-LD `LocalBusiness`/`Restaurant`/`Dentist` con dirección, horario, teléfono, `geo`, `aggregateRating` solo si es real; `<title>` y `meta description` con servicio + ciudad. §5.8 |
| 9 | **Google Business Profile (GBP)** | Lo primero que ve el cliente en Maps; casi nadie lo tiene optimizado | — (servicio, no código) | Auditoría + fotos + categorías + horario + enlace a la web con UTM `?utm_source=gbp` + respuesta a reseñas. Se vende como alta + mensual |
| 10 | **Mapa / cómo llegar** | Quita la pregunta “¿dónde están?” | 21 (mapa SVG de barrio), 38 (dirección) | Fachada: imagen estática + botón que carga el `<iframe>` de Google Maps al tocar (no penaliza LCP) y enlace `https://maps.google.com/?q=`. §5.9 |
| 11 | **Velocidad como argumento** | “Carga en 1 s” se enseña con el informe de Lighthouse; Deloitte asoció 0,1 s menos con +8,4 % de conversión en retail | Todas: LH móvil 90–100 (ver README) | Entregar captura de Lighthouse móvil + comparación con su web actual (PageSpeed Insights) |
| 12 | **Multilingüe (ES/EN)** | Turismo, hoteles, inmobiliaria de costa, clínicas con pacientes extranjeros | **Ninguna demo lo trae** | Carpeta `/en/` duplicada con `hreflang` (mejor SEO) o diccionario JSON + `data-i18n` (más rápido). §5.10 |
| 13 | **Formularios de lead → email o Google Sheets** | El dueño ve sus leads en una hoja, sin CRM | Formularios en 23–41 (sin backend; demo) | Google Apps Script `doPost` → hoja; o Web3Forms/Formspree → email. Honeypot anti-spam. §5.11 |
| 14 | **Analítica + píxel** | Saber cuántos clics a WhatsApp genera la web = justificar la mensualidad | — | GA4 o Cloudflare Web Analytics / Plausible (sin cookies) + Meta Pixel; evento `wa_click` en cada botón. En España/UE, banner de consentimiento y Consent Mode v2. §5.12 |
| 15 | **Menú / carta con QR** | Restaurantes y bares: la carta se actualiza sin reimprimir | 13 (`carta.html`), 22, 28, 29 (pizarra del día) | Página `/carta` ligera + QR generado (`qrencode -o qr.png URL`) con UTM `?utm_source=qr_mesa`; precios desde Google Sheet. §5.13 |
| 16 | **Edición ligera (CMS-light)** | El dueño cambia precios, menú o fotos sin llamarte (y paga mantenimiento igual) | — | Google Sheet publicada como CSV (lo más simple), **Decap CMS** (git, open source) o **TinaCMS** (visual, con nube). §5.14 |
| 17 | **Chat IA o agente de voz** | Atiende 24/7, responde precios/horarios y agenda; ticket alto + mensualidad | — (upsell) | Burbuja propia que abre WhatsApp como mínimo; nivel pro: agente de voz/chat (ElevenLabs Agents u otro) con FAQ del negocio y herramienta de reserva. §5.15 |
| 18 | **Plan de mantenimiento** | Ingreso recurrente; cubre hosting, cambios, copias y SEO mensual | — | Ver paquetes §3 |

Extras que también venden en nichos concretos: **filtro de unidades/propiedades** (26), **modo día/noche** (26), **mapa
corporal / test de diagnóstico** (31, 34), **tarjeta de sellos / fidelidad** (29), **agenda de eventos / gira** (27, 42),
**respiración guiada / contenido de valor** (44), **galería con lightbox** (36), **índice de proyectos con preview** (32, 37).

---

## 2. Qué vender a cada nicho

`●` imprescindible · `○` upsell recomendado. Demos de partida entre paréntesis.

| Nicho (demos) | WA precargado | Reservas | Cotizador | Configurador | Carrito→WA | Antes/después | Reseñas | SEO local+GBP | Multilingüe | QR carta | CMS-light | IA chat/voz |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Restaurante / asador (01, 13, 18, 28) | ● | ● | | | ○ | | ● | ● | ○ turismo | ● | ● menú | ○ reservas por voz |
| Taquería / street food / café (07, 22, 29) | ● | | | ○ | ● | | ● | ● | | ● | ● | |
| Bar / coctelería (14) | ● | ○ | | | | | ● | ● | ○ | ● | ○ | |
| Clínica dental / estética (02, 15, 24, 38) | ● | ● | ● | | | ● | ● | ● | ○ | | ○ | ● citas 24/7 |
| Fisio / psicología / nutrición (31, 34, 44) | ● | ● | ○ | | | | ● | ● | | | ○ | ○ |
| Abogados / asesoría (05, 25) | ● | ● consulta | ○ | | | | ● | ● | ○ | | ○ blog | ○ primer filtro |
| Inmobiliaria / promotora (03, 21, 26) | ● | ○ visitas | ○ hipoteca | | | | ○ | ● | ● | | ● fichas | ○ |
| Hotel / turismo (17, 27) | ● | ● (motor) | | | | | ● | ● | ● | ○ | ○ | ○ conserje |
| Arquitectura / interiorismo (32, 37) | ● | ○ | ● | ○ materiales | | ○ | ○ | ● | ○ | | ● proyectos | |
| Bodas / eventos / fotografía (33, 36) | ● | ● fecha | ● | | | ○ | ● | ● | ○ | | ● galerías | |
| Belleza: uñas, peluquería, barbería (19, 20, 30) | ● | ● | ○ | ● | | ○ | ● | ● | | | ○ | ○ |
| Gimnasio / entrenador (04, 16, 40) | ● | ● clase prueba | ○ planes | | | ○ | ● | ● | | | ○ | |
| Floristería / regalos / pastelería (11, 35) | ● | | ○ | ● | ● | | ● | ● | | | ● | |
| Detailing / talleres (39) | ● | ● | ● | ○ | | ● | ● | ● | | | ○ | |
| Tatuajes / artistas / DJ (41, 42) | ● | ○ booking | ● | | | | ● | ○ | ○ | | ○ | |
| Producto DTC / preventa (43, 09) | ● | | | ● | ● | | ● | ○ | ○ | | ● | ○ |
| Joyería / lujo / moda (06, 09, 19) | ● | ○ cita | | ○ | ● | | ○ | ● | ○ | | ● | |

---

## 3. Paquetes sugeridos (USD, rangos orientativos)

Tres paquetes en la misma estructura para los tres mercados. Lo que cambia es el precio. Lo de “animación premium” (Three.js,
scroll-scrub, micro-interacciones) **justifica estar por encima de la media del mercado**, pero en LatAm el ticket se gana con
funciones (WhatsApp, reservas, cotizador), no con el 3D.

| Paquete | Qué incluye | LatAm | España | EE. UU. |
|---|---|---|---|---|
| **Esencial** — “web que vende por WhatsApp” | Landing de 1 página adaptada de una demo, animación del lab, botones WhatsApp con mensaje por servicio, mapa (fachada), reseñas reales, SEO local + schema.org, informe Lighthouse, dominio/hosting el 1.er año, 1 ronda de cambios | **$350–800** | **$900–1.600** | **$1.200–2.500** |
| **Negocio** — “la web que trabaja sola” | Todo lo anterior + 3–5 secciones/páginas, **reservas** (Cal.com/motor propio) **o cotizador**, formulario a Google Sheets, analítica + píxel con evento `wa_click`, alta/optimización de GBP, ES/EN si aplica, CMS-light (Sheet o Decap), 2 rondas | **$900–1.800** | **$1.800–3.500** | **$3.000–6.000** |
| **Signature** — “la web de premio” | Todo lo anterior + hero Three.js / scroll-scrub tipo Apple (tanda 4), **configurador o catálogo con carrito→WhatsApp**, contenido bilingüe completo, fotos/vídeo IA o sesión, 3 rondas, formación de 30 min | **$2.000–4.000** | **$4.000–8.000** | **$7.000–15.000** |

**Add-ons sueltos (sobre cualquier paquete)**

| Add-on | LatAm | España | EE. UU. |
|---|---|---|---|
| Idioma extra (por idioma) | $150–350 | $300–600 | $500–1.200 |
| Cotizador / calculadora a medida | $150–400 | $300–800 | $600–1.500 |
| Configurador visual (SVG) / (Three.js) | $300–700 / $800–1.800 | $600–1.200 / $1.500–3.500 | $1.000–2.500 / $3.000–7.000 |
| Catálogo con carrito → WhatsApp (hasta 40 productos) | $250–600 | $500–1.200 | $800–2.000 |
| Carta QR + carta editable en Google Sheet | $100–250 | $200–450 | $300–700 |
| Alta y optimización de Google Business Profile | $80–200 | $150–400 | $250–600 |
| Chat IA (FAQ + WhatsApp) — alta | $300–900 | $600–1.500 | $1.000–3.000 |
| Agente de voz IA (atiende y agenda) — alta | $600–1.500 | $1.200–3.000 | $2.000–5.000 |

**Mensualidades (lo que hace el negocio rentable)**

| Plan | Qué incluye | LatAm | España | EE. UU. |
|---|---|---|---|---|
| **Básico** | Hosting, dominio, SSL, copias, revisión mensual de velocidad, 1 cambio pequeño | $25–60/mes | €35–80/mes | $59–120/mes |
| **Crecimiento** | Básico + 4–6 cambios/mes, publicación de 2 posts GBP, informe de clics a WhatsApp y reservas | $70–150/mes | €90–200/mes | $150–350/mes |
| **IA 24/7** | Crecimiento + mantenimiento del chat/agente de voz y ajustes de respuestas; **el consumo de IA/minutos se factura aparte** | $120–300/mes | €180–400/mes | $300–700/mes |

Reglas de precio: (1) cobrar el 50 % al aprobar, 50 % al publicar; (2) mostrar siempre **3 paquetes** (el del medio es el que
más se vende); (3) anclar con el Signature aunque se espere vender el Negocio; (4) en LatAm ofrecer la mensualidad con el
primer mes incluido; (5) nunca dar precio en el primer mensaje al lead (ver Prompt 6 de la skill).

---

## 4. Guion de pitch (español, 5 minutos, por videollamada o en persona)

> Usar con la demo ya adaptada abierta en el móvil del cliente. Rellenar `{{ }}`. No enviar nada sin el visto bueno de David.

**1. Apertura (30 s) — el dolor, no la web**
“{{Nombre}}, estuve mirando cómo os encuentran hoy. {{Dolor real: la web da error / la carta es un PDF / no se puede reservar
por la noche / en Google Maps aparecéis sin fotos}}. Cada cliente que no puede {{reservar/pedir}} a la primera se va al de al
lado. Por eso os preparé esto.”

**2. La demo en su móvil (90 s) — que la toque él**
“Ábrela tú mismo: {{URL}}. Fíjate en tres cosas. Uno: carga en un segundo, incluso con datos. Dos: {{la animación — el fuego,
la flor que se abre, el coche que se corrige}} es vuestra, nadie en {{ciudad}} tiene algo así. Tres: el botón principal es
{{Reservar / Pedir cita / Pedir por WhatsApp}}; tócalo.” → *(se abre WhatsApp con el mensaje precargado)* “Así os llegaría
cada cliente: ya diciendo qué quiere.”

**3. El valor (60 s) — de “web bonita” a “web que trabaja”**
“Lo bonito engancha, pero lo que paga la web es esto: {{reservas a cualquier hora / el cotizador que os filtra a los que sí
tienen presupuesto / el carrito que manda el pedido ordenado}}. Y lo vais a poder medir: cada mes os paso cuántos clics a
WhatsApp y cuántas reservas salieron de la web.”

**4. Los paquetes (60 s) — tres opciones, de mayor a menor**
“Lo tengo en tres niveles. El completo, **Signature**, es esta demo con todo: {{configurador/3D, dos idiomas, fotos}} — {{precio}}.
El que más elige un negocio como el vuestro es **Negocio**: la web, {{reservas o cotizador}}, Google Maps optimizado y los
informes — {{precio}}. Y si queréis empezar ya, **Esencial**: la web con WhatsApp y Google — {{precio}}. Todos con la primera
mensualidad incluida.”

**5. Objeciones frecuentes**
- *“Ya tengo Instagram.”* → “Instagram es el escaparate; la web es la caja registradora. Google os manda a la web, no al perfil.”
- *“Es caro.”* → “Con {{2 reservas / 1 tratamiento / 1 boda}} al mes ya está pagada. Si preferís, empezamos por Esencial y subimos.”
- *“Mi sobrino me la hace.”* → “Perfecto, comparad: esta carga en 1 s (os enseño el informe de Google) y trae reservas medidas.”
- *“¿Y si quiero cambiar precios?”* → “Los cambiáis vosotros en una hoja de Google, o nos escribís y va incluido en la mensualidad.”

**6. Cierre (30 s)**
“Si os gusta, la dejo publicada con vuestro dominio esta misma semana. Solo necesito {{logo, 5 fotos, horario y el número de
WhatsApp}}. ¿Empezamos por {{paquete}}?”

**Upsell a los 30 días (con datos de la analítica)**
“Este mes la web os trajo {{N}} clics a WhatsApp. La mitad fueron {{fuera de horario}}. Con el **asistente IA** esos mensajes se
responden solos y se agendan. ¿Lo activamos?”

---

## 5. Implementación ligera (código propio, vanilla)

Todo se añade a cualquier demo sin framework y sin romper el presupuesto de rendimiento (JS ≤ 35 KB gz, LCP < 2,5 s).

### 5.1 WhatsApp con mensaje por botón (+ evento de analítica)
```html
<a class="wa" data-msg="Hola {{Negocio}}, quiero reservar mesa para {{n}} el {{día}}">Reservar por WhatsApp</a>
<script>
const WA = '34600000000'; // número del cliente: código de país, sin +, espacios ni ceros iniciales
document.querySelectorAll('a.wa').forEach(a => {
  a.href = `https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.msg)}`;
  a.target = '_blank'; a.rel = 'noopener';
  a.addEventListener('click', () => window.gtag?.('event', 'wa_click', { label: a.dataset.msg.slice(0, 40) }));
});
</script>
```
En tanda 4 ya existe `wa()` en `src/t4/lib/ui.js`. El mensaje se rellena con lo elegido (fecha, servicio, total).

### 5.2 Reservas
- **Nivel 1 (0 KB extra):** selector propio de día + franja (como 31 y 44) → mensaje WhatsApp “Quiero cita el martes 3 a las 17:00”.
- **Nivel 2:** Cal.com o Calendly embebido **solo al pulsar** “Reservar” (botón → `import()` del script del embed o `<iframe loading="lazy">` dentro del drawer de 38/44). Así no pesa en el LCP.
- **Restaurantes y hoteles:** enlazar el motor que ya usen (OpenTable, TheFork, CoverManager, SevenRooms, Resy, motor del PMS) con UTM.

### 5.3 Cotizador
```js
const precios = { base: 120, extras: { cera: 40, interior: 60, ceramico: 250 } };
function total(form) {
  let t = precios.base;
  for (const k in precios.extras) if (form[k]?.checked) t += precios.extras[k];
  return t;
}
// on input → pintar total con el número que rueda (38) y actualizar data-msg del botón WhatsApp
```
Mostrar “desde” y “estimación orientativa”; el precio final lo confirma el negocio.

### 5.4 Configurador
Estado único `const s = { flor: 'rosa', color: '#e66', tamaño: 'M' }` → una función `render(s)` que actualiza SVG/CSS
(22, 30) o uniforms/materiales de Three.js (35, 43) y el resumen + precio + mensaje. Guardar `s` en `location.hash` para que
el enlace compartido abra el mismo diseño.

### 5.5 Catálogo con carrito → WhatsApp
```js
const cart = JSON.parse(localStorage.cart || '[]');
const msg = () => 'Pedido:\n' + cart.map(i => `• ${i.q}× ${i.name} — $${i.q * i.price}`).join('\n')
  + `\nTotal: $${cart.reduce((s, i) => s + i.q * i.price, 0)}\nNombre / dirección: `;
// productos desde un array o desde una Google Sheet "Publicar en la web → CSV" (fetch + split)
```
Drawer tipo Vaul (35) para la cesta, toast al añadir (Sonner-like).

### 5.6 Antes / después
```html
<div class="ba" style="--p:50%"><img src="antes.webp" alt="Antes"><img class="after" src="despues.webp" alt="Después">
  <input type="range" min="0" max="100" value="50" aria-label="Comparar antes y después"
         oninput="this.parentNode.style.setProperty('--p', this.value + '%')"></div>
<style>.ba{position:relative}.ba img{display:block;width:100%}.ba .after{position:absolute;inset:0;clip-path:inset(0 calc(100% - var(--p)) 0 0)}
.ba input{position:absolute;inset:0;opacity:0;cursor:ew-resize}</style>
```

### 5.7 Reseñas de Google
Estático (recomendado): 3–6 reseñas reales con nombre de pila, estrellas y fecha, más la nota media y el número total tal como
aparecen en Maps (actualizar en el mantenimiento) + botón “Escribir reseña”. Vivo: Places API desde una función serverless
(Cloudflare Worker) con caché de 24 h; nunca la clave en el HTML.

### 5.8 schema.org (SEO local)
```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Restaurant","name":"{{Nombre}}","url":"https://{{dominio}}/",
 "telephone":"+34 600 000 000","servesCuisine":"Parrilla","priceRange":"$$",
 "address":{"@type":"PostalAddress","streetAddress":"{{Calle}}","addressLocality":"{{Ciudad}}","postalCode":"{{CP}}","addressCountry":"ES"},
 "geo":{"@type":"GeoCoordinates","latitude":0,"longitude":0},
 "openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"13:00","closes":"23:30"}],
 "sameAs":["https://instagram.com/{{usuario}}","https://maps.google.com/?cid={{CID}}"]}
</script>
```
Tipos útiles: `Dentist`, `MedicalClinic`, `LegalService`, `RealEstateAgent`, `Hotel`, `BeautySalon`, `HairSalon`,
`ExerciseGym`, `Florist`, `AutoRepair`, `Store`. `aggregateRating` solo con datos reales. Validar en el Rich Results Test.

### 5.9 Mapa sin penalizar
Imagen estática del mapa (captura propia o SVG como 21) + botón “Ver en Google Maps” que sustituye la imagen por el
`<iframe loading="lazy">` al tocarlo, y enlace directo `https://www.google.com/maps/dir/?api=1&destination=<dirección codificada>`.

### 5.10 Multilingüe
- **SEO:** `/` y `/en/` con `<link rel="alternate" hreflang="es" …>` y `hreflang="en"` recíprocos + `x-default`.
- **Rápido:** `data-i18n="hero.title"` + `es.json`/`en.json`; idioma por `navigator.language` con selector visible y
  `localStorage`. Actualizar también `<html lang>` y los mensajes de WhatsApp.

### 5.11 Formularios → Google Sheets o email
Apps Script ligado a la hoja: `function doPost(e){ SpreadsheetApp.getActive().getSheets()[0].appendRow([new Date(), ...Object.values(e.parameter)]); return ContentService.createTextOutput('ok'); }`
→ Implementar como aplicación web → `fetch(url, {method:'POST', body:new FormData(form)})`. Alternativas sin código:
Web3Forms o Formspree (email). Siempre honeypot (`<input name="web" hidden>`) y aviso de privacidad.

### 5.12 Analítica + píxel
Cloudflare Web Analytics o Plausible (sin cookies) para el informe mensual; GA4 + Meta Pixel si el cliente hace anuncios.
Cargar después del `load` o por intención; eventos `wa_click`, `booking_start`, `quote_done`, `add_to_cart`. En la UE,
banner de consentimiento antes de GA4/Pixel (Consent Mode v2).

### 5.13 Carta QR
`qrencode -s 12 -o qr-mesa.png "https://{{dominio}}/carta?utm_source=qr&utm_medium=mesa"` (o cualquier generador). La carta
es HTML ligero (como `13-editorial-css/carta.html`) con alérgenos; precios desde Google Sheet si el dueño los cambia a menudo.

### 5.14 CMS-light
1. **Google Sheet → CSV** (lo más fácil para el dueño): menú, precios, horarios, productos.
2. **Decap CMS** (antes Netlify CMS): panel `/admin` que hace commits al repo; gratis y open source.
3. **TinaCMS**: edición visual sobre la página; tiene nube con plan gratuito.
Elegir 1 para restaurantes y tiendas pequeñas; 2–3 para portfolios, inmobiliarias y blogs.

### 5.15 Chat IA / agente de voz (upsell)
- **Mínimo:** burbuja propia (drawer de 38) con 5 preguntas frecuentes y salida a WhatsApp.
- **Pro:** agente con la base de conocimiento del negocio (carta, precios, horario, políticas) que responde por chat o voz y
  usa una herramienta de reserva (Cal.com/Google Calendar) o deja el lead en la hoja. Se carga solo al pulsar el botón.
  Cobrar alta + mensualidad + consumo. Revisar conversaciones cada mes (parte del plan IA 24/7).

---

## 6. Qué demo enseñar según lo que se quiere vender

| Quiero vender… | Abrir | Por qué |
|---|---|---|
| Reservas | 38, 44, 27, 31 | Drawer de reserva por pasos, barra sticky, próxima hora libre |
| Cotizador | 33, 39, 38 | Estimador de boda, paquete de detailing, plan estético con número que rueda |
| Configurador | 35, 43, 22, 30 | Ramo 3D, termo con acabados, taco, uñas |
| Carrito → WhatsApp | 22, 35, 43 | Pedido completo con total |
| Antes / después | 24, 39 | Slider clásico y versión “cine” con scroll |
| Velocidad pura | 01, 13, 25 | 0–3 KB de JS, LH 97–100 |
| Efecto “premio” | 37, 39, 43, 36, 42 | Scroll-scrub y Three.js con LH 90–100 |

---

## 7. Fuentes de precios y datos citados

- España: [Qotora — Cuánto cuesta una página web en España (2026)](https://qotora.com/es/blog/cuanto-cuesta-una-pagina-web/) y [Hanoon Labs](https://hanoon-labs.com/es/blog/cuanto-cuesta-una-pagina-web-profesional/): web pyme básica 800–3.000 € sin IVA; con integraciones 2.500–6.000 €; tienda 1.500–5.000 €; mantenimiento 25–150 €/mes; dominio + hosting 110–340 €/año. También [AVGG 2026](https://www.avgg.es/blog/cuanto-cuesta-pagina-web-pymes-2026).
- México: [ANAYALA — precios 2026](https://anayala.com/recursos/cuanto-cuesta-una-pagina-web): landing 4.000–15.000 MXN; tienda 35.000–120.000 MXN.
- Colombia: [WebMarketerPro — precios 2026](https://webmarketerpro.com/blog/cuanto-cuesta-una-pagina-web-en-colombia/): landing 0,5–3 M COP; tienda 1,8–15 M COP. LatAm general: [WebSys — precios LATAM 2026](https://www.websysrl.com/blog/precios-desarrollo-web-apps-y-software-latam).
- EE. UU.: [LocusPilot — 48 precios publicados](https://locuspilot.com/blog/how-much-does-a-website-cost): 5–10 páginas $350–1.450 freelance, $1.850–3.500 agencia; [Uwindi — 54 listas de precios de agencias](https://uwindi.com/web-design-agency-prices/): plan básico medio $59/mes, con cambios $119/mes; [TopTenTool — mantenimiento 2026](https://toptentool.com/website-maintenance-pricing-for-small-business/): freelance $50–150/mes, agencia $100–500/mes.
- Velocidad: [Deloitte — Milliseconds Make Millions](https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html) (0,1 s más rápido en móvil ↔ +8,4 % de conversiones y +9,2 % de ticket medio en retail; 15 marcas retail y 20,5 M de sesiones; es correlación, no garantía) · [web.dev case study](https://web.dev/case-studies/milliseconds-make-millions).
- Reseñas: [BrightLocal Local Consumer Review Survey 2026](https://www.brightlocal.com/Research/Local-Consumer-Review-Survey/) (97 % leen reseñas de negocios locales; EE. UU.).
- WhatsApp: [WhatsApp Help Center — click to chat](https://faq.whatsapp.com/5913398998672934) (`wa.me/<número>?text=`; el texto se precarga).
- Referencia de ticket “premium animado”: Viktor Oddy dice cobrar ~$3.000 por una landing con 2 revisiones (afirmación suya, no verificada; ver `METODO-VIKTOR-ODDY.md`).

Los rangos de §3 combinan estas fuentes con un margen por animación premium y funciones de conversión; revisar cada 6 meses.
