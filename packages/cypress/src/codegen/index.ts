import path from 'path';
import { transpileCode } from '@kayak/core';

export const generateCypressConfig = (kayakConfigPath: string): string => {
  const sourceCode = [
    `import kayakConfig from "${kayakConfigPath}"`,
    'import { parseConfig } from "../config"',
    'const { runnerConfig } = parseConfig(kayakConfig)',
    'export default runnerConfig()'
  ].join('\n');

  return transpileCode(sourceCode, {
    dirname: {
      dirname: path.dirname(kayakConfigPath),
      filename: kayakConfigPath
    }
  });
};

export const generateCypressSupport = (setupFilePath: string | null, slowMo: number): string => {
  const pluginsCode = [
    'const runCommand = cy.queue.runCommand.bind(cy.queue);',
    `cy.queue.runCommand = (cmd) => Cypress.Promise.delay(cy.queue.length > 1 ? ${slowMo} : 0).then(() => runCommand(cmd))`
  ];

  const sourceCode = [
    'import "../commands"',
    setupFilePath ? 'import "${setupFilePath}"' : '',
    ...pluginsCode
  ].join('\n');

  return transpileCode(sourceCode, {
    dirname: {
      dirname: path.dirname(setupFilePath ?? ''),
      filename: setupFilePath ?? ''
    }
  });
};
