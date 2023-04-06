import { MainPage } from '~/pages/main';
import { NetworkParams } from '~/types';
import { BaseWizard } from '~/wizard/base.wizard';

export class NetworkWizard extends BaseWizard {
  public async add(args: NetworkParams): Promise<void> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    await mainPage.openAccountMenu()
      .then((menu) => menu.openSettings())
      .then((settingsPage) => settingsPage.openNetworksSettings())
      .then((networksScreen) => networksScreen.addNetwork(args));

    await this.playwright.cleanup();
  }

  public async delete(networkName: string): Promise<void> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    await mainPage.openAccountMenu()
      .then((menu) => menu.openSettings())
      .then((settingsPage) => settingsPage.openNetworksSettings())
      .then((networksScreen) => networksScreen.deleteNetwork(networkName));

    await this.playwright.cleanup();
  }

  public async switch(networkName: string): Promise<void> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    await mainPage.openNetworkSwitcherMenu()
      .then((menu) => menu.switchNetwork(networkName));

    await this.playwright.cleanup();
  }

  public async getName(): Promise<string> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    const network = await mainPage.openNetworkSwitcherMenu()
      .then((menu) => menu.getNetwork());

    await this.playwright.cleanup();

    return network;
  }

  public async toggleTestNetsVisibility(show?: boolean): Promise<void> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    await mainPage.openAccountMenu()
      .then((menu) => menu.openSettings())
      .then((settingsPage) => settingsPage.openAdvancedSettings())
      .then((advancedSettingsScreen) => advancedSettingsScreen.toggleTestNetsVisibility(show));

    await this.playwright.cleanup();
  }
}
