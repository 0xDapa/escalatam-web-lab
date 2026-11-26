# DESIGN.md · Selva Mate

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | Shrikhand (display, un peso) para titulares; Rethink Sans 400–700 para todo lo demás. |
| Color | Un universo por sabor: limón #1f5a32/#f3efd8, maracuyá #f2b705/#2a1a05, jamaica #8c1b3a/#fbe7ec. Siempre dos tonos + blanco de etiqueta. |
| Layout | Lata protagonista a la derecha, titular gordo a la izquierda; configurador en bloque invertido. |
| Densidad | Media; el configurador muestra las latas como fichas para ver la caja llenarse. |
| Tono | Juguetón y corto (“Mate que hace fsss”), con datos de etiqueta. |
| Motion (números) | Lata: giro continuo 0,5 rad/s + scroll ×4 + puntero; cambio de sabor = vuelta completa 1 s expo.out y fundido de color 500 ms; etiqueta 300 ms stagger .06. |

**Referencia real:** [Mana Yerba Mate](https://manayerbamate.com/). **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** Lata 3D en Three.js con etiqueta pintada en un canvas (sin modelos descargados) que sustituye a un póster SVG al primer gesto; el sabor cambia la lata, la etiqueta y el color de toda la página.

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
