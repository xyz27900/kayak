import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';
import { dataTestId } from '~/utils';

const endOfFlowScreen = {
  self: '.end-of-flow',
  completeButton: dataTestId('EOF-complete-button')
} as const;

export class EndOfFlowScreen extends BasePage {
  public static async waitFor(page: Page): Promise<EndOfFlowScreen> {
    await page.waitForSelector(endOfFlowScreen.self);
    return new EndOfFlowScreen(page);
  }

  public async complete(): Promise<void> {
    await this.page.waitForSelector(endOfFlowScreen.self);
    await this.page.click(endOfFlowScreen.completeButton);
  }
}
