import { BasePage } from '~/pages/base.page';
import { ChooseFlowScreen } from '~/pages/welcome/screens/choose-flow.screen';
import { dataTestId } from '~/utils';

const metametricsScreen = {
  disableAnalyticsButton: `.metametrics-opt-in ${dataTestId('page-container-footer-cancel')}`
} as const;

export class MetaMetricsScreen extends BasePage {
  public async disableAnalytics(): Promise<ChooseFlowScreen> {
    await this.page.click(metametricsScreen.disableAnalyticsButton);
    return ChooseFlowScreen.waitFor(this.page);
  }
}
