<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <el-avatar>乘客</el-avatar>
        <span>欢迎你, 乘客</span>
      </div>
      <div>
        <el-button type="primary" @click="depositDialogVisible = true">充值</el-button>
        <el-button type="info" @click="logout">退出</el-button>
      </div>

    </el-header>
    <!-- 主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#AFEEEE"
          text-color="#000000"
          active-text-color="#00BFFF"
          router
        >
          <!-- 管理地点 -->
          <!--一级菜单-->
          <el-submenu index="2">
            <!--一级菜单的模板， i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>地点</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/customer/locationList">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>地点列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 管理航班 -->
          <el-submenu index="3">
            <!--一级菜单的模板， i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>航班管理</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/customer/flightList">
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>航班列表</span>
              </template>
            </el-menu-item>
            <!--二级菜单-->
            <el-menu-item index="/customer/revFlight">
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>预定列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 管理旅店 -->
          <el-submenu index="4">
            <!--一级菜单的模板， i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>旅店管理</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/customer/hotelList">
              <template slot="title">
                <i class="el-icon-office-building"></i>
                <span>预定列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 管理大巴 -->
          <el-submenu index="5">
            <!--一级菜单的模板， i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-truck"></i>
              <span>大巴管理</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/customer/busList">
              <template slot="title">
                <i class="el-icon-truck"></i>
                <span>预定列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!--          &lt;!&ndash; 管理路线 &ndash;&gt;-->
          <!--          <el-submenu index="6">-->
          <!--            &lt;!&ndash;一级菜单的模板， i是图标，span是文本&ndash;&gt;-->
          <!--            <template slot="title">-->
          <!--              <i class="el-icon-more"></i>-->
          <!--              <span>路线管理</span>-->
          <!--            </template>-->

          <!--            &lt;!&ndash;二级菜单&ndash;&gt;-->
          <!--            <el-menu-item index="/customer/linesList">-->
          <!--              <template slot="title">-->
          <!--                <i class="el-icon-location"></i>-->
          <!--                <span>路线列表</span>-->
          <!--              </template>-->
          <!--            </el-menu-item>-->
          <!--          </el-submenu>-->
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 修改用户对话框 -->
      <el-dialog
        title="充值"
        :visible.sync="depositDialogVisible"
        width="50%"
      >
        <!-- 内容主体区 -->
        <el-form
          ref="editFormRef"
          :rules="editFormRules"
          :model="editForm"
          label-width="80px"
        >
          <!--          <el-form-item label="adminID" prop="adminD">-->
          <!--            <el-input v-model.number="editForm.adminID" disabled></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="name" prop="name">-->
          <!--            <el-input v-model="editForm.name" disabled></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="balance" prop="balance">
            <el-input v-model.number="editForm.balance"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区 -->
        <span slot="footer" class="dialog-footer">
          <span>
            <el-button @click="depositDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deposit">确 定</el-button>
          </span>

      </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        depositDialogVisible: false,
        editForm: {
          balance: ''
        }
      }
    },
    methods: {
      async logout() {
        // 清空token
        // window.sessionStorage.clear()
        // 跳转到登录页面
        const {data: res} = await this.$http.get('logout')
        console.log(res)
        this.$router.push('/login')
      },
      async deposit() {
        //  充值
        const {data: result} = await this.$http.get('deposit?balance=' + this.editForm.balance)
        console.log(result)
        if (result.error_num !== 0) return this.$messag.error(result.msg)
        this.$message.success(result.msg)
        this.depositDialogVisible = false

      }
    }
  }
</script>

<style lang="less" scoped>

  .el-header {
    background-color: #AFEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000000;

    > div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #E0FFFF;
  }

  .el-main {
    background-color: rgb(255, 255, 255);
  }

  .home-container {
    height: 100%;
  }
</style>
