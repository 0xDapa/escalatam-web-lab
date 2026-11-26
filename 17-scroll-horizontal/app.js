// Hotel Salitre — scroll vertical → desplazamiento horizontal + parallax por capas (variables CSS --p y --a por panel).
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],R=matchMedia('(prefers-reduced-motion: reduce)').matches;
const story=$('#dia'),track=$('#track'),panels=$$('.panel'),btns=$$('#chap button'),chap=$('#chap'),N=panels.length;let cur=0,tgt=0;
function prog(){const r=story.getBoundingClientRect(),tot=story.offsetHeight-innerHeight;return Math.max(0,Math.min(1,-r.top/tot))}
function frame(){tgt=prog()*(N-1);cur+=R?(tgt-cur):(tgt-cur)*.14;if(Math.abs(tgt-cur)<.0005)cur=tgt;
 track.style.transform=`translate3d(${-cur*100}vw,0,0)`;
 panels.forEach((p,i)=>{const d=cur-i;p.style.setProperty('--p',d.toFixed(4));p.style.setProperty('--a',Math.max(0,Math.abs(d)-.15).toFixed(3))});
 const k=Math.round(cur);btns.forEach((b,i)=>{b.classList.toggle('on',i===k);b.style.setProperty('--f',Math.max(0,Math.min(1,cur-i+1)).toFixed(3))});
 chap.classList.toggle('dark',cur>3.5);requestAnimationFrame(frame)}
requestAnimationFrame(frame);
btns.forEach(b=>b.onclick=()=>{const tot=story.offsetHeight-innerHeight;scrollTo({top:story.offsetTop+tot*(+b.dataset.i)/(N-1),behavior:R?'auto':'smooth'})});
// Reserva (demo): calcula noches y precio orientativo.
const t=new Date(),f=d=>d.toISOString().slice(0,10),a=new Date(t);a.setDate(t.getDate()+14);const b=new Date(a);b.setDate(a.getDate()+3);
$('#d1').value=f(a);$('#d2').value=f(b);$('#d1').min=f(t);
$('#bf').onsubmit=e=>{e.preventDefault();const n=Math.round((new Date($('#d2').value)-new Date($('#d1').value))/864e5);
 $('#bmsg').textContent=n>0?`${n} noches · ${$('#g').value} huésped(es) · Alcoba disponible desde ${n*140} € (demo)`:'La salida debe ser posterior a la llegada'};
