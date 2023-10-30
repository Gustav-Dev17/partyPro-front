import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/home',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },

  {
    path: '/account',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/AccountPage.vue') }],
  },

  {
    path: '/register',
    component: () => import('src/layouts/SigninLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },

  {
    path: '/login',
    component: () => import('src/layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },

  {
    path: '/forgotPassword',
    component: () => import('src/layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ForgotPassPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
