const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const semver = require('semver');
const { getPackages, getGeneralVersion } = require('./utils');

/** @type {string[]} */
let packages;
/** @type {string} */
let version;

try {
  packages = getPackages(path.resolve(__dirname, '..'));
  version = getGeneralVersion(packages);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const saveVersion = (newVersion) => {
  for (const pkg of packages) {
    const packageJson = require(pkg);
    packageJson.version = newVersion;
    console.log(`Updating version in ${pkg} to ${newVersion}`);
    fs.writeFileSync(pkg, JSON.stringify(packageJson, null, 2));
  }
};

program
  .command('prerelease')
  .description('Bump prerelease version')
  .option('--pre-id <preId>', 'Pre-release identifier')
  .action((options) => {
    const preId = options.preId ?? 'rc';
    const newVersion = semver.inc(version, 'prerelease', preId);
    saveVersion(newVersion);
  });

program
  .command('patch')
  .description('Bump patch version')
  .action(() => {
    const newVersion = semver.inc(version, 'patch');
    saveVersion(newVersion);
  });

program
  .command('minor')
  .description('Bump minor version')
  .action(() => {
    const newVersion = semver.inc(version, 'minor');
    saveVersion(newVersion);
  });

program
  .command('major')
  .description('Bump major version')
  .action(() => {
    const newVersion = semver.inc(version, 'major');
    saveVersion(newVersion);
  });

try {
  program.parse(process.argv);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
