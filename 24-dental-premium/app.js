// 24 · Alba Clínica Dental — vanilla, sin librerías.
{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// cabecera con borde al hacer scroll
const hdr=$('.top');addEventListener('scroll',()=>hdr.classList.toggle('sc',scrollY>10),{passive:true});
// texto que se "ilumina" palabra a palabra según el scroll
const W=$('[data-words]');
if(W&&!RM){W.innerHTML=W.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ');
 const ws=$$('.w',W);let tick=0;
 const upd=()=>{tick=0;const r=W.getBoundingClientRect(),vh=innerHeight;const p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.35)));const n=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle('on',i<n))};
 addEventListener('scroll',()=>{if(!tick){tick=1;requestAnimationFrame(upd)}},{passive:true});upd();}
// tratamientos: pestañas con panel
const S=[
 ['Estética dental','Carillas de porcelana, blanqueamiento y contorneado. Diseñamos tu sonrisa en 3D y te la probamos en boca antes de tocar un diente.',['Carillas','Blanqueamiento','Diseño digital'],'290 €','sonrisa','por pieza'],
 ['Implantes','Cirugía guiada por ordenador, mínimamente invasiva. En muchos casos sales con dientes provisionales el mismo día.',['Carga inmediata','Cirugía guiada','Sedación consciente'],'890 €','gabinete','por implante'],
 ['Ortodoncia invisible','Alineadores transparentes planificados en digital, con revisiones cada 8 semanas y seguimiento por app.',['Alineadores','Retenedores','Escáner 3D'],'2.400 €','paciente','tratamiento completo'],
 ['Prevención e higiene','Higiene profunda con aire pulido, revisión anual con escáner y plan de cuidado para toda la familia.',['Higiene','Revisión','Niños'],'60 €','sillon','por sesión'],
 ['Más allá de la sonrisa','Bruxismo, dolor mandibular y apnea del sueño: férulas a medida y trabajo con fisioterapeutas.',['Férulas','ATM','Ronquido'],'180 €','hero','por férula']];
const panel=$('.svc-panel'),img=$('#svc-img');
$$('.svc-list button').forEach(b=>b.addEventListener('click',()=>{const s=S[+b.dataset.i];
 $$('.svc-list button').forEach(x=>x.setAttribute('aria-pressed',x===b));panel.classList.add('sw');
 setTimeout(()=>{img.src=`img/${s[4]}-960.webp`;img.srcset=`img/${s[4]}-560.webp 560w, img/${s[4]}-960.webp 960w`;$('#svc-h').textContent=s[0];$('#svc-p').textContent=s[1];$('#svc-li').innerHTML=s[2].map(t=>`<li>${t}</li>`).join('');$('#svc-pr').textContent=s[3];$('#svc-pr').nextSibling.textContent=' '+s[5];panel.classList.remove('sw')},RM?0:280)}));
// antes / después
const box=$('.ba-box');$('input',box).addEventListener('input',e=>box.style.setProperty('--p',e.target.value+'%'));
// contadores
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,n=+el.dataset.n,d=+(el.dataset.d||0),t0=performance.now();
 const f=t=>{const p=Math.min(1,(t-t0)/1400),v=n*(1-Math.pow(1-p,3));el.textContent=v.toLocaleString('es-ES',{minimumFractionDigits:d,maximumFractionDigits:d});if(p<1)requestAnimationFrame(f)};RM?el.textContent=n.toLocaleString('es-ES',{minimumFractionDigits:d}):requestAnimationFrame(f)}),{threshold:.6});
$$('[data-n]').forEach(e=>io.observe(e));
// formulario → WhatsApp
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 const m=`Hola, soy ${f.get('n')}. Quiero pedir cita en Alba para: ${f.get('s')}. Prefiero ${f.get('h').toLowerCase()}. Mi teléfono: ${f.get('t')}.`;
 open('https://wa.me/?text='+encodeURIComponent(m),'_blank','noopener')});
}
