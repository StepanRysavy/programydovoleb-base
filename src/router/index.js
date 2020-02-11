import Vue from 'vue';
import Router from 'vue-router';
import LayoutHomepage from '@/layout/homepage/do';
import LayoutStaticImpressum from '@/layout/static/impressum/do';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: LayoutHomepage
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: LayoutStaticImpressum
    }
  ]
});

export default router;
