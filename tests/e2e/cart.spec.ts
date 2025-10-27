import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays empty cart message when cart is empty', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.getByTestId('cart-empty')).toBeVisible();
    await expect(page.getByTestId('cart-empty-title')).toBeVisible();
    await expect(page.getByTestId('cart-empty-message')).toBeVisible();
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
    await expect(page.getByTestId('cart-title')).toBeVisible();
    await expect(page.getByTestId('cart-items')).toBeVisible();
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
    await expect(page.getByTestId('cart-empty')).toBeVisible();
  });

  test('displays correct order summary', async ({ page }) => {
    // Add item to cart
    await page.waitForSelector('[data-testid="product-card"]');
    await page.locator('button:has-text("Add to Cart")').first().click();
    
    await page.goto('/cart');
    
    // Check for order summary elements using testids
    await expect(page.getByTestId('cart-summary')).toBeVisible();
    await expect(page.getByTestId('cart-summary-title')).toBeVisible();
    await expect(page.getByTestId('cart-summary-subtotal')).toBeVisible();
    await expect(page.getByTestId('cart-summary-total')).toBeVisible();
  });

  test('opens checkout modal when clicking proceed to checkout', async ({ page }) => {
    // Add item to cart
    await page.waitForSelector('[data-testid="product-card"]');
    await page.locator('button:has-text("Add to Cart")').first().click();
    
    await page.goto('/cart');
    
    // Click checkout button using testid
    await page.getByTestId('cart-checkout-button').click();
    
    // Check modal appears using testid
    await expect(page.getByTestId('checkout-modal')).toBeVisible();
    await expect(page.getByTestId('checkout-modal-title')).toBeVisible();
  });

  test('can cancel checkout modal', async ({ page }) => {
    // Add item to cart
    await page.waitForSelector('[data-testid="product-card"]');
    await page.locator('button:has-text("Add to Cart")').first().click();
    
    await page.goto('/cart');
    
    // Open modal
    await page.getByTestId('cart-checkout-button').click();
    await expect(page.getByTestId('checkout-modal')).toBeVisible();
    
    // Close modal
    await page.getByTestId('checkout-modal-cancel').click();
    
    // Modal should be gone
    await expect(page.getByTestId('checkout-modal')).not.toBeVisible();
  });
});
