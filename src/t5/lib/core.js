// Tanda 5 — núcleo común: GSAP (licencia estándar gratuita, todos los plugins) + ScrollTrigger + SplitText + Lenis,
// idioma ES/EN por atributos data-en, enlaces de WhatsApp con mensaje por servicio. Código propio de Escalatam.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger, SplitText);
export { gsap, ScrollTrigger, SplitText };
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const fmt = (n, cur = 'USD', lang = getLang()) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : cur === 'EUR' ? 'es-ES' : 'es-MX', { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(n);

// ---------- Scroll suave (Lenis en el ticker de GSAP, como Crav/Odyssée) ----------
export let lenis = null;
export function smooth(opts = {}) {
  if (reduce) return null;
  lenis = new Lenis({ duration: 1.05, easing: t => 1 - Math.pow(1 - t, 4), ...opts });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return; const t = $(id); if (!t) return;
    e.preventDefault(); lenis.scrollTo(t, { offset: -10 }); history.replaceState(null, '', id);
  }));
  return lenis;
}

// ---------- Idioma ES/EN ----------
// El español vive en el HTML; el inglés en data-en (innerHTML), data-en-aria, data-en-ph, data-en-alt.
const SPLITS = new Set();
export const getLang = () => document.documentElement.lang.startsWith('en') ? 'en' : 'es';
export function track(split) { SPLITS.add(split); return split; }
export function setLang(lang, save = true) {
  const en = lang === 'en';
  SPLITS.forEach(s => { try { s.revert(); } catch {} }); SPLITS.clear();
  $$('[data-en]').forEach(el => { if (el.dataset.es == null) el.dataset.es = el.innerHTML; el.innerHTML = en ? el.dataset.en : el.dataset.es; });
  for (const [k, attr] of [['enAria', 'aria-label'], ['enPh', 'placeholder'], ['enAlt', 'alt'], ['enContent', 'content']])
    $$(`[data-${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}]`).forEach(el => {
      const ek = 'es' + k.slice(2); if (el.dataset[ek] == null) el.dataset[ek] = el.getAttribute(attr) || '';
      el.setAttribute(attr, en ? el.dataset[k] : el.dataset[ek]);
    });
  const t = $('title'); if (t?.dataset.en) { if (t.dataset.es == null) t.dataset.es = t.textContent; t.textContent = en ? t.dataset.en : t.dataset.es; }
  document.documentElement.lang = en ? 'en' : 'es';
  $$('[data-lang-btn]').forEach(b => { b.setAttribute('aria-pressed', String(b.dataset.langBtn === lang)); });
  if (save) try { localStorage.setItem('esc-lang', lang); } catch {}
  refreshWa();
  dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  ScrollTrigger.refresh();
}
export function initLang() {
  $$('[data-lang-btn]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.langBtn)));
  let l = new URLSearchParams(location.search).get('lang');
  try { l = l || localStorage.getItem('esc-lang'); } catch {}
  if (l === 'en') setLang('en', false); else refreshWa();
}

// ---------- WhatsApp ----------
// <meta name="wa" content="5215550000000"> (vacío en la demo: WhatsApp pide el contacto). Cada botón: data-wa="Mensaje ES" data-wa-en="Message EN".
const WA = () => document.querySelector('meta[name="wa"]')?.content || '';
export const waLink = msg => `https://wa.me/${WA()}?text=${encodeURIComponent(msg)}`;
export function refreshWa() {
  const en = getLang() === 'en';
  $$('[data-wa]').forEach(a => { a.href = waLink(en && a.dataset.waEn ? a.dataset.waEn : a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
}
document.addEventListener('click', e => { const a = e.target.closest?.('[data-wa]'); if (a) window.gtag?.('event', 'wa_click', { label: (a.dataset.wa || '').slice(0, 40) }); });

// ---------- Utilidades ----------
export function onIntent(fn, timeout = 7000) {
  let done = false; const ev = ['scroll', 'pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
  const go = () => { if (done) return; done = true; ev.forEach(e => removeEventListener(e, go)); requestAnimationFrame(() => setTimeout(fn, 0)); };
  ev.forEach(e => addEventListener(e, go, { passive: true, once: true }));
  const arm = () => setTimeout(go, timeout); document.readyState === 'complete' ? arm() : addEventListener('load', arm, { once: true });
}
// Titular partido en líneas con máscara (SplitText 3.13+, mask:'lines'), entra desde abajo.
export function lines(el, o = {}) {
  if (!el) return; if (reduce) { el.style.visibility = 'visible'; return; }
  const s = track(SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ln' }));
  gsap.set(el, { visibility: 'visible' });
  return gsap.from(s.lines, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.09, ...o });
}
// Revela al entrar en pantalla (sube 28px + opacidad). Elementos con .rv empiezan ocultos solo si hay JS (clase .js en <html>).
export function reveals(sel = '.rv') {
  $$(sel).filter(el => !el.hasAttribute('data-split')).forEach(el => {
    if (reduce) { gsap.set(el, { autoAlpha: 1 }); return; }
    gsap.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  // Titulares [data-split]: se parten ya y las líneas esperan dentro de su máscara (siguen en el árbol de accesibilidad)
  $$('[data-split]').filter(el => !el.dataset.splitDone).forEach(el => {
    el.dataset.splitDone = '1';
    if (reduce) { el.style.visibility = 'visible'; return; }
    const s = track(SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ln' }));
    gsap.set(s.lines, { yPercent: 110 }); gsap.set(el, { visibility: 'visible' });
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => gsap.to(s.lines, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09 }) });
  });
}
// Botones: presión .97 (Emil) — en CSS: .btn:active{transform:scale(.97)}
export function toast(msg) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2600);
}
// Cabecera fija: añade .solid al bajar (fondo opaco para no pisar el contenido) y menú móvil accesible.
export function header(sel = 'header.top', at = 40) {
  const h = $(sel); if (!h) return;
  const up = () => h.classList.toggle('solid', scrollY > at); up(); addEventListener('scroll', up, { passive: true });
  const b = $('[data-menu]', h), nav = b && $('#' + b.getAttribute('aria-controls'));
  if (!b || !nav) return;
  const set = o => { b.setAttribute('aria-expanded', String(o)); h.classList.toggle('open', o); };
  b.addEventListener('click', () => set(b.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach(a => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
}
