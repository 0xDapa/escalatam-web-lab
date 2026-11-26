// Selva Mate — referencia: manayerbamate.com (lata protagonista, el sabor cambia todo el color de la página, compra directa).
import { gsap, ScrollTrigger, smooth, header, initLang, getLang, reduce, $, $$, waLink, fmt, onIntent, toast } from '../lib/core.js';
const E = () => getLang() === 'en', mxn = n => fmt(n, 'MXN');
const FL = { clasico: { bg: '#1f5a32', es: ['Clásico limón', 'Yerba de Misiones, limón amarillo y gas fino. El de todos los días.'], en: ['Classic lemon', 'Misiones yerba, lemon and fine bubbles. The everyday one.'] },
  maracuya: { bg: '#f2b705', es: ['Maracuyá', 'Ácido y tropical. Para la tarde en que el café ya no entra.'], en: ['Passion fruit', 'Tart and tropical. For the afternoon when coffee no longer fits.'] },
  jamaica: { bg: '#8c1b3a', es: ['Jamaica', 'Flor de jamaica de Guerrero, un poco amarga, muy fría.'], en: ['Hibiscus', 'Hibiscus from Guerrero, slightly bitter, very cold.'] } };
const SIZES = [{ n: 6, p: 219 }, { n: 12, p: 419 }, { n: 24, p: 799 }];
let flavor = 'clasico', can = null, size = 12, mix = { clasico: 4, maracuya: 4, jamaica: 4 };
let cart = JSON.parse(localStorage.getItem('selva-cart') || '[]');

function setFlavor(f, user) {
  flavor = f; document.documentElement.dataset.flavor = f; $('meta[name=theme-color]').content = FL[f].bg;
  $$('.flavors button').forEach(b => b.setAttribute('aria-checked', b.dataset.f === f));
  $('#fdesc').textContent = (E() ? FL[f].en : FL[f].es)[1];
  if (can) { can.paint(f); if (user && !reduce) { const o = { v: 0 }; gsap.to(o, { v: Math.PI * 2, duration: 1, ease: 'expo.out', onUpdate: () => can.spin(o.v) }); } }
}
$('.flavors').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setFlavor(b.dataset.f, true); });

// Configurador de caja: los sabores tienen que sumar el tamaño de la caja
function fitMix() { let tot = Object.values(mix).reduce((a, b) => a + b, 0); const ks = Object.keys(mix);
  while (tot > size) { const k = ks.reduce((a, b) => mix[a] >= mix[b] ? a : b); mix[k]--; tot--; } }
function renderBox() {
  fitMix();
  $('#sizes').innerHTML = SIZES.map(s => `<button role="radio" aria-checked="${s.n === size}" data-n="${s.n}">${s.n} ${E() ? 'cans' : 'latas'}<small>${mxn(s.p)} · ${mxn(Math.round(s.p / s.n))}/${E() ? 'can' : 'lata'}</small></button>`).join('');
  const tot = Object.values(mix).reduce((a, b) => a + b, 0), left = size - tot;
  $('#mix').innerHTML = Object.entries(FL).map(([k, f]) => `<div class="fl" style="--fb:${f.bg};--fi:${k === 'maracuya' ? '#2a1a05' : '#fff'}"><b>${(E() ? f.en : f.es)[0]}</b><div class="step"><button data-k="${k}" data-d="-1" aria-label="${E() ? 'Remove one' : 'Quitar una'} ${(E() ? f.en : f.es)[0]}" ${mix[k] ? '' : 'disabled'}>−</button><output aria-live="polite">${mix[k]}</output><button data-k="${k}" data-d="1" aria-label="${E() ? 'Add one' : 'Añadir una'} ${(E() ? f.en : f.es)[0]}" ${left ? '' : 'disabled'}>+</button></div></div>`).join('')
    + `<div class="cans" aria-hidden="true">${Object.entries(mix).flatMap(([k, n]) => Array(n).fill(`<i style="--fb:${FL[k].bg}"></i>`)).join('')}${'<i class="e"></i>'.repeat(left)}</div>`;
  $('#boxst').textContent = left ? (E() ? `${left} cans left to choose` : `Te faltan ${left} latas por elegir`) : `${E() ? 'Box ready' : 'Caja lista'} · ${mxn(SIZES.find(s => s.n === size).p)}`;
  $('#addbox').disabled = !!left;
}
$('#sizes').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const old = size; size = +b.dataset.n;
  if (size > old) { const add = size - old, ks = Object.keys(mix); for (let i = 0; i < add; i++) mix[ks[i % 3]]++; } renderBox(); });
