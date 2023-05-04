/*
 * 路由
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import { getTokenInfo } from '@/api/token';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  const tokenInfo = getTokenInfo();
  if (to.path !== '/login') {
    if (!tokenInfo.accessToken) {
      // 未登录
      // "prettier": "^1.19.1",
      next('/login');
      to.path === '/' ? next('/home') : next();
    } else {
      // 已登录
      to.path === '/' ? next('/home') : next();
    }
  } else {
    next();
  }
});

export default router;
