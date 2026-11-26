// 05 — PicoGL (WebGL2 mínimo): cristal facetado con aristas doradas (coordenadas baricéntricas).
import { PicoGL } from 'picogl';
import { initCore, loop, drag, col, stage, dpr, fit } from '../../core/core.js';
initCore();
const el = stage(), c = document.createElement('canvas'); el.appendChild(c);
fit(c, 1.75);
const app = PicoGL.createApp(c, { antialias: true, alpha: true });
app.clearColor(0, 0, 0, 0).enable(PicoGL.DEPTH_TEST);
// Icosaedro subdividido 1 vez, deformado levemente → caras planas no uniformes.
const t0 = (1 + Math.sqrt(5)) / 2;
let V = [[-1,t0,0],[1,t0,0],[-1,-t0,0],[1,-t0,0],[0,-1,t0],[0,1,t0],[0,-1,-t0],[0,1,-t0],[t0,0,-1],[t0,0,1],[-t0,0,-1],[-t0,0,1]];
let Fc = [[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
const nrm = (v) => { const l = Math.hypot(...v); return v.map((x) => x / l); };
V = V.map(nrm);
const mid = {}, m = (a, b) => { const k = a < b ? a + '_' + b : b + '_' + a; if (mid[k] == null) { V.push(nrm(V[a].map((x, i) => (x + V[b][i]) / 2))); mid[k] = V.length - 1; } return mid[k]; };
Fc = Fc.flatMap(([a, b, c2]) => { const ab = m(a, b), bc = m(b, c2), ca = m(c2, a); return [[a, ab, ca], [b, bc, ab], [c2, ca, bc], [ab, bc, ca]]; });
V = V.map((v, i) => { const k = 1 + 0.12 * Math.sin(i * 12.9898) ; return [v[0] * k, v[1] * k * 1.25, v[2] * k]; });
const P = [], N = [], B = [];
Fc.forEach((f) => { const [a, b, d] = f.map((i) => V[i]); const u = b.map((x, i) => x - a[i]), w = d.map((x, i) => x - a[i]);
  const n = nrm([u[1]*w[2]-u[2]*w[1], u[2]*w[0]-u[0]*w[2], u[0]*w[1]-u[1]*w[0]]);
  [a, b, d].forEach((p, k) => { P.push(...p); N.push(...n); B.push(k === 0, k === 1, k === 2); }); });
const vs = `#version 300 es
layout(location=0) in vec3 p; layout(location=1) in vec3 n; layout(location=2) in vec3 b;
uniform vec2 rot; uniform float asp, t; out vec3 vN; out vec3 vB; out vec3 vP;
mat3 ry(float a){float c=cos(a),s=sin(a);return mat3(c,0,-s,0,1,0,s,0,c);} mat3 rx(float a){float c=cos(a),s=sin(a);return mat3(1,0,0,0,c,s,0,-s,c);}
void main(){ mat3 R=rx(rot.y)*ry(rot.x); vec3 q=R*p; vN=R*n; vB=b; vP=q; q.y+=sin(t*.8)*.06; float z=q.z+4.4;
  gl_Position=vec4(q.x*2.0/asp, q.y*2.0, q.z*.1, z); }`;
const fs = `#version 300 es
precision highp float; in vec3 vN; in vec3 vB; in vec3 vP; uniform vec3 acc, gold, ink; out vec4 o;
void main(){ vec3 n=normalize(vN); vec3 v=vec3(0,0,-1); vec3 L=normalize(vec3(-.5,.7,-.6));
  float d=max(dot(n,L),0.); float s=pow(max(dot(reflect(L,n),v),0.),24.); float f=pow(1.-abs(n.z),2.);
  vec3 c=mix(ink,acc,.35+.5*d)+s*vec3(1.)*.9+f*gold*.5;
  float e=min(min(vB.x,vB.y),vB.z); float edge=1.-smoothstep(0.,.035,e);
  o=vec4(mix(c,gold,edge*.9),1.); }`;
const prog = app.createProgram(vs, fs);
const vao = app.createVertexArray()
  .vertexAttributeBuffer(0, app.createVertexBuffer(PicoGL.FLOAT, 3, new Float32Array(P)))
  .vertexAttributeBuffer(1, app.createVertexBuffer(PicoGL.FLOAT, 3, new Float32Array(N)))
  .vertexAttributeBuffer(2, app.createVertexBuffer(PicoGL.FLOAT, 3, new Float32Array(B)));
const dc = app.createDrawCall(prog, vao).uniform('acc', new Float32Array(col('--acc'))).uniform('gold', new Float32Array(col('--acc2'))).uniform('ink', new Float32Array(col('--fg')));
const s = drag(c, 0.22); let last = 0;
loop(el, (t) => {
  const dt = Math.min(0.05, t - last); last = t; s.step(dt);
  if (fit(c, 1.75)) app.resize(c.width, c.height);
  app.clear();
  dc.uniform('rot', new Float32Array([s.x, 0.3 + s.y])).uniform('asp', c.width / c.height).uniform('t', t).draw();
});
