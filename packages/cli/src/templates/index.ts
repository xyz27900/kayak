import path from 'path';
import process from 'process';
import { KayakLanguage, kayakLanguageToExtension, KayakTestRunner } from '~/types';
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

  public get isDebug(): boolean {
    return process.env.KAYAK_DEBUG === 'true' || process.env.KAYAK_DEBUG === '1';
  }

  public get dockerComposeFile(): string {
    return path.resolve(this.templatesDir, 'docker-compose.yaml');
  }

  private getByTestRunner(testRunner: KayakTestRunner): string {
    return path.resolve(this.templatesDir, testRunner);
  }

  public getDockerfile(): string {
    const templatePostfix = this.isDebug ? 'dev' : 'prod';
    return path.resolve(this.templatesDir, `Dockerfile.${templatePostfix}`);
  }

  public getDependencies(testRunner: KayakTestRunner): string {
    return path.resolve(this.getByTestRunner(testRunner), 'dependencies.json');
  }

  public getConfigFile(testRunner: KayakTestRunner, language: KayakLanguage): string {
    return path.resolve(this.getByTestRunner(testRunner), `kayak.config.${kayakLanguageToExtension[language]}`);
  }
}

export const templates = new Templates();
