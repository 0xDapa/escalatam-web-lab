// Utilidades comunes de la Tanda 4 (sin dependencias).
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)', EASE_IO = 'cubic-bezier(0.77, 0, 0.175, 1)', EASE_DRAWER = 'cubic-bezier(0.32, 0.72, 0, 1)';
// Revela con IntersectionObserver añadiendo .in (la animación vive en CSS: barata y fuera del hilo principal).
export function reveal(sel = '[data-rv]', margin = '0px 0px -12% 0px') {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: margin });
  $$(sel).forEach(el => io.observe(el));
}
// Construye un enlace wa.me con texto (sin número: se pone el del cliente).
export const wa = text => 'https://wa.me/?text=' + encodeURIComponent(text);
// Ejecuta fn cuando el navegador esté libre (para cargar Three.js después del LCP).
export function idle(fn, timeout = 1800) {
  const go = () => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout }) : setTimeout(fn, 200));
  document.readyState === 'complete' ? go() : addEventListener('load', go, { once: true });
}
// Progreso 0..1 de un elemento alto con contenido sticky (para scroll-scrub tipo Apple).
export function progress(el) {
  const r = el.getBoundingClientRect(), total = r.height - innerHeight;
  return Math.min(1, Math.max(0, -r.top / (total || 1)));
}
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const range = (p, a, b) => clamp((p - a) / (b - a));   // remapea p del tramo [a,b] a 0..1
// Carga diferida por intención: primer scroll / puntero / tecla / toque, o un temporizador largo tras "load".
// Así Three.js (~140 KB gzip) nunca compite con el LCP ni bloquea el hilo mientras la página arranca;
// el póster (render del mismo modelo) cubre ese tiempo y el cambio es invisible.
export function onIntent(fn, timeout = 7000) {
  let done = false;
  const ev = ['scroll', 'pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
  const go = () => { if (done) return; done = true; ev.forEach(e => removeEventListener(e, go)); requestAnimationFrame(() => setTimeout(fn, 0)); };
  ev.forEach(e => addEventListener(e, go, { passive: true, once: true }));
  const arm = () => setTimeout(go, timeout);
  document.readyState === 'complete' ? arm() : addEventListener('load', arm, { once: true });
}
