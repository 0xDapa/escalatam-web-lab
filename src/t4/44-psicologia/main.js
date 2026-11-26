// Elena Ríos — Motion con criterio de Emil Kowalski:
// · texto que se ilumina palabra a palabra con el scroll (Apple), sticky y sin JS de animación (solo opacidad por palabra);
// · respiración 4-4-6 con curvas ease-in-out (no muelle: es un ritmo, no un gesto) y anillo de progreso;
// · reserva en drawer (Vaul) con pasos que entran/salen según la dirección y altura medida animada; toast final.
import { animate } from 'motion';
import { reduce, $, $$, wa, progress, range } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
import { drawer } from '../lib/drawer.js';
// ── Palabras
const wp = $('#words'); wp.innerHTML = wp.textContent.trim().split(/\s+/).map(w => `<span>${w}</span>`).join(' ');
const ws = $$('span', wp), sec = $('.scrub');
function paint() { const p = reduce ? 1 : progress(sec); ws.forEach((w, i) => (w.style.opacity = 0.16 + 0.84 * range(p * 1.25, i / ws.length, (i + 1.5) / ws.length))); }
addEventListener('scroll', () => requestAnimationFrame(paint), { passive: true }); paint();
// ── Respiración
const orb = $('#orb'), txt = $('#bTxt'), ring = $('#bRing'), bS = $('#bStart'); let run = null;
ring.style.strokeDasharray = '1 1'; ring.style.strokeDashoffset = 1;
async function breathe() {
  const t0 = performance.now(), IO = [0.45, 0, 0.55, 1]; let alive = true; run = { stop: () => (alive = false) };
  const tick = () => { if (!alive) return; const p = Math.min(1, (performance.now() - t0) / 60000); ring.style.strokeDashoffset = 1 - p; if (p < 1) requestAnimationFrame(tick); }; tick();
  while (alive && performance.now() - t0 < 60000) {
    txt.textContent = 'Inhala'; await animate(orb, { scale: 1.45 }, { duration: reduce ? 0.01 : 4, ease: IO }); if (!alive) break;
    txt.textContent = 'Sostén'; await new Promise(r => setTimeout(r, 4000)); if (!alive) break;
    txt.textContent = 'Exhala'; await animate(orb, { scale: 1 }, { duration: reduce ? 0.01 : 6, ease: IO });
  }
  if (alive) { txt.textContent = 'Bien hecho'; toast('Un minuto para ti', { desc: '¿Notas el cuerpo un poco más suelto?', icon: '◌' }); stopB(false); }
}
function stopB(reset = true) { run?.stop(); run = null; bS.setAttribute('aria-pressed', 'false'); bS.textContent = 'Empezar 1 minuto'; if (reset) { animate(orb, { scale: 1 }, { duration: 0.4, ease: [0.23, 1, 0.32, 1] }); txt.textContent = 'Listo'; ring.style.strokeDashoffset = 1; } }
bS.addEventListener('click', () => { if (run) return stopB(); bS.setAttribute('aria-pressed', 'true'); bS.textContent = 'Parar'; breathe(); });
// ── Acordeón con altura medida
$$('.acc details').forEach(d => { const s = $('summary', d), c = $('div', d); s.addEventListener('click', e => {
  if (reduce) return; e.preventDefault();
  if (d.open) { animate(c, { height: [c.offsetHeight, 0], opacity: [1, 0] }, { duration: 0.25, ease: [0.23, 1, 0.32, 1] }).then(() => { d.open = false; c.style.height = ''; }); }
  else { d.open = true; const h = c.offsetHeight; animate(c, { height: [0, h], opacity: [0, 1] }, { duration: 0.3, ease: [0.23, 1, 0.32, 1] }).then(() => (c.style.height = '')); }
}); });
// ── Reserva en 3 pasos
const dw = drawer($('#dw .dw-p')), vp = $('#vp'), steps = $$('.stp', vp), back = $('#back'), next = $('#nextB'); let cur = 0; const st = {};
const D = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']; const now = new Date();
$('#days').innerHTML = Array.from({ length: 6 }, (_, i) => { const d = new Date(now); d.setDate(now.getDate() + i + 1); return d; }).filter(d => d.getDay() % 6).slice(0, 4).map(d => `<button type="button" aria-pressed="false">${D[d.getDay()]} ${d.getDate()}</button>`).join('');
const pick = (box, key) => box.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', box).forEach(x => x.setAttribute('aria-pressed', x === b)); st[key] = b.dataset.v || b.textContent; validate(); });
pick($('#mod'), 'mod'); pick($('#days'), 'day'); pick($('#hours'), 'hour');
function validate() { next.disabled = cur === 0 ? !st.mod : cur === 1 ? !(st.day && st.hour) : !$('#nm').value.trim(); next.textContent = cur === 2 ? 'Confirmar por WhatsApp' : 'Continuar'; back.style.visibility = cur ? 'visible' : 'hidden'; $('#stepLbl').textContent = `Paso ${cur + 1} de 3`; if (cur === 2) $('#sum').textContent = `${st.mod} · ${st.day} a las ${st.hour}`; }
$('#nm').addEventListener('input', validate);
async function go(n) {
  if (n === cur || n < 0 || n > 2) return; const dir = n > cur ? 1 : -1, a = steps[cur], b = steps[n], h0 = vp.offsetHeight;
  if (reduce) { a.hidden = true; b.hidden = false; cur = n; return validate(); }
  vp.style.height = h0 + 'px';
  await animate(a, { x: [0, -32 * dir], opacity: [1, 0], filter: ['blur(0px)', 'blur(3px)'] }, { duration: 0.16, ease: [0.23, 1, 0.32, 1] });
  a.hidden = true; b.hidden = false; cur = n; validate(); vp.style.height = 'auto'; const h1 = vp.offsetHeight; vp.style.height = h0 + 'px';
  animate(vp, { height: h1 }, { type: 'spring', bounce: 0, duration: 0.35 }).then(() => (vp.style.height = ''));
  animate(b, { x: [32 * dir, 0], opacity: [0, 1], filter: ['blur(3px)', 'blur(0px)'] }, { duration: 0.24, ease: [0.23, 1, 0.32, 1] });
}
back.addEventListener('click', () => go(cur - 1));
next.addEventListener('click', () => {
  if (cur < 2) return go(cur + 1);
  open(wa(`Hola Dra. Ríos, soy ${$('#nm').value.trim()}. Quisiera reservar una sesión ${st.mod.toLowerCase()} el ${st.day} a las ${st.hour}.${$('#mot').value ? ' Motivo: ' + $('#mot').value : ''}`), '_blank', 'noopener');
  dw.hide(); toast('Solicitud preparada', { desc: `${st.day} · ${st.hour}. Te confirmo por WhatsApp.`, icon: '✓' });
});
$$('.open-book').forEach(b => b.addEventListener('click', () => { validate(); dw.show(b); }));
validate();
