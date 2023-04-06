import { KayakConfig } from '~/types';
import { EnvVariable } from '~/utils/env';

type KayakEnvVariables = Required<KayakConfig>;

class KayakEnv implements KayakEnvVariables {
  /* KayakConfig */
  @EnvVariable(() => Number)
  public slowMo: number;

  @EnvVariable(() => String)
  public testsDir: string;

  @EnvVariable(() => Array)
  public testMatch: string[];

  @EnvVariable(() => String)
  public videosDir: string;

  @EnvVariable(() => Number)
  public retries: number;

  @EnvVariable(() => Number)
  private viewportWidth: number;

  @EnvVariable(() => Number)
  private viewportHeight: number;

  public get viewport(): Required<KayakConfig>['viewport'] {
    return {
      width: this.viewportWidth,
      height: this.viewportHeight
    };
  }

  public set viewport(value: Required<KayakConfig>['viewport']) {
    this.viewportWidth = value.width;
    this.viewportHeight = value.height;
  }
}

export const kayakEnv: KayakEnvVariables = new KayakEnv();
