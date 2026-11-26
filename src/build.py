import os,sys,json,shutil,subprocess,html
sys.path.insert(0,os.path.dirname(__file__))
from variants import V
ROOT=os.path.dirname(os.path.abspath(__file__)); SITE=os.path.join(ROOT,'..')
ESB=os.path.join(ROOT,'..','pkg','node_modules','.bin','esbuild')
I={ # iconos SVG propios (trazos simples)
'flame':'<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8 0 4 3 7 7 7z"/>',
'cup':'<path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2c0 2 2 2 2 4M12 2c0 2 2 2 2 4"/>',
'cal':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
'chat':'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
'spark':'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
'shield':'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
'grid':'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
'key':'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
'tag':'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
'scale':'<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
'home':'<path d="M3 11l9-8 9 8v10H3z"/><path d="M9 21v-6h6v6"/>',
'bolt':'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
'heart':'<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>',
'gem':'<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 3l3 18 3-18"/>',
'leaf':'<path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16z"/><path d="M4 20l8-8"/>',
'pin':'<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
'globe':'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
'book':'<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
'tooth':'<path d="M7 3c-3 0-4 3-3.5 6S6 14 6.5 18 8 21 9 21s1.5-5 3-5 2 5 3 5 2-1 2.5-3 2.5-6 3-9S20 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>',
'cake':'<path d="M4 21V12h16v9M2 21h20M4 15c2 1.5 4 1.5 6 0s4-1.5 6 0 3 1 4 0M12 12V8"/><path d="M12 8c-1-1-1-3 0-4 1 1 1 3 0 4z"/>',
}
def ico(k,cls=''): return f'<svg viewBox="0 0 24 24" aria-hidden="true" class="{cls}">{I[k]}</svg>'
def lines(arr,start=0): return ''.join(f'<span class="ln" style="--i:{i+start}" data-t="{html.escape(t)}">{html.escape(t)}</span>' for i,t in enumerate(arr))
def fmt0(v,dec,pre,suf): return f'<span class="n d" data-to="{v}" data-dec="{dec}" data-pre="{pre}" data-suf="{suf}">{pre}0{suf}</span>'
def page(v):
    c=v['colors']; vars=';'.join(f'--{k}:{c[k]}' for k in c if k not in('on',))+f";--on-acc:{c.get('on','#fff')};--dls:{v['dls']}"
    e=html.escape
    nums=''.join(f'<li>{fmt0(*s[:4])}<p class="c">{e(s[4])}</p></li>' for s in v['stats'])
    cards=''.join(f'<article class="card">{ico(ic)}<span class="k m">{k}</span><h4 class="d">{e(h)}</h4><p>{e(p)}</p></article>' for ic,k,h,p in v['cards'])
    extra=v.get('stage_html','')
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(v['name'])} — {e(v['niche'])} · Demo conceptual Escalatam</title>
<meta name="description" content="{e(v['lede'])}">
<link rel="icon" href="data:,">
<meta name="theme-color" content="{c['bg']}">
<link rel="preload" href="fonts/display.woff2" as="font" type="font/woff2" crossorigin>
<style>
@font-face{{font-family:Display;src:url(fonts/display.woff2) format("woff2");font-display:swap}}
@font-face{{font-family:Body;src:url(fonts/body.woff2) format("woff2");font-weight:400;font-display:swap}}
@font-face{{font-family:Body;src:url(fonts/body-bold.woff2) format("woff2");font-weight:700;font-display:swap}}
@font-face{{font-family:Mono;src:url(fonts/mono.woff2) format("woff2");font-display:swap}}
:root{{{vars}}}
</style>
<link rel="stylesheet" href="core.css">
<script>document.documentElement.classList.add('js')</script>
<script defer src="app.js"></script>
</head>
<body>
<main>
<section class="hero" id="inicio">
  <header class="top">
    <a class="logo" href="#inicio">{ico(v['logo'])}{e(v['name'])}</a>
    <ul class="vnav m"><li><a href="#inicio">Inicio</a></li><li><a href="#nosotros">Nosotros</a></li><li><a href="#servicios">Servicios</a></li><li><a href="#contacto">Contacto</a></li></ul>
    <span class="tag m">Demo conceptual</span>
  </header>
  <div class="stage" id="stage" aria-hidden="true">{extra}</div>
  <div class="copy">
    <p class="over fu" style="--d:0ms">{e(v['over'])}</p>
    <h1 class="hl d rv">{lines(v['hl'])}</h1>
    <p class="lede fu" style="--d:450ms">{e(v['lede'])}</p>
    <div class="btns fu" style="--d:600ms"><a class="pill f" href="#contacto">{e(v['b1'])}</a><a class="pill" href="#servicios">{e(v['b2'])}</a></div>
  </div>
  <p class="hint m">{e(v['hint'])}</p>
