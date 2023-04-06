FROM node:16-alpine AS dependencies

WORKDIR /tmp
COPY package.json package.json
RUN npm install

FROM kayak/chromium:playwright

WORKDIR /app
COPY . .
COPY --from=dependencies /tmp/node_modules /app/node_modules

CMD ["npm", "run", "test"]
