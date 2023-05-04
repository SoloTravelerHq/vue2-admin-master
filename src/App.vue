
<template>
  <div id="app">
    <template v-if="$route.path !== '/login'">
      <!-- 头部菜单 -->
      <Header></Header>
      <div class="main-container">
        <!-- 一级路由 -->
        <router-view class="first-router-container"></router-view>
      </div>
    </template>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  components: {
    Header
  },
};
</script>

<style lang="scss" scoped>
#app {
  min-width: 900px;
  min-height: 660px;
  display: flex;
  flex-direction: column;

  .main-container {
    flex-grow: 1;
    overflow: hidden;

    .first-router-container {
      height: 100%;
    }
  }
}
</style>
