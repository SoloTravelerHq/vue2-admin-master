<!--
 * 公共组件：工具栏
-->
<template>
  <div class="common-toolbar">
    <slot
      name="first"
      class="tool-item"
    ></slot>
    <template v-for="(item, index) in tools">
      <!-- 高级过滤器 -->
      <el-button
        v-if="item.type === 'filter' && showFliter === false"
        :key="index"
        class="tool-item"
        :type="item.btnType || 'primary'"
        :icon="item.icon"
        @click="toggleFold"
      >{{ item.label }}
      </el-button>
      <!-- 按钮 -->
      <el-button
        v-else-if="item.type === 'button'"
        :key="index"
        class="tool-item"
        :type="item.btnType"
        :icon="item.icon"
        @click="item.action"
      >{{ item.label }}
      </el-button>
      <!-- popover -->
      <el-popover
        v-else-if="item.type === 'popoverbtn'"
        :key="index"
        class="tool-item"
        popper-class="tool-item-popover"
        :trigger="item.trigger || 'hover'"
        placement="bottom"
      >
        <template v-for="(option, j) in item.options">
          <el-button
            :key="j"
            :type="option.btnType"
            :icon="option.icon"
            @click="option.action"
          >{{ option.label }}
          </el-button>
        </template>
        <el-button
          :type="item.btnType || 'primary'"
          slot="reference"
        >
          {{ item.label }}
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </el-popover>
      <!-- 自定义工具 -->
      <slot
        v-else-if="item.type === 'slot'"
        class="tool-item"
        :name="item.code"
      ></slot>
      <!-- 过滤元：输入框、下拉等表单元素 -->
      <CustomElement
        v-else
        :key="index"
        class="tool-item"
        :opt="item"
        @change="$emit('change', { [item.field]: item.value })"
        @blur="$emit('blur', { [item.field]: item.value })"
        @enter="$emit('enter', { [item.field]: item.value })"
      ></CustomElement>
    </template>
    <slot
      name="last"
      class="tool-item"
    ></slot>
    <div
      class="filter-con"
      v-if="filterTool && filterTool.fold"
    >
      <CustomElement
        v-for="elem in filterTool.options"
        :key="elem.field"
        :opt="elem"
      ></CustomElement>
      <el-button
        class="custom-element"
        type="primary"
        @click="filterSearch"
      >搜索</el-button>
      <el-button
        class="custom-element"
        type="warning"
        @click="filterReset"
      >重置</el-button>
    </div>
  </div>
</template>
<script>
import CustomElement from './CustomElement';

export default {
  name: 'CommonToolbar',
  components: { CustomElement },
  props: {
    tools: {
      required: false,
      type: Array,
      default: () => []
      // 数组元素示例
      // { type: 'slot', code: 'tabs' },
      // { type: 'button', type: 'success', label: '刷新', icon: 'el-icon-refresh', action: () => {} },
      // { // 高级搜索工具仅支持一个
      //   type: 'filter',
      //   label: '高级搜索',
      //   type: 'primary',
      //   icon: 'el-icon-search',
      //   fold: false, // 高级搜索容器是否折叠状态
      //   options: [{ label, value} }]
      // }
      // { type: 'input', field: 'name', label: '姓名', value: '', placeholder: '请输入内容' }
      // {
      //   type: 'select',
      //   field: 'sex',
      //   label: '性别',
      //   value: '',
      //   options: [
      //     { label: '女', value: 0 },
      //     { label: '男', value: 1 }
      //   ]
      // }
      // { type: 'slot', code: 'tabs' }
    },
    showFliter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterTool: null
    };
  },
  watch: {
    tools () {
      this.initFilter();
    }
  },
  created () {
    this.initFilter();
  },
  methods: {
    initFilter () {
      this.filterTool = this.tools.find(item => item.type === 'filter');
      if (this.filterTool) {

        this.$set(this.filterTool, 'fold', this.filterTool.fold || this.showFliter);
      }
    },
    toggleFold () {
      this.filterTool.fold = !this.filterTool.fold;
      this.$nextTick(() => {
        this.$emit('filter-fold', this.filterTool.fold);
      });
    },
    filterSearch () {
      const params = {};
      console.log(this.filterTool.options, 22222222);
      this.filterTool.options.forEach(item => {
        switch (item.type) {
          case 'date':
            params[item.field] = this.$moment(item.value).format('YYYY-MM-DD');
            break;
          case 'datetime':
            params[item.field] = this.$moment(item.value).format('YYYY-MM-DD HH:mm:ss');
            break;
          case 'daterange':
            params[item.field] = item.value.map(item => this.$moment(item).format('YYYY-MM-DD'));
            break;
          case 'datetimerange':
            params[item.field] = item.value.map(item => this.$moment(item).format('YYYY-MM-DD HH:mm:ss'));
            break;
          case 'daterange2':
            params[item.field] = item.value.map(item => this.$moment(item).format('YYYY-MM-DD'));
            break;
          case 'datetimerange2':
            params[item.field] = item.value.map(item => this.$moment(item).format('YYYY-MM-DD HH:mm:ss'));
            break;
          default:
            params[item.field] = item.value;
        }
      });
      this.$emit('filter-search', params);
    },
    filterReset () {
      this.filterTool.options.forEach(item => {
        if (item.defaultValue !== undefined && item.defaultValue !== null) {
          item.value = item.defaultValue;
        } else {
          if (Array.isArray(item.value)) {
            item.value = [];
          } else {
            item.value = '';
          }
        }
      });
      this.$emit('filter-reset');
    }
  }
};
</script>

<style lang="scss">
.common-toolbar {
  display: flex;
  flex-wrap: wrap;
  padding-top: 2px;

  .el-input {
    width: 160px;
  }

  .el-cascader .el-input {
    width: 200px;
  }
}

.tool-item {
  display: inline-flex;
  margin-bottom: 10px;
  margin-right: 15px;
  margin-left: 0 !important;
}

.filter-con {
  .custom-element {
    margin-bottom: 10px;
    margin-right: 15px;
    margin-left: 0 !important;
    vertical-align: top;

    &:not(.el-button) {
      line-height: 28px;
    }

    .el-checkbox {
      vertical-align: top;
    }

    .el-date-editor--datetime {
      width: 190px;
    }

    .el-date-editor--daterange {
      width: 220px;
    }

    .el-date-editor--datetimerange {
      width: 350px;
    }
  }
}

.el-popper.tool-item-popover {
  min-width: 80px;

  .el-button {
    display: block;
    margin-left: 0 !important;
    margin-top: 5px;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
