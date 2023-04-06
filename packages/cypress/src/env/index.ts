import path from 'path';
import { EnvVariable } from '@kayak/core';

interface CypressEnvVariables {
  cypressTmpDir: string;
  readonly cypressConfigFile: string;
  readonly cypressSupportFile: string;
}

class CypressEnvManager implements CypressEnvVariables {
  @EnvVariable(() => String)
  public cypressTmpDir: string;

  public get cypressConfigFile(): string {
    return path.resolve(this.cypressTmpDir, 'cypress.config.js');
  }

  public get cypressSupportFile(): string {
    return path.resolve(this.cypressTmpDir, 'cypress.support.js');
  }
}

export const cypressEnv: CypressEnvVariables = new CypressEnvManager();
