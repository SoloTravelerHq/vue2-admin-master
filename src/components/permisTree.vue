<!--
 * 菜单树操作
-->
<template>
  <div style="height: calc(100% - 45px); overflow-x: hidden;">
    <div class="buttons">
      <!-- <el-button
        type="success"
        @click="getCheckedNodes"
      >node 获取</el-button> -->
      <!-- <el-button
        type="warning"
        @click="setCheckedNodes"
      >node 设置</el-button>
      <el-button
        type="warning"
        @click="setCheckedKeys"
      >key 设置</el-button>
      <el-button
        type="danger"
        @click="resetChecked"
      >清空</el-button> -->
      <el-button
        type="success"
        @click="getCheckedKeys"
      >保存</el-button>
    </div>
    <el-scrollbar class="el-scrollbar-main">
      <div class="el-scrollbar-zs">
        <el-tree
          class="flow-tree"
          flow-tree
          :data="treeData"
          show-checkbox
          node-key="code"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import vueRoutes from '@/assets/menu/index';
export default {
  name: 'permisTree',
  props: {
    menuData: {
      type: Array,
      default: () => []
    },
    role: {
      type: String,
      default: ""
    }
  },
  watch: {
    menuData (n, o) {
      this.setCheckedKeys(n)
    }
  },
  data () {
    // console.log(vueRoutes);
    let cac = [...vueRoutes];
    function gInfo (arr) {
      arr.forEach(function (item) {
        if (item.meta) {
          item = Object.assign(item, item.meta);
        }
        gInfo(item.children);
      });
      return cac;
    }
    // console.log(cac);
    return {
      treeData: gInfo(cac),
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  },
  beforeMount () {
    this.treeData = vueRoutes;
  },
  methods: {
    getCheckedNodes () {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys(), this.role);
    },
    setCheckedNodes () {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 9,
          label: '三级 1-1-1'
        }
      ]);
    },
    setCheckedKeys (n) {
      // console.log(n);
      this.$refs.tree.setCheckedKeys(n);
    },
    resetChecked () {
      this.$refs.tree.setCheckedKeys([]);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-scrollbar-zs {
  height: auto;
  width: 95%;
}
.el-scrollbar-main {
  height: calc(100% - 30px);
  width: auto;
  overflow-x: hidden !important;
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}
</style>
