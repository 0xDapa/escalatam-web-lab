// Pliegue Arquitectos — referencias: oharchitecture.com.au (fotografía grande, poco peso) + mersi-architecture.com (scroll horizontal fijado, transición de página).
// Aquí la transición a la ficha del proyecto usa la View Transitions API nativa (0 KB), con fallback a GSAP.
import { gsap, ScrollTrigger, smooth, header, initLang, getLang, reduce, $, $$, waLink, lines, reveals, lenis } from '../lib/core.js';

const P = [
  { img: 'casa-madera', y: 2025, m2: 286, n: 'Casa Guaymaral', loc: 'Guaymaral', es: 'Dos volúmenes de madera termotratada que se abren al sur. La escalera es el patio.', en: 'Two thermo-treated timber volumes opening to the south. The stair is the courtyard.' },
  { img: 'fachada', y: 2024, m2: 1240, n: 'Edificio Quinta', loc: 'Chapinero', es: 'Ocho apartamentos con balcones que giran 12° para encontrar los cerros.', en: 'Eight flats whose balconies turn 12° to find the eastern hills.' },
  { img: 'caracol', y: 2023, m2: 140, n: 'Reforma Teusaquillo', loc: 'Teusaquillo', es: 'Casa de 1948: recuperamos la escalera original y abrimos la cubierta.', en: 'A 1948 house: we restored the original stair and opened the roof.' },
  { img: 'unifamiliar', y: 2023, m2: 310, n: 'Casa La Calera', loc: 'La Calera', es: 'Muros de tapia pisada y una cubierta verde que devuelve el prado.', en: 'Rammed-earth walls and a green roof that gives the meadow back.' },
  { img: 'interior', y: 2022, m2: 95, n: 'Apartamento Rosales', loc: 'Rosales', es: 'Interiorismo completo: un solo mueble de roble organiza cocina, estudio y biblioteca.', en: 'Full interiors: a single oak piece organises kitchen, study and library.' },
];
const E = () => getLang() === 'en';
const cop = n => new Intl.NumberFormat(E() ? 'en-US' : 'es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
function renderTrack() {
  $('#track').innerHTML = P.map((p, i) => `<li class="p"><button data-i="${i}" aria-label="${p.n}, ${p.y}"><div class="ph"><img src="img/${p.img}-800.webp" srcset="img/${p.img}-800.webp 800w, img/${p.img}-1600.webp 1600w" sizes="(max-width:860px) 92vw, 46vw" width="800" height="600" loading="lazy" fetchpriority="low" alt="${p.n}"></div>
    <div class="row"><h3>${p.n}</h3><span class="meta">${p.loc} · ${p.y} · ${p.m2.toLocaleString(E() ? 'en' : 'es-CO')} m²</span></div></button></li>`).join('');
}

// Ficha de proyecto con View Transition (la foto "vuela" de la tira a pantalla completa)
const dlg = $('#detail'); let lastImg = null, lastBtn = null;
function fill(p) {
  $('#d-img').src = `img/${p.img}-1600.webp`; $('#d-img').alt = p.n; $('#d-h').textContent = p.n;
  $('#d-meta').textContent = `${p.loc} · ${p.y} · ${p.m2} m²`; $('#d-txt').textContent = E() ? p.en : p.es;
  $('#d-wa').href = waLink(E() ? `Hi Pliegue, I saw ${p.n} and I'd like something similar for my project.` : `Hola Pliegue, vi ${p.n} y quiero algo parecido para mi proyecto.`);
}
function openP(i, btn) {
  const p = P[i]; lastBtn = btn; lastImg = $('img', btn);
  const show = () => { fill(p); dlg.hidden = false; lenis?.stop(); $('#back').focus(); };
  if (document.startViewTransition && !reduce) { lastImg.style.viewTransitionName = 'project'; $('#d-img').style.viewTransitionName = 'none';
    const t = document.startViewTransition(() => { lastImg.style.viewTransitionName = ''; $('#d-img').style.viewTransitionName = 'project'; show(); }); }
  else { show(); if (!reduce) gsap.from(dlg, { autoAlpha: 0, y: 30, duration: .45, ease: 'expo.out' }); }
}
function closeP() {
  const hide = () => { dlg.hidden = true; lenis?.start(); lastBtn?.focus(); };
  if (document.startViewTransition && !reduce && lastImg) { const t = document.startViewTransition(() => { $('#d-img').style.viewTransitionName = 'none'; lastImg.style.viewTransitionName = 'project'; hide(); }); t.finished.then(() => lastImg.style.viewTransitionName = ''); }
  else hide();
}
$('#track').addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) openP(+b.dataset.i, b); });
$('#back').addEventListener('click', closeP);
addEventListener('keydown', e => { if (e.key === 'Escape' && !dlg.hidden) closeP(); });

