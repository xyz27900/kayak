import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';
import { AccountMenu } from '~/pages/main/menus/account.menu';
import { NetworkSwitcherMenu } from '~/pages/main/menus/network-switcher.menu';
import { OptionsMenu } from '~/pages/main/menus/options.menu';

const mainPage = {
  self: '.home__container'
} as const;

export class MainPage extends BasePage {
  public static async waitFor(page: Page): Promise<void> {
    await page.waitForSelector(mainPage.self);
  }

  public async openNetworkSwitcherMenu(): Promise<NetworkSwitcherMenu> {
    return await NetworkSwitcherMenu.open(this.page);
  }

  public async openAccountMenu(): Promise<AccountMenu> {
    return await AccountMenu.open(this.page);
  }

  public async openOptionsMenu(): Promise<OptionsMenu> {
    return await OptionsMenu.open(this.page);
  }
}
