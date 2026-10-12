'use client';
import { site } from '@/lib/config';
import { Icon } from './Icon';
export function ContactButton({
  channel = 'phone',
  placement = 'content',
  children,
  className = '',
}: {
  channel?: 'phone' | 'whatsapp';
  placement?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const number = channel === 'phone' ? site.phone : site.whatsapp;
  const href = !number
    ? '/contacto/#disponibilidad'
    : channel === 'phone'
      ? `tel:${number}`
      : `https://wa.me/${number.replace('+', '')}?text=${encodeURIComponent('Hola, necesito ayuda con un desatasco o una inspección con cámara. Mi localidad es: ')}`;
  return (
    <a
      className={`btn ${channel === 'phone' ? 'btn-primary' : 'btn-secondary'} ${className}`}
      href={href}
      {...(channel === 'whatsapp' && number
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      onClick={() => {
        if (number) window.levanteConsent?.conversion(channel, placement);
      }}
      aria-label={
        !number
          ? `${channel === 'phone' ? 'Teléfono' : 'WhatsApp'} pendiente de configurar. Ver información de contacto`
          : undefined
      }
    >
      <Icon name={channel === 'phone' ? 'phone' : 'chat'} />
      {children || (channel === 'phone' ? 'Llamar ahora' : 'WhatsApp')}
      <span className="sr-only">{!number ? ' · Canal pendiente de activar' : ''}</span>
    </a>
  );
}
export function ContactActions({ placement = 'content' }: { placement?: string }) {
  return (
    <div className="contact-actions">
      <ContactButton placement={placement} />
      <ContactButton channel="whatsapp" placement={placement} />
    </div>
  );
}
