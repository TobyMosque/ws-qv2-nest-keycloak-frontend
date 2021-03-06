import useAuthStore from 'src/stores/auth';
import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  Router,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface PiniaCustomProperties {
    $router: Router;
    $route: Router['currentRoute'];
  }
}

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: routes({ store }),

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  store.use(() => ({
    $router: Router,
    $route: Router['currentRoute'],
  }));

  Router.beforeEach((to, from, next) => {
    const protectedRoutes = to.matched.filter(route => route.meta.authorize);
    if (protectedRoutes.length > 0) {
      const authStore = useAuthStore(store);
      const logged = authStore.isLogged();
      if (!logged) {
        return next('/auth');
      }
    }
    next();
  })

  return Router;
});
