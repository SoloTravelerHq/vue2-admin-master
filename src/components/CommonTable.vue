<!--
 * 公共组件：表格
-->
<template>
  <div class="common-table">
    <!-- <e-dialog :logdata="logdata"></e-dialog> -->
    <CommonToolbar
      v-if="tools"
      :tools="tools"
      :showFliter="showFliter"
      @filter-fold="resize"
      @filter-search="val => $emit('filter-search', val)"
      @filter-reset="() => $emit('filter-reset')"
      @change="val => $emit('change', val)"
      @blur="val => $emit('change', val)"
      @enter="val => $emit('change', val)"
    >
      <!-- slot自定义表格上方信息 -->
      <template #last>
        <span
          class="tableHeader-slot"
          style="display: inline-block;"
        >
          <slot name="tableAbove-append"></slot>
        </span>
      </template>
    </CommonToolbar>
    <el-table
      ref="table"
      :data="tableData.data"
      :height="maxH"
      :size="size"
      :border="border === false ? false : true"
      :stripe="stripe === true ? true : false"
      :highlight-current-row="highlightCurrentRow"
      @expand-change="val => $emit('expand-change', val)"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @row-click="clickRow"
      @sort-change="val => $emit('sort-change', val)"
      v-loading="tableData.loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255,255, 0.8)"
    >
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.type === 'expand'"
          :key="index"
          type="expand"
          :fixed="item.fixed"
        >
          <template slot-scope="scope">
            <slot
              name="expandPanel"
              :rowData="scope.row"
            ></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'selection'"
          :key="index"
          type="selection"
          width="50"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align || align"
        ></el-table-column>
        <el-table-column
          v-else-if="item.type === 'index'"
          :key="index"
          type="index"
          label="序号"
          :width="item.width || 60"
          :min-width="item.minWidth || 60"
          :fixed="item.fixed"
          :align="item.align || align"
        ></el-table-column>
        <el-table-column
          v-else-if="item.field"
          :key="index"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :class-name="item.style"
          :align="item.align || align"
          :sortable="item.sortable === true"
          show-overflow-tooltip
        >
          <!--二级表头-->
          <el-table-column
            v-for="(chItem, chIndex) in item.childColumns"
            :key="chIndex"
            :prop="chItem.field"
            :label="chItem.label"
            :width="chItem.width"
            :min-width="chItem.minWidth"
            show-overflow-tooltip
            :align="chItem.align || align"
            :sortable="chItem.sortable === true"
          >
            <!--三级表头-->
            <el-table-column
              v-for="(grItem, grIndex) in chItem.grandColumns"
              :key="grIndex"
              :prop="grItem.field"
              :label="grItem.label"
              :width="grItem.width"
              :min-width="grItem.minWidth"
              show-overflow-tooltip
              :align="grItem.align || align"
              :sortable="grItem.sortable === true"
            >
            </el-table-column>
          </el-table-column>
          <template
            #header
            v-if="item.type === 'customHeader'"
          >
            <!-- 自定义表头 -->
            <slot :name="`header-${item.field}`"></slot>
          </template>
          <template slot-scope="scope">
            <el-button
              v-if="typeof item.action === 'function'"
              type="text"
              @click.native.prevent="item.action(scope.row, scope.row[item.field])"
            >{{ !scope.row[item.field] && scope.row[item.field] !== 0 ? '---' : scope.row[item.field] }}
            </el-button>
            <!--自定义表格一个格子内的内容-->
            <span
              v-else-if="typeof item.setTextWord === 'function'"
              :class="
                typeof item.setTextClass === 'function' &&
                  item.setTextClass(scope.row, scope.row[item.field], item.field)
              "
            >
              {{ !scope.row[item.field] ? '---' : item.setTextWord(scope.row) }}
            </span>
            <span
              v-else
              :class="
                typeof item.setTextClass === 'function' &&
                  item.setTextClass(scope.row, scope.row[item.field], item.field)
              "
            >{{
                !scope.row[item.field] && scope.row[item.field] !== 0
                  ? '---'
                  : item.dict
                  ? $sdict(scope.row[item.field], item.dict)
                  : scope.row[item.field]
              }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'operate'"
          :key="index"
          :label="item.label || '操作'"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          class-name="operate"
          :align="item.align || align"
        >
          <template slot-scope="scope">
            <template v-for="(btn, j) in item.btns">
              <el-button
                :key="j"
                v-if="typeof btn.showBtn === 'function' ? btn.showBtn(scope.row, btn) : true"
                :disabled="typeof btn.disableBtn === 'function' ? btn.disableBtn(scope.row, btn) : false"
                @click.native.prevent="btn.action(scope.row)"
                :type="btn.type || 'text'"
              >
                <!--                <icon :class="btn.icon"></icon>-->
                {{ getBtnText(scope.row, btn) }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      :background="false"
      v-if="showPagination !== false"
      layout="prev, pager, next, jumper, sizes, slot"
      :total="parseInt(tableData.total)"
      :page-size="pageSize"
      :page-sizes="[15, 30, 60, 120]"
      :current-page="parseInt(tableData.currentPage)"
      :pager-count="pagerCount"
      :small="pagerCount === 5"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :class="{
        'page-number-len4': currentPage > 996,
        'page-number-len5': currentPage > 9996,
        'page-total-len4': tableData.total / pageSize > 999,
        'page-total-len5': tableData.total / pageSize > 9999
      }"
    >
      <!-- slot自定义信息 -->
      <span class="page-slot">
        <slot name="page-prepend"></slot>
        <span class="el-pagination__total">共 {{ tableData.total }} 条</span>
        <slot name="page-append"></slot>
        <!-- <div class="page-statistics">
        </div> -->
      </span>
    </el-pagination>
  </div>
</template>

<script>
import CommonToolbar from './CommonToolbar';
import { getDomSize } from '@/libs/util/dom';

function resize () {
  const parent = this.$el.parentNode;
  const { height: parentH } = getDomSize(parent);
  const toolbar = parent.querySelector('.common-toolbar');
  const pagination = parent.querySelector('.el-pagination');
  let maxH = 0;
  if (toolbar) {
    const { height: h1 } = getDomSize(toolbar);
    maxH = parentH - h1;
  } else {
    maxH = parentH;
  }
  if (pagination) {
    const { height: h2 } = getDomSize(pagination);
    maxH = maxH - h2;
  }
  this.maxH = Math.max(maxH, this.maxHeight);
}

export default {
  name: 'CommonTable',
  components: { CommonToolbar },
  data () {
    return {
      maxH: 100,
      currentPage: 1,
      pageSize: 15
    };
  },
  props: {
    tools: null,
    showFliter: {
      type: Boolean,
      default: false
    },
    // 表格最大高度
    maxHeight: {
      type: Number,
      default: 100
    },
    // el-table的属性size
    size: {
      type: String,
      default: 'small'
    },
    // 单元格的内容对齐方式
    align: {
      type: String,
      default: 'center'
    },
    // 根据单元格的值动态获取单元格的样式class, getTextClass(property, row)
    getTextClass: {
      type: Function,
      default: () => '' // 内置样式 red、orange
    },
    // 列配置
    columns: {
      type: Array,
      default: () => []
      // columns的数组元素结构
      // { type: ('selection' / 'index' / 'expand' / 'operate' / 'customHeader'), field: string, label: string, width: (string / number), minWidth: (string / number),
      //  fixed: (true / 'left' / 'right'), action: function, setTextClass: function, sortable: boolean, align: ('left' / 'center' / 'right'), btns: array }
      // type==='operate'时，btns的数组元素结构
      // { field: string, label: string, options: [{ value, label }], action: function, showBtn: function, disableBtn: function }
    },
    // 判断操作按钮是否显示（即operates的数组项）, showBtn(btn, row)
    showBtn: {
      type: Function,
      default: () => true
    },
    // 判断操作按钮是否禁用（即operates的数组项）, disableBtn(btn, row)
    disableBtn: {
      type: Function,
      default: () => false
    },
    // table数据
    tableData: {
      type: Object,
      default: () => {
        return {
          // 是否loading，用于控制表格加载中遮罩层显示隐藏
          loading: false,
          // 表格数据
          data: [],
          // 数据库数据总条数
          total: 0
        };
      }
    },
    // 是否渲染页码组件
    showPagination: {
      type: Boolean,
      default: true
    },
    // 分页组件页码按钮的数量，当总页数超过该值时会折叠（大于等于 5 且小于等于 21 的奇数）
    pagerCount: {
      type: Number,
      default: 7
    },
    // 表格是否带边框
    border: {
      type: Boolean,
      default: true
    },
    // 表格是否带版面纹
    stripe: {
      type: Boolean,
      default: true
    },
    // 高亮当前选中的行
    highlightCurrentRow: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    tableData () {
      this.$nextTick(this.resize);
    }
  },
  created () {
    this.resize = resize.bind(this);
    window.addEventListener('resize', this.resize);
  },
  mounted () {
    this.$nextTick(this.resize);
  },
  destroyed () {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    // cellStyle ({ row, column }) {
    //   if (column.className) {
    //     return column.className
    //   }

    // },
    getBtnText (row, btn) {
      if (btn.label) {
        // 一般按钮
        return btn.label;
      } else {
        // 根据字段值显示不同文字的按钮
        if (!Array.isArray(btn.options)) {
          return '未定义options的按钮';
        }
        const result = btn.options.find(item => item.value === row[btn.field]);
        if (result) {
          return result.label;
        } else {
          return '未定义的按钮';
        }
      }
    },
    handleCurrentChange (val) {
      this.$emit('change', { pageSize: this.pageSize, currentPage: val });
    },
    handleSizeChange (size) {
      this.pageSize = size;
      this.$emit('change', { pageSize: size, currentPage: 1 });
    },
    handleExpand (row, expandedRows) {
      if (this.expandedCount > expandedRows.length) {
        // 关闭
        this.$emit('expand', row, false);
      } else {
        // 打开
        this.$emit('expand', row, true);
      }
      this.expandedCount = expandedRows.length; // 记录已折叠的行数
    },
    clear () {
      this.$refs.table.clearSelection();
    },
    select (selection, row) {
      this.$emit('select', selection, row);
    },
    selectAll (selection /* , row */) {
      this.$emit('selectAll', selection, this.tableData);
    },
    selectionChange (selection) {
      this.$emit('selectionChange', selection);
    },
    clickRow (row /* , column, event*/) {
      this.$emit('clickRow', row);
    },
    // 用于多选表格，切换指定行的选中状态
    toggleRowsSelection (rows, flag) {
      this.$nextTick(() => {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row, flag);
        });
      });
    }
  }
};
</script>

<style lang="scss">
.common-table {
  padding: 0 10px;
  // height: 100% !important;
  .el-table {
    width: 100%;
    // height: 85% !important;
    font-size: 14px;
    color: #606266;
    .el-table__fixed {
      height: auto !important; // 此处的important表示优先于element.style
      bottom: 17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
    }
  }

  .el-pagination {
    padding-bottom: 10px;
    // height: 20% !important;
    &::after {
      display: none;
    }
  }

  /* 设置element全局table 选中某行时的背景色*/
  .el-table__body tr.current-row > td {
    background-color: #a0cfff !important;
  }

  .el-button--mini {
    font-size: 14px;
  }

  .el-table thead {
    color: #000;
  }

  .el-table--border th.el-table__cell {
    background-color: rgb(249, 249, 249);
  }

  .page-slot {
    font-weight: normal;

    .el-pagination__total {
      margin-right: 15px;
    }

    .el-button--text {
      padding: 1px 5px;
    }
  }
}
</style>
