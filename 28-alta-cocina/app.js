// 28 · Marea — el fondo se oscurece con la profundidad (scroll), medidor fijo, reservas → WhatsApp. Vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const A=[239,238,234],C=[106,142,156],B=[13,26,36],L=(x,y,t)=>x.map((a,i)=>Math.round(a+(y[i]-a)*t)),mix=t=>t<.45?L(A,C,t/.45):L(C,B,(t-.45)/.55);
const desc=$('.descent'),zones=$$('.zone'),dEl=$('#depth'),zEl=$('#zone'),root=document.documentElement,body=document.body;let tk=0;
const upd=()=>{tk=0;const r=desc.getBoundingClientRect(),vh=innerHeight;
 const p=Math.min(1,Math.max(0,(vh*.5-r.top)/(r.height-vh*.5)));
 // la página queda oscura desde el abismo hasta el final
 const after=r.bottom<vh*.5;const t=after?1:p;
 const c=mix(Math.pow(t,1.15));const bg=`rgb(${c})`;body.style.background=bg;root.style.setProperty('--bgc',bg);
 body.style.color=t>.45?'#e9e6dc':'#1f1f1f';root.style.setProperty('--deep',p.toFixed(3));
 let cur=zones[0];zones.forEach(z=>{if(z.getBoundingClientRect().top<vh*.55)cur=z});
 const d0=+cur.dataset.d,i=zones.indexOf(cur),nx=zones[i+1];let d=d0;
 if(nx){const a=cur.getBoundingClientRect().top,b=nx.getBoundingClientRect().top;const q=Math.min(1,Math.max(0,(vh*.55-a)/(b-a)));d=d0+(+nx.dataset.d-d0)*q}
 dEl.textContent=Math.round(r.top>vh*.5?0:d);zEl.textContent=cur.dataset.z};
addEventListener('scroll',()=>{if(!tk){tk=1;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.25});zones.forEach(z=>io.observe(z));
// reservas: próximos 14 días (dom y lun cerrados)
const days=$('#days'),slots=$('#slots'),D=['dom','lun','mar','mié','jue','vie','sáb'],M=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
let sel=null,hr=null,pax=2;const now=new Date();
for(let i=1;i<=14;i++){const d=new Date(now);d.setDate(now.getDate()+i);const closed=d.getDay()<2;
 const b=document.createElement('button');b.type='button';b.disabled=closed;b.setAttribute('aria-pressed','false');b.innerHTML=`<span>${D[d.getDay()]}</span><b>${d.getDate()}</b><span>${M[d.getMonth()]}</span>`;
 b.setAttribute('aria-label',`${D[d.getDay()]} ${d.getDate()} de ${M[d.getMonth()]}${closed?' (cerrado)':''}`);
 b.onclick=()=>{$$('button',days).forEach(x=>x.setAttribute('aria-pressed',x===b));sel=`${D[d.getDay()]} ${d.getDate()} ${M[d.getMonth()]}`;renderSlots(d)};days.appendChild(b)}
function renderSlots(d){const full=(d.getDate()*7)%4;slots.innerHTML='';['19:30','20:00','20:30','21:00','21:30'].forEach((h,i)=>{const b=document.createElement('button');b.type='button';b.textContent=h;b.disabled=i===full;b.setAttribute('aria-pressed','false');if(i===full){b.title='Completo';b.style.opacity=.3}
 b.onclick=()=>{$$('button',slots).forEach(x=>x.setAttribute('aria-pressed',x===b));hr=h};slots.appendChild(b)})}
const first=$('button:not(:disabled)',days);first&&first.click();
$$('.pax button').forEach(b=>b.onclick=()=>{pax=Math.min(8,Math.max(1,pax+ +b.dataset.s));$('#pax').textContent=pax});
$('#form').addEventListener('submit',e=>{e.preventDefault();if(!hr){slots.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300});return}
 open('https://wa.me/?text='+encodeURIComponent(`Hola Marea, quiero reservar el menú para ${pax} persona${pax>1?'s':''} el ${sel} a las ${hr}.`),'_blank','noopener')});}
