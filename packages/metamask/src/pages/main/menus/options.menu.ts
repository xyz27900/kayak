import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';
import { AccountDetailsModal } from '~/pages/main/modals/account-details.modal';
import { ConnectedSitesPopover } from '~/pages/main/popovers/connected-sites.popover';
import { dataTestId } from '~/utils';

const optionsMenu = {
  self: dataTestId('account-options-menu'),
  button: dataTestId('account-options-menu-button'),
  accountDetailsItem: dataTestId('account-options-menu__account-details'),
  connectedSitesItem: dataTestId('account-options-menu__connected-sites')
} as const;

export class OptionsMenu extends BasePage {
  public static async open(page: Page): Promise<OptionsMenu> {
    await page.click(optionsMenu.button);
    await page.waitForSelector(optionsMenu.self);
    return new OptionsMenu(page);
  }

  public async openAccountDetails(): Promise<AccountDetailsModal> {
    await this.page.click(optionsMenu.accountDetailsItem);
    return AccountDetailsModal.waitFor(this.page);
  }

  public async openConnectedSites(): Promise<ConnectedSitesPopover> {
    await this.page.click(optionsMenu.connectedSitesItem);
    return await ConnectedSitesPopover.waitFor(this.page);
  }
}
