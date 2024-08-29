import { test, expect } from '@playwright/test';
import 'dotenv/config';

const baseUrl = process.env.BASEURL;

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}`);
});

test('Landing Page layout', async ({ page }) => {
  await expect(page).toHaveScreenshot(
    'landing-page-actual-chromium-darwin.png'
  );
});

test('Page has title', async ({ page }) => {
  await expect(page.getByText('Selected foods')).toBeVisible();
});

test('search food info', async ({ page }) => {
  await page.getByPlaceholder('Search foods...').fill('bananas, raw');
  await expect(
    page.locator('#food-search :text("Bananas, raw")')
  ).toBeVisible();
  await page.locator('#food-search :text("Bananas, raw")').click();
  await expect(page.getByText('89.00')).toBeVisible();
  await expect(page).toHaveScreenshot('search-food-info-1-chromium-darwin.png');
});
