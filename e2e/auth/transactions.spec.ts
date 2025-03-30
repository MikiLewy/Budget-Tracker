import { test, expect } from '@playwright/test';
import { formatDate } from 'date-fns';

import { dateFormats } from '@/constants/date-formats';

test('should have navigate to transactions page', async ({ page }) => {
  await page.goto('/overview');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.getByRole('link', { name: 'Transactions', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'Transactions' })).toBeVisible();
});

test('should open add transaction modal', async ({ page }) => {
  await page.goto('/transactions');

  await page.getByRole('button', { name: 'Create transaction' }).click();

  await expect(page.getByRole('heading', { name: 'Create transaction' })).toBeVisible();
});

test('should create a new transaction', async ({ page }) => {
  await page.goto('/transactions');

  await page.getByRole('button', { name: 'Create transaction' }).click();

  await page.getByRole('textbox', { name: 'Name' }).fill('Test transaction');

  await page.getByRole('combobox', { name: 'Category' }).click();

  await page.getByRole('option', { name: 'Food' }).click();

  await page.getByRole('spinbutton', { name: 'Amount' }).fill('100');

  await page
    .getByRole('button', {
      name: formatDate(new Date(), `${dateFormats.monthLong} ${dateFormats.day}, ${dateFormats.year}`),
    })
    .click();

  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(page.getByText('Successfully created transaction')).toBeVisible();
});
