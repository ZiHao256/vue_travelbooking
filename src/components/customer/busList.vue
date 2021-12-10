<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/customer' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大巴管理</el-breadcrumb-item>
      <el-breadcrumb-item>预定列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="busList" border strip :default-sort="{prop:'pk', order:'descending'}">
        <el-table-column sortable min-width="130" prop="pk" label="resvKey"></el-table-column>
        <el-table-column sortable min-width="130"  prop="fields.busLocation" label="busLocation"></el-table-column>
        <el-table-column sortable min-width="130" prop="fields.resStatus" label="resStatus">
        </el-table-column>
        <el-table-column sortable width="220" prop="fields.buildTime" label="buildTime">
        </el-table-column>
        <el-table-column sortable width="220" prop="fields.startTime" label="startTime">
        </el-table-column>
        <el-table-column sortable width="220" prop="fields.endTime" label="endTime">
        </el-table-column>
        <el-table-column fixed="right" width="240" label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
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
                @click="startBus(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 修改按钮 -->
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
                @click="endBus(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 修改按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="取消"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-delete"
                @click="cancelBus(scope.row)"
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
        busList: []
      }
    },
    // 生命周期函数
    created() {
      this.getBusList()
    },
    methods: {
      async getBusList() {
        const {data: result} = await this.$http.get('show_res_bus', {
          params: this.queryInfo
        })
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.total = result.total
        this.busList = result.list
        //   console.log(result.list.pk)
        console.log(this.busList)
      },
      async startBus(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          busLocation: list.fields.busLocation
        })
        const {data: result} = await this.$http.post(
          'start_res_bus', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getBusList()
        this.$message.success(result.msg)
      },
      async endBus(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          busLocation: list.fields.busLocation
        })
        const {data: result} = await this.$http.post(
          'end_res_bus', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getBusList()
        this.$message.success(result.msg)
      },
      async cancelBus(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          busLocation: list.fields.busLocation
        })
        const {data: result} = await this.$http.post(
          'end_res_bus', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getBusList()
        this.$message.success(result.msg)
      },
      //  分页
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getBusList()
      },
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getBusList()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
