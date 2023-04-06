import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';
import { ImportWalletScreen } from '~/pages/welcome/screens/import-wallet.screen';
import { dataTestId } from '~/utils';

const chooseFlowScreen = {
  self: '.first-time-flow',
  importWalletButton: `.first-time-flow ${dataTestId('import-wallet-button')}`
} as const;

export class ChooseFlowScreen extends BasePage {
  public static async waitFor(page: Page): Promise<ChooseFlowScreen> {
    await page.waitForSelector(chooseFlowScreen.self);
    return new ChooseFlowScreen(page);
  }

  public async importWallet(): Promise<ImportWalletScreen> {
    await this.page.waitForSelector(chooseFlowScreen.self);
    await this.page.click(chooseFlowScreen.importWalletButton);
    return new ImportWalletScreen(this.page);
  }
}
