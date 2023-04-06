import path from 'path';
import { coreEnv, KayakConfig, ParseConfigResult } from '@kayak/core';
import { defineConfig as defineCypressConfig } from 'cypress';
import { cypressEnv } from '~/env';
import { KayakCypressConfig } from '~/types';
import { configureMetaMask } from '~/utils';

const RETRIES_DEFAULT = 0;
const TESTS_FOLDER_DEFAULT = 'cypress/tests';
const TESTS_MATCH_DEFAULT = ['**/*.{spec,test,cy}.{js,ts}'];
const VIDEOS_FOLDER_DEFAULT = 'cypress/videos';
const VIEWPORT_WIDTH_DEFAULT = 1280;
const VIEWPORT_HEIGHT_DEFAULT = 720;

export const parseConfig = (fullConfig?: KayakCypressConfig): ParseConfigResult<Cypress.ConfigOptions> => {
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

  const cypressConfig: Partial<Cypress.ConfigOptions> = {
    defaultCommandTimeout: fullConfig?.defaultCommandTimeout,
    execTimeout: fullConfig?.execTimeout,
    taskTimeout: fullConfig?.taskTimeout,
    pageLoadTimeout: fullConfig?.pageLoadTimeout,
    requestTimeout: fullConfig?.requestTimeout,
    responseTimeout: fullConfig?.responseTimeout,

    downloadsFolder: fullConfig?.downloadsFolder,
    fixturesFolder: fullConfig?.fixturesFolder,

    screenshotOnRunFailure: false,
    video: false,

    animationDistanceThreshold: fullConfig?.animationDistanceThreshold,
    waitForAnimations: fullConfig?.waitForAnimations,
    scrollBehavior: fullConfig?.scrollBehavior
  };

  const runnerConfig = (): Cypress.ConfigOptions => defineCypressConfig({
    ...cypressConfig,
    retries: {
      runMode: kayakConfig.retries,
      openMode: kayakConfig.retries
    },
    viewportWidth: kayakConfig.viewport.width,
    viewportHeight: kayakConfig.viewport.height,
    reporter: 'list',
    e2e: {
      specPattern: kayakConfig.testMatch.map((pattern) => path.join(kayakConfig.testsDir, pattern)),
      supportFile: cypressEnv.cypressSupportFile,
      setupNodeEvents(on, config) {
        configureMetaMask(on);
        return config;
      }
    }
  });

  return {
    kayakConfig,
    runnerConfig
  };
};

export const defineConfig = (config?: KayakCypressConfig): KayakCypressConfig => config ?? {};
