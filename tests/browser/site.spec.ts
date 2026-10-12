import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('All routes render, with no broken internal links or assets', async ({ page, request }) => {
  const routes = [
    '/',
    '/servicios/desatascos-24-horas/',
    '/servicios/inspeccion-camara-tuberias/',
    '/desatascos-alicante/',
    '/desatascos-benidorm/',
    '/desatascos-torrevieja/',
    '/desatascos-elche/',
    '/desatascos-altea/',
    '/zonas/',
    '/contacto/',
    '/aviso-legal/',
    '/politica-de-privacidad/',
    '/politica-de-cookies/',
  ];
  const links = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://desatascoslevante24.es' + route,
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    for (const link of await page
      .locator('a[href^="/"], img[src^="/"]')
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute('href') || n.getAttribute('src') || ''),
      ))
      links.add(link.split('#')[0]);
  }
  for (const link of links) expect((await request.get(link)).status(), link).toBe(200);
  expect(errors).toEqual([]);
  expect((await request.get('/missing-page/')).status()).toBe(404);
});
test('Consent rejection, granular choice, reopening and withdrawal work', async ({ page }) => {
  const google: string[] = [];
  page.on('request', (r) => {
    if (/googletagmanager|google-analytics|doubleclick|googleadservices/.test(r.url()))
      google.push(r.url());
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Rechazar', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('region', { name: 'Preferencias de cookies' })).toHaveCount(0);
  expect(google).toEqual([]);
  await page.getByRole('button', { name: 'Configurar cookies', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('checkbox').first().check();
  await dialog.getByRole('button', { name: 'Guardar selección' }).click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('levante24-consent-v1') || '{}').analytics,
    ),
  ).toBe(true);
  await page.getByRole('button', { name: 'Configurar cookies', exact: true }).click();
  await dialog.getByRole('button', { name: 'Rechazar todas' }).click();
  await page.waitForLoadState();
  await expect
    .poll(() =>
      page.evaluate(
        () => JSON.parse(localStorage.getItem('levante24-consent-v1') || '{}').analytics,
      ),
    )
    .toBe(false);
  expect(google).toEqual([]);
});
test('Contact placeholders are honest and FAQ/menu keyboard interactions work', async ({
  page,
}, info) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Rechazar', exact: true }).click();
  expect(await page.locator('a[href^="tel:"]').count()).toBe(0);
  expect(await page.locator('a[href*="wa.me"]').count()).toBe(0);
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page
      .getByRole('navigation', { name: 'Navegación principal' })
      .getByRole('link', { name: 'Zonas', exact: true })
      .click();
    await expect(page).toHaveURL(/zonas/);
    await page.goto('/');
  }
  const question = page.locator('summary').first();
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
  await page.locator('.hero .btn-primary').click();
  await expect(page).toHaveURL(/contacto/);
  await expect(
    page.getByText('Teléfono pendiente de activar', { exact: true }).first(),
  ).toBeVisible();
});
test('Key pages pass automated WCAG AA checks', async ({ page }) => {
  for (const route of ['/', '/contacto/', '/desatascos-altea/', '/politica-de-cookies/']) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    ).toEqual([]);
  }
});
