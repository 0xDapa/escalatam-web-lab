// Cumbre T1 — página de producto estilo Apple. Scroll-scrub: un solo valor p (0..1) mueve cámara, vista explotada y textos.
import { animate } from 'motion';
import { reduce, $, $$, onIntent, progress, range, wa } from '../lib/ui.js';
import { toast } from '../lib/toast.js';

const story = $('#story'), caps = $$('.cap'), bar = $('.bar'), ln = $('#ln');
let scene = null, p = 0, ticking = false;
// Tramos de cada texto: [entra, sale] (fundido + 24px) — el hero (c0) empieza visible
const T = [[-1, 0.1], [0.14, 0.3], [0.38, 0.62], [0.68, 0.82], [0.87, 1.2]];
function paint() {
  ticking = false; p = progress(story);
  caps.forEach((c, i) => {
    const [a, b] = T[i], fi = i === 0 ? 1 : range(p, a, a + 0.05), fo = 1 - range(p, b - 0.05, b), o = Math.min(fi, fo);
    c.style.opacity = o.toFixed(3);
    const y = (1 - fi) * 24 - (1 - fo) * 24;
    c.style.transform = (c.classList.contains('c1') && innerWidth > 820 ? 'translateY(-50%) ' : '') + `translateY(${y.toFixed(1)}px)`;
  });
  bar.style.setProperty('--p', p.toFixed(3));
  scene?.setProgress(p);
  ln.classList.toggle('light', story.getBoundingClientRect().bottom < 52);
  scrubWords();
}
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
if (!reduce) { addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); }

// Texto que se ilumina palabra a palabra según el scroll (como "The best thing you've never heard")
const scrub = $('#scrub');
scrub.innerHTML = scrub.textContent.split(' ').map(w => `<span>${w}</span>`).join(' ');
const words = $$('span', scrub);
function scrubWords() {
  const r = scrub.getBoundingClientRect(), k = range(innerHeight * 0.85 - r.top, 0, r.height + innerHeight * 0.35);
  const n = Math.round(k * words.length);
  words.forEach((w, i) => w.classList.toggle('on', i < n));
}
if (reduce) words.forEach(w => w.classList.add('on'));

// Three.js se carga cuando el navegador está libre: el póster (render propio) es el LCP.
if (!reduce && !location.hash.startsWith('#render')) onIntent(async () => {
  try {
    const m = await import('./scene.js');
    scene = m.init($('#gl'), { finish: 'natural' });
    scene.setProgress(p);
    requestAnimationFrame(() => document.documentElement.classList.add('ready'));
  } catch (e) { /* sin WebGL: queda el póster */ }
});
// Modo render (herramienta interna): #render=<acabado> pinta la botella sobre fondo transparente.
if (location.hash.startsWith('#render')) import('./scene.js').then(m => {
  const c = $('#gl'); c.style.cssText = 'position:fixed;inset:0;width:800px;height:1000px;opacity:1;z-index:999';
  document.body.style.background = 'transparent';
  const s = m.init(c, { finish: location.hash.split('=')[1], transparent: true }); s.setAngle(0.55);
  window.__png = s.renderOnce();
});

// Carrusel: puntos sincronizados con scroll-snap
const track = $('#track'), tiles = $$('.tile', track), dots = $('#dots');
tiles.forEach((t, i) => { const b = document.createElement('button'); b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Característica ${i + 1}`); b.onclick = () => t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' }); dots.append(b); });
const dbs = $$('button', dots);
var io = new IntersectionObserver(es => es.forEach(e => { if (e.intersectionRatio > 0.6) dbs.forEach((b, i) => b.setAttribute('aria-selected', tiles[i] === e.target)); }), { root: track, threshold: [0.6] });
tiles.forEach(t => io.observe(t));

// Acabados: píldora con muelle (Motion, sin rebote: es UI, no un gesto con inercia) + fundido con 6px de blur
const NAMES = { natural: 'Titanio natural — anodizado mate, el titanio tal cual sale del taller.', basalto: 'Basalto — negro profundo con microtextura que no marca huellas.', arena: 'Arena — un dorado tostado, cálido como la luz de las seis.', paramo: 'Páramo — verde frailejón, el color de la montaña colombiana.' };
const LABEL = { natural: 'Natural', basalto: 'Basalto', arena: 'Arena', paramo: 'Páramo' };
let fin = 'natural', size = 'T1', price = 89, qty = 1;
const sw = $('#sw'), pill = $('#swPill');
function movePill(b, instant) {
  const r = b.getBoundingClientRect(), s = sw.getBoundingClientRect();
  const to = { x: r.left - s.left, y: r.top - s.top - 4, width: r.width, height: r.height };
  instant || reduce ? Object.assign(pill.style, { transform: `translate(${to.x}px,${to.y}px)`, width: to.width + 'px', height: to.height + 'px' }) : animate(pill, to, { type: 'spring', bounce: 0, duration: 0.4 });
}
$$('button', sw).forEach(b => b.addEventListener('click', () => {
  $$('button', sw).forEach(x => x.setAttribute('aria-checked', x === b)); movePill(b);
  fin = b.dataset.f; $('#finName').textContent = NAMES[fin];
  for (const img of [$('#finImg'), $('#buyImg')]) { img.classList.add('swap'); setTimeout(() => { img.src = `img/t1-${fin}-800.webp`; img.alt = `Cumbre T1 en acabado ${LABEL[fin]}`; img.onload = () => img.classList.remove('swap'); }, 160); }
  scene?.setFinish(fin); updateBuy();
}));
requestAnimationFrame(() => movePill($('[aria-checked="true"]', sw), true));
addEventListener('resize', () => movePill($('[aria-checked="true"]', sw), true));
// Compra
$$('.seg button').forEach(b => b.addEventListener('click', () => { $$('.seg button').forEach(x => x.setAttribute('aria-checked', x === b)); size = b.dataset.s; price = +b.dataset.p; updateBuy(); }));
const q = $('#q');
$('#plus').onclick = () => { qty = Math.min(9, qty + 1); updateBuy(true); };
$('#minus').onclick = () => { qty = Math.max(1, qty - 1); updateBuy(true); };
function updateBuy(bump) {
  $('#buyName').textContent = `Cumbre ${size} · ${LABEL[fin]}`; $('#buyPr').textContent = `$ ${price * qty}* · ${qty} ud.`; q.textContent = qty;
  if (bump && !reduce) animate(q, { scale: [0.8, 1] }, { type: 'spring', bounce: 0.35, duration: 0.35 });
  $('#waBuy').href = wa(`Hola, quiero pedir ${qty} Cumbre ${size} en acabado ${LABEL[fin]}. ¿Me confirmas envío y pago?`);
}
updateBuy();
$('#waBuy').addEventListener('click', () => toast('Pedido preparado en WhatsApp', { desc: `${qty} × Cumbre ${size} · ${LABEL[fin]}`, icon: '✓' }));
if (!reduce) paint();
