import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';
import { dataTestId } from '~/utils';

const networkSwitcherMenu = {
  self: dataTestId('network-droppo'),
  button: dataTestId('network-display'),
  listItem: (name: string) => dataTestId(`${name}-network-item`)
} as const;

export class NetworkSwitcherMenu extends BasePage {
  public static async open(page: Page): Promise<NetworkSwitcherMenu> {
    await page.click(networkSwitcherMenu.button);
    await page.waitForSelector(networkSwitcherMenu.self);
    return new NetworkSwitcherMenu(page);
  }

  public async switchNetwork(networkName: string): Promise<void> {
    await this.page.click(networkSwitcherMenu.listItem(networkName));
  }

  public async getNetwork(): Promise<string> {
    return await this.page.textContent(networkSwitcherMenu.button) ?? '';
  }
}
