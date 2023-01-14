# Configuration file

After the initialization you have `kayak.config.ts` or `kayak.config.js` file in the root of your project.

In this section we will cover only common options.
Vendor-specific options are described in the corresponding sections of the API documentation:

- [Cypress](/api/cypress/configuration.md)
- [Playwright](/api/playwright/configuration.md)

## slowMo

- Type: `number`
- Default: `0`

Slows down the execution of tests by the specified amount of milliseconds.

::: tip
This option is useful for debugging purposes.
:::

## testsDir

- Type: `string`
- Default: `cypress/tests` or `playwright/tests` — depending on the test runner.

## testMatch

- Type: `string`
- Default: `**/*.{spec,test,cy}.{js,ts}`

Glob pattern for test files.

## videosDir

- Type: `string`
- Default: `cypress/videos` or `playwright/videos` — depending on the test runner.

Path to the directory with videos.

## retries

- Type: `number`
- Default: `0`

Number of times to retry a failed test before actually failing it.

## viewport

- Type: `{ width: number, height: number }`
- Default: `{ width: 1280, height: 720 }`

Default viewport size for tests.
