// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store'
//组件
import Home from './components/Home'
import Form from './components/Form'
import List from './components/List'
import ListTable from './components/List-table'
import ListText from './components/List-text'
import Test from './components/Test'
//关闭生产模式下给出的提示
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

const routes = [{
  	path : '/',
  	component : Home
},{
    path : '/form',
    component : Form
},{
    path : '/list',
    component : List,
    children: [{
      path : '/list/gp',
      component : ListTable
    },{
      path : '/list/fm',
      component : ListText
    }]
},{
    path : '/test',
    component : Test
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
