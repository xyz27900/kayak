import { BasePage } from '~/pages/base.page';
import { dataTestId } from '~/utils';

const transactionPage = {
  self: '.confirm-page-container-content',
  cancelButton: dataTestId('page-container-footer-cancel'),
  confirmDisconnectButton: dataTestId('page-container-footer-next')
} as const;

export class TransactionPage extends BasePage {
  public async approveTransaction(): Promise<void> {
    await this.page.waitForSelector(transactionPage.self);
    await this.page.click(transactionPage.confirmDisconnectButton);
  }

  public async rejectTransaction(): Promise<void> {
    await this.page.waitForSelector(transactionPage.self);
    await this.page.click(transactionPage.cancelButton);
  }
}
