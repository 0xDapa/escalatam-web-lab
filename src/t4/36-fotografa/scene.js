// Galería curva (estilo Lusion / Active Theory, código propio): planos de foto colocados en el interior de un cilindro.
// El vertex shader los curva sobre el radio y los dobla según la velocidad del scroll; el fragment hace "cover",
// separa RGB con la velocidad y apaga/desatura las fotos laterales. Un solo ShaderMaterial clonado por foto.
import { WebGLRenderer, Scene, PerspectiveCamera, PlaneGeometry, ShaderMaterial, Mesh, TextureLoader, SRGBColorSpace, Vector2 } from 'three';
const VS = `uniform float uA, uR, uVel; varying vec2 vUv; varying float vA;
void main(){ vUv = uv; vec3 p = position; float a = uA + p.x / uR; vA = a;
  float bz = uVel * (p.y * p.y) * 0.18 - abs(uVel) * 0.25;          // doblez por velocidad
  float r = uR + bz; vec3 w = vec3(sin(a) * r, p.y * (1.0 - abs(uVel) * 0.05), -cos(a) * r);
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0); }`;
const FS = `uniform sampler2D uT; uniform vec2 uS; uniform float uVel, uIn; varying vec2 vUv; varying float vA;
void main(){ vec2 uv = (vUv - 0.5) * uS + 0.5; float k = uVel * 0.012;
  vec3 c = vec3(texture2D(uT, uv + vec2(k, 0.0)).r, texture2D(uT, uv).g, texture2D(uT, uv - vec2(k, 0.0)).b);
  float f = smoothstep(1.1, 0.05, abs(vA)); float g = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(g), c, 0.35 + 0.65 * f) * (0.3 + 0.7 * f);
  vec2 q = abs(vUv - 0.5) * 2.0; float edge = 1.0 - smoothstep(0.985, 1.0, max(q.x, q.y));
  gl_FragColor = vec4(c * uIn, edge); }`;
export function init(canvas, files, { onIndex } = {}) {
  const r = new WebGLRenderer({ canvas, antialias: true, alpha: true }); r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.outputColorSpace = SRGBColorSpace;
  const scene = new Scene(), cam = new PerspectiveCamera(40, 1, 0.1, 50);
  const R = 6, W = 2.1, H = 2.7, GAP = 0.32, SP = (W + GAP) / R, list = [...files, ...files], TOTAL = list.length * SP;
  const geo = new PlaneGeometry(W, H, 40, 20), loader = new TextureLoader(), meshes = [];
  list.forEach((f, i) => {
    const m = new ShaderMaterial({ vertexShader: VS, fragmentShader: FS, transparent: true, uniforms: { uT: { value: null }, uS: { value: new Vector2(1, 1) }, uA: { value: 0 }, uR: { value: R }, uVel: { value: 0 }, uIn: { value: 0 } } });
    loader.load(f, t => { t.colorSpace = SRGBColorSpace; const ia = t.image.width / t.image.height, pa = W / H; m.uniforms.uS.value.set(ia > pa ? pa / ia : 1, ia > pa ? 1 : ia / pa); m.uniforms.uT.value = t; m.userData.t0 = performance.now(); kick(); });
    const me = new Mesh(geo, m); me.frustumCulled = false; scene.add(me); meshes.push({ m, i });
  });
  let off = 0, target = 0, vel = 0, w = 1, h = 1, raf = 0, vis = true, last = -1;
  function size() { const b = canvas.getBoundingClientRect(); w = b.width || 1; h = b.height || 1; r.setSize(w, h, false); cam.aspect = w / h; const mob = cam.aspect < 1; cam.position.set(0, mob ? 0.55 : 0.95, mob ? 3.6 : 2.3); cam.updateProjectionMatrix(); kick(); }
  function frame(now) {
    raf = 0; const prev = off; off += (target - off) * 0.085; const d = off - prev; vel += (Math.max(-1, Math.min(1, d * 12)) - vel) * 0.12;
    let moving = Math.abs(target - off) > 1e-4 || Math.abs(vel) > 1e-3;
    meshes.forEach(({ m, i }) => {
      let a = i * SP - off; a = ((a + TOTAL / 2) % TOTAL + TOTAL) % TOTAL - TOTAL / 2;
      m.uniforms.uA.value = a; m.uniforms.uVel.value = vel;
      if (m.userData.t0) { const e = Math.min(1, (now - m.userData.t0) / 700); m.uniforms.uIn.value = 1 - Math.pow(1 - e, 3); if (e < 1) moving = true; }
    });
    const idx = ((Math.round(off / SP) % files.length) + files.length) % files.length;
    if (idx !== last) { last = idx; onIndex?.(idx); }
    r.render(scene, cam);
    if (moving && vis) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf && vis) raf = requestAnimationFrame(frame); };
  size(); addEventListener('resize', size);
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; kick(); }).observe(canvas);
  return { SP, set(v) { target = v; kick(); }, get: () => target, snap() { target = Math.round(target / SP) * SP; kick(); } };
}
