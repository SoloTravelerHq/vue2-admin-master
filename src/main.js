
import Vue from 'vue';
import router from '@/router';
import store from '@/store';

import './mock/mockApi'

import ElementUI from '/src/plugins/elementui/index';
Vue.use(ElementUI);

import '@/assets/style/common.scss';
import moment from 'moment';

Vue.prototype.$moment = moment;
Vue.config.productionTip = false;


import App from './App.vue';
store.dispatch('menu/initCurrentUserMenu').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
