<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>欢迎你, 管理员</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#f0e68c"
          text-color="#000000"
          active-text-color="#ffd04b"
          router
        >
          <!-- 管理乘客 -->
          <!--一级菜单-->
          <el-submenu index="1">
            <!--一级菜单的模板， i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>乘客</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/admin/customer">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>乘客列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 管理地点 -->
          <!--一级菜单-->
          <el-submenu index="2">
            <!--一级菜单的模板， i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>地点</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/admin/location">
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
              <i class="el-icon-location"></i>
              <span>航班</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/admin/flight">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>航班列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 管理旅店 -->
          <el-submenu index="4">
            <!--一级菜单的模板， i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>旅店</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/admin/hotel">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>旅店列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 管理大巴 -->
          <el-submenu index="5">
            <!--一级菜单的模板， i是图标，span是文本-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>大巴</span>
            </template>

            <!--二级菜单-->
            <el-menu-item index="/admin/bus">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>大巴列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async logout() {
      // 清空token
      // window.sessionStorage.clear()
      // 跳转到登录页面
      const { data: res } = await this.$http.get('logout')
      console.log(res)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #f0e68c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cbe007;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #cac489;
}

.el-main {
  background-color: rgb(255, 255, 255);
}

.home-container {
  height: 100%;
}
</style>
