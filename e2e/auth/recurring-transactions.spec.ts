import { test, expect } from '@playwright/test';
import { formatDate } from 'date-fns';

import { dateFormats } from '@/constants/date-formats';

test('should have navigate to recurring transactions page', async ({ page }) => {
  await page.goto('/overview');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.getByRole('link', { name: 'Recurring transactions', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'Recurring transactions' })).toBeVisible();
});

test('should open add recurring transaction modal', async ({ page }) => {
  await page.goto('/recurring-transactions');

  await page.getByRole('button', { name: 'Create recurring transaction' }).click();

  await expect(page.getByRole('heading', { name: 'Create recurring transaction' })).toBeVisible();
});

test('should create a new recurring transaction', async ({ page }) => {
  await page.goto('/recurring-transactions');

  await page.getByRole('button', { name: 'Create recurring transaction' }).click();

  await page.getByRole('textbox', { name: 'Name' }).fill('Test recurring transaction');

  await page.getByRole('combobox', { name: 'Category' }).click();

  await page.getByRole('option', { name: 'Food' }).click();

  await page.getByRole('spinbutton', { name: 'Amount' }).fill('100');

  await page
    .getByRole('button', {
      name: formatDate(new Date(2025, 0, 1), `${dateFormats.day}`),
    })
    .click();

  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(page.getByText('Successfully created recurring transaction')).toBeVisible();
});
