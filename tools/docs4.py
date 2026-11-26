# Tanda 4: README por demo, bloque TANDA4 en README.md, sección "Tanda 4" en index.html y miniaturas.
# Fuentes: src/variants4.py + lighthouse/resumen.json + img/creditos.json + shots/live/t4-<id>-{desk,mob}.png (o shots/t4/*-hero.png)
import os,sys,json,re,gzip,html
from PIL import Image
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'); os.chdir(ROOT); sys.path.insert(0,'src')
from variants4 import V4
lh=json.load(open('lighthouse/resumen.json')); BASE='https://0xdapa.github.io/escalatam-web-lab/'; e=html.escape
ACC={'35':'#b8405e','36':'#e2c08d','37':'#3b6fd8','38':'#b48aa6','39':'#ff6a2b','40':'#2437ff','41':'#a3231a','42':'#c6ff33','43':'#8e8e93','44':'#5f7f6e'}
def gz(p): return len(gzip.compress(open(p,'rb').read(),9))/1024
def perf(d):
    js=[os.path.join(d,'js',f) for f in os.listdir(os.path.join(d,'js'))]; main=os.path.join(d,'js','main.js')
    allf=[os.path.join(r,f) for r,_,fs in os.walk(d) for f in fs if f!='README.md']
    return dict(main=round(gz(main),1),js=round(sum(gz(f) for f in js),1),page=round(sum(gz(f) for f in allf),1))
