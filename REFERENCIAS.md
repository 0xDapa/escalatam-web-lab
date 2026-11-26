# Referencias — webs reales premium analizadas para la Tanda 3

Investigación hecha en noviembre de 2026 para Escalatam: webs **reales** de negocios "de personas" (clínicas, despachos,
hoteles, restaurantes, profesionales) con premios de diseño (Awwwards Site of the Day / Honorable Mention) o líderes de su
nicho. Cada una se abrió en Chromium headless (1440×900 y 390×844) y con un script se extrajeron tipografías calculadas,
colores de fondo/texto, métricas del H1, botones, navegación, CTAs, encabezados y tecnología detectada.

**Reglas que seguimos**
- Solo apuntamos lo **observado** (valores de `getComputedStyle`, textos visibles, scripts cargados). Nada inventado.
- Las capturas y los datos crudos están en `research-refs/` (**ignorado por git**, nunca se publica). Ni capturas ni código de terceros en el repo.
- Las demos de la Tanda 3 **adaptan el lenguaje de diseño** (estructura, ritmo, tipo de tipografía, paleta, interacción), con código propio, marcas ficticias, textos en español y fuentes OFL equivalentes, no las originales.

**Cómo se descubrieron:** galerías de Awwwards (Sites of the Day y nominados por categoría), más líderes conocidos de cada
nicho (salud, marca personal, hotel, restaurante). CSSDA, FWA y Godly **no** se recorrieron de forma sistemática (pendiente).

---

## Las 12 referencias adaptadas

### 1. Aventura Dental Arts → `24-dental-premium`
- **URL:** https://aventuradentalarts.com/ · **Nicho:** odontología estética · **Reconocimiento:** Awwwards SOTD (7,41)
- **Por qué es buena:** convierte una clínica en una marca de lujo: fotografía en blanco y negro, titular serif gigante y muy pocos colores. Transmite precio alto sin decirlo.
- **Tokens observados:** Instrument Serif a 153 px con letter-spacing −4,59 px; Inter Tight 14 px. Colores #14151D / #EAE8E8.
- **Estructura:** hero "Premium Esthetic Dentistry" → "Beyond the Smile" → tratamientos → equipo → CTA "Book a call" + teléfono.
- **Técnica:** Nuxt + Lenis (scroll suave) + Swiper + preloader Lottie.
- **Qué reutilizamos:** serif enorme con tracking negativo, B/N + un solo tono, CTA de llamada repetido. Añadimos antes/después y reserva por WhatsApp.

### 2. PXR Legal → `25-abogados`
- **URL:** https://pxr.law/ · **Nicho:** despacho de abogados · **Reconocimiento:** Awwwards SOTD (7,26)
- **Por qué es buena:** un despacho que no parece despacho: sans ultraligera, colores arena/naranja/limón y un titular con una palabra dentro de una píldora.
- **Tokens observados:** fuente propia "PXR Repro" peso 200 a 93 px; fondo #B7B4A2, acentos #FF854D y #FAF796; botones muy redondeados.
- **Estructura:** "Where [bold vision] meets legal strategy." → Our Expertise → What Our Clients Say → Insights → "Get in touch" (mailto).
- **Técnica:** web a medida con vídeo; menú en esquina.
- **Qué reutilizamos:** píldora en el titular (en la demo rota entre "tu empresa / familia / patrimonio…"), paleta cálida no corporativa, testimonios y publicaciones. Sin fotos.

### 3. ERA Residence → `26-inmobiliaria-lujo`
- **URL:** https://www.era-residence.com/ · **Nicho:** promoción residencial · **Reconocimiento:** Awwwards SOTD (7,61)
- **Por qué es buena:** vende un edificio como si fuera moda: Didone en mayúsculas, script, máscaras en arco y un texto circular "THREE REASONS TO CHOOSE ERA".
- **Tokens observados:** ambroise-francois (Didone, mayúsculas, 172 px), sloop-script, Maison Neue Extended 9,9 px. Ciruela #340C24, crema #F3F3EC, cielo #B5CEDB.
- **Estructura:** hero → tres razones → día/noche → unidades → "BOOK A CALL" + teléfono.
- **Técnica:** Webflow + GSAP/ScrollTrigger + Lenis.
- **Qué reutilizamos:** arcos, texto circular, conmutador día/noche y paleta de tres tonos (con Bodoni Moda + Pinyon Script).

