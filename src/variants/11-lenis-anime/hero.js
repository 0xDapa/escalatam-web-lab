// 11 — Lenis (scroll suave) + anime.js v4: tarta CSS 3D montada con stagger y rebote, confeti cayendo, contadores animados.
import Lenis from 'lenis';
import { animate, stagger } from 'animejs';
import { initCore, stage, reduced } from '../../core/core.js';
const core = initCore({ noCount: true });
// Scroll suave: Lenis mueve el scroll nativo, el núcleo sigue leyendo window.scrollY.
if (!reduced) { const lenis = new Lenis({ autoRaf: true, lerp: 0.09 }); lenis.on('scroll', core.update); document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); lenis.scrollTo(a.getAttribute('href'), { offset: 0 }); })); }
const el = stage(), cake = document.getElementById('cake');
if (!reduced) {
  // Montaje: cada piso cae con rebote elástico, uno tras otro.
  animate('.tier', { translateY: [-520, 0], opacity: [0, 1], duration: 1100, delay: stagger(140, { start: 250 }), ease: 'outBounce' });
  animate('.cherry', { translateY: [-600, 0], scale: [0.4, 1], duration: 900, delay: 1250, ease: 'outElastic(1, .5)' });
  animate('.plate', { scaleX: [0, 1], opacity: [0, 1], duration: 700, ease: 'outExpo' });
  // Respiración continua de los pisos
  animate('.tier', { scaleX: [1, 1.025], duration: 1400, delay: stagger(120, { start: 2200 }), alternate: true, loop: true, ease: 'inOutSine' });
  // Confeti / sprinkles cayendo en bucle
  animate('.spr', { translateY: () => [0, el.clientHeight + 40], rotate: () => [0, 360 + Math.random() * 360], duration: () => 2600 + Math.random() * 2400, delay: stagger(180), loop: true, ease: 'linear' });
  // Inclinación según el puntero
  el.parentElement.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); cake.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 30).toFixed(1) + 'deg'); cake.style.setProperty('--rx', (8 - ((e.clientY - r.top) / r.height - 0.5) * 16).toFixed(1) + 'deg'); });
}
// Contadores con anime.js
const fmt = (v, d) => v.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return; io.unobserve(e.target); e.target.classList.add('in');
  const n = e.target.querySelector('.n'), o = { v: 0 }, d = +(n.dataset.dec || 0), set = () => (n.textContent = (n.dataset.pre || '') + fmt(o.v, d) + (n.dataset.suf || ''));
  if (reduced) { o.v = +n.dataset.to; set(); return; }
  animate(o, { v: +n.dataset.to, duration: 1800, ease: 'outExpo', onUpdate: set });
}), { threshold: 0.6 });
document.querySelectorAll('.nums li').forEach((li) => io.observe(li));
