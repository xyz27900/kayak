import { InitializeBrowserOptions, Playwright } from '~/playwright';
import { AccountData, NetworkParams } from '~/types';
import { AccountWizard } from '~/wizard/account.wizard';
import { ConnectionWizard } from '~/wizard/connection.wizard';
import { GeneralWizard } from '~/wizard/general.wizard';
import { NetworkWizard } from '~/wizard/network.wizard';
import { SignatureWizard } from '~/wizard/signature.wizard';
import { TransactionWizard } from '~/wizard/transaction.wizard';

export { NetworkParams, AccountData };

class MetaMask {
  private readonly playwright = new Playwright();
  public readonly account = new AccountWizard(this.playwright);
  public readonly connection = new ConnectionWizard(this.playwright);
  public readonly general = new GeneralWizard(this.playwright);
  public readonly network = new NetworkWizard(this.playwright);
  public readonly signature = new SignatureWizard(this.playwright);
  public readonly transaction = new TransactionWizard(this.playwright);

  public async initWizard(options: InitializeBrowserOptions): Promise<void> {
    await this.playwright.initializeBrowser(options);
  }
}

export const metamask = new MetaMask();
