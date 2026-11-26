// Esfera de partículas "audio-reactiva": 14k puntos sobre una esfera de Fibonacci desplazados en el vertex shader
// por ruido + 8 bandas de energía (de un AnalyserNode real si suena el loop, o de un pulso a 124 BPM si no).
import { WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, BufferAttribute, ShaderMaterial, Points, AdditiveBlending, Vector2 } from 'three';
const VS = `uniform float uT, uE[8], uBeat; uniform vec2 uM; attribute float aR; varying float vG; varying float vB;
float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
float n(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(h(i), h(i+vec3(1,0,0)), f.x), mix(h(i+vec3(0,1,0)), h(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(h(i+vec3(0,0,1)), h(i+vec3(1,0,1)), f.x), mix(h(i+vec3(0,1,1)), h(i+vec3(1,1,1)), f.x), f.y), f.z); }
void main(){
  vec3 p = position; float lat = p.y * 0.5 + 0.5; int band = int(clamp(lat * 8.0, 0.0, 7.0));
  float e = 0.0; for (int i = 0; i < 8; i++) if (i == band) e = uE[i];
  float d = n(p * 2.2 + uT * 0.35) * 0.35 + e * 0.45 * (0.6 + 0.4 * n(p * 6.0 - uT)) + uBeat * 0.08;
  p *= 1.0 + d; p.xy += uM * 0.15 * (1.0 - p.z);
  vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.4 + aR * 2.2 + e * 2.0) * (6.0 / -mv.z); vG = d; vB = lat; }`;
const FS = `varying float vG; varying float vB; void main(){ vec2 c = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.1, length(c));
  vec3 col = mix(vec3(0.38, 0.25, 1.0), vec3(0.75, 1.0, 0.2), smoothstep(0.15, 0.6, vG)); col = mix(col, vec3(1.0, 0.3, 0.55), smoothstep(0.75, 1.0, vB) * 0.6);
  gl_FragColor = vec4(col, a * 0.85); }`;
export function init(canvas, getBands) {
  const r = new WebGLRenderer({ canvas, antialias: false, alpha: true }); r.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  const N = matchMedia('(max-width: 760px)').matches ? 8000 : 14000, pos = new Float32Array(N * 3), rnd = new Float32Array(N);
  for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), t = i * Math.PI * (3 - Math.sqrt(5)); pos.set([Math.cos(t) * rr, y, Math.sin(t) * rr], i * 3); rnd[i] = Math.random(); }
  const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(pos, 3)); g.setAttribute('aR', new BufferAttribute(rnd, 1));
  const U = { uT: { value: 0 }, uE: { value: new Array(8).fill(0) }, uBeat: { value: 0 }, uM: { value: new Vector2() } };
  const pts = new Points(g, new ShaderMaterial({ vertexShader: VS, fragmentShader: FS, uniforms: U, transparent: true, depthWrite: false, blending: AdditiveBlending }));
  const scene = new Scene(); scene.add(pts); const cam = new PerspectiveCamera(40, 1, 0.1, 20); cam.position.z = 4.2;
  let vis = true, raf = 0, mx = 0, my = 0; const t0 = performance.now();
  function size() { const b = canvas.getBoundingClientRect(); r.setSize(b.width, b.height, false); cam.aspect = b.width / b.height; cam.position.z = cam.aspect < 1 ? 5.4 : 4.2; cam.updateProjectionMatrix(); }
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - 0.5; my = 0.5 - e.clientY / innerHeight; }, { passive: true });
  function frame(now) {
    raf = vis ? requestAnimationFrame(frame) : 0; const t = (now - t0) / 1000; U.uT.value = t;
    const b = getBands(t); for (let i = 0; i < 8; i++) U.uE.value[i] += (b[i] - U.uE.value[i]) * 0.35;
    U.uBeat.value = b[0]; U.uM.value.lerp(new Vector2(mx, my), 0.06); pts.rotation.y = t * 0.08; pts.rotation.x = Math.sin(t * 0.1) * 0.2;
    r.render(scene, cam);
  }
  size(); addEventListener('resize', size);
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(frame); }).observe(canvas);
  raf = requestAnimationFrame(frame);
}
