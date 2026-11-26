# Tanda 3: convierte fotos CC0 (StockSnap vía Openverse) a WebP 960/560 en <id>/img/ y genera créditos.
import json,os,sys
from PIL import Image
R='research-refs/imgc'
P={
'23-marca-personal':{'retrato':'coach/06','trabajo':'coach/14','libreta':'coach/27'},
'24-dental-premium':{'hero':'dental/03','sillon':'dental/00','gabinete':'dental/01','sonrisa':'dental/12','paciente':'dental/09'},
'26-inmobiliaria-lujo':{'villa':'estate/00','terraza':'estate/11','porche':'estate/10','jardin':'estate/13','suite':'hotel/09','salon':'hotel/04'},
'27-hotel-boutique':{'lobby':'hotel/00','habitacion':'hotel/07','suite':'hotel/09','cama':'hotel/10','desayuno':'hotel/23','bar':'dining/01','patio':'hotel/06','detalle':'hotel/05'},
'28-alta-cocina':{'vieiras':'dining/19','ostras':'dining/18','ostra-mano':'dining/26','pulpo':'dining/17','pescado':'dining/35','almejas':'dining/14','sala':'dining/00'},
'29-cafe-brunch':{'mesa':'brunch/00','huevos':'brunch/03','latte':'brunch/17','tortitas':'brunch/27','gofre':'brunch/31','aguacate':'brunch/37','local':'brunch/38','cafe':'brunch/14'},
'30-nail-studio':{'manicura':'nails/02','detalle':'nails/03','flatlay':'nails/12'},
'31-fisioterapia':{'estiramiento':'physio/21','sesion':'physio/16','masaje':'physio/01','movilidad':'physio/22'},
'32-estudio-interiorismo':{'p1':'interior/11','p2':'interior/33','p3':'interior/36','p4':'interior/48','p5':'interior/49','p6':'interior/12','p7':'interior/39','p8':'interior/40','p9':'interior/00'},
'33-bodas-eventos':{'atardecer':'wedding/04','manos':'wedding/09','beso':'wedding/18','salon':'wedding/27','mesa':'wedding/29','anillos':'wedding/10','ramo':'wedding/20','votos':'wedding/14'},
'34-nutricion':{'bowl':'nutri/01','ensalada':'nutri/04','huerta':'nutri/12','mano':'nutri/24','desayuno':'nutri/32','limon':'nutri/26'},
}
for fid,m in P.items():
    os.makedirs(f'{fid}/img',exist_ok=True); cred=[]
    for name,src in m.items():
        g,i=src.split('/'); meta=json.load(open(f'{R}/{g}/meta.json'))[int(i)]
        im=Image.open(f'{R}/{g}/{i}.jpg').convert('RGB')
        for w in (960,560):
            x=im.copy(); x.thumbnail((w,w*2)); x.save(f'{fid}/img/{name}-{w}.webp','WEBP',quality=72 if w==960 else 68,method=6)
        cred.append({'file':name,'title':meta['title'],'creator':meta.get('creator'),'page':meta.get('page'),'w':im.width,'h':im.height})
    json.dump(cred,open(f'{fid}/img/creditos.json','w'),indent=1,ensure_ascii=False)
    print(fid,len(m),[ (c['file'],c['w'],c['h']) for c in cred])
