# SOP — Cómo creamos una demo web premium para un lead (método Escalatam Web Lab)

> Procedimiento operativo estándar, paso a paso, que se aplicó para crear las 12 variantes de este repositorio y la demo original en Three.js.
> Objetivo: en **1 jornada o menos** tener una web de demostración que impresione al dueño del negocio, cargue en menos de 2 s en un móvil y se pueda enviar por WhatsApp como un simple enlace.

---

## 0. Resumen en 12 pasos (checklist rápida)

1. Elegir el lead y anotar su dolor principal (web caída, sin web, web antigua, no reserva online…).
2. Elegir **una referencia visual** (una web premium o un diseño de galería) y una **variante técnica** de este laboratorio.
3. Extraer los **tokens de diseño**: tipografías, colores, espaciados, tiempos de animación.
4. Escribir el **prompt superdetallado** de recreación (plantilla en `PROMPTS.md`).
5. Recopilar o generar los **assets**: logo, fotos reales del negocio, imagen o vídeo IA si hace falta.
6. Escribir el **copy** en el idioma del cliente, con su dolor como primer argumento.
7. Construir la web con el núcleo (`src/core`) + el hero de la variante elegida.
8. Pasar el **presupuesto de rendimiento** (JS ≤ 35 KB gzip, LCP < 2,5 s, 60 fps en móvil medio).
9. Probar en **escritorio 1440 px y móvil 390 px**, con capturas automáticas.
10. Revisar **textos, cifras y fotos de ejemplo** → sustituir o marcar.
11. Publicar en **GitHub Pages** y verificar que la URL devuelve 200 y se ve bien.
12. Enviar el enlace al lead con el mensaje aprobado por David (nunca sin aprobación).

---

## 1. Investigar al lead (15–30 min)

| Qué mirar | Dónde | Qué anotar |
|---|---|---|
| ¿Tiene web? ¿Funciona? | Navegador + `curl -I` | Código HTTP (500, dominio suspendido, Wix con `info@mysite.com`…) |
| Redes sociales | Instagram / Facebook / Google Maps | Fotos reales, colores, logo, horario, reseñas |
| Competencia directa | 2–3 negocios similares de su ciudad | Qué hacen mejor (reserva online, menú, WhatsApp) |
| Idioma | Su web / Instagram / país | Español, inglés o ambos |
| Dolor principal | Todo lo anterior | Una frase: *"No tienen reserva online y su web da error 500"* |

**Regla:** el primer titular de la demo debe responder a ese dolor (ej. restaurante sin reservas → botón "Reservar mesa" visible en el hero).

## 2. Elegir referencia y variante técnica

1. **Referencia visual:** una web que ya funcione muy bien en su nicho (galerías como MotionSites, Awwwards, Godly, Land-book). Se usa como *estructura y ritmo*, **nunca** se copian sus imágenes, textos, logos ni código.
2. **Variante técnica** (ver tabla del `README.md`):
   - Cliente con poco presupuesto / móviles modestos → **09 CSS 3D** o **10 SVG** (1–3 KB de JS).
   - Restaurante, bar, joyería (impacto visual máximo) → **01 WebGL2 puro** o **06 shader**.
   - Clínica, despacho, servicios profesionales (limpio y serio) → **02 OGL** o **05 PicoGL**.
   - Inmobiliaria / arquitectura → **03 TWGL** (ciudad instanciada).
   - Gimnasio / música / energía → **04 regl** (partículas neón).
   - Café, panadería, tienda simpática → **07 Zdog** o **11 Lenis + anime.js**.
   - Viajes, logística, exportación → **08 Canvas 2D globo**.
   - Spa, yoga, bienestar → **12 Motion + partículas**.

## 3. Extraer los tokens de diseño (20 min)

De la referencia (o de la marca del cliente) anotar en una tabla:

| Token | Ejemplo (Brasa Norte) | Cómo se obtiene |
|---|---|---|
| Fuente display (condensada, mayúsculas) | Anton | DevTools → Computed → `font-family`; si es de pago, buscar equivalente libre en Google Fonts |
| Fuente de texto | Archivo 400/700 | Igual |
| Fuente mono (nav, etiquetas) | JetBrains Mono | Igual |
| Fondo hero / tinta / acento / acento 2 | `#120d0a` / `#f4ece2` / `#ff5a1f` / `#ffc46b` | Cuentagotas (DevTools o captura + PIL) |
| Fondo de cifras, fondo de servicios | `--bg2`, `--bg3` | Alternar claro ↔ oscuro entre secciones |
| Tamaño del titular | `clamp(54px, 7.9vw, 124px)`, interlineado 0,95 | Medir en 1440 px y convertir a `vw` |
| Tiempos | reveal 0,95 s, retardo 110 ms por línea, glitch 0,75 s | Grabar la pantalla y contar frames |

