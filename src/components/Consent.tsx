'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/config';
type Choice = { version: number; analytics: boolean; marketing: boolean; timestamp: number };
declare global {
  interface Window {
    levanteConsent?: {
      read: () => Choice | null;
      init: (c: { gaId: string; adsId: string; callLabel: string; whatsappLabel: string }) => void;
      save: (a: boolean, m: boolean) => void;
      page: (path: string) => void;
      conversion: (channel: string, placement: string) => void;
    };
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
export function Consent() {
  const [visible, setVisible] = useState(false),
    [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false),
    [marketing, setMarketing] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null),
    path = usePathname();
  useEffect(() => {
    window.levanteConsent?.init({
      gaId: site.gaId,
      adsId: site.adsId,
      callLabel: site.callLabel,
      whatsappLabel: site.whatsappLabel,
    });
    const c = window.levanteConsent?.read();
    setVisible(!c);
    setAnalytics(c?.analytics || false);
    setMarketing(c?.marketing || false);
    const reopen = () => {
      const saved = window.levanteConsent?.read();
      setAnalytics(saved?.analytics || false);
      setMarketing(saved?.marketing || false);
      setCustom(true);
      dialog.current?.showModal();
    };
    window.addEventListener('open-cookie-settings', reopen);
    const update = () => {
      setVisible(false);
      window.levanteConsent?.page(window.location.pathname);
    };
    window.addEventListener('levante-consent-change', update);
    return () => {
      window.removeEventListener('open-cookie-settings', reopen);
      window.removeEventListener('levante-consent-change', update);
    };
  }, []);
  useEffect(() => {
    window.levanteConsent?.page(path);
  }, [path]);
  function save(a: boolean, m: boolean) {
    window.levanteConsent?.save(a, m);
    setVisible(false);
    dialog.current?.close();
  }
  return (
    <>
      {visible && (
        <section className="cookie-banner" aria-label="Preferencias de cookies">
          <div>
            <strong>Tu privacidad, tu decisión.</strong>
            <p>
              Usamos almacenamiento necesario para guardar tu elección. Solo con tu permiso
              activamos analítica o publicidad de Google.{' '}
              <a href="/politica-de-cookies/">Política de cookies</a>
            </p>
          </div>
          <div className="cookie-buttons">
            <button onClick={() => save(false, false)}>Rechazar</button>
            <button onClick={() => save(true, true)}>Aceptar todas</button>
            <button
              onClick={() => {
                setCustom(true);
                dialog.current?.showModal();
              }}
            >
              Configurar
            </button>
          </div>
        </section>
      )}
      <dialog
        ref={dialog}
        className="consent-dialog"
        aria-labelledby="consent-title"
        onClose={() => setCustom(false)}
      >
        <h2 id="consent-title">Preferencias de cookies</h2>
        <p>Elige qué permites. Puedes cambiar tu decisión en el pie de cualquier página.</p>
        {custom && (
          <>
            <div className="consent-option">
              <div>
                <strong>Necesarias</strong>
                <p>Guardan esta elección durante 180 días. Siempre activas.</p>
              </div>
              <span>Activas</span>
            </div>
            <label className="consent-option">
              <div>
                <strong>Analítica</strong>
                <p>Google Analytics: conocer el uso del sitio. Opcional.</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
            </label>
            <label className="consent-option">
              <div>
                <strong>Publicidad</strong>
                <p>
                  Google Ads: medir clics de contacto, uso de datos publicitarios y personalización.
                  Opcional.
                </p>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
            </label>
          </>
        )}
        <div className="cookie-buttons">
          <button onClick={() => save(false, false)}>Rechazar todas</button>
          <button onClick={() => save(true, true)}>Aceptar todas</button>
          <button onClick={() => save(analytics, marketing)}>Guardar selección</button>
          <button onClick={() => dialog.current?.close()}>Cerrar sin guardar</button>
        </div>
        <a href="/politica-de-cookies/">Ver política de cookies</a>
      </dialog>
    </>
  );
}
export function CookieSettings() {
  return (
    <button
      className="text-button"
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
    >
      Configurar cookies
    </button>
  );
}
