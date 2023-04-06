import { KayakConfig } from '@kayak/core';
import Cypress from 'cypress';

const cypressSupportedProperties = [
  /* https://docs.cypress.io/guides/references/configuration#Timeouts */
  'defaultCommandTimeout',
  'execTimeout',
  'taskTimeout',
  'pageLoadTimeout',
  'requestTimeout',
  'responseTimeout',
  /* https://docs.cypress.io/guides/references/configuration#Folders-Files */
  'downloadsFolder',
  'fixturesFolder',
  /* https://docs.cypress.io/guides/references/configuration#Actionability */
  'animationDistanceThreshold',
  'waitForAnimations',
  'scrollBehavior'
] as const;

export type KayakCypressConfig = {
  /**
   * @description
   * Path to the file with e2e environment setup.
   *
   * For example, this file may contain commands import and registration.
   */
  setupFile?: string;
} & KayakConfig & Pick<Cypress.ConfigOptions, typeof cypressSupportedProperties[number]>;
