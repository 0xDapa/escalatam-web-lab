// 31 · Kinesia — mapa corporal interactivo, nivel de dolor, próxima hora y agenda → WhatsApp. Vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const Z={cuello:['Cuello',['Postura frente al computador','Estrés y tensión','Latigazo cervical'],'Terapia manual suave, ejercicios de control cervical y ajustes ergonómicos de tu puesto de trabajo.','4–6'],
hombro:['Hombro',['Tendinopatía del manguito','Hombro congelado','Sobrecarga deportiva'],'Movilidad progresiva, fortalecimiento de la escápula y vuelta guiada a tu deporte.','6–10'],
espalda:['Espalda baja',['Lumbago mecánico','Hernia discal','Sedentarismo'],'Educación en dolor, ejercicio terapéutico y terapia manual. El objetivo: que no vuelva.','6–8'],
muneca:['Muñeca y mano',['Túnel carpiano','Tendinitis de De Quervain','Esguince'],'Férulas a medida si hace falta, movilización y ejercicios de prensión.','4–8'],
rodilla:['Rodilla',['Dolor patelofemoral','Post operatorio de LCA','Desgaste meniscal'],'Fuerza de cadera y cuádriceps, análisis de tu carrera y retorno progresivo.','8–12'],
tobillo:['Tobillo y pie',['Esguince recurrente','Fascitis plantar','Tendón de Aquiles'],'Propiocepción, fuerza del pie y plan de carga para volver a caminar o correr sin dolor.','5–8']};
const btns=$$('.zbtns button'),dots=$$('.z');
function pick(k){const z=Z[k];btns.forEach(b=>b.setAttribute('aria-selected',b.dataset.k===k));dots.forEach(d=>d.classList.toggle('on',d.dataset.k===k));
 $('#zh').textContent=z[0];$('#zc').innerHTML=z[1].map(c=>`<li>${c}</li>`).join('');$('#zt').textContent=z[2];$('#zs').textContent=z[3];
 $('#zcta').textContent='Agendar para '+z[0].toLowerCase();const o=[...$('#fz').options].find(o=>z[0].startsWith(o.text));if(o)$('#fz').value=o.text}
btns.forEach(b=>b.addEventListener('click',()=>pick(b.dataset.k)));dots.forEach(d=>{d.setAttribute('tabindex','0');d.setAttribute('role','button');d.addEventListener('click',()=>pick(d.dataset.k));d.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(d.dataset.k)}})});
pick('espalda');
const lv=$('#lv'),adv=$('#adv');const A=v=>v<=3?'Molestia leve: una evaluación te ayuda a que no avance.':v<=6?'Dolor moderado: conviene empezar esta semana para evitar compensaciones.':v<=8?'Dolor alto: te recomendamos la primera hora disponible.':'Dolor muy intenso: si es súbito, con hormigueo o fiebre, acude a urgencias.';
const upd=()=>{$('#lvo').textContent=lv.value;adv.textContent=A(+lv.value)};lv.addEventListener('input',upd);upd();
// próxima hora libre (simulada a partir de la hora actual)
const n=new Date();let h=Math.max(n.getHours()+2,8);let txt;if(h<20&&n.getDay()!==0)txt=`hoy · ${h}:${n.getMinutes()<30?'30':'00'}`;else txt='mañana · 8:30';$('#next').textContent=txt;
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 open('https://wa.me/?text='+encodeURIComponent(`Hola Kinesia, soy ${f.get('n')}. Quiero agendar una evaluación por ${f.get('z').toLowerCase()} (dolor ${lv.value}/10). Previsión: ${f.get('p')}. Preferencia: ${f.get('h').toLowerCase()}.`),'_blank','noopener')});}