### 4. The Drake Hotel → `27-hotel-boutique`
- **URL:** https://thedrake.ca/ · **Nicho:** hotel boutique · **Reconocimiento:** Awwwards SOTD (7,44)
- **Por qué es buena:** mucha personalidad con una retícula muy sobria: palabras en caja ("Meet The Drake"), script "Toronto" sobre fotos, burdeos y una sección lavanda.
- **Tokens observados:** Sequel Sans 64 px / 415 + Maison Mono 10 px; #222223, burdeos #672B3C, sección lavanda.
- **Estructura:** hero → "Meet The Drake" → habitaciones → "What's On" (agenda) → Latest News.
- **Técnica:** WordPress + Lenis + Swiper.
- **Qué reutilizamos:** filetes finos, titulares en caja, script sobre color, agenda; añadimos barra de reserva fija.

### 5. Central Restaurante → `28-alta-cocina`
- **URL:** https://centralrestaurante.com.pe/ · **Nicho:** alta cocina (Lima)
- **Por qué es buena:** cuenta el menú como un viaje por altitudes de Perú; tipografía ultraligera y titulares apilados centrados.
- **Tokens observados:** PP Editorial New Ultralight + PP Editorial Sans 10 px; #F2F2F2 / #222.
- **Estructura:** titular apilado "UN RECORRIDO / VERTICAL / POR EL / TERRITORIO / PERUANO" → experiencia → "RESERVAS" (enlace a mesa247).
- **Técnica:** Framer, 6 vídeos.
- **Qué reutilizamos:** narrativa por "niveles" (en la demo, profundidad del mar de 0 a 200 m con fondo que cambia), titulares apilados, serif ultraligera (Newsreader).

### 6. Amici → `29-cafe-brunch`
- **URL:** https://restaurant-amici.com/ · **Nicho:** restaurante italiano · **Reconocimiento:** Awwwards SOTD (7,41)
- **Por qué es buena:** alegre y cercana: vichy, fotos sueltas como en una mesa, tarjeta de fidelidad en el pie.
- **Tokens observados:** Fraunces mayúsculas 100 px + Gotham 12 px; #F9EDDE, oliva #606D01, #515726; botones rectos.
- **Estructura:** "CHEZ AMICI, LA VIE EST UNE FÊTE…" → "SAVOUREUSE ET ENSOLEILLÉE" → "VOTRE RÉSERVATION PREGO !".
- **Técnica:** WordPress + Lenis.
- **Qué reutilizamos:** vichy en CSS, fotos dispersas (arrastrables), banda oliva, tarjeta de sellos interactiva.

### 7. Les Nanas Studio Floral → `30-nail-studio`
- **URL:** https://lesnanas-studiofloral.com/ · **Nicho:** floristería de bodas · **Reconocimiento:** Awwwards Honorable Mention
- **Por qué es buena:** degradado rosa→naranja con mucha energía, wordmark gigante, texto circular, "KIND WORDS" y "LET'S GET IN TOUCH" partidos en dos líneas.
- **Tokens observados:** miller-banner + Goolangola + Raleway 15 px; #DB7070 → #F66011.
- **Técnica:** WordPress + Swiper, 2 vídeos.
- **Qué reutilizamos:** degradado, insignia circular, titulares en contorno + script ("Palabras bonitas"). Lo llevamos a un estudio de uñas con probador SVG.

### 8. Parsley Health → `31-fisioterapia`
- **URL:** https://www.parsleyhealth.com/ · **Nicho:** medicina funcional
- **Por qué es buena:** salud cálida y confiable; conversión clarísima ("Join now" / "Verify insurance"), logos de aseguradoras y "Two ways to get started".
- **Tokens observados:** Teodor 64 px / 300 + Euclid Circular B 18 px; #F8F6F2 y verde azulado #284849; botones píldora; valoración con estrellas.
- **Técnica:** Next.js.
- **Qué reutilizamos:** paleta crema/verde azulado, píldoras, franja de cobertura (en texto, sin logos), bloque "Dos formas de empezar"; añadimos mapa corporal.

### 9. Elite Design Studio → `32-estudio-interiorismo`
- **URL:** https://www.elite-designstudio.com/ · **Nicho:** interiorismo · **Reconocimiento:** Awwwards SOTD (7,5)
- **Por qué es buena:** wordmark "ELITE" a todo el ancho con fotos flotando encima/debajo: editorial y muy memorable.
- **Tokens observados:** ivymode, Cormorant Garamond, Sweet Sans Pro.
- **Técnica:** Nuxt.
- **Qué reutilizamos:** wordmark gigante + fotos con parallax, índice de proyectos; añadimos paleta de materiales interactiva.

