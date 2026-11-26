// Lucía Ferrer — galería curva WebGL (scroll + arrastre con inercia), lightbox con FLIP (Motion, interrumpible),
// citas con fundido + desenfoque, segmentado con píldora en muelle y reserva por WhatsApp con toast.
import { animate } from 'motion';
import { reduce, $, $$, onIntent, wa, progress } from '../lib/ui.js';
import { toast } from '../lib/toast.js';
const FILES = ['boda', 'cumbre', 'pinos', 'elefante', 'mirador', 'garza', 'valle', 'retrato'];
const CAPS = [['Boda en el Empordà', 'Girona · 2025'], ['Cumbre al alba', 'Pirineo · 2024'], ['Capas azules', 'Montseny · 2024'], ['Piel y tiempo', 'Editorial B/N · 2023'], ['Verde Garrotxa', 'Paisaje · 2024'], ['Silencio en el delta', 'Ebre · 2023'], ['Val d’Aran', 'Paisaje · 2025'], ['Retrato en estudio', 'Poblenou · 2025']];
const arc = $('#arc'), cap = $('#cap'), gl = $('#gl');
let g = null, drag = 0, base = 0;
function setCap(i) {
  const [t, m] = CAPS[i];
  if (reduce) { cap.querySelector('.n').textContent = String(i + 1).padStart(2, '0'); cap.querySelector('.t').textContent = t; cap.querySelector('.m').textContent = m; return; }
  // Emil: crossfade corto con 2-3 px de blur para que no se vean dos estados a la vez
  animate(cap, { opacity: [1, 0], filter: ['blur(0px)', 'blur(3px)'], y: [0, -6] }, { duration: 0.14, ease: [0.23, 1, 0.32, 1] }).then(() => {
    cap.querySelector('.n').textContent = String(i + 1).padStart(2, '0'); cap.querySelector('.t').textContent = t; cap.querySelector('.m').textContent = m;
    animate(cap, { opacity: [0, 1], filter: ['blur(3px)', 'blur(0px)'], y: [6, 0] }, { duration: 0.24, ease: [0.23, 1, 0.32, 1] });
  });
}
const apply = () => g?.set(base + drag);
function onScroll() { if (!g) return; base = progress(arc) * g.SP * (FILES.length - 1); apply(); }
async function load() {
  try {
    const m = await import('./scene.js');
    g = m.init(gl, FILES.map(f => `img/${f}-800.webp`), { onIndex: setCap });
    document.documentElement.classList.add('ready'); onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    // arrastre horizontal con inercia (proyección del momento, como en iOS)
    let x0 = 0, d0 = 0, lx = 0, lt = 0, v = 0, on = false;
    arc.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button) return; on = true; x0 = lx = e.clientX; lt = e.timeStamp; d0 = drag; v = 0; arc.classList.add('drag'); });
    addEventListener('pointermove', e => { if (!on) return; const dt = Math.max(1, e.timeStamp - lt); v = (e.clientX - lx) / dt; lx = e.clientX; lt = e.timeStamp; drag = d0 - (e.clientX - x0) / innerWidth * g.SP * 2.4; apply(); });
    addEventListener('pointerup', () => { if (!on) return; on = false; arc.classList.remove('drag'); drag -= (v * 0.998 / (1 - 0.998)) / innerWidth * g.SP * 2.4 * 0.08; const t = base + drag; drag += Math.round(t / g.SP) * g.SP - t; apply(); });
  } catch (e) {}
}
if (!reduce) onIntent(load); else document.documentElement.classList.add('static');
// ── Lightbox con FLIP desde la miniatura (origin-aware)
const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'); let from = null;
$$('.ph').forEach(b => b.addEventListener('click', () => {
  const im = $('img', b); from = b; lbImg.src = im.currentSrc.replace('-800', '-1600'); lbImg.alt = im.alt; lbCap.textContent = $('span', b).textContent;
  lb.hidden = false; document.body.style.overflow = 'hidden'; $('#lbX').focus({ preventScroll: true });
  if (reduce) return;
  const a = im.getBoundingClientRect(), z = lbImg.getBoundingClientRect();
  animate(lbImg, { x: [a.left + a.width / 2 - (z.left + z.width / 2), 0], y: [a.top + a.height / 2 - (z.top + z.height / 2), 0], scale: [a.width / z.width, 1] }, { type: 'spring', bounce: 0, duration: 0.45 });
  animate(lb, { backgroundColor: ['rgba(12,12,11,0)', 'rgba(12,12,11,.94)'] }, { duration: 0.3 });
}));
async function closeLb() {
  if (lb.hidden) return;
  if (!reduce && from) { const a = $('img', from).getBoundingClientRect(), z = lbImg.getBoundingClientRect(); animate(lb, { backgroundColor: 'rgba(12,12,11,0)' }, { duration: 0.25 }); await animate(lbImg, { x: a.left + a.width / 2 - (z.left + z.width / 2), y: a.top + a.height / 2 - (z.top + z.height / 2), scale: a.width / z.width }, { type: 'spring', bounce: 0, duration: 0.35 }); }
  lb.hidden = true; lbImg.style.transform = ''; document.body.style.overflow = ''; from?.focus({ preventScroll: true });
}
$('#lbX').addEventListener('click', closeLb); lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
// ── Citas
const qs = $$('#quotes blockquote'), qb = $$('.qnav button'); let qi = 0, qt;
function showQ(i) { qs[qi].classList.remove('on'); qb[qi].setAttribute('aria-pressed', 'false'); qi = i; qs[qi].classList.add('on'); qb[qi].setAttribute('aria-pressed', 'true'); }
qb.forEach((b, i) => b.addEventListener('click', () => { clearInterval(qt); showQ(i); }));
if (!reduce) qt = setInterval(() => showQ((qi + 1) % qs.length), 6000);
// ── Segmentado (píldora con muelle, Emil: bounce 0)
const seg = $('#seg'), pill = $('.pill', seg); let tipo = 'Boda';
function movePill(b, inst) { const r = b.getBoundingClientRect(), s = seg.getBoundingClientRect(); const v = { x: r.left - s.left, width: r.width }; inst || reduce ? Object.assign(pill.style, { transform: `translateX(${v.x}px)`, width: v.width + 'px' }) : animate(pill, v, { type: 'spring', bounce: 0, duration: 0.35 }); }
$$('button', seg).forEach(b => b.addEventListener('click', () => { $$('button', seg).forEach(x => x.setAttribute('aria-pressed', x === b)); tipo = b.textContent; movePill(b); }));
requestAnimationFrame(() => movePill($('button', seg), true)); addEventListener('resize', () => movePill($('[aria-pressed="true"]', seg), true));
$('#form').addEventListener('submit', e => {
  e.preventDefault(); const f = new FormData(e.target);
  open(wa(`Hola Lucía, soy ${f.get('n') || '—'}. Quiero consultar una sesión de ${tipo.toLowerCase()} para el ${f.get('f') || '(fecha por definir)'} en ${f.get('l') || '(lugar por definir)'}.`), '_blank', 'noopener');
  toast('Abriendo WhatsApp', { desc: `Consulta de ${tipo.toLowerCase()} preparada`, icon: '✓' });
});
// revelado con clip-path de la galería
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
$$('.ph, [data-rv]').forEach(el => io.observe(el));
