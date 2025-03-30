import { test, expect } from '@playwright/test';

test('should have the correct header', async ({ page }) => {
  await page.goto('/overview');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
