#!/usr/bin/env node
import { buildCli } from '@kayak/core';
import { parseAction } from '~/actions/parse.action';
import { testAction } from '~/actions/test.action';

const packageJson = require('../../package.json');

buildCli({
  name: 'kayak-cypress',
  description: 'Kayak Cypress integration',
  version: packageJson.version,
  actions: {
    parseAction,
    testAction
  }
});
