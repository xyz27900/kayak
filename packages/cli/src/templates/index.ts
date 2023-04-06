import path from 'path';
import process from 'process';
import { KayakLanguage, KayakTestRunner } from '~/types';
import { findPackageJson } from '~/utils';

export class Templates {
  private readonly templatesDir: string;

  constructor() {
    const packageRoot = findPackageJson(__dirname);
    if (packageRoot) {
      this.templatesDir = path.resolve(packageRoot, 'templates');
    } else {
      throw new Error('Could not find package.json');
    }
  }

  private get isDebug(): boolean {
    return process.env.KAYAK_DEBUG === 'true' || process.env.KAYAK_DEBUG === '1';
  }

  public get dockerComposeFile(): string {
    return path.resolve(this.templatesDir, 'docker-compose.yaml');
  }

  private getByTestRunner(testRunner: KayakTestRunner): string {
    return path.resolve(this.templatesDir, testRunner);
  }

  public getDockerfile(testRunner: KayakTestRunner): string {
    const templateSubdir = this.isDebug ? 'development' : 'production';
    return path.resolve(this.getByTestRunner(testRunner), templateSubdir, 'Dockerfile');
  }

  public getDependencies(testRunner: KayakTestRunner): string {
    const templateSubdir = this.isDebug ? 'development' : 'production';
    return path.resolve(this.getByTestRunner(testRunner), templateSubdir, 'dependencies.json');
  }

  public getConfigFile(testRunner: KayakTestRunner, language: KayakLanguage): string {
    return path.resolve(this.getByTestRunner(testRunner), `kayak.config.${language}`);
  }
}

export const templates = new Templates();