### 10. Alessandra Zanghi → `33-bodas-eventos`
- **URL:** https://alessandrazanghi.studio/ · **Nicho:** wedding planner (Lago di Garda) · **Reconocimiento:** Awwwards SOTD
- **Por qué es buena:** monocromo elegante y orientado a SEO/conversión: botón "BOOK A DATE" que abre WhatsApp y una lista larga de guías ("Lake Garda Wedding Cost Guide"…).
- **Tokens observados:** Poiret One 60 px + Montserrat 12 px; #1E1E1E; botón negro cuadrado (radio 0, padding 18×34 px).
- **Qué reutilizamos:** la misma pareja tipográfica (OFL), botones cuadrados, CTA a WhatsApp, guías; añadimos calendario de disponibilidad y estimador.

### 11. Function Health → `34-nutricion`
- **URL:** https://www.functionhealth.com/ · **Nicho:** salud preventiva
- **Por qué es buena:** titular corto en dos tiempos ("Get health. Not stuff."), cifras grandes ("160+ lab tests") y pasos simples ("Testing is easy").
- **Tokens observados:** Financier Display 80 px / 300, FT Base, Fragment Mono; crema #FEF9EF, terracota #B05A36.
- **Qué reutilizamos:** crema + terracota, serif ligera con itálica, etiquetas mono (Fragment Mono, OFL), cifras grandes; añadimos test y plato en donut.

### 12. Ali Abdaal → `23-marca-personal`
- **URL:** https://aliabdaal.com/ · **Nicho:** creador / marca personal
- **Por qué es buena:** la referencia de "marca personal que convierte": "How Can I Help You?" con tarjetas por intención y el boletín como CTA principal ("Join 370k+ Subscribers").
- **Tokens observados:** Elza + Recoleta; fondo #F9F6F3; botón azul #5DCDF1 con radio 8 px. Tecnología: WordPress.
- **Qué reutilizamos:** serif redondeada amable (Young Serif), selector por intención, boletín como imán de leads, recursos.

---

## Otras referencias capturadas (no adaptadas en esta tanda)

