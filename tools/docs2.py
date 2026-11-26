# Tanda 2: genera <id>/README.md y el bloque "Tanda 2" del README raíz (entre marcadores) a partir de variants2.py + perf.json + lighthouse/resumen.json
import os,sys,json,re
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'); sys.path.insert(0,os.path.join(ROOT,'src'))
from variants2 import V2
perf={r['id']:r for r in json.load(open(os.path.join(ROOT,'perf.json')))}
lp=os.path.join(ROOT,'lighthouse','resumen.json'); lh=json.load(open(lp)) if os.path.exists(lp) else {}
BASE='https://0xdapa.github.io/escalatam-web-lab/'
def _g(d,*k):
    for x in k:
        if not isinstance(d,dict) or x not in d: return '—'
        d=d[x]
    return d
rows=''
for v in V2:
    p=perf.get(v['id'],{}); l=lh.get(v['id'],{})
    rows+=f"| {v['id'][:2]} | [{v['name']}]({BASE}{v['id']}/) | {v['niche']} | {v['style']} | {v['tech']} | {_g(p,'js_gz_kb')} KB | {_g(p,'page_gz_kb')} KB | {_g(l,'performance')} / {_g(l,'accessibility')} / {_g(l,'best-practices')} / {_g(l,'seo')} | {_g(l,'lcp')} | {_g(l,'tbt')} | {_g(l,'cls')} |\n"
    files=sorted(f for f in os.listdir(os.path.join(ROOT,v['id'])) if not f.startswith('.'))
    how='\n'.join('- '+h for h in v['how'])
    open(os.path.join(ROOT,v['id'],'README.md'),'w').write(f"""# {v['id'][:2]} · {v['name']} — {v['niche']}

**Demo en vivo:** {BASE}{v['id']}/

- **Lenguaje de diseño:** {v['style']}
- **Técnica:** {v['tech']}
- **Tipografías:** {v['fonts']} (OFL, subconjunto latino en `fonts/`, autoalojadas)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**, textos y cifras **de ejemplo**, sin fotos ni marcas de terceros: todo lo visual está hecho con código (CSS/SVG/Canvas/WebGL).

## Cómo funciona

{how}

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | {_g(p,'js_kb')} KB / {_g(p,'js_gz_kb')} KB |
| Página completa gzip (HTML+CSS+JS+fuentes+assets) | {_g(p,'page_gz_kb')} KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | {_g(l,'performance')} / {_g(l,'accessibility')} / {_g(l,'best-practices')} / {_g(l,'seo')} |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | {_g(l,'fcp')} / {_g(l,'lcp')} / {_g(l,'tbt')} / {_g(l,'cls')} |
| FPS hero móvil / escritorio* | {_g(p,'mob','fps_hero')} / {_g(p,'desk','fps_hero')} |

\\* Chrome headless con GPU por software (SwiftShader) en un servidor sin gráfica: peor caso.
Comprobado: sin errores de consola y sin scroll horizontal a 390 px.

## Archivos

{chr(10).join('- `'+f+'`' for f in files)}

Respeta `prefers-reduced-motion`. Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`) y datos reales.
""")
block=f"""<!-- TANDA2:START -->
## Tanda 2 — 10 webs, 10 lenguajes de diseño

Después de la tanda 1 (la misma web con 12 motores 3D), la tanda 2 son **10 webs completas que no se parecen entre sí**:
cada una con una estética y una técnica distinta, priorizando restaurantes. **Cero librerías** (todo vanilla, nada que
vendorizar), fuentes OFL autoalojadas y todo lo visual generado por código. Negocios ficticios, cifras de ejemplo.

| # | Demo en vivo | Nicho | Lenguaje de diseño | Técnica | JS gzip | Página gzip | Lighthouse móvil (Perf / A11y / BP / SEO) | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|---|
{rows}
Página gzip = todo lo que hay en la carpeta (HTML, CSS, JS con gzip -9 + woff2 + imágenes). En 18 incluye los 60 fotogramas WebP.
Lighthouse: preset móvil (CPU ×4, 4G simulada) contra localhost. Cada carpeta tiene su README con cómo funciona.
<!-- TANDA2:END -->
"""
rp=os.path.join(ROOT,'README.md'); r=open(rp).read()
if '<!-- TANDA2:START -->' in r: r=re.sub(r'<!-- TANDA2:START -->.*?<!-- TANDA2:END -->\n',block,r,flags=re.S)
else: r=r.replace('\n## Elegir variante en 10 segundos','\n'+block+'\n## Elegir variante en 10 segundos',1)
open(rp,'w').write(r); print('docs2 ok')
