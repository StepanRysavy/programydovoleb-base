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
import ComponentLogoItem from '@/components/logo-item/do';
import ComponentCoalitionItem from '@/components/party/coalition-item/do';
import ComponentCollapsibleElement from '@/components/collapsible-element/do';
import ComponentModalElement from '@/components/modal-element/do';
import ComponentPartyNameWithDot from '@/components/party/party-name-with-dot/do';
import ComponentPartyNameWithLogo from '@/components/party/party-name-with-logo/do';

Vue.component('outbound-link', ComponentOutboundLink);
Vue.component('outbound-icon', ComponentOutboundIcon);
Vue.component('icon-element', ComponentIconElement);
Vue.component('logo-item', ComponentLogoItem);
Vue.component('person-name', ComponentPersonName);
Vue.component('coalition-item', ComponentCoalitionItem);
Vue.component('party-name-with-dot', ComponentPartyNameWithDot);
Vue.component('party-name-with-logo', ComponentPartyNameWithLogo);
Vue.component('collapsible-element', ComponentCollapsibleElement);
Vue.component('modal-element', ComponentModalElement);

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
