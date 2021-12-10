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
          <el-button type="primary" @click="addDialogVisible = true"
            >添加地点</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="locationList" border strip>
        <el-table-column prop="pk" label="城市"> </el-table-column>
        <el-table-column prop="fields.riskLevel" label="riskLevel">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
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
                @click="showEditLocation(scope.row.pk)"
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
                @click="deleteLocation(scope.row.pk)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
            <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加地点" :visible.sync="addDialogVisible" width="50%">
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
        <el-form-item label="riskLevel" prop="riskLevel">
          <el-input v-model="addForm.riskLevel"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLocation">确 定</el-button>
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
        <el-form-item label="location" prop="location">
          <el-input v-model="editForm.location" disabled></el-input>
        </el-form-item>
        <el-form-item label="riskLevel" prop="riskLevel">
          <el-input v-model="editForm.riskLevel"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false ">取 消</el-button>
        <el-button type="primary" @click="editLocation">确 定</el-button>
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
      addDialogVisible: false,
      editDialogVisible: false,
      // 添加location的表单数据
      addForm: {
        location: '',
        riskLevel: ''
      },
      addFormRules: {
        location: [{ required: true, message: '输入', trigger: 'blur' }],
        riskLevel: [{ required: true, message: '输入', trigger: 'blur' }]
      },
      editForm: {
        location: '',
        riskLevel: ''
      },
      editFormRules: {
        location: [{ required: true, message: '输入', trigger: 'blur' }],
        riskLevel: [{ required: true, message: '输入', trigger: 'blur' }]
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
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return this.$message.error('error')
        // 预校验成功,发起添加用户的网络请求
        const postData = this.$qs.stringify({
          location: this.addForm.location,
          riskLevel: this.addForm.riskLevel
        })
        const { data: result } = await this.$http.post(
          'add_location',
          postData
        )
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.$message.success(result.msg)
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 刷新列表
        this.getLocationList()
      })
    },
    async showEditLocation(location) {
      const { data: result } = await this.$http.get(
        'show_location' + '?location=' + location
      )
      console.log(result)
      if (result.error_num !== -1) return this.$message.error(result.msg)
      this.editForm = result.list
      this.editDialogVisible = true
    },
    // 修改Location，预校验
    async editLocation() {
      const postData = this.$qs.stringify({
        location: this.editForm.location,
        riskLevel: this.editForm.riskLevel
      })
      console.log(postData)
      const { data: result } = await this.$http.post('change_location', postData)
      if (result.error_num !== 0) return this.$message.error(result.msg)
      this.$message.success(result.msg)
      this.editDialogVisible = false
      this.getLocationList()
    },
    // 删除指定location
    async deleteLocation(location) {
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除用户，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: result } = await this.$http.get('delete_location' + '?location=' + location)
      console.log(result)
      this.getLocationList()
    },
        //  分页
      handleSizeChange(newSize){
        console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getLocationList()
      },
      handleCurrentChange(newPage){
        console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getLocationList()
      }
  }
}
</script>

<style lang="less" scoped>
</style>
