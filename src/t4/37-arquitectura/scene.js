// Casa procedural en Three.js: del plano (aristas azules) al volumen, a la luz de tarde y a la noche, según el scroll.
import { WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, CylinderGeometry, IcosahedronGeometry, PlaneGeometry, EdgesGeometry,
  LineSegments, LineBasicMaterial, MeshStandardMaterial, Mesh, Group, HemisphereLight, DirectionalLight, Color, Vector3,
  PCFShadowMap, SRGBColorSpace, ACESFilmicToneMapping, InstancedMesh, Object3D, Fog, GridHelper } from 'three';
const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
// [p, posición cámara, objetivo]
const CAM = [[0, [24, 22, 26], [0, 2, 0]], [0.28, [21, 11, 25], [1, 3, 0]], [0.5, [7, 3.2, 21], [2.5, 4.2, 0]], [0.74, [17, 2.4, 13], [2, 3.4, 0]], [1, [-19, 8, 21], [1, 3, 0]]];
function camAt(p) { for (let i = 1; i < CAM.length; i++) if (p <= CAM[i][0]) { const A = CAM[i - 1], B = CAM[i], u = sm(A[0], B[0], p); return [A[1].map((v, k) => lerp(v, B[1][k], u)), A[2].map((v, k) => lerp(v, B[2][k], u))]; } return [CAM.at(-1)[1], CAM.at(-1)[2]]; }
const SKY = [[0, '#1d4a86'], [0.22, '#e9e4da'], [0.55, '#efe6d6'], [0.74, '#f0b48a'], [0.88, '#2d2a3d'], [1, '#0e1322']];
function skyAt(p, c) { for (let i = 1; i < SKY.length; i++) if (p <= SKY[i][0]) { const A = SKY[i - 1], B = SKY[i]; return c.set(A[1]).lerp(new Color(B[1]), sm(A[0], B[0], p)); } return c.set(SKY.at(-1)[1]); }

