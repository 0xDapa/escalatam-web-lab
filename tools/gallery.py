# Genera site/index.html (galería) + miniaturas a partir de variants.py, perf.json y shots/.
import os,sys,json,html
from PIL import Image
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'); sys.path.insert(0,os.path.join(ROOT,'src'))
from variants import V
SITE=ROOT; SH=os.path.join(ROOT,'shots')
perf={r['id']:r for r in json.load(open(os.path.join(ROOT,'perf.json')))}
os.makedirs(os.path.join(SITE,'thumbs'),exist_ok=True)
for v in V:
    Image.open(f"{SH}/{v['id']}-desk-hero.png").convert('RGB').resize((800,500),Image.LANCZOS).save(f"{SITE}/thumbs/{v['id']}.webp",quality=78)
    Image.open(f"{SH}/{v['id']}-mob-hero.png").convert('RGB').resize((180,390),Image.LANCZOS).save(f"{SITE}/thumbs/{v['id']}-m.webp",quality=78)
e=html.escape
cards=''
for i,v in enumerate(V):
    p=perf.get(v['id'],{}); c=v['colors']
    cards+=f'''<article class="v" style="--a:{c['acc']}">
  <a class="th" href="{v['id']}/"><img src="thumbs/{v['id']}.webp" width="800" height="500" loading="lazy" alt="Vista de escritorio de {e(v['name'])}"><img class="ph" src="thumbs/{v['id']}-m.webp" width="180" height="390" loading="lazy" alt="Vista móvil"></a>
  <div class="meta"><span class="m n">{v['id'][:2]}</span><h2 class="d">{e(v['name'])}</h2><p class="niche">{e(v['niche'])}</p>
  <p class="tech m">{e(v['tech'])}</p>
  <dl class="m"><div><dt>JS gzip</dt><dd>{p.get('js_gz_kb','?')} KB</dd></div><div><dt>Página gzip</dt><dd>{p.get('page_gz_kb','?')} KB</dd></div><div><dt>FPS móvil*</dt><dd>{p.get('mob',{}).get('fps_hero','?')}</dd></div></dl>
  <div class="ac"><a class="pill f m" href="{v['id']}/">Abrir demo</a><a class="pill m" href="https://github.com/0xDapa/escalatam-web-lab/tree/main/{v['id']}">Código y notas</a></div></div>
</article>'''
page=f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Escalatam Web Lab — 12 variantes ligeras de webs premium</title>
<meta name="description" content="Laboratorio de Escalatam: la misma web premium (titular glitch, objeto 3D, horizonte, cifras fijadas, servicios) hecha con 12 tecnologías ligeras distintas.">
<link rel="icon" href="data:,">
<style>
@font-face{{font-family:Display;src:url(assets/fonts/anton.woff2) format("woff2");font-display:swap}}
@font-face{{font-family:Body;src:url(assets/fonts/archivo400.woff2) format("woff2");font-display:swap}}
@font-face{{font-family:Mono;src:url(assets/fonts/mono.woff2) format("woff2");font-display:swap}}
*{{margin:0;padding:0;box-sizing:border-box}}
html{{background:#0d0d0f;color:#f2f2f2;-webkit-font-smoothing:antialiased}}
body{{font-family:Body,system-ui,sans-serif;line-height:1.45}}
a{{color:inherit;text-decoration:none}}
.d{{font-family:Display,Impact,sans-serif;font-weight:400;text-transform:uppercase}}
.m{{font-family:Mono,monospace;text-transform:uppercase;letter-spacing:.09em}}
header{{padding:clamp(22px,3vw,40px) clamp(20px,4vw,56px) 0;display:flex;justify-content:space-between;align-items:center;font-size:12px}}
header b{{font:700 20px/1 Body,sans-serif;letter-spacing:-.03em;text-transform:none}}
.hero{{padding:12vh clamp(20px,4vw,56px) 8vh;max-width:1400px}}
.over{{color:#2f63ff;font:700 14px/1 Body,sans-serif;text-transform:uppercase}}
h1{{margin-top:14px;font-size:clamp(56px,11vw,180px);line-height:.9}}
h1 span{{display:block}} h1 span:last-child{{color:#2f63ff}}
.hero p.l{{margin-top:26px;max-width:640px;color:#a9adb8;font-size:clamp(15px,1.3vw,19px)}}
.links{{margin-top:26px;display:flex;flex-wrap:wrap;gap:12px}}
.pill{{display:inline-flex;align-items:center;height:40px;padding:0 20px;border-radius:99px;border:1.3px solid var(--a,#2f63ff);color:var(--a,#2f63ff);font-size:11px;transition:.25s}}
.pill.f{{background:var(--a,#2f63ff);color:#0d0d0f}}
.pill:hover{{background:#fff;border-color:#fff;color:#0d0d0f}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:clamp(18px,2vw,28px);padding:0 clamp(20px,4vw,56px) 12vh}}
.v{{background:#16161a;border:1px solid #24242a;border-radius:10px;overflow:hidden;display:flex;flex-direction:column}}
.th{{position:relative;display:block;aspect-ratio:16/10;overflow:hidden;background:#000}}
.th img{{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.2,.7,.2,1)}}
.th .ph{{position:absolute;right:14px;bottom:-30px;width:21%;height:auto;border-radius:10px;border:3px solid #0d0d0f;box-shadow:0 10px 30px rgba(0,0,0,.5)}}
.v:hover .th img:first-child{{transform:scale(1.03)}}
.meta{{padding:20px 22px 22px;display:flex;flex-direction:column;gap:6px;flex:1}}
.n{{color:var(--a);font-size:11px}}
.meta h2{{font-size:38px;line-height:1}}
.niche{{color:#a9adb8;font-size:14px}}
.tech{{font-size:10.5px;color:#e6e6e6;margin-top:4px}}
dl{{display:flex;gap:18px;margin-top:10px;font-size:10px;color:#8a8f9c}} dd{{color:#fff;font-size:13px;margin-top:3px}}
.ac{{margin-top:auto;padding-top:16px;display:flex;flex-wrap:wrap;gap:10px}}
.note{{padding:0 clamp(20px,4vw,56px) 10vh;color:#8a8f9c;font-size:13px;max-width:900px}}
footer{{border-top:1px solid #24242a;padding:24px clamp(20px,4vw,56px);font-size:11px;color:#8a8f9c;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px}}
</style></head>
<body><main>
<header class="m"><b>Escalatam</b><span>Web Lab · {len(V)} variantes</span></header>
<section class="hero"><p class="over">Laboratorio de demos para leads</p><h1 class="d"><span>Una web premium,</span><span>{len(V)} motores ligeros</span></h1>
<p class="l">La misma estructura (titular con glitch, objeto 3D en el hero, transición de horizonte, cifras que cuentan y servicios en scroll horizontal) construida con {len(V)} tecnologías distintas, cada una aplicada a un nicho real de clientes. Todos los negocios son ficticios y las cifras son de ejemplo.</p>
<div class="links"><a class="pill f m" href="https://github.com/0xDapa/escalatam-web-lab">Repositorio + SOP</a><a class="pill m" href="https://github.com/0xDapa/escalatam-web-lab/blob/main/PROMPTS.md">Prompts reutilizables</a><a class="pill m" href="https://0xdapa.github.io/escalatam-demo-3d/">Demo original (Three.js)</a></div></section>
<section class="grid">{cards}</section>
<p class="note">* FPS medidos en Chrome headless con GPU por software (SwiftShader) en un servidor sin tarjeta gráfica: es el peor caso. En un móvil o portátil real con GPU las variantes WebGL/Canvas suelen ir a la tasa de refresco de la pantalla. Detalle completo en el README del repositorio.</p>
</main><footer class="m"><span>Escalatam · Web Lab</span><span>Demos conceptuales · negocios ficticios · cifras de ejemplo</span></footer></body></html>'''
open(os.path.join(SITE,'index.html'),'w').write(page)
print('gallery ok')
