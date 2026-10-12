import { site } from '@/lib/config';
import { metadata as createMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/Site';
import { ContactButton } from '@/components/ContactButton';
import { Icon } from '@/components/Icon';
export const metadata = createMetadata(
  'Contacto | Desatascos 24 horas en Alicante',
  'Contacta por teléfono o WhatsApp para desatascos e inspección de tuberías con cámara en la provincia de Alicante.',
  '/contacto/',
);
export default function Contact() {
  return (
    <section className="container subhero contact-page">
      <Breadcrumb items={[{ name: 'Contacto', href: '/contacto/' }]} />
      <div className="eyebrow">CONTACTO DIRECTO</div>
      <h1>
        Cuéntanos
        <br />
        <em>qué ocurre.</em>
      </h1>
      <p className="lead">
        Para desatascos e inspección de tuberías con cámara en Alicante y alrededores. Sin
        formularios: habla con nosotros por el canal que prefieras.
      </p>
      <div className="contact-grid" id="disponibilidad">
        <article>
          <Icon name="phone" />
          <h2>Por teléfono</h2>
          <p>La vía principal para consultar una incidencia urgente.</p>
          {site.phone ? (
            <>
              <p className="contact-number">{site.phone}</p>
              <ContactButton placement="contact-page" />
            </>
          ) : (
            <div className="pending-data">
              <strong>Teléfono pendiente de activar</strong>
              <p>
                El número de contacto todavía no está publicado. Este canal estará disponible cuando
                se complete la información de la empresa.
              </p>
            </div>
          )}
        </article>
        <article>
          <Icon name="chat" />
          <h2>Por WhatsApp</h2>
          <p>Indica la localidad y describe brevemente el problema.</p>
          {site.whatsapp ? (
            <ContactButton channel="whatsapp" placement="contact-page" />
          ) : (
            <div className="pending-data">
              <strong>WhatsApp pendiente de activar</strong>
              <p>
                Este canal todavía no está disponible. No se enviará ningún mensaje desde esta
                página.
              </p>
            </div>
          )}
          <p className="small">
            Al abrir WhatsApp accederás a un servicio de Meta con su propia política de privacidad.
            Evita enviar datos sensibles.
          </p>
        </article>
      </div>
      <div className="contact-prep">
        <div>
          <h2>Antes de contactar</h2>
          <ul className="check-list">
            {[
              'Ten a mano tu localidad y dirección.',
              'Explica qué desagües están afectados.',
              'Indica si has usado algún producto químico.',
              'Consulta disponibilidad, desplazamiento y presupuesto.',
            ].map((t) => (
              <li key={t}>
                <Icon name="check" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <aside className="help-note">
          <Icon name="clock" />
          <div>
            <strong>Atención de desatascos 24 horas</strong>
            <p>
              La disponibilidad y la previsión de llegada se confirman al contactar. Las solicitudes
              por WhatsApp no implican una reserva ni una intervención confirmada.
            </p>
          </div>
        </aside>
      </div>
      {site.email && (
        <p>
          Para consultas sobre privacidad: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      <p className="small">
        Consulta cómo se tratarán tus datos en la{' '}
        <a href="/politica-de-privacidad/">política de privacidad</a>.
      </p>
    </section>
  );
}
