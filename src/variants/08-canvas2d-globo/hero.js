// 08 — Canvas 2D puro: globo de puntos (Natural Earth, dominio público) con proyección ortográfica manual y rutas animadas.
import LAND from './land.data.json';
import { initCore, loop, drag, fit, stage, dpr } from '../../core/core.js';
initCore();
const el = stage(), c = document.createElement('canvas'); el.appendChild(c);
const ctx = c.getContext('2d', { alpha: true });
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const ink = css('--fg'), acc = css('--acc'), acc2 = css('--acc2');
const R = Math.PI / 180, toV = (lon, lat) => [Math.cos(lat * R) * Math.sin(lon * R), Math.sin(lat * R), Math.cos(lat * R) * Math.cos(lon * R)];
const pts = new Float32Array(LAND.length / 2 * 3);
for (let i = 0; i < LAND.length / 2; i++) pts.set(toV(LAND[i * 2] / 10, LAND[i * 2 + 1] / 10), i * 3);
const HOME = { n: 'SANTIAGO', p: toV(-70.67, -33.45) };
const DEST = [['MADRID', -3.7, 40.4], ['NUEVA YORK', -74, 40.7], ['TOKIO', 139.7, 35.7], ['CUSCO', -71.97, -13.5], ['USHUAIA', -68.3, -54.8], ['CIUDAD DEL CABO', 18.4, -33.9]].map(([n, lo, la]) => ({ n, p: toV(lo, la) }));
const slerp = (a, b, t) => { const d = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), s = Math.sin(d) || 1, k1 = Math.sin((1 - t) * d) / s, k2 = Math.sin(t * d) / s, h = 1 + Math.sin(t * Math.PI) * d * 0.18; return [(a[0] * k1 + b[0] * k2) * h, (a[1] * k1 + b[1] * k2) * h, (a[2] * k1 + b[2] * k2) * h]; };
const s = drag(c, 0.12); s.x = -1.15; let last = 0;
loop(el, (t) => {
  const dt = Math.min(0.05, t - last); last = t; s.step(dt);
  fit(c, 1.5); const W = c.width, H = c.height, r = Math.min(W, H) * 0.4, cx = W / 2, cy = H / 2, k = dpr(1.5);
  ctx.clearRect(0, 0, W, H);
  const cyr = Math.cos(s.x), syr = Math.sin(s.x), tilt = 0.35 + s.y, ct = Math.cos(tilt), st = Math.sin(tilt);
  const proj = (v) => { const x = v[0] * cyr - v[2] * syr, z1 = v[0] * syr + v[2] * cyr, y = v[1] * ct - z1 * st, z = v[1] * st + z1 * ct; return [cx + x * r, cy - y * r, z]; };
  // disco (el halo va en CSS para no repintarlo cada frame)
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.strokeStyle = 'rgba(17,20,24,.08)'; ctx.lineWidth = k; ctx.stroke();
  // puntos de tierra: solo cara frontal, agrupados en 4 cubos de profundidad → 4 fill() por frame en vez de miles
  ctx.fillStyle = ink;
  for (let b = 0; b < 4; b++) {
    const zl = 0.02 + b * 0.245, zh = zl + 0.245, sz = (1 + (zl + 0.12) * 1.3) * k;
    ctx.beginPath();
    for (let i = 0; i < pts.length; i += 3) {
      const x = pts[i] * cyr - pts[i + 2] * syr, z1 = pts[i] * syr + pts[i + 2] * cyr, z = pts[i + 1] * st + z1 * ct;
      if (z < zl || z >= zh) continue;
      const y = pts[i + 1] * ct - z1 * st; ctx.rect(cx + x * r - sz / 2, cy - y * r - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 0.3 + (zl + 0.12) * 0.75; ctx.fill();
  }
  ctx.globalAlpha = 1;
  // rutas animadas
  ctx.lineCap = 'round'; ctx.font = `${10.5 * k}px Mono, monospace`;
  DEST.forEach((d, j) => {
    const ph = (t * 0.22 + j / DEST.length) % 1, head = Math.min(1, ph * 1.6), tail = Math.max(0, ph * 1.6 - 0.6);
    ctx.beginPath(); let started = false;
    for (let i = 0; i <= 40; i++) { const u = tail + (head - tail) * (i / 40), q = proj(slerp(HOME.p, d.p, u)); if (q[2] < -0.05) { started = false; continue; } if (!started) { ctx.moveTo(q[0], q[1]); started = true; } else ctx.lineTo(q[0], q[1]); }
    ctx.strokeStyle = acc; ctx.lineWidth = 1.8 * k; ctx.stroke();
    const q = proj(d.p); if (q[2] > 0.05) { ctx.fillStyle = acc2; ctx.beginPath(); ctx.arc(q[0], q[1], 3.2 * k, 0, 7); ctx.fill(); ctx.fillStyle = ink; ctx.globalAlpha = Math.min(1, q[2] * 3); ctx.fillText(d.n, q[0] + 7 * k, q[1] - 6 * k); ctx.globalAlpha = 1; }
  });
  const h = proj(HOME.p); if (h[2] > 0) { const pr = 4 + 6 * ((t * 1.2) % 1); ctx.strokeStyle = acc; ctx.globalAlpha = 1 - ((t * 1.2) % 1); ctx.beginPath(); ctx.arc(h[0], h[1], pr * k, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; ctx.fillStyle = acc; ctx.beginPath(); ctx.arc(h[0], h[1], 4.2 * k, 0, 7); ctx.fill(); ctx.fillStyle = ink; ctx.fillText(HOME.n, h[0] + 8 * k, h[1] + 14 * k); }
});
