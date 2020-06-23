import Vue from 'vue';
import Router from 'vue-router';
import LayoutHomepage from '@/layout/homepage/do';
import LayoutTykaji from '@/layout/tykaji-se-me-volby/do';
import LayoutQuestions from '@/layout/questions/do';
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
      path: '/tykaji-se-me-volby',
      name: 'Tykaji',
      component: LayoutTykaji
    },
    {
      path: '/otazky-pro-kandidaty',
      name: 'Questions',
      component: LayoutQuestions
    },
    {
      path: '/otazky-pro-kandidaty/:id',
      name: 'Questions',
      component: LayoutQuestions,
      props: true
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: LayoutStaticImpressum
    }
  ]
});

export default router;
