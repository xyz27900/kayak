# @kayak/cli

Command-line interface for the **Kayak Toolchain**.

## `init`

This command performs several actions:

1. Creates `kayak.config.ts` of `kayak.config.js` — depending on the language you choose in the initialization wizard.
2. Creates `.kayak` directory with **Docker** setup.
3. Creates `.env.kayak` file with two environment variables — `SEED_PHRASE` and `PASSWORD` which you specified in the initialization wizard.
4. Adds necessary dependencies to the `package.json` file — all you need is to install them.
5. Adds `kayak` script to the `package.json` file — you can either use it as your test command or run it in combination with anything else.

### Options

- `--cypress` - Configures **Kayak** to work with **Cypress**.
- `--playwright` - Configures **Kayak** to work with **Playwright**.

## `test`

This command will run **Kayak** executor which will perform the action under the `test` script in the `package.json` file.
To change the default command, just edit the `CMD` instruction in the `.kayak/Dockerfile` file.

### Options

- `--cypress` - Runs tests using **Cypress**.
- `--playwright` - Runs tests using **Playwright**.
