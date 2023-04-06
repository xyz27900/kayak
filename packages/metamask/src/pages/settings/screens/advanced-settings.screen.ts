import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';

const advancedSettingsScreen = {
  self: '.settings-page__body',
  showTestNetsItem: '.settings-page__content-row:nth-child(8)',
  label: 'label.toggle-button',
  checkbox: 'input[type="checkbox"]'
};

export class AdvancedSettingScreen extends BasePage {
  public static async waitFor(page: Page): Promise<AdvancedSettingScreen> {
    await page.waitForSelector(advancedSettingsScreen.self);
    return new AdvancedSettingScreen(page);
  }

  public async toggleTestNetsVisibility(show?: boolean): Promise<void> {
    const showTestNetsItem = await this.page.locator(advancedSettingsScreen.showTestNetsItem);
    const label = await showTestNetsItem.locator(advancedSettingsScreen.label);
    const checkbox = await showTestNetsItem.locator(advancedSettingsScreen.checkbox);
    const isChecked = await checkbox.isChecked();

    if (isChecked !== show) {
      await label.click();
    }
  }
}
