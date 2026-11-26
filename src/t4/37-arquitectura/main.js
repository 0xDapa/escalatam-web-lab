// Estudio Vértice — historia scroll-scrub con una casa Three.js (cargada por intención) + índice de proyectos con vista previa.
import { reduce, $, $$, onIntent, progress, range, reveal, wa } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
const story = $('#story'), caps = $$('.cap'), fase = $('#fase'), prog = $('#prog');
const T = [[-1, 0.07], [0.1, 0.3], [0.34, 0.56], [0.6, 0.78], [0.83, 1.3]];
let scene = null, tick = false, p = 0;
function paint() {
  tick = false; p = progress(story);
  caps.forEach((c, i) => {
    const [a, b] = T[i], fi = i ? range(p, a, a + 0.04) : 1, fo = 1 - range(p, b - 0.04, b), o = Math.min(fi, fo);
    c.style.opacity = o.toFixed(3); c.style.transform = `translateY(${((1 - fi) * 30 - (1 - fo) * 30).toFixed(1)}px)`;
    c.style.visibility = o < 0.01 ? 'hidden' : 'visible';
  });
  fase.textContent = '0' + Math.min(4, 1 + Math.floor(p * 4)); prog.style.setProperty('--p', p.toFixed(3));
  scene?.setProgress(p);
}
if (!reduce) { addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(paint); } }, { passive: true }); paint(); }
if (location.hash.startsWith('#render')) import('./scene.js').then(m => { const c = $('#gl'); c.style.opacity = 1; const s = m.init(c, { render: true }); window.__png = s.renderOnce(0); });
else if (!reduce) onIntent(async () => {
  try { const m = await import('./scene.js'); scene = m.init($('#gl')); scene.setProgress(p); requestAnimationFrame(() => document.documentElement.classList.add('ready')); } catch (e) {}
});
// Índice de proyectos: imagen que sigue al cursor (interpolada, no pegada al puntero) y se recorta al entrar
const peek = $('#peek'), pimg = $('img', peek);
let mx = 0, my = 0, px = 0, py = 0, raf = 0;
const follow = () => { px += (mx - px) * 0.18; py += (my - py) * 0.18; peek.style.translate = `${px}px ${py}px`; raf = Math.abs(mx - px) + Math.abs(my - py) > 0.5 ? requestAnimationFrame(follow) : 0; };
$$('#plist li').forEach(li => {
  li.addEventListener('pointerenter', e => { pimg.src = `img/${li.dataset.img}-800.webp`; peek.classList.add('on'); if (!px) { px = mx = e.clientX; py = my = e.clientY; } });
  li.addEventListener('pointerleave', () => peek.classList.remove('on'));
  li.addEventListener('click', () => toast(li.querySelector('.t').textContent, { desc: 'Ficha completa disponible en la versión final del sitio (demo).', icon: '↗' }));
});
addEventListener('pointermove', e => { mx = e.clientX + 30; my = e.clientY; if (!raf && peek.classList.contains('on')) raf = requestAnimationFrame(follow); }, { passive: true });
reveal('.gallery img');
// Formulario → WhatsApp
const m2 = $('#m2'), m2o = $('#m2o'); m2.oninput = () => (m2o.textContent = m2.value + ' m²');
$('#form').addEventListener('submit', e => {
  e.preventDefault(); const f = new FormData(e.target);
  open(wa(`Hola, soy ${f.get('n')}. Quiero hablar de un proyecto de ${f.get('t').toLowerCase()} de unos ${f.get('m')} m² en ${f.get('u') || '(ubicación por definir)'}.`), '_blank', 'noopener');
  toast('Mensaje listo en WhatsApp', { desc: 'Te respondemos en menos de 24 h hábiles.' });
});
