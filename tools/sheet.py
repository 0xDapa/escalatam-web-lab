# Hoja de contacto rápida para revisar: python3 tools/sheet.py <id> -> /tmp/sheet-<id>.png
import sys
from PIL import Image
v=sys.argv[1]; D='shots/t2/'
c=Image.new('RGB',(2160,1350+30),'white')
c.paste(Image.open(D+f'{v}-desk-hero.png').resize((1440,900)),(0,0))
for i in range(3): c.paste(Image.open(D+f'{v}-desk-s{i+1}.png').resize((720,450)),(1440,i*450))
for i,k in enumerate(['hero','s1','s2','s3']): c.paste(Image.open(D+f'{v}-mob-{k}.png').resize((210,455)),(i*215+150,900+10))
c.save(f'/tmp/sheet-{v}.png')
