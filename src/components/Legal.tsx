import { site, pending } from '@/lib/config';
import { Breadcrumb } from './Site';
export function LegalLayout({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <article className="container subhero legal">
      <Breadcrumb items={[{ name: title, href: path }]} />
      <div className="eyebrow">INFORMACIÓN Y TRANSPARENCIA</div>
      <h1>{title}</h1>
      <p className="small">Versión del documento: 12 de octubre de 2026.</p>
      {(!site.legalReviewed ||
        !site.company ||
        !site.taxId ||
        !site.address ||
        !site.email ||
        !site.registry) && (
        <div className="legal-note">
          Documento pendiente de completar y validar por el titular antes de activar el sitio. Los
          campos entre corchetes identifican información que todavía no se ha facilitado.
        </div>
      )}
      {children}
    </article>
  );
}
export function CompanyDetails() {
  const rows = [
    ['Titular / responsable', pending(site.company, 'Razón social o nombre completo')],
    ['Nombre comercial', site.name],
    ['NIF / CIF', pending(site.taxId, 'Identificación fiscal')],
    ['Domicilio', pending(site.address, 'Dirección completa')],
    ['Correo electrónico', pending(site.email, 'Email de contacto y privacidad')],
    ['Teléfono', pending(site.phone, 'Teléfono')],
    ['Registro', pending(site.registry, 'Datos registrales o no aplicabilidad verificada')],
  ];
  return (
    <dl>
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
