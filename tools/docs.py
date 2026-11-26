# Genera README.md (raíz) y <id>/README.md a partir de variants.py + perf.json + lighthouse/resumen.json
import os,sys,json
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'); sys.path.insert(0,os.path.join(ROOT,'src'))
from variants import V
perf={r['id']:r for r in json.load(open(os.path.join(ROOT,'perf.json')))}
lp=os.path.join(ROOT,'lighthouse','resumen.json'); lh=json.load(open(lp)) if os.path.exists(lp) else {}
BASE='https://0xdapa.github.io/escalatam-web-lab/'
FONTN={'anton':'Anton','bebas':'Bebas Neue','oswald':'Oswald 700','teko':'Teko 600','antonio':'Antonio 700','saira':'Saira Extra Condensed 800','fjalla':'Fjalla One','barlow':'Barlow Condensed 800','league':'League Gothic','bigshoulders':'Big Shoulders Display 800','sofia':'Sofia Sans Extra Condensed 900'}
LIBV={'ogl':'ogl 1.0.11','twgl':'twgl.js 7.0.0','regl':'regl 2.1.1 (build unchecked)','picogl':'picogl 0.17.9','zdog':'zdog 1.1.3','lenis+anime':'lenis 1.3.28 + animejs 4.5.0','motion':'motion 14.14.0 (mini animate + scroll + inView)',None:'ninguna'}
def g(d,*k,default='—'):
    for x in k:
        if not isinstance(d,dict) or x not in d: return default
        d=d[x]
    return d
rows=''
for v in V:
    p=perf.get(v['id'],{}); l=lh.get(v['id'],{})
    rows+=f"| {v['id'][:2]} | [{v['name']}]({BASE}{v['id']}/) | {v['niche']} | {v['tech']} | {g(p,'js_gz_kb')} KB | {g(p,'page_gz_kb')} KB | {g(l,'performance')} | {g(l,'lcp')} | {g(l,'tbt')} | {g(p,'mob','fps_hero')} / {g(p,'desk','fps_hero')} |\n"
