import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

//
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 把Message组件挂载到Vue原型对象，每个组件都可以通过this来访问$message
Vue.prototype.$message = Message
