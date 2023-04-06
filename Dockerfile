FROM node:16-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY docs     ./docs
COPY examples ./examples
COPY packages ./packages
COPY scripts  ./scripts

RUN pnpm install --frozen-lockfile

RUN cd packages/core       && pnpm build
RUN cd packages/metamask   && pnpm build
RUN cd packages/cypress    && pnpm build
RUN cd packages/playwright && pnpm build
RUN cd packages/cli        && pnpm build
