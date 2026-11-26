// Brava Smash Club — referencia: cravburgers.shop (hamburguesa que se apila, cursor de ingredientes, GSAP + Lenis).
import { gsap, ScrollTrigger, header, smooth, initLang, getLang, reduce, $, $$, waLink, fmt, lines, reveals, onIntent, toast } from '../lib/core.js';

const MENU = [
  { id: 'brava', img: 'smash', p: 149, badge: { es: 'La de la casa', en: 'House pick' }, n: { es: 'La Brava', en: 'La Brava' }, d: { es: 'Doble smash, doble cheddar, cebolla a la plancha, pepinillo y salsa Brava.', en: 'Double smash, double cheddar, griddled onion, pickles and Brava sauce.' } },
  { id: 'clasica', img: 'clasica', p: 119, n: { es: 'Clásica', en: 'Classic' }, d: { es: 'Una carne, americano, lechuga, jitomate y mayo de ajo.', en: 'Single patty, American cheese, lettuce, tomato and garlic mayo.' } },
  { id: 'triple', img: 'doble', p: 189, n: { es: 'Triple amenaza', en: 'Triple threat' }, d: { es: 'Tres carnes, tres quesos y tocino crujiente. Para compartir (o no).', en: 'Three patties, three cheeses and crispy bacon. For sharing (or not).' } },
  { id: 'papas', img: 'papas', p: 59, n: { es: 'Papas a mano', en: 'Hand-cut fries' }, d: { es: 'Papa blanca cortada aquí, doble fritura y sal de chile.', en: 'White potatoes cut in-house, double-fried, chili salt.' } },
  { id: 'combo', img: 'mesa', p: 229, n: { es: 'Combo Viernes', en: 'Friday combo' }, d: { es: 'La Brava + papas + refresco de la casa. Solo viernes y sábado.', en: 'La Brava + fries + house soda. Friday and Saturday only.' } },
];
const T = { add: { es: 'Añadir', en: 'Add' }, empty: { es: 'Tu pedido está vacío. Empieza por La Brava.', en: 'Your order is empty. Start with La Brava.' }, added: { es: 'añadida al pedido', en: 'added to your order' },
  ticker: { es: ['Doble queso', 'Pan brioche', 'Res de Jalisco', 'Papas a mano', 'Salsa Brava'], en: ['Double cheese', 'Brioche bun', 'Jalisco beef', 'Hand-cut fries', 'Brava sauce'] } };
const L = o => o[getLang()];
const cart = new Map(JSON.parse(localStorage.getItem('brava-cart') || '[]'));

