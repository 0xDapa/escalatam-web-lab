# Descarga fuentes OFL de Google Fonts (solo subconjunto latin, woff2) a una carpeta local.
# uso: python3 tools/fonts.py <dest> "<css2 family spec>" ...   -> imprime @font-face listos
import sys,re,os,urllib.request
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
dest=sys.argv[1]; os.makedirs(dest,exist_ok=True); out=[]
for spec in sys.argv[2:]:
    css=urllib.request.urlopen(urllib.request.Request('https://fonts.googleapis.com/css2?family='+spec+'&display=swap',headers={'User-Agent':UA})).read().decode()
    for blk in re.findall(r'/\* latin \*/\s*(@font-face \{.*?\})',css,re.S):
        fam=re.search(r"font-family: '([^']+)'",blk).group(1); st=re.search(r'font-style: (\w+)',blk).group(1); w=re.search(r'font-weight: ([\d ]+);',blk).group(1)
        url=re.search(r'url\((.*?)\)',blk).group(1); stretch=re.search(r'font-stretch: ([^;]+);',blk)
        fn=re.sub(r'\W+','-',fam.lower())+'-'+st+'-'+w.replace(' ','-')+'.woff2'
        open(os.path.join(dest,fn),'wb').write(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':UA})).read())
        out.append(f"@font-face{{font-family:'{fam}';font-style:{st};font-weight:{w};{('font-stretch:'+stretch.group(1)+';') if stretch else ''}font-display:swap;src:url(fonts/{fn}) format('woff2')}}")
print('\n'.join(out))
