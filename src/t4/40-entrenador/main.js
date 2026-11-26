// Kai Torres — interacciones con Motion siguiendo a Emil Kowalski:
// · anillos SVG que se llenan con muelle (bounce 0) y se reinterrumpen al cambiar de periodo;
// · carrusel con arrastre, proyección de inercia (iOS: v·d/(1−d)), banda elástica en los bordes y snap con la velocidad;
// · stepper con número que rueda en la dirección correcta, chips con feedback de presión, toasts con Deshacer.
import { animate } from 'motion';
import { reduce, $, $$, wa, clamp } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
const SPRING = { type: 'spring', bounce: 0, duration: 0.9 };
// ── Anillos
const DATA = { hoy: [0.72, 0.55, 0.9, 432, 25, 7.2], sem: [0.88, 0.8, 0.76, 528, 36, 6.1], mes: [0.95, 0.68, 0.83, 570, 31, 6.6] };
const rings = ['#r1', '#r2', '#r3'].map(s => $(s)), vals = ['#v1', '#v2', '#v3'].map(s => $(s)), cur = [0, 0, 0, 0, 0, 0];
const ctl = [];
function setRings(k) {
  const d = DATA[k]; ctl.forEach(c => c?.stop());
  rings.forEach((r, i) => {
    if (reduce) { r.style.strokeDashoffset = 1 - d[i]; vals[i].textContent = d[i + 3]; return; }
    ctl[i] = animate(r, { strokeDashoffset: 1 - d[i] }, { ...SPRING, delay: i * 0.06 });
    ctl[i + 3] = animate(cur[i + 3], d[i + 3], { duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: i * 0.06, onUpdate: v => { cur[i + 3] = v; vals[i].textContent = i === 2 ? v.toFixed(1) : Math.round(v); } });
  });
}
rings.forEach(r => (r.style.strokeDasharray = '1 1', r.style.strokeDashoffset = 1));
const ringIO = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRings('hoy'); ringIO.disconnect(); } }); ringIO.observe($('.rings'));
const seg = $('#range'), pill = $('.pill', seg);
function movePill(b, inst) { const r = b.getBoundingClientRect(), s = seg.getBoundingClientRect(), v = { x: r.left - s.left - 4, width: r.width }; inst || reduce ? (pill.style.transform = `translateX(${v.x}px)`, pill.style.width = v.width + 'px') : animate(pill, v, { type: 'spring', bounce: 0, duration: 0.35 }); }
$$('button', seg).forEach(b => b.addEventListener('click', () => { $$('button', seg).forEach(x => x.setAttribute('aria-pressed', x === b)); movePill(b); setRings(b.dataset.k); }));
requestAnimationFrame(() => movePill($('button', seg), true)); addEventListener('resize', () => movePill($('[aria-pressed="true"]', seg), true));
// ── Carrusel con inercia y banda elástica
const tw = $('#tw'), track = $('#track'), cards = $$('.plan', track);
let x = 0, min = 0, step = 0, anim = null, idx = 0;
function measure() { const a = cards[0].getBoundingClientRect(), b = cards[1].getBoundingClientRect(); step = b.left - a.left; min = Math.min(0, tw.clientWidth - track.scrollWidth); }
const set = v => { x = v; track.style.transform = `translate3d(${v}px,0,0)`; };
const rubber = (o, d) => (1 - 1 / ((Math.abs(o) * 0.55) / d + 1)) * d * Math.sign(o);   // fórmula de rubber-band de iOS
function snapTo(i, velocity = 0) {
  idx = clamp(i, 0, cards.length - 1); const tgt = Math.max(min, -idx * step);
  anim?.stop(); if (reduce) return set(tgt);
  anim = animate(x, tgt, { type: 'spring', stiffness: 260, damping: 32, velocity, onUpdate: set });
  $('#prev').disabled = idx === 0; $('#next').disabled = tgt <= min;
}
let down = false, sx = 0, sx0 = 0, lx = 0, lt = 0, v = 0, moved = false;
tw.addEventListener('pointerdown', e => { if (e.button) return; down = true; moved = false; anim?.stop(); sx = e.clientX; sx0 = x; lx = e.clientX; lt = e.timeStamp; v = 0; });
addEventListener('pointermove', e => {
  if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5 && !moved) { moved = true; tw.setPointerCapture?.(e.pointerId); tw.classList.add('drag'); }
  const dt = Math.max(1, e.timeStamp - lt); v = 0.8 * ((e.clientX - lx) / dt) + 0.2 * v; lx = e.clientX; lt = e.timeStamp;
  let nx = sx0 + dx; if (nx > 0) nx = rubber(nx, tw.clientWidth); else if (nx < min) nx = min + rubber(nx - min, tw.clientWidth); set(nx);
});
addEventListener('pointerup', () => {
  if (!down) return; down = false; tw.classList.remove('drag');
  const proj = x + (v * 0.998) / (1 - 0.998);          // px/ms → distancia proyectada (deceleración "normal" de iOS)
  snapTo(Math.round(-proj / step), v * 1000);
});
tw.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
$('#prev').addEventListener('click', () => snapTo(idx - 1)); $('#next').addEventListener('click', () => snapTo(idx + 1));
tw.addEventListener('keydown', e => { if (e.key === 'ArrowRight') snapTo(idx + 1); if (e.key === 'ArrowLeft') snapTo(idx - 1); });
measure(); snapTo(0); addEventListener('resize', () => { measure(); snapTo(idx); });
$$('.pick').forEach(b => b.addEventListener('click', () => {
  const sel = $('#plan'), prev = sel.value; sel.value = b.dataset.n;
  toast(`Plan ${b.dataset.n} elegido`, { desc: 'Lo añadimos a tu reserva de prueba', action: { label: 'Deshacer', onClick: () => (sel.value = prev) } });
}));
// ── KPIs que cuentan al entrar
const kio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const el = e.target, to = +el.dataset.to; kio.unobserve(el); reduce ? (el.textContent = to) : animate(0, to, { duration: 1.1, ease: [0.23, 1, 0.32, 1], onUpdate: v => (el.textContent = Math.round(v)) }); }));
$$('[data-to]').forEach(el => kio.observe(el));
// ── Testimonios
const ts = $$('#tst blockquote'), tb = $$('.tnav button'); let ti = 0, tt;
const showT = i => { ts[ti].classList.remove('on'); tb[ti].setAttribute('aria-pressed', 'false'); ti = i; ts[ti].classList.add('on'); tb[ti].setAttribute('aria-pressed', 'true'); };
tb.forEach((b, i) => b.addEventListener('click', () => { clearInterval(tt); showT(i); })); if (!reduce) tt = setInterval(() => showT((ti + 1) % ts.length), 5500);
// ── Reserva: chips + stepper con dirección
let goal = 'Perder grasa', days = 3; const out = $('#days');
$('#goal').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#goal button').forEach(x => x.setAttribute('aria-pressed', x === b)); goal = b.textContent; });
function setDays(n) {
  n = clamp(n, 1, 6); if (n === days) { if (!reduce) animate(out, { x: [0, n === 6 ? 6 : -6, 0] }, { type: 'spring', bounce: 0.6, duration: 0.3 }); return; }
  const dir = n > days ? 1 : -1; days = n; const olds = [...out.children], nu = document.createElement('span'); nu.textContent = n; out.append(nu);
  if (reduce) return olds.forEach(o => o.remove());
  olds.forEach(old => animate(old, { y: -24 * dir, opacity: 0, filter: 'blur(2px)' }, { duration: 0.2, ease: [0.23, 1, 0.32, 1] }).then(() => old.remove()));
  animate(nu, { y: [24 * dir, 0], opacity: [0, 1], filter: ['blur(2px)', 'blur(0px)'] }, { duration: 0.24, ease: [0.23, 1, 0.32, 1] });
}
$('#minus').addEventListener('click', () => setDays(days - 1)); $('#plus').addEventListener('click', () => setDays(days + 1));
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  open(wa(`Hola Kai, quiero mi clase de prueba. Objetivo: ${goal}. Puedo entrenar ${days} días por semana. Plan: ${$('#plan').value}.`), '_blank', 'noopener');
  toast('Abriendo WhatsApp', { desc: `${goal} · ${days} días/sem`, icon: '✓' });
});
