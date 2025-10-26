import { test as base, type Page } from '@playwright/test';
import { testUsers } from './fixtures/users';

type AuthFixtures = {
  authenticatedPage: Page;
};

// Extend base test with auth utilities
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Go to login
    await page.goto('/signup');
    
    // Fill login form
    await page.getByLabel('Email').fill(testUsers.standard.email);
    await page.getByLabel('Password').fill(testUsers.standard.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Wait for redirect and toast
    await page.waitForURL('/');
    await page.waitForSelector('text=Welcome');
    
    // Make the authenticated page available
    await use(page);
  }
});

export { expect } from '@playwright/test';

// Helper functions
export async function loginUser(page: Page, email: string, password: string) {
  await page.goto('/signup');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

export async function logoutUser(page: Page) {
  await page.getByRole('button', { name: /user menu/i }).click();
  await page.getByRole('menuitem', { name: /logout/i }).click();
  // Wait for redirect to login page
  await page.waitForURL('/signup');
}