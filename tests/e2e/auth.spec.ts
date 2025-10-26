import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('shows login form by default', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('can switch between login and signup forms', async ({ page }) => {
    await page.goto('/signup');
    // Initially on login form
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    
    // Switch to signup
    await page.getByRole('tab', { name: 'Register' }).click();
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByTestId('signup-form')).toBeVisible();
    
    // Switch back to login
    await page.getByRole('tab', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  });

  test('shows validation errors for invalid inputs', async ({ page }) => {
    await page.goto('/signup');
    
    // Try login with invalid email
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Invalid email address')).toBeVisible();

    // Try with invalid password
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
  });

  test('shows error for mismatched passwords in signup', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('tab', { name: 'Register' }).click();
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByLabel('Confirm Password').fill('password456');
    await page.getByRole('button', { name: 'Create Account' }).click();
    
    await expect(page.getByText('Passwords do not match')).toBeVisible();
  });

  test.describe('Successful authentication flow', () => {
    test('redirects to home after successful login', async ({ page }) => {
      await page.goto('/signup');
      
      await page.getByLabel('Email').fill('test@example.com');
      await page.getByLabel('Password').fill('password123');
      await page.getByRole('button', { name: 'Sign In' }).click();
      
      // Should redirect to home and show welcome toast
      await expect(page).toHaveURL('/');
      await expect(page.getByText(/Welcome/)).toBeVisible();
    });

    test('preserves redirect parameter after login', async ({ page }) => {
      await page.goto('/signup?redirect=/products');
      
      await page.getByLabel('Email').fill('test@example.com');
      await page.getByLabel('Password').fill('password123');
      await page.getByRole('button', { name: 'Sign In' }).click();
      
      // Should redirect to specified page
      await expect(page).toHaveURL('/products');
    });
  });
});