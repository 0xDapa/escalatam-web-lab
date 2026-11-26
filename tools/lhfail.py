# Lista auditorías fallidas de accesibilidad/buenas prácticas/SEO de lighthouse/<id>.json
import json,sys
for vid in sys.argv[1:]:
    d=json.load(open(f'lighthouse/{vid}.json')); a=d['audits']
    for cat in ['accessibility','best-practices','seo','performance']:
        for r in d['categories'][cat]['auditRefs']:
            x=a[r['id']]
            if x['score'] is not None and x['score']<0.9 and r['weight']>0:
                items=(x.get('details') or {}).get('items',[])[:4]
                print(vid,cat,r['id'],x.get('displayValue',''),[ (i.get('node') or {}).get('snippet','')[:120] for i in items])
