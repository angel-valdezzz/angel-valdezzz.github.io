import {test, expect} from '@playwright/test';

async function expectCurrent(page, id) {
  await expect(page.locator('.main-nav a[aria-current="location"]')).toHaveCount(1);
  await expect(page.locator('.main-nav a[aria-current="location"]')).toHaveAttribute('href', '#' + id);
}
async function capture(page, testInfo, name) {
  await page.screenshot({path: testInfo.outputPath(name + '.jpg'), type:'jpeg', quality:80});
}

test('navigation follows manual scroll and keeps clicked destinations clear, including footer sections and Spanish', async ({page}, testInfo) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expectCurrent(page,'projects');
  await capture(page,testInfo,'navigation-top');
  await page.evaluate(() => {
    const top = document.getElementById('about').getBoundingClientRect().top + scrollY;
    scrollTo({top:top-innerHeight*.66+24,behavior:'instant'});
  });
  await expectCurrent(page,'about');
  await expect(page.locator('#about')).toHaveAttribute('data-active','true');
  await capture(page,testInfo,'navigation-about');
  await page.evaluate(() => scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
  await expectCurrent(page,'contact');
  await expect(page.locator('#contact')).toHaveAttribute('data-active','true');
  await capture(page,testInfo,'navigation-contact');
  await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
  await expectCurrent(page,'projects');

  await page.locator('.main-nav a[href="#about"]').click();
  await expectCurrent(page,'about');
  await expect(page.locator('#about')).toBeFocused();
  await expect(page).toHaveURL(/#about$/);
  await page.locator('.main-nav a[href="#contact"]').click();
  await expectCurrent(page,'contact');
  await expect(page.locator('#contact')).toBeFocused();
  await page.mouse.wheel(0,-700);
  await expect(page.locator('.main-nav a[href="#contact"]')).not.toHaveAttribute('aria-current','location');

  const about = page.locator('.main-nav a[href="#about"]');
  await about.focus();
  await about.press('Enter');
  await expect(page.locator('#about')).toBeFocused();
  await page.getByRole('button',{name:'Español',exact:true}).click();
  await expect(page.locator('.main-nav a[href="#about"]')).toHaveText('Sobre mí');
  await expectCurrent(page,'about');
  await expect(page.locator('.nav-indicator')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expectCurrent(page,'about');
});

test('animated section indicator settles under the selected link and stays usable when paused', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await page.locator('.main-nav a[href="#contact"]').click();
  await expectCurrent(page,'contact');
  await expect(page.locator('.nav-indicator')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => {
    const link = document.querySelector('.main-nav a[aria-current]').getBoundingClientRect();
    const marker = document.querySelector('.nav-indicator').getBoundingClientRect();
    return Math.abs(marker.left-link.left)+Math.abs(marker.width-link.width);
  })).toBeLessThan(3);
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();
  await page.locator('.main-nav a[href="#projects"]').click();
  await expectCurrent(page,'projects');
  await expect(page.locator('#projects')).toBeFocused();
  await expect(page.locator('html')).toHaveAttribute('data-motion','off');
  await expect(page.locator('.site-header')).toHaveCSS('opacity','1');
  await expect.poll(() => page.evaluate(() => {
    const link = document.querySelector('.main-nav a[aria-current]').getBoundingClientRect();
    const marker = document.querySelector('.nav-indicator').getBoundingClientRect();
    return Math.abs(marker.left-link.left)+Math.abs(marker.width-link.width);
  })).toBeLessThan(3);
});
