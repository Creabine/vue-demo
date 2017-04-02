//在整个store文件夹中：
//mutations-type.js记录所有的事件名
//mutations注册各种数据变化的方法
//actions则可以编写其他逻辑，包括异步逻辑，再commit事件

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

//json数据
import formData from '../../static/data.json'
import listModel from '../../static/list_model.json'
import listData1 from '../../static/list_data1.json'
import listData2 from '../../static/list_data2.json'

Vue.use(Vuex);


const state = {
	formData : {
		data: formData.data.data,
		model: formData.data.model,
		status: formData.status,
	},
	listData : {
		list1 : {
			model: listModel.facets[0],
			data: listData1.data.data
		},
		list2 : {
			model: listModel.facets[1],
			data: listData2.data.data
		},
	}
}

//默认导出： 初始化好的Vuex.Store()对象
export default new Vuex.Store({
	state,
	mutations,
	actions
	//这里可以有getter
})