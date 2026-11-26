(()=>{var E=matchMedia("(prefers-reduced-motion: reduce)").matches,S=(n,s=0,o=1)=>Math.min(o,Math.max(s,n));window.__frames=0;function A(n,s){let o=!0,e=!0,i=0,p=performance.now(),x=c=>{i=0,!(!o||!e)&&(window.__frames++,s((c-p)/1e3),i=requestAnimationFrame(x))},l=()=>{!i&&o&&e&&!E&&(i=requestAnimationFrame(x))};return new IntersectionObserver(([c])=>{o=c.isIntersecting,l()}).observe(n),document.addEventListener("visibilitychange",()=>{e=!document.hidden,l()}),E?requestAnimationFrame(()=>s(1.5)):l(),{kick:l}}var R=(n,s)=>n.toLocaleString("es-ES",{minimumFractionDigits:s,maximumFractionDigits:s});function C(n,s=1600){let o=+n.dataset.to,e=+(n.dataset.dec||0),i=n.dataset.pre||"",p=n.dataset.suf||"";if(E){n.textContent=i+R(o,e)+p;return}let x=performance.now(),l=c=>{let f=S((c-x)/s),v=1-Math.pow(2,-10*f);n.textContent=i+R(o*(f>=1?1:v),e)+p,f<1&&requestAnimationFrame(l)};requestAnimationFrame(l)}function b(n={}){let s=document.documentElement;if(!n.noReveal){let u=new IntersectionObserver(a=>a.forEach(r=>{r.isIntersecting&&(r.target.classList.add("in"),u.unobserve(r.target))}),{threshold:.2});document.querySelectorAll(".rv,.fu").forEach(a=>u.observe(a))}if(!n.noCount){let u=new IntersectionObserver(a=>a.forEach(r=>{r.isIntersecting&&(r.target.classList.add("in"),C(r.target.querySelector(".n")),u.unobserve(r.target))}),{threshold:.6});document.querySelectorAll(".nums li").forEach(a=>u.observe(a))}let o=document.querySelector(".hz"),e=document.querySelector(".svc"),i=e&&e.querySelector(".strip"),p=e&&e.querySelector(".giant"),x=e?[...e.querySelectorAll(".card")]:[],l=0,c=()=>{e&&(l=Math.max(0,i.scrollWidth-innerWidth+40),e.style.height=innerHeight+l+"px")},f=!1,v=()=>{f=!1;let u=scrollY,a=innerHeight;if(o&&!n.noHorizon){let r=o.getBoundingClientRect();o.style.setProperty("--p",S(-r.top/(r.height-a)).toFixed(4))}if(e){let r=e.getBoundingClientRect(),d=S(-r.top/Math.max(1,r.height-a));i.style.transform=`translate3d(${-d*l}px,-50%,0)`,p&&(p.style.transform=`translate3d(${-d*35}%,0,0)`),e.style.setProperty("--sp",d.toFixed(4));let h=innerWidth*.85;x.forEach(m=>m.classList.toggle("on",m.getBoundingClientRect().left<h))}n.onScroll&&n.onScroll(u,a)},y=()=>{f||(f=!0,requestAnimationFrame(v))};return addEventListener("scroll",y,{passive:!0}),addEventListener("resize",()=>{c(),y()}),c(),v(),document.fonts&&document.fonts.ready.then(()=>{c(),v()}),requestAnimationFrame(()=>document.querySelectorAll(".hero .rv").forEach(u=>u.classList.add("in"))),{update:y,size:c}}function M(n){let s=getComputedStyle(document.documentElement).getPropertyValue(n).trim(),o=parseInt(s.slice(1),16);return[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255]}var q=()=>document.getElementById("stage");b();var L=q(),g=document.createElement("canvas");L.appendChild(g);var t=g.getContext("webgl2",{antialias:!1,alpha:!0,premultipliedAlpha:!0});if(t){let n=`#version 300 es
  void main(){ vec2 p=vec2((gl_VertexID<<1)&2, gl_VertexID&2); gl_Position=vec4(p*2.-1.,0.,1.); }`,s=`#version 300 es
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
    o=vec4(c,1.); }`,o=(d,h)=>{let m=t.createShader(d);return t.shaderSource(m,h),t.compileShader(m),t.getShaderParameter(m,t.COMPILE_STATUS)||console.error(t.getShaderInfoLog(m)),m},e=t.createProgram();t.attachShader(e,o(t.VERTEX_SHADER,n)),t.attachShader(e,o(t.FRAGMENT_SHADER,s)),t.linkProgram(e),t.useProgram(e);let i=d=>t.getUniformLocation(e,d),p=i("R"),x=i("t"),l=i("M");t.uniform3fv(i("acc"),M("--acc")),t.uniform3fv(i("acc2"),M("--acc2"));let c=.6,f=0,v=0,y=0,u=0,a=0,r=0;addEventListener("pointermove",d=>{let h=g.getBoundingClientRect();y=((d.clientX-h.left)/h.width-.5)*2,u=-((d.clientY-h.top)/h.height-.5)*2},{passive:!0}),A(L,d=>{let h=d-a;a=d,h>.034?++r>20&&c>.35&&(c-=.05,r=0):r=Math.max(0,r-1);let m=Math.round(g.clientWidth*c*Math.min(devicePixelRatio,2)),w=Math.round(g.clientHeight*c*Math.min(devicePixelRatio,2));(g.width!==m||g.height!==w)&&(g.width=m,g.height=w),f+=(y-f)*.06,v+=(u-v)*.06,t.viewport(0,0,m,w),t.uniform2f(p,m,w),t.uniform1f(x,d),t.uniform2f(l,f,v),t.drawArrays(t.TRIANGLES,0,3)})}})();
