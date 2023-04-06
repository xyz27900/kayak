import { Page } from '@playwright/test';
import { BasePage } from '~/pages/base.page';
import { modal } from '~/pages/common.elements';
import { NetworkParams } from '~/types';
import { dataTestId } from '~/utils';

const networksScreen = {
  self: '.networks-tab__body',
  networkItem: '.networks-tab__networks-list-item',
  addNetworkButton: '.networks-tab__add-network-header-button-wrapper button',
  addNetworkManuallyButton: dataTestId('add-network-manually'),
  networkNameInput: '.networks-tab__add-network-form-body .form-field:nth-child(1) input',
  rpcUrlInput: '.networks-tab__add-network-form-body .form-field:nth-child(2) input',
  chainIdInput: '.networks-tab__add-network-form-body .form-field:nth-child(3) input',
  currencySymbolInput: '.networks-tab__add-network-form-body .form-field:nth-child(4) input',
  blockExplorerUrlInput: '.networks-tab__add-network-form-body .form-field:nth-child(5) input',
  deleteButton: '.networks-tab__network-form-footer button:nth-child(1)',
  cancelButton: '.networks-tab__add-network-form-footer button:nth-child(1)',
  saveButton: '.networks-tab__add-network-form-footer button:nth-child(2)'
} as const;

export class NetworksScreen extends BasePage {
  public static async waitFor(page: Page): Promise<NetworksScreen> {
    await page.waitForSelector(networksScreen.self);
    return new NetworksScreen(page);
  }

  public async addNetwork(args: NetworkParams): Promise<void> {
    await this.page.click(networksScreen.addNetworkButton);
    await this.page.click(networksScreen.addNetworkManuallyButton);

    await this.page.type(networksScreen.networkNameInput, args.name);
    await this.page.type(networksScreen.rpcUrlInput, args.rpcUrl);
    await this.page.type(networksScreen.chainIdInput, `${args.chainId}`);
    await this.page.type(networksScreen.currencySymbolInput, args.currencySymbol);

    if (args.blockExplorerUrl) {
      await this.page.type(networksScreen.blockExplorerUrlInput, args.blockExplorerUrl);
    }

    await this.page.click(networksScreen.saveButton);
  }

  public async deleteNetwork(networkName: string): Promise<void> {
    const networkItem = await this.page.locator(networksScreen.networkItem, { hasText: networkName });
    await networkItem.click();
    await this.page.click(networksScreen.deleteButton);

    await this.page.waitForSelector(modal.self);
    await this.page.click(modal.rightButton);
  }
}
