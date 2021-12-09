<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/customer' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>航班管理</el-breadcrumb-item>
      <el-breadcrumb-item>航班列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
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
        <el-table-column label="操作">
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
                @click="showResFlight(scope.row.pk)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改用户对话框 -->
    <el-dialog title="预定flight" :visible.sync="resFlightDialogVisible" width="50%">
      <!-- 内容主体区 -->
      <el-form
        ref="resFlightFormRef"
        :rules="resFlightFormRules"
        :model="resFlightForm"
        label-width="80px"
      >
        <el-form-item label="flightNum" prop="pk">
          <el-input v-model="resFlightForm.flightNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="price" prop="price">
          <el-input v-model.number="resFlightForm.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="numSeats" prop="numSeats">
          <el-input v-model.number="resFlightForm.numSeats" disabled></el-input>
        </el-form-item>
        <el-form-item label="numAvail" prop="numAvail">
          <el-input v-model.number="resFlightForm.numAvail" disabled></el-input>
        </el-form-item>
        <el-form-item label="FromCity" prop="FromCity">
          <el-input v-model="resFlightForm.FromCity" disabled></el-input>
        </el-form-item>
        <el-form-item label="ArivCity" prop="ArivCity">
          <el-input v-model="resFlightForm.ArivCity" disabled></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resFlightDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="resFlight">确 定</el-button>
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
      resFlightDialogVisible: false,
      resFlightForm:{
        flightNum:'',
        price: '',
        numSeats:'',
        numAvail:'',
        FromCity:'',
        ArivCity:''
      },
      resFlightFormRules:[]
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
    async showResFlight(flightNum){
      const {data:result} = await this.$http.get(
        'show_flight'+'?flightNum='+flightNum
      )
      console.log(result)
      if (result.error_num !== -1) return this.$message.error(result.msg)
      this.resFlightForm = {
        flightNum:result.list.flightNum,
        price: result.list.price,
        numSeats: result.list.numSeats,
        numAvail: result.list.numAvail,
        FromCity: result.list.FromCity_id,
        ArivCity: result.list.ArivCity_id
      }
      this.resFlightDialogVisible = true
    },
    // 预定航班
    async resFlight(){
      const postData = this.$qs.stringify({
        flightNum: this.resFlightForm.flightNum,
        resvKey: 0
      })
      const {data:result} = await this.$http.post(
        'reserve_flight',postData
      )
      if(result.error_num !== 0) return this.$message.error(result.msg)
      this.$message.success(result.msg)
      this.resFlightDialogVisible = false
      this.getFlightList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
