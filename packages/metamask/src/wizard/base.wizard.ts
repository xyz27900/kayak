import { Playwright } from '~/playwright';

export class BaseWizard {
  protected readonly playwright: Playwright;

  constructor(playwright: Playwright) {
    this.playwright = playwright;
  }

  protected performAction<T>(action: () => Promise<T>): Promise<T> {
    return action();
  }
}
