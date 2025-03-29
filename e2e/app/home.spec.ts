import { test, expect } from '@playwright/test';

test('should have the correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Budget tracker/);
});

test('should have the correct header', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Manage your finances like a pro!' })).toBeVisible();
});

test('should navigate to the login page', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page).toHaveURL('/sign-in');
});
