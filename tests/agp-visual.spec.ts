
import { test, expect } from '@playwright/test';

test.describe('Ultrathink Visual Baselines', () => {

    // Test 1: Hero Section (Light Mode)
    test('Baseline: Hero Section (Light Mode)', async ({ page }) => {
        // Force Light Mode
        await page.goto('/');
        await page.bringToFront();
        await page.evaluate(() => {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        });
        await page.reload();
        await page.waitForTimeout(1500); // Wait for textures to load

        const hero = page.locator('main'); // Capture main content
        await expect(hero).toHaveScreenshot('hero-light-baseline.png', {
            maxDiffPixelRatio: 0.05, // Allow slight anti-aliasing diffs
            threshold: 0.2
        });
    });

    // Test 2: Hero Section (Dark Mode)
    test('Baseline: Hero Section (Dark Mode)', async ({ page }) => {
        await page.goto('/');
        await page.bringToFront();
        await page.locator('button[aria-label="Switch to dark mode"]:visible').click();
        await page.waitForTimeout(1500); // Wait for glass/blur

        // Validate Dark Mode State
        const html = page.locator('html');
        await expect(html).toHaveClass(/dark/);

        const hero = page.locator('main');
        await expect(hero).toHaveScreenshot('hero-dark-baseline.png');
    });

    // Test 3: Theme Transition at 50%
    test('Baseline: Theme Transition Midpoint', async ({ page }) => {
        await page.goto('/');
        await page.bringToFront();
        await page.waitForTimeout(1000);

        // Initial Screenshot (Light)
        // Trigger Switch
        await page.locator('button[aria-label="Switch to dark mode"]:visible').click();

        // Wait 350ms (Halfway through 700ms)
        await page.waitForTimeout(350);

        // Capture Full Page (to catch background blend)
        await expect(page).toHaveScreenshot('theme-transition-midpoint.png', {
            animations: 'allow', // Capture the fade in progress
        });
    });

    // Test 4: Mobile Viewport
    test('Baseline: Mobile Viewport (375px)', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForTimeout(1000);

        // Check Navigation Menu (Hamburger if present, or just layout)
        await expect(page).toHaveScreenshot('mobile-view-baseline.png', {
            fullPage: true
        });
    });

    // Test 5: Tablet Viewport
    test('Baseline: Tablet Viewport (768px)', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');
        await page.waitForTimeout(1000);

        await expect(page).toHaveScreenshot('tablet-view-baseline.png', {
            fullPage: true
        });
    });

});
