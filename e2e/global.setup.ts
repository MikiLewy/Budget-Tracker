import { clerk, clerkSetup } from '@clerk/testing/playwright';
import { test as setup } from '@playwright/test';
import path from 'path';

setup('global setup', async () => {
  await clerkSetup();

  if (!process.env.PLAYWRIGHT_E2E_USER_EMAIL || !process.env.PLAYWRIGHT_E2E_USER_PASSWORD) {
    throw new Error('Please provide PLAYWRIGHT_E2E_USER_EMAIL and PLAYWRIGHT_E2E_USER_PASSWORD environment variables.');
  }
});

const authFile = path.join(__dirname, '../playwright/.clerk/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/');

  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'password',
      identifier: process.env.PLAYWRIGHT_E2E_USER_EMAIL!,
      password: process.env.PLAYWRIGHT_E2E_USER_PASSWORD!,
    },
  });

  await page.context().storageState({ path: authFile });
});
