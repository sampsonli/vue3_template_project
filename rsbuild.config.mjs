import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginLess } from '@rsbuild/plugin-less';


export default defineConfig({
  plugins: [pluginVue(), pluginLess()],
  output: {
    cleanDistPath: process.env.NODE_ENV === 'production',
  },
  html: {
    template: './src/index.html',
  },
  server: {
    port: process.env.PORT || 3001,
  }
});
