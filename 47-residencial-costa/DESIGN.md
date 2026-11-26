# DESIGN.md · Mirador del Faro

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | Bodoni Moda 400–700 (didona, itálica en el acento del titular); Archivo 300–700 con ancho 100–115 % para datos. |
| Color | Día: niebla #eef2f3 / marino #14213a / verde mar #0f6f73. Noche: #0e1626 / #e9eef2 / ámbar #f2c36b. |
| Layout | Plano como protagonista: titular + plano SVG a la izquierda, foto a sangre a la derecha; unidades en retícula de ficha técnica. |
| Densidad | Alta en la tabla de unidades (precio, m², planta, estado), baja en el hero. |
| Tono | Notarial y concreto: m², plantas, euros. Cero “lujo exclusivo”. |
| Motion (números) | Plano: muros 1,2 s stagger .08, puertas 400 ms, rótulos 300 ms; Flip 600 ms expo.out; día/noche 900 ms fundido de foto; escala de foto con scrub. |

**Referencia real:** [ERA Residence](https://www.era-residence.com/). **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** El plano de la vivienda se dibuja como hero (muros → puertas → rótulos con stroke-dashoffset); botón día/noche que cambia paleta y foto; filtro de 12 viviendas animado con GSAP Flip.

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
