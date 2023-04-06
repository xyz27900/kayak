# Playwright Plugin

A part of the **Kayak Toolchain**.

## Usage as a plugin for Playwright

### Installation

```shell
npm install -D @kayak/playwright
```

### Configuration

There are some limitations to use **Playwright** with **Kayak**:

1. You must use `chrome` or `chromium` browsers.
2. You must use `headed` mode.

Therefore, the configuration will look like this:

```javascript
// playwright.config.js
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

### Usage

After the configuration is done, just use `test` from `@kayak/playwright` in your tests.

Here is an example of such a test:

```javascript
//example.spec.js
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

Also, you need to set the following environment variables:

| Name                            | Description                                                                      |
|---------------------------------|----------------------------------------------------------------------------------|
| `TMP_DIR`                       | Path to the temporary directory where **MetaMask** extension will be downloaded. |
| `SEED_PHRASE`                   | Seed phrase for **MetaMask**.                                                    |
| `PASSWORD`                      | Password for **MetaMask**.                                                       |

> **WARNING**
> 
> Please note that it is not enough to put these variables in the `.env` file in the root of your project.
> You need to set them in the environment where **Playwright** is executing.
> 
> For example, you can use the [env-cmd](https://www.npmjs.com/package/env-cmd) package.
> 
> ```json
> {
>   "scripts": {
>     "test:e2e": "env-cmd -f .env playwright test"
>   }
> }
> ```
