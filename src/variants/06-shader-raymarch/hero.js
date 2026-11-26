// 06 — Un solo fragment shader: metal líquido (metaballs + raymarching). 0 librerías.
import { initCore, loop, col, stage, reduced } from '../../core/core.js';
initCore();
const el = stage(), c = document.createElement('canvas'); el.appendChild(c);
const gl = c.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: true });
if (gl) {
  const vs = `#version 300 es
  void main(){ vec2 p=vec2((gl_VertexID<<1)&2, gl_VertexID&2); gl_Position=vec4(p*2.-1.,0.,1.); }`;
  const fs = `#version 300 es
  precision highp float; uniform vec2 R; uniform float t; uniform vec2 M; uniform vec3 acc, acc2; out vec4 o;
  float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
  float map(vec3 p){
    float d=length(p)-.72;
    for(int i=0;i<4;i++){ float fi=float(i);
      vec3 c=vec3(sin(t*.7+fi*1.7)*.95, cos(t*.55+fi*2.3)*.75, sin(t*.45+fi*.9)*.5);
      c.xy+=M*.35*(fi==0.?1.:0.);
      d=smin(d,length(p-c)-(.28+.07*fi),.55); }
    return d; }
  vec3 nor(vec3 p){vec2 e=vec2(.002,0);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
  vec3 env(vec3 r){ // estudio procedural: softboxes + suelo + acento
    float y=r.y; vec3 c=mix(vec3(.05,.05,.06),vec3(.75,.74,.73),smoothstep(-.2,.9,y));
    c+=smoothstep(.85,.95,abs(r.x))*smoothstep(.0,.4,y)*1.4;
    c+=smoothstep(.6,.9,r.z)*smoothstep(.2,.8,y)*.8;
    c+=acc*smoothstep(.5,1.,-r.x)*smoothstep(.3,-.4,y)*1.2;
    c+=acc2*smoothstep(.6,1.,r.x)*smoothstep(-.1,-.6,y)*.6;
    return c; }
  void main(){
    vec2 uv=(gl_FragCoord.xy-.5*R)/min(R.x,R.y);
    vec3 ro=vec3(0,0,4.3), rd=normalize(vec3(uv,-1.55));
    float d=0., h; int i; for(i=0;i<64;i++){ h=map(ro+rd*d); if(h<.002||d>6.) break; d+=h; }
    if(d>6.){ o=vec4(0); return; }
    vec3 p=ro+rd*d, n=nor(p), r=reflect(rd,n);
    float f=pow(1.-max(dot(n,-rd),0.),3.);
    vec3 cR=env(r+vec3(.006,0,0)), cB=env(r-vec3(.006,0,0));
    vec3 c=vec3(cR.r,env(r).g,cB.b)*(.75+.25*f)+f*.25;
    o=vec4(c,1.); }`;
  const sh = (ty, s) => { const x = gl.createShader(ty); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(x)); return x; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr); gl.useProgram(pr);
  const U = (n) => gl.getUniformLocation(pr, n), uR = U('R'), uT = U('t'), uM = U('M');
  gl.uniform3fv(U('acc'), col('--acc')); gl.uniform3fv(U('acc2'), col('--acc2'));
  // Resolución adaptativa: empieza en 0.6× y baja si el frame tarda.
  let scale = 0.6, mx = 0, my = 0, tx = 0, ty = 0, last = 0, slow = 0;
  addEventListener('pointermove', (e) => { const r = c.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = -((e.clientY - r.top) / r.height - 0.5) * 2; }, { passive: true });
  loop(el, (t) => {
    const dt = t - last; last = t;
    if (dt > 0.034) { if (++slow > 20 && scale > 0.35) { scale -= 0.05; slow = 0; } } else slow = Math.max(0, slow - 1);
    const w = Math.round(c.clientWidth * scale * Math.min(devicePixelRatio, 2)), h = Math.round(c.clientHeight * scale * Math.min(devicePixelRatio, 2));
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
    gl.viewport(0, 0, w, h); gl.uniform2f(uR, w, h); gl.uniform1f(uT, t); gl.uniform2f(uM, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  });
}
