// 07 — Zdog: taza de café pseudo-3D en Canvas 2D, granos orbitando y vapor animado.
import Zdog from 'zdog';
import { initCore, loop, col, stage } from '../../core/core.js';
initCore();
const el = stage(), c = document.createElement('canvas'); el.appendChild(c);
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const ink = css('--fg'), acc = css('--acc'), acc2 = css('--acc2'), cream = '#f7efe3';
const TAU = Zdog.TAU;
const illo = new Zdog.Illustration({ element: c, dragRotate: true, resize: true, rotate: { x: -0.35, y: 0.6 },
  onResize(w, h) { this.zoom = Math.min(w, h) / 380; } });
const cup = new Zdog.Anchor({ addTo: illo, translate: { y: 20 } });
// plato
new Zdog.Cylinder({ addTo: cup, diameter: 190, length: 8, stroke: false, color: cream, backface: '#e2d6c4', rotate: { x: TAU / 4 }, translate: { y: 62 } });
new Zdog.Ellipse({ addTo: cup, diameter: 120, stroke: 3, color: '#e2d6c4', rotate: { x: TAU / 4 }, translate: { y: 57 } });
// cuerpo de la taza (base estrecha + cuerpo)
new Zdog.Cylinder({ addTo: cup, diameter: 120, length: 104, stroke: false, color: acc, backface: acc, rotate: { x: TAU / 4 }, translate: { y: 4 } });
new Zdog.Ellipse({ addTo: cup, diameter: 120, stroke: 7, color: cream, rotate: { x: TAU / 4 }, translate: { y: -48 } });
new Zdog.Ellipse({ addTo: cup, diameter: 112, stroke: false, fill: true, color: '#3b2216', rotate: { x: TAU / 4 }, translate: { y: -42 } });
new Zdog.Ellipse({ addTo: cup, diameter: 52, stroke: 5, color: '#c58b5b', rotate: { x: TAU / 4 }, translate: { y: -42.5 } }); // crema / latte art
new Zdog.Shape({ addTo: cup, path: [{ x: -10, y: 0 }, { x: 0, y: 8 }, { x: 10, y: 0 }], stroke: 4, color: '#e9c9a4', rotate: { x: TAU / 4 }, translate: { y: -43 }, closed: false });
// asa
new Zdog.Shape({ addTo: cup, path: [{ x: 60, y: -30 }, { arc: [{ x: 98, y: -30 }, { x: 98, y: 4 }] }, { arc: [{ x: 98, y: 34 }, { x: 58, y: 30 }] }], closed: false, stroke: 13, color: acc });
// banda decorativa
new Zdog.Ellipse({ addTo: cup, diameter: 121, stroke: 4, color: ink, rotate: { x: TAU / 4 }, translate: { y: 18 } });
// vapor: 3 trazos en zig-zag que suben
const steam = [0, 1, 2].map((i) => new Zdog.Shape({ addTo: illo, path: [{ x: 0, y: 0 }, { bezier: [{ x: 14, y: -14 }, { x: -14, y: -28 }, { x: 0, y: -42 }] }, { bezier: [{ x: 14, y: -56 }, { x: -14, y: -70 }, { x: 0, y: -84 }] }],
  closed: false, stroke: 6, color: 'rgba(42,26,18,.4)', translate: { x: (i - 1) * 26, y: -40 } }));
// granos de café orbitando
const orbit = new Zdog.Anchor({ addTo: illo, translate: { y: 10 } });
const beans = [];
for (let i = 0; i < 9; i++) {
  const a = (i / 9) * TAU, r = 140 + (i % 3) * 14;
  const g = new Zdog.Group({ addTo: orbit, translate: { x: Math.cos(a) * r, z: Math.sin(a) * r, y: Math.sin(a * 3) * 30 }, rotate: { z: a, y: a } });
  new Zdog.Ellipse({ addTo: g, width: 22, height: 30, stroke: 6, fill: true, color: '#5a3320' });
  new Zdog.Shape({ addTo: g, path: [{ y: -11 }, { bezier: [{ x: 4, y: -4 }, { x: -4, y: 4 }, { y: 11 }] }], closed: false, stroke: 2.5, color: '#2a160c', translate: { z: 4 } });
  beans.push(g);
}
// aro decorativo
new Zdog.Ellipse({ addTo: illo, diameter: 330, stroke: 1.2, color: acc2, rotate: { x: TAU / 4 }, translate: { y: 90 } });
loop(el, (t) => {
  if (!illo.isDragRotating) illo.rotate.y += 0.004;
  orbit.rotate.y = -t * 0.35;
  beans.forEach((b, i) => { b.rotate.x = t * (0.6 + i * 0.07); });
  steam.forEach((s, i) => { const k = (t * 0.35 + i / 3) % 1; s.translate.y = -10 - k * 45; s.scale = 0.55 - k * 0.25; s.color = `rgba(42,26,18,${(0.45 * Math.sin(k * Math.PI)).toFixed(2)})`; });
  illo.updateRenderGraph();
});
