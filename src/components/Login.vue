<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item>
          <el-input prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="button_box">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
// scoped 限制样式只在这个组件生效,less格式
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

//盒子样式
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;

  position: absolute; //绝对位置
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); //位移
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee; //加边框
  border-radius: 50%; //圆边框
  padding: 10px; //头像和边框间隔
  box-shadow: 0 0 10px; //外边框的阴影
  background-color: #fff;

  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form{
    position:absolute;
    bottom: 0;
    width: 100%;
    padding:0 30px;
    box-sizing: border-box;

}

.button_box{
    display: flex;
    justify-content: flex-end;
}
</style>
