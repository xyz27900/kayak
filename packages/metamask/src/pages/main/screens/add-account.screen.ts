import { BasePage } from '~/pages/base.page';

const addAccountScreen = {
  self: '.new-account-create-form',
  nameInput: '.new-account-create-form__input',
  cancelButton: '.new-account-create-form__buttons button:nth-child(1)',
  createButton: '.new-account-create-form__buttons button:nth-child(2)'
} as const;

export class AddAccountScreen extends BasePage {
  public async addAccount(accountName: string): Promise<void> {
    await this.page.type(addAccountScreen.nameInput, accountName);
    await this.page.click(addAccountScreen.createButton);
  }

  public async cancel(): Promise<void> {
    await this.page.click(addAccountScreen.cancelButton);
  }
}
