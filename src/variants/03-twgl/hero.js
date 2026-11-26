// 03 — TWGL: ciudad de 576 edificios instanciados (1 draw call) que suben con una ola.
import { createProgramInfo, createBufferInfoFromArrays, createVertexArrayInfo, setBuffersAndAttributes, setUniforms, drawBufferInfo, resizeCanvasToDisplaySize, m4 } from 'twgl.js';
import { initCore, loop, drag, col, stage, dpr } from '../../core/core.js';
initCore();
const el = stage(), c = document.createElement('canvas'); el.appendChild(c);
const gl = c.getContext('webgl2', { antialias: true, alpha: true });
if (gl) {
  const vs = `#version 300 es
  layout(location=0) in vec3 position; layout(location=1) in vec3 normal; layout(location=2) in vec3 inst; // inst = x, z, semilla
  uniform mat4 vp; uniform float t; out vec3 vN; out float vH; out float vD; out float vY;
  void main(){
    float d=length(inst.xy); float h=.25+ .9*fract(sin(inst.z)*4375.5)*(1.-smoothstep(3.,10.,d))+.12;
    float wave=.5+.5*sin(t*1.4-d*.7); h*= .55+.6*wave;
    vec3 p=position; p.y=(p.y+.5)*h; p.xz=p.xz*.78+inst.xy;
    vN=normal; vH=position.y+.5; vY=h; vD=d;
    gl_Position=vp*vec4(p,1.);
  }`;
  const fs = `#version 300 es
  precision mediump float; in vec3 vN; in float vH; in float vD; in float vY; uniform vec3 base, acc, bg; out vec4 o;
  void main(){ vec3 L=normalize(vec3(.5,1.,.3)); float l=.45+.55*max(dot(vN,L),0.);
    vec3 cc=base*l; float win=step(.62,fract(vH*vY*7.))*step(.2,vH)*step(abs(vN.y),.5);
    cc=mix(cc,acc,win*.55*step(.55,fract(sin(vD*91.7)*43.1)));
    cc=mix(cc,acc,smoothstep(.9,1.,vH)*step(.5,vN.y)*.35);
    o=vec4(mix(cc,bg,smoothstep(4.,10.5,vD)),1.); }`;
  const pi = createProgramInfo(gl, [vs, fs]);
  // cubo unitario (posiciones + normales) escrito a mano
  const P = [], N = [], F = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  F.forEach(([x, y, z]) => { const u = [y, z, x], v = [z, x, y]; const q = (a, b) => [x*.5 + u[0]*a*.5 + v[0]*b*.5, y*.5 + u[1]*a*.5 + v[1]*b*.5, z*.5 + u[2]*a*.5 + v[2]*b*.5];
    [[-1,-1],[1,-1],[1,1],[-1,-1],[1,1],[-1,1]].forEach(([a, b]) => { P.push(...q(a, b)); N.push(x, y, z); }); });
  const G = 20, I = [];
  for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) { I.push(i - G / 2 + 0.5, j - G / 2 + 0.5, i * 31.7 + j * 7.3); }
  const bi = createBufferInfoFromArrays(gl, { position: P, normal: N, inst: { numComponents: 3, data: I, divisor: 1 } });
  const vai = createVertexArrayInfo(gl, pi, bi);
  gl.enable(gl.DEPTH_TEST);
  const U = { base: col('--fg').map((v) => v * 1.4 + 0.08), acc: col('--acc'), bg: col('--bg') };
  const s = drag(c, 0.12); let last = 0;
  loop(el, (t) => {
    const dt = Math.min(0.05, t - last); last = t; s.step(dt);
    resizeCanvasToDisplaySize(c, dpr(1.5)); gl.viewport(0, 0, c.width, c.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const asp = c.width / c.height, proj = m4.perspective(0.62, asp, 0.1, 60);
    const r = asp < 0.9 ? 30 : 25, el2 = 0.62 + s.y * 0.4;
    const eye = [Math.sin(s.x) * Math.cos(el2) * r, Math.sin(el2) * r, Math.cos(s.x) * Math.cos(el2) * r];
    const vp = m4.multiply(proj, m4.inverse(m4.lookAt(eye, [0, 0.6, 0], [0, 1, 0])));
    gl.useProgram(pi.program); setBuffersAndAttributes(gl, pi, vai); setUniforms(pi, { vp, t, ...U });
    drawBufferInfo(gl, vai, gl.TRIANGLES, vai.numElements, 0, G * G);
  });
}
