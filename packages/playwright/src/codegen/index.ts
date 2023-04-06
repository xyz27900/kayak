import path from 'path';
import { transpileCode } from '@kayak/core';

export const generatePlaywrightConfig = (kayakConfigPath: string): string => {
  const sourceCode = [
    `import config from "${kayakConfigPath}";`,
    'import { parseConfig } from "../config";',
    'const { runnerConfig } = parseConfig(config);',
    'export default runnerConfig();'
  ].join('\n');

  return transpileCode(sourceCode, {
    dirname: {
      dirname: path.dirname(kayakConfigPath),
      filename: kayakConfigPath
    }
  });
};
