import fs from 'fs';
import os from 'os';
import path from 'path';
import process from 'process';
import { logger } from '@kayak/core';
import prompts, { Answers, PromptObject } from 'prompts';
import { templates } from '~/templates';
import { KayakLanguage, kayakLanguages, KayakTestRunner, kayakTestRunners } from '~/types';

interface InitActionOptions {
  cypress?: boolean;
  playwright?: boolean;
  javascript?: boolean;
  typescript?: boolean;
}

export const initAction = async (options: InitActionOptions): Promise<void> => {
  const cwd = process.cwd();
  const isCI = !!process.env.CI;

  if (options.cypress && options.playwright) {
    throw new Error('Options --cypress and --playwright cannot be used together');
  }

  if(options.javascript && options.typescript) {
    throw new Error('Options --javascript and --typescript cannot be used together');
  }

  const isRunnerSpecified = options.cypress || options.playwright;
  const isLanguageSpecified = options.javascript || options.typescript;

  if (isCI && !isRunnerSpecified) {
    throw new Error('Test runner must be specified in CI');
  }

  if (isCI && !isLanguageSpecified) {
    throw new Error('Language must be specified in CI');
  }

  if (isCI && !process.env.SEED_PHRASE) {
    throw new Error('Seed phrase must be specified in CI');
  }

  if (isCI && !process.env.PASSWORD) {
    throw new Error('Password must be specified in CI');
  }

  const testRunnerQuestion: PromptObject<'testRunner'> = {
    type: 'select',
    name: 'testRunner',
    message: 'Which test runner do you want to use?',
    choices: [
      {
        title: 'Cypress',
        value: 'cypress'
      },
      {
        title: 'Playwright',
        value: 'playwright'
      }
    ]
  };

  const languageQuestion: PromptObject<'language'> = {
    type: 'select',
    name: 'language',
    message: 'Which language do you want to use?',
    choices: [
      {
        title: 'TypeScript',
        value: 'typescript'
      },
      {
        title: 'JavaScript',
        value: 'javascript'
      }
    ]
  };

  const seedPhraseQuestion: PromptObject<'seedPhrase'> = {
    type: 'text',
    name: 'seedPhrase',
    initial: 'test test test test test test test test test test test junk',
    message: 'Enter the seed phrase for your test account:',
    validate: (value: string) => {
      const words = value.split(' ').map((word) => word.trim());
      if (words.length !== 12) {
        return 'Seed phrase must contain 12 words';
      }

      if (words.some((word) => word.length === 0)) {
        return 'Seed phrase cannot contain empty words';
      }

      return true;
    }
  };

  const passwordQuestion: PromptObject<'password'> = {
    type: 'text',
    name: 'password',
    initial: 'test-test',
    message: 'Enter the password for MetaMask:',
    validate: (value: string) => {
      if (value.trim().length < 8) {
        return 'Password must be at least 8 characters long';
      }

      return true;
    }
  };

  const commonQuestions = [seedPhraseQuestion, passwordQuestion];

  const questions: PromptObject[] = [
    ...(!isRunnerSpecified ? [testRunnerQuestion] : []),
    ...(!isLanguageSpecified ? [languageQuestion] : []),
    ...commonQuestions
  ];

  let result: Partial<Answers<'testRunner' | 'language' | 'seedPhrase' | 'password'>> = {};
  let seedPhrase: string;
  let password: string;

  if (!isCI) {
    result = await prompts(
      questions,
      {
        onCancel: () => {
          throw new Error('Operation cancelled');
        }
      }
    );

    seedPhrase = result.seedPhrase as string;
    password = result.password as string;
  } else {
    seedPhrase = process.env.SEED_PHRASE as string;
    password = process.env.PASSWORD as string;
  }

  const testRunner = isRunnerSpecified
    ? Object.keys(options).find((key) => kayakTestRunners.includes(key as KayakTestRunner)) as KayakTestRunner
    : result.testRunner;

  const language = isLanguageSpecified
    ? Object.keys(options).find((key) => kayakLanguages.includes(key as KayakLanguage)) as KayakLanguage
    : result.language;

  /* Validate result */
  if (!kayakTestRunners.includes(testRunner)) {
    throw new Error(`Invalid test runner "${testRunner}"`);
  }

  if (!kayakLanguages.includes(language)) {
    throw new Error(`Invalid language "${language}"`);
  }

  createConfigFile({
    cwd,
    testRunner,
    language
  });

  setupEnvironment({
    cwd,
    seedPhrase,
    password
  });

  updateGitignore(cwd);
  createDockerSetup(cwd);

  if (!templates.isDebug) {
    updatePackageJson({
      cwd,
      testRunner
    });
  }

  const message = `You are almost ready to go!\nNow you need to install dependencies:\n\n  ${logger.format('npm install', 'cyan')}\n\nIf you need to add more services for testing (for example, your backend), just edit the ${logger.format('.kayak/docker-compose.yaml', 'cyan')} file.`;
  process.stdout.write('\n' + message + '\n');
};

