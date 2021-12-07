import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

import Admin from '../components/Admin.vue'
import Welcome from '../components/Welcome.vue'
import location from '../components/admin/location.vue'
import flight from '../components/admin/flight.vue'
import customer from '../components/admin/customer.vue'
import hotel from '../components/admin/hotel.vue'
import bus from '../components/admin/bus.vue'

Vue.use(VueRouter)

const routes = [
  //  /重定向到/login
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/admin',
    component: Admin,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    }, {
      path: '/admin/location',
      component: location
    }, {
      path: '/admin/customer',
      component: customer
    }, {
      path: '/admin/flight',
      component: flight
    }, {
      path: '/admin/bus',
      component: bus
    }, {
      path: '/admin/hotel',
      component: hotel
    }
    ]
  }

]

//
const router = new VueRouter({
  routes
})

// // 挂在路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   //获取token
//   const tokenstr = window.sessionStorage.getItem('token')
//   if (!tokenstr) return next('/login')
//   next()
// })

// 暴露路由对象
export default router
