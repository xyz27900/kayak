import { BasePage } from '~/pages/base.page';
import { dataTestId } from '~/utils';

const signaturePage = {
  self: {
    legacy: '.request-signature__container',
    modern: '.signature-request'
  },
  scrollButton: dataTestId('signature-request-scroll-button'),
  cancelButton: {
    legacy: '.request-signature__footer button:nth-child(1)',
    modern: dataTestId('signature-cancel-button')
  },
  signButton: {
    legacy: dataTestId('request-signature__sign'),
    modern: dataTestId('signature-sign-button')
  }
} as const;

export class SignaturePage extends BasePage {
  public async approveSignature(): Promise<void> {
    const signButton = await Promise.race([
      this.page.waitForSelector(signaturePage.self.legacy).then(() => signaturePage.signButton.legacy),
      this.page.waitForSelector(signaturePage.self.modern).then(() => signaturePage.signButton.modern)
    ]);

    while (await this.page.isDisabled(signButton)) {
      await this.page.click(signaturePage.scrollButton);
    }

    await this.page.click(signButton);
  }

  public async rejectSignature(): Promise<void> {
    const cancelButton = await Promise.race([
      this.page.waitForSelector(signaturePage.self.legacy).then(() => signaturePage.cancelButton.legacy),
      this.page.waitForSelector(signaturePage.self.modern).then(() => signaturePage.cancelButton.modern)
    ]);

    await this.page.click(cancelButton);
  }
}
