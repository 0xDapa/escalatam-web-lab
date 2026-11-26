// Núcleo — micro-interacciones sin librerías.
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],R=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Spotlight: la posición del cursor se pasa a cada tarjeta como --x/--y.
addEventListener('pointermove',e=>{for(const c of $$('.c')){const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}},{passive:true});
// Entrada escalonada.
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);e.target.dispatchEvent(new Event('enter'))}}),{threshold:.12});
$$('.c').forEach((c,i)=>{c.style.transitionDelay=(i%6)*70+'ms';io.observe(c)});
// Contador animado.
const count=(el,to,dur=900,fmt=v=>Math.round(v))=>{if(R){el.textContent=fmt(to);return}const f=+el.dataset.v||0,t0=performance.now();el.dataset.v=to;
 (function s(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,4);el.textContent=fmt(f+(to-f)*e);if(k<1)requestAnimationFrame(s)})(t0)};
// Aforo: curva típica del día + ruido; se actualiza cada 4 s.
const curve=h=>Math.max(6,Math.round(18+52*Math.exp(-((h-7.5)**2)/3)+64*Math.exp(-((h-19)**2)/4)+20*Math.exp(-((h-13)**2)/2)));
const bars=$('#bars');for(let h=5;h<=23;h++){const i=document.createElement('i');i.style.height='4%';i.dataset.h=h;bars.append(i)}
function occ(){const n=new Date(),h=n.getHours()+n.getMinutes()/60,hh=h<5||h>23?19:h,v=Math.min(96,curve(hh)+Math.round(Math.random()*6-3));
 count($('#occ'),v);$('#arc').setAttribute('stroke-dasharray',`${292*v/100} 390`);$('#occt').textContent=v<45?'Buen momento para venir':v<75?'Movimiento normal':'Hora punta: mejor en 1 h';
 [...bars.children].forEach(b=>{b.style.height=curve(+b.dataset.h)+'%';b.classList.toggle('now',+b.dataset.h===Math.floor(hh))})}
$('.occ').addEventListener('enter',()=>{occ();setInterval(occ,4000)},{once:true});
// ECG / pulso en canvas.
const cv=$('#ecg'),cx=cv.getContext('2d');let pts=[],ph=0;
function size(){const r=cv.getBoundingClientRect(),d=Math.min(2,devicePixelRatio);cv.width=r.width*d;cv.height=r.height*d;cx.setTransform(d,0,0,d,0,0)}size();addEventListener('resize',size);
function beat(p){p%=1;return p<.05?Math.sin(p/.05*Math.PI)*.15:p<.1?0:p<.13?-.25:p<.17?1:p<.21?-.4:p<.3?0:p<.42?Math.sin((p-.3)/.12*Math.PI)*.25:0}
// Sólo se dibuja cuando el canvas está en pantalla, a ~30 fps, y arranca cuando el navegador está libre (TBT ≈ 0).
let vis=false,last=0,grad=null,gw=0;new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(cv);
function ecg(t){requestAnimationFrame(ecg);if(!vis||t-last<33)return;last=t;const w=cv.clientWidth,h=cv.clientHeight;ph+=.028;pts.push(beat(ph));if(pts.length>w/4)pts.shift();cx.clearRect(0,0,w,h);
 if(!grad||gw!==w){grad=cx.createLinearGradient(0,0,w,0);grad.addColorStop(0,'rgba(198,244,50,0)');grad.addColorStop(1,'#c6f432');gw=w}cx.strokeStyle=grad;cx.lineWidth=2;cx.beginPath();
 pts.forEach((v,i)=>{const x=w-(pts.length-i)*4,y=h*.62-v*h*.5;i?cx.lineTo(x,y):cx.moveTo(x,y)});cx.stroke()}
