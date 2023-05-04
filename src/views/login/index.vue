
<!--
 * 登录页
-->
<template>
  <div class="loginPage">
    <h1 class="login-title">XXX系统管理平台</h1>
    <el-form
      ref="loginForm"
      :model="form"
      auto-complete="on"
      label-width="50px"
      :rules="loginRules"
      class="login-box"
      v-loading="loading"
      element-loading-text="登录中"
    >
      <el-col
        class="col1"
        :span="14"
      >
        <h4>用户登录</h4>
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input
            type="text"
            name="usernameM"
            auto-complete="on"
            placeholder="请输入账号"
            v-model="form.username"
          >
            <i slot="prefix">
              <img
                class="inputImg"
                src="../../assets/image/headerImg/用户.png"
                alt
              />
            </i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            ref="password"
            :type="passwordType"
            auto-complete="on"
            name="pwdM"
            placeholder="请输入密码"
            v-model="form.password"
            @keyup.enter.native="login('loginForm')"
          >
            <i slot="prefix">
              <img
                class="inputImg"
                src="../../assets/image/headerImg/设置新密码-密码.png"
                alt
              />
            </i>
            <i
              @click="showPwd"
              slot="suffix"
              style="display: flex;align-items: center;"
            >
              <img
                v-show="passwordType === 'password'"
                class="inputImg"
                src="../../assets/image/headerImg/showPwd.png"
                alt
              />
              <img
                v-show="!passwordType"
                class="inputImg"
                src="../../assets/image/headerImg/hidePwd.png"
                alt
              />
            </i>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="checkCode"
          class="checkCode"
        >
          <el-input
            type="text"
            name="verCode"
            auto-complete="on"
            @keyup.enter.native="login('loginForm')"
            placeholder="请输入验证码"
            v-model="form.checkCode"
          ></el-input>
          <createVerifyCode
            :identify-code="identifyCode"
            @click.native="createCode"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-button"
            type="primary"
            @click.native.prevent="login('loginForm')"
          >登录</el-button>
        </el-form-item>
      </el-col>
      <el-col
        class="col2"
        :span="10"
      >
        <div class="col2-ch"></div>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/login';
import createVerifyCode from '@/components/VerifyCode/createVerifyCode';
import { accountValidator, pwdValidator } from '@/libs/validator';
import { setTokenInfo } from '@/api/token';

export default {
  components: {
    createVerifyCode
  },
  data () {
    const validateVerCode = (rule, value, callback) => {
      // 对验证码验证
      if (value !== this.identifyCode) {
        callback(new Error('验证码有误，请重新输入！'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      identifyCode: '',
      passwordType: 'password',
      form: {
        username: '',
        password: '',
        checkCode: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: accountValidator
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: pwdValidator
          }
        ],
        checkCode: [
          {
            required: true,
            trigger: 'blur',
            validator: validateVerCode
          }
        ]
      }
    };
  },
  created () {
    this.createCode();
    if (this.form.username === 'admin') {
      this.form.checkCode = this.identifyCode;
    }
  },
  methods: {
    showPwd () {
      console.log('点击密码显示隐藏', this.passwordType);
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      // 聚焦密码
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    createCode () {
      // 生成验证码
      this.identifyCode = this.randomIdentifyCode(4);
      // alert(this.identifyCode)
    },
    randomIdentifyCode (num, str) {
      const len = num || 4;
      const $chars = str || '1234567890abcdefghijklmnopqrstuvwxyz';
      const maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          api
            .login({ name: this.form.username, password: this.form.password })
            .then(res => {
              // console.log(res, '登录信息');
              setTokenInfo({
                refreshToken: res.Authorization,
                accessToken: res.Authorization,
                accessTokenExpireTimestamp: Date.now() + 6 * 1000
              });
              this.$store.commit('SET_USERNAME', res.userInfo);
              // 测试时半秒后再执行
              setTimeout(() => {
                // this.$store.dispatch('menu/initCurrentUserMenu');
                this.$message.success('登录成功');
                this.$router.push('/home');
                this.loading = false;
              }, 500);
            })
            .catch((err) => {
              // console.log(err);
              // this.createCode();
              this.$message.error(err);
              // this.$router.push('/home');
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.loginPage {
  position: relative;
  height: 100%;
  min-height: 500px;
  background-color: #ecf5ff;
  background: url(../../assets/image/login_bg.png) no-repeat 50%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h4 {
    text-align: center;
    font-size: 26px;
    color: #1895ff;
    padding: 20px 0;
  }
}

$bg: #2d3a4b;
$black: #000000; //图标颜色
$light_gray: #eee;
.inputImg {
  color: #409eff;
  width: 20px;
  padding: 9px;
  height: 20px;
}

.login-box {
  border: 1px solid #dcdfe6;
  width: 700px;
  height: 380px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  //padding: 35px 50px 15px 40px;
  border-radius: 20px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  box-shadow: 0 0 20px #5d80e9;

  .col1 {
    margin: 10px 0 10px 20px;
  }

  .col2 {
    margin: -1px -1px -1px 20px;
    border: #5d80e9 solid 1px;
    border-radius: 0 8px 8px 0;
    padding-left: 10px;
    background-color: #305feb;

    .col2-ch {
      height: 100%;
      // background: url(../../assets/image/headerImg/loginLogo.png) no-repeat 50%;
      background-size: 100%;
    }
  }
}

::v-deep .el-form-item__label {
  width: 55px !important;
}

::v-deep .el-form-item__content {
  margin-left: 55px !important;
}

::v-deep .el-loading-mask {
  border-radius: 8px;
}

::v-deep .el-input--mini .el-input__inner {
  //margin-left: 10px;
  height: 38px;
  padding-left: 40px;
  line-height: 38px;
  font-size: 16px;
}

.checkCode {
  ::v-deep .el-form-item__content {
    margin: 0 0 0 10px !important;
    display: flex;
    flex-direction: row;

    .el-input--mini {
      margin-right: 10px;

      input {
        height: 40px;
        line-height: 40px;
      }
    }
  }

  .verifyCodeCanvas {
    width: 100px;
    line-height: 100%;
    border-radius: 3px;
    box-shadow: 0 8px 8px 0 rgba(71, 19, 19, 0.1);

    canvas {
      border-radius: 3px;
      width: 100px;
      height: 38px;
    }

    #s-canvas {
      border-radius: 3px;
      width: 100px;
      height: 38px;
    }
  }

  .tipOpt {
    width: 60px;
    margin-left: 20px;
    float: left;
    text-align: left;
    line-height: 20px;
    padding-top: 8px;
    cursor: pointer;
    color: #329cf6;
    display: none;
  }
}

.login-title {
  text-align: center;
  margin: 0 auto 15px auto;
  color: #ffffff;
  font-size: 48px;
}

.login-button {
  width: 100%;
  margin: 15px auto 0 auto;
  background-color: #5582f3;
}

.sidebar-logo-link {
  height: 100%;
  width: 100%;
}
</style>
