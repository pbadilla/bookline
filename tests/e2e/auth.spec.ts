import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('shows login form by default', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForTimeout(1000); // Wait for component to render
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('can switch between login and signup forms', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForTimeout(1000); // Wait for component to render
    // Initially on login form
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    
    // Switch to signup using testid
    await page.getByTestId('register-tab').click();
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByTestId('signup-form')).toBeVisible();
    
    // Switch back to login using testid
    await page.getByTestId('login-tab').click();
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });

  test('shows validation errors for invalid inputs', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForTimeout(1000); // Wait for component to render
    
    // Try login with invalid email
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByTestId('sign-in-button').click();
    // Wait for toast error to appear
    await page.waitForTimeout(500);
    await expect(page.getByText('Invalid email address')).toBeVisible();

    // Try with invalid password
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('123');
    await page.getByTestId('sign-in-button').click();
    // Wait for toast error to appear
    await page.waitForTimeout(500);
    await expect(page.getByText(/Password must be at least/)).toBeVisible();
  });

  test('shows error for mismatched passwords in signup', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForTimeout(1000); // Wait for component to render
    await page.getByTestId('register-tab').click();
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByLabel('Confirm Password').fill('password456');
    await page.getByTestId('create-account-button').click();
    
    // Wait for toast error to appear
    await page.waitForTimeout(500);
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test.describe('Successful authentication flow', () => {
    test('redirects to home after successful login', async ({ page }) => {
      await page.goto('/signup');
      await page.waitForTimeout(1000); // Wait for component to render
      
      await page.getByLabel('Email').fill('test@example.com');
      await page.getByLabel('Password').fill('password123');
      await page.getByTestId('sign-in-button').click();
      
      // Should redirect to home and show welcome toast
      await expect(page).toHaveURL('/', { timeout: 10000 });
      await expect(page.getByText(/Welcome/)).toBeVisible();
    });

    test('preserves redirect parameter after login', async ({ page }) => {
      await page.goto('/signup?redirect=/products');
      await page.waitForTimeout(1000); // Wait for component to render
      
      await page.getByLabel('Email').fill('test@example.com');
      await page.getByLabel('Password').fill('password123');
      await page.getByTestId('sign-in-button').click();
      
      // Should redirect to specified page (but /products redirects to /)
      await expect(page).toHaveURL('/');
    });
  });
});