<!--
 * 不带工具栏、固定列宽的的表格示例
-->
<template>
  <CommonTable
    :columns="columns"
    :tableData="tableData"
    @sort-change="sortChange"
  >
    <template #header-yyy>
      <span>班主任</span>
      <el-tooltip
        effect="dark"
        content="Top Left 提示文字"
        placement="top-start"
      >
        <i class="el-icon-info"></i>
      </el-tooltip>
    </template>
    <template #page-prepend>搜索时间：（2021-09-01 - 当前）</template>
    <template #page-append>
      <span>这里显示统计信息</span>
      <el-button type="text">更多</el-button>
    </template>
  </CommonTable>
</template>

<script>
// @ is an alias to /src
import CommonTable from "@/components/CommonTable";
import * as api from "@/api/demo";

export default {
  name: "Home",
  components: {
    CommonTable
  },
  data () {
    return {
      columns: [
        { type: "selection", fixed: "left" },
        { type: "index", fixed: "left" },
        { field: "name", label: "姓名", minWidth: 150, fixed: "left", action: this.detail },
        { field: "sex", label: "性别", minWidth: 120, setTextClass: this.setSexTextClass },
        { field: "age", label: "年龄", minWidth: 120, sortable: true },
        { field: "grade", label: "年级", minWidth: 180 },
        { field: "class", label: "班级", minWidth: 180 },
        { field: "xxx", label: "家长", minWidth: 180 },
        {
          field: "xphone",
          label: "联系电话",
          childColumns: [{ field: "name", label: "姓名" }, { field: "name", label: "姓名" }],
          minWidth: 180
        },
        {
          field: "xphone",
          label: "联系电话",
          childColumns: [
            { field: "phoneNum", sortable: true, label: "手机" },
            { field: "telNum", sortable: true, label: "固话" }
          ],
          minWidth: 180
        },
        { type: "customHeader", field: "yyy", label: "班主任", minWidth: 180, sortable: true, action: this.yyyDetail },
        { field: "yphone", label: "联系电话", minWidth: 180 },
        { field: "address", label: "地址", minWidth: 280 },
        { field: "date", label: "入学日期", minWidth: 180 },
        {
          type: "operate",
          width: 200,
          fixed: "right",
          btns: [
            {
              field: "status",
              options: [
                { value: true, label: "停用" },
                { value: false, label: "启用" }
              ],
              action: this.enable
            },
            {
              label: "详情",
              action: this.detail
            },
            {
              label: "删除",
              action: this.del,
              showBtn (row) {
                return !row.status;
              }
            },
            {
              label: "审核",
              action: this.verify,
              disableBtn (row) {
                return !row.status;
              }
            }
          ]
        }
      ],
      tableData: {
        loading: false,
        data: [],
        total: 0
      }
    };
  },
  created () {
    this.getPageData();
  },
  methods: {
    getPageData () {
      this.tableData.loading = true;
      api
        .getPage()
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
    // 表头排序
    sortChange ({ prop, order }) {
      console.log(`TODO sort '${prop}' from ${order} to ${order === "ascending" ? "descending" : "ascending"}`);
    },
    // 根据字段key/value设置字体颜色
    setSexTextClass (row, value) {
      return value === "女" ? "text-green" : "";
    },
    // 查看班主任信息
    yyyDetail (row, value) {
      console.log("TODO yyyDetail", row, value);
    },
    // 查看详情
    detail (row) {
      console.log("TODO detail", row);
    },
    // 审核
    verify (row) {
      console.log("TODO verify", row);
    },
    // 停用启用
    enable (row) {
      row.status = !row.status;
      this.$message.success("操作成功");
    },
    // 删除
    del (row) {
      this.$confirm("确定要删除该项吗？")
        .then(() => {
          this.$message.success("删除成功");
        })
        .catch(() => {
        });
    }
  }
};
</script>
