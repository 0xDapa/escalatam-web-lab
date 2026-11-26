# Collage de la Tanda 5 a partir de shots/t5/<id>-{desk,mob}-hero.png → shots/collage-tanda5.png
import sys,os
from PIL import Image,ImageDraw,ImageFont
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..');os.chdir(ROOT);sys.path.insert(0,'src')
from variants5 import V5
W,H=720,450;cols=4;rows=2;pad=24;lab=56
C=Image.new('RGB',(cols*W+(cols+1)*pad,rows*(H+lab)+(rows+1)*pad+70),'#0d0d0f');d=ImageDraw.Draw(C)
D='/usr/share/fonts/truetype/dejavu/'
F=ImageFont.truetype(D+'DejaVuSans-Bold.ttf',22);f=ImageFont.truetype(D+'DejaVuSans.ttf',16);T=ImageFont.truetype(D+'DejaVuSans-Bold.ttf',30)
d.text((pad,24),'Escalatam Web Lab · Tanda 5 — 8 réplicas de webs premiadas · GSAP + Lenis, OGL, Three.js · anti AI slop',font=T,fill='#f2f2f2')
for k,v in enumerate(V5):
    x=pad+(k%cols)*(W+pad);y=70+pad+(k//cols)*(H+lab+pad)
    C.paste(Image.open(f"shots/t5/{v["id"]}-desk-hero.png").convert('RGB').resize((W,H),Image.LANCZOS),(x,y))
    m=Image.open(f"shots/t5/{v["id"]}-mob-hero.png").convert('RGB');mw=150;mh=int(m.height*mw/m.width);m=m.resize((mw,mh),Image.LANCZOS).crop((0,0,mw,min(mh,300)))
    d.rectangle((x+W-mw-18,y+H-m.height-18,x+W-12,y+H-12),fill='#0d0d0f');C.paste(m,(x+W-mw-15,y+H-m.height-15))
    d.text((x,y+H+8),f"{v['id'][:2]} · {v['name']}",font=F,fill='#ffffff');d.text((x,y+H+34),f"{v['niche']} — ref. {v['ref']}",font=f,fill='#a9adb8')
C.save('shots/collage-tanda5.png',optimize=True);print('collage',C.size)
