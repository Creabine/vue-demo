<template>
	<div class="jumbotron">
		<h1>表单</h1>
		<p>{{status == 1 ? "得到数据" : "无数据"}}</p>

		<!-- Form -->
		<el-button type="primary" @click="getList()">获取并编辑数据</el-button>
		<el-dialog title="数据编辑表单" v-model="dialogFormVisible"  size="small">
			<el-form ref="form" :inline="true" label-position="top" label-width="120px" :model="renderObj" >

				<el-row>
					<el-col :span="12"   v-for="(item,index) in renderObj.renderList" :key="item.name">
						<el-form-item :label="item.name">
							<el-time-select   v-if="item.type == 'timestamp'" v-model="item.value" :picker-options="{start: '08:30',step: '00:15', end: '18:30'}" placeholder="选择时间"></el-time-select>

							<el-select v-else-if="item.type == 'stat'" size="small" v-model="item.status">
								<el-option v-for="option in item.rangeset" :key="option" :value="option"></el-option>
							</el-select>

							<el-input v-else v-model="item.value" size="small" :disabled="item.editable" :required="item.required"></el-input>
						</el-form-item>						
					</el-col>
				</el-row>

				<el-row type="flex" justify="center">
					<el-col :span="12">
						<el-form-item>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="submit()">提交修改</el-button>
						</el-form-item>
					</el-col>
				</el-row>

			</el-form>
		</el-dialog>
		
	</div>
</template>

<script>

import {mapState} from 'vuex'

	export default {
		data(){
			return {
				dialogTableVisible: false,
				dialogFormVisible: false,
				data: {},
				model: {},
				status: null,
				renderObj:{
					renderList:[]
				}
			}
		},
		//之后可以尝试用计算属性
		computed : {
			render : {
				get(){
					let array = [];
			 		for (var i = this.model.main.fields.length - 1; i >= 0; i--) {
			 			let obj = this.model.main.fields[i]; 
			 			obj.value = this.data[this.model.main.fields[i].code];  // 值
			 			array.push(obj);
			 		}
			 		array.sort(this.compare("cardpos"));
			 		//this.$store.dispatch('render',array);
			 		return array;
				},
				set(newdata){
					this.data[newdata.code] = newdata.value;
				}
			},
			...mapState({
				/*三种不用的方式*/
				status : state => state.status,
				status1 : 'status',
				status2 (state) {
					return state.status;
				}
			})
		},
		methods : {
		    	getList() {
			  	this.data = this.$store.state.formData.data;
			  	this.model = this.$store.state.formData.model;
			  	this.status = this.$store.state.formData.status;
			  	this.renderByModle();
			  	this.dialogFormVisible = true;
		 	},
		 	renderByModle(){
		 		let array = [];
		 		for (var i = this.model.main.fields.length - 1; i >= 0; i--) {
		 			let obj = {};
		 			obj.name = this.model.main.fields[i].name;  // 名称
		 			obj.type = this.model.main.fields[i].type;  //数据类型
		 			obj.required = this.model.main.fields[i].required;  //是否必填
		 			obj.editable = this.model.main.fields[i].editable;  //是否可编辑
		 			obj.cardpos = this.model.main.fields[i].cardpos;  // 排列优先级
		 			obj.value = this.data[this.model.main.fields[i].code];  // 值
		 			obj.code = this.model.main.fields[i].code;  // data键名
		 			//下拉框的处理
		 			if (obj.type == 'stat') {
		 				obj.status = this.model.main.fields[i].status;
		 				obj.rangeset = this.model.main.fields[i].rangeset.split('@');
		 			};
		 			array.push(obj);
		 		}
		 		array.sort(this.compare("cardpos"));
		 		//this.$store.dispatch('render',array);
		 		this.renderObj.renderList = array;
		 	},
		 	compare(propertyName){
		 		return function (object1, object2) { 
		 			var value1 = object1[propertyName]; 
		 			var value2 = object2[propertyName]; 
		 			return value1 - value2;
		 		};  
		 	},
		 	submit(obj){
		 		//console.log(obj);
		 		this.$store.dispatch('submit',obj);
		 		this.dialogFormVisible = false;
		 	}
		},
	}
</script>

<style>
	.data{margin-top: 15px;background-color: green;}
	.model{margin-top: 15px;background-color: yellow;}
	p{margin: 20px 0;}
</style>