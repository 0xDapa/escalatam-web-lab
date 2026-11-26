// 32 · Ocre Estudio — fotos flotantes con parallax, manifiesto que se ilumina palabra a palabra, índice con vista previa al cursor, filtro, paleta de materiales y estimador → WhatsApp. Vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fl=$$('.fl');const mf=$('#mf');
// manifiesto: envolver palabras (respetando <em>)
mf.innerHTML=mf.innerHTML.replace(/(<[^>]+>)|([^<\s]+)/g,(m,tag,w)=>tag?tag:`<span class="w">${w}</span>`);const ws=$$('.w',mf);
let tick=0;function frame(){tick=0;const y=scrollY,vh=innerHeight;
 if(!RM)fl.forEach(f=>{f.style.transform=`translate3d(0,${-y*parseFloat(f.dataset.s)}px,0)`});
 const r=mf.getBoundingClientRect();const p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.35)));const n=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle('on',RM||i<n))}
addEventListener('scroll',()=>{if(!tick){tick=1;requestAnimationFrame(frame)}},{passive:true});frame();
// cursor preview
const cur=$('#cur'),ci=$('img',cur);let tx=0,ty=0,cx=0,cy=0,run=0;
function loop(){cx+=(tx-cx)*.16;cy+=(ty-cy)*.16;cur.style.translate=`${cx}px ${cy}px`;if(Math.abs(tx-cx)+Math.abs(ty-cy)>.5)requestAnimationFrame(loop);else run=0}
$$('.plist li').forEach(li=>{li.addEventListener('mouseenter',()=>{ci.src=`img/${li.dataset.img}-560.webp`;cur.classList.add('on')});li.addEventListener('mouseleave',()=>cur.classList.remove('on'))});
addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;if(!run){run=1;requestAnimationFrame(loop)}},{passive:true});
$$('.pf button').forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.f;$$('.pf button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 const r=()=>$$('.plist li').forEach(li=>li.classList.toggle('hide',f!=='*'&&li.dataset.c!==f));document.startViewTransition&&!RM?document.startViewTransition(r):r()}));
// paleta
const room=$('.room'),names={floor:'',wall:'',acc:''};
function combo(){$('#combo').textContent=`${names.floor} · ${names.wall} · ${names.acc}`}
$$('.sw').forEach(g=>{const k=g.dataset.g;const set=b=>{$$('button',g).forEach(x=>x.setAttribute('aria-pressed',x===b));room.style.setProperty('--'+k,b.style.getPropertyValue('--c'));names[k]=b.getAttribute('aria-label');combo()};
 $$('button',g).forEach(b=>b.addEventListener('click',()=>set(b)));set($('[aria-pressed=true]',g))});
// estimador
const m2=$('#m2'),sv=$('#sv');const fmt=n=>'USD '+n.toLocaleString('es-UY');
function est(){$('#mo').textContent=m2.value;const v=+sv.value;$('#est').textContent=v>0?fmt(m2.value*v):v===0?fmt(380):'desde '+fmt(600)}
m2.addEventListener('input',est);sv.addEventListener('change',est);est();
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 open('https://wa.me/?text='+encodeURIComponent(`Hola Ocre, me llamo ${f.get('n')} y quiero transformar ${f.get('t')} de unos ${m2.value} m². Servicio: ${sv.options[sv.selectedIndex].text}. ¿Coordinamos una visita?`),'_blank','noopener')});}
