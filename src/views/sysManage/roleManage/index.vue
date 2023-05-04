
<!--
 * 角色管理
-->
<template>
  <el-row class="mina">
    <el-col
      :span="16"
      class="mina-left"
    >
      <CommonTable
        :tools="tools"
        :columns="columns"
        :tableData="tableData"
        @sort-change="sortChange"
        @filter-search="getPageData"
        @change="getPageData"
        @selectionChange="selectionChange"
        @clickRow="rowClick"
      ></CommonTable>
    </el-col>
    <el-col
      :span="8"
      class="mina-right"
    >
      <div class="h3">菜单分配</div>
      <permis-tree
        :menuData="menu"
        :role="currentRole"
      ></permis-tree>
    </el-col>
  </el-row>
</template>

<script>
import CommonTable from '@/components/CommonTable';
import * as api from '@/api/sysManage/role';
import permisTree from '@/components/permisTree';
export default {
  name: 'Permissions',
  components: {
    CommonTable,
    permisTree
  },
  data () {
    return {
      currentRole: '',//当前角色
      menu: [],//权限菜单
      tools: [
        { type: 'button', btnType: 'success', label: '刷新', icon: 'el-icon-refresh', action: this.getPageData },
        { type: 'button', btnType: 'primary', label: '新增', icon: 'el-icon-plus', action: this.add },
        { type: 'button', btnType: 'warning', label: '修改', icon: 'el-icon-edit', action: this.update },
        { type: 'button', btnType: 'danger', label: '删除', icon: 'el-icon-delete', action: this.del },
        {
          type: 'filter',
          label: '高级搜索',
          icon: 'el-icon-search',
          options: []
        },
        { type: 'input', field: 'roleName', label: '角色名称', value: '', placeholder: '请输入内容' }
      ],
      columns: [
        { type: 'selection', fixed: 'left' },
        { type: 'index', fixed: 'left' },
        { field: 'roleName', label: '角色名称', fixed: 'left' },
        { field: 'roleCode', label: '角色编码' },
        { field: 'createBy', label: '创建人' },
        { field: 'updateby', label: '维护者' },
        { field: 'createTime', label: '创建时间' },
        { field: 'updateTime', label: '更新时间' },
        {
          type: 'operate',
          btns: [
            {
              field: 'enabled',
              options: [
                { value: true, label: '停用' },
                { value: false, label: '启用' }
              ],
              action: this.enable
            }
          ]
        },
        { field: 'remarks', fixed: 'right', label: '备注' }
      ],
      tableData: {
        loading: false,
        seachdata: [],
        data: [],
        total: 0
      }
    };
  },
  created () {
    this.getPageData();
    // 不需要监听的属性
    this.selectionedRows = []; // 当前选中的行
    this.prevParams = {}; // 上次的请求参数
  },
  methods: {
    getPageData (params = {}) {
      this.prevParams = params;
      this.tableData.loading = true;
      api
        .getPage(params)
        .then(res => {
          this.tableData.loading = false;
          this.tableData.data = res.data;
          this.tableData.total = res.total;
        })
        .catch(() => {
          this.tableData.loading = false;
          this.tableData.data = [];
          this.tableData.total = 0;
        });
    },
    rowClick (row) {
      if (row.menu) {
        // console.log(row.menu);
        this.menu = row.menu;
        this.currentRole = row.id;
      }
      else this.menu = []
    },
    // 表头排序
    sortChange ({ prop, order }) {
      console.log(`TODO sort '${prop}' from ${order} to ${order === 'ascending' ? 'descending' : 'ascending'}`);
    },
    // 选择行
    selectionChange (rows) {
      this.selectionedRows = rows;
    },
    // 新增
    add () {
      this.$message.warning('功能未开放');
    },
    // 修改
    update () {
      if (this.selectionedRows.length === 0) {
        return this.$message.warning('请先选择要修改的项');
      } else if (this.selectionedRows.length > 1) {
        return this.$message.warning('一次仅可修改一项');
      } else {
        this.$message.warning('功能未开放');
      }
    },
    // 停用启用
    enable (row) {
      // TODO，缺少接口
      row.enabled = !row.enabled;
      console.log('TODO enable', row);
      // this.$message.success('操作成功');
    },
    // 删除
    del () {
      if (this.selectionedRows.length === 0) {
        return this.$message.warning('请先选择要删除的项');
      } else if (this.selectionedRows.length > 1) {
        return this.$message.warning('一次仅可删除一项');
      } else {
        this.$confirm('确定要删除该项吗？')
          .then(() => {
            api.del(this.selectionedRows[0].id).then(() => {
              this.$message.success('删除成功');
              this.getPageData(this.prevParams);
            });
          })
          .catch(() => { });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.h3 {
  padding: 15px 15px;
  font-weight: 700;
  color: #303133;
  font-size: 15px;
}
.mina {
  height: 100%;
  .mina-left {
    height: calc(100% - 45px);
  }
  .mina-right {
    height: calc(100% - 45px);
  }
}
</style>
