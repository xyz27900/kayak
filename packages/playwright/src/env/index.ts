import path from 'path';
import { EnvVariable } from '@kayak/core';

interface PlaywrightEnvVariables {
  playwrightTmpDir: string;
  readonly playwrightConfigFile: string;
}

class PlaywrightEnvManager implements PlaywrightEnvVariables {
  @EnvVariable(() => String)
  public playwrightTmpDir: string;

  get playwrightConfigFile(): string {
    return path.resolve(this.playwrightTmpDir, 'playwright.config.js');
  }
}

export const playwrightEnv: PlaywrightEnvVariables = new PlaywrightEnvManager();
