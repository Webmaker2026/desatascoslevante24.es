# Desatascos Levante 24

Sitio independiente en español para **desatascos 24 horas e inspección de tuberías con cámara**, con dominio canónico `https://desatascoslevante24.es`. Next.js 16, React 19, TypeScript y Tailwind CSS 4. Exportación estática compatible con Cloudflare Pages: no requiere servidor Node en producción, base de datos ni funciones de Cloudflare.

## Desarrollo y verificación

Requisito: Node.js 22 o posterior (CI usa 24).

```sh
npm ci
npm run dev
npm test
npm run build
npm run typecheck
npx playwright install chromium
npm run test:browser
```

`npm run preview` sirve `out/` en `http://127.0.0.1:3000`. Es un servidor local de comprobación, no un servidor de producción. Las pruebas de navegador usan esa exportación, comprueban rutas, enlaces, imágenes, menú móvil, FAQ, consentimiento, ausencia de errores JS y criterios WCAG AA con axe. La auditoría automática no sustituye la revisión manual de accesibilidad.

## Rutas

- `/`: página principal.
- `/servicios/desatascos-24-horas/` y `/servicios/inspeccion-camara-tuberias/`.
- `/desatascos-alicante/`, `/desatascos-benidorm/`, `/desatascos-torrevieja/`, `/desatascos-elche/`, `/desatascos-altea/`: destinos de campañas, con contenido, contexto local, municipios cercanos y pregunta propia para cada ciudad. También son páginas orgánicas canónicas; no se crean duplicados `/ads/`.
- `/zonas/`, `/contacto/`.
- `/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies/`.
- `/sitemap.xml`, `/robots.txt` y página 404.

## Configuración antes de activar el negocio

Copiar `.env.example` a `.env.local` para desarrollo. En Cloudflare introducir los mismos valores en **Build > Environment variables**. Las variables `NEXT_PUBLIC_*` son públicas y se incorporan durante el build: **cada cambio necesita una nueva compilación/despliegue**. No incluir secretos.

