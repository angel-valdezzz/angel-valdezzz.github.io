import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {projects} from '../../src/gallery/projects.js';

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
}
async function noOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}
test('nine equally accessible projects, local assets and no browser errors', async ({page}) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {if (message.type() === 'error') errors.push(message.text());});
  await page.goto('/');
  await expect(page.getByRole('heading', {level: 1})).toHaveText("Hi, I'm Angel.");
  await expect(page.locator('.project-card')).toHaveCount(9);
  await expect(page.locator('.project-grid button')).toHaveCount(9);
  for (const p of projects) await expect(page.getByRole('heading', {name: p.name.en, exact: true})).toBeVisible();
  for (const img of await page.locator('.project-visual img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await noOverflow(page);
  expect(errors).toEqual([]);
});
test('every project opens its own content and Escape restores focus and position', async ({page}) => {
  await page.goto('/');
  for (const p of projects) {
    const trigger = page.getByRole('button', {name: 'Explore ' + p.name.en, exact: true});
    await trigger.scrollIntoViewIfNeeded();
    await trigger.focus();
    const scroll = await page.evaluate(() => scrollY);
    await trigger.press('Enter');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', {level: 2})).toHaveText(p.name.en);
    await expect(dialog.locator('.detail-overview')).toHaveText(p.overview.en);
    await expect(dialog.getByRole('link')).toHaveCount(p.links.length);
    if (p.code) await expect(dialog.locator('pre')).toContainText(p.code.split('\n')[0]);
    const close = dialog.getByRole('button', {name: 'Close project'});
    await expect(close).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    expect(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(Math.abs((await page.evaluate(() => scrollY)) - scroll)).toBeLessThan(5);
  }
});
test('language updates all visible content, metadata and real CV downloads', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: 'Español', exact: true}).click();
  await expect(page).toHaveURL(/\/es\//);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Hola, soy Angel.');
  await expect(page.getByRole('heading', {name: 'Pruebas web', exact: true})).toBeVisible();
  const cv = page.getByRole('link', {name: 'Descargar CV', exact: true});
  await expect(cv).toHaveAttribute('href', '/cv/angel-es.pdf');
  const [download] = await Promise.all([page.waitForEvent('download'), cv.click()]);
  expect(download.suggestedFilename()).toBe('angel-es.pdf');
  expect(await download.failure()).toBeNull();
  await page.getByRole('button', {name: 'Explorar Paylo', exact: true}).click();
  await expect(page.getByRole('dialog').getByRole('link', {name: /Documentación/})).toHaveAttribute('href', 'https://angel-valdezzz.github.io/robotframework-paylo/es/');
  await page.keyboard.press('Escape');
  await page.goBack();
  await expect(page.getByRole('heading', {level: 1})).toHaveText("Hi, I'm Angel.");
  await page.goto('/es/');
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Hola, soy Angel.');
  await noOverflow(page);
});
test('motion pause persists; system reduced motion leaves every project visible', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: 'Pause motion', exact: true}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.reload();
  await expect(page.getByRole('button', {name: 'Enable motion', exact: true})).toHaveAttribute('aria-pressed', 'true');
  await page.emulateMedia({reducedMotion: 'reduce'});
  await expect(page.getByRole('button', {name: 'Motion reduced by your device setting'})).toBeDisabled();
  for (const card of await page.locator('.project-card').all()) {
    await expect(card).toHaveCSS('opacity', '1');
    await expect(card).toHaveCSS('transform', 'none');
  }
  await page.emulateMedia({reducedMotion: 'no-preference'});
  await expect(page.getByRole('button', {name: 'Enable motion', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Enable motion', exact: true}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
});
test('WCAG A/AA automated audit on gallery and open project', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/');
  await settle(page);
  const gallery = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(gallery.violations).toEqual([]);
  await page.getByRole('button', {name: 'Explore Web testing', exact: true}).click();
  const dialog = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(dialog.violations).toEqual([]);
});
test('review captures and narrow viewport layout', async ({page}, testInfo) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.goto('/');
  await settle(page);
  for (const img of await page.locator('.project-visual img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.evaluate(() => scrollTo(0,0));
  await page.screenshot({path: testInfo.outputPath('gallery-en.png'), fullPage: true});
  await page.screenshot({path: testInfo.outputPath('gallery-preview.jpg'), type: 'jpeg', quality: 72, fullPage: true});
  await page.getByRole('button', {name: 'Español', exact: true}).click();
  await page.screenshot({path: testInfo.outputPath('gallery-es.png'), fullPage: true});
  await page.getByRole('button', {name: 'Explorar TestScript', exact: true}).click();
  await page.screenshot({path: testInfo.outputPath('project-detail.png')});
  await noOverflow(page);
  await page.keyboard.press('Escape');
  await page.setViewportSize({width:320,height:800});
  await page.screenshot({path: testInfo.outputPath('gallery-320.png'), fullPage:true});
  await noOverflow(page);
});

test('downloadable demo embeds assets and works without application asset requests', async ({page}) => {
  const unexpected=[];
  page.on('request',request=>{
    const url=new URL(request.url());
    if(url.origin==='http://127.0.0.1:4173' && url.pathname!=='/angel-gallery-demo.html' && url.pathname!=='/favicon.ico') unexpected.push(url.pathname);
  });
  await page.goto('/angel-gallery-demo.html');
  await expect(page.getByRole('heading',{level:1})).toHaveText("Hi, I'm Angel.");
  await page.getByRole('button',{name:'Español',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Hola, soy Angel.');
  await expect(page).toHaveURL(/\/angel-gallery-demo\.html\?lang=es$/);
  await page.reload();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Hola, soy Angel.');
  await page.getByRole('button',{name:'Explorar Evidence Reporter',exact:true}).click();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src',/^data:image\/webp;base64,/);
  await expect.poll(()=>page.getByRole('dialog').locator('img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('link',{name:'Descargar CV',exact:true})).toHaveAttribute('href',/^data:application\/pdf;base64,/);
  expect(unexpected).toEqual([]);
});

test('standalone file opens offline, switches language and downloads the CV', async ({page, context}) => {
  await context.setOffline(true);
  await page.goto(pathToFileURL(path.resolve('dist/client/angel-gallery-demo.html')).href);
  await expect(page.getByRole('heading',{level:1})).toHaveText("Hi, I'm Angel.");
  await page.getByRole('button',{name:'Español',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Hola, soy Angel.');
  await page.getByRole('button',{name:'Explorar Request Reporter',exact:true}).click();
  await expect.poll(()=>page.getByRole('dialog').locator('img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.keyboard.press('Escape');
  const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Descargar CV',exact:true}).click()]);
  expect(download.suggestedFilename()).toBe('angel-es.pdf');
  expect(await download.failure()).toBeNull();
});


test('project focus returns after closing, with a card ring only for keyboard navigation', async ({page},testInfo) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.evaluate(()=>document.fonts.ready);
  const trigger=page.getByRole('button',{name:'Explore Web testing',exact:true});
  const card=page.locator('.project-card').first();
  const pointerClick=async locator=>testInfo.project.name==='mobile' ? locator.tap() : locator.click();
  await pointerClick(trigger);
  await expect(page.getByRole('dialog')).toBeVisible();
  await pointerClick(page.getByRole('button',{name:'Close project',exact:true}));
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(card).toHaveCSS('outline-style','none');
  await page.screenshot({path:testInfo.outputPath('focus-pointer.jpg'),type:'jpeg',quality:80});

  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(trigger).toBeFocused();
  await expect(card).toHaveCSS('outline-style','solid');
  await expect(card).toHaveCSS('outline-width','2px');
  await trigger.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(card).toHaveCSS('outline-style','solid');
  await page.screenshot({path:testInfo.outputPath('focus-keyboard.jpg'),type:'jpeg',quality:80});

  await pointerClick(trigger);
  await pointerClick(page.getByRole('button',{name:'Close project',exact:true}));
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(card).toHaveCSS('outline-style','none');
});
