# Capturas headless: python3 tools/shoot.py [ids...]  (servidor en :8790 sirviendo site/)
import asyncio,sys,os,json
from playwright.async_api import async_playwright
BASE=os.environ.get('BASE','http://localhost:8817/')
OUT=os.environ.get('OUT',os.path.join(os.path.dirname(__file__),'..','shots'))
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
async def shoot(b,vid,full=True):
    res={}
    for name,vp,dsf in [('desk',{'width':1440,'height':900},1),('mob',{'width':390,'height':844},2)]:
        ctx=await b.new_context(viewport=vp,device_scale_factor=dsf); pg=await ctx.new_page(); logs=[]
        pg.on('console',lambda m: m.type in('error','warning') and logs.append(m.type+': '+m.text)); pg.on('pageerror',lambda e: logs.append('ERR '+str(e)))
        r=await pg.goto(BASE+vid+'/',wait_until='load',timeout=60000); await pg.wait_for_timeout(2500)
        await pg.screenshot(path=f'{OUT}/{vid}-{name}-hero.png')
        if full:
            H=await pg.evaluate('document.documentElement.scrollHeight')
            pos=await pg.evaluate('''()=>{const g=s=>{const e=document.querySelector(s);return e?e.getBoundingClientRect().top+scrollY:0};const hz=document.querySelector('.hz'),sv=document.querySelector('.svc');return {hz:g('.hz')+0.55*(hz.offsetHeight-innerHeight),st:g('.nums')-innerHeight*0.25,sv:g('.svc')+0.5*(sv.offsetHeight-innerHeight),cta:g('.cta')}}''')
            for k in ['hz','st','sv','cta']:
                await pg.evaluate(f'window.scrollTo(0,{pos[k]})'); await pg.wait_for_timeout(1600)
                await pg.screenshot(path=f'{OUT}/{vid}-{name}-{k}.png')
        res[name]={'status':r.status,'logs':logs[:8],'overflowX':await pg.evaluate('document.documentElement.scrollWidth>innerWidth')}
        await ctx.close()
    return res
async def main():
    ids=sys.argv[1:]
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        for v in ids: print(v,json.dumps(await shoot(b,v,os.environ.get('HERO')!='1')))
        await b.close()
asyncio.run(main())
