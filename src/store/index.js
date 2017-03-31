//在整个store文件夹中：
//mutations-type.js记录所有的事件名
//mutations注册各种数据变化的方法
//actions则可以编写其他逻辑，包括异步逻辑，再commit事件

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

//假数据
import data from '../../static/data.json'

Vue.use(Vuex);

const state = {
	data: data.data.data,
	model: data.data.model,
	status: data.status,
}

//默认导出： 初始化好的Vuex.Store()对象
export default new Vuex.Store({
	state,
	mutations,
	actions
})