FROM node:16-alpine AS dependencies

WORKDIR /tmp
COPY package.json package.json
RUN sed -i 's/workspace:\*/\*/g' package.json
RUN echo "@kayak:registry=http://127.0.0.1:4873" > .npmrc
RUN npm install

FROM kayak/chromium:cypress

WORKDIR /app
COPY . .
COPY --from=dependencies /tmp/node_modules /app/node_modules

CMD ["npm", "run", "test"]
