import { MainPage } from '~/pages/main';
import { WelcomePage } from '~/pages/welcome';
import { BaseWizard } from '~/wizard/base.wizard';

export class GeneralWizard extends BaseWizard {
  public async setup(seedPhrase: string, password: string): Promise<void> {
    await this.playwright.findMetaMaskExtensionId();
    const page = await this.playwright.findExtensionPage();
    const welcomePage = new WelcomePage(page);

    await welcomePage.completeWelcomeScreen()
      .then((welcomeScreen) => welcomeScreen.confirm())
      .then((metametricsScreen) => metametricsScreen.disableAnalytics())
      .then((chooseFlowScreen) => chooseFlowScreen.importWallet())
      .then((importWalletScreen) => importWalletScreen.import(seedPhrase, password))
      .then((endOfFlowScreen) => endOfFlowScreen.complete());

    await this.playwright.cleanup();
  }

  public async disconnect(url: string): Promise<void> {
    const page = await this.playwright.openExtensionHome();
    const mainPage = new MainPage(page);

    await mainPage.openOptionsMenu()
      .then((optionsMenu) => optionsMenu.openConnectedSites())
      .then((connectedSites) => connectedSites.disconnect(url));

    await this.playwright.cleanup();
  }
}
