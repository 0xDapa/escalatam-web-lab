// 27 · Hotel Pasaje — vanilla.
{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// portada: miniaturas + autoplay
const sl=$$('.slides img'),th=$$('.thumbs button');let cur=0;
const go=i=>{cur=i;sl.forEach((s,k)=>s.classList.toggle('on',k===i));th.forEach((t,k)=>t.setAttribute('aria-selected',k===i))};
th.forEach((t,i)=>t.addEventListener('click',()=>{go(i);clearInterval(auto)}));
const auto=RM?0:setInterval(()=>go((cur+1)%sl.length),5000);
// fechas por defecto: mañana y pasado mañana
const d=new Date();const f=x=>x.toISOString().slice(0,10);const a=new Date(d.getTime()+864e5),b=new Date(d.getTime()+3*864e5);
const fi=$('[name=in]'),fo=$('[name=out]');fi.value=f(a);fo.value=f(b);fi.min=f(d);fo.min=f(a);
fi.addEventListener('change',()=>{if(fo.value<=fi.value){const n=new Date(fi.value);n.setDate(n.getDate()+1);fo.value=f(n)}});
$('#reservar').addEventListener('submit',e=>{e.preventDefault();const F=new FormData(e.target);
 const m=`Hola Hotel Pasaje, quiero reservar: ${F.get('r')}, ${F.get('g')}, del ${F.get('in')} al ${F.get('out')}. ¿Tienen disponibilidad?`;
 open('https://wa.me/?text='+encodeURIComponent(m),'_blank','noopener')});
// habitaciones
const R=[['Estudio','18 m² con cama queen, escritorio de nogal y ducha de lluvia. Para quien viene a caminar la ciudad.','18 m²','Queen','$2.450 MXN','cama'],
['Balcón','24 m² con balcón francés a la calle arbolada, cama king y sillón de lectura. La favorita de las parejas.','24 m²','King','$3.200 MXN','habitacion'],
['Suite Pasaje','42 m² en la planta alta: sala, tina exenta, tocadiscos con selección de vinilos y vista al patio.','42 m²','King + sofá cama','$5.400 MXN','suite']];
const body=$('.r-body');
$$('.r-tabs button').forEach(b=>b.addEventListener('click',()=>{const r=R[+b.dataset.i];$$('.r-tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));
 body.classList.add('sw');setTimeout(()=>{$('#r-h').textContent=r[0];$('#r-p').textContent=r[1];$('#r-m').textContent=r[2];$('#r-b').textContent=r[3];$('#r-pr').textContent=r[4];$('#r-img').src=`img/${r[5]}-960.webp`;$('[name=r]').value=r[0];body.classList.remove('sw')},RM?0:250)}));
// boletín
$('#news').addEventListener('submit',e=>{e.preventDefault();$('.ok',e.target).hidden=false;e.target.querySelector('input').value=''});}
