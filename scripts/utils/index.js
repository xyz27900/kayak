const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const YAML = require('yaml');

/**
 * @param root {string}
 * @returns {string[]}
 */
const getPackages = (root) => {
  const workspaceFile = path.resolve(root, 'pnpm-workspace.yaml');
  if (!fs.existsSync(workspaceFile)) {
    throw new Error('Cannot find pnpm-workspace.yaml');
  }

  const content = fs.readFileSync(workspaceFile, { encoding: 'utf-8' });
  const yaml = YAML.parse(content);
  const packages = yaml.packages;
  if (!Array.isArray(packages)) {
    throw new Error('Cannot find packages in pnpm-workspace.yaml');
  }

  const packagesEntries = fg.sync(packages, {
    cwd: root,
    onlyDirectories: true
  });
  const entries = ['.', ...packagesEntries];
  const packageJsonFiles = [];
  for (const entry of entries) {
    const fullPath = path.join(root, entry, 'package.json');
    if (fs.existsSync(fullPath)) {
      packageJsonFiles.push(fullPath);
    } else {
      throw new Error(`Cannot find package.json in ${fullPath}`);
    }
  }

  return packageJsonFiles;
};

/**
 * @param packages {string[]}
 * @returns {string}
 */
const getGeneralVersion = (packages) => {
  const versionsMap = packages.reduce((result, pkg) => {
    const packageJson = require(pkg);
    return {
      ...result,
      [pkg]: packageJson.version
    };
  }, {});

  const versionsSet = new Set(Object.values(versionsMap));
  if (versionsSet.size !== 1) {
    throw new Error('All packages should have the same version');
  }

  return versionsSet.values().next().value;
};

module.exports = {
  getPackages,
  getGeneralVersion
};
