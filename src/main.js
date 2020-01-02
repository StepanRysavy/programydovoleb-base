// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import store from './store/store';
import router from './router';
import App from './layout/app/app';
import './assets/my-style.scss';

import ComponentOutboundLink from '@/components/outbound-link/do';
import ComponentOutboundIcon from '@/components/outbound-icon/do';
import ComponentIconElement from '@/components/icon-element/do';
import ComponentPersonName from '@/components/person-name/do';
import ComponentResultsElement from '@/components/results/main/results-element/do';

Vue.component('outbound-link', ComponentOutboundLink);
Vue.component('outbound-icon', ComponentOutboundIcon);
Vue.component('icon-element', ComponentIconElement);
Vue.component('person-name', ComponentPersonName);
Vue.component('results-element', ComponentResultsElement);

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