const idle=f=>addEventListener('load',()=>setTimeout(()=>(window.requestIdleCallback||setTimeout)(f),1200),{once:true});
idle(()=>{if(!R)requestAnimationFrame(ecg);setInterval(()=>count($('#bpm'),136+Math.round(Math.random()*16)),2500)});
// Horario por día con indicador elástico.
const D=['L','M','X','J','V','S'],C=[['06:00','Fuerza base','Andrea R.',4],['07:15','HIIT 30','Víctor M.',2],['12:30','Movilidad','Julia T.',9],['18:00','Halterofilia','Andrea R.',1],['19:15','Funcional','Víctor M.',6],['20:30','Core & cardio','Julia T.',11]];
const tabs=$('#tabs');D.forEach((d,i)=>{const b=document.createElement('button');b.role='tab';b.textContent=d;b.setAttribute('aria-selected',i==0);b.onclick=()=>sel(i);tabs.append(b)});
function sel(i){$$('#tabs button').forEach((b,j)=>b.setAttribute('aria-selected',i==j));$('#ind').style.transform=`translateX(${i*50}px)`;
 $('#cls').innerHTML=C.map((c,j)=>{const s=(c[3]+i*3+j)%12;return `<li style="animation-delay:${j*50}ms"><time>${c[0]}</time><div><b>${c[1]}</b><small>${c[2]} · 45 min</small></div><span class="spots ${s<3?'low':''}">${s?s+' plazas':'Lista de espera'}</span><button class="btn bk" type="button">${s?'Reservar':'Avisarme'}</button></li>`}).join('');
 $$('.bk').forEach(b=>b.onclick=()=>{b.classList.toggle('done');b.textContent=b.classList.contains('done')?'✓ Lista':'Reservar';b.animate([{transform:'scale(.9)'},{transform:'scale(1.06)'},{transform:'none'}],{duration:380,easing:'cubic-bezier(.34,1.5,.5,1)'})})}
sel(0);
// Objetivo semanal.
const wk=$('#week');'LMXJVSD'.split('').forEach((d,i)=>{const s=document.createElement('span');s.textContent=d;if([0,2,3].includes(i))s.className='on';wk.append(s)});
$('.goal').addEventListener('enter',()=>{$('#ring').setAttribute('stroke-dasharray',`${340*3/4} 340`);let k=0;const t=setInterval(()=>{$('#gt').textContent=`${++k}/4`;if(k>=3)clearInterval(t)},R?0:300)},{once:true});
// Toggle de plan con precio animado.
$('#sw').onclick=e=>{const on=e.currentTarget.getAttribute('aria-checked')!=='true';e.currentTarget.setAttribute('aria-checked',on);count($('#pr'),on?151:189,600)};
$('#join').onclick=e=>{const b=e.currentTarget;b.textContent='✓ ¡Te esperamos! (demo)';b.animate([{transform:'scale(.95)'},{transform:'none'}],{duration:300})};
// Testimonios rotando.
const Q=[['“Llegué sin saber hacer una sentadilla. A los tres meses levanté mi peso corporal.”','Lucía, socia desde 2025'],['“El aforo en vivo me salva: vengo cuando la sala está tranquila.”','Diego, entrena a las 6:00'],['“Los coaches corrigen de verdad, no sólo cuentan repeticiones.”','Marisol, halterofilia']];
let qi=0;function q(){const p=$('#q');p.style.opacity=0;setTimeout(()=>{p.textContent=Q[qi][0];$('#qa').textContent=Q[qi][1];p.style.opacity=1;qi=(qi+1)%Q.length},R?0:300)}q();setInterval(q,5000);
// Mapa de constancia (90 días, determinista).
const cal=$('#cal');for(let i=0;i<90;i++){const v=(Math.sin(i*1.7)+Math.sin(i*.37)+2)/4,w=i%7==6?v*.3:v,el=document.createElement('i');el.style.background=`rgba(198,244,50,${(.08+w*.85).toFixed(2)})`;el.title=`Día ${i+1}`;cal.append(el)}
