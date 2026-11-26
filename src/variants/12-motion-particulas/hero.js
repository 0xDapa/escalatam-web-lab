// 12 — Motion (animate mini + scroll + inView) + partículas Canvas 2D vanilla que "respiran" alrededor de un anillo.
import { animate } from 'motion/mini';
import { scroll, inView } from 'motion';
import { initCore, loop, fit, stage, dpr, reduced } from '../../core/core.js';
// El núcleo solo gestiona contadores y servicios; reveals y horizonte los hace Motion.
initCore({ noReveal: true, noHorizon: true });
const hz = document.querySelector('.hz');
scroll((p) => hz.style.setProperty('--p', p.toFixed(4)), { target: hz, offset: ['start start', 'end end'] });
inView('.rv,.fu', (elm) => { elm.classList.add('in'); }, { amount: 0.2 });
document.querySelectorAll('.hero .rv').forEach((e) => e.classList.add('in'));
inView('.card', (card) => { if (!reduced) animate(card, { transform: ['translateY(30px)', 'none'] }, { duration: 0.8, easing: [0.2, 0.7, 0.2, 1] }); }, { amount: 0.3 });
inView('.art', (a) => { if (!reduced) animate(a, { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }, { duration: 1.2, easing: [0.7, 0, 0.2, 1] }); });
// --- partículas ---
const el = stage(), c = document.createElement('canvas'); el.appendChild(c);
const ctx = c.getContext('2d');
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const cols = [css('--acc'), css('--fg'), css('--acc2')];
const N = innerWidth < 760 ? 900 : 1400, P = new Float32Array(N * 4);
// Resolución interna reducida (0.8×): las partículas son orgánicas, el reescalado no se nota y ahorra ~40 % de píxeles.
const RS = Math.min(devicePixelRatio || 1, 2) * 0.8 > 1.2 ? 1.2 : 0.8;
let W = 0, H = 0, mx = -1e4, my = -1e4;
const seed = () => { for (let i = 0; i < N; i++) { const a = Math.random() * 6.283, r = Math.random() * 0.5 * Math.min(W, H); P.set([W / 2 + Math.cos(a) * r, H / 2 + Math.sin(a) * r, 0, 0], i * 4); } };
c.addEventListener('pointermove', (e) => { const r = c.getBoundingClientRect(), k = c.width / r.width; mx = (e.clientX - r.left) * k; my = (e.clientY - r.top) * k; });
c.addEventListener('pointerleave', () => { mx = my = -1e4; });
const flow = (x, y, t) => Math.sin(x * 0.004 + t * 0.3) * 2.2 + Math.cos(y * 0.005 - t * 0.2) * 2.2 + Math.sin((x + y) * 0.002 + t * 0.1);
let last = 0;
loop(el, (t) => {
  const dt = Math.min(0.05, t - last); last = t;
  const tw = Math.round(c.clientWidth * RS), th = Math.round(c.clientHeight * RS);
  if (tw !== c.width || th !== c.height || !W) { c.width = W = tw; c.height = H = th; seed(); }
  // estela: borra suavemente (destination-out) en lugar de pintar fondo
  ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,.09)'; ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'source-over';
  const cx = W / 2, cy = H / 2, base = Math.min(W, H) * 0.3, ring = base * (1 + 0.14 * Math.sin(t * 1.57)); // ciclo de 4 s: inhala / exhala
  const k = RS, sp = 60 * dt * k;
  for (let j = 0; j < 3; j++) {
    ctx.strokeStyle = cols[j]; ctx.globalAlpha = j === 1 ? 0.35 : 0.8; ctx.lineWidth = (j === 1 ? 0.8 : 1.3) * k; ctx.beginPath();
    for (let i = j; i < N; i += 3) {
      const o = i * 4; let x = P[o], y = P[o + 1];
      const a = flow(x, y, t), dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1;
      let vx = Math.cos(a) * 0.6 + (-dy / d) * 1.2, vy = Math.sin(a) * 0.6 + (dx / d) * 1.2; // giro alrededor del centro
      const pull = (ring - d) / base; vx += (dx / d) * pull * 2.2; vy += (dy / d) * pull * 2.2;
      const mdx = x - mx, mdy = y - my, md = mdx * mdx + mdy * mdy; if (md < 14000 * k * k) { const f = 900 * k / (md + 400); vx += mdx * f * 0.02; vy += mdy * f * 0.02; }
      P[o + 2] = P[o + 2] * 0.9 + vx * 0.1; P[o + 3] = P[o + 3] * 0.9 + vy * 0.1;
      const nx = x + P[o + 2] * sp, ny = y + P[o + 3] * sp;
      ctx.moveTo(x, y); ctx.lineTo(nx, ny); P[o] = nx; P[o + 1] = ny;
      if (nx < -20 || ny < -20 || nx > W + 20 || ny > H + 20) { const r = Math.random() * 6.283; P[o] = cx + Math.cos(r) * ring; P[o + 1] = cy + Math.sin(r) * ring; }
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
});
