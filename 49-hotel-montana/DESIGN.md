# DESIGN.md · Bruma Lodge

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | Gloock (serif de alto contraste, un peso) para titulares y horas; Albert Sans 300–600 para texto. |
| Color | Niebla #dfe3de (60) · verde bosque #20302c (30) · liquen #c8bd5a (10, CTA de reserva y horas). |
| Layout | Hero a sangre con la reserva siempre visible; cabañas en retícula que se reordena; “un día” con titular fijo y horas que avanzan. |
| Densidad | Media: la barra de reserva es densa, el resto respira. |
| Tono | Sensorial pero con datos (1.100 m, 45 min del aeropuerto, $120.000 el 4x4). |
| Motion (números) | Dither → foto 2,4 s power2.inOut tras la primera interacción; Flip 800 ms expo.inOut; horas con opacidad ligada al scroll; foto del valle escala 1,15 → 1. |

**Referencia real:** [Son Daven](https://sondaven.com/en). **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** Shader OGL de dither ordenado (Bayer 4×4) sobre la foto del hero: la imagen se revela desde puntos y el cursor abre un claro nítido; se carga por intención. Cabañas que se expanden con GSAP Flip.

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
