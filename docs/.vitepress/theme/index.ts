import { EnhanceAppContext } from 'vitepress/dist/client';
import DefaultTheme from 'vitepress/theme';
import DocsFrame from './components/DocsFrame.vue';
import DocsImage from './components/DocsImage.vue';
import DocsVideo from './components/DocsVideo.vue';
import './custom.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext): void {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('DocsFrame', DocsFrame);
    ctx.app.component('DocsImage', DocsImage);
    ctx.app.component('DocsVideo', DocsVideo);
  }
};
