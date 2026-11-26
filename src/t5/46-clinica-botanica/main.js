// Lúa Clínica — referencia: odysseeclinic.com.au (duotono CSS, carrusel de una sola barra temporizada, SplitText, Lenis 0,6 s, sin canvas).
import { gsap, ScrollTrigger, SplitText, smooth, header, initLang, getLang, reduce, $, $$, waLink, lines, track } from '../lib/core.js';

const TX = [
  { id: 'val', img: 'hoja', p: 40, n: { es: 'Valoración médica', en: 'Medical assessment' }, d: { es: '30 min con una médica. Se descuenta del primer tratamiento.', en: '30 min with a doctor. Deducted from your first treatment.' } },
  { id: 'hid', img: 'sabila', p: 180, n: { es: 'Hidratación profunda', en: 'Deep hydration' }, d: { es: 'Ácido hialurónico no reticulado, 45 min. Sin baja.', en: 'Non-crosslinked hyaluronic acid, 45 min. No downtime.' } },
  { id: 'pee', img: 'detalle', p: 120, n: { es: 'Peeling químico suave', en: 'Gentle chemical peel' }, d: { es: 'Manchas y textura. 3–4 sesiones según valoración.', en: 'Spots and texture. 3–4 sessions depending on assessment.' } },
  { id: 'bio', img: 'mano', p: 290, n: { es: 'Bioestimulación', en: 'Biostimulation' }, d: { es: 'Activa tu colágeno. Resultado progresivo en 8 semanas.', en: 'Activates your collagen. Gradual result over 8 weeks.' } },
  { id: 'ros', img: 'cala', p: 150, n: { es: 'Láser vascular', en: 'Vascular laser' }, d: { es: 'Rojeces y rosácea. Pauta personalizada.', en: 'Redness and rosacea. Personalised plan.' } },
];
const L = o => o[getLang()], E = () => getLang() === 'en';
const eur = n => new Intl.NumberFormat(E() ? 'en-IE' : 'es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

function renderList() {
  $('#list').innerHTML = TX.map(t => `<li class="row" data-img="${t.img}"><div><h3>${L(t.n)}</h3><p>${L(t.d)}</p></div><span class="pr">${E() ? 'from' : 'desde'} ${eur(t.p)}</span>
    <a data-wa="Hola Lúa, me interesa ${t.n.es}. ¿Qué disponibilidad tenéis?" data-wa-en="Hi Lúa, I'm interested in ${t.n.en}. What availability do you have?" href="#">${E() ? 'Ask on WhatsApp' : 'Consultar por WhatsApp'}</a></li>`).join('');
  $('#tx').innerHTML = TX.map(t => `<option value="${t.id}">${L(t.n)} · ${eur(t.p)}</option>`).join('');
  $('#tx').value = st.tx;
}

// Reserva: 14 días, domingo cerrado, sábado solo mañana; huecos ocupados pseudoaleatorios pero estables
const st = { tx: 'val', day: null, slot: null };
const DAYS = []; { const d0 = new Date(); d0.setHours(0, 0, 0, 0); for (let i = 1; DAYS.length < 14; i++) { const d = new Date(d0); d.setDate(d0.getDate() + i); DAYS.push(d); } }
const SLOTS = d => (d.getDay() === 6 ? ['10:00', '11:00', '12:00', '13:00'] : ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00']).filter((s, i) => (d.getDate() * 7 + i * 3) % 5 !== 0);
function renderBook() {
  const loc = E() ? 'en-GB' : 'es-ES';
  $('#days').innerHTML = DAYS.map((d, i) => `<button type="button" data-i="${i}" ${d.getDay() === 0 ? 'disabled' : ''} aria-pressed="${st.day === i}"><small>${d.toLocaleDateString(loc, { weekday: 'short' })}</small>${d.getDate()}</button>`).join('');
  const d = st.day != null ? DAYS[st.day] : null;
  $('#slots').innerHTML = d ? SLOTS(d).map(s => `<button type="button" data-s="${s}" aria-pressed="${st.slot === s}">${s}</button>`).join('') : `<span>${E() ? 'Choose a day first.' : 'Elige primero un día.'}</span>`;
  const t = TX.find(x => x.id === st.tx);
  const when = d && st.slot ? `${d.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' })}, ${st.slot}` : null;
  $('#sum').textContent = when ? `${L(t.n)} · ${when}` : (E() ? 'Pick a day and a time.' : 'Elige día y hora.');
  const msg = E() ? `Hi Lúa, I'd like to book: ${t.n.en}${when ? ` on ${when}` : ''}. Name: ` : `Hola Lúa, quiero reservar: ${t.n.es}${when ? ` el ${when}` : ''}. Nombre: `;
  const b = $('#bookbtn'); b.href = waLink(msg); b.toggleAttribute('aria-disabled', !when);
}
$('#days').addEventListener('click', e => { const b = e.target.closest('button'); if (!b || b.disabled) return; st.day = +b.dataset.i; st.slot = null; renderBook(); });
$('#slots').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.slot = b.dataset.s; renderBook(); });
$('#tx').addEventListener('change', e => { st.tx = e.target.value; renderBook(); });
$('#bookbtn').addEventListener('click', e => { if (!(st.day != null && st.slot)) { e.preventDefault(); $('#days button:not([disabled])').focus(); } });

