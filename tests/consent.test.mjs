import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const code = fs.readFileSync('public/consent.js', 'utf8');
function run(saved, blocked = false) {
  const scripts = [],
    events = [],
    cookies = [];
  let reloads = 0;
  const store = new Map(saved ? [['levante24-consent-v1', JSON.stringify(saved)]] : []);
  const window = { dataLayer: [], dispatchEvent: (e) => events.push(e.type) };
  const document = {
    referrer: 'https://example.org/path?private=value',
    title: 'Test',
    createElement: () => ({}),
    head: { appendChild: (s) => scripts.push(s) },
    get cookie() {
      return '_ga=123; _gcl_au=456; essential=yes';
    },
    set cookie(v) {
      cookies.push(v);
    },
  };
  const context = {
    window,
    document,
    localStorage: {
      getItem: (k) => {
        if (blocked) throw Error('blocked');
        return store.get(k) || null;
      },
      setItem: (k, v) => {
        if (blocked) throw Error('blocked');
        store.set(k, v);
      },
    },
    location: {
      href: 'https://desatascoslevante24.es/desatascos-altea/?email=private',
      origin: 'https://desatascoslevante24.es',
      pathname: '/desatascos-altea/',
      hostname: 'desatascoslevante24.es',
      reload: () => reloads++,
    },
    URL,
    Event,
    Date,
  };
  vm.runInNewContext(code, context);
  const api = window.levanteConsent;
  api.init({ gaId: 'G-TEST', adsId: 'AW-123456', callLabel: 'call', whatsappLabel: 'chat' });
  return {
    api,
    window,
    scripts,
    store,
    cookies,
    events,
    reloads: () => reloads,
    commands: () => window.dataLayer.map((args) => Array.from(args)),
  };
}
test('No Google script or events before a choice, with all four consent signals denied', () => {
  const c = run();
  assert.equal(c.scripts.length, 0);
  const d = c.commands()[0];
  assert.equal(d[0], 'consent');
  assert.equal(d[1], 'default');
  assert.deepEqual(Object.values(d[2]), ['denied', 'denied', 'denied', 'denied']);
  c.api.conversion('phone', 'hero');
  assert.equal(c.commands().filter((x) => x[0] === 'event').length, 0);
});
test('Reject persists and never loads tracking, including on return', () => {
  const c = run();
  c.api.save(false, false);
  assert.equal(c.scripts.length, 0);
  const d = run(JSON.parse(c.store.get('levante24-consent-v1')));
  assert.equal(d.scripts.length, 0);
  assert.equal(d.api.read().marketing, false);
});
test('Analytics-only does not configure Ads or send advertising conversions', () => {
  const c = run();
  c.api.save(true, false);
  c.api.page('/contacto/');
  c.api.conversion('phone', 'hero');
  assert.equal(c.scripts.length, 1);
  assert.ok(c.scripts[0].src.endsWith('G-TEST'));
  assert.equal(c.commands().filter((x) => x[0] === 'config' && x[1] === 'AW-123456').length, 0);
  assert.equal(c.commands().filter((x) => x[1] === 'conversion').length, 0);
  assert.ok(!JSON.stringify(c.commands()).includes('private'));
});
test('Marketing-only does not configure Analytics; conversions use distinct labels', () => {
  const c = run();
  c.api.save(false, true);
  c.api.page('/');
  c.api.conversion('phone', 'hero');
  c.api.conversion('whatsapp', 'footer');
  const events = c.commands().filter((x) => x[0] === 'event');
  assert.deepEqual(
    events.map((x) => x[2].send_to),
    ['AW-123456/call', 'AW-123456/chat'],
  );
  assert.equal(c.commands().filter((x) => x[0] === 'config' && x[1] === 'G-TEST').length, 0);
});
test('Accept all initializes each property once', () => {
  const c = run();
  c.api.save(true, true);
  c.api.save(true, true);
  assert.equal(c.scripts.length, 1);
  assert.equal(c.commands().filter((x) => x[0] === 'config').length, 2);
});
test('Withdrawal denies, removes accessible tracking cookies and reloads to unload tags', () => {
  const c = run();
  c.api.save(true, true);
  c.api.save(false, false);
  assert.equal(c.reloads(), 1);
  assert.equal(c.window['ga-disable-G-TEST'], true);
  assert.ok(c.cookies.some((x) => x.startsWith('_ga=')));
  assert.ok(c.cookies.every((x) => !x.startsWith('essential=')));
  assert.equal(c.api.read().analytics, false);
});
test('Expired, malformed and future choices fail closed', () => {
  for (const value of [
    { version: 1, analytics: true, marketing: true, timestamp: Date.now() - 181 * 86400000 },
    { version: 1, analytics: true, marketing: true, timestamp: Date.now() + 86400000 },
    { version: 1, analytics: 'yes', marketing: true, timestamp: Date.now() },
  ]) {
    const c = run(value);
    assert.equal(c.api.read(), null);
    assert.equal(c.scripts.length, 0);
  }
});
test('Storage restrictions do not crash consent', () => {
  const c = run(undefined, true);
  c.api.save(false, false);
  assert.equal(c.scripts.length, 0);
  assert.equal(c.api.read().analytics, false);
});
