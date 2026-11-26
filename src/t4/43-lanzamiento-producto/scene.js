// Escena Three.js: botella térmica modelada por torno (LatheGeometry), iluminación por entorno PMREM (RoomEnvironment),
// material físico metálico "titanio cepillado". La vista explotada se controla con setProgress(p) desde el scroll.
import { WebGLRenderer, Scene, PerspectiveCamera, LatheGeometry, Vector2, MeshPhysicalMaterial, Mesh, Group, PMREMGenerator,
  Color, ACESFilmicToneMapping, SRGBColorSpace, CylinderGeometry, TorusGeometry, MathUtils } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const FINISHES = {
  natural: { color: '#b9b3a9', rough: 0.32 },
  basalto: { color: '#2b2c2f', rough: 0.42 },
  arena:   { color: '#d8c3a5', rough: 0.36 },
  paramo:  { color: '#5f6f5a', rough: 0.38 },
};
// Fotogramas clave de la cámara: [p, distancia, x de la botella, y de la botella] (interpolados con smoothstep)
const KF = [[0, 10, 0, -2.6], [0.1, 10, 0, -2.6], [0.28, 6.6, 1.0, -1.1], [0.42, 9.2, 0, -1.2], [0.6, 9.2, 0, -1.2], [0.7, 4.6, 0, -2.0], [0.8, 4.6, 0, -2.0], [0.9, 8.6, 0, -2.1], [1, 8.6, 0, -2.1]];
function kf(p) { for (let i = 1; i < KF.length; i++) if (p <= KF[i][0]) { const A = KF[i - 1], B = KF[i], u = (p - A[0]) / (B[0] - A[0] || 1), e = u * u * (3 - 2 * u); return [A[1] + (B[1] - A[1]) * e, A[2] + (B[2] - A[2]) * e, A[3] + (B[3] - A[3]) * e]; } return KF.at(-1).slice(1); }
const sm = (a, b, x) => { const t = MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// Perfil del cuerpo: radio x, altura y (unidades ≈ dm). Hombro suave y base con chaflán.
function bodyProfile(r = 0.36, h = 2.1, inset = 0) {
  const p = [], R = r - inset;
  p.push(new Vector2(0, 0.02 + inset));
  for (let i = 0; i <= 6; i++) { const a = (i / 6) * Math.PI / 2; p.push(new Vector2(R - 0.05 + Math.sin(a) * 0.05, 0.05 - Math.cos(a) * 0.05 + 0.02 + inset)); }
  p.push(new Vector2(R, h * 0.78));
  for (let i = 1; i <= 14; i++) { const t = i / 14; p.push(new Vector2(R - (R - R * 0.74) * (1 - Math.cos(t * Math.PI / 2)), h * 0.78 + t * h * 0.13)); }
  p.push(new Vector2(R * 0.74, h - inset * 2)); p.push(new Vector2(R * 0.70, h - inset * 2));
  return p;
}
function capProfile(r = 0.27, h = 0.42) {
  const p = [new Vector2(0.001, h)];
  for (let i = 0; i <= 8; i++) { const a = (i / 8) * Math.PI / 2; p.push(new Vector2(r - 0.06 + Math.sin(a) * 0.06, h - 0.06 + Math.cos(a) * 0.06)); }
  p.push(new Vector2(r, 0.03)); p.push(new Vector2(r - 0.02, 0)); p.push(new Vector2(r * 0.8, 0));
  return p;
}
export function init(canvas, { finish = 'natural', transparent = false } = {}) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: transparent });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05; renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene();
  const pm = new PMREMGenerator(renderer); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; pm.dispose();
  const cam = new PerspectiveCamera(30, 1, 0.1, 50);
  const F = FINISHES[finish] || FINISHES.natural;
  const metal = new MeshPhysicalMaterial({ color: new Color(F.color), metalness: 1, roughness: F.rough, clearcoat: 0.35, clearcoatRoughness: 0.25 });
  const ceramic = new MeshPhysicalMaterial({ color: '#f2efe9', metalness: 0, roughness: 0.55, sheen: 0.3 });
  const vac = new MeshPhysicalMaterial({ color: '#8fb8ff', emissive: '#16305e', metalness: 0.1, roughness: 0.15, transparent: true, opacity: 0.0, depthWrite: false });
  const ring = new MeshPhysicalMaterial({ color: '#141414', metalness: 0.1, roughness: 0.6 });
  const g = new Group(); scene.add(g);
  const shell = new Mesh(new LatheGeometry(bodyProfile(), 96), metal); g.add(shell);
  const inner = new Mesh(new LatheGeometry(bodyProfile(0.36, 2.1, 0.05), 72), ceramic); g.add(inner); inner.visible = false;
  const vacuum = new Mesh(new LatheGeometry(bodyProfile(0.36, 2.1, 0.025), 72), vac); g.add(vacuum); vacuum.visible = false;
  const cap = new Group(); g.add(cap);
  const capM = new Mesh(new LatheGeometry(capProfile(), 72), metal); cap.add(capM);
  const seal = new Mesh(new TorusGeometry(0.235, 0.018, 12, 64), ring); seal.rotation.x = Math.PI / 2; seal.position.y = 0.01; cap.add(seal);
  const loop = new Mesh(new TorusGeometry(0.12, 0.028, 16, 48), metal); loop.position.y = 0.5; cap.add(loop);
  const thread = new Mesh(new CylinderGeometry(0.25, 0.25, 0.12, 48, 1, true), ring); thread.position.y = 2.02; g.add(thread); thread.visible = false;
  cap.position.y = 2.06;
  g.position.y = -2.6;
  let p = 0, w = 1, h = 1, pointer = 0, pt = 0, raf = 0, visible = true, t0 = performance.now();
  function size() {
    const r = canvas.getBoundingClientRect(); w = Math.max(1, r.width); h = Math.max(1, r.height);
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
  }
  function frame(now) {
    raf = 0; const t = (now - t0) / 1000;
    pt += (pointer - pt) * 0.06;
    const ex = sm(0.36, 0.47, p) * (1 - sm(0.6, 0.7, p));   // vista explotada
    const narrow = w / h < 0.7, k = transparent ? [6.4, 0, -1.25] : kf(p);
    cam.position.set(Math.sin(pt * 0.25) * 0.5, 0.2, k[0] * (narrow ? 1.45 : 1));
    cam.lookAt(0, 0, 0);
    g.position.set(narrow ? 0 : k[1], k[2] + (narrow ? sm(0.12, 0.28, p) * (1 - sm(0.34, 0.42, p)) * 1.1 : 0), 0);
    g.rotation.y = t * 0.25 * (1 - sm(0.08, 0.25, p)) + p * Math.PI * 2 + pt * 0.3 - ex * p * Math.PI * 2 + ex * 0.5;
    g.rotation.z = (sm(0.12, 0.28, p) - sm(0.34, 0.42, p)) * -0.2 + sm(0.84, 1, p) * 0.1;
    cap.position.y = 2.06 + ex * 0.5; cap.position.x = 0; cap.rotation.y = ex * 2.4;
    inner.visible = vacuum.visible = thread.visible = ex > 0.01;
    shell.position.x = -ex * 1.0; inner.position.x = ex * 1.0;
    vac.opacity = ex * 0.5; thread.position.y = 2.02 + ex * 0.2;
    renderer.render(scene, cam);
    if (visible && !transparent) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  size(); addEventListener('resize', () => { size(); kick(); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(canvas);
  addEventListener('pointermove', e => { pointer = (e.clientX / innerWidth - 0.5) * 2; }, { passive: true });
  kick();
  return {
    setProgress(v) { p = v; kick(); },
    setFinish(name) { const f = FINISHES[name]; if (!f) return; const c0 = metal.color.clone(), c1 = new Color(f.color), r0 = metal.roughness, s = performance.now();
      const step = n => { const k = Math.min(1, (n - s) / 450), e = 1 - Math.pow(1 - k, 3); metal.color.copy(c0).lerp(c1, e); metal.roughness = r0 + (f.rough - r0) * e; kick(); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); },
    renderOnce() { frame(performance.now()); return canvas.toDataURL('image/png'); },
    setAngle(a) { t0 = performance.now() - a * 4000; },
  };
}
