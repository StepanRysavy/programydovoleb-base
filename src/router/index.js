import Vue from 'vue';
import Router from 'vue-router';
import LayoutHomepage from '@/layout/homepage/do';
import LayoutStaticImpressum from '@/layout/static/impressum/do';
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