interface CreateConfigFileOptions {
  cwd: string;
  testRunner: KayakTestRunner;
  language: KayakLanguage;
}

const createConfigFile = ({ cwd, testRunner, language }: CreateConfigFileOptions): void => {
  const configFilePath = templates.getConfigFile(testRunner, language);
  const configFileName = path.basename(configFilePath);
  fs.copyFileSync(configFilePath, path.resolve(cwd, configFileName));
};

interface SetupEnvironmentOptions {
  cwd: string;
  seedPhrase: string;
  password: string;
}

const setupEnvironment = ({ cwd, seedPhrase, password }: SetupEnvironmentOptions): void => {
  const absoluteEnvFilePath = path.resolve(cwd, '.env.kayak');

  const envFileContent = [
    `SEED_PHRASE="${seedPhrase}"`,
    `PASSWORD="${password}"`
  ].join(os.EOL);

  fs.writeFileSync(absoluteEnvFilePath, envFileContent + os.EOL);
};

const updateGitignore = (cwd: string): void => {
  const absoluteGitignorePath = path.resolve(cwd, '.gitignore');

  const gitignoreContent = fs.existsSync(absoluteGitignorePath)
    ? fs.readFileSync(absoluteGitignorePath, { encoding: 'utf-8' })
    : '';

  const shouldUpdateGitignore = !gitignoreContent.includes('*.kayak');
  if (!shouldUpdateGitignore) {
    return;
  }

  fs.appendFileSync(absoluteGitignorePath, '*.kayak' + os.EOL, { encoding: 'utf-8' });
};

const createDockerSetup = (cwd: string): void => {
  const dockerSetupDir = path.resolve(cwd, '.kayak');

  const dockerfilePath = templates.getDockerfile();
  const dockerComposeFilePath = templates.dockerComposeFile;

  if (!fs.existsSync(dockerSetupDir)) {
    fs.mkdirSync(dockerSetupDir);
  }

  fs.copyFileSync(dockerfilePath, path.resolve(dockerSetupDir, 'Dockerfile'));
  fs.copyFileSync(dockerComposeFilePath, path.resolve(dockerSetupDir, 'docker-compose.yaml'));
};

interface UpdatePackageJsonOptions {
  cwd: string;
  testRunner: KayakTestRunner;
}

const updatePackageJson = ({ cwd, testRunner }: UpdatePackageJsonOptions): void => {
  const dependenciesFilePath = templates.getDependencies(testRunner);
  const packageJsonFilePath = path.resolve(cwd, 'package.json');

  if (!fs.existsSync(packageJsonFilePath)) {
    throw new Error('Unable to find package.json');
  }

  const dependenciesFileContent = fs.readFileSync(dependenciesFilePath, { encoding: 'utf-8' });
  const packageJsonFileContent = fs.readFileSync(packageJsonFilePath, { encoding: 'utf-8' });

  const dependencies = JSON.parse(dependenciesFileContent);
  const packageJson = JSON.parse(packageJsonFileContent);

  packageJson.scripts = {
    ...packageJson.scripts,
    kayak: `kayak test --${testRunner}`
  };

  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...dependencies
  };

  fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJson, null, 2) + os.EOL);
};
