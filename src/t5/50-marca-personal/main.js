// Martina Vega — referencia: landonorris.com (nombre gigante que respira, firma manuscrita, mucho carácter con una sola familia).
// Aquí la "respiración" es el eje wdth de Anybody (50–150 %) animado con GSAP; nada de 3D.
import { gsap, ScrollTrigger, smooth, header, initLang, getLang, reduce, $, $$, waLink, reveals } from '../lib/core.js';
const E = () => getLang() === 'en';
const eur = n => new Intl.NumberFormat(E() ? 'en-IE' : 'es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const P = [
  { id: 'priv', p: 60, min: 60, es: ['Clase privada', '60 min, tú y yo. Vídeo semanal incluido.'], en: ['Private lesson', '60 min, just us. Weekly video included.'] },
  { id: 'semi', p: 38, min: 60, es: ['Semiprivada (2 personas)', 'Precio por persona. Trae a tu pareja de dobles.'], en: ['Semi-private (2 people)', 'Price per person. Bring your doubles partner.'] },
  { id: 'clin', p: 85, min: 180, sat: true, es: ['Clínica del sábado', '3 h, máximo 6 jugadores, de 9:00 a 12:00.'], en: ['Saturday clinic', '3 h, max 6 players, 9:00 to 12:00.'] },
  { id: 'bono', p: 540, min: 60, es: ['Bono 10 clases privadas', 'Ahorras 60 €. Válido 4 meses.'], en: ['10 private lessons pack', 'Save €60. Valid for 4 months.'] },
];
let sel = { prog: 'priv', day: null, slot: null };
const days = (() => { const out = [], d = new Date(); d.setHours(0, 0, 0, 0); while (out.length < 12) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0) out.push(new Date(d)); } return out; })();
const busy = (d, h) => ((d.getDate() * 7 + h * 13) % 5) === 0;
function renderProgs() {
  $('#progs').innerHTML = `<legend class="sr">${E() ? 'Lesson type' : 'Tipo de clase'}</legend>` + P.map(p => { const t = E() ? p.en : p.es; return `<label class="prog"><input type="radio" name="prog" value="${p.id}"${p.id === sel.prog ? ' checked' : ''}><b>${t[0]}</b><span class="pr">${eur(p.p)}</span><small>${t[1]}</small></label>`; }).join('');
}
function renderDays() {
  const prog = P.find(p => p.id === sel.prog), loc = E() ? 'en-GB' : 'es-ES';
  const list = prog.sat ? days.filter(d => d.getDay() === 6) : days;
  if (!sel.day || !list.some(d => +d === +sel.day)) sel.day = list[0];
  $('#days').innerHTML = list.map(d => `<button type="button" role="radio" aria-checked="${+d === +sel.day}" data-d="${+d}"><span>${d.toLocaleDateString(loc, { weekday: 'short' })}</span><b>${d.getDate()}</b></button>`).join('');
  renderSlots();
}
function renderSlots() {
  const prog = P.find(p => p.id === sel.prog), hrs = prog.sat ? [9] : (sel.day.getDay() === 6 ? [9, 10, 11, 12] : [8, 9, 10, 11, 17, 18, 19, 20]);
  if (!hrs.includes(sel.slot) || busy(sel.day, sel.slot)) sel.slot = hrs.find(h => !busy(sel.day, h)) ?? null;
  $('#slots').innerHTML = hrs.map(h => { const b = busy(sel.day, h); return `<button type="button" role="radio" aria-checked="${h === sel.slot}" data-h="${h}"${b ? ' disabled aria-label="' + h + ':00 ' + (E() ? 'taken' : 'ocupado') + '"' : ''}>${h}:00</button>`; }).join('');
  resume();
}
function resume() {
  const prog = P.find(p => p.id === sel.prog), t = E() ? prog.en : prog.es, loc = E() ? 'en-GB' : 'es-ES';
  const day = sel.day.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' });
  if (sel.slot == null) { $('#resume').textContent = E() ? 'No free slots that day, pick another.' : 'Ese día no quedan horas, elige otro.'; $('#bookwa').removeAttribute('href'); return; }
  $('#resume').textContent = `${t[0]} · ${day} · ${sel.slot}:00 · ${eur(prog.p)}`;
  $('#bookwa').href = waLink(E() ? `Hi Martina, I'd like to book: ${t[0]}, ${day} at ${sel.slot}:00 (${eur(prog.p)}). My level is: ` : `Hola Martina, quiero reservar: ${t[0]}, ${day} a las ${sel.slot}:00 (${eur(prog.p)}). Mi nivel es: `);
}
$('#progs').addEventListener('change', e => { sel.prog = e.target.value; renderDays(); });
$('#days').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; sel.day = new Date(+b.dataset.d); renderDays(); });
$('#slots').addEventListener('click', e => { const b = e.target.closest('button:not(:disabled)'); if (!b) return; sel.slot = +b.dataset.h; renderSlots(); });
// flechas en los radiogroups
for (const g of ['#days', '#slots']) $(g).addEventListener('keydown', e => { if (!/Arrow(Left|Right)/.test(e.key)) return; const bs = $$('button:not(:disabled)', $(g)), i = bs.indexOf(document.activeElement); const n = bs[(i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length]; n?.click(); $(g).querySelector(`[data-${g === '#days' ? 'd' : 'h'}="${n?.dataset.d || n?.dataset.h}"]`)?.focus(); });

// Reseñas: arrastrar con el ratón (en táctil es scroll nativo con snap)
const rv = $('#revs'); let down = null;
rv.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = { x: e.clientX, s: rv.scrollLeft }; rv.style.scrollSnapType = 'none'; rv.setPointerCapture(e.pointerId); });
rv.addEventListener('pointermove', e => { if (down) rv.scrollLeft = down.s - (e.clientX - down.x); });
rv.addEventListener('pointerup', () => { down = null; rv.style.scrollSnapType = ''; });

addEventListener('langchange', () => { renderProgs(); renderDays(); });
renderProgs(); renderDays(); initLang();
smooth(); header();

if (!reduce) {
  // Momento orquestado: el nombre se estira de 50 % a 150 % de ancho y la firma se escribe encima
  const sp = $$('.name span'), path = $$('#sig path');
  path.forEach(p => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); });
  const tl = gsap.timeline({ delay: .1 });
  tl.from(sp, { fontStretch: '50%', duration: 1.1, ease: 'expo.out', stagger: .12 })
    .to(path, { strokeDashoffset: 0, duration: .9, ease: 'power1.inOut', stagger: .15 }, '-=.5');
  // al bajar, "Martina" se comprime y "Vega" se ensancha: el nombre respira con el scroll
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .4 } })
    .to(sp[0], { fontStretch: '62%', ease: 'none' }, 0).to(sp[1], { x: '-4vw', ease: 'none' }, 0);
  reveals('.metodo [data-split]');
}
