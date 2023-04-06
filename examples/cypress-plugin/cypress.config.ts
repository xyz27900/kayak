import { configureMetamask } from '@kayak/cypress';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      configureMetamask(on);
    }
  }
});
