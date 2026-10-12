import { LegalLayout } from '@/components/Legal';
import { CookieSettings } from '@/components/Consent';
import { site } from '@/lib/config';
import { metadata as createMetadata } from '@/lib/seo';
export const metadata = createMetadata(
  'Política de cookies',
  'Categorías de cookies, almacenamiento local, proveedores, duración y gestión del consentimiento.',
  '/politica-de-cookies/',
);
export default function Cookies() {
  return (
    <LegalLayout title="Política de cookies" path="/politica-de-cookies/">
      <p>
        Una cookie es un pequeño archivo que un sitio guarda en tu navegador. También utilizamos
        almacenamiento local para recordar tu elección. Las categorías opcionales permanecen
        desactivadas hasta que las autorizas.
      </p>
      <h2>1. Qué está activo en esta versión</h2>
      <p>
        Preferencias necesarias: activas. Google Analytics:{' '}
        {site.gaId
          ? 'configurado; solo se carga con consentimiento de analítica'
          : 'sin configurar; no se carga'}
        . Google Ads:{' '}
        {site.adsId
          ? 'configurado; solo se carga con consentimiento de publicidad'
          : 'sin configurar; no se carga'}
        .
      </p>
      <h2>2. Inventario de almacenamiento</h2>
      <div
        className="legal-table"
        tabIndex={0}
        role="region"
        aria-label="Inventario de almacenamiento, tabla desplazable"
      >
        <table>
          <thead>
            <tr>
              <th>Nombre / proveedor</th>
              <th>Finalidad y tipo</th>
              <th>Duración</th>
              <th>Activación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                levante24-consent-v1
                <br />
                Este sitio
              </td>
              <td>Almacenamiento local necesario. Guarda versión, fecha y categorías elegidas.</td>
              <td>Validez de 180 días; después se vuelve a solicitar la elección.</td>
              <td>Al guardar una decisión.</td>
            </tr>
            <tr>
              <td>
                _ga, _ga_*
                <br />
                Google Analytics
              </td>
              <td>Analítica. Distinguir navegadores y mantener información de sesión.</td>
              <td>Hasta 2 años según configuración y límites del navegador.</td>
              <td>Solo si Analytics está configurado y aceptas analítica.</td>
            </tr>
            <tr>
              <td>
                _gcl_*
                <br />
                Google Ads
              </td>
              <td>
                Publicidad. Atribución de clics y conversiones; puede haber identificadores
                adicionales de Google según la configuración.
              </td>
              <td>Hasta 90 días para _gcl_*, según Google.</td>
              <td>Solo si Ads está configurado y aceptas publicidad.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Las cookies opcionales indicadas son las previstas para la integración. Antes de activar
        identificadores reales, el titular debe comprobar el inventario efectivo, los dominios, las
        duraciones y los proveedores de su configuración y actualizar esta política. No hay fuentes,
        vídeos ni mapas de terceros incrustados.
      </p>
      <h2>3. Cómo decidir y retirar el consentimiento</h2>
      <p>
        El aviso permite aceptar o rechazar todas las categorías opcionales con la misma
        visibilidad. «Configurar» permite elegir analítica y publicidad por separado; ambas están
        inicialmente desmarcadas. Las preferencias necesarias no se pueden desactivar desde este
        panel.
      </p>
      <p>
        <CookieSettings />
      </p>
      <p>
        Si retiras una categoría previamente aceptada, se actualiza el consentimiento, se eliminan
        las cookies propias de medición accesibles al sitio y se recarga la página para detener las
        etiquetas ya cargadas. Las cookies que pertenezcan a dominios de terceros deben eliminarse
        desde el navegador. Si el almacenamiento local está bloqueado, se aplica tu elección durante
        la página actual y puede solicitarse de nuevo al navegar.
      </p>
      <h2>4. Consent Mode v2</h2>
      <p>
        Se utiliza una integración básica: las señales analytics_storage, ad_storage, ad_user_data y
        ad_personalization parten de «denied». No se descarga el código de Google ni se envían
        mediciones antes de autorizar la categoría correspondiente. Analítica habilita solo la
        medición estadística; publicidad habilita almacenamiento publicitario, uso de datos y
        personalización. La medición de contacto registra un clic, no una llamada conectada ni un
        servicio contratado.
      </p>
      <h2>5. Servicios externos</h2>
      <p>
        Los enlaces a WhatsApp no instalan sus cookies en esta página. Al abrir el servicio, se
        aplican las condiciones de Meta. Consulta{' '}
        <a
          href="https://policies.google.com/technologies/cookies?hl=es"
          target="_blank"
          rel="noopener noreferrer"
        >
          cómo utiliza Google las cookies
        </a>{' '}
        y la <a href="/politica-de-privacidad/">política de privacidad del sitio</a> para más
        información sobre proveedores y transferencias.
      </p>
      <h2>6. Controles del navegador</h2>
      <p>
        Puedes borrar cookies y almacenamiento local desde la configuración de privacidad de tu
        navegador. Borrar la preferencia hará que aparezca de nuevo el aviso. Rechazar las
        categorías opcionales no impide consultar servicios ni utilizar los enlaces de contacto.
      </p>
    </LegalLayout>
  );
}
