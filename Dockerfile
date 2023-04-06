FROM node:16-alpine

RUN apk add --no-cache make
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY docs ./docs
COPY examples ./examples
COPY packages ./packages
COPY scripts ./scripts

RUN pnpm install --frozen-lockfile
RUN cd packages && make build
