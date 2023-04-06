import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';

const accountDetailsModal = {
  self: '.account-details-modal',
  accountName: '.account-modal__container .editable-label__value',
  address: '.account-modal__container .qr-code__address',
  closeButton: '.account-modal__container .account-modal__close'
} as const;

export class AccountDetailsModal extends BasePage {
  public static async waitFor(page: Page): Promise<AccountDetailsModal> {
    await page.waitForSelector(accountDetailsModal.self);
    return new AccountDetailsModal(page);
  }

  public async close(): Promise<void> {
    await this.page.click(accountDetailsModal.closeButton);
  }

  public async getAccountName(): Promise<string> {
    const textContent = await this.page.textContent(accountDetailsModal.accountName);
    return textContent?.trim().toLowerCase() ?? '';
  }

  public async getAccountAddress(): Promise<string> {
    const textContent = await this.page.textContent(accountDetailsModal.address);
    return textContent?.trim() ?? '';
  }
}