$('#mix').addEventListener('click', e => { const b = e.target.closest('button[data-k]'); if (!b) return; mix[b.dataset.k] += +b.dataset.d; renderBox(); $(`#mix button[data-k="${b.dataset.k}"][data-d="${b.dataset.d}"]`)?.focus(); });
$('#addbox').addEventListener('click', () => { cart.push({ n: size, p: SIZES.find(s => s.n === size).p, mix: { ...mix } }); save(); toast(E() ? 'Box added to your order' : 'Caja añadida a tu pedido');
  if (!reduce) gsap.fromTo('#cartbtn', { scale: 1 }, { scale: 1.15, duration: .15, yoyo: true, repeat: 1, ease: 'power2.out' }); });

// Pedido → WhatsApp
const short = { clasico: ['limón', 'lemon'], maracuya: ['maracuyá', 'passion fruit'], jamaica: ['jamaica', 'hibiscus'] };
const mixTxt = m => Object.entries(m).filter(([, n]) => n).map(([k, n]) => `${n} ${short[k][E() ? 1 : 0]}`).join(', ');
function save() { localStorage.setItem('selva-cart', JSON.stringify(cart)); renderCart(); }
function renderCart() {
  $('#cartn').textContent = cart.length;
  $('#lines').innerHTML = cart.length ? cart.map((c, i) => `<li><span>${E() ? 'Box of' : 'Caja de'} ${c.n}<small>${mixTxt(c.mix)}</small></span><b>${mxn(c.p)}</b><button data-i="${i}" aria-label="${E() ? 'Remove box' : 'Quitar caja'}">×</button></li>`).join('') : `<li>${E() ? 'Your order is empty.' : 'Tu pedido está vacío.'}</li>`;
  const sub = cart.reduce((a, c) => a + c.p, 0), ship = cart.length >= 2 || !cart.length ? 0 : 60, tot = sub + ship;
  $('#tot').textContent = mxn(tot) + (ship ? ` (${E() ? 'incl. shipping' : 'con envío'} ${mxn(ship)})` : '');
  const z = $('#zone').value.trim() || (E() ? '[neighbourhood]' : '[colonia]');
  const body = cart.map((c, i) => `${i + 1}. ${E() ? 'Box of' : 'Caja de'} ${c.n}: ${mixTxt(c.mix)}`).join('\n');
  $('#send').href = waLink(E() ? `Hi Selva! My order:\n${body}\nTotal ${mxn(tot)}. Delivery in ${z}.` : `¡Hola Selva! Mi pedido:\n${body}\nTotal ${mxn(tot)}. Entrega en ${z}.`);
  $('#send').toggleAttribute('aria-disabled', !cart.length);
}
$('#lines').addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) { cart.splice(+b.dataset.i, 1); save(); } });
$('#zone').addEventListener('input', renderCart);
const dr = $('#drawer');
const openDr = () => { dr.hidden = false; $('#close').focus(); }, closeDr = () => { dr.hidden = true; $('#cartbtn').focus(); };
$('#cartbtn').addEventListener('click', openDr); $('#close').addEventListener('click', closeDr);
dr.addEventListener('click', e => { if (e.target === dr) closeDr(); }); addEventListener('keydown', e => { if (e.key === 'Escape' && !dr.hidden) closeDr(); });

addEventListener('langchange', () => { setFlavor(flavor); renderBox(); renderCart(); });
setFlavor('clasico'); renderBox(); renderCart(); initLang();
smooth(); header();

if (!reduce) {
  // Momento orquestado: la lata real (3D) sustituye al póster SVG al primer gesto y gira con el scroll
  onIntent(async () => {
    try {
      const { can3d } = await import('./can3d.js'); await document.fonts.ready;
      can = can3d($('#can3d'), flavor); $('#stage').classList.add('ready');
      ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', onUpdate: s => can.scroll(s.progress) });
    } catch (err) { /* sin WebGL: se queda el póster */ }
  });
  gsap.from('.hero h1', { yPercent: 18, opacity: 0, duration: .7, ease: 'expo.out' });
  gsap.from('.label > div', { x: -16, opacity: 0, duration: .3, stagger: .06, ease: 'power2.out', scrollTrigger: { trigger: '.label', start: 'top 75%', once: true } });
}
