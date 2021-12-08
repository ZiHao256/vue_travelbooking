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
          <template slot-scope="scope">
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
                @click="showEditCustomer(scope.row.pk)"
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
                @click="deleteCustomer(scope.row.pk)"
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
          <el-input v-model.number="addForm.balance" disabled></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomer">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改location"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <!-- 内容主体区 -->
      <el-form
        ref="editFormRef"
        :rules="addFormRules"
        :model="editForm"
        label-width="80px"
      >
        <el-form-item label="custID" prop="custID">
          <el-input v-model.number="editForm.custID" disabled></el-input>
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password1">
          <el-input v-model="editForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="balance" prop="balance">
          <el-input v-model.number="editForm.balance"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible">取 消</el-button>
        <el-button type="primary" @click="editCustomer">确 定</el-button>
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
      },
      editDialogVisible: false,
      editForm: {
        custID: '',
        name: '',
        password: '',
        balance: 0
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
        if (this.addForm.password1 !== this.addForm.password2) {
          return this.$message.error('密码不一致')
        }
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
    },
    async showEditCustomer(custID) {
      const { data: result } = await this.$http.get(
        'show_customers' + '?custID=' + custID
      )
      console.log(result)
      if (result.error_num !== -1) return this.$message.error(result.msg)
      this.editForm = {
        custID: result.list.custID,
        name: result.list.custName,
        password: result.list.password,
        balance: result.list.balance
      }
      this.editDialogVisible = true
    },
    // 修改Location，预校验
    async editCustomer() {
      const postData = this.$qs.stringify({
        custID: this.editForm.custID,
        custName: this.editForm.name,
        password: this.editForm.password,
        balance: this.editForm.balance
      })
      console.log(postData)
      const { data: result } = await this.$http.post(
        'change_customer',
        postData
      )
      if (result.error_num !== 0) return this.$message.error(result.msg)
      this.$message.success(result.msg)
      this.editDialogVisible = false
      this.getCustomerList()
    },
    // 删除指定location
    async deleteCustomer(custID) {
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除用户，是否继续',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: result } = await this.$http.get(
        'delete_customer' + '?custID=' + custID
      )
      console.log(result)
      this.getCustomerList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
