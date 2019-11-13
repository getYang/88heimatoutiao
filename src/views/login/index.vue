<template>
  <div class="login">
    <!-- elementui -->
      <el-card class="login-card" shadow="hover">
        <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form style="margin-top:35px">
          <el-form-item>
              <el-input></el-input>
          </el-form-item>
          <el-form-item>
              <el-input style="width:250px"></el-input>
              <el-button type="primary" plain style="float:right">获取验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox fill="#67c23a">我已阅读并同意用户协议及服务条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style='width:100%' type="primary" round>
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
