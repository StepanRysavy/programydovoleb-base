// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import store from './store/store';
import router from './router';
import App from './layout/app/app';
import './assets/my-style.scss';

import './common/components';

import ComponentCoalitionItem from '@/components/party/coalition-item/do';
import ComponentPartyNameWithDot from '@/components/party/party-name-with-dot/do';
import ComponentPartyNameWithLogo from '@/components/party/party-name-with-logo/do';

Vue.component('coalition-item', ComponentCoalitionItem);
Vue.component('party-name-with-dot', ComponentPartyNameWithDot);
Vue.component('party-name-with-logo', ComponentPartyNameWithLogo);

Vue.config.productionTip = false;

/* eslint-disable no-unused-vars */
const unsync = sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
