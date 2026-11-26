// NOVA — esfera de partículas (Three.js por intención) que late con un loop propio en WebAudio o con un pulso
// simulado; fechas de gira con fondo "compartido" que se desliza al hover (Motion, muelle sin rebote);
// presave con toast, cuenta atrás y booking por WhatsApp.
import { animate } from 'motion';
import { reduce, $, $$, onIntent, wa } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
let loop = null;
const fake = t => { const ph = (t * 124 / 60) % 1, k = Math.exp(-ph * 7); return [k, k * 0.8, 0.3 + 0.2 * Math.sin(t * 2), 0.25, 0.2 + 0.15 * Math.sin(t * 3.1), 0.15, 0.1 + 0.1 * (ph < 0.5 ? 1 : 0), 0.08]; };
const bands = t => (loop ? loop.bands() : reduce ? new Array(8).fill(0.1) : fake(t));
if (!reduce) onIntent(async () => { try { (await import('./scene.js')).init($('#gl'), bands); document.documentElement.classList.add('ready'); } catch (e) {} }, 4000);
const play = $('#play');
play.addEventListener('click', async () => {
  if (loop) { loop.stop(); loop = null; play.setAttribute('aria-pressed', 'false'); $('.pl-t', play).textContent = 'Escuchar adelanto'; return; }
  const m = await import('./audio.js'); loop = m.startLoop(); play.setAttribute('aria-pressed', 'true'); $('.pl-t', play).textContent = 'Pausar';
  if (!document.documentElement.classList.contains('ready')) dispatchEvent(new Event('pointerdown'));
});
// ── Fechas con fondo compartido
const tl = $('#tour'), hl = $('.hl', tl);
function moveHl(row) { const r = row.getBoundingClientRect(), p = tl.getBoundingClientRect(), v = { y: r.top - p.top, height: r.height, opacity: 1 }; reduce ? Object.assign(hl.style, { transform: `translateY(${v.y}px)`, height: v.height + 'px', opacity: 1 }) : animate(hl, v, { type: 'spring', bounce: 0, duration: 0.3 }); }
$$('.gig', tl).forEach(r => { r.addEventListener('pointerenter', () => moveHl(r)); r.addEventListener('focusin', () => moveHl(r)); });
tl.addEventListener('pointerleave', () => animate(hl, { opacity: 0 }, { duration: 0.15 }));
$$('.tix').forEach(b => b.addEventListener('click', () => toast(b.dataset.sold ? 'Lista de espera' : 'Boletos (demo)', { desc: b.dataset.sold ? `Te avisamos si se libera un lugar en ${b.dataset.c}` : `${b.dataset.c}: aquí iría el enlace de la boletera`, icon: '♫' })));
// ── Presave + cuenta atrás
const rel = new Date(Date.now() + 9 * 864e5 + 5 * 36e5);
const cd = () => { const s = Math.max(0, (rel - Date.now()) / 1000); $('#cd').textContent = `${String(Math.floor(s / 86400)).padStart(2, '0')}d ${String(Math.floor(s / 3600) % 24).padStart(2, '0')}h ${String(Math.floor(s / 60) % 60).padStart(2, '0')}m`; };
cd(); setInterval(cd, 30000);
$$('.presave').forEach(b => b.addEventListener('click', () => { b.textContent = 'Guardado ✓'; b.disabled = true; toast('Presave listo', { desc: 'Aparecerá en tu biblioteca el día del lanzamiento', icon: '★', action: { label: 'Deshacer', onClick: () => { b.textContent = 'Presave'; b.disabled = false; } } }); }));
// ── Booking
let tipo = 'Club';
$('#kind').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#kind button').forEach(x => x.setAttribute('aria-pressed', x === b)); tipo = b.textContent; });
$('#form').addEventListener('submit', e => { e.preventDefault(); const f = new FormData(e.target);
  open(wa(`Hola equipo NOVA, booking para ${tipo}. Ciudad: ${f.get('c') || '—'}. Fecha: ${f.get('f') || '—'}. Aforo: ${f.get('a') || '—'}.`), '_blank', 'noopener');
  toast('Abriendo WhatsApp', { desc: 'Rider técnico y fee en menos de 48 h', icon: '✓' }); });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
$$('[data-rv]').forEach(el => io.observe(el));