readme=f'''# Escalatam Web Lab — 12 variantes ligeras de una web premium

**Galería en vivo:** {BASE}

La misma web “estilo Viktor Oddy” (titular condensado con glitch, nav mono, un solo color de acento, objeto 3D en el hero,
transición de horizonte con brillo, cifras fijadas que cuentan y servicios en scroll horizontal) reconstruida con **12 tecnologías
más ligeras que Three.js**, cada una aplicada a un nicho real de nuestros leads.

> ⚠️ **Todo es demostración.** Los 12 negocios son **ficticios**, las **cifras y textos son de ejemplo** y no hay fotos: las imágenes
> son gradientes CSS y objetos generados por código. Antes de enseñar una demo a un cliente hay que poner sus datos reales
> (ver `SOP.md`, paso 10). No se usa ningún logo ni marca de terceros. No se publica ningún asset ni prompt de Viktor Oddy.

Demo anterior (Three.js r170, ~150 KB gz de JS): https://0xdapa.github.io/escalatam-demo-3d/

## Documentación

| Archivo | Qué contiene |
|---|---|
| [`SOP.md`](SOP.md) | Procedimiento completo paso a paso: investigación del lead, tokens, prompt superdetallado, assets, construcción, presupuesto de rendimiento, pruebas, publicación y checklist por lead |
| [`METODO-VIKTOR-ODDY.md`](METODO-VIKTOR-ODDY.md) | Todo lo aprendido del método de Viktor Oddy, con enlaces a sus posts |
| [`PROMPTS.md`](PROMPTS.md) | 6 prompts para pegar en el agente cloud y sacar una demo por lead |
| `<id>/README.md` | Notas de cada variante: técnica, cómo funciona el hero, tamaños y rendimiento |

## Las 12 variantes

| # | Demo en vivo | Nicho | Tecnología | JS gzip | Página gzip* | Lighthouse móvil | LCP móvil | TBT | FPS hero móvil / escritorio** |
|---|---|---|---|---|---|---|---|---|---|
{rows}
\\* Página completa comprimida: HTML + CSS + JS (gzip -9) + 4 fuentes woff2 (≈ 65 KB, la mayor parte del peso).
\\** FPS medidos con Chrome headless y **GPU por software (SwiftShader)** en un servidor sin tarjeta gráfica y compartido: es el peor caso.
En móviles y portátiles reales con GPU, las variantes WebGL y Canvas suelen ir a la tasa de refresco de la pantalla. Las variantes con
FPS bajos en esta tabla (06 raymarching, 08 globo Canvas 2D, 12 partículas) son las que más dependen de la GPU/rasterizado.
Lighthouse: preset móvil por defecto (CPU ×4 más lenta, red 4G simulada), servido desde localhost.

## Elegir variante en 10 segundos

- **Lo más ligero posible** (gama baja, 1–3 KB de JS): `09-css3d`, `10-svg`, `01-webgl2-puro`, `06-shader-raymarch`.
- **Más “wow” visual**: `01-webgl2-puro` (brasas), `06-shader-raymarch` (metal líquido), `04-regl` (neón).
- **Serio / profesional**: `02-ogl` (clínica), `05-picogl` (abogados), `03-twgl` (inmobiliaria).
- **Simpático / ilustrado**: `07-zdog` (café), `11-lenis-anime` (pastelería).
- **Ubicación / viajes**: `08-canvas2d-globo`.
- **Calma / bienestar**: `12-motion-particulas`.

## Estructura del repositorio

```
index.html                ← galería (GitHub Pages sirve la raíz de main)
NN-variante/              ← cada demo, autocontenida: index.html, core.css, app.js, fonts/, README.md
src/core/                 ← núcleo compartido (CSS + JS vanilla ≈ 2 KB gz)
src/variants.py           ← textos, colores y fuentes de las 12 variantes
src/variants/NN-*/        ← el hero de cada variante (hero.js + hero.css/stage.html opcionales)
src/build.py              ← construye todo (esbuild empaqueta y minifica; librerías incluidas, sin CDN)
tools/                    ← shoot.py (capturas), perf.py (tamaños/FPS), lighthouse.sh, gallery.py, docs.py
pkg/package.json          ← versiones exactas de las librerías
thumbs/                   ← miniaturas de la galería
```

Cada carpeta `NN-*` funciona sola: se puede copiar a cualquier hosting (Netlify, Vercel, cPanel) tal cual.

## Reconstruir

```bash
cd pkg && npm install && cd .. && ln -s pkg/node_modules node_modules
python3 src/build.py && python3 -m http.server 8817   # http://localhost:8817/
python3 tools/shoot.py 01-webgl2-puro && python3 tools/perf.py && ./tools/lighthouse.sh
python3 tools/gallery.py && python3 tools/docs.py
```

## Créditos y licencias

- Librerías (MIT): OGL, TWGL, regl, PicoGL, Zdog, Lenis, Motion, anime.js. esbuild para empaquetar.
- Fuentes: Google Fonts (SIL Open Font License).
- Puntos de tierra del globo (variante 08): Natural Earth vía world-atlas (dominio público).
- Diseño, código y textos: Escalatam. Inspiración de estructura: el método público de Viktor Oddy (ver `METODO-VIKTOR-ODDY.md`).
'''
open(os.path.join(ROOT,'README.md'),'w').write(readme)
for v in V:
    p=perf.get(v['id'],{}); l=lh.get(v['id'],{})
    md=f'''# {v['id']} — {v['name']} ({v['niche']})

**Demo:** {BASE}{v['id']}/ · **Tecnología:** {v['tech']}

> Negocio **ficticio**. Textos, cifras ({', '.join(str(s[2])+str(s[0]).replace('.',',')+str(s[3]) for s in v['stats'])}) y reseñas son **de ejemplo**. La imagen de la sección de cifras es un gradiente CSS (sin foto).

## Cómo funciona el hero
{v['how']}

## Identidad
- Fuente display: **{FONTN.get(v['font'],v['font'])}** · texto: Archivo · etiquetas: JetBrains Mono (todas self-hosted en `fonts/`).
- Colores: fondo `{v['colors']['bg']}`, tinta `{v['colors']['fg']}`, acento `{v['colors']['acc']}`, acento 2 `{v['colors']['acc2']}`, cifras `{v['colors']['bg2']}`.
- Librería: {LIBV.get(v['lib'],v['lib'])} — empaquetada dentro de `app.js` (sin CDN).

## Medidas (Chrome headless, GPU por software — peor caso)
| | Escritorio 1440×900 | Móvil 390×844 (DPR 2) |
|---|---|---|
| FCP | {g(p,'desk','fcp_ms')} ms | {g(p,'mob','fcp_ms')} ms |
| LCP | {g(p,'desk','lcp_ms')} ms | {g(p,'mob','lcp_ms')} ms |
| FPS hero | {g(p,'desk','fps_hero')} | {g(p,'mob','fps_hero')} |
| FPS durante scroll | {g(p,'desk','fps_scroll')} | {g(p,'mob','fps_scroll')} |

- `app.js`: {g(p,'js_kb')} KB minificado · **{g(p,'js_gz_kb')} KB gzip** (núcleo + librería + hero).
- Página completa: {g(p,'page_gz_kb')} KB gzip (incluye ~65 KB de fuentes).
- Lighthouse móvil: rendimiento {g(l,'performance')}, accesibilidad {g(l,'accessibility')}, buenas prácticas {g(l,'best-practices')}, SEO {g(l,'seo')} · LCP {g(l,'lcp')} · TBT {g(l,'tbt')} · CLS {g(l,'cls')}.

## Archivos
- `index.html` — HTML generado por `src/build.py` (datos en `src/variants.py`).
- `core.css` — núcleo compartido + estilos propios del hero.
- `app.js` — bundle minificado. Código fuente legible: `src/variants/{v['id']}/hero.js` y `src/core/core.js`.

## Para adaptarla a un cliente
1. Cambiar textos, cifras y colores en `src/variants.py` (entrada `{v['id']}`).
2. `python3 src/build.py {v['id']}` y revisar con `python3 tools/shoot.py {v['id']}`.
3. Sustituir el gradiente de `--art` por una foto real del negocio si la hay (WebP, ≤ 1600 px).
'''
    open(os.path.join(ROOT,v['id'],'README.md'),'w').write(md)
print('docs ok')
