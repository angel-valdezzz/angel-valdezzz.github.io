import {test, expect} from '@playwright/test';

test('hero cube keeps its pose when motion is toggled or reduced', async ({page, isMobile}, testInfo) => {
  await page.clock.install();
  await page.addInitScript(() => localStorage.setItem('angel-gallery-motion', 'off'));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  const canvas = page.locator('.hero-canvas');
  const image = () => canvas.evaluate(el => el.toDataURL());
  await expect(canvas).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.locator('.hero-motif').screenshot({path: testInfo.outputPath('cube-start.jpg'), type: 'jpeg', quality: 90});
  const initial = await image();

  // Dispatch without advancing the frozen animation clock.
  const toggle = () => page.locator('.motion-toggle').evaluate(el => el.click());
  await toggle();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await page.clock.runFor(16);
  expect(await image(), 'enabling motion must preserve the initial pose').toBe(initial);
  await page.clock.runFor(800);
  await page.locator('.hero-motif').screenshot({path: testInfo.outputPath('cube-turn.jpg'), type: 'jpeg', quality: 90});
  expect(await image()).not.toBe(initial);
  await page.clock.runFor(4000);
  await page.locator('.hero-motif').screenshot({path: testInfo.outputPath('cube-later.jpg'), type: 'jpeg', quality: 90});

  if (!isMobile) {
    const rect = await canvas.boundingBox();
    await page.mouse.move(rect.x + rect.width * .88, rect.y + rect.height * .18);
    await page.clock.runFor(600);
  }
  const beforePause = await image();
  await toggle();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  expect(await image(), 'pausing must freeze the visible pose without snapping').toBe(beforePause);
  await page.clock.runFor(1000);
  expect(await image()).toBe(beforePause);
  await page.locator('.hero-motif').screenshot({path: testInfo.outputPath('cube-paused.jpg'), type: 'jpeg', quality: 90});

  await toggle();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await page.clock.runFor(16);
  expect(await image(), 'resuming must continue from the paused pose').toBe(beforePause);
  await page.clock.runFor(300);
  expect(await image()).not.toBe(beforePause);
  const beforeReduction = await image();
  await page.emulateMedia({reducedMotion: 'reduce'});
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  expect(await image(), 'reduced motion must also keep the current pose').toBe(beforeReduction);
  await page.clock.runFor(500);
  expect(await image()).toBe(beforeReduction);
});
