<!--
 * 带工具栏的表格示例
-->
<template>
  <CommonTable
    :tools="tools"
    :columns="columns"
    :tableData="tableData"
    @sort-change="sortChange"
    @filter-search="filterSearch"
    @change="changeParam"
    @selectionChange="selectionChange"
  >
    <!-- 在工具栏定义的位置插入slot名称为tabs的自定义内容 -->
    <template #tabs>
      <el-tabs></el-tabs>
    </template>
    <!-- 自定义表格列头，slot名格式：“header-”+列的字段field -->
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
    <!-- 分页器总条数之前插入的自定义内容，slot名固定为“page-prepend” -->
    <template #page-prepend>搜索时间：（2021-09-01 - 当前）</template>
    <!-- 分页器总条数之后跟的自定义内容，slot名固定为“page-append” -->
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
      tools: [
        {
          type: "button", btnType: "success", label: "刷新", icon: "el-icon-refresh", action: () => {
          }
        },
        {
          type: "button", btnType: "primary", label: "新增", icon: "el-icon-plus", action: () => {
          }
        },
        {
          type: "button", btnType: "warning", label: "修改", icon: "el-icon-edit", action: () => {
          }
        },
        {
          type: "button", btnType: "danger", label: "删除", icon: "el-icon-delete", action: () => {
          }
        },
        {
          type: "popoverbtn",
          label: "其他操作",
          icon: "el-icon-ok",
          options: [
            {
              btnType: "warning", label: "编辑备案", icon: "el-icon-edit", action: () => {
              }
            },
            {
              btnType: "danger", label: "取消备案", icon: "el-icon-delete", action: () => {
              }
            }
          ]
        },
        {
          type: "filter",
          label: "高级搜索",
          icon: "el-icon-search",
          options: [
            { field: "name", label: "名称", value: "", type: "input" },
            {
              field: "type",
              label: "类型",
              value: "",
              type: "select",
              options: [
                { label: "类型一", value: 0 },
                { label: "类型二", value: 1 }
              ]
            },
            {
              field: "enable",
              label: "是否启用",
              value: "",
              type: "radio",
              options: [
                { label: "停用", value: 0 },
                { label: "启用", value: 1 }
              ]
            },
            {
              field: "industry",
              label: "所属行业",
              value: [],
              type: "checkbox",
              options: [
                { label: "行业一", value: 0 },
                { label: "行业二", value: 1 }
              ]
            },
            { field: "dateRange", label: "申请日期", value: [], type: "daterange2" }
          ]
        },
        {
          field: "status",
          value: "",
          type: "radiobtn",
          options: [
            { label: "全部", value: "" },
            { label: "待审核", value: 1 },
            { label: "初审通过", value: 2 },
            { label: "终审通过", value: 3 },
            { label: "退回", value: 4 }
          ]
        },
        {
          type: "cascader",
          field: "area",
          label: "区域",
          value: [],
          // props: { label: 'label', value: 'value' }, // 可自定义options中的label和value字段名
          options: [
            {
              label: "四川",
              value: 510000,
              children: [
                {
                  label: "成都市",
                  value: 510100,
                  children: [
                    { label: "锦江区", value: 510101 },
                    { label: "成华区", value: 510102 }
                  ]
                }
              ]
            },
            {
              label: "重庆",
              value: 520000,
              children: [
                {
                  label: "重庆市",
                  value: 520100,
                  children: [
                    { label: "万州区", value: 520101 },
                    { label: "涪陵区", value: 520102, disabled: true },
                    { label: "渝中区", value: 520103 }
                  ]
                }
              ]
            }
          ]
        },
        { type: "input", field: "name", label: "姓名", value: "", placeholder: "请输入内容" },
        {
          type: "select",
          field: "sex",
          label: "性别",
          value: "",
          options: [
            { label: "女", value: 0 },
            { label: "男", value: 1 }
          ]
        },
        { type: "slot", code: "tabs" }
      ],
      // columns的数组元素结构
      // { type: ('selection' / 'index' / 'expand' / 'operate' / 'customHeader'), field: string, label: string, width: (string / number), minWidth: (string / number),
      //  fixed: (true / 'left' / 'right'), action: function, setTextClass: function, sortable: boolean, align: ('left' / 'center' / 'right'), btns: array }
      // type==='operate'时，btns的数组元素结构
      // { field: string, label: string, options: [{ value, label }], action: function, showBtn: function, disableBtn: function }
      columns: [
        { type: "selection", fixed: "left" },
        { type: "index", fixed: "left" },
        { field: "name", label: "姓名", minWidth: 150, fixed: "left", action: this.detail },
        { field: "sex", label: "性别", minWidth: 120, setTextClass: this.setSexTextClass },
        { field: "age", label: "年龄", minWidth: 120, sortable: true },
        { field: "grade", label: "年级", minWidth: 180 },
        { field: "class", label: "班级", minWidth: 180 },
        { field: "xxx", label: "家长", minWidth: 180 },
        { field: "xphone", label: "联系电话", minWidth: 180 },
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
    // 参数变化搜索: 页码大小、当前页数、和高级搜索同一级的搜索条件变化
    changeParam (param) {
      console.log("TODO 参数变化搜索", param);
    },
    // 点击高级过滤器中的搜索按钮
    filterSearch (params) {
      console.log("TODO 高级搜索", params);
    },
    // 表头排序
    sortChange ({ prop, order }) {
      console.log(`TODO sort '${prop}' from ${order} to ${order === "ascending" ? "descending" : "ascending"}`);
    },
    // 根据字段key/value设置字体颜色
    setSexTextClass (row, value) {
      return value === "女" ? "text-green" : "";
    },
    // 表格选中行变化
    selectionChange (rows) {
      console.log("当前选中行", rows);
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

<style lang="scss" scoped></style>
