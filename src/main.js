import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import qs from 'qs'

// 导入全局样式表
import './assets/css/global.css'
// 配置请求的根路径
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
Vue.prototype.$http = axios
// 配置qs
Vue.prototype.$qs = qs

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
