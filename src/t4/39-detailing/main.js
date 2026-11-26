// Obsidiana — scroll-scrub tipo Apple: sticky de 560vh; el progreso mueve la cinta de corrección, las gotas del
// cerámico, el giro del panel, los rótulos y el medidor de brillo. Three.js se carga por intención (póster = LCP).
import { animate } from 'motion';
import { reduce, $, $$, onIntent, wa, progress, range, lerp } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
const story = $('#story'), gl = $('#gl'), caps = ['#c0', '#c1', '#c2', '#c3', '#c4'].map(s => $(s));
const WIN = [[-1, 0.12], [0.14, 0.34], [0.38, 0.6], [0.62, 0.76], [0.8, 2]];
let g = null;
if (location.hash.startsWith('#render')) import('./scene.js').then(m => { gl.style.opacity = 1; const s = m.init(gl, { render: true }); s.set({ s: location.hash.includes('half') ? 0 : -3.6, drops: 0, rot: location.hash.includes('half') ? 0.05 : -0.4 }); setTimeout(() => (window.__png = s.renderOnce()), 400); });
else if (!reduce) onIntent(async () => { try { g = (await import('./scene.js')).init(gl); document.documentElement.classList.add('ready'); paint(); } catch (e) {} });
function paint() {
  const p = reduce ? 0 : progress(story);
  const s = p < 0.16 ? -3.6 : p < 0.36 ? lerp(-3.6, 0, range(p, 0.16, 0.36)) : p < 0.46 ? 0 : lerp(0, 3.7, range(p, 0.46, 0.62));
  g?.set({ s, drops: range(p, 0.66, 0.82), rot: lerp(-0.4, 0.5, p) });
  caps.forEach((c, i) => { const [a, b] = WIN[i]; c.classList.toggle('on', reduce || (p >= a && p < b)); });
  const gu = Math.round(38 + 53 * range(s, -3.6, 3.7) + 3 * range(p, 0.66, 0.82));
  $('#gu').textContent = gu; $('#guBar').style.transform = `scaleX(${(gu - 30) / 70})`; $('#bar').style.transform = `scaleX(${p})`;
}
addEventListener('scroll', () => requestAnimationFrame(paint), { passive: true }); paint();
// ── Antes / después (input range accesible + clip-path)
const ba = $('#ba'), baR = $('#baR'); baR.addEventListener('input', () => ba.style.setProperty('--x', baR.value + '%'));
// ── Calculadora con número que rueda (Motion), segmentado con muelle
const seg = $('#size'), pill = $('.pill', seg); let mult = 1, shown = 1200, anim;
function movePill(b, inst) { const r = b.getBoundingClientRect(), s = seg.getBoundingClientRect(), v = { x: r.left - s.left - 4, width: r.width }; inst || reduce ? (pill.style.transform = `translateX(${v.x}px)`, pill.style.width = v.width + 'px') : animate(pill, v, { type: 'spring', bounce: 0, duration: 0.35 }); }
$$('button', seg).forEach(b => b.addEventListener('click', () => { $$('button', seg).forEach(x => x.setAttribute('aria-pressed', x === b)); mult = +b.dataset.m; movePill(b); calc(); }));
requestAnimationFrame(() => movePill($('button', seg), true)); addEventListener('resize', () => movePill($('[aria-pressed="true"]', seg), true));
const fmt = n => Math.round(n).toLocaleString('en-US');
function calc() {
  const sel = $$('#opts input:checked'), total = Math.round(sel.reduce((a, i) => a + +i.value, 0) * mult / 50) * 50;
  anim?.stop(); if (reduce) $('#tot').textContent = fmt(total);
  else anim = animate(shown, total, { duration: 0.5, ease: [0.23, 1, 0.32, 1], onUpdate: v => { shown = v; $('#tot').textContent = fmt(v); } });
  $('#wa').href = wa(`Hola Obsidiana, quiero agendar: ${sel.map(i => i.dataset.n).join(', ') || '(diagnóstico)'} para ${$('[aria-pressed="true"]', seg).textContent}. Total estimado $${fmt(total)} MXN. ¿Cuándo? ${$('#day').value}.`);
}
$('#opts').addEventListener('change', calc); $('#day').addEventListener('change', calc); calc();
$('#wa').addEventListener('click', () => toast('Abriendo WhatsApp', { desc: 'Te respondemos con horario y fotos del diagnóstico', icon: '✓' }));
