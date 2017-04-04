<template>
	<div class="jumbotron">
		<h1>表单</h1>
		<!-- <p>{{status == 1 ? "得到数据" : "无数据"}}</p> -->

		<!-- Form -->
		<el-button type="primary" @click="getList()">获取并编辑数据</el-button>
		<el-dialog title="数据编辑表单" v-model="dialogFormVisible"  size="small">
			<el-form :model="fromRender" :rules="rules" ref="fromRender" :inline="true" label-position="top" label-width="120px">
				<!-- 循环表单 -->

				<!-- 目前循环表单的问题： -->
				<!-- 1.下拉框v-model无效；2.校验；3.提交 -->

				<el-row>
					<el-col :span="12" v-for="(item,index) in fromRender.renderOrder" :key="item.code">
						<el-form-item :label="fromRender[item.code].name">
							<el-select v-if="fromRender[item.code].type == 'stat'" v-model="fromRender[item.code].status">
								<el-option v-for="option in fromRender[item.code].rangeset" :key="option" :value="option"></el-option>
							</el-select>

							<el-input v-else v-model="fromRender[item.code].value" :disabled="fromRender[item.code].editable"></el-input>
						</el-form-item>						
					</el-col>
				</el-row>
				<!-- 提交按钮 -->
				<el-row type="flex" justify="center">
					<el-col :span="12">
						<el-form-item>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="submitForm('fromRender')">提 交</el-button>
						</el-form-item>
					</el-col>
				</el-row>

			</el-form>
		</el-dialog>
		
	</div>
</template>

<script>

import {mapGetters} from 'vuex'

	export default {
		data(){
			return {
				//dialogTableVisible: false,
				dialogFormVisible: false,
			}
		},
		//计算属性的get，set怎么用？？？
		computed : {
			...mapGetters(['fromRender','rules'])
		},
		methods : {
		  getList() {
		  	  /* 从json文件取得数据放入vuex  */
			  	this.dialogFormVisible = true;
		 	},
		 	submitForm(formName) {
		 		console.log(this.$refs[formName].validate);
        this.$refs[formName].validate((valid) => {
        	alert('jinlaile');
          if (valid) {
            alert('submit!');
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
		},
	}
</script>

<style>
	.data{margin-top: 15px;background-color: green;}
	.model{margin-top: 15px;background-color: yellow;}
	p{margin: 20px 0;}
</style>