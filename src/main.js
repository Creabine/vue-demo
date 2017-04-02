// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store'
//组件
import Home from './components/Home'
import Form from './components/Form'
import List from './components/List'
//关闭生产模式下给出的提示
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [{
	path : '/',
	component : Home
},{
      path : '/form',
      component : Form
},{
      path : '/list',
      component : List
}];

const router = new VueRouter({
	routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
