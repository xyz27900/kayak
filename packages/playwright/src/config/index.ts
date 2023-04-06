import path from 'path';
import { coreEnv, KayakConfig, ParseConfigResult } from '@kayak/core';
import { PlaywrightTestConfig } from '@playwright/test';
import { KayakPlaywrightConfig } from '~/types';

const RETRIES_DEFAULT = 0;
const TESTS_FOLDER_DEFAULT = 'playwright/tests';
const TESTS_MATCH_DEFAULT = ['**/*.{spec,test}.{js,ts}'];
const VIDEOS_FOLDER_DEFAULT = 'playwright/videos';
const VIEWPORT_WIDTH_DEFAULT = 1280;
const VIEWPORT_HEIGHT_DEFAULT = 720;

export const parseConfig = (fullConfig?: KayakPlaywrightConfig): ParseConfigResult<PlaywrightTestConfig> => {
  const kayakConfig: Required<KayakConfig> = {
    slowMo: fullConfig?.slowMo ?? 0,
    testsDir: path.resolve(coreEnv.projectDir, fullConfig?.testsDir ?? TESTS_FOLDER_DEFAULT),
    testMatch: fullConfig?.testMatch ?? TESTS_MATCH_DEFAULT,
    videosDir: path.resolve(coreEnv.projectDir, fullConfig?.videosDir ?? VIDEOS_FOLDER_DEFAULT),
    retries: fullConfig?.retries ?? RETRIES_DEFAULT,
    viewport: fullConfig?.viewport ?? {
      width: VIEWPORT_WIDTH_DEFAULT,
      height: VIEWPORT_HEIGHT_DEFAULT
    }
  };

  const playwrightConfig: Partial<PlaywrightTestConfig> = {
    workers: 1,
    fullyParallel: false,
    expect: fullConfig?.expect,
    timeout: fullConfig?.timeout,
    maxFailures: fullConfig?.maxFailures,
    forbidOnly: fullConfig?.forbidOnly
  };

  const runnerConfig = (): PlaywrightTestConfig => ({
    ...playwrightConfig,
    quiet: false,
    retries: kayakConfig.retries,
    testDir: kayakConfig.testsDir,
    testMatch: kayakConfig.testMatch,
    reporter: 'list',
    use: {
      headless: false,
      channel: 'chromium',
      browserName: 'chromium',
      viewport: kayakConfig.viewport
    }
  });

  return {
    kayakConfig,
    runnerConfig
  };
};

export const defineConfig = (config?: KayakPlaywrightConfig): KayakPlaywrightConfig => config ?? {};
