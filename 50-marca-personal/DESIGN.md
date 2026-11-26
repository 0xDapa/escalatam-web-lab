# DESIGN.md · Martina Vega

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | Anybody variable: 600 a 150 % de ancho para el nombre, 60 % para cifras, 85–115 % para texto. Una familia con voz. |
| Color | Tiza #efeee8 (60) · verde pista #10261b (30) · amarillo pelota #d9ec2c (10, selección y bloque de reseñas). |
| Layout | El trabajo primero: nombre a sangre, foto y frase en primera persona, cifras en fila con regla gruesa. |
| Densidad | Baja arriba, alta en la reserva (días y horas en rejilla). |
| Tono | Primera persona, concreta y con humor seco (“si no lo haces, lo voy a notar”). |
| Motion (números) | Ancho 50 → 150 % en 1,1 s expo.out stagger .12; firma 900 ms power1.inOut; respiración con scrub .4; nada más se anima al entrar. |

**Referencia real:** [Lando Norris](https://landonorris.com/). **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** El nombre gigante “respira” animando el eje de ancho de la fuente (50 → 150 %) y una firma SVG se escribe encima; con el scroll “Martina” se comprime y “Vega” se desplaza.

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
