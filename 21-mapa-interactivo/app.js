// Raíz — mapa procedural en SVG (calles en cuadrícula girada, parques, rambla), pines HTML proyectados, rutas a pie animadas.
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],NS='http://www.w3.org/2000/svg',R=matchMedia('(prefers-reduced-motion: reduce)').matches;
const svg=$('#map'),wrap=$('#mapw'),W0=1600,H0=1000,CELL=110,X0=-440,Y0=-440,ANG=-10*Math.PI/180,CX=800,CY=500;
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.append(e);return e};
const rot=(x,y)=>{const dx=x-CX,dy=y-CY;return[CX+dx*Math.cos(ANG)-dy*Math.sin(ANG),CY+dx*Math.sin(ANG)+dy*Math.cos(ANG)]};
const coast=x=>790+38*Math.sin(x/170)+18*Math.sin(x/61);
const sx=k=>X0+k*CELL,sy=k=>Y0+k*CELL,isAve=k=>k%4===0,sw=k=>isAve(k)?26:13;
// --- dibujo base ---
const defs=el('defs',{},svg);let landD='M-400 -400 H2000';for(let x=2000;x>=-400;x-=20)landD+=` L${x} ${coast(x).toFixed(1)}`;landD+=' Z';
el('path',{d:landD},el('clipPath',{id:'land'},defs));
el('rect',{x:-600,y:-600,width:2800,height:2200,fill:'#b8d2d6'},svg);
for(let i=0;i<6;i++){let d='M-400 '+(coast(-400)+30+i*34);for(let x=-400;x<=2000;x+=40)d+=` L${x} ${(coast(x)+30+i*34+6*Math.sin(x/40+i)).toFixed(1)}`;el('path',{d,fill:'none',stroke:'#cfe3e5','stroke-width':2,opacity:.8},svg)}
el('path',{d:landD,fill:'#e9dcc2'},svg);// arena
let land2='M-400 -400 H2000';for(let x=2000;x>=-400;x-=20)land2+=` L${x} ${(coast(x)-26).toFixed(1)}`;land2+=' Z';el('path',{d:land2,fill:'#ece7dd'},svg);
const city=el('g',{'clip-path':'url(#land)'},svg),G=el('g',{transform:`rotate(${-10} ${CX} ${CY})`},city);
el('rect',{x:-600,y:-600,width:2800,height:2200,fill:'#ffffff'},G);// calles = fondo blanco
const parks=new Set(['6,7','7,7','11,5','3,10','12,9']),seedR=(i,j)=>((Math.sin(i*12.9898+j*78.233)*43758.5453)%1+1)%1;
for(let i=0;i<24;i++)for(let j=0;j<20;j++){const x=sx(i)+sw(i)/2,y=sy(j)+sw(j)/2,w=CELL-sw(i)/2-sw(i+1)/2,h=CELL-sw(j)/2-sw(j+1)/2,pk=parks.has(i+','+j);
 el('rect',{x,y,width:w,height:h,rx:6,fill:pk?'#cddcbc':'#e2dbcf'},G);
 if(pk){for(let t=0;t<9;t++)el('circle',{cx:x+10+seedR(i+t,j)*(w-20),cy:y+10+seedR(j+t,i)*(h-20),r:5+seedR(t,i+j)*4,fill:'#b2c99d'},G)}
 else if(seedR(i,j)>.35){// edificios dentro de la manzana
  const n=2+Math.floor(seedR(j,i)*3);for(let b=0;b<n;b++){const bw=(w-12)/n;el('rect',{x:x+6+b*bw,y:y+6,width:bw-4,height:h*.38,rx:2,fill:'#d6cebf'},G);el('rect',{x:x+6+b*bw,y:y+h*.56,width:bw-4,height:h*.38,rx:2,fill:'#d6cebf'},G)}}}
