<template>
	<div class="jumbotron">
		<h1>表单</h1>
		<!-- <p>{{status == 1 ? "得到数据" : "无数据"}}</p> -->

		<!-- Form -->
		<el-button type="primary" @click="getList()">获取并编辑数据</el-button>
		<el-dialog title="数据编辑表单" v-model="dialogFormVisible"  size="large">
			<el-form :model="formData" :rules="rules" ref="formData" :inline="true" label-position="top" label-width="120px">
				<!-- 循环表单目前的问题 -->
				<!-- 1.如何提交修改vuex中的数据 -->
				<el-row>
					<el-col :span="8" :offset="4" v-for="(item,index) in formModel" :key="item.code">

						<el-form-item v-if="item.type == 'stat'" :label="item.name" :prop="item.code">
							<el-radio-group v-model="formData[item.code]">
								<el-radio v-for="option in item.rangeset" :key="option" :label="parseInt(option.split(':')[0])">{{option.split(':')[1]}}</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item v-else :label="item.name" :prop="item.code">
							<el-input v-model.number="formData[item.code]" :disabled="item.editable"></el-input>
						</el-form-item>			
					</el-col>
				</el-row>
				<!-- 提交按钮 -->
				<el-row type="flex" justify="center">
						<el-form-item>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="submitForm('formData')">提 交</el-button>
						</el-form-item>
				</el-row>

			</el-form>
			<el-row type="flex" justify="center">
				<template v-for="list in slaves">
					<el-button type="primary" @click="renderSlaves(list.code)">{{list.name}}</el-button>
				</template>
			</el-row>

			<el-table v-show="displaySlavesModel.length != 0" :data="displaySlavesData" border stripe style="width:100%;">

				<el-table-column type="selection" width="50"></el-table-column>

				<template v-for="item in displaySlavesModel">
					<el-table-column :prop="item.code" :label="item.name" width="100"></el-table-column>
				</template>

			</el-table>

		</el-dialog>
		
	</div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'

export default {
	data(){
		return {
			dialogFormVisible: false,
			displaySlavesModel: [],
			displaySlavesData: []
		}
	},
	computed : {
		...mapState({
			formData: state => state.formData.data
		}),
		...mapGetters(['formModel','rules','slaves'])
	},
	methods : {
		getList() {
			/* 从json文件取得数据放入vuex  */
			//pass

			this.dialogFormVisible = true;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//alert('submit!');
					/* 提交校验成功在这里改变状态 */
					this.$store.dispatch('submit', this.formData);
					this.dialogFormVisible = false;
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		renderSlaves(code) {
			/* 根据code取相应的model */
	    		for (var i = this.slaves.length - 1; i >= 0; i--) {
	    			if (this.slaves[i].code == code) {
	    				this.displaySlavesModel = this.slaves[i].fields;
	    				break;
	    			}
	    		}
	    		/* 根据code取相应的data,没data */
	    		console.log(this.formData[code]);
	    		this.displaySlavesData = this.formData[code];
		}
	},
}
</script>

<style>
	.data{margin-top: 15px;background-color: green;}
	.model{margin-top: 15px;background-color: yellow;}
	p{margin: 20px 0;}
</style>