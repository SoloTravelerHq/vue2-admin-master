/* 系统管理界面 */
export default [
  {
    // 有子菜单
    meta: { title: '用户管理', icon: require('../image/headerImg/example.png'), code: 'USER_MANAGE' },
    children: [
      {
        path: 'user',
        name: 'sysManage-1-1',
        meta: { title: '用户管理', icon: '', code: 'SYS_MANAGE_USER', hasPermission: false },
        component: () => import('@/views/sysManage/userManage/index'),
        // 按钮级路由放在childs中
        // childs: [
        //   {
        //     path: 'userEdit',
        //     name: 'sysManage-userEdit',
        //     meta: {
        //       title: '用户编辑',
        //       icon: '',
        //       code: 'SYS_MANAGE_USER_ADD,SYS_MANAGE_USER_UPDATE',
        //       hasPermission: false
        //     },
        //     component: () => import('@/views/sysManage/userManage/Edit')
        //   }
        // ]
      },
      {
        path: 'role',
        name: 'sysManage-1-2',
        meta: { title: '角色管理', icon: '', code: 'SYS_MANAGE_ROLE', hasPermission: false },
        component: () => import('@/views/sysManage/roleManage/index'),
        // childs: [
        //   {
        //     path: 'roleEdit',
        //     name: 'sysManage-roleEdit',
        //     meta: {
        //       title: '角色编辑',
        //       icon: '',
        //       code: 'SYS_MANAGE_ROLE_ADD,SYS_MANAGE_ROLE_UPDATE',
        //       hasPermission: false
        //     },
        //     component: () => import('@/views/sysManage/userManage/permissionsEdit')
        //   }
        // ]
      },
    ]
  }
];
