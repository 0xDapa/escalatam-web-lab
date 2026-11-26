// 30 · Lacada — probador de manicura en SVG (color, acabado, forma) + reserva → WhatsApp. Vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const hdr=$('.top');addEventListener('scroll',()=>hdr.classList.toggle('sc',scrollY>innerHeight*.7),{passive:true});
const COL=[['Cereza','#b3122c'],['Coral','#f05a4f'],['Durazno','#f6a07a'],['Nude','#d9a48b'],['Rosa bebé','#f5b8c8'],['Fucsia','#d6246e'],['Lila','#b49cdb'],['Cielo','#8ec5e8'],['Pistacho','#a9c98a'],['Mostaza','#e0a92e'],['Chocolate','#5b3324'],['Noche','#1d1b2f']];
// dedos: [centro x, punta y, giro]; el pulgar gira desde la base de la palma
const F=[[110,196,-4],[146,128,-1.5],[182,100,0],[218,122,2],[236,236,50]],FW=34;
const S={almendra:(w,h)=>`M0 ${h} L0 ${h*.42} C0 ${h*.1} ${w*.28} 0 ${w/2} 0 C${w*.72} 0 ${w} ${h*.1} ${w} ${h*.42} L${w} ${h} Z`,
 cuadrada:(w,h)=>`M0 ${h} L0 ${h*.1} Q0 0 ${w*.12} 0 L${w*.88} 0 Q${w} 0 ${w} ${h*.1} L${w} ${h} Z`,
 corta:(w,h)=>`M0 ${h} L0 ${h*.5} C0 ${h*.28} ${w*.25} ${h*.24} ${w/2} ${h*.24} C${w*.75} ${h*.24} ${w} ${h*.28} ${w} ${h*.5} L${w} ${h} Z`};
let col=0,fin='brillo',shape='almendra';const g=$('#hand-g');
const P={brillo:65,mate:70,cromo:85,francesa:75};
function draw(){const c=COL[col][1],w=24,h=shape==='corta'?34:40;
 g.innerHTML=`<rect x="88" y="286" width="166" height="230" rx="56" fill="url(#skin)"/>`+F.map(([x,y,r],i)=>{const d=S[shape](w,h),id='c'+i;
 const base=fin==='francesa'?`<path d="${d}" fill="#f6dccf"/><clipPath id="${id}"><path d="${d}"/></clipPath><rect clip-path="url(#${id})" width="${w}" height="${h*.32}" fill="${c}"/>`:`<path class="nail" d="${d}" fill="${c}"/>`;
 const fx=fin==='brillo'?`<path d="${d}" fill="url(#gloss)" opacity=".8"/>`:fin==='cromo'?`<path d="${d}" fill="url(#chrome)"/>`:'';
 const L=i===4?120:330-y;const tr=i===4?`rotate(${r} 236 350)`:`rotate(${r} ${x} 340)`;
 return `<g transform="${tr}"><rect x="${x-FW/2}" y="${y}" width="${FW}" height="${L+40}" rx="${FW/2}" fill="url(#skin)"/><path d="M${x-8} ${y+L*.55} q8 4 16 0" stroke="#c98a6e" stroke-width="1.4" fill="none" opacity=".6"/><g transform="translate(${x-w/2} ${y+5})">${base}${fx}<path d="${d}" fill="none" stroke="#00000026"/></g></g>`}).join('');
 $('#cname').textContent=COL[col][0];$('#price').textContent='S/ '+P[fin];$('.total span').textContent=(fin==='francesa'?'Francesa':fin==='cromo'?'Semipermanente + cromo':fin==='mate'?'Semipermanente mate':'Semipermanente')+' · 60 min';
 $('#chosen').textContent=`Diseño elegido: ${COL[col][0]} · ${fin[0].toUpperCase()+fin.slice(1)} · ${shape[0].toUpperCase()+shape.slice(1)}`}
const sw=$('#sw');COL.forEach(([n,c],i)=>{const b=document.createElement('button');b.type='button';b.style.setProperty('--c',c);b.setAttribute('aria-label',n);b.setAttribute('aria-pressed',i===0);b.title=n;
 b.onclick=()=>{col=i;$$('button',sw).forEach(x=>x.setAttribute('aria-pressed',x===b));draw()};sw.appendChild(b)});
const seg=(id,set)=>$$(`#${id} button`).forEach(b=>b.addEventListener('click',()=>{$$(`#${id} button`).forEach(x=>x.setAttribute('aria-pressed',x===b));set(b.dataset.v);draw()}));
seg('fin',v=>fin=v);seg('shape',v=>shape=v);draw();
const t=new Date();t.setDate(t.getDate()+1);$('[name=d]').value=t.toISOString().slice(0,10);$('[name=d]').min=t.toISOString().slice(0,10);
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
 open('https://wa.me/?text='+encodeURIComponent(`¡Hola Lacada! Soy ${f.get('n')}. Quiero cita de ${f.get('s')} el ${f.get('d')} a las ${f.get('h')}. ${$('#chosen').textContent}.`),'_blank','noopener')});}
