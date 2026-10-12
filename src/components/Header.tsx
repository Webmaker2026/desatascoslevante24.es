'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';
import { ContactButton } from './ContactButton';
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Desatascos Levante 24 · Inicio">
      <span className="brand-icon">
        <Icon name="pipe" />
      </span>
      <span>
        <span className="brand-small">DESATASCOS</span>
        <span className="brand-name">
          LEVANTE<span>24</span>
        </span>
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const items = [
    ['/servicios/desatascos-24-horas/', 'Desatascos 24h'],
    ['/servicios/inspeccion-camara-tuberias/', 'Inspección con cámara'],
    ['/zonas/', 'Zonas'],
    ['/contacto/', 'Contacto'],
  ];
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            <i className="status-dot" /> Desatascos 24 horas · 365 días
          </span>
          <span>
            <Icon name="pin" /> Provincia de Alicante
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container nav-wrap">
          <Brand />
          <nav
            className={`nav ${open ? 'is-open' : ''}`}
            aria-label="Navegación principal"
            id="main-nav"
          >
            {items.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <ContactButton placement="header" className="header-call">
            Llamar 24h
          </ContactButton>
          <button
            className="menu-toggle"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </header>
    </>
  );
}
