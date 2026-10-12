# Desatascos Levante 24 — sitio web

Sitio estático (diseño «Inicio v3») servido por Cloudflare Workers Static Assets desde `dist/`.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/content.mjs` | Textos: servicios, ciudades, FAQ |
| `src/static/` | CSS, JS, fuentes autoalojadas, imágenes, `_headers`, icono |
| `scripts/build.mjs` | Genera `dist/` (una carpeta `index.html` por ruta + `404.html`, `sitemap.xml`, `robots.txt`) |
| `scripts/check.mjs` | Verifica que todos los enlaces internos de `dist/` existen, viewport, `<title>` y un único `h1` |
| `site.config.json` | Teléfono, WhatsApp (E.164, p. ej. `+34600000000`), datos legales, `live` |
| `wrangler.jsonc` | `assets.directory = ./dist`, `auto-trailing-slash`, `404-page` |
| `*.dc.html`, `assets/`, `support.js`, `image-slot.js`, `_ds/`, `uploads/` | Archivos de diseño de referencia; **no se publican** |

## Rutas publicadas

`/`, `/servicios/desatascos-24-horas/`, `/servicios/inspeccion-camara-tuberias/`, `/zonas/`, `/contacto/`,
`/desatascos-alicante/`, `/desatascos-benidorm/`, `/desatascos-torrevieja/`, `/desatascos-elche/`, `/desatascos-altea/`,
`/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies/`. Cualquier otra ruta devuelve `404.html` con estado 404.

## Flujo de trabajo

```sh
npm run build   # regenera dist/ — hay que ejecutarlo y commitear dist/ tras cada cambio
npm run check   # comprobación de enlaces
npm run preview # servidor local con el runtime de Cloudflare (wrangler dev)
npm run deploy  # build + wrangler deploy (requiere CLOUDFLARE_API_TOKEN)
```

`dist/` se versiona a propósito: Cloudflare puede desplegar con `npx wrangler deploy` sin comando de build.

## Antes del lanzamiento

Sin `phone`/`whatsapp` válidos, los botones de llamada y WhatsApp llevan a `/contacto/` (estado «pendiente de activar»),
nunca a un `tel:` ficticio. Mientras falten los datos legales o `live` sea `false`, las páginas llevan
`<meta name="robots" content="noindex,nofollow">`. Completar `site.config.json`, ejecutar `npm run build` y commitear.
