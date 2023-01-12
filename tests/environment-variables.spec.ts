import { test, expect } from '@playwright/test';

test.describe('Environment variables', () => {
  test('Clicks links and assets on page title', async ({ page }) => {
    await page.goto('https://marmelab.com/react-admin-crm');

    await page.getByRole('button', { name: /profile/i }).click();
    await page.getByRole('menuitem', { name: /logout/i }).click();

    await page.pause();

    await page
      .getByLabel(/username/i)
      .type(process.env.CRM_USERNAME, { delay: 75 });

    await page
      .getByLabel(/password/i)
      .type(process.env.CRM_PASSWORD, { delay: 75 });

    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText(/atomic crm/i)).toBeVisible();
  });
});
