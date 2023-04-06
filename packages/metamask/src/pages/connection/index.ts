import { BasePage } from '~/pages/base.page';

const connectionPage = {
  self: '.permissions-connect',
  chooseAccount: {
    cancelButton: '.permissions-connect-choose-account__bottom-buttons button:nth-child(1)',
    connectButton: '.permissions-connect-choose-account__bottom-buttons button:nth-child(2)'
  },
  connect: {
    cancelButton: '.permissions-connect button.page-container__footer-button:nth-child(1)',
    connectButton: '.permissions-connect button.page-container__footer-button:nth-child(2)'
  }
} as const;

export class ConnectionPage extends BasePage {
  public async approveConnection(): Promise<void> {
    await this.page.waitForSelector(connectionPage.self);
    await this.page.click(connectionPage.chooseAccount.connectButton);
    await this.page.click(connectionPage.connect.connectButton);
  }

  public async rejectConnection(): Promise<void> {
    await this.page.waitForSelector(connectionPage.self);

    const cancelButton = await Promise.race([
      this.page.waitForSelector(connectionPage.chooseAccount.cancelButton).then(() => connectionPage.chooseAccount.cancelButton),
      this.page.waitForSelector(connectionPage.connect.cancelButton).then(() => connectionPage.connect.cancelButton)
    ]);

    await this.page.click(cancelButton);
  }
}
