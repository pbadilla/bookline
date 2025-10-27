import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays empty cart message when cart is empty', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.getByText('Your cart is empty')).toBeVisible();
    await expect(page.getByText('Add some products to get started!')).toBeVisible();
  });

  test('adds product to cart and navigates to cart', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { state: 'visible' });
    
    // Click first "Add to Cart" button
    const addToCartButtons = page.locator('button:has-text("Add to Cart")');
    await addToCartButtons.first().click();

    // Navigate to cart
    await page.goto('/cart');

    // Check that cart is no longer empty
    await expect(page.getByText('Checkout Cart')).toBeVisible();
  });

  test('updates item quantity in cart', async ({ page }) => {
    // Add item to cart first
    await page.waitForSelector('[data-testid="product-card"]');
    await page.locator('button:has-text("Add to Cart")').first().click();
    
    await page.goto('/cart');
    
    // Find quantity input and update it
    const quantityInput = page.locator('input[type="number"]').first();
    await quantityInput.fill('3');
    
    // Verify the value was updated
    await expect(quantityInput).toHaveValue('3');
  });

  test('removes item from cart', async ({ page }) => {
    // Add item to cart
    await page.waitForSelector('[data-testid="product-card"]');
    await page.locator('button:has-text("Add to Cart")').first().click();
    
    await page.goto('/cart');
    
    // Click remove button (trash icon)
    const removeButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await removeButton.click();
    
    // Should show empty cart
    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });

  test('displays correct order summary', async ({ page }) => {
    // Add item to cart
    await page.waitForSelector('[data-testid="product-card"]');
    await page.locator('button:has-text("Add to Cart")').first().click();
    
    await page.goto('/cart');
    
    // Check for order summary elements
    await expect(page.getByText('Order Summary')).toBeVisible();
    await expect(page.getByText('Subtotal')).toBeVisible();
    await expect(page.getByText('Total')).toBeVisible();
  });

  test('opens checkout modal when clicking proceed to checkout', async ({ page }) => {
    // Add item to cart
    await page.waitForSelector('[data-testid="product-card"]');
    await page.locator('button:has-text("Add to Cart")').first().click();
    
    await page.goto('/cart');
    
    // Click checkout button
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    
    // Check modal appears
    await expect(page.getByText('Confirm Checkout')).toBeVisible();
  });
});
