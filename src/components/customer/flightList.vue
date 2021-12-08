<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>航班管理</el-breadcrumb-item>
      <el-breadcrumb-item>航班列表</el-breadcrumb-item>
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
            >添加航班</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="flightList" border strip>
        <el-table-column prop="pk" label="flightNum"> </el-table-column>
        <el-table-column prop="fields.FromCity" label="FromCity">
        </el-table-column>
        <el-table-column prop="fields.ArivCity" label="ArivCity">
        </el-table-column>
        <el-table-column prop="fields.numSeats" label="numSeats">
        </el-table-column>
        <el-table-column prop="fields.numAvail" label="numAvail">
        </el-table-column>
        <el-table-column prop="fields.price" label="price"> </el-table-column>
        <el-table-column prop="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="预定该航班"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showEditFlight(scope.row.pk)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加航班" :visible.sync="dialogVisible" width="50%">
      <!-- 内容主体区 -->
      <el-form
        ref="addFormRef"
        :rules="addFormRules"
        :model="addForm"
        label-width="80px"
      >
        <el-form-item label="flightNum" prop="pk">
          <el-input v-model="addForm.flightNum"></el-input>
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
        <el-form-item label="FromCity" prop="FromCity">
          <el-input v-model="addForm.FromCity"></el-input>
        </el-form-item>
        <el-form-item label="ArivCity" prop="ArivCity">
          <el-input v-model="addForm.ArivCity"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFlight">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改flight" :visible.sync="editDialogVisible" width="50%">
      <!-- 内容主体区 -->
      <el-form
        ref="editFormRef"
        :rules="addFormRules"
        :model="editForm"
        label-width="80px"
      >
        <el-form-item label="flightNum" prop="pk">
          <el-input v-model="editForm.flightNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="price" prop="price">
          <el-input v-model.number="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="numSeats" prop="numSeats">
          <el-input v-model.number="editForm.numSeats"></el-input>
        </el-form-item>
        <el-form-item label="numAvail" prop="numAvail">
          <el-input v-model.number="editForm.numAvail"></el-input>
        </el-form-item>
        <el-form-item label="FromCity" prop="FromCity">
          <el-input v-model="editForm.FromCity"></el-input>
        </el-form-item>
        <el-form-item label="ArivCity" prop="ArivCity">
          <el-input v-model="editForm.ArivCity"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editFlight">确 定</el-button>
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
      flightList: [],
      dialogVisible: false,
      // 添加location的表单数据
      addForm: {
        flightNum: '',
        price: '',
        numSeats: '',
        numAvail: '',
        FromCity: '',
        ArivCity: ''
      },
      addFormRules: {
        flightNum: [{ required: true, message: '输入', trigger: 'blur' }],
        price: [{ required: true, message: '输入', trigger: 'blur' }]
      },
      editDialogVisible: false,
      editForm: {
        flightNum: '',
        price: '',
        numSeats: '',
        numAvail: '',
        FromCity: '',
        ArivCity: ''
      }
    }
  },
  // 生命周期函数
  created() {
    this.getFlightList()
  },
  methods: {
    async getFlightList() {
      const { data: result } = await this.$http.get('show_flight', {
        params: this.queryInfo
      })
      console.log(result)
      if (result.error_num !== 0) return this.$message.error(result.msg)
      this.total = result.total
      this.flightList = result.list
      console.log(result.list.pk)
    },
    // 添加新location，先预校验
    addFlight() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return this.$message.error('error')
        // 预校验成功,发起添加用户的网络请求
        const postData = this.$qs.stringify({
          flightNum: this.addForm.flightNum,
          price: this.addForm.price,
          numSeats: this.addForm.numSeats,
          numAvail: this.addForm.numAvail,
          FromCity: this.addForm.FromCity,
          ArivCity: this.addForm.ArivCity
        })
        const { data: result } = await this.$http.post('add_flight', postData)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.$message.success(result.msg)
        // 隐藏添加用户的对话框
        this.dialogVisible = false
        // 刷新列表
        this.getFlightList()
      })
    },
    async showEditFlight(flightNum) {
      const { data: result } = await this.$http.get(
        'show_flight' + '?flightNum=' + flightNum
      )
      console.log(result)
      if (result.error_num !== -1) return this.$message.error(result.msg)
      this.editForm = {
        flightNum: result.list.flightNum,
        price: result.list.price,
        numSeats: result.list.numSeats,
        numAvail: result.list.numAvail,
        FromCity: result.list.FromCity_id,
        ArivCity: result.list.ArivCity_id
      }
      this.editDialogVisible = true
    },
    // 修改Location，预校验
    async editFlight() {
      const postData = this.$qs.stringify({
        flightNum: this.editForm.flightNum,
        price: this.editForm.price,
        numSeats: this.editForm.numSeats,
        numAvail: this.editForm.numAvail,
        FromCity: this.editForm.FromCity,
        ArivCity: this.editForm.ArivCity
      })
      console.log(postData)
      const { data: result } = await this.$http.post('change_flight', postData)
      if (result.error_num !== 0) return this.$message.error(result.msg)
      this.$message.success(result.msg)
      this.editDialogVisible = false
      this.getFlightList()
    },
    // 删除指定location
    async deleteFlight(flightNum) {
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除航班，是否继续',
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
        'delete_flight' + '?flightNum=' + flightNum
      )
      console.log(result)
      this.getFlightList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
