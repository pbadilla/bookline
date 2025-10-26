import { test, expect, loginUser, logoutUser } from './test-utils';
import { testUsers } from './fixtures/users';

test.describe('Authenticated User Flows', () => {
  test('complete login-logout flow', async ({ page }) => {
    await loginUser(page, testUsers.standard.email, testUsers.standard.password);
    
    // Verify logged in state
    await expect(page.getByText(/Welcome/)).toBeVisible();
    await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible();
    
    // Logout
    await logoutUser(page);
    
    // Verify logged out state
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('remembers user session across navigation', async ({ authenticatedPage: page }) => {
    // Navigate to different pages
    await page.goto('/products');
    await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible();
    
    await page.goto('/profile');
    await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible();
  });

  test('protects authenticated routes', async ({ page }) => {
    // Try to access protected page without auth
    await page.goto('/profile');
    // Should redirect to login
    await expect(page).toHaveURL(/.*signup.*redirect=\/profile/);
    
    // Login and verify redirect back
    await loginUser(page, testUsers.standard.email, testUsers.standard.password);
    await expect(page).toHaveURL('/profile');
  });

  test('maintains shopping cart across login/logout', async ({ page }) => {
    // Add item to cart before login
    await page.goto('/products');
    await page.getByTestId('product-card').first().click();
    await page.getByRole('button', { name: /add to cart/i }).click();
    
    // Login
    await loginUser(page, testUsers.standard.email, testUsers.standard.password);
    
    // Verify cart still has item
    await page.getByRole('button', { name: /cart/i }).click();
    await expect(page.getByTestId('cart-items')).toHaveCount(1);
    
    // Logout and verify cart persists
    await logoutUser(page);
    await page.goto('/cart');
    await expect(page.getByTestId('cart-items')).toHaveCount(1);
  });
});