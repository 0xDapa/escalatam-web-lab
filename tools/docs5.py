# Tanda 5: README.md + DESIGN.md por demo, bloque TANDA5 en README.md, sección "Tanda 5" en index.html, miniaturas y REFERENCIAS.
# Fuentes: src/variants5.py + lighthouse/resumen.json + img/creditos.json + shots/t5/<id>-{desk,mob}-hero.png
import os,sys,json,re,gzip,html
from PIL import Image
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'); os.chdir(ROOT); sys.path.insert(0,'src')
from variants5 import V5
lh=json.load(open('lighthouse/resumen.json')); BASE='https://0xdapa.github.io/escalatam-web-lab/'; e=html.escape
def gz(p): return len(gzip.compress(open(p,'rb').read(),9))/1024
def perf(d):
    js=[os.path.join(d,'js',f) for f in os.listdir(os.path.join(d,'js'))]
    return dict(main=round(gz(os.path.join(d,'js','main.js')),1),js=round(sum(gz(f) for f in js),1))
rows='';cards='';refrows=''
os.makedirs('thumbs',exist_ok=True)
for v in V5:
    d=v['id'];n=d[:2];p=perf(d);l=lh.get(d,{});L=lambda k:l.get(k,'—');D=v['design']
    Image.open(f'shots/t5/{d}-desk-hero.png').convert('RGB').resize((800,500),Image.LANCZOS).save(f'thumbs/{d}.webp',quality=80)
    m=Image.open(f'shots/t5/{d}-mob-hero.png').convert('RGB'); m=m.resize((180,int(m.height*180/m.width)),Image.LANCZOS).crop((0,0,180,390)); m.save(f'thumbs/{d}-m.webp',quality=80)
    refs=f"[{v['ref']}]({v['ref_url']})"+(f" · [{v['ref2'].split('//')[1].strip('/')}]({v['ref2']})" if v.get('ref2') else '')
    rows+=f"| {n} | [{v['name']}]({BASE}{d}/) | {v['niche']} | {refs} | {v['libs']} | {v['value'][0]} | {p['main']} KB | {L('performance')} / {L('accessibility')} / {L('best-practices')} / {L('seo')} |\n"
    refrows+=f"| {refs} | {v['tech']} | {n} · {v['name']} |\n"
    cp=os.path.join(d,'img','creditos.json'); cred=json.load(open(cp)) if os.path.exists(cp) else []
    credmd='\n'.join(f"- `img/{c['file']}-*.webp` — “{c['title']}”{(', '+c['creator']) if c.get('creator') else ''} · [{c.get('source','Openverse')}]({c['page']}) · {c.get('license','CC0')}" for c in cred) or '- Sin fotos: la lata es un render Three.js en el navegador y el póster es SVG.'
    files=sorted(f for f in os.listdir(d) if not f.startswith('.') and f not in('README.md',))
    val='\n'.join('- '+x for x in v['value'])
    open(os.path.join(d,'README.md'),'w').write(f"""# {n} · {v['name']} — {v['niche']}

**Demo en vivo:** {BASE}{d}/ · versión en inglés: {BASE}{d}/?lang=en

**Ideal para:** {v['ideal']}.

- **Referencia replicada:** {refs}. Se replica la técnica y la sensación, no el código: código, marca, textos y gráficos son propios. Notas en [`REFERENCIAS.md`](../REFERENCIAS.md).
- **Técnica estrella:** {v['tech']}
- **Librerías (empaquetadas con esbuild, sin CDN):** {v['libs']}
- **Tipografías:** {v['fonts']} (OFL, autoalojadas y recortadas en `fonts/`)
- **Decisiones de diseño:** [`DESIGN.md`](DESIGN.md) (tipo, color, layout, densidad, tono y motion en números; reglas de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

> Negocio **ficticio**. Precios, cifras y reseñas **de ejemplo** (marcados en la página). WhatsApp abre `wa.me` sin número: poner el del cliente en `<meta name="wa">`.

## Funciones que venden

{val}
- Schema.org `{v['schema']}` (JSON-LD) con dirección, geo, horario/ofertas.
- Conmutador ES/EN (`?lang=en`, se recuerda en localStorage) que también cambia los mensajes de WhatsApp.
- Menú hamburguesa en móvil, objetivos ≥ 44 px, `prefers-reduced-motion` respetado.

## Rendimiento

| Métrica | Valor |
|---|---|
| JS inicial gzip (main.js) | {p['main']} KB |
| JS total gzip (incluye chunks que solo se descargan tras la primera interacción) | {p['js']} KB |
| Lighthouse móvil (rendimiento / accesibilidad / buenas prácticas / SEO) | {L('performance')} / {L('accessibility')} / {L('best-practices')} / {L('seo')} |
| FCP / LCP / TBT / CLS | {L('fcp')} / {L('lcp')} / {L('tbt')} / {L('cls')} |

Comprobado en Chrome headless (1440 px y 390 px): sin errores de consola, sin scroll horizontal.

Código fuente legible en [`src/t5/{d}/`](../src/t5/{d}/) (`node tools/build5.mjs {d}`); utilidades comunes en `src/t5/lib/` (idioma, WhatsApp, Lenis, reveals, menú).

## Fotos

{credmd}

## Archivos

{chr(10).join('- `'+f+'`' for f in files)}
""")
    if not os.path.exists(os.path.join(d,'DESIGN.md')) or '--force' in sys.argv:
        open(os.path.join(d,'DESIGN.md'),'w').write(f"""# DESIGN.md · {v['name']}

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | {D['type']} |
| Color | {D['color']} |
| Layout | {D['layout']} |
| Densidad | {D['density']} |
| Tono | {D['tone']} |
| Motion (números) | {D['motion']} |

**Referencia real:** {refs}. **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** {v['tech']}

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
""")
    lum=(0.2126*int(v['acc'][1:3],16)+0.7152*int(v['acc'][3:5],16)+0.0722*int(v['acc'][5:7],16))/255
    cards+=f'''<article class="v" style="--a:{v['acc']};--af:{'#111' if lum>.55 else '#fff'}">
  <a class="th" href="{d}/"><img src="thumbs/{d}.webp" width="800" height="500" loading="lazy" alt="Vista de escritorio de {e(v['name'])}"><img class="ph" src="thumbs/{d}-m.webp" width="180" height="390" loading="lazy" alt="Vista móvil"></a>
  <div class="meta"><span class="m n">{n} · {e(v['libs'])}</span><h2 class="d">{e(v['name'])}</h2><p class="niche">{e(v['niche'])}</p>
  <p class="niche"><b>Ideal para:</b> {e(v['ideal'])}</p>
  <p class="tech m">{e(v['tech'])}</p>
  <dl class="m"><div><dt>Función clave</dt><dd>{e(v['value'][0].split(' (')[0].split(':')[0])}</dd></div><div><dt>Replica</dt><dd>{e(v['ref'])}</dd></div><div><dt>Lighthouse móvil</dt><dd>{L('performance')}</dd></div></dl>
  <div class="ac"><a class="pill f m" href="{d}/">Abrir demo</a><a class="pill m" href="{v['ref_url']}" rel="noopener">Referencia</a><a class="pill m" href="https://github.com/0xDapa/escalatam-web-lab/tree/main/{d}">Código y DESIGN.md</a></div></div>
</article>'''
block=f"""<!-- TANDA5:START -->
## Tanda 5 — 8 webs que replican referencias premiadas con nuestro enfoque

Tomamos las mejores webs de la investigación t5 (Crav Burgers, Odyssée, ERA Residence, OH Architecture, MERSI, Son Daven, Lando Norris, Mana, Scout Motors)
y replicamos su **técnica y sensación** con código, marca y copy propios, en nichos con demanda y con lo que vende Escalatam: **reserva/pedido por WhatsApp,
calculadoras, configuradores, schema LocalBusiness y ES/EN**. Reglas visuales de [`ANTI-AI-SLOP.md`](ANTI-AI-SLOP.md); cada demo tiene su `DESIGN.md`.

- Stack: **GSAP 3.15 (ScrollTrigger, SplitText, Flip) + Lenis** en todas; **OGL** (49) y **Three.js** (51) cargados por intención; **View Transitions API** (48).
- Cada demo: JSON-LD (`Restaurant`, `MedicalClinic`, `RealEstateAgent`, `ProfessionalService`, `Hotel`, `Store`, `AutoDealer`), conmutador ES/EN, WhatsApp prellenado por servicio, menú móvil, un solo momento orquestado (nada de fade-up en cada sección).

| # | Demo en vivo | Nicho | Replica | Tecnología | Función clave | JS inicial gzip | Lighthouse móvil (Perf / A11y / BP / SEO) |
|---|---|---|---|---|---|---|---|
{rows}
Lighthouse: preset móvil (CPU ×4, 4G simulada) contra localhost en Chrome headless. Collage local (no se publica): `python3 tools/collage5.py` → `shots/collage-tanda5.png`.
<!-- TANDA5:END -->
"""
r=open('README.md').read()
r=re.sub(r'<!-- TANDA5:START -->.*?<!-- TANDA5:END -->\n',block,r,flags=re.S) if '<!-- TANDA5:START -->' in r else r.replace('<!-- TANDA4:END -->\n','<!-- TANDA4:END -->\n\n'+block,1)
r=re.sub(r'^# Escalatam Web Lab — \d+ demos','# Escalatam Web Lab — 52 demos',r,count=1,flags=re.M)
open('README.md','w').write(r)
ix=open('index.html').read()
sec=f'''<!-- T5:START --><section class="t2h" id="tanda-5"><p class="over">Tanda 5 · nuevo</p><h2 class="d">8 webs que replican referencias premiadas</h2><p class="l">La técnica y la sensación de Crav Burgers, Odyssée, ERA Residence, OH Architecture, MERSI, Son Daven, Lando Norris, Mana y Scout Motors, con código y marca propios y lo que vende: reserva o pedido por WhatsApp, calculadoras, configuradores, schema LocalBusiness y ES/EN. GSAP + Lenis, OGL y Three.js por intención; reglas anti AI slop y un DESIGN.md por demo.</p></section>
<section class="grid">{cards}</section><!-- T5:END -->
'''
ix=re.sub(r'<!-- T5:START -->.*?<!-- T5:END -->\n',sec,ix,flags=re.S) if '<!-- T5:START -->' in ix else ix.replace('<!-- T4:START -->',sec+'<!-- T4:START -->',1)
ix=ix.replace('<p class="over">Tanda 4 · nuevo</p>','<p class="over">Tanda 4</p>')
ix=re.sub(r'<span>\d+ demos ligeras</span>','<span>52 demos ligeras</span>',ix)
if 'href="#tanda-5"' not in ix: ix=ix.replace('<a class="pill m" href="#tanda-4">','<a class="pill m" href="#tanda-5">Tanda 5 · Réplicas de referencias</a><a class="pill m" href="#tanda-4">',1)
if '<b>Tanda 5:</b>' not in ix: ix=ix.replace(' <b>Tanda 4:</b>',' <b>Tanda 5:</b> 8 réplicas de webs premiadas con GSAP + Lenis y funciones que venden (WhatsApp, calculadoras, configuradores). <b>Tanda 4:</b>',1)
open('index.html','w').write(ix)
rf=open('REFERENCIAS.md').read()
rblock=f"""<!-- T5REF:START -->
---

# Tanda 5 — webs replicadas (técnica y sensación, nunca código)

Capturas, mediciones y detección de librerías en `research-refs/t5/` (fuera del repositorio, .gitignore). Licencia GSAP: gratuita desde 3.13 (incluye SplitText, Flip, ScrollTrigger).

| Referencia | Qué replicamos | Demo |
|---|---|---|
{refrows}<!-- T5REF:END -->
"""
rf=re.sub(r'<!-- T5REF:START -->.*?<!-- T5REF:END -->\n',rblock,rf,flags=re.S) if '<!-- T5REF:START -->' in rf else rf.rstrip('\n')+'\n\n'+rblock
open('REFERENCIAS.md','w').write(rf); print('docs5 ok')
