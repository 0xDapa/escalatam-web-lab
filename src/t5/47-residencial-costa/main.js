// Mirador del Faro — referencia: era-residence.com (plano como hero, día/noche, filtro de unidades). GSAP Flip + ScrollTrigger + Lenis.
import { gsap, ScrollTrigger, smooth, header, initLang, getLang, reduce, $, $$, waLink, lines, reveals } from '../lib/core.js';
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip);

const U = [['1A', 2, 1, 86, 420000, 'free'], ['1B', 3, 1, 118, 465000, 'sold'], ['1C', 2, 1, 89, 428000, 'free'], ['2A', 2, 2, 86, 438000, 'sold'], ['2B', 3, 2, 118, 482000, 'res'], ['2C', 3, 2, 121, 495000, 'free'],
  ['3A', 3, 3, 118, 505000, 'sold'], ['3B', 3, 3, 121, 515000, 'sold'], ['3C', 2, 3, 92, 459000, 'free'], ['PH1', 4, 4, 164, 890000, 'res'], ['PH2', 4, 4, 171, 945000, 'free'], ['PH3', 4, 4, 158, 870000, 'sold']]
  .map(([id, bed, fl, m2, p, s]) => ({ id, bed, fl, m2, p, s }));
const E = () => getLang() === 'en';
const eur = n => new Intl.NumberFormat(E() ? 'en-IE' : 'es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const ST = { free: ['Disponible', 'Available'], res: ['Reservada', 'Reserved'], sold: ['Vendida', 'Sold'] };
let filter = 'all';
function renderGrid() {
  $('#grid').innerHTML = U.map(u => `<li class="u ${u.s}" data-flip-id="${u.id}" data-bed="${u.bed}" data-s="${u.s}"><span class="id">${u.id}</span>
    <span class="ty">${u.bed === 4 ? (E() ? 'Penthouse' : 'Ático') : `${u.bed} ${E() ? 'bed' : 'dorm.'}`} · ${E() ? 'floor' : 'planta'} ${u.fl} · ${u.m2} m²</span>
    <span class="pr">${eur(u.p)}</span><span class="st">${ST[u.s][E() ? 1 : 0]}</span>
    ${u.s !== 'sold' ? `<a data-wa="Hola, me interesa la vivienda ${u.id} de Mirador del Faro (${u.m2} m²). ¿Me enviáis el plano?" data-wa-en="Hi, I'm interested in home ${u.id} at Mirador del Faro (${u.m2} m²). Could you send me the floor plan?" href="#">${E() ? 'Get the plan' : 'Pedir plano'}</a>` : ''}</li>`).join('');
  applyFilter(false);
}
function applyFilter(anim = true) {
  const items = $$('.u'), state = anim && !reduce ? Flip.getState(items) : null;
  items.forEach(el => { const ok = filter === 'all' || (filter === 'free' ? el.dataset.s === 'free' : el.dataset.bed === filter); el.hidden = !ok; });
  if (state) Flip.from(state, { duration: .6, ease: 'expo.out', scale: true, absolute: true, onEnter: e => gsap.fromTo(e, { opacity: 0, scale: .94 }, { opacity: 1, scale: 1, duration: .4 }), onLeave: e => gsap.to(e, { opacity: 0, scale: .94, duration: .3 }) });
}
$('.filters').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; filter = b.dataset.f; $$('.filters button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); applyFilter(); });

// Calculadora de hipoteca (sistema francés)
const ids = ['price', 'down', 'years', 'rate'];
function calc() {
  const [P, d, y, r] = ids.map(i => +$('#' + i).value), loan = P * (1 - d / 100), i = r / 1200, n = y * 12, q = loan * i / (1 - Math.pow(1 + i, -n));
  $('#o-price').textContent = eur(P); $('#o-down').textContent = `${d} % · ${eur(P * d / 100)}`; $('#o-years').textContent = `${y} ${E() ? 'years' : 'años'}`; $('#o-rate').textContent = `${r.toFixed(1)} %`;
  $('#fee').textContent = eur(q);
  $('#calcwa').href = waLink(E() ? `Hi, I'd like a real mortgage study: home ${eur(P)}, ${d}% down, ${y} years. Estimated payment ${eur(q)}/month.` : `Hola, quiero un estudio de hipoteca real: vivienda de ${eur(P)}, entrada ${d} %, ${y} años. Cuota estimada ${eur(q)}/mes.`);
}
ids.forEach(i => $('#' + i).addEventListener('input', calc));

// Día / noche (como ERA): cambia la paleta completa y la foto del hero
$('#dn').addEventListener('click', () => {
  const on = !document.documentElement.classList.contains('night'), ni = $('.hero-img .night');
  if (ni.dataset.src) { ni.src = ni.dataset.src; delete ni.dataset.src; }
  document.documentElement.classList.toggle('night', on); $('#dn').setAttribute('aria-pressed', String(on));
  $('#dn span:last-child').textContent = on ? (E() ? 'Day' : 'Día') : (E() ? 'Night' : 'Noche');
  $('meta[name=theme-color]').content = on ? '#0e1626' : '#eef2f3';
});

addEventListener('langchange', () => { renderGrid(); calc(); });
renderGrid(); calc(); initLang();
smooth(); header();

if (!reduce) {
  // Momento orquestado: el plano se dibuja (muros → puertas → rótulos) mientras entra el titular
  const walls = $$('#plan .w path, #plan .d path');
  walls.forEach(p => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
  gsap.timeline({ delay: .1 })
    .to(walls, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: .12 })
    .from('#plan .t text', { opacity: 0, y: 6, duration: .4, stagger: .06 }, '-=.6');
  lines($('#h1'));
  gsap.fromTo('.l-img img', { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.lugar', start: 'top bottom', end: 'bottom top', scrub: true } });
  reveals('.l-t [data-split]');
}
// Fotos de más abajo: se piden al acercarse (no compiten con el hero)
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const i = e.target; i.srcset = i.dataset.srcset; i.src = i.dataset.src; io.unobserve(i); }), { rootMargin: '600px 0px' });
$$('img[data-srcset]').forEach(i => io.observe(i));
