import {test, expect} from '@playwright/test';

test('continuous motion is visible on desktop and mobile, and really stops on pause and reduced motion', async ({page}, testInfo) => {
  await page.emulateMedia({reducedMotion: 'no-preference'});
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const canvas = page.locator('.hero-canvas');
  await expect(canvas).toBeVisible();
  await expect(page.locator('.star-field')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  const snapshot = () => page.evaluate(() => ({
    cube: document.querySelector('.hero-canvas').toDataURL(),
    stars: document.querySelector('.star-field').toDataURL(),
    wash: getComputedStyle(document.querySelector('.ambient-violet')).transform,
    name: getComputedStyle(document.querySelector('.name-gradient')).backgroundPosition
  }));
  const first = await snapshot();
  await page.screenshot({path: testInfo.outputPath('motion-preview.jpg'), type: 'jpeg', quality: 80});
  await page.waitForTimeout(1200);
  const later = await snapshot();
  expect(later.cube).not.toBe(first.cube);
  expect(later.stars).not.toBe(first.stars);
  expect(later.wash).not.toBe(first.wash);
  expect(later.name).not.toBe(first.name);
  await page.screenshot({path: testInfo.outputPath('motion-later.jpg'), type: 'jpeg', quality: 80});

  await page.getByRole('button', {name: 'Pause motion', exact: true}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.waitForTimeout(100);
  const paused = await snapshot();
  await page.waitForTimeout(350);
  expect(await snapshot()).toEqual(paused);

  await page.getByRole('button', {name: 'Enable motion', exact: true}).click();
  await page.waitForTimeout(350);
  const resumed = await snapshot();
  expect(resumed.cube).not.toBe(paused.cube);
  expect(resumed.stars).not.toBe(paused.stars);
  await page.emulateMedia({reducedMotion: 'reduce'});
  await expect(page.getByRole('button', {name: 'Motion reduced by your device setting'})).toBeDisabled();
  await page.waitForTimeout(100);
  const reduced = await snapshot();
  await page.waitForTimeout(350);
  expect(await snapshot()).toEqual(reduced);
});

test('project depth responds to the pointer and detail opening and closing are animated with focus restored', async ({page, isMobile}, testInfo) => {
  await page.emulateMedia({reducedMotion: 'no-preference'});
  await page.goto('/');
  const trigger = page.getByRole('button', {name: 'Explore Web testing', exact: true});
  await trigger.scrollIntoViewIfNeeded();
  const card = page.locator('.project-card').first();
  const visual = card.locator('.project-visual');
  if (!isMobile) {
    const rect = await visual.boundingBox();
    await page.mouse.move(rect.x + rect.width*.8, rect.y + rect.height*.2);
    await expect.poll(() => visual.evaluate(el => getComputedStyle(el).transform)).toMatch(/matrix3d/);
    const before = await visual.evaluate(el => getComputedStyle(el).transform);
    await page.mouse.move(rect.x + rect.width*.2, rect.y + rect.height*.8);
    await expect.poll(() => visual.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
  }
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate(el => el.getAnimations().some(animation => animation.playState === 'running'))).toBe(true);
  await expect(dialog.getByRole('button', {name: 'Close project', exact: true})).toBeFocused();
  await page.waitForTimeout(550);
  await page.screenshot({path: testInfo.outputPath('motion-detail.jpg'), type: 'jpeg', quality: 80});
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await page.getByRole('button', {name: 'Pause motion', exact: true}).click();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  expect(await page.getByRole('dialog').evaluate(el => el.getAnimations().length)).toBe(0);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
