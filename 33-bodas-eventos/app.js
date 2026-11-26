// 33 · Velo — calendario de disponibilidad, estimador de presupuesto, galería B/N→color, testimonios rotativos y contacto → WhatsApp. Vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const now=new Date();let ym=new Date(now.getFullYear(),now.getMonth()+1,1);const min=new Date(ym),max=new Date(ym.getFullYear(),ym.getMonth()+14,1);let sel=null;
// disponibilidad simulada y estable: hash del día
const st=d=>{const h=(d.getFullYear()*372+d.getMonth()*31+d.getDate())*2654435761>>>0;const dow=d.getDay();const r=h%10;if(dow===5||dow===6)return r<5?'full':r<8?'few':'free';return r<1?'full':r<2?'few':'free'};
const fmtM=d=>{const t=d.toLocaleDateString('es-CO',{month:'long'});return t[0].toUpperCase()+t.slice(1)+' '+d.getFullYear()};
function render(){const y=ym.getFullYear(),m=ym.getMonth();$('#mon').textContent=fmtM(ym);const first=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate();
 let h='';for(let i=0;i<first;i++)h+='<button class="pad" tabindex="-1" aria-hidden="true"></button>';
 for(let d=1;d<=n;d++){const dt=new Date(y,m,d),s=st(dt),lab=dt.toLocaleDateString('es-CO',{weekday:'long',day:'numeric',month:'long'});
  h+=`<button class="${s}${sel&&+sel===+dt?' sel':''}" data-d="${d}" ${s==='full'?'aria-disabled="true"':''} aria-label="${lab}: ${s==='full'?'reservado':s==='few'?'pocos cupos':'libre'}">${d}</button>`}
 $('#days').innerHTML=h;$('#prev').disabled=+ym<=+min;$('#next').disabled=+ym>=+max}
$('#prev').onclick=()=>{ym=new Date(ym.getFullYear(),ym.getMonth()-1,1);render()};$('#next').onclick=()=>{ym=new Date(ym.getFullYear(),ym.getMonth()+1,1);render()};
$('#days').addEventListener('click',e=>{const b=e.target.closest('button[data-d]');if(!b||b.classList.contains('full'))return;sel=new Date(ym.getFullYear(),ym.getMonth(),+b.dataset.d);
 $('#picked').textContent=sel.toLocaleDateString('es-CO',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+(b.classList.contains('few')?' · pocos cupos':'');
 $('#book').disabled=false;$('#fd').value=`${sel.getFullYear()}-${String(sel.getMonth()+1).padStart(2,'0')}`;render()});
render();
const g=$('#guests'),sty=$('#style');const M=n=>Math.round(n/1e6);
function tot(){$('#go').textContent=g.value;const base=(+g.value*290000+14000000)*+sty.value;$('#total').textContent=`$${M(base*.85)} – ${M(base*1.15)} millones COP`}
g.addEventListener('input',tot);sty.addEventListener('change',tot);tot();$('#book').disabled=true;
const wa=t=>open('https://wa.me/?text='+encodeURIComponent(t),'_blank','noopener');
$('#book').onclick=()=>{if(sel)wa(`Hola Velo, queremos consultar la fecha ${$('#picked').textContent} para unos ${g.value} invitados, estilo "${sty.options[sty.selectedIndex].text}".`)};
// galería: en táctil, color al entrar en pantalla
if(matchMedia('(hover: none)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('on',e.isIntersecting)),{threshold:.6});$$('.g-grid figure').forEach(f=>io.observe(f))}
// testimonios
const qs=$$('#wtrack blockquote'),dots=$('#wdots');let qi=0;qs.forEach((q,i)=>{const b=document.createElement('button');b.setAttribute('role','tab');b.setAttribute('aria-label','Testimonio '+(i+1));b.onclick=()=>{show(i);clearInterval(T)};dots.append(b)});
function show(i){qi=i;qs.forEach((q,k)=>q.classList.toggle('on',k===i));$$('button',dots).forEach((b,k)=>b.setAttribute('aria-selected',k===i))}show(0);
let T=matchMedia('(prefers-reduced-motion: reduce)').matches?0:setInterval(()=>show((qi+1)%qs.length),6000);
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);wa(`Hola Velo, somos ${f.get('n')}. Fecha tentativa: ${f.get('d')||'por definir'}. ${f.get('m')}`)});}
