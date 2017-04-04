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
  fromRender : state => {
  	let data = {
  		//renderList:[]
  		renderOrder:[]
  	};
  	for (var i = state.formData.model.main.fields.length - 1; i >= 0; i--) {
  		let obj = state.formData.model.main.fields[i];
  		obj.value = state.formData.data[state.formData.model.main.fields[i].code];
  		//cardpos == 0 的数据应该是不显示的,就不放入数组了。
  		if (obj.cardpos != 0) {
  			//下拉框处理
  			if (obj.type == 'stat') {
		 			obj.rangeset = state.formData.model.main.fields[i].rangeset.split('@');
  			}
  			data[obj.code] = obj;
  			let orderObj = {
  				code:obj.code,
  				cardpos:obj.cardpos
  			}
  			data.renderOrder.push(orderObj);
  			//data.renderList.push(obj);
  		}
  	}
  	//data.renderList.sort(compare("cardpos"));
  	data.renderOrder.sort(compare("cardpos"));
  	return data
  },
  rules : state => {
  	let rules = {};
  	for (var i = state.formData.model.main.fields.length - 1; i >= 0; i--) {
  		//cardpos == 0 的数据应该是不显示,也就没有校验规则。
  		if (state.formData.model.main.fields[i].cardpos != 0) {
  			rules[state.formData.model.main.fields[i].code] = {
	  			required : state.formData.model.main.fields[i].required,
	  			message : state.formData.model.main.fields[i].tip,
	  			trigger: 'blur'
	  		}
  		}
  	}
  	return rules
  },
	/* listData Getters */
	list1_Render : state => {
		let list = [];
		for (var i = state.listData.list1.data.length - 1; i >= 0; i--) {
			let dataObj = {}
			//let dataValueList = []
			for(let key in state.listData.list1.data[i]){
				for (var j = state.listData.list1.model.model.main.fields.length - 1; j >= 0; j--) {
					const code = state.listData.list1.model.model.main.fields[j].code;
					if (key == code) {
						let keyObj = {
              value: state.listData.list1.data[i][key],
              ...state.listData.list1.model.model.main.fields[j]
						};
						if (code == 'sync_switch') {  //element-ui 这里不是布尔值会报错
							keyObj.value = Boolean(keyObj.value);
						}
						dataObj[key] = keyObj;
						//dataValueList.push(keyObj);
						break;
					}
				}
			}
			//dataValueList.sort(compare("listpos"));
			//list.push(dataValueList);
      list.push(dataObj);
		}
		list.sort(compare("listpos"));
		return list
	},
	list2_Render : state => {
		let list = [];
		for (var i = state.listData.list2.data.length - 1; i >= 0; i--) {
			let dataObj = {}
			//let dataValueList = []
			for(let key in state.listData.list2.data[i]){
				for (var j = state.listData.list2.model.model.main.fields.length - 1; j >= 0; j--) {
					const code = state.listData.list2.model.model.main.fields[j].code;
					if (key == code) {
						let keyObj = {
              value: state.listData.list2.data[i][key],
              ...state.listData.list2.model.model.main.fields[j]
						};
						if (code == 'sync_switch') {  //element-ui 这里不是布尔值会报错
							keyObj.value = Boolean(keyObj.value);
						}
						dataObj[key] = keyObj;
						//dataValueList.push(keyObj);
						break;
					}
				}
			}
			//dataValueList.sort(compare("listpos"));
			//list.push(dataValueList);
      list.push(dataObj);
		}
		list.sort(compare("listpos"));
		return list
	},
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
