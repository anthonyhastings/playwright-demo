import { test, expect } from '@playwright/test';

test.describe('Page related assertions', () => {
  test.beforeEach(() => {
    test.info().annotations.push({
      type: 'info',
      description:
        'Custom annotations are a useful place to add supporting information for the run such as generated user credentials.',
    });
  });

  test('Clicks links and asserts on URL', async ({ page }) => {
    await page.goto('https://uw0xnp.csb.app/');

    await expect(page.getByRole('heading', { name: /home/i })).toBeVisible();
    await page.getByRole('link', { name: /dashboard/i }).click();
    await expect(
      page.getByRole('heading', { name: /dashboard/i })
    ).toBeVisible();
    await expect(page).toHaveURL(/dashboard$/);
  });

  test('Clicks links and assets on page title', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/intro');
    await expect(page).toHaveTitle('Installation | Playwright');

    await page.getByRole('link', { name: /^writing tests$/i }).click();
    await expect(page).toHaveTitle('Writing Tests | Playwright');
  });
});
