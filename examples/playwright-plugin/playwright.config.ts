import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'playwright/tests',
  fullyParallel: false,
  use: {
    headless: false,
    channel: 'chrome',
    browserName: 'chromium',
    viewport: null
  }
};

export default config;
