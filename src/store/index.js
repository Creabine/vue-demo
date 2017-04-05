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


const getters = {
	/* formData Getters */
	formModel : state => {
		let array = state.formData.model.main.fields.filter(function(obj){
	  		return obj.cardpos > 0
	  	});
		array.map(function(obj){
			if (obj.type == 'stat') {
				obj.rangeset = obj.rangeset.split('@');
			}
		});
	  	array.sort(compare("cardpos"));
		return array
	},
      rules : state => {
	  	let rules = {};
	  	//cardpos == 0 的数据应该是不显示,也就没有校验规则。
	  	let array = state.formData.model.main.fields.filter(function(obj){
	  		return obj.cardpos > 0
	  	});
	  	for (var i = state.formData.model.main.fields.length - 1; i >= 0; i--) {
  			rules[state.formData.model.main.fields[i].code] = [{
  				required : state.formData.model.main.fields[i].required,
  				message : state.formData.model.main.fields[i].tip
  			}];
  			//不同数据的特定校验规则
  			if (state.formData.model.main.fields[i].code == 'crt_ts') {
  				let numberRules = { type: 'number', message: '必须为数字值'};
  				rules[state.formData.model.main.fields[i].code].push(numberRules);
  			}
		}
	  	return rules
	 },
	
      /* listData Getters */
      list1Model : state => {
	  	let array = state.listData.list1.model.model.main.fields.filter(function(obj){
	  		return obj.listpos > 0
	  	});
	  	array.sort(compare("listpos"));
		return array
	},
	 list2Model : state => {
	  	let array = state.listData.list2.model.model.main.fields.filter(function(obj){
	  		return obj.listpos > 0
	  	});
	  	array.sort(compare("listpos"));
		return array
	},
	//为了switch不报错，把 1/0 改为 true/false
	list1Data : state => {
	  	let data = state.listData.list1.data;
	  	data.map(function(obj){
			obj.sync_switch = Boolean(obj.sync_switch);
		});
		return data
	},
	list2Data : state => {
	  	let data = state.listData.list2.data;
	  	data.map(function(obj){
			obj.sync_switch = Boolean(obj.sync_switch);
		});
		return data
	}
}

//默认导出： 初始化好的Vuex.Store()对象
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
	//这里可以有getter
})


/* 公用函数 */
function compare(propertyName){
	return function (object1, object2) { 
		var value1 = object1[propertyName]; 
		var value2 = object2[propertyName]; 
		return value1 - value2;
	};  
}
