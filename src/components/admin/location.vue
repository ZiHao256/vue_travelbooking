<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>地点管理</el-breadcrumb-item>
      <el-breadcrumb-item>地点列表</el-breadcrumb-item>
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
            >添加地点</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="locationList" border strip>
        <el-table-column prop="pk" label="城市"> </el-table-column>
        <el-table-column prop="fields.riskLevel" label="riskLevel">
        </el-table-column>
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
    <el-dialog title="添加地点" :visible.sync="dialogVisible" width="50%">
      <!-- 内容主体区 -->
      <el-form ref="addFormRef" :rules="addFormRules" :model="addForm" label-width="80px">
        <el-form-item label="location" prop="location">
          <el-input v-model="addForm.location"></el-input>
        </el-form-item>
        <el-form-item label="riskLevel" prop="riskLevel">
          <el-input v-model="addForm.riskLevel"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLocation"
          >确 定</el-button
        >
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
      locationList: [],
      dialogVisible: false,
      // 添加location的表单数据
      addForm: {
        location: '',
        riskLevel: ''
      },
      addFormRules: {
        location: [
          { required: true, message: '输入', trigger: 'blur' }
        ],
        riskLevel: [
          { required: true, message: '输入', trigger: 'blur' }
        ]
      }
    }
  },
  // 生命周期函数
  created() {
    this.getLocationList()
  },
  methods: {
    async getLocationList() {
      const { data: result } = await this.$http.get('show_location', {
        params: this.queryInfo
      })
      console.log(result)
      if (result.error_num !== 0) return this.$message.error(result.msg)
      this.total = result.total
      this.locationList = result.list
      console.log(result.list.pk)
    },
    // 添加新location，先预校验
    addLocation() {
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return this.$message.error('error')
        // 预校验成功,发起添加用户的网络请求
        const postData = this.$qs.stringify({
          location: this.addForm.location,
          riskLevel: this.addForm.riskLevel
        })
        const { data: result } = await this.$http.post('add_location', postData)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.$message.success(result.msg)
        // 隐藏添加用户的对话框
        this.dialogVisible = false
        // 刷新列表
        this.getLocationList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
