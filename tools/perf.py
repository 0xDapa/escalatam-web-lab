# Mide cada variante: tamaños gzip, tiempos de carga y FPS (Chrome headless + SwiftShader = GPU por software, cifra pesimista).
import asyncio,sys,os,json,gzip
from playwright.async_api import async_playwright
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'); SITE=ROOT
BASE=os.environ.get('BASE','http://localhost:8817/')
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
gz=lambda p: len(gzip.compress(open(p,'rb').read(),9))
INIT="""window.__raf=0;(function f(){window.__raf++;requestAnimationFrame(f)})();
new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});"""
async def one(b,vid):
    d=os.path.join(SITE,vid); out={'id':vid}
    js=[os.path.join(r,f) for r,_,fs in os.walk(d) for f in fs if f.endswith('.js')]
    out['js_kb']=round(sum(os.path.getsize(f) for f in js)/1024,1); out['js_gz_kb']=round(sum(gz(f) for f in js)/1024,1)
    tot=0
    for r,_,fs in os.walk(d):
        for f in fs:
            if f.endswith('.md') or f=='faces.css': continue
            p=os.path.join(r,f); tot+= os.path.getsize(p) if f.endswith('.woff2') else gz(p)
    out['page_gz_kb']=round(tot/1024,1)
    for name,vp,dsf in [('desk',{'width':1440,'height':900},1),('mob',{'width':390,'height':844},2)]:
        ctx=await b.new_context(viewport=vp,device_scale_factor=dsf); pg=await ctx.new_page(); await pg.add_init_script(INIT)
        await pg.goto(BASE+vid+'/',wait_until='load'); await pg.wait_for_timeout(1500)
        nav=await pg.evaluate("(()=>{const n=performance.getEntriesByType('navigation')[0];const fcp=performance.getEntriesByName('first-contentful-paint')[0];return {dcl:n.domContentLoadedEventEnd,load:n.loadEventEnd,fcp:fcp?fcp.startTime:null,lcp:window.__lcp||null}})()")
        f0=await pg.evaluate('window.__raf'); await pg.wait_for_timeout(3000); f1=await pg.evaluate('window.__raf')
        # FPS durante scroll por toda la página
        s0=await pg.evaluate('window.__raf')
        await pg.evaluate("""new Promise(r=>{let y=0;const H=document.documentElement.scrollHeight-innerHeight;const i=setInterval(()=>{y+=H/60;scrollTo(0,y);if(y>=H){clearInterval(i);r()}},50)})""")
        s1=await pg.evaluate('window.__raf')
        out[name]={'fcp_ms':round(nav['fcp'] or 0),'lcp_ms':round(nav['lcp'] or 0),'load_ms':round(nav['load']),'fps_hero':round((f1-f0)/3,1),'fps_scroll':round((s1-s0)/3.0,1)}
        await ctx.close()
    return out
async def main():
    ids=sys.argv[1:] or sorted(x for x in os.listdir(SITE) if x[:2].isdigit())
    res=[]
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        for v in ids: r=await one(b,v); print(json.dumps(r)); res.append(r)
        await b.close()
    old={}
    pj=os.path.join(ROOT,'perf.json')
    if os.path.exists(pj): old={r['id']:r for r in json.load(open(pj))}
    for r in res: old[r['id']]={**old.get(r['id'],{}),**r}
    json.dump(sorted(old.values(),key=lambda r:r['id']),open(pj,'w'),indent=1,ensure_ascii=False)
asyncio.run(main())
