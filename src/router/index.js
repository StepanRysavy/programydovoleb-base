import Vue from 'vue';
import Router from 'vue-router';
import LayoutAdmin from '@/admin/do';
import LayoutForm from '@/form/do';
import LayoutHomepage from '@/layout/homepage/do';
import LayoutTykaji from '@/layout/tykaji-se-me-volby/do';
import LayoutQuestions from '@/layout/questions/do';
import LayoutStaticImpressum from '@/layout/static/impressum/do';
import LayoutSenate2006 from '@/layout/senat-20-06/do';

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
      path: '/senatni-volby-2020-cerven',
      name: 'Senate2006',
      component: LayoutSenate2006
    },
    {
      path: '/senatni-volby-2020-cerven/otazky-pro-kandidaty',
      name: 'Questions',
      component: LayoutQuestions
    },
    {
      path: '/senatni-volby-2020-cerven/otazky-pro-kandidaty/:id',
      name: 'QuestionsDetail',
      component: LayoutQuestions,
      props: true
    },
    {
      path: '/o-projektu',
      name: 'Impressum',
      component: LayoutStaticImpressum
    },
    {
      path: '/admin',
      name: 'Admin',
      component: LayoutAdmin
    },
    {
      path: '/formular/:id',
      name: 'Form',
      props: true,
      component: LayoutForm
    }
  ]
});

export default router;
