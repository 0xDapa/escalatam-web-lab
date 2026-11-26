// Andes 4x4 — referencia: scoutmotors.com (configurador protagonista, tono de taller, foto de terreno real).
// Configurador en SVG propio: cada opción cambia la silueta, el precio y la cuota a la vez.
import { gsap, ScrollTrigger, smooth, header, initLang, getLang, reduce, $, $$, waLink, lines } from '../lib/core.js';
const E = () => getLang() === 'en';
const clp = n => '$' + Math.round(n).toLocaleString(E() ? 'en-US' : 'es-CL');
const BASE = 31990000;
const COLORS = [{ id: 'arena', c: '#d9d4c3', es: 'Arena', en: 'Sand' }, { id: 'bosque', c: '#4c5a3f', es: 'Bosque', en: 'Forest' }, { id: 'glaciar', c: '#b9cdd6', es: 'Glaciar', en: 'Glacier' }, { id: 'carbon', c: '#3a3f42', es: 'Carbón', en: 'Charcoal' }, { id: 'cobre', c: '#9a5a3a', es: 'Cobre', en: 'Copper' }];
const TIRES = [{ id: 'ht', r: 48, p: 0, es: ['Ruta 17"', 'Silencioso, para asfalto y ripio suave'], en: ['Highway 17"', 'Quiet, for tarmac and light gravel'] },
  { id: 'at', r: 51, p: 1290000, es: ['All-terrain 17"', 'El equilibrio: ciudad entre semana, cordillera el sábado'], en: ['All-terrain 17"', 'The balance: city on weekdays, mountains on Saturday'] },
  { id: 'mt', r: 55, p: 2450000, es: ['Mud-terrain 18"', 'Barro y piedra. Más ruido en carretera'], en: ['Mud-terrain 18"', 'Mud and rock. Louder on the highway'] }];
const EXTRAS = [{ id: 'lift', p: 1890000, es: ['Suspensión +2"', '+5 cm de despeje'], en: ['Suspension +2"', '+5 cm clearance'] },
  { id: 'rack', p: 2890000, es: ['Barras + carpa de techo', 'Para 2 personas, abre en 1 minuto'], en: ['Roof bars + tent', 'Sleeps 2, opens in 1 minute'] },
  { id: 'snorkel', p: 690000, es: ['Snorkel', 'Vadeo hasta 70 cm'], en: ['Snorkel', 'Wading up to 70 cm'] },
  { id: 'winch', p: 1150000, es: ['Winche 4.300 kg', 'Con defensa reforzada'], en: ['Winch 4,300 kg', 'With reinforced bumper'] }];
const st = { color: 'arena', tire: 'at', ex: new Set(['rack']) };

function renderOpts() {
  $('#colors').innerHTML = COLORS.map(c => `<label><input type="radio" name="color" value="${c.id}"${c.id === st.color ? ' checked' : ''}><i style="--c:${c.c}"></i>${E() ? c.en : c.es}</label>`).join('');
  $('#tires').innerHTML = TIRES.map(t => { const x = E() ? t.en : t.es; return `<label><input type="radio" name="tire" value="${t.id}"${t.id === st.tire ? ' checked' : ''}><span>${x[0]}<small>${x[1]}</small></span><b>${t.p ? '+' + clp(t.p) : (E() ? 'Included' : 'Incluido')}</b></label>`; }).join('');
  $('#extras').innerHTML = EXTRAS.map(t => { const x = E() ? t.en : t.es; return `<label><input type="checkbox" name="ex" value="${t.id}"${st.ex.has(t.id) ? ' checked' : ''}><span>${x[0]}<small>${x[1]}</small></span><b>+${clp(t.p)}</b></label>`; }).join('');
}
const total = () => BASE + TIRES.find(t => t.id === st.tire).p + [...st.ex].reduce((a, id) => a + EXTRAS.find(e => e.id === id).p, 0);
const desc = () => { const c = COLORS.find(x => x.id === st.color), t = TIRES.find(x => x.id === st.tire);
  return [E() ? c.en : c.es, (E() ? t.en : t.es)[0], ...[...st.ex].map(id => (E() ? EXTRAS.find(e => e.id === id).en : EXTRAS.find(e => e.id === id).es)[0])].join(' · '); };

