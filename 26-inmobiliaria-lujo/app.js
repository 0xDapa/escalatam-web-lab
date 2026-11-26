// 26 · Almendro Residences — vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hdr=$('.top'),arch=$('#arch'),hero=$('.hero');let tk=0;
const onS=()=>{tk=0;hdr.classList.toggle('sc',scrollY>innerHeight*.8);
 const p=Math.min(1,Math.max(0,scrollY/(hero.offsetHeight*.7)));arch.style.setProperty('--k',p.toFixed(3));arch.style.setProperty('--w',(34+p*56).toFixed(2))};
addEventListener('scroll',()=>{if(!tk){tk=1;requestAnimationFrame(onS)}},{passive:true});onS();
// tres razones
const R=[['La luz','Orientación sur en todas las viviendas y ventanales de suelo a techo. Aquí el invierno también se vive en la terraza.','terraza'],
 ['La calma','Solo dieciocho familias, acceso controlado y 2.400 m² de jardín con almendros centenarios conservados.','jardin'],
 ['El oficio','Materiales nobles —piedra local, roble, cal— y arquitectura bioclimática con certificación energética A.','salon']];
const box=$('.dome-in');
$$('.r-tabs button').forEach(b=>b.addEventListener('click',()=>{const r=R[+b.dataset.i];$$('.r-tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));
 box.classList.add('sw');setTimeout(()=>{$('#r-h').textContent=r[0];$('#r-p').textContent=r[1];$('#r-img').src=`img/${r[2]}-960.webp`;box.classList.remove('sw')},RM?0:300)}));
if(!RM){let i=0;const auto=setInterval(()=>{i=(i+1)%3;$$('.r-tabs button')[i].click()},5200);$('.r-tabs').addEventListener('click',e=>{if(e.isTrusted)clearInterval(auto)})}
// día / noche
const dn=$('#dn'),sw=$('#sw');sw.addEventListener('click',()=>{const n=dn.classList.toggle('night');sw.setAttribute('aria-pressed',n);$('.t',sw).textContent=n?'Ver de día':'Ver de noche'});
// tabla de residencias
const U=[['A-01','Residencia con jardín','jardin',2,'98 + 60','485.000 €','d','salon'],['A-02','Residencia con jardín','jardin',3,'124 + 85','610.000 €','r','jardin'],
['B-04','Residencia con jardín','jardin',2,'102 + 48','495.000 €','v','terraza'],['C-11','Ático con solárium','atico',3,'118 + 96','720.000 €','d','suite'],
['C-12','Ático con solárium','atico',4,'146 + 120','890.000 €','d','porche'],['V-01','Villa con piscina','villa',4,'240 + 310','1.450.000 €','r','villa'],['V-02','Villa con piscina','villa',5,'286 + 340','1.690.000 €','d','villa']];
const L={d:['Disponible',''],r:['Reservada','r'],v:['Vendida','v']};const tbl=$('.tbl');
tbl.insertAdjacentHTML('beforeend',U.map(u=>`<div class="tr" role="row" data-t="${u[2]}" data-img="${u[7]}"><span role="cell">${u[0]}</span><span role="cell" class="ty">${u[1]}</span><span role="cell">${u[3]} dorm.</span><span role="cell">${u[4]} m²</span><span role="cell">${u[5]}</span><span role="cell"><span class="st ${L[u[6]][1]}">${L[u[6]][0]}</span></span></div>`).join(''));
$$('.filters button').forEach(b=>b.addEventListener('click',()=>{$$('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));const f=b.dataset.f;
 const go=()=>$$('.tr[data-t]').forEach(r=>r.classList.toggle('hide',f!=='all'&&r.dataset.t!==f));document.startViewTransition&&!RM?document.startViewTransition(go):go()}));
// miniatura que sigue al cursor (solo con ratón)
const peek=$('.peek'),pi=$('img',peek);
if(matchMedia('(hover:hover)').matches)$$('.tr[data-t]').forEach(r=>{r.addEventListener('mouseenter',()=>{pi.src=`img/${r.dataset.img}-560.webp`;peek.classList.add('on')});r.addEventListener('mouseleave',()=>peek.classList.remove('on'));r.addEventListener('mousemove',e=>{peek.style.left=e.clientX+'px';peek.style.top=e.clientY+'px'})});
// formulario → WhatsApp
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 const m=`Hola, soy ${f.get('n')}. Me interesa: ${f.get('i')} en Almendro Residences. ¿Podemos agendar una visita privada${f.get('d')?' el '+f.get('d'):''}? Mi teléfono: ${f.get('t')}.`;
 open('https://wa.me/?text='+encodeURIComponent(m),'_blank','noopener')});}
