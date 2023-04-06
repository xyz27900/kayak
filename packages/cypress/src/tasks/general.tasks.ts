import process from 'process';
import { coreEnv, getValueWithoutThrowing, kayakEnv } from '@kayak/core';
import { metamask } from '@kayak/metamask';

let isMetaMaskConfigured = false;

export const generalTasks = {
  metamaskSetup: async () => {
    if (isMetaMaskConfigured) {
      return true;
    }

    const debuggingPort = coreEnv.remoteDebuggingPort;
    const slowMo = getValueWithoutThrowing(() => kayakEnv.slowMo, 0);

    await metamask.initWizard({
      debuggingPort,
      slowMo
    });

    isMetaMaskConfigured = true;

    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await metamask.general.setup(process.env.SEED_PHRASE!, process.env.PASSWORD!);
      return true;
    } catch (error) {
      return false;
    }
  },
  metamaskDisconnect: async (url: string) => {
    try {
      await metamask.general.disconnect(url);
      return true;
    } catch (e) {
      return false;
    }
  }
} as const;
