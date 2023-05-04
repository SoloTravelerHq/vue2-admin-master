<!--
 * 快捷导航标签栏
-->

<template>
  <div class="navigator">
    <el-tag
      class="tag-m"
      @click="isOpenCol"
    >
      <i
        v-show="iconShows"
        class="el-icon-s-unfold"
      ></i>
      <i
        v-show="!iconShows"
        class="el-icon-s-fold"
      ></i>
    </el-tag>
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :effect="$route.path === item.path ? 'dark' : 'light'"
      :disable-transitions="true"
      :closable="index > 1"
      @click="goto(item)"
      @close="remove(index)"
    >
      {{ item.name }}
    </el-tag>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iconShows: true,
      tags: [{ name: '首页', path: '/home/home-1' }, { name: '清空', path: '' }]
    };
  },
  watch: {
    $route (route) {
      this.add(route);
    }
  },
  created () {
    this.add(this.$route);
  },
  methods: {
    isOpenCol () {
      this.$emit('isOpenCol');
      this.iconShows = !this.iconShows;
    },
    add (route) {
      const has = this.tags.findIndex(item => item.path === route.path) > -1;
      if (
        !has
        && !['/login', '/home/home-1'].includes(route.path)
        && /^\/.+\/.+$/.test(route.path)
        && route.meta.btnRoute !== true
      ) {
        // 不在队列+不是登录页首页+不是一级路由+不是按钮级路由
        this.tags.push({ name: route.meta.title, path: route.path });
      }
    },
    remove (index) {
      this.tags.splice(index, 1);
      this.tags[index] && this.goto(this.tags[index]);
    },
    goto (item) {
      if (item.name === '清空') {
        this.tags = [{ name: '首页', path: '/home/home-1' }, { name: '清空', path: '' }]
      } else if (this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navigator {
  display: flex;
  padding: 5px 10px;
  margin-bottom: 10px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 8px;
}

.el-tag {
  margin-right: 10px;
  cursor: pointer;

  &:not(.el-tag--dark) {
    color: #999;
    border-color: #ddd;
    background-color: transparent;

    ::v-deep .el-tag__close {
      color: #999;
    }
  }

  ::v-deep .el-tag__close:hover {
    background-color: transparent;
  }
}

.tag-m {
  border: none;
  font-size: 24px;
  width: 25px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-tag--mini {
  height: 25px;
  line-height: 22px;
}

.el-icon-s-unfold {
  color: #409eff;
}

.el-icon-s-fold {
  color: #1f2c3c;
}
</style>
