repo: Webmaker2026/desatascoslevante24.es
branch: main

## Last sync
date: 2026-10-12
source: uploaded project folder (desatascoslevante24.es-main)

### Updated in this project
- Recreated current homepage as reference (Actual - Inicio)
- Full redesign on the Modernist design system: home desktop + mobile, service, city, contact, zones, legal
- Shared header, footer and sticky mobile call bar as child components
- Developer handoff in docs/HANDOFF.md

## Screen map
| Screen | Repo files |
| --- | --- |
| Actual - Inicio.dc.html | src/app/page.tsx, src/components/Site.tsx, src/components/Header.tsx, src/app/globals.css |
| Inicio.dc.html / Inicio Movil.dc.html | src/app/page.tsx, src/components/Site.tsx, src/lib/content.ts |
| Servicio.dc.html | src/app/servicios/[slug]/page.tsx, src/lib/content.ts |
| Ciudad.dc.html | src/app/[city]/page.tsx, src/lib/content.ts |
| Contacto.dc.html | src/app/contacto/page.tsx |
| Zonas y Legal.dc.html | src/app/zonas/page.tsx, src/components/Legal.tsx |
| Cabecera.dc.html / Pie.dc.html | src/components/Header.tsx, src/components/Site.tsx (Footer) |
