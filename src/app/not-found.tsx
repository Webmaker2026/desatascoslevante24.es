import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="container subhero error-page">
      <div className="eyebrow">ERROR 404</div>
      <h1>
        Esta página
        <br />
        <em>no está aquí.</em>
      </h1>
      <p>Vuelve al inicio para encontrar nuestros servicios y zonas de atención.</p>
      <Link className="btn btn-primary" href="/">
        Volver al inicio
      </Link>
    </section>
  );
}
