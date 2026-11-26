# DESIGN.md · Lúa Clínica

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | Newsreader (óptico fijado a 48, 300–600) para titulares en itálica sobria; Hanken Grotesk 300–600 para lectura. |
| Color | Salvia #e4e8df (60) · tinta #1d2420 (30) · vino #7a2e3a (10, solo CTA y duotono). Nada de crema + terracota. |
| Layout | Editorial de clínica: titular a la izquierda, carrusel vertical 4:5 a la derecha; tratamientos como índice de revista. |
| Densidad | Media-baja: legibilidad primero (17 px, 1.6), un bloque por pantalla. |
| Tono | Primera persona del equipo, sin promesas médicas; cifras marcadas de ejemplo. |
| Motion (números) | Barra del carrusel 5 s lineal; cambio de diapositiva 350 ms salida + 900 ms clip-path expo.out; manifiesto scrub por palabra (stagger .05); peek 300 ms. |

**Referencia real:** [Odyssée Clinic](https://odysseeclinic.com.au/). **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** Fotos en duotono CSS (salvia + vino) con carrusel de barra única y revelado por clip-path; manifiesto cuyas palabras pasan de tenue a tinta con el scroll; vista previa que sigue al tratamiento bajo el cursor.

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
