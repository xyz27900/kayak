import { BasePage } from '~/pages/base.page';

const importAccountScreen = {
  self: '.new-account-import-form',
  privateKeyInput: '.new-account-import-form__input-password',
  cancelButton: '.new-account-import-form__buttons button:nth-child(1)',
  importButton: '.new-account-import-form__buttons button:nth-child(2)'
} as const;

export class ImportAccountScreen extends BasePage {
  public async importAccount(privateKey: string): Promise<void> {
    await this.page.type(importAccountScreen.privateKeyInput, privateKey);
    await this.page.click(importAccountScreen.importButton);
  }

  public async cancel(): Promise<void> {
    await this.page.click(importAccountScreen.cancelButton);
  }
}
