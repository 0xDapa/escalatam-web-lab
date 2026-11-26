// 04 — regl: toroide de partículas que late con una curva de electrocardiograma.
import createREGL from 'regl/dist/regl.unchecked.js';
import { initCore, loop, drag, col, stage, dpr, fit } from '../../core/core.js';
initCore();
const el = stage(), c = document.createElement('canvas'); el.appendChild(c);
const regl = createREGL({ canvas: c, pixelRatio: dpr(1.5), attributes: { antialias: false, alpha: true } });
const N = innerWidth < 760 ? 9000 : 14000, pos = new Float32Array(N * 3);
for (let i = 0; i < N; i++) { pos[i * 3] = Math.random() * 6.2832; pos[i * 3 + 1] = Math.random() * 6.2832; pos[i * 3 + 2] = Math.random(); }
const draw = regl({
  vert: `precision mediump float; attribute vec3 a; uniform float t, asp, px; uniform vec2 rot; varying float vK; varying float vZ;
  float ecg(float x){ x=fract(x); return exp(-pow((x-.1)*40.,2.))*.25 - exp(-pow((x-.17)*60.,2.))*.35 + exp(-pow((x-.2)*55.,2.))*1.6 - exp(-pow((x-.24)*50.,2.))*.5 + exp(-pow((x-.45)*14.,2.))*.3; }
  void main(){
    float beat=ecg(t*.9 - a.x/6.2832*.35);
    float R=1.25+beat*.22, r=.34+a.z*.12+beat*.08;
    vec3 p=vec3((R+r*cos(a.y))*cos(a.x),(R+r*cos(a.y))*sin(a.x),r*sin(a.y));
    float cy=cos(rot.x),sy=sin(rot.x),cx=cos(rot.y),sx=sin(rot.y);
    p=vec3(cy*p.x+sy*p.z,p.y,-sy*p.x+cy*p.z); p=vec3(p.x,cx*p.y-sx*p.z,sx*p.y+cx*p.z);
    float z=p.z+4.2; vK=clamp(beat,0.,1.); vZ=clamp(.5-p.z*.4,.0,1.);
    gl_Position=vec4(p.x/z*2.05/asp,p.y/z*2.05,0.,1.); gl_PointSize=px*(1.3+vZ*1.4+vK*1.6)*(4.2/z); }`,
  frag: `precision mediump float; uniform vec3 c1,c2; varying float vK; varying float vZ;
  void main(){ float r=length(gl_PointCoord-.5); if(r>.5) discard; float g=smoothstep(.5,.0,r);
    gl_FragColor=vec4(mix(c2,c1,.35+vK*.65+vZ*.2)*g*(.45+vZ*.8+vK), g); }`,
  attributes: { a: pos }, count: N, primitive: 'points',
  uniforms: { t: regl.prop('t'), asp: regl.prop('asp'), px: regl.prop('px'), rot: regl.prop('rot'), c1: col('--acc'), c2: col('--acc2') },
  blend: { enable: true, func: { src: 'one', dst: 'one' } }, depth: { enable: false },
});
const s = drag(c, 0.2); let last = 0;
loop(el, (t) => {
  const dt = Math.min(0.05, t - last); last = t; s.step(dt);
  fit(c, 1.5); regl.poll(); regl.clear({ color: [0, 0, 0, 0] });
  draw({ t, asp: c.width / c.height, px: c.height / 560, rot: [s.x, 0.5 + s.y] });
});
