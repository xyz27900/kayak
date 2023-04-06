import { defineConfig } from '@kayak/cypress';

export default defineConfig({
  browser: 'chromium',
  testsDir: 'cypress/tests',
  videosDir: 'cypress/videos'
});
