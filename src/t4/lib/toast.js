// Toasts apilados estilo Sonner (código propio, sin React). Principios: transiciones CSS interrumpibles (no keyframes),
// pila con escala 0.05·índice y elevación 14px, se expanden al pasar el ratón, swipe con velocidad > 0.11 px/ms,
// temporizador en pausa si la pestaña está oculta o con hover. Estilos en toast.css (variables --t-bg, --t-fg, --t-bd).
let host, list = [], hovering = false, id = 0;
const GAP = 14, VISIBLE = 3, LIFE = 4000;
function ensure() {
  if (host) return host;
  host = document.createElement('ol');
  host.className = 'tz'; host.setAttribute('aria-live', 'polite'); host.setAttribute('aria-label', 'Notificaciones');
  host.addEventListener('pointerenter', () => { hovering = true; layout(); });
  host.addEventListener('pointerleave', () => { hovering = false; layout(); list.forEach(t => t.resume()); });
  document.addEventListener('visibilitychange', () => list.forEach(t => document.hidden ? t.pause() : t.resume()));
  document.body.appendChild(host);
  return host;
}
function layout() {
  let off = 0;
  list.forEach((t, i) => {               // i=0 es el más nuevo (delante)
    const el = t.el, h = el.offsetHeight;
    if (hovering) { el.style.setProperty('--y', `${-off}px`); el.style.setProperty('--s', 1); off += h + 10; }
    else { el.style.setProperty('--y', `${-i * GAP}px`); el.style.setProperty('--s', 1 - i * 0.05); }
    el.style.opacity = i >= VISIBLE && !hovering ? 0 : 1;
    el.style.zIndex = 100 - i;
    el.dataset.front = i === 0;
    if (!hovering && i > 0) el.style.height = list[0].el.offsetHeight + 'px'; else el.style.height = '';
  });
}
export function toast(title, opts = {}) {
  ensure();
  const el = document.createElement('li');
  el.className = 'tz-i'; el.dataset.mounted = 'false';
  el.innerHTML = `<span class="tz-ic" aria-hidden="true">${opts.icon || '✓'}</span><div><p class="tz-t"></p>${opts.desc ? '<p class="tz-d"></p>' : ''}</div>${opts.action ? '<button class="tz-a" type="button"></button>' : ''}`;
  el.querySelector('.tz-t').textContent = title;
  if (opts.desc) el.querySelector('.tz-d').textContent = opts.desc;
  if (opts.action) { const b = el.querySelector('.tz-a'); b.textContent = opts.action.label; b.onclick = () => { opts.action.onClick?.(); dismiss(); }; }
  host.prepend(el);
  let left = opts.duration || LIFE, start = 0, timer = 0;
  const t = {
    el, id: ++id,
    pause() { if (timer) { clearTimeout(timer); timer = 0; left -= performance.now() - start; } },
    resume() { if (!timer && !hovering && !document.hidden) { start = performance.now(); timer = setTimeout(dismiss, Math.max(left, 600)); } },
  };
  function dismiss() {
    if (!list.includes(t)) return;
    t.pause(); list = list.filter(x => x !== t);
    el.dataset.removed = 'true';
    el.style.opacity = 0;
    setTimeout(() => el.remove(), 400); layout();
  }
  // swipe hacia abajo para descartar: impulso, no umbral fijo
  let y0 = 0, t0 = 0, drag = false, dy = 0;
  el.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; drag = true; y0 = e.clientY; t0 = performance.now(); dy = 0; el.setPointerCapture(e.pointerId); el.dataset.swiping = 'true'; });
  el.addEventListener('pointermove', e => { if (!drag) return; dy = e.clientY - y0; const d = dy < 0 ? dy * 0.2 : dy; el.style.transform = `translateY(calc(var(--y) + ${d}px)) scale(var(--s))`; });
  const end = () => {
    if (!drag) return; drag = false; el.dataset.swiping = 'false';
    const v = Math.abs(dy) / (performance.now() - t0);
    el.style.transform = '';
    if (dy > 45 || (dy > 0 && v > 0.11)) { el.style.setProperty('--y', `${dy + 80}px`); dismiss(); }
  };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  el.addEventListener('pointerenter', () => list.forEach(x => x.pause()));
  list.unshift(t);
  requestAnimationFrame(() => { el.dataset.mounted = 'true'; layout(); });
  t.resume();
  return dismiss;
}
