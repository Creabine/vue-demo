<template>
	<div class="jumbotron">
		<h1>表单</h1>

		<!-- Form -->
		<el-button type="primary" @click="getList()">获取并编辑数据</el-button>
		<el-dialog title="数据编辑表单" v-model="dialogFormVisible"  size="large">
			<el-row>
				<el-form :model="formData" :rules="rules" ref="formData" label-position="top" label-width="120px">
					<el-col :span="9" :offset="2" v-for="(item,index) in formModel" :key="item.code">

						<el-form-item v-if="item.type == 'stat'" :label="item.name" :prop="item.code">
							<el-radio-group v-model="formData[item.code]">
								<el-radio v-for="option in item.rangeset" :key="option" :label="parseInt(option.split(':')[0])">{{option.split(':')[1]}}</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item v-else :label="item.name" :prop="item.code">
							<el-input v-model.number="formData[item.code]" :disabled="item.editable"></el-input>
						</el-form-item>

					</el-col>
				</el-form>
			</el-row>

			<!-- 子表渲染 -->
			<template v-for="list in slaves">
				<el-row type="flex" justify="center">
					<p>{{list.name}}</p>
				</el-row>
				<el-row type="flex" justify="center">
					<el-table :data="formData[list.code]" border stripe style="width:100%;">
							<el-table-column type="selection" width="50"></el-table-column>
							<template v-for="item in list.fields">
								<el-table-column :prop="item.code" :label="item.name" width="100"></el-table-column>
							</template>
					</el-table>
				</el-row>
			</template>

			<!-- 提交按钮 -->
			<el-row type="flex" justify="center" class="btnFixed">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitForm('formData')">提 交</el-button>
			</el-row>

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
		}
	},
}
</script>

<style>
	.data{margin-top: 15px;background-color: green;}
	.model{margin-top: 15px;background-color: yellow;}
	p{margin: 20px 0;}
</style>