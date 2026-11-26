# Tanda 3: capturas de revisión. python3 tools/shoot3.py <id> ... -> shots/t3/<id>-{desk,mob}-{hero,full}.png + preview jpg
import asyncio,sys,os,json
from playwright.async_api import async_playwright
from PIL import Image
BASE=os.environ.get('BASE','http://localhost:8817/'); OUT=os.environ.get('OUT','shots/t3')
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
async def shoot(b,vid):
    os.makedirs(OUT,exist_ok=True); res={}
    for name,vp,dsf in [('desk',{'width':1440,'height':900},1),('mob',{'width':390,'height':844},2)]:
        ctx=await b.new_context(viewport=vp,device_scale_factor=dsf,has_touch=(name=='mob'),is_mobile=(name=='mob')); pg=await ctx.new_page(); logs=[]
        pg.on('console',lambda m: m.type in('error','warning') and logs.append(m.type+': '+m.text[:160])); pg.on('pageerror',lambda e: logs.append('ERR '+str(e)[:200]))
        pg.on('requestfailed',lambda r: logs.append('FAIL '+r.url[-80:]))
        r=await pg.goto(BASE+vid+'/',wait_until='load',timeout=60000); await pg.wait_for_timeout(2200)
        await pg.screenshot(path=f'{OUT}/{vid}-{name}-hero.png')
        H=await pg.evaluate('document.documentElement.scrollHeight')
        y=0
        while y<H:
            y+=500; await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(120)
        await pg.wait_for_timeout(900)
        ov=await pg.evaluate('document.documentElement.scrollWidth-innerWidth')
        wide=await pg.evaluate('[...document.querySelectorAll("body *")].filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+1&&getComputedStyle(e).position!=="fixed"}).slice(0,6).map(e=>e.tagName+"."+e.className.toString().slice(0,30)+" r="+Math.round(e.getBoundingClientRect().right))')
        await pg.evaluate('window.scrollTo(0,0)'); await pg.wait_for_timeout(600)
        if name=='desk': await pg.screenshot(path=f'{OUT}/{vid}-{name}-full.png',full_page=True)
        else:
            parts=[]; y=0; i=0
            while y<H and i<14:
                await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(450); fn=f'/tmp/_m{i}.png'; await pg.screenshot(path=fn); parts.append(fn); y+=vp['height']; i+=1
            ims=[Image.open(f) for f in parts]; st=Image.new('RGB',(ims[0].width,sum(x.height for x in ims)),'white'); yy=0
            for x in ims: st.paste(x,(0,yy)); yy+=x.height
            st.save(f'{OUT}/{vid}-{name}-full.png')
        res[name]={'status':r.status,'logs':logs[:10],'overflowX':ov,'H':H,'wide':wide if ov>0 else []}
        await ctx.close()
        im=Image.open(f'{OUT}/{vid}-{name}-full.png').convert('RGB'); w=720 if name=='desk' else 300
        im=im.resize((w,int(im.height*w/im.width)))
        # dividir en columnas para poder leerlas
        colh=1500 if name=='desk' else 1700; n=(im.height+colh-1)//colh
        sh=Image.new('RGB',(n*(w+8),min(colh,im.height)),'white')
        for i in range(n): sh.paste(im.crop((0,i*colh,w,min(im.height,(i+1)*colh))),(i*(w+8),0))
        sh.save(f'{OUT}/{vid}-{name}-prev.jpg',quality=78)
    return res
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        for v in sys.argv[1:]: print(v,json.dumps(await shoot(b,v),ensure_ascii=False),flush=True)
        await b.close()
asyncio.run(main())
