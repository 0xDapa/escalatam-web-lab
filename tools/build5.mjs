// Tanda 5: empaqueta cada demo. src/t5/<id>/main.js (+ import() dinámicos → chunks) → <id>/js/*.js
// y src/t5/<id>/style.css (+ líneas "@t5 toast drawer" → añade src/t5/lib/<x>.css) → <id>/style.css (minificado).
// Uso: node tools/build4.mjs [ids...]   (three y motion salen de pkg/node_modules; nada viene de CDN)
import { build } from '../pkg/node_modules/esbuild/lib/main.js';
import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ids = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(path.join(ROOT, 'src/t5')).filter(d => /^\d\d-/.test(d));
for (const id of ids) {
  const s = path.join(ROOT, 'src/t5', id), out = path.join(ROOT, id);
  fs.rmSync(path.join(out, 'js'), { recursive: true, force: true });
  const r = await build({ entryPoints: [path.join(s, 'main.js')], bundle: true, splitting: true, format: 'esm', minify: true, target: 'es2020',
    outdir: path.join(out, 'js'), chunkNames: '[name]-[hash]', nodePaths: [path.join(ROOT, 'pkg/node_modules')], metafile: true, legalComments: 'none', logLevel: 'warning' });
  let css = fs.readFileSync(path.join(s, 'style.css'), 'utf8');
  css = css.replace(/^@t5 ([\w ]+);?$/m, (_, l) => l.trim().split(/\s+/).map(x => fs.readFileSync(path.join(ROOT, 'src/t5/lib', x + '.css'), 'utf8')).join('\n'));
  css = css.replace(/^@faces;?$/m, () => fs.readFileSync(path.join(out, 'fonts/faces.css'), 'utf8'));
  const c = await build({ stdin: { contents: css, loader: 'css', resolveDir: out }, write: false, minify: true, logLevel: 'warning' });
  fs.writeFileSync(path.join(out, 'style.css'), c.outputFiles[0].text);
  const sizes = Object.entries(r.metafile.outputs).map(([f, o]) => path.basename(f) + ' ' + (o.bytes / 1024).toFixed(1) + 'KB').join(', ');
  console.log(id, '→', sizes, '| css', (c.outputFiles[0].text.length / 1024).toFixed(1) + 'KB');
}
