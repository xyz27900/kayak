export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const camelCaseToSnakeCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

export const getValueWithoutThrowing = <T>(fn: () => T, defaultValue: T): T => {
  try {
    return fn();
  } catch (e) {
    return defaultValue;
  }
};
