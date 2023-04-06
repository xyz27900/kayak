import fs from 'fs';
import path from 'path';
import { coreEnv, logger, spawnAsync } from '@kayak/core';
import { generatePlaywrightConfig } from '~/codegen';
import { playwrightEnv } from '~/env';

export const testAction = async (): Promise<void> => {
  playwrightEnv.playwrightTmpDir = path.resolve(__dirname, '..', '.tmp');
  if (!fs.existsSync(playwrightEnv.playwrightTmpDir)) {
    fs.mkdirSync(playwrightEnv.playwrightTmpDir, { recursive: true });
  }

  /* Create Playwright config */
  logger.debug('Creating Playwright config');
  const playwrightConfig = generatePlaywrightConfig(coreEnv.kayakConfigFile);
  fs.writeFileSync(playwrightEnv.playwrightConfigFile, playwrightConfig);
  logger.debug(`Playwright config file://${playwrightEnv.playwrightConfigFile}`);

  try {
    await spawnAsync('npx', ['playwright', 'test', '--config', playwrightEnv.playwrightConfigFile]);
  } finally {
    if (!coreEnv.keepTemporaryFiles) {
      logger.debug('Removing temporary files');
      fs.rmSync(playwrightEnv.playwrightTmpDir, { recursive: true });
    } else {
      logger.debug('Skipping temporary files removal');
    }
  }
};
