// 23 · Valeria Montes — selector "¿cómo te ayudo?" con View Transitions, subrayado que se dibuja, filtros de recursos, boletín y agenda → WhatsApp. Vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.6});$$('.mark').forEach(m=>io.observe(m));
const A={cambio:['Primero, claridad. Después, el salto.',['Lee “Las 5 preguntas antes de renunciar”','Haz el mapa de valores (plantilla gratis)','Agenda una sesión de claridad'],'Sesión de claridad','90 min 1:1 · salimos con 3 pasos concretos'],
burnout:['Menos esfuerzo, mejor sistema.',['Prueba la semana de 3 prioridades','Mira el vídeo “Agenda con espacios en blanco”','Únete al Programa Rumbo'],'Programa Rumbo','8 semanas · grupo de 8 · sistema anti-agobio'],
proyecto:['Del cuaderno al primer cliente.',['Descarga el lienzo de proyecto en 1 página','Define tu primera oferta en 30 minutos','Habla conmigo para armar el plan'],'Programa Rumbo','Incluye módulo de lanzamiento y revisión de oferta']};
const ans=$('#answer');
function show(k,anim){const a=A[k];const r=()=>{ans.innerHTML=`<div><p class="kind">Tu punto de partida</p><h3>${a[0]}</h3><ol>${a[1].map(x=>`<li>${x}</li>`).join('')}</ol></div><div class="rec"><p class="kind">Te recomiendo</p><h3>${a[2]}</h3><p>${a[3]}</p><a class="btn" href="#agenda" data-p="${a[2]}">Hablemos</a></div>`;
 $$('.intents button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k===k))};
 if(anim&&document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(r);else r()}
$$('.intents button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.k,1)));show('cambio');
document.addEventListener('click',e=>{const a=e.target.closest('[data-p]');if(a){const o=[...$('#bp').options].find(o=>o.text===a.dataset.p);if(o)$('#bp').value=o.text}});
const R=[['art','📝','#ffd257','Las 5 preguntas antes de renunciar','Artículo · 7 min'],['vid','🎬','#dce9ff','Agenda con espacios en blanco','Vídeo · 12 min'],['tpl','🗺️','#d7f0e1','Mapa de valores y fortalezas','Plantilla · Notion y PDF'],
['art','📝','#ffd9cf','Cómo pedir un aumento sin pedir perdón','Artículo · 9 min'],['tpl','📋','#ffd257','Revisión semanal en 20 minutos','Plantilla · PDF imprimible'],['vid','🎬','#d7f0e1','Lo que aprendí de mi burnout','Vídeo · 18 min']];
const grid=$('#rgrid');function list(f){const r=()=>{grid.innerHTML=R.filter(x=>f==='all'||x[0]===f).map(x=>`<a class="r-card" href="#boletin"><span class="ic" style="background:${x[2]}" aria-hidden="true">${x[1]}</span><h3>${x[3]}</h3><p>${x[4]} · gratis</p></a>`).join('')};
 document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches?document.startViewTransition(r):r()}
$$('.filters button').forEach(b=>b.addEventListener('click',()=>{$$('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));list(b.dataset.f)}));grid.innerHTML='';R.length&&(()=>{grid.innerHTML=R.map(x=>`<a class="r-card" href="#boletin"><span class="ic" style="background:${x[2]}" aria-hidden="true">${x[1]}</span><h3>${x[3]}</h3><p>${x[4]} · gratis</p></a>`).join('')})();
$('#nf').addEventListener('submit',e=>{e.preventDefault();const m=$('#nmsg');m.textContent='¡Listo! (demo) El domingo te llega el primero.';m.classList.add('ok');e.target.reset()});
$('#bf').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 open('https://wa.me/?text='+encodeURIComponent(`Hola Valeria, soy ${f.get('n')}. Me interesa: ${f.get('p')}. ${f.get('m')?'Me gustaría cambiar: '+f.get('m'):''}`),'_blank','noopener')});}
