import fs from 'fs';
import path from 'path';
import { PluginObj, PluginItem, transformSync } from '@babel/core';

interface DirnamePluginOptions {
  dirname: string;
  filename: string;
}

const dirnamePlugin = (options: DirnamePluginOptions): PluginObj => ({
  name: 'replace-dirname-filename',
  visitor: {
    Identifier(item): void {
      if (item.node.name === '__dirname') {
        item.node.name = `"${options.dirname}"`;
      } else if (item.node.name === '__filename') {
        item.node.name = `"${options.filename}"`;
      }
    }
  }
});

interface TranspileFileOptions {
  typescript?: boolean;
  env?: boolean;
  dirname?: boolean;
}

export const transpileFile = (filePath: string, options: TranspileFileOptions): string => {
  const typescript = options.typescript ?? false;
  const env = options.env ?? true;

  const presets: PluginItem[] = [
    typescript ? '@babel/preset-typescript' : null,
    env ? '@babel/preset-env' : null
  ].filter(Boolean) as PluginItem[];

  const plugins: PluginItem[] = options.dirname ? [
    dirnamePlugin({
      dirname: path.dirname(filePath),
      filename: filePath
    })
  ] : [];

  const sourceCode = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const result = transformSync(sourceCode, {
    presets,
    plugins,
    filename: filePath
  })?.code;

  if (!result) {
    throw new Error(`Failed to transpile file ${filePath}`);
  } else {
    return result;
  }
};

interface TranspileCodeOptions {
  env?: boolean;
  dirname?: {
    dirname: string;
    filename: string;
  };
}

export const transpileCode = (sourceCode: string, options: TranspileCodeOptions): string => {
  const env = options.env ?? true;

  const presets: PluginItem[] = env ? [
    '@babel/preset-env'
  ] : [];

  const plugins: PluginItem[] = options.dirname ? [
    dirnamePlugin({
      dirname: options.dirname.dirname,
      filename: options.dirname.filename
    })
  ] : [];

  const result = transformSync(sourceCode, {
    presets,
    plugins
  })?.code;

  if (!result) {
    throw new Error('Failed to transpile code');
  } else {
    return result;
  }
};
