<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大巴管理</el-breadcrumb-item>
      <el-breadcrumb-item>大巴列表</el-breadcrumb-item>
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
            >添加大巴</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="busList" border strip>
        <el-table-column prop="pk" label="location"> </el-table-column>
        <el-table-column prop="fields.price" label="price"> </el-table-column>
        <el-table-column prop="fields.numSeats" label="numSeats">
        </el-table-column>
        <el-table-column prop="fields.numAvail" label="numAvail">
        </el-table-column>
        <el-table-column prop="操作" label="操作">
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
    <el-dialog title="添加大巴" :visible.sync="dialogVisible" width="50%">
      <!-- 内容主体区 -->
      <el-form
        ref="addFormRef"
        :rules="addFormRules"
        :model="addForm"
        label-width="80px"
      >
        <el-form-item label="location" prop="location">
          <el-input v-model="addForm.location"></el-input>
        </el-form-item>
        <el-form-item label="price" prop="price">
          <el-input v-model.number="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="numSeats" prop="numSeats">
          <el-input v-model.number="addForm.numSeats"></el-input>
        </el-form-item>
        <el-form-item label="numAvail" prop="numAvail">
          <el-input v-model.number="addForm.numAvail"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBus">确 定</el-button>
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
      busList: [],
      dialogVisible: false,
      // 添加location的表单数据
      addForm: {
        location: '',
        price: '',
        numSeats: '',
        numAvail: ''
      },
      addFormRules: {
        location: [{ required: true, message: '输入', trigger: 'blur' }],
        price: [{ required: true, message: '输入', trigger: 'blur' }]
      }
    }
  },
  // 生命周期函数
  created() {
    this.getBusList()
  },
  methods: {
    async getBusList() {
      const { data: result } = await this.$http.get('show_bus', {
        params: this.queryInfo
      })
      console.log(result)
      if (result.error_num !== 0) return this.$message.error(result.msg)
      this.total = result.total
      this.busList = result.list
      //   console.log(result.list.pk)
      console.log(this.hotelList)
    },
    // 添加新location，先预校验
    addBus() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return this.$message.error('error')
        // 预校验成功,发起添加用户的网络请求
        const postData = this.$qs.stringify({
          location: this.addForm.location,
          price: this.addForm.price,
          numSeats: this.addForm.numSeats,
          numAvail: this.addForm.numAvail
        })
        const { data: result } = await this.$http.post('add_bus', postData)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.$message.success(result.msg)
        // 隐藏添加用户的对话框
        this.dialogVisible = false
        // 刷新列表
        this.getBusList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
