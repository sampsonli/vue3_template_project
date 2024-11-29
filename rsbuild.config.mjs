import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginLess } from '@rsbuild/plugin-less';


export default defineConfig({
  plugins: [pluginVue(), pluginLess()],
  html: {
    template: './src/index.ejs',
  }
});
