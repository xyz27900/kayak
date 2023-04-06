import { BasePage } from '~/pages/base.page';
import { WelcomeScreen } from '~/pages/welcome/screens/welcome.screen';

export class WelcomePage extends BasePage {
  public async completeWelcomeScreen(): Promise<WelcomeScreen> {
    return new WelcomeScreen(this.page);
  }
}
