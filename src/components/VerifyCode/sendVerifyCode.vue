<!--
 * 短信验证
-->
<template>
  <div class="verify_code">
    <el-input
      v-model.trim="currentValue"
      placeholder="输入短信验证码"
    >
      <template slot="append">
        <el-button
          v-if="notetime == 0"
          @click="getMsgCode"
        >发送验证码</el-button>
        <el-button
          v-else
          :disabled="true"
        >短信已发送 {{ notetime }}秒</el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  props: ['value', 'mobile'],
  data () {
    return {
      notetime: 0,
      timeInterval: null
    };
  },
  created () {
  },
  mounted () {
  },
  computed: {
    currentValue: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    handleSend () {
      this.notetime = 90;
      this.timeInterval = setInterval(() => {
        if (this.notetime === 0) {
          clearInterval(this.timeInterval);
        } else {
          this.notetime--;
        }
      }, 1000);
    },
    getMsgCode () {
      this.$emit('sendmsg', 1);
      setTimeout(() => {
        this.handleSend();
      }, 1000);
      this.$store
        .dispatch('getVerifyCode', this.mobile)
        .then(res => {
          this.$emit('sendmsg', 0);
          if (res.code === 200) {
            // 获取验证码成功
          } else {
            this.$message(res.msg);
            clearInterval(this.timeInterval);
          }
        })
        .catch(() => {
          this.$emit('sendmsg', 0);
          clearInterval(this.timeInterval);
        });
    }
  }
};
</script>

<style lang="scss"></style>
