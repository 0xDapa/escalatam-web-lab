// 09 — Solo CSS 3D: el carrusel es DOM + transform-style: preserve-3d. Este JS solo gestiona arrastre/inercia (~1 KB).
import { initCore, loop, stage } from '../../core/core.js';
initCore();
const el = stage(), ring = document.getElementById('ring');
let ry = 0, v = 12, down = false, px = 0;
ring.addEventListener('pointerdown', (e) => { down = true; px = e.clientX; ring.setPointerCapture(e.pointerId); ring.style.cursor = 'grabbing'; });
ring.addEventListener('pointermove', (e) => { if (!down) return; const d = e.clientX - px; px = e.clientX; ry += d * 0.35; v = d * 18; });
const up = () => { down = false; ring.style.cursor = ''; };
ring.addEventListener('pointerup', up); ring.addEventListener('pointercancel', up);
let last = 0;
loop(el, (t) => { const dt = Math.min(0.05, t - last); last = t; if (!down) { v += (12 - v) * Math.min(1, dt * 1.5); ry += v * dt; } ring.style.setProperty('--ry', ry.toFixed(2) + 'deg'); });
