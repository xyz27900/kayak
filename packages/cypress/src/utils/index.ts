import { coreEnv, prepareMetaMask } from '@kayak/core';
import { accountTasks, connectionTasks, generalTasks, networkTasks, signatureTasks, transactionTasks } from '~/tasks';

export const configureMetaMask = (on: Cypress.PluginEvents): void => {
  on('before:browser:launch', async (browser, options) => {
    coreEnv.runtime = 'cypress';
    const pathToMetaMaskExtension = await prepareMetaMask(coreEnv.metamaskVersion);
    options.extensions.push(pathToMetaMaskExtension);

    if (coreEnv.docker) {
      options.args.splice(options.args.indexOf('--enable-automation'), 1);
    }

    return options;
  });

  on('task', {
    ...generalTasks,
    ...connectionTasks,
    ...transactionTasks,
    ...signatureTasks,
    ...networkTasks,
    ...accountTasks
  });
};
