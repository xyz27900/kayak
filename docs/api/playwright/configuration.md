# Playwright Configuration

Configuration in an object which has to be exported from `kayak.config.js` or `kayak.config.ts` file — depending on the language you use.

For better IDE support, you can use the `defineConfig` function from the `@kayak/playwright` package.

::: code-group
```javascript [kayak.config.js]
const { defineConfig } = require('@kayak/playwright')

module.exports = defineConfig({
  // ... your configuration
})
```

```typescript [kayak.config.ts]
import { defineConfig } from '@kayak/playwright'

export default defineConfig({
  // ... your configuration
})
```
:::

## Common options

Common options are covered in the [Common Configuration](/guide/common/configuration-file) section.

## Playwright-specific options

The options below are specific to **Playwright**. You can read more about each of them in the [Playwright documentation](https://playwright.dev/docs/api/class-testconfig).

| Option        | Link to the docs                                                                                      |
|---------------|-------------------------------------------------------------------------------------------------------|
| `expect`      | [testConfig → expect](https://playwright.dev/docs/api/class-testconfig#test-config-expect)            |
| `forbidOnly`  | [testConfig → forbidOnly](https://playwright.dev/docs/api/class-testconfig#test-config-forbid-only)   |
| `maxFailures` | [testConfig → maxFailures](https://playwright.dev/docs/api/class-testconfig#test-config-max-failures) |
| `timeout`     | [testConfig → timeout](https://playwright.dev/docs/api/class-testconfig#test-config-timeout)          |

