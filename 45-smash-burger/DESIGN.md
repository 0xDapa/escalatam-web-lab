# DESIGN.md · Brava Smash Club

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | Bowlby One (display, un solo peso) para titulares de cartel; Familjen Grotesk 400–700 para texto y precios con tabular-nums. |
| Color | Verde pepinillo #1d2b17 (60) · papel #fbeed0 (30) · mostaza #ffc21a (10, solo CTA y precios); rojo #c92c15 reservado a la sección del método. |
| Layout | Póster de street food: hero asimétrico con la burger SVG a la derecha y una sola CTA; menú en lista de ticket, no tarjetas. |
| Densidad | Alta en el menú (precio y botón en la misma línea), aire grande en el hero y el método. |
| Tono | Barrio, corto, con números reales del proceso (90 g, 230 °C, 10 s). Sin “experiencia gastronómica”. |
| Motion (números) | Apilado de la burger 7 capas × 90 ms con bounce.out (≈1,1 s); método fijado 300 % de alto con scrub 0,6; botones 160 ms scale .97; cuerda Verlet a 60 fps solo con puntero fino. |

**Referencia real:** [Crav Burgers](https://cravburgers.shop/). **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** Hamburguesa SVG que se apila con rebote; sección del método fijada con espátula, queso y vapor ligados al scroll (0→230 °C); cuerda de ingredientes con física Verlet que sigue al cursor.

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
