<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>乘客管理</el-breadcrumb-item>
      <el-breadcrumb-item>乘客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加乘客</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="customerList" border strip>
        <el-table-column prop="pk" label="乘客id"> </el-table-column>
        <el-table-column prop="fields.custName" label="姓名"> </el-table-column>
        <el-table-column prop="fields.balance" label="余额"> </el-table-column>
        <el-table-column prop="fields.password" label="密码"> </el-table-column>
        <el-table-column prop="操作">
          <template slot-scope="">
            <!-- 修改按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加乘客" :visible.sync="dialogVisible" width="50%">
      <!-- 内容主体区 -->
      <el-form
        ref="addFormRef"
        :rules="addFormRules"
        :model="addForm"
        label-width="80px"
      >
        <el-form-item label="custID" prop="custID">
          <el-input v-model.number="addForm.custID"></el-input>
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="password1" prop="password1">
          <el-input v-model="addForm.password1" type="password"></el-input>
        </el-form-item>
        <el-form-item label="password2" prop="password2">
          <el-input v-model="addForm.password2" type="password"></el-input>
        </el-form-item>
        <el-form-item label="balance" prop="balance">
          <el-input v-model.number="addForm.balance"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取location列表的参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      customerList: [],
      dialogVisible: false,
      // 添加location的表单数据
      addForm: {
        custID: '',
        name: '',
        password1: '',
        password2: '',
        balance: 0
      },
      addFormRules: {
        custID: [{ required: true, message: '输入', trigger: 'blur' }],
        name: [{ required: true, message: '输入', trigger: 'blur' }]
      }
    }
  },
  // 生命周期函数
  created() {
    this.getCustomerList()
  },
  methods: {
    async getCustomerList() {
      const { data: result } = await this.$http.get('show_customers', {
        params: this.queryInfo
      })
      console.log(result)
      if (result.error_num !== 0) return this.$message.error(result.msg)
      this.total = result.total
      this.customerList = result.list
      console.log(result.list.pk)
    },
    // 添加新location，先预校验
    addCustomer() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return this.$message.error('添加失败')
        if (this.addForm.password1 !== this.addForm.password2) return this.$message.error('密码不一致')
        // 预校验成功,发起添加用户的网络请求
        const postData = this.$qs.stringify({
          custID: this.addForm.custID,
          name: this.addForm.name,
          password1: this.addForm.password1,
          password2: this.addForm.password2,
          balance: this.addForm.balance
        })
        const { data: result } = await this.$http.post(
          'cust_register',
          postData
        )
        if (result.error_num !== 3) return this.$message.error(result.msg)
        this.$message.success(result.msg)
        // 隐藏添加用户的对话框
        this.dialogVisible = false
        // 刷新列表
        this.getCustomerList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
