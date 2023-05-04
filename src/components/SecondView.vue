<!--
 * 二级视图
-->

<template>
  <div>
    <SecondMenu :is-open="isOpen"></SecondMenu>
    <div
      class="left-container"
      :style="{ margin: isOpen ? '0 0 0  48px' : '0 0 0 230px' }"
    >
      <Navigator @isOpenCol="isOpenCol"></Navigator>
      <div class="second-router-container">
        <router-view></router-view>
        <!--        <el-button @click="isOpenCol">变化</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
import SecondMenu from '@/components/SecondMenu';
import Navigator from '@/components/Navigator';

export default {
  name: 'SecondView',
  components: { SecondMenu, Navigator },
  computed: {},
  data () {
    return {
      isOpen: false
    };
  },
  methods: {
    isOpenCol () {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-component {
  float: left;
  //width: 230px;
  height: 100%;
}

.left-container {
  margin-left: 230px;
  height: 100%;

  .second-router-container {
    width: 100%;
    height: calc(100% - 45px);
    background-color: #fff;
  }
  .second-router-container:first-child {
    height: 100%;
  }
}
</style>
