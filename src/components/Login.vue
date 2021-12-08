<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="LoginFormRef"
        label-width="0px"
        :model="LoginForm"
        :rules="LoginFormRules"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="ID">
          <el-input
            prefix-icon="el-icon-user"
            v-model.number="LoginForm.ID"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="LoginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="button_box">
          <span>isadmin</span>
          <el-switch
            v-model="isAdmin"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <el-button size="mini" type="primary" @click="register"
            >注册</el-button
          >
          <el-button size="mini" type="primary" @click="login">登录</el-button>
          <el-button size="mini" type="info" @click="resetLoginForm"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // admin登录表单
      LoginForm: {
        ID: null,
        password: null
      },
      // 是否为管理员
      isAdmin: false,
      // 表单验证
      LoginFormRules: {
        ID: [
          { required: true, message: '请输入登录ID', trigger: 'blur' },
          {
            min: 100,
            max: 99999999,
            type: 'number',
            message: '长度在 3 到 8 的数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入password', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置login表单
    resetLoginForm() {
      this.$refs.LoginFormRef.resetFields()
    },
    // 表单预验证
    login() {
      // 回调函数，登陆时预验证
      this.$refs.LoginFormRef.validate(async (valid) => {
        // console.log(valid)

        if (!valid) return

        if (this.isAdmin === false) {
          // customer 登录
          const postData = this.$qs.stringify({
            custID: this.LoginForm.ID,
            password: this.LoginForm.password
          })

          const { data: result } = await this.$http.post(
            'cust_login',
            postData
          )
          console.log(result)

          if (result.error_num !== 0) return this.$message.error(result.msg)
          else this.$message.success('乘客登陆成功！')

          // 登陆成功之后
          // 1. 保存session
          // window.sessionStorage.setItem("token", result.data.token)

          // 2.编程式导航到后台主页，路由地址 /home
          this.$router.push('/customer')
        } else {
          // admin 登录
          const postData = this.$qs.stringify({
            adminID: this.LoginForm.ID,
            password: this.LoginForm.password
          })

          const { data: result } = await this.$http.post(
            'admin_login',
            postData
          )
          console.log(result)

          if (result.error_num !== 0) return this.$message.error(result.msg)
          else this.$message.success('管理员登陆成功！')

          // 登陆成功之后
          // 1. 保存session
          // window.sessionStorage.setItem("token", result.data.token)

          // 2.编程式导航到后台主页，路由地址 /home
          this.$router.push('/admin')
        }
      })
    },
    register() {
      this.$router.push('/register')
    }
  }
}
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

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}

.button_box {
  display: flex;
  justify-content: flex-end;
}
</style>
