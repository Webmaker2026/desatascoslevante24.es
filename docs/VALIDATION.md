# Comprobación de entrega

Fecha: 12 de octubre de 2026. Entorno local Windows, Node.js 24.19.0. Configuración sin datos empresariales ni identificadores de medición inventados.

| Comprobación | Resultado |
| --- | --- |
| Build de producción `npm run build` | Correcto. Exportación estática de todas las rutas a `out/`. |
| TypeScript | Correcto, tanto comprobación independiente como comprobación del build. |
| Pruebas del consentimiento | 8/8 correctas. |
| Pruebas Playwright | 8/8 correctas: cuatro escenarios en escritorio y móvil Chromium. |
| Rutas, enlaces y recursos | Las 13 páginas de contenido responden 200; todos los enlaces internos e imágenes encontrados responden 200; URL desconocida responde 404. |
| SEO básico | Un H1 por página, idioma español, canonical del dominio y ruta correctos. Sitemap y robots exportados. |
| Desbordamiento horizontal | No detectado en las 13 rutas a tamaños de escritorio y móvil de las pruebas. |
| JavaScript | Sin errores de página durante el recorrido completo de rutas. |
| WCAG automatizado con axe | Sin infracciones WCAG 2 A/AA y 2.1 AA detectadas en Inicio, Contacto, Altea y Cookies, en ambas resoluciones. |
| Interacciones | FAQ por teclado, menú móvil, contacto pendiente, rechazo, persistencia, elección por categoría, reapertura y retirada comprobados. |
| Dependencias | `npm audit` tras actualizar sharp: 0 vulnerabilidades conocidas reportadas. |
| Revisión visual | Inicio comprobado visualmente en escritorio y móvil, con navegación, imagen y CTA fijo móvil. |
| Control de lanzamiento | Falla de forma esperada: exige datos reales y revisión legal antes de habilitar indexación. |

## Consentimiento

Las pruebas unitarias ejecutan el código real de `public/consent.js` en un entorno aislado. Comprueban denegación inicial de las cuatro señales, ausencia de carga de Google antes de elegir, rechazo persistente, configuración independiente de Analytics y Ads, etiquetas de conversión distintas, inicialización única, retirada con limpieza/recarga, caducidad y almacenamiento bloqueado. Los identificadores de prueba solo existen en los tests y no se incorporan al sitio.

Las pruebas de navegador verifican el panel y ausencia de solicitudes a Google en la configuración vacía de entrega. **No se ha validado una cuenta real de Google Analytics/Ads ni la recepción de conversiones reales**, porque no se han facilitado identificadores.

## Límites de la comprobación

- No se han realizado llamadas ni enviado mensajes: no se ha facilitado un teléfono o WhatsApp real.
- No se ha desplegado ni conectado el dominio en Cloudflare. Se entrega código, exportación local y configuración compatible; el despliegue de producción necesita la cuenta y DNS correspondientes.
- Los encabezados de `public/_headers` los aplica Cloudflare Pages. El servidor local de prueba no reproduce el CDN, TLS ni esas cabeceras; deben verificarse tras desplegar.
- No se ha medido el rendimiento en una conexión móvil real ni emitido una certificación de accesibilidad. Se han utilizado imágenes WebP locales (aprox. 96–151 KiB cada una), fuentes de sistema, HTML estático y carga diferida.
- Los documentos RGPD/LSSI incluyen los campos que faltan y deben validarse contra la operación real del titular. La indexación permanece deshabilitada de forma predeterminada.
- Control de Chinches no se ha modificado ni utilizado como origen de código, cuentas, identificadores o datos.
