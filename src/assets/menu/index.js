/*
 * 菜单树数据，节点中有path的是路由，和用户菜单数据合并后，hasPermission为true表示有该菜单权限即路由可访问，为false表示无该菜单权限（菜单将不渲染该项，路径也将不注册该项）
 */


import homeChild from './home';
import demoChild from './demo';
import demoSystem from './sysManage';

export default [
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页', icon: '', code: 'HOME', hasPermission: true },
    component: () => import('@/components/SecondView'),
    children: homeChild
  },
  {
    path: '/sys_manage',
    name: 'sysManage',
    meta: {
      title: '系统管理',
      icon: require('../image/headerImg/sysManage.png'),
      code: 'SYS_MANAGE',
      hasPermission: false
    },
    component: () => import('@/components/SecondView'),
    redirect: '',
    children: demoSystem
  },
  {
    path: '/demo',
    name: 'demo',
    meta: { title: '示例', icon: require('../image/headerImg/cultivation.png'), code: 'DEMO', hasPermission: false },
    component: () => import('@/components/SecondView'),
    redirect: '',
    children: demoChild
  },
];