| Web | Nicho | Lo observado / por qué guardarla |
|---|---|---|
| [lavadental.lv](https://lavadental.lv/en) | Dental | #031C14 / #DDEFDE, botón píldora "Make an appointment", Nuxt + Lenis. Alternativa verde oscuro a la dental B/N. |
| [andreadiego.es](https://www.andreadiego.es/) | Interiorismo (Bilbao) | FK Grotesk + OT Neglige, CTA WhatsApp "Cuéntanos", WordPress. Referente en español. |
| [aebeleinteriors.com](https://aebeleinteriors.com/) | Interiorismo | GT America + Ivar Fine, fondo #F9F5EF, texto dorado #C19A5B, "TURNKEY", teléfono y mailto. |
| [lironmoran-interiors.com](https://www.lironmoran-interiors.com) | Interiorismo | H1 "ICONIC INTERIORS" en cardinalfruit a ~260 px mayúsculas, botón WhatsApp, Next.js. |
| [triplettapizza.com](https://www.triplettapizza.com/) | Pizzería | Oswald a ~270 px, Webflow. Para comida rápida con carácter. |
| [tigermilkrestaurants.com](https://www.tigermilkrestaurants.com/) | Restaurante | Reserva vía SevenRooms. |
| [sondaven.com](https://sondaven.com/en) | Inmobiliaria/turismo | GSAP + Webflow, efecto dither/glitch. |
| [silver-pinewood.com](https://silver-pinewood.com/) | Residencial | TT Fors 98 px mayúsculas, #F0EAE2 / #282828, CTA "CONTACT US" a modal. |
| [affectiosocietatis.com](https://affectiosocietatis.com/) | Abogado | Estética retro tipo consola (VT323), Lenis. Para un despacho muy disruptivo. |
| [aman.com](https://www.aman.com/) | Hotel de lujo | Lyon Display + Whitney, botón "Reserve" negro sin radio. |
| [horizonte-village.com](https://horizonte-village.com/), [explore.ownprimland.com](https://explore.ownprimland.com/) | Turismo / resort | Nuxt + Lenis + canvas/vídeo en hero. |
| [bluebottlecoffee.com](https://bluebottlecoffee.com/), [flowerbx.com](https://www.flowerbx.com/), [zoe.com](https://zoe.com/), [swordhealth.com](https://swordhealth.com/), [jamesclear.com](https://jamesclear.com/), [theagencyre.com](https://www.theagencyre.com/), [hellotend.com](https://www.hellotend.com/), [disfrutarbarcelona.com](https://www.disfrutarbarcelona.com/) | Café, flores, salud, marca personal, inmobiliaria, dental, restaurante | Capturadas como contexto de nicho; sin adaptar todavía. |

**No se pudieron analizar:** noma.dk (captcha 403), veleyross.wedding, highergroundmelbourne.com.au y littlepecks.com (errores HTTP), curenails.co (captura sí, extracción falló). waxpoetics.com se descartó (tienda de música, fuera de nicho).

## Patrones que se repiten en las mejores (para cualquier cliente)
1. **Una tipografía protagonista enorme** (serif con tracking negativo, Didone, o sans ultraligera) + una sans/mono pequeña para todo lo demás.
2. **Paleta de 2–3 colores** con un acento poco corporativo (naranja, burdeos, terracota, oliva).
3. **CTA único y repetido** ("Book a call", "BOOK A DATE", "Reservas"), muchas veces directo a WhatsApp o teléfono.
4. **Una interacción memorable ligada al negocio** (antes/después, día/noche, viaje por altitudes), no animación gratuita.
5. **Scroll suave (Lenis) + GSAP** en casi todas las premiadas. En nuestras demos lo resolvemos con CSS y JS vanilla para mantener Lighthouse móvil ≥ 90.


---

# Tanda 4 — referencias de movimiento y WebGL

Material de investigación (artículos guardados, capturas, mediciones) en `research-refs/t4/`, **fuera del repositorio** (.gitignore).
De cada referencia tomamos principios y medidas, nunca código.

| Referencia | Qué medimos / aprendimos | Dónde lo aplicamos |
|---|---|---|
| [emilkowal.ski](https://emilkowal.ski/) (artículos + skills MIT) | Curvas, duraciones < 300 ms, scale(.97), nada desde scale(0), origin-aware, blur en crossfades, muelles bounce 0 | Todas (ver METODO-EMIL-KOWALSKI.md) |
| [Sonner](https://sonner.emilkowal.ski/) | Pila de toasts: escala 0,05·i, 14 px, expandir al hover, swipe por velocidad, pausa con pestaña oculta | `src/t4/lib/toast.js` |
| [Vaul](https://vaul.emilkowal.ski/) | Drawer iOS `cubic-bezier(.32,.72,0,1)` 500 ms, arrastre 1:1, descarte por velocidad, fondo escalado | `src/t4/lib/drawer.js` (35, 38, 44) |
| [animations.dev](https://animations.dev/) | Catálogo de micro-interacciones, FLIP, número que rueda | 38, 36, 39, 40 |
| [Apple AirPods Pro](https://www.apple.com/airpods-pro/) / [MacBook Pro](https://www.apple.com/macbook-pro/) | Sticky de 900 px en padres de 2.250 px, vídeos ligados al scroll, texto gris→negro por palabra, nav `saturate(180%) blur(20px)`, titulares 96/100 tracking −1,44 px, curvas `(.4,0,.6,1)` y `(.28,.11,.32,1)` | 37, 39, 43, 44 |
| [Apple Watch Ultra](https://www.apple.com/apple-watch-ultra-3/) | Anillos de actividad, cifras grandes | 40 |
| [Linear](https://linear.app/) | `cubic-bezier(.32,.72,0,1)` y `(.165,.84,.44,1)`, densidad de producto | 38, 40 |
| [Vercel](https://vercel.com/) / [Rauno](https://rauno.me/) / [Paco](https://paco.me/) | Interfaces mínimas, hover compartido, detalles tipográficos | 42 (gira), 36 |
| [Lusion](https://lusion.co/) | Planos de imagen deformados por la velocidad del scroll | 36 |
| [Active Theory](https://activetheory.net/) | Shaders como identidad, partículas | 41, 42 |
| [Igloo Inc](https://www.igloo.inc/) | Objeto 3D protagonista con materiales físicos y scroll narrativo | 35, 42 |
| [Bruno Simon](https://bruno-simon.com/) | Escenas procedurales con personalidad | 37 |
