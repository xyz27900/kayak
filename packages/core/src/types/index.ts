export interface KayakConfig {
  /**
   * @description Slow down the execution of tests by the specified amount of milliseconds.
   */
  slowMo?: number;

  /**
   * @description Path to the directory with tests.
   */
  testsDir?: string;

  /**
   * @description Glob pattern for test files.
   */
  testMatch?: string[];

  /**
   * @description Path to the directory with videos.
   */
  videosDir?: string;

  /**
   * @description Number of times to retry a failed test before actually failing it.
   */
  retries?: number;

  /**
   * @description Default viewport size for tests.
   */
  viewport?: {
    width: number;
    height: number;
  };
}

export interface ChromeDebuggerResponse {
  webSocketDebuggerUrl: string;
}

export interface ParseConfigResult<T> {
  kayakConfig: Required<KayakConfig>;
  runnerConfig: () => T;
}
