import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [{
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
      },{
        path : '/list/db',
        component : ListBlock
      }]
  },{
      path : '/test',
      component : Test
  }]
})
