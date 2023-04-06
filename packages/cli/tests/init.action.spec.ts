import fs from 'fs';
import path from 'path';
import process from 'process';
import prompts from 'prompts';
import { initAction } from '~/actions/init.action';

jest.mock('fs');
jest.spyOn(process, 'cwd').mockReturnValue('/project');

describe('Test "init" action', () => {
  beforeEach(async () => {
    process.env = {};

    const content = await fs.promises.readdir('/project');
    for (const item of content) {
      const stat = await fs.promises.stat(path.resolve('/project', item));
      if (stat.isDirectory()) {
        await fs.promises.rm(item, { recursive: true });
      } else if (stat.isFile()) {
        await fs.promises.unlink(item);
      }
    }

    await fs.promises.writeFile('/project/package.json', '{}');
  });

  it('Should throw an error if both runners are specified', async () => {
    const result = initAction({
      cypress: true,
      playwright: true
    });

    await expect(result).rejects.toThrow('Options --cypress and --playwright cannot be used together');
  });

  it('Should throw an error if runner is invalid', async () => {
    prompts.inject(['invalid']);
    const result = initAction({});
    await expect(result).rejects.toThrow('Invalid test runner "invalid"');
  });

  it('Should throw an error if language is invalid', async () => {
    prompts.inject(['cypress', 'invalid']);
    const result = initAction({});
    await expect(result).rejects.toThrow('Invalid language "invalid"');
  });

  it('Should throw an error if package.json does not exist', async () => {
    await fs.promises.unlink('/project/package.json');
    prompts.inject(['cypress', 'ts']);
    const result = initAction({});
    await expect(result).rejects.toThrow('Unable to find package.json');
  });

  it('Should create a new Cypress project if "cypress" is passed as a parameter', async () => {
    prompts.inject(['ts']);
    await initAction({ cypress: true });
    const kayakConfig = await fs.promises.readFile('/project/kayak.config.ts', { encoding: 'utf-8' });
    expect(kayakConfig).toEqual('Kayak Config Cypress TS');
  });

  it('Should create a new Playwright project if "playwright" is passed as a parameter', async () => {
    prompts.inject(['ts']);
    await initAction({ playwright: true });
    const kayakConfig = await fs.promises.readFile('/project/kayak.config.ts', { encoding: 'utf-8' });
    expect(kayakConfig).toEqual('Kayak Config Playwright TS');
  });

  it('Should init a new Cypress JavaScript project [Development Mode]', async () => {
    process.env.KAYAK_DEBUG = 'true';

    prompts.inject(['cypress', 'js']);
    await initAction({});

    const dirContent = await fs.promises.readdir('/project');
    expect(dirContent).toEqual(['.env.kayak', '.kayak', 'kayak.config.js', 'package.json']);

    const kayakConfig = await fs.promises.readFile('/project/kayak.config.js', { encoding: 'utf-8' });
    const dockerfile = await fs.promises.readFile('/project/.kayak/Dockerfile', { encoding: 'utf-8' });
    const dockerComposeFile = await fs.promises.readFile('/project/.kayak/docker-compose.yaml', { encoding: 'utf-8' });
    const packageJson = JSON.parse(await fs.promises.readFile('/project/package.json', { encoding: 'utf-8' }));

    expect(kayakConfig).toEqual('Kayak Config Cypress JS');
    expect(dockerfile).toEqual('Dockerfile Cypress Development');
    expect(dockerComposeFile).toEqual('Docker Compose');
    expect(packageJson).toEqual(
      expect.objectContaining({
        scripts: {
          kayak: 'kayak test --cypress'
        },
        devDependencies: {
          'cypress-dependency-1': '*',
          'cypress-dependency-2': '*'
        }
      })
    );
  });

  it('Should init a new Cypress JavaScript project [Production Mode]', async () => {
    prompts.inject(['cypress', 'js']);
    await initAction({});

    const dirContent = await fs.promises.readdir('/project');
    expect(dirContent).toEqual(['.env.kayak', '.kayak', 'kayak.config.js', 'package.json']);

    const kayakConfig = await fs.promises.readFile('/project/kayak.config.js', { encoding: 'utf-8' });
    const dockerfile = await fs.promises.readFile('/project/.kayak/Dockerfile', { encoding: 'utf-8' });
    const dockerComposeFile = await fs.promises.readFile('/project/.kayak/docker-compose.yaml', { encoding: 'utf-8' });
    const packageJson = JSON.parse(await fs.promises.readFile('/project/package.json', { encoding: 'utf-8' }));

    expect(kayakConfig).toEqual('Kayak Config Cypress JS');
    expect(dockerfile).toEqual('Dockerfile Cypress Production');
    expect(dockerComposeFile).toEqual('Docker Compose');
    expect(packageJson).toEqual(
      expect.objectContaining({
        scripts: {
          kayak: 'kayak test --cypress'
        },
        devDependencies: {
          'cypress-dependency-1': '1.0.0',
          'cypress-dependency-2': '1.0.0'
        }
      })
    );
  });

  it('Should init a new Cypress TypeScript project [Development Mode]', async () => {
    process.env.KAYAK_DEBUG = 'true';

    prompts.inject(['cypress', 'ts']);
    await initAction({});

    const dirContent = await fs.promises.readdir('/project');
    expect(dirContent).toEqual(['.env.kayak', '.kayak', 'kayak.config.ts', 'package.json']);

    const kayakConfig = await fs.promises.readFile('/project/kayak.config.ts', { encoding: 'utf-8' });
    const dockerfile = await fs.promises.readFile('/project/.kayak/Dockerfile', { encoding: 'utf-8' });
    const dockerComposeFile = await fs.promises.readFile('/project/.kayak/docker-compose.yaml', { encoding: 'utf-8' });
    const packageJson = JSON.parse(await fs.promises.readFile('/project/package.json', { encoding: 'utf-8' }));

    expect(kayakConfig).toEqual('Kayak Config Cypress TS');
    expect(dockerfile).toEqual('Dockerfile Cypress Development');
    expect(dockerComposeFile).toEqual('Docker Compose');
    expect(packageJson).toEqual(
      expect.objectContaining({
        scripts: {
          kayak: 'kayak test --cypress'
        },
        devDependencies: {
          'cypress-dependency-1': '*',
          'cypress-dependency-2': '*'
        }
      })
    );
  });

  it('Should init a new Cypress TypeScript project [Production Mode]', async () => {
    prompts.inject(['cypress', 'ts']);
    await initAction({});

    const dirContent = await fs.promises.readdir('/project');
    expect(dirContent).toEqual(['.env.kayak', '.kayak', 'kayak.config.ts', 'package.json']);

    const kayakConfig = await fs.promises.readFile('/project/kayak.config.ts', { encoding: 'utf-8' });
    const dockerfile = await fs.promises.readFile('/project/.kayak/Dockerfile', { encoding: 'utf-8' });
    const dockerComposeFile = await fs.promises.readFile('/project/.kayak/docker-compose.yaml', { encoding: 'utf-8' });
    const packageJson = JSON.parse(await fs.promises.readFile('/project/package.json', { encoding: 'utf-8' }));

    expect(kayakConfig).toEqual('Kayak Config Cypress TS');
    expect(dockerfile).toEqual('Dockerfile Cypress Production');
    expect(dockerComposeFile).toEqual('Docker Compose');
    expect(packageJson).toEqual(
      expect.objectContaining({
        scripts: {
          kayak: 'kayak test --cypress'
        },
        devDependencies: {
          'cypress-dependency-1': '1.0.0',
          'cypress-dependency-2': '1.0.0'
        }
      })
    );
  });

  it('Should init a new Playwright JavaScript project [Development Mode]', async () => {
    process.env.KAYAK_DEBUG = 'true';

    prompts.inject(['playwright', 'js']);
    await initAction({});
    const dirContent = await fs.promises.readdir('/project');
    expect(dirContent).toEqual(['.env.kayak', '.kayak', 'kayak.config.js', 'package.json']);

    const kayakConfig = await fs.promises.readFile('/project/kayak.config.js', { encoding: 'utf-8' });
    const dockerfile = await fs.promises.readFile('/project/.kayak/Dockerfile', { encoding: 'utf-8' });
    const dockerComposeFile = await fs.promises.readFile('/project/.kayak/docker-compose.yaml', { encoding: 'utf-8' });
    const packageJson = JSON.parse(await fs.promises.readFile('/project/package.json', { encoding: 'utf-8' }));

    expect(kayakConfig).toEqual('Kayak Config Playwright JS');
    expect(dockerfile).toEqual('Dockerfile Playwright Development');
    expect(dockerComposeFile).toEqual('Docker Compose');
    expect(packageJson).toEqual(
      expect.objectContaining({
        scripts: {
          kayak: 'kayak test --playwright'
        },
        devDependencies: {
          'playwright-dependency-1': '*',
          'playwright-dependency-2': '*'
        }
      })
    );
  });

  it('Should init a new Playwright JavaScript project [Production Mode]', async () => {
    prompts.inject(['playwright', 'js']);
    await initAction({});

    const dirContent = await fs.promises.readdir('/project');
    expect(dirContent).toEqual(['.env.kayak', '.kayak', 'kayak.config.js', 'package.json']);

    const kayakConfig = await fs.promises.readFile('/project/kayak.config.js', { encoding: 'utf-8' });
    const dockerfile = await fs.promises.readFile('/project/.kayak/Dockerfile', { encoding: 'utf-8' });
    const dockerComposeFile = await fs.promises.readFile('/project/.kayak/docker-compose.yaml', { encoding: 'utf-8' });
    const packageJson = JSON.parse(await fs.promises.readFile('/project/package.json', { encoding: 'utf-8' }));

    expect(kayakConfig).toEqual('Kayak Config Playwright JS');
    expect(dockerfile).toEqual('Dockerfile Playwright Production');
    expect(dockerComposeFile).toEqual('Docker Compose');
    expect(packageJson).toEqual(
      expect.objectContaining({
        scripts: {
          kayak: 'kayak test --playwright'
        },
        devDependencies: {
          'playwright-dependency-1': '1.0.0',
          'playwright-dependency-2': '1.0.0'
        }
      })
    );
  });

  it('Should init a new Playwright TypeScript project [Development Mode]', async () => {
    process.env.KAYAK_DEBUG = 'true';

    prompts.inject(['playwright', 'ts']);
    await initAction({});

    const dirContent = await fs.promises.readdir('/project');
    expect(dirContent).toEqual(['.env.kayak', '.kayak', 'kayak.config.ts', 'package.json']);

    const kayakConfig = await fs.promises.readFile('/project/kayak.config.ts', { encoding: 'utf-8' });
    const dockerfile = await fs.promises.readFile('/project/.kayak/Dockerfile', { encoding: 'utf-8' });
    const dockerComposeFile = await fs.promises.readFile('/project/.kayak/docker-compose.yaml', { encoding: 'utf-8' });
    const packageJson = JSON.parse(await fs.promises.readFile('/project/package.json', { encoding: 'utf-8' }));

    expect(kayakConfig).toEqual('Kayak Config Playwright TS');
    expect(dockerfile).toEqual('Dockerfile Playwright Development');
    expect(dockerComposeFile).toEqual('Docker Compose');
    expect(packageJson).toEqual(
      expect.objectContaining({
        scripts: {
          kayak: 'kayak test --playwright'
        },
        devDependencies: {
          'playwright-dependency-1': '*',
          'playwright-dependency-2': '*'
        }
      })
    );
  });

  it('Should init a new Playwright TypeScript project [Production Mode]', async () => {
    prompts.inject(['playwright', 'ts']);
    await initAction({});

    const dirContent = await fs.promises.readdir('/project');
    expect(dirContent).toEqual(['.env.kayak', '.kayak', 'kayak.config.ts', 'package.json']);

    const kayakConfig = await fs.promises.readFile('/project/kayak.config.ts', { encoding: 'utf-8' });
    const dockerfile = await fs.promises.readFile('/project/.kayak/Dockerfile', { encoding: 'utf-8' });
    const dockerComposeFile = await fs.promises.readFile('/project/.kayak/docker-compose.yaml', { encoding: 'utf-8' });
    const packageJson = JSON.parse(await fs.promises.readFile('/project/package.json', { encoding: 'utf-8' }));

    expect(kayakConfig).toEqual('Kayak Config Playwright TS');
    expect(dockerfile).toEqual('Dockerfile Playwright Production');
    expect(dockerComposeFile).toEqual('Docker Compose');
    expect(packageJson).toEqual(
      expect.objectContaining({
        scripts: {
          kayak: 'kayak test --playwright'
        },
        devDependencies: {
          'playwright-dependency-1': '1.0.0',
          'playwright-dependency-2': '1.0.0'
        }
      })
    );
  });
});
