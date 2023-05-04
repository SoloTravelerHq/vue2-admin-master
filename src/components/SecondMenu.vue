<!--
 * 二级菜单（左侧导航栏）
-->
<template>
  <div
    :key="componentKey"
    class="menu-component"
    :style="{ width: isOpen ? '48px' : '230px' }"
  >
    <div class="menu-container">
      <el-scrollbar style="height: calc(100vh - 60px)">
        <el-menu
          ref="menu"
          router
          :default-active="actIndex"
          :unique-opened="true"
          :default-openeds="actOpen"
          background-color="#1f2c3c"
          :collapse="isOpen"
          text-color="#fff"
          @open="handleOpen"
          active-text-color="#e7ae47"
        >
          <template v-for="(item, index) in list">
            <!-- 二级菜单，无子节点 -->
            <template v-if="item.href && item.meta.hasPermission">
              <a
                target="blank"
                :href="item.href"
                :key="index"
              >
                <el-menu-item :class="{ actived: $route.name === item.name }">
                  <i
                    class="menu-icon"
                    :style="{ backgroundImage: `url(${item.meta.icon})` }"
                  ></i>
                  <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>
              </a>
            </template>
            <template v-else-if="item.path && item.meta.hasPermission">
              <el-menu-item
                :class="{ actived: $route.name === item.name }"
                :key="index"
                :index="item.path"
              >
                <i
                  class="menu-icon"
                  :style="{ backgroundImage: `url(${item.meta.icon})` }"
                ></i>
                <span slot="title">{{ item.meta.title }}</span>
              </el-menu-item>
            </template>
            <!-- 二级菜单，有子节点 -->
            <el-submenu
              :key="index"
              :index="`${index}`"
              v-else-if="item.children && item.children.length > 0"
            >
              <template
                :class="{ actived: $route.name === item.name }"
                slot="title"
              >
                <i
                  class="menu-icon"
                  :style="{ backgroundImage: `url(${item.meta.icon})` }"
                ></i>
                <span slot="title">{{ item.meta.title }}</span>
              </template>
              <template v-for="(child, j) in item.children">
                <!-- 三级菜单，无子节点 -->
                <template v-if="child.path && child.meta.hasPermission">
                  <el-menu-item
                    :class="{ actived: $route.name === child.name }"
                    :key="j"
                    :index="child.path"
                  >
                    <!-- <i class="menu-icon" :style="{ backgroundImage: `url(${child.meta.icon})` }"></i> -->
                    {{ child.meta.title }}
                  </el-menu-item>
                </template>
                <!-- 三级菜单，有子节点 -->
                <el-submenu
                  :key="j"
                  :index="child.meta.code"
                  v-else-if="child.children && child.children.length > 0"
                >
                  <template
                    :class="{ actived: $route.name === child.name }"
                    slot="title"
                  >
                    <!-- <i class="menu-icon" :style="{ backgroundImage: `url(${child.meta.icon})` }"></i> -->
                    {{ child.meta.title }}
                  </template>
                  <el-menu-item
                    v-for="(child2, k) in child.children"
                    :key="k"
                    :index="child2.path"
                  >
                    <!-- <i class="menu-icon" :style="{ backgroundImage: `url(${child2.meta.icon})` }"></i> -->
                    {{ child2.meta.title }}
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondMenu',
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      actIndex: this.active(),
      list: [],
      actOpen: ['0'],
      componentKey: 0,
      defViw: true,
      useRefresh: true
    };
  },
  computed: {
    usermenu () {
      return JSON.parse(localStorage.userInfo).menu;
    },
    userRole () {
      return JSON.parse(localStorage.userInfo).role;
    }
  },
  watch: {
    '$route.name' (newVal, oldVal) {
      this.useRefresh = false;
      this.change(newVal, oldVal);
    }
  },
  created () {
    if (this.useRefresh) {
      this.change(this.$route.name);
    }
  },
  methods: {
    handleOpen () {
    },
    active () {
      if (this.$route.name.split('-')[2]) {
        return `${this.$route.name.split('-')[1]}-${this.$route.name.split('-')[2]}`;
      } else if (this.$route.name.split('-')[3]) {
        return `${this.$route.name.split('-')[1]}-${this.$route.name.split('-')[2]}-${this.$route.name.split('-')[3]}`;
      } else {
        return `${this.$route.name.split('-')[1]}`;
      }
    },
    change (val, oldVal) {

      // if (oldVal && val === 'home') {
      //   const Presult = this.$store.state.menu.data.find(item => oldVal.indexOf(item.name) === 0);
      //   console.log('Presult', Presult);
      // }
      // 强制渲染组件
      if (oldVal && oldVal.split('-')[0] !== val.split('-')[0]) {
        this.componentKey += 1;
      }

      const result = this.$store.state.menu.data.find(item => val.indexOf(item.name) === 0);
      if (result) {
        if (this.userRole === '系统管理员') this.list = result.children
        else this.list = this.menuFilter(result.children)
      }
    },
    // 过滤无权限的二级导航
    menuFilter (item) {
      return item.filter(item => {
        if (item.children) this.menuFilter(item.children);
        return this.usermenu.includes(item.meta.code);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-component {
  user-select: none;
  //width: 230px;
  background-color: #1f2c3c;
  height: 100%;
}

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-menu {
  padding-top: 20px;
  border-right: none;
}

.el-menu--collapse {
  width: 48px;
}

::v-deep .el-submenu__title {
  padding-left: 15px !important;
}

::v-deep .menu-icon {
  margin-right: 10px;
}

::v-deep .el-submenu__title,
.el-menu-item {
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .menu-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-size: 100% 100%;
    vertical-align: text-top;
  }
}

.el-menu-item:hover,
.el-menu-item.is-active,
npm .el-submenu.is-active,
.el-menu-item.actived,
.el-submenu__title.active {
  color: rgb(255, 208, 75) !important;
  // background-color: rgb(25, 35, 48);
}
</style>
