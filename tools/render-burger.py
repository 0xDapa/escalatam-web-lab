# Genera la secuencia de fotogramas WebP para 18-secuencia-canvas a partir de tools/render-burger.html
import asyncio,base64,json,os
from playwright.async_api import async_playwright
N=int(os.environ.get('N','64')); OUT='18-secuencia-canvas/frames'
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(); await pg.goto('file://'+os.path.abspath('tools/render-burger.html'))
        meta={'n':N,'size':720,'names':await pg.evaluate('names'),'pos':[]}
        tot=0
        for i in range(N):
            pos=await pg.evaluate(f'draw({i/(N-1)})'); meta['pos'].append(pos)
            d=await pg.evaluate("document.getElementById('c').toDataURL('image/webp',0.62)")
            raw=base64.b64decode(d.split(',')[1]); tot+=len(raw); open(f'{OUT}/f{i:03d}.webp','wb').write(raw)
        json.dump(meta,open(f'{OUT}/meta.json','w'))
        print('frames',N,'total KB',tot//1024)
        await b.close()
asyncio.run(main())
