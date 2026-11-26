# Capturas tanda 2: python3 tools/shoot2.py <id> [...]. Hero + 3 posiciones de scroll, escritorio y móvil.
# BASE (por defecto localhost:8817) ; OUT (por defecto shots/) ; STEPS=0.25,0.5,0.75
import asyncio,sys,os,json
from playwright.async_api import async_playwright
BASE=os.environ.get('BASE','http://localhost:8817/')
OUT=os.environ.get('OUT',os.path.join(os.path.dirname(__file__),'..','shots'))
STEPS=[float(x) for x in os.environ.get('STEPS','0.25,0.5,0.75').split(',') if x]
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
async def shoot(b,vid):
    res={}; os.makedirs(OUT,exist_ok=True)
    for name,vp,dsf in [('desk',{'width':1440,'height':900},1),('mob',{'width':390,'height':844},2)]:
        ctx=await b.new_context(viewport=vp,device_scale_factor=dsf,has_touch=(name=='mob'),is_mobile=(name=='mob')); pg=await ctx.new_page(); logs=[]
        pg.on('console',lambda m: m.type in('error','warning') and logs.append(m.type+': '+m.text)); pg.on('pageerror',lambda e: logs.append('ERR '+str(e)))
        r=await pg.goto(BASE+vid+'/',wait_until='load',timeout=60000); await pg.wait_for_timeout(2600)
        await pg.screenshot(path=f'{OUT}/{vid}-{name}-hero.png')
        H=await pg.evaluate('document.documentElement.scrollHeight-innerHeight')
        for i,s in enumerate(STEPS):
            await pg.evaluate(f'window.scrollTo(0,{H*s})'); await pg.wait_for_timeout(1400)
            await pg.screenshot(path=f'{OUT}/{vid}-{name}-s{i+1}.png')
        ov=await pg.evaluate('document.documentElement.scrollWidth-innerWidth')
        res[name]={'status':r.status,'logs':logs[:8],'overflowX':ov}
        await ctx.close()
    return res
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        for v in sys.argv[1:]: print(v,json.dumps(await shoot(b,v)),flush=True)
        await b.close()
asyncio.run(main())
