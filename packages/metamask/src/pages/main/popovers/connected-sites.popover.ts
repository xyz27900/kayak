import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';

export const connectedSitesPopover = {
  self: 'section.connected-sites',
  connectedSiteItem: '.connected-sites-list__content-row',
  disconnectButton: 'a.connected-sites-list__content-row-link-button',
  confirmDisconnectButton: '.connected-sites__footer-row button:nth-child(2)'
} as const;

export class ConnectedSitesPopover extends BasePage {
  public static async waitFor(page: Page): Promise<ConnectedSitesPopover> {
    await page.waitForSelector(connectedSitesPopover.self);
    return new ConnectedSitesPopover(page);
  }

  public async disconnect(url: string): Promise<void> {
    const siteItem = await this.page.locator(connectedSitesPopover.connectedSiteItem, { hasText: url });
    const disconnectButton = siteItem.locator(connectedSitesPopover.disconnectButton);
    await disconnectButton.click();
    await this.page.click(connectedSitesPopover.confirmDisconnectButton);
  }
}
