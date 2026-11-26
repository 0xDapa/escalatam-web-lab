# Corrige width/height de cada <img src="img/..."> según el archivo real (evita CLS). uso: python3 tools/imgdims5.py <id>...
import re,sys
from PIL import Image
for fid in sys.argv[1:]:
    p=f'{fid}/index.html'; s=open(p).read()
    def fix(m):
        tag=m.group(0); src=re.search(r'src="(img/[^"]+)"',tag)
        if not src: return tag
        w,h=Image.open(f'{fid}/'+src.group(1)).size
        tag=re.sub(r'\swidth="\d+"',f' width="{w}"',tag); tag=re.sub(r'\sheight="\d+"',f' height="{h}"',tag)
        return tag
    s2=re.sub(r'<img\b[^>]*>',fix,s)
    open(p,'w').write(s2); print(fid,'ok')
