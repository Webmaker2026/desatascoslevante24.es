(function () {
  'use strict';
  var KEY = 'levante24-consent-v1',
    TTL = 180 * 86400000;
  var config = {},
    loaded = false,
    configured = {},
    current = null;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('set', 'url_passthrough', false);
  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (
        c &&
        c.version === 1 &&
        typeof c.analytics === 'boolean' &&
        typeof c.marketing === 'boolean' &&
        typeof c.timestamp === 'number' &&
        c.timestamp <= Date.now() &&
        Date.now() - c.timestamp < TTL
      )
        return c;
    } catch (_) {}
    return null;
  }
  function apply(c) {
    window.gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied',
    });
  }
  function cleanUrl(value) {
    try {
      var u = new URL(value);
      return u.origin + u.pathname;
    } catch (_) {
      return '';
    }
  }
  function start() {
    if (!current) return;
    var ids = [];
    if (current.analytics && config.gaId) ids.push(config.gaId);
    if (current.marketing && config.adsId) ids.push(config.adsId);
    if (!ids.length) return;
    if (!loaded) {
      loaded = true;
      window.gtag('js', new Date());
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ids[0]);
      document.head.appendChild(script);
    }
    ids.forEach(function (id) {
      if (configured[id]) return;
      configured[id] = true;
      window.gtag('config', id, {
        send_page_view: false,
        allow_google_signals: Boolean(current.marketing),
        allow_ad_personalization_signals: Boolean(current.marketing),
        page_location: cleanUrl(location.href),
        page_referrer: cleanUrl(document.referrer),
      });
    });
  }
  function clearCookies() {
    document.cookie.split(';').forEach(function (entry) {
      var name = entry.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl|_gac)/.test(name)) return;
      var parts = location.hostname.split('.');
      document.cookie = name + '=; Max-Age=0; path=/';
      for (var i = 0; i < parts.length - 1; i++) {
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + parts.slice(i).join('.');
      }
    });
  }
  window.levanteConsent = {
    read: function () {
      return current;
    },
    init: function (c) {
      config = c;
      start();
    },
    save: function (analytics, marketing) {
      var old = current;
      current = {
        version: 1,
        analytics: !!analytics,
        marketing: !!marketing,
        timestamp: Date.now(),
      };
      try {
        localStorage.setItem(KEY, JSON.stringify(current));
      } catch (_) {}
      apply(current);
      var withdrawn = old && ((old.analytics && !analytics) || (old.marketing && !marketing));
      if (withdrawn) {
        if (config.gaId) window['ga-disable-' + config.gaId] = true;
        clearCookies();
        location.reload();
        return;
      }
      start();
      window.dispatchEvent(new Event('levante-consent-change'));
    },
    page: function (path) {
      if (!current || !current.analytics || !config.gaId) return;
      window.gtag('event', 'page_view', {
        send_to: config.gaId,
        page_location: location.origin + path,
        page_referrer: cleanUrl(document.referrer),
        page_title: document.title,
      });
    },
    conversion: function (channel, placement) {
      if (!current) return;
      if (current.analytics && config.gaId)
        window.gtag('event', 'contact_click', {
          send_to: config.gaId,
          contact_method: channel,
          placement: placement,
          page_location: cleanUrl(location.href),
        });
      var label = channel === 'phone' ? config.callLabel : config.whatsappLabel;
      if (current.marketing && config.adsId && label)
        window.gtag('event', 'conversion', {
          send_to: config.adsId + '/' + label,
          page_location: cleanUrl(location.href),
        });
    },
  };
  current = read();
  if (current) apply(current);
})();
