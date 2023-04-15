import { defineConfig } from '@kayak/playwright';

export default defineConfig({
  testsDir: 'playwright/tests',
  videosDir: 'playwright/videos',
  slowMo: 1000,
  timeout: 200000
});
