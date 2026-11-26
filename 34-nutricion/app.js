// 34 · Savia Nutrición — contadores, test de 3 preguntas con recomendación, plato en donut SVG, toggle de precios y turno → WhatsApp. Vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// contadores
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,n=+el.dataset.n;if(RM||!n){el.textContent=n;return}const t0=performance.now();
 const step=t=>{const p=Math.min(1,(t-t0)/1200);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.6});$$('[data-n]').forEach(b=>io.observe(b));
// test
const Q=[['¿Qué te gustaría lograr?',[['Comer más ordenado','orden'],['Bajar de peso sin dietas','peso'],['Rendir mejor en mi deporte','dep'],['Mejorar mis análisis','clin']]],
 ['¿Cuánto cocinás en la semana?',[['Casi nada','0'],['Algo, lo básico','1'],['Me encanta cocinar','2'],['Depende la semana','1']]],
 ['¿Cómo preferís el seguimiento?',[['Una consulta al mes me alcanza','e'],['Quiero alguien cerca, por WhatsApp','a'],['Lo que me recomienden','a'],['Necesito plan de competencia','d']]]];
let qi=0;const ans=[];const body=$('#qbody');
function q(){$('#qn').textContent=Math.min(qi+1,3);$('#qbar').style.width=(qi/3*100)+'%';
 if(qi<3){const [t,o]=Q[qi];body.innerHTML=`<div class="fadein"><h3>${t}</h3><div class="opts">${o.map(([l,v])=>`<button data-v="${v}">${l}</button>`).join('')}</div></div>`;return}
 const goal=ans[0],plan=goal==='dep'||ans[2]==='d'?'Deportivo':ans[2]==='e'&&goal==='orden'?'Esencial':'Acompañamiento';
 const why={orden:'ordenar tus comidas',peso:'bajar de peso sin dietas extremas',dep:'rendir más en tu deporte',clin:'mejorar tus análisis'}[goal];
 const cook=ans[1]==='0'?'con opciones que no requieren cocinar':ans[1]==='2'?'con recetas para disfrutar en la cocina':'con recetas de menos de 20 minutos';
 body.innerHTML=`<div class="res fadein"><p class="mono">Tu resultado</p><h3>Te recomendamos <em>${plan}</em></h3><p>Para ${why}, ${cook}. En la primera consulta lo ajustamos a tu rutina.</p><div class="row"><a class="btn" href="#turno" data-plan="${plan}">Pedir turno con este plan</a><button class="btn ghost" id="again">Repetir test</button></div></div>`;
 $('#fo').value=why[0].toUpperCase()+why.slice(1);setPlan(plan)}
body.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(b){ans[qi]=b.dataset.v;qi++;q()}if(e.target.id==='again'){qi=0;ans.length=0;q()}});q();
// plato
const C={ver:['Verduras','#7d8f69'],pro:['Proteínas','#b05a36'],cer:['Cereales y legumbres','#d9a35b'],gra:['Grasas buenas','#e7c9a9'],fru:['Frutas y lácteos','#c97c8c']};
const P={des:[['fru',40],['cer',30],['pro',20],['gra',10],'Yogur con avena, banana y nueces'],alm:[['ver',50],['pro',25],['cer',20],['gra',5],'Bowl tibio de garbanzos, calabaza y espinaca'],
 mer:[['fru',45],['cer',25],['gra',20],['pro',10],'Tostada de masa madre con palta y una fruta'],cen:[['ver',55],['pro',30],['cer',10],['gra',5],'Merluza al horno con verduras asadas']};
const svg=$('#donut'),L=2*Math.PI*70;const segs={};Object.keys(C).forEach(k=>{const c=document.createElementNS('http://www.w3.org/2000/svg','circle');c.setAttribute('cx',100);c.setAttribute('cy',100);c.setAttribute('r',70);c.setAttribute('class','seg');c.setAttribute('stroke',C[k][1]);c.style.strokeDasharray=`0 ${L}`;svg.append(c);segs[k]=c});
function plate(k){const p=P[k];let off=0;Object.values(segs).forEach(s=>{s.style.strokeDasharray=`0 ${L}`});
 p.slice(0,4).forEach(([c,v])=>{const s=segs[c];s.style.strokeDasharray=`${L*v/100-1.5} ${L}`;s.style.strokeDashoffset=-off*L/100;off+=v});
 $('#legend').innerHTML=p.slice(0,4).map(([c,v])=>`<li><i style="background:${C[c][1]}"></i>${C[c][0]}<b>${v}%</b></li>`).join('');$('#idea').textContent='Idea: '+p[4];
 const top=p[0];$('#dc').innerHTML=`<b>${top[1]}%</b><span>${C[top[0]][0].toLowerCase()}</span>`;$$('.meals button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k===k))}
$$('.meals button').forEach(b=>b.addEventListener('click',()=>plate(b.dataset.k)));requestAnimationFrame(()=>plate('alm'));
// precios
const ars=n=>'$'+(+n).toLocaleString('es-AR');$$('.toggle button').forEach(b=>b.addEventListener('click',()=>{$$('.toggle button').forEach(x=>x.setAttribute('aria-pressed',x===b));$$('.price b').forEach(p=>p.textContent=ars(p.dataset[b.dataset.p]))}));
function setPlan(p){const o=[...$('#fp').options].find(o=>o.text===p);if(o)$('#fp').value=p}
document.addEventListener('click',e=>{const a=e.target.closest('[data-plan]');if(a)setPlan(a.dataset.plan)});
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 open('https://wa.me/?text='+encodeURIComponent(`Hola Savia, soy ${f.get('n')}. Quiero pedir un primer turno (${f.get('mo').toLowerCase()}), plan ${f.get('p')}. Objetivo: ${f.get('o')||'a charlar'}.`),'_blank','noopener')});}
