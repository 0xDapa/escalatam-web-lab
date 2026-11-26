# DESIGN.md · Andes 4x4

Decisiones cerradas antes de escribir UI (regla 0 de [`ANTI-AI-SLOP.md`](../ANTI-AI-SLOP.md)).

| Eje | Decisión |
|---|---|
| Tipo | Saira Stencil One para titulares en mayúsculas (taller, plantilla de pintura); Saira 300–800 con ancho variable para UI. |
| Color | Grafito #15191a (60) · hueso #e9ebe6 (30) · naranja seguridad #ff6a13 (10, CTA y selección). |
| Layout | Configurador a dos columnas con el vehículo fijo a la izquierda y opciones a la derecha; precio grande arriba. |
| Densidad | Alta en opciones (precio por línea), con el vehículo siempre visible (también fijo en móvil). |
| Tono | De taller y de ruta: 4.200 m, ripio, vadeo 70 cm. |
| Motion (números) | Entrada 1,1 s power3.out con 540° de llantas; rebote 4 × 160 ms; cambios de rueda 600 ms back.out(2); alza back.out(1.6); accesorios 300 ms. |

**Referencia real:** [Scout Motors](https://www.scoutmotors.com/). **Anti-referencias:** hero centrado con eyebrow + H1 + dos botones + tres tarjetas con icono; crema #F4F1EA + terracota #D97757; Space Grotesk + Instrument Serif + Inter; fade-up en cada sección; contadores animados; emojis como iconos.

**Un solo momento orquestado:** Configurador SVG propio: color, neumáticos (la rueda crece y sigue apoyada en el suelo), suspensión +2", carpa de techo, snorkel y winche cambian la silueta; el 4x4 entra rodando y la suspensión rebota al frenar.

Checklist aplicado: un acento con un trabajo · titulares 400–600 · `tabular-nums` en precios · sin sombras en reposo · una CTA por hero · texto ≥ 16 px con `text-wrap: pretty` · reseñas y cifras marcadas «de ejemplo» · sin scroll horizontal a 390 px.