// Dibujo: color, tamaño de rueda (siempre apoyada en el suelo), alzas y accesorios
function draw(animate = true) {
  const t = TIRES.find(x => x.id === st.tire), lift = st.ex.has('lift') ? -12 : 0, dur = animate && !reduce ? .6 : 0;
  $('#truck').style.setProperty('--paint', COLORS.find(c => c.id === st.color).c);
  $$('.wheel').forEach((w, i) => { w.classList.remove('ht', 'at', 'mt'); w.classList.add(t.id);
    gsap.to(w, { attr: { transform: `translate(${i ? 600 : 180} ${262 - t.r}) scale(${t.r / 48})` }, duration: dur, ease: 'back.out(2)' }); });
  gsap.to('#body', { y: lift - (t.r - 48), duration: dur, ease: 'back.out(1.6)' });
  ['rack', 'snorkel', 'winch'].forEach(id => $('#' + id).classList.toggle('on', st.ex.has(id)));
}
function update(animate) {
  draw(animate);
  const p = total(); $('#price').textContent = clp(p); $('#spec').textContent = desc(); credit();
}
$('#opts').addEventListener('change', e => { const i = e.target;
  if (i.name === 'color') st.color = i.value; if (i.name === 'tire') st.tire = i.value;
  if (i.name === 'ex') i.checked ? st.ex.add(i.value) : st.ex.delete(i.value); update(true); });

// Crédito: cuota francesa con tasa mensual de ejemplo
function credit() {
  const p = total(), pie = +$('#pie').value / 100, n = +$('input[name=plazo]:checked').value, r = .0129, cap = p * (1 - pie);
  const q = cap * r / (1 - Math.pow(1 + r, -n));
  $('#o-pie').textContent = `${Math.round(pie * 100)} % · ${clp(p * pie)}`; $('#cuota').textContent = clp(q);
  $('#cr-det').textContent = E() ? `${n} instalments · financed ${clp(cap)}` : `${n} cuotas · financias ${clp(cap)}`;
  $('#crwa').href = waLink(E() ? `Hi Andes 4x4, I'd like a quote for: ${desc()}. Price ${clp(p)}, down payment ${Math.round(pie * 100)}%, ${n} instalments of approx. ${clp(q)}.` : `Hola Andes 4x4, quiero cotizar: ${desc()}. Precio ${clp(p)}, pie ${Math.round(pie * 100)} %, ${n} cuotas de aprox. ${clp(q)}.`);
}
$('.cr-in').addEventListener('input', credit);

// Prueba de manejo
const d0 = new Date(); d0.setDate(d0.getDate() + 2); $('#pdate').min = d0.toISOString().slice(0, 10); $('#pdate').value = d0.toISOString().slice(0, 10);
function drive() { const r = $('#route'), rt = r.options[r.selectedIndex].textContent;
  $('#drivewa').href = waLink(E() ? `Hi Andes 4x4, I'd like a test drive on ${$('#pdate').value}, route: ${rt}. Build I'm interested in: ${desc()}.` : `Hola Andes 4x4, quiero una prueba de manejo el ${$('#pdate').value}, ruta: ${rt}. Me interesa: ${desc()}.`); }
$('#drive').addEventListener('input', drive);

addEventListener('langchange', () => { renderOpts(); update(false); drive(); });
renderOpts(); initLang(); update(false); drive();
smooth(); header();

if (!reduce) {
  lines($('#h1'));
  // Momento orquestado: el 4x4 entra rodando y la suspensión rebota al frenar
  const tl = gsap.timeline({ scrollTrigger: { trigger: '#truck', start: 'top 80%', once: true } });
  tl.from('#truck', { x: -260, opacity: 0, duration: 1.1, ease: 'power3.out' })
    .from('.wheel .spoke', { rotation: -540, svgOrigin: '0 0', duration: 1.1, ease: 'power3.out' }, 0)
    .fromTo('#body', { rotation: 0 }, { rotation: 1.6, svgOrigin: '400 214', duration: .16, yoyo: true, repeat: 3, ease: 'sine.inOut' }, '-=.25');
  gsap.fromTo('.g3 img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.g3', start: 'top bottom', end: 'bottom top', scrub: true } });
}
