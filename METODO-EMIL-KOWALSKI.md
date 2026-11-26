# Método Emil Kowalski + Apple — cómo animamos la Tanda 4

Resumen propio de lo que aprendimos leyendo los artículos de [emilkowal.ski](https://emilkowal.ski/), su repositorio de skills
(licencia MIT), sus librerías [Sonner](https://sonner.emilkowal.ski/) y [Vaul](https://vaul.emilkowal.ski/), el curso
[animations.dev](https://animations.dev/) y midiendo páginas de producto de Apple (AirPods Pro, MacBook Pro, Apple Watch Ultra)
y de Linear. **Todo el código de abajo es nuestro** (está en `src/t4/lib/` y en cada `src/t4/<demo>/`); no copiamos código de terceros.

## 1. Las reglas (lo que cambia la sensación de calidad)

| Regla | Valor que usamos | Por qué |
|---|---|---|
| Duración de UI | 150–300 ms (toasts 400 ms, drawers 500 ms) | Por encima de 300 ms la interfaz se siente lenta |
| Curva de salida (entrar, responder) | `cubic-bezier(.23, 1, .32, 1)` | Arranca rápido = respuesta inmediata |
| Curva de movimiento en pantalla | `cubic-bezier(.77, 0, .175, 1)` | Para cosas que ya están visibles y se desplazan |
| Curva de drawer (iOS) | `cubic-bezier(.32, .72, 0, 1)` 500 ms | La que usan iOS, Vaul y Linear |
| Presionar | `scale(.97)` en 160 ms | Feedback táctil sin exagerar |
| Aparecer | desde `scale(.9–.97)` + opacidad, **nunca desde `scale(0)`** | Nada en el mundo real aparece de la nada |
| Popovers | `transform-origin` en el disparador | El elemento sale de donde se pulsó |
| Tooltips seguidos | el primero con retardo, los siguientes instantáneos | No hacer esperar dos veces |
| Crossfade | + `blur(2–3px)` | Enmascara el momento en que se ven dos estados |
| Muelles | `{ type: 'spring', bounce: 0, duration: .35–.45 }` | Rebote solo si viene de un gesto con inercia |
| Escalonado | 30–80 ms en producto, 100–150 ms en marketing | Ritmo sin hacer esperar |
| Interrumpible | transiciones CSS o Motion (no keyframes) para estados que cambian | Si el usuario cambia de idea, la animación lo sigue |
| Reduced motion | sustituir movimiento por fundido, no quitar todo | El estado debe seguir comunicándose |
| Apple | sticky de 500–560 vh, rótulos en ventanas de progreso, `saturate(180%) blur(20px)` en la nav, titulares 80–96 px con tracking −1.2/−1.44 px | Contar el producto con el scroll |

## 2. Snippets propios

### Presión y aparición (CSS)
```css
:root { --ease: cubic-bezier(.23, 1, .32, 1); }
.btn { transition: transform 160ms var(--ease); }
.btn:active { transform: scale(.97); }
.peek { opacity: 0; scale: .92; transition: opacity .2s var(--ease), scale .2s var(--ease); }
.peek.on { opacity: 1; scale: 1; }
```

### Píldora de segmentado con muelle (Motion) — 36, 38, 39, 40
```js
function movePill(btn) {
  const r = btn.getBoundingClientRect(), s = seg.getBoundingClientRect();
  animate(pill, { x: r.left - s.left - 4, width: r.width }, { type: 'spring', bounce: 0, duration: 0.35 });
}
```

### Crossfade con blur — 36 (rótulo de la galería), 40 (stepper)
```js
await animate(el, { opacity: 0, filter: 'blur(3px)', y: -6 }, { duration: .14, ease: [.23, 1, .32, 1] });
el.textContent = nuevo;
animate(el, { opacity: [0, 1], filter: ['blur(3px)', 'blur(0px)'], y: [6, 0] }, { duration: .24, ease: [.23, 1, .32, 1] });
```

### Inercia + rubber-band de iOS — 40 (carrusel de planes)
```js
const rubber = (o, d) => (1 - 1 / ((Math.abs(o) * 0.55) / d + 1)) * d * Math.sign(o);
// al soltar: distancia proyectada con la deceleración "normal" de iOS (0.998 por ms)
const proj = x + (v * 0.998) / (1 - 0.998);          // v en px/ms
snapTo(Math.round(-proj / step), v * 1000);           // el muelle arranca con la velocidad real
```

### Pasos que entran según la dirección + altura medida — 44 (reserva)
```js
const dir = n > cur ? 1 : -1, h0 = vp.offsetHeight;
await animate(a, { x: -32 * dir, opacity: 0, filter: 'blur(3px)' }, { duration: .16 });
a.hidden = true; b.hidden = false; vp.style.height = 'auto'; const h1 = vp.offsetHeight; vp.style.height = h0 + 'px';
animate(vp, { height: h1 }, { type: 'spring', bounce: 0, duration: .35 });
animate(b, { x: [32 * dir, 0], opacity: [0, 1], filter: ['blur(3px)', 'blur(0px)'] }, { duration: .24 });
```

### Toasts tipo Sonner (`src/t4/lib/toast.js`)
Pila con `scale(1 − 0.05·i)` y 14 px de elevación por toast, se expande al pasar el ratón, swipe para descartar si la velocidad
supera 0,11 px/ms, el temporizador se pausa con hover o con la pestaña oculta, y todo con transiciones CSS (interrumpibles).
```js
toast('Plan Híbrido elegido', { desc: 'Lo añadimos a tu reserva', action: { label: 'Deshacer', onClick: undo } });
```

### Drawer tipo Vaul (`src/t4/lib/drawer.js`)
Arrastre 1:1 con pointer capture, cierre por velocidad (> 0,4 px/ms) o distancia (> 25 %), resistencia al tirar hacia arriba,
el fondo `[data-drawer-bg]` se escala a 0,94, Esc cierra y el foco queda atrapado.

### Scroll-scrub estilo Apple — 37, 39, 43 (Three.js) y 44 (texto)
```js
export function progress(el) {                 // 0..1 dentro de una sección alta con hijo sticky
  const r = el.getBoundingClientRect(); return Math.min(1, Math.max(0, -r.top / (r.height - innerHeight || 1)));
}
export const range = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
// 44: cada palabra pasa de 16 % a 100 % de opacidad
words.forEach((w, i) => (w.style.opacity = .16 + .84 * range(p * 1.25, i / n, (i + 1.5) / n)));
```

### Three.js sin hundir Lighthouse — todas las demos 3D
```js
export function onIntent(fn, timeout = 7000) {    // primer scroll/puntero/tecla/toque o 7 s tras load
  let done = false; const ev = ['scroll', 'pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
  const go = () => { if (done) return; done = true; ev.forEach(e => removeEventListener(e, go)); requestAnimationFrame(() => setTimeout(fn, 0)); };
  ev.forEach(e => addEventListener(e, go, { passive: true, once: true }));
  addEventListener('load', () => setTimeout(go, timeout), { once: true });
}
onIntent(async () => (await import('./scene.js')).init(canvas));   // esbuild lo separa en un chunk
```
El LCP es un **póster renderizado del mismo modelo** (`tools/render4.py <id> WxH nombre` abre `#render=nombre` y guarda WebP);
el canvas aparece encima con un fundido. En la demo 43 esto pasó el rendimiento móvil de 47 a 99.

## 3. Qué demo enseña qué

| Demo | Principio principal |
|---|---|
| 35 Flora Viva | Un solo contexto WebGL que se muda de sección; cesta en drawer; toasts con Deshacer |
| 36 Lucía Ferrer | Movimiento ligado a la velocidad (doblez/RGB); FLIP origin-aware en el lightbox |
| 37 Estudio Vértice | Scroll-scrub de cámara y luz; preview que sigue al cursor |
| 38 Aura | Catálogo completo de micro-interacciones de Emil en una sola página |
| 39 Obsidiana | Scroll-scrub como demostración del servicio (antes/después con planos de recorte) |
| 40 Kai Torres | Gestos: inercia, rubber-band, muelles interrumpibles |
| 41 Tinta Negra | Shader como identidad de marca, con presupuesto de rendimiento (30 fps / DPR 1 en móvil) |
| 42 NOVA | Visual reactivo a audio real (WebAudio) con fallback simulado |
| 43 Cumbre T1 | Página de producto Apple completa |
| 44 Elena Ríos | Movimiento calmado: ritmo con ease-in-out, sin muelles; flujo en pasos |

## 4. Checklist antes de entregar
- [ ] Ninguna animación de UI > 300 ms (salvo drawer/toast/scroll-scrub)
- [ ] Nada aparece desde `scale(0)`; los popovers salen de su disparador
- [ ] Todo lo que puede cambiar de estado a mitad es interrumpible
- [ ] `prefers-reduced-motion`: fundidos, scroll-scrub convertido en contenido estático
- [ ] Three.js cargado por intención + póster LCP; pausa con IntersectionObserver fuera de pantalla
- [ ] Lighthouse móvil ≥ 90, sin errores de consola, sin scroll horizontal a 390 px
