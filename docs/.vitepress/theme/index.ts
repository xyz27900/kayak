import { EnhanceAppContext } from 'vitepress/dist/client';
import DefaultTheme from 'vitepress/theme';
import ImageWithCaption from './ImageWithCaption.vue';
import './custom.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext): void {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('ImageWithCaption', ImageWithCaption);
  }
};