En este repo los tokens viven en `src/variants.py` (`colors`, `font`, `dls`) y se inyectan como variables CSS (`--bg`, `--acc`…).

## 4. La técnica del "prompt superdetallado de recreación"

Es la clave del método de Viktor Oddy (ver `METODO-VIKTOR-ODDY.md`). En vez de pedir *"hazme una web bonita"*, se escribe un documento de 1 500–4 000 palabras que describe **cada píxel y cada milisegundo**:

1. **Resumen en 1 párrafo:** tipo de negocio, sensación, paleta, nº de secciones, tecnología ("HTML + CSS + JS vanilla, sin framework, sin build").
2. **Tabla de medios** con URL exacta de cada imagen/vídeo y para qué se usa.
3. **Tabla de fuentes** con familia, pesos y uso.
4. **Paleta** con hex exactos y dónde va cada color.
5. **Layout por sección** con medidas en px a 1440×900 (posición, tamaño de fuente, interlineado, márgenes).
6. **Animaciones**: qué se mueve, desde qué valor, hasta qué valor, con qué curva (`cubic-bezier(.2,.75,.1,1)`), duración y retardo.
7. **Comportamiento con scroll**: qué se fija (sticky), en qué porcentaje de scroll empieza/termina cada efecto.
8. **Móvil**: cómo se reordena todo por debajo de 760 px.
9. **Reglas de rendimiento**: DPR máximo, pausar render fuera de pantalla, `prefers-reduced-motion`.
10. **Lista de prohibiciones**: "no uses librerías externas salvo X", "no autoplay de vídeo", "no cambies los textos".

Plantilla lista para copiar: `PROMPTS.md` → *Prompt 2*.

## 5. Assets (imágenes y vídeo)

- **Prioridad 1 – fotos reales del cliente** (Instagram, Google Maps). Pedir permiso antes de publicar fuera de la demo.
- **Prioridad 2 – generación IA** (Viktor usa Higgsfield para imágenes y Kling para vídeo; alternativas: Grok Imagine, Midjourney, Runway). Prompt tipo: *"fotografía cenital de una parrilla de leña con brasas naranjas, luz cálida, 35 mm, sin texto"*.
- **Prioridad 3 – arte procedural** (lo que usa este laboratorio): gradientes CSS, shaders y SVG. Cero peso, cero derechos, pero menos fotorrealista.
- Optimizar: WebP/AVIF, máx. 1600 px de ancho, `loading="lazy"` fuera del primer pantallazo.
- **Marcar siempre** en el README qué fotos son IA o de ejemplo.

## 6. Copy

- Titular: 2–4 líneas cortas en mayúsculas (cada línea ≤ 12 caracteres para que el glitch luzca).
- Overline: *servicio · ciudad* (SEO local).
- Lede: 1–2 frases con beneficio + llamada a la acción.
- Cifras: 4 datos verificables del negocio (años, clientes, valoración, tiempo de respuesta). **Si no se conocen, poner ejemplo y marcarlo.**
- Servicios: 4 tarjetas (título 2–3 palabras + 1 frase).
- CTA final: pregunta directa ("¿Mesa para esta noche?").

## 7. Construcción (este repositorio)

```
src/
  core/core.css      ← layout + glitch + horizonte + cifras + servicios (compartido)
  core/core.js       ← reveals, count-up, scroll, loop de render con pausa (≈2 KB gz)
  variants.py        ← datos de las 12 variantes (textos, colores, fuentes)
  variants/<id>/hero.js   ← el objeto 3D de cada variante (+ hero.css / stage.html opcionales)
  build.py           ← genera <id>/index.html, copia fuentes, empaqueta JS con esbuild
tools/
  shoot.py  perf.py  lighthouse.sh  gallery.py  docs.py
```

Comandos:

```bash
cd pkg && npm install            # librerías (ogl, twgl.js, regl, picogl, zdog, lenis, motion, animejs, esbuild, lighthouse)
cd .. && ln -s pkg/node_modules node_modules
python3 src/build.py             # construye las 12 variantes (o: python3 src/build.py 03-twgl)
python3 -m http.server 8817      # servir en local → http://localhost:8817/
python3 tools/shoot.py 01-webgl2-puro   # capturas escritorio + móvil en shots/
python3 tools/perf.py            # tamaños gzip, FCP/LCP, FPS → perf.json
./tools/lighthouse.sh            # Lighthouse móvil → lighthouse/resumen.json
python3 tools/gallery.py && python3 tools/docs.py   # galería + README
```

Para **un cliente nuevo**: duplicar la entrada de la variante en `variants.py`, cambiar `id`, textos y colores, copiar la carpeta `src/variants/<id>` y construir. O pegar el *Prompt 3* de `PROMPTS.md` en el agente cloud.

