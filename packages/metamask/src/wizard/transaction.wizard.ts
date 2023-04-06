import { TransactionPage } from '~/pages/transaction';
import { BaseWizard } from '~/wizard/base.wizard';

export class TransactionWizard extends BaseWizard {
  public async approve(): Promise<void> {
    const page = await this.playwright.openExtensionPopup();
    const transactionPage = new TransactionPage(page);

    await transactionPage.approveTransaction();
    await this.playwright.cleanup();
  }

  public async reject(): Promise<void> {
    const page = await this.playwright.openExtensionPopup();
    const transactionPage = new TransactionPage(page);

    await transactionPage.rejectTransaction();
    await this.playwright.cleanup();
  }
}
