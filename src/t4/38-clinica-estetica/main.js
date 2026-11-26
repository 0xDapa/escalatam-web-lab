// Aura — microinteracciones al estilo Emil Kowalski con Motion (vanilla):
// tarjeta → modal con animación de layout (FLIP con muelle, interrumpible), drawer tipo Vaul, toasts tipo Sonner,
// popovers con origen en el disparador, píldora con muelle, número que "rueda", acordeón con altura medida.
import { animate } from 'motion';
import { reduce, $, $$, wa } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
import { drawer } from '../lib/drawer.js';

const T = [
  { k: 'Arrugas de expresión', t: 'Toxina botulínica', x: 'Relaja los músculos que marcan frente, entrecejo y patas de gallo. Dosis medida para que sigas teniendo expresión.', d: '20 min', r: '3–7 días · dura 4–6 meses', p: '$ 190.000*' },
  { k: 'Hidratación profunda', t: 'Skinbooster', x: 'Microinyecciones de ácido hialurónico no reticulado: piel jugosa, luminosa y con menos líneas finas.', d: '30 min', r: 'al momento · 6 meses', p: '$ 240.000*' },
  { k: 'Manchas y tono', t: 'Peeling médico', x: 'Ácidos de grado médico para unificar el tono, mejorar el melasma leve y afinar la textura.', d: '40 min', r: '7–10 días · por sesiones', p: '$ 90.000*' },
  { k: 'Labios definidos', t: 'Relleno sutil', x: 'Contorno e hidratación con 0,5–1 ml. Natural, proporcionado y reversible.', d: '30 min', r: 'al momento · 9–12 meses', p: '$ 260.000*' },
  { k: 'Firmeza', t: 'Radiofrecuencia + inductores', x: 'Estimula colágeno propio para tensar óvalo facial y cuello sin cirugía.', d: '45 min', r: '1–3 meses · 12 meses', p: '$ 320.000*' },
  { k: 'Poros y textura', t: 'Láser fraccionado suave', x: 'Renueva la superficie de la piel con mínima baja social: poros más finos y piel más lisa.', d: '40 min', r: '2–4 semanas · por sesiones', p: '$ 280.000*' },
];
const SPRING = { type: 'spring', bounce: 0.12, duration: 0.5 };
// ── Tarjeta → modal (layout animation). Se anima desde el valor actual: si cierras a mitad, se invierte sin saltos.
const modal = $('#modal'), mc = $('.m-card', modal), mOv = $('.m-ov', modal), mBody = $('.m-body', modal), mG = $('#mG');
let from = null, anim = null, openI = -1;
function rel(a, b) { return { x: a.left - b.left, y: a.top - b.top, sx: a.width / b.width, sy: a.height / b.height }; }
function openCard(card) {
  const i = +card.dataset.i, d = T[i]; openI = i; from = card;
  $('#mKick').textContent = d.k; $('#mTitle').textContent = d.t; $('#mText').textContent = d.x; $('#mDur').textContent = d.d; $('#mRes').textContent = d.r; $('#mPr').textContent = d.p;
  mG.className = 'cg g' + i; modal.hidden = false; document.documentElement.style.overflow = 'hidden';
  const a = card.getBoundingClientRect(), b = mc.getBoundingClientRect(), r = rel(a, b);
  card.dataset.hidden = 'true';
  if (reduce) { animate(mc, { opacity: [0, 1] }, { duration: 0.2 }); } else {
    anim?.stop?.();
    anim = animate(mc, { x: [r.x, 0], y: [r.y, 0], scaleX: [r.sx, 1], scaleY: [r.sy, 1], borderRadius: ['24px', '28px'] }, SPRING);
    animate(mBody, { opacity: [0, 1], filter: ['blur(4px)', 'blur(0px)'] }, { duration: 0.3, delay: 0.08, ease: [0.23, 1, 0.32, 1] });
  }
  animate(mOv, { opacity: [0, 1] }, { duration: 0.25 });
  setTimeout(() => mc.focus({ preventScroll: true }), 30);
}
function closeCard() {
  if (openI < 0) return; const card = from; openI = -1;
  const a = card.getBoundingClientRect(), b = mc.getBoundingClientRect();
  // medimos la caja "sin transformar" para que el cierre funcione aunque la apertura siga en curso
  const cur = getComputedStyle(mc).transform; mc.style.transform = 'none'; const base = mc.getBoundingClientRect(); mc.style.transform = cur;
  const r = rel(a, base);
  animate(mOv, { opacity: 0 }, { duration: 0.2 });
  animate(mBody, { opacity: 0 }, { duration: 0.12 });
  const done = () => { modal.hidden = true; card.dataset.hidden = 'false'; document.documentElement.style.overflow = ''; card.focus({ preventScroll: true }); };
  if (reduce) return animate(mc, { opacity: 0 }, { duration: 0.15 }).then(done);
  anim = animate(mc, { x: r.x, y: r.y, scaleX: r.sx, scaleY: r.sy }, { type: 'spring', bounce: 0, duration: 0.38 }); anim.then(() => { if (openI < 0) done(); });
}
$$('.card').forEach(c => c.addEventListener('click', () => openCard(c)));
mOv.addEventListener('click', closeCard); $('.m-x', modal).addEventListener('click', closeCard);
addEventListener('keydown', e => { if (e.key === 'Escape' && openI >= 0) closeCard(); });
// ── Drawer de reserva (Vaul)
const dw = drawer($('#dw .dw-p')), bkT = $('#bkT');
T.forEach(t => bkT.add(new Option(`${t.t} — ${t.k}`, t.t))); bkT.add(new Option('Solo valoración (gratis)', 'Valoración'), 0); bkT.selectedIndex = 0;
const DAY = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const days = $('#days'), hours = $('#hours'); let day = '', hour = '';
for (let i = 1, n = 0; n < 8; i++) { const d = new Date(Date.now() + i * 864e5); if (d.getDay() === 0) continue; n++;
  const b = document.createElement('button'); b.type = 'button'; b.innerHTML = `${d.getDate()}<small>${DAY[d.getDay()]}</small>`; b.dataset.v = `${DAY[d.getDay()]} ${d.getDate()}`; b.setAttribute('aria-pressed', 'false'); days.append(b); }
