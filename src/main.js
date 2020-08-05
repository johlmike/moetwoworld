// Vue 核心
import Vue from 'vue';
import App from './App.vue';
import router from './router';
// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// Bootstrap
import 'jquery';
import 'popper.js';
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
// vue-overlay-loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// VeeValidate
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate';
import { required, min_value as minValue, email, min } from 'vee-validate/dist/rules';
// Lodash
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCartPlus,
  faHome,
  faNewspaper,
  faShoppingCart,
  faUser,
  faCarrot,
  faBook,
  faPlusSquare,
  faMinusSquare,
  faChevronDown,
  faTrashAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

// 載入 Axios
Vue.use(VueAxios, axios);
// 載入 vue-overlay-loading
Vue.use(Loading);
// 載入 lodash
Vue.use(VueLodash, { lodash });
// 設定 VeeValidate
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
extend('email', {
  ...email,
  message: '請輸入正確的 Email 格式',
});
extend('required', {
  ...required,
  message: '{_field_} 為必填項目',
});
extend('min', {
  ...min,
  message: '請輸入至少 {length} 碼',
});
extend('min_value', {
  ...minValue,
  message: '數量最少為{min}',
});
configure({
  classes: {
    valid: 'is-valid', // 驗證通過回傳 is-valid
    invalid: 'is-invalid', // 驗證失敗回傳 is-invalid
  },
});
// 設定 FontAwesome
library.add(
  faCartPlus,
  faHome,
  faNewspaper,
  faShoppingCart,
  faUser,
  faCarrot,
  faBook,
  faPlusSquare,
  faMinusSquare,
  faChevronDown,
  faTrashAlt,
  faBars,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
