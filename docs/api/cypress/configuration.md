# Cypress Configuration

Configuration is an object which has to be exported from `kayak.config.js` or `kayak.config.ts` file — depending on the language you use.

For better IDE support, you can use the `defineConfig` function from the `@kayak/cypress` package.

::: code-group
```javascript [kayak.config.js]
const { defineConfig } = require('@kayak/cypress')

module.exports = defineConfig({
  // ... your configuration
})
```

```typescript [kayak.config.ts]
import { defineConfig } from '@kayak/cypress'

export default defineConfig({
  // ... your configuration
})
```
:::

## Common options

Common options are covered in the [Common Configuration](/guide/common/configuration-file) section.

## Cypress-specific options

The options below aren't described here because they are specific to **Cypress** and this page is just a list of supported Cypress configuration parameters. 
You can read actual info for each of them in the [Cypress documentation](https://docs.cypress.io/guides/references/configuration).

### Timeouts

Read more about timeouts in [Cypress documentation (Timeouts)](https://docs.cypress.io/guides/references/configuration#Timeouts).

| Option                  | Type     | 
|-------------------------|----------|
| `defaultCommandTimeout` | `number` |
| `execTimeout`           | `number` |
| `taskTimeout`           | `number` |
| `pageLoadTimeout`       | `number` |
| `requestTimeout`        | `number` |
| `responseTimeout`       | `number` |

### Folders

Read more about folders in [Cypress documentation (Folders / Files)](https://docs.cypress.io/guides/references/configuration#Folders-Files).

| Option                  | Type      |
|-------------------------|-----------|
| `downloadsFolder`       | `string`  |
| `fixturesFolder`        | `string`  |

### Actionability

Read more about actionability in [Cypress documentation (Actionability)](https://docs.cypress.io/guides/references/configuration#Actionability).

| Option                       | Type                                                                |
|------------------------------|---------------------------------------------------------------------|
| `animationDistanceThreshold` | `number`                                                            |
| `waitForAnimations`          | `boolean`                                                           |
| `scrollBehavior`             | - `center`<br/>- `top`<br/>- `bottom`<br/>- `nearest`<br/>- `false` |
