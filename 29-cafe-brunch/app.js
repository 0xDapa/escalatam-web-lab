// 29 · Brote — fotos arrastrables, carta con pestañas, reserva → WhatsApp, tarjeta de sellos. Vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// polaroids arrastrables (solo escritorio, donde están en posición absoluta)
let z=5;$$('.snaps .snap').forEach(el=>{let sx,sy,ox,oy,on=false;
 el.addEventListener('pointerdown',e=>{if(getComputedStyle(el).position!=='absolute')return;on=true;el.setPointerCapture(e.pointerId);el.classList.add('drag');el.style.zIndex=++z;
  const r=el.parentElement.getBoundingClientRect();sx=e.clientX;sy=e.clientY;ox=el.offsetLeft;oy=el.offsetTop;el._r=r});
 el.addEventListener('pointermove',e=>{if(!on)return;el.style.left=(ox+e.clientX-sx)+'px';el.style.top=(oy+e.clientY-sy)+'px'});
 const end=()=>{on=false;el.classList.remove('drag')};el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end)});
// carta
const C={brunch:[['Huevos benedictinos','Muffin de masa madre, jamón asado, holandesa de limón','11,50',''],['Tostada de aguacate','Dukkah, encurtidos de la casa, huevo poché opcional','9,00','V'],['Shakshuka','Tomate especiado, huevos, feta y pan para mojar','10,50','V · SG'],['Bocata de porchetta','Cerdo asado 12 h, salsa verde y rúcula','10,90','']],
dulce:[['Tortitas de ricotta','Frutos rojos, mascarpone y sirope de arce','8,50','V'],['Gofre de Lieja','Chocolate negro, plátano caramelizado','7,50','V'],['Bollería del obrador','Croissant, rol de canela o bollo de cardamomo','3,20','V'],['Tarta del día','Pregunta en barra qué ha salido del horno','4,50','V']],
cafe:[['Espresso','Tueste propio · Huila, Colombia','1,80',''],['Flat white','Doble ristretto y leche fresca de Castellón','3,20',''],['V60 de filtro','Origen rotativo, notas en la pizarra','3,80',''],['Chai latte','Masala casero y leche de avena','3,60','V']],
beber:[['Zumo de naranja','Naranjas de Alzira exprimidas al momento','3,50','V'],['Kombucha de la casa','Jengibre y limón, fermentación propia','3,90','V'],['Mimosa','Cava valenciano y naranja','5,50',''],['Horchata','De Alboraya, como manda la tradición','3,00','V']]};
const items=$('#items');const show=c=>{items.innerHTML=C[c].map((x,i)=>`<li style="animation-delay:${i*60}ms"><span class="n"><b>${x[0]}${x[3]?`<span class="t">${x[3]}</span>`:''}</b><small>${x[1]}</small></span><span class="p">${x[2]}</span></li>`).join('')};
$$('.tabs button').forEach(b=>b.addEventListener('click',()=>{$$('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));show(b.dataset.c)}));show('brunch');
// reserva
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 open('https://wa.me/?text='+encodeURIComponent(`¡Hola Brote! Quiero reservar mesa para ${f.get('p')} el ${f.get('d').toLowerCase()} a las ${f.get('h')}, a nombre de ${f.get('n')}.`),'_blank','noopener')});
// tarjeta de sellos
const st=$('#stamps'),win=$('#win');for(let i=0;i<8;i++){const b=document.createElement('button');b.type='button';b.textContent='☕';b.setAttribute('aria-pressed','false');b.setAttribute('aria-label',`Sello ${i+1}`);
 b.onclick=()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');const n=$$('[aria-pressed=true]',st).length;win.hidden=n<8;if(n===8&&!RM)st.animate([{transform:'rotate(0)'},{transform:'rotate(-3deg)'},{transform:'rotate(3deg)'},{transform:'rotate(0)'}],{duration:500})};st.appendChild(b)}}
