import Vue from 'vue';
import Router from 'vue-router';
import LayoutHomepage from '@/layout/homepage/do';
import LayoutStaticImpressum from '@/layout/static/impressum/do';
import LayoutOverview from '@/layout/overview/intro/do';
import LayoutOverviewElection from '@/layout/overview/election/do';
import LayoutOverviewLocation from '@/layout/overview/location/do';
import LayoutOverviewLocationSenate from '@/layout/overview/senate/do';
import store from '@/store/store';

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
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.userAuth === -1) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
