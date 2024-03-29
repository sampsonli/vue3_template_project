
import { createApp } from 'vue';
import { VueShowdownPlugin, VueShowdown  } from 'vue-showdown';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(VueShowdownPlugin, {
    flavor: 'github',
    options: {
        emoji: false,
      },
});
app.use(router).mount('#app');
app.component('VueShowdown', VueShowdown);
export default app;