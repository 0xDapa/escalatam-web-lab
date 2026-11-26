// Bruma Lodge — referencia: sondaven.com (hero con dither, transiciones suaves de habitaciones, reserva siempre a mano).
import { gsap, ScrollTrigger, smooth, header, initLang, getLang, reduce, $, $$, waLink, lines, reveals, onIntent } from '../lib/core.js';
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip);
const E = () => getLang() === 'en';
const cop = n => '$' + n.toLocaleString(E() ? 'en-US' : 'es-CO') + ' COP';
const R = [
  { id: 'bosque', img: 'cabana', p: 520000, max: 3, es: ['Cabaña del bosque', 'Madera de pino, chimenea y una terraza colgada entre guayacanes. 32 m².', ['Cama king', 'Chimenea', 'Terraza', 'Ducha exterior']], en: ['Forest cabin', 'Pine timber, a fireplace and a terrace hanging among the trees. 32 m².', ['King bed', 'Fireplace', 'Terrace', 'Outdoor shower']] },
  { id: 'jardin', img: 'habitacion', p: 360000, max: 2, es: ['Habitación jardín', 'Planta baja, puerta directa al jardín de heliconias. Ideal para una o dos noches. 22 m².', ['Cama queen', 'Jardín privado', 'Escritorio', 'Ventilador de techo']], en: ['Garden room', 'Ground floor, door straight onto the heliconia garden. Ideal for one or two nights. 22 m².', ['Queen bed', 'Private garden', 'Desk', 'Ceiling fan']] },
  { id: 'cafetal', img: 'acogedora', p: 680000, max: 4, es: ['Suite cafetal', 'Dos ambientes y balcón sobre el cafetal. Para familias o dos parejas. 48 m².', ['2 camas queen', 'Sala', 'Balcón', 'Bañera']], en: ['Coffee-farm suite', 'Two rooms and a balcony over the coffee plants. For families or two couples. 48 m².', ['2 queen beds', 'Living room', 'Balcony', 'Bathtub']] },
];
const EXTRA = 90000;
function renderRooms(open = 'bosque') {
  $('#rooms').innerHTML = R.map(r => { const t = E() ? r.en : r.es; return `<article class="room${r.id === open ? ' big' : ''}" data-flip-id="${r.id}" data-id="${r.id}">
    <div class="ph"><img src="img/${r.img}-800.webp" srcset="img/${r.img}-800.webp 800w, img/${r.img}-1600.webp 1600w" sizes="(max-width:900px) 92vw, 55vw" width="800" height="600" loading="lazy" alt="${t[0]}"></div>
    <div class="rt"><h3>${t[0]}</h3><p class="price">${E() ? 'from' : 'desde'} ${cop(r.p)} / ${E() ? 'night' : 'noche'}</p><p class="more">${t[1]}</p><ul>${t[2].map(x => `<li>${x}</li>`).join('')}</ul>
    <div class="acts"><button class="tog" aria-expanded="${r.id === open}">${r.id === open ? (E() ? 'Close' : 'Cerrar') : (E() ? 'See cabin' : 'Ver cabaña')}</button><a class="link pick" href="#book" data-pick="${r.id}">${E() ? 'Choose these dates' : 'Elegir fechas'}</a></div></div></article>`; }).join('');
  $('#room').innerHTML = R.map(r => `<option value="${r.id}">${(E() ? r.en : r.es)[0]}</option>`).join('');
}
$('#rooms').addEventListener('click', e => {
  const tog = e.target.closest('.tog'), pick = e.target.closest('[data-pick]');
  if (pick) { $('#room').value = pick.dataset.pick; calc(); return; }
  if (!tog) return;
  const card = tog.closest('.room'), state = Flip.getState('.room'), was = card.classList.contains('big');
  $$('.room').forEach(c => { c.classList.remove('big'); $('.tog', c).setAttribute('aria-expanded', 'false'); $('.tog', c).textContent = E() ? 'See cabin' : 'Ver cabaña'; });
  if (!was) { card.classList.add('big'); tog.setAttribute('aria-expanded', 'true'); tog.textContent = E() ? 'Close' : 'Cerrar'; }
  if (!reduce) Flip.from(state, { duration: .8, ease: 'expo.inOut', absolute: false, nested: true, onComplete: () => ScrollTrigger.refresh() });
});

// Reserva: fechas por defecto (en 14 días, 3 noches), total con huésped extra
const iso = d => d.toISOString().slice(0, 10), now = new Date();
const di = new Date(now); di.setDate(di.getDate() + 14); const dout = new Date(di); dout.setDate(di.getDate() + 3);
$('#in').min = iso(now); $('#in').value = iso(di); $('#out').value = iso(dout);
function calc() {
  const r = R.find(x => x.id === $('#room').value) || R[0], g = +$('#guests').value;
  const a = new Date($('#in').value), b = new Date($('#out').value); let n = Math.round((b - a) / 864e5);
  $('#out').min = $('#in').value;
  if (!(n > 0)) { $('#total').textContent = '—'; $('#nights').textContent = E() ? 'Check your dates' : 'Revisa las fechas'; return; }
  const over = g > r.max, extra = Math.max(0, g - 2) * EXTRA, tot = (r.p + extra) * n;
  $('#total').textContent = cop(tot);
  $('#nights').textContent = over ? (E() ? `Max ${r.max} guests in this cabin` : `Máx. ${r.max} huéspedes en esta cabaña`) : `${n} ${E() ? (n > 1 ? 'nights' : 'night') : (n > 1 ? 'noches' : 'noche')} · ${E() ? 'breakfast included' : 'desayuno incluido'}`;
  const name = (E() ? r.en : r.es)[0];
  $('#bookwa').href = waLink(E() ? `Hi Bruma, I'd like to book ${name} from ${$('#in').value} to ${$('#out').value}, ${g} guests (${n} nights, approx. ${cop(tot)}). Is it available?` : `Hola Bruma, quiero reservar ${name} del ${$('#in').value} al ${$('#out').value}, ${g} huéspedes (${n} noches, aprox. ${cop(tot)}). ¿Hay disponibilidad?`);
}
$('#book').addEventListener('input', calc);
addEventListener('langchange', () => { const v = $('#room').value, open = $('.room.big')?.dataset.id; renderRooms(open); $('#room').value = v || 'bosque'; calc(); });
renderRooms(); initLang(); calc();
smooth(); header();

if (!reduce) {
  lines($('#h1'), { delay: .15 });
  reveals('.cabanas [data-split]');
  // Momento orquestado: la foto se disuelve desde un dither de puntos al primer gesto del visitante
  onIntent(async () => {
    const { dither } = await import('./dither.js');
    dither($('#dither'), 'img/cabana-1600.webp', u => {
      gsap.set('#dither', { opacity: 1 }); u.p.value = 0;
      const tl = gsap.timeline();
      tl.fromTo(u.p, { value: 0 }, { value: 1, duration: 2.4, ease: 'power2.inOut', delay: .2 });
      // al bajar, la foto vuelve al dither: el bosque "se cierra" mientras sales
      ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', onUpdate: s => { if (!tl.isActive()) u.p.value = 1 - s.progress * 1.4; } });
    });
  });
  gsap.utils.toArray('.hours li').forEach(li => gsap.fromTo(li, { opacity: .3 }, { opacity: 1, immediateRender: false, ease: 'none', scrollTrigger: { trigger: li, start: 'top bottom', end: 'top 55%', scrub: true } }));
  gsap.fromTo('.dia-img img', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.dia-img', start: 'top bottom', end: 'bottom top', scrub: true } });
}
