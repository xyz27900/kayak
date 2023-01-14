# Dockerfile

The `Dockerfile` is located in the `.kayak` directory and looks like this:

::: code-group
```docker [Cypress]
FROM node:16-alpine AS dependencies

WORKDIR /tmp
COPY package.json package.json
RUN npm install

# ------------ #

FROM kayak/chromium:cypress

WORKDIR /app
COPY . .
COPY --from=dependencies /tmp/node_modules /app/node_modules

CMD ["npm", "run", "test"]
```

```docker [Playwright]
FROM node:16-alpine AS dependencies

WORKDIR /tmp
COPY package.json package.json
RUN npm install

# ------------ #

FROM kayak/chromium:playwright

WORKDIR /app
COPY . .
COPY --from=dependencies /tmp/node_modules /app/node_modules

CMD ["npm", "run", "test"]
```
:::

It uses `kayak/chromium` as a base image and installs the dependencies from the `package.json` file.
You can modify it to your needs.

The `kayak/chromium` image has two tags: `cypress` and `playwright` — depending on the framework you use.

::: tip
Actually, you can run `playwright` tests in the `cypress` image, but vice versa is not possible.
:::

By default, `Dockerfile` uses a two-stage build to reduce building time.

The `CMD` instruction is the default command that will be executed in the container.
Change it if you want to run something else.

```docker
CMD ["npm", "run", "test"]
```
