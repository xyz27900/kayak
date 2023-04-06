import { KayakConfig } from '@kayak/core';
import { PlaywrightTestConfig } from '@playwright/test';

const supportedPlaywrightOptions = [
  'expect',
  'forbidOnly',
  'maxFailures',
  'timeout'
] as const;

export type KayakPlaywrightConfig = KayakConfig & Pick<PlaywrightTestConfig, typeof supportedPlaywrightOptions[number]>
