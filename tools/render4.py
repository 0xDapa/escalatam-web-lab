# Renderiza estados de una escena Three.js de la Tanda 4 a WebP (póster LCP / imágenes de producto).
# La demo debe exponer window.__png cuando se abre con #render=<nombre>. uso: python3 tools/render4.py <id> <W>x<H> <nombre>... [--jpg]
import asyncio,base64,io,sys
from playwright.async_api import async_playwright
from PIL import Image
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
vid=sys.argv[1]; W,H=map(int,sys.argv[2].split('x')); names=[n for n in sys.argv[3:] if not n.startswith('--')]; opaque='--jpg' in sys.argv
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        for n in names:
            pg=await b.new_page(viewport={'width':W,'height':H},device_scale_factor=2)
            pg.on('pageerror',lambda e:print('ERR',e))
            await pg.goto(f'http://localhost:8817/{vid}/#render={n}'); await pg.wait_for_function('window.__png',timeout=90000)
            im=Image.open(io.BytesIO(base64.b64decode((await pg.evaluate('window.__png')).split(',')[1])))
            im=im.convert('RGB') if opaque else im.convert('RGBA')
            for w in (1600,800): x=im.resize((w,int(w*H/W)),Image.LANCZOS); x.save(f'{vid}/img/{n}-{w}.webp','WEBP',quality=80,method=6)
            print(n,im.size); await pg.close()
        await b.close()
asyncio.run(main())
