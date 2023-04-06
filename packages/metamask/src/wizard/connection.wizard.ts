import { ConnectionPage } from '~/pages/connection';
import { BaseWizard } from '~/wizard/base.wizard';

export class ConnectionWizard extends BaseWizard {
  public async approve(): Promise<void> {
    const page = await this.playwright.openExtensionPopup();
    const connectionPage = new ConnectionPage(page);

    await connectionPage.approveConnection();
    await this.playwright.cleanup();
  }

  public async reject(): Promise<void> {
    const page = await this.playwright.openExtensionPopup();
    const connectionPage = new ConnectionPage(page);

    await connectionPage.rejectConnection();
    await this.playwright.cleanup();
  }
}
