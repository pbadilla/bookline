import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows app title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Bookline')).toBeVisible();
  });
});
