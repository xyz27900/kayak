#!/usr/bin/env node
import { buildCli } from '@kayak/core';
import { parseAction } from '~/actions/parse.action';
import { testAction } from '~/actions/test.action';

const packageJson = require('../../package.json');

buildCli({
  name: 'kayak-playwright',
  description: 'Kayak Playwright integration',
  version: packageJson.version,
  actions: {
    parseAction,
    testAction
  }
});

// program.configureOutput({
//   writeErr: (str) => logger.error(str),
//   outputError: (str, write) => write(str)
// });
//
// program
//   .name('kayak-playwright')
//   .description('Web3 e2e test runner')
//   .version(packageJson.version);
//
// program
//   .command('parse')
//   .description('Parse transpiled Kayak config file and save values to JSON file')
//   .option('--config-file <configFile>', 'Path to transpiled Kayak config file')
//   .option('--output-file <outputFile>', 'Path to output JSON file')
//   .action(parseAction);
//
// program
//   .command('test')
//   .description('Run Playwright tests')
//   .action(testAction);
//
// program.parseAsync(process.argv).catch((error) => {
//   logger.error(error.message);
//   process.exit(1);
// });

// /* Check Node.js version */
// const [major] = getNodeVersion();
// if (major < 16) {
//   throw new Error('Node major version must be at least 16');
// }
//
// /* Process input */
// const [, , configFile] = process.argv;
// playwrightEnv.tmpDir = path.join(__dirname, '..', '.tmp');
// logger.debug(`Kayak config file://${configFile}`);
//
// if (!fs.existsSync(playwrightEnv.tmpDir)) {
//   fs.mkdirSync(playwrightEnv.tmpDir, { recursive: true });
// }
//
// /* Transpile config file */
// logger.debug('Transpiling Kayak config');
// const transpiledKayakConfig = transpileFile(configFile, {
//   typescript: configFile.endsWith('.ts'),
//   dirname: true
// });
// fs.writeFileSync(playwrightEnv.kayakConfigFile, transpiledKayakConfig);
//
// const kayakConfigExport = require(playwrightEnv.kayakConfigFile);
// const { default: config } = kayakConfigExport;
// if (!config) {
//   throw new Error('Unable to load Kayak config');
// }
//
// /* Load config to env */
// const { kayakConfig } = parseConfig(config);
// Object.entries(kayakConfig).forEach((entry) => {
//   const [key, value] = entry;
//   // @ts-ignore
//   playwrightEnv[key] = value;
// });
//
// /* Create Playwright config */
// logger.debug('Creating Playwright config');
// const playwrightConfig = generatePlaywrightConfig(playwrightEnv.kayakConfigFile);
// fs.writeFileSync(playwrightEnv.playwrightConfigFile, playwrightConfig);
//
// /* Run Playwright */
// const spawned = spawn('npx', ['playwright', 'test', '--config', playwrightEnv.playwrightConfigFile])
//   .on('exit', (code) => {
//     if (!playwrightEnv.keepTemporaryFiles) {
//       logger.debug('Removing temporary files');
//       fs.unlinkSync(playwrightEnv.kayakConfigFile);
//       fs.unlinkSync(playwrightEnv.playwrightConfigFile);
//     } else {
//       logger.debug('Skipping temporary files removal');
//     }
//
//     process.exit(code ?? 0);
//   })
//   .on('error', (error) => {
//     process.stderr.write(error.message + '\n');
//   });
//
// spawned.stdout.pipe(process.stdout);
// spawned.stderr.pipe(process.stderr);
