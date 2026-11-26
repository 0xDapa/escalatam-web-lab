// La Lumbre — configurador de tacos (SVG en vivo) + carta filtrable + pedido por WhatsApp. Vanilla, sin librerías.
const $=s=>document.querySelector(s),NS='http://www.w3.org/2000/svg',RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mx=n=>'$'+n.toLocaleString('es-MX');
const D={
 tor:{maiz:{n:'Maíz amarillo',c:'#f0c46a',b:'#d29d3f',p:0},azul:{n:'Maíz azul',c:'#8a84b4',b:'#625d8f',p:6},harina:{n:'Harina',c:'#f7e8c8',b:'#dcc08b',p:4}},
 pro:{pastor:{n:'Al pastor',p:32,c:['#c4502a','#a83c1e','#dc6a38'],s:1},asada:{n:'Asada',p:38,c:['#6e3b22','#58301b','#86502f'],s:0},coli:{n:'Coliflor tatemada',p:30,c:['#efe0b4','#e3cf98','#d2b97c'],s:0,veg:1},pescado:{n:'Pescado capeado',p:40,c:['#eab45a','#dda046','#f3c977'],s:0}},
 sal:{verde:{n:'Verde',c:'#5a8f2f',s:1},roja:{n:'Roja de árbol',c:'#a3271c',s:2},habanero:{n:'Habanero',c:'#f07a12',s:3},sin:{n:'Sin salsa',c:null,s:0}},
 top:{cebolla:{n:'Cebolla',p:0,c:'#fbf7ee'},cilantro:{n:'Cilantro',p:0,c:'#3f8a35'},pina:{n:'Piña',p:6,c:'#f8cf3d'},aguacate:{n:'Aguacate',p:12,c:'#9cc05a'},queso:{n:'Queso fresco',p:10,c:'#fffdf6'}}
};
const S={tor:'maiz',pro:'pastor',sal:'verde',top:new Set(['cebolla','cilantro','pina']),q:3};
// --- semilla determinista para que el taco no "salte" al re-renderizar
const rng=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const svg=$('#taco');
// capas
el('ellipse',{cx:250,cy:388,rx:190,ry:12,fill:'#7a3b0a',opacity:.18},svg);
const L={back:el('g',{},svg),pro:el('g',{},svg),sal:el('g',{},svg),top:el('g',{},svg),front:el('g',{},svg),lime:el('g',{},svg)};
const backP=el('path',{d:'M52 196 A198 198 0 0 0 448 196 Z',style:'transition:fill .45s'},L.back);
const frontP=el('path',{d:'M66 206 A184 184 0 0 0 434 206 Z',style:'transition:fill .45s'},L.front);
const charG=el('g',{},L.front);
{const r=rng(7);for(let i=0;i<26;i++){const a=Math.PI*(.08+r()*.84),d=40+r()*130;el('ellipse',{cx:250+Math.cos(a)*d*(r()>.5?1:-1)*.98,cy:206+Math.sin(a)*d*.95,rx:3+r()*9,ry:2+r()*5,fill:'#4a2206',opacity:(.1+r()*.18).toFixed(2),transform:`rotate(${(r()*60-30)|0})`, 'transform-origin':'center'},charG)}}
el('path',{d:'M70 207 H430',stroke:'#fff',opacity:.35,'stroke-width':3,'stroke-linecap':'round'},L.front);
el('path',{d:'M96 290 A160 160 0 0 0 250 370',fill:'none',stroke:'#fff',opacity:.18,'stroke-width':6,'stroke-linecap':'round'},L.front);
// limón
{const g=el('g',{transform:'translate(430 330) rotate(-18)'},L.lime);el('path',{d:'M-46 0 A46 46 0 0 0 46 0 Z',fill:'#5b9a2c'},g);el('path',{d:'M-39 2 A39 39 0 0 0 39 2 Z',fill:'#cfe98a'},g);for(let i=1;i<6;i++){const a=Math.PI*i/6;el('line',{x1:0,y1:3,x2:Math.cos(a)*36,y2:3+Math.sin(a)*36,stroke:'#a9cf5d','stroke-width':2},g)}}
const drop=(g,stag=14)=>{if(RM)return;[...g.children].forEach((c,i)=>c.animate([{transform:'translateY(-90px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:620,delay:i*stag,easing:'cubic-bezier(.34,1.56,.64,1)',fill:'backwards'}))};
function drawPro(){L.pro.replaceChildren();const p=D.pro[S.pro],r=rng(11);for(let i=0;i<17;i++){const x=96+i*18.5+r()*10,w=30+r()*20,h=22+r()*14,y=212-h-r()*30-Math.sin((x-80)/340*Math.PI)*16;const g=el('g',{},L.pro),rot=(r()*50-25)|0;
 if(S.pro==='coli'){el('circle',{cx:x+w/2,cy:y+h/2,r:h*.62,fill:p.c[i%3],transform:`rotate(${rot} ${x+w/2} ${y+h/2})`},g);el('circle',{cx:x+w/2-6,cy:y+h/2-4,r:4,fill:'#5c3518',opacity:.45},g)}
 else{el('rect',{x,y,width:w,height:h,rx:S.pro==='pescado'?h/2:7,fill:p.c[i%3],transform:`rotate(${rot} ${x+w/2} ${y+h/2})`},g);el('rect',{x:x+4,y:y+4,width:w*.5,height:4,rx:2,fill:'#fff',opacity:.22,transform:`rotate(${rot} ${x+w/2} ${y+h/2})`},g);if(S.pro!=='pescado')el('rect',{x:x+w*.3,y:y+h-8,width:w*.5,height:5,rx:2,fill:'#2a1206',opacity:.35,transform:`rotate(${rot} ${x+w/2} ${y+h/2})`},g)}}
 drop(L.pro)}
function drawSal(){L.sal.replaceChildren();const s=D.sal[S.sal];if(!s.c)return;const r=rng(5);let d='M98 176';for(let x=98;x<=402;x+=19)d+=` Q${x+9} ${158+r()*30} ${x+19} ${170+r()*16}`;
 const g=el('g',{},L.sal);el('path',{d,fill:'none',stroke:s.c,'stroke-width':13,'stroke-linecap':'round','stroke-linejoin':'round',opacity:.92},g);el('path',{d,fill:'none',stroke:'#fff','stroke-width':3,'stroke-linecap':'round',opacity:.25,transform:'translate(-2 -4)'},g);
 for(let i=0;i<6;i++){const x=120+i*52+r()*20;el('path',{d:`M${x} 180 q6 14 0 22 q-6 -8 0 -22z`,fill:s.c},g)}
 if(!RM)g.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:700,easing:'cubic-bezier(.22,1,.36,1)'})}
function drawTop(){L.top.replaceChildren();const r=rng(3);
 for(const k of S.top){const t=D.top[k];for(let i=0;i<(k==='aguacate'?5:k==='queso'?14:11);i++){const x=100+r()*300,y=150+r()*42-Math.sin((x-80)/340*Math.PI)*22,g=el('g',{},L.top),rot=(r()*360)|0;
  if(k==='cebolla')el('rect',{x,y,width:9,height:9,rx:2,fill:t.c,stroke:'#e6dcc8','stroke-width':1,transform:`rotate(${rot} ${x+4} ${y+4})`},g);
  if(k==='cilantro'){el('path',{d:`M${x} ${y} c-6 -8 4 -14 8 -8 c6 -6 12 4 6 8 c4 6 -6 10 -8 4 c-6 4 -12 -4 -6 -4z`,fill:t.c,transform:`rotate(${rot} ${x} ${y})`},g)}
  if(k==='pina')el('rect',{x,y,width:15,height:13,rx:3,fill:t.c,stroke:'#e0a91f','stroke-width':1.5,transform:`rotate(${rot} ${x+7} ${y+6})`},g);
  if(k==='aguacate'){el('path',{d:`M${x} ${y} a26 16 0 0 0 46 0 a26 10 0 0 1 -46 0z`,fill:t.c,stroke:'#3d6b1f','stroke-width':3,transform:`rotate(${(r()*40-20)|0} ${x+23} ${y})`},g)}
  if(k==='queso')el('circle',{cx:x,cy:y+6,r:3+r()*3,fill:t.c,stroke:'#eadfc7','stroke-width':1},g)}}
 drop(L.top,8)}
function drawTor(){const t=D.tor[S.tor];frontP.setAttribute('fill',t.c);backP.setAttribute('fill',t.b);if(!RM)L.front.animate([{transform:'scaleY(.9)'},{transform:'scaleY(1.04)'},{transform:'none'}],{duration:500,easing:'ease-out',transformOrigin:'250px 206px'})}
L.front.style.transformOrigin='250px 206px';
// --- opciones
const sw={tor:k=>D.tor[k].c,pro:k=>D.pro[k].c[0],sal:k=>D.sal[k].c||'transparent',top:k=>D.top[k].c};
document.querySelectorAll('.opts').forEach(box=>{const k=box.dataset.k;for(const id in D[k]){const o=D[k][id],b=document.createElement('button');b.type='button';b.className='opt';b.dataset.id=id;
 const extra=o.p?`<small>+${mx(o.p)}</small>`:(k==='sal'&&o.s?`<small>${'🌶'.repeat(o.s)}</small>`:'');b.innerHTML=`<span class="sw" style="background:${sw[k](id)}"></span>${o.n}${k==='pro'?` <small>${mx(o.p)}</small>`:extra}`;
 b.onclick=()=>{if(k==='top'){S.top.has(id)?S.top.delete(id):S.top.add(id)}else S[k]=id;sync(k)};box.appendChild(b)}});
const sp=$('#sp');for(let i=0;i<5;i++)sp.appendChild(document.createElement('i'));
const unit=()=>D.tor[S.tor].p+D.pro[S.pro].p+[...S.top].reduce((a,k)=>a+D.top[k].p,0);
const desc=()=>[D.tor[S.tor].n.toLowerCase(),S.sal==='sin'?'sin salsa':'salsa '+D.sal[S.sal].n.toLowerCase(),...[...S.top].map(k=>D.top[k].n.toLowerCase())].join(', ');
function sync(k){document.querySelectorAll('.opts').forEach(box=>box.querySelectorAll('.opt').forEach(b=>{const kk=box.dataset.k;b.setAttribute('aria-pressed',kk==='top'?S.top.has(b.dataset.id):S[kk]===b.dataset.id)}));
 if(!k||k==='tor')drawTor();if(!k||k==='pro')drawPro();if(!k||k==='sal')drawSal();if(!k||k==='top')drawTop();
 $('#tk-n').textContent='Taco '+(S.pro==='pastor'?'al pastor':'de '+D.pro[S.pro].n.toLowerCase());$('#tk-d').textContent=desc();
 const lvl=Math.min(5,D.pro[S.pro].s+D.sal[S.sal].s+(S.sal==='habanero'?1:0));sp.querySelectorAll('i').forEach((e,i)=>e.classList.toggle('on',i<lvl));sp.setAttribute('aria-label','Picante '+lvl+' de 5');
 $('#q').value=S.q;$('#q').textContent=S.q;$('#tk-p').textContent=mx(unit()*S.q)}
$('#qm').onclick=()=>{S.q=Math.max(1,S.q-1);sync('q')};$('#qp').onclick=()=>{S.q=Math.min(12,S.q+1);sync('q')};
// --- carta
const M=[
 ['Tacos','Taco al pastor','Trompo de cerdo adobado, piña asada, cebolla y cilantro.',32,'pic gf','#c4502a'],
 ['Tacos','Taco de asada','Arrachera al carbón, guacamole martajado y salsa roja.',38,'gf','#6e3b22'],
 ['Tacos','Coliflor tatemada','Coliflor al carbón, crema de semilla y salsa macha.',30,'veg gf pic','#e3cf98'],
 ['Tacos','Gobernador','Camarón, queso fundido, chile poblano en tortilla de harina.',46,'','#f09a6a'],
 ['Tacos','Hongos al ajillo','Setas, guajillo, epazote y queso fresco.',34,'veg gf','#a98c6a'],
 ['Tacos','Taco de pescado','Pescado capeado, col morada y aderezo de chipotle.',40,'pic','#eab45a'],
 ['Quesadillas','Quesadilla de flor','Flor de calabaza y quesillo en masa azul.',48,'veg gf','#8a84b4'],
 ['Quesadillas','Gringa al pastor','Harina, queso fundido y pastor con piña.',62,'pic','#f7e8c8'],
 ['Quesadillas','Chicharrón prensado','Masa amarilla, salsa verde cruda.',52,'gf pic','#f0c46a'],
 ['Bebidas','Agua de jamaica','Hecha en casa, poco dulce.',35,'veg gf','#a3123a'],
 ['Bebidas','Horchata de arroz','Canela y vainilla.',35,'veg gf','#efe6d2'],
 ['Bebidas','Michelada de la casa','Chamoy, limón y chile en polvo.',85,'pic','#d8592a'],
 ['Bebidas','Tepache','Piña fermentada y piloncillo.',40,'veg gf','#d99a2b'],
 ['Postres','Flan de cajeta','Cremoso, con nuez garapiñada.',58,'veg gf','#e3a447'],
 ['Postres','Churros con chocolate','Recién hechos, azúcar y canela.',64,'veg','#c88a4a'],
 ['Postres','Paleta de mango','Mango con chile y limón.',38,'veg gf pic','#f6b42a']].map((a,i)=>({i,cat:a[0],n:a[1],d:a[2],p:a[3],t:a[4].split(' ').filter(Boolean),c:a[5]}));
const TAG={veg:'Vegetariano',pic:'Picante',gf:'Sin gluten'};
const icon=(cat,c)=>{if(cat==='Tacos')return`<svg viewBox="0 0 84 84" aria-hidden="true"><path d="M10 40a32 32 0 0 0 64 0z" fill="#d29d3f"/><g fill="${c}">${[16,26,36,46,56].map((x,i)=>`<rect x="${x}" y="${32-i%2*4}" width="13" height="11" rx="3"/>`).join('')}</g><circle cx="30" cy="31" r="3" fill="#3f8a35"/><circle cx="52" cy="30" r="3" fill="#3f8a35"/><path d="M14 43a28 28 0 0 0 56 0z" fill="#f0c46a"/></svg>`;
 if(cat==='Quesadillas')return`<svg viewBox="0 0 84 84" aria-hidden="true"><path d="M8 58 A34 34 0 0 1 76 58z" fill="${c}"/><path d="M20 58q4 8 8 0q4 8 8 0q4 10 8 0q4 8 8 0q4 8 8 0" fill="#ffe08a"/><circle cx="30" cy="44" r="3" fill="#4a2206" opacity=".3"/><circle cx="50" cy="38" r="4" fill="#4a2206" opacity=".25"/></svg>`;
 if(cat==='Bebidas')return`<svg viewBox="0 0 84 84" aria-hidden="true"><path d="M22 18h40l-5 54H27z" fill="#fff3df33" stroke="#fff3df" stroke-width="3"/><path d="M25 34h34l-3.6 36H28.6z" fill="${c}"/><rect x="48" y="8" width="5" height="34" rx="2" fill="#e2412b" transform="rotate(14 50 25)"/><circle cx="58" cy="20" r="9" fill="#9cc05a"/></svg>`;
 return`<svg viewBox="0 0 84 84" aria-hidden="true"><ellipse cx="42" cy="62" rx="30" ry="8" fill="#fff3df33"/><path d="M20 60l6-26h32l6 26z" fill="${c}"/><path d="M26 34h32l-2 8q-14 6-28 0z" fill="#7a3b0a"/></svg>`};
let tab='Tacos';const F=new Set();
const tabs=$('#tabs');['Tacos','Quesadillas','Bebidas','Postres'].forEach(t=>{const b=document.createElement('button');b.className='tab';b.role='tab';b.type='button';b.textContent=t;b.onclick=()=>{tab=t;renderMenu()};tabs.appendChild(b)});
const fls=$('#fls');for(const k in TAG){const b=document.createElement('button');b.className='fl';b.type='button';b.dataset.k=k;b.textContent=TAG[k];b.setAttribute('aria-pressed','false');b.onclick=()=>{F.has(k)?F.delete(k):F.add(k);renderMenu()};fls.appendChild(b)}
function paintMenu(){tabs.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',b.textContent===tab));fls.querySelectorAll('.fl').forEach(b=>b.setAttribute('aria-pressed',F.has(b.dataset.k)));
 const list=M.filter(m=>m.cat===tab&&[...F].every(f=>m.t.includes(f)));
 $('#grid').innerHTML=list.length?list.map(m=>`<article class="it" style="view-transition-name:it${m.i}">${icon(m.cat,m.c)}<h3>${m.n}</h3><p>${m.d}</p><div class="tags">${m.t.map(t=>`<span>${TAG[t]}</span>`).join('')}</div><div class="row"><b>${mx(m.p)}</b><button class="plus" type="button" data-i="${m.i}" aria-label="Añadir ${m.n}">+</button></div></article>`).join(''):'<p class="empty">Nada con esos filtros en esta sección. Prueba quitando uno.</p>'}
const renderMenu=()=>document.startViewTransition&&!RM?document.startViewTransition(paintMenu):paintMenu();
$('#grid').onclick=e=>{const b=e.target.closest('.plus');if(!b)return;const m=M[b.dataset.i];add({n:m.n,d:m.cat.toLowerCase().replace(/s$/,''),u:m.p,q:1})};
// --- pedido
let cart=[];try{cart=JSON.parse(localStorage.getItem('lumbre-cart')||'[]')}catch(e){}
function add(it){const f=cart.find(c=>c.n===it.n&&c.d===it.d);f?f.q+=it.q:cart.push(it);saveCart();const cb=$('#cartb');cb.classList.remove('bump');void cb.offsetWidth;cb.classList.add('bump')}
function saveCart(){try{localStorage.setItem('lumbre-cart',JSON.stringify(cart))}catch(e){}renderCart()}
function renderCart(){const tot=cart.reduce((a,c)=>a+c.u*c.q,0);$('#cc').textContent=cart.reduce((a,c)=>a+c.q,0);
 $('#lines').innerHTML=cart.length?cart.map(c=>`<li><span>${c.q}× ${c.n}<small>${c.d}</small></span><span>${mx(c.u*c.q)}</span></li>`).join(''):'<li><span>Aún no hay nada. Arma un taco o toca + en la carta.</span></li>';
 $('#tot').textContent=mx(tot);
 const msg=cart.length?`Hola, La Lumbre. Quiero pedir:\n${cart.map(c=>`• ${c.q}× ${c.n} (${c.d}) — ${mx(c.u*c.q)}`).join('\n')}\nTotal: ${mx(tot)}\n¿Para recoger en 20 min?`:'Tu mensaje aparecerá aquí, listo para enviar.';
 $('#wa').textContent=msg;const s=$('#send');s.href=cart.length?'https://wa.me/?text='+encodeURIComponent(msg):'#carta';s.toggleAttribute('aria-disabled',!cart.length)}
$('#addT').onclick=()=>add({n:$('#tk-n').textContent,d:desc(),u:unit(),q:S.q});
$('#clr').onclick=()=>{cart=[];saveCart()};
sync();paintMenu();renderCart();
