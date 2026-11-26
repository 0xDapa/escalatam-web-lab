// Panel de carrocería procedural (aleta con línea de hombro) en MeshPhysical con clearcoat.
// Dos mallas con la misma geometría y planos de recorte locales = la "cinta" de antes/después de un detailer:
// a la derecha pintura con swirls (normal map generado en canvas), a la izquierda pintura corregida espejo.
// Entorno: estudio con barras de luz (PMREM de una escena propia). Gotas de cerámico = InstancedMesh.
import { WebGLRenderer, Scene, PerspectiveCamera, PlaneGeometry, MeshPhysicalMaterial, Mesh, PMREMGenerator, BoxGeometry, MeshBasicMaterial,
  CanvasTexture, RepeatWrapping, SRGBColorSpace, Plane, Vector3, Vector2, InstancedMesh, SphereGeometry, Object3D, Color, ACESFilmicToneMapping, Group } from 'three';
export const surf = (x, y) => -0.05 * x * x - 0.18 * y * y + 0.16 * Math.exp(-((y - 0.35) ** 2) / 0.012) * (0.6 + 0.4 * Math.cos(x * 0.5)) + 0.1 * Math.tanh((y - 0.35) * 6);
function swirlNormal(N = 1024) {
  const c = document.createElement('canvas'); c.width = c.height = N; const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, N, N); g.lineCap = 'round';
  let s = 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 2200; i++) {            // marcas circulares (rotativa mal usada / rodillo)
    const cx = N * (0.2 + rnd() * 0.6), cy = N * (0.2 + rnd() * 0.6), r = 20 + rnd() * N * 0.6, a = rnd() * 6.28, l = 0.05 + rnd() * 0.35;
    g.strokeStyle = `rgba(255,255,255,${0.12 + rnd() * 0.35})`; g.lineWidth = 0.6 + rnd() * 1.4; g.beginPath(); g.arc(cx, cy, r, a, a + l); g.stroke();
  }
  for (let i = 0; i < 90; i++) { const x = rnd() * N, y = rnd() * N, a = rnd() * 6.28, l = 40 + rnd() * 300; g.strokeStyle = `rgba(255,255,255,${0.3 + rnd() * 0.5})`; g.lineWidth = 1 + rnd(); g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); }
  const h = g.getImageData(0, 0, N, N).data, out = g.createImageData(N, N), o = out.data;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const i = (y * N + x) * 4, hx = h[(y * N + ((x + 1) % N)) * 4] - h[(y * N + ((x - 1 + N) % N)) * 4], hy = h[(((y + 1) % N) * N + x) * 4] - h[(((y - 1 + N) % N) * N + x) * 4];
    o[i] = 128 - hx * 0.5; o[i + 1] = 128 - hy * 0.5; o[i + 2] = 255; o[i + 3] = 255;
  }
  g.putImageData(out, 0, 0); const t = new CanvasTexture(c); t.wrapS = t.wrapT = RepeatWrapping; return t;
}
function studio() {        // escena-entorno: caja negra con barras de luz y un softbox
  const s = new Scene(); s.background = new Color('#0d0e11'); const m = new MeshBasicMaterial({ color: new Color(3.2, 3.2, 3.4) });
  [-3.5, -2.1, -0.7, 0.7, 2.1, 3.5].forEach((x, i) => { const b = new Mesh(new BoxGeometry(0.34, 0.06, 12), m); b.position.set(x, 4, 0); b.rotation.y = 0.2 - i * 0.06; s.add(b); });
  const soft = new Mesh(new BoxGeometry(7, 3, 0.1), new MeshBasicMaterial({ color: new Color(0.9, 1, 1.2) })); soft.position.set(0, 1, -6); s.add(soft);
  const floor = new Mesh(new BoxGeometry(14, 0.1, 14), new MeshBasicMaterial({ color: new Color(0.06, 0.06, 0.07) })); floor.position.y = -2; s.add(floor);
  const warm = new Mesh(new BoxGeometry(0.5, 4, 0.1), new MeshBasicMaterial({ color: new Color(2.4, 1, 0.4) })); warm.position.set(6, 1, 1); warm.rotation.y = -1.2; s.add(warm);
  const sun = new Mesh(new SphereGeometry(0.35, 16, 8), new MeshBasicMaterial({ color: new Color(14, 13, 12) })); sun.position.set(1.5, 3.5, 4.5); s.add(sun);
  return s;
}
export function init(canvas, { render } = {}) {
  const r = new WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: !!render }); r.setPixelRatio(Math.min(devicePixelRatio, 2));
  r.outputColorSpace = SRGBColorSpace; r.toneMapping = ACESFilmicToneMapping; r.toneMappingExposure = 1.25; r.localClippingEnabled = true; r.setClearColor('#07080a');
  const scene = new Scene(); const pm = new PMREMGenerator(r); scene.environment = pm.fromScene(studio(), 0.02).texture;
  const cam = new PerspectiveCamera(32, 1, 0.1, 50);
  const geo = new PlaneGeometry(7, 3.4, 260, 140), p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) p.setZ(i, surf(p.getX(i), p.getY(i)));
  geo.computeVertexNormals();
  const nm = swirlNormal(); nm.repeat.set(2, 1);
  const base = { color: '#0b0c10', metalness: 0.6, roughness: 0.42, clearcoat: 1 };
  const split = new Plane(new Vector3(-1, 0, 0), 0), split2 = new Plane(new Vector3(1, 0, 0), 0);
  const dirty = new MeshPhysicalMaterial({ ...base, clearcoatRoughness: 0.34, clearcoatNormalMap: nm, clearcoatNormalScale: new Vector2(1.3, 1.3), clippingPlanes: [split2] });
  const clean = new MeshPhysicalMaterial({ ...base, roughness: 0.32, clearcoatRoughness: 0.02, clippingPlanes: [split] });
  const panel = new Group(); scene.add(panel);
  panel.add(new Mesh(geo, dirty), new Mesh(geo, clean));
  // cinta de carrocero en la línea de corte
  const tape = new Mesh(new PlaneGeometry(0.07, 3.4, 1, 70), new MeshBasicMaterial({ color: '#d9c99a' })); panel.add(tape); const tp = tape.geometry.attributes.position; let lastS = 99;
  // gotas de cerámico
  const D = 180, drops = new InstancedMesh(new SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2), new MeshPhysicalMaterial({ color: '#0b0c10', roughness: 0, metalness: 0, clearcoat: 1, transparent: true, opacity: 0.55, envMapIntensity: 2.4 }), D);
  const o = new Object3D(), dd = []; let s = 3; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < D; i++) { const x = -3.3 + rnd() * 6.6, y = -1.5 + rnd() * 3, k = 0.025 + rnd() ** 3 * 0.09; dd.push({ x, y, k }); }
  panel.add(drops);
  let st = { s: -3.6, drops: 0, rot: 0 }, w = 1, h = 1, raf = 0, vis = true;
  function size() { const b = canvas.getBoundingClientRect(); w = b.width || 1; h = b.height || 1; r.setSize(w, h, false); cam.aspect = w / h; const mob = cam.aspect < 1;
    cam.fov = mob ? 52 : 30; cam.position.set(mob ? 0.6 : 0, -2.2, mob ? 5.4 : 7.6); cam.lookAt(0, 0, 0); cam.updateProjectionMatrix(); kick(); }
  function frame() {
    raf = 0; split.constant = st.s; split2.constant = -st.s; if (st.s !== lastS) { lastS = st.s; for (let i = 0; i < tp.count; i++) tp.setZ(i, surf(st.s + tp.getX(i), tp.getY(i)) + 0.006); tp.needsUpdate = true; tape.position.x = st.s; } tape.visible = st.s > -3.5 && st.s < 3.5;
    panel.rotation.set(-0.95, st.rot * 0.35, -0.08 + st.rot * 0.05);
    dd.forEach((d, i) => { const k = d.k * (0.55 + 0.45 * st.drops); o.position.set(d.x, d.y, surf(d.x, d.y)); o.scale.set(k, k, k * 0.75 * st.drops + 0.001); o.lookAt(o.position.x, o.position.y, o.position.z + 1); o.updateMatrix(); drops.setMatrixAt(i, o.matrix); });
    drops.visible = st.drops > 0.01; drops.instanceMatrix.needsUpdate = true;
    r.render(scene, cam);
  }
  const kick = () => { if (!raf && vis) raf = requestAnimationFrame(frame); };
  size(); addEventListener('resize', size);
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; kick(); }).observe(canvas);
  return { set(v) { Object.assign(st, v); kick(); }, renderOnce() { frame(); return canvas.toDataURL('image/jpeg', 0.92); } };
}
