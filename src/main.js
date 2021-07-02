import { createApp } from 'vue';
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import {
  required, email, numeric, min, max,
} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router';

const app = createApp(App).use(router);

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

defineRule('email', email);
defineRule('numeric', numeric);
defineRule('required', required);
defineRule('min', min);
defineRule('max', max);

setLocale('zh_TW');

app.use(VueAxios, axios);

app.component('Form', Form);
app.component('Field', Field);
app.component('Error-Message', ErrorMessage);

app.mount('#app');
