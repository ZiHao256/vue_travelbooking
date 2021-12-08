import Vue from 'vue'
import { Switch, MessageBox, Dialog, Tooltip, Table, TableColumn, Row, Col, Card, BreadcrumbItem, Breadcrumb, Radio, Menu, Submenu, MenuItem, Button, Form, FormItem, Input, Message, Container, Header, Main, Aside } from 'element-ui'

//
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Radio)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Switch)

// 把Message组件挂载到Vue原型对象，每个组件都可以通过this来访问$message
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
