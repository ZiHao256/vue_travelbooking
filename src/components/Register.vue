<template>
  <el-container class="register_container">
    <el-header>
      <span class="text"> 注册页面 </span>
    </el-header>
    <el-main>
      <!-- 注册表单 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        label-width="100px"
        class="register_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="adminID" label="ID">
          <el-input
            prefix-icon="el-icon-user"
            v-model.number="registerForm.adminID"
          ></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password1" label="设置密码：">
          <el-input
            size="medium"
            v-model="registerForm.password1"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!--确认密码：-->
        <el-form-item prop="password2" label="确认密码：">
          <el-input
            size="medium"
            v-model="registerForm.password2"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!--姓名：-->
        <el-form-item prop="name" label="姓名:">
          <el-input
            size="medium"
            v-model="registerForm.name"
            prefix-icon="el-icon-edit-outline"
            type="text"
          ></el-input>
        </el-form-item>
        <!--按钮区域-->
        <div class="button_style">
          <el-form-item class="btns">
            <el-button type="primary" @click="register">注册</el-button>

            <el-button type="info" @click="back">返回 </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        adminID: null,
        password1: null,
        password2: null,
        name: null
      },
      registerFormRules: {
        adminID: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            type: 'number',
            message: '请输入数字值',
            trigger: 'blur'
          }
        ],
        password1: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,

            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 4,

            message: '长度在 2到 4 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    register() {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('注册失败！')
        }
        if (this.registerForm.password1 !== this.registerForm.password2) {
          return this.$message.error('密码不一致')
        }
        var adminID = this.registerForm.adminID
        var password1 = this.registerForm.password1
        var password2 = this.registerForm.password2
        var name = this.registerForm.name
        const postData = this.$qs.stringify({
          adminID: adminID,
          password1: password1,
          password2: password2,
          name: name
        })
        const { data: result } = await this.$http.post(
          'admin_register',
          postData
        )
        if (result.error_num !== 3) {
          return this.$message.error(result.msg)
        }
        this.$message.success(result.msg)
        this.$router.push('/login')
      })
    },
    back() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
