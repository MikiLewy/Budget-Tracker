import { test, expect } from '@playwright/test';

test('should have the correct header', async ({ page }) => {
  await page.goto('/settings');

  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});

test('should update the user budget', async ({ page }) => {
  await page.goto('/settings');

  await page.getByRole('spinbutton').fill('1000');

  await page.getByRole('button', { name: 'Save changes' }).click();
});

test('should update the user currency', async ({ page }) => {
  await page.goto('/settings');

  await page.getByRole('combobox', { name: 'Currency' }).click();

  await page.getByRole('option', { name: 'USD' }).click();

  await page.getByRole('button', { name: 'Save changes' }).click();

  await expect(page.getByText('Successfully updated budget')).toBeVisible();
});
