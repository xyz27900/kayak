export const kayakTestRunners = ['cypress', 'playwright'] as const;
export type KayakTestRunner = typeof kayakTestRunners[number];

export const kayakLanguages = ['typescript', 'javascript'] as const;
export type KayakLanguage = typeof kayakLanguages[number];

export const kayakLanguageToExtension: Record<KayakLanguage, string> = {
  typescript: 'ts',
  javascript: 'js'
};
