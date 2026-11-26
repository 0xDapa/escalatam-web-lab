# Tanda 3: genera <id>/README.md y el bloque "Tanda 3" del README raíz (entre marcadores) a partir de variants3.py + perf.json + lighthouse/resumen.json + img/creditos.json
import os,sys,json,re
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'); sys.path.insert(0,os.path.join(ROOT,'src'))
from variants3 import V3
perf={r['id']:r for r in json.load(open(os.path.join(ROOT,'perf.json')))}
lp=os.path.join(ROOT,'lighthouse','resumen.json'); lh=json.load(open(lp)) if os.path.exists(lp) else {}
BASE='https://0xdapa.github.io/escalatam-web-lab/'
def _g(d,*k):
    for x in k:
        if not isinstance(d,dict) or x not in d: return '—'
        d=d[x]
    return d
rows=''
for v in V3:
    p=perf.get(v['id'],{}); l=lh.get(v['id'],{})
    rows+=f"| {v['id'][:2]} | [{v['name']}]({BASE}{v['id']}/) | {v['niche']} | {v['ideal']} | [{v['ref']}]({v['ref_url']}) | {v['tech']} | {_g(p,'js_gz_kb')} KB | {_g(p,'page_gz_kb')} KB | {_g(l,'performance')} / {_g(l,'accessibility')} / {_g(l,'best-practices')} / {_g(l,'seo')} |\n"
    d=os.path.join(ROOT,v['id']); files=sorted(f for f in os.listdir(d) if not f.startswith('.') and f!='README.md')
    cp=os.path.join(d,'img','creditos.json'); cred=json.load(open(cp)) if os.path.exists(cp) else []
    credmd='\n'.join(f"- `img/{c['file']}-*.webp` — “{c['title']}”, {c['creator']} · [StockSnap]({c['page']}) · CC0" for c in cred) or '- Sin fotos: todo lo visual está hecho con CSS/SVG.'
    how='\n'.join('- '+h for h in v['how'])
    open(os.path.join(d,'README.md'),'w').write(f"""# {v['id'][:2]} · {v['name']} — {v['niche']}

**Demo en vivo:** {BASE}{v['id']}/

**Ideal para:** {v['ideal']}.

- **Inspirada en:** [{v['ref']}]({v['ref_url']}) — se adapta su lenguaje de diseño (estructura, ritmo, tipo de tipografía, paleta). Código, textos, marca e imágenes son propios; no se usa ningún recurso de esa web. Análisis en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Lenguaje de diseño:** {v['style']}
- **Técnica estrella:** {v['tech']}
- **Tipografías:** {v['fonts']} (OFL, subconjunto latino autoalojado en `fonts/`)
- **Librerías:** ninguna. HTML + CSS + JS vanilla, sin CDN, sin build.

> Negocio **ficticio**. Textos, precios y testimonios **de ejemplo** (marcados como tal en la página). El botón de WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · presentación/sobre · servicios con precios de ejemplo · interacción propia del nicho · testimonios de ejemplo · galería/fotos · reserva o contacto con CTA a WhatsApp · pie.

## Cómo funciona

{how}

## Tamaño y rendimiento

| Métrica | Valor |
|---|---|
| JS (sin comprimir / gzip -9) | {_g(p,'js_kb')} KB / {_g(p,'js_gz_kb')} KB |
| Página completa gzip (HTML+CSS+JS+fuentes+imágenes) | {_g(p,'page_gz_kb')} KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | {_g(l,'performance')} / {_g(l,'accessibility')} / {_g(l,'best-practices')} / {_g(l,'seo')} |
| FCP / LCP / TBT / CLS (Lighthouse móvil) | {_g(l,'fcp')} / {_g(l,'lcp')} / {_g(l,'tbt')} / {_g(l,'cls')} |

Comprobado en Chrome headless: sin errores de consola y sin scroll horizontal a 390 px. Respeta `prefers-reduced-motion`.

## Fotos (CC0, descargadas y convertidas a WebP 960/560 px)

{credmd}

## Archivos

{chr(10).join('- `'+f+'`' for f in files)}

Para usarla con un cliente: cambiar textos, colores (variables en `:root` de `style.css`), fotos y el número de WhatsApp.
""")
block=f"""<!-- TANDA3:START -->
## Tanda 3 — 12 webs inspiradas en webs reales premiadas

Investigamos ~40 webs reales de negocios de personas (Awwwards SOTD/HM y líderes de nicho) y analizamos a fondo su diseño
(ver [`REFERENCIAS.md`](REFERENCIAS.md)). Cada demo **adapta el lenguaje de diseño de una referencia distinta** a un nicho
vendible, con código propio, marca ficticia, textos en español, fotos CC0 locales y CTA a WhatsApp. Sin librerías.

| # | Demo en vivo | Nicho | Ideal para | Inspirada en | Técnica | JS gzip | Página gzip | Lighthouse móvil (Perf / A11y / BP / SEO) |
|---|---|---|---|---|---|---|---|---|
{rows}
Lighthouse: preset móvil (CPU ×4, 4G simulada) contra localhost en Chrome headless con GPU por software. Fotos: StockSnap (CC0), créditos en el README de cada carpeta.
<!-- TANDA3:END -->
"""
rp=os.path.join(ROOT,'README.md'); r=open(rp).read()
if '<!-- TANDA3:START -->' in r: r=re.sub(r'<!-- TANDA3:START -->.*?<!-- TANDA3:END -->\n',block,r,flags=re.S)
else: r=r.replace('<!-- TANDA2:END -->\n','<!-- TANDA2:END -->\n\n'+block,1)
open(rp,'w').write(r); print('docs3 ok')
