import process from 'process';

export const getNodeVersion = (): [number, number, number] => {
  const version = process.version;
  const match = version.match(/^v([0-9]+)\.([0-9]+)\.([0-9]+)$/);
  if (!match) {
    throw new Error(`Could not parse node version from ${version}`);
  }

  const [major, minor, patch] = match.slice(1).map((v) => Number(v));
  return [major, minor, patch];
};
