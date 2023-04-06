import { BasePage } from '~/pages/base.page';
import { EndOfFlowScreen } from '~/pages/welcome/screens/end-flow.screen';
import { dataTestId } from '~/utils';

const importWalletScreen = {
  phraseWordInput: (index: number): string => `.create-new-vault__form ${dataTestId(`import-srp__srp-word-${index}`)}`,
  passwordInput: '.create-new-vault__form #password',
  confirmPasswordInput: '.create-new-vault__form #confirm-password',
  termsCheckbox: dataTestId('create-new-vault__terms-checkbox'),
  importButton: '.create-new-vault__submit-button'
} as const;

export class ImportWalletScreen extends BasePage {
  public async import(seedPhrase: string, password: string): Promise<EndOfFlowScreen> {
    const words = seedPhrase.split(' ');
    for (let i = 0; i < words.length; i++) {
      const selector = importWalletScreen.phraseWordInput(i);
      await this.page.type(selector, words[i]);
    }

    await this.page.type(importWalletScreen.passwordInput, password);
    await this.page.type(importWalletScreen.confirmPasswordInput, password);

    await this.page.click(importWalletScreen.termsCheckbox);
    await this.page.click(importWalletScreen.importButton);

    return EndOfFlowScreen.waitFor(this.page);
  }
}