// Calculadora de honorarios (rangos de ejemplo por m² en COP)
const RATE = { new: [180000, 260000], reno: [140000, 210000], int: [110000, 170000] }, SCOPE = { d: 1, dp: 1.35, full: 1.9 };
const TIME = { new: [8, 14], reno: [4, 8], int: [3, 5] }, TSC = { d: .35, dp: .55, full: 1 };
function calc() {
  const t = $('input[name=type]:checked').value, s = $('input[name=scope]:checked').value, m2 = +$('#m2').value;
  const [a, b] = RATE[t].map(r => Math.round(r * m2 * SCOPE[s] / 1e6) * 1e6), [ta, tb] = TIME[t].map(x => Math.max(1, Math.round(x * TSC[s] * (m2 > 300 ? 1.3 : 1))));
  $('#o-m2').textContent = `${m2} m²`; $('#fees').textContent = `$${a/1e6}–${b/1e6} M COP`; $('#time').textContent = `${ta}–${tb} ${E() ? 'months' : 'meses'}`;
  const tn = { new: ['casa nueva', 'new house'], reno: ['reforma', 'renovation'], int: ['interiorismo', 'interiors'] }[t], sn = { d: ['solo diseño', 'design only'], dp: ['diseño + licencia', 'design + permit'], full: ['llave en mano', 'turnkey'] }[s];
  $('#calcwa').href = waLink(E() ? `Hi Pliegue, I'd like a proposal: ${tn[1]}, ${m2} m², ${sn[1]}. Estimate ${cop(a)}–${cop(b)}.` : `Hola Pliegue, quiero una propuesta: ${tn[0]}, ${m2} m², ${sn[0]}. Estimado ${cop(a)}–${cop(b)}.`);
}
$('#calc').addEventListener('input', calc);

addEventListener('langchange', () => { renderTrack(); calc(); });
renderTrack(); calc(); initLang();
smooth(); header();

if (!reduce) {
  lines($('#h1'), { stagger: .08 });
  // La foto del hero se abre desde una franja (como el corte de OH Architecture)
  gsap.fromTo('.hero-img img', { clipPath: 'inset(18% 8% 0 8%)' }, { clipPath: 'inset(0% 0% 0 0%)', ease: 'none', scrollTrigger: { trigger: '.hero-img', start: 'top 85%', end: 'top 15%', scrub: true } });
  // Tira horizontal fijada (MERSI) — solo escritorio
  gsap.matchMedia().add('(min-width: 861px)', () => {
    const tr = $('#track'), dist = () => tr.scrollWidth - innerWidth + 40;
    gsap.to(tr, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.obra', start: 'top top', end: () => '+=' + dist(), pin: '.track-wrap', scrub: .5, invalidateOnRefresh: true } });
  });
  reveals('.proceso [data-split]');
  gsap.from('.phases li', { y: 40, opacity: 0, duration: .8, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: '.phases', start: 'top 80%', once: true } });
}
