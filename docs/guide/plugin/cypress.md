# Cypress Plugin

If you don't want to use **Kayak** as an all-in-one solution, you can integrate it as a plugin for your existing **Cypress** setup.

## Installation

```shell
npm install -D @kayak/cypress
```

## Configuration

::: code-group
```javascript [cypress.config.js]
const { configureMetaMask } = require('@kayak/cypress')

module.exports = {
  setupNodeEvents(on, config) {
      configureMetaMask(on)
      // ... other plugins
  }
}
```

```typescript [cypress.config.ts]
import { configureMetaMask } from '@kayak/cypress'
import { defineConfig } from 'cypress'

export default defineConfig({
  setupNodeEvents(on, config) {
      configureMetaMask(on)
      // ... other plugins
  }
})
```
:::

After that, add **Kayak** commands to **Cypress** e2e configuration:

::: code-group
```javascript [cypress/support/e2e.js]
require('@kayak/cypress/commands')
// ... other commands
```

```typescript [cypress/support/e2e.ts]
import '@kayak/cypress/commands'
// ... other commands
```
:::

## Usage

There are some limitations to use **Cypress** with **Kayak**:

1. You must use `chrome` or `chromium` browsers.
2. You must use `--headed` mode.
3. `open` mode is not supported.

Therefore, the start command will look like this:

```shell
cypress run --browser chrome --headed
```

Also, you need to set the following environment variables:

| Name                            | Description                                                                      |
|---------------------------------|----------------------------------------------------------------------------------|
| `CYPRESS_REMOTE_DEBUGGING_PORT` | Port for remote debugging. It is necessary to configure **MetaMask**.            |
| `TMP_DIR`                       | Path to the temporary directory where **MetaMask** extension will be downloaded. |
| `SEED_PHRASE`                   | Seed phrase for **MetaMask**.                                                    |
| `PASSWORD`                      | Password for **MetaMask**.                                                       |

::: warning
Please note that it is not enough to put these variables in the `.env` file in the root of your project.
You need to set them in the environment where **Cypress** is executing.

For example, you can use the [env-cmd](https://www.npmjs.com/package/env-cmd) package.

::: code-group
```json [package.json]
{
  "scripts": {
    "test:e2e": "env-cmd -f .env cypress run --browser chrome --headed"
  }
}
```
:::

::: tip
You can have a look at the [example project](https://github.com/xyz27900/kayak/tree/main/examples/cypress-plugin) to see how it works.
:::
