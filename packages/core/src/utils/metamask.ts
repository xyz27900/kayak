import fs from 'fs';
import path from 'path';
import { Endpoints } from '@octokit/types';
import axios from 'axios';
import decompress from 'decompress';
import { coreEnv } from '~/env/core.env';
import { logger } from '~/logger';

const getMetaMaskRelease = async (version: string): Promise<{ name: string; url: string; }> => {
  const response = await axios.get('https://api.github.com/repos/metamask/metamask-extension/releases');
  const json = response.data as Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'];
  const target = json.find((item) => item.tag_name === `v${version}`);
  const asset = target?.assets?.find((item) => item.name.includes('metamask-chrome'));
  if (!asset) {
    throw new Error(`Could not find release for version ${version}`);
  } else {
    return {
      name: asset.name,
      url: asset.browser_download_url
    };
  }
};

const downloadFile = async (url: string, destination: string): Promise<void> => {
  const destinationDir = path.dirname(destination);
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  if (fs.existsSync(destination)) {
    fs.rmSync(destination);
  }

  const writer = fs.createWriteStream(destination);
  const response = await axios.get(url, { responseType: 'stream' });
  await new Promise((resolve, reject) => {
    if (response.data) {
      response.data.pipe(writer);
      response.data.on('error', reject);
      writer.on('finish', resolve);
    } else {
      reject(new Error('Could not download file'));
    }
  });
};

export const prepareMetaMask = async (version: string): Promise<string> => {
  if (!coreEnv.tmpDir) {
    throw new Error('TMP_DIR environment variable is not set');
  }

  const metamaskPath = path.join(coreEnv.tmpDir, 'metamask');
  const manifestPath = path.join(metamaskPath, 'manifest.json');

  if (fs.existsSync(manifestPath)) {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);
    const currentVersion = manifest.version;
    if (currentVersion === version) {
      logger.debug('MetaMask is already up to date');
      return metamaskPath;
    } else {
      logger.warn(`MetaMask is outdated, current version is ${currentVersion}`);
      fs.rmSync(metamaskPath, { recursive: true });
    }
  }

  logger.debug(`Downloading MetaMask ${version}`);

  const { name, url } = await getMetaMaskRelease(version);
  const zipPath = path.join(coreEnv.tmpDir, 'downloads', name);

  await downloadFile(url, zipPath);

  if (!fs.existsSync(metamaskPath)) {
    fs.mkdirSync(metamaskPath, { recursive: true });
  }

  logger.debug('Extracting MetaMask extension');
  await decompress(zipPath, metamaskPath);

  return metamaskPath;
};
