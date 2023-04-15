import process from 'process';
import { coreEnv, getValueWithoutThrowing, kayakEnv, pickRandomDebuggingPort, prepareMetaMask, spawnAsync } from '@kayak/core';
import { metamask } from '@kayak/metamask';
import { chromium, test as testBase } from '@playwright/test';

export const test = testBase.extend({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use, testInfo) => {
    await spawnAsync('notify-send', ['-t', '1500', testInfo.title]);

    coreEnv.runtime = 'playwright';
    const debuggingPort = await pickRandomDebuggingPort();
    const slowMo = getValueWithoutThrowing(() => kayakEnv.slowMo, 0);
    const metamaskPath = await prepareMetaMask(coreEnv.metamaskVersion);

    const args = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      `--remote-debugging-port=${debuggingPort}`,
      '--start-maximized',
      '--window-position=0,0'
    ];

    const context = await chromium.launchPersistentContext('', {
      args,
      slowMo,
      headless: false,
      executablePath: coreEnv.docker ? '/usr/bin/chromium' : undefined
    });

    await context.waitForEvent('page');

    const aboutBlankPage = context.pages().find((page) => page.url().startsWith('about:blank'));
    if (aboutBlankPage) {
      await aboutBlankPage.close();
    }

    await metamask.initWizard({
      debuggingPort,
      slowMo
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await metamask.general.setup(process.env.SEED_PHRASE!, process.env.PASSWORD!);

    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context.waitForEvent('serviceworker');
    }

    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  }
});

export const expect = test.expect;
