# Desatascos Levante 24 — Handoff de rediseño (para Claude Code)

Implementar en el repo existente (Next.js 16 + Tailwind 4, export estático). **No cambia:** rutas, `seo.ts`, sitemap/robots, JSON-LD, `consent.js`, `ContactButton` (lógica `tel:`/`wa.me`/conversión), variables `NEXT_PUBLIC_*`, `content.ts` (solo se amplía).

## Artboards de referencia
- `Inicio.dc.html` (1440) · `Inicio Movil.dc.html` (390)
- `Servicio.dc.html` (prop `service`) · `Ciudad.dc.html` (prop `city`)
- `Contacto.dc.html` · `Zonas y Legal.dc.html`
- `Cabecera.dc.html` / `Pie.dc.html` · `Sistema de diseño.dc.html`
- `Actual - Inicio.dc.html` = estado actual, solo referencia

## Tokens (sustituyen `:root` y `@theme` de globals.css)
```css
@theme {
  --color-bg:#f3f2f2; --color-surface:#eae9e9; --color-ink:#201e1d;
  --color-accent:#ec3013; --color-accent-600:#dd2b0f; --color-accent-700:#ae1800;
  --color-accent-100:#fff2ef; --color-neutral-700:#605d5d;
  --color-rule:color-mix(in srgb,#201e1d 40%,transparent);
  --font-sans:"Archivo",system-ui,sans-serif;
}
```
- Archivo 400/600/800 **autoalojada** (`next/font/local` o `@font-face` en `/public/fonts`, `font-display:swap`) — el README prohíbe Google Fonts.
- Radio 0 en todo. Sin sombras excepto el menú móvil abierto (`0 12px 32px rgba(45,43,43,.22)`).
- Reglas: `2px solid var(--color-rule)` entre celdas y secciones. Nunca 1px.
- Fotos: `filter:grayscale(1) contrast(1.08)` + pie "Imagen ilustrativa" (fondo `bg`, esquina inf. izq.).
- Rojo en texto pequeño: usar `accent-700`. Sobre fondo rojo solo texto ≥20px/600 o display.
- Focus: `outline:2px solid var(--color-accent); outline-offset:2px`.

## Tipografía
| Rol | Escritorio | Móvil | Peso / interlínea / tracking |
|---|---|---|---|
| Display (h1 hero, cierre) | 92–120px | 46–52px | 800 / .92–.98 / −.035–−.045em |
| H2 sección | 52–60px | 36px | 800 / 1.0 / −.03em |
| H3 fila | 26–32px | 20–21px | 800 / 1.1 / −.02em |
| Lead | 18–21px | 16–17px | 400 / 1.5 |
| Cuerpo | 16–17px | 15px | 400 / 1.5 |
| Kicker `NN — Título` | 13px mayús. | 12px | 600 / +.08em, color accent-700 |

## Retícula
12 columnas sin gutter; las celdas se separan con reglas. Márgenes laterales: 48 (≥1100) / 32 (≥760) / 20 (<760). Patrón dominante: 5|7 o 4|8 (título izquierda, contenido derecha), 7|5 en hero.

## Componentes
- **Botón llamada**: `bg accent`, texto `bg`, etiqueta a la izquierda, icono teléfono. Alturas: hero 96, contenido 80, cabecera 76 (ancho 240), móvil 64–80. Hover `accent-600`, active `accent-700`.
- **Botón WhatsApp**: transparente, borde 2px tinta (o regla lateral si va emparejado). En cierre rojo: borde superior 2px `bg`.
- **Par CTA hero**: grid `1.35fr 1fr` dentro de borde 2px tinta. Microcopy 14px neutral-700 debajo.
- **Fila índice** (servicios, zonas, FAQ): grid `72px 1fr 36px`, padding 30/48, regla inferior, hover `surface`.
- **FAQ**: mantener `<details>/<summary>` nativo (tests); `+`/`−` en accent 32px.
- **Cabecera escritorio** (76px): marca | nav 15/600 (activo: color + subrayado 2px accent) | "24 h · 365 días" | WhatsApp | Llamar 24 h. Sustituye topbar.
- **Cabecera móvil** (64px, sticky): marca | Llamar (rojo) | menú 64×64. Menú abierto: enlaces 26/800 con reglas + par de botones + nota provincia.
- **Barra móvil fija** (`.mobile-contact`): grid `1.5fr 1fr`, 64px, borde superior 2px tinta, `padding-bottom: env(safe-area-inset-bottom)`. Footer `padding-bottom: 96px`.
- **Cierre rojo**: `bg accent`, h2 display en `bg`, columna derecha con botón tinta 96px + WhatsApp 80px.

## Páginas
- **Inicio**: Hero → franja de 5 ciudades → 01 Servicios (6 filas; las 4 primeras → `/servicios/desatascos-24-horas/`, las 2 últimas → `/servicios/inspeccion-camara-tuberias/`) → 02 24 h + "Mientras esperas" → 03 Cámara (permite / condiciona) → 04 Cómo funciona → 05 Zonas (norte→sur) → 06 Cómo trabajamos → 07 FAQ → Cierre → Pie.
- **Servicio**: añadir a `services` en content.ts: `scopeKicker`, `scopeTitle`, `scopeIntro`, `scope[4]`, `bodyTitle`, `cta` (valores en `Servicio.dc.html`).
- **Ciudad**: masthead con nombre a 184px; usa campos existentes (`headline`, `intro`, `context`, `areas`, `scenario`, `tip`, `question`). Añadir `image` por ciudad para variar la foto. FAQ propia primero.
- **Contacto**: dos columnas teléfono / WhatsApp; mantener estados "pendiente de activar" de la página actual dentro de la caja del número cuando no hay env.
- **Legal**: índice lateral 3 col + artículo 7 col; `dl` con reglas 2px; aviso pendiente en `accent-100`.

## Iconos
Reutilizar `Icon.tsx` (phone, chat, arrow, check, pin, pipe, menu, close) con `strokeWidth=2`, `strokeLinecap="square"`.

## Validación
`npm test`, `npm run typecheck`, `npm run build`, `npm run test:browser` (axe AA, menú móvil, FAQ). Comprobar contraste del texto sobre rojo y que ningún `tel:` ficticio aparece sin `NEXT_PUBLIC_PHONE`.
