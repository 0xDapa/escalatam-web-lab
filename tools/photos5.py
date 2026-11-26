# Tanda 5: fotos CC0 (WordPress Photo Directory vía Openverse) → <id>/img/<nombre>-{1600,800}.webp + creditos.json
# Fuente local: research-refs/img5 e img4 (gitignored). uso: python3 tools/photos5.py [ids...]
import json,os,re,sys
from PIL import Image,ImageOps
P={
'45-smash-burger':{'smash':'img5/burger/21','clasica':'img5/burger/03','doble':'img5/burger/35','papas':'img5/burger/34','mesa':'img5/burger/27','salsas':'img5/burger/33','neon':'img5/burger/25','plancha':'img5/burger/24'},
'46-clinica-botanica':{'sabila':'img5/clinica/25','hoja':'img5/clinica/10','detalle':'img5/clinica/32','mano':'img5/clinica/17','luz':'img5/clinica/03','cala':'img4/estetica/11','penca':'img5/clinica/29'},
'47-residencial-costa':{'piscina':'img5/villa/00','blanca':'img5/villa/03','pueblo':'img5/villa/02','puerta':'img5/villa/07','atardecer':'img5/villa/12','infinita':'img5/casa/23','moderna':'img5/casa/11'},
'48-arquitectos':{'fachada':'img5/casa/09','casa-madera':'img5/casa/21','escalera':'img5/casa/27','caracol':'img5/casa/29','peldanos':'img5/casa/28','interior':'img5/casa/34','muro':'img5/casa/26','unifamiliar':'img5/casa/15'},
'49-hotel-montana':{'piscina-noche':'img5/hotel/22','montana':'img5/hotel/31','cabana':'img5/hotel/34','habitacion':'img5/hotel/01','acogedora':'img5/hotel/10','valle':'img5/hotel/25','tumbonas':'img5/hotel/18'},
'50-marca-personal':{'raquetas':'img5/atleta/03','bola':'img5/atleta/14','pista':'img5/atleta/02','pista-azul':'img5/atleta/06','amanecer':'img5/atleta/17','zapatillas':'img5/atleta/16'},
'52-autos-configurador':{'nieve':'img5/auto/15','negro':'img5/auto/10','ruta':'img5/auto/02','overland':'img5/auto/21','volante':'img5/auto/30','rueda':'img5/auto/28','lago':'img5/auto/13'},
}
ids=sys.argv[1:] or list(P)
for fid in ids:
    m=P[fid]; os.makedirs(f'{fid}/img',exist_ok=True); cred=[]
    for name,src in m.items():
        base,g,i=src.split('/'); meta=json.load(open(f'research-refs/{base}/{g}/meta.json'))[int(i)]
        im=ImageOps.exif_transpose(Image.open(f'research-refs/{base}/{g}/{i}.jpg')).convert('RGB')
        for w,q in ((1600,72),(800,68)):
            x=im.copy(); x.thumbnail((w,int(w*1.5)),Image.LANCZOS); x.save(f'{fid}/img/{name}-{w}.webp','WEBP',quality=q,method=6)
        cred.append({'file':name,'title':re.sub('<[^>]+>','',meta['title']).strip(),'creator':meta.get('creator'),'page':meta.get('page'),'source':'WordPress Photo Directory','license':'CC0','w':im.width,'h':im.height})
    json.dump(cred,open(f'{fid}/img/creditos.json','w'),indent=1,ensure_ascii=False)
    print(fid,len(m),sum(os.path.getsize(f'{fid}/img/'+f) for f in os.listdir(f'{fid}/img'))//1024,'KB')
