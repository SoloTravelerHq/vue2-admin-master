/*
 * 菜单相关，涉及权限校验、菜单过滤、路由注册
 */
import menuTree from '@/assets/menu';
import router from '@/router';

const module = {
  namespaced: true,
  state: {
    data: [],
    userPermissions: []
  },
  mutations: {
    SET_MENU (state, data) {
      state.data = data;
    },
    SET_PERMISSIONS (state, data) {
      state.userPermissions = data;
    },
    SET_DYN_DICTIONARY: (state, data) => {
      state.dynDictionary = data;
    }
  },
  actions: {
    setDictionary ({ commit, state }, code) {
      return state.staticDictionary;
    },
    initCurrentUserPermissions ({ commit }) {
      // TODO 获取服务器权限
      const codes = [];
      getAllPermission(menuTree, codes);
      commit('SET_PERMISSIONS', codes);
    },
    // 检查是否有权限
    checkPermission ({ state }, code) {
      return state.userPermissions.includes(code);
    },
    // 初始化菜单数据，并注册相应的路由
    async initCurrentUserMenu ({ dispatch, commit, state }) {
      dispatch('initCurrentUserPermissions');
      const routes = [];
      const menuData = analysisMenu(menuTree, state.userPermissions, routes);
      // console.log(menuData, 222);
      // 将一级菜单的默认指向其下首个二级菜单即设置redirect
      routes.forEach(item => {
        if (item.children && item.children.length > 0) {
          const first = item.children[0];
          item.redirect = `${item.path}/${first.path}`;
        }
        router.addRoute(item);
      });
      commit('SET_MENU', menuData);
    }
  }
};

export default module;

// 解析菜单树，根据用户权限过滤无权限菜单节点并注册相应有权限的路由
function analysisMenu (treeData, permissions, routes) {
  return treeData
    .map(item => {
      // console.log(item);
      if (!item.meta) {
        item.meta = { hasPermission: false };
      }
      if (item.path) {
        // 带路由信息的节点
        if (item.meta?.code && item.meta.code.split(',').find(a => permissions.includes(a))) {
          // 当前用户有访问权限
          item.meta.hasPermission = true;
          addToRoutes(routes, { ...item, children: undefined });
        }
      }
      if (Array.isArray(item.children)) {
        // 解析后代子孙节点
        item.children = analysisMenu(item.children, permissions, routes, item.path);
        // 包含有权限的子节点则视当前节点有权限
        if (item.children.length > 0) {
          item.meta.hasPermission = true;
        }
      } else {
        item.children = [];
      }
      if (Array.isArray(item.childs)) {
        // 解析按钮节点
        item.childs.forEach(child => {
          if (child.path) {
            // 带路由信息的节点
            if (child.meta?.code && child.meta.code.split(',').find(a => permissions.includes(a))) {
              // 当前用户有访问权限
              child.meta.hasPermission = true;
              child.meta.btnRoute = true;
              addToRoutes(routes, { ...child });
            }
          }
        });
      }
      return { ...item, text: item.meta.title };
    })
    .filter(item => item.meta.hasPermission);
}

// 将路由原数据按父子二层级插入routes
function addToRoutes (routes, route) {
  const result = routes.find(item => {
    if (route.name.indexOf(item.name) === 0) {
      if (route.name === item.name) {
        // 重复，丢弃
        return true;
      } else {
        // 作为子节点插入队列
        if (!Array.isArray(item.children)) {
          item.children = [];
        }
        item.children.push(route);
        return true;
      }
    }
  });
  // 作为父节点插入队列
  if (!result) {
    routes.push(route);
  }
}

// 获取完整的菜单按钮数据的权限code
function getAllPermission (treeData, result) {
  treeData.forEach(item => {
    item.meta?.code && item.meta.code.split(',').forEach(a => a && result.push(a));
    const children = item.children || item.childs; // 子菜单children+按钮childs
    Array.isArray(children) && getAllPermission(children, result);
  });
}
