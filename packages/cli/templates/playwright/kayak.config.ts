import { defineConfig } from '@kayak/playwright';

export default defineConfig({
  testsDir: 'playwright/tests',
  videosDir: 'playwright/videos',
  slowMo: 150,
  timeout: 200000
});