// Antes / después
$('#cmp input').addEventListener('input', e => $('#cmp').style.setProperty('--p', e.target.value + '%'));

addEventListener('langchange', () => { renderList(); renderBook(); });
renderList(); renderBook(); initLang();
smooth({ duration: .6 }); header();

// Carrusel de una sola barra: la barra se llena en 5 s y pasa al siguiente (pausa al pasar el ratón)
const slides = $$('.slide'), dots = $$('.dots button'); let cur = 0;
const fill = gsap.fromTo('#barfill', { scaleX: 0 }, { scaleX: 1, duration: 5, ease: 'none', paused: reduce, repeat: -1, onRepeat: () => go(cur + 1) });
function go(i) {
  const n = (i + slides.length) % slides.length; if (n === cur) return;
  const a = slides[cur], b = slides[n]; cur = n;
  dots.forEach((d, j) => d.classList.toggle('on', j === n));
  if (reduce) { a.classList.remove('on'); b.classList.add('on'); return; }
  gsap.to(a, { autoAlpha: 0, duration: .35, ease: 'power2.out', onComplete: () => { a.classList.remove('on'); gsap.set(a, { autoAlpha: 1 });
    b.classList.add('on'); gsap.fromTo($('.duo', b), { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: .9, ease: 'expo.out' }); gsap.fromTo($('img', b), { scale: 1.12 }, { scale: 1, duration: 1.4, ease: 'expo.out' }); } });
}
dots.forEach((d, j) => d.addEventListener('click', () => { go(j); fill.restart(); }));
$('#car').addEventListener('pointerenter', () => fill.pause()); $('#car').addEventListener('pointerleave', () => !reduce && fill.resume());

if (!reduce) {
  lines($('#h1'), { duration: 1.2, stagger: .1 });
  // Manifiesto: palabras que pasan de tenue a tinta con el scroll (un único momento de scroll, no un fade por sección)
  const m = track(SplitText.create('#manif', { type: 'words', aria: 'none' }));
  gsap.fromTo(m.words, { opacity: .18 }, { opacity: 1, stagger: .05, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.manif', start: 'top bottom', end: 'bottom 60%', scrub: true } });
  // Vista previa duotono que sigue al tratamiento bajo el cursor (escritorio)
  const peek = $('.peek'), pimg = $('#peekimg');
  gsap.set(peek, { autoAlpha: 0, scale: .96 });
  $('#list').addEventListener('pointerover', e => { const r = e.target.closest('.row'); if (!r) return; pimg.src = `img/${r.dataset.img}-800.webp`; gsap.to(peek, { autoAlpha: 1, scale: 1, duration: .3, ease: 'expo.out' }); gsap.to(peek, { y: r.offsetTop - 120, duration: .5, ease: 'expo.out' }); });
  $('#list').addEventListener('pointerleave', () => gsap.to(peek, { autoAlpha: 0, scale: .96, duration: .25 }));
}
