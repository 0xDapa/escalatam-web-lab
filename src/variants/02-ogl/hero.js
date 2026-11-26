// 02 — OGL: perla iridiscente que "respira" + satélites. Solo se importan las piezas usadas (tree-shaking).
import { Renderer, Camera, Transform, Program, Mesh, Sphere } from 'ogl';
import { initCore, loop, drag, col, stage, dpr } from '../../core/core.js';
initCore();
const el = stage();
const renderer = new Renderer({ dpr: dpr(1.75), alpha: true, antialias: true });
const gl = renderer.gl; el.appendChild(gl.canvas); gl.clearColor(0, 0, 0, 0);
const camera = new Camera(gl, { fov: 32 }); camera.position.set(0, 0, 7);
const scene = new Transform();
const vertex = `attribute vec3 position; attribute vec3 normal;
uniform mat4 modelViewMatrix, projectionMatrix; uniform mat3 normalMatrix; uniform float uTime, uAmp;
varying vec3 vN; varying vec3 vV;
float w(vec3 p){return sin(p.x*3.1+uTime)*sin(p.y*2.7+uTime*.8)*sin(p.z*2.3+uTime*1.2);}
void main(){ vec3 p=position+normal*w(position)*uAmp;
  vec4 mv=modelViewMatrix*vec4(p,1.); vN=normalize(normalMatrix*normal); vV=-mv.xyz; gl_Position=projectionMatrix*mv; }`;
const fragment = `precision highp float; uniform vec3 uA, uB; varying vec3 vN; varying vec3 vV;
void main(){ vec3 n=normalize(vN), v=normalize(vV); float f=pow(1.-max(dot(n,v),0.),2.2);
  vec3 irid=.5+.5*cos(6.28*(f*.9+vec3(0.,.33,.67))+n.y*2.);
  vec3 base=mix(vec3(.97,.98,1.),uB,.18);
  vec3 L=normalize(vec3(.4,.8,.6)); float s=pow(max(dot(reflect(-L,n),v),0.),48.);
  float d=.55+.45*max(dot(n,L),0.);
  vec3 c=base*d+mix(uA,irid,.5)*f*.9+s*.9;
  gl_FragColor=vec4(c,1.); }`;
const A = col('--acc'), B = col('--acc2');
const prog = (amp) => new Program(gl, { vertex, fragment, uniforms: { uTime: { value: 0 }, uAmp: { value: amp }, uA: { value: A }, uB: { value: B } } });
const pearl = new Mesh(gl, { geometry: new Sphere(gl, { radius: 1.25, widthSegments: 128, heightSegments: 96 }), program: prog(0.09) });
pearl.setParent(scene);
const small = new Sphere(gl, { radius: 1, widthSegments: 32, heightSegments: 24 });
const sats = [0.22, 0.14, 0.3].map((r, i) => { const m = new Mesh(gl, { geometry: small, program: prog(0.05) }); m.scale.set(r); m.setParent(scene); m.userData = { r: 1.9 + i * 0.35, sp: 0.5 + i * 0.22, ph: i * 2.1, tilt: 0.4 - i * 0.35 }; return m; });
const resize = () => { renderer.setSize(el.clientWidth, el.clientHeight); camera.perspective({ aspect: el.clientWidth / el.clientHeight }); };
addEventListener('resize', resize); resize();
const s = drag(gl.canvas, 0.25); let last = 0;
loop(el, (t) => {
  const dt = Math.min(0.05, t - last); last = t; s.step(dt);
  scene.rotation.y = s.x; scene.rotation.x = 0.15 + s.y;
  pearl.program.uniforms.uTime.value = t;
  sats.forEach((m) => { const u = m.userData, a = t * u.sp + u.ph; m.position.set(Math.cos(a) * u.r, Math.sin(a) * u.r * u.tilt, Math.sin(a) * u.r); m.program.uniforms.uTime.value = t; });
  renderer.render({ scene, camera });
});
