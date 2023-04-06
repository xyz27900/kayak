/* eslint-disable @typescript-eslint/naming-convention */
import process from 'process';
import { camelCaseToSnakeCase } from '~/utils/general';

interface EnvVariableOptions<T extends string | number | boolean | string[]> {
  defaultValue?: T;
  alternativeNames?: string[];
}

export function EnvVariable(type: () => StringConstructor, options: EnvVariableOptions<string>): PropertyDecorator;
export function EnvVariable(type: () => NumberConstructor, options: EnvVariableOptions<number>): PropertyDecorator;
export function EnvVariable(type: () => BooleanConstructor, options: EnvVariableOptions<boolean>): PropertyDecorator;
export function EnvVariable(type: () => ArrayConstructor, options: EnvVariableOptions<string[]>): PropertyDecorator;
export function EnvVariable(type: () => (StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor)): PropertyDecorator;
export function EnvVariable(type: () => (StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor), options?: EnvVariableOptions<string | number | boolean | string[]>): PropertyDecorator {
  return (target, name) => {
    const key = `KAYAK_${camelCaseToSnakeCase(name.toString()).toUpperCase()}`;

    Object.defineProperty(target, name, {
      get() {
        let value = process.env[key];
        if (value === undefined && options?.alternativeNames) {
          for (const alternativeName of options.alternativeNames) {
            const alternativeValue = process.env[alternativeName];
            if (alternativeValue !== undefined) {
              value = alternativeValue;
              break;
            }
          }
        }

        if (value === undefined) {
          if (typeof options?.defaultValue !== 'undefined') {
            value = options.defaultValue.toString();
          } else {
            throw new Error(`Environment variable ${key} is not set`);
          }
        }

        const returnedType = type();
        if (returnedType === Array) {
          return value.split(',');
        } else if (returnedType === Boolean) {
          return value === 'true' || value === '1';
        } else {
          return returnedType(value);
        }
      },
      set(value: string | number | boolean | string[]) {
        process.env[key] = value.toString();
        options?.alternativeNames?.forEach((alternativeName) => {
          process.env[alternativeName] = value.toString();
        });
      },
      enumerable: true,
      configurable: true
    });
  };
}
