import Vue from 'vue';
import Router from 'vue-router';
import LayoutHomepage from '@/layout/homepage/do';
import LayoutStaticImpressum from '@/layout/static/impressum/do';
import LayoutOverview from '@/layout/overview/intro/do';
import LayoutOverviewElection from '@/layout/overview/election/do';
import LayoutOverviewLocation from '@/layout/overview/location/do';
import LayoutOverviewLocationSenate from '@/layout/overview/senate/do';
import LayoutOverviewIndex from '@/layout/overview/index/do';
import LayoutOverviewParty from '@/layout/overview/party/do';

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
    },
    {
      path: '/vysledky',
      name: 'Overview',
      component: LayoutOverview
    },
    {
      path: '/vysledky/volby/:type/:id',
      name: 'OverviewElection',
      props: true,
      component: LayoutOverviewElection
    },
    {
      path: '/vysledky/obec/:location',
      name: 'OverviewLocation',
      props: true,
      component: LayoutOverviewLocation
    },
    {
      path: '/vysledky/obvod/:location',
      name: 'OverviewLocationSenate',
      props: true,
      component: LayoutOverviewLocationSenate
    },
    {
      path: '/rejstrik',
      name: 'OverviewIndex',
      component: LayoutOverviewIndex
    },
    {
      path: '/rejstrik/:id',
      name: 'OverviewParty',
      props: true,
      component: LayoutOverviewParty
    }
  ],
});

export default router;