| Variable                         | Uso                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_PHONE`              | Número real en formato E.164. No se incluye ninguno de ejemplo para evitar llamadas accidentales. |
| `NEXT_PUBLIC_WHATSAPP`           | Número real de WhatsApp en E.164; puede diferir del teléfono.                                     |
| `NEXT_PUBLIC_COMPANY_NAME`       | Razón social o nombre completo del titular.                                                       |
| `NEXT_PUBLIC_TAX_ID`             | NIF/CIF.                                                                                          |
| `NEXT_PUBLIC_ADDRESS`            | Domicilio legal completo. No se inventan oficinas locales.                                        |
| `NEXT_PUBLIC_EMAIL`              | Correo real de contacto y ejercicio de derechos.                                                  |
| `NEXT_PUBLIC_REGISTRY`           | Información registral que corresponda, o «No procede» después de verificarlo.                     |
| `NEXT_PUBLIC_LEGAL_REVIEWED`     | `true` solo después de completar/revisar datos, proveedores, plazos, garantías y contratos.       |
| `NEXT_PUBLIC_SITE_LIVE`          | `true` cuando se vaya a permitir indexación.                                                      |
| `NEXT_PUBLIC_GA_ID`              | Propiedad de Google Analytics exclusiva de este dominio, opcional.                                |
| `NEXT_PUBLIC_ADS_ID`             | Identificador Google Ads `AW-…`, opcional.                                                        |
| `NEXT_PUBLIC_ADS_CALL_LABEL`     | Etiqueta de conversión de clic en llamada.                                                        |
| `NEXT_PUBLIC_ADS_WHATSAPP_LABEL` | Etiqueta de conversión de clic en WhatsApp.                                                       |

Sin teléfono válido, los botones llevan a un estado explicativo en Contacto, sin `tel:` ficticio. Sin WhatsApp, no se crea un enlace a un número inventado. Sin datos obligatorios y revisión legal, las páginas tienen `noindex,nofollow` y robots bloquea el rastreo. El sitemap ya contiene los destinos canónicos para el lanzamiento.

```sh
npm run check:launch
```

Este control **debe fallar con la configuración vacía entregada**. El build de previsualización sí funciona. Para un lanzamiento real, resolver todos sus avisos y reconstruir. Los textos legales son documentos adaptados al flujo implementado, con campos pendientes; el titular debe validar los tratamientos reales y concretar los plazos de conservación antes de activarlos. No representan una certificación de cumplimiento.

## Cloudflare Pages

1. Crear un proyecto **nuevo y exclusivo** en Workers & Pages; conectar únicamente `Webmaker2026/desatascoslevante24.es`, rama `main`.
2. Framework: Next.js (Static HTML Export). Directorio raíz: raíz del repositorio. Build: `npm run build`. Salida: `out`. Node: `24`.
3. Mantener las vistas previas sin variables reales de medición ni `NEXT_PUBLIC_SITE_LIVE=true`. Para producción, configurar los datos y usar `npm run check:launch && npm run build` como comando de compilación cuando estén completos.
4. Añadir `desatascoslevante24.es` como dominio del proyecto. Configurar el dominio `www` con una redirección 301 a la raíz preservando ruta y consulta. Verificar HTTPS y la redirección HTTP→HTTPS en Cloudflare.
5. `public/_headers` añade cabeceras de seguridad y caché. La CSP permite los proveedores Google exclusivamente para las etiquetas que el consentimiento autorice; no las carga por sí misma. Se permite código inline porque la exportación de Next incluye datos de hidratación inline.
6. Comprobar el dominio, navegación directa a una ciudad, 404, sitemap, robots, enlaces de contacto reales y Consent Mode con Google Tag Assistant. Enviar el sitemap a Search Console después de habilitar la indexación.

`wrangler.toml` declara el nombre dedicado y `out`. No hace falta `@cloudflare/next-on-pages` ni OpenNext para esta web estática. Ninguna infraestructura del proyecto Control de Chinches debe reutilizarse.

## Consent Mode v2 y campañas

- Implementación **básica**, en `public/consent.js`: las cuatro señales empiezan denegadas antes de cualquier configuración; no se descarga gtag hasta aceptar una categoría configurada.
- Rechazar y aceptar tienen la misma visibilidad; categorías separadas, sin premarcar; preferencias durante 180 días. Se puede reabrir el panel desde el pie. Al retirar consentimiento se actualizan señales, se borran cookies de medición propias accesibles y se recarga para descargar etiquetas.
- Analítica acepta solo `analytics_storage`. Publicidad acepta `ad_storage`, `ad_user_data` y `ad_personalization`. Las propiedades no autorizadas no se configuran. No hay GTM, cookies de marketing ocultas, formularios ni píxeles adicionales.
- Los eventos `contact_click` de GA y `conversion` de Ads representan **clics**. No prueban llamadas conectadas, mensajes enviados ni clientes. En Ads, definir llamada como conversión principal y WhatsApp como secundaria. No se crean valores ni importes ficticios.
- Para conversiones de llamadas reales, configurar por separado la medición admitida por Google Ads y verificar su elegibilidad. No está simulada en este código.
- Cada ciudad dispone de su URL final propia; las consultas UTM/gclid no crean páginas duplicadas. Los eventos propios omiten consultas y fragmentos de URL para reducir el envío accidental de datos personales. No hay captura de identidad del visitante.
- Antes de activar medición, revisar configuración de Google, inventario de cookies, retención y garantías de transferencias; comprobar opt-in, rechazo y retirada con los identificadores reales. Sin identificadores reales solo se verifica la integración local y el comportamiento con dobles de prueba.

## SEO, contenido y rendimiento

HTML estático por ruta, `lang="es"`, metadatos únicos, canonical, Open Graph, Twitter, sitemap, robots, JSON-LD de negocio/servicio y migas de pan. Sin estrellas, opiniones falsas, dirección inventada, precios ni acreditaciones ficticias. Las localidades cercanas se presentan como zonas a consultar, no como sucursales.

Fuentes del sistema, sin dependencias de Google Fonts. Imágenes WebP locales, dimensiones reservadas, carga diferida salvo imagen principal. SVG local para marca/iconos. Navegación accesible, salto al contenido, foco visible, menú móvil, `dialog` nativo para preferencias y reducción de movimiento. Ver `docs/ASSETS.md` para procedencia y prompts de imágenes.

## Separación del proyecto

Repositorio, nombre de paquete, dominio, nombres de almacenamiento, proyecto Cloudflare y configuración de medición propios. No se ha leído ni modificado ningún archivo, recurso o identificador del proyecto Control de Chinches. Nunca copiar variables o credenciales de ese proyecto.

## Referencias de implementación

- [Cloudflare: exportación estática de Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Google: configuración de Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)
- [AEPD: cookies y consentimiento](https://www.aepd.es/preguntas-frecuentes/17-internet-y-redes-sociales/FAQ-1707-importancia-de-las-cookies-en-la-proteccion-de-datos)
- [AEPD: derecho de información](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion)
- [BOE: LSSI, artículo 10](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a10)

Las comprobaciones locales y limitaciones de entrega se recogen en `docs/VALIDATION.md`.
