// Flor procedural en Three.js: pétalos curvados por vértice, filotaxis (ángulo áureo), material con "sheen" aterciopelado.
// bloom (0..1) abre los pétalos; setPalette() cambia el color con un fundido. Canvas transparente sobre el fondo crema.
import { WebGLRenderer, Scene, PerspectiveCamera, PlaneGeometry, MeshPhysicalMaterial, Mesh, Group, HemisphereLight, DirectionalLight,
  Color, DoubleSide, SRGBColorSpace, NeutralToneMapping, TubeGeometry, CatmullRomCurve3, Vector3, MeshStandardMaterial, BufferAttribute, PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
export const PALETTES = {
  peonia: ['#f4a3ba', '#c8325f', '#ffe4ec'], roja: ['#c4122f', '#5e0716', '#ff7b8b'], blanca: ['#f7f2ea', '#c9bfae', '#ffffff'],
  coral: ['#ff9a76', '#d9483b', '#ffe0cf'], lila: ['#c8a6e6', '#6c3f99', '#f3e8ff'],
};
const GA = Math.PI * (3 - Math.sqrt(5));
function petalGeo(len, wid) {
  const g = new PlaneGeometry(wid, len, 12, 30); g.translate(0, len / 2, 0);
  const p = g.attributes.position, c = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), v = y / len, u = x / (wid / 2);
    const width = Math.sqrt(Math.max(0, Math.sin(Math.PI * Math.min(v, 1)))) * (0.55 + 0.45 * Math.min(1, v * 1.6));   // pétalo obovado, punta redonda
    const nx = x * width, cup = (u * u) * wid * 0.42 * (0.3 + v), curl = Math.pow(v, 3) * len * 0.12, ruff = Math.sin(u * 9 + len * 7) * Math.pow(v, 3) * 0.035;
    p.setXYZ(i, nx, y, -cup + curl + ruff);
    c[i * 3] = v; c[i * 3 + 1] = Math.abs(u); c[i * 3 + 2] = 0;
  }
  g.setAttribute('uvw', new BufferAttribute(c, 3)); g.computeVertexNormals(); return g;
}
export function init(canvas, { render } = {}) {
  const r = new WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!render });
  r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.outputColorSpace = SRGBColorSpace; r.toneMapping = NeutralToneMapping;
  const scene = new Scene(); const pm = new PMREMGenerator(r); scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.25;
  scene.add(new HemisphereLight('#fff6ec', '#7d6a62', 0.7)); const key = new DirectionalLight('#fff1dd', 1.5); key.position.set(3, 5, 4); scene.add(key);
  const rim = new DirectionalLight('#ffd6e2', 0.9); rim.position.set(-4, 2, -3); scene.add(rim);
  const cam = new PerspectiveCamera(30, 1, 0.1, 50); cam.position.set(0, 3.4, 6.9); cam.lookAt(0, -0.1, 0);
  const pal = PALETTES.peonia.map(c => new Color(c));
  // Material: color base→punta mezclado en el shader (uvw.x = altura del pétalo)
  const mat = new MeshPhysicalMaterial({ side: DoubleSide, roughness: 0.6, sheen: 0.6, sheenRoughness: 0.4, sheenColor: new Color('#ffe6ee'), color: '#ffffff' });
  const U = { cA: { value: pal[0].clone() }, cB: { value: pal[1].clone() }, cC: { value: pal[2].clone() } };
  mat.onBeforeCompile = s => {
    Object.assign(s.uniforms, U);
    s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nattribute vec3 uvw; varying vec3 vUvw;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvUvw = uvw;');
    s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nuniform vec3 cA; uniform vec3 cB; uniform vec3 cC; varying vec3 vUvw;')
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', 'vec3 pc = mix(cB, cA, smoothstep(0.0, 0.45, vUvw.x)); pc = mix(pc, cC, smoothstep(0.75, 1.0, vUvw.x) * 0.3 * (1.0 - vUvw.y * 0.5)); vec4 diffuseColor = vec4( pc, opacity );');
  };
  const flower = new Group(); scene.add(flower); flower.position.y = 0.55;
  const petals = [];
  const N = 46;
  for (let i = 0; i < N; i++) {
    const k = i / N, len = 0.45 + k * 0.95, wid = 0.38 + k * 0.62;
    const pivot = new Group(); pivot.rotation.y = i * GA;
    const m = new Mesh(petalGeo(len, wid), mat); pivot.add(m); flower.add(pivot);
    petals.push({ m, k, seed: Math.sin(i * 12.9898) * 0.5 });
  }
  // tallo y hojas
  const stemM = new MeshStandardMaterial({ color: '#4f7a45', roughness: 0.7 });
  const stem = new Mesh(new TubeGeometry(new CatmullRomCurve3([new Vector3(0, 0.6, 0), new Vector3(0.05, -0.6, 0.05), new Vector3(-0.08, -2.2, 0), new Vector3(0.1, -3.6, -0.1)]), 40, 0.05, 8), stemM); scene.add(stem);
  const leafM = new MeshPhysicalMaterial({ color: '#5d8c4f', roughness: 0.45, side: DoubleSide, sheen: 0.4, sheenColor: new Color('#c9f0b9') });
  [[-0.9, 0.5, 2.2], [-1.7, -0.3, -1.0]].forEach(([y, rz, ry]) => { const l = new Mesh(petalGeo(1.2, 0.42), leafM); l.position.set(0, y, 0); l.rotation.set(1.2, ry, rz); scene.add(l); });
  let bloom = 0.78, target = 0.78, w = 1, h = 1, raf = 0, vis = true, mx = 0, my = 0, sx = 0, sy = 0, t0 = performance.now(), fade = null;
  function size() { const b = canvas.getBoundingClientRect(); w = b.width || 1; h = b.height || 1; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
  function frame(now) {
    raf = 0; const t = (now - t0) / 1000;
    bloom += (target - bloom) * 0.06; sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
    petals.forEach(({ m, k, seed }) => {
      const closed = 0.1 + k * 0.2, open = 0.22 + Math.pow(k, 1.4) * 1.05;   // ángulo desde la vertical
      const b = Math.min(1, Math.max(0, bloom * 1.25 - (1 - k) * 0.25));
      m.rotation.x = closed + (open - closed) * b + Math.sin(t * 1.3 + seed * 9) * 0.015;
      m.position.y = (1 - k) * 0.12;
    });
    if (fade) { const e = Math.min(1, (now - fade.s) / 500), q = 1 - Math.pow(1 - e, 3); ['cA', 'cB', 'cC'].forEach((n, i) => U[n].value.copy(fade.from[i]).lerp(fade.to[i], q)); if (e >= 1) fade = null; }
    flower.rotation.y = t * 0.12 + sx * 0.4; flower.rotation.x = 0.12 + sy * 0.15;
    r.render(scene, cam);
    if (vis && !render) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf && vis) raf = requestAnimationFrame(frame); };
  size(); addEventListener('resize', size);
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; kick(); }).observe(canvas);
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });
  if (!render) kick();
  return {
    setBloom(v) { target = v; kick(); }, resize() { size(); kick(); },
    setPalette(name) { const P = PALETTES[name]; if (!P) return; fade = { s: performance.now(), from: ['cA', 'cB', 'cC'].map(n => U[n].value.clone()), to: P.map(c => new Color(c)) }; kick(); },
    renderOnce() { frame(performance.now()); return canvas.toDataURL('image/png'); },
  };
}
