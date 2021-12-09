<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/customer' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>航班管理</el-breadcrumb-item>
      <el-breadcrumb-item>预定列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="flightList" border strip>
        <el-table-column prop="pk" label="resvKey"></el-table-column>
        <el-table-column prop="fields.flightNum" label="flightNum"></el-table-column>
        <el-table-column prop="fields.resStatus" label="resStatus">
        </el-table-column>
        <el-table-column prop="fields.buildTime" label="buildTime">
        </el-table-column>
        <el-table-column prop="fields.startTime" label="startTime">
        </el-table-column>
        <el-table-column prop="fields.endTime" label="endTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 开始按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="开始"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="startFlight(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 完成按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="完成"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="endFlight(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 取消按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="取消"
              placement="top"
            >
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-delete"
                @click="cancelFlight(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 查看路线按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="查看旅游路线"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-delete"
                @click="showLines(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="查看以该航班开始的旅游路线" :visible.sync="showLinesDialog" width="50%">
      <span>
          <el-alert
            v-if="is_complete"
            title="旅游路线完整！"
            type="success">
          </el-alert>
          <el-alert
            v-if="!is_complete"
              title="旅游路线不完整！"
              type="warning">
          </el-alert>
      </span>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in this.line" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showLinesDialog = false">取 消</el-button>
        <el-button type="primary" @click="showLinesDialog=false">确 定</el-button>
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
        //  展示路线的数据
        showLinesDialog: false,
        showLinesInfo: {
          pagenum: 1,
          pagesize: 10,
          resvKey: ''
        },
        is_complete: '',
        line: []

      }
    },
    // 生命周期函数
    created() {
      this.getFlightList()
    },
    methods: {
      async getFlightList() {
        const {data: result} = await this.$http.get('show_res_flight', {
          params: this.queryInfo
        })
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.total = result.total
        this.flightList = result.list
      },
      // 开始航班订单
      async startFlight(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          flightNum: list.fields.flightNum
        })
        const {data: result} = await this.$http.post(
          'start_res_flight', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getFlightList()
        this.$message.success(result.msg)
      },
      // 结束航班订单
      async endFlight(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          flightNum: list.fields.flightNum
        })
        const {data: result} = await this.$http.post(
          'end_res_flight', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getFlightList()
        this.$message.success(result.msg)
      },
      // 取消航班
      async cancelFlight(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          flightNum: list.fields.flightNum
        })
        const {data: result} = await this.$http.post(
          'end_res_flight', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getFlightList()
        this.$message.success(result.msg)
      },
      async showLines(list) {
        this.showLinesDialog = true
        this.showLinesInfo.resvKey = list.pk
        const {data: result} = await this.$http.get(
          'show_lines', {
            params: this.showLinesInfo
          })
        console.log(result)
        this.is_complete = result.is_complete
        this.line = result.line
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
