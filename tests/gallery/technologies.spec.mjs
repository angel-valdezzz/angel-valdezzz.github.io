import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const names = ["Python","Java","JavaScript","TypeScript","SQL","Robot Framework","Selenium","Playwright","Cypress","Postman","Git","GitHub","GitHub Actions","Docker","Jira","Xray","Confluence"];
const section = page => page.locator('#technologies');
const visiblePanel = page => section(page).locator('.technology-panel:not([hidden])');
async function capture(locator,testInfo,name) {
  await locator.screenshot({path:testInfo.outputPath(name+'.jpg'),type:'jpeg',quality:82});
}
test('all approved tools disclose their scope and link only existing related projects', async ({page},testInfo) => {
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.locator('.main-nav a[href="#technologies"]').click();
  const tech=section(page);
  await expect(tech.locator('.technology-name')).toHaveText(names);
  await expect(tech.locator('.technology-button[aria-expanded=true]')).toHaveCount(0);
  await expect(visiblePanel(page)).toHaveCount(0);
  await expect(tech).not.toContainText(/PostgreSQL|RequestsLibrary|Poetry|PyPI|MkDocs|Allure/);
  for(const img of await tech.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  }
  await capture(tech,testInfo,'technologies-overview');
  for(const name of names) {
    const trigger=tech.getByRole('button',{name,exact:true});
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded','true');
    await expect(tech.locator('.technology-button[aria-expanded=true]')).toHaveCount(1);
    const panel=visiblePanel(page);
    await expect(panel).toHaveCount(1);
    await expect(panel.getByRole('heading',{level:4})).toHaveText(name);
    const controlled=await trigger.getAttribute('aria-controls');
    await expect(panel).toHaveAttribute('id',controlled);
    await expect(panel.locator('.technology-description')).not.toBeEmpty();
    if(name==='Python') {
      await expect(panel.getByRole('link')).toHaveCount(3);
      await expect(panel.getByRole('link',{name:/Paylo/})).toHaveAttribute('href','https://github.com/angel-valdezzz/robotframework-paylo');
      await capture(tech.locator('[data-group=languages]'),testInfo,'technologies-python');
    }
    await expect(panel.locator('.technology-note')).toHaveCount(0);
    await expect(panel).not.toContainText(/Planned practice|Next practice|once available/);
    if(['Java','JavaScript','TypeScript','SQL','Playwright','Cypress','Postman','Git','Docker','Jira','Xray','Confluence'].includes(name)) {
      await expect(panel.locator('.technology-projects')).toHaveCount(0);
      await expect(panel.getByRole('link')).toHaveCount(0);
    }
    if(name==='SQL') {
      await expect(panel.locator('.technology-description')).toContainText('Basic knowledge from my degree');
      await expect(panel.locator('.technology-description')).toContainText('not used it regularly');
      await expect(panel.getByRole('link')).toHaveCount(0);
    }
    if(name==='Docker') await expect(panel.locator('.technology-description')).toContainText('Basic use');
    if(name==='Xray') {
      await expect(panel.locator('.technology-description')).toHaveText('I create and execute test cases with Xray integrated into Jira.');
      await capture(tech.locator('[data-group=collaboration]'),testInfo,'technologies-xray');
    }
  }
  await tech.getByRole('button',{name:'Close technology details',exact:true}).click();
  await expect(visiblePanel(page)).toHaveCount(0);
  await expect(tech.getByRole('button',{name:'Confluence',exact:true})).toBeFocused();
  expect(errors).toEqual([]);
});
test('technology details support keyboard, translated state, accessibility, narrow screens and offline opening', async ({page,context},testInfo) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await page.locator('.main-nav a[href="#technologies"]').click();
  const tech=section(page);
  const python=tech.getByRole('button',{name:'Python',exact:true});
  await python.focus();
  await python.press('Enter');
  await expect(visiblePanel(page).getByRole('heading',{level:4})).toHaveText('Python');
  await python.press('Space');
  await expect(visiblePanel(page)).toHaveCount(0);
  const xray=tech.getByRole('button',{name:'Xray',exact:true});
  await xray.click();
  await page.getByRole('button',{name:'Español',exact:true}).click();
  await expect(xray).toHaveAttribute('aria-expanded','true');
  await expect(visiblePanel(page).locator('.technology-description')).toHaveText('Creo y ejecuto casos de prueba con Xray integrado en Jira.');
  await expect(visiblePanel(page).getByRole('heading',{level:5}).first()).toHaveText('Qué aplico');
  const audit=await new AxeBuilder({page}).include('#technologies').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(audit.violations).toEqual([]);
  const close=tech.getByRole('button',{name:'Cerrar detalle de tecnología',exact:true});
  await close.focus();
  await close.press('Escape');
  await expect(visiblePanel(page)).toHaveCount(0);
  await expect(xray).toBeFocused();
  for(const name of ['JavaScript','TypeScript','Playwright']) {
    await tech.getByRole('button',{name,exact:true}).click();
    await expect(visiblePanel(page).locator('.technology-projects')).toHaveCount(0);
    await expect(visiblePanel(page)).not.toContainText(/próxim|previst|disponibles/i);
  }
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();
  await python.click();
  await expect(visiblePanel(page).getByRole('heading',{level:4})).toHaveText('Python');
  await expect(page.locator('html')).toHaveAttribute('data-motion','off');
  await page.setViewportSize({width:320,height:800});
  await tech.getByRole('button',{name:'TypeScript',exact:true}).click();
  await expect(visiblePanel(page).locator('.technology-projects')).toHaveCount(0);
  await expect(visiblePanel(page)).not.toContainText(/Planned practice|Next practice|once available/);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await capture(tech.locator('[data-group=languages]'),testInfo,'technologies-320');
  await context.setOffline(true);
  await page.goto(pathToFileURL(path.resolve('dist/client/angel-gallery-demo.html')).href);
  await page.locator('.main-nav a[href="#technologies"]').click();
  await tech.getByRole('button',{name:'Xray',exact:true}).click();
  await expect(visiblePanel(page).locator('.technology-description')).toContainText('integrated into Jira');
  const logo=tech.getByRole('button',{name:'Xray',exact:true}).locator('img');
  await expect(logo).toHaveAttribute('src',/^data:image\/png;base64,/);
  await expect.poll(()=>logo.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  await page.getByRole('button',{name:'Español',exact:true}).click();
  await expect(visiblePanel(page).locator('.technology-description')).toContainText('integrado en Jira');
  await tech.getByRole('button',{name:'SQL',exact:true}).click();
  await expect(visiblePanel(page).locator('.technology-description')).toContainText('Conocimientos básicos adquiridos durante la carrera');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
