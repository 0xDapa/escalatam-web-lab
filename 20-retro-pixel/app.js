// Barbería Píxel — escritorio retro: ventanas arrastrables, simulador pixel-art (canvas 32×32) y agenda.
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];let z=10;
const wins=$$('.win');
function focus(w){w.classList.remove('hide');w.style.zIndex=++z;wins.forEach(o=>o.classList.toggle('inactive',o!==w));tasks()}
function tasks(){$('#tasks').innerHTML=wins.map(w=>`<button class="btn" data-w="${w.id}" aria-pressed="${!w.classList.contains('hide')&&!w.classList.contains('inactive')}">${w.querySelector('.tb span').textContent.split(/[ .—]/)[0]}</button>`).join('')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-w]');if(b){const w=document.getElementById(b.dataset.w);focus(w);if(innerWidth<=980)w.scrollIntoView({behavior:'smooth',block:'start'})}
 const m=e.target.closest('[data-min]');if(m){m.closest('.win').classList.add('hide');tasks()}});
wins.forEach(w=>w.addEventListener('pointerdown',()=>focus(w)));
// arrastre por la barra de título (sólo escritorio)
wins.forEach(w=>{const tb=w.querySelector('.tb');let sx,sy,ox,oy,drag=false;
 tb.addEventListener('pointerdown',e=>{if(innerWidth<=980||e.target.closest('button'))return;drag=true;tb.setPointerCapture(e.pointerId);sx=e.clientX;sy=e.clientY;ox=w.offsetLeft;oy=w.offsetTop;tb.style.cursor='grabbing'});
 tb.addEventListener('pointermove',e=>{if(!drag)return;w.style.left=Math.max(0,Math.min(innerWidth-120,ox+e.clientX-sx))+'px';w.style.top=Math.max(0,oy+e.clientY-sy)+'px'});
 tb.addEventListener('pointerup',()=>{drag=false;tb.style.cursor=''})});
$('#crt').onclick=()=>document.documentElement.classList.toggle('crt');
const clk=()=>{const d=new Date();$('#clk').textContent=d.toTimeString().slice(0,5)};clk();setInterval(clk,15e3);
// --- simulador pixel-art ---
const cv=$('#av'),g=cv.getContext('2d');const SK='#f1b98a',SK2='#d9946a';
const S={hair:'fade',beard:'candado',col:'#2b1a0e'};
const HAIR={fade:'Fade medio',pomp:'Pompadour',rapado:'Rapado',rizos:'Rizos',mohi:'Cresta'};
const BEARD={no:'Sin barba',candado:'Candado',completa:'Completa',bigote:'Bigote'};
const COL={'#2b1a0e':'Castaño','#0d0d0d':'Negro','#d9a441':'Rubio','#ff4fd8':'Fantasía'};
const P={fade:35000,pomp:38000,rapado:25000,rizos:40000,mohi:42000};const PB={no:0,candado:10000,completa:15000,bigote:8000};
function r(x,y,w,h,c){g.fillStyle=c;g.fillRect(x,y,w,h)}
function draw(){g.clearRect(0,0,32,32);r(0,0,32,32,'#9fe8ff');for(let i=0;i<32;i+=4)r(i,28,2,4,'#7fd0ea');
 r(9,26,14,6,'#1a1aa8');r(13,24,6,3,SK2);// cuello y camiseta
 r(9,8,14,16,SK);r(8,13,1,4,SK2);r(23,13,1,4,SK2);// cara + orejas
 r(12,14,2,2,'#111');r(18,14,2,2,'#111');r(12,12,3,1,S.col);r(17,12,3,1,S.col);r(15,16,2,3,SK2);r(14,20,4,1,'#a2493a');
 const c=S.col;
 if(S.hair==='fade'){r(9,5,14,4,c);r(9,9,1,3,c+'99');r(22,9,1,3,c+'99');r(10,4,12,1,c)}
 if(S.hair==='pomp'){r(9,6,14,3,c);r(10,2,13,4,c);r(12,1,10,1,c);r(9,9,1,2,c)}
 if(S.hair==='rapado'){r(9,7,14,2,c+'55');r(10,6,12,1,c+'55')}
 if(S.hair==='rizos'){for(let x=8;x<25;x+=2)for(let y=3;y<10;y+=2)if((x+y)%4!==1)r(x,y,2,2,c);r(8,10,2,3,c);r(22,10,2,3,c)}
 if(S.hair==='mohi'){r(9,7,14,2,c+'55');r(14,0,4,9,c);r(13,2,1,5,c)}
 const b=S.col;if(S.beard==='candado'){r(13,19,6,1,b);r(13,21,6,3,b);r(12,20,1,2,b);r(19,20,1,2,b)}
 if(S.beard==='completa'){r(9,17,2,5,b);r(21,17,2,5,b);r(10,21,12,4,b);r(13,19,6,1,b);r(14,20,4,1,'#a2493a')}
 if(S.beard==='bigote'){r(12,19,8,1,b);r(11,20,2,1,b);r(19,20,2,1,b)}
 $('#sim-p').textContent=`${HAIR[S.hair]} + ${BEARD[S.beard].toLowerCase()} · ${COL[S.col].toLowerCase()} · ${(P[S.hair]+PB[S.beard]).toLocaleString('es-CO')} COP`}
function opts(id,map,key){const el=$(id);el.innerHTML=Object.entries(map).map(([k,v])=>`<button class="btn" data-k="${k}" aria-pressed="${S[key]===k}">${v}</button>`).join('');
 el.onclick=e=>{const b=e.target.closest('button');if(!b)return;S[key]=b.dataset.k;el.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()}}
opts('#o-hair',HAIR,'hair');opts('#o-beard',BEARD,'beard');opts('#o-col',COL,'col');draw();
// --- agenda ---
const sl=$('#slots');let pick=null;['10:00','10:40','11:20','12:00','14:00','14:40','15:20','16:00','16:40','17:20','18:00','18:40'].forEach((h,i)=>{const b=document.createElement('button');b.className='btn';b.textContent=h;b.disabled=[1,3,4,7,8].includes(i);b.setAttribute('aria-pressed','false');
 b.onclick=()=>{sl.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');pick=h};sl.append(b)});
$('#book').onclick=()=>{if(!pick){$('#ag-msg').textContent='> ERROR: elige una hora primero';return}let k=0;$('#ag-msg').textContent='> Reservando turno...';
 const t=setInterval(()=>{k+=12.5;$('#pb').style.width=k+'%';if(k>=100){clearInterval(t);$('#ag-msg').textContent=`> OK: turno a las ${pick} (demo) · ${$('#sim-p').textContent.split(' · ')[0]}`}},140)};
focus($('#w-main'));
