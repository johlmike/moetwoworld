// Vue 核心
import Vue from 'vue';
// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// Bootstrap
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import '@/assets/scss/main.scss';
// vue-overlay-loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// VeeValidate
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate';
import {
  required,
  min_value as minValue,
  email,
  min,
  max_value as maxValue,
} from 'vee-validate/dist/rules';
// Vue2-Editor
import Vue2Editor from 'vue2-editor';
// Lodash
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebook, faGithub, faWordpressSimple } from '@fortawesome/free-brands-svg-icons';
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
  faEdit,
  faTrashAlt,
  faBars,
  faTicketAlt,
  faClipboardList,
  faImages,
  faSignOutAlt,
  faPhone,
  faEnvelope,
  faMap,
  faTimesCircle,
  faSchool,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
// sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// animate.css
import animated from 'animate.css';
// entry point 及 router
import App from './App.vue';
import router from './router';

// 載入 Axios
Vue.use(VueAxios, axios);
// 載入 jQuery
window.$ = $;
// 載入 vue-overlay-loading
Vue.use(Loading);
// 載入 Vue2Editor
Vue.use(Vue2Editor);
// 載入 lodash
Vue.use(VueLodash, { lodash });
// 載入 VeeValidate
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
  message: '最少為{min}',
});
extend('max_value', {
  ...maxValue,
  message: '最多為{max}',
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
  faEdit,
  faTrashAlt,
  faBars,
  faTicketAlt,
  faClipboardList,
  faImages,
  faSignOutAlt,
  faPhone,
  faEnvelope,
  faMap,
  faTimesCircle,
  faFacebook,
  faGithub,
  faWordpressSimple,
  faSchool,
  faBullhorn,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
// 載入 sweet alert
const options = {
  confirmButtonColor: '#BC3322',
};
Vue.use(VueSweetalert2, options);
// 載入 animate.css
Vue.use(animated);
// 實體化 $bus
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