</section>
<section class="hz" aria-hidden="true"><div class="sc"><i class="line"></i><div class="fill"></div><div class="ring"></div><p class="kick d">{'<br>'.join(e(x) for x in v['kick'])}<small>{e(v['kicks'])}</small></p></div></section>
<section class="stats" id="nosotros">
  <div class="pin"><div class="art fu"></div><h2 class="big d rv">{lines(v['big'])}</h2></div>
  <div><div class="intro fu">{''.join(f'<p>{e(p)}</p>' for p in v['intro'])}</div><ul class="nums d">{nums}</ul></div>
</section>
<section class="svc" id="servicios"><div class="sc">
  <div class="prog m"><span>Servicios</span><span>01 — 0{len(v['cards'])}</span><i><b></b></i></div>
  <div class="giant d">{e(v['giant'])}</div>
  <div class="strip"><div class="lead"><h3 class="d rv">{lines(v['lead'])}</h3><p>{e(v['leadp'])}</p></div><div class="cards">{cards}</div></div>
</div></section>
<section class="cta" id="contacto"><h2 class="d rv">{lines(v['cta'])}</h2><p class="fu">{e(v['ctap'])}</p><div class="btns fu" style="--d:200ms"><a class="pill f" href="#contacto">{e(v['c1'])}</a><a class="pill" href="#contacto">{e(v['c2'])}</a></div></section>
</main>
<footer class="foot"><span>© {e(v['name'])} — negocio ficticio</span><span>Demo conceptual por Escalatam · cifras y textos de ejemplo</span><a href="../">← Volver al laboratorio</a></footer>
</body>
</html>
'''
def build(only=None):
    os.makedirs(SITE,exist_ok=True)
    for v in V:
        if only and v['id'] not in only: continue
        d=os.path.join(SITE,v['id']); os.makedirs(os.path.join(d,'fonts'),exist_ok=True)
        F=os.path.join(ROOT,'fonts')
        for src,dst in [(v['font'],'display'),('archivo400','body'),('archivo700','body-bold'),('mono','mono')]:
            shutil.copy(os.path.join(F,src+'.woff2'),os.path.join(d,'fonts',dst+'.woff2'))
        shutil.copy(os.path.join(ROOT,'core','core.css'),os.path.join(d,'core.css'))
        extra_css=os.path.join(ROOT,'variants',v['id'],'hero.css')
        if os.path.exists(extra_css):
            open(os.path.join(d,'core.css'),'a').write('\n/* ---- hero de esta variante ---- */\n'+open(extra_css).read())
        hp=os.path.join(ROOT,'variants',v['id'],'stage.html')
        if os.path.exists(hp): v['stage_html']=open(hp).read()
        open(os.path.join(d,'index.html'),'w').write(page(v))
        for a in os.listdir(os.path.join(ROOT,'variants',v['id'])):
            if a.endswith(('.json','.bin')) and '.data.' not in a: shutil.copy(os.path.join(ROOT,'variants',v['id'],a),d)
        r=subprocess.run([ESB,os.path.join(ROOT,'variants',v['id'],'hero.js'),'--bundle','--minify','--format=iife','--target=es2020','--legal-comments=eof','--outfile='+os.path.join(d,'app.js')],capture_output=True,text=True,cwd=os.path.join(ROOT,'..','pkg'))
        print(v['id'],'OK' if r.returncode==0 else r.stderr[-2000:])
if __name__=='__main__': build(sys.argv[1:] or None)