function renderMenu() {
  $('#menu').innerHTML = MENU.map(m => `<li class="it"><img src="img/${m.img}-800.webp" width="96" height="96" loading="lazy" alt="">${m.badge ? `<span class="badge">${L(m.badge)}</span>` : ''}
    <div><h3>${L(m.n)}</h3><p>${L(m.d)}</p></div><span class="pr">${fmt(m.p, 'MXN')}</span><button class="add" data-id="${m.id}" aria-label="${L(T.add)} ${L(m.n)}">+</button></li>`).join('');
}
function renderTicker() {
  const w = L(T.ticker); $('.tk').innerHTML = [...w, ...w].map(x => `<span>${x}</span><i>✸</i>`).join('');
}
function renderCart() {
  let n = 0, tot = 0; const rows = [];
  cart.forEach((q, id) => { const m = MENU.find(x => x.id === id); n += q; tot += q * m.p; rows.push(`<li><span>${L(m.n)}</span><span class="q"><button data-d="-1" data-id="${id}" aria-label="−">−</button><b>${q}</b><button data-d="1" data-id="${id}" aria-label="+">+</button></span><b>${fmt(q * m.p, 'MXN')}</b></li>`); });
  const del = $('input[name=mode]:checked')?.value === 'delivery'; if (n && del) tot += 45;
  $('#lines').innerHTML = rows.join('') || `<li class="empty">${L(T.empty)}</li>`;
  $('#count').textContent = n; $('#total').textContent = fmt(tot, 'MXN');
  const en = getLang() === 'en';
  const msg = (en ? 'Hi Brava! My order:\n' : '¡Hola Brava! Mi pedido:\n') + [...cart].map(([id, q]) => { const m = MENU.find(x => x.id === id); return `• ${q}× ${L(m.n)} — ${fmt(q * m.p, 'MXN')}`; }).join('\n')
    + (del ? (en ? '\nDelivery (+$45)' : '\nA domicilio (+$45)') : (en ? '\nPickup' : '\nPara recoger')) + `\nTotal: ${fmt(tot, 'MXN')}\n` + (en ? 'Name: ' : 'Nombre: ');
  $('#send').href = waLink(msg); $('#send').toggleAttribute('aria-disabled', !n);
  localStorage.setItem('brava-cart', JSON.stringify([...cart]));
}
document.addEventListener('click', e => {
  const a = e.target.closest('.add');
  if (a) { const id = a.dataset.id; cart.set(id, (cart.get(id) || 0) + 1); renderCart(); a.classList.add('ok'); a.textContent = '✓'; setTimeout(() => { a.classList.remove('ok'); a.textContent = '+'; }, 900);
    toast(`${L(MENU.find(m => m.id === id).n)} ${L(T.added)}`); if (!reduce) gsap.fromTo('#openCart', { rotate: -8 }, { rotate: 0, duration: .5, ease: 'elastic.out(1,.4)' }); }
  const d = e.target.closest('#lines button');
  if (d) { const id = d.dataset.id, q = (cart.get(id) || 0) + +d.dataset.d; q > 0 ? cart.set(id, q) : cart.delete(id); renderCart(); }
});
document.addEventListener('change', e => { if (e.target.name === 'mode') renderCart(); });

// Drawer del pedido (misma duración para overlay y panel)
const cartEl = $('#cart'), panel = $('.cart-in');
function openCart() { cartEl.hidden = false; gsap.fromTo(cartEl, { backgroundColor: 'rgba(23,13,8,0)' }, { backgroundColor: 'rgba(23,13,8,.5)', duration: .4 }); gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: .45, ease: 'expo.out' }); $('#closeCart').focus(); window.lenis?.stop(); }
function closeCart() { gsap.to(panel, { xPercent: 100, duration: .35, ease: 'power3.in' }); gsap.to(cartEl, { backgroundColor: 'rgba(23,13,8,0)', duration: .35, onComplete: () => { cartEl.hidden = true; $('#openCart').focus(); } }); window.lenis?.start(); }
$('#openCart').addEventListener('click', openCart); $('#closeCart').addEventListener('click', closeCart);
cartEl.addEventListener('click', e => { if (e.target === cartEl) closeCart(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !cartEl.hidden) closeCart(); });

addEventListener('langchange', () => { renderMenu(); renderTicker(); renderCart(); });
renderMenu(); renderTicker(); initLang(); renderCart();
window.lenis = smooth(); header();

