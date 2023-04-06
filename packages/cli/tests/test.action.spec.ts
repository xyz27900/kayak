import process from 'process';
import { testAction } from '~/actions/test.action';

describe('Test test action', () => {
  beforeEach(() => {
    process.env.SEED_PHRASE = 'test test test test test test test test test test test test';
    process.env.PASSWORD = 'test-test';
  });

  it('Should throw an error if runner is not specified', async () => {
    const result = testAction({});
    await expect(result).rejects.toThrowError('Option --cypress or --playwright must be specified');
  });

  it('Should throw an error if both runners are specified', async () => {
    const res = testAction({
      cypress: true,
      playwright: true
    });

    await expect(res).rejects.toThrow('Options --cypress and --playwright cannot be used together');
  });

  it('Should throw an error if SEED_PHRASE is not specified', async () => {
    delete process.env.SEED_PHRASE;
    const res = testAction({ cypress: true });
    await expect(res).rejects.toThrow('Missing SEED_PHRASE environment variable');
  });

  it('Should throw an error if SEED_PHRASE is invalid', async () => {
    process.env.SEED_PHRASE = 'invalid seed phrase';
    const res = testAction({ cypress: true });
    await expect(res).rejects.toThrow('SEED_PHRASE must contain 12 words');
  });

  it('Should throw an error if PASSWORD is not specified', async () => {
    delete process.env.PASSWORD;
    const res = testAction({ cypress: true });
    await expect(res).rejects.toThrow('Missing PASSWORD environment variable');
  });

  it('Should throw an error if PASSWORD is invalid', async () => {
    process.env.PASSWORD = 'invalid';
    const res = testAction({ cypress: true });
    await expect(res).rejects.toThrow('PASSWORD must be at least 8 characters');
  });
});