export function init(canvas, { render } = {}) {
  const r = new WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: !!render });
  r.setPixelRatio(Math.min(devicePixelRatio, 1.75)); r.outputColorSpace = SRGBColorSpace; r.toneMapping = ACESFilmicToneMapping; r.toneMappingExposure = 1.1;
  r.shadowMap.enabled = true; r.shadowMap.type = PCFShadowMap;
  const scene = new Scene(), sky = new Color('#1d4a86'); scene.background = sky; scene.fog = new Fog(sky, 40, 90);
  const cam = new PerspectiveCamera(32, 1, 0.5, 200);
  const hemi = new HemisphereLight('#ffffff', '#b9ad98', 1.2); scene.add(hemi);
  const sun = new DirectionalLight('#fff4e0', 2.4); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -20, right: 20, top: 20, bottom: -20, near: 1, far: 80 }); sun.shadow.bias = -0.0005; scene.add(sun, sun.target);
  const concrete = new MeshStandardMaterial({ color: '#d8d2c8', roughness: 0.92 }), dark = new MeshStandardMaterial({ color: '#3a3733', roughness: 0.7 });
  const glass = new MeshStandardMaterial({ color: '#8fb0c2', roughness: 0.1, metalness: 0.25, emissive: '#ffc985', emissiveIntensity: 0 });
  const wood = new MeshStandardMaterial({ color: '#9a6a43', roughness: 0.75 }), water = new MeshStandardMaterial({ color: '#4fa3b5', roughness: 0.15, metalness: 0.2, emissive: '#3fa0c0', emissiveIntensity: 0 });
  const leaf = new MeshStandardMaterial({ color: '#6f8a5a', roughness: 0.9, flatShading: true }), ground = new MeshStandardMaterial({ color: '#e6e0d5', roughness: 1 });
    const lineM = new LineBasicMaterial({ color: '#cfe3ff', transparent: true, opacity: 1 });
  const parts = []; const house = new Group(), lines = new Group(); scene.add(house, lines);
  // Añade una caja con base en y0; "d" = retraso de construcción (0..1 dentro del tramo de obra)
  function box(w, h, dep, x, y0, z, mat, d = 0) {
    const g = new BoxGeometry(w, h, dep); g.translate(0, h / 2, 0);
    const m = new Mesh(g, mat); m.position.set(x, y0, z); m.castShadow = m.receiveShadow = true;
    const e = new LineSegments(new EdgesGeometry(g), lineM); e.position.copy(m.position); lines.add(e);
    house.add(m); parts.push({ m, d }); return m;
  }
  const gr = new Mesh(new PlaneGeometry(80, 80), ground); gr.rotation.x = -Math.PI / 2; gr.receiveShadow = true; scene.add(gr);
  const grid = new GridHelper(60, 60, '#8fb6ea', '#5f8fd0'); grid.position.y = 0.01; grid.material.transparent = true; scene.add(grid);
  box(30, 0.4, 18, 0, 0, 0, concrete, 0);                       // plataforma
  box(12, 3.2, 8, -3, 0.4, -1, concrete, 0.1);                   // planta baja
  box(11.6, 2.6, 0.1, -3, 0.7, 3.05, glass, 0.18);               // vidrio planta baja
  box(15, 3, 6.5, 3.5, 3.6, -1.5, concrete, 0.3);                // volumen en voladizo
  box(13, 2.2, 0.1, 4.5, 4.0, 1.8, glass, 0.4);                  // ventanal alto
  box(4.6, 3, 4.6, -6, 6.6, -2.5, concrete, 0.5);                // torre / estudio
  box(4, 2.2, 0.1, -6, 7.0, -0.15, glass, 0.58);
  box(10, 0.25, 4.4, 6, 0.4, 5.4, water, 0.25);                  // piscina
  box(0.25, 3.2, 0.25, 9.8, 0.4, 1.3, dark, 0.35); box(0.25, 3.2, 0.25, 9.8, 0.4, -4.3, dark, 0.35);
  box(3, 0.12, 6, -9.5, 3.6, 2, dark, 0.45);                     // marquesina
  // celosía de madera (instanciada)
  const slat = new BoxGeometry(0.12, 2.2, 0.18); slat.translate(0, 1.1, 0);
  const sl = new InstancedMesh(slat, wood, 26), o = new Object3D();
  for (let i = 0; i < 26; i++) { o.position.set(-3 + i * 0.42, 4.0, 1.95); o.updateMatrix(); sl.setMatrixAt(i, o.matrix); }
  sl.castShadow = true; house.add(sl); parts.push({ m: sl, d: 0.62 });
  // árboles estilizados
  [[-13, 6], [-11, -7], [13, -6], [-15, -1]].forEach(([x, z], i) => {
    const t = new Group(); t.position.set(x, 0.4, z);
    const tr = new Mesh(new CylinderGeometry(0.15, 0.22, 2.4, 6), wood); tr.position.y = 1.2; tr.castShadow = true;
    const cr = new Mesh(new IcosahedronGeometry(1.9 + (i % 2) * 0.5, 1), leaf); cr.position.y = 3.4; cr.castShadow = true;
    t.add(tr, cr); house.add(t); parts.push({ m: t, d: 0.7 + i * 0.05 });
  });
  let p = 0, w = 1, h = 1, raf = 0, vis = true, intro = render ? 1 : 0; const t0 = performance.now();
  const tmp = new Color();
  function size() { const b = canvas.getBoundingClientRect(); w = b.width || 1; h = b.height || 1; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
  function frame() {
    raf = 0;
    if (intro < 1) { intro = Math.min(1, (performance.now() - t0) / 1400); raf = requestAnimationFrame(frame); }
    const build = sm(0.08, 0.36, p), night = sm(0.8, 0.96, p), dusk = sm(0.6, 0.78, p) * (1 - night * 0.6);
    const ie = 1 - Math.pow(1 - intro, 3); lines.scale.set(1, Math.max(0.001, ie), 1);
    parts.forEach(({ m, d }) => { const k = sm(d * 0.75, d * 0.75 + 0.25, build); m.scale.set(1, Math.max(0.001, k), 1); m.visible = k > 0.002; });
    ground.color.set('#24548f').lerp(tmp.set('#e6e0d5'), sm(0.14, 0.34, p));
    lineM.opacity = 1 - sm(0.28, 0.4, p) * 0.85; lineM.color.set(p > 0.3 ? '#2b2a27' : '#d6e8ff');
    grid.material.opacity = 0.6 * (1 - sm(0.2, 0.36, p)); grid.visible = p < 0.36;
    skyAt(p, sky); scene.fog.color.copy(sky);
    const narrow = w / h < 0.8, [cp, ct] = camAt(p), k = narrow ? 1.55 : 1;
    cam.position.set(ct[0] + (cp[0] - ct[0]) * k, ct[1] + (cp[1] - ct[1]) * k, ct[2] + (cp[2] - ct[2]) * k); cam.lookAt(ct[0], ct[1], ct[2]);
    const az = lerp(0.6, -0.9, sm(0.3, 0.85, p)), el = lerp(1.0, 0.18, sm(0.4, 0.82, p));
    sun.position.set(Math.cos(az) * 30 * Math.cos(el), Math.sin(el) * 30, Math.sin(az) * 30 * Math.cos(el)); sun.target.position.set(0, 0, 0);
    sun.color.set('#fff4e0').lerp(tmp.set('#ff9a5a'), dusk); sun.intensity = lerp(2.4, 0.25, night);
    hemi.intensity = lerp(1.2, 0.18, night) * lerp(1, 0.75, dusk); hemi.color.set('#ffffff').lerp(tmp.set('#7f8bb8'), night);
    glass.emissiveIntensity = night * 1.3; water.emissiveIntensity = night * 0.9;
    r.render(scene, cam);
  }
  const kick = () => { if (!raf && vis) raf = requestAnimationFrame(frame); };
  // (el bucle sólo corre durante la intro o cuando cambia el scroll: GPU en reposo el resto del tiempo)
  size(); addEventListener('resize', () => { size(); kick(); });
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; kick(); }).observe(canvas);
  kick();
  return { setProgress(v) { p = v; kick(); }, renderOnce(v) { p = v; size(); frame(); return canvas.toDataURL('image/jpeg', 0.92); } };
}
