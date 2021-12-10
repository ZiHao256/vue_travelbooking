<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/customer' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>旅馆管理</el-breadcrumb-item>
      <el-breadcrumb-item>预定列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="hotelList" border strip :default-sort="{prop:'pk', order:'descending'}">
        <el-table-column sortable min-width="130" prop="pk" label="resvKey"></el-table-column>
        <el-table-column sortable min-width="130" prop="fields.hotelLocation" label="hotelLocation"></el-table-column>
        <el-table-column sortable min-width="100" prop="fields.resStatus" label="resStatus">
        </el-table-column>
        <el-table-column sortable min-width="220" prop="fields.buildTime" label="buildTime">
        </el-table-column>
        <el-table-column sortable min-width="220" prop="fields.startTime" label="startTime">
        </el-table-column>
        <el-table-column sortable min-width="220" prop="fields.endTime" label="endTime">
        </el-table-column>
        <el-table-column fixed="right" min-width="240" label="操作">
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
                @click="startHotel(scope.row)"
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
                @click="endHotel(scope.row)"
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
                @click="cancelHotel(scope.row)"
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
        :total=this.total>
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
        hotelList: []
      }
    },
    // 生命周期函数
    created() {
      this.getHotelList()
    },
    methods: {
      async getHotelList() {
        const {data: result} = await this.$http.get('show_res_hotel', {
          params: this.queryInfo
        })
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.total = result.total
        this.hotelList = result.list
        //   console.log(result.list.pk)
      },
      async startHotel(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          hotelLocation: list.fields.hotelLocation
        })
        const {data: result} = await this.$http.post(
          'start_res_hotel', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getHotelList()
        this.$message.success(result.msg)
      },
      async endHotel(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          hotelLocation: list.fields.hotelLocation
        })
        const {data: result} = await this.$http.post(
          'end_res_hotel', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getHotelList()
        this.$message.success(result.msg)
      },
      async cancelHotel(list) {
        const postData = this.$qs.stringify({
          resvKey: list.pk,
          hotelLocation: list.fields.hotelLocation
        })
        const {data: result} = await this.$http.post(
          'end_res_hotel', postData
        )
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.getHotelList()
        this.$message.success(result.msg)
      },
      //  分页
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getHotelList()
      },
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getHotelList()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
