<!--
 * 公共组件：对话框
-->
<template>
  <el-dialog
    :id="logdata.id"
    ref="elDialog"
    class="custom-dialog-container"
    center
    append-to-body
    :title="logdata.title"
    :visible.sync="logdata.visible"
    :close-on-click-modal="false"
    :class="logdata.className"
    :width="logdata.width"
    :before-close="handleCloseBefore"
    @open="()=> { this.$emit('handleOpen') }"
    @close="()=> { if(this.logdata.model !== 'add') {this.$refs['ruleForm'].resetFields();} this.$emit('handleClose') }"
    @opened="()=> { this.$emit('handleOpened') }"
    @closed="()=> { this.successClose = true; this.$emit('handleClosed') }"
  >
    <el-form
      v-if="logdata.visible"
      label-position="left"
      label-width="auto"
      label-suffix="："
      :size="logdata.size || 'mini'"
      :rules="logdata.rules"
      :model="logdata.propKeyValue"
      ref="ruleForm"
    >
      <el-row>
        <el-col
          class="el-col-zs"
          v-for="(item, index) in logdata.data"
          :span="24 / item.howWidth || 24"
          :key="index"
        >
          <el-form-item
            class="form-item-zs"
            :class="{form_item_dt:item.type === undefined}"
            :label="item.label"
            :prop="item.key"
          >
            <div v-if="item.type === 'self'">
              <slot :name="item.key"></slot>
            </div>
            <el-input
              class="content-tem"
              v-else-if="item.type === 'input'"
              :disabled="item.disabled"
              :placeholder="item.placeholder || '请输入内容'"
              v-model="logdata.propKeyValue[item.key]"
            ></el-input>
            <el-select
              class="content-tem"
              v-else-if="item.type === 'select'"
              :filterable="item.filterable"
              :disabled="item.disabled"
              :placeholder="item.placeholder || '请选择'"
              v-model="logdata.propKeyValue[item.key]"
            ></el-select>
            <template v-else-if="item.type === 'checkboxGroup'">
              <div class="content-tem">
                <el-checkbox-group v-model="logdata.propKeyValue[item.key]">
                  <el-checkbox
                    v-for="(oItem, oIndex) in item.options"
                    :disabled="item.disabled"
                    :label="oItem.value"
                    :key="oItem + oIndex"
                  >{{ oItem.label }}
                  </el-checkbox>
                  <!--<el-checkbox>aaaa</el-checkbox>-->
                </el-checkbox-group>
              </div>
            </template>
            <template v-else-if="item.type === 'textarea'">
              <div class="content-tem">
                <el-input
                  v-model="logdata.propKeyValue[item.key]"
                  type="textarea"
                  :rows="item.rows || 5"
                  :style="{ width: item.areaWidth, height: item.areaHeight }"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder"
                />
              </div>
            </template>
            <template v-else-if="item.type === 'radio'">
              <div class="content-tem">
                <el-radio
                  v-for="(vRadio, iRadio) in item.options"
                  :disabled="item.disabled"
                  v-model="logdata.propKeyValue[item.key]"
                  :label="vRadio.value"
                  :key="iRadio"
                >{{ vRadio.label }}
                </el-radio>
              </div>
            </template>
            <el-cascader
              class="content-tem"
              v-else-if="item.type === 'cascade'"
              v-model="logdata.propKeyValue[item.key]"
              :options="item.options"
              :disabled="item.disabled"
              :placeholder="item.placeholder || '请选择'"
              :show-all-levels="item.showAllLevels !== false"
              :props="item.props"
            ></el-cascader>
            <el-cascader-panel
              v-else-if="item.type === 'cascadePanel'"
              :props="item.props"
              v-model="logdata.propKeyValue[item.key]"
              :clearable="true"
              :options="item.options"
            ></el-cascader-panel>
            <span
              v-else>{{ logdata.propKeyValue[item.key] === '' ? '---' : logdata.propKeyValue[item.key] }}</span>
            <div
              style="border-bottom: 1px solid #333;"
              v-for="(vItem, vIndex) in item.children"
              :key="vIndex"
            >
              <el-input
                v-if="vItem.type === 'input'"
                v-model="vItem.value"
                placeholder="请输入内容"
              ></el-input>
              <el-select
                v-else-if="vItem.type === 'select'"
                v-model="vItem.value"
                placeholder=""
              ></el-select>
              <span v-else>{{ vItem.value === '' ? '---' : vItem.value }}</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="falseClosed">{{logdata.cancel || '取 消'}}</el-button>
      <el-button
        type="primary"
        @click="handUp"
      >{{logdata.submit || '确 定'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'eDialog',
  props: {
    logdata: {
      type: Object,
      default: () => { }
    },
    width: {
      type: [Number, String],
      default: () => 600
    }
  },
  data () {
    return {
      successClose: false
    };
  },
  methods: {
    handleCloseBefore (done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
      done();
    },
    falseClosed () {
      this.$emit('falseClosed');
      this.logdata.visible = false;
    },
    // refreshf() {
    //   debugger;
    //   this.$refs['ruleForm'].resetFields();
    // },
    handUp () {
      this.$emit('handUp', this.logdata.propKeyValue);
      this.successClose = false;
      this.logdata.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  padding: 10px 20px;
  background-color: #2b77e7;
  text-align: left;
  min-height: 24px;
}
::v-deep .el-dialog__body {
  max-height: 600px;
  overflow: auto;
}
::v-deep .el-form-item__label-wrap,
::v-deep .el-form-item__content {
  margin: 0 !important;
}
::v-deep .el-dialog__title {
  color: #ffffff;
}
::v-deep .el-dialog__headerbtn {
  top: 15px;
}
::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}
// 表单编辑
.form-item-zs {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
  ::v-deep > div {
    white-space: nowrap;
  }
  margin: 2px 5px 0 5px;
}
// 表单详情
.form_item_dt {
  justify-content: flex-start;
  padding-bottom: 5px;
}
::v-deep .el-dialog--center .el-dialog__footer {
  text-align: right;
  margin-right: 5px;
}
</style>
