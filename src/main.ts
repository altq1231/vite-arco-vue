import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import i18n from './locale';
import App from './App.vue';
import '@/style/index.less';

const app = createApp(App);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(i18n);
app.mount('#app');