// avenida diagonal + línea de ómnibus + nombres
el('path',{d:'M-300 1300 L1900 -260',stroke:'#fff',fill:'none','stroke-width':34},G);el('path',{d:'M-300 1300 L1900 -260',stroke:'#f2d48a',fill:'none','stroke-width':2,'stroke-dasharray':'14 10'},G);
const BUSX=sx(8);el('path',{d:`M${BUSX} -400 V1400`,stroke:'#2f6b8f','stroke-width':4,fill:'none','stroke-dasharray':'2 8','stroke-linecap':'round'},G);
const STOPS=[3,5,7,9,11].map(j=>[BUSX,sy(j)]);STOPS.forEach(([x,y])=>{el('circle',{cx:x,cy:y,r:9,fill:'#2f6b8f',stroke:'#fff','stroke-width':3},G)});
const T=(x,y,t,a=0)=>{const e=el('text',{x,y,transform:a?`rotate(${a} ${x} ${y})`:'', 'font-family':'IBM Plex Mono','font-size':12,fill:'#8b877f','letter-spacing':'1.5'},G);e.textContent=t};
T(sx(4)+6,sy(6)-20,'AV. DE LOS FAROS',90);T(sx(12)+6,sy(4)-20,'AV. JACARANDÁ',90);T(sx(9),sy(8)-5,'CALLE MIRADOR');T(sx(5),sy(4)-5,'CALLE DEL CEIBO');T(sx(10),sy(12)-5,'RAMBLA SUR');
// colegio
const SCHOOL=[sx(10)+55,sy(6)+55];el('rect',{x:SCHOOL[0]-40,y:SCHOOL[1]-34,width:80,height:68,rx:6,fill:'#f1c58e'},G);
// --- datos (ficticios) ---
const P=[{t:'Ático con terraza',a:'Calle Mirador 2140',op:'venta',p:'US$ 289.000',d:3,m:118,pet:1,g:[9,8]},{t:'Apartamento luminoso',a:'Av. Jacarandá 870',op:'alquiler',p:'$ 38.000 / mes',d:2,m:72,pet:0,g:[12,7]},
{t:'Casa con patio',a:'Calle del Ceibo 1312',op:'venta',p:'US$ 410.000',d:4,m:190,pet:1,g:[5,5]},{t:'Monoambiente frente al mar',a:'Rambla Sur 3020',op:'alquiler',p:'$ 26.500 / mes',d:1,m:38,pet:1,g:[10,11]},
{t:'Dúplex reciclado',a:'Av. de los Faros 455',op:'venta',p:'US$ 236.000',d:2,m:96,pet:0,g:[4,8]},{t:'Planta baja con jardín',a:'Calle Mirador 1880',op:'alquiler',p:'$ 45.000 / mes',d:3,m:110,pet:1,g:[7,9]},
{t:'Penthouse vista rambla',a:'Rambla Sur 2650',op:'venta',p:'US$ 520.000',d:3,m:160,pet:0,g:[13,10]},{t:'Apartamento para estrenar',a:'Calle del Ceibo 990',op:'alquiler',p:'$ 33.000 / mes',d:2,m:64,pet:1,g:[8,6]}];
P.forEach((p,i)=>{p.x=sx(p.g[0])+CELL/2;p.y=sy(p.g[1])+CELL/2;p.i=i});
const routesG=el('g',{},G);
// --- cámara (viewBox) ---
let vb={x:0,y:0,w:W0,h:H0};const box=()=>wrap.getBoundingClientRect();
function fit(){const r=box(),k=Math.max(r.width/W0,r.height/H0);vb={w:r.width/k*1.0,h:r.height/k,x:0,y:0};vb.x=(W0-vb.w)/2;vb.y=(H0-vb.h)/2-60;apply()}
function apply(){svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);place()}
function toScreen(x,y){const r=box(),[X,Y]=rot(x,y),k=r.width/vb.w;return[(X-vb.x)*k,(Y-vb.y)*k]}
svg.setAttribute('preserveAspectRatio','xMidYMid meet');
// pines
const pins=$('#pins');P.forEach(p=>{const b=document.createElement('button');b.className='pin';b.textContent=p.p.replace(' / mes','').replace('US$ ','US$');b.setAttribute('aria-label',`${p.t}, ${p.p}`);b.onclick=()=>open(p.i);p.el=b;pins.append(b)});
const pois=[['🎒',...SCHOOL],...STOPS.map(s=>['🚌',...s])].map(([e,x,y])=>{const d=document.createElement('span');d.className='poi';d.textContent=e;d.setAttribute('aria-hidden','true');pins.append(d);return{d,x,y}});
function place(){P.forEach(p=>{const[a,b]=toScreen(p.x,p.y);p.el.style.left=a+'px';p.el.style.top=b+'px'});pois.forEach(o=>{const[a,b]=toScreen(o.x,o.y);o.d.style.left=a+'px';o.d.style.top=b+'px'})}
function fly(to,ms=900){if(R)ms=0;const from={...vb},t0=performance.now();return new Promise(res=>{(function s(t){const k=ms?Math.min(1,(t-t0)/ms):1,e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
 for(const q in vb)vb[q]=from[q]+(to[q]-from[q])*e;apply();k<1?requestAnimationFrame(s):res()})(t0)})}
function zoom(f,cx,cy){const r=box(),k=r.width/vb.w,wx=vb.x+cx/k,wy=vb.y+cy/k,nw=Math.max(280,Math.min(2200,vb.w*f)),nh=nw*vb.h/vb.w;vb={x:wx-(cx/r.width)*nw,y:wy-(cy/r.height)*nh,w:nw,h:nh};apply()}
// pan + rueda + pellizco
const pts=new Map();let last=null,pd=0;
wrap.addEventListener('pointerdown',e=>{if(e.target.closest('button,.detail'))return;wrap.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);wrap.classList.add('drag');$('#hint').style.opacity=0});
wrap.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const prev=pts.get(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);const k=box().width/vb.w;
 if(pts.size===1){vb.x-=(e.clientX-prev[0])/k;vb.y-=(e.clientY-prev[1])/k;apply()}else if(pts.size===2){const [a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pd){const r=box();zoom(pd/d,(a[0]+b[0])/2-r.left,(a[1]+b[1])/2-r.top)}pd=d}});
