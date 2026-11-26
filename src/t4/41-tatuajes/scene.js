// Tinta en agua: shader a pantalla completa (Three.js) con FBM y "domain warping"; el puntero deja una estela
// de 10 puntos que empuja y siembra tinta. Pausa fuera de pantalla y a 30 fps en móvil.
import { WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Vector2 } from 'three';
const FS = `precision highp float; uniform float uT; uniform vec2 uR; uniform vec2 uM[10]; uniform float uIn;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6); for (int i = 0; i < 5; i++){ v += a * n(p); p = m * p; a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uR, p = (gl_FragCoord.xy - 0.5 * uR) / uR.y;
  float t = uT * 0.045, trail = 0.0; vec2 push = vec2(0.0);
  for (int i = 0; i < 10; i++){ vec2 d = p - uM[i]; float w = exp(-dot(d, d) * 18.0) * (1.0 - float(i) / 10.0); trail += w; push += d * w; }
  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p * 1.8 + 3.0 * q + vec2(1.7, 9.2) + t * 1.5 - push * 1.5), fbm(p * 1.8 + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.6 + 3.2 * r);
  float plume = smoothstep(0.2, -0.6, p.y + 0.15 * sin(p.x * 3.0 + t * 6.0));      // la tinta "cae" desde arriba a la derecha
  plume *= smoothstep(-0.9, 0.6, p.x);
  float ink = smoothstep(0.5, 0.78, f + plume * 0.32 + trail * 0.35 - 0.12) * uIn;
  vec3 paper = vec3(0.925, 0.898, 0.847), black = vec3(0.05, 0.045, 0.042), red = vec3(0.55, 0.11, 0.07);
  vec3 c = mix(paper, black, ink); c = mix(c, red, smoothstep(0.08, 0.0, abs(ink - 0.45)) * 0.35 * length(r - q));
  c *= 0.96 + 0.04 * h(gl_FragCoord.xy + uT);                                          // grano de papel
  gl_FragColor = vec4(c, 1.0); }`;
export function init(canvas) {
  const r = new WebGLRenderer({ canvas, antialias: false }); const mob = matchMedia('(max-width: 760px)').matches;
  r.setPixelRatio(mob ? 1 : Math.min(devicePixelRatio, 1.5));
  const pts = Array.from({ length: 10 }, () => new Vector2(5, 5));
  const U = { uT: { value: 0 }, uR: { value: new Vector2() }, uM: { value: pts }, uIn: { value: 0 } };
  const m = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({ vertexShader: 'void main(){ gl_Position = vec4(position, 1.0); }', fragmentShader: FS, uniforms: U }));
  const scene = new Scene(); scene.add(m); const cam = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  let w = 1, h = 1, vis = true, raf = 0, last = 0, t0 = performance.now(), mx = 5, my = 5;
  function size() { const b = canvas.getBoundingClientRect(); w = b.width; h = b.height; r.setSize(w, h, false); r.getDrawingBufferSize(U.uR.value); }
  addEventListener('pointermove', e => { const b = canvas.getBoundingClientRect(); mx = (e.clientX - b.left - w / 2) / h; my = -(e.clientY - b.top - h / 2) / h; }, { passive: true });
  function frame(now) {
    raf = vis ? requestAnimationFrame(frame) : 0; if (mob && now - last < 32) return; last = now;
    for (let i = pts.length - 1; i > 0; i--) pts[i].lerp(pts[i - 1], 0.5); pts[0].lerp(new Vector2(mx, my), 0.25);
    U.uT.value = (now - t0) / 1000; U.uIn.value = Math.min(1, U.uT.value / 1.6); r.render(scene, cam);
  }
  size(); addEventListener('resize', size);
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(frame); }).observe(canvas);
  raf = requestAnimationFrame(frame);
}
