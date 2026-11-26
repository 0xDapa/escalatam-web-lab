# DESIGN.md · Pliegue Arquitectos

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | Schibsted Grotesk 400–600 únicamente; titulares a 600 con tracking −0,055 em, sin segunda familia. |
| Color | Hormigón claro #e9e9e6 (60) · tinta #161616 (30) · azul cobalto #2340d9 (10, solo hover/estado). |
| Layout | Foto grande, poco texto: titular enorme, una línea de contexto, la obra en tira horizontal; calculadora en bloque negro. |
| Densidad | Baja: la fotografía manda; datos de proyecto en una línea con tabular-nums. |
| Tono | De estudio: lote, norma, curaduría, obra. Frases cortas. |
| Motion (números) | Clip-path del hero ligado al scroll; tira horizontal scrub .5; View Transition 550 ms cubic-bezier(.16,1,.3,1); fases 800 ms stagger .1 una sola vez. |

**Referencia real:** [OH Architecture + MERSI](https://www.oharchitecture.com.au/) · [www.mersi-architecture.com](https://www.mersi-architecture.com/). **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** Tira de proyectos horizontal fijada al scroll (MERSI); al abrir un proyecto la foto “vuela” a pantalla completa con la View Transitions API nativa; foto del hero que se abre desde una franja (OH).

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
