// Tinta Negra — shader de tinta (Three.js por intención), lista de estilos con vista previa que sigue al cursor
// (aparece desde scale .92, nunca desde 0), revelados con clip-path, "apartar flash" con toast y Deshacer, cotizador.
import { animate } from 'motion';
import { reduce, $, $$, onIntent, wa } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
if (!reduce) onIntent(async () => { try { (await import('./scene.js')).init($('#gl')); document.documentElement.classList.add('ready'); } catch (e) {} }, 4000);
// ── Vista previa flotante de estilos
const peek = $('#peek'), pimg = $('img', peek), list = $('#styles'); let px = 0, py = 0, cx = 0, cy = 0, on = false, raf = 0;
const loop = () => { cx += (px - cx) * 0.18; cy += (py - cy) * 0.18; peek.style.transform = `translate3d(${cx}px,${cy}px,0)`; raf = on ? requestAnimationFrame(loop) : 0; };
if (matchMedia('(hover:hover)').matches) {
  list.addEventListener('pointermove', e => { px = e.clientX + 24; py = e.clientY - 120; if (!on) { on = true; cx = px; cy = py; raf ||= requestAnimationFrame(loop); } });
  $$('button', list).forEach(b => b.addEventListener('pointerenter', () => { pimg.src = `img/${b.dataset.img}-800.webp`; peek.classList.add('on'); }));
  list.addEventListener('pointerleave', () => { on = false; peek.classList.remove('on'); });
}
$$('button', list).forEach(b => b.addEventListener('click', () => { $('#idea').value = `Me interesa un tatuaje estilo ${$('.nm', b).textContent.toLowerCase()}: `; location.hash = 'cita'; $('#idea').focus({ preventScroll: true }); }));
// ── Revelados
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
$$('[data-rv]').forEach(el => io.observe(el));
// ── Apartar flash
$$('.take').forEach(b => b.addEventListener('click', () => {
  const fig = b.closest('.fl'); fig.classList.add('taken'); b.disabled = true; b.textContent = 'Apartado';
  if (!reduce) animate(fig, { scale: [1, 0.97, 1] }, { type: 'spring', bounce: 0.3, duration: 0.4 });
  toast(`${b.dataset.n} apartado 24 h`, { desc: 'Confirma con el anticipo por WhatsApp', icon: '✦', action: { label: 'Deshacer', onClick: () => { fig.classList.remove('taken'); b.disabled = false; b.textContent = 'Apartar'; } } });
}));
// ── Cotizador
let zone = 'Antebrazo'; const Z = { Antebrazo: 1, Brazo: 1.05, Espalda: 1.2, Pierna: 1.1, Costillas: 1.35 };
const fmt = n => '$' + (Math.round(n / 100) * 100).toLocaleString('en-US');
function est() { const s = +$('#size').value, base = 900 + s * 95 * Z[zone]; $('#sizeOut').textContent = s + ' cm'; $('#est').textContent = `${fmt(base)} – ${fmt(base * 1.45)}`; }
$('#zone').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#zone button').forEach(x => x.setAttribute('aria-pressed', x === b)); zone = b.textContent; est(); });
$('#size').addEventListener('input', est); est();
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  open(wa(`Hola Tinta Negra, quiero cotizar un tatuaje. Zona: ${zone}. Tamaño: ${$('#size').value} cm. Idea: ${$('#idea').value || '(te mando referencias)'}. Estimado web: ${$('#est').textContent} MXN.`), '_blank', 'noopener');
  toast('Abriendo WhatsApp', { desc: 'Adjunta fotos de referencia en el chat', icon: '✓' });
});
