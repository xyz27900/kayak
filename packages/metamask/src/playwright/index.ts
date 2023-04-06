import { getChromeDebuggerUrl } from '@kayak/core';
import { BrowserContext, chromium, Page } from '@playwright/test';
import { retry } from '~/utils';

export interface InitializeBrowserOptions {
  debuggingPort: number;
  slowMo: number;
}

export class Playwright {
  private contextValue: BrowserContext | null = null;
  private extensionIdValue: string | null = null;

  public get isInitialized(): boolean {
    return !!this.extensionIdValue;
  }

  private get context(): BrowserContext {
    if (!this.contextValue) {
      throw new Error('Context is not initialized');
    } else {
      return this.contextValue;
    }
  }

  public get extensionId(): string {
    if (!this.extensionIdValue) {
      throw new Error('Extension ID is not found');
    } else {
      return this.extensionIdValue;
    }
  }

  private get homePageUrl(): string {
    return `chrome-extension://${this.extensionId}/home.html`;
  }

  private get popupPageUrl(): string {
    return `chrome-extension://${this.extensionId}/popup.html`;
  }

  private async getExtensionPage(): Promise<Page | null> {
    const extensionPageUrl = 'chrome-extension://';
    const pages = this.context.pages();
    return pages.find((page) => page.url().startsWith(extensionPageUrl)) ?? null;
  }

  private async getExtensionPopup(): Promise<Page | null> {
    const pages = this.context.pages();
    return pages.find((page) => page.url().includes('notification')) ?? null;
  }

  public async initializeBrowser(options: InitializeBrowserOptions): Promise<void> {
    try {
      const debuggerUrl = await getChromeDebuggerUrl(options.debuggingPort);
      const browser = await chromium.connectOverCDP(debuggerUrl, { slowMo: options.slowMo });
      this.contextValue = browser.contexts()[0];
    } catch (error) {
      throw new Error(`Could not connect to browser port ${options.debuggingPort}`);
    }
  }

  public async findMetaMaskExtensionId(): Promise<void> {
    const extensionsPage = await this.context.newPage();
    await extensionsPage.goto('chrome://inspect/#extensions');

    const subRowBoxes = await extensionsPage.$$('.row:not(.guest) > .properties-box > .subrow-box > .subrow');
    for (const subRow of subRowBoxes) {
      const name = await subRow.$('.name');
      const url = await subRow.$('.url');
      const nameText = await name?.innerText() ?? '';
      const urlText = await url?.innerText() ?? '';
      const match = urlText.match(/chrome-extension:\/\/([a-z]*)\/background.html/);
      if (nameText === 'MetaMask' && match) {
        this.extensionIdValue = match[1];
        break;
      }
    }

    if (!this.extensionIdValue) {
      throw new Error('MetaMask extension is not found');
    }

    await extensionsPage.close();
  }

  public async findExtensionPage(): Promise<Page> {
    const attempt = async (): Promise<Page> => {
      const page = await this.getExtensionPage();
      if (!page) {
        throw new Error('Could not find extension page');
      } else {
        return page;
      }
    };

    return await retry(attempt);
  }

  public async cleanup(): Promise<void> {
    const pages = this.context.pages();

    const tasks = pages
      .filter((item) => item.url().startsWith('chrome-extension://') || item.url().includes('notification'))
      .map((item) => item.close());

    await Promise.all(tasks);
  }

  public async openExtensionHome(): Promise<Page> {
    const homePage = await this.context.newPage();
    await homePage.goto(this.homePageUrl);
    await homePage.bringToFront();
    return homePage;
  }

  public async openExtensionPopup(): Promise<Page> {
    const popupPage = await this.context.newPage();
    await popupPage.goto(this.popupPageUrl);

    await Promise.all([
      popupPage.waitForSelector('html'),
      popupPage.waitForSelector('body')
    ]);

    const html = await popupPage.$('html');
    const body = await popupPage.$('body');

    await html?.evaluate((node) => node.setAttribute('style', ''));
    await body?.evaluate((node) => node.setAttribute('style', ''));

    return popupPage;
  }
}
