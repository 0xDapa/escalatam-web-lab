// 25 · Ferrer Ruiz — vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// palabra en píldora que rota
const words=['tu empresa','tu familia','tu patrimonio','tu startup','tu equipo'];let k=0;const pw=$('.hero .pw');
if(!RM)setInterval(()=>{pw.classList.add('out');setTimeout(()=>{k=(k+1)%words.length;pw.textContent=words[k];pw.style.transition='none';pw.classList.remove('out');pw.classList.add('in');pw.offsetWidth;pw.style.transition='';pw.classList.remove('in')},450)},2600);
// menú de esquina
const b=$('.burger'),menu=$('#menu');
const tog=o=>{document.body.classList.toggle('mo',o);b.setAttribute('aria-expanded',o);menu.hidden=!o;b.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú')};
b.addEventListener('click',()=>tog(menu.hidden));$$('a',menu).forEach(a=>a.addEventListener('click',()=>tog(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')tog(false)});
// acordeón
$$('.acc button').forEach(x=>{x.nextElementSibling.innerHTML='<div>'+x.nextElementSibling.innerHTML+'</div>';x.addEventListener('click',()=>{const o=x.getAttribute('aria-expanded')==='true';$$('.acc button').forEach(y=>y.setAttribute('aria-expanded','false'));x.setAttribute('aria-expanded',String(!o))})});
// formulario → WhatsApp
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 const m=`Hola, soy ${f.get('n')}${f.get('e')?' ('+f.get('e')+')':''}. Necesito asesoría en ${f.get('a')}. ${f.get('m')||''}`.trim();
 open('https://wa.me/?text='+encodeURIComponent(m),'_blank','noopener')});}