// Momento orquestado: la hamburguesa se apila capa a capa (como el loader de Crav, pero dentro del hero, sin tapar el LCP)
if (!reduce) {
  const tl = gsap.timeline({ delay: .15 });
  tl.from('#stack .l', { y: -260, opacity: 0, duration: .7, ease: 'bounce.out', stagger: { each: .12, from: 'end' } })
    .from('.sticker', { scale: .6, rotate: -30, opacity: 0, duration: .6, ease: 'back.out(2)' }, '-=.3');
  lines($('#h1'), { delay: .05 });
  // El método: sección fijada; la espátula aplasta la bola con el scroll
  const mm = gsap.matchMedia();
  mm.add('(min-width: 821px)', () => {
    const st = $$('.st'), deg = $('#deg'), o = { t: 0 };
    gsap.timeline({ scrollTrigger: { trigger: '.metodo', start: 'top top', end: '+=1600', pin: '.pin', scrub: .6,
      onUpdate: s => { const i = Math.min(2, Math.floor(s.progress * 3)); st.forEach((x, j) => x.classList.toggle('on', j === i)); } } })
      .to(o, { t: 230, duration: 1, onUpdate: () => deg.textContent = Math.round(o.t) }, 0)
      .to('#spatula', { y: 140, duration: 1, ease: 'power2.in' }, .6)
      .to('#ball', { scaleY: .28, scaleX: 1.55, transformOrigin: '50% 100%', duration: .5, ease: 'power3.out' }, 1.4)
      .to('#spatula', { y: 0, duration: .6 }, 2)
      .to('#cheese', { opacity: 1, y: -40, duration: .5 }, 2.2)
      .to('#steam', { opacity: .9, y: -20, duration: .6 }, 2.4);
  });
  mm.add('(max-width: 820px)', () => { $('#deg').textContent = '230'; gsap.set('#ball', { scaleY: .28, scaleX: 1.55, transformOrigin: '50% 100%' }); gsap.set('#cheese', { opacity: 1, y: -40 }); gsap.set('#steam', { opacity: .9 }); $$('.st').forEach(x => x.classList.add('on')); });
  // Fotos con paralaje leve (distinto en cada una, no un fade genérico)
  gsap.utils.toArray('.fotos img').forEach((im, i) => gsap.fromTo(im, { yPercent: 8 * (i % 2 ? -1 : 1) }, { yPercent: -8 * (i % 2 ? -1 : 1), ease: 'none', scrollTrigger: { trigger: im, scrub: true } }));
  reveals('.revs .rv, .fotos .rv, .local .rv');
} else { $('#deg').textContent = '230'; $$('.st').forEach(x => x.classList.add('on')); reveals(); }

// Cursor de ingredientes: cadena con física de cuerda (verlet) — solo con ratón y tras la primera interacción
if (!reduce && matchMedia('(pointer:fine)').matches) onIntent(() => {
  const c = $('#rope'), x = c.getContext('2d'), N = 9, P = [], dpr = Math.min(2, devicePixelRatio);
  const size = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; }; size(); addEventListener('resize', size);
  let mx = innerWidth / 2, my = innerHeight / 2, act = 0;
  for (let i = 0; i < N; i++) P.push({ x: mx, y: my + i * 14, px: mx, py: my + i * 14 });
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; act = 90; }, { passive: true });
  const COL = ['#ffc21a', '#c92c15', '#5d7f22', '#fbeed0', '#8a3b1c'];
  gsap.ticker.add(() => {
    if (act-- <= 0 && act < -60) { x.clearRect(0, 0, c.width, c.height); return; }
    P[0].x = mx; P[0].y = my;
    for (let i = 1; i < N; i++) { const p = P[i], vx = (p.x - p.px) * .96, vy = (p.y - p.py) * .96; p.px = p.x; p.py = p.y; p.x += vx; p.y += vy + .6; }
    for (let k = 0; k < 4; k++) for (let i = 1; i < N; i++) { const a = P[i - 1], b = P[i], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, f = (d - 14) / d; b.x -= dx * f; b.y -= dy * f; }
    x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, innerWidth, innerHeight);
    x.strokeStyle = 'rgba(23,13,8,.55)'; x.lineWidth = 2; x.beginPath(); P.forEach((p, i) => i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y)); x.stroke();
    for (let i = 1; i < N; i++) { const p = P[i]; x.fillStyle = COL[i % COL.length]; x.beginPath(); i % 3 === 0 ? x.ellipse(p.x, p.y, 7, 4, (p.x - P[i - 1].x) / 20, 0, 7) : x.arc(p.x, p.y, 5 + (i % 2) * 2, 0, 7); x.fill(); x.strokeStyle = '#170d08'; x.lineWidth = 1.5; x.stroke(); }
  });
});
