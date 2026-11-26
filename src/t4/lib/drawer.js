// Drawer inferior estilo Vaul (código propio). Curva iOS cubic-bezier(.32,.72,0,1) 500ms, arrastre 1:1 con
// pointer capture, descarte por velocidad (>0.4 px/ms) o distancia (>25% de la altura), resistencia al arrastrar
// hacia arriba (rubber-band), fondo que se escala hacia atrás (opcional: [data-drawer-bg]). Esc cierra; foco atrapado.
export function drawer(panel, { onClose } = {}) {
  const root = panel.closest('.dw'), ov = root.querySelector('.dw-ov'), bg = document.querySelector('[data-drawer-bg]');
  let open = false, y0 = 0, t0 = 0, dy = 0, drag = false, last = null;
  const h = () => panel.offsetHeight;
  function setBg(p) { // p: 1 abierto → 0 cerrado
    if (!bg) return;
    bg.style.transform = `scale(${1 - 0.06 * p}) translateY(${p * 14}px)`; bg.style.borderRadius = `${p * 14}px`;
  }
  function show(trigger) {
    last = trigger || document.activeElement; open = true; root.hidden = false;
    root.offsetHeight; root.dataset.open = 'true'; panel.style.transform = ''; ov.style.opacity = ''; setBg(1);
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => (panel.querySelector('[autofocus],input,select,button') || panel).focus({ preventScroll: true }), 60);
  }
  function hide() {
    if (!open) return; open = false; root.dataset.open = 'false'; panel.style.transform = ''; ov.style.opacity = ''; setBg(0);
    document.documentElement.style.overflow = '';
    setTimeout(() => { if (!open) root.hidden = true; }, 500); last?.focus?.({ preventScroll: true }); onClose?.();
  }
  ov.addEventListener('click', hide);
  root.querySelectorAll('[data-dw-close]').forEach(b => b.addEventListener('click', hide));
  root.addEventListener('keydown', e => {
    if (e.key === 'Escape') hide();
    if (e.key === 'Tab') { const f = [...panel.querySelectorAll('a,button,input,select,textarea')].filter(x => !x.disabled); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); } else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); } }
  });
  const grip = panel.querySelector('.dw-grip') || panel;
  grip.addEventListener('pointerdown', e => {
    if (e.target.closest('input,select,textarea,button,a,label')) return;
    if (panel.scrollTop > 0) return;
    drag = true; y0 = e.clientY; t0 = performance.now(); dy = 0; grip.setPointerCapture(e.pointerId); root.dataset.dragging = 'true';
  });
  grip.addEventListener('pointermove', e => {
    if (!drag) return; dy = e.clientY - y0;
    const d = dy < 0 ? -8 * Math.log1p(-dy / 8) : dy;   // resistencia logarítmica hacia arriba
    panel.style.transform = `translate3d(0,${d}px,0)`;
    const p = 1 - Math.max(0, d) / h(); ov.style.opacity = p; setBg(p);
  });
  const end = () => {
    if (!drag) return; drag = false; root.dataset.dragging = 'false';
    const v = dy / (performance.now() - t0);
    if (dy > h() * 0.25 || v > 0.4) hide(); else { panel.style.transform = ''; ov.style.opacity = ''; setBg(1); }
  };
  grip.addEventListener('pointerup', end); grip.addEventListener('pointercancel', end);
  return { show, hide, get open() { return open; } };
}
