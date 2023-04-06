import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';
import { AdvancedSettingScreen } from '~/pages/settings/screens/advanced-settings.screen';
import { NetworksScreen } from '~/pages/settings/screens/networks.screen';

const settingsSidebar = {
  self: '.settings-page',
  advancedItem: '.settings-page__content__tabs .tab-bar__tab:nth-child(2)',
  networksItem: '.settings-page__content__tabs .tab-bar__tab:nth-child(6)'
} as const;

export class SettingsPage extends BasePage {
  public static async waitFor(page: Page): Promise<SettingsPage> {
    await page.waitForSelector(settingsSidebar.self);
    return new SettingsPage(page);
  }

  public async openAdvancedSettings(): Promise<AdvancedSettingScreen> {
    await this.page.waitForSelector(settingsSidebar.self);
    await this.page.click(settingsSidebar.advancedItem);
    return AdvancedSettingScreen.waitFor(this.page);
  }

  public async openNetworksSettings(): Promise<NetworksScreen> {
    await this.page.waitForSelector(settingsSidebar.self);
    await this.page.click(settingsSidebar.networksItem);
    return NetworksScreen.waitFor(this.page);
  }
}
