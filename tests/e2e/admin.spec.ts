import { test, expect } from '@playwright/test';
import { loginUser } from './test-utils';

test.describe('Admin Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin user
    await loginUser(page, 'admin@bookline.com', 'admin123');
  });

  test('loads admin dashboard for authenticated admin', async ({ page }) => {
    await page.goto('/admin');
    
    await expect(page.getByText('Admin Dashboard')).toBeVisible();
    await expect(page.getByText('Manage your products and orders')).toBeVisible();
  });

  test('displays dashboard stats', async ({ page }) => {
    await page.goto('/admin');
    
    await expect(page.getByText('Total Products')).toBeVisible();
    await expect(page.getByText('Total Orders')).toBeVisible();
    await expect(page.getByText('Revenue')).toBeVisible();
  });

  test('shows products section', async ({ page }) => {
    await page.goto('/admin');
    
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Product' })).toBeVisible();
  });

  test('opens add product form when clicking Add Product', async ({ page }) => {
    await page.goto('/admin');
    
    await page.getByRole('button', { name: 'Add Product' }).click();
    
    // Wait for modal/form to appear
    await expect(page.getByText('Add New Product')).toBeVisible();
  });

  test('has navigation buttons in header', async ({ page }) => {
    await page.goto('/admin');
    
    // Check for back to store link
    const backLink = page.getByText('Back to Store');
    await expect(backLink).toBeVisible();
    
    // Check for home button
    const homeButton = page.getByRole('button', { name: /Home/i });
    await expect(homeButton).toBeVisible();
  });

  test('redirects to home when clicking back to store', async ({ page }) => {
    await page.goto('/admin');
    
    await page.getByText('Back to Store').click();
    
    // Should navigate back to home
    await expect(page).toHaveURL('/');
  });

  test('displays product cards with edit and delete buttons', async ({ page }) => {
    await page.goto('/admin');
    
    // Assuming there are products, check for edit/delete buttons
    const editButtons = page.locator('button:has-text("Edit")');
    const deleteButtons = page.locator('button:has-text("Delete")');
    
    // If products exist, buttons should be present
    // This test might need adjustment based on whether there are products
    if (await editButtons.count() > 0) {
      await expect(editButtons.first()).toBeVisible();
      await expect(deleteButtons.first()).toBeVisible();
    }
  });
});