rows='';cards=''
os.makedirs('thumbs',exist_ok=True)
for v in V4:
    d=v['id'];n=d[:2];p=perf(d);l=lh.get(d,{});L=lambda k:l.get(k,'—')
    desk=f'shots/live/t4-{d}-desk.png'; mob=f'shots/live/t4-{d}-mob.png'
    if not os.path.exists(desk): desk=f'shots/t4/{d}-desk-hero.png'; mob=f'shots/t4/{d}-mob-hero.png'
    Image.open(desk).convert('RGB').resize((800,500),Image.LANCZOS).save(f'thumbs/{d}.webp',quality=80)
    m=Image.open(mob).convert('RGB'); m=m.resize((180,int(m.height*180/m.width)),Image.LANCZOS).crop((0,0,180,390)); m.save(f'thumbs/{d}-m.webp',quality=80)
    libs=' + '.join(x for x,b in (('Three.js 0.187',v['three']),('Motion 14',v['motion'])) if b)
    rows+=f"| {n} | [{v['name']}]({BASE}{d}/) | {v['niche']} | {libs}{' · scroll-scrub' if v['scrub'] else ''} | [{v['ref']}]({v['ref_url']}) | {p['main']} KB | {p['js']} KB | {L('performance')} / {L('accessibility')} / {L('best-practices')} / {L('seo')} |\n"
    cp=os.path.join(d,'img','creditos.json'); cred=json.load(open(cp)) if os.path.exists(cp) else []
    credmd='\n'.join(f"- `img/{c['file']}-*.webp` — “{c['title']}”{(', '+c['creator']) if c.get('creator') else ''} · [{c.get('source','Openverse')}]({c['page']}) · {c.get('license','CC0')}" for c in cred) or '- Sin fotos de terceros: todo lo visual es código (Three.js/CSS/SVG) o renders propios del modelo 3D.'
    renders=[f for f in os.listdir(os.path.join(d,'img'))] if os.path.isdir(os.path.join(d,'img')) else []
    files=sorted(f for f in os.listdir(d) if not f.startswith('.') and f!='README.md')
    how='\n'.join('- '+h for h in v['how'])
    open(os.path.join(d,'README.md'),'w').write(f"""# {n} · {v['name']} — {v['niche']}

**Demo en vivo:** {BASE}{d}/

**Ideal para:** {v['ideal']}.

- **Inspirada en:** [{v['ref']}]({v['ref_url']}) — se toma el principio (ritmo, tipo de interacción, técnica), no el código: todo el código, la marca, los textos y los modelos 3D son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md) y [`METODO-EMIL-KOWALSKI.md`](../METODO-EMIL-KOWALSKI.md).
- **Lenguaje de diseño:** {v['style']}
- **Técnica estrella:** {v['tech']}
- **Librerías (empaquetadas con esbuild, sin CDN):** {libs or 'ninguna'}
- **Tipografías:** {v['fonts']} (OFL, autoalojadas en `fonts/`)

> Negocio **ficticio**. Precios, cifras y testimonios **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente.

## Secciones
Hero · servicios con precios de ejemplo · interacción propia del nicho · prueba social (testimonios/cifras de ejemplo) · galería · reserva/contacto con CTA a WhatsApp · pie.

## Cómo funciona

{how}

Código fuente legible en [`src/t4/{d}/`](../src/t4/{d}/) (se compila con `node tools/build4.mjs {d}`). Librerías comunes propias: `src/t4/lib/` (toasts tipo Sonner, drawer tipo Vaul, utilidades de scroll).

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | {p['main']} KB |
| JS total gzip (incluye el chunk de Three.js, que solo se descarga tras la primera interacción) | {p['js']} KB |
| Carpeta completa gzip | {p['page']} KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | {L('performance')} / {L('accessibility')} / {L('best-practices')} / {L('seo')} |
| FCP / LCP / TBT / CLS | {L('fcp')} / {L('lcp')} / {L('tbt')} / {L('cls')} |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal. Respeta `prefers-reduced-motion` (fundidos en lugar de movimiento; los scroll-scrub se convierten en contenido estático).

## Fotos

{credmd}

## Archivos

{chr(10).join('- `'+f+'`' for f in files)}
""")
    acc=ACC[n]; lum=(0.2126*int(acc[1:3],16)+0.7152*int(acc[3:5],16)+0.0722*int(acc[5:7],16))/255
    cards+=f'''<article class="v" style="--a:{acc};--af:{'#111' if lum>.55 else '#fff'}">
  <a class="th" href="{d}/"><img src="thumbs/{d}.webp" width="800" height="500" loading="lazy" alt="Vista de escritorio de {e(v['name'])}"><img class="ph" src="thumbs/{d}-m.webp" width="180" height="390" loading="lazy" alt="Vista móvil"></a>
  <div class="meta"><span class="m n">{n} · {e(libs)}{' · scroll-scrub' if v['scrub'] else ''}</span><h2 class="d">{e(v['name'])}</h2><p class="niche">{e(v['niche'])}</p>
  <p class="niche"><b>Ideal para:</b> {e(v['ideal'])}</p>
  <p class="tech m">{e(v['tech'])}</p>
  <dl class="m"><div><dt>JS inicial gzip</dt><dd>{p['main']} KB</dd></div><div><dt>Inspiración</dt><dd>{e(v['ref'])}</dd></div><div><dt>Lighthouse móvil</dt><dd>{L('performance')}</dd></div></dl>
  <div class="ac"><a class="pill f m" href="{d}/">Abrir demo</a><a class="pill m" href="{v['ref_url']}" rel="noopener">Referencia</a><a class="pill m" href="https://github.com/0xDapa/escalatam-web-lab/tree/main/{d}">Código y notas</a></div></div>
</article>'''
block=f"""<!-- TANDA4:START -->
## Tanda 4 — 10 webs con Three.js y Motion (Emil Kowalski + Apple)

Investigamos los artículos y skills (MIT) de **Emil Kowalski** (Sonner, Vaul, animations.dev), las páginas de producto de **Apple**
(scroll-scrub, sticky de 500+ vh, texto que se ilumina) y webs WebGL premiadas (Lusion, Active Theory, Igloo, Bruno Simon).
Cada demo aplica esos principios con código propio a un nicho vendible. Método completo con snippets: [`METODO-EMIL-KOWALSKI.md`](METODO-EMIL-KOWALSKI.md).

- **{sum(v['three'] for v in V4)} con Three.js** ({', '.join(v['id'][:2] for v in V4 if v['three'])}) · **{sum(v['motion'] for v in V4)} con Motion** ({', '.join(v['id'][:2] for v in V4 if v['motion'])}) · **{sum(v['scrub'] for v in V4)} con scroll-scrub tipo Apple** ({', '.join(v['id'][:2] for v in V4 if v['scrub'])}).
- Three.js se **carga por intención** (primer scroll/puntero/tecla o 7 s) y un póster renderizado del mismo modelo hace de LCP → Lighthouse móvil ≥ 90 con WebGL.

| # | Demo en vivo | Nicho | Tecnología | Inspirada en | JS inicial gzip | JS total gzip | Lighthouse móvil (Perf / A11y / BP / SEO) |
|---|---|---|---|---|---|---|---|
{rows}
Lighthouse: preset móvil (CPU ×4, 4G simulada) contra localhost en Chrome headless con GPU por software. Collage local (no se publica, `shots/` está en .gitignore): `python3 tools/collage4.py` → `shots/collage-tanda4.png`.
<!-- TANDA4:END -->
"""
r=open('README.md').read()
r=re.sub(r'<!-- TANDA4:START -->.*?<!-- TANDA4:END -->\n',block,r,flags=re.S) if '<!-- TANDA4:START -->' in r else r.replace('<!-- TANDA3:END -->\n','<!-- TANDA3:END -->\n\n'+block,1)
r=re.sub(r'^# Escalatam Web Lab — \d+ demos','# Escalatam Web Lab — 44 demos',r,count=1,flags=re.M)
open('README.md','w').write(r)
ix=open('index.html').read()
sec=f'''<!-- T4:START --><section class="t2h" id="tanda-4"><p class="over">Tanda 4 · nuevo</p><h2 class="d">10 webs con Three.js y Motion</h2><p class="l">Principios de Emil Kowalski (Sonner, Vaul: muelles sin rebote, &lt; 300 ms, nada nace de scale(0), toasts y drawers interrumpibles) y de las páginas de producto de Apple (scroll-scrub, texto que se ilumina), más WebGL estilo Lusion/Active Theory. Siete escenas Three.js hechas por código, cargadas solo tras la primera interacción para mantener Lighthouse ≥ 90.</p></section>
<section class="grid">{cards}</section><!-- T4:END -->
'''
ix=re.sub(r'<!-- T4:START -->.*?<!-- T4:END -->\n',sec,ix,flags=re.S) if '<!-- T4:START -->' in ix else ix.replace('<section class="t2h" id="tanda-3">',sec+'<section class="t2h" id="tanda-3">',1)
ix=ix.replace('<p class="over">Tanda 3 · nuevo</p>','<p class="over">Tanda 3</p>')
ix=re.sub(r'<span>\d+ demos ligeras</span>','<span>44 demos ligeras</span>',ix)
if 'href="#tanda-4"' not in ix: ix=ix.replace('<a class="pill m" href="#tanda-3">','<a class="pill m" href="#tanda-4">Tanda 4 · Three.js + Motion</a><a class="pill m" href="#tanda-3">',1)
if '<b>Tanda 4:</b>' not in ix: ix=ix.replace(' Todos los negocios son ficticios',' <b>Tanda 4:</b> 10 webs con Three.js y Motion siguiendo a Emil Kowalski y las páginas de producto de Apple. Todos los negocios son ficticios',1)
open('index.html','w').write(ix); print('docs4 ok')
