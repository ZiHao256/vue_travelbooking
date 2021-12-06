import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
// 导入全局样式表
import '../assets/css/global.css'

Vue.use(VueRouter)

const routes = [
  //  /重定向到/login
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
