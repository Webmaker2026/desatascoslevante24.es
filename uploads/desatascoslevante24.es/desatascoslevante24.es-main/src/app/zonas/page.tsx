import Link from 'next/link';
import { cities } from '@/lib/content';
import { Breadcrumb, Cta } from '@/components/Site';
import { Icon } from '@/components/Icon';
import { metadata as createMetadata } from '@/lib/seo';
export const metadata = createMetadata(
  'Zonas de servicio en Alicante',
  'Desatascos y cámara de tuberías en Alicante, Benidorm, Torrevieja, Elche, Altea y alrededores. Consulta la cobertura para tu dirección.',
  '/zonas/',
);
export default function Zones() {
  return (
    <>
      <section className="container subhero">
        <Breadcrumb items={[{ name: 'Zonas de servicio', href: '/zonas/' }]} />
        <div className="eyebrow">PROVINCIA DE ALICANTE</div>
        <h1>
          La ayuda empieza
          <br />
          <em>cerca de ti.</em>
        </h1>
        <p className="lead">
          Selecciona tu localidad para conocer el servicio de desatascos 24 horas e inspección con
          cámara en tu zona.
        </p>
        <div className="zones-grid">
          {cities.map((c) => (
            <Link className="zone-card" key={c.slug} href={`/desatascos-${c.slug}/`}>
              <Icon name="pin" />
              <h2>{c.name}</h2>
              <p>{c.areas.join(' · ')}</p>
              <span className="arrow-link">
                Consultar servicio <Icon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
        <aside className="help-note">
          <Icon name="pin" />
          <p>
            ¿Tu localidad no aparece? Consulta la cobertura en el entorno de estas zonas. La
            disponibilidad se confirma para cada dirección; no se garantiza un tiempo de llegada
            fijo.
          </p>
        </aside>
      </section>
      <Cta />
    </>
  );
}
