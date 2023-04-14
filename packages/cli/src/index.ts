#!/usr/bin/env node
import process from 'process';
import { coreEnv, logger } from '@kayak/core';
import { program } from 'commander';
import dotenv from 'dotenv';
import { initAction } from '~/actions/init.action';
import { testAction } from '~/actions/test.action';

const packageJson = require('../package.json');
dotenv.config({ path: '.env.kayak' });

program.configureOutput({
  writeErr: (str) => logger.error(str),
  outputError: (str, write) => write(str)
});

program
  .name('kayak')
  .description('Web3 e2e test runner')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize a new project')
  .option('-cy, --cypress', 'Configure for Cypress')
  .option('-pw, --playwright', 'Configure for Playwright')
  .option('-js, --javascript', 'Configure for JavaScript')
  .option('-ts, --typescript', 'Configure for TypeScript')
  .action(initAction);

program
  .command('test')
  .description('Run tests')
  .option('--cypress', 'Run tests using Cypress')
  .option('--playwright', 'Run tests using Playwright')
  .action(testAction);

program.parseAsync(process.argv)
  .catch((error) => {
    if (!coreEnv.docker) {
      logger.error(error.message);
    }

    process.exit(1);
  });
