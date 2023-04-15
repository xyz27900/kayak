import { defineConfig } from '@kayak/playwright';

export default defineConfig({
  testsDir: 'playwright/tests',
  videosDir: 'playwright/videos',
  slowMo: 200,
  timeout: 60000
});
