// Bar Trueno — tipografía cinética sin librerías.
const R=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// 1) Hero: cada letra cambia ancho (wdth) y peso (wght) según la distancia al cursor; en táctil, ola automática.
const kin=$('#kin'),L=[...kin.children];let px=-1e4,py=0,auto=!matchMedia('(hover:hover)').matches,cur=L.map(()=>({w:100,g:800}));
addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){px=e.clientX;py=e.clientY;auto=false}},{passive:true});
function kinFrame(t){const r=kin.getBoundingClientRect();
 if(r.bottom>0&&r.top<innerHeight){L.forEach((s,i)=>{const b=s.getBoundingClientRect(),cx=b.left+b.width/2;
  let k=auto||px<-1e3?(Math.sin(t/650+i*.9)*.5+.5):Math.max(0,1-Math.abs(px-cx)/(innerWidth*.28));
  const tw=62+k*63,tg=200+k*700;cur[i].w+=(tw-cur[i].w)*.12;cur[i].g+=(tg-cur[i].g)*.12;
  s.style.fontStretch=cur[i].w.toFixed(1)+'%';s.style.fontWeight=cur[i].g.toFixed(0)})}
 requestAnimationFrame(kinFrame)}
if(!R)requestAnimationFrame(kinFrame);
// 2) Marquesinas: velocidad base + empujón por velocidad de scroll (y sesgo).
const words=['Cócteles de autor','✶','Vermut de grifo','✶','Vinilos los jueves','✶','Mezcal de Oaxaca','✶'];
const fill=(el,rev)=>{const s=(rev?[...words].reverse():words).map(w=>`<span>${w}</span>`).join('');el.innerHTML=s+s+s+s};
fill($('#t1'));fill($('#t2'),1);
let x1=0,x2=0,ly=scrollY,vel=0;
function mq(){const dy=scrollY-ly;ly=scrollY;vel+=(dy-vel)*.1;const v=1+Math.min(Math.abs(vel),60)*.35;
 const w1=$('#t1').scrollWidth/4,w2=$('#t2').scrollWidth/4;x1=(x1-v)%w1;x2=(x2+v)%w2;
 $('#t1').style.transform=`translateX(${x1}px) skewX(${Math.max(-12,Math.min(12,-vel*.4))}deg)`;
 $('#t2').style.transform=`translateX(${x2-w2}px)`;requestAnimationFrame(mq)}
if(!R)requestAnimationFrame(mq);
// 3) Manifiesto: el peso y el ancho de cada línea siguen la posición en pantalla.
const W=$$('.mani .w');function mani(){W.forEach((p,i)=>{const r=p.getBoundingClientRect(),k=Math.max(0,Math.min(1,1-(r.top+r.height/2)/innerHeight));
 p.style.fontWeight=Math.round(200+k*700);p.style.fontStretch=(62+k*63).toFixed(0)+'%';p.style.transform=`translateX(${(i%2?1:-1)*(1-k)*8}vw)`})}
if(!R){addEventListener('scroll',mani,{passive:true});mani()}
// 4) Titulares con "scramble" al entrar en pantalla.
const G='!<>-_\\/[]{}—=+*^?#';const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,f=el.textContent;let n=0;
 const it=setInterval(()=>{el.textContent=f.split('').map((c,i)=>i<n||c===' '?c:G[Math.random()*G.length|0]).join('');n+=.6;if(n>f.length){clearInterval(it);el.textContent=f}},28)}),{threshold:.6});
if(!R)$$('.scr').forEach(e=>io.observe(e));
// 5) Cuenta atrás del happy hour (hasta las 20:00 de hoy o de mañana).
function clock(){const n=new Date(),e=new Date(n);e.setHours(20,0,0,0);if(e<n)e.setDate(e.getDate()+1);let s=(e-n)/1e3|0;
 const p=v=>String(v).padStart(2,'0');$('#clock').textContent=`${p(s/3600|0)}:${p(s/60%60|0)}:${p(s%60)}`}
clock();setInterval(clock,1000);
const h=new Date().getHours();$('#open').textContent=h>=13||h<3?'Abierto ahora':'Abre a las 13:00';
// 6) Formulario: chips, contador y confirmación (demo: no envía nada).
$$('.chips button').forEach(b=>b.onclick=()=>{$$('.chips button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true')});
let pp=2;$$('.step button').forEach(b=>b.onclick=()=>{pp=Math.max(1,Math.min(8,pp+ +b.dataset.d));$('#pp').textContent=pp;$('#pp').animate([{transform:'scale(1.4)'},{transform:'none'}],{duration:220,easing:'cubic-bezier(.2,1.6,.4,1)'})});
$('#f').onsubmit=e=>{e.preventDefault();const n=$('[name=n]').value.trim()||'Sin nombre',d=$('.chips [aria-pressed=true]').textContent;const t=$('#toast');
 t.textContent=`✶ Reserva lista (demo): ${n} · ${d} · ${pp} pers. Te escribimos por WhatsApp.`;t.classList.remove('on');void t.offsetWidth;t.classList.add('on')};
