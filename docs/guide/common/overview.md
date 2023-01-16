# Common Flow

## Overview

In the common **Kayak** usage flow your tests are executing in a Docker container.
This is a simple scheme displaying how this actually works:

![](/images/diagram.png)

The **Display** container is a sort of bus — **Test Runner** opens a browser on a virtual X server display, and at the same time the **Video Recorder** container captures that virtual display and records a video.

During the test execution, you can observe what’s going on in your browser by opening the page accessible at `127.0.0.1:5800/vnc.html`.

Also, you don't need to worry about the local blockchain network, because there is a container with a local testnet running alongside described above. You can read more about it in the [Docker Compose section](/guide/common/docker-compose#local-testnet-node).

To automatically setup **Kayak**, just run the following command:

## Setup

::: code-group
```shell [Cypress]
npx kayak init --cypress
```

```shell [Playwright]
npx kayak init --playwright
```
:::

This command performs several actions:

1. Creates `kayak.config.ts` of `kayak.config.js` — depending on the language you choose in the initialization wizard.
2. Creates `.kayak` directory with **Docker** setup.
3. Creates `.env.kayak` file with two environment variables — `SEED_PHRASE` and `PASSWORD` which you specified in the initialization wizard.
4. Adds necessary dependencies to the `package.json` file — all you need is to install them.
5. Adds `kayak` script to the `package.json` file — you can either use it as your test command or run it in combination with anything else.

For example, to run **Kayak** and the server, you can use [this package](https://www.npmjs.com/package/start-server-and-test) like this:

::: code-group
```json [package.json]
{
  "scripts": {
    "serve": "serve -s dist",
    "kayak": "kayak test --cypress", // or --playwright
    "test": "start-server-and-test serve http://localhost:3000 kayak"
  }
}
```

## Running Tests

To run your tests, execute `npm run kayak`.

This command will run **Kayak** executor which will perform the action under the `test` script in the `package.json` file.
To change the default command, just edit the `CMD` instruction in the `.kayak/Dockerfile` file. Read more about [Dockerfile](/guide/common/dockerfile).
