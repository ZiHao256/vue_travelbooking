<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/customer' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>地点管理</el-breadcrumb-item>
      <el-breadcrumb-item>地点列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="locationList" border strip :default-sort="{prop: 'pk', order: 'descending'}">
        <el-table-column sortable prop="pk" label="城市"></el-table-column>
        <el-table-column sortable prop="fields.riskLevel" label="riskLevel">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- 预定Hotel按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="预定Hotel"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showResHotel(scope.row.pk)"
              ></el-button>
            </el-tooltip>

            <!-- 预定Bus按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="预定Bus"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showResBus(scope.row.pk)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页-->
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
    <!-- 修改用户对话框 -->
    <el-dialog
      title="预定Hotel"
      :visible.sync="resHotelDialogVisible"
      width="50%"
    >
      <!-- 内容主体区 -->
      <el-form
        ref="resHotelFormRef"
        :rules="resHotelFormRules"
        :model="resHotelForm"
        label-width="80px"
      >
        <el-form-item label="location" prop="location">
          <el-input v-model="resHotelForm.location" disabled></el-input>
        </el-form-item>
        <el-form-item label="numRooms" prop="numRooms">
          <el-input v-model="resHotelForm.numRooms" disabled></el-input>
        </el-form-item>
        <el-form-item label="numAvail" prop="numAvail">
          <el-input v-model="resHotelForm.numAvail" disabled></el-input>
        </el-form-item>
        <el-form-item label="price" prop="price">
          <el-input v-model="resHotelForm.price" disabled></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resHotelDialogVisible=false ">取 消</el-button>
        <el-button type="primary" @click="resHotel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 预定bus对话框 -->
    <el-dialog
      title="预定Bus"
      :visible.sync="resBusDialogVisible"
      width="50%"
    >
      <!-- 内容主体区 -->
      <el-form
        ref="resBusFormRef"
        :rules="resBusFormRules"
        :model="resBusForm"
        label-width="80px"
      >
        <el-form-item label="location" prop="location">
          <el-input v-model="resBusForm.location" disabled></el-input>
        </el-form-item>
        <el-form-item label="numSeats" prop="numSeats">
          <el-input v-model="resBusForm.numSeats" disabled></el-input>
        </el-form-item>
        <el-form-item label="numAvail" prop="numAvail">
          <el-input v-model="resBusForm.numAvail" disabled></el-input>
        </el-form-item>
        <el-form-item label="price" prop="price">
          <el-input v-model="resBusForm.price" disabled></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resBusDialogVisible=false ">取 消</el-button>
        <el-button type="primary" @click="resBus">确 定</el-button>
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
        // 预定Hotel的数据
        resHotelDialogVisible: false,
        resHotelForm: {
          location: '',
          price: '',
          numRooms: '',
          numAvail: ''
        },
        resHotelFormRules: [],
        //  预定bus的数据
        resBusDialogVisible: false,
        resBusFormRules: [],
        resBusForm: {
          location: '',
          price: '',
          numSeats: '',
          numAvail: ''
        }

      }
    },
    // 生命周期函数
    created() {
      this.getLocationList()
    },
    methods: {
      async getLocationList() {
        const {data: result} = await this.$http.get('show_location', {
          params: this.queryInfo
        })
        console.log(result)
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.total = result.total
        this.locationList = result.list
        console.log(result.list.pk)
      },
      //  预定旅馆
      async showResHotel(location) {
        const {data: result} = await this.$http.get(
          'show_hotel' + '?location=' + location
        )
        console.log(result)
        if (result.error_num !== -1) return this.$message.error(result.msg)
        this.resHotelForm = {
          location: result.list.location_id,
          price: result.list.price,
          numRooms: result.list.numRooms,
          numAvail: result.list.numAvail
        }
        this.resHotelDialogVisible = true
      },
      async resHotel() {
        const postData = this.$qs.stringify({
          hotelLocation: this.resHotelForm.location,
          resvKey: 0
        })
        console.log(postData)
        const {data: result} = await this.$http.post(
          'reserve_hotel', postData
        )
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.$message.success(result.msg)
        this.resHotelDialogVisible = false
        this.getLocationList()
      },
      //  预定Bus
      async showResBus(location) {
        const {data: result} = await this.$http.get(
          'show_bus' + '?location=' + location
        )
        console.log(result)
        if (result.error_num !== -1) return this.$message.error(result.msg)
        this.resBusForm = {
          location: result.list.location_id,
          price: result.list.price,
          numSeats: result.list.numSeats,
          numAvail: result.list.numAvail
        }
        this.resBusDialogVisible = true
      },
      async resBus() {
        const postData = this.$qs.stringify({
          busLocation: this.resBusForm.location,
          resvKey: 0
        })
        console.log(postData)
        const {data: result} = await this.$http.post(
          'reserve_bus', postData
        )
        if (result.error_num !== 0) return this.$message.error(result.msg)
        this.$message.success(result.msg)
        this.resBusDialogVisible = false
        this.getLocationList()
      },
      //  分页
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pagesize = newSize
        this.getLocationList()
      },
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getLocationList()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
