/*
 * demo二级菜单数据，节点中有path的是路由，name和code须唯一
 */
export default [
  {
    // 无子菜单
    path: 'demo-1',
    name: 'demo-1',
    meta: {
      title: '示例一：不带工具栏表格',
      icon: require('../image/headerImg/example.png'),
      code: 'DEMO_1',
      hasPermission: false
    },
    component: () => import('@/views/demo/Demo1')
  },
  {
    // 无子菜单
    path: 'demo-2',
    name: 'demo-2',
    meta: {
      title: '示例二：不带工具栏表格',
      icon: require('../image/headerImg/example.png'),
      code: 'DEMO_2',
      hasPermission: false
    },
    component: () => import('@/views/demo/Demo2')
  },
  {
    // 无子菜单
    path: 'demo-3',
    name: 'demo-3',
    meta: {
      title: '示例三：带工具栏表格',
      icon: require('../image/headerImg/example.png'),
      code: 'DEMO_3',
      hasPermission: false
    },
    component: () => import('@/views/demo/Demo3')
  },
  {
    // 无子菜单
    path: 'demo-map',
    name: 'demo-map',
    meta: {
      title: '地图',
      icon: require('../image/headerImg/example.png'),
      code: 'DEMO_MAP',
      hasPermission: false
    },
    component: () => import('@/views/demo/map')
  },
  {
    // 有子菜单
    meta: {
      title: '二级菜单1',
      icon: require('../image/headerImg/example.png'),
      code: 'DEMO_COMPONENT_1'
    },
    children: [
      {
        // 无子菜单
        path: 'menu-1-1',
        name: 'demo-menu-1-1',
        meta: {
          title: '三级菜单1',
          icon: '',
          code: 'DEMO_MENU_1_1',
          hasPermission: false
        }
        // component: () => import('@/views/demo/Form')
      },
      {
        // 有子菜单
        meta: {
          title: '三级菜单2',
          icon: '',
          code: 'DEMO_MENU_1_2'
        },
        children: [
          {
            path: 'menu-1-2-1',
            name: 'demo-menu-1-2-1',
            meta: {
              title: '四级菜单1',
              icon: '',
              code: 'DEMO_MENU_1_2_1',
              hasPermission: false
            }
            // component: () => import('@/views/demo/table/Table1')
          },
          {
            path: 'menu-1-2-2',
            name: 'demo-menu-1-2-2',
            meta: {
              title: '四级菜单2',
              icon: '',
              code: 'DEMO_MENU_1_2_2',
              hasPermission: false
            }
            // component: () => import('@/views/demo/table/Table2')
          }
        ]
      }
    ]
  },
  {
    // 有子菜单
    meta: {
      title: '二级菜单2',
      icon: require('../image/headerImg/example.png'),
      code: 'DEMO_COMPONENT_2'
    },
    children: [
      {
        // 无子菜单
        path: 'menu-2-1',
        name: 'demo-2-1',
        meta: {
          title: '三级菜单1',
          icon: '',
          code: 'DEMO_MENU_2_1',
          hasPermission: false
        }
        // component: () => import('@/views/demo/Form')
      },
      {
        // 有子菜单
        meta: {
          title: '三级菜单2',
          icon: '',
          code: 'DEMO_MENU_2_2'
        },
        children: [
          {
            path: 'menu-2-2-1',
            name: 'demo-2-2-1',
            meta: {
              title: '四级菜单1',
              icon: '',
              code: 'DEMO_MENU_2_2_1',
              hasPermission: false
            }
            // component: () => import('@/views/demo/table/Table1')
          },
          {
            path: 'menu-2-2-2',
            name: 'demo-2-2-2',
            meta: {
              title: '四级菜单2',
              icon: '',
              code: 'DEMO_MENU_2_2_2',
              hasPermission: false
            }
            // component: () => import('@/views/demo/table/Table2')
          }
        ]
      }
    ]
  }
];
