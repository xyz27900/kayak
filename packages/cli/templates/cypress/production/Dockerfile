FROM node:16-alpine AS dependencies

WORKDIR /tmp
COPY package.json package.json
RUN npm install

ARG KAYAK_IMAGE_TAG=latest
FROM kayak/chromium:${KAYAK_IMAGE_TAG}

WORKDIR /app
COPY . .
COPY --from=dependencies /tmp/node_modules /app/node_modules

CMD ["npm", "run", "test"]
