// Doble Smash — "image sequence": el scroll elige el fotograma; se dibuja en canvas el más cercano ya cargado.
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const cv=$('#cv'),cx=cv.getContext('2d'),sec=$('#scrolly'),imgs=[];let meta=null,N=60,cur=-1,want=0,loaded=0;
fetch('frames/meta.json').then(r=>r.json()).then(m=>{meta=m;N=m.n;
 $('#labels').innerHTML=m.names.map(n=>`<div class="lab"><span>${n}</span></div>`).join('');
 // carga progresiva: primero cada 8º fotograma (vista previa gruesa), luego el resto.
 const order=[];for(let s of [8,4,2,1])for(let i=0;i<N;i+=s)if(!order.includes(i))order.push(i);
 let k=0;const next=()=>{if(k>=order.length)return;const i=order[k++],im=new Image();im.decoding='async';im.src=`frames/f${String(i).padStart(3,'0')}.webp`;
  im.onload=()=>{imgs[i]=im;loaded++;$('#load').textContent=`Cargando ${Math.round(loaded/N*100)} %`;if(loaded===N)$('#load').style.opacity=0;cur=-1;next()};im.onerror=next};
 for(let j=0;j<4;j++)next();requestAnimationFrame(tick)});
function prog(){const r=sec.getBoundingClientRect();return Math.max(0,Math.min(1,-r.top/(sec.offsetHeight-innerHeight)))}
let sm=0;
function tick(){const p=prog();sm+=(p-sm)*.18;want=Math.round(sm*(N-1));
 if(want!==cur){let i=want,d=0;while(!imgs[i]&&d<N){d++;i=imgs[want-d]?want-d:imgs[want+d]?want+d:i}if(imgs[i]){cx.clearRect(0,0,720,720);cx.drawImage(imgs[i],0,0);cur=want;$('#poster').style.visibility='hidden'}}
 // fases del texto
 const ph=sm<.28?0:sm<.8?1:2;$$('.phase').forEach(e=>e.classList.toggle('off',+e.dataset.ph!==ph));
 // etiquetas de cada capa (posición exportada por el renderizador)
 if(meta){const fr=$('.frame').getBoundingClientRect(),st=$('.stage').getBoundingClientRect(),pos=meta.pos[Math.min(N-1,want)],k=fr.height/720,on=sm>.34&&sm<.97;
  $$('.lab').forEach((l,i)=>{l.style.top=(fr.top-st.top+pos[i]*k-14)+'px';if(innerWidth>700)l.style.left=(fr.right-st.left-fr.width*.25)+'px';l.classList.toggle('on',on&&(innerWidth>700||i%2===0));l.style.transitionDelay=on?i*30+'ms':'0ms'})}
 $$('#meter i').forEach((m,i)=>m.style.setProperty('--f',Math.max(0,Math.min(1,sm*5-i)).toFixed(3)));
 requestAnimationFrame(tick)}
// carrito de demo
const cart={};$$('.add').forEach(b=>b.onclick=()=>{const n=b.closest('.item').querySelector('h3').textContent;cart[n]=(cart[n]||0)+1;
 $('#cart').textContent='Tu pedido: '+Object.entries(cart).map(([k,v])=>`${v}× ${k}`).join(' · ')});
