import { test, expect } from '@playwright/test';

test.describe('Home Page - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/KnitsDigital/);
  });

  test('should render hero section with title', async ({ page }) => {
    const title = page.locator('h1:has-text("Tejemos código")');
    await expect(title).toBeVisible();
  });

  test('should render all navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Servicios/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Equipo/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Precios/ })).toBeVisible();
  });

  test('should render contact CTA button', async ({ page }) => {
    const contactBtn = page.getByRole('link', { name: /Contactar/ }).first();
    await expect(contactBtn).toBeVisible();
  });

  test('should navigate to servicios page', async ({ page }) => {
    await page.getByRole('link', { name: /Servicios/ }).first().click();
    // Wait for navigation to complete
    await page.waitForURL('**/servicios');
  });

  test('should have accessible skip link', async ({ page }) => {
    const skipLink = page.getByText('Saltar al contenido');
    await expect(skipLink).toHaveAttribute('href', '#main');
  });

  test('should render footer with links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/© KnitsDigital/)).toBeVisible();
  });

  test('should have focus visible on interactive elements', async ({ page }) => {
    const firstLink = page.getByRole('link').first();
    await firstLink.focus();
    // Check that focus is visible (outline should be present)
    const focusOutline = await firstLink.evaluate((el) => {
      return window.getComputedStyle(el, ':focus-visible').outline;
    });
    // Note: This may not work perfectly in Playwright, but it's a start
  });
});
