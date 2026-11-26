#!/bin/bash
# Lighthouse (móvil simulado, por defecto) para cada variante → lighthouse/<id>.json + lighthouse/resumen.json
cd "$(dirname "$0")/.."; mkdir -p lighthouse
for d in [0-9][0-9]-*/ ; do id=${d%/}
  CHROME_PATH=/usr/bin/google-chrome timeout 180 ./node_modules/.bin/lighthouse "http://localhost:8817/$id/" --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox --use-gl=angle --use-angle=swiftshader" --output=json --output-path="lighthouse/$id.json" --quiet || echo "fallo $id"
done
python3 - <<'PY'
import json,glob,os
out={}
for f in sorted(glob.glob('lighthouse/[0-9]*.json')):
    d=json.load(open(f)); a=d['audits']
    out[os.path.basename(f)[:-5]]={**{k:round(v['score']*100) for k,v in d['categories'].items()},'fcp':a['first-contentful-paint']['displayValue'],'lcp':a['largest-contentful-paint']['displayValue'],'tbt':a['total-blocking-time']['displayValue'],'cls':a['cumulative-layout-shift']['displayValue'],'si':a['speed-index']['displayValue']}
json.dump(out,open('lighthouse/resumen.json','w'),indent=1,ensure_ascii=False); print(json.dumps(out,ensure_ascii=False,indent=0))
PY
