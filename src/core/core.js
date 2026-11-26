// Escalatam Web Lab — núcleo vanilla (~2 KB gz): reveals, count-up, horizonte, servicios fijados, loop de render.
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const dpr = (max = 1.75) => Math.min(devicePixelRatio || 1, max);
window.__frames = 0;

// Loop de render: solo corre cuando el hero es visible y la pestaña está activa.
export function loop(el, draw) {
  let on = true, vis = true, raf = 0, t0 = performance.now();
  const tick = (t) => { raf = 0; if (!on || !vis) return; window.__frames++; draw((t - t0) / 1000); raf = requestAnimationFrame(tick); };
  const go = () => { if (!raf && on && vis && !reduced) raf = requestAnimationFrame(tick); };
  new IntersectionObserver(([e]) => { on = e.isIntersecting; go(); }).observe(el);
  document.addEventListener('visibilitychange', () => { vis = !document.hidden; go(); });
  if (reduced) requestAnimationFrame(() => draw(1.5)); else go();
  return { kick: go };
}

// Arrastre con inercia (mouse/touch). Devuelve estado {x, y} en radianes.
export function drag(el, auto = 0.15) {
  const s = { x: 0, y: 0, vx: auto, vy: 0, auto, down: false };
  let px = 0, py = 0;
  el.addEventListener('pointerdown', (e) => { s.down = true; px = e.clientX; py = e.clientY; el.setPointerCapture(e.pointerId); });
  el.addEventListener('pointermove', (e) => { if (!s.down) return; s.vx = (e.clientX - px) * 0.3; s.vy = (e.clientY - py) * 0.3; px = e.clientX; py = e.clientY; });
  const up = () => (s.down = false);
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  s.step = (dt) => {
    s.x += s.vx * dt * (s.down ? 3 : 1); s.y = clamp(s.y + s.vy * dt * (s.down ? 3 : 1), -0.9, 0.9);
    if (!s.down) { s.vx += (s.auto - s.vx) * Math.min(1, dt * 2); s.vy *= Math.max(0, 1 - dt * 4); }
    return s;
  };
  return s;
}

// Redimensiona un canvas al tamaño CSS × DPR. Devuelve true si cambió.
export function fit(c, max) {
  const r = dpr(max), w = Math.round(c.clientWidth * r), h = Math.round(c.clientHeight * r);
  if (c.width !== w || c.height !== h) { c.width = w; c.height = h; return true; }
  return false;
}

const fmt = (v, dec) => v.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });
export function countTo(el, dur = 1600) {
  const to = +el.dataset.to, dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', suf = el.dataset.suf || '';
  if (reduced) { el.textContent = pre + fmt(to, dec) + suf; return; }
  const t0 = performance.now();
  const f = (t) => { const k = clamp((t - t0) / dur), e = 1 - Math.pow(2, -10 * k); el.textContent = pre + fmt(to * (k >= 1 ? 1 : e), dec) + suf; if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}

export function initCore(opt = {}) {
  const de = document.documentElement;
  // 1) Reveals (glitch en titulares .rv, fade-up en .fu) con IntersectionObserver.
  if (!opt.noReveal) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 });
    document.querySelectorAll('.rv,.fu').forEach((el) => io.observe(el));
  }
  // 2) Count-up de cifras.
  if (!opt.noCount) {
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); countTo(e.target.querySelector('.n')); io2.unobserve(e.target); } }), { threshold: 0.6 });
    document.querySelectorAll('.nums li').forEach((el) => io2.observe(el));
  }
  // 3) Scroll: horizonte (--p) + servicios horizontales fijados.
  const hz = document.querySelector('.hz'), svc = document.querySelector('.svc');
  const strip = svc && svc.querySelector('.strip'), giant = svc && svc.querySelector('.giant'), cards = svc ? [...svc.querySelectorAll('.card')] : [];
  let dist = 0;
  const size = () => { if (!svc) return; dist = Math.max(0, strip.scrollWidth - innerWidth + 40); svc.style.height = (innerHeight + dist) + 'px'; };
  let ticking = false;
  const upd = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    if (hz && !opt.noHorizon) { const r = hz.getBoundingClientRect(); hz.style.setProperty('--p', clamp(-r.top / (r.height - vh)).toFixed(4)); }
    if (svc) {
      const r = svc.getBoundingClientRect(), p = clamp(-r.top / Math.max(1, r.height - vh));
      strip.style.transform = `translate3d(${-p * dist}px,-50%,0)`;
      if (giant) giant.style.transform = `translate3d(${-p * 35}%,0,0)`;
      svc.style.setProperty('--sp', p.toFixed(4));
      const cx = innerWidth * 0.85;
      cards.forEach((c) => c.classList.toggle('on', c.getBoundingClientRect().left < cx));
    }
    opt.onScroll && opt.onScroll(y, vh);
  };
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { size(); req(); });
  size(); upd();
  if (document.fonts) document.fonts.ready.then(() => { size(); upd(); });
  requestAnimationFrame(() => document.querySelectorAll('.hero .rv').forEach((el) => el.classList.add('in')));
  return { update: req, size };
}

// Lee un color CSS (--acc, --bg…) como [r,g,b] 0..1 para shaders.
export function col(name) {
  const h = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}
export const stage = () => document.getElementById('stage');
