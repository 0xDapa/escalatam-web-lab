// 01 — WebGL2 puro: esfera de brasas (partículas) + chispas. Sin librerías.
import { initCore, loop, drag, fit, col, stage } from '../../core/core.js';
initCore();
const el = stage(), c = document.createElement('canvas'); el.appendChild(c);
const gl = c.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: false });
if (gl) {
  const vs = `#version 300 es
  in vec4 a; uniform float t; uniform vec2 rot; uniform float asp; uniform float px;
  out float vA; out float vH;
  vec3 hash3(float n){return fract(sin(vec3(n,n*1.31,n*1.73))*43758.5453);}
  void main(){
    vec3 p=a.xyz; float id=a.w; float spark=step(0.86,fract(id*0.618));
    float n=sin(p.x*4.+t*1.3)*sin(p.y*5.-t)*sin(p.z*3.+t*.7);
    p*=1.+.07*n;
    if(spark>.5){ // chispas que suben y renacen
      float life=fract(t*.18+hash3(id).x); p=normalize(p)*(1.+life*.9); p.y+=life*1.1; vA=(1.-life)*.9; }
    else vA=.55+.45*n;
    float cy=cos(rot.x),sy=sin(rot.x),cx=cos(rot.y),sx=sin(rot.y);
    p=vec3(cy*p.x+sy*p.z,p.y,-sy*p.x+cy*p.z); p=vec3(p.x,cx*p.y-sx*p.z,sx*p.y+cx*p.z);
    float z=p.z+3.2; vH=clamp(.5-p.z*.5,0.,1.);
    gl_Position=vec4(p.x/z*2.3/asp,p.y/z*2.3,0.,1.);
    gl_PointSize=px*(spark>.5?3.:2.2+1.8*vH)*(3.2/z);
  }`;
  const fs = `#version 300 es
  precision mediump float; in float vA; in float vH; uniform vec3 c1,c2; out vec4 o;
  void main(){ vec2 d=gl_PointCoord-.5; float r=length(d); if(r>.5) discard;
    float g=smoothstep(.5,0.,r); vec3 cc=mix(c1,c2,vH*vH);
    o=vec4(cc*g*vA*(.9+vH*1.2),g*vA); }`;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o)); return o; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr); gl.useProgram(pr);
  const N = innerWidth < 760 ? 6000 : 9000, d = new Float32Array(N * 4), ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = ga * i; d.set([Math.cos(th) * r, y, Math.sin(th) * r, i], i * 4); }
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, d, gl.STATIC_DRAW);
  const la = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(la); gl.vertexAttribPointer(la, 4, gl.FLOAT, false, 0, 0);
  const U = (n) => gl.getUniformLocation(pr, n), ut = U('t'), ur = U('rot'), ua = U('asp'), up = U('px');
  gl.uniform3fv(U('c1'), col('--acc')); gl.uniform3fv(U('c2'), col('--acc2'));
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.clearColor(0, 0, 0, 0);
  const s = drag(c, 0.18); let last = 0;
  loop(el, (t) => {
    const dt = Math.min(0.05, t - last); last = t; s.step(dt);
    fit(c, 1.5); gl.viewport(0, 0, c.width, c.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(ut, t); gl.uniform2f(ur, s.x, 0.25 + s.y); gl.uniform1f(ua, c.width / c.height); gl.uniform1f(up, c.height / 520);
    gl.drawArrays(gl.POINTS, 0, N);
  });
}
