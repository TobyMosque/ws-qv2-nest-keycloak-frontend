import { Pinia } from 'pinia';
import useAuthStore from 'src/stores/auth';
import { discard } from 'src/utils/console';
import { NavigationGuard, RouteRecordRaw, RouterView } from 'vue-router';

export default function ({ store }: { store: Pinia }) {
  discard(store);

  const beforeEnter: NavigationGuard = (to, from, next) => {
    const authStore = useAuthStore(store);
    const logged = authStore.isLogged();
    if (logged) {
      next('/home');
    } else {
      next('/auth');
    }
  };

  return [
    {
      path: '/',
      component: RouterView,
      children: [
        {
          path: '',
          beforeEnter,
        },
        {
          path: '',
          component: () => import('layouts/auth/AuthLayout.vue'),
          children: [
            {
              name: 'auth',
              path: 'auth',
              component: () => import('pages/auth/AuthPage.vue'),
            },
            {
              name: 'login',
              path: 'login',
              component: () => import('pages/login/LoginPage.vue'),
            },
            {
              name: 'register',
              path: 'register',
              component: () => import('pages/register/RegisterPage.vue'),
            },
          ],
        },
        {
          path: '',
          component: () => import('layouts/main/MainLayout.vue'),
          children: [
            {
              name: 'home',
              path: 'home',
              component: () => import('pages/home/HomePage.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/Error404.vue'),
    },
  ] as RouteRecordRaw[];
}

// export default routes;
