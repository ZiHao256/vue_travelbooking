import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Welcome from '../components/Welcome.vue'

import Admin from '../components/Admin.vue'
import location from '../components/admin/location.vue'
import flight from '../components/admin/flight.vue'
import customer from '../components/admin/customer.vue'
import admin from '../components/admin/admin.vue'
import hotel from '../components/admin/hotel.vue'
import bus from '../components/admin/bus.vue'

import xCustomer from '../components/Customer.vue'
import flightList from '../components/customer/flightList.vue'
import hotelList from '../components/customer/hotelList.vue'
import locationList from '../components/customer/locationList.vue'
import busList from '../components/customer/busList.vue'
import linesList from '../components/customer/linesList.vue'
import revFlight from '../components/customer/revFlight.vue'

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
    redirect: '/admin/welcome',
    children: [{
      path: '/admin/welcome',
      component: Welcome
    }, {
      path: '/admin/location',
      component: location
    }, {
      path: '/admin/customer',
      component: customer
    }, {
      path: '/admin/admin',
      component: admin
    },{
      path: '/admin/flight',
      component: flight
    }, {
      path: '/admin/bus',
      component: bus
    }, {
      path: '/admin/hotel',
      component: hotel
    }]
  },
  {
    path: '/customer',
    redirect: '/customer/welcome',
    component: xCustomer,
    children: [{
      path: '/customer/welcome',
      component: Welcome
    }, {
      path: '/customer/flightList',
      component: flightList
    }, {
      path: '/customer/busList',
      component: busList
    }, {
      path: '/customer/locationList',
      component: locationList
    }, {
      path: '/customer/hotelList',
      component: hotelList
    }, {
      path: '/customer/linesList',
      component: linesList
    }, {
      path: '/customer/revFlight',
      component: revFlight
    }]
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
