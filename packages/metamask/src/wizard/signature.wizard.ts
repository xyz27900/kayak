import { SignaturePage } from '~/pages/signature';
import { BaseWizard } from '~/wizard/base.wizard';

export class SignatureWizard extends BaseWizard {
  public async approve(): Promise<void> {
    const page = await this.playwright.openExtensionPopup();
    const signaturePage = new SignaturePage(page);

    await signaturePage.approveSignature();
    await this.playwright.cleanup();
  }

  public async reject(): Promise<void> {
    const page = await this.playwright.openExtensionPopup();
    const signaturePage = new SignaturePage(page);

    await signaturePage.rejectSignature();
    await this.playwright.cleanup();
  }
}
