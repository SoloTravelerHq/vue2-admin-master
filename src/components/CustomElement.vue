<!--
 * 公共组件：元组件
-->
<template>
  <div class="custom-element">
    <template v-if="opt.type === 'slot'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <slot
        :name="opt.field"
        :slot-scope="opt"
      ></slot>
    </template>
    <template v-else-if="opt.type === 'cascader'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-cascader
        v-model="opt.value"
        :options="opt.options"
        :show-all-levels="opt.showAllLevels !== false"
        :props="opt.props"
        clearable
        @change="$emit('change', opt)"
      ></el-cascader>
    </template>
    <template v-else-if="opt.type === 'select'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-select
        v-model="opt.value"
        @change="$emit('change', opt)"
        :clearable="opt.clearable === false ? false : true"
      >
        <el-option
          v-for="option in opt.options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        ></el-option>
      </el-select>
    </template>
    <template v-else-if="opt.type === 'radio'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-radio-group
        v-model="opt.value"
        @change="$emit('change', opt)"
      >
        <el-radio
          v-for="(option, index) in opt.options"
          :key="index"
          :label="option.value"
        >{{ option.label }}
        </el-radio>
      </el-radio-group>
    </template>
    <template v-else-if="opt.type === 'radiobtn'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-radio-group
        v-model="opt.value"
        @change="$emit('change', opt)"
      >
        <el-radio-button
          v-for="(option, index) in opt.options"
          :key="index"
          :label="option.value"
        >{{ option.label }}
        </el-radio-button>
      </el-radio-group>
    </template>
    <template v-else-if="opt.type === 'checkbox'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-checkbox-group
        v-model="opt.value"
        @change="$emit('change', opt)"
      >
        <el-checkbox
          v-for="(option, index) in opt.options"
          :key="index"
          :label="option.value"
        >{{ option.label }}
        </el-checkbox>
      </el-checkbox-group>
    </template>
    <template v-else-if="opt.type === 'input'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-input
        :placeholder="opt.placeholder || '请输入'"
        v-model="opt.value"
        @blur="$emit('blur', opt)"
        @keyup.native.enter="$emit('enter', opt)"
      >
        <i
          v-if="opt.prepend"
          slot="prepend"
          :class="opt.prepend"
          @click="$emit('change', opt)"
        ></i>
        <i
          v-if="opt.append"
          slot="append"
          :class="opt.append"
          @click="$emit('change', opt)"
        ></i>
      </el-input>
    </template>
    <template v-else-if="opt.type === 'date'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-date-picker
        v-model="opt.value"
        type="date"
        :editable="false"
        :clearable="false"
        format="yyyy-MM-dd"
        @change="$emit('change', opt)"
      ></el-date-picker>
    </template>
    <template v-else-if="opt.type === 'datetime'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-date-picker
        v-model="opt.value"
        type="datetime"
        :editable="false"
        :clearable="false"
        format="yyyy-MM-dd HH:mm:ss"
        @change="$emit('change', opt)"
      ></el-date-picker>
    </template>
    <template v-else-if="opt.type === 'daterange'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-date-picker
        v-model="opt.value"
        type="daterange"
        range-separator="~"
        :editable="false"
        :clearable="true"
        format="yyyy-MM-dd"
        @change="$emit('change', opt)"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </template>
    <template v-else-if="opt.type === 'daterange2'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-date-picker
        v-model="opt.value[0]"
        type="date"
        :editable="false"
        :clearable="true"
        format="yyyy-MM-dd"
        placeholder="开始日期"
        @change="$emit('change', opt)"
      ></el-date-picker>
      <i class="icon-range-separator"></i>
      <el-date-picker
        v-model="opt.value[1]"
        type="date"
        :editable="false"
        :clearable="true"
        format="yyyy-MM-dd"
        placeholder="结束日期"
        @change="$emit('change', opt)"
      ></el-date-picker>
    </template>
    <template v-else-if="opt.type === 'datetimerange'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-date-picker
        v-model="opt.value"
        type="datetimerange"
        range-separator="~"
        :editable="false"
        :clearable="false"
        format="yyyy-MM-dd HH:mm:ss"
        @change="$emit('change', opt)"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </template>
    <template v-else-if="opt.type === 'datetimerange2'">
      <span v-if="opt.label">{{ opt.label }}：</span>
      <el-date-picker
        v-model="opt.value[0]"
        type="datetime"
        :editable="false"
        :clearable="false"
        format="yyyy-MM-dd HH:mm:ss"
        placeholder="开始日期"
        @change="$emit('change', opt)"
      ></el-date-picker>
      <i class="icon-range-separator"></i>
      <el-date-picker
        v-model="opt.value[1]"
        type="datetime"
        :editable="false"
        :clearable="false"
        format="yyyy-MM-dd HH:mm:ss"
        placeholder="结束日期"
        @change="$emit('change', opt)"
      ></el-date-picker>
    </template>
  </div>
</template>
<script>
export default {
  name: 'CustomElement',
  props: {
    opt: {
      type: Object,
      default: () => {
      }
      // 结构：{ field: string, ?label: string, value: any, type: string, options: [{ label, value }], ?placeholder: string, ?clearable: boolean }
      // 支持的type：'slot' / 'select' / 'input' / 'radio' / 'checkbox' / 'date' / 'datetime' / 'daterange' / 'datetimerange' / 'daterange2' / 'datetimerange2'
    }
  },
  data () {
    const moment = this.$moment;
    return {
      dateRange: [
        moment()
          .add(-6, 'days')
          .toDate(),
        moment().toDate()
      ], // 默认最近七天
      pickerOptions: {
        // disabledDate(time) {return time.getTime() > Date.now();},
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', [
                moment()
                  .hour(0)
                  .minute(0)
                  .second(0)
                  .toDate(),
                moment()
                  .hour(23)
                  .minute(59)
                  .second(59)
                  .toDate()
              ]);
            }
          },
          {
            text: '最近七天',
            onClick (picker) {
              picker.$emit('pick', [
                moment()
                  .add(-6, 'days')
                  .toDate(),
                moment().toDate()
              ]);
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              picker.$emit('pick', [
                moment()
                  .add(-1, 'months')
                  .toDate(),
                moment().toDate()
              ]);
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              picker.$emit('pick', [
                moment()
                  .add(-3, 'months')
                  .toDate(),
                moment().toDate()
              ]);
            }
          },
          {
            text: '最近一年',
            onClick (picker) {
              picker.$emit('pick', [
                moment()
                  .add(-1, 'years')
                  .toDate(),
                moment().toDate()
              ]);
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.custom-element {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  > span {
    word-break: keep-all;
  }

  .icon-range-separator {
    margin-left: 2px;
    margin-right: 2px;
    width: 3px;
    height: 1px;
    background-color: #333;
  }

  // .el-input__inner::-webkit-input-placeholder {
  //   color: rgba(187, 187, 187, 1);
  //   font-size: 14px;
  // }
  // .el-input__inner:-moz-placeholder {
  //   color: rgba(187, 187, 187, 1);
  //   font-size: 14px;
  // }
  // .el-input__inner::-moz-placeholder {
  //   color: rgba(187, 187, 187, 1);
  //   font-size: 14px;
  // }
  // .el-input__inner:-ms-input-placeholder {
  //   color: rgba(187, 187, 187, 1);
  //   font-size: 14px;
  // }
}
</style>
