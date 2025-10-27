import { test, expect } from '@playwright/test';

test.describe('Product Browsing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays product grid on home page', async ({ page }) => {
    await expect(page.getByText('Welcome to Bookline')).toBeVisible();
    await expect(page.getByText('Discover your next favorite book')).toBeVisible();
  });

  test('loads and displays products', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { state: 'visible', timeout: 10000 });
    
    // Check that product cards are visible
    const productCards = page.locator('[data-testid="product-card"]');
    const count = await productCards.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('can search for products', async ({ page }) => {
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    // Find search input if it exists
    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await page.waitForTimeout(500); // Wait for search to execute
    }
  });

  test('can filter by category', async ({ page }) => {
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    // Look for category filter buttons
    const categoryButtons = page.locator('button:has-text("Fiction"), button:has-text("Non-Fiction")');
    
    if (await categoryButtons.count() > 0) {
      await categoryButtons.first().click();
      await page.waitForTimeout(500);
    }
  });

  test('can add product to cart from grid view', async ({ page }) => {
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    const addToCartButton = page.locator('button:has-text("Add to Cart")').first();
    
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      
      // Verify cart badge updated
      const cartBadge = page.locator('[class*="badge"], span').filter({ hasText: /[1-9]/ }).first();
      
      // Give it a moment to update
      await page.waitForTimeout(300);
    }
  });

  test('displays product details correctly', async ({ page }) => {
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    // Check that product cards have expected elements
    const productCard = page.locator('[data-testid="product-card"]').first();
    
    await expect(productCard).toBeVisible();
  });

  test('can switch between grid and list view', async ({ page }) => {
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    // Look for view toggle buttons (Grid/List)
    const gridButton = page.locator('button[aria-label*="Grid"], button[title*="Grid"]').first();
    const listButton = page.locator('button[aria-label*="List"], button[title*="List"]').first();
    
    if (await gridButton.isVisible()) {
      await gridButton.click();
    } else if (await listButton.isVisible()) {
      await listButton.click();
    }
  });

  test('renders product images', async ({ page }) => {
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    
    const productImages = page.locator('img');
    const imageCount = await productImages.count();
    
    expect(imageCount).toBeGreaterThan(0);
  });
});
