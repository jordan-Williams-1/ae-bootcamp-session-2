const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  fullyParallel: false,
  retries: 1,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    browserName: 'chromium',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: [
    {
      command: 'npm run start:backend',
      port: 3030,
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
    {
      command: 'npm run start:frontend',
      port: 3000,
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
  ],
});
