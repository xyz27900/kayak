import { spawn } from 'child_process';
import process from 'process';

interface SpawnAsyncOptions {
  env?: NodeJS.ProcessEnv;
  showOutput?: boolean;
}

export const spawnAsync = (command: string, args: string[], options?: SpawnAsyncOptions): Promise<void> => {
  const env = options?.env ?? process.env;
  const showOutput = options?.showOutput ?? true;

  return new Promise((resolve, reject) => {
    const res = spawn(command, args, {
      shell: true,
      env
    });

    if (showOutput) {
      res.stderr.pipe(process.stderr);
      res.stdout.pipe(process.stdout);
    }

    res.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command exited with code ${code}`));
      }
    });
  });
};
