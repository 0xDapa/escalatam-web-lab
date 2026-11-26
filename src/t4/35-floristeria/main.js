// Flora Viva — flor 3D (Three.js, cargada por intención) que se abre con el scroll y cambia de color en "Arma tu ramo";
// el mismo <canvas> se muda del hero al configurador (un solo contexto WebGL). Cesta en drawer (Vaul) y toasts (Sonner).
import { animate } from 'motion';
import { reduce, $, $$, onIntent, wa, range } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
import { drawer } from '../lib/drawer.js';
const gl = $('#gl'), slotHero = $('#slotHero'), slotB = $('#slotB');
let scene = null;
const load = async () => { try { const m = await import('./scene.js'); scene = m.init(gl); scene.setBloom(0.78); requestAnimationFrame(() => document.documentElement.classList.add('ready')); onScroll(); } catch (e) {} };
if (location.hash.startsWith('#render')) import('./scene.js').then(m => { document.body.append(gl); Object.assign(gl.style, { opacity: 1, position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 99 }); const s = m.init(gl, { render: true }); s.resize(); setTimeout(() => (window.__png = s.renderOnce()), 300); });
else if (!reduce) onIntent(load);
// apertura ligada al scroll del hero y mudanza del canvas al configurador
function onScroll() {
  if (!scene) return;
  const inB = slotB.getBoundingClientRect(), y = scrollY;
  const nearB = inB.top < innerHeight * 0.75 && inB.bottom > innerHeight * 0.25;
  const want = nearB ? slotB : slotHero;
  if (gl.parentElement !== want) { want.append(gl); scene.resize(); }
  scene.setBloom(nearB ? 1 : 0.78 + range(y, 0, innerHeight * 0.8) * 0.22);
}
addEventListener('scroll', onScroll, { passive: true });
// ── Cesta
const cart = [], dw = drawer($('#dw .dw-p')), items = $('#items'), cartN = $('#cartN'), cartBtn = $('#cartBtn');
function renderCart() {
  items.innerHTML = cart.map((it, i) => `<li><span>${it.n}<small>${it.d || 'Ramo de temporada'}</small></span><b>${it.p} €</b><button type="button" data-i="${i}" aria-label="Quitar ${it.n}">×</button></li>`).join('');
  $('#empty').hidden = cart.length > 0;
  const sum = cart.reduce((a, b) => a + b.p, 0); $('#sum').textContent = sum + ' €*';
  cartN.textContent = cart.length; cartBtn.setAttribute('aria-label', `Abrir cesta, ${cart.length} ramos`);
  $('#waCart').href = wa(`Hola Flora Viva, quiero pedir: ${cart.map(c => c.n + (c.d ? ` (${c.d})` : '')).join(', ')}. Entrega: ${$('#when').value}. Total aprox. ${sum} €.`);
}
items.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const [it] = cart.splice(+b.dataset.i, 1); renderCart(); toast(`${it.n} quitado`, { icon: '−', action: { label: 'Deshacer', onClick: () => { cart.push(it); renderCart(); } } }); });
$('#when').addEventListener('change', renderCart);
function add(it, from) {
  cart.push(it); renderCart();
  if (!reduce) animate(cartBtn, { scale: [1, 1.18, 1] }, { type: 'spring', bounce: 0.5, duration: 0.45 });
  if (from) { from.classList.add('ok'); from.textContent = '✓'; setTimeout(() => { from.classList.remove('ok'); from.textContent = '+'; }, 1400); }
  toast(`${it.n} en la cesta`, { desc: `${it.p} € · entrega hoy si pides antes de las 13:00`, action: { label: 'Ver cesta', onClick: () => dw.show(cartBtn) } });
}
$$('.add').forEach(b => b.addEventListener('click', () => add({ n: b.dataset.n, p: +b.dataset.p }, b)));
$$('.add-plan').forEach(b => b.addEventListener('click', () => add({ n: b.dataset.n, p: +b.dataset.p, d: 'Suscripción, sin permanencia' })));
cartBtn.addEventListener('click', () => dw.show(cartBtn));
// ── Configurador
let k = 'peonia', size = 45; const NAMES = { peonia: 'peonías', roja: 'rosas rojas', blanca: 'flores blancas', coral: 'rosas coral', lila: 'flores lilas' };
function press(box, b) { $$('button', box).forEach(x => x.setAttribute('aria-pressed', x === b)); }
$('#pal').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; press($('#pal'), b); k = b.dataset.k; scene?.setPalette(k); });
$('#sz').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; press($('#sz'), b); size = +b.dataset.p; $('#cprice').textContent = size + ' €'; });
$('#addCustom').addEventListener('click', () => { const m = $('#msg').value.trim(); add({ n: 'Ramo a tu gusto', p: size, d: `${NAMES[k]}${m ? ' · tarjeta: “' + m + '”' : ''}` }); });
$('#waEvent').href = wa('Hola Flora Viva, quiero presupuesto de flores para un evento. Fecha: __ · Lugar: __ · Invitados: __');
renderCart();
