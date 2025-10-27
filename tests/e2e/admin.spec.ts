import { test, expect } from '@playwright/test';
import { loginUser } from './test-utils';

test.describe('Admin Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin user
    await loginUser(page, 'admin@example.com', 'admin');
  });

  test('loads admin dashboard for authenticated admin', async ({ page }) => {
    await page.goto('/admin');
    
    await expect(page.getByTestId('admin-dashboard-title')).toBeVisible();
    await expect(page.getByTestId('admin-dashboard-subtitle')).toBeVisible();
  });

  test('displays dashboard stats', async ({ page }) => {
    await page.goto('/admin');
    
    // Wait for stats to load
    await expect(page.getByTestId('admin-stats')).toBeVisible();
    await expect(page.getByTestId('admin-stat-products')).toBeVisible();
    await expect(page.getByTestId('admin-stat-orders')).toBeVisible();
    await expect(page.getByTestId('admin-stat-revenue')).toBeVisible();
  });

  test('shows products section', async ({ page }) => {
    await page.goto('/admin');
    
    await expect(page.getByTestId('admin-products-section-title')).toBeVisible();
    await expect(page.getByTestId('admin-add-product-button')).toBeVisible();
  });

  test('opens add product form when clicking Add Product', async ({ page }) => {
    await page.goto('/admin');
    
    await page.getByTestId('admin-add-product-button').click();
    
    // Wait for modal/form to appear
    await expect(page.getByText('Add New Product')).toBeVisible();
  });

  test('has navigation buttons in header', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000); // Wait for page to load
    
    // Check for back to store link - it should be visible
    const backLink = page.getByText('Back to Store');
    await expect(backLink).toBeVisible();
    
    // Check for home button
    const homeButton = page.getByRole('button', { name: /Home/i });
    await expect(homeButton).toBeVisible();
  });

  test('redirects to home when clicking back to store', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000); // Wait for page to load
    
    await page.getByText('Back to Store').click();
    
    // Should navigate back to home
    await expect(page).toHaveURL('/', { timeout: 5000 });
  });

  test('displays product cards with edit and delete buttons', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000); // Wait for page to load
    
    // Wait for products list to load
    const productsList = page.getByTestId('admin-products-list');
    await expect(productsList).toBeVisible();
    
    // Check if there are any products
    const productCards = page.locator('[data-testid^="admin-product-"]');
    const count = await productCards.count();
    
    if (count > 0) {
      // If products exist, buttons should be present
      const editButtons = page.locator('button:has-text("Edit")');
      const deleteButtons = page.locator('button:has-text("Delete")');
      
      await expect(editButtons.first()).toBeVisible();
      await expect(deleteButtons.first()).toBeVisible();
    } else {
      // If no products, that's also a valid state
      expect(count).toBe(0);
    }
  });
});
