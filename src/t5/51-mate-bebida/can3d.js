// Lata 3D: cilindro con etiqueta pintada en un <canvas> (sin modelos ni texturas descargadas).
// Inspirado en la lata que gira de manayerbamate.com; geometría y shader propios con Three.js.
import { WebGLRenderer, Scene, PerspectiveCamera, CylinderGeometry, Mesh, MeshStandardMaterial, CanvasTexture, Group, AmbientLight, DirectionalLight, SRGBColorSpace } from 'three';
const F = { clasico: ['#f3efd8', '#1f5a32'], maracuya: ['#2a1a05', '#f2b705'], jamaica: ['#fbe7ec', '#8c1b3a'] };
export function can3d(canvas, flavor) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene(), cam = new PerspectiveCamera(30, 1, .1, 50); cam.position.set(0, 0, 9);
  scene.add(new AmbientLight(0xffffff, 1.4)); const key = new DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 5); scene.add(key);
  const rim = new DirectionalLight(0xffffff, 1.2); rim.position.set(-4, 1, -2); scene.add(rim);
  const lab = document.createElement('canvas'); lab.width = 1024; lab.height = 512; const cx = lab.getContext('2d');
  const tex = new CanvasTexture(lab); tex.colorSpace = SRGBColorSpace; tex.anisotropy = 4;
  function paint(f) {
    const [bg, fg] = F[f]; cx.fillStyle = bg; cx.fillRect(0, 0, 1024, 512);
    cx.save(); cx.translate(512, 256); cx.rotate(-Math.PI / 2); cx.fillStyle = fg; cx.font = '190px Shrikhand, Georgia'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('Selva', 0, 0); cx.restore();
    cx.fillStyle = fg; cx.font = '600 30px "Rethink Sans", sans-serif'; cx.textAlign = 'left';
    cx.fillText({ clasico: 'MATE + LIMÓN', maracuya: 'MATE + MARACUYÁ', jamaica: 'MATE + JAMAICA' }[f], 640, 210);
    cx.fillText('355 ml · 80 mg', 640, 256); cx.fillText('CON GAS', 640, 302);
    cx.fillRect(0, 440, 1024, 10); cx.fillRect(0, 62, 1024, 10);
    tex.needsUpdate = true;
  }
  paint(flavor);
  const g = new Group();
  const body = new Mesh(new CylinderGeometry(1, 1, 3.6, 64, 1, true), new MeshStandardMaterial({ map: tex, roughness: .32, metalness: .35 }));
  const metal = new MeshStandardMaterial({ color: 0xc9cdd0, roughness: .25, metalness: .9 });
  const top = new Mesh(new CylinderGeometry(.86, 1, .22, 64), metal); top.position.y = 1.91;
  const bot = new Mesh(new CylinderGeometry(1, .9, .16, 64), metal); bot.position.y = -1.88;
  g.add(body, top, bot); g.rotation.z = -.12; scene.add(g);
  let w = 0, h = 0; const size = () => { w = canvas.clientWidth; h = canvas.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); cam.position.z = w / h < .8 ? 11 : 9; };
  addEventListener('resize', size); size();
  const st = { spin: 0, tx: 0, ty: 0, scroll: 0 };
  canvas.parentElement.addEventListener('pointermove', e => { const b = canvas.getBoundingClientRect(); st.tx = ((e.clientX - b.left) / b.width - .5) * .6; st.ty = ((e.clientY - b.top) / b.height - .5) * .4; });
  let raf = 0, vis = true, t0 = performance.now();
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) loop(); }).observe(canvas);
  function loop() { raf = vis ? requestAnimationFrame(loop) : 0; const t = (performance.now() - t0) / 1000;
    g.rotation.y = t * .5 + st.spin + st.scroll * 4 + st.tx; g.rotation.x += (st.ty - g.rotation.x) * .06; g.position.y = Math.sin(t * 1.3) * .08;
    renderer.render(scene, cam); }
  loop();
  return { paint: f => paint(f), spin: v => st.spin = v, scroll: v => st.scroll = v };
}
