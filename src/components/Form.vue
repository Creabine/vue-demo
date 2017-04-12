<template>
	<div class="jumbotron">
		<h1>表单</h1>

		<!-- Form -->
		<el-button type="primary" @click="getList()">获取并编辑数据</el-button>
		<el-dialog title="数据编辑表单" v-model="dialogFormVisible"  size="large">
			<el-row>
				<el-form :model="formData" :rules="rules" ref="formData" label-position="top" label-width="120px">
					<!-- top -->
					<el-col :span="9" :offset="2" v-for="item in formModel.fields" v-if="item.fieldset == 'top'" :key="item.code">
						<form-item :field="item" :formData="formData"></form-item>
					</el-col>
					<!-- fieldset -->
					<fieldset v-for="fieldsetitem in formModel.fieldset" v-if="formModel.fieldSetStr.indexOf(fieldsetitem.code) != -1">
						<legend>{{fieldsetitem.name}}</legend>
						<el-col :span="9" :offset="2" v-for="item in formModel.fields" v-if="item.fieldset == fieldsetitem.code" :key="item.code">
							<form-item :field="item" :formData="formData"></form-item>
						</el-col>
					</fieldset>


					<!-- 子表渲染 -->
					<template v-for="list in slaves">
						<el-row type="flex" justify="center">
							<p>{{list.name}}</p>
						</el-row>
						<el-row type="flex" justify="center">
							<el-table class="table" :data="formData[list.code]" border stripe style="width:100%;">
									<el-table-column type="selection" width="50"></el-table-column>
									<template v-for="item in list.fields">
										<el-table-column :prop="item.code" :label="item.name" width="100"></el-table-column>
									</template>
							</el-table>
						</el-row>
					</template>


					<!-- bottom -->
					<el-col :span="9" :offset="2" v-for="item in formModel.fields" v-if="item.fieldset == 'bottom'" :key="item.code">
						<form-item :field="item" :formData="formData"></form-item>
					</el-col>
				</el-form>
			</el-row>

			<!-- 提交按钮 -->
			<el-row type="flex" justify="center">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitForm('formData')">提 交</el-button>
			</el-row>

		</el-dialog>
		
	</div>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import FormItem from './Form-item.vue'

export default {
	data(){
		return {
			dialogFormVisible: false,
		}
	},
	components: { 
    	'form-item': FormItem,
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
					console.log(this.$refs[formName]);
					return false;
				}
			});
		}
	},
}
</script>

<style>
	p{margin: 20px 0;}
	.el-form fieldset{margin: 20px 0 0 0;border:3px solid #20A0FF;font-size: 20px;padding: 20px 10px;}
	.table{margin: 0 0 20px 0;}
</style>