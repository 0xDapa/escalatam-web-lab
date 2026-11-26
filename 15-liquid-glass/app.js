// Aura — liquid glass. El filtro SVG en backdrop-filter sólo funciona en Chromium; en el resto queda el vidrio esmerilado.
const d=document,H=d.documentElement,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)],R=matchMedia('(prefers-reduced-motion: reduce)').matches;
H.classList.remove('no-js');
if(navigator.userAgentData&&navigator.userAgentData.brands.some(b=>/Chromium/.test(b.brand)))H.classList.add('lg');
// Lente que sigue el cursor (en táctil flota sola) + parallax de esferas.
const lens=$('#lensbox'),orbs=$$('.orb');let tx=innerWidth*.62,ty=innerHeight*.34,x=tx,y=ty,mx=0,my=0,hover=matchMedia('(hover:hover)').matches,last=0;
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;tx=e.clientX;ty=e.clientY+scrollY;mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;last=performance.now()},{passive:true});
function loop(t){if(!hover||t-last>2500){const m=innerWidth<700;tx=innerWidth*(m?.72+.1*Math.sin(t/2600):.55+.22*Math.sin(t/2600));ty=innerHeight*(m?.17+.05*Math.sin(t/1900):.38+.16*Math.sin(t/1900))}
 x+=(tx-x)*.08;y+=(ty-y)*.08;const s=lens.offsetWidth/2;lens.style.transform=`translate3d(${x-s}px,${y-s}px,0)`;
 orbs.forEach(o=>{const k=+o.dataset.d;o.style.transform=`translate3d(${mx*k}px,${my*k-scrollY*k*.01}px,0)`});requestAnimationFrame(loop)}
if(!R)requestAnimationFrame(loop);else lens.style.transform=`translate(${innerWidth*.6}px,${innerHeight*.3}px)`;
// Revelado al entrar en pantalla.
const io=new IntersectionObserver(es=>es.forEach((e,i)=>{if(e.isIntersecting){e.target.style.transitionDelay=(i%4)*90+'ms';e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(e=>io.observe(e));
// Diagnóstico exprés.
const RT={seca:['Recuperar la barrera',[['Limpieza en crema','mañana y noche'],['Sérum de hialurónico','mañana'],['Crema con ceramidas','noche'],['Hidratación profunda en clínica','1 / mes']]],
manchas:['Unificar el tono',[['Vitamina C estable','mañana'],['Protector SPF 50','cada 3 h al sol'],['Retinoide suave','3 noches / sem.'],['Láser de manchas','3 sesiones']]],
acne:['Calmar y prevenir',[['Gel limpiador suave','mañana y noche'],['Niacinamida 5 %','mañana'],['Ácido azelaico','noche'],['Consulta de dermatología','valoración']]],
apagada:['Devolver la luz',[['Exfoliante enzimático','2 / sem.'],['Antioxidante','mañana'],['Hidratante ligera','mañana y noche'],['Peeling médico','cada 6 sem.']]]};
function setR(k){const [h,it]=RT[k],ol=$('#rt');ol.classList.add('swap');setTimeout(()=>{$('#rt-h').textContent=h;ol.innerHTML=it.map(([a,b])=>`<li><b>${a}</b><span>${b}</span></li>`).join('');
 requestAnimationFrame(()=>{[...ol.children].forEach((li,i)=>li.style.transitionDelay=i*70+'ms');ol.classList.remove('swap')})},R?0:220)}
$$('.chip').forEach(c=>c.onclick=()=>{$$('.chip').forEach(b=>b.setAttribute('aria-pressed','false'));c.setAttribute('aria-pressed','true');setR(c.dataset.k)});setR('seca');
// Widget de reserva (demo, no envía nada).
const DN=['dom','lun','mar','mié','jue','vie','sáb'],days=$('#days'),slots=$('#slots');let sd=null,ss=null;const base=new Date();
for(let i=0;i<7;i++){const dt=new Date(base);dt.setDate(base.getDate()+i+1);const b=d.createElement('button');b.className='day';b.type='button';b.setAttribute('aria-pressed',i?'false':'true');b.innerHTML=`${DN[dt.getDay()]}<b>${dt.getDate()}</b>`;b.onclick=()=>pick(b,dt,i);days.append(b);if(!i)sd=dt}
function pick(b,dt,i){$$('.day').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');sd=dt;fillS(i)}
function fillS(seed){slots.innerHTML='';['10:00','10:45','11:30','12:15','16:00','16:45','17:30','18:15'].forEach((h,j)=>{const b=d.createElement('button');b.className='slot';b.type='button';b.textContent=h;b.disabled=((j*7+seed*3)%5)===0;b.setAttribute('aria-pressed','false');
 b.onclick=()=>{$$('.slot').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');ss=h;$('#sum').textContent=`${DN[sd.getDay()]} ${sd.getDate()} · ${h} · Valoración 45 min`};slots.append(b)})}
fillS(0);$('#ok').onclick=()=>{$('#sum').textContent=ss?`✓ Reserva de demo creada: ${DN[sd.getDay()]} ${sd.getDate()} a las ${ss}.`:'Elige primero una hora'};
