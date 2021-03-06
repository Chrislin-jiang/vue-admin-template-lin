<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      style="background-color:#fff; opacity: 0.7;"
    >

      <div class="title-container">
        <h2 class="title">吊装安全性评价系统</h2>
        <!-- <h3 class="title">登录</h3> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="success"
        style="width:100%;margin-top:10px;margin-bottom:10px;font-family: Times New Roman, STKaiti, STXingkai, Avenir, Helvetica Neue,Arial, Helvetica, sans-serif;font-size:23px"
        @click.native.prevent="handleLogin"
      >登 录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span> 密码: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少为6为数字'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((err) => {
            this.loading = false
            this.$message.error(err); //登录失败提示错误
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

// $bg: #283443;
$bg: #fffffd;
$light_gray: rgb(63, 177, 78);
$cursor: rgb(32, 153, 42);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    font-family: Times New Roman, STKaiti, STXingkai, Avenir, Helvetica Neue,
      Arial, Helvetica, sans-serif;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    font-family: Times New Roman, STKaiti, STXingkai, Avenir, Helvetica Neue,
      Arial, Helvetica, sans-serif;
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      font-size: 20px;
      background: transparent;
      border: 1px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 12px 12px 15px;
      color: $light_gray;
      height: 47px;
      line-height: 70px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 2px solid rgba(101, 161, 95, 0.1);
    background: rgba(78, 78, 78, 0.1);
    border-radius: 8px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
// $bg: #2d3a4b;
$bg: #b1c561;
$dark_gray: #4c9c3c;
$light_gray: rgb(54, 150, 66);

.login-container {
  min-height: 100%;
  width: 100%;
  font-family: STKaiti, STXingkai, Avenir, Helvetica Neue, Arial, Helvetica,
    sans-serif;
  background-color: $bg;
  overflow: hidden;
  background-image: url("../../assets/images/crane1.jpeg");
  background-repeat: no-repeat;
  // background-size: 100%;
  // 表单位置
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 120px 140px auto auto;
    overflow: hidden;
  }

  .tips {
    font-size: 17px;
    color: rgb(58, 124, 63);
    margin-bottom: 20px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 10px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    // height: 10px;

    .title {
      font-size: 40px;
      color: $light_gray;
      font-family: STKaiti, STXingkai, Avenir, Helvetica Neue, Arial, Helvetica,
        sans-serif;
      padding: 0px auto 40px auto;
      // margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 20px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
