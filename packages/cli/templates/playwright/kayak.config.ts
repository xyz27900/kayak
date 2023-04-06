import { defineConfig } from '@kayak/playwright';

export default defineConfig({
  browser: 'chromium',
  testsDir: 'cypress/tests',
  videosDir: 'cypress/videos'
});
