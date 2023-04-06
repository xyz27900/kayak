import fs from 'fs';
import { parseConfig } from '~/config';

interface ParseActionOptions {
  configFile: string;
  outputFile: string;
}

export const parseAction = async (options: ParseActionOptions): Promise<void> => {
  /* Load transpiled config */
  const kayakConfigExport = require(options.configFile);
  const { default: config } = kayakConfigExport;
  if (!config) {
    throw new Error('Unable to load Kayak config');
  }

  /* Save config to JSON */
  const { kayakConfig } = parseConfig(config);
  const configJson = JSON.stringify(kayakConfig, null, 2);
  fs.writeFileSync(options.outputFile, configJson);
};
