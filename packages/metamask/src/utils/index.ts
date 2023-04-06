export const dataTestId = (id: string): string => `[data-testid="${id}"]`;

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const retry = async <T>(
  fn: () => T | Promise<T>,
  options?: {
    retries?: number;
    timeout?: number;
  }
): Promise<T> => {
  const retries = options?.retries ?? 5;
  const timeout = options?.timeout ?? 1000;

  let count = retries - 1;

  return new Promise((resolve, reject) => {
    const attempt = async (): Promise<void> => {
      try {
        const result = await fn();
        resolve(result);
      } catch (e) {
        if (count === 0) {
          reject('Max retries reached');
        } else {
          count -= 1;
          setTimeout(attempt, timeout);
        }
      }
    };

    attempt();
  });
};