['10:00', '11:30', '13:00', '16:30', '18:00', '19:15'].forEach(h => { const b = document.createElement('button'); b.type = 'button'; b.textContent = h; b.dataset.v = h; b.setAttribute('aria-pressed', 'false'); hours.append(b); });
function chips(box, set) { box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', box).forEach(x => x.setAttribute('aria-pressed', x === b)); set(b.dataset.v); }); }
chips(days, v => (day = v)); chips(hours, v => (hour = v));
$$('[data-book]').forEach(b => b.addEventListener('click', () => dw.show(b)));
$('#mBook').addEventListener('click', () => { const t = T[openI]?.t; closeCard(); if (t) bkT.value = t; setTimeout(() => dw.show($('#cards')), 220); });
$('#bk').addEventListener('submit', e => {
  e.preventDefault();
  if (!day || !hour) { toast('Elige día y hora', { icon: '!', desc: 'Falta un paso para confirmar.' }); return; }
  const n = new FormData(e.target).get('n');
  open(wa(`Hola, soy ${n}. Quiero reservar ${bkT.value} el ${day} a las ${hour}.`), '_blank', 'noopener');
  dw.hide(); toast('Reserva enviada por WhatsApp', { desc: `${bkT.value} · ${day} · ${hour}`, action: { label: 'Deshacer', onClick: () => toast('Reserva anulada', { icon: '↺' }) } });
});
// ── Simulador: píldora con muelle + número que rueda
const seg = $('#seg'), pill = $('.seg-pill', seg), tot = $('#total'); let base = 190, shown = 190;
function place(b, inst) { const r = b.getBoundingClientRect(), s = seg.getBoundingClientRect(); const to = { x: r.left - s.left, width: r.width };
  inst || reduce ? (pill.style.transform = `translateX(${to.x}px)`, pill.style.width = to.width + 'px') : animate(pill, to, { type: 'spring', bounce: 0.15, duration: 0.45 }); }
function total() {
  let v = base * ($('#pack').checked ? 0.85 : 1); v = Math.round(v);
  const fmt = n => (Math.round(n) * 1000).toLocaleString('es-CL');
  if (reduce) { tot.textContent = fmt(v); shown = v; return; }
  animate(shown, v, { duration: 0.5, ease: [0.23, 1, 0.32, 1], onUpdate: n => (tot.textContent = fmt(n)) }); shown = v;
  animate(tot, { filter: ['blur(2px)', 'blur(0px)'], y: [4, 0] }, { duration: 0.3 });
}
$$('button', seg).forEach(b => b.addEventListener('click', () => { $$('button', seg).forEach(x => x.setAttribute('aria-checked', x === b)); place(b); base = +b.dataset.v; total(); }));
$('#pack').addEventListener('change', total);
$('#ctrl').addEventListener('change', e => toast(e.target.checked ? 'Control incluido' : 'Control quitado', { desc: 'Siempre gratuito en Aura (ejemplo).' }));
requestAnimationFrame(() => place($('[aria-checked="true"]', seg), true)); addEventListener('resize', () => place($('[aria-checked="true"]', seg), true));
// ── Popovers con origen en el disparador; el segundo aparece al instante (sin retraso ni animación)
const pop = $('#pop'); let pt = 0, warm = false, coolT = 0;
function showPop(el) {
  clearTimeout(coolT); pop.textContent = el.dataset.pop; pop.hidden = false;
  const r = el.getBoundingClientRect(), w = Math.min(260, innerWidth - 24);
  let x = Math.min(innerWidth - w - 12, Math.max(12, r.left + r.width / 2 - w / 2)), y = r.bottom + 10;
  pop.style.left = x + 'px'; pop.style.top = y + 'px'; pop.style.width = w + 'px';
  pop.style.setProperty('--o', `${r.left + r.width / 2 - x}px 0`);
  if (warm) pop.setAttribute('data-instant', ''); else pop.removeAttribute('data-instant');
  pop.dataset.state = 'closed'; requestAnimationFrame(() => (pop.dataset.state = 'open')); warm = true;
}
function hidePop() { pop.dataset.state = 'closed'; coolT = setTimeout(() => { warm = false; pop.hidden = true; }, 400); }
$$('[data-pop]').forEach(el => {
  el.addEventListener('pointerenter', () => { clearTimeout(pt); pt = setTimeout(() => showPop(el), warm ? 0 : 300); });
  el.addEventListener('pointerleave', () => { clearTimeout(pt); hidePop(); });
  el.addEventListener('focus', () => showPop(el)); el.addEventListener('blur', hidePop);
  el.addEventListener('click', e => { e.preventDefault(); showPop(el); });
});
// ── Acordeón: altura medida (excepción documentada a "solo transform/opacity")
$$('.qa button').forEach(b => b.addEventListener('click', () => {
  const an = b.nextElementSibling, open = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', !open);
  const h = an.scrollHeight;
  if (reduce) { an.style.height = open ? '0px' : 'auto'; return; }
  animate(an, { height: open ? [h + 'px', '0px'] : ['0px', h + 'px'], opacity: open ? [1, 0] : [0, 1] }, { duration: 0.3, ease: [0.23, 1, 0.32, 1] }).then(() => { if (!open) an.style.height = 'auto'; });
}));
$('#copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText('Av. Providencia 1208, of. 702, Santiago'); } catch (e) {} toast('Dirección copiada', { desc: 'Av. Providencia 1208, of. 702' }); });
