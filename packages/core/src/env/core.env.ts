import path from 'path';
import { EnvVariable } from '~/utils/env';

interface CoreEnvVariables {
  debug: boolean;
  docker: boolean;
  runtime: 'cypress' | 'playwright';

  projectDir: string;
  tmpDir: string;
  keepTemporaryFiles: boolean;
  remoteDebuggingPort: number;
  metamaskVersion: string;

  readonly isCypress: boolean;
  readonly isPlaywright: boolean;
  readonly kayakConfigFile: string;
  readonly kayakParamsFile: string;
}

class CoreEnv implements CoreEnvVariables {
  @EnvVariable(() => Boolean, { defaultValue: false })
  public debug: boolean;

  @EnvVariable(() => Boolean, { defaultValue: false })
  public docker: boolean;

  @EnvVariable(() => String)
  public runtime: 'cypress' | 'playwright';

  @EnvVariable(() => String)
  public projectDir: string;

  @EnvVariable(() => String, { alternativeNames: ['TMP_DIR'] })
  public tmpDir: string;

  @EnvVariable(() => Boolean, { defaultValue: false })
  public keepTemporaryFiles: boolean;

  @EnvVariable(() => Number, { alternativeNames: ['CYPRESS_REMOTE_DEBUGGING_PORT'] })
  public remoteDebuggingPort: number;

  @EnvVariable(() => String, { defaultValue: require('../../package.json').metamask })
  public metamaskVersion: string;

  public get isCypress(): boolean {
    return this.runtime === 'cypress';
  }

  public get isPlaywright(): boolean {
    return this.runtime === 'playwright';
  }

  public get kayakConfigFile(): string {
    return path.resolve(this.tmpDir, 'kayak.config.js');
  }

  public get kayakParamsFile(): string {
    return path.resolve(this.tmpDir, 'kayak.params.json');
  }
}

export const coreEnv: CoreEnvVariables = new CoreEnv();
