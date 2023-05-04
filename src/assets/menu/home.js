
/* 基础数据二级菜单路由数据 */
export default [
  {
    // 有子菜单
    path: 'home-1',
    name: 'home-1',
    meta: {
      title: '首页',
      icon: '',
      code: 'HOME_1',
      hasPermission: false
    },
    component: () => import('@/views/home/index')
  }
];
