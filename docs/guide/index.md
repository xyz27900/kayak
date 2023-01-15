# What is Kayak?

::: image-group
![](/images/midjourney-kayak-1.png)
![](/images/midjourney-kayak-2.png)
:::

## Overview

**Kayak** is a tool that allows you to write end-to-end tests for your web3 applications in a way you've never written them before.

**Kayak** does all the dirty work for you so you can focus on writing the tests and not care about how your tests are executing.

## Features

### :fox_face: MetaMask support

Using **Kayak**, you are able to do everything you can with Metamask as a "manual" user.

### :exploding_head: Headed and headless modes

With **Kayak,** you are able to execute tests in two modes:

- So-called **headed** mode, when tests are executing in a browser window, and you can see what's going on.
- So-called **headless** mode, when a browser window is not showing.

::: tip
Read more about how it works in the [Common Flow](/guide/common/overview) section.
:::

### :package: Ready for Cypress and Playwright

**Kayak** is being shipped with built-in support of [Cypress](https://www.cypress.io/) and [Playwright](https://playwright.dev/).
You can use **Kayak** as an out-of-the-box solution with these frameworks' APIs or as a plugin for each of them.

## Example

A simple test for **Cypress** testing wallet connection to [Uniswap](https://app.uniswap.org/#/swap) may look like this:

::: code-group
```typescript [kayak.config.ts]
import { defineConfig } from '@kayak/cypress'

export default defineConfig({
  testsDir: 'cypress/tests',
  videosDir: 'cypress/videos'
})
```
:::

::: code-group
```typescript [tests/uniswap.spec.ts]
it('Test Metamask connection', () => {
  cy.open('https://app.uniswap.org/#/swap')
  cy.get('[data-test-id="navbar-connect-wallet"]').click()
  cy.get('[data-test-id="wallet-modal-option"]').contains('Metamask').click()

  cy.metamaskApproveConnection()
  cy.get('[data-test-id="web3-status-connected"]').should('be.visible')
})
```
:::

## Similar projects

[Synpress](https://github.com/Synthetixio/synpress) is a similar project that allows you to run end-to-end tests with **Cypress** and **Metamask** as well.
It uses several similar approaches, so we recommend you to have a look at it.

[Docker BaseImage GUI](https://github.com/jlesage/docker-baseimage-gui) is an awesome and extremely tiny X graphical **Docker** image.
**Kayak** uses some techniques and build scripts from this project to build its own **Docker** image.
