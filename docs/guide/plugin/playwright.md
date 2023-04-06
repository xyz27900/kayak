# Playwright Plugin

If you don't want to use **Kayak** as an all-in-one solution, you can integrate it as a plugin for your existing **Playwright** setup.

## Installation

```shell
npm install -D @kayak/playwright
```

## Configuration

There are some limitations to use **Playwright** with **Kayak**:

1. You must use `chrome` or `chromium` browsers.
2. You must use `headed` mode.

Therefore, the configuration will look like this:

::: code-group
```javascript [playwright.config.js]
module.exports = {
  use: {
    headless: false,
    channel: 'chrome', // or 'chromium'
    browserName: 'chromium',
  },
  // ... rest of the configuration
}
```

```typescript [playwright.config.ts]
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  workers: 1,
  use: {
    headless: false,
    channel: 'chrome', // or 'chromium'
    browserName: 'chromium',
  },
  // ... rest of the configuration
};
```
:::

## Usage

After the configuration is done, just use `test` from `@kayak/playwright` in your tests.

Here is an example of such a test:

::: code-group
```javascript [example.spec.js]
const { test } = require('@playwright/test')
const { test: kayakTest } = require('@kayak/playwright')

test('Test without MetaMask', async ({ page }) => {
  await page.goto('https://example.com')
  // ... other actions
})

kayakTest('Test with MetaMask', async ({ page, metamask }) => {
  await page.goto('https://example.com')
  await metamask.addAccount('test account')
  // ... other actions
})
```

```typescript [example.spec.ts]
import { test } from '@playwright/test'
import { test as kayakTest } from '@kayak/playwright'

test('Test without MetaMask', async ({ page }) => {
  await page.goto('https://example.com')
  // ... other actions
})

kayakTest('Test with MetaMask', async ({ page, metamask }) => {
  await page.goto('https://example.com')
  await metamask.addAccount('test account')
  // ... other actions
})
```
:::

Also, you need to set the following environment variables:

| Name                            | Description                                                                      |
|---------------------------------|----------------------------------------------------------------------------------|
| `TMP_DIR`                       | Path to the temporary directory where **MetaMask** extension will be downloaded. |
| `SEED_PHRASE`                   | Seed phrase for **MetaMask**.                                                    |
| `PASSWORD`                      | Password for **MetaMask**.                                                       |

::: warning
Please note that it is not enough to put these variables in the `.env` file in the root of your project.
You need to set them in the environment where **Playwright** is executing.

For example, you can use the [env-cmd](https://www.npmjs.com/package/env-cmd) package.

::: code-group
```json [package.json]
{
  "scripts": {
    "test:e2e": "env-cmd -f .env playwright test"
  }
}
```
:::

::: tip
You can have a look at the [example project](https://github.com/xyz27900/kayak/tree/main/examples/playwright-plugin) to see how it works.
:::
