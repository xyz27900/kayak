import { MainPage } from '~/pages/main';
import { AccountData } from '~/types';
import { BaseWizard } from '~/wizard/base.wizard';

export class AccountWizard extends BaseWizard {
  public async add(accountName: string): Promise<void> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    await mainPage.openAccountMenu()
      .then((menu) => menu.openAddAccountScreen())
      .then((screen) => screen.addAccount(accountName))
      .then(() => MainPage.waitFor(page));

    await this.playwright.cleanup();
  }

  public async import(privateKey: string): Promise<void> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    await mainPage.openAccountMenu()
      .then((menu) => menu.openImportAccountScreen())
      .then((screen) => screen.importAccount(privateKey));

    await this.playwright.cleanup();
  }

  public async switch(accountName: string): Promise<void> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    await mainPage.openAccountMenu()
      .then((menu) => menu.switchAccount(accountName));

    await this.playwright.cleanup();
  }

  public async getData(): Promise<AccountData> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    const accountDetailScreen = await mainPage.openOptionsMenu().then((menu) => menu.openAccountDetails());
    const accountName = await accountDetailScreen.getAccountName();
    const accountAddress = await accountDetailScreen.getAccountAddress();

    await this.playwright.cleanup();

    return {
      accountName,
      accountAddress
    };
  }
}
