import process from 'process';
import pc from 'picocolors';
import { coreEnv } from '~/env/core.env';

type Formatter = (input: string | number | null | undefined) => string;

enum LogLevel {
  DEBUG = 'DEBUG',
  TEST = 'TEST',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private static getColorByLevel(level: LogLevel): Formatter {
    switch (level) {
      case LogLevel.DEBUG:
        return pc.green;
      case LogLevel.TEST:
        return pc.magenta;
      case LogLevel.INFO:
        return pc.cyan;
      case LogLevel.WARN:
        return pc.yellow;
      case LogLevel.ERROR:
        return pc.red;
    }
  }

  private print(message: string, level: LogLevel = LogLevel.INFO): void {
    const color = Logger.getColorByLevel(level);
    const logLevelMessage = color(level.padEnd(5, ' '));
    const resultMessage = `${logLevelMessage} ${message}`;
    process.stdout.write(resultMessage + '\n');
  }

  public debug(message: string): void {
    if (coreEnv.debug) {
      this.print(message, LogLevel.DEBUG);
    }
  }

  public test(message: string): void {
    this.print(message, LogLevel.TEST);
  }

  public info(message: string): void {
    this.print(message, LogLevel.INFO);
  }

  public warn(message: string): void {
    this.print(message, LogLevel.WARN);
  }

  public error(message: string): void {
    this.print(message, LogLevel.ERROR);
  }

  public format(message: string, format: keyof Omit<typeof pc, 'createColors' | 'isColorSupported'>): string {
    return pc[format](message);
  }
}

export const logger = new Logger();
