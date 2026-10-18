import {test, expect} from '@playwright/test';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

async function expectCurrent(page, id) {
  await expect(page.locator('.main-nav a[aria-current="location"]')).toHaveCount(1);
  await expect(page.locator('.main-nav a[aria-current="location"]')).toHaveAttribute('href', '#' + id);
}
async function scrollToSection(page,id) {
  await page.evaluate(id => {
    const top = document.getElementById(id).getBoundingClientRect().top + scrollY;
    scrollTo({top:top-innerHeight*.66+24,behavior:'instant'});
  },id);
}
async function capture(page, testInfo, name) {
  await page.screenshot({path: testInfo.outputPath(name + '.jpg'), type:'jpeg', quality:80});
}

test('text navigation follows projects, technologies and the combined personal closing without a contact jump', async ({page}, testInfo) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.main-nav a')).toHaveCount(3);
  expect(await page.locator('.main-nav a').evaluateAll(links=>links.map(link=>link.getAttribute('href')))).toEqual(['#projects','#technologies','#about']);
  await expectCurrent(page,'projects');
  await capture(page,testInfo,'navigation-top');
  await scrollToSection(page,'technologies');
  await expectCurrent(page,'technologies');
  await scrollToSection(page,'about');
  await expectCurrent(page,'about');
  await capture(page,testInfo,'navigation-about');
  await page.evaluate(() => scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
  await expectCurrent(page,'about');
  await expect(page.locator('#contact')).toBeVisible();
  await capture(page,testInfo,'navigation-contact');
  await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
  await expectCurrent(page,'projects');

  await page.locator('.main-nav a[href="#technologies"]').click();
  await expectCurrent(page,'technologies');
  await expect(page.locator('#technologies')).toBeFocused();
  await expect(page).toHaveURL(/#technologies$/);
  const about = page.locator('.main-nav a[href="#about"]');
  await about.focus();
  await about.press('Enter');
  await expect(page.locator('#about')).toBeFocused();
  await expectCurrent(page,'about');
  await page.getByRole('button',{name:'Español',exact:true}).click();
  await expect(page.locator('.main-nav a[href="#technologies"]')).toHaveText('Tecnologías');
  await expect(page.locator('.main-nav a[href="#about"]')).toHaveText('Sobre mí');
  await expectCurrent(page,'about');
  await expect(page.locator('.nav-indicator')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expectCurrent(page,'about');

  await page.goto('/#contact');
  await expectCurrent(page,'about');
  await page.mouse.wheel(0,-1000);
  await expect(page.locator('.main-nav a[href="#about"]')).not.toHaveAttribute('aria-current','location');
});

test('fine animated underline follows the selected link and works when paused', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await page.locator('.main-nav a[href="#technologies"]').click();
  await expectCurrent(page,'technologies');
  await expect(page.locator('.nav-indicator')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => {
    const link = document.querySelector('.main-nav a[aria-current]').getBoundingClientRect();
    const marker = document.querySelector('.nav-indicator').getBoundingClientRect();
    return Math.abs(marker.left-link.left)+Math.abs(marker.width-link.width);
  })).toBeLessThan(3);
  expect(await page.locator('.nav-indicator').evaluate(el=>el.getBoundingClientRect().height)).toBeLessThanOrEqual(2);
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();
  await page.locator('.main-nav a[href="#about"]').click();
  await expectCurrent(page,'about');
  await expect(page.locator('#about')).toBeFocused();
  await expect(page.locator('html')).toHaveAttribute('data-motion','off');
  await expect(page.locator('.site-header')).toHaveCSS('opacity','1');
  await expect.poll(() => page.evaluate(() => {
    const link = document.querySelector('.main-nav a[aria-current]').getBoundingClientRect();
    const marker = document.querySelector('.nav-indicator').getBoundingClientRect();
    return Math.abs(marker.left-link.left)+Math.abs(marker.width-link.width);
  })).toBeLessThan(3);
});

test('approved technologies have loaded icons, translated capabilities and offline support', async ({page,context},testInfo) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.locator('.main-nav a[href="#technologies"]').click();
  const section = page.locator('#technologies');
  await expect(section.getByRole('heading',{level:2})).toHaveText('Technologies & skills');
  await expect(section.locator('.technology-name')).toHaveText(["Python","Java","JavaScript","TypeScript","SQL","Robot Framework","Selenium","Playwright","Cypress","Postman","Git","GitHub","GitHub Actions","Docker","Jira","Xray","Confluence"]);
  await expect(section.locator('.capability-list li')).toHaveText(['Web test automation','API testing','Automation architecture','Data-driven testing','Testing tool development','CI test execution']);
  for(const img of await section.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  }
  await page.locator('.main-nav a[href="#technologies"]').click();
  await capture(page,testInfo,'navigation-technologies');
  await page.getByRole('button',{name:'Español',exact:true}).click();
  await expect(section.getByRole('heading',{level:2})).toHaveText('Tecnologías y habilidades');
  await expect(section.locator('.capability-list li')).toHaveText(['Automatización de pruebas web','Pruebas de APIs','Arquitectura de automatización','Pruebas basadas en datos','Desarrollo de herramientas para testing','Ejecución de pruebas en CI']);
  await page.setViewportSize({width:320,height:800});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await context.setOffline(true);
  await page.goto(pathToFileURL(path.resolve('dist/client/angel-gallery-demo.html')).href);
  await page.locator('.main-nav a[href="#technologies"]').click();
  await expectCurrent(page,'technologies');
  for(const img of await page.locator('#technologies img').all()) {
    await expect(img).toHaveAttribute('src',/^data:image\/(svg\+xml|png);base64,/);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  }
});
