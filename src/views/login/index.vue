<template>
  <div class="login">
    <!-- elementui -->
      <el-card class="login-card" shadow="hover">
        <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form ref="formObj" style="margin-top:35px" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
              <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号">
              </el-input>
          </el-form-item >
          <el-form-item prop="code">
              <el-input v-model="loginForm.code" style="width:250px" placeholder="请输入验证码"></el-input>
              <el-button type="primary" plain style="float:right">获取验证码</el-button>
          </el-form-item>
          <el-form-item prop="checked">
            <el-checkbox v-model='loginForm.checked'>我已阅读并同意用户协议及服务条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style='width:100%' type="primary" @click="login" round>
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入正确的手机号码' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }],
        code: [{ required: true, message: '请输入正确的验证码' }, {
          pattern: /^\d{6}$/, message: '请输入正确的验证码' }],
        checked: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('请勾选用户协议'))
          }
        } }]
      }
    }
  },
  methods: {
    login () {
      this.$ref.formObj.validate(function (isOK) {
        if (isOK) {
          alert('1')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
  background-image: url('../../assets/img/login_bg.jpg');
  background-size: cover;
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  .login-card{
   width: 440px;
   height: 360px;
  .title{
     text-align: center;
     img{
       height:40px;
     }
   }
  }
}

</style>
