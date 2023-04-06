import fs from 'fs';
import path from 'path';

export const findConfig = (basePath: string): string | null => {
  const configFiles = [
    'kayak.config.ts',
    'kayak.config.js'
  ];

  const file = configFiles.find((item) => fs.existsSync(path.join(basePath, item))) ?? null;
  return file ? path.join(basePath, file) : null;
};

export const findPackageJson = (basePath: string): string | null => {
  let currentPath = basePath;

  while (currentPath !== '/') {
    const packageJsonPath = path.join(currentPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      return currentPath;
    }

    currentPath = path.dirname(currentPath);
  }

  return null;
};
