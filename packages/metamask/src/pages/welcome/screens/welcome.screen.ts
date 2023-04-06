import { BasePage } from '~/pages/base.page';
import { MetaMetricsScreen } from '~/pages/welcome/screens/metametrics.screen';
import { dataTestId } from '~/utils';

const welcomeScreen = {
  confirmDisconnectButton: dataTestId('first-time-flow__button')
} as const;

export class WelcomeScreen extends BasePage {
  public async confirm(): Promise<MetaMetricsScreen> {
    await this.page.waitForSelector(welcomeScreen.confirmDisconnectButton);
    await this.page.click(welcomeScreen.confirmDisconnectButton);
    return new MetaMetricsScreen(this.page);
  }
}
