/**
 * This is here because Cypress uses Webpack v4 which doesn't support "exports" in package.json,
 * so we can't use multiple entry points
 */
require('./dist/commands');
