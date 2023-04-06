export const kayakTestRunners = ['cypress', 'playwright'] as const;
export type KayakTestRunner = typeof kayakTestRunners[number];

export const kayakLanguages = ['ts', 'js'] as const;
export type KayakLanguage = typeof kayakLanguages[number];
