# Capturas de la versión publicada de la Tanda 4 (tras disparar la carga por intención) → shots/live/t4-<id>-{desk,mob}.png
import asyncio,sys,os
from playwright.async_api import async_playwright
sys.path.insert(0,os.path.join(os.path.dirname(__file__),'..','src')); from variants4 import V4
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
BASE=os.environ.get('BASE','https://0xdapa.github.io/escalatam-web-lab/')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        for v in V4:
            for k,vp,mob in (('desk',{'width':1440,'height':900},False),('mob',{'width':390,'height':844},True)):
                c=await b.new_context(viewport=vp,device_scale_factor=1 if not mob else 2,is_mobile=mob,has_touch=mob); pg=await c.new_page(); errs=[]
                pg.on('pageerror',lambda e:errs.append(str(e)))
                r=await pg.goto(BASE+v['id']+'/',wait_until='load'); await pg.mouse.move(vp['width']*.6,vp['height']*.45); await pg.wait_for_timeout(5500)
                await pg.screenshot(path=f"shots/live/t4-{v['id']}-{k}.png"); print(v['id'],k,r.status,errs); await c.close()
        await b.close()
asyncio.run(main())
