import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';
import { AddAccountScreen } from '~/pages/main/screens/add-account.screen';
import { ImportAccountScreen } from '~/pages/main/screens/import-account.screen';
import { SettingsPage } from '~/pages/settings';
import { dataTestId } from '~/utils';

const accountMenu = {
  self: '.account-menu',
  button: dataTestId('account-menu-icon'),
  addAccountItem: '.account-menu__item--clickable:nth-child(6)',
  importAccountItem: '.account-menu__item--clickable:nth-child(7)',
  accountItem: '.account-menu__account',
  settingsItem: '.account-menu__item--clickable:nth-child(11)'
};

export class AccountMenu extends BasePage {
  public static async open(page: Page): Promise<AccountMenu> {
    await page.click(accountMenu.button);
    await page.waitForSelector(accountMenu.self);
    return new AccountMenu(page);
  }

  public async openAddAccountScreen(): Promise<AddAccountScreen> {
    await this.page.click(accountMenu.addAccountItem);
    return new AddAccountScreen(this.page);
  }

  public async openImportAccountScreen(): Promise<ImportAccountScreen> {
    await this.page.click(accountMenu.importAccountItem);
    return new ImportAccountScreen(this.page);
  }

  public async switchAccount(accountName: string): Promise<void> {
    const accountItem = this.page.locator(accountMenu.accountItem, { hasText: accountName });
    await accountItem.click();
  }

  public async openSettings(): Promise<SettingsPage> {
    await this.page.click(accountMenu.settingsItem);
    return SettingsPage.waitFor(this.page);
  }
}
