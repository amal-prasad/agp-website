
import { test, expect } from '@playwright/test';

test.describe('AGP Performance Benchmarks', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.bringToFront(); // Ensure page is prioritized
        await page.waitForTimeout(1000);
    });

    test('Theme Transition FPS Check', async ({ page }) => {
        // 1. Setup FPS Counter
        await page.evaluate(() => {
            const win = window as any;
            win.perfStats = { frames: 0, startTime: 0, isRunning: false };

            win.startFps = () => {
                win.perfStats.frames = 0;
                win.perfStats.startTime = performance.now();
                win.perfStats.isRunning = true;

                const loop = () => {
                    if (win.perfStats.isRunning) {
                        win.perfStats.frames++;
                        requestAnimationFrame(loop);
                    }
                };
                requestAnimationFrame(loop);
            };

            win.stopFps = () => {
                win.perfStats.isRunning = false;
                const duration = (performance.now() - win.perfStats.startTime) / 1000;
                return { frames: win.perfStats.frames, duration, fps: win.perfStats.frames / duration };
            };
        });

        // 2. Start Measurement
        await page.evaluate(() => (window as any).startFps());

        // 3. Trigger Heavy Animation (Theme Toggle)
        await page.locator('button[aria-label="Switch to dark mode"]:visible').click();

        // 4. Wait for Transition (700ms)
        await page.waitForTimeout(1000);

        // 5. Stop & Assert
        const result = await page.evaluate(() => (window as any).stopFps());
        console.log(`Measured: ${result.frames} frames in ${result.duration.toFixed(2)}s = ${result.fps.toFixed(2)} FPS`);

        // In strict headless environment without GPU, FPS might be throttled.
        // We'll warn if low, but assert > 10 to ensure it's not dead.
        // Real user browser would be 60.
        expect(result.fps).toBeGreaterThan(10);
    });

    test('Transition Duration is within 700ms Spec', async ({ page }) => {
        const toggle = page.locator('button[aria-label="Switch to light mode"]:visible');

        // Ensure we are in dark mode first (since we just reloaded in beforeEach, we are in default system/light usually?)
        // Actually beforeEach goes to / -> default 'system'.
        // UseTheme Logic: System.
        // Let's force Dark Mode first to set up the test "Switch to Light".
        await page.locator('button[aria-label="Switch to dark mode"]:visible').click();
        await page.waitForTimeout(1000); // Wait for settle

        // Now test Dark -> Light
        const start = Date.now();
        await page.locator('button[aria-label="Switch to light mode"]:visible').click();

        // Wait for the dark container to disappear (opacity 0)
        const darkContainer = page.locator('[data-section="background"] .dark-mode-only');
        await expect(darkContainer).not.toBeVisible({ timeout: 1500 });

        const duration = Date.now() - start;
        console.log(`Transition Wall-Clock Duration: ${duration}ms`);

        // The CSS is 700ms. Expect checks happen periodically.
        // It should be roughly 700ms.
        expect(duration).toBeLessThan(1500);
        expect(duration).toBeGreaterThan(600);
    });

    test('Zero Layout Shifts (CLS) during interaction', async ({ page }) => {
        // Inject CLS Observer
        await page.evaluate(() => {
            const win = window as any;
            win.clsScore = 0;
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    // Ignore shifts from recent input (clicks)
                    if (!(entry as any).hadRecentInput) {
                        win.clsScore += (entry as any).value;
                    }
                }
            }).observe({ type: 'layout-shift', buffered: true });
        });

        // Toggle Theme
        await page.locator('button[aria-label="Switch to dark mode"]:visible').click();
        await page.waitForTimeout(800);

        const cls = await page.evaluate(() => (window as any).clsScore);
        console.log(`Cumulative Layout Shift: ${cls}`);

        expect(cls).toBeLessThan(0.01);
    });

    test('Memory Usage remains stable', async ({ page, browserName }) => {
        test.skip(browserName !== 'chromium', 'Memory API only available in Chromium');

        const getUsedJSHeapSize = () => (performance as any).memory.usedJSHeapSize / (1024 * 1024);
        const baseline = await page.evaluate(getUsedJSHeapSize);
        console.log(`Baseline Memory: ${baseline.toFixed(2)} MB`);

        const toggle = page.locator('button[aria-label="Switch to dark mode"]:visible');
        const toggleBack = page.locator('button[aria-label="Switch to light mode"]:visible');

        for (let i = 0; i < 5; i++) {
            await toggle.click();
            await page.waitForTimeout(100);
            await toggleBack.click();
            await page.waitForTimeout(100);
        }

        const after = await page.evaluate(getUsedJSHeapSize);
        const delta = after - baseline;
        console.log(`Memory Delta: ${delta.toFixed(2)} MB`);

        expect(delta).toBeLessThan(50);
    });

});
