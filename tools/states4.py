# Capturas de estados intermedios de una sección scroll-scrub: python3 tools/states4.py <id> <selector> p1 p2 ... [--mob]
import asyncio,sys
from playwright.async_api import async_playwright
from PIL import Image
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
vid,sel=sys.argv[1],sys.argv[2]; mob='--mob' in sys.argv; ps=[float(x) for x in sys.argv[3:] if not x.startswith('--')]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        vp={'width':390,'height':844} if mob else {'width':1440,'height':900}
        ctx=await b.new_context(viewport=vp,device_scale_factor=1,is_mobile=mob,has_touch=mob); pg=await ctx.new_page()
        pg.on('pageerror',lambda e:print('ERR',e))
        await pg.goto(f'http://localhost:8817/{vid}/',wait_until='load'); await pg.wait_for_timeout(3500)
        fs=[]
        for i,pp in enumerate(ps):
            await pg.evaluate(f'''(()=>{{const s=document.querySelector("{sel}");const t=s.getBoundingClientRect().top+scrollY;scrollTo(0,t+(s.offsetHeight-innerHeight)*{pp})}})()''')
            await pg.wait_for_timeout(1300); f=f'/tmp/st{i}.png'; await pg.screenshot(path=f); fs.append(f)
        ims=[Image.open(f) for f in fs]; w=ims[0].width//2 if not mob else ims[0].width; h=ims[0].height*w//ims[0].width
        cols=3 if not mob else 5; rows=(len(ims)+cols-1)//cols
        S=Image.new('RGB',(cols*w,rows*h),'white')
        for i,im in enumerate(ims): S.paste(im.resize((w,h)),((i%cols)*w,(i//cols)*h))
        S.save(f'shots/t4/{vid}-states{"-mob" if mob else ""}.jpg',quality=80); await b.close()
asyncio.run(main())