const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pd=0;if(!pts.size)wrap.classList.remove('drag')};wrap.addEventListener('pointerup',up);wrap.addEventListener('pointercancel',up);
wrap.addEventListener('wheel',e=>{e.preventDefault();const r=box();zoom(Math.exp(e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top)},{passive:false});
$('#zin').onclick=()=>{const r=box();zoom(.7,r.width/2,r.height/2)};$('#zout').onclick=()=>{const r=box();zoom(1.4,r.width/2,r.height/2)};$('#zre').onclick=()=>{close();const o={...vb};fit();const t={...vb};vb=o;fly(t)};
// rutas a pie (por calles: tramos en L sobre la cuadrícula)
const snap=v=>Math.round((v-X0)/CELL)*CELL+X0;
function route(a,b,cls){const ax=snap(a[0]),ay=snap(a[1]),bx=snap(b[0]),by=snap(b[1]);const pts=[a,[ax,a[1]],[ax,ay],[bx,ay],[bx,by],b];let L=0;for(let i=1;i<pts.length;i++)L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
 el('path',{d:'M'+pts.map(p=>p.join(' ')).join(' L'),class:'route '+cls,style:`--l:${L.toFixed(0)}`},routesG);return Math.max(2,Math.round(L/75))}
let curI=-1;
function open(i){const p=P[i];curI=i;P.forEach(q=>q.el.classList.toggle('on',q===p));$$('.card').forEach((c,j)=>c.setAttribute('aria-current',j===i));
 routesG.innerHTML='';const beach=[p.x,sy(12)];const bus=STOPS.reduce((m,s)=>Math.hypot(s[0]-p.x,s[1]-p.y)<Math.hypot(m[0]-p.x,m[1]-p.y)?s:m);
 $('#w1').textContent=route([p.x,p.y],[snap(p.x),sy(12)+20],'')+' min';$('#w2').textContent=route([p.x,p.y],SCHOOL,'c')+' min';$('#w3').textContent=route([p.x,p.y],bus,'b')+' min';
 $('#d-op').textContent=(p.op==='venta'?'En venta':'En alquiler')+(p.pet?' · Admite mascotas':'');$('#d-t').textContent=p.t+' · '+p.a;$('#d-p').textContent=p.p;$('#d-f').textContent=`${p.d} dorm. · ${p.m} m² · ref. RZ-${120+i}`;
 $('#detail').classList.add('on');const r=box(),[X,Y]=rot(p.x,p.y),w=Math.min(900,Math.max(560,vb.w*.7)),h=w*r.height/r.width,mob=r.width<600;
 fly({x:X-w/2,y:Y-h*(mob?.32:.42),w,h})}
function close(){$('#detail').classList.remove('on');routesG.innerHTML='';P.forEach(q=>q.el.classList.remove('on'));$$('.card').forEach(c=>c.setAttribute('aria-current','false'))}
$('#dx').onclick=close;$('#visit').onclick=e=>e.currentTarget.textContent='✓ Te llamamos hoy (demo)';$('#share').onclick=e=>e.currentTarget.textContent='Enlace copiado (demo)';
// lista + filtros
const col=['#cfd9c4','#e8cdb5','#c9d6dc','#e6d3c2'];
function list(){const f=$('.chip[aria-pressed=true]').dataset.f;const ok=p=>f==='all'||p.op===f||(f==='dorm'&&p.d>=3)||(f==='pet'&&p.pet);
 const vis=P.filter(ok);$('#count').textContent=`${vis.length} propiedades en el mapa`;
 $('#list').innerHTML=vis.map(p=>`<li><button class="card" data-i="${p.i}" aria-current="${p.i===curI}"><span class="thumb" style="background:linear-gradient(160deg,${col[p.i%4]},#fff)"><svg viewBox="0 0 86 74" width="86" height="74" aria-hidden="true"><rect x="18" y="${30-p.d*3}" width="50" height="${44+p.d*3}" fill="#fff" opacity=".85"/>${Array.from({length:6},(_,k)=>`<rect x="${24+(k%3)*14}" y="${36-p.d*3+Math.floor(k/3)*14}" width="8" height="9" fill="${k%2?'#d4572a':'#1c1c1a'}" opacity=".7"/>`).join('')}</svg></span><span><b>${p.p}</b><span class="addr">${p.t}<span class="op">${p.op}</span></span><span class="feat"><span>${p.d} dorm</span><span>${p.m} m²</span>${p.pet?'<span>🐾</span>':''}</span></span></button></li>`).join('');
 $$('.card').forEach(c=>c.onclick=()=>open(+c.dataset.i));P.forEach(p=>p.el.classList.toggle('dim',!ok(p)))}
$$('.chip').forEach(c=>c.onclick=()=>{$$('.chip').forEach(x=>x.setAttribute('aria-pressed','false'));c.setAttribute('aria-pressed','true');list()});
list();fit();addEventListener('resize',()=>{curI>=0?apply():fit()});
