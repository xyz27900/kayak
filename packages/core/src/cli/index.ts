import process from 'process';
import { program } from 'commander';
import { logger } from '~/logger';

interface ParseActionOptions {
  configFile: string;
  outputFile: string;
}

interface BuildCliOptions {
  name: string;
  description: string;
  version: string;
  actions: {
    parseAction: (options: ParseActionOptions) => Promise<void> | void;
    testAction: () => Promise<void> | void;
  };
}

export const buildCli = (options: BuildCliOptions): void => {
  program.configureOutput({
    writeErr: (str) => logger.error(str),
    outputError: (str, write) => write(str)
  });

  program
    .name(options.name)
    .description(options.description)
    .version(options.version);

  program
    .command('parse')
    .description('Parse transpiled Kayak config file and save values to JSON file')
    .option('--config-file <configFile>', 'Path to transpiled Kayak config file')
    .option('--output-file <outputFile>', 'Path to output JSON file')
    .action(options.actions.parseAction);

  program
    .command('test')
    .description('Run tests')
    .action(options.actions.testAction);

  program.parseAsync(process.argv).catch(() => {
    process.exit(1);
  });
};
