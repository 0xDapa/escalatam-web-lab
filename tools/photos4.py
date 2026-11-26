# Tanda 4: fotos CC0 grandes (WordPress Photo Directory / Wikimedia Commons vía Openverse) → <id>/img/<nombre>-{1600,800}.webp + creditos.json
# Corrige la orientación EXIF y recorta opcionalmente a una proporción. Fuente: research-refs/img4 (gitignored).
import json,os
from PIL import Image,ImageOps
R='research-refs/img4'
P={
'35-floristeria':{'rojas':'flor/11','lilas':'flor/12','ramo':'flor/06','ramo-rojo':'flor/19','lirios':'flor/27','rosa-blanca':'flor/31','naranjas':'flor/32','camelia':'flor/35','ramo-rosa':'flor/02'},
'36-fotografa':{'retrato':'wfoto/01','moda':'wfoto/13','cumbre':'foto/09','pinos':'foto/17','valle':'foto/19','elefante':'foto/25','garza':'foto/29','boda':'foto/23','mirador':'foto/04'},
'37-arquitectura':{'pasarela':'arq/00','museo':'arq/01','cubierta':'arq/02','marquesina':'arq/03','auditorio':'arq/07','torre':'arq/09','lamas':'arq/10','reflejo':'arq/11','ciudad-artes':'arq/12','fachada':'arq/15'},
'39-detailing':{'rojo':'auto/02','clasico':'auto/06','gotas':'auto/18','interior':'auto/21','rueda':'auto/22','luces':'auto/33'},
'40-entrenador':{'boxeo':'gym/03','rack':'gym/28','jaula':'gym/29'},
'41-tatuajes':{'artista':'wtattoo/12','maestro':'wtattoo/18','brazo':'wtattoo/24','flash-aguila':'wtattoo/02','flash-barco':'wtattoo/05','flash-mariposa':'wtattoo/06'},
'42-dj-artista':{'cabina':'dj/01'},
'44-psicologia':{'laguna':'psico/05','hojas':'psico/11','valle':'psico/13','lago':'psico/19','plantas':'psico/25'},
}
SRC={'flor':'WordPress Photo Directory','foto':'WordPress Photo Directory','arq':'WordPress Photo Directory','auto':'WordPress Photo Directory','gym':'WordPress Photo Directory','dj':'WordPress Photo Directory','psico':'WordPress Photo Directory','wfoto':'Wikimedia Commons','wtattoo':'Wikimedia Commons'}
for fid,m in P.items():
    os.makedirs(f'{fid}/img',exist_ok=True); cred=[]
    for name,src in m.items():
        g,i=src.split('/'); meta=json.load(open(f'{R}/{g}/meta.json'))[int(i)]
        im=ImageOps.exif_transpose(Image.open(f'{R}/{g}/{i}.jpg')).convert('RGB')
        for w,q in ((1600,74),(800,70)):
            x=im.copy(); x.thumbnail((w,int(w*1.6)),Image.LANCZOS); x.save(f'{fid}/img/{name}-{w}.webp','WEBP',quality=q,method=6)
        import re
        title=re.sub('<[^>]+>','',meta['title']).strip()
        cred.append({'file':name,'title':title,'creator':meta.get('creator'),'page':meta.get('page'),'source':SRC[g],'license':'CC0','w':im.width,'h':im.height})
    json.dump(cred,open(f'{fid}/img/creditos.json','w'),indent=1,ensure_ascii=False)
    print(fid,len(m),sum(os.path.getsize(f'{fid}/img/'+f) for f in os.listdir(f'{fid}/img'))//1024,'KB')
