
<!--
 * 用户管理
-->
<template>
  <CommonTable
    :tools="tools"
    :columns="columns"
    :tableData="tableData"
    @sort-change="sortChange"
    @filter-search="getPageData"
    @change="getPageData"
    @selectionChange="selectionChange"
  ></CommonTable>
</template>

<script>
import CommonTable from '@/components/CommonTable';
import * as api from '@/api/sysManage/user';

export default {
  name: 'Home',
  components: {
    CommonTable
  },
  data () {
    return {
      tools: [
        { type: 'button', btnType: 'success', label: '刷新', icon: 'el-icon-refresh', action: this.getPageData },
        { type: 'button', btnType: 'primary', label: '新增', icon: 'el-icon-plus', action: this.add },
        { type: 'button', btnType: 'warning', label: '修改', icon: 'el-icon-edit', action: this.update },
        { type: 'button', btnType: 'danger', label: '删除', icon: 'el-icon-delete', action: this.del },
        {
          type: 'filter',
          label: '高级搜索',
          icon: 'el-icon-search',
          options: [
            { field: 'username', label: '账号', value: '', type: 'input' },
            { field: 'tel', label: '联系电话', value: '', type: 'input' },
            { field: 'email', label: '邮箱', value: '', type: 'input' },
            {
              field: 'enabled',
              label: '是否启用',
              value: '',
              type: 'select',
              options: [
                { label: '停用', value: 0 },
                { label: '启用', value: 1 }
              ]
            }
          ]
        },
        { type: 'input', field: 'name', label: '姓名', value: '', placeholder: '请输入内容' }
      ],
      columns: [
        { type: 'selection', fixed: 'left' },
        { type: 'index', fixed: 'left' },
        { field: 'name', label: '姓名', fixed: 'left' },
        { field: 'username', label: '账号' },
        { field: 'gender', label: '性别' },
        { field: 'tel', label: '联系电话' },
        { field: 'email', label: '邮箱' },
        { field: 'idCard', label: '身份证号码' },
        { field: 'birthday', label: '生日' },
        { field: 'houseAddress', label: '家庭住址' },
        {
          type: 'operate',
          fixed: 'right',
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
        }
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
          // console.log(res);
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
      this.$message.warning('功能未开放')
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
