import fs from 'fs';
import path from 'path';
import { coreEnv, kayakEnv, logger } from '@kayak/core';
import cypress from 'cypress';
import { generateCypressConfig, generateCypressSupport } from '~/codegen';
import { cypressEnv } from '~/env';

export const testAction = async (): Promise<void> => {
  coreEnv.remoteDebuggingPort = 9222;
  cypressEnv.cypressTmpDir = path.resolve(__dirname, '..', '.tmp');
  if (!fs.existsSync(cypressEnv.cypressTmpDir)) {
    fs.mkdirSync(cypressEnv.cypressTmpDir, { recursive: true });
  }

  /* Create Cypress support file */
  logger.debug('Creating Cypress support file');
  // const setupFilePath = setupFile ? path.resolve(setupFile) : null;
  const supportFileCode = generateCypressSupport(null, kayakEnv.slowMo);
  fs.writeFileSync(cypressEnv.cypressSupportFile, supportFileCode);
  logger.debug(`Cypress support file://${cypressEnv.cypressSupportFile}`);

  /* Create Cypress config */
  logger.debug('Creating Cypress config');
  const cypressConfig = generateCypressConfig(coreEnv.kayakConfigFile);
  fs.writeFileSync(cypressEnv.cypressConfigFile, cypressConfig);
  logger.debug(`Cypress config file://${cypressEnv.cypressConfigFile}`);

  const result = await cypress.run({
    browser: 'chromium',
    headed: true,
    quiet: true,
    configFile: cypressEnv.cypressConfigFile
  });

  if (!coreEnv.keepTemporaryFiles) {
    logger.debug('Removing temporary files');
    fs.rmSync(cypressEnv.cypressTmpDir, { recursive: true });
  } else {
    logger.debug('Skipping temporary files removal');
  }

  if (result.status === 'failed') {
    throw new Error(result.message);
  }

  if (result.totalFailed > 0) {
    const message = result.runs.map((run) => {
      return run.tests
        .map((test) => test.displayError)
        .filter(Boolean);
    });

    throw new Error(message.flat().join('\n\n'));
  }
};
