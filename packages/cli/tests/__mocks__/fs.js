const path = require('path');
const { fs } = require('memfs');

const packageJson = {
  name: 'test',
  scripts: {},
  devDependencies: {}
};

const cypressDevDependencies = {
  'cypress-dependency-1': '*',
  'cypress-dependency-2': '*'
};

const cypressProdDependencies = {
  'cypress-dependency-1': '1.0.0',
  'cypress-dependency-2': '1.0.0'
};

const playwrightDevDependencies = {
  'playwright-dependency-1': '*',
  'playwright-dependency-2': '*'
};

const playwrightProdDependencies = {
  'playwright-dependency-1': '1.0.0',
  'playwright-dependency-2': '1.0.0'
};

const filesystem = {
  '/project': {
    'package.json': '{}'
  },
  [path.resolve(__dirname, '../..')]: {
    templates: {
      cypress: {
        'dependencies.dev.json': JSON.stringify(cypressDevDependencies, null, 2),
        'dependencies.prod.json': JSON.stringify(cypressProdDependencies, null, 2),
        'kayak.config.ts': 'Kayak Config Cypress TS',
        'kayak.config.js': 'Kayak Config Cypress JS',
        'tsconfig.json': 'TS Config Cypress JSON'
      },
      playwright: {
        'dependencies.dev.json': JSON.stringify(playwrightDevDependencies, null, 2),
        'dependencies.prod.json': JSON.stringify(playwrightProdDependencies, null, 2),
        'kayak.config.ts': 'Kayak Config Playwright TS',
        'kayak.config.js': 'Kayak Config Playwright JS',
        'tsconfig.json': 'TS Config Playwright JSON'
      },
      'docker-compose.yaml': 'Docker Compose',
      'Dockerfile.dev': 'Dockerfile Development',
      'Dockerfile.prod': 'Dockerfile Production'
    },
    'package.json': JSON.stringify(packageJson, null, 2)
  }
};

/**
 * @param root {string}
 * @param tree {object}
 */
const createFiles = (root, tree) => {
  Object.entries(tree).forEach((entry) => {
    const [key, value] = entry;
    const currentPath = path.resolve(root, key);
    if (typeof value === 'string') {
      fs.writeFileSync(currentPath, value);
    } else {
      fs.mkdirSync(currentPath, { recursive: true });
      createFiles(currentPath, value);
    }
  });
};

createFiles('/', filesystem);

module.exports = fs;
