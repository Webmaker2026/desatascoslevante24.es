import { LegalLayout, CompanyDetails } from '@/components/Legal';
import { metadata as createMetadata } from '@/lib/seo';
export const metadata = createMetadata(
  'Aviso legal',
  'Identificación del titular, condiciones de uso y alcance del sitio desatascoslevante24.es.',
  '/aviso-legal/',
);
export default function Legal() {
  return (
    <LegalLayout title="Aviso legal" path="/aviso-legal/">
      <h2>1. Identificación del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la
        información y de comercio electrónico, se facilita la información del titular de
        desatascoslevante24.es.
      </p>
      <CompanyDetails />
      <h2>2. Objeto y alcance</h2>
      <p>
        Este sitio informa exclusivamente sobre desatascos 24 horas e inspección de tuberías con
        cámara en la provincia de Alicante. La cobertura, la disponibilidad, el desplazamiento, el
        precio y el alcance concreto del servicio se confirman antes de su contratación.
      </p>
      <p>
        El contacto por teléfono o WhatsApp no constituye por sí solo una reserva ni un contrato. No
        se realiza contratación ni pago en esta web. El titular deberá facilitar, antes de
        contratar, la información precontractual y las condiciones aplicables, incluidos los
        derechos que correspondan a las personas consumidoras.
      </p>
      <h2>3. Uso del sitio</h2>
      <p>
        El usuario se compromete a utilizar el sitio de forma lícita y a no realizar acciones que
        dañen su funcionamiento o los derechos de terceros. No debe enviar información innecesaria o
        especialmente sensible por los canales de contacto.
      </p>
      <h2>4. Contenidos e imágenes</h2>
      <p>
        Los textos, el diseño y los demás elementos del sitio están sujetos a los derechos que
        correspondan a sus titulares. Las imágenes se han generado mediante IA con finalidad
        ilustrativa; no son pruebas de trabajos realizados ni fotografías del personal, vehículos o
        equipamiento de la empresa. No se publican opiniones de clientes, certificaciones o precios
        que no hayan sido verificados.
      </p>
      <h2>5. Disponibilidad y enlaces externos</h2>
      <p>
        Se procura mantener la información actualizada, sin perjuicio de las responsabilidades
        legalmente exigibles. Los enlaces externos, incluido WhatsApp, conducen a servicios de
        terceros que disponen de sus propias condiciones. Ninguna cláusula de este aviso limita
        derechos irrenunciables del consumidor.
      </p>
      <h2>6. Protección de datos y cookies</h2>
      <p>
        El tratamiento de datos y las preferencias de almacenamiento se explican en la{' '}
        <a href="/politica-de-privacidad/">política de privacidad</a> y en la{' '}
        <a href="/politica-de-cookies/">política de cookies</a>.
      </p>
      <h2>7. Legislación aplicable</h2>
      <p>
        Resulta aplicable la legislación española y europea que corresponda. Cualquier controversia
        se someterá a los juzgados y tribunales competentes conforme a la normativa aplicable,
        respetando el fuero que legalmente corresponda a los consumidores.
      </p>
    </LegalLayout>
  );
}
