import fs from 'fs';
import path from 'path';
import process from 'process';
import { coreEnv, getNodeVersion, KayakConfig, kayakEnv, logger, spawnAsync, transpileFile } from '@kayak/core';
import yaml from 'yaml';
import { findConfig } from '~/utils';

const cwd = process.cwd();

interface TestActionOptions {
  cypress?: boolean;
  playwright?: boolean;
}

export const testAction = async (options: TestActionOptions): Promise<void> => {
  /* Check Node.js version */
  const [major] = getNodeVersion();
  if (major < 16) {
    throw new Error('Node major version must be at least 16');
  }

  /* Validate options */
  if (!options.cypress && !options.playwright) {
    throw new Error('Option --cypress or --playwright must be specified');
  }

  if (options.cypress && options.playwright) {
    throw new Error('Options --cypress and --playwright cannot be used together');
  }

  /* Validate environment variables */
  if (!process.env.SEED_PHRASE) {
    throw new Error('Missing SEED_PHRASE environment variable');
  }

  if (process.env.SEED_PHRASE.split(' ').length !== 12) {
    throw new Error('SEED_PHRASE must contain 12 words');
  }

  if (!process.env.PASSWORD) {
    throw new Error('Missing PASSWORD environment variable');
  }

  if (process.env.PASSWORD.length < 8) {
    throw new Error('PASSWORD must be at least 8 characters');
  }

  if (process.env.NODE_ENV === 'test') {
    logger.info('NODE_ENV=test, skipping test action');
    return;
  }

  /* Find Kayak configuration file */
  const configFile = findConfig(cwd);

  if (!configFile) {
    throw new Error('Config file not found');
  }

  coreEnv.projectDir = path.dirname(configFile);
  coreEnv.tmpDir = path.join(path.dirname(configFile), '.tmp');
  logger.debug(`Kayak config file://${configFile}`);

  if (!fs.existsSync(coreEnv.tmpDir)) {
    fs.mkdirSync(coreEnv.tmpDir, { recursive: true });
  }

  /* Transpile Kayak config file */
  logger.debug('Transpiling Kayak config');
  const transpiledKayakConfig = transpileFile(configFile, {
    typescript: configFile.endsWith('.ts'),
    dirname: true
  });
  fs.writeFileSync(coreEnv.kayakConfigFile, transpiledKayakConfig);

  /* Parse Kayak config file using vendor-specific parser */
  const command = options.cypress ? 'kayak-cypress' : 'kayak-playwright';
  await spawnAsync(command, [
    'parse',
    '--config-file', coreEnv.kayakConfigFile,
    '--output-file', coreEnv.kayakParamsFile
  ]);

  const params = require(coreEnv.kayakParamsFile) as Required<KayakConfig>;

  /* Load Kayak configuration to environment */
  if (options.cypress) {
    coreEnv.runtime = 'cypress';
  } else if (options.playwright) {
    coreEnv.runtime = 'playwright';
  }

  Object.entries(params).forEach((entry) => {
    const [key, value] = entry;
    // @ts-ignore
    kayakEnv[key] = value;
  });

  if (!coreEnv.docker) {
    const dockerComposeDir = path.resolve(coreEnv.projectDir, '.kayak');
    const dockerComposeFile = path.join(dockerComposeDir, 'docker-compose.yaml');
    const dockerComposeContent = fs.readFileSync(dockerComposeFile, { encoding: 'utf-8' });
    const dockerComposeYaml = yaml.parse(dockerComposeContent);

    const dockerComposeCommonArgs = [
      '--file', path.resolve(coreEnv.projectDir, '.kayak', 'docker-compose.yaml')
    ];

    const dockerComposeRemoveArgs = [
      ...dockerComposeCommonArgs,
      'rm', '--stop', '--force'
    ];

    logger.debug('Removing containers');
    logger.debug(`docker-compose ${dockerComposeRemoveArgs.join(' ')}`);
    await spawnAsync('docker-compose', dockerComposeRemoveArgs, { showOutput: false });

    const debugServices = ['display', 'ffmpeg', 'anvil'];
    const services = Object.keys(dockerComposeYaml.services).filter((service) => {
      return coreEnv.debug
        ? true
        : !debugServices.includes(service);
    });

    const dockerComposeUpArgs = [
      ...dockerComposeCommonArgs,
      'up', '--build',
      '--abort-on-container-exit',
      '--force-recreate'
    ];

    if (!coreEnv.debug) {
      const attachArgs = services.map((service) => ['--attach', service]);
      dockerComposeUpArgs.push(...attachArgs.flat());
      dockerComposeUpArgs.push('--no-log-prefix');
    }

    logger.debug('Running Docker containers');
    logger.debug(`docker-compose ${dockerComposeUpArgs.join(' ')}`);
    await spawnAsync('docker-compose', dockerComposeUpArgs);
  } else {
    if (options.cypress) {
      logger.info('Running tests using Cypress');
      await spawnAsync('kayak-cypress', ['test']);
    } else if (options.playwright) {
      logger.info('Running tests using Playwright');
      await spawnAsync('kayak-playwright', ['test']);
    }
  }
};