### Reglas técnicas que siguen todas las variantes
- **Librerías vendorizadas**: nada de CDNs. esbuild empaqueta la librería + el hero en un único `app.js` minificado (tree-shaking: solo entra lo que se usa).
- **Fuentes self-hosted** (`fonts/*.woff2`, subconjunto latin, con `font-display: swap` y `preload` de la display).
- **DPR limitado** a 1,5–1,75 en canvas/WebGL (en móviles 3× no aporta nada y triplica el coste).
- **Render solo cuando se ve**: `IntersectionObserver` + `visibilitychange` paran el bucle `requestAnimationFrame`.
- **`prefers-reduced-motion`**: se dibuja un único frame estático y los textos aparecen sin animación.
- **Scroll sin librería** (excepto variantes 11 y 12): un solo listener pasivo + `requestAnimationFrame`, `position: sticky` para fijar secciones, `transform: translate3d` para mover.
- **Glitch del titular solo con CSS** (`clip-path` + pseudo-elementos `::before/::after` con `content: attr(data-t)`).

## 8. Presupuesto de rendimiento

| Métrica | Objetivo | Cómo se mide |
|---|---|---|
| JS (gzip) | ≤ 35 KB (ideal ≤ 15 KB) | `tools/perf.py` (`js_gz_kb`) |
| Peso total página (gzip, fuentes incluidas) | ≤ 120 KB sin fotos | `tools/perf.py` (`page_gz_kb`) |
| LCP móvil | < 2,5 s | Lighthouse móvil |
| CLS | < 0,05 | Lighthouse |
| TBT | < 200 ms | Lighthouse |
| FPS hero | 60 en un móvil medio con GPU | `tools/perf.py` (en servidor sin GPU sale menor: es el peor caso) |

Si una variante no cumple: bajar nº de partículas, bajar DPR, reducir resolución interna del canvas (ver 06 y 12), o cambiar a una variante más ligera (09/10).

## 9. Pruebas

1. `python3 tools/shoot.py <id>` → 10 capturas (hero, horizonte, cifras, servicios, CTA × escritorio/móvil).
2. Abrir las capturas y revisar: titular legible sobre el objeto 3D, sin desbordes horizontales (`overflowX: false`), acentos (Ó, Í) no recortados, botones visibles.
3. Probar a mano en un móvil real: arrastrar el objeto, scroll completo, botones.
4. Consola sin errores (el script de capturas los lista).

## 10. Publicar en GitHub Pages

```bash
gh repo create 0xDapa/<repo> --public --source . --push
gh api -X POST repos/0xDapa/<repo>/pages -f "source[branch]=main" -f "source[path]=/"
# esperar 1–2 min
curl -I https://0xdapa.github.io/<repo>/<id>/    # debe dar 200
BASE=https://0xdapa.github.io/<repo>/ python3 tools/shoot.py <id>   # capturas de la versión publicada
```

Incluir `.nojekyll` en la raíz para que GitHub sirva todo tal cual.

## 11. Checklist por lead (copiar en cada ficha)

- [ ] Dolor del lead anotado en 1 frase
- [ ] Idioma decidido (ES / EN)
- [ ] Variante técnica elegida y justificada
- [ ] Nombre, logo y colores reales del negocio (o marcados como provisionales)
- [ ] Fotos reales o IA marcadas como tal
- [ ] Cifras reales o marcadas "de ejemplo"
- [ ] Botón principal = la acción que más dinero le da (reservar, pedir cita, WhatsApp)
- [ ] JS ≤ 35 KB gz, LCP < 2,5 s, sin errores de consola
- [ ] Capturas escritorio + móvil revisadas
- [ ] URL de GitHub Pages devuelve 200
- [ ] Mensaje de contacto redactado y **aprobado por David** antes de enviar (WhatsApp: ≥ 15 min entre mensajes, cada texto distinto)

## 12. Errores que ya cometimos (y cómo evitarlos)

- **Acentos recortados** por `clip-path` en el titular → el estado final del reveal usa `inset(-60% -20% -60% -5%)`.
- **Atributo instanciado en la posición 0** (TWGL/WebGL2 + ANGLE): la geometría sale rota → fijar `layout(location=0)` para la posición.
- **regl en modo desarrollo** pesa 128 KB → importar `regl/dist/regl.unchecked.js` (94 KB → 33 KB gz).
- **Canvas 2D con miles de `fillRect` cambiando `globalAlpha`** → agrupar por profundidad en 4 `fill()` (de 17 a 48 fps en software).
- **Ciudad 3D tapando el titular** → máscara `linear-gradient` en el `.stage`.
