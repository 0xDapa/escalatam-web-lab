// Dither ordenado (Bayer 4×4) sobre la foto del hero: la imagen "se revela" desde puntos, y el cursor
// abre un claro nítido alrededor. Técnica inspirada en el hero de sondaven.com; shader propio con OGL.
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
export function dither(canvas, src, onReady) {
  const renderer = new Renderer({ canvas, dpr: Math.min(devicePixelRatio, 1.5), alpha: false, antialias: false });
  const gl = renderer.gl, tex = new Texture(gl, { generateMipmaps: false });
  const img = new Image(); img.decoding = 'async'; img.src = src;
  const u = { t: { value: tex }, res: { value: [1, 1] }, ir: { value: [1, 1] }, p: { value: 0 }, m: { value: [-9, -9] }, r: { value: 0 } };
  const program = new Program(gl, { vertex: `attribute vec2 position,uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`,
    fragment: `precision highp float;varying vec2 vUv;uniform sampler2D t;uniform vec2 res,ir,m;uniform float p,r;
    float bayer(vec2 c){vec2 q=mod(floor(c),4.);int i=int(q.x+q.y*4.);
      float b[16];b[0]=0.;b[1]=8.;b[2]=2.;b[3]=10.;b[4]=12.;b[5]=4.;b[6]=14.;b[7]=6.;b[8]=3.;b[9]=11.;b[10]=1.;b[11]=9.;b[12]=15.;b[13]=7.;b[14]=13.;b[15]=5.;
      for(int k=0;k<16;k++){if(k==i)return b[k]/16.;}return 0.;}
    void main(){float sa=res.x/res.y,ia=ir.x/ir.y;vec2 uv=vUv;
      if(sa>ia){uv.y=(uv.y-.5)*ia/sa+.5;}else{uv.x=(uv.x-.5)*sa/ia+.5;}
      vec3 c=texture2D(t,uv).rgb;float l=dot(c,vec3(.299,.587,.114));
      vec2 px=gl_FragCoord.xy/3.;float d=step(bayer(px),l);
      vec3 ink=vec3(.125,.188,.172),paper=vec3(.87,.89,.86);vec3 dt=mix(ink,paper,d);
      float near=1.-smoothstep(r*.6,r,distance(gl_FragCoord.xy,m));
      float k=clamp(p+near,0.,1.);gl_FragColor=vec4(mix(dt,c,k),1.);}` , uniforms: u });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
  const size = () => { const w = canvas.parentElement.clientWidth, h = canvas.parentElement.clientHeight; renderer.setSize(w, h); u.res.value = [gl.canvas.width, gl.canvas.height]; u.r.value = Math.min(w, h) * .32 * renderer.dpr; };
  addEventListener('resize', size); size();
  canvas.parentElement.parentElement.addEventListener('pointermove', e => { const b = canvas.getBoundingClientRect(); u.m.value = [(e.clientX - b.left) * renderer.dpr, (b.bottom - e.clientY) * renderer.dpr]; });
  let raf = 0, vis = true;
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) loop(); }).observe(canvas);
  const loop = () => { raf = vis ? requestAnimationFrame(loop) : 0; renderer.render({ scene: mesh }); };
  img.onload = () => { tex.image = img; u.ir.value = [img.naturalWidth, img.naturalHeight]; loop(); onReady(u); };
}
