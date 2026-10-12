import { LegalLayout, CompanyDetails } from '@/components/Legal';
import { pending, site } from '@/lib/config';
import { metadata as createMetadata } from '@/lib/seo';
export const metadata = createMetadata(
  'Política de privacidad',
  'Información sobre el tratamiento de datos, finalidades, bases jurídicas y derechos conforme al RGPD y a la LOPDGDD.',
  '/politica-de-privacidad/',
);
export default function Privacy() {
  return (
    <LegalLayout title="Política de privacidad" path="/politica-de-privacidad/">
      <p>
        Esta política describe el tratamiento previsto de datos personales conforme al Reglamento
        (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).
      </p>
      <h2>1. Responsable del tratamiento</h2>
      <CompanyDetails />
      <h2>2. Datos y procedencia</h2>
      <p>
        El sitio no dispone de formularios, cuentas ni pagos en línea. Al contactar voluntariamente
        por teléfono, email o WhatsApp, puedes facilitar nombre, datos de contacto, dirección de la
        incidencia y una descripción o imágenes del problema. No envíes información sensible ni
        datos de terceros que no sean necesarios.
      </p>
      <p>
        El alojamiento puede tratar direcciones IP, fecha, recurso solicitado y datos técnicos para
        entregar y proteger el sitio. Si autorizas las categorías opcionales y están configuradas,
        Google puede tratar identificadores de navegador y eventos de navegación o clics de
        contacto. No se envían a las herramientas de medición el contenido de mensajes, números de
        teléfono del visitante ni direcciones de la incidencia.
      </p>
      <h2>3. Finalidades y bases jurídicas</h2>
      <ul>
        <li>
          Atender una solicitud de presupuesto o servicio y gestionar la relación contractual:
          medidas precontractuales solicitadas y ejecución del contrato (artículo 6.1.b RGPD).
        </li>
        <li>
          Atender obligaciones fiscales, contables o requerimientos legalmente exigibles:
          cumplimiento de obligaciones legales (artículo 6.1.c).
        </li>
        <li>
          Garantizar la disponibilidad y seguridad técnica del sitio: interés legítimo en proteger
          el servicio, sujeto a evaluación y ponderación (artículo 6.1.f).
        </li>
        <li>
          Medir el uso del sitio y, de forma separada, las conversiones publicitarias y la
          personalización: consentimiento para cada categoría opcional (artículo 6.1.a), que puede
          retirarse en cualquier momento.
        </li>
      </ul>
      <p>
        No se envían comunicaciones comerciales por el mero hecho de contactar. No hay decisiones
        automatizadas con efectos jurídicos en esta web. Si autorizas publicidad, Google puede
        utilizar datos de navegación para personalizar publicidad según sus condiciones y tus
        preferencias.
      </p>
      <h2>4. Conservación</h2>
      <p>
        Las consultas se conservan mientras sean necesarias para responderlas y gestionar la
        solicitud. Si se contrata un servicio, la documentación se mantiene durante la relación y
        los plazos legales exigibles, con bloqueo cuando proceda. El titular debe concretar y
        documentar los plazos operativos de consultas y registros técnicos antes de activar el
        sitio; no se autoriza una conservación indefinida.
      </p>
      <p>
        Las preferencias de consentimiento caducan a los 180 días. La duración de las cookies
        opcionales se detalla en la política de cookies. La conservación de eventos en la propiedad
        de Analytics deberá ser fijada por el titular antes de habilitarla.
      </p>
      <h2>5. Destinatarios y proveedores</h2>
      <p>
        Podrán acceder a los datos los proveedores necesarios para prestar y alojar el servicio,
        sujetos a los acuerdos de tratamiento aplicables, y las administraciones cuando exista
        obligación legal. El despliegue está preparado para Cloudflare; el titular debe confirmar el
        proveedor y su configuración efectiva antes de publicar.
      </p>
      <p>
        WhatsApp es un canal externo de Meta que solo se abre al seguir su enlace. Google Analytics
        y Google Ads solo se activan cuando están configurados y se autoriza su categoría. Consulta
        las políticas de{' '}
        <a
          href="https://www.cloudflare.com/privacypolicy/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Cloudflare
        </a>
        ,{' '}
        <a
          href="https://www.whatsapp.com/legal/privacy-policy-eea"
          rel="noopener noreferrer"
          target="_blank"
        >
          WhatsApp
        </a>{' '}
        y{' '}
        <a
          href="https://policies.google.com/privacy?hl=es"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google
        </a>
        .
      </p>
      <h2>6. Transferencias internacionales</h2>
      <p>
        Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo. El titular debe
        verificar las ubicaciones y garantías aplicables a cada proveedor: decisiones de adecuación
        vigentes o, cuando corresponda, cláusulas contractuales tipo y medidas complementarias. La
        activación de proveedores exige validar estas garantías y sus contratos; esta plantilla no
        acredita por sí misma dicha validación.
      </p>
      <h2>7. Tus derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad
        cuando proceda, así como retirar tu consentimiento sin afectar a la licitud del tratamiento
        anterior. Dirige tu solicitud a {pending(site.email, 'Email para ejercer derechos')} o al
        domicilio del responsable. Solo se solicitará información adicional de identificación cuando
        sea necesaria y proporcionada.
      </p>
      <p>
        Las solicitudes se atenderán en los plazos establecidos por el RGPD, con carácter general en
        un mes, ampliable en los supuestos legalmente previstos. También puedes reclamar ante la{' '}
        <a href="https://www.aepd.es/" target="_blank" rel="noopener noreferrer">
          Agencia Española de Protección de Datos
        </a>
        .
      </p>
      <h2>8. Preferencias y cambios</h2>
      <p>
        Puedes modificar las categorías opcionales desde «Configurar cookies», en el pie de todas
        las páginas. La retirada de una categoría recarga el sitio para detener sus etiquetas. Esta
        política debe revisarse si cambian los tratamientos o proveedores.
      </p>
    </LegalLayout>
  );
}
