# Renderiza la botella 3D de la demo 43 en cada acabado (Chrome headless + SwiftShader) → img/t1-<acabado>-{1600,800}.webp
# Así el póster LCP y las fotos de acabados son "fotos de producto" generadas por el mismo modelo Three.js.
import asyncio,base64,io
from playwright.async_api import async_playwright
from PIL import Image
ARGS=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=ARGS)
        for f in ['natural','basalto','arena','paramo']:
            pg=await b.new_page(viewport={'width':800,'height':1000},device_scale_factor=2)
            await pg.goto(f'http://localhost:8817/43-lanzamiento-producto/#render={f}'); await pg.wait_for_function('window.__png',timeout=60000)
            im=Image.open(io.BytesIO(base64.b64decode((await pg.evaluate('window.__png')).split(',')[1]))).convert('RGBA')
            for w in (1600,800): x=im.resize((w,int(w*1.25)),Image.LANCZOS); x.save(f'43-lanzamiento-producto/img/t1-{f}-{w}.webp','WEBP',quality=82,method=6)
            print(f,im.size); await pg.close()
        await b.close()
asyncio.run(main())
