import {defineConfig, devices} from '@playwright/test';
export default defineConfig({
  testDir: './tests/gallery',
  timeout: 45000,
  expect: {timeout: 8000},
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [['list'], ['html', {open: 'never', outputFolder: 'gallery-test-report'}]],
  use: {baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure', screenshot: 'only-on-failure'},
  projects: [
    {name: 'desktop', use: {...devices['Desktop Chrome'], viewport: {width: 1440, height: 1000}}},
    {name: 'mobile', use: {...devices['iPhone 13'], defaultBrowserType: 'chromium'}}
  ],
  webServer: {command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI}
});
