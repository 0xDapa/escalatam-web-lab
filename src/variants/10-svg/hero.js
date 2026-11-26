// 10 — SVG + JS vanilla: globo de meridianos/paralelos proyectado a mano y saludos orbitando.
import { initCore, loop, drag, stage } from '../../core/core.js';
initCore();
const el = stage(), NS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'full'); svg.setAttribute('viewBox', '-200 -200 400 400'); el.appendChild(svg);
const mk = (tag, attrs, parent = svg) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); parent.appendChild(n); return n; };
mk('defs', {}).innerHTML = '<radialGradient id="gl" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#efeaff"/><stop offset="1" stop-color="#d9d1ff"/></radialGradient><radialGradient id="halo"><stop offset=".6" stop-color="#5b4bff" stop-opacity=".18"/><stop offset="1" stop-color="#5b4bff" stop-opacity="0"/></radialGradient>';
mk('circle', { r: 175, fill: 'url(#halo)' });
const orbBack = mk('g', {});
const back = mk('path', { fill: 'none', stroke: '#5b4bff', 'stroke-opacity': '.18', 'stroke-width': '1', 'stroke-dasharray': '2 4' });
mk('circle', { r: 120, fill: 'url(#gl)', stroke: '#17132e', 'stroke-opacity': '.15' });
const front = mk('path', { fill: 'none', stroke: '#17132e', 'stroke-width': '1.1', 'stroke-opacity': '.75', 'stroke-linecap': 'round' });
const eq = mk('path', { fill: 'none', stroke: '#ff4fa3', 'stroke-width': '2', 'stroke-linecap': 'round' });
const orbFront = mk('g', {});
const lines = [];
for (let m = 0; m < 12; m++) { const lo = (m / 12) * Math.PI; lines.push(Array.from({ length: 61 }, (_, i) => { const la = (i / 60) * Math.PI * 2; return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)]; })); }
for (let p = -3; p <= 3; p++) { if (!p) continue; const la = p * 0.4; lines.push(Array.from({ length: 61 }, (_, i) => { const lo = (i / 60) * Math.PI * 2; return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)]; })); }
const equator = Array.from({ length: 61 }, (_, i) => { const lo = (i / 60) * Math.PI * 2; return [Math.sin(lo), 0, Math.cos(lo)]; });
const words = ['HOLA', 'HELLO', 'BONJOUR', 'HALLO', 'CIAO', 'OLÁ', 'こんにちは', 'MERHABA'];
const labels = words.map((w, i) => { const g = mk('g', {}); const t = mk('text', { 'text-anchor': 'middle', 'font-family': 'Display, sans-serif', fill: i % 2 ? '#5b4bff' : '#17132e' }, g); t.textContent = w; mk('circle', { r: 3, cy: 6, fill: '#ff4fa3' }, g); return { g, t, a: (i / words.length) * Math.PI * 2 }; });
const s = drag(svg, 0.3); let last = 0;
loop(el, (t) => {
  const dt = Math.min(0.05, t - last); last = t; s.step(dt);
  const cy = Math.cos(s.x), sy = Math.sin(s.x), tl = 0.38 + s.y, ct = Math.cos(tl), st = Math.sin(tl), R = 120;
  const P = (v) => { const x = v[0] * cy - v[2] * sy, z1 = v[0] * sy + v[2] * cy; return [x * R, -(v[1] * ct - z1 * st) * R, v[1] * st + z1 * ct]; };
  const path = (pts, wantFront) => { let d = '', pen = false; for (const v of pts) { const q = P(v); if ((q[2] >= 0) === wantFront) { d += (pen ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); pen = true; } else pen = false; } return d; };
  let f = '', b = '';
  for (const l of lines) { f += path(l, true); b += path(l, false); }
  front.setAttribute('d', f); back.setAttribute('d', b); eq.setAttribute('d', path(equator, true));
  labels.forEach((L) => {
    const a = L.a + t * 0.25, x = Math.cos(a) * 168, z = Math.sin(a) * 168, y = Math.sin(a * 2 + 1) * 30 - z * 0.28;
    const sc = 0.75 + (z / 168) * 0.3; L.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${sc.toFixed(3)})`);
    L.t.setAttribute('font-size', '22'); L.g.setAttribute('opacity', (0.35 + 0.65 * (z / 168 + 1) / 2).toFixed(2));
    const target = z > 0 ? orbFront : orbBack; if (L.g.parentNode !== target) target.appendChild(L.g);
  });
});
