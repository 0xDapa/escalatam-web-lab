// Atelier Nube — seda procedural: un solo fragment shader (domain warping + relieve iluminado). Se pausa fuera de pantalla.
const cv=document.getElementById('silk'),gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power'}),R=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FS=`precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);for(int i=0;i<4;i++){v+=a*n(p);p=R*p*2.03;a*=.5;}return v;}
float H(vec2 p){vec2 q=vec2(fbm(p+vec2(0.,t*.05)),fbm(p+vec2(5.2,1.3)-t*.04));return fbm(p*.9+2.2*q+vec2(t*.03,0.));}
void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=(gl_FragCoord.xy-.5*r)/min(r.x,r.y)*1.6;p.x+=p.y*.35;
 float e=.004;float a=H(p),bx=H(p+vec2(e,0)),by=H(p+vec2(0,e));vec3 N=normalize(vec3((a-bx)/e*.06,(a-by)/e*.06,1.));
 vec3 L=normalize(vec3(m.x-.5,m.y-.3,.9));float dif=clamp(dot(N,L),0.,1.);float spec=pow(clamp(dot(reflect(-L,N),vec3(0,0,1)),0.,1.),22.);
 vec3 c1=vec3(.80,.70,.62),c2=vec3(.93,.87,.79),c3=vec3(.85,.67,.60),c4=vec3(.42,.33,.29);
 vec3 col=mix(c1,c2,smoothstep(.25,.75,a));col=mix(col,c3,smoothstep(.55,.9,fbm(p*.6-t*.02))*.55);
 col*=.62+.5*dif;col=mix(col,c4,smoothstep(.55,.0,dif)*.35);col+=spec*.32*vec3(1.,.96,.9);
 col=mix(col,vec3(.93,.88,.82),smoothstep(.45,.0,length(uv-vec2(.5,.5)))*.35);gl_FragColor=vec4(col,1.);}`;
function sh(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s}
let ok=!!gl,P,ur,ut,um;
if(ok){P=gl.createProgram();gl.attachShader(P,sh(gl.VERTEX_SHADER,'attribute vec2 a;void main(){gl_Position=vec4(a,0,1);}'));gl.attachShader(P,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(P);
 if(!gl.getProgramParameter(P,gl.LINK_STATUS))ok=false;}
if(ok){gl.useProgram(P);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
 const l=gl.getAttribLocation(P,'a');gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,2,gl.FLOAT,false,0,0);ur=gl.getUniformLocation(P,'r');ut=gl.getUniformLocation(P,'t');um=gl.getUniformLocation(P,'m')}
// resolución reducida: la seda es suave, no necesita píxeles nativos (rinde mucho mejor en móviles).
const Q=.5;function size(){cv.width=Math.round(cv.clientWidth*Q*Math.min(devicePixelRatio,2));cv.height=Math.round(cv.clientHeight*Q*Math.min(devicePixelRatio,2));ok&&gl.viewport(0,0,cv.width,cv.height)}
size();addEventListener('resize',size);
let mx=.7,my=.75,tx=.7,ty=.75,vis=true,t0=performance.now();
addEventListener('pointermove',e=>{tx=e.clientX/innerWidth;ty=1-e.clientY/innerHeight},{passive:true});
new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)requestAnimationFrame(draw)}).observe(cv);
function draw(now){if(!ok||!vis)return;mx+=(tx-mx)*.04;my+=(ty-my)*.04;gl.uniform2f(ur,cv.width,cv.height);gl.uniform1f(ut,R?8:(now-t0)/1000+8);gl.uniform2f(um,mx,my);gl.drawArrays(gl.TRIANGLES,0,3);if(!R)requestAnimationFrame(draw)}
requestAnimationFrame(draw);
// revelados + cita (demo)
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%4)*110+'ms';io.observe(e)});
document.getElementById('go').onclick=()=>{const a=document.getElementById('s1').value,b=document.getElementById('s2').value;document.getElementById('msg').textContent=`${a} · ${b} — te escribimos para confirmar el horario (demo).`};
